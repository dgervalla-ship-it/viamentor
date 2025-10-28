import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright pour tests E2E Viamentor
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  
  // Timeout par test
  timeout: 30 * 1000,
  
  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Fail fast : arrêter après 5 échecs
  maxFailures: 5,

  // Workers en parallèle
  workers: process.env.CI ? 2 : 4,

  // Reporter
  reporter: [
    ['html'],
    ['list'],
    process.env.CI ? ['github'] : ['list'],
  ],

  use: {
    // Base URL de l'application
    baseURL: 'http://localhost:5174',

    // Screenshot en cas d'échec
    screenshot: 'only-on-failure',

    // Video en cas d'échec
    video: 'retain-on-failure',

    // Trace en cas d'échec
    trace: 'retain-on-failure',
  },

  // Projets (navigateurs)
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
    // Mobile
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  // Serveur de dev local
  webServer: {
    command: 'npm run dev',
    port: 5174,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});

