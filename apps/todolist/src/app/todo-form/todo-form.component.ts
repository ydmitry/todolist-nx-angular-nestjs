import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoFormService } from './todo-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'todolist-app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoFormService],
})
export class TodoFormComponent implements OnInit {
  form = this.todoForm.form;
  tasksFormArray = this.todoForm.tasksFormArray;
  todoId = this.todoForm.todoId;

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
