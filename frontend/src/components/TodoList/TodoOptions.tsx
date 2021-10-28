import React, {Component} from "react";
import {Button, Dropdown, Menu} from "antd";

import {ITodoItem} from '../../constant/Interface';
import {TodoStatus} from "../../constant/params";
import TodoStore from "../../store/TodoStore";

interface OptionProps {
  todo: ITodoItem
}


class TodoOptions extends Component<OptionProps, any> {
  renderMenu = (todo: ITodoItem) => {
    return (
      <Menu>
        <Menu.Item key="edit" onClick={() => {
          TodoStore.showDetailModal(todo);
        }}>
          编辑
        </Menu.Item>
        <Menu.Item key="raisePriority" onClick={() => {
          TodoStore.raisePriority(todo);
        }}>
          提升优先级
        </Menu.Item>
        <Menu.Item key="reducePriority" onClick={() => {
          TodoStore.reducePriority(todo);
        }}>
          降低优先级
        </Menu.Item>
        <Menu.Item key="delete" onClick={() => {
          TodoStore.deleteTodoItem(todo);
        }}>
          删除
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    if (this.props.todo.status === TodoStatus.UNDONE) return (
      <Dropdown.Button
        type="primary"
        overlay={this.renderMenu(this.props.todo)}
        onClick={() => {
          TodoStore.markAsDone(this.props.todo);
        }}
      >
        完成!
      </Dropdown.Button>
    );
    return (
      <Button type="danger" onClick={() => {
        TodoStore.deleteTodoItem(this.props.todo)
      }}>
        删除
      </Button>
    )
  }
}

export default TodoOptions;