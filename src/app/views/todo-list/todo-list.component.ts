import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuid4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  newTodo: string = '';
  todos: Todo[] = [
    {
      title: '計畫1',
      isCompleted: false,
      id: '10181cae-7a18-4cca-b109-e50b75b0d586',
    },
    {
      title: '計畫2',
      isCompleted: false,
      id: '56cbb349-2db1-46a1-a353-061ed2212dd7',
    },
  ];
  todosInProcess: Todo[] = [];
  todosDone: Todo[] = [];
  isEdit: boolean = false;
  tmpTodo: Todo = {
    title: '',
    id: '',
    isCompleted: false,
  };
  todoContent: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.todoContent = this._fb.group({
      title: [''],
    });
    this.filterTodos();
  }
  addTodo() {
    if (!this.newTodo.trim()) return;
    const todoData: Todo = {
      id: uuid4(),
      title: this.newTodo.trim(),
      isCompleted: false,
    };
    this.todos.push(todoData);
    this.filterTodos();
    this.newTodo = '';
  }
  save() {
    if (!this.tmpTodo.title.trim()) return;
    const index = this.todos.findIndex((item) => item.id === this.tmpTodo.id);
    this.todos.splice(index, 1, this.tmpTodo);
    this.isEdit = false;
    this.filterTodos();
  }
  cancel() {
    this.isEdit = false;
  }
  handleCompleteItem(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    this.todos[index].isCompleted = !this.todos[index].isCompleted;
    this.filterTodos();
  }
  edit(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    this.isEdit = true;
    this.tmpTodo = JSON.parse(JSON.stringify(this.todos[index]));
  }
  delete(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    this.todos.splice(index, 1);
    this.filterTodos();
  }
  filterTodos() {
    this.todosInProcess = this.todos.filter((item) => !item.isCompleted);
    this.todosDone = this.todos.filter((item) => item.isCompleted);
  }
}