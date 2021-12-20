import React, {useEffect, useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {observer} from "mobx-react-lite";

import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Profile from '../../pages/Profile';
import {AuthContext} from '../../utils/context';

const App: React.FC = observer(() => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    auth.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
    </Router>
  );
});

export default App;
