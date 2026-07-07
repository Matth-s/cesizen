import { FastifyReply, FastifyRequest } from 'fastify';
import { getStatsService } from '../../services/dashboard-service';

export const getDashBoardStatsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const stats = await getStatsService(prisma);

    return reply.code(200).send(stats);
  } catch {
    request.log.error(
      'Une erreur est survenue lors de la récupération des statistiques du tableau de bord',
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
