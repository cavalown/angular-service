import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Todo } from './todos.model';

export const selectTodosState = createFeatureSelector<Todo[]>('todos');

export const selectAllTodos = createSelector(
  selectTodosState,
  (state: Todo[]) => state
);

export const selectInProgressTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => !todo.isCompleted)
);

export const selectCompletedTodos = createSelector(selectAllTodos, (todos) =>
  todos.filter((todo) => todo.isCompleted)
);
