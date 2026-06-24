import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCurrentUserApi } from '@/api/get-current-user-api';
import { api } from '@/lib/api-client';

vi.mock('@/lib/api-client', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('getCurrentUserApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait retourner les données utilisateur quand l’API répond correctement', async () => {
    const mockUserData = {
      username: 'Matthieu',
      role: 'ADMIN',
      csrfToken: 'abc-123-token',
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockUserData });

    const result = await getCurrentUserApi();

    expect(api.get).toHaveBeenCalledWith('/user/current');
    expect(result).toEqual(mockUserData);
  });

  it('devrait lever une erreur si les données reçues ne respectent pas le schéma (Zod)', async () => {
    const invalidUserData = {
      username: 'Matthieu',
      csrfToken: 'abc-123-token',
    };

    vi.mocked(api.get).mockResolvedValue({ data: invalidUserData });

    await expect(getCurrentUserApi()).rejects.toThrow();
  });

  it('devrait propager l’erreur si l’API retourne une erreur 401', async () => {
    vi.mocked(api.get).mockRejectedValue(new Error('Unauthorized'));

    await expect(getCurrentUserApi()).rejects.toThrow('Unauthorized');
  });
});
