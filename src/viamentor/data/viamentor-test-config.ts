/**
 * VIAMENTOR Test Configuration
 *
 * Configuration et exemples de tests
 * - Vitest pour tests unitaires
 * - Playwright pour tests E2E
 * - Testing Library pour tests composants React
 */

/**
 * ============================================
 * VITEST CONFIGURATION
 * ============================================
 *
 * Fichier : vitest.config.ts
 *
 * ```typescript
 * import { defineConfig } from 'vitest/config'
 * import react from '@vitejs/plugin-react'
 * import path from 'path'
 *
 * export default defineConfig({
 *   plugins: [react()],
 *   test: {
 *     globals: true,
 *     environment: 'jsdom',
 *     setupFiles: ['./src/test/setup.ts'],
 *     coverage: {
 *       provider: 'v8',
 *       reporter: ['text', 'json', 'html'],
 *       exclude: [
 *         'node_modules/',
 *         'src/test/',
 *       ],
 *     },
 *   },
 *   resolve: {
 *     alias: {
 *       '@': path.resolve(__dirname, './src'),
 *     },
 *   },
 * })
 * ```
 */

/**
 * ============================================
 * VITEST SETUP
 * ============================================
 *
 * Fichier : src/test/setup.ts
 *
 * ```typescript
 * import '@testing-library/jest-dom'
 * import { cleanup } from '@testing-library/react'
 * import { afterEach } from 'vitest'
 *
 * // Cleanup après chaque test
 * afterEach(() => {
 *   cleanup()
 * })
 * ```
 */

/**
 * ============================================
 * EXEMPLE TEST UNITAIRE - VALIDATION
 * ============================================
 *
 * Fichier : src/viamentor/data/__tests__/viamentor-validation-schemas.test.ts
 */
export const validationSchemaTests = `
import { describe, it, expect } from 'vitest'
import { loginSchema, userSchema, ValidationHelpers } from '../viamentor-validation-schemas'

describe('loginSchema', () => {
  it('devrait valider un login correct', () => {
    const validData = {
      email: 'admin@viamentor.ch',
      password: 'Password123!',
      rememberMe: true,
    }
    
    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('devrait rejeter un email non suisse', () => {
    const invalidData = {
      email: 'admin@gmail.com',
      password: 'Password123!',
    }
    
    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('.ch')
    }
  })

  it('devrait rejeter un mot de passe faible', () => {
    const invalidData = {
      email: 'admin@viamentor.ch',
      password: '123',
    }
    
    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('userSchema', () => {
  it('devrait valider un utilisateur complet', () => {
    const validData = {
      email: 'user@viamentor.ch',
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'SCHOOL_ADMIN',
      phone: '+41791234567',
      tenantId: 'tenant-123',
    }
    
    const result = userSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('devrait rejeter un téléphone invalide', () => {
    const invalidData = {
      email: 'user@viamentor.ch',
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'STUDENT',
      phone: '0791234567', // Format incorrect
    }
    
    const result = userSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})

describe('ValidationHelpers', () => {
  it('isSwissEmail devrait valider les emails .ch', () => {
    expect(ValidationHelpers.isSwissEmail('test@viamentor.ch')).toBe(true)
    expect(ValidationHelpers.isSwissEmail('test@gmail.com')).toBe(false)
  })

  it('isSwissPhone devrait valider les numéros suisses', () => {
    expect(ValidationHelpers.isSwissPhone('+41791234567')).toBe(true)
    expect(ValidationHelpers.isSwissPhone('0791234567')).toBe(false)
    expect(ValidationHelpers.isSwissPhone('+33612345678')).toBe(false)
  })

  it('isMinimumAge devrait vérifier l\\'âge minimum', () => {
    const date18YearsAgo = new Date()
    date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18)
    
    const date17YearsAgo = new Date()
    date17YearsAgo.setFullYear(date17YearsAgo.getFullYear() - 17)
    
    expect(ValidationHelpers.isMinimumAge(date18YearsAgo, 18)).toBe(true)
    expect(ValidationHelpers.isMinimumAge(date17YearsAgo, 18)).toBe(false)
  })
})
`;

/**
 * ============================================
 * EXEMPLE TEST COMPOSANT - REACT TESTING LIBRARY
 * ============================================
 *
 * Fichier : src/viamentor/components/__tests__/viamentor-login-form.test.tsx
 */
export const componentTests = `
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../viamentor-login-form'

describe('LoginForm', () => {
  it('devrait afficher le formulaire', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument()
  })

  it('devrait afficher les erreurs de validation', async () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    
    const submitButton = screen.getByRole('button', { name: /connexion/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email requis/i)).toBeInTheDocument()
    })
  })

  it('devrait soumettre le formulaire avec des données valides', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    
    render(<LoginForm onSubmit={onSubmit} />)
    
    await user.type(screen.getByLabelText(/email/i), 'admin@viamentor.ch')
    await user.type(screen.getByLabelText(/mot de passe/i), 'Password123!')
    await user.click(screen.getByRole('button', { name: /connexion/i }))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'admin@viamentor.ch',
        password: 'Password123!',
        rememberMe: false,
      })
    })
  })

  it('devrait appeler onError en cas d\\'échec', async () => {
    const onError = vi.fn()
    const onSubmit = vi.fn().mockRejectedValue(new Error('Login failed'))
    
    render(<LoginForm onSubmit={onSubmit} onError={onError} />)
    
    // Remplir et soumettre le formulaire
    // ...
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalled()
    })
  })
})
`;

