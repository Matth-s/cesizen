import { describe, it, expect } from 'vitest';
import { menuObjectSchema, createMenuSchema } from '../menu-schema';

describe('MenuSchema', () => {
  describe('menuObjectSchema', () => {
    it('should validate correct menu object', () => {
      const data = {
        id: '1',
        label: 'Home',
        path: '/',
        show: true,
      };
      const result = menuObjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('createMenuSchema', () => {
    it('should validate correct create menu data', () => {
      const data = {
        label: 'About',
        path: '/about',
        show: false,
      };
      const result = createMenuSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail on missing path', () => {
      const data = {
        label: 'About',
        path: '',
        show: true,
      };
      const result = createMenuSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
