import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  {
    path: 'create',
    component: TodoFormComponent,
  },
  {
    path: ':id',
    component: TodoFormComponent,
  },
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      // To re-init component after creation of todos item
      onSameUrlNavigation: 'reload',
    }),
  ],
})
export class AppRoutingModule {}
