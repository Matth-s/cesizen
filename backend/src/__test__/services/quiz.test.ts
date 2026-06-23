import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { PrismaClient } from '@prisma/client';

import {
  getAllQuizService,
  getQuiz,
  getQuizAndAnswerById,
  updateDiagnostic,
} from '../../services/quiz';

import { setupDatabase, teardownDatabase } from '../global-setup';

let prisma: PrismaClient;

describe('QuizService Integration', () => {
  beforeAll(async () => {
    prisma = await setupDatabase();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

  beforeEach(async () => {
    await prisma.answer.deleteMany();
    await prisma.quiz.deleteMany();
  });

  async function createQuiz() {
    return prisma.quiz.create({
      data: {
        title: 'Test Quiz',
        answer: {
          create: [
            {
              name: 'Option 1',
              value: 10,
            },
          ],
        },
      },
      include: {
        answer: true,
      },
    });
  }

  describe('getAllQuizService', () => {
    it('should return all quizzes with answer count', async () => {
      await createQuiz();

      const result = await getAllQuizService(prisma);

      expect(result).toHaveLength(1);

      expect(result[0].title).toBe('Test Quiz');
    });
  });

  describe('getQuiz', () => {
    it('should return first quiz with answers', async () => {
      await createQuiz();

      const result = await getQuiz(prisma);

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Test Quiz');

      expect(result?.answer).toHaveLength(1);
    });

    it('should return null when no quiz exists', async () => {
      const result = await getQuiz(prisma);

      expect(result).toBeNull();
    });
  });

  describe('getQuizAndAnswerById', () => {
    it('should return quiz by id', async () => {
      const created = await createQuiz();

      const result = await getQuizAndAnswerById(prisma, created.id);

      expect(result).not.toBeNull();

      expect(result?.id).toBe(created.id);

      expect(result?.answer).toHaveLength(1);
    });
  });

  describe('updateDiagnostic', () => {
    it('should update quiz title and answers', async () => {
      const created = await createQuiz();

      const updated = await updateDiagnostic({
        prisma,
        id: created.id,
        data: {
          ...created,
          title: 'Updated Quiz',
          answer: [
            {
              quizId: created.id,
              id: 'answer-2',
              name: 'Option 2',
              value: 20,
            },
          ],
        },
      });

      expect(updated.title).toBe('Updated Quiz');

      const dbQuiz = await prisma.quiz.findUnique({
        where: {
          id: created.id,
        },
        include: {
          answer: true,
        },
      });

      expect(dbQuiz?.answer).toHaveLength(1);

      expect(dbQuiz?.answer[0].name).toBe('Option 2');

      expect(dbQuiz?.answer[0].value).toBe(20);
    });
  });
});
