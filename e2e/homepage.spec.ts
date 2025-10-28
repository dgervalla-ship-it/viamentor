import { test, expect } from '@playwright/test';

test.describe('Page d\'accueil', () => {
  test('devrait charger la page sans erreur', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que la page charge
    await expect(page).toHaveTitle(/Viamentor/i);
  });

  test('devrait afficher le logo ou titre Viamentor', async ({ page }) => {
    await page.goto('/');
    
    // Chercher "Viamentor" dans la page
    const content = await page.textContent('body');
    expect(content).toContain('Viamentor');
  });

  test('ne devrait pas avoir d\'erreurs console critiques', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filtrer les erreurs connues (non-critiques)
    const criticalErrors = errors.filter(
      (err) => !err.includes('DevTools') && !err.includes('Extension')
    );

    expect(criticalErrors.length).toBe(0);
  });
});

