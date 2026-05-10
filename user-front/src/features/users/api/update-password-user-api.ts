import { api } from "@/lib/api-client";
import type { IUpdatePassword } from "../schema/update-password-schema";

export const updatePasswordUserApi = async (
  formData: IUpdatePassword,
): Promise<void> => {
  await api.put("/user/update-password", formData);
};
