import z from "zod";

export const deleteUserSchema = z.object({
  password: z.string().trim().min(1, {
    error: "Veuillez entrer votre de passe",
  }),
});

export type IDeleteUser = z.infer<typeof deleteUserSchema>;
