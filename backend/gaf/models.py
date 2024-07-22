from django.db import models

# Create your models here.

class Record (models.Model):
    name = models.CharField(max_length=1000)
    quiz1 = models.SmallIntegerField(blank=True,null=True)
    quiz2 = models.SmallIntegerField(blank=True,null=True)
    total = models.SmallIntegerField(blank=True,null=True)
    img = models.URLField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    timestamp = models.DateTimeField(auto_now_add=True)

