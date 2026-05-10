import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loginApi } from '../login-api';
import { api } from '@/lib/api-client';

describe('LoginApi', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  it('should return validated data on successful login', async () => {
    const mockResponse = {
      username: 'testuser',
      role: 'ADMIN',
      csrfToken: 'token123',
    };

    mock.onPost('/authentication/admin/login').reply(200, mockResponse);

    const result = await loginApi({ email: 'test@example.com', password: 'password' });

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error on failed login', async () => {
    mock.onPost('/authentication/admin/login').reply(401, { message: 'Unauthorized' });

    await expect(loginApi({ email: 'test@example.com', password: 'wrong' })).rejects.toThrow('Unauthorized');
  });

  it('should throw an error if response data is invalid', async () => {
    const invalidResponse = {
      username: 'testuser',
      // missing role and csrfToken
    };

    mock.onPost('/authentication/admin/login').reply(200, invalidResponse);

    await expect(loginApi({ email: 'test@example.com', password: 'password' })).rejects.toThrow();
  });
});
