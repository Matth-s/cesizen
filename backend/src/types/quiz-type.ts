import { Answer, Quiz } from '../generated/prisma/client';

export type IQuizWithAnswer = Quiz & {
  answer: Answer[];
};
