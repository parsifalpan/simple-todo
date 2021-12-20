from rest_framework import routers
from todo.views import TodoViewSet
from account.views import AccountViewSet

router = routers.DefaultRouter()
router.register(r'account', AccountViewSet, basename='account')
router.register(r'todos', TodoViewSet, basename='todo')
