import { FastifyReply } from 'fastify';
import { LoginSchema } from '../../schemas/authenticate-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { comparePassword } from '../../libs/bcrypt';
import { getUserByEmail, updateUser } from '../../services/user.js';
import { getEmailExpiration } from '../../constants/expiration-date';
import { v4 as uuidv4 } from 'uuid';

export const loginController = async (
  request: FastifyRequestTypeBox<typeof LoginSchema>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const { email, password } = request.body;

    const existingUser = await getUserByEmail(prisma, email);

    if (!existingUser) {
      await comparePassword('e', 'f');
      return reply.code(403).send({
        error: 'Email ou mot de passe invalide',
      });
    }

    if (!existingUser.isActive) {
      return reply.code(401).send({
        message: 'Votre compte a été désactivé',
      });
    }

    const correctPassword = await comparePassword(
      password,
      existingUser.password,
    );

    if (!correctPassword) {
      return reply.code(403).send({
        message: 'Email ou mot de passe invalide',
      });
    }

    if (!existingUser?.emailVerified) {
      const emailConfirmationExpire = getEmailExpiration();
      const emailConfirmationToken = uuidv4();

      await updateUser(prisma, existingUser.id, {
        emailConfirmationExpire,
        emailConfirmationToken,
      });

      // await sendConfirmEmail({
      //   email: existingUser.email,
      //   username: existingUser.username,
      //   link: `cesizen://confirm?token=${emailConfirmationToken} `,
      // });

      return reply.code(201).send({
        message: 'Un email de confirmation vous a été envoyé',
      });
    }

    const accessToken = await reply.accessJwtSign(
      {
        userId: existingUser.id,
        role: existingUser.role,
      },
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = await reply.refreshJwtSign(
      { userId: existingUser.id, role: existingUser.role },
      { expiresIn: '7d' },
    );

    const csrfToken = reply.generateCsrf();

    reply.setCookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 60,
    });

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 60,
    });

    return reply.code(200).send({
      message: 'Connexion réussi',
      user: {
        csrfToken,
        username: existingUser.username,
        role: existingUser.role,
      },
    });
  } catch {
    request.log.error(
      "Une erreur est survenue lors de l'authentification",
    );
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
