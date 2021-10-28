import React, {Component} from 'react';
import axios from 'axios';
import {Tabs, Container, Tab, Form, Button, Row} from "react-bootstrap";
import TodoItem from "./TodoItem";
import './List.css'
import api from '../../api';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      undone: [],
      done: [],
      isSortedByPriority: false
    };
  }

  onTitleChange = (e) => {
    e.preventDefault();
    this.setState({title: e.target.value});
  };

  getTodoList = () => {
    axios({
      method: 'GET',
      url: api + 'todo/',
    }).then((response) => {
      let done = [];
      let undone = [];
      for (let item of response.data) {
        if (item.status === 1) {
          done.unshift(item);
        } else {
          undone.unshift(item);
        }
      }

      this.setState({
        done: done,
        undone: undone
      })
    });
  };

  createItem = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: api + 'todo/',
      data: {
        title: this.state.title
      }
    }).then((response) => {
      this.setState((prevState, props) => {
        let undone = prevState.undone;
        undone.unshift(response.data);
        return {
          undone: undone,
          title: ''
        }
      });
    });
  };

  sortByPriority = (e) => {
    this.setState((prevState, props) => {
      let undone = prevState.undone;
      undone.sort((a, b) => {
        return b.priority - a.priority;
      });
      return {
        isSortedByPriority: true,
        undone: undone
      }
    });
  };

  render() {
    return (
      <Container>
        <h1 className="todo-title">Todo List</h1>
        <Form onSubmit={(e) => this.createItem(e)}>
          <Form.Group controlId="form.title">
            <Form.Control value={this.state.title} onChange={this.onTitleChange}
                          placeholder="type down things and press Enter to create items quickly..." size="lg"/>
          </Form.Group>
        </Form>
        <Tabs defaultActiveKey="undone"
              onSelect={this.getTodoList}>
          <Tab eventKey="undone" title="Undone">
            <Container>
              <Row className="sort-button">
                <Button onClick={this.sortByPriority}>Sort By Priority</Button>
              </Row>
              {
                this.state.undone.map((item) => {
                    if (item.status === 0)
                      return <TodoItem item={item} key={item.id} refresh={() => {
                        this.getTodoList()
                      }}/>;
                    else
                      return null;
                  }
                )
              }
            </Container>
          </Tab>
          <Tab eventKey="done" title="Done">
            <Container>
              {
                this.state.done.map((item) => {
                    if (item.status === 1)
                      return <TodoItem item={item} key={item.id} refresh={() => {
                        this.getTodoList()
                      }}/>;
                    else
                      return null;
                  }
                )
              }
            </Container>
          </Tab>
        </Tabs>

      </Container>
    );
  }

  componentDidMount() {
    this.getTodoList()
  }
}

export default List;
