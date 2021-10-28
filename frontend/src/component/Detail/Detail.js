import React, {Component} from 'react';
import {Form, Button, Container} from "react-bootstrap";
import axios from "axios";

class Detail extends Component {
  constructor(props) {
    super(props);
    const item = this.props.location.state.item;
    this.state = {
      id: item.id,
      title: item.title,
      content: item.content || 'Example',
      status: item.status,
      priority: item.priority,
      createdTime: item.created_at
    };
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  updateItem = (e) => {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: 'http://127.0.0.1:8000/todo/' + String(this.state.id),
      data: {
        title: this.state.title,
        content: this.state.content,
        status: this.state.status,
        priority: this.state.priority
      }
    }).then((response) => {
      this.props.history.push('/todos')
    }).catch(function (error) {
      if (error.response.status === 400) {
        alert("Make sure all fields are not empty!")
      }
    });
  };

  onTitleChange = (e) => {
    this.setState({title: e.target.value});
  };

  onContentChange = (e) => {
    this.setState({content: e.target.value});
  };

  onPriorityChange = (e) => {
    this.setState({priority: e.target.value});
  };

  render() {
    return (
      <Container>
        <h1>Detail</h1>
        <Form>
          <Form.Group controlId="form.title">
            <Form.Label>Title</Form.Label>
            <Form.Control value={this.state.title} onChange={this.onTitleChange} required/>
            <Form.Label>Content</Form.Label>
            <Form.Control value={this.state.content} onChange={this.onContentChange} as="textarea" rows="3" required/>
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value={this.state.priority} onChange={this.onPriorityChange} required>
              <option value={0}>Casual</option>
              <option value={1}>Coming</option>
              <option value={2}>Pressing</option>
              <option value={3}>Emergency</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.updateItem}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Detail;
