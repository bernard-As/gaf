from django.shortcuts import render
from gaf.serializers import LoginSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from knox.models import AuthToken # type: ignore
from rest_framework import status, generics

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
    
# Create your views here.
