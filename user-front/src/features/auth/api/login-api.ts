import { api } from "@/libs/api-client";
import {
  loginResponseSchema,
  type loginResponseType,
  type loginType,
} from "../schemas/login-schema";

export const loginApi = async (
  credentials: loginType,
): Promise<loginResponseType> => {
  const { data } = await api.post("/authentication/login", credentials);

  const validatedData = loginResponseSchema.parse(data);

  return validatedData;
};
