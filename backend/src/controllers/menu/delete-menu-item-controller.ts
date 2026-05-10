import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { menuItemIdParams } from '../../schemas/menu-schema';
import { deleteMenuItemService } from '../../services/menu-service';

export const deleteMenuItemController = async (
  request: FastifyRequestTypeBox<typeof menuItemIdParams>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const { prisma } = request.server;

  try {
    await deleteMenuItemService(prisma, id);

    return reply.status(204).send();
  } catch {
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
