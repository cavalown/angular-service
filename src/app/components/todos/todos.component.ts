import { Component,EventEmitter, Output } from '@angular/core';

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
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
  @Output() taskSelectedEvent = new EventEmitter<string>();
  constructor(){}
  playTomatoClock(todoTitle:string){
    console.log('Run Tomato Click');
    this.taskSelectedEvent.emit(todoTitle);
  }
}
