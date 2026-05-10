import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { getPageListApi, createPageApi, getPagePageById } from '../page-api';
import { api } from '@/lib/api-client';

describe('PageApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  const mockPage = {
    id: '1',
    title: 'Test Page',
    content: 'Content',
    slug: 'test-page',
    isPublished: true,
    createdAt: '2023-01-01',
    menuItemId: 'menu-1',
  };

  it('should return a list of pages', async () => {
    mock.onGet('/page').reply(200, [mockPage]);

    const result = await getPageListApi();

    expect(result).toEqual([mockPage]);
  });

  it('should create a page', async () => {
    const newPage = {
      title: 'New Page',
      content: 'Content',
      slug: 'new-page',
      isPublished: false,
      menuItemId: 'menu-1',
    };

    mock.onPost('/page').reply(200);

    await createPageApi(newPage);

    expect(mock.history.post.length).toBe(1);
    expect(JSON.parse(mock.history.post[0].data)).toEqual(newPage);
  });

  it('should get a page by id', async () => {
    mock.onGet('/page/by-id/1').reply(200, mockPage);

    const result = await getPagePageById('1');

    expect(result).toEqual(mockPage);
  });

  it('should throw error if validation fails', async () => {
    mock.onGet('/page/by-id/1').reply(200, { invalid: 'data' });

    await expect(getPagePageById('1')).rejects.toThrow();
  });
});
