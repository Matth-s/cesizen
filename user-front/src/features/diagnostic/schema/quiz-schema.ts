import z from "zod";

export const answerSchema = z.object({
  id: z.string(),
  name: z.string(),
  quizId: z.string(),
  value: z.coerce.number(),
});

export const quizSchema = z.object({
  id: z.string(),
  answer: z.array(answerSchema),
});

export type quizType = z.infer<typeof quizSchema>;
export type answerType = z.infer<typeof answerSchema>;
