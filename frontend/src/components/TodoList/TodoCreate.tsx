import React, {useContext, FormEvent, useEffect} from "react";
import {Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/es/form';

import { TodoContext } from '../../utils/context';


interface TodoCreateProps extends FormComponentProps {
  title: string
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const TodoCreate: React.FC<TodoCreateProps> = props => {
  const todo = useContext(TodoContext);

  useEffect(() => {
    props.form.validateFields();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    props.form.validateFields((err: object, values: { title: string }) => {
      if (!err) {
        todo.quickCreateTodo(values.title);
        props.form.resetFields();
      }
    });
  };

  const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = props.form;

  const titleError = isFieldTouched('title') && getFieldError('title');
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
        {getFieldDecorator('title', {
          rules: [{required: true, message: 'Please enter a title'}],
        })(
          <Input placeholder="Type down title to create a TODO quickly..." style={{width: 600}}/>,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

const WrappedTodoCreate = Form.create({name: 'todo_create'})(TodoCreate);

export default WrappedTodoCreate;