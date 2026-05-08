import { FastifyReply, FastifyRequest } from 'fastify';

export const deleteMenuItemController = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;

  await request.server.prisma.menuItem.delete({
    where: { id },
  });

  return reply.status(204).send();
};
