import { USER_ROLES } from "@/types/user-role";
import z from "zod";

export const userSchema = z.object({
  username: z.string(),
  role: z.enum(USER_ROLES),
  csrfToken: z.string(),
});

export type userType = z.infer<typeof userSchema>;
