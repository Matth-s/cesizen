import { FastifyReply } from 'fastify';
import { updatePasswordSchema } from '../../schemas/user-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { getUserById, updateUser } from '../../services/user';
import { hashPassword } from '../../libs/bcrypt';

export const updateUserPasswordController = async (
  request: FastifyRequestTypeBox<typeof updatePasswordSchema>,
  reply: FastifyReply,
) => {
  const user = request.user;
  const { prisma } = request.server;
  const { password } = request.body;

  try {
    const existingUser = await getUserById(prisma, user.userId);

    if (!existingUser) {
      return reply.code(404).send({
        message: 'Utilisateur non trouvé',
      });
    }

    const hashedPassword = await hashPassword(password);

    await updateUser(prisma, existingUser.id, {
      password: hashedPassword,
    });

    return reply.code(200).send({
      message: 'Le mot de passe a été modifié avec succès',
    });
  } catch {
    request.log.error(
      'Une erreur est survenue lors de le la modification du mot de passe',
    );
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
