
from django.contrib import admin
from django.urls import path,include

from gaf.views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view() , name='login'),
]
