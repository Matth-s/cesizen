import { api } from "@/lib/api-client";
import {
  forgotPasswordResponse,
  type forgotPasswordResponseType,
  type forgotPasswordType,
} from "../schemas/forgot-password-schema";

export const forgotPasswordApi = async (
  formData: forgotPasswordType,
): Promise<forgotPasswordResponseType> => {
  const { data } = await api.post(
    "/authentication/ask-reset-password",
    formData,
  );

  const validatedData = forgotPasswordResponse.parse(data);

  return validatedData;
};
