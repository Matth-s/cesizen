import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { updateDiagnosticWithAnswerSchema } from '../../schemas/quiz-schema';
import { FastifyReply } from 'fastify';
import {
  getQuizAndAnswerById,
  updateDiagnostic,
} from '../../services/quiz';

export const updateQuizByIdController = async (
  request: FastifyRequestTypeBox<
    typeof updateDiagnosticWithAnswerSchema
  >,
  reply: FastifyReply,
) => {
  const { prisma } = request.server;
  const { quizId } = request.params;
  const formData = request.body;

  try {
    const existingDiagnostic = await getQuizAndAnswerById(
      prisma,
      quizId,
    );

    if (!existingDiagnostic) {
      return reply.code(404).send({
        error: "Ce diagnostic n'existe pas",
      });
    }

    await updateDiagnostic({
      id: quizId,
      prisma,
      data: { ...formData, createdAt: new Date(formData.createdAt) },
    });

    return reply.code(200).send({
      message: 'Le diagnostic a été modifié avec succès',
    });
  } catch {
    request.log.error(
      'Une erreur est survenue lors de la mise à jour du diagnostic',
    );
    return reply.code(500).send({
      error: 'Une erreur est survenue',
    });
  }
};
