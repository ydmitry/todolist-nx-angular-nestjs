import { Injectable } from '@angular/core';
import { TodoFormActorService } from './todo-form-actor.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Todo } from '@todolist-app/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoFormCreateService implements TodoFormActorService {
  constructor(private http: HttpClient, private router: Router) {}

  init(): TodoFormActorService {
    return this;
  }

  load(): void {
    return; // No need to load when create service
  }

  save(todo: Todo): void {
    this.http.post<Todo>('/api/todos', todo).subscribe({
      next: ({ id }) => {
        alert('Created!');
        void this.router.navigate([id]);
      },
      error: () => alert('Server side error'),
    });
  }
}
