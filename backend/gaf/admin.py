from django.contrib import admin
from django.apps import apps

# Get a list of all installed models
class RecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'quiz1', 'quiz2','img')
    search_fields = ['*']
    list_filter = ['name']

admin.site.register(apps.get_model('gaf', 'Record'), RecordAdmin)
