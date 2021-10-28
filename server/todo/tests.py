import datetime
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient

from .models import Todo
from .constants import TodoStatus, TodoPriority


# Create your tests here.
class TodoTestCase(TestCase):
    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        # undone and expired
        self.undone_exp = Todo.objects.create(
            title='undone_exp',
            content='undone_exp',
            status=TodoStatus.UNDONE,
            priority=TodoPriority.CASUAL,
            expire_date=timezone.now() - datetime.timedelta(days=1)
        )

        # undone and unexpired
        self.undone_unexp = Todo.objects.create(
            title='undone_unexp',
            content='undone_unexp',
            status=TodoStatus.UNDONE,
            priority=TodoPriority.URGENT,
            expire_date=timezone.now() + datetime.timedelta(days=1)
        )

        # done and expired
        self.done_exp = Todo.objects.create(
            title='done_exp',
            content='done_exp',
            status=TodoStatus.DONE,
            priority=TodoPriority.NORMAL,
            expire_date=timezone.now() - datetime.timedelta(days=2)
        )

        # done and unexpired
        self.done_unexp = Todo.objects.create(
            title='done_unexp',
            content='done_unexp',
            status=TodoStatus.DONE,
            priority=TodoPriority.MEDIUM,
            expire_date=timezone.now() + datetime.timedelta(days=2)
        )

    def test_get_todo_list(self):
        url = '/api/todos/'
        response = self.client.get(url)
        # test normal get
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 4)

        # test order_by("expire_date")
        self.assertEqual(response.data[0]['id'], self.done_exp.pk)
        self.assertEqual(response.data[1]['id'], self.undone_exp.pk)
        self.assertEqual(response.data[2]['id'], self.undone_unexp.pk)
        self.assertEqual(response.data[3]['id'], self.done_unexp.pk)

    def test_get_todo(self):
        url = '/api/todos/{}/'.format(self.undone_unexp.pk)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.undone_unexp.pk)
        self.assertEqual(response.data['title'], self.undone_unexp.title)
        self.assertEqual(response.data['content'], self.undone_unexp.content)
        self.assertEqual(response.data['status'], self.undone_unexp.status)
        self.assertEqual(response.data['priority'], self.undone_unexp.priority)

    def test_update_todo(self):
        url = '/api/todos/{}/'.format(self.undone_unexp.pk)
        data = {
            'title': 'title',
            'content': 'content',
            'status': TodoStatus.DONE,
            'expire_date': timezone.now() - datetime.timedelta(days=1)
        }

        # test update with expired_date < now
        origin_title = self.undone_unexp.title
        origin_content = self.undone_unexp.content
        origin_expired_date = self.undone_unexp.expire_date

        response = self.client.patch(url, data=data)
        self.undone_unexp.refresh_from_db()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(self.undone_unexp.title, origin_title)
        self.assertEqual(self.undone_unexp.content, origin_content)
        self.assertEqual(self.undone_unexp.expire_date, origin_expired_date)

        # test with valid data
        new_expire_date = timezone.now() + datetime.timedelta(days=1)
        data['expire_date'] = new_expire_date
        response = self.client.patch(url, data=data)
        self.undone_unexp.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.undone_unexp.title, data['title'])
        self.assertEqual(self.undone_unexp.content, data['content'])
        self.assertEqual(self.undone_unexp.expire_date, new_expire_date)

        # test with invalid status
        data['status'] = -1
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, 400)
        data['status'] = TodoStatus.DONE + 1
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, 400)
        data['status'] = 0.5
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, 400)

        # test with invalid priority
        data['priority'] = -1
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, 400)
        data['priority'] = TodoPriority.CASUAL + 1
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, 400)
        data['priority'] = 0.5
        response = self.client.patch(url, data=data)
        self.assertEqual(response.status_code, 400)

    def test_delete_todo(self):
        todo_pk = self.undone_unexp.pk
        url = '/api/todos/{}/'.format(todo_pk)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        todo_obj = Todo.objects.all().filter(pk=todo_pk).first()
        self.assertIsNone(todo_obj)

        # test delete non-exist pk
        non_exist_pk = Todo.objects.all().order_by('-pk').first().pk + 1
        url = '/api/todos/{}/'.format(non_exist_pk)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)

    def test_create_todo(self):
        url = '/api/todos/'
        data = {
            'title': 'test',
            'expire_date': timezone.now() - datetime.timedelta(days=1)
        }
        # test with invalid expire_date
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)

        # test with valid data
        data['expire_date'] = timezone.now() + datetime.timedelta(days=1)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Todo.objects.count(), 5)
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['status'], TodoStatus.UNDONE)
        self.assertEqual(response.data['priority'], TodoPriority.CASUAL)

        # test with invalid status
        data['status'] = TodoStatus.DONE + 1
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        data['status'] = TodoStatus.UNDONE

        data['priority'] = TodoPriority.CASUAL + 1
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