/**
 * ============================================
 * PLAYWRIGHT CONFIGURATION
 * ============================================
 *
 * Fichier : playwright.config.ts
 *
 * ```typescript
 * import { defineConfig, devices } from '@playwright/test'
 *
 * export default defineConfig({
 *   testDir: './e2e',
 *   fullyParallel: true,
 *   forbidOnly: !!process.env.CI,
 *   retries: process.env.CI ? 2 : 0,
 *   workers: process.env.CI ? 1 : undefined,
 *   reporter: 'html',
 *   use: {
 *     baseURL: 'http://localhost:5173',
 *     trace: 'on-first-retry',
 *     screenshot: 'only-on-failure',
 *   },
 *   projects: [
 *     {
 *       name: 'chromium',
 *       use: { ...devices['Desktop Chrome'] },
 *     },
 *     {
 *       name: 'firefox',
 *       use: { ...devices['Desktop Firefox'] },
 *     },
 *     {
 *       name: 'webkit',
 *       use: { ...devices['Desktop Safari'] },
 *     },
 *   ],
 *   webServer: {
 *     command: 'npm run dev',
 *     url: 'http://localhost:5173',
 *     reuseExistingServer: !process.env.CI,
 *   },
 * })
 * ```
 */

/**
 * ============================================
 * EXEMPLE TEST E2E - PLAYWRIGHT
 * ============================================
 *
 * Fichier : e2e/login.spec.ts
 */
export const e2eTests = `
import { test, expect } from '@playwright/test'

test.describe('Login Flow', () => {
  test('devrait afficher la page de connexion', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/mot de passe/i)).toBeVisible()
  })

  test('devrait se connecter avec des identifiants valides', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('admin@viamentor.ch')
    await page.getByLabel(/mot de passe/i).fill('Password123!')
    await page.getByRole('button', { name: /connexion/i }).click()
    
    // Vérifier la redirection vers le dashboard
    await expect(page).toHaveURL('/system')
    await expect(page.getByText(/bienvenue/i)).toBeVisible()
  })

  test('devrait afficher une erreur avec des identifiants invalides', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('wrong@viamentor.ch')
    await page.getByLabel(/mot de passe/i).fill('wrongpassword')
    await page.getByRole('button', { name: /connexion/i }).click()
    
    await expect(page.getByText(/identifiants invalides/i)).toBeVisible()
  })

  test('devrait valider le format de l\\'email', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/mot de passe/i).fill('Password123!')
    await page.getByRole('button', { name: /connexion/i }).click()
    
    await expect(page.getByText(/email invalide/i)).toBeVisible()
  })
})

test.describe('Student Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login avant chaque test
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('admin@viamentor.ch')
    await page.getByLabel(/mot de passe/i).fill('Password123!')
    await page.getByRole('button', { name: /connexion/i }).click()
    await page.waitForURL('/system')
  })

  test('devrait afficher la liste des étudiants', async ({ page }) => {
    await page.goto('/students')
    
    await expect(page.getByRole('heading', { name: /étudiants/i })).toBeVisible()
    await expect(page.getByText(/Sophie Martin/i)).toBeVisible()
  })

  test('devrait créer un nouvel étudiant', async ({ page }) => {
    await page.goto('/students')
    
    await page.getByRole('button', { name: /créer/i }).click()
    
    await page.getByLabel(/prénom/i).fill('Emma')
    await page.getByLabel(/nom/i).fill('Rossi')
    await page.getByLabel(/email/i).fill('emma.rossi@example.ch')
    await page.getByLabel(/téléphone/i).fill('+41791112233')
    
    await page.getByRole('button', { name: /enregistrer/i }).click()
    
    await expect(page.getByText(/Emma Rossi/i)).toBeVisible()
  })

  test('devrait filtrer les étudiants par catégorie', async ({ page }) => {
    await page.goto('/students')
    
    await page.getByLabel(/catégorie/i).selectOption('B')
    
    await expect(page.getByText(/Catégorie B/i)).toBeVisible()
  })
})
`;

/**
 * ============================================
 * SCRIPTS NPM
 * ============================================
 *
 * Ajouter dans package.json :
 *
 * ```json
 * {
 *   "scripts": {
 *     "test": "vitest",
 *     "test:ui": "vitest --ui",
 *     "test:coverage": "vitest --coverage",
 *     "test:e2e": "playwright test",
 *     "test:e2e:ui": "playwright test --ui",
 *     "test:e2e:debug": "playwright test --debug"
 *   }
 * }
 * ```
 */

/**
 * ============================================
 * DÉPENDANCES À INSTALLER
 * ============================================
 *
 * ```bash
 * # Vitest + Testing Library
 * npm install -D vitest @vitest/ui @vitest/coverage-v8
 * npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
 * npm install -D jsdom
 *
 * # Playwright
 * npm install -D @playwright/test
 * npx playwright install
 * ```
 */

export const testingBestPractices = {
  unit: [
    "Tester les fonctions pures (validation, formatage)",
    "Tester les hooks personnalisés",
    "Tester les stores Zustand",
    "Viser 80%+ de couverture",
  ],

  component: [
    "Tester le rendu des composants",
    "Tester les interactions utilisateur",
    "Tester les états (loading, error, success)",
    "Tester l'accessibilité (a11y)",
  ],

  e2e: [
    "Tester les flows critiques (login, création)",
    "Tester la navigation",
    "Tester les formulaires complets",
    "Tester sur plusieurs navigateurs",
  ],

  general: [
    "Écrire des tests lisibles (AAA pattern)",
    "Utiliser des data-testid pour sélecteurs stables",
    "Mocker les API calls",
    "Tester les cas limites (edge cases)",
  ],
};
