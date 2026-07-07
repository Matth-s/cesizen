import { FastifyReply } from 'fastify';
import { deleteUserById, getUserById } from '../../services/user';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { deleteUserSchema } from '../../schemas/user-schema';

export const deleteUserController = async (
  request: FastifyRequestTypeBox<typeof deleteUserSchema>,
  reply: FastifyReply,
) => {
  const userIdParams = request.query.userId;

  const prisma = request.server.prisma;

  try {
    const existingUser = await getUserById(prisma, userIdParams);

    if (!existingUser) {
      return reply.code(404).send({
        message: "L'utilisateur est introuvable",
      });
    }

    if (existingUser.role === 'ADMIN') {
      return reply.code(401).send({
        message: 'Vous ne pouvez pas supprimer un compte admin',
      });
    }

    await deleteUserById(prisma, existingUser.id);

    return reply.code(200).send({
      message: "L'utilisateur a bien été supprimé",
    });
  } catch {
    request.log.info(
      "Une erreur est survenue lors de la suppression de l'utilisateur",
    );
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
