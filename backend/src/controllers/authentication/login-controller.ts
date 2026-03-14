import { FastifyReply } from 'fastify';
import { LoginSchema } from '../../schemas/authenticate-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { comparePassword } from '../../libs/bcrypt';
import { getUserByEmail } from '../../services/user.js';

export const loginController = async (
  request: FastifyRequestTypeBox<typeof LoginSchema>,
  reply: FastifyReply,
) => {
  console.log(Object.keys(reply));

  try {
    const { email, password } = request.body;

    const existingUser = await getUserByEmail(
      request.server.prisma,
      email,
    );

    if (!existingUser) {
      await comparePassword('e', 'f');
      return reply.code(403).send({
        message: 'Email ou mot de passe invalide',
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
      // ajouter l envoie d email

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
      sameSite: 'strict',
      path: '/',
    });

    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/refresh',
    });

    return reply.code(200).send({
      message: 'Connexion réussi',
      csrfToken,
    });
  } catch (err) {
    let message = 'Une erreur est survenue sur le serveur';

    if (err instanceof Error) {
      message = err.message;
    }
    return reply.code(500).send({
      message,
    });
  }
};
