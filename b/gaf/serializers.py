from gaf.function import base64_to_file
from rest_framework import serializers
from .models import Image, Record

class RecordSerializer(serializers.ModelSerializer):
    quiz1 = serializers.IntegerField(required=False, allow_null=True)
    quiz2 = serializers.IntegerField(required=False, allow_null=True)
    class Meta:
        model = Record
        fields = ['id', 'name', 'quiz1', 'quiz2', 'img','total']
    # def create(self, validated_data):
    #     # Create a new Record instance using the validated data
    #     return Image.objects.create(**validated_data)
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField()
    class Meta:
        fields = ['image']
    def create(self, validated_data):
        # Create a new Record instance using the validated data
        return Image.objects.create(**validated_data)