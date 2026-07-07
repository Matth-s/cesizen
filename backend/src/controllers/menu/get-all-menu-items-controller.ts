import { FastifyReply, FastifyRequest } from 'fastify';
import { getMenuItemService } from '../../services/menu-service';

export const getAllMenuItemsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const menus = await getMenuItemService(prisma, false);

    return reply.code(200).send(menus);
  } catch {
    request.log.error(
      'Une erreur est survenue lors de la récupération des éléments de menu',
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue ',
    });
  }
};
