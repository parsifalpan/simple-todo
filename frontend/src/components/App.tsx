import React, {Component} from 'react';
import {Layout, Radio, Row} from 'antd';
import {RadioChangeEvent} from "antd/es/radio";
import {observer} from "mobx-react";

import TodoStore from '../store/TodoStore';
import TodoList from "./TodoList";
import TodoCategory from "./TodoCategory";
import TodoCreate from "./TodoList/TodoCreate";

import './App.css';


const {Header, Content, Sider} = Layout;

@observer
class TodoApp extends Component<any, { sortBy: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      sortBy: 'expire',
    }
  }

  componentDidMount() {
    TodoStore.fetchTodoList();
  }

  handleSortChange = (e: RadioChangeEvent) => {
    this.setState({sortBy: e.target.value});
    if (e.target.value === 'expire') TodoStore.sortByExpireDate();
    else TodoStore.sortByPriority();
  };

  render() {
    return (
      <Layout className="app-page">
        <Sider>
          <TodoCategory/>
        </Sider>
        <Layout>
          <Header className="app-header">
            A Simple Todo App
          </Header>
          <Content className="app-container">
            <div className="app-create-content">
              <TodoCreate/>
            </div>
            <div className="app-content">
              <Row>
                <div className="sort-button-group">
                  <Radio.Group value={this.state.sortBy} onChange={this.handleSortChange}>
                    <Radio.Button value="expire">按日期排序</Radio.Button>
                    <Radio.Button value="priority">按优先级排序</Radio.Button>
                  </Radio.Group>
                </div>
              </Row>
              <Row>
                <TodoList/>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default TodoApp;
