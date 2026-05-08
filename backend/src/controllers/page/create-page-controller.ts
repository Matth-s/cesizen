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
  const { slug, content, title, description, imageUrl, isPublished } =
    request.body;

  const { prisma } = request.server;

  try {
    const existingPage = await getPageBySlugService(prisma, slug);

    if (existingPage) {
      return reply
        .status(400)
        .send({ message: 'Slug already exists' });
    }

    const page = await savePageService(prisma, {
      slug,
      content,
      title,
      description: description ?? null,
      imageUrl: imageUrl ?? null,
      isPublished,
    });

    return reply.status(201).send(page);
  } catch {
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
