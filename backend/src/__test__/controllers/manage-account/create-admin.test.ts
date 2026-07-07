import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAdminAccountController } from '../../../controllers/manage-account/create-admin-account-controller';
import * as userServices from '../../../services/user';
import * as bcryptLib from '../../../libs/bcrypt';
import * as expirationDate from '../../../constants/expiration-date';
import * as uuid from 'uuid';

vi.mock('../../services/user');
vi.mock('../../libs/bcrypt');
vi.mock('../../constants/expiration-date');
vi.mock('uuid');

describe('createAdminAccountController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    process.env.FRONTEND_URL = 'http://localhost:3000';

    mockRequest = {
      server: { prisma: {} },
      body: {
        email: 'admin@test.com',
        password: 'Password123!',
        username: 'AdminUser',
        role: 'ADMIN',
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

  it("devrait créer un compte ADMIN avec l'URL frontend correcte", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(null);
    vi.spyOn(uuid, 'v4').mockReturnValue('mock-token-admin' as any);
    vi.spyOn(expirationDate, 'getEmailExpiration').mockReturnValue(
      new Date(),
    );
    vi.spyOn(bcryptLib, 'hashPassword').mockResolvedValue(
      'hashed_pass',
    );
    vi.spyOn(userServices, 'createUser').mockResolvedValue({} as any);

    await createAdminAccountController(mockRequest, mockReply);

    expect(userServices.createUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        role: 'ADMIN',
        emailConfirmationToken: 'mock-token-admin',
      }),
    );

    expect(mockReply.code).toHaveBeenCalledWith(201);
  });

  it('devrait créer un compte USER avec le deep link mobile (URL schéma)', async () => {
    mockRequest.body.role = 'USER';

    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(null);
    vi.spyOn(uuid, 'v4').mockReturnValue('mock-token-user' as any);
    vi.spyOn(bcryptLib, 'hashPassword').mockResolvedValue(
      'hashed_pass',
    );
    vi.spyOn(userServices, 'createUser').mockResolvedValue({} as any);

    await createAdminAccountController(mockRequest, mockReply);

    expect(userServices.createUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        role: 'USER',
        emailConfirmationToken: 'mock-token-user',
      }),
    );

    expect(mockReply.code).toHaveBeenCalledWith(201);
  });

  it("devrait retourner 409 si l'email existe déjà", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue({
      id: '1',
    } as any);

    const createSpy = vi.spyOn(userServices, 'createUser');

    await createAdminAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(409);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Cet email est déjà utilisé',
    });

    expect(createSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockRejectedValue(
      new Error('Crash'),
    );

    await createAdminAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
