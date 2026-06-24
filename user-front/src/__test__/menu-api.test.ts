import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "@/lib/api-client";
import { getMenuItemsApi } from "@/features/menu/api/get-menu-api";

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getMenuItemsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait retourner la liste des items du menu validée par Zod", async () => {
    const mockMenuItems = [
      { id: "m1", label: "Accueil", path: "/", show: true },
      { id: "m2", label: "Nos Conseils", path: "/conseils", show: true },
      { id: "m3", label: "Admin", path: "/admin", show: false },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockMenuItems });

    const result = await getMenuItemsApi();

    expect(api.get).toHaveBeenCalledWith("/menu");
    expect(result).toHaveLength(3);
    expect(result[0].label).toBe("Accueil");
    expect(typeof result[0].show).toBe("boolean");
  });

  it("devrait échouer si l’API renvoie un objet au lieu d’un tableau (Validation Zod)", async () => {
    const invalidData = { id: "m1", label: "Erreur" };

    vi.mocked(api.get).mockResolvedValue({ data: invalidData });

    await expect(getMenuItemsApi()).rejects.toThrow();
  });

  it("devrait propager une erreur 404 si la route n’existe pas", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Not Found"));

    await expect(getMenuItemsApi()).rejects.toThrow("Not Found");
  });
});
