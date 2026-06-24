import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "@/lib/api-client";
import {
  getDynamicPageApi,
  getDynamicPageByIdApi,
} from "@/features/dynamic-page/api/get-dynamic-page-api";

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("Dynamic Pages API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getDynamicPageApi devrait retourner un tableau de pages publiées validé", async () => {
    const mockPages = [
      {
        id: "page-1",
        title: "Titre Dynamique",
        description: "Ma description",
        content: "<p>Contenu</p>",
        imageUrl: "http://image.jpg",
        slug: "titre-dynamique",
        isPublished: true,
        createdAt: "2024-05-11",
      },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockPages });

    const result = await getDynamicPageApi("menu-id-123");

    expect(api.get).toHaveBeenCalledWith("/page/published/menu-id-123");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("titre-dynamique");
  });

  it("getDynamicPageByIdApi devrait retourner une page unique complète", async () => {
    const mockPage = {
      id: "page-1",
      title: "Focus Article",
      description: "Desc",
      content: "Contenu",
      imageUrl: "img.png",
      slug: "focus-article",
      isPublished: true,
      createdAt: "2024-05-11",
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockPage });

    const result = await getDynamicPageByIdApi("page-1");

    expect(api.get).toHaveBeenCalledWith("/page/by-id/page-1");
    expect(result.title).toBe("Focus Article");
  });

  it("devrait échouer si des champs obligatoires sont manquants (ex: imageUrl)", async () => {
    const invalidPage = {
      id: "page-1",
      title: "Titre",
      content: "Contenu",
      slug: "titre",
      isPublished: true,
      createdAt: "2024-05-11",
    };

    vi.mocked(api.get).mockResolvedValue({ data: invalidPage });

    await expect(getDynamicPageByIdApi("page-1")).rejects.toThrow();
  });
});
