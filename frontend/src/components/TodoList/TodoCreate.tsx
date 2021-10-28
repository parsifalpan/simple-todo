import React, {Component, FormEvent} from "react";
import {Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/es/form';

import TodoStore from '../../store/TodoStore';

interface TodoCreateProps extends FormComponentProps {
  title: string
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TodoCreate extends Component<TodoCreateProps, any> {
  componentDidMount(): void {
    this.props.form.validateFields();
  }

  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err: object, values: { title: string }) => {
      if (!err) {
        TodoStore.quickCreateTodo(values.title);
        this.props.form.resetFields();
      }
    });
  };


  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{required: true, message: '请输入标题！'}],
          })(
            <Input placeholder="输入标题快速创建待办事项..." style={{width: 600}}/>,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            创建
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTodoCreate = Form.create({name: 'todo_create'})(TodoCreate);

export default WrappedTodoCreate;