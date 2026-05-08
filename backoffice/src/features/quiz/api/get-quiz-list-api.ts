import { api } from '@/lib/api-client';
import {
  quizArraySchema,
  type IQuizArray,
} from '../schema/quiz-schema';

export const getQuizListApi = async (): Promise<IQuizArray> => {
  const { data } = await api.get('/quiz/all');

  const validatedData = quizArraySchema.parse(data);

  return validatedData;
};
