from rest_framework.response import Response
from rest_framework import viewsets, status

from .models import Todo
from .serializers import TodoSerializer


# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by("expire_date")
    serializer_class = TodoSerializer
