import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as menuServices from '../../../services/menu-service';
import { createMenuItemController } from '../../../controllers/menu/create-menu-item-controller';

vi.mock('../../services/menu-service', () => ({
  existingMenuPathService: vi.fn(),
  createMenuService: vi.fn(),
}));

describe('createMenuItemController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      server: {
        prisma: {},
      },
      body: {
        path: '/test-path',
        label: 'Test Menu',
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait retourner 409 si le chemin existe déjà', async () => {
    vi.spyOn(
      menuServices,
      'existingMenuPathService',
    ).mockResolvedValue({
      id: 'existing-id',
    } as any);

    const createSpy = vi.spyOn(menuServices, 'createMenuService');

    await createMenuItemController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(409);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Ce lien existe déjà',
    });

    expect(createSpy).not.toHaveBeenCalled();
  });

  it('devrait créer le menu avec succès (200/undefined par défaut)', async () => {
    vi.spyOn(
      menuServices,
      'existingMenuPathService',
    ).mockResolvedValue(null);
    const createSpy = vi
      .spyOn(menuServices, 'createMenuService')
      .mockResolvedValue({} as any);

    await createMenuItemController(mockRequest, mockReply);

    expect(createSpy).toHaveBeenCalledWith(
      mockRequest.server.prisma,
      mockRequest.body,
    );
    expect(mockReply.code).not.toHaveBeenCalledWith(409);
    expect(mockReply.code).not.toHaveBeenCalledWith(500);
  });

  it('devrait retourner 500 en cas d’erreur serveur', async () => {
    vi.spyOn(
      menuServices,
      'existingMenuPathService',
    ).mockRejectedValue(new Error('DB Error'));

    await createMenuItemController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
