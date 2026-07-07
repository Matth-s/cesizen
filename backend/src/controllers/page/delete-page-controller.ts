import { FastifyReply } from 'fastify';
import { pageIdParams } from '../../schemas/page-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';

export const deletePageController = async (
  request: FastifyRequestTypeBox<typeof pageIdParams>,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params;

    await request.server.prisma.page.delete({
      where: { id },
    });

    return reply.status(204).send();
  } catch {
    request.log.error(
      "Une erreur est survenue lors de l'authentification admin",
    );

    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
