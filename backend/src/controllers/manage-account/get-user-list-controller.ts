import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserList } from '../../services/user';

export const getUserListController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;

  try {
    const users = await getUserList(prisma);

    return reply.code(200).send({
      message: users,
    });
  } catch {
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
