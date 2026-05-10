import { describe, it, expect, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { loginApi } from '../login-api';
import { api } from '@/lib/api-client';

describe('AuthApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  it('should return validated data on successful login', async () => {
    const mockResponse = {
      message: 'Logged in',
      user: {
        username: 'user',
        role: 'USER',
        csrfToken: 'token',
      }
    };

    mock.onPost('/authentication/login').reply(200, mockResponse);

    const result = await loginApi({ email: 'test@example.com', password: 'password' });
    expect(result).toEqual(mockResponse);
  });

  it('should throw error on failure', async () => {
    mock.onPost('/authentication/login').reply(401, { message: 'Unauthorized' });
    await expect(loginApi({ email: 'test@example.com', password: 'p' })).rejects.toThrow();
  });
});
