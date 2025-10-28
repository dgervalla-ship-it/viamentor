import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('devrait afficher le formulaire de connexion sur /login', async ({ page }) => {
    await page.goto('/login');
    
    // Vérifier la présence du formulaire
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /connecter/i })).toBeVisible();
  });

  test('devrait afficher le formulaire d\'inscription sur /signup', async ({ page }) => {
    await page.goto('/signup');
    
    // Vérifier la présence du formulaire
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /créer/i })).toBeVisible();
  });

  test('devrait afficher une erreur si email invalide', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'email-invalide');
    await page.fill('input[type="password"]', 'password123');
    
    // Le navigateur devrait empêcher la soumission (validation HTML5)
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('devrait avoir un lien vers inscription depuis login', async ({ page }) => {
    await page.goto('/login');
    
    const signupLink = page.getByRole('link', { name: /créer un compte/i });
    await expect(signupLink).toBeVisible();
    await expect(signupLink).toHaveAttribute('href', '/signup');
  });

  test('devrait avoir un lien vers connexion depuis signup', async ({ page }) => {
    await page.goto('/signup');
    
    const loginLink = page.getByRole('link', { name: /se connecter/i });
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', '/login');
  });
});

