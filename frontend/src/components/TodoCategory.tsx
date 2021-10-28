import React, {Component} from "react";
import {Icon, Menu} from "antd";

import TodoStore from '../store/TodoStore';

interface IMenuClick {
  key: string
}

let handleClick = (e: IMenuClick) => {
  TodoStore.showType = e.key;
};

const TodoCategory: React.FC = () => {
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['undone']}
      mode="inline"
      onClick={handleClick}
    >
      <Menu.Item key="undone">
        <Icon type="clock-circle"/>
        <span>未完成</span>
      </Menu.Item>
      <Menu.Item key="done">
        <Icon type="check-circle"/>
        <span>已完成</span>
      </Menu.Item>
      <Menu.Item key="expired">
        <Icon type="exclamation-circle"/>
        <span>已过期</span>
      </Menu.Item>
    </Menu>
  );
};


export default TodoCategory;