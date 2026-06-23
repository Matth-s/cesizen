import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as dashboardService from '../../../services/dashboard-service';
import { prismaMock } from '../../../__mocks__/prisma';
import { getDashBoardStatsController } from '../../../controllers/dashboard/get-dashboard-stats';

vi.mock('../../services/dashboard-service');

describe('getDashBoardStatsController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: {
        prisma: prismaMock,
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait retourner 200 et les statistiques en cas de succès', async () => {
    const mockStats = {
      totalUsers: 150,
      activeOrders: 10,
      revenue: 5000,
    };

    vi.spyOn(dashboardService, 'getStatsService').mockResolvedValue(
      mockStats as any,
    );

    await getDashBoardStatsController(mockRequest, mockReply);

    expect(dashboardService.getStatsService).toHaveBeenCalledWith(
      mockRequest.server.prisma,
    );

    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(mockStats);
  });

  it('devrait retourner 500 si le service de statistiques échoue', async () => {
    vi.spyOn(dashboardService, 'getStatsService').mockRejectedValue(
      new Error('DB failure'),
    );

    await getDashBoardStatsController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
