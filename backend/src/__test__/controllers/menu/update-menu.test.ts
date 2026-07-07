import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateMenuItemController } from '../../../controllers/menu/update-menu-item-controller';
import * as menuServices from '../../../services/menu-service';

vi.mock('../../services/menu-service');

describe('updateMenuItemController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      params: { id: 'menu-1' },
      body: { path: '/new-path', label: 'New Label' },
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

  it('devrait modifier le menu avec succès', async () => {
    vi.spyOn(
      menuServices,
      'existingMenuPathService',
    ).mockResolvedValue(null);
    vi.spyOn(menuServices, 'updateMenuItemService').mockResolvedValue(
      {} as any,
    );

    await updateMenuItemController(mockRequest, mockReply);

    expect(menuServices.existingMenuPathService).toHaveBeenCalledWith(
      mockRequest.server.prisma,
      '/new-path',
    );
    expect(menuServices.updateMenuItemService).toHaveBeenCalledWith(
      mockRequest.server.prisma,
      mockRequest.body,
    );
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le menu a été modifié avec succès',
    });
  });

  it('devrait retourner 409 si le chemin existe déjà', async () => {
    vi.spyOn(
      menuServices,
      'existingMenuPathService',
    ).mockResolvedValue({
      id: 'other',
    } as any);

    const updateSpy = vi.spyOn(menuServices, 'updateMenuItemService');

    await updateMenuItemController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(409);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Ce lien existe déjà',
    });

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur du service", async () => {
    vi.spyOn(
      menuServices,
      'existingMenuPathService',
    ).mockRejectedValue(new Error());

    await updateMenuItemController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
