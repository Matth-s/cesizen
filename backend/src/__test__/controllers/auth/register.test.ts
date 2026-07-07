import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerController } from '../../../controllers/authentication/register-controller';
import * as userServices from '../../../services/user';
import * as bcryptLib from '../../../libs/bcrypt.js';
import * as mailLib from '../../../libs/mail';
import * as expirationDate from '../../../constants/expiration-date';
import * as uuid from 'uuid';

vi.mock('../../services/user');
vi.mock('../../libs/bcrypt.js');
vi.mock('../../libs/mail');
vi.mock('../../constants/expiration-date');
vi.mock('uuid');

describe('registerController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      body: {
        email: 'newuser@test.com',
        password: 'password123',
        username: 'testuser',
      },
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

  it('devrait créer un utilisateur et envoyer un email de confirmation (Succès)', async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(null);

    vi.spyOn(bcryptLib, 'hashPassword').mockResolvedValue(
      'hashed_password',
    );

    vi.spyOn(uuid, 'v4').mockReturnValue('mocked-uuid-token' as any);

    const mockDate = new Date();
    vi.spyOn(expirationDate, 'getEmailExpiration').mockReturnValue(
      mockDate,
    );

    vi.spyOn(userServices, 'createUser').mockResolvedValue({
      email: 'newuser@test.com',
    } as any);

    vi.spyOn(mailLib, 'sendConfirmEmail').mockResolvedValue(
      {} as any,
    );

    await registerController(mockRequest, mockReply);

    expect(userServices.createUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        email: 'newuser@test.com',
        password: 'hashed_password',
        emailConfirmationToken: 'mocked-uuid-token',
        emailConfirmationExpire: mockDate,
      }),
    );

    // expect(mailLib.sendConfirmEmail).toHaveBeenCalled();
    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Un email à été envoyé à newuser@test.com',
    });
  });

  it("devrait retourner 409 si l'email est déjà utilisé", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue({
      id: 'existing-id',
    } as any);

    const createSpy = vi.spyOn(userServices, 'createUser');

    await registerController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(409);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Cet email est déjà utilisé',
    });

    expect(createSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur serveur", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockRejectedValue(
      new Error('DB Crash'),
    );

    await registerController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
