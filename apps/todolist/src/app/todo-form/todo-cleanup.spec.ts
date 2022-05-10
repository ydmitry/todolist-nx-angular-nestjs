import { todoCleanup } from './todo-cleanup';

describe('todoCleanup', () => {
  it('should remove nullish values', () => {
    expect(
      todoCleanup({
        id: null,
        name: 'Test',
        description: null,
        tasks: [],
      })
    ).toEqual({
      name: 'Test',
    });
  });

  it('should remove nullish values for tasks too', () => {
    expect(
      todoCleanup({
        name: 'Test',
        tasks: [
          {
            name: 'task 1',
            description: null,
          },
        ],
      })
    ).toEqual({
      name: 'Test',
      tasks: [{ name: 'task 1' }],
    });
  });

  it('should return same object if object is full', () => {
    expect(
      todoCleanup({
        id: 1,
        name: 'Test',
        description: '...',
        tasks: [{ name: 'task 1', description: '...' }],
      })
    ).toEqual({
      id: 1,
      name: 'Test',
      description: '...',
      tasks: [{ name: 'task 1', description: '...' }],
    });
  });
});
