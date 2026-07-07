import { FastifyReply } from 'fastify';
import { createPageSchema } from '../../schemas/page-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import {
  getPageBySlugService,
  savePageService,
} from '../../services/page-service';

export const createPageController = async (
  request: FastifyRequestTypeBox<typeof createPageSchema>,
  reply: FastifyReply,
) => {
  const {
    slug,
    content,
    title,
    description,
    imageUrl,
    isPublished,
    menuItemId,
  } = request.body;

  const { prisma } = request.server;

  try {
    const existingPage = await getPageBySlugService(prisma, slug);

    if (existingPage) {
      return reply
        .status(400)
        .send({ message: 'Ce slug est déjà utilisé' });
    }

    const page = await savePageService(prisma, {
      slug,
      content,
      title,
      description: description ?? null,
      imageUrl: imageUrl ?? null,
      isPublished,
      menuItemId,
    });

    return reply.status(201).send(page);
  } catch {
    request.log.error(
      'Une erreur est survenue lors de la création de la page',
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
