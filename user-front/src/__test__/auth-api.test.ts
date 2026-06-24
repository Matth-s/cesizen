import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "@/lib/api-client";
import { registerApi } from "../features/auth/api/register-api";
import { loginApi } from "../features/auth/api/login-api";
import { confirmEmailApi } from "../features/auth/api/confirm-email-api";
import { forgotPasswordApi } from "../features/auth/api/forgot-password-api";
import { resetPasswordApi } from "../features/auth/api/reset-password-api";

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe("Authentication Workflow API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registerApi devrait envoyer les données et valider la réponse", async () => {
    const userData = {
      email: "new@user.fr",
      username: "NewUser",
      password: "Password123!",
      confirmPassword: "Password123!",
    };
    vi.mocked(api.post).mockResolvedValue({ data: { message: "Compte créé" } });

    const result = await registerApi(userData);
    expect(api.post).toHaveBeenCalledWith("/authentication/register", userData);
    expect(result.message).toBe("Compte créé");
  });

  it("loginApi devrait retourner l’utilisateur et le message de succès", async () => {
    const credentials = { email: "admin@cesi.fr", password: "Password123!" };
    const mockResponse = {
      message: "Bienvenue",
      user: { username: "Admin", role: "ADMIN", csrfToken: "csrf-123" },
    };
    vi.mocked(api.post).mockResolvedValue({ data: mockResponse });

    const result = await loginApi(credentials);
    expect(result.user?.role).toBe("ADMIN");
  });

  it("confirmEmailApi devrait valider le token via GET", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { message: "Email confirmé" },
    });

    const result = await confirmEmailApi("token-test-123");
    expect(api.get).toHaveBeenCalledWith(
      "/authentication/confirm-email?token=token-test-123",
    );
    expect(result.message).toBe("Email confirmé");
  });

  it("resetPasswordApi devrait échouer si les mots de passe ne correspondent pas", async () => {
    const formData = {
      password: "Password123!",
      confirmPassword: "DifferentPassword456!",
    };

    await expect(
      resetPasswordApi({ formData: formData, token: "abc" }),
    ).rejects.toThrow();
  });

  it("forgotPasswordApi devrait envoyer l’email de récupération", async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { message: "Lien envoyé" } });

    const result = await forgotPasswordApi({ email: "test@cesi.fr" });
    expect(api.post).toHaveBeenCalledWith(
      "/authentication/ask-reset-password",
      { email: "test@cesi.fr" },
    );
    expect(result.message).toBe("Lien envoyé");
  });
});
