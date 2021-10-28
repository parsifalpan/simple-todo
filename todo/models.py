from django.db import models
from django.utils import timezone

# Create your models here.

# Status
# 0 as unfinished
# 1 as finished

# Priority
# The higher the integer is, the
class Todo(models.Model):
    def __str__(self):
        return self.title

    title = models.CharField(max_length=64, default='')
    content = models.CharField(max_length=256, default='')
    status = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)