import { FastifyReply, FastifyRequest } from 'fastify';
import { getMenuItemService } from '../../services/menu-service';

export const getAllMenuItemController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const menus = await getMenuItemService(prisma, true);

    return reply.code(200).send(menus);
  } catch {
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
