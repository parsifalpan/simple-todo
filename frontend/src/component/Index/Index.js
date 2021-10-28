import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Container, Row} from "react-bootstrap";
import './Index.css'

class Index extends Component {
  render() {
    return (
      <Container className="index">
        <Row>
          <h1 className="main-title">A Simple Todo App</h1>
        </Row>
        <Row>
          <Link to="/todos">
            <Button size="xl">Start To Do ...</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default Index;
