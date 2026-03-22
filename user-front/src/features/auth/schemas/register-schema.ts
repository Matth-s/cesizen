import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const registerSchema = z
  .object({
    email: z.string().email({
      message: 'Email invalide',
    }),

    username: z
      .string()
      .trim()
      .min(1, {
        message: 'Veuillez entrer votre nom',
      })
      .max(20, {
        message: 'Le nom ne doit pas dépasser 20 caractères',
      }),

    password: z.string().regex(passwordRegex, {
      message:
        'Le mot de passe doit contenir 8 caractères minimum, une majuscule, un chiffre et un caractère spécial',
    }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const registerResponseSchema = z.object({
  message: z.string(),
});

export type registerResponseType = z.infer<
  typeof registerResponseSchema
>;
export type registerType = z.infer<typeof registerSchema>;
