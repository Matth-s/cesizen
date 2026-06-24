import { test, expect } from '@playwright/test';

test('Connexion', async ({ page }) => {
  page.on('requestfailed', (request) => {
    console.log(
      'FAILED',
      request.url(),
      request.failure()?.errorText,
    );
  });
  await page.goto('/authentification/connexion');

  await page.getByLabel('email').fill('admin-endtoend@mail.com');
  await page.getByLabel('password').fill('password');

  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL('/');
});
