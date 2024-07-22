from django.shortcuts import render
from gaf.serializers import ImageSerializer, LoginSerializer, RecordSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from knox.models import AuthToken # type: ignore
from rest_framework import status, generics,viewsets, permissions,status
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication # type: ignore
from .models import Image, Record
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"error":"Bad credentials"}, status=status.HTTP_400_BAD_REQUEST)
        _,token = AuthToken.objects.create(user)
        return Response({
            'token': token,
            'message': 'Login successful!'
        }, status=status.HTTP_200_OK)
    
class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    def get_queryset(self):
        return Record.objects.all().order_by('-total')
    def create(self, request, *args, **kwargs):
        request.data['total'] = int(request.data['quiz1']) + int(request.data['quiz2'])
        return super().create(request, *args, **kwargs)
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serialized_data = self.get_serializer(queryset, many=True).data
        modified_data = [self.modify_data(item) for item in serialized_data] # type: ignore
        return Response(modified_data,200)
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serialized_data = self.get_serializer(instance).data
        modified_data = self.modify_data(serialized_data)
        return Response(modified_data)
    def update(self, request, *args, **kwargs):
        quiz1 = int(request.data['quiz1'])
        quiz2 = int(request.data['quiz2'])
        total = quiz1 + quiz2
        request.data['total'] = total
        super().update(request,*args,**kwargs)
        return Response({'updated'},200)
    def modify_data(self, item):
        record = Record.objects.get(id=item['id'])
            
        # Fetch all records ordered by 'score' in descending order
        ordered_records = Record.objects.all().order_by('-total')
        
        # Convert queryset to a list and find the position of the specific record
        records_list = list(ordered_records)
        
        # Find the rank of the specific record
        for rank, rec in enumerate(records_list, start=1):
                if rec.id == record.id:
                    item['rank'] = rank
        item['key']=item['id']

        return item

class ImageViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    def get_queryset(self):
        return Image.objects.all()# Create your views here.
    def create(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
