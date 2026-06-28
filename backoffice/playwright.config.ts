import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/__test__/e2e',

  timeout: 30000,

  expect: {
    timeout: 20000,
  },

  use: {
    baseURL: 'http://127.0.0.1:5173',
    headless: true,
  },
});
