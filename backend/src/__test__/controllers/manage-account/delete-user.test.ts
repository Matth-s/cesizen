import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteUserController } from '../../../controllers/manage-account/delete-user-controller';
import * as userServices from '../../../services/user';

vi.mock('../../services/user');

describe('deleteUserController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      query: { userId: 'user-123' },
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

  it("devrait supprimer l'utilisateur avec succès", async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue({
      id: 'user-123',
      role: 'USER',
    } as any);
    vi.spyOn(userServices, 'deleteUserById').mockResolvedValue(
      {} as any,
    );

    await deleteUserController(mockRequest, mockReply);

    expect(userServices.deleteUserById).toHaveBeenCalledWith(
      expect.anything(),
      'user-123',
    );
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "L'utilisateur a bien été supprimé",
    });
  });

  it("devrait retourner 404 si l'utilisateur n'existe pas", async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue(null);

    const deleteSpy = vi.spyOn(userServices, 'deleteUserById');

    await deleteUserController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "L'utilisateur est introuvable",
    });

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 401 si l'utilisateur est un admin", async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue({
      id: 'admin-id',
      role: 'ADMIN',
    } as any);

    const deleteSpy = vi.spyOn(userServices, 'deleteUserById');

    await deleteUserController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(401);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Vous ne pouvez pas supprimer un compte admin',
    });

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur", async () => {
    vi.spyOn(userServices, 'getUserById').mockRejectedValue(
      new Error(),
    );

    await deleteUserController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
