import { Component } from '@angular/core';

@Component({
  selector: 'app-tomato-clock',
  templateUrl: './tomato-clock.component.html',
  styleUrls: ['./tomato-clock.component.scss'],
})
export class TomatoClockComponent {
  taskSelected: string = '';
  taskSelectedReceiver(taskSelected: string) {
    this.taskSelected = taskSelected;
  }
}
