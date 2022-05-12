import { Inject, Injectable } from '@angular/core';
import { Todo } from '@todolist-app/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { todoCleanup } from './todo-cleanup';
import { Router } from '@angular/router';
import { TodoFormActorService } from './todo-form-actor.service';

@Injectable({
  providedIn: 'root',
})
export class TodoFormEditService implements TodoFormActorService {
  private id!: number;

  constructor(private http: HttpClient, private router: Router) {}

  init(id: number): TodoFormActorService {
    this.id = id;
    return this;
  }

  load(populate: (todo: Todo) => void): void {
    this.http.get<Todo>(`/api/todos/${this.id}`).subscribe({
      next: (todo) => populate(todo),
      error: () => alert('Server side error'),
    });
  }

  save(todo: Todo): void {
    this.http.put<Todo>(`/api/todos/${this.id}`, todo).subscribe({
      next: ({ id }) => {
        alert('Updated!');
        void this.router.navigate([id]);
      },
      error: () => alert('Server side error'),
    });
  }
}
