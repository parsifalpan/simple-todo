import React, { useContext } from "react";
import { Icon, Menu } from "antd";
import { observer } from "mobx-react-lite";

import { TodoContext } from '../../utils/context';

interface IMenuClick {
  key: string
}


const TodoCategory: React.FC = observer(() => {
  const todo = useContext(TodoContext);

  const handleClick = (e: IMenuClick) => {
    todo.showType = e.key;
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['undone']}
      mode="inline"
      onClick={handleClick}
    >
      <Menu.Item key="undone">
        <Icon type="clock-circle"/>
        <span>Ongoing</span>
      </Menu.Item>
      <Menu.Item key="done">
        <Icon type="check-circle"/>
        <span>Done</span>
      </Menu.Item>
      <Menu.Item key="expired">
        <Icon type="exclamation-circle"/>
        <span>Overdue</span>
      </Menu.Item>
    </Menu>
  );
});


export default TodoCategory;