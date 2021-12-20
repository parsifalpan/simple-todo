from django.utils import timezone
from rest_framework import serializers

from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'content', 'status', 'priority', 'created_at', 'expire_date')

    def validate_expire_date(self, value):
        if value < timezone.now():
            raise serializers.ValidationError("Expire time must be greater than created time!")
        return value