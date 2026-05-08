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
  name: z.string().trim().min(1, {
    error: 'Veuillez entrez une question',
  }),
  value: z.number().min(1, {
    error: 'Veuillez attribuer un nombre de point supérieur à 0',
  }),
  quizId: z.string(),
});

export const diagnosticWithAnswerSchema = z.object({
  id: z.string(),
  title: z.string().min(1, {
    error: 'Veuillez entrer un titre',
  }),
  createdAt: z.string(),
  answer: z.array(diagnosticObjectAnswer),
});

export const quizArraySchema = z.array(quizObjectSchema);

export type IDiagnosticWithAnswer = z.infer<
  typeof diagnosticWithAnswerSchema
>;

export type IQuizObject = z.infer<typeof quizObjectSchema>;
export type IQuizArray = z.infer<typeof quizArraySchema>;
