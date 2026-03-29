import z from "zod";

export const confirmAuthSchema = z.object({
  message: z.string(),
});

export type ConfirmAuthResponse = z.infer<typeof confirmAuthSchema>;
