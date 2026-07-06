import { Type } from '@sinclair/typebox';
import { Role } from '@prisma/client';

export const userAdminSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$',
    }),
    confirmPassword: Type.String({
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$',
    }),
    username: Type.String({
      minLength: 3,
      maxLength: 20,
    }),
    role: Type.Enum(Role),
  }),
};

export const deleteUserSchema = {
  querystring: Type.Object({
    userId: Type.String(),
  }),
};

export const deleteAccountSchema = {
  body: Type.Object({
    password: Type.String(),
  }),
};

export const updatePasswordSchema = {
  body: Type.Object({
    password: Type.String({
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$',
    }),
    confirmPassword: Type.String(),
  }),
};
