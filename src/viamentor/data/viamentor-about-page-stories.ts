/**
 * VIAMENTOR - About Page Stories
 * Stories Storybook pour la page À propos
 *
 * Affiche toutes les variations de la page pour documentation et tests visuels
 */

import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { AboutPage } from "@/viamentor/pages/viamentor-about-page";
import { AboutPageSkeleton } from "@/viamentor/components/viamentor-about-page-skeleton";
import type { MarketingLocale } from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// META
// ============================================================================

const meta: Meta<typeof AboutPage> = {
  title: "Pages/Marketing/AboutPage",
  component: AboutPage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],

  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# About Page

Page À propos de Viamentor avec mission, histoire, équipe et valeurs.

## Features
- ✅ SEO complet (meta tags, Open Graph, Twitter Cards, structured data)
- ✅ Accessibilité WCAG AA (aria-labels, focus visible, navigation clavier)
- ✅ Error boundary pour gestion d'erreurs
- ✅ Loading states avec skeleton UI
- ✅ Animations subtiles avec respect prefers-reduced-motion
- ✅ Images équipe avec lazy loading et fallback
- ✅ LinkedIn URLs corrigées avec regex
- ✅ Email jobs extrait de i18n
- ✅ Performance optimisée (memoization, lazy loading)

## Usage
\`\`\`tsx
<AboutPage initialLocale="fr" />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AboutPage>;

// ============================================================================
// STORIES
// ============================================================================

/**
 * Version française par défaut
 */
export const Default: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    docs: {
      description: {
        story: "Version française de la page À propos (locale par défaut)",
      },
    },
  },
};

/**
 * Version française
 */
export const French: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    docs: {
      description: {
        story: "Page À propos en français avec toutes les sections",
      },
    },
  },
};

/**
 * Version allemande
 */
export const German: Story = {
  args: {
    initialLocale: "de",
  },
  parameters: {
    docs: {
      description: {
        story: "Page À propos en allemand (Über uns)",
      },
    },
  },
};

/**
 * Version italienne
 */
export const Italian: Story = {
  args: {
    initialLocale: "it",
  },
  parameters: {
    docs: {
      description: {
        story: "Page À propos en italien (Chi siamo)",
      },
    },
  },
};

/**
 * Version anglaise
 */
export const English: Story = {
  args: {
    initialLocale: "en",
  },
  parameters: {
    docs: {
      description: {
        story: "Page À propos en anglais (About us)",
      },
    },
  },
};

/**
 * État de chargement
 */
export const Loading: Story = {
  render: () => <AboutPageSkeleton />,

  parameters: {
    docs: {
      description: {
        story:
          "État de chargement avec skeleton UI pendant que les données se chargent",
      },
    },
  },
};

/**
 * Mode mobile
 */
export const Mobile: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Version mobile responsive de la page À propos",
      },
    },
  },
};

/**
 * Mode tablette
 */
export const Tablet: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Version tablette responsive de la page À propos",
      },
    },
  },
};

/**
 * Mode desktop
 */
export const Desktop: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Version desktop de la page À propos",
      },
    },
  },
};

/**
 * Mode sombre
 */
export const DarkMode: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
    docs: {
      description: {
        story: "Page À propos en mode sombre",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

/**
 * Mode clair
 */
export const LightMode: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    backgrounds: {
      default: "light",
    },
    docs: {
      description: {
        story: "Page À propos en mode clair",
      },
    },
  },
};

/**
 * Avec images d'équipe
 */
export const WithTeamImages: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Page avec images réelles des membres de l'équipe (si disponibles dans les données i18n)",
      },
    },
  },
};

/**
 * Sans images d'équipe (fallback initiales)
 */
export const WithoutTeamImages: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Page avec fallback sur les initiales quand les images ne sont pas disponibles",
      },
    },
  },
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

/**
 * Test de navigation
 */
export const NavigationTest: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Story pour tester la navigation (breadcrumb, liens CTA, LinkedIn)",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Tests d'interaction peuvent être ajoutés ici
    // Exemple: cliquer sur les boutons, vérifier les liens, etc.
  },
};
/**
 * Test d'accessibilité
 */ export const AccessibilityTest: Story = {
  args: {
    initialLocale: "fr",
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "heading-order",
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: "Story pour tester l'accessibilité WCAG AA avec axe-core",
      },
    },
  },
};

// ============================================================================
// DOCUMENTATION ADDITIONNELLE
// ============================================================================

/**
 * Configuration Storybook recommandée
 */
export const storybookConfig = {
  main: {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    addons: [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/addon-a11y",
      "@storybook/addon-viewport",
    ],

    framework: {
      name: "@storybook/react-vite",
      options: {},
    },
  },
  preview: {
    parameters: {
      actions: { argTypesRegex: "^on[A-Z].*" },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/,
        },
      },
      viewport: {
        viewports: {
          mobile1: {
            name: "Mobile (375px)",
            styles: { width: "375px", height: "667px" },
          },
          tablet: {
            name: "Tablet (768px)",
            styles: { width: "768px", height: "1024px" },
          },
          desktop: {
            name: "Desktop (1440px)",
            styles: { width: "1440px", height: "900px" },
          },
        },
      },
    },
  },
};

/**
 * Instructions pour utiliser Storybook
 */
export const storybookInstructions = `
# Utiliser Storybook pour About Page

## Installation
npm install --save-dev @storybook/react @storybook/addon-a11y @storybook/addon-viewport

## Démarrer Storybook
npm run storybook

## Build Storybook
npm run build-storybook

## Tester l'accessibilité
1. Ouvrir Storybook
2. Naviguer vers Pages > Marketing > AboutPage
3. Cliquer sur l'onglet "Accessibility"
4. Vérifier qu'il n'y a pas de violations

## Tester les différentes locales
1. Sélectionner une story (French, German, Italian, English)
2. Vérifier que le contenu est correctement traduit
3. Tester la navigation et les interactions

## Tester le responsive
1. Utiliser les stories Mobile, Tablet, Desktop
2. Ou utiliser le viewport selector dans la toolbar
3. Vérifier que le layout s'adapte correctement

## Tester le mode sombre
1. Sélectionner la story DarkMode
2. Vérifier le contraste des couleurs
3. Tester l'accessibilité en mode sombre

## Exporter les stories
npm run build-storybook
# Les stories sont exportées dans storybook-static/
`;
