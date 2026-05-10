import { FastifyPluginAsync } from 'fastify';
import { Role } from '../generated/prisma/enums';
import { getDashBoardStatsController } from '../controllers/dashboard/get-dashboard-stats';

export const dashboardRoutes: FastifyPluginAsync = async (
  fastify,
) => {
  fastify.get(
    '/',
    {
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    getDashBoardStatsController,
  );
};
