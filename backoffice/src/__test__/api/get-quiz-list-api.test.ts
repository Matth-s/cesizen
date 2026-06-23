import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '@/lib/api-client';
import { getDiagnosticById } from '@/features/quiz/api/get-diagnostic-by-id-api';
import { getQuizListApi } from '@/features/quiz/api/get-quiz-list-api';
import { updateDiagnosticApi } from '@/features/quiz/api/update-diagnostic-api';

vi.mock('@/lib/api-client', () => ({
  api: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('Quiz & Diagnostic API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getQuizListApi devrait retourner la liste des quiz avec le compte des réponses', async () => {
    const mockQuizList = [
      {
        id: 'q1',
        title: 'Test de Stress',
        createdAt: '2024-05-10',
        _count: { answer: 15 },
      },
    ];

    vi.mocked(api.get).mockResolvedValue({ data: mockQuizList });

    const result = await getQuizListApi();

    expect(api.get).toHaveBeenCalledWith('/quiz/all');
    expect(result).toHaveLength(1);
    expect(result[0]._count.answer).toBe(15);
  });

  it('getDiagnosticById devrait retourner un quiz complet avec ses questions', async () => {
    const mockDiagnostic = {
      id: 'diag-123',
      title: 'Évaluation Stress',
      createdAt: '2024-05-10',
      answer: [
        {
          id: 'a1',
          name: 'Question 1',
          value: 5,
          quizId: 'diag-123',
        },
        {
          id: 'a2',
          name: 'Question 2',
          value: 10,
          quizId: 'diag-123',
        },
      ],
    };

    vi.mocked(api.get).mockResolvedValue({ data: mockDiagnostic });

    const result = await getDiagnosticById('diag-123');

    expect(api.get).toHaveBeenCalledWith('/quiz/diag-123');
    expect(result.answer).toHaveLength(2);
    expect(result.title).toBe('Évaluation Stress');
  });

  it('getDiagnosticById devrait lever une erreur si les points (value) sont à 0', async () => {
    const invalidDiagnostic = {
      id: 'diag-123',
      title: 'Titre',
      createdAt: '2024-05-10',
      answer: [
        {
          id: 'a1',
          name: 'Question 1',
          value: 0,
          quizId: 'diag-123',
        },
      ],
    };

    vi.mocked(api.get).mockResolvedValue({ data: invalidDiagnostic });

    await expect(getDiagnosticById('diag-123')).rejects.toThrow();
  });

  it('updateDiagnosticApi devrait envoyer les modifications via PUT', async () => {
    const updateData = {
      id: 'diag-123',
      title: 'Titre Modifié',
      createdAt: '2024-05-10',
      answer: [],
    };

    vi.mocked(api.put).mockResolvedValue({ status: 200 });

    await updateDiagnosticApi(updateData);

    expect(api.put).toHaveBeenCalledWith(
      '/quiz/diag-123',
      updateData,
    );
  });
});
