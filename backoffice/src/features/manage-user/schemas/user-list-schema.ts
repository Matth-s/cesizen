import { USER_ROLE } from '@/types/user-role';
import z from 'zod';

export const userObjectSchema = z.object({
  createAt: z.string(),
  email: z.email(),
  emailVerified: z.string().nullable(),
  id: z.string(),
  isActive: z.boolean(),
  username: z.string(),
  role: z.enum(USER_ROLE),
});

export const userArraySchema = z.array(userObjectSchema);

export type IUserObject = z.infer<typeof userObjectSchema>;
export type IUserArray = z.infer<typeof userArraySchema>;
