import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logOutApi } from '../logout-api';
import { api } from '@/lib/api-client';

// Mock de l'instance API
vi.mock('@/lib/api-client', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('logOutApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait appeler la route de déconnexion avec la méthode POST', async () => {
    vi.mocked(api.post).mockResolvedValue({ status: 200 });

    await logOutApi();

    expect(api.post).toHaveBeenCalledWith('/user/logout');
  });

  it('devrait propager une erreur si le serveur ne répond pas', async () => {
    vi.mocked(api.post).mockRejectedValue(new Error('Network Error'));

    await expect(logOutApi()).rejects.toThrow('Network Error');
  });
});
