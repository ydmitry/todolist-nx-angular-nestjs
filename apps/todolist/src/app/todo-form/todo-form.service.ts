import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@todolist-app/api-interfaces';
import { todoCleanup } from './todo-cleanup';

@Injectable()
export class TodoFormService {
  // Everything stores in form object, no need for componentStore right now
  form = this.fb.group({
    id: [null],
    name: ['', [Validators.required]],
    description: [null],
  });

  get tasksFormArray(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  get todoId(): number {
    return this.route.snapshot.params['id'];
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  load() {
    if (this.todoId) {
      this.http.get<Todo>(`/api/todos/${this.todoId}`).subscribe({
        next: (todo) => this.populate(todo),
        error: () => alert('Server side error'),
      });
    }
  }

  addTask(name: string) {
    if (!this.tasksFormArray) {
      this.form.addControl('tasks', this.fb.array([]));
    }

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
    this.form.setValue(todo);

    this.cdRef.detectChanges();
  }

  deleteTask(group: FormGroup) {
    const index = this.tasksFormArray.controls.findIndex(
      (task) => task === group
    );
    this.tasksFormArray.removeAt(index);
  }

  save() {
    if (!this.form.valid) {
      alert('Form is not valid');
      return;
    }

    if (!this.todoId) {
      this.http
        .post<Todo>('/api/todos', todoCleanup(this.form.value))
        .subscribe({
          next: ({ id }) => void this.router.navigate([id]),
          error: () => alert('Server side error'),
        });
    } else {
      this.http
        .put<Todo>(`/api/todos/${this.todoId}`, todoCleanup(this.form.value))
        .subscribe({
          next: ({ id }) => void this.router.navigate([id]),
          error: () => alert('Server side error'),
        });
    }
  }
}
