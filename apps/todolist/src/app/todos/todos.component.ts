import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';

@Component({
  selector: 'todolist-app-todos',
  templateUrl: './todos.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodosService],
})
export class TodosComponent implements OnInit {
  todos$ = this.todos.selectTodos();

  constructor(private todos: TodosService) {}

  ngOnInit(): void {
    this.todos.load();
  }

  remove(id: number): void {
    if (confirm('Are you sure want to delete the todo item?')) {
      this.todos.remove(id);
    }
  }
}
