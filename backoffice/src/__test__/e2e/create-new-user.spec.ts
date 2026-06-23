import { test, expect } from '@playwright/test';

test('Creation nouvel utilisateur', async ({ page }) => {
  await page.goto('/authentification/connexion');

  await page.getByLabel('email').fill('admin-endtoend@mail.com');
  await page.getByLabel('password').fill('password');

  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL('/');

  await page.getByLabel('/utilisateurs').click();

  await page.getByLabel('add-user').click();

  await page
    .getByLabel('username', { exact: true })
    .fill('nouvel utilisateur');
  await page
    .getByLabel('email', { exact: true })
    .fill('Test-e2e@mail.com');
  await page
    .getByLabel('password', { exact: true })
    .fill('Password1234!');
  await page
    .getByLabel('confirmPassword', { exact: true })
    .fill('Password1234!');
  await page
    .getByRole('button', { name: "Créer l'utilisateur" })
    .click();

  await page.getByLabel('Test-e2e@mail.com').isVisible();
});
