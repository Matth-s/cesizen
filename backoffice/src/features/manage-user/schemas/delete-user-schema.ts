import { z } from 'zod';

export const deleteUserSchema = (username: string) =>
  z.object({
    confirm: z
      .string()
      .min(1, 'Ce champ est requis')
      .refine((value) => value === username, {
        message: `Vous devez taper exactement "${username}"`,
      }),
  });

export type IDeleteUser = z.infer<
  ReturnType<typeof deleteUserSchema>
>;
