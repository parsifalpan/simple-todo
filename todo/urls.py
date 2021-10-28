from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.todo_list),
    url(r'^(?P<pk>\d+)$', views.todo_detail),
]