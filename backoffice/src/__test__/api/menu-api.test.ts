import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/lib/api-client';

import {
  getMenuApi,
  createMenuApi,
  updateMenuApi,
  deleteMenuItemApi,
} from '@/features/menu-management/api/menu-api';

vi.mock('@/lib/api-client', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Menu API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getMenuApi devrait retourner la liste des menus validée par Zod', async () => {
    const mockMenus = [
      { id: '1', label: 'Accueil', path: '/', show: true },
      { id: '2', label: 'Contact', path: '/contact', show: false },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockMenus });

    const result = await getMenuApi();

    expect(api.get).toHaveBeenCalledWith('/menu/all');
    expect(result).toHaveLength(2);
    expect(result[0].label).toBe('Accueil');
  });

  it('getMenuApi devrait échouer si les données du menu sont malformées', async () => {
    const badData = [{ id: '1', label: 'Accueil' }];
    vi.mocked(api.get).mockResolvedValue({ data: badData });

    await expect(getMenuApi()).rejects.toThrow();
  });

  it('createMenuApi devrait envoyer les données de création via POST', async () => {
    const newMenu = { label: 'Blog', path: '/blog', show: true };
    vi.mocked(api.post).mockResolvedValue({ status: 201 });

    await createMenuApi(newMenu);

    expect(api.post).toHaveBeenCalledWith('/menu', newMenu);
  });

  it('updateMenuApi devrait envoyer les modifications via PUT avec l’ID correct', async () => {
    const updateData = {
      id: '123',
      label: 'Blog MAJ',
      path: '/blog-new',
      show: true,
    };
    vi.mocked(api.put).mockResolvedValue({ status: 200 });

    await updateMenuApi(updateData);

    expect(api.put).toHaveBeenCalledWith('/menu/123', updateData);
  });

  it('deleteMenuItemApi devrait appeler la route de suppression avec l’ID', async () => {
    vi.mocked(api.delete).mockResolvedValue({ status: 200 });

    await deleteMenuItemApi('456');

    expect(api.delete).toHaveBeenCalledWith('/menu/456');
  });

  it('should propagate API errors (ex: 409 Conflict)', async () => {
    vi.mocked(api.post).mockRejectedValue(
      new Error('Ce lien existe déjà'),
    );

    await expect(
      createMenuApi({ label: 'Test', path: '/existe', show: true }),
    ).rejects.toThrow('Ce lien existe déjà');
  });
});
