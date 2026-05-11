import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "@/lib/api-client";
import { getDiagnosticApi } from "../get-diagnostic-api";
import { postDiagnosticApi } from "../post-diagnostic-api";

vi.mock("@/lib/api-client", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("Quiz User Flow API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getDiagnosticApi devrait récupérer et valider les questions du quiz", async () => {
    const mockQuiz = {
      id: "quiz-123",
      answer: [
        { id: "a1", name: "Se sentir stressé", quizId: "quiz-123", value: 5 },
        {
          id: "a2",
          name: "Manque de sommeil",
          quizId: "quiz-123",
          value: "10",
        },
      ],
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockQuiz });

    const result = await getDiagnosticApi();

    expect(api.get).toHaveBeenCalledWith("/quiz");
    expect(result.id).toBe("quiz-123");
    expect(result.answer[1].value).toBe(10);
  });

  it("postDiagnosticApi devrait envoyer les réponses de l’utilisateur au bon format", async () => {
    const formData = {
      id: "quiz-123",
      answers: [
        { id: "a1", value: true },
        { id: "a2", value: false },
      ],
    };

    vi.mocked(api.post).mockResolvedValue({ data: { success: true } });

    await postDiagnosticApi(formData);

    expect(api.post).toHaveBeenCalledWith("/quiz/quiz-123", {
      answers: formData.answers,
    });
  });

  it("getDiagnosticApi devrait rejeter les données si le tableau d’answers est manquant", async () => {
    const corruptedData = { id: "quiz-123" };

    vi.mocked(api.get).mockResolvedValue({ data: corruptedData });

    await expect(getDiagnosticApi()).rejects.toThrow();
  });
});
