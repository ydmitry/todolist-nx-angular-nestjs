import {
  createTodo,
  createTodoTask,
  createTodoTaskField,
  nameField,
  saveTodo,
  taskContainer,
  todoItem,
} from '../support/app.po';

describe('todolist', () => {
  beforeEach(() => cy.visit('/'));

  it('should be able to create todo item', () => {
    createTodo().click();
    nameField().type('Test');
    cy.intercept('POST', '/api/todos').as('creating');

    saveTodo().click();

    cy.wait('@creating').then((interception) => {
      assert.deepEqual(interception.request?.body, { name: 'Test' });
      assert.equal(interception.response?.body.name, 'Test');
    });

    // Form should be with newly created value
    nameField().should('have.value', 'Test');
  });

  it('should be able to create todo item with tasks', () => {
    createTodo().click();
    nameField().type('Test');

    createTodoTaskField().type('Task 1');
    createTodoTask().click();

    createTodoTaskField().type('Task 2');
    createTodoTask().click();

    taskContainer().should('have.length', 2);

    cy.intercept('POST', '/api/todos').as('creating');

    saveTodo().click();

    cy.wait('@creating').then((interception) => {
      assert.deepEqual(interception.request?.body, {
        name: 'Test',
        tasks: [{ name: 'Task 1' }, { name: 'Task 2' }],
      });
      assert.equal(interception.response?.body.name, 'Test');
    });
  });

  it('should show list of items', () => {
    cy.intercept('GET', '/api/todos', [
      { id: 1, name: 'test' },
      { id: 2, name: 'second' },
    ]);

    cy.visit('/');

    todoItem().should('have.length', 2);
  });
});
