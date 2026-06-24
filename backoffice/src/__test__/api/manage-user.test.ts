import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/lib/api-client';
import { createUserApi } from '@/features/manage-user/api/create-user-api';
import { deleteUserApi } from '@/features/manage-user/api/delete-user-api';
import { getUserList } from '@/features/manage-user/api/get-user-list-api';
import { updateUserApi } from '@/features/manage-user/api/update-user-api';
import { USER_ROLE } from '@/types/user-role';

vi.mock('@/lib/api-client', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Admin Users API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createUserApi devrait envoyer les bonnes données au serveur', async () => {
    const mockUser = {
      email: 'test@test.com',
      username: 'TestUser',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      role: USER_ROLE.USER,
    };

    vi.mocked(api.post).mockResolvedValue({ status: 201 });

    await createUserApi(mockUser);

    expect(api.post).toHaveBeenCalledWith(
      '/admin/create-admin-account',
      mockUser,
    );
  });

  // --- TEST GET LIST (READ) ---
  it('getUserList devrait retourner une liste d’utilisateurs validée par Zod', async () => {
    const mockUsers = [
      {
        id: '1',
        username: 'John',
        email: 'john@cesi.fr',
        role: USER_ROLE.ADMIN,
        isActive: true,
        createAt: '2024-01-01',
        emailVerified: null,
      },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockUsers });

    const result = await getUserList();
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe('John');
  });

  it('getUserList devrait échouer si le format de la date est incorrect (Zod)', async () => {
    const badData = [{ id: '1', username: 123 }]; // username devrait être string
    vi.mocked(api.get).mockResolvedValue({ data: badData });

    await expect(getUserList()).rejects.toThrow();
  });

  // --- TEST UPDATE ---
  it('updateUserApi devrait modifier le statut et valider la réponse', async () => {
    const updateData = { id: '1', isActive: false };
    vi.mocked(api.put).mockResolvedValue({
      data: { message: 'Statut mis à jour' },
    });

    const response = await updateUserApi(updateData);

    expect(api.put).toHaveBeenCalledWith(
      '/admin/update-user-status?userId=1',
    );
    expect(response.message).toBe('Statut mis à jour');
  });

  // --- TEST DELETE ---
  it('deleteUserApi devrait appeler la route de suppression avec l’ID', async () => {
    vi.mocked(api.delete).mockResolvedValue({ status: 200 });

    await deleteUserApi('user-123');

    expect(api.delete).toHaveBeenCalledWith(
      '/admin/delete-user?userId=user-123',
    );
  });
});
