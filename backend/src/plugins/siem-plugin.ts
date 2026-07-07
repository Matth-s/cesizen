import fp from 'fastify-plugin';

import { FastifyError } from 'fastify';

export default fp(async (fastify) => {
  fastify.addHook('onResponse', async (request, reply) => {
    request.log.info({
      event: 'http_request',
      method: request.method,
      url: request.url,
      status: reply.statusCode,
      ip: request.ip,
      userId: request.user?.userId,
      userAgent: request.headers['user-agent'],
      responseTime: reply.elapsedTime,
    });
  });

  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error({
      event: 'server_error',
      method: request.method,
      url: request.url,
      ip: request.ip,
      userId: request.user.userId,
      error: error.message,
      stack: error.stack,
    });

    reply.status(error.statusCode ?? 500).send(error);
  });
});
