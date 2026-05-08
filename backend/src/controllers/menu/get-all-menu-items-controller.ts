import { FastifyReply, FastifyRequest } from 'fastify';

export const getAllMenuItemsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const menuItems = await request.server.prisma.menuItem.findMany({
    orderBy: { order: 'asc' },
  });

  return reply.send(menuItems);
};
