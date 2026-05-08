import z from 'zod';

export const updateUserSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
});

export const updateUserResponseSchema = z.object({
  message: z.string(),
});

export type IUpdateUserType = z.infer<typeof updateUserSchema>;
export type updateUserResponseType = z.infer<
  typeof updateUserResponseSchema
>;
