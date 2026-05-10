import { PrismaClient } from '../generated/prisma/client';
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
      roles: string[],
    ) => (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
