import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminLoginController } from '../../../controllers/authentication/admin-login-controller';
import * as userServices from '../../../services/user';
import * as bcryptLib from '../../../libs/bcrypt';

vi.mock('../../services/user');
vi.mock('../../libs/bcrypt');

describe('adminLoginController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      body: {
        email: 'admin@test.com',
        password: 'password123',
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
      accessJwtSign: vi.fn().mockResolvedValue('admin-access-token'),
      refreshJwtSign: vi
        .fn()
        .mockResolvedValue('admin-refresh-token'),
      generateCsrf: vi.fn().mockReturnValue('admin-csrf-token'),
      setCookie: vi.fn().mockReturnThis(),
    };
  });

  it("devrait retourner 201 si l'utilisateur est un ADMIN avec le bon mot de passe", async () => {
    const mockAdmin = {
      id: 'admin-id',
      email: 'admin@test.com',
      password: 'hashed_password',
      username: 'SuperAdmin',
      role: 'ADMIN',
    };

    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(
      mockAdmin as any,
    );
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(true);

    await adminLoginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      id: 'admin-id',
      role: 'ADMIN',
      username: 'SuperAdmin',
      csrfToken: 'admin-csrf-token',
    });
  });

  it("devrait retourner 403 si l'utilisateur existe mais n'est pas ADMIN", async () => {
    const mockUser = {
      id: 'user-id',
      role: 'USER',
      password: 'hashed_password',
    };

    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(false);

    await adminLoginController(mockRequest, mockReply);

    expect(bcryptLib.comparePassword).toHaveBeenCalledWith('e', 'f');
    expect(mockReply.code).toHaveBeenCalledWith(403);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Email ou mot de passe invalide',
    });
  });

  it('devrait retourner 403 si le mot de passe admin est incorrect', async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockResolvedValue({
      role: 'ADMIN',
      password: 'hashed_password',
    } as any);
    vi.spyOn(bcryptLib, 'comparePassword').mockResolvedValue(false);

    await adminLoginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(403);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Email ou mot de passe invalide',
    });
  });

  it("devrait retourner 500 en cas d'erreur imprévue", async () => {
    vi.spyOn(userServices, 'getUserByEmail').mockRejectedValue(
      new Error('Erreur critique'),
    );

    await adminLoginController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Une erreur est survenue lors de l'authentification",
    });
  });
});
