import { FastifyReply, FastifyRequest } from 'fastify';
import { IUpdateMenuItem } from '../../schemas/menu-schema';

export const updateMenuItemController = async (
  request: FastifyRequest<{ Params: { id: string }; Body: IUpdateMenuItem }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const data = request.body;

  const menuItem = await request.server.prisma.menuItem.update({
    where: { id },
    data,
  });

  return reply.send(menuItem);
};
