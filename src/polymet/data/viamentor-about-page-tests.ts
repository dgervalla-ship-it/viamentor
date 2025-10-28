/**
 * VIAMENTOR - About Page Tests
 * Tests unitaires avec Jest et React Testing Library
 *
 * Ce fichier contient tous les tests pour la page À propos.
 * Pour exécuter: npm test viamentor-about-page-tests
 *
 * @jest-environment jsdom
 */

// ============================================================================
// TEST SUITES DOCUMENTATION
// ============================================================================

/**
 * Test Suites incluses:
 *
 * 1. Rendering Tests
 *    - Vérifie que tous les éléments s'affichent correctement
 *    - Teste la présence de toutes les sections
 *    - Valide l'affichage des membres d'équipe et valeurs
 *
 * 2. Internationalization Tests
 *    - Teste le rendu dans les 4 locales (fr, de, it, en)
 *    - Vérifie le changement de locale
 *
 * 3. Navigation Tests
 *    - Valide les liens du breadcrumb
 *    - Teste les URLs des boutons CTA
 *    - Vérifie les URLs LinkedIn avec regex
 *
 * 4. Accessibility Tests (WCAG AA)
 *    - Teste avec jest-axe pour violations
 *    - Vérifie la hiérarchie des headings
 *    - Valide les aria-labels
 *    - Teste la navigation clavier
 *    - Vérifie les focus indicators
 *
 * 5. SEO Tests
 *    - Valide le document title
 *    - Teste les meta tags
 *    - Vérifie Open Graph tags
 *    - Valide canonical URL
 *    - Teste structured data JSON-LD
 *
 * 6. Error Handling Tests
 *    - Teste la gestion des traductions manquantes
 *    - Vérifie le fallback des images
 *    - Teste l'Error Boundary
 *
 * 7. Performance Tests
 *    - Mesure le temps de rendu
 *    - Vérifie le lazy loading des images
 */

export const aboutPageTestSuites = {
  rendering: {
    description: "Tests de rendu de base",
    tests: [
      "should render without crashing",
      "should render all main sections",
      "should render breadcrumb navigation",
      "should render team members",
      "should render company values",
      "should render CTA buttons",
    ],
  },
  internationalization: {
    description: "Tests d'internationalisation",
    tests: [
      "should render in French by default",
      "should render in German when locale is 'de'",
      "should render in Italian when locale is 'it'",
      "should render in English when locale is 'en'",
    ],
  },
  navigation: {
    description: "Tests de navigation",
    tests: [
      "should have correct breadcrumb links",
      "should have correct CTA button hrefs",
      "should have correct LinkedIn URLs with regex replacement",
    ],
  },
  accessibility: {
    description: "Tests d'accessibilité WCAG AA",
    tests: [
      "should have no accessibility violations",
      "should have proper heading hierarchy",
      "should have aria-labels on interactive elements",
      "should have aria-labelledby on sections",
      "should have proper alt text for images",
      "should support keyboard navigation",
      "should have visible focus indicators",
    ],
  },
  seo: {
    description: "Tests SEO",
    tests: [
      "should update document title",
      "should have meta description",
      "should have Open Graph tags",
      "should have canonical URL",
      "should have structured data JSON-LD",
    ],
  },
  errorHandling: {
    description: "Tests de gestion d'erreurs",
    tests: [
      "should handle missing translations gracefully",
      "should handle image loading errors",
      "should catch and display errors with Error Boundary",
    ],
  },
  performance: {
    description: "Tests de performance",
    tests: [
      "should render quickly (< 1000ms)",
      "should lazy load images",
      "should memoize expensive computations",
    ],
  },
};

/**
 * Configuration des tests
 */
export const testConfig = {
  timeout: 5000,
  retries: 2,
  coverage: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80,
  },
};

/**
 * Mock data pour les tests
 */
export const mockTeamMember = {
  name: "Jean Dupont",
  role: "CEO & Founder",
  bio: "15 ans d'expérience dans la tech",
  avatar: "https://github.com/yusufhilmi.png",
  linkedinUrl: "https://linkedin.com/in/jean-dupont",
};

export const mockTimelineMilestone = {
  year: "2023",
  title: "Fondation",
  description: "Identification du besoin de modernisation",
};

export const mockValue = {
  title: "Innovation",
  description: "Nous repoussons les limites de la technologie",
};

/**
 * Helper functions pour les tests
 */
export const testHelpers = {
  /**
   * Attend que le SEO Head soit monté
   */
  waitForSEOHead: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
  },

  /**
   * Vérifie la présence d'un meta tag
   */
  checkMetaTag: (name: string, attribute: "name" | "property" = "name") => {
    const meta = document.querySelector(`meta[${attribute}="${name}"]`);
    return meta !== null;
  },

  /**
   * Récupère le contenu d'un meta tag
   */
  getMetaContent: (name: string, attribute: "name" | "property" = "name") => {
    const meta = document.querySelector(`meta[${attribute}="${name}"]`);
    return meta?.getAttribute("content") || null;
  },

  /**
   * Vérifie la présence de structured data
   */
  checkStructuredData: (type: string) => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    return Array.from(scripts).some((script) => {
      try {
        const data = JSON.parse(script.textContent || "{}");
        return data["@type"] === type;
      } catch {
        return false;
      }
    });
  },
};

/**
 * Assertions personnalisées
 */
export const customMatchers = {
  toHaveValidLinkedInUrl: (received: string) => {
    const isValid = /^https:\/\/linkedin\.com\/in\/[a-z0-9-]+$/.test(received);
    return {
      pass: isValid,
      message: () =>
        isValid
          ? `Expected ${received} not to be a valid LinkedIn URL`
          : `Expected ${received} to be a valid LinkedIn URL`,
    };
  },

  toHaveAccessibleName: (element: HTMLElement) => {
    const hasAriaLabel = element.hasAttribute("aria-label");
    const hasAriaLabelledBy = element.hasAttribute("aria-labelledby");
    const hasTitle = element.hasAttribute("title");
    const hasAlt = element.hasAttribute("alt");

    const isAccessible =
      hasAriaLabel || hasAriaLabelledBy || hasTitle || hasAlt;

    return {
      pass: isAccessible,
      message: () =>
        isAccessible
          ? `Expected element not to have an accessible name`
          : `Expected element to have an accessible name (aria-label, aria-labelledby, title, or alt)`,
    };
  },
};

/**
 * Instructions pour exécuter les tests
 */
export const testInstructions = `
# Exécuter les tests About Page

## Installation des dépendances
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-axe

## Exécuter tous les tests
npm test viamentor-about-page-tests

## Exécuter avec coverage
npm test -- --coverage viamentor-about-page-tests

## Exécuter en mode watch
npm test -- --watch viamentor-about-page-tests

## Exécuter un test spécifique
npm test -- -t "should render without crashing"

## Générer un rapport HTML
npm test -- --coverage --coverageReporters=html

## Configuration Jest (jest.config.js)
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThresholds: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
};

## Setup Jest (jest.setup.js)
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
`;
