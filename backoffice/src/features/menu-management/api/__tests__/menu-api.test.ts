import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { getMenuApi, createMenuApi, deleteMenuItemApi } from '../menu-api';
import { api } from '@/lib/api-client';

describe('MenuApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  const mockMenu = {
    id: '1',
    label: 'Home',
    path: '/',
    show: true,
  };

  it('should return a list of menus', async () => {
    mock.onGet('/menu/all').reply(200, [mockMenu]);

    const result = await getMenuApi();

    expect(result).toEqual([mockMenu]);
  });

  it('should create a menu', async () => {
    const newMenu = {
      label: 'About',
      path: '/about',
      show: true,
    };

    mock.onPost('/menu').reply(200);

    await createMenuApi(newMenu);

    expect(mock.history.post.length).toBe(1);
    expect(JSON.parse(mock.history.post[0].data)).toEqual(newMenu);
  });

  it('should delete a menu item', async () => {
    mock.onDelete('/menu/1').reply(200, { success: true });

    const result = await deleteMenuItemApi('1');

    expect(result).toEqual({ success: true });
  });
});
