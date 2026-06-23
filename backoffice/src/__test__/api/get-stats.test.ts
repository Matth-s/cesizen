import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStatsApi } from '@/features/dashboard/api/get-stats-api';
import { api } from '@/lib/api-client';

vi.mock('@/lib/api-client', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('getStatsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait retourner les statistiques validées quand l’API répond correctement', async () => {
    const mockStats = {
      totalPages: 10,
      totalPublishedPages: 8,
      totalMenus: 5,
      totalUsers: 150,
      totalQuiz: 3,
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockStats });

    const result = await getStatsApi();

    expect(api.get).toHaveBeenCalledWith('/dashboard');
    expect(result).toEqual(mockStats);
  });

  it('devrait lever une erreur si une statistique est manquante ou du mauvais type (Zod)', async () => {
    const invalidStats = {
      totalPages: 10,
      totalPublishedPages: '8',
      totalMenus: 5,
      // totalUsers manquant
      totalQuiz: 3,
    };

    vi.mocked(api.get).mockResolvedValue({ data: invalidStats });

    await expect(getStatsApi()).rejects.toThrow();
  });

  it('devrait propager l’erreur en cas de problème réseau ou 500', async () => {
    vi.mocked(api.get).mockRejectedValue(
      new Error('Internal Server Error'),
    );

    await expect(getStatsApi()).rejects.toThrow(
      'Internal Server Error',
    );
  });
});
