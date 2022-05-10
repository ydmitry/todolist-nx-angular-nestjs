export const createTodo = () => cy.get('#create-todo');
export const saveTodo = () => cy.get('#save-todo');
export const nameField = () => cy.get('#todo-name-field');
export const createTodoTaskField = () => cy.get('#create-todo-task-field');
export const createTodoTask = () => cy.get('#create-todo-task');
export const taskContainer = () => cy.get('[data-role-task-container]');
export const todoItem = () => cy.get('[data-role-todo-item]');
