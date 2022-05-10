import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Todo } from '@todolist-app/api-interfaces';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type TodosState = {
  loading: boolean;
  error: boolean;
  todos: Todo[];
};

@Injectable()
export class TodosService extends ComponentStore<TodosState> {
  load = this.effect((load$: Observable<void>) => {
    return load$.pipe(
      switchMap(() =>
        this.http.get<Todo[]>('/api/todos').pipe(
          tap({
            next: (todos) => this.receiveTodos(todos),
            error: () => this.logError(),
          }),
          // Handle potential error within inner pipe.
          catchError(() => EMPTY)
        )
      )
    );
  });

  receiveTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    loading: false,
    error: false,
    todos,
  }));

  logError = this.updater((state) => ({
    ...state,
    error: true,
  }));

  constructor(private http: HttpClient) {
    super({
      loading: false,
      error: false,
      todos: [],
    });
  }

  selectTodos() {
    return this.select((state) => state.todos);
  }

  remove(id: number) {
    this.http.delete<void>(`/api/todos/${id}`).subscribe(() => this.load());
  }
}
