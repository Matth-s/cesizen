import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateQuizByIdController } from '../../../controllers/quiz/update-quiz-by-id-controller';
import * as quizServices from '../../../services/quiz';

vi.mock('../../services/quiz');

describe('updateQuizByIdController', () => {
  let mockRequest: any;
  let mockReply: any;

  beforeEach(() => {
    vi.restoreAllMocks();

    mockRequest = {
      server: { prisma: {} },
      params: { quizId: 'quiz-123' },
      body: {
        title: 'Quiz Updated',
        createdAt: '2024-01-01T10:00:00.000Z',
      },
      log: {
        error: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
      },
    };

    mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('devrait mettre à jour le quiz avec succès', async () => {
    vi.spyOn(quizServices, 'getQuizAndAnswerById').mockResolvedValue({
      id: 'quiz-123',
    } as any);
    vi.spyOn(quizServices, 'updateDiagnostic').mockResolvedValue(
      {} as any,
    );

    await updateQuizByIdController(mockRequest, mockReply);

    expect(quizServices.getQuizAndAnswerById).toHaveBeenCalledWith(
      expect.anything(),
      'quiz-123',
    );
    expect(quizServices.updateDiagnostic).toHaveBeenCalledWith({
      id: 'quiz-123',
      prisma: expect.anything(),
      data: expect.objectContaining({
        title: 'Quiz Updated',
        createdAt: expect.any(Date),
      }),
    });
    expect(mockReply.code).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'Le diagnostic a été modifié avec succès',
    });
  });

  it('devrait retourner 404 si le diagnostic est introuvable', async () => {
    // 1. On mocke le retour à null
    vi.spyOn(quizServices, 'getQuizAndAnswerById').mockResolvedValue(
      null,
    );

    // 2. On transforme updateDiagnostic en spy pour pouvoir vérifier qu'il n'est PAS appelé
    const updateSpy = vi.spyOn(quizServices, 'updateDiagnostic');

    await updateQuizByIdController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: "Ce diagnostic n'existe pas",
    });

    expect(updateSpy).not.toHaveBeenCalled();
  });

  it("devrait retourner 500 en cas d'erreur interne", async () => {
    vi.spyOn(quizServices, 'getQuizAndAnswerById').mockRejectedValue(
      new Error(),
    );

    await updateQuizByIdController(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockReply.send).toHaveBeenCalledWith({
      error: 'Une erreur est survenue',
    });
  });
});
