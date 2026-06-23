import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from 'vitest';

import { PrismaClient } from '@prisma/client';

import {
  getAllPageService,
  getPageByIdService,
  getPageBySlugService,
  savePageService,
  updatePageByIdService,
  getAllPageWithMenuIdService,
} from '../../services/page-service';

import { setupDatabase, teardownDatabase } from '../global-setup';

let prisma: PrismaClient;

describe('PageService Integration', () => {
  beforeAll(async () => {
    prisma = await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  beforeEach(async () => {
    await prisma.page.deleteMany();
    await prisma.menuItem.deleteMany();
  });

  async function createMenu() {
    return prisma.menuItem.create({
      data: {
        label: 'Home',
        path: '/',
        show: true,
      },
    });
  }

  describe('savePageService', () => {
    it('should save a page', async () => {
      const menu = await createMenu();

      const page = await savePageService(prisma, {
        title: 'Test Page',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'test-page',
        isPublished: true,
        menuItemId: menu.id,
      });

      expect(page.id).toBeDefined();
      expect(page.slug).toBe('test-page');
    });
  });

  describe('getAllPageService', () => {
    it('should return all pages', async () => {
      const menu = await createMenu();

      await savePageService(prisma, {
        title: 'Test Page',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'test-page',
        isPublished: true,
        menuItemId: menu.id,
      });

      const result = await getAllPageService(prisma);

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('test-page');
    });
  });

  describe('getPageByIdService', () => {
    it('should return page by id', async () => {
      const menu = await createMenu();

      const created = await savePageService(prisma, {
        title: 'Test Page',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'test-page',
        isPublished: true,
        menuItemId: menu.id,
      });

      const result = await getPageByIdService(
        prisma,
        created.id,
        false,
      );

      expect(result?.id).toBe(created.id);
    });

    it('should return null when page is unpublished and filter enabled', async () => {
      const menu = await createMenu();

      const created = await savePageService(prisma, {
        title: 'Draft',
        description: 'Draft',
        content: 'Draft',
        imageUrl: null,
        slug: 'draft-page',
        isPublished: false,
        menuItemId: menu.id,
      });

      const result = await getPageByIdService(
        prisma,
        created.id,
        true,
      );

      expect(result).toBeNull();
    });
  });

  describe('getPageBySlugService', () => {
    it('should return page by slug', async () => {
      const menu = await createMenu();

      await savePageService(prisma, {
        title: 'Test Page',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'test-page',
        isPublished: true,
        menuItemId: menu.id,
      });

      const result = await getPageBySlugService(prisma, 'test-page');

      expect(result?.slug).toBe('test-page');
    });
  });

  describe('updatePageByIdService', () => {
    it('should update a page', async () => {
      const menu = await createMenu();

      const created = await savePageService(prisma, {
        title: 'Initial Title',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'test-page',
        isPublished: true,
        menuItemId: menu.id,
      });

      const updated = await updatePageByIdService({
        prisma,
        id: created.id,
        data: {
          title: 'Updated Title',
        },
      });

      expect(updated.title).toBe('Updated Title');
    });
  });

  describe('getAllPageWithMenuIdService', () => {
    it('should return only published pages', async () => {
      const menu = await createMenu();

      await savePageService(prisma, {
        title: 'Published',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'published',
        isPublished: true,
        menuItemId: menu.id,
      });

      await savePageService(prisma, {
        title: 'Draft',
        description: 'Description',
        content: 'Content',
        imageUrl: null,
        slug: 'draft',
        isPublished: false,
        menuItemId: menu.id,
      });

      const result = await getAllPageWithMenuIdService(
        prisma,
        menu.id,
      );

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('published');
    });
  });
});
