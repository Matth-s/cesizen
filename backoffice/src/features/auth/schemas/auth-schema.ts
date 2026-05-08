import { USER_ROLE } from '@/types/user-role';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({
    error: 'Email invalide',
  }),
  password: z.string().trim().min(1, {
    error: 'Veuillez entrer votre mot de passe',
  }),
});

export const currentUserSchema = z.object({
  username: z.string(),
  role: z.enum(USER_ROLE),
  csrfToken: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ICurrentUserResponse = z.infer<typeof currentUserSchema>;
