import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export default fp(async function swaggerPlugin(
  fastify: FastifyInstance,
) {
  await fastify.register(swagger, {
    mode: 'dynamic',
    openapi: {
      info: {
        title: 'Cesizen API',
        version: '1.0.0',
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/api/documentation',
  });
});
