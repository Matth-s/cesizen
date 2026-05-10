import { FastifyPluginAsync } from 'fastify';
import { getQuizController } from '../controllers/quiz/get-quiz-controller';
import {
  getQuizResultSchema,
  quizIdParams,
  updateDiagnosticWithAnswerSchema,
} from '../schemas/quiz-schema';
import { getQuizResultController } from '../controllers/quiz/get-quiz-result-controller';
import { Role } from '../generated/prisma/enums';
import { getAllQuizController } from '../controllers/quiz/get-all-quiz-controller';
import { getQuizByIdController } from '../controllers/quiz/get-quiz-by-id';
import { updateQuizByIdController } from '../controllers/quiz/update-quiz-by-id-controller';

export const quizRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', getQuizController);
  fastify.post(
    '/:quizId',
    {
      schema: getQuizResultSchema,
    },
    getQuizResultController,
  );

  fastify.get(
    '/:quizId',
    { schema: quizIdParams },
    getQuizByIdController,
  );

  fastify.get(
    '/all',
    {
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    getAllQuizController,
  );

  fastify.put(
    '/:quizId',
    {
      schema: updateDiagnosticWithAnswerSchema,
      preHandler: [
        fastify.authenticate,
        fastify.requireRole([Role.ADMIN]),
      ],
    },
    updateQuizByIdController,
  );
};
