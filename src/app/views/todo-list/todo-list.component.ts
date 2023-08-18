import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuid4 } from 'uuid';
import { Store } from '@ngrx/store';
import {
  // CreateTodoAction,
  createTodo,
  deleteTodo,
  updateTodo,
} from 'src/app/store/todos/todos.actions';
import { Observable } from 'rxjs';

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
  todos$: Observable<Todo[]>;
  todos: Todo[] = [];
  todosInProcess: Todo[] = [];
  todosDone: Todo[] = [];
  isEdit: boolean = false;
  tmpTodo: Todo = {
    title: '',
    id: '',
    isCompleted: false,
  };
  todoContent: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private store: Store<{ todos: Todo[] }>
  ) {
    this.todos$ = store.select('todos');
    this.todoContent = this._fb.group({
      title: [''],
    });
    this.todos$.subscribe((todos) => {
      this.todos = todos;
      this.todosInProcess = todos.filter((item) => !item.isCompleted);
      this.todosDone = todos.filter((item) => item.isCompleted);
    });
    this.todoContent.valueChanges.subscribe((formValues) => {
      this.tmpTodo.title = formValues.title;
    });
  }
  addTodo() {
    if (!this.newTodo.trim()) return;
    const todoData: Todo = {
      id: uuid4(),
      title: this.newTodo.trim(),
      isCompleted: false,
    };
    this.store.dispatch(createTodo({ todo: todoData }));
    this.filterTodos();
    this.newTodo = '';
  }
  save() {
    if (!this.tmpTodo.title.trim()) return;
    const index = this.findInProgressTodoIndexById(this.tmpTodo.id);
    if (index !== -1) {
      this.store.dispatch(updateTodo({ index, todo: this.tmpTodo }));
      this.filterTodos();
    }
    this.isEdit = false;
  }
  cancel() {
    this.isEdit = false;
  }
  handleCompleteItem(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedTodo = {
        ...this.todos[index],
        isCompleted: !this.todos[index].isCompleted,
      };
      this.store.dispatch(updateTodo({ index, todo: updatedTodo }));
    }
  }
  edit(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tmpTodo = { ...this.todos[index] };
      this.todoContent.patchValue({
        title: this.tmpTodo.title,
      });
    }
    this.isEdit = true;
  }
  delete(id: string) {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.store.dispatch(deleteTodo({ index }));
      this.filterTodos();
    }
  }
  private filterTodos() {
    this.todos$.subscribe((todos) => {
      this.todos = todos;
      this.todosInProcess = todos.filter((item) => !item.isCompleted);
      this.todosDone = todos.filter((item) => item.isCompleted);
    });
  }

  private findInProgressTodoIndexById(id: string): number {
    return this.todosInProcess.findIndex((item) => item.id === id);
  }
}
