class TodoStatus(object):
    UNDONE = 0
    DONE = 1


class TodoPriority(object):
    URGENT = 0
    MEDIUM = 1
    NORMAL = 2
    CASUAL = 3


TODO_STATUS_CHOICES = (
    (TodoStatus.UNDONE, '未完成'),
    (TodoStatus.DONE, '完成'),
)

TODO_PRIORITY_CHOICES = (
    (TodoPriority.URGENT, '优先级1'),
    (TodoPriority.MEDIUM, '优先级2'),
    (TodoPriority.NORMAL, '优先级3'),
    (TodoPriority.CASUAL, '优先级4')
)
