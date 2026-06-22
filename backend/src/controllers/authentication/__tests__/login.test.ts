import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginController } from '../login-controller';
import * as userServices from '../../../services/user.js';
import * as bcryptLib from '../../../libs/bcrypt';
import * as mailLib from '../../../libs/mail';
import * as expirationDate from '../../../constants/expiration-date';

vi.mock('../../services/user.js');
vi.mock('../../libs/bcrypt');
vi.mock('../../libs/mail');
vi.mock('../../constants/expiration-date');
vi.mock('uuid', () => ({ v4: () => 'mocked-uuid' }));

describe('loginController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      server: { prisma: {} },
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      accessJwtSign: vi.fn().mockResolvedValue('access-token'),
      refreshJwtSign: vi.fn().mockResolvedValue('refresh-token'),
      generateCsrf: vi.fn().mockReturnValue('csrf-token'),
      setCookie: vi.fn().mockReturnThis(),
    };
  });

  it('devrait retourner 200 en cas de succès', async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue({
      id: 1,
      isActive: true,
      emailVerified: true,
      password: 'hash',
      username: 'user',
      role: 'ADMIN',
    } as any);
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(true);

    await loginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(200);
  });

  it("devrait retourner 403 si l'email n'existe pas", async () => {
    vi.mocked(userServices.getUserByEmail).mockResolvedValue(null);
    vi.mocked(bcryptLib.comparePassword).mockResolvedValue(false);

    await loginController(mockRequest, mockReply);

    expect(bcryptLib.comparePassword).toHaveBeenCalledWith('e', 'f');
    expect(mockReply.code).toHaveBeenCalledWith(403);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Email ou mot de passe invalide',
    });
  });

  it('devrait retourner 401 si le compte est désactivé', async () => {
    vi.mocked(userServices.getUserByEmail).mockResolvedValue({
      isActive: false,
    } as any);

    await loginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Votre compte a été désactivé',
    });
  });

  it('devrait retourner 403 si le mot de passe est incorrect', async () => {
    vi.mocked(userServices.getUserByEmail).mockResolvedValue({
      isActive: true,
      password: 'hashed_password',
    } as any);
    vi.mocked(bcryptLib.comparePassword).mockResolvedValue(false);

    await loginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(403);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Email ou mot de passe invalide',
    });
  });

  it("devrait renvoyer un email si le compte n'est pas vérifié", async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      username: 'JohnDoe',
      isActive: true,
      emailVerified: false,
      password: 'hashed_password',
    };
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(true);
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);
    vi.spyOn(mailLib, 'sendConfirmEmail').mockResolvedValue(
      {} as any,
    );

    vi.spyOn(expirationDate, 'getEmailExpiration').mockReturnValue(
      new Date(),
    );

    await loginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(201);
    // expect(mailLib.sendConfirmEmail).toHaveBeenCalled();
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Un email de confirmation vous a été envoyé',
    });
  });

  it('devrait retourner 500 si une exception est levée', async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockRejectedValue(
      new Error('DB Error'),
    );

    await loginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
