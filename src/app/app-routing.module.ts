import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TodoListComponent } from './views/todo-list/todo-list.component';
import { TomatoClockComponent } from './views/tomato-clock/tomato-clock.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'tomato-clock', pathMatch: 'full', component: TomatoClockComponent },
      { path: 'todo-list', pathMatch: 'full', component: TodoListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
