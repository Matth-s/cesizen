import { api } from "@/libs/api-client";
import {
  confirmAuthSchema,
  type ConfirmAuthResponse,
} from "../schemas/confirm-auth-schema";

export const confirmEmailApi = async (
  token: string,
): Promise<ConfirmAuthResponse> => {
  const { data } = await api.get(
    `/authentication/confirm-email?token=${token}`,
  );

  const validatedData = confirmAuthSchema.parse(data);

  return validatedData;
};
