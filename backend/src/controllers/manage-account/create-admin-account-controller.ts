import { FastifyReply } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { createUser, getUserByEmail } from '../../services/user';
import { v4 as uuidv4 } from 'uuid';
import { getEmailExpiration } from '../../constants/expiration-date';
import { hashPassword } from '../../libs/bcrypt';
import { userAdminSchema } from '../../schemas/user-schema';

export const createAdminAccountController = async (
  request: FastifyRequestTypeBox<typeof userAdminSchema>,
  reply: FastifyReply,
) => {
  const { email, password, username, role } = request.body;
  const prisma = request.server.prisma;

  try {
    const existingEmail = await getUserByEmail(prisma, email);

    if (existingEmail) {
      return reply.code(409).send({
        message: 'Cet email est déjà utilisé',
      });
    }

    const emailConfirmationToken = uuidv4();
    const emailConfirmationExpire = getEmailExpiration();

    // envoyer l email;
    let appUrl = null;

    switch (role) {
      case 'ADMIN':
        appUrl = `${process.env.FRONTEND_URL}/authentification/confirm-email?token=${emailConfirmationToken}`;
        break;
      case 'USER':
        appUrl = `cesizen://confirm?token=${emailConfirmationToken} `;
        break;

      default:
        appUrl = null;
    }

    if (appUrl) {
      // await sendConfirmEmail({
      //   email,
      //   username,
      //   link: appUrl,
      // });
    }

    const passwordHashed = await hashPassword(password);

    await createUser(prisma, {
      role,
      email,
      password: passwordHashed,
      username,
      emailConfirmationToken,
      emailConfirmationExpire,
    });

    return reply.code(201).send({
      message: 'Un email de confirmation a été envoyé',
    });
  } catch {
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
