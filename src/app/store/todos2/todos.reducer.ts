import { createReducer, on, Action } from '@ngrx/store';
import {
  CreateTodo,
  CreateTodoAction,
  TodoActions,
  createTodo,
} from './todos.actions';
import { Todo } from './todos.model';

const initialState: Todo[] = [];

// export const todosReducer = createReducer(
//   initialState,
//   on(createTodo, (state, action) => [...state, action.todo])
// );

export function todosReducer(
  state = initialState,
  action: TodoActions | Action
) {
  if (action.type === CreateTodo) {
    return [...state, (action as CreateTodoAction).todo];
  }
  return state;
}
