import { describe, it, expect } from 'vitest';
import { quizObjectSchema, diagnosticWithAnswerSchema } from '../quiz-schema';

describe('QuizSchema', () => {
  describe('quizObjectSchema', () => {
    it('should validate correct quiz object', () => {
      const data = {
        id: '1',
        title: 'Title',
        createdAt: '2023-01-01',
        _count: {
          answer: 5,
        },
      };
      const result = quizObjectSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('diagnosticWithAnswerSchema', () => {
    it('should validate correct diagnostic with answers', () => {
      const data = {
        id: '1',
        title: 'Diag Title',
        createdAt: '2023-01-01',
        answer: [
          { id: 'a1', name: 'Question 1', value: 10, quizId: '1' }
        ],
      };
      const result = diagnosticWithAnswerSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should fail if answer name is empty', () => {
      const data = {
        id: '1',
        title: 'Diag Title',
        createdAt: '2023-01-01',
        answer: [
          { id: 'a1', name: '', value: 10, quizId: '1' }
        ],
      };
      const result = diagnosticWithAnswerSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
