import { api } from "@/lib/api-client";
import {
  userSchema,
  type userType,
} from "../../auth/schemas/current-user-schema";

export const getCurrentUserApi = async (): Promise<userType> => {
  const { data } = await api.get("/user/current");

  const validatedData = userSchema.parse(data);

  return validatedData;
};
