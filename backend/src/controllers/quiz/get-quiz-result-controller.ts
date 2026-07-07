import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { getQuizResultSchema } from '../../schemas/quiz-schema';
import { getQuizAndAnswerById } from '../../services/quiz';
import { calcResultDiag } from '../../helpers/quiz-helper';

export const getQuizResultController = async (
  request: FastifyRequestTypeBox<typeof getQuizResultSchema>,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;

  const { quizId } = request.params;
  const { answers: userResponse } = request.body;

  try {
    const existingQuiz = await getQuizAndAnswerById(prisma, quizId);

    if (!existingQuiz) {
      return reply.code(404).send({
        error: 'Ce quiz est introuvable',
      });
    }

    const diagResult = calcResultDiag({
      answers: existingQuiz.answer,
      userResponse,
    });

    return reply.code(200).send({
      message:
        'Le résultat de votre questionnaire a été calculé avec succès',
      result: diagResult,
    });
  } catch (err) {
    request.log.info(
      "Une erreur est survenue lors de l'obtention du résultat du diagnostic",
    );
    return reply.code(500).send({
      error:
        "Une erreur est survenue lors de l'obtention du résultat du diagnostic",
    });
  }
};
