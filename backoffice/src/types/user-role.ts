export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type IUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
