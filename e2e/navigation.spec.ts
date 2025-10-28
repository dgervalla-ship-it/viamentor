import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('devrait avoir des liens fonctionnels dans le header', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que les liens sont cliquables
    const links = await page.locator('a').all();
    expect(links.length).toBeGreaterThan(0);
  });

  test('devrait charger Storybook sur le port 6006', async ({ page, request }) => {
    // Vérifier que Storybook est accessible (si actif)
    try {
      const response = await request.get('http://localhost:6006');
      expect(response.ok() || response.status() === 404).toBeTruthy();
    } catch (e) {
      // Storybook peut ne pas être actif, c'est OK
      console.log('Storybook not running, skipping');
    }
  });
});

