import { RelationshipConfigTable, RelationshipFromJDL } from 'mycena-store';
import * as fromTodos from './todos/todos.reducer';

export function mainStore(): string {
    return 'store';
  }

export interface CommonStoreState {
    todo: fromTodos.TodosReducer;
}

export const CommonReducers = {
    account: fromTodos.reducer
}

export const CommonFeatureKeys = {
    account: fromTodos.FeatureKey,
}