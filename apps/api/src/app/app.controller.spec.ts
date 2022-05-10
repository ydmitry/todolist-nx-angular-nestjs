import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { DataProviderService } from './data-provider.service';

describe('AppController', () => {
  let app: TestingModule;

  const createResponse = { name: 'Test' };
  const updateResponse = { id: 10, name: 'Updated' };
  const getResponse = { id: 1, name: 'Test' };
  const getAllResponse = [getResponse];

  const mockProvider = {
    getAll: () => Promise.resolve(getAllResponse),
    get: () => Promise.resolve(getResponse),
    create: () => Promise.resolve(createResponse),
    update: () => Promise.resolve(updateResponse),
    delete: () => Promise.resolve(),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: DataProviderService,
          useValue: mockProvider,
        },
      ],
    }).compile();
  });

  it('should return response for getAll', async () => {
    const appController = app.get<AppController>(AppController);
    expect(await appController.getAll()).toEqual(getAllResponse);
  });

  it('should return response for get', async () => {
    const appController = app.get<AppController>(AppController);
    expect(await appController.get(1)).toEqual(getResponse);
  });

  it('should return response for put', async () => {
    const appController = app.get<AppController>(AppController);
    expect(await appController.put(1, updateResponse)).toEqual(updateResponse);
  });

  it('should return response for post', async () => {
    const appController = app.get<AppController>(AppController);
    expect(await appController.post(createResponse)).toEqual(createResponse);
  });

  it('should return response for delete', async () => {
    const appController = app.get<AppController>(AppController);
    const spy = jest.spyOn(mockProvider, 'delete');
    expect(await appController.delete(1)).toBeUndefined();
    expect(spy).toBeCalled();
  });
});
