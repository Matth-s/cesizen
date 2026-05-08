import { api } from '@/lib/api-client';
import {
  diagnosticWithAnswerSchema,
  type IDiagnosticWithAnswer,
} from '../schema/quiz-schema';

export const getDiagnosticById = async (
  diagId?: string,
): Promise<IDiagnosticWithAnswer> => {
  const { data } = await api.get(`/quiz/${diagId}`);

  const validatedData = diagnosticWithAnswerSchema.parse(data);

  return validatedData;
};
