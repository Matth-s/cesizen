import { FastifyReply, FastifyRequest } from 'fastify';
import { getQuizAndAnswerById } from '../../services/quiz';
import { quizIdParams } from '../../schemas/quiz-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';

export const getQuizByIdController = async (
  request: FastifyRequestTypeBox<typeof quizIdParams>,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;
  const { quizId } = request.params;

  try {
    const quiz = await getQuizAndAnswerById(prisma, quizId);

    if (!quiz)
      return reply.code(404).send({
        error: 'Diagnostic non trouvé',
      });

    return reply.code(200).send(quiz);
  } catch {
    return reply.code(500).send({
      error:
        'Une erreur est survenue lors de la récupération du quiz',
    });
  }
};
