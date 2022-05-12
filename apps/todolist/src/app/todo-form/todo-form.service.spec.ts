import { TestBed } from '@angular/core/testing';

import { TodoFormService } from './todo-form.service';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { TodoFormActorService } from './todo-form-actor.service';
import { Todo } from '@todolist-app/api-interfaces';
import { ChangeDetectorRef } from '@angular/core';

describe('TodoFormService', () => {
  let service: TodoFormService;
  let populateResult: Todo | undefined;
  const actor: TodoFormActorService = {
    init() {
      return actor;
    },
    load(populate) {
      if (populate && populateResult) {
        populate(populateResult);
      }
      return;
    },
    save(todo: Todo) {
      return;
    },
  };
  beforeEach(() => {
    populateResult = undefined;
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        TodoFormService,
        {
          provide: TodoFormActorService,
          useValue: actor,
        },
        {
          provide: ChangeDetectorRef,
          useValue: {
            detectChanges: () => {
              return;
            },
          },
        },
      ],
    });
    service = TestBed.inject(TodoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    // Form created
    expect(service.form).toBeTruthy();
  });

  it('should trigger load action', () => {
    const spy = jest.spyOn(actor, 'load');
    service.load();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should trigger save action', () => {
    const spy = jest.spyOn(actor, 'save');
    service.form.get('name')?.setValue('Test');
    service.save();
    expect(spy).toHaveBeenCalledWith({ name: 'Test' });
  });

  it('should create and populate tasks on load and save the same object', () => {
    const spy = jest.spyOn(actor, 'save');

    populateResult = {
      id: 100,
      name: 'Test',
      tasks: [
        {
          name: 'task 1',
        },
        {
          name: 'task 2',
        },
      ],
    };
    service.load();
    expect(service.form.get('id')?.value).toBe(100);
    const tasks = service.form.get('tasks') as FormArray;
    expect(tasks.length).toBe(2);
    expect(tasks.get('0.name')?.value).toBe('task 1');
    expect(tasks.get('1.name')?.value).toBe('task 2');

    service.save();
    expect(spy).toHaveBeenCalledWith(populateResult);
  });
});
