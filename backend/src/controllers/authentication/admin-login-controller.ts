import { FastifyReply } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { LoginSchema } from '../../schemas/authenticate-schema';
import { comparePassword } from '../../libs/bcrypt';
import { getUserByEmail } from '../../services/user';

export const adminLoginController = async (
  request: FastifyRequestTypeBox<typeof LoginSchema>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const { email, password } = request.body;

    const existingUser = await getUserByEmail(prisma, email);

    if (!existingUser || existingUser.role !== 'ADMIN') {
      await comparePassword('e', 'f');
      return reply.code(403).send({
        error: 'Email ou mot de passe invalide',
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

    const { id, role, username } = existingUser;

    const csrfToken = reply.generateCsrf();

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

    return reply.code(201).send({ id, role, username, csrfToken });
  } catch {
    request.log.info(
      "Une erreur est survenue lors de l'authentification admin",
    );
    return reply.code(500).send({
      error: "Une erreur est survenue lors de l'authentification",
    });
  }
};
