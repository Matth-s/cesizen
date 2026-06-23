import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserListController } from '../../../controllers/manage-account/get-user-list-controller';
import * as userServices from '../../../services/user';

vi.mock('../../services/user');

describe('getUserListController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      user: { userId: 'current-user-id' },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it("devrait retourner la liste des utilisateurs en filtrant l'utilisateur actuel", async () => {
    const mockUsers = [
      { id: 'user-1', username: 'Alice' },
      { id: 'current-user-id', username: 'Me' },
      { id: 'user-2', username: 'Bob' },
    ];

    vi.spyOn(userServices, 'getUserList').mockResolvedValue(
      mockUsers as any,
    );

    await getUserListController(mockRequest, mockReply);

    expect(userServices.getUserList).toHaveBeenCalledWith(
      mockRequest.server.prisma,
    );
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith([
      { id: 'user-1', username: 'Alice' },
      { id: 'user-2', username: 'Bob' },
    ]);
  });

  it("devrait retourner une liste vide si seul l'utilisateur actuel est présent", async () => {
    const mockUsers = [{ id: 'current-user-id', username: 'Me' }];

    vi.spyOn(userServices, 'getUserList').mockResolvedValue(
      mockUsers as any,
    );

    await getUserListController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith([]);
  });

  it("devrait retourner 500 en cas d'erreur du service", async () => {
    vi.spyOn(userServices, 'getUserList').mockRejectedValue(
      new Error(),
    );

    await getUserListController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Une erreur est survenue',
    });
  });
});
