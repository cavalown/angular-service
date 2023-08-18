import { createAction, props, Action } from '@ngrx/store';
import { Todo } from './todos.model';

export const createTodo = createAction(
  '[Todos] CreateTodo',
  props<{ todo: Todo }>()
);
export const deleteTodo = createAction(
  '[Todos] DeleteTodo',
  props<{ index: number }>()
);
export const updateTodo = createAction(
  '[Todos] UpdateTodo',
  props<{ index: number; todo: Todo }>()
);

// export const CreateTodo = '[Todos] CreateTodo'

// export class CreateTodoAction implements Action {
//   readonly type: string = CreateTodo;

//   constructor(public todo: Todo) {}
// }

// export type TodoActions = CreateTodoAction;
