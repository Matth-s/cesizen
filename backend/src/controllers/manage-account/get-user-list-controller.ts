import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserList } from '../../services/user';

export const getUserListController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const userId = request.user.userId;

  try {
    const users = await getUserList(prisma);

    const updatedUserArray = users.filter(
      (user) => user.id !== userId,
    );

    return reply.code(200).send(updatedUserArray);
  } catch {
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
