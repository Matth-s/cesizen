import { FastifyReply, FastifyRequest } from 'fastify';
import { IUpdatePage } from '../../schemas/page-schema';

export const updatePageController = async (
  request: FastifyRequest<{ Params: { id: string }; Body: IUpdatePage }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const data = request.body;

  const page = await request.server.prisma.page.update({
    where: { id },
    data,
  });

  return reply.send(page);
};
