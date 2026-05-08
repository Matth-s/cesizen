import { FastifyReply, FastifyRequest } from 'fastify';
import { ICreateMenuItem } from '../../schemas/menu-schema';

export const createMenuItemController = async (
  request: FastifyRequest<{ Body: ICreateMenuItem }>,
  reply: FastifyReply,
) => {
  const { label, path, order, pageId } = request.body;

  const menuItem = await request.server.prisma.menuItem.create({
    data: {
      label,
      path,
      order,
      pageId,
    },
  });

  return reply.status(201).send(menuItem);
};
