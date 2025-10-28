/**
 * VIAMENTOR - TESTING STRATEGY
 * Stratégie complète de testing avec exemples concrets
 */

// ============================================================================
// 5. TESTING & QUALITÉ
// ============================================================================

export const TESTING_STRATEGY = {
  score: "6/10",
  lastUpdate: "2025-01-18",
  category: "Quality Assurance",
  coverage: {
    unit: "0%",
    integration: "0%",
    e2e: "0%",
    target: "80%",
  },

  currentState: {
    implemented: [
      "✅ TypeScript (type safety)",
      "✅ ESLint (code quality)",
      "✅ Prettier (formatting)",
    ],

    missing: [
      "❌ Unit tests",
      "❌ Integration tests",
      "❌ E2E tests",
      "❌ Visual regression tests",
      "❌ Performance tests",
      "❌ Accessibility tests",
      "❌ CI/CD pipeline",
    ],
  },

  testingPyramid: {
    description: "Stratégie de testing équilibrée",
    layers: {
      unit: {
        percentage: "70%",
        count: "~500 tests",
        duration: "< 5 minutes",
        scope: "Fonctions, hooks, utils",
        tools: ["Vitest", "React Testing Library"],
      },
      integration: {
        percentage: "20%",
        count: "~150 tests",
        duration: "< 10 minutes",
        scope: "Composants + API, flows multi-composants",
        tools: ["Vitest", "MSW (Mock Service Worker)"],
      },
      e2e: {
        percentage: "10%",
        count: "~50 tests",
        duration: "< 30 minutes",
        scope: "User flows critiques",
        tools: ["Playwright"],
      },
    },
  },

  recommendations: [
    {
      priority: "CRITICAL",
      title: "Implémenter tests unitaires",
      description: "Tester fonctions, hooks, utils isolément",
      effort: "2 semaines",
      impact: "Détection bugs précoce, refactoring sécurisé",
      setup: {
        installation: `# Installation Vitest + React Testing Library
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D happy-dom`,
        config: `// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`,
        setupFile: `// tests/setup.ts
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})`,
      },

      examples: [
        {
          name: "Test fonction utilitaire",
          file: "lib/utils.test.ts",
          code: `import { describe, it, expect } from 'vitest'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

describe('cn (className merge)', () => {
  it('should merge class names', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
  })
  
  it('should handle conditional classes', () => {
    expect(cn('base', true && 'active', false && 'disabled')).toBe('base active')
  })
  
  it('should override conflicting classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})

describe('formatCurrency', () => {
  it('should format CHF currency', () => {
    expect(formatCurrency(1234.56, 'fr')).toBe('CHF 1'234.56')
  })
  
  it('should handle zero', () => {
    expect(formatCurrency(0, 'fr')).toBe('CHF 0.00')
  })
  
  it('should handle negative', () => {
    expect(formatCurrency(-100, 'fr')).toBe('-CHF 100.00')
  })
})

describe('formatDate', () => {
  it('should format date in French', () => {
    const date = new Date('2025-01-18')
    expect(formatDate(date, 'fr')).toBe('18 janvier 2025')
  })
  
  it('should format date in German', () => {
    const date = new Date('2025-01-18')
    expect(formatDate(date, 'de')).toBe('18. Januar 2025')
  })
})`,
        },
        {
          name: "Test hook custom",
          file: "hooks/use-students-query.test.ts",
          code: `import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useStudentsQuery } from '@/hooks/use-students-query'

// Mock API
vi.mock('@/lib/api', () => ({
  getStudents: vi.fn(() => Promise.resolve([
    { id: '1', name: 'Jean Dupont', email: 'jean@example.com' },
    { id: '2', name: 'Marie Martin', email: 'marie@example.com' },
  ])),
}))

describe('useStudentsQuery', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
  
  it('should fetch students', async () => {
    const { result } = renderHook(() => useStudentsQuery(), { wrapper })
    
    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    
    expect(result.current.data).toHaveLength(2)
    expect(result.current.data[0].name).toBe('Jean Dupont')
  })
  
  it('should handle filters', async () => {
    const { result } = renderHook(
      () => useStudentsQuery({ status: 'active' }),
      { wrapper }
    )
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    
    // Verify API was called with filters
    expect(getStudents).toHaveBeenCalledWith({ status: 'active' })
  })
})`,
        },
        {
          name: "Test composant",
          file: "components/student-card.test.tsx",
          code: `import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StudentCard } from '@/components/student-card'

describe('StudentCard', () => {
  const mockStudent = {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    status: 'active',
    avatar: 'https://github.com/yusufhilmi.png',
  }
  
  it('should render student info', () => {
    render(<StudentCard student={mockStudent} />)
    
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('jean@example.com')).toBeInTheDocument()
  })
  
  it('should show active badge', () => {
    render(<StudentCard student={mockStudent} />)
    
    const badge = screen.getByText('Actif')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-success')
  })
  
  it('should call onView when clicked', async () => {
    const onView = vi.fn()
    const user = userEvent.setup()
    
    render(<StudentCard student={mockStudent} onView={onView} />)
    
    await user.click(screen.getByRole('button', { name: /voir/i }))
    
    expect(onView).toHaveBeenCalledWith(mockStudent)
  })
  
  it('should render avatar', () => {
    render(<StudentCard student={mockStudent} />)
    
    const avatar = screen.getByRole('img', { name: /jean dupont/i })
    expect(avatar).toHaveAttribute('src', mockStudent.avatar)
  })
})`,
        },
        {
          name: "Test form validation",
          file: "components/student-form.test.tsx",
          code: `import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StudentForm } from '@/components/student-form'

describe('StudentForm', () => {
  it('should show validation errors', async () => {
    const user = userEvent.setup()
    render(<StudentForm onSubmit={vi.fn()} />)
    
    // Submit empty form
    await user.click(screen.getByRole('button', { name: /créer/i }))
    
    // Check validation errors
    expect(await screen.findByText(/prénom requis/i)).toBeInTheDocument()
    expect(await screen.findByText(/nom requis/i)).toBeInTheDocument()
    expect(await screen.findByText(/email requis/i)).toBeInTheDocument()
  })
  
  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(<StudentForm onSubmit={vi.fn()} />)
    
    // Enter invalid email
    await user.type(screen.getByLabelText(/email/i), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /créer/i }))
    
    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument()
  })
  
  it('should submit valid form', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<StudentForm onSubmit={onSubmit} />)
    
    // Fill form
    await user.type(screen.getByLabelText(/prénom/i), 'Jean')
    await user.type(screen.getByLabelText(/nom/i), 'Dupont')
    await user.type(screen.getByLabelText(/email/i), 'jean@example.com')
    
    // Submit
    await user.click(screen.getByRole('button', { name: /créer/i }))
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@example.com',
      })
    })
  })
})`,
        },
      ],

      packageJson: `{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}`,
    },
    {
      priority: "CRITICAL",
      title: "Implémenter tests E2E",
      description: "Tester user flows critiques end-to-end",
      effort: "1 semaine",
      impact: "Détection bugs avant production",
      setup: {
        installation: `# Installation Playwright
npm install -D @playwright/test
npx playwright install`,
        config: `// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})`,
      },

      criticalFlows: [
        {
          name: "Authentification",
          file: "tests/e2e/auth.spec.ts",
          code: `import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login')
    
    // Fill form
    await page.fill('input[name="email"]', 'admin@viamentor.ch')
    await page.fill('input[name="password"]', 'password123')
    
    // Submit
    await page.click('button[type="submit"]')
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })
  
  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('input[name="email"]', 'wrong@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    // Verify error message
    await expect(page.locator('[role="alert"]')).toContainText('Email ou mot de passe incorrect')
  })
  
  test('should logout', async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.fill('input[name="email"]', 'admin@viamentor.ch')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    // Logout
    await page.click('[aria-label="User menu"]')
    await page.click('text=Déconnexion')
    
    // Verify redirect to login
    await expect(page).toHaveURL('/login')
  })
})`,
        },
        {
          name: "Création élève",
          file: "tests/e2e/students.spec.ts",
          code: `import { test, expect } from '@playwright/test'

test.describe('Student Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as school admin
    await page.goto('/login')
    await page.fill('input[name="email"]', 'admin@viamentor.ch')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
  })
  
  test('should create new student', async ({ page }) => {
    await page.goto('/students')
    
    // Open wizard
    await page.click('text=Nouvel élève')
    
    // Step 1: Identity
    await page.fill('input[name="firstName"]', 'Jean')
    await page.fill('input[name="lastName"]', 'Dupont')
    await page.fill('input[name="email"]', 'jean.dupont@example.com')
    await page.fill('input[name="phone"]', '+41 79 123 45 67')
    await page.click('text=Suivant')
    
    // Step 2: Training
    await page.selectOption('select[name="category"]', 'B')
    await page.click('text=Suivant')
    
    // Step 3: Legal
    await page.check('input[name="gdprConsent"]')
    await page.click('text=Suivant')
    
    // Step 4: Summary
    await page.click('text=Créer')
    
    // Verify success
    await expect(page.locator('[role="alert"]')).toContainText('Élève créé avec succès')
    
    // Verify student appears in list
    await expect(page.locator('text=Jean Dupont')).toBeVisible()
  })
  
  test('should search students', async ({ page }) => {
    await page.goto('/students')
    
    // Search
    await page.fill('input[placeholder*="Rechercher"]', 'Jean')
    
    // Verify filtered results
    await expect(page.locator('tbody tr')).toHaveCount(1)
    await expect(page.locator('text=Jean Dupont')).toBeVisible()
  })
  
  test('should filter by status', async ({ page }) => {
    await page.goto('/students')
    
    // Open filters
    await page.click('text=Filtres')
    
    // Select status
    await page.click('text=Actif')
    
    // Verify filtered results
    const rows = page.locator('tbody tr')
    await expect(rows).toHaveCount(await rows.count())
    
    // All should have "Actif" badge
    for (let i = 0; i < await rows.count(); i++) {
      await expect(rows.nth(i).locator('text=Actif')).toBeVisible()
    }
  })
})`,
        },
        {
          name: "Réservation leçon",
          file: "tests/e2e/booking.spec.ts",
          code: `import { test, expect } from '@playwright/test'

test.describe('Lesson Booking', () => {
  test.beforeEach(async ({ page }) => {
    // Login as student
    await page.goto('/login')
    await page.fill('input[name="email"]', 'student@viamentor.ch')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
  })
  
  test('should book a lesson', async ({ page }) => {
    await page.goto('/student/lessons/book')
    
    // Step 1: Select instructor
    await page.click('text=Marc Dubois')
    await page.click('text=Suivant')
    
    // Step 2: Select date & time
    await page.click('[data-date="2025-01-20"]')
    await page.click('text=10:00')
    await page.click('text=Suivant')
    
    // Step 3: Confirm
    await page.click('text=Confirmer')
    
    // Verify success
    await expect(page.locator('[role="alert"]')).toContainText('Leçon réservée')
    
    // Verify lesson appears in list
    await page.goto('/student/lessons')
    await expect(page.locator('text=20 janvier 2025')).toBeVisible()
    await expect(page.locator('text=10:00')).toBeVisible()
  })
  
  test('should show conflict if slot taken', async ({ page }) => {
    await page.goto('/student/lessons/book')
    
    // Try to book already taken slot
    await page.click('text=Marc Dubois')
    await page.click('text=Suivant')
    await page.click('[data-date="2025-01-20"]')
    await page.click('text=14:00') // Already booked
    
    // Verify conflict message
    await expect(page.locator('[role="alert"]')).toContainText('Créneau déjà réservé')
  })
})`,
        },
      ],

      packageJson: `{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug"
  }
}`,
    },
    {
      priority: "HIGH",
      title: "Implémenter tests accessibilité",
      description: "Vérifier conformité WCAG automatiquement",
      effort: "2 jours",
      impact: "Détection problèmes a11y avant production",
      code: `// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('Dashboard should not have accessibility violations', async ({ page }) => {
    await page.goto('/dashboard')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })
  
  test('Forms should be keyboard accessible', async ({ page }) => {
    await page.goto('/students/new')
    
    // Tab through form
    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="firstName"]')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.locator('input[name="lastName"]')).toBeFocused()
    
    // Submit with Enter
    await page.keyboard.press('Enter')
  })
  
  test('All images should have alt text', async ({ page }) => {
    await page.goto('/students')
    
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })
})`,
    },
    {
      priority: "MEDIUM",
      title: "Implémenter visual regression tests",
      description: "Détecter changements visuels non intentionnels",
      effort: "3 jours",
      impact: "Prévention bugs visuels",
      tools: ["Percy", "Chromatic", "Playwright screenshots"],
      code: `// tests/e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('Dashboard should match snapshot', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveScreenshot('dashboard.png')
  })
  
  test('Student card should match snapshot', async ({ page }) => {
    await page.goto('/students')
    const card = page.locator('[data-testid="student-card"]').first()
    await expect(card).toHaveScreenshot('student-card.png')
  })
  
  test('Modal should match snapshot', async ({ page }) => {
    await page.goto('/students')
    await page.click('text=Nouvel élève')
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toHaveScreenshot('create-student-modal.png')
  })
})`,
    },
    {
      priority: "MEDIUM",
      title: "Setup CI/CD pipeline",
      description: "Automatiser tests sur chaque commit",
      effort: "2 jours",
      impact: "Détection bugs automatique, déploiement sécurisé",
      githubActions: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`,
    },
  ],

  bestPractices: [
    "✅ Test behavior, not implementation",
    "✅ Write tests before fixing bugs (TDD)",
    "✅ Keep tests simple and readable",
    "✅ Use descriptive test names",
    "✅ Arrange-Act-Assert pattern",
    "✅ Mock external dependencies",
    "✅ Test edge cases",
    "✅ Test error states",
    "✅ Test loading states",
    "✅ Test accessibility",
    "✅ Run tests in CI/CD",
    "✅ Maintain high coverage (>80%)",
    "✅ Fast tests (<10s for unit)",
    "✅ Isolated tests (no dependencies)",
  ],

  tools: {
    unit: ["Vitest", "React Testing Library", "MSW"],
    integration: ["Vitest", "MSW", "Testing Library"],
    e2e: ["Playwright", "Cypress"],
    visual: ["Percy", "Chromatic", "Playwright"],
    accessibility: ["axe-core", "jest-axe", "@axe-core/playwright"],
    performance: ["Lighthouse CI", "WebPageTest"],
    coverage: ["Vitest Coverage", "Codecov"],
    ci: ["GitHub Actions", "GitLab CI", "CircleCI"],
  },

  metrics: {
    current: {
      coverage: "0%",
      tests: "0",
      ci: "No",
    },
    target: {
      coverage: "80%",
      tests: "700+",
      ci: "Yes",
      duration: "< 15 minutes",
    },
  },
};

export default TESTING_STRATEGY;
