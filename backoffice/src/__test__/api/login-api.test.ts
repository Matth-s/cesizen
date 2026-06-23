import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginApi } from '@/features/auth/api/login-api';
import { api } from '@/lib/api-client';

vi.mock('@/lib/api-client', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('LoginApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devrait retourner les données utilisateur lors d’une connexion réussie', async () => {
    const mockResponse = {
      username: 'testuser',
      role: 'ADMIN',
      csrfToken: 'token123',
    };

    vi.mocked(api.post).mockResolvedValue({ data: mockResponse });

    const result = await loginApi({
      email: 'test@example.com',
      password: 'password',
    });

    expect(api.post).toHaveBeenCalledWith(
      '/authentication/admin/login',
      {
        email: 'test@example.com',
        password: 'password',
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it('devrait lever une erreur en cas d’identifiants incorrects (401)', async () => {
    vi.mocked(api.post).mockRejectedValue(new Error('Unauthorized'));

    await expect(
      loginApi({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow('Unauthorized');
  });

  it('devrait lever une erreur si les données reçues sont invalides (Echec Zod)', async () => {
    const invalidResponse = {
      username: 'testuser',
    };

    vi.mocked(api.post).mockResolvedValue({ data: invalidResponse });

    await expect(
      loginApi({ email: 'test@example.com', password: 'password' }),
    ).rejects.toThrow();
  });
});
