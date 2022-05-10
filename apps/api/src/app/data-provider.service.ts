import { Injectable } from '@nestjs/common';
import { Todo } from '@todolist-app/api-interfaces';

@Injectable()
export class DataProviderService {
  private autoincrement = 1;
  private data: Record<number, Todo> = {};

  create(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const id = this.autoincrement;
    this.autoincrement++;
    this.data[id] = { ...todo, id };
    return Promise.resolve(this.data[id]);
  }

  update(id: number, todo: Todo): Promise<Todo> {
    if (id !== todo.id) {
      // Home task comment: some error handling situation to avoid mistakes or misuse
      // This is offensive programming strategy, can be also used defensive programming strategy - to adapt object, e.g. todo.id = id
      throw new Error('`id` param not matches `id` in `todo`');
    }

    if (!this.data[id]) {
      throw new Error(`Todo item not found with id ${id}`);
    }

    this.data[id] = todo;
    return Promise.resolve(todo);
  }

  delete(id: number): Promise<void> {
    delete this.data[id];
    return Promise.resolve();
  }

  get(id: number): Promise<Todo | null> {
    return Promise.resolve(this.data[id] ?? null);
  }

  getAll(): Promise<Todo[]> {
    return Promise.resolve(Object.values(this.data));
  }
}
