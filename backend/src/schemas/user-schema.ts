import Type from 'typebox';
import { Role } from '../generated/prisma/enums';

export const userAdminSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$',
    }),
    confirmPassword: Type.String(),
    username: Type.String({
      minLength: 3,
      maxLength: 12,
    }),
    role: Type.Enum(Role),
  }),
};

export const deleteUserSchema = {
  querystring: Type.Object({
    userId: Type.String({
      format: 'uuid',
    }),
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
