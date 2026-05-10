import { describe, it, expect } from 'vitest';
import { dynamicPageObjectSchema } from '../dynamic-page-schema';

describe('DynamicPageSchema', () => {
  it('should validate correct page data', () => {
    const data = {
      id: 'p1',
      title: 'Title',
      description: 'Desc',
      content: 'Content',
      imageUrl: 'http://img.jpg',
      slug: 'slug',
      isPublished: true,
      createdAt: '2023-01-01',
    };
    expect(dynamicPageObjectSchema.safeParse(data).success).toBe(true);
  });

  it('should fail if required fields are missing', () => {
    const data = { id: 'p1' };
    expect(dynamicPageObjectSchema.safeParse(data).success).toBe(false);
  });
});
