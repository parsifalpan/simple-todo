import moment from 'moment';
import { observer } from "mobx-react-lite";
import React, {useContext, FormEvent, useEffect} from "react";
import {FormComponentProps} from "antd/es/form";
import {Form, Button, Col, Row, Input, Select, DatePicker} from 'antd';

import { TodoContext } from '../../utils/context';
import {TodoPriority} from "../../constant/params";
import {ITodoItem} from "../../constant/Interface";

import './TodoDetail.css';

const {Option} = Select;
const {TextArea} = Input;

interface TodoDetailProps extends FormComponentProps {
  title: string,
  content: string,
  status: number,
  priority: number,
  expire_date: object
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function disabledDate(current: any): boolean {
  return current && current < moment().endOf('day');
}


const TodoDetailForm: React.FC<TodoDetailProps> = observer(props => {
  const todoStore = useContext(TodoContext);

  useEffect(() => {
    const { form } = props;
    const todo = todoStore.editingTodo;
    let expire_date;
    if (todo?.expire_date) {
      expire_date = moment(Date.parse(todo?.expire_date));
    } else {
      expire_date = null;
    }

    form.validateFields();
    form.setFieldsValue({
      title: todo?.title,
      content: todo?.content,
      priority: todo?.priority,
      expire_date: expire_date
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    props.form.validateFields((err: object, values: ITodoItem) => {
      if (!err) {
        todoStore.updateEditingTodoItem(values);
      }
    });
  };


  const {getFieldDecorator, getFieldsError} = props.form;

  return (
    <div>
      <Form layout="vertical" hideRequiredMark>
        <Row>
          <Col span={24}>
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{required: true, message: 'Please enter title'}],
              })(<Input/>)}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item label="Content">
              {getFieldDecorator('content')(<TextArea rows={4} placeholder="Describe your TODO..."/>)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={10}>
            <Form.Item label="Priority">
              {getFieldDecorator('priority', {
                rules: [{required: true, message: 'Please select priority'}],
              })(
                <Select>
                  <Option value={TodoPriority.URGENT}>P0</Option>
                  <Option value={TodoPriority.MEDIUM}>P1</Option>
                  <Option value={TodoPriority.NORMAL}>P2</Option>
                  <Option value={TodoPriority.CASUAL}>P3</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item label="Expire Date">
              {getFieldDecorator('expire_date', {
                rules: [{required: true, message: 'Please select expire date'}],
              })(
                <DatePicker
                  showTime
                  placeholder="Select time"
                  disabledDate={disabledDate}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="todo-detail-modal-button">
        <Button onClick={todoStore.closeDetailModal} style={{marginRight: 8}}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="primary" disabled={hasErrors(getFieldsError())}>
          Save
        </Button>
      </div>
    </div>
  );
});


export default Form.create({name: 'todo_detail'})(TodoDetailForm);

