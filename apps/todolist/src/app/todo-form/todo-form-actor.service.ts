import { Injectable } from '@angular/core';
import { Todo } from '@todolist-app/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export abstract class TodoFormActorService {
  abstract init(id?: number): TodoFormActorService;

  abstract load(populate?: (todo: Todo) => void): void;

  abstract save(todo: Todo): void;
}
