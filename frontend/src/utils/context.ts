import { createContext } from 'react';

import { AuthStore } from "../store/AuthStore";
import { TodoStore } from "../store/TodoStore";

export const AuthContext = createContext<AuthStore>(new AuthStore());
export const TodoContext = createContext<TodoStore>(new TodoStore());
