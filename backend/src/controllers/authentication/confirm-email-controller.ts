import { FastifyReply } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import {
  getUserWithEmailToken,
  updateUser,
} from '../../services/user';
import { confirmEmailSchema } from '../../schemas/authenticate-schema';

export const confirmEmailController = async (
  request: FastifyRequestTypeBox<typeof confirmEmailSchema>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;
  const { token } = request.query;

  try {
    const user = await getUserWithEmailToken(prisma, token);

    if (!user || !user.emailConfirmationExpire) {
      return reply.code(404).send({
        message: 'Le code de validation est invalide',
      });
    }

    if (user.emailConfirmationExpire < new Date()) {
      await updateUser(prisma, user.id, {
        emailConfirmationExpire: null,
        emailConfirmationToken: null,
        emailVerified: null,
      });

      return reply.code(410).send({
        message: 'Le code de confirmation a expiré',
      });
    }

    await updateUser(prisma, user.id, {
      emailConfirmationExpire: null,
      emailConfirmationToken: null,
      emailVerified: new Date(),
    });

    return reply.code(200).send({
      message: "L'email a été vérifié avec succès",
    });
  } catch {
    return reply.code(500).send({
      message: 'Une erreur interne est survenue',
    });
  }
};
