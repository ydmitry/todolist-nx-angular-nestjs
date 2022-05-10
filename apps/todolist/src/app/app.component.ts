import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@todolist-app/api-interfaces';

@Component({
  selector: 'todolist-app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  hello$ = this.http.get<Todo[]>('/api/todos');
  constructor(private http: HttpClient) {}
}
