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
import {
  selectInProgressTodos,
  selectCompletedTodos,
} from 'src/app/store/todos/todos.selector';
import { Observable, take } from 'rxjs';

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
  inProgressTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;
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
    this.inProgressTodos$ = store.select(selectInProgressTodos);
    this.completedTodos$ = store.select(selectCompletedTodos);
    this.todoContent = this._fb.group({
      title: [''],
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
    this.newTodo = '';
  }
  save() {
    if (!this.tmpTodo.title.trim()) return;

    this.inProgressTodos$.pipe(take(1)).subscribe((todos) => {
      const index = todos.findIndex((item) => item.id === this.tmpTodo.id);
      if (index !== -1) {
        const updatedTodo = {
          ...this.tmpTodo,
        };
        this.store.dispatch(updateTodo({ index, todo: updatedTodo }));
      }
      this.isEdit = false;
    });
  }
  cancel() {
    this.isEdit = false;
  }
  handleCompleteItem(id: string) {
    this.inProgressTodos$.subscribe((todos) => {
      const index = todos.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedTodo = {
          ...todos[index],
          isCompleted: !todos[index].isCompleted,
        };
        this.store.dispatch(updateTodo({ index, todo: updatedTodo }));
      }
    });
  }
  edit(id: string) {
    this.inProgressTodos$.subscribe((todos) => {
      const index = todos.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.tmpTodo = { ...todos[index] };
        this.todoContent.patchValue({
          title: this.tmpTodo.title,
        });
      }
      this.isEdit = true;
    });
  }
  delete(id: string) {
    this.inProgressTodos$.subscribe((todos) => {
      const index = todos.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.store.dispatch(deleteTodo({ index }));
      }
    });
  }
}
