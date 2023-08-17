import { Action, createEntityAdapter, EntityAdapter, EntityState, Reducer } from 'mycena-store';
import { ActionMap, ReducerActionMap } from './todos.actions';
import { TodosEntity } from './todos.entity';
import { Todos } from './todos.model';

export const FeatureKey = 'todos';

export interface TodosState extends EntityState<Todos> {}

export const adapter: EntityAdapter<Todos> = createEntityAdapter<Todos>();

export const initialState: TodosState = adapter.getInitialState({});

export class TodosReducer extends Reducer<Action, TodosState> {
    _name = 'TodosReducer';
    constructor() {
      super(initialState, ReducerActionMap);
      this.setEntity(TodosEntity);
    }
    async *mapEventToState(event: any): AsyncIterableIterator<any> {
      const newState = await this.defaultActionState(event);
      switch (event['type']) {
        case ActionMap.TestTodos: {
          yield await this.state;
          break;
        }
        default: {
          yield await newState;
          break;
        }
      }
    }
  }
  
  export const reducer = new TodosReducer();

