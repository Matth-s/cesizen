import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllPageService } from '../../services/page-service';

export const getAllPagesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const pages = await getAllPageService(prisma);

    return reply.send(pages);
  } catch {
    request.log.error(
      'Une erreur est survenue lors de la récupération de toutes les pages',
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
