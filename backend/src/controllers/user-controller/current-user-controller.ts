import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserById } from '../../services/user';

export const getCUrrentUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { userId } = request.user;
  const { prisma } = request.server;
  try {
    const existingUser = await getUserById(prisma, userId);

    if (!existingUser) return reply.code(404);

    const { username, role } = existingUser;

    const csrfToken = reply.generateCsrf();

    return reply.code(200).send({
      username,
      role,
      csrfToken,
    });
  } catch {
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
