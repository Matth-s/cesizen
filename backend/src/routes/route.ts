import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth-routes';
import { userRoutes } from './user-routes';
import { manageAccountRoutes } from './manage-account-routes';
import { quizRoutes } from './quiz-routes';

export default async function apiRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: '/authentication' });
  fastify.register(userRoutes, { prefix: '/user' });
  fastify.register(manageAccountRoutes, { prefix: '/admin' });
  fastify.register(quizRoutes, { prefix: '/quiz' });
}
