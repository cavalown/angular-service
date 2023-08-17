
import { Entity } from 'mycena-store';
import { Todos } from './todos.model';

export class TodosEntity extends Entity {
  _name = 'TodosEntity';
  constructor(property: Todos) {
    super(property);
  }
}
