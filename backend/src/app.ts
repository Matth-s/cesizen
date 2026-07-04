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
  await fastify.register(swaggerPlugin);

  fastify.addHook('preValidation', async (request, reply) => {
    if (request.body && typeof request.body === 'object') {
      const bodyString = JSON.stringify(request.body);
      const sqlKeywordsRegex = /\s+(OR|AND)\s+|'|--/g;

      if (sqlKeywordsRegex.test(bodyString)) {
        return reply.code(400).send({
          error: 'Bad Request',
          message: 'Invalid characters detected in request payload.',
        });
      }
    }
  });

  await fastify.register(apiRoutes, {
    prefix: '/api',
  });
}
