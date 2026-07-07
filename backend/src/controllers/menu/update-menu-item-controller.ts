import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IUpdateMenuItem,
  updateMenuItemSchema,
} from '../../schemas/menu-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import {
  existingMenuPathService,
  updateMenuItemService,
} from '../../services/menu-service';

export const updateMenuItemController = async (
  request: FastifyRequestTypeBox<typeof updateMenuItemSchema>,
  reply: FastifyReply,
) => {
  const data = request.body;
  const { id } = request.params;
  const { prisma } = request.server;

  try {
    const existingPath = await existingMenuPathService(
      prisma,
      data.path,
    );

    if (existingPath && data.id !== existingPath.id)
      return reply.code(409).send({
        error: 'Ce lien existe déjà',
      });

    await updateMenuItemService(prisma, data);

    return reply.code(200).send({
      message: 'Le menu a été modifié avec succès',
    });
  } catch {
    request.log.info(
      "Une erreur est survenue lors de l'authentification admin",
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
