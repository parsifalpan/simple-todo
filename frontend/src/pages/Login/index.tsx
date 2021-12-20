import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {RouteComponentProps, useHistory} from "react-router";
import {Button, Layout, Typography, Row, Col, Form, Input, Divider, Icon, message, notification} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {WrappedFormUtils} from 'antd/es/form/Form';
import {observer} from "mobx-react-lite";
import {GoogleLogin} from 'react-google-login';
import {AuthContext} from '../../utils/context';

import './style.css';


const {Content, Footer} = Layout;
const {Title, Paragraph, Text} = Typography;


const Login: React.FC<Partial<FormComponentProps> & RouteComponentProps> = observer(props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props?.form?.validateFields((err, values) => {
      if (!err) {
        auth.simpleLogin(values).then(() => {
          message.success('Login succeesfully');
          history.replace('/');
        }).catch(() => {
          notification.error({
            message: 'Login Failed',
            description:
              'Wrong username or password',
          });
        })
      }
    });
  };

  const onSignIn = (e: any) => {
    auth.googleAuth({id_token: e.tokenId})
      .then(() => {
        message.success('Google auth succeeded! Redirecting...')
        history.replace('/');
      })
      .catch(() => {
        message.error('Google auth failed')
      })
  }

  const {getFieldDecorator} = props.form as WrappedFormUtils;

  return (
    <Layout className="app-page">
      <Content className="login-container">
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={24} sm={22} md={12} lg={8} xl={6}>
            <Typography style={{textAlign: 'center', marginBottom: 36}}>
              <Title>Simple Todo</Title>
              <Paragraph type="secondary">Log in to record Todos</Paragraph>
            </Typography>

            <Row type="flex" justify="space-around" align="middle">
              <Col xs={20} sm={24} md={24} lg={24} xl={24}>
                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{required: true, message: 'Please input your username!'}],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Username"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item style={{marginBottom: 8}}>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Link to={'/register'} style={{float: 'right'}}>Register now</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                    <Divider>
                      <Text type="secondary" style={{fontSize: 14}}>Third Party Auth</Text>
                    </Divider>
                    <div className="google-button">
                      <GoogleLogin
                        clientId="690489001243-5spb7ars2v8uk7aae8eq89vgmbf43t26.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={onSignIn}
                        onFailure={(res) => {
                          message.error('Google auth failed');
                        }}
                        cookiePolicy={'single_host_origin'}
                        style={{
                          lineHeight: 'normal'
                        }}
                      />
                    </div>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
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
  );
});

const WrappedLoginForm = Form.create({name: 'normal_login'})(Login);

export default WrappedLoginForm;
