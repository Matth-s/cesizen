import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deletePageController } from '../../../controllers/page/delete-page-controller';

describe('deletePageController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: {
        prisma: {
          page: {
            delete: vi.fn(),
          },
        },
      },
      params: { id: 'page-123' },
      log: {
        error: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
      },
    };

    mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait supprimer la page et retourner un statut 204', async () => {
    mockRequest.server.prisma.page.delete.mockResolvedValue({});

    await deletePageController(mockRequest, mockReply);

    expect(
      mockRequest.server.prisma.page.delete,
    ).toHaveBeenCalledWith({
      where: { id: 'page-123' },
    });
    expect(mockReply.status).toHaveBeenCalledWith(204);
    expect(mockReply.send).toHaveBeenCalled();
  });
});
