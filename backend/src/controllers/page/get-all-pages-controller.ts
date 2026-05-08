import { FastifyReply, FastifyRequest } from 'fastify';

export const getAllPagesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const pages = await request.server.prisma.page.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return reply.send(pages);
};
