import { api } from "@/lib/api-client";
import type { IDeleteUser } from "../schema/delete-user-schema";

export const deleteUserApi = async (formData: IDeleteUser): Promise<void> => {
  await api.post("/user/delete", formData);
};
