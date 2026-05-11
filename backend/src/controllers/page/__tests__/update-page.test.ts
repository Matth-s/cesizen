import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updatePageController } from '../update-page-controller';
import * as pageServices from '../../../services/page-service';

vi.mock('../../services/page-service');

describe('updatePageController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      params: { id: 'page-123' },
      body: {
        title: 'Nouveau titre',
        slug: 'nouveau-slug',
        content: 'Nouveau contenu',
        isPublished: true,
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait mettre à jour la page avec succès', async () => {
    vi.spyOn(pageServices, 'getPageByIdService').mockResolvedValue({
      id: 'page-123',
    } as any);
    vi.spyOn(pageServices, 'updatePageByIdService').mockResolvedValue(
      {} as any,
    );

    await updatePageController(mockRequest, mockReply);

    expect(pageServices.getPageByIdService).toHaveBeenCalledWith(
      expect.anything(),
      'page-123',
      true,
    );
    expect(pageServices.updatePageByIdService).toHaveBeenCalledWith({
      prisma: expect.anything(),
      id: 'page-123',
      data: expect.objectContaining({
        title: 'Nouveau titre',
        id: 'page-123',
      }),
    });
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Page mise à jour',
    });
  });

  it("devrait retourner 404 si la page n'existe pas", async () => {
    vi.spyOn(pageServices, 'getPageByIdService').mockResolvedValue(
      null,
    );

    const updateSpy = vi.spyOn(pageServices, 'updatePageByIdService');

    await updatePageController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Page non trouvée',
    });

    expect(pageServices.getPageByIdService).toHaveBeenCalledWith(
      mockRequest.server.prisma,
      'page-123',
      true,
    );

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(pageServices, 'getPageByIdService').mockRejectedValue(
      new Error(),
    );

    await updatePageController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
