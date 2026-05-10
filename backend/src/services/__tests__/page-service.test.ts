import { describe, it, expect, vi } from 'vitest';
import { prismaMock } from '../../__mocks__/prisma';
import {
  getAllPageService,
  getPageByIdService,
  getPageBySlugService,
  savePageService,
  updatePageByIdService,
  getAllPageWithMenuIdService,
} from '../page-service';

describe('PageService', () => {
  const mockPage = {
    id: 'page-1',
    title: 'Test Page',
    description: 'Description',
    content: 'Content',
    imageUrl: null,
    slug: 'test-page',
    isPublished: true,
    createdAt: new Date(),
    menuItemId: 'menu-1',
  };

  describe('getAllPageService', () => {
    it('should return all pages', async () => {
      prismaMock.page.findMany.mockResolvedValue([mockPage]);

      const result = await getAllPageService(prismaMock);

      expect(result).toEqual([mockPage]);
      expect(prismaMock.page.findMany).toHaveBeenCalled();
    });
  });

  describe('getPageByIdService', () => {
    it('should return page by id', async () => {
      prismaMock.page.findFirst.mockResolvedValue(mockPage);

      const result = await getPageByIdService(
        prismaMock,
        'page-1',
        false,
      );

      expect(result).toEqual(mockPage);
    });

    it('should filter by published status if requested', async () => {
      prismaMock.page.findFirst.mockResolvedValue(mockPage);

      await getPageByIdService(prismaMock, 'page-1', true);

      expect(prismaMock.page.findFirst).toHaveBeenCalledWith({
        where: {
          id: 'page-1',
          isPublished: true,
        },
      });
    });
  });

  describe('getPageBySlugService', () => {
    it('should return page by slug', async () => {
      prismaMock.page.findUnique.mockResolvedValue(mockPage);

      const result = await getPageBySlugService(
        prismaMock,
        'test-page',
      );

      expect(result).toEqual(mockPage);
    });
  });

  describe('savePageService', () => {
    it('should save a new page', async () => {
      const { id, createdAt, ...pageData } = mockPage;
      prismaMock.page.create.mockResolvedValue(mockPage);

      const result = await savePageService(prismaMock, pageData);

      expect(result).toEqual(mockPage);
      expect(prismaMock.page.create).toHaveBeenCalledWith({
        data: pageData,
      });
    });
  });

  describe('updatePageByIdService', () => {
    it('should update a page', async () => {
      prismaMock.page.update.mockResolvedValue(mockPage);

      const result = await updatePageByIdService({
        prisma: prismaMock,
        id: 'page-1',
        data: { title: 'Updated Title' },
      });

      expect(result).toEqual(mockPage);
      expect(prismaMock.page.update).toHaveBeenCalledWith({
        where: { id: 'page-1' },
        data: { title: 'Updated Title' },
      });
    });
  });

  describe('getAllPageWithMenuIdService', () => {
    it('should return published pages for a menu item', async () => {
      prismaMock.page.findMany.mockResolvedValue([mockPage]);

      const result = await getAllPageWithMenuIdService(
        prismaMock,
        'menu-1',
      );

      expect(result).toEqual([mockPage]);
      expect(prismaMock.page.findMany).toHaveBeenCalledWith({
        where: {
          menuItemId: 'menu-1',
          isPublished: true,
        },
      });
    });
  });
});
