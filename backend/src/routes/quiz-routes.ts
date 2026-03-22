import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { getQuizController } from '../controllers/quiz/get-quiz-controller';

export const quizRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', () => getQuizController);
};
