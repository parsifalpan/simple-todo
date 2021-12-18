from django.db import models
from .constants import TODO_STATUS_CHOICES, TODO_PRIORITY_CHOICES, TodoStatus, TodoPriority


# Create your models here.

class Todo(models.Model):
    def __str__(self):
        return self.title

    title = models.CharField(max_length=64, default='')
    content = models.CharField(max_length=256, default='', blank=True)
    status = models.IntegerField(default=TodoStatus.UNDONE, choices=TODO_STATUS_CHOICES)
    priority = models.IntegerField(default=TodoPriority.CASUAL, choices=TODO_PRIORITY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    expire_date = models.DateTimeField(blank=False)
