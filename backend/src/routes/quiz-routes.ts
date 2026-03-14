import { FastifyPluginAsync, FastifyReply } from 'fastify';

export const quizRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', (_, reply: FastifyReply) =>
    reply.send('quiz route get'),
  );
};
