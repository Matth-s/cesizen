import { FastifyReply } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { pageIdParams } from '../../schemas/page-schema';
import { getPageByIdService } from '../../services/page-service';

export const getPageByIdController = async (
  request: FastifyRequestTypeBox<typeof pageIdParams>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;
  const { id } = request.params;
  const role = request.user?.role ?? null;

  try {
    const existingPage = await getPageByIdService(prisma, id, !!role);

    if (!existingPage)
      return reply.code(404).send({
        error: 'Page non trouvée',
      });

    return reply.code(200).send(existingPage);
  } catch {
    request.log.error(
      'Une erreur est survenue lors de la récupération de la page',
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
