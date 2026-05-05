import { api } from "@/lib/api-client";
import type { postDiagnosticType } from "../schema/post-diagnostic-schema";

export const postDiagnosticApi = async (formData: postDiagnosticType) => {
  const { id: quizId, answers } = formData;
  const { data } = await api.post(`/quiz/${quizId}`, { answers });

  console.log(data);
};
