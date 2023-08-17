import { Action } from 'mycena-store';
import { Todos } from './todos.model';

export const ReducerActionMap = {
  TestTodos: '[Todos] Testing Todos',
};

export const EffectActionMap = {
  CreateTodo: '[Todos] Create Todo',
  ReadTodos: '[Todos] Read Todos',
  ReadTodo: '[Todos] Read Todo',
  UpdateTodo: '[Todos] Update Todo',
  DeleteTodo: '[Todos] Delete Todo',
};

export const ActionMap = {
  ...ReducerActionMap,
  ...EffectActionMap,
};

export class TestTodos extends Action {
  readonly type: string = ActionMap.TestTodos;
  constructor(public payload: { message: string }) {
    super();
  }
}

export class CreateTodo extends Action {
  readonly type: string = ActionMap.CreateTodo;
  constructor(public payload: any[]) {
    super();
  }
}

export class ReadTodos extends Action {
  readonly type: string = ActionMap.ReadTodos;
  constructor() {
    super();
  }
}
export class ReadTodo extends Action {
  readonly type: string = ActionMap.ReadTodo;
  constructor() {
    super();
  }
}

export class UpdateTodo extends Action {
  readonly type: string = ActionMap.UpdateTodo;
  constructor(public payload: Todos) {
    super();
  }
}

export class DeleteTodo extends Action {
  readonly type: string = ActionMap.DeleteTodo;
  constructor(public payload: string[]) {
    super();
  }
}

export type ActionUnion =
  | TestTodos
  | CreateTodo
  | ReadTodo
  | ReadTodos
  | UpdateTodo
  | DeleteTodo;
