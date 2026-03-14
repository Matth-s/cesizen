import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        console.log(request.cookies);
        await request.accessJwtVerify();
      } catch (err) {
        return reply.code(401).send({ message: 'Unauthorized' });
      }
    },
  );
});
