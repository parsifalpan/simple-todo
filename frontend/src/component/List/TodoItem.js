import React, {Component} from 'react';
import axios from 'axios';
import {ButtonGroup, Button, Dropdown, Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import api from '../../api';

class TodoItem extends Component {

  markAsDone = () => {
    const id = this.props.item.id;
    axios({
      method: 'PUT',
      url: api + 'todo/' + String(id),
      data: {
        status: 1
      }
    }).then((response) => {
      this.props.refresh();
    });
  };

  deleteItem = () => {
    const id = this.props.item.id;
    axios({
      method: 'DELETE',
      url: api + 'todo/' + String(id),
    }).then((response) => {
      this.props.refresh();
    });
  };

  raisePriority = () => {
    const id = this.props.item.id;
    const priority = this.props.item.priority;
    if (priority >= 3) return false;
    else {
      axios({
        method: 'PUT',
        url: api + 'todo/' + String(id),
        data: {
          priority: priority + 1
        }
      }).then((response) => {
        this.props.refresh();
      });
    }
  };

  render() {
    const statusColor = ['#cce5ff', '#d4edda', '#fff3cd', '#f8d7da'];
    const mstyle = {
      borderLeftColor: statusColor[this.props.item.priority]
    };
    let settings = null;
    if (this.props.item.status === 0) {
      settings = <Dropdown as={ButtonGroup} drop="right">
        <Button variant="primary" onClick={this.markAsDone}>Mark As Done</Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"/>

        <Dropdown.Menu>
          <Dropdown.Item onClick={this.deleteItem}>Delete</Dropdown.Item>
          <Dropdown.Item onClick={this.raisePriority}>Raise Priority</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    } else {
      settings = <Button variant="primary" onClick={this.deleteItem}>Delete</Button>;
    }

    return (
      <Container className="todo-container">
        <Row className="todo-content" style={mstyle}>
          <Col>
            <Link to={{
              pathname: "/todos/detail",
              state: {item: this.props.item}
            }}><h4>{this.props.item.title}</h4></Link>
          </Col>
          <Col md="auto">
            {settings}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TodoItem;
