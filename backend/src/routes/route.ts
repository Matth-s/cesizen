import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth-routes';
import { userRoutes } from './user-routes';
import { manageAccountRoutes } from './manage-account-routes';
import { quizRoutes } from './quiz-routes';
import { pageRoutes } from './page-routes';
import { menuRoutes } from './menu-routes';
import { dashboardRoutes } from './dashboard-route';

export default async function apiRoutes(fastify: FastifyInstance) {
  fastify.get('/healt', (_, reply) => {
    return reply.code(200).send({
      message: 'OK',
    });
  });

  fastify.register(authRoutes, { prefix: '/authentication' });
  fastify.register(userRoutes, { prefix: '/user' });
  fastify.register(manageAccountRoutes, { prefix: '/admin' });
  fastify.register(quizRoutes, { prefix: '/quiz' });
  fastify.register(pageRoutes, { prefix: '/page' });
  fastify.register(menuRoutes, { prefix: '/menu' });
  fastify.register(dashboardRoutes, {
    prefix: '/dashboard',
  });
}
