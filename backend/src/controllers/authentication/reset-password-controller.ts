import { FastifyReply } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { resetPasswordSchema } from '../../schemas/authenticate-schema';
import {
  getUserWithPasswordToken,
  updateUser,
} from '../../services/user';
import { hashPassword } from '../../libs/bcrypt';

export const resetPasswordController = async (
  request: FastifyRequestTypeBox<typeof resetPasswordSchema>,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const token = request.query.token;

  const { password } = request.body;

  try {
    const user = await getUserWithPasswordToken(prisma, token);

    if (!user || !user.resetPasswordExpire) {
      return reply.code(404).send({
        message: 'Le code est invalide',
      });
    }

    if (user.resetPasswordExpire < new Date()) {
      await updateUser(prisma, user.id, {
        resetPasswordExpire: null,
        resetPasswordToken: null,
      });

      return reply.code(410).send({
        message: 'Le code pour modifier le mot de passe a expiré',
      });
    }

    const hashedPassword = await hashPassword(password);

    await updateUser(prisma, user.id, {
      resetPasswordExpire: null,
      resetPasswordToken: null,
      password: hashedPassword,
    });

    return reply.send({
      message: 'Le mot de passe a été modifié avec succès',
    });
  } catch {
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
