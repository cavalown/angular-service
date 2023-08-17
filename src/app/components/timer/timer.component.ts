import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() taskSelected: string = '';
  duration: number = 1500000;
  minute: string = '25';
  second: string = '00';
  timerInterval: any;
  constructor() {}
  start() {
    if (this.duration <= 0) return;
    this.timerInterval = setInterval(() => this.countdownTime(), 1000);
  }
  countdownTime() {
    if (this.duration <= 0) {
      clearInterval(this.timerInterval);
      return;
    }
    this.duration = this.duration - 1000;
    this.minute = Math.floor(this.duration / (1000 * 60)).toString().padStart(2,'0');
    this.second = Math.floor((this.duration / 1000) % 60).toString().padStart(2,'0');
  }
  pause() {
    clearInterval(this.timerInterval);
  }
  reset() {
    clearInterval(this.timerInterval);
    this.duration = 1500000;
    this.minute = '25';
    this.second = '00';
  }
}
