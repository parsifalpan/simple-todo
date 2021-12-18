from django.contrib import admin
from .models import Todo
# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'priority', 'created_at', 'expire_date')

admin.site.register(Todo, TodoAdmin)
