import { describe, it, expect } from 'vitest';
import { loginSchema } from '../login-schema';
import { registerSchema } from '../register-schema';
import { userSchema } from '../current-user-schema';

describe('AuthSchemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const data = { email: 'test@example.com', password: 'password123' };
      expect(loginSchema.safeParse(data).success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const data = { email: 'invalid', password: 'password123' };
      expect(loginSchema.safeParse(data).success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('should validate correct register data', () => {
      const data = {
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        username: 'testuser',
      };
      expect(registerSchema.safeParse(data).success).toBe(true);
    });

    it('should fail if passwords do not match', () => {
      const data = {
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Different123!',
        username: 'testuser',
      };
      expect(registerSchema.safeParse(data).success).toBe(false);
    });
  });

  describe('userSchema', () => {
    it('should validate correct user data', () => {
      const data = {
        username: 'testuser',
        role: 'USER',
        csrfToken: 'token',
      };
      expect(userSchema.safeParse(data).success).toBe(true);
    });
  });
});
