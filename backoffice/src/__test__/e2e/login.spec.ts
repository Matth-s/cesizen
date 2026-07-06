import { test, expect } from '@playwright/test';

test('Connexion', async ({ page }) => {
  page.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      console.log(
        `📡 Requête API : ${response.url()} -> Statut : ${response.status()}`,
      );
      if (response.status() >= 400) {
        console.log(`❌ Erreur API Détails :`, await response.text());
      }
    }
  });

  await page.goto('/authentification/connexion');

  await page.getByLabel('email').fill('admin-endtoend@mail.com');
  await page.getByLabel('password').fill('password');

  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL('/');
});
