import { Answer, Quiz } from '../generated/prisma/client';

export type IQuizWithAnswer = Quiz & {
  answer: Answer[];
};

export type IQuizWithAnswerCount = Quiz & {
  _count: {
    answer: number;
  };
};
