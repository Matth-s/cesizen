import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { Role } from '@prisma/client';

export default fp(async (fastify) => {
  fastify.decorate('requireRole', function (roles: Role[]) {
    return async function (
      request: FastifyRequest,
      reply: FastifyReply,
    ) {
      if (!roles.includes(request.user.role)) {
        return reply.code(403).send({ message: 'Forbidden' });
      }
    };
  });
});
