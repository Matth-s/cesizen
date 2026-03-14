import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { updatePasswordSchema } from '../schemas/user-schema';
import { updateUserPasswordController } from '../controllers/user-controller/index';
import { Role } from '../generated/prisma/enums';

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.put(
    '/update-password',
    {
      schema: updatePasswordSchema,
      preValidation: async (
        request: FastifyRequest,
        reply: FastifyReply,
      ) => {
        const { password, confirmPassword } = request.body as any;

        if (password !== confirmPassword) {
          return reply.code(400).send({
            message: 'Les mots de passe ne correspondent pas',
          });
        }
      },
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.USER]),
        fastify.csrfProtection,
      ],
    },
    updateUserPasswordController,
  );
};
