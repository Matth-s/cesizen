import { describe, it, expect, vi } from 'vitest';
import { prismaMock } from '../../__mocks__/prisma';
import {
  createMenuService,
  existingMenuPathService,
  getMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
} from '../menu-service';

describe('MenuService', () => {
  const mockMenuItem = {
    id: 'menu-1',
    label: 'Home',
    path: '/',
    show: true,
  };

  describe('createMenuService', () => {
    it('should create a menu item', async () => {
      const { id, ...data } = mockMenuItem;
      prismaMock.menuItem.create.mockResolvedValue(mockMenuItem);

      await createMenuService(prismaMock, data);

      expect(prismaMock.menuItem.create).toHaveBeenCalledWith({
        data,
      });
    });
  });

  describe('existingMenuPathService', () => {
    it('should return menu item by path', async () => {
      prismaMock.menuItem.findFirst.mockResolvedValue(mockMenuItem);

      const result = await existingMenuPathService(prismaMock, '/');

      expect(result).toEqual(mockMenuItem);
    });
  });

  describe('getMenuItemService', () => {
    it('should return all menu items when withHidden is true', async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([mockMenuItem]);

      const result = await getMenuItemService(prismaMock, true);

      expect(result).toEqual([mockMenuItem]);
      expect(prismaMock.menuItem.findMany).toHaveBeenCalledWith({
        where: {},
      });
    });

    it('should return only visible menu items when withHidden is false', async () => {
      prismaMock.menuItem.findMany.mockResolvedValue([mockMenuItem]);

      const result = await getMenuItemService(prismaMock, false);

      expect(result).toEqual([mockMenuItem]);
      expect(prismaMock.menuItem.findMany).toHaveBeenCalledWith({
        where: { show: true },
      });
    });
  });

  describe('updateMenuItemService', () => {
    it('should update a menu item', async () => {
      prismaMock.menuItem.update.mockResolvedValue(mockMenuItem);

      await updateMenuItemService(prismaMock, mockMenuItem);

      expect(prismaMock.menuItem.update).toHaveBeenCalledWith({
        where: { id: mockMenuItem.id },
        data: mockMenuItem,
      });
    });
  });

  describe('deleteMenuItemService', () => {
    it('should delete a menu item', async () => {
      prismaMock.menuItem.delete.mockResolvedValue(mockMenuItem);

      await deleteMenuItemService(prismaMock, 'menu-1');

      expect(prismaMock.menuItem.delete).toHaveBeenCalledWith({
        where: { id: 'menu-1' },
      });
    });
  });
});
