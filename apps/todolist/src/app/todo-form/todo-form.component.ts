import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { TodoFormService } from './todo-form.service';
import { FormGroup } from '@angular/forms';
import { TodoFormCreateService } from './todo-form-create.service';
import { ActivatedRoute } from '@angular/router';
import { TodoFormEditService } from './todo-form-edit.service';
import { TodoFormActorService } from './todo-form-actor.service';

const todoFormActionFactory = (route: ActivatedRoute, injector: Injector) =>
  injector
    .get(
      route.snapshot.params['id'] ? TodoFormEditService : TodoFormCreateService
    )
    .init(route.snapshot.params['id']);

@Component({
  selector: 'todolist-app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TodoFormService,
    {
      provide: TodoFormActorService,
      useFactory: todoFormActionFactory,
      deps: [ActivatedRoute, Injector],
    },
  ],
})
export class TodoFormComponent implements OnInit {
  form = this.todoForm.form;
  tasksFormArray = this.todoForm.tasksFormArray;

  constructor(private todoForm: TodoFormService) {}

  ngOnInit() {
    this.todoForm.load();
  }

  save() {
    this.todoForm.save();
  }

  addTask(name: string) {
    this.todoForm.addTask(name);
  }

  deleteTask(group: FormGroup) {
    this.todoForm.deleteTask(group);
  }
}
