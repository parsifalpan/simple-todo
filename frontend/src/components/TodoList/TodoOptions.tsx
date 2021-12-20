import React, {useContext} from "react";
import {Button, Dropdown, Menu} from "antd";
import { observer } from "mobx-react-lite";

import {ITodoItem} from '../../constant/Interface';
import {TodoStatus} from "../../constant/params";
import { TodoContext } from '../../utils/context';

interface OptionProps {
  todo: ITodoItem
}


const TodoOptions: React.FC<OptionProps> = observer(props => {
  const todoStore = useContext(TodoContext);

  const renderMenu = (todo: ITodoItem) => {
    return (
      <Menu>
        <Menu.Item key="edit" onClick={() => {
          todoStore.showDetailModal(todo);
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="raisePriority" onClick={() => {
          todoStore.raisePriority(todo);
        }}>
          Raise Priority
        </Menu.Item>
        <Menu.Item key="reducePriority" onClick={() => {
          todoStore.reducePriority(todo);
        }}>
          Reduce Priority
        </Menu.Item>
        <Menu.Item key="delete" onClick={() => {
          todoStore.deleteTodoItem(todo);
        }}>
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  if (props.todo.status === TodoStatus.UNDONE) return (
    <Dropdown.Button
      type="primary"
      overlay={renderMenu(props.todo)}
      onClick={() => {
        todoStore.markAsDone(props.todo);
      }}
    >
      Done!
    </Dropdown.Button>
  );

  return (
    <Button type="danger" onClick={() => {
      todoStore.deleteTodoItem(props.todo)
    }}>
      Delete
    </Button>
  )
});

export default TodoOptions;