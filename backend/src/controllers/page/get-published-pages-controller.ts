import { FastifyReply, FastifyRequest } from 'fastify';

export const getPublishedPagesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const pages = await request.server.prisma.page.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      content: true,
      imageUrl: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return reply.send(pages);
};
