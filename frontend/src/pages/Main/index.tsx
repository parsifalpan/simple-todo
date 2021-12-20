import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {Button, Layout, Radio, Row, Dropdown, Icon, Menu, message} from 'antd';
import {RadioChangeEvent} from "antd/es/radio";
import {observer} from "mobx-react-lite";
import {useGoogleLogout} from 'react-google-login'

import TodoList from "../../components/TodoList";
import TodoCategory from "../../components/TodoCategory";
import TodoCreate from "../../components/TodoList/TodoCreate";
import {AuthContext, TodoContext} from '../../utils/context';

import './style.css';


const {Header, Content, Sider, Footer} = Layout;

const TodoApp: React.FC = observer(() => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const todo = useContext(TodoContext);
  const [sortBy, setSortBy] = useState<boolean>(false);

  useEffect(() => {
    todo.fetchTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSortChange = (e: RadioChangeEvent) => {
    setSortBy(e.target.value);
    if (e.target.value === 'expire') todo.sortByExpireDate();
    else todo.sortByPriority();
  };

  const onLogout = () => {
    auth.logout()
      .then(() => {
        message.success('Logout');
        history.push('/login');
      })
      .catch(() => {
        message.error('Logout failed!');
      })
  }

  const {signOut} = useGoogleLogout({
    clientId: '690489001243-5spb7ars2v8uk7aae8eq89vgmbf43t26.apps.googleusercontent.com',
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: () => {
      onLogout();
    },
    onFailure: () => {
      onLogout();
    }
  });

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={signOut as any} href="#">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="app-page">
      <Sider>
        <TodoCategory/>
      </Sider>
      <Layout>
        <Header className="app-header">
          <Row type="flex" justify="space-between" align="middle">
            <span>A Simple Todo App</span>
            {auth.user ?
              <Dropdown overlay={menu}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={e => e.preventDefault()} style={{fontSize: 14}}>
                  Hi, {auth.nickname} <Icon type="down"/>
                </a>
              </Dropdown>
              : <Button type="primary" ghost={true} style={{float: "right"}} onClick={() => history.push('/login')}>Sign
                in</Button>}
          </Row>
        </Header>
        <Content className="app-container">
          <div className="app-create-content">
            <TodoCreate/>
          </div>
          <div className="app-content">
            <Row>
              <div className="sort-button-group">
                <span>Sort By: </span>
                <Radio.Group value={sortBy} onChange={handleSortChange}>
                  <Radio.Button value="expire">Expiration</Radio.Button>
                  <Radio.Button value="priority">Priority</Radio.Button>
                </Radio.Group>
              </div>
            </Row>
            <Row>
              <TodoList/>
            </Row>
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          DD2395 LabS G64 ©2021 Created by Chujie Ni
          <Icon
            type="github"
            style={{marginLeft: 8}}
            onClick={() => window.open('https://github.com/nichujie/DD2395-OpenID-Demo')}
          />
        </Footer>
      </Layout>
    </Layout>
  );
});

export default TodoApp;
