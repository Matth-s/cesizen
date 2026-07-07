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
  const currentUser = request.user.userId;

  if (currentUser === userIdParams)
    return reply.code(403).send({
      error: 'Vous ne pouvez pas modifier votre status',
    });

  try {
    const existingUser = await getUserById(prisma, userIdParams);

    if (!existingUser) {
      return reply.code(404).send({
        message: "Cet utilisateur n'existe pas",
      });
    }

    await updateUser(prisma, existingUser.id, {
      isActive: !existingUser.isActive,
    });

    return reply.code(201).send({
      message: `Le compte de ${existingUser.username} a été ${!existingUser.isActive ? 'activé' : 'désactivé'}`,
    });
  } catch {
    request.log.info(
      'Une erreur est survenue lors de la mise à jour du compte utilisateur',
    );
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
