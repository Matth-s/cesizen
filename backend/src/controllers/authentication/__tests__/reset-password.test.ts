import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetPasswordController } from '../reset-password-controller';
import * as userServices from '../../../services/user';
import * as bcryptLib from '../../../libs/bcrypt';

vi.mock('../../services/user');
vi.mock('../../libs/bcrypt');

describe('resetPasswordController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      query: { token: 'reset-token-123' },
      body: { password: 'newPassword123' },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait modifier le mot de passe avec succès si le token est valide', async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);

    const mockUser = {
      id: 'user-uuid',
      resetPasswordExpire: futureDate,
    };

    vi.spyOn(
      userServices,
      'getUserWithPasswordToken',
    ).mockResolvedValue(mockUser as any);
    vi.spyOn(bcryptLib, 'hashPassword').mockResolvedValue(
      'hashed_new_password',
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await resetPasswordController(mockRequest, mockReply);

    expect(bcryptLib.hashPassword).toHaveBeenCalledWith(
      'newPassword123',
    );
    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'user-uuid',
      expect.objectContaining({
        password: 'hashed_new_password',
        resetPasswordToken: null,
        resetPasswordExpire: null,
      }),
    );

    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le mot de passe a été modifié avec succès',
    });
  });

  it('devrait retourner 410 si le token a expiré', async () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    const mockUser = {
      id: 'user-uuid',
      resetPasswordExpire: pastDate,
    };

    vi.spyOn(
      userServices,
      'getUserWithPasswordToken',
    ).mockResolvedValue(mockUser as any);
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await resetPasswordController(mockRequest, mockReply);

    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'user-uuid',
      { resetPasswordExpire: null, resetPasswordToken: null },
    );
    expect(mockReply.code).toHaveBeenCalledWith(410);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le code pour modifier le mot de passe a expiré',
    });
  });

  it("devrait retourner 404 si le token est invalide ou l'utilisateur inexistant", async () => {
    vi.spyOn(
      userServices,
      'getUserWithPasswordToken',
    ).mockResolvedValue(null);

    await resetPasswordController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le code est invalide',
    });
  });

  it("devrait retourner 500 en cas d'erreur imprévue", async () => {
    vi.spyOn(
      userServices,
      'getUserWithPasswordToken',
    ).mockRejectedValue(new Error('Crash'));

    await resetPasswordController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
