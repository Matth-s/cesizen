import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const updatePasswordSchema = z
  .object({
    password: z.string().regex(passwordRegex, {
      message:
        "Le mot de passe doit contenir 8 caractères minimum, une majuscule, un chiffre et un caractère spécial",
    }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type IUpdatePassword = z.infer<typeof updatePasswordSchema>;
