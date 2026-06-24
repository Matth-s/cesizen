import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "@/lib/api-client";
import { getCurrentUserApi } from "@/features/users/api/get-current-user-api";
import { updatePasswordUserApi } from "@/features/users/api/update-password-user-api";
import { deleteUserApi } from "@/features/users/api/delete-user-api";
import { logOutApi } from "@/features/users/api/logout-api";

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe("User Profile API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getCurrentUserApi devrait retourner les infos de l’utilisateur connecté", async () => {
    const mockUser = {
      username: "Matthieu",
      role: "USER",
      csrfToken: "secure-token-789",
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockUser });

    const result = await getCurrentUserApi();

    expect(api.get).toHaveBeenCalledWith("/user/current");
    expect(result.username).toBe("Matthieu");
  });

  it("updatePasswordUserApi devrait envoyer les nouveaux mots de passe via PUT", async () => {
    const passwords = {
      password: "NewPassword123!",
      confirmPassword: "NewPassword123!",
    };

    vi.mocked(api.put).mockResolvedValue({ status: 200 });

    await updatePasswordUserApi(passwords);

    expect(api.put).toHaveBeenCalledWith("/user/update-password", passwords);
  });
  it("deleteUserApi devrait envoyer le mot de passe de confirmation pour suppression", async () => {
    const deleteData = { password: "MyPassword123!" };

    vi.mocked(api.post).mockResolvedValue({ status: 200 });

    await deleteUserApi(deleteData);

    expect(api.post).toHaveBeenCalledWith("/user/delete", deleteData);
  });

  it("logOutApi devrait appeler la route de déconnexion", async () => {
    vi.mocked(api.post).mockResolvedValue({ status: 200 });

    await logOutApi();

    expect(api.post).toHaveBeenCalledWith("/user/logout");
  });
  it("getCurrentUserApi devrait échouer si le rôle est invalide ou absent", async () => {
    const badUser = { username: "Matthieu" };

    vi.mocked(api.get).mockResolvedValue({ data: badUser });

    await expect(getCurrentUserApi()).rejects.toThrow();
  });
});
