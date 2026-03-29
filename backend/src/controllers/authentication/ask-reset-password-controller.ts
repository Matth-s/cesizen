import { FastifyReply } from 'fastify';
import { getUserByEmail, updateUser } from '../../services/user';
import { v4 as uuidv4 } from 'uuid';
import { getResetPasswordExpiration } from '../../constants/expiration-date';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { emailSchema } from '../../schemas/authenticate-schema';
import { sendResetPasswordEmail } from '../../libs/mail';

export const askResetPasswordController = async (
  request: FastifyRequestTypeBox<typeof emailSchema>,
  reply: FastifyReply,
) => {
  const { email } = request.body;
  const prisma = request.server.prisma;

  try {
    const existingUser = await getUserByEmail(prisma, email);

    if (!existingUser) {
      return reply.code(404).send({
        message: 'Utilisateur introuvable',
      });
    }

    const resetPasswordToken = uuidv4();
    const resetPasswordExpire = getResetPasswordExpiration();

    await updateUser(prisma, existingUser.id, {
      resetPasswordExpire,
      resetPasswordToken,
    });

    await sendResetPasswordEmail({
      email: existingUser.email,
      username: existingUser.username,
      link: `cesizen://reset?token=${resetPasswordToken} `,
    });

    return reply.code(200).send({
      message: 'Un email a été envoyé',
    });
  } catch {
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
