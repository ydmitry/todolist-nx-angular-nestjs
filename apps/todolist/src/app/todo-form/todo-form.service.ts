import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '@todolist-app/api-interfaces';
import { todoCleanup } from './todo-cleanup';
import { TodoFormActorService } from './todo-form-actor.service';

@Injectable()
export class TodoFormService {
  // Everything stores in form object, no need for componentStore right now
  form = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
    description: [null],
    tasks: this.fb.array([]),
  });

  get tasksFormArray(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private actor: TodoFormActorService
  ) {}

  load() {
    this.actor.load((todo: Todo) => this.populate(todo));
  }

  addTask(name: string) {
    this.tasksFormArray.push(
      this.fb.group({
        name: [name, [Validators.required]],
        description: [null],
      })
    );
  }

  populate(todo: Todo) {
    // Create dynamic structure and after that set value
    (todo.tasks ?? []).forEach(() => this.addTask(''));
    this.form.patchValue(todo);

    this.cdRef.detectChanges();
  }

  deleteTask(group: FormGroup) {
    const index = this.tasksFormArray.controls.indexOf(group);

    if (index === -1) {
      // Not found - already deleted (hometask comment: defensive error handling strategy example)
      return;
    }

    this.tasksFormArray.removeAt(index);
  }

  save() {
    if (!this.form.valid) {
      alert('Form is not valid');
      return;
    }

    this.actor.save(todoCleanup(this.form.value));
  }
}
