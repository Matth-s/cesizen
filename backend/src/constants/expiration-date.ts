const MINUTE = 60 * 1000;

export const getEmailExpiration = (): Date =>
  new Date(Date.now() + 15 * MINUTE);

export const getResetPasswordExpiration = (): Date =>
  new Date(Date.now() + 10 * MINUTE);
