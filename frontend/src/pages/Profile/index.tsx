import React, {useContext, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {Button, Layout, Typography, Row, Col, Form, Input, message, Dropdown, Icon, Menu} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {WrappedFormUtils} from 'antd/es/form/Form';
import {observer} from "mobx-react-lite";
import {AuthContext} from '../../utils/context';

import './style.css';
import {useGoogleLogout} from "react-google-login";


const {Header, Content, Footer} = Layout;
const {Title} = Typography;


const Profile: React.FC<Partial<FormComponentProps> & RouteComponentProps> = observer(props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const {form} = props;
    if (auth.user) {
      form?.setFieldsValue(auth.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props?.form?.validateFields((err, values) => {
      if (!err) {
        auth.updateProfile(values).then(() => {
          message.success('Update succeesfully');
        }).catch(() => {
          message.success('Update failed');
        })
      }
    });
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

  const {getFieldDecorator} = props.form as WrappedFormUtils;

  return (
    <Layout className="app-page">
      <Header className="app-header">
        <Row type="flex" justify="space-between" align="middle">
          <span><Icon type="arrow-left" style={{marginRight: 8}}
                      onClick={() => history.push('/')}/> A Simple Todo App</span>
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
      <Content className="login-container">
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={24} sm={22} md={12} lg={8} xl={6}>
            <Typography style={{textAlign: 'center', marginBottom: 36}}>
              <Title>Simple Profile</Title>
            </Typography>

            <Row type="flex" justify="space-around" align="middle">
              <Col xs={20} sm={24} md={24} lg={24} xl={24}>
                <Form layout="vertical" onSubmit={handleSubmit}>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="Username">
                        {getFieldDecorator('username')(<Input disabled/>)}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item label="Email">
                        {getFieldDecorator('email')(<Input/>)}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="First Name">
                        {getFieldDecorator('first_name')(<Input/>)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Last Name">
                        {getFieldDecorator('last_name')(<Input/>)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Save Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        DD2395 LabS G64 ©2021 Created by Chujie Ni
      </Footer>
    </Layout>
  );
});

const WrappedProfileForm = Form.create({name: 'profile'})(Profile);

export default WrappedProfileForm;
