import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';

import App from './pages/App';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import 'antd/dist/antd.css';

import { AuthStore } from "./store/AuthStore";
import { TodoStore } from "./store/TodoStore";
import { AuthContext, TodoContext } from "./utils/context";

moment.locale('zh-cn');

ReactDOM.render(
    <AuthContext.Provider value={new AuthStore()}>
        <TodoContext.Provider value={new TodoStore()}>
            <App/>
        </TodoContext.Provider>
    </AuthContext.Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
