import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateAccountController } from '../../../controllers/manage-account/update-account-controller';
import * as userServices from '../../../services/user';

vi.mock('../../services/user');

describe('updateAccountController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      query: { userId: 'target-user-id' },
      user: { userId: 'admin-id' },
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

  it("devrait retourner 403 si l'utilisateur tente de modifier son propre statut", async () => {
    mockRequest.user.userId = 'same-id';
    mockRequest.query.userId = 'same-id';

    const getSpy = vi.spyOn(userServices, 'getUserById');

    await updateAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(403);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Vous ne pouvez pas modifier votre status',
    });

    expect(getSpy).not.toHaveBeenCalled();
  });

  it("devrait inverser le statut isActive d'un utilisateur existant (Désactivation)", async () => {
    const mockUser = {
      id: 'target-user-id',
      username: 'JohnDoe',
      isActive: true,
    };

    vi.spyOn(userServices, 'getUserById').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await updateAccountController(mockRequest, mockReply);

    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'target-user-id',
      {
        isActive: false,
      },
    );
    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le compte de JohnDoe a été désactivé',
    });
  });

  it("devrait inverser le statut isActive d'un utilisateur existant (Activation)", async () => {
    const mockUser = {
      id: 'target-user-id',
      username: 'JohnDoe',
      isActive: false,
    };

    vi.spyOn(userServices, 'getUserById').mockResolvedValue(
      mockUser as any,
    );
    vi.spyOn(userServices, 'updateUser').mockResolvedValue({} as any);

    await updateAccountController(mockRequest, mockReply);

    expect(userServices.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      'target-user-id',
      {
        isActive: true,
      },
    );
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le compte de JohnDoe a été activé',
    });
  });

  it("devrait retourner 404 si l'utilisateur cible n'existe pas", async () => {
    vi.spyOn(userServices, 'getUserById').mockResolvedValue(null);

    await updateAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: "Cet utilisateur n'existe pas",
    });
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(userServices, 'getUserById').mockRejectedValue(
      new Error(),
    );

    await updateAccountController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
