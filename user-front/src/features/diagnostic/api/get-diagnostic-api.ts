import { api } from "@/lib/api-client";
import { quizSchema, type quizType } from "../schema/quiz-schema";

export const getDiagnosticApi = async (): Promise<quizType> => {
  const { data } = await api.get("/quiz");

  const validatedData = quizSchema.parse(data);

  return validatedData;
};
