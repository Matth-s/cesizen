import { FastifyReply, FastifyRequest } from 'fastify';
import { getQuiz } from '../../services/quiz';

export const getQuizController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  try {
    const quiz = await getQuiz(prisma);

    return reply.code(200).send(quiz);
  } catch {
    request.log.info(
      'Une erreur est survenue lors de la récupération du quiz',
    );
    return reply.code(500).send({
      message:
        'Une erreur est survenue lors de la récupération du quiz',
    });
  }
};
