import z from 'zod';

export const quizObjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  _count: z.object({
    answer: z.number(),
  }),
});

export const diagnosticObjectAnswer = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  quizId: z.string(),
});

export const diagnosticWithAnswerSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  answer: z.array(diagnosticObjectAnswer),
});

export const quizArraySchema = z.array(quizObjectSchema);

export type IDiagnosticWithAnswer = z.infer<
  typeof diagnosticWithAnswerSchema
>;

export type IQuizObject = z.infer<typeof quizObjectSchema>;
export type IQuizArray = z.infer<typeof quizArraySchema>;
