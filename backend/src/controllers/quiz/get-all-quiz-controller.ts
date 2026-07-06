import { FastifyReply, FastifyRequest } from 'fastify';
import { getAllQuizService } from '../../services/quiz';

export const getAllQuizController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;

  console.log('je suis le quiez');
  try {
    const quizs = await getAllQuizService(prisma);

    return reply.code(200).send(quizs);
  } catch {
    return reply.code(500).send({
      error:
        'Une erreur est survenue lors de la récupération des diagnostics',
    });
  }
};
