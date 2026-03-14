import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { deleteUserSchema } from '../../schemas/user-schema';
import { getUserById, updateUser } from '../../services/user';

export const updateAccountController = async (
  request: FastifyRequestTypeBox<typeof deleteUserSchema>,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const userIdParams = request.query.userId;

  try {
    const existingUser = await getUserById(prisma, userIdParams);

    if (!existingUser) {
      return reply.code(404).send({
        message: "Cet utilisateur n'existe pas",
      });
    }

    if (existingUser.role === 'ADMIN') {
      return reply.code(403).send({
        message:
          "Vous ne pouvez pas modifier le status d'un compte admin",
      });
    }

    await updateUser(prisma, existingUser.id, {
      isActive: !existingUser.isActive,
    });

    return reply.code(201).send({
      message: `Le compte de ${existingUser.username} a été ${!existingUser.isActive ? 'désactivé' : 'activé'}`,
    });
  } catch {
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
