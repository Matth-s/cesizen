import { FastifyReply } from 'fastify';
import { updatePageSchema } from '../../schemas/page-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import {
  getPageByIdService,
  updatePageByIdService,
} from '../../services/page-service';

export const updatePageController = async (
  request: FastifyRequestTypeBox<typeof updatePageSchema>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;
  const { id } = request.params;
  const { content, description, imageUrl, isPublished, slug, title } =
    request.body;

  try {
    const existingPage = await getPageByIdService(prisma, id);

    if (!existingPage) {
      return reply.code(404).send({
        error: 'Page non trouvée',
      });
    }

    const pageUpdated = await updatePageByIdService({
      prisma,
      id,
      data: {
        content,
        description,
        id,
        imageUrl,
        isPublished,
        slug,
        title,
      },
    });

    return reply.code(200).send({
      message: 'Page mise à jour',
    });
  } catch {
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
