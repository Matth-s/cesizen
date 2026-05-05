import z from "zod";

export const answerFormSchema = z.object({
  id: z.string(),
  value: z.boolean(),
});

export const postDiagnosticSchema = z.object({
  id: z.string(),
  answers: z.array(answerFormSchema),
});

export type postDiagnosticType = z.infer<typeof postDiagnosticSchema>;
