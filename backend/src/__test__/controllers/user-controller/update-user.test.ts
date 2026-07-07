import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userServices from '../../../services/user';
import * as bcryptLib from '../../../libs/bcrypt';
import { updateUserPasswordController } from '../../../controllers/user-controller';

vi.mock('../../services/user');
vi.mock('../../libs/bcrypt');

describe('updateUserPasswordController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      user: { userId: 'user-123' },
      body: { password: 'new-secure-password' },
      log: {
        error: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait mettre à jour le mot de passe avec succès', async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue({
      id: 'user-123',
    } as any);
    vi.spyOn(bcryptLib, 'hashPassword').mockResolvedValue(
      'hashed-password-abc',
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await updateUserPasswordController(mockRequest, mockReply);

    expect(userServices.getUserById).toHaveBeenCalledWith(
      expect.anything(),
      'user-123',
    );
    expect(bcryptLib.hashPassword).toHaveBeenCalledWith(
      'new-secure-password',
    );
    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'user-123',
      {
        password: 'hashed-password-abc',
      },
    );
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le mot de passe a été modifié avec succès',
    });
  });

  it("devrait retourner 404 si l'utilisateur n'existe pas", async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue(null);

    const hashSpy = vi.spyOn(bcryptLib, 'hashPassword');

    await updateUserPasswordController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Utilisateur non trouvé',
    });

    expect(hashSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(userServices, 'getUserById').mockRejectedValue(
      new Error(),
    );

    await updateUserPasswordController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
