import { FastifyReply } from 'fastify';
import { deleteUserById, getUserById } from '../../services/user';
import { comparePassword } from '../../libs/bcrypt';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { deleteAccountSchema } from '../../schemas/user-schema';

export const deleteAccountController = async (
  request: FastifyRequestTypeBox<typeof deleteAccountSchema>,
  reply: FastifyReply,
) => {
  const { userId } = request.user;
  const { prisma } = request.server;
  const { password } = request.body;

  try {
    const existingUser = await getUserById(prisma, userId);

    if (!existingUser) {
      return reply.code(404).send({
        error: 'Compte non trouvé',
      });
    }

    const correctPassword = await comparePassword(
      password,
      existingUser.password,
    );

    if (!correctPassword) {
      return reply.code(400).send({
        error: 'Mot de passe invalide',
      });
    }

    await deleteUserById(prisma, userId);

    return reply.code(200).send({
      message: 'Utilisateur supprimé',
    });
  } catch {
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
