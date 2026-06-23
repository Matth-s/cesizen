import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteMenuItemController } from '../../../controllers/menu/delete-menu-item-controller';
import * as menuServices from '../../../services/menu-service';

vi.mock('../../services/menu-service');

describe('deleteMenuItemController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      params: { id: 'menu-item-123' },
    };

    mockReply = {
      status: vi.fn().mockReturnThis(),
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it("devrait supprimer l'élément du menu et retourner un statut 204", async () => {
    vi.spyOn(menuServices, 'deleteMenuItemService').mockResolvedValue(
      {} as any,
    );

    await deleteMenuItemController(mockRequest, mockReply);

    expect(menuServices.deleteMenuItemService).toHaveBeenCalledWith(
      mockRequest.server.prisma,
      'menu-item-123',
    );
    expect(mockReply.status).toHaveBeenCalledWith(204);
    expect(mockReply.send).toHaveBeenCalled();
  });

  it('devrait retourner un statut 500 si le service échoue', async () => {
    vi.spyOn(menuServices, 'deleteMenuItemService').mockRejectedValue(
      new Error('Delete failed'),
    );

    await deleteMenuItemController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
