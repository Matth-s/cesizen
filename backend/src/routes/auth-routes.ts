import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import {
  confirmEmailSchema,
  emailSchema,
  LoginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../schemas/authenticate-schema';

import {
  loginController,
  registerController,
  resetPasswordController,
  confirmEmailController,
  askResetPasswordController,
} from '../controllers/authentication/index';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/login',
    {
      schema: LoginSchema,
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '10 minutes',
        },
      },
    },
    loginController,
  );

  fastify.post(
    '/register',
    {
      schema: registerSchema,
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
    },
    registerController,
  );

  fastify.post(
    '/confirm-email',
    { schema: confirmEmailSchema },
    confirmEmailController,
  );

  fastify.post(
    '/ask-reset-password',
    {
      schema: emailSchema,
    },
    askResetPasswordController,
  );

  fastify.put(
    '/reset-password',
    {
      schema: resetPasswordSchema,
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
    },
    resetPasswordController,
  );
};
