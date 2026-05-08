import { FastifyReply, FastifyRequest } from 'fastify';

export const deletePageController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  await request.server.prisma.page.delete({
    where: { id },
  });

  return reply.status(204).send();
};
