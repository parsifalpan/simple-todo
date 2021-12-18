from rest_framework import routers
from todo.views import TodoViewSet

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet)
