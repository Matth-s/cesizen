import { PrismaClient } from '@prisma/client';
import {
  IQuizWithAnswer,
  IQuizWithAnswerCount,
} from '../types/quiz-type';

export const getAllQuizService = async (
  prisma: PrismaClient,
): Promise<IQuizWithAnswerCount[]> => {
  return await prisma.quiz.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      _count: {
        select: {
          answer: true,
        },
      },
    },
  });
};

export const getQuiz = async (
  prisma: PrismaClient,
): Promise<IQuizWithAnswer | null> => {
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

export const getQuizAndAnswerById = async (
  prisma: PrismaClient,
  quizId: string,
): Promise<IQuizWithAnswer | null> => {
  try {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: quizId,
      },
      include: {
        answer: true,
      },
    });

    return quiz;
  } catch {
    throw new Error('Erreur bdd');
  }
};

export const updateDiagnostic = async ({
  prisma,
  id,
  data,
}: {
  prisma: PrismaClient;
  id: string;
  data: IQuizWithAnswer;
}) => {
  const { title, answer } = data;
  return await prisma.quiz.update({
    where: {
      id,
    },
    data: {
      title,
      answer: {
        deleteMany: {},
        create: answer.map(({ id, name, value }) => ({
          id,
          name,
          value,
        })),
      },
    },
  });
};
