import { describe, it, expect } from 'vitest';
import { Value } from '@sinclair/typebox/value';
import { createPageSchema } from '../page-schema';

describe('PageSchema', () => {
  describe('createPageSchema', () => {
    it('should validate correct page data', () => {
      const data = {
        title: 'Title',
        description: 'Description',
        content: 'Content',
        slug: 'slug',
        isPublished: true,
        menuItemId: 'menu-1'
      };
      expect(Value.Check(createPageSchema.body, data)).toBe(true);
    });

    it('should validate without optional description', () => {
      const data = {
        title: 'Title',
        content: 'Content',
        slug: 'slug',
        isPublished: false,
        menuItemId: 'menu-1'
      };
      expect(Value.Check(createPageSchema.body, data)).toBe(true);
    });

    it('should fail if required fields are missing', () => {
      const data = {
        title: 'Title'
      };
      expect(Value.Check(createPageSchema.body, data)).toBe(false);
    });
  });
});
