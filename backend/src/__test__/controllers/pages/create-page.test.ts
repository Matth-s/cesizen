import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPageController } from '../../../controllers/page/create-page-controller';
import * as pageServices from '../../../services/page-service';

vi.mock('../../services/page-service');

describe('createPageController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      body: {
        slug: 'ma-page',
        content: 'Contenu ici',
        title: 'Titre',
        isPublished: true,
        menuItemId: 'menu-1',
      },
      log: {
        error: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
      },
    };

    mockReply = {
      status: vi.fn().mockReturnThis(),
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait créer une page avec succès et retourner 201', async () => {
    const mockCreatedPage = { id: 'page-1', ...mockRequest.body };

    vi.spyOn(pageServices, 'getPageBySlugService').mockResolvedValue(
      null,
    );
    vi.spyOn(pageServices, 'savePageService').mockResolvedValue(
      mockCreatedPage as any,
    );

    await createPageController(mockRequest, mockReply);

    expect(pageServices.savePageService).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        slug: 'ma-page',
        description: null,
        imageUrl: null,
      }),
    );
    expect(mockReply.status).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith(mockCreatedPage);
  });

  it('devrait retourner 400 si le slug existe déjà', async () => {
    vi.spyOn(pageServices, 'getPageBySlugService').mockResolvedValue({
      id: 'exists',
    } as any);

    const saveSpy = vi.spyOn(pageServices, 'savePageService');

    await createPageController(mockRequest, mockReply);

    expect(mockReply.status).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Ce slug est déjà utilisé',
    });

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur du service", async () => {
    vi.spyOn(pageServices, 'getPageBySlugService').mockRejectedValue(
      new Error(),
    );

    await createPageController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
