# Todolist application

![list](https://github.com/ydmitry/todolist-nx-angular-nestjs/blob/main/screen1.png?raw=true)
![form](https://github.com/ydmitry/todolist-nx-angular-nestjs/blob/main/screen2.png?raw=true)

## Install

`yarn`

## Run

`nx serve api`

`nx serve todolist`

## Tests

`nx test api`

`nx test todolist`

`nx e2e todolist-e2e`

## About

### Technologies

* Nx
* TypeScript
* NestJS
* Angular
* Tailwind
* Cypress
* Jest
* NGRX component store

## Decisions

* NX was used as solution allowed to have a quick start with both backend and frontend
* `api-interfaces` lib shares interfaces for todolist between `api` and `todolist`
* To implement validation in `api` was used `ValidationPipe` from NestJS
* In `api` was implemented simplest storage strategy which uses runtime memory
  * To support database storage it's possible to implement and provide `DataProvider`
* Tailwind was used to quickly copy and reuse ready elements from Internet
