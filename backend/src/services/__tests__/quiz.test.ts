import { describe, it, expect, vi } from 'vitest';
import { prismaMock } from '../../__mocks__/prisma';
import {
  getAllQuizService,
  getQuiz,
  getQuizAndAnswerById,
  updateDiagnostic,
} from '../quiz';

describe('QuizService', () => {
  const mockQuiz = {
    id: 'quiz-1',
    title: 'Test Quiz',
    createdAt: new Date(),
    answer: [
      { id: 'ans-1', name: 'Option 1', value: 10, quizId: 'quiz-1' },
    ],
  };

  describe('getAllQuizService', () => {
    it('should return all quizzes with answer count', async () => {
      const mockQuizzes = [
        {
          ...mockQuiz,
          _count: { answer: 1 },
        },
      ];
      prismaMock.quiz.findMany.mockResolvedValue(mockQuizzes);

      const result = await getAllQuizService(prismaMock);

      expect(result).toEqual(mockQuizzes);
    });
  });

  describe('getQuiz', () => {
    it('should return the first quiz with answers', async () => {
      prismaMock.quiz.findFirst.mockResolvedValue(mockQuiz);

      const result = await getQuiz(prismaMock);

      expect(result).toEqual(mockQuiz);
    });

    it('should throw error on db failure', async () => {
      prismaMock.quiz.findFirst.mockRejectedValue(new Error());

      await expect(getQuiz(prismaMock)).rejects.toThrow('Erreur bdd');
    });
  });

  describe('getQuizAndAnswerById', () => {
    it('should return quiz by id', async () => {
      prismaMock.quiz.findFirst.mockResolvedValue(mockQuiz);

      const result = await getQuizAndAnswerById(prismaMock, 'quiz-1');

      expect(result).toEqual(mockQuiz);
      expect(prismaMock.quiz.findFirst).toHaveBeenCalledWith({
        where: { id: 'quiz-1' },
        include: { answer: true },
      });
    });
  });

  describe('updateDiagnostic', () => {
    it('should update quiz and its answers', async () => {
      prismaMock.quiz.update.mockResolvedValue(mockQuiz);

      await updateDiagnostic({
        prisma: prismaMock,
        id: 'quiz-1',
        data: mockQuiz,
      });

      expect(prismaMock.quiz.update).toHaveBeenCalledWith({
        where: { id: 'quiz-1' },
        data: {
          title: mockQuiz.title,
          answer: {
            deleteMany: {},
            create: [{ id: 'ans-1', name: 'Option 1', value: 10 }],
          },
        },
      });
    });
  });
});
