import { Type } from '@sinclair/typebox';

export const emailSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
  }),
};

export const resetPasswordSchema = {
  body: Type.Object({
    password: Type.String({
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$',
    }),
    confirmPassword: Type.String(),
  }),
  querystring: Type.Object({
    token: Type.String(),
  }),
};

export const LoginSchema = {
  body: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({
      minLength: 1,
    }),
  }),
};

export const confirmEmailSchema = {
  querystring: Type.Object({
    token: Type.String({
      format: 'uuid',
    }),
  }),
};

export const registerSchema = {
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
  }),
};
