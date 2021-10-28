import {action, computed, observable} from 'mobx';
import {message} from 'antd';

import provider from '../utils/provider';

import {ITodoItem} from '../constant/Interface';
import {TodoPriority, TodoStatus} from '../constant/params';
import {AxiosError, AxiosResponse} from "axios";

const checkExpired = (todo: ITodoItem): boolean => {
  const now = new Date();
  const expire_date = new Date(Date.parse(todo.expire_date));
  return expire_date < now;
};

class TodoStore {
  @observable todoList: ITodoItem[] = [];
  @observable showType: string = 'undone';
  @observable detailModalVisible: boolean = false;
  @observable editingTodo: ITodoItem | null = null;

  @computed get undoneTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return (todo.status === TodoStatus.UNDONE) &&
        !checkExpired(todo);
    });
  }

  @computed get doneTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return todo.status === TodoStatus.DONE;
    });
  }

  @computed get expiredTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return (todo.status === TodoStatus.UNDONE) &&
        checkExpired(todo);
    });
  }

  @computed get showTodoList(): ITodoItem[] {
    if (this.showType === 'undone') return this.undoneTodoList;
    if (this.showType === 'done') return this.doneTodoList;
    if (this.showType === 'expired') return this.expiredTodoList;
    return this.todoList;
  }

  @action fetchTodoList = (): void => {
    provider.getInstance().get('/todos/')
      .then((response: AxiosResponse) => {
        this.todoList = response.data;
      })
      .catch(() => {
        message.error("获取待办事项失败！");
      })
  };

  @action sortByPriority = (): void => {
    this.todoList = this.todoList.slice().sort((a, b): number => {
      return a.priority - b.priority;
    })
  };

  @action sortByExpireDate = (): void => {
    this.todoList = this.todoList.slice().sort((a, b): number => {
      const date1 = Date.parse(a.expire_date);
      const date2 = Date.parse(b.expire_date);
      return date1 - date2;
    });
  };

  @action updateEditingTodoItem = (todo: object) => {
    return provider.getInstance().patch(`/todos/${this.editingTodo?.id}/`, todo)
      .then(() => {
        this.closeDetailModal();
        this.fetchTodoList();
        message.success('更新事项成功！');
      })
      .catch(() => {
        message.error('更新事项失败！');
      })
  };

  @action deleteTodoItem = (todo: ITodoItem) => {
    return provider.getInstance().delete(`/todos/${todo.id}/`)
      .then(() => {
        this.fetchTodoList();
        message.success('删除事项成功！');
      })
      .catch(() => {
        message.error('删除事项失败！');
      })
  };

  @action markAsDone = (todo: ITodoItem) => {
    return provider.getInstance().patch(`/todos/${todo.id}/`,
      {status: TodoStatus.DONE})
      .then(() => {
        this.fetchTodoList();
        message.success('完成事项！');
      })
      .catch(() => {
        message.error('完成事项失败！');
      })
  };

  @action raisePriority = (todo: ITodoItem): void => {
    provider.getInstance().patch(`/todos/${todo.id}/`,
      {priority: todo.priority - 1})
      .then(() => {
        this.fetchTodoList();
      })
      .catch(() => {
        message.error('提升事项优先级失败！');
      })
  };

  @action reducePriority = (todo: ITodoItem): void => {
    provider.getInstance().patch(`/todos/${todo.id}/`,
      {priority: todo.priority + 1})
      .then(() => {
        this.fetchTodoList();
      })
      .catch(() => {
        message.error('降低事项优先级失败！');
      })
  };

  @action quickCreateTodo = (title: string): void => {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    let todo: ITodoItem = {
      title: title,
      content: '',
      status: TodoStatus.UNDONE,
      priority: TodoPriority.CASUAL,
      expire_date: nextDay.toISOString()
    };
    provider.getInstance().post('/todos/', todo)
      .then(() => {
        this.fetchTodoList();
        message.success('创建事项成功！');
      })
      .catch(() => {
        message.error('创建事项失败！');
      })
  };

  @action showDetailModal = (todo: ITodoItem): void => {
    this.editingTodo = todo;
    this.detailModalVisible = true;
  };

  @action closeDetailModal = (): void => {
    this.detailModalVisible = false;
    this.editingTodo = null;
  };
}

const todoStore = new TodoStore();

export default todoStore;