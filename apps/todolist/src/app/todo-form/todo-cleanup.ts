import { Todo } from '@todolist-app/api-interfaces';

export function todoCleanup(todo: Record<string, unknown>): Todo {
  if (todo['id'] === null) {
    delete todo['id'];
  }

  if (todo['description'] === null) {
    delete todo['description'];
  }

  if (todo['tasks'] && Array.isArray(todo['tasks']) && !todo['tasks'].length) {
    delete todo['tasks'];
  } else if (todo['tasks'] && Array.isArray(todo['tasks'])) {
    todo['tasks'] = todo['tasks'].map((task) => ({
      ...task,
      description: task.description ?? undefined, // undefined instead of null will remove prop in json
    }));
  }

  return todo as unknown as Todo;
}
