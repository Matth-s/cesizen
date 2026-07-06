import {
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import {
  deleteUserSchema,
  userAdminSchema,
} from '../schemas/user-schema';

import { Role } from '@prisma/client';

import {
  createAdminAccountController,
  updateAccountController,
  deleteUserController,
  getUserListController,
} from '../controllers/manage-account/index';

export const manageAccountRoutes: FastifyPluginAsync = async (
  fastify,
) => {
  fastify.get(
    '/user-list',
    {
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    getUserListController,
  );

  fastify.post(
    '/create-admin-account',
    {
      schema: userAdminSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
        fastify.csrfProtection,
        async (request, reply) => {
          const { password, confirmPassword } = request.body as any;

          if (password !== confirmPassword) {
            return reply.code(400).send({
              message: 'Les mots de passe ne correspondent pas',
            });
          }
        },
      ],
    },
    createAdminAccountController,
  );

  fastify.put(
    '/update-user-status',
    {
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
        fastify.csrfProtection,
      ],
    },
    updateAccountController,
  );

  fastify.delete(
    '/delete-user',
    {
      schema: deleteUserSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
        fastify.csrfProtection,
      ],
    },

    deleteUserController,
  );
};
