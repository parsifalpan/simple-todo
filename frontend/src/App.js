import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import List from './component/List/List';
import Detail from './component/Detail/Detail';
import Index from "./component/Index/Index";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Index} />
          <Route path="/todos" exact component={List}/>
          <Route path="/todos/detail" component={Detail}/>
        </div>
      </Router>
    );
  }
}

export default App;
