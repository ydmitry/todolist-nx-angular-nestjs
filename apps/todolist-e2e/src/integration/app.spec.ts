import { createTodo, nameField, saveTodo } from '../support/app.po';

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
  });
});
