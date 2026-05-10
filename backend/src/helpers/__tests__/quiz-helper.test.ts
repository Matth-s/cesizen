import { describe, it, expect } from 'vitest';
import { calcResultDiag } from '../quiz-helper';

describe('QuizHelper', () => {
  describe('calcResultDiag', () => {
    it('should calculate the total score correctly', () => {
      const userResponse = [
        { id: 'ans-1', value: true },
        { id: 'ans-2', value: false },
        { id: 'ans-3', value: true },
      ];
      const answers = [
        { id: 'ans-1', value: 10, name: 'Opt 1', quizId: 'q1' },
        { id: 'ans-2', value: 5, name: 'Opt 2', quizId: 'q1' },
        { id: 'ans-3', value: 7, name: 'Opt 3', quizId: 'q1' },
      ];

      const result = calcResultDiag({ userResponse, answers } as any);

      expect(result).toBe(17); // 10 + 7
    });

    it('should return 0 if no answers are selected', () => {
      const userResponse = [
        { id: 'ans-1', value: false },
      ];
      const answers = [
        { id: 'ans-1', value: 10, name: 'Opt 1', quizId: 'q1' },
      ];

      const result = calcResultDiag({ userResponse, answers } as any);

      expect(result).toBe(0);
    });

    it('should return 0 if userResponse is empty', () => {
      const userResponse: any[] = [];
      const answers = [
        { id: 'ans-1', value: 10, name: 'Opt 1', quizId: 'q1' },
      ];

      const result = calcResultDiag({ userResponse, answers } as any);

      expect(result).toBe(0);
    });

    it('should handle missing answer IDs gracefully', () => {
      const userResponse = [
        { id: 'unknown', value: true },
      ];
      const answers = [
        { id: 'ans-1', value: 10, name: 'Opt 1', quizId: 'q1' },
      ];

      const result = calcResultDiag({ userResponse, answers } as any);

      expect(result).toBe(0);
    });
  });
});
