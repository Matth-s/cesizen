import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { getDynamicPageApi, getDynamicPageByIdApi } from '../get-dynamic-page-api';
import { api } from '@/lib/api-client';

describe('DynamicPageApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  const mockPage = {
    id: 'p1',
    title: 'Title',
    description: 'Desc',
    content: 'Content',
    imageUrl: 'img',
    slug: 'slug',
    isPublished: true,
    createdAt: '2023-01-01',
  };

  it('should return a list of pages', async () => {
    mock.onGet('/page/published/menu-1').reply(200, [mockPage]);
    const result = await getDynamicPageApi('menu-1');
    expect(result).toEqual([mockPage]);
  });

  it('should return a single page by id', async () => {
    mock.onGet('/page/by-id/p1').reply(200, mockPage);
    const result = await getDynamicPageByIdApi('p1');
    expect(result).toEqual(mockPage);
  });
});
