import { z } from "zod";
import { userSchema } from "./current-user-schema";

export const loginSchema = z.object({
  email: z.email({
    error: "Email invalide",
  }),
  password: z.string().trim().min(1, {
    error: "Veuillez entrez un mot de passe",
  }),
});

export const loginResponseSchema = z.object({
  message: z.string().optional(),
  user: userSchema.optional(),
});

export type loginResponseType = z.infer<typeof loginResponseSchema>;
export type loginType = z.infer<typeof loginSchema>;
