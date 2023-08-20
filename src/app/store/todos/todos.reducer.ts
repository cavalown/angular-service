import { createReducer, on, Action } from '@ngrx/store';
import {
  createTodo,
  deleteTodo,
  updateTodo,
} from './todos.actions';
import { Todo } from './todos.model';
import { state } from '@angular/animations';

const initialState: Todo[] = [];

export const todosReducer = createReducer(
  initialState,
  on(createTodo, (state, action) => [...state, action.todo]),
  on(updateTodo, (state, action) =>
  state.map((todo, index) => (index === action.index ? action.todo : todo))
  ),
  on(deleteTodo, (state, action) => state.filter((todo, index) => index !== action.index))
);
