import { FastifyReply, FastifyRequest } from 'fastify';

export const getPageBySlugController = async (
  request: FastifyRequest<{ Params: { slug: string } }>,
  reply: FastifyReply,
) => {
  const { slug } = request.params;

  const page = await request.server.prisma.page.findUnique({
    where: { slug },
  });

  if (!page) {
    return reply.status(404).send({ message: 'Page not found' });
  }

  // If not admin, check if published
  if (!page.isPublished) {
    try {
      await request.server.authenticate(request, reply);
      const user: any = request.user;
      if (user.role !== 'ADMIN') {
        return reply.status(404).send({ message: 'Page not found' });
      }
    } catch (e) {
      return reply.status(404).send({ message: 'Page not found' });
    }
  }

  return reply.send(page);
};
