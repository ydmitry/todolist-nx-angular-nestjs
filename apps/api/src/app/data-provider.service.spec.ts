import { Test } from '@nestjs/testing';

import { DataProviderService } from './data-provider.service';

describe('DataProviderService', () => {
  let service: DataProviderService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [DataProviderService],
    }).compile();

    service = app.get<DataProviderService>(DataProviderService);
  });

  describe('getAll', () => {
    it('should return empty array on init stage', async () => {
      expect(await service.getAll()).toEqual([]);
    });

    it('should return two array items after create two rows', async () => {
      await service.create({ name: 'test 1' });
      await service.create({ name: 'test 2' });
      expect(await service.getAll()).toEqual([
        { id: 1, name: 'test 1' },
        { id: 2, name: 'test 2' },
      ]);
    });
  });

  describe('get', () => {
    it('should return null if row not exists', async () => {
      expect(await service.get(1000)).toBeNull();
    });

    it('should get two rows after create two rows', async () => {
      await service.create({ name: 'test 1' });
      await service.create({ name: 'test 2' });
      expect(await service.get(2)).toEqual({ id: 2, name: 'test 2' });
      expect(await service.get(1)).toEqual({ id: 1, name: 'test 1' });
    });
  });

  describe('create', () => {
    it('should create row', async () => {
      expect(await service.create({ name: 'test 1' })).toEqual({
        id: 1,
        name: 'test 1',
      });
    });

    it('should work id autoincrement', async () => {
      const row1 = await service.create({ name: 'test 1' });
      expect(row1.id).toEqual(1);
      const row2 = await service.create({ name: 'test 2' });
      expect(row2.id).toEqual(2);
      const row3 = await service.create({ name: 'test 3' });
      expect(row3.id).toEqual(3);
    });
  });

  describe('update', () => {
    it('should update created row', async () => {
      await service.create({ name: 'test 1' });
      await service.update(1, { id: 1, name: 'test 2' });
      expect(await service.get(1)).toEqual({
        id: 1,
        name: 'test 2',
      });
    });

    it('should fail if ID not matches', async () => {
      await expect(async () =>
        service.update(1, { id: 2, name: 'test 2' })
      ).rejects.toThrow('`id` param not matches `id` in `todo`');
    });
  });

  describe('delete', () => {
    it('should delete created row', async () => {
      await service.create({ name: 'test 1' });
      expect(await service.get(1)).toBeTruthy();
      await service.delete(1);
      expect(await service.get(1)).toBeNull();
    });
  });
});
