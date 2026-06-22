import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteAccountController } from '../delete-user-controller';
import * as userServices from '../../../services/user';
import * as bcryptLib from '../../../libs/bcrypt';

vi.mock('../../services/user');
vi.mock('../../libs/bcrypt');

describe('deleteAccountController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      user: { userId: 'user-123' },
      body: { password: 'password123' },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait supprimer le compte avec succès si le mot de passe est correct', async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue({
      id: 'user-123',
      password: 'hashed_password',
    } as any);
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(true);
    vi.spyOn(userServices, 'deleteUserById').mockResolvedValue(
      {} as any,
    );

    await deleteAccountController(mockRequest, mockReply);

    expect(bcryptLib.comparePassword).toHaveBeenCalledWith(
      'password123',
      'hashed_password',
    );
    expect(userServices.deleteUserById).toHaveBeenCalledWith(
      expect.anything(),
      'user-123',
    );
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Utilisateur supprimé',
    });
  });

  it('devrait retourner 400 si le mot de passe est incorrect', async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue({
      id: 'user-123',
      password: 'hashed_password',
    } as any);
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(false);

    const deleteSpy = vi.spyOn(userServices, 'deleteUserById');

    await deleteAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Mot de passe invalide',
    });

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 404 si l'utilisateur n'existe pas", async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue(null);

    await deleteAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Compte non trouvé',
    });
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(userServices, 'getUserById').mockRejectedValue(
      new Error(),
    );

    await deleteAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
