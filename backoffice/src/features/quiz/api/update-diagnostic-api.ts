import { api } from '@/lib/api-client';
import type { IDiagnosticWithAnswer } from '../schema/quiz-schema';

export const updateDiagnosticApi = async (
  formData: IDiagnosticWithAnswer,
) => {
  await api.put(`/quiz/${formData.id}`, formData);
};
