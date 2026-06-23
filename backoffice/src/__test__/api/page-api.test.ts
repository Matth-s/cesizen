import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/lib/api-client';
import {
  getPageListApi,
  createPageApi,
  getPagePageById,
  deletePageApi,
} from '../../features/pages-management/api/page-api';

vi.mock('@/lib/api-client', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Pages API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getPageListApi devrait retourner un tableau de pages validé par Zod', async () => {
    const mockPages = [
      {
        id: 'p1',
        title: 'Gérer son stress',
        content: 'Contenu détaillé...',
        slug: 'gerer-son-stress',
        isPublished: true,
        createdAt: '2024-05-10',
        menuItemId: 'm1',
      },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockPages });

    const result = await getPageListApi();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Gérer son stress');
  });

  it('createPageApi devrait envoyer les données de la page au serveur', async () => {
    const newPage = {
      title: 'Nouvelle Page',
      content: 'Contenu...',
      slug: 'nouvelle-page',
      isPublished: false,
      menuItemId: 'm1',
    };

    vi.mocked(api.post).mockResolvedValue({ status: 201 });

    await createPageApi(newPage);
    expect(api.post).toHaveBeenCalledWith('/page', newPage);
  });

  it('getPagePageById devrait retourner une page unique validée', async () => {
    const mockPage = {
      id: 'p1',
      title: 'Titre',
      content: 'Corps',
      slug: 'titre',
      isPublished: true,
      createdAt: '2024-05-10',
      menuItemId: 'm1',
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockPage });

    const result = await getPagePageById('p1');
    expect(api.get).toHaveBeenCalledWith('/page/by-id/p1');
    expect(result.id).toBe('p1');
  });

  it('getPagePageById devrait échouer si le contenu est manquant (Zod)', async () => {
    const invalidPage = { id: 'p1', title: 'Sans contenu' };
    vi.mocked(api.get).mockResolvedValue({ data: invalidPage });

    await expect(getPagePageById('p1')).rejects.toThrow();
  });

  it('deletePageApi devrait appeler la bonne route de suppression', async () => {
    vi.mocked(api.delete).mockResolvedValue({ status: 200 });

    await deletePageApi('p1');
    expect(api.delete).toHaveBeenCalledWith('/page/p1');
  });
});
