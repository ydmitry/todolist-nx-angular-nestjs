export interface TodoTask {
  name: string;
  description?: string;
}

/**
 * Todolist
 *
 * Quote from hometask:
 *
 * {
 *     id [mandatory]
 *     name [mandatory]
 *     description
 *     tasks: [
 *         {
 *             name [mandatory]
 *             description
 *         }
 *     ]
 * }
 */
export interface Todo {
  id: number;
  name: string;
  description?: string;
  tasks?: TodoTask[];
}
