import { FastifyReply } from 'fastify';
import { getAllPageWithMenuIdService } from '../../services/page-service';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { pageIdParams } from '../../schemas/page-schema';

export const getPublishedPagesController = async (
  request: FastifyRequestTypeBox<typeof pageIdParams>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;
  const { id } = request.params;

  try {
    const pages = await getAllPageWithMenuIdService(prisma, id);

    return reply.code(200).send(pages);
  } catch {
    return reply.code(200).send({
      error: 'Une erreur est survenue',
    });
  }
};
