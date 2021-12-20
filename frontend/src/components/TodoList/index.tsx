import React, {useContext} from "react";
import { observer } from "mobx-react-lite";
import {List, Tag} from 'antd';
import mm from 'moment';

import { TodoContext } from '../../utils/context';
import {ITodoItem} from "../../constant/Interface";
import {PriorityText, PriorityColors} from "../../constant/params";

import TodoOptions from "./TodoOptions";
import TodoDetailDrawer from "../TodoDetail/TodoDetailDrawer";


const TodoList: React.FC = observer(() => {
  const todo = useContext(TodoContext);

  const renderPriority = (todo: ITodoItem) => {
    return <Tag color={PriorityColors[todo.priority]}>
      {PriorityText[todo.priority]}
    </Tag>
  };

  const renderTodoListItem = (item: ITodoItem) => {
    const expire_date = new Date(Date.parse(item.expire_date));
    const timeString = mm(expire_date).format('YYYY-MM-DD HH:mm:ss');
    return (
      <List.Item actions={[<TodoOptions todo={item}/>]}>
        <List.Item.Meta
          title={<div>{item.title + '  '}{renderPriority(item)}</div>}
          description={timeString}
        />
      </List.Item>
    )
  };

  const todoList = todo.showTodoList;

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={todoList}
        renderItem={item => renderTodoListItem(item)}
      />
      <TodoDetailDrawer/>
    </div>
  )
});

export default TodoList;