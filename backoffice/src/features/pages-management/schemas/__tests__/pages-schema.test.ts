import { describe, it, expect } from 'vitest';
import { pageObjectSchema, createPageSchema } from '../pages-schema';

describe('PagesSchema', () => {
  describe('pageObjectSchema', () => {
    it('should validate correct page object', () => {
      const data = {
        id: '1',
        title: 'Title',
        content: 'Content',
        slug: 'slug',
        isPublished: true,
        createdAt: '2023-01-01',
        menuItemId: 'menu-1',
      };
      const result = pageObjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('createPageSchema', () => {
    it('should validate correct create page data', () => {
      const data = {
        title: 'Title',
        content: 'Content',
        slug: 'slug',
        isPublished: false,
        menuItemId: 'menu-1',
      };
      const result = createPageSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail on empty title', () => {
      const data = {
        title: '',
        content: 'Content',
        slug: 'slug',
        isPublished: false,
        menuItemId: 'menu-1',
      };
      const result = createPageSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
