import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: "Email invalide",
  }),
});

export const forgotPasswordResponse = z.object({
  message: z.string(),
});

export type forgotPasswordResponseType = z.infer<typeof forgotPasswordResponse>;
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
