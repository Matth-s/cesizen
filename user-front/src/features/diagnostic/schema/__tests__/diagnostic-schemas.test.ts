import { describe, it, expect } from 'vitest';
import { quizSchema, answerSchema } from '../quiz-schema';

describe('DiagnosticSchemas', () => {
  describe('answerSchema', () => {
    it('should validate correct answer data', () => {
      const data = {
        id: 'a1',
        name: 'Answer 1',
        quizId: 'q1',
        value: 10,
      };
      expect(answerSchema.safeParse(data).success).toBe(true);
    });

    it('should coerce string value to number', () => {
      const data = {
        id: 'a1',
        name: 'Answer 1',
        quizId: 'q1',
        value: '15',
      };
      const result = answerSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.value).toBe(15);
      }
    });
  });

  describe('quizSchema', () => {
    it('should validate correct quiz data', () => {
      const data = {
        id: 'q1',
        answer: [
          { id: 'a1', name: 'A1', quizId: 'q1', value: 5 }
        ],
      };
      expect(quizSchema.safeParse(data).success).toBe(true);
    });
  });
});
