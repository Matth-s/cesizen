import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import {
  setupDatabase,
  teardownDatabase,
  getPrisma,
} from '../global-setup';
import { PrismaClient } from '@prisma/client';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';

import {
  createMenuService,
  existingMenuPathService,
  getMenuItemService,
  updateMenuItemService,
  deleteMenuItemService,
} from '../../services/menu-service';

let prisma: PrismaClient;

describe('MenuService Integration', () => {
  beforeAll(async () => {
    prisma = await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  beforeEach(async () => {
    await prisma.menuItem.deleteMany();
  });

  const menuData = {
    label: 'Home',
    path: '/',
    show: true,
  };

  describe('createMenuService', () => {
    it('should create a menu item', async () => {
      const result = await createMenuService(prisma, menuData);

      expect(result.label).toBe('Home');
      expect(result.path).toBe('/');
    });
  });

  describe('existingMenuPathService', () => {
    it('should return menu item by path', async () => {
      const created = await prisma.menuItem.create({
        data: menuData,
      });

      const result = await existingMenuPathService(
        prisma,
        created.path,
      );

      expect(result?.id).toBe(created.id);
    });
  });

  describe('getMenuItemService', () => {
    it('should return all menu items', async () => {
      await prisma.menuItem.create({
        data: menuData,
      });

      const result = await getMenuItemService(prisma, true);

      expect(result).toHaveLength(1);
    });

    it('should return only visible menu items', async () => {
      await prisma.menuItem.create({
        data: menuData,
      });

      const result = await getMenuItemService(prisma, false);

      expect(result).toHaveLength(1);
      expect(result[0].show).toBe(true);
    });
  });

  describe('updateMenuItemService', () => {
    it('should update menu item', async () => {
      const created = await prisma.menuItem.create({
        data: menuData,
      });

      const updated = await updateMenuItemService(prisma, {
        ...created,
        label: 'Dashboard',
      });

      expect(updated.label).toBe('Dashboard');
    });
  });

  describe('deleteMenuItemService', () => {
    it('should delete menu item', async () => {
      const created = await prisma.menuItem.create({
        data: menuData,
      });

      await deleteMenuItemService(prisma, created.id);

      const found = await prisma.menuItem.findUnique({
        where: { id: created.id },
      });

      expect(found).toBeNull();
    });
  });
});
