import {
  Answer,
  PrismaClient,
  Quiz,
} from '../generated/prisma/client';

type QuizWithAnswer = Quiz & {
  answer: Answer[];
};

export const getQuiz = async (
  prisma: PrismaClient,
): Promise<QuizWithAnswer | null> => {
  try {
    const quiz = await prisma.quiz.findFirst({
      include: {
        answer: true,
      },
    });

    return quiz;
  } catch {
    throw new Error('Erreur bdd');
  }
};
