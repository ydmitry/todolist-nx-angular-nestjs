import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todolist-app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
