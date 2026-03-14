import Type from 'typebox';

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
      minLength: 8,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$',
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
    confirmPassword: Type.String(),
    username: Type.String({
      minLength: 3,
      maxLength: 12,
    }),
  }),
};
