import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deletePageController } from '../delete-page-controller';

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

  it('devrait rejeter si Prisma échoue', async () => {
    mockRequest.server.prisma.page.delete.mockRejectedValue(
      new Error('Delete failed'),
    );

    await expect(
      deletePageController(mockRequest, mockReply),
    ).rejects.toThrow('Delete failed');
  });
});
