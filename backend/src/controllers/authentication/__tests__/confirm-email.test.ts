import { describe, it, expect, vi, beforeEach } from 'vitest';
import { confirmEmailController } from '../confirm-email-controller';
import * as userServices from '../../../services/user';

vi.mock('../../services/user');

describe('confirmEmailController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      query: { token: 'valid-token-123' },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait retourner 200 si le token est valide et non expiré', async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);

    const mockUser = {
      id: 'user-1',
      emailConfirmationExpire: futureDate,
    };

    vi.spyOn(userServices, 'getUserWithEmailToken').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await confirmEmailController(mockRequest, mockReply);

    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'user-1',
      expect.objectContaining({
        emailVerified: expect.any(Date),
        emailConfirmationToken: null,
      }),
    );
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "L'email a été vérifié avec succès",
    });
  });

  it('devrait retourner 410 si le token est expiré', async () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    const mockUser = {
      id: 'user-1',
      emailConfirmationExpire: pastDate,
    };

    vi.spyOn(userServices, 'getUserWithEmailToken').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await confirmEmailController(mockRequest, mockReply);

    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'user-1',
      expect.objectContaining({
        emailVerified: null,
        emailConfirmationToken: null,
      }),
    );
    expect(mockReply.code).toHaveBeenCalledWith(410);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le code de confirmation a expiré',
    });
  });

  it("devrait retourner 404 si l'utilisateur ou la date d'expiration est introuvable", async () => {
    vi.spyOn(userServices, 'getUserWithEmailToken').mockResolvedValue(
      null,
    );

    await confirmEmailController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le code de validation est invalide',
    });
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(userServices, 'getUserWithEmailToken').mockRejectedValue(
      new Error('DB Error'),
    );

    await confirmEmailController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur interne est survenue',
    });
  });
});
