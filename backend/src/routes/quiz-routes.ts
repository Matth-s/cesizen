import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { getQuizController } from '../controllers/quiz/get-quiz-controller';
import { getQuizResultSchema } from '../schemas/quiz-schema';
import { getQuizResultController } from '../controllers/quiz/get-quiz-result-controller';

export const quizRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', getQuizController);
  fastify.post(
    '/:quizId',
    {
      schema: getQuizResultSchema,
    },
    getQuizResultController,
  );
};
