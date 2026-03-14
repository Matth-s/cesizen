import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(cookie);
});
