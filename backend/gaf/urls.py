
from django.contrib import admin
from django.urls import path,include

from gaf.views import LoginView
from rest_framework.routers import DefaultRouter
from .views import ImageViewSet, RecordViewSet
router = DefaultRouter()
router.register(r'record', RecordViewSet, basename='record')
router.register(r'image', ImageViewSet, basename='image')

urlpatterns = [
    path('login/', LoginView.as_view() , name='login'),
    path('', include(router.urls)),

]
