import { describe, it, expect } from 'vitest';
import { Value } from '@sinclair/typebox/value';
import { LoginSchema, registerSchema } from '../authenticate-schema';

describe('AuthenticateSchema', () => {
  describe('LoginSchema', () => {
    it('should validate correct login data', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123'
      };
      const errors = [...Value.Errors(LoginSchema.body, data)];
      if (errors.length > 0) {
        console.log('LoginSchema errors:', JSON.stringify(errors, null, 2));
      }
      expect(Value.Check(LoginSchema.body, data)).toBe(true);
    });

    it('should fail on invalid email', () => {
      const data = {
        email: 'invalid-email',
        password: 'password123'
      };
      expect(Value.Check(LoginSchema.body, data)).toBe(false);
    });

    it('should fail on empty password', () => {
      const data = {
        email: 'test@example.com',
        password: ''
      };
      expect(Value.Check(LoginSchema.body, data)).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const data = {
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        username: 'testuser'
      };
      const errors = [...Value.Errors(registerSchema.body, data)];
      if (errors.length > 0) {
        console.log('registerSchema errors:', JSON.stringify(errors, null, 2));
      }
      expect(Value.Check(registerSchema.body, data)).toBe(true);
    });

    it('should fail if password does not meet requirements', () => {
      const data = {
        email: 'test@example.com',
        password: 'simple',
        confirmPassword: 'simple',
        username: 'testuser'
      };
      expect(Value.Check(registerSchema.body, data)).toBe(false);
    });

    it('should fail if username is too short', () => {
      const data = {
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        username: 'te'
      };
      expect(Value.Check(registerSchema.body, data)).toBe(false);
    });
  });
});
