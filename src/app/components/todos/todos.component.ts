import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/store/todos/todos.model';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  todos$: Observable<Todo[]>;
  todosInProgress$: Observable<Todo[]>;
  @Output() taskSelectedEvent = new EventEmitter<string>();
  constructor(private store: Store<{ todos: Todo[] }>) {
    this.todos$ = store.select('todos');
    this.todosInProgress$ = store
      .select('todos')
      .pipe(map((todos: Todo[]) => todos.filter((todo) => !todo.isCompleted)));
  }
  playTomatoClock(todoTitle: string) {
    console.log('Run Tomato Click');
    this.taskSelectedEvent.emit(todoTitle);
  }
}
