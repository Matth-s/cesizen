import { FastifyInstance } from 'fastify';
import prismaPlugin from './plugins/prisma';
import apiRoutes from './routes/route';
import corsPlugin from './plugins/cors';
import jwt from './plugins/jwt';
import rateLimit from './plugins/rate-limit';
import cookie from './plugins/cookie';
import csrf from './plugins/csrf';
import authMiddleware from './plugins/auth-middleware';
import roleMiddleware from './plugins/role-middleware';

export default async function app(fastify: FastifyInstance) {
  await fastify.register(corsPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(jwt);
  await fastify.register(rateLimit);
  await fastify.register(cookie);

  if (process.env.DISABLE_CSRF == true) {
    await fastify.register(csrf);
  }
  await fastify.register(authMiddleware);
  await fastify.register(roleMiddleware);

  await fastify.register(apiRoutes, {
    prefix: '/api',
  });
}
