export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type IUserRoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES];
