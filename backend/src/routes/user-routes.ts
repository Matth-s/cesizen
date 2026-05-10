import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  deleteAccountSchema,
  updatePasswordSchema,
} from '../schemas/user-schema';
import { updateUserPasswordController } from '../controllers/user-controller/index';
import { getCUrrentUserController } from '../controllers/user-controller/index';
import { deleteAccountController } from '../controllers/user-controller/delete-user-controller';
import { logoutController } from '../controllers/user-controller/logout-controller';

export const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/current',
    {
      preHandler: [fastify.authenticate],
    },
    getCUrrentUserController,
  );

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
      preHandler: [fastify.authenticate, fastify.csrfProtection],
    },
    updateUserPasswordController,
  );

  fastify.post(
    '/delete',
    {
      schema: deleteAccountSchema,
      preHandler: [fastify.authenticate, fastify.csrfProtection],
    },
    deleteAccountController,
  );

  fastify.post('/logout', logoutController);
};
