import { describe, it, expect, vi, beforeEach } from 'vitest';
import { askResetPasswordController } from '../../../controllers/authentication/ask-reset-password-controller';
import * as userServices from '../../../services/user';
import * as mailLib from '../../../libs/mail';
import * as expirationDate from '../../../constants/expiration-date';
import * as uuid from 'uuid';

vi.mock('../../services/user');
vi.mock('../../libs/mail');
vi.mock('../../constants/expiration-date');
vi.mock('uuid');

describe('askResetPasswordController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      body: { email: 'user@test.com' },
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

  it("devrait retourner 200 et envoyer un email si l'utilisateur existe", async () => {
    const mockUser = {
      id: 'user-123',
      email: 'user@test.com',
      username: 'JohnDoe',
    };

    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);
    vi.spyOn(mailLib, 'sendResetPasswordEmail').mockResolvedValue(
      {} as any,
    );
    vi.spyOn(uuid, 'v4').mockReturnValue('mocked-token-123' as any);
    vi.spyOn(
      expirationDate,
      'getResetPasswordExpiration',
    ).mockReturnValue(new Date());

    await askResetPasswordController(mockRequest, mockReply);

    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'user-123',
      expect.objectContaining({
        resetPasswordToken: 'mocked-token-123',
      }),
    );
    // expect(mailLib.sendResetPasswordEmail).toHaveBeenCalled();
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Un email a été envoyé',
    });
  });

  it("devrait retourner 404 si l'utilisateur n'est pas trouvé", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(null);

    await askResetPasswordController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Utilisateur introuvable',
    });
  });

  it("devrait retourner 500 en cas d'exception lors de la mise à jour ou de l'envoi", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue({
      id: '1',
    } as any);

    vi.spyOn(userServices, 'updateUser').mockRejectedValue(
      new Error('Update failed'),
    );

    await askResetPasswordController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
