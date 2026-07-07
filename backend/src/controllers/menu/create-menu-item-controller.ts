import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { createMenuItemSchema } from '../../schemas/menu-schema';
import {
  createMenuService,
  existingMenuPathService,
} from '../../services/menu-service';

export const createMenuItemController = async (
  request: FastifyRequestTypeBox<typeof createMenuItemSchema>,

  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const existingPath = await existingMenuPathService(
      prisma,
      request.body.path,
    );

    if (existingPath)
      return reply.code(409).send({
        error: 'Ce lien existe déjà',
      });

    await createMenuService(prisma, request.body);
  } catch {
    request.log.error(
      "Une erreur est survenue lors de la création de l'élément de menu",
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
