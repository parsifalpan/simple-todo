import {makeAutoObservable, action} from 'mobx';
import {message} from 'antd';

import provider from '../utils/provider';

import {ITodoItem} from '../constant/Interface';
import {TodoPriority, TodoStatus} from '../constant/params';
import {AxiosResponse} from "axios";

const checkExpired = (todo: ITodoItem): boolean => {
  const now = new Date();
  const expire_date = new Date(Date.parse(todo.expire_date));
  return expire_date < now;
};

export class TodoStore {
  constructor() {
    makeAutoObservable(this)
  }

  todoList: ITodoItem[] = [];
  showType: string = 'undone';
  detailModalVisible: boolean = false;
  editingTodo: ITodoItem | null = null;

  get undoneTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return (todo.status === TodoStatus.UNDONE) &&
        !checkExpired(todo);
    });
  }

  get doneTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return todo.status === TodoStatus.DONE;
    });
  }

  get expiredTodoList(): ITodoItem[] {
    return this.todoList.filter((todo) => {
      return (todo.status === TodoStatus.UNDONE) &&
        checkExpired(todo);
    });
  }

  get showTodoList(): ITodoItem[] {
    if (this.showType === 'undone') return this.undoneTodoList;
    if (this.showType === 'done') return this.doneTodoList;
    if (this.showType === 'expired') return this.expiredTodoList;
    return this.todoList;
  }

  fetchTodoList = (): void => {
    provider.getInstance().get('/todos/')
      .then((response: AxiosResponse) => {
        this.todoList = response.data;
      })
      .catch(() => {
        message.error("Failed to get TODOs");
      })
  };

  sortByPriority = (): void => {
    this.todoList = this.todoList.slice().sort((a, b): number => {
      return a.priority - b.priority;
    })
  };

  sortByExpireDate = (): void => {
    this.todoList = this.todoList.slice().sort((a, b): number => {
      const date1 = Date.parse(a.expire_date);
      const date2 = Date.parse(b.expire_date);
      return date1 - date2;
    });
  };

  updateEditingTodoItem = (todo: object) => {
    return provider.getInstance().patch(`/todos/${this.editingTodo?.id}/`, todo)
      .then(() => {
        this.closeDetailModal();
        this.fetchTodoList();
      })
      .catch(() => {
        message.error('Update failed!');
      })
  };

  deleteTodoItem = (todo: ITodoItem) => {
    return provider.getInstance().delete(`/todos/${todo.id}/`)
      .then(() => {
        this.fetchTodoList();
      })
      .catch(() => {
        message.error('Delete failed!');
      })
  };

  @action markAsDone = (todo: ITodoItem) => {
    return provider.getInstance().patch(`/todos/${todo.id}/`,
      {status: TodoStatus.DONE})
      .then(() => {
        this.fetchTodoList();
      })
      .catch(() => {
        message.error('Done failed!');
      })
  };

  raisePriority = (todo: ITodoItem): void => {
    provider.getInstance().patch(`/todos/${todo.id}/`,
      {priority: todo.priority - 1})
      .then(res => {
        this.fetchTodoList();
      })
      .catch(err => {
        if (err?.response?.status === 400) {
          message.error('Cannot raise priority anymore!');
        } else {
          message.error('Raise priority failed!');
        }
      })
  };

  reducePriority = (todo: ITodoItem): void => {
    provider.getInstance().patch(`/todos/${todo.id}/`,
      {priority: todo.priority + 1})
      .then(() => {
        this.fetchTodoList();
      })
      .catch(err => {
        if (err?.response?.status === 400) {
          message.error('Cannot reduce priority anymore!');
        } else {
          message.error('Reduce priority failed!');
        }
      })
  };

  quickCreateTodo = (title: string): void => {
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
        message.success('Success!');
      })
      .catch(() => {
        message.error('Create failed!');
      })
  };

  showDetailModal = (todo: ITodoItem): void => {
    this.editingTodo = todo;
    this.detailModalVisible = true;
  };

  closeDetailModal = (): void => {
    this.detailModalVisible = false;
    this.editingTodo = null;
  };
}
