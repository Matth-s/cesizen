import { api } from "@/lib/api-client";
import {
  resetPasswordResponseSchema,
  type resetPasswordResponseType,
  type resetPasswordType,
} from "../schemas/reset-password-schema";

export const resetPasswordApi = async ({
  formData,
  token,
}: {
  formData: resetPasswordType;
  token: string;
}): Promise<resetPasswordResponseType> => {
  const { data } = await api.put(
    `/authentication/reset-password?token${token}`,
    formData,
  );

  const validatedData = resetPasswordResponseSchema.parse(data);

  return validatedData;
};
