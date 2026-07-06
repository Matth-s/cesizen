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
import swaggerPlugin from './plugins/swagger';

export default async function app(fastify: FastifyInstance) {
  await fastify.register(corsPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(jwt);
  await fastify.register(rateLimit);
  await fastify.register(cookie);
  await fastify.register(csrf);
  await fastify.register(authMiddleware);
  await fastify.register(roleMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    await fastify.register(swaggerPlugin);
  }

  await fastify.register(apiRoutes, {
    prefix: '/api',
  });
}
