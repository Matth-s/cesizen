import { PrismaClient, Role } from '../generated/prisma/client';
import { FastifyJwtNamespace } from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance
    extends
      FastifyJwtNamespace<{ namespace: 'accessJwt' }>,
      FastifyJwtNamespace<{ namespace: 'refreshJwt' }> {
    prisma: PrismaClient;

    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    requireRole: (
      roles: Role[],
    ) => (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
