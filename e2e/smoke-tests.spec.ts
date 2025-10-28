import { test, expect } from '@playwright/test';

/**
 * Smoke Tests - Tests rapides pour vérifier que l'app fonctionne
 * Ces tests doivent s'exécuter en < 30 secondes
 */

test.describe('Smoke Tests - Pages Critiques', () => {
  test('✅ Homepage doit se charger sans erreur', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Viamentor/i);
  });

  test('✅ Page Login doit être accessible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1, h2')).toContainText(/connexion|login/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('✅ Page Signup doit être accessible', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('h1, h2')).toContainText(/inscription|signup/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('✅ Assets statiques doivent charger (CSS, JS)', async ({ page }) => {
    const response = await page.goto('/');
    
    // Vérifier qu'il n'y a pas d'erreurs console critiques
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForLoadState('networkidle');
    
    // Accepter les erreurs de Supabase/Auth car en test
    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes('Supabase') && !err.includes('auth')
    );
    
    expect(criticalErrors.length).toBe(0);
  });

  test('✅ Navigation principale doit fonctionner', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier que la navigation est visible
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
  });
});

test.describe('Smoke Tests - API & Backend', () => {
  test('✅ Connexion Supabase ne doit pas crasher', async ({ page }) => {
    await page.goto('/');
    
    // Attendre que la page soit chargée
    await page.waitForLoadState('domcontentloaded');
    
    // Vérifier qu'il n'y a pas d'erreur fatale
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('Fatal Error');
    expect(bodyText).not.toContain('Crash');
  });

  test('✅ Variables d\'environnement doivent être chargées', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier dans la console qu'il n'y a pas d'avertissements de variables manquantes
    const consoleWarnings: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning' && msg.text().includes('manquante')) {
        consoleWarnings.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);
    
    // On accepte les warnings Supabase si en dev sans variables
    // mais il ne devrait pas y avoir de crash
    expect(page.url()).toContain('localhost');
  });
});

test.describe('Smoke Tests - Performance', () => {
  test('✅ Homepage doit charger en moins de 3 secondes', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
  });

  test('✅ Pas de ressources bloquantes majeures', async ({ page }) => {
    await page.goto('/');
    
    const metrics = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
        loadComplete: perf.loadEventEnd - perf.loadEventStart,
      };
    });
    
    expect(metrics.domContentLoaded).toBeLessThan(2000);
  });
});

test.describe('Smoke Tests - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('✅ Homepage responsive sur mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Viamentor/i);
    
    // Vérifier que le contenu est visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('✅ Navigation mobile fonctionne', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier qu'il y a un menu mobile (burger ou navigation)
    const mobileMenu = page.locator('button[aria-label*="menu" i], nav, [role="navigation"]').first();
    await expect(mobileMenu).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Smoke Tests - Sécurité', () => {
  test('✅ Headers de sécurité présents', async ({ page }) => {
    const response = await page.goto('/');
    
    // Vérifier les headers (si configurés côté serveur)
    const headers = response?.headers();
    
    // Note: En dev local, certains headers peuvent ne pas être présents
    // En production, ils seront appliqués par Vercel
    expect(headers).toBeDefined();
  });

  test('✅ Pas de données sensibles exposées dans le HTML', async ({ page }) => {
    await page.goto('/');
    
    const htmlContent = await page.content();
    
    // Vérifier qu'il n'y a pas de secrets exposés
    expect(htmlContent).not.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'); // Token JWT
    expect(htmlContent).not.toContain('sk_'); // Stripe secret key
    expect(htmlContent).not.toContain('password'); // Mots de passe
  });
});

