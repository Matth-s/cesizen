import { FastifyReply, FastifyRequest } from 'fastify';
import { ICreatePage } from '../../schemas/page-schema';

export const createPageController = async (
  request: FastifyRequest<{ Body: ICreatePage }>,
  reply: FastifyReply,
) => {
  const { title, description, content, imageUrl, slug, isPublished } = request.body;

  const existingPage = await request.server.prisma.page.findUnique({
    where: { slug },
  });

  if (existingPage) {
    return reply.status(400).send({ message: 'Slug already exists' });
  }

  const page = await request.server.prisma.page.create({
    data: {
      title,
      description,
      content,
      imageUrl,
      slug,
      isPublished,
    },
  });

  return reply.status(201).send(page);
};
