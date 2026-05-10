import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { getQuizListApi } from '../get-quiz-list-api';
import { api } from '@/lib/api-client';

describe('GetQuizListApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  const mockQuiz = {
    id: '1',
    title: 'Test Quiz',
    createdAt: '2023-01-01',
    _count: {
      answer: 5,
    },
  };

  it('should return a list of quizzes', async () => {
    mock.onGet('/quiz/all').reply(200, [mockQuiz]);

    const result = await getQuizListApi();

    expect(result).toEqual([mockQuiz]);
  });

  it('should throw error if validation fails', async () => {
    mock.onGet('/quiz/all').reply(200, [{ id: '1', title: 'Invalid' }]); // missing _count

    await expect(getQuizListApi()).rejects.toThrow();
  });
});
