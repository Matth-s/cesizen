import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { getDiagnosticApi } from '../get-diagnostic-api';
import { api } from '@/lib/api-client';

describe('DiagnosticApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  it('should return validated quiz data', async () => {
    const mockQuiz = {
      id: 'q1',
      answer: [{ id: 'a1', name: 'A1', quizId: 'q1', value: 5 }],
    };

    mock.onGet('/quiz').reply(200, mockQuiz);

    const result = await getDiagnosticApi();
    expect(result).toEqual(mockQuiz);
  });

  it('should throw error on validation failure', async () => {
    mock.onGet('/quiz').reply(200, { invalid: 'data' });
    await expect(getDiagnosticApi()).rejects.toThrow();
  });
});
