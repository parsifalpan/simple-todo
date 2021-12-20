import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import {RouteComponentProps, useHistory} from "react-router";
import {Button, Layout, Typography, Row, Col, Form, Input, Icon, message} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {WrappedFormUtils} from 'antd/es/form/Form';
import {observer} from "mobx-react-lite";
import {AuthContext} from '../../utils/context';


import './style.css';


const {Content, Footer} = Layout;
const {Title, Paragraph} = Typography;


const Register: React.FC<Partial<FormComponentProps> & RouteComponentProps> = observer(props => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [usernameFailed, setUsernameFailed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameFailed(false);

    props.form?.validateFields((err, values) => {
      if (!err) {
        auth.register(values)
          .then(() => {
            message.success('Register success! Redirecting...');
            history.replace('/');
          }).catch(() => {
          message.error('Register failed')
          setUsernameFailed(true);
        });
      }
    });
  };

  const confirmPassword = (rule: any, value: any, callback: any) => {
    const {form} = props;
    if (value && value !== form?.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const {getFieldDecorator} = props.form as WrappedFormUtils;

  return (
    <Layout className="app-page">
      <Content className="login-container">
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={24} sm={22} md={12} lg={8} xl={6}>
            <Typography style={{textAlign: 'center', marginBottom: 36}}>
              <Title>Simple Todo</Title>
              <Paragraph type="secondary">Register as a new user</Paragraph>
            </Typography>

            <Row type="flex" justify="space-around" align="middle">
              <Col xs={20} sm={24} md={24} lg={24} xl={24}>
                <Form onSubmit={handleSubmit} className="login-form">
                  <Form.Item
                    validateStatus={usernameFailed ? "error" : undefined}
                    help={usernameFailed ? "Username already exists" : undefined}
                  >
                    {getFieldDecorator('username', {
                      rules: [{required: true, message: 'Please input your username!'}],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Username"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {required: true, message: 'Please input your Password!'},
                      ],
                    })(
                      <Input.Password
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item hasFeedback style={{marginBottom: 8}}>
                    {getFieldDecorator('confirmPassword', {
                      rules: [
                        {required: true, message: 'Please input your Password!'},
                        {validator: confirmPassword},
                      ],
                    })(
                      <Input.Password
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Confirm password"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Link to={'/login'} style={{float: 'right'}}>Log in</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Register
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
        <Icon
          type="github"
          style={{marginLeft: 8}}
          onClick={() => window.open('https://github.com/nichujie/DD2395-OpenID-Demo')}
        />
      </Footer>
    </Layout>
  );
});

const WrappedRegisterForm = Form.create({name: 'register'})(Register);

export default WrappedRegisterForm;
