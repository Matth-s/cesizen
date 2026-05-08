import { FastifyReply } from 'fastify';
import { pageIdParams } from '../../schemas/page-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';

export const deletePageController = async (
  request: FastifyRequestTypeBox<typeof pageIdParams>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  await request.server.prisma.page.delete({
    where: { id },
  });

  return reply.status(204).send();
};
