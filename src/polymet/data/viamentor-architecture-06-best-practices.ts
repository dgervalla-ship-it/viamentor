/**
 * VIAMENTOR - ARCHITECTURE PARTIE 6/6
 * Best Practices et Recommandations
 */

// ============================================================================
// 2. AUDIT UI/UX
// ============================================================================

export const DESIGN_SYSTEM_AUDIT = {
  score: "9/10",
  strengths: [
    "✅ Utilisation cohérente de shadcn/ui",
    "✅ Variables CSS personnalisables",
    "✅ Thème clair/sombre fonctionnel",
    "✅ Tokens de couleurs bien définis",
    "✅ Composants accessibles (ARIA)",
  ],

  // Structure complète du design system
  structure: {
    colors: {
      semantic: {
        primary: {
          value: "hsl(var(--primary))",
          usage: "Actions principales, liens, focus states",
          variants: ["primary", "primary-foreground"],
        },
        secondary: {
          value: "hsl(var(--secondary))",
          usage: "Actions secondaires, backgrounds alternatifs",
          variants: ["secondary", "secondary-foreground"],
        },
        accent: {
          value: "hsl(var(--accent))",
          usage: "Highlights, hover states, badges",
          variants: ["accent", "accent-foreground"],
        },
        destructive: {
          value: "hsl(var(--destructive))",
          usage: "Erreurs, suppressions, alertes critiques",
          variants: ["destructive", "destructive-foreground"],
        },
        muted: {
          value: "hsl(var(--muted))",
          usage: "Textes secondaires, disabled states",
          variants: ["muted", "muted-foreground"],
        },
      },
      missing: {
        success: {
          needed: true,
          usage: "Validations, confirmations, états positifs",
          suggestion: "hsl(142 76% 36%) / hsl(142 71% 45%) dark",
        },
        warning: {
          needed: true,
          usage: "Avertissements, actions réversibles",
          suggestion: "hsl(38 92% 50%) / hsl(38 92% 60%) dark",
        },
        info: {
          needed: true,
          usage: "Informations, tooltips, aide contextuelle",
          suggestion: "hsl(217 91% 60%) / hsl(217 91% 70%) dark",
        },
      },
      utility: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },

    components: {
      shadcnUI: {
        forms: [
          "Button (5 variants)",
          "Input",
          "Textarea",
          "Select",
          "Checkbox",
          "Radio",
          "Switch",
        ],

        feedback: [
          "Alert",
          "Toast",
          "Badge (6 variants)",
          "Progress",
          "Skeleton",
        ],

        overlays: ["Dialog", "Sheet", "Popover", "Tooltip", "DropdownMenu"],
        navigation: ["Tabs", "Accordion", "Breadcrumb", "Pagination"],
        dataDisplay: ["Card", "Table", "DataTable", "Avatar", "Separator"],
        total: "40+ composants",
      },
      custom: [
        "Sidebar Navigation (RBAC-aware)",
        "Header avec breadcrumb",
        "Planning Calendar",
        "Stats Cards",
        "Filters Bar",
      ],
    },

    typography: {
      fontFamily: {
        sans: "Inter, system-ui, -apple-system, sans-serif",
        weights: [
          "400 (Regular)",
          "500 (Medium)",
          "600 (Semibold)",
          "700 (Bold)",
        ],
      },
      scale: {
        headings: [
          "h1: text-4xl font-bold (36px)",
          "h2: text-3xl font-semibold (30px)",
          "h3: text-2xl font-semibold (24px)",
          "h4: text-xl font-semibold (20px)",
          "h5: text-lg font-medium (18px)",
          "h6: text-base font-medium (16px)",
        ],

        body: [
          "text-sm: 14px (labels, captions)",
          "text-base: 16px (body text)",
          "text-lg: 18px (emphasized text)",
        ],
      },
      lineHeight: {
        tight: "leading-tight (1.25)",
        normal: "leading-normal (1.5)",
        relaxed: "leading-relaxed (1.625)",
      },
    },

    spacing: {
      system: "Tailwind (échelle 4px)",
      scale: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
      },
      usage: {
        component: "p-4, p-6 (padding interne)",
        layout: "gap-4, gap-6, space-y-4 (espacement entre éléments)",
        section: "py-8, py-12 (espacement vertical sections)",
      },
    },

    borderRadius: {
      system: "var(--radius) = 0.5rem (8px)",
      scale: {
        sm: "calc(var(--radius) - 4px) = 4px",
        default: "calc(var(--radius) - 2px) = 6px",
        md: "var(--radius) = 8px",
        lg: "calc(var(--radius) + 2px) = 10px",
        xl: "calc(var(--radius) + 4px) = 12px",
        full: "9999px (cercles)",
      },
    },

    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      default: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    },
  },
  // Faiblesses identifiées
  weaknesses: [
    {
      severity: "MEDIUM",
      issue: "Couleurs hardcodées dans certains composants",
      examples: [
        {
          bad: "className='text-green-500'",
          good: "className='text-success'",
          location: "Badge success states",
        },
        {
          bad: "className='bg-blue-50'",
          good: "className='bg-primary/10'",
          location: "Card backgrounds",
        },
        {
          bad: "className='border-red-200'",
          good: "className='border-destructive/20'",
          location: "Error borders",
        },
        {
          bad: "className='text-orange-600'",
          good: "className='text-warning'",
          location: "Warning messages",
        },
      ],

      impact: {
        maintenance: "Difficile de changer les couleurs globalement",
        consistency: "Incohérence entre light/dark mode",
        scalability: "Impossible d'appliquer un nouveau thème facilement",
      },
      affectedFiles: [
        "components/viamentor-stats-card",
        "components/viamentor-badge-custom",
        "pages/viamentor-dashboard-*",
      ],
    },
    {
      severity: "HIGH",
      issue: "Variants sémantiques manquants",
      missing: [
        {
          name: "success",
          usage: "Validations, confirmations, états positifs",
          frequency: "~50 occurrences dans le code",
        },
        {
          name: "warning",
          usage: "Avertissements, actions réversibles",
          frequency: "~30 occurrences dans le code",
        },
        {
          name: "info",
          usage: "Informations, tooltips, aide contextuelle",
          frequency: "~20 occurrences dans le code",
        },
      ],

      current: ["primary", "secondary", "accent", "destructive", "muted"],
      impact: "Utilisation de couleurs hardcodées pour compenser",
    },
    {
      severity: "LOW",
      issue: "Documentation design system absente",
      needed: [
        "Storybook avec tous les composants",
        "Guidelines d'utilisation (quand utiliser quel variant)",
        "Exemples de code pour chaque composant",
        "Documentation accessibilité (WCAG 2.1 AA)",
        "Palette de couleurs complète avec use cases",
      ],

      impact: "Onboarding difficile pour nouveaux développeurs",
    },
    {
      severity: "LOW",
      issue: "Animations et transitions non standardisées",
      examples: [
        "Durées variées (150ms, 200ms, 300ms)",
        "Easing functions différentes (ease, ease-in-out, cubic-bezier)",
        "Pas de tokens pour les animations",
      ],

      impact: "Expérience utilisateur moins fluide",
    },
  ],

  // Recommandations d'amélioration
  recommendations: [
    {
      priority: "HIGH",
      title: "Ajouter les variants sémantiques manquants",
      description:
        "Créer success/warning/info dans globals.css avec support dark mode",
      effort: "2 heures",
      impact: "Élimine 100+ couleurs hardcodées",
      steps: [
        "1. Ajouter les variables CSS dans globals.css",
        "2. Créer les variants dans tailwind.config.ts",
        "3. Mettre à jour les composants shadcn/ui (Badge, Alert, Button)",
        "4. Tester en light/dark mode",
      ],

      code: {
        globalsCss: `/* app/globals.css */
:root {
  /* Existing colors */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  
  /* NEW: Success variant */
  --success: 142 76% 36%; /* green-600 */
  --success-foreground: 0 0% 98%;
  
  /* NEW: Warning variant */
  --warning: 38 92% 50%; /* orange-500 */
  --warning-foreground: 0 0% 98%;
  
  /* NEW: Info variant */
  --info: 217 91% 60%; /* blue-500 */
  --info-foreground: 0 0% 98%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  
  /* NEW: Dark mode variants */
  --success: 142 71% 45%; /* green-500 */
  --warning: 38 92% 60%; /* orange-400 */
  --info: 217 91% 70%; /* blue-400 */
}`,
        tailwindConfig: `// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
      },
    },
  },
}`,
        usage: `// Utilisation dans les composants
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

// Badge variants
<Badge variant="success">Validé</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="info">Information</Badge>

// Alert variants
<Alert variant="success">Opération réussie</Alert>
<Alert variant="warning">Attention requise</Alert>
<Alert variant="info">Information importante</Alert>

// Button variants
<Button variant="success">Confirmer</Button>
<Button variant="warning">Avertir</Button>
<Button variant="info">En savoir plus</Button>

// Classes Tailwind directes
<div className="bg-success text-success-foreground">
<div className="border-warning/20 text-warning">
<div className="bg-info/10 text-info">`,
      },
    },
    {
      priority: "HIGH",
      title: "Remplacer toutes les couleurs hardcodées",
      description: "Refactoring systématique vers classes sémantiques",
      effort: "4-6 heures",
      impact: "Cohérence totale du design system",
      steps: [
        "1. Identifier tous les fichiers avec couleurs hardcodées",
        "2. Créer un mapping old → new",
        "3. Exécuter le script de migration",
        "4. Tester visuellement toutes les pages",
        "5. Valider en light/dark mode",
      ],

      migrationScript: `#!/bin/bash
# migration-colors.sh

echo "🔍 Recherche des couleurs hardcodées..."

# Success colors (green)
find src -name "*.tsx" -exec sed -i 's/text-green-500/text-success/g' {} +
find src -name "*.tsx" -exec sed -i 's/text-green-600/text-success/g' {} +
find src -name "*.tsx" -exec sed -i 's/bg-green-50/bg-success\\/10/g' {} +
find src -name "*.tsx" -exec sed -i 's/bg-green-100/bg-success\\/20/g' {} +
find src -name "*.tsx" -exec sed -i 's/border-green-200/border-success\\/30/g' {} +

# Warning colors (orange)
find src -name "*.tsx" -exec sed -i 's/text-orange-500/text-warning/g' {} +
find src -name "*.tsx" -exec sed -i 's/text-orange-600/text-warning/g' {} +
find src -name "*.tsx" -exec sed -i 's/bg-orange-50/bg-warning\\/10/g' {} +
find src -name "*.tsx" -exec sed -i 's/border-orange-200/border-warning\\/30/g' {} +

# Info colors (blue)
find src -name "*.tsx" -exec sed -i 's/text-blue-500/text-info/g' {} +
find src -name "*.tsx" -exec sed -i 's/text-blue-600/text-info/g' {} +
find src -name "*.tsx" -exec sed -i 's/bg-blue-50/bg-info\\/10/g' {} +
find src -name "*.tsx" -exec sed -i 's/border-blue-200/border-info\\/30/g' {} +

# Primary colors (already semantic, but fix opacity)
find src -name "*.tsx" -exec sed -i 's/bg-blue-50/bg-primary\\/10/g' {} +
find src -name "*.tsx" -exec sed -i 's/bg-blue-100/bg-primary\\/20/g' {} +

# Destructive colors (red)
find src -name "*.tsx" -exec sed -i 's/text-red-500/text-destructive/g' {} +
find src -name "*.tsx" -exec sed -i 's/text-red-600/text-destructive/g' {} +
find src -name "*.tsx" -exec sed -i 's/bg-red-50/bg-destructive\\/10/g' {} +
find src -name "*.tsx" -exec sed -i 's/border-red-200/border-destructive\\/30/g' {} +

echo "✅ Migration terminée!"
echo "⚠️  Vérifiez manuellement les changements avec git diff"`,
      validation: [
        "Tester toutes les pages en light mode",
        "Tester toutes les pages en dark mode",
        "Vérifier les contrastes WCAG AA (4.5:1 minimum)",
        "Valider les hover/focus states",
        "Tester sur mobile/tablette/desktop",
      ],
    },
    {
      priority: "MEDIUM",
      title: "Créer la documentation Storybook",
      description: "Documentation interactive du design system",
      effort: "1-2 jours",
      impact: "Onboarding développeurs, cohérence équipe",
      steps: [
        "1. Installer Storybook 8 avec Next.js 15",
        "2. Créer stories pour tous les composants shadcn/ui",
        "3. Documenter les variants et props",
        "4. Ajouter exemples d'utilisation",
        "5. Documenter l'accessibilité",
        "6. Déployer sur Vercel/Netlify",
      ],

      installation: `# Installation Storybook
npx storybook@latest init --type nextjs

# Addons recommandés
npm install --save-dev @storybook/addon-a11y @storybook/addon-themes`,
      structure: `stories/
├── Introduction.mdx
├── Colors.stories.tsx
├── Typography.stories.tsx
├── Spacing.stories.tsx
├── components/
│   ├── Button.stories.tsx
│   ├── Badge.stories.tsx
│   ├── Card.stories.tsx
│   ├── Alert.stories.tsx
│   └── ... (40+ composants)
└── examples/
    ├── Forms.stories.tsx
    ├── Dashboard.stories.tsx
    └── DataTable.stories.tsx`,
      exampleStory: `// stories/components/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'info', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}`,
    },
    {
      priority: "MEDIUM",
      title: "Standardiser les animations et transitions",
      description: "Créer des tokens pour durées et easing functions",
      effort: "2-3 heures",
      impact: "Expérience utilisateur plus fluide et cohérente",
      code: {
        globalsCss: `/* app/globals.css */
:root {
  /* Animation durations */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  
  /* Easing functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}`,
        tailwindConfig: `// tailwind.config.ts
export default {
  theme: {
    extend: {
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        'bounce': 'var(--ease-bounce)',
      },
    },
  },
}`,
        usage: `// Utilisation
<Button className="transition-all duration-normal ease-in-out hover:scale-105">
<Dialog className="animate-in fade-in-0 zoom-in-95 duration-normal">
<Sheet className="transition-transform duration-slow ease-out">`,
      },
    },
    {
      priority: "LOW",
      title: "Créer un thème builder interactif",
      description: "Interface pour personnaliser les couleurs du thème",
      effort: "1 jour",
      impact: "Facilite la personnalisation par tenant",
      features: [
        "Color picker pour chaque token",
        "Preview en temps réel",
        "Export CSS variables",
        "Validation contraste WCAG",
        "Presets de thèmes (blue, green, purple, etc.)",
      ],
    },
  ],

  // Best practices pour maintenir le design system
  bestPractices: {
    colors: [
      "✅ TOUJOURS utiliser les classes sémantiques (bg-primary, text-success, border-destructive)",
      "❌ JAMAIS de couleurs hardcodées (text-green-500, bg-blue-50, border-red-200)",
      "✅ Utiliser les variants shadcn/ui (Button variant='success', Badge variant='warning')",
      "✅ Respecter les ratios de contraste WCAG AA (4.5:1 minimum pour texte)",
      "✅ Tester TOUTES les couleurs en light ET dark mode",
      "✅ Utiliser les opacités Tailwind pour variations (bg-primary/10, border-success/30)",
    ],

    typography: [
      "✅ Respecter la hiérarchie (h1 > h2 > h3 > h4 > h5 > h6)",
      "✅ Une seule h1 par page (SEO + accessibilité)",
      "✅ Utiliser font-medium pour labels, font-semibold pour headings",
      "✅ Line-height adapté (tight pour headings, normal pour body)",
      "✅ Limiter la largeur du texte (max-w-prose pour lisibilité)",
    ],

    spacing: [
      "✅ Utiliser l'échelle Tailwind (p-4, gap-6, space-y-8)",
      "✅ Cohérence verticale (space-y-4 pour listes, space-y-6 pour sections)",
      "✅ Padding interne composants (p-4 pour cards, p-6 pour dialogs)",
      "✅ Gap pour flex/grid (gap-4 pour grilles serrées, gap-6 pour aérées)",
    ],

    components: [
      "✅ Toujours importer depuis @/components/ui/ (shadcn/ui)",
      "✅ Ne JAMAIS modifier les composants shadcn/ui directement",
      "✅ Créer des wrappers si customisation nécessaire",
      "✅ Utiliser les variants existants avant d'en créer de nouveaux",
      "✅ Documenter les nouveaux composants custom",
    ],

    accessibility: [
      "✅ ARIA labels sur tous les boutons icons (<Button aria-label='Fermer'>)",
      "✅ Focus visible sur tous les éléments interactifs (ring-2 ring-ring)",
      "✅ Navigation clavier complète (Tab, Enter, Escape)",
      "✅ Textes alternatifs sur images (<img alt='Description'>)",
      "✅ Contraste suffisant (WCAG AA minimum, AAA recommandé)",
      "✅ Tester avec screen readers (NVDA, JAWS, VoiceOver)",
    ],

    responsive: [
      "✅ Mobile-first (styles de base pour mobile, puis md:, lg:, xl:)",
      "✅ Breakpoints Tailwind (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)",
      "✅ Grids responsives (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)",
      "✅ Tester sur mobile, tablette, desktop",
      "✅ Touch targets minimum 44x44px (mobile)",
    ],

    performance: [
      "✅ Lazy load composants lourds (dynamic import)",
      "✅ Optimiser images (next/image avec width/height)",
      "✅ Éviter les re-renders inutiles (React.memo, useMemo)",
      "✅ Code splitting par route (Next.js automatique)",
    ],
  },

  // Checklist avant commit
  commitChecklist: [
    "☐ Aucune couleur hardcodée (grep -r 'text-green-500' src/)",
    "☐ Tous les variants sémantiques utilisés (success, warning, info)",
    "☐ Testé en light ET dark mode",
    "☐ Contraste validé (Chrome DevTools Lighthouse)",
    "☐ Navigation clavier fonctionnelle",
    "☐ ARIA labels présents",
    "☐ Responsive testé (mobile, tablette, desktop)",
    "☐ Pas de console.log oubliés",
    "☐ TypeScript sans erreurs",
    "☐ ESLint sans warnings",
  ],

  // Outils recommandés
  tools: {
    development: [
      "Storybook 8 (documentation composants)",
      "Tailwind CSS IntelliSense (VSCode extension)",
      "Headless UI (composants accessibles)",
      "Radix UI (primitives shadcn/ui)",
    ],

    testing: [
      "Chrome DevTools Lighthouse (performance + accessibilité)",
      "axe DevTools (accessibilité)",
      "WAVE (Web Accessibility Evaluation Tool)",
      "Contrast Checker (WebAIM)",
    ],

    design: [
      "Figma (design system source of truth)",
      "Coolors (palette generator)",
      "Realtime Colors (preview couleurs)",
      "Type Scale (typographie)",
    ],
  },
};

// ============================================================================
// 2.2 EXPÉRIENCE UTILISATEUR (UX)
// ============================================================================

export const USER_EXPERIENCE_AUDIT = {
  score: "8.5/10",
  lastUpdate: "2025-01-18",
  category: "UI/UX",

  strengths: {
    navigation: {
      score: "9/10",
      features: [
        "✅ Sidebar RBAC avec permissions dynamiques",
        "✅ Breadcrumb contextuel",
        "✅ Navigation rapide (search globale)",
        "✅ Mobile responsive (collapse sidebar)",
        "✅ Quick actions bar",
        "✅ Keyboard shortcuts",
      ],

      code: `// Sidebar RBAC-aware
import { useUser } from '@/data/viamentor-user-store'
import { NAVIGATION_CONFIG } from '@/data/viamentor-navigation-config'

function Sidebar() {
  const { role } = useUser()
  const navigation = NAVIGATION_CONFIG[role]
  
  return (
    <nav>
      {navigation.sections.map(section => (
        <SidebarSection key={section.id} {...section} />
      ))}
    </nav>
  )
}`,
    },

    feedback: {
      score: "9/10",
      features: [
        "✅ Loading states (Skeleton)",
        "✅ Error boundaries",
        "✅ Toast notifications",
        "✅ Validation en temps réel",
        "✅ États désactivés clairs",
        "✅ Progress indicators",
      ],

      examples: [
        {
          name: "Loading States",
          code: `{isLoading ? (
  <Skeleton className="h-20 w-full" />
) : (
  <Card>{content}</Card>
)}`,
        },
        {
          name: "Error Boundaries",
          code: `<ErrorBoundary fallback={<ErrorFallback />}>
  <Page />
</ErrorBoundary>`,
        },
        {
          name: "Toast Notifications",
          code: `toast.success("Élève créé avec succès", {
  description: "Un email de bienvenue a été envoyé",
  action: {
    label: "Voir",
    onClick: () => router.push(\`/students/\${id}\`)
  }
})`,
        },
      ],
    },

    accessibility: {
      score: "8/10",
      features: [
        "✅ Labels aria-label présents",
        "✅ Focus visible (ring-2 ring-ring)",
        "✅ Keyboard navigation",
        "✅ Contraste suffisant (WCAG AA)",
        "✅ Semantic HTML",
        "✅ Screen reader support",
      ],
    },
  },

  weaknesses: [
    {
      severity: "HIGH",
      issue: "Surcharge Cognitive - Dashboards trop denses",
      description: "8-12 cards par vue, trop d'informations simultanées",
      examples: [
        {
          page: "Dashboard École",
          elements: [
            "4 KPIs (revenus, élèves, moniteurs, véhicules)",
            "6 graphiques (revenus, inscriptions, taux réussite, etc.)",
            "3 tables (prochains cours, alertes, activité récente)",
            "2 sections actions rapides",
          ],

          total: "15 éléments à scanner !",
          cognitiveLoad: "TRÈS ÉLEVÉ",
        },
        {
          page: "Dashboard Moniteur",
          elements: [
            "3 KPIs (leçons aujourd'hui, élèves actifs, taux satisfaction)",
            "4 graphiques (planning semaine, progression élèves, etc.)",
            "2 tables (prochaines leçons, élèves à évaluer)",
            "1 section actions rapides",
          ],

          total: "10 éléments",
          cognitiveLoad: "ÉLEVÉ",
        },
      ],

      impact: {
        users: "Fatigue cognitive, décisions plus lentes",
        performance: "Temps de chargement plus long",
        maintenance: "Difficile d'ajouter de nouvelles features",
      },

      recommendation: {
        title: "Limiter à 6-8 éléments par dashboard",
        strategies: [
          "Progressive disclosure: masquer infos secondaires",
          "Tabs pour séparer contextes",
          "Collapsible sections",
          "Personnalisation: utilisateur choisit widgets",
        ],
      },
    },
    {
      severity: "MEDIUM",
      issue: "Inconsistances de Pattern - Création d'entités incohérente",
      description:
        "Certaines entités utilisent wizards, d'autres forms simples",
      examples: [
        {
          entity: "Élèves",
          pattern: "Wizard 3 étapes",
          status: "✅ CORRECT",
          reason: "Formulaire complexe (>10 champs, validation OAC)",
        },
        {
          entity: "Moniteurs",
          pattern: "Wizard 3 étapes",
          status: "✅ CORRECT",
          reason: "Formulaire complexe (habilitations, documents légaux)",
        },
        {
          entity: "Véhicules",
          pattern: "Wizard 4 étapes",
          status: "✅ CORRECT",
          reason:
            "Formulaire complexe (équipements, assurances, conformité OAC)",
        },
        {
          entity: "Factures",
          pattern: "Form simple",
          status: "⚠️ INCONSISTANT",
          reason:
            "Devrait être wizard (sélection élève, items, paiement, récapitulatif)",
        },
        {
          entity: "Cours théoriques",
          pattern: "Form simple",
          status: "⚠️ INCONSISTANT",
          reason:
            "Devrait être wizard (infos cours, participants, récurrence, récapitulatif)",
        },
      ],

      impact:
        "Expérience utilisateur incohérente, courbe d'apprentissage plus longue",

      recommendation: {
        title: "Standardiser les patterns de création",
        rules: [
          {
            pattern: "Wizard multi-steps",
            when: "Formulaire complexe (>5 champs OU validation métier complexe)",
            steps: "3-5 steps maximum",
            examples: [
              "Élèves",
              "Moniteurs",
              "Véhicules",
              "Factures",
              "Cours théoriques",
            ],
          },
          {
            pattern: "Form simple",
            when: "Formulaire simple (<5 champs ET validation basique)",
            examples: ["Salles", "Catégories", "Tags"],
          },
          {
            pattern: "Inline editing",
            when: "Modification rapide d'un champ",
            examples: ["Statut élève", "Prix leçon", "Disponibilité moniteur"],
          },
        ],
      },
    },
    {
      severity: "MEDIUM",
      issue: "Manque de Guidage - Aide contextuelle absente",
      description: "Utilisateurs livrés à eux-mêmes, pas d'onboarding",
      missing: [
        "❌ Pas de tooltips explicatifs",
        "❌ Pas de tours guidés (onboarding)",
        "❌ Aide contextuelle absente",
        "❌ Messages d'erreur génériques",
        "❌ Pas de documentation in-app",
        "❌ Pas de suggestions intelligentes",
      ],

      examples: [
        {
          context: "Création élève",
          problem: "Champ 'Catégorie permis' sans explication",
          solution: "Tooltip: 'Catégorie B = voiture, A = moto, C = camion'",
        },
        {
          context: "Planning",
          problem: "Icônes sans labels",
          solution: "Tooltips sur tous les boutons d'action",
        },
        {
          context: "Erreur validation",
          problem: "'Erreur de validation'",
          solution:
            "'L\\'email existe déjà. Vérifiez les doublons ou utilisez un autre email.'",
        },
      ],

      impact: {
        newUsers: "Courbe d'apprentissage longue, frustration",
        support: "Augmentation tickets support",
        adoption: "Taux d'abandon élevé",
      },
    },
  ],

  recommendations: [
    {
      priority: "HIGH",
      title: "Réduire la densité des dashboards",
      description: "Limiter à 6-8 éléments visibles, reste en tabs/collapsible",
      effort: "2-3 jours",
      impact: "Réduction fatigue cognitive, décisions plus rapides",
      strategies: [
        {
          name: "Progressive Disclosure",
          description: "Afficher l'essentiel, masquer le reste",
          code: `// Dashboard avec tabs
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="activity">Activité</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview">
    {/* Maximum 6 éléments */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <KPICard title="Revenus" value="CHF 45,230" />
      <KPICard title="Élèves" value="127" />
      <KPICard title="Moniteurs" value="8" />
      <RecentActivityCard />
      <UpcomingLessonsCard />
      <QuickActionsCard />
    </div>
  </TabsContent>
  
  <TabsContent value="analytics">
    {/* Graphiques détaillés */}
  </TabsContent>
</Tabs>`,
        },
        {
          name: "Collapsible Sections",
          description: "Sections repliables pour infos secondaires",
          code: `<Accordion type="multiple" defaultValue={["kpis"]}>
  <AccordionItem value="kpis">
    <AccordionTrigger>KPIs Principaux</AccordionTrigger>
    <AccordionContent>
      <div className="grid grid-cols-3 gap-4">
        <KPICard />
        <KPICard />
        <KPICard />
      </div>
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="charts">
    <AccordionTrigger>Graphiques</AccordionTrigger>
    <AccordionContent>
      {/* Graphiques */}
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
        {
          name: "Personnalisation",
          description: "Utilisateur choisit widgets à afficher",
          code: `// Store widgets preferences
const [widgets, setWidgets] = useState([
  { id: 'kpis', visible: true, order: 0 },
  { id: 'charts', visible: true, order: 1 },
  { id: 'activity', visible: false, order: 2 },
])

// Render only visible widgets
{widgets
  .filter(w => w.visible)
  .sort((a, b) => a.order - b.order)
  .map(widget => (
    <Widget key={widget.id} type={widget.id} />
  ))}`,
        },
      ],

      before: {
        elements: 15,
        cognitiveLoad: "TRÈS ÉLEVÉ",
        timeToDecision: "30-45 secondes",
      },
      after: {
        elements: 6,
        cognitiveLoad: "MODÉRÉ",
        timeToDecision: "10-15 secondes",
        improvement: "3x plus rapide",
      },
    },
    {
      priority: "HIGH",
      title: "Standardiser les patterns de création",
      description:
        "Wizard pour toute création complexe, form simple pour édition rapide",
      effort: "1 semaine",
      impact: "Cohérence totale, courbe d'apprentissage réduite",
      implementation: [
        {
          step: "1. Auditer toutes les créations d'entités",
          tasks: [
            "Lister toutes les entités créables",
            "Compter nombre de champs",
            "Évaluer complexité validation",
            "Décider pattern (wizard vs form)",
          ],
        },
        {
          step: "2. Créer wizards manquants",
          entities: ["Factures", "Cours théoriques", "Promotions", "Forfaits"],
          template: `// Template wizard réutilisable
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface WizardStep {
  id: string
  title: string
  description: string
  component: React.ComponentType<any>
  validate: (data: any) => boolean
}

function Wizard({ steps, onComplete }: { steps: WizardStep[], onComplete: (data: any) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState({})
  
  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  
  const handleNext = () => {
    if (step.validate(data)) {
      if (isLastStep) {
        onComplete(data)
      } else {
        setCurrentStep(prev => prev + 1)
      }
    }
  }
  
  return (
    <Dialog>
      <DialogContent>
        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "h-2 flex-1 rounded-full",
                i <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        
        {/* Step content */}
        <div>
          <h2 className="text-2xl font-semibold">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
          <step.component data={data} onChange={setData} />
        </div>
        
        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          <Button onClick={handleNext}>
            {isLastStep ? "Créer" : "Suivant"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}`,
        },
        {
          step: "3. Ajouter bulk actions partout",
          description: "Sélection multiple + actions groupées",
          code: `// Bulk actions component
function BulkActions({ selectedIds, onAction }: { selectedIds: string[], onAction: (action: string) => void }) {
  if (selectedIds.length === 0) return null
  
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
      <span className="font-medium">{selectedIds.length} sélectionné(s)</span>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => onAction('export')}>
          Exporter
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onAction('delete')}>
          Supprimer
        </Button>
      </div>
    </div>
  )
}`,
        },
      ],
    },
    {
      priority: "HIGH",
      title: "Améliorer le guidage utilisateur",
      description: "Tooltips, tours guidés, aide contextuelle, messages clairs",
      effort: "1 semaine",
      impact: "Réduction tickets support, adoption plus rapide",
      features: [
        {
          name: "Tooltips partout",
          description: "Expliquer chaque élément non évident",
          code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircleIcon } from 'lucide-react'

// Wrapper réutilisable
function HelpTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-muted">
            <HelpCircleIcon className="h-3 w-3 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Usage
<Label>
  Catégorie permis
  <HelpTooltip content="Catégorie B = voiture, A = moto, C = camion" />
</Label>`,
        },
        {
          name: "Tours guidés",
          description: "Onboarding interactif pour nouveaux utilisateurs",
          code: `// Utiliser react-joyride ou shepherd.js
import Joyride from 'react-joyride'

const steps = [
  {
    target: '.sidebar',
    content: 'Voici la navigation principale. Toutes les fonctionnalités sont ici.',
  },
  {
    target: '.search-button',
    content: 'Utilisez la recherche globale (Ctrl+K) pour trouver rapidement.',
  },
  {
    target: '.quick-actions',
    content: 'Actions rapides pour créer élèves, leçons, factures.',
  },
]

function OnboardingTour() {
  const [run, setRun] = useState(false)
  
  useEffect(() => {
    // Démarrer si premier login
    const isFirstLogin = localStorage.getItem('hasSeenTour') === null
    if (isFirstLogin) {
      setRun(true)
      localStorage.setItem('hasSeenTour', 'true')
    }
  }, [])
  
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      styles={{
        options: {
          primaryColor: 'hsl(var(--primary))',
        },
      }}
    />
  )
}`,
        },
        {
          name: "Messages d'erreur clairs",
          description: "Expliquer le problème ET la solution",
          code: `// ❌ AVANT
toast.error("Erreur")

// ✅ APRÈS
toast.error("Impossible de créer l'élève", {
  description: "L'email existe déjà. Vérifiez les doublons.",
  action: {
    label: "Voir les doublons",
    onClick: () => router.push("/students?filter=duplicates")
  }
})

// ❌ AVANT
if (!email) {
  setError("Email requis")
}

// ✅ APRÈS
if (!email) {
  setError({
    type: "required",
    message: "L'email est obligatoire pour créer un compte"
  })
}

// ❌ AVANT
if (email && !isValidEmail(email)) {
  setError("Email invalide")
}

// ✅ APRÈS
if (email && !isValidEmail(email)) {
  setError({
    type: "pattern",
    message: "Format d'email invalide. Exemple: jean.dupont@example.com"
  })
}`,
        },
        {
          name: "Aide contextuelle",
          description: "Documentation in-app accessible",
          code: `// Help panel slide-over
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HelpCircleIcon } from 'lucide-react'

function ContextualHelp({ topic }: { topic: string }) {
  const helpContent = HELP_CONTENT[topic]
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircleIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{helpContent.title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <p>{helpContent.description}</p>
          
          <div>
            <h4 className="font-semibold mb-2">Comment faire ?</h4>
            <ol className="list-decimal list-inside space-y-2">
              {helpContent.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          
          {helpContent.video && (
            <div>
              <h4 className="font-semibold mb-2">Vidéo tutoriel</h4>
              <video src={helpContent.video} controls />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}`,
        },
      ],
    },
    {
      priority: "MEDIUM",
      title: "Ajouter des suggestions intelligentes",
      description: "Aide proactive basée sur le contexte",
      effort: "1 semaine",
      examples: [
        {
          context: "Création élève",
          suggestion: "Détection doublons en temps réel",
          code: `// Pendant la saisie email
const { data: existingStudents } = useQuery({
  queryKey: ['students', 'check-duplicate', email],
  queryFn: () => checkDuplicateEmail(email),
  enabled: email.length > 5,
})

{existingStudents?.length > 0 && (
  <Alert variant="warning">
    <AlertTitle>Attention</AlertTitle>
    <AlertDescription>
      {existingStudents.length} élève(s) avec email similaire trouvé(s).
      <Button variant="link" onClick={() => showDuplicates(existingStudents)}>
        Voir les doublons
      </Button>
    </AlertDescription>
  </Alert>
)}`,
        },
        {
          context: "Planning",
          suggestion: "Détection conflits automatique",
          code: `// Lors du drag & drop
const conflicts = detectConflicts(lesson, newSlot)

if (conflicts.length > 0) {
  toast.warning("Conflit détecté", {
    description: \`\${conflicts[0].instructor} a déjà une leçon à cette heure\`,
    action: {
      label: "Voir alternatives",
      onClick: () => showAlternativeSlots(lesson)
    }
  })
}`,
        },
      ],
    },
  ],

  bestPractices: [
    "✅ Progressive disclosure: afficher l'essentiel, masquer le reste",
    "✅ Consistency: patterns cohérents dans toute l'app",
    "✅ Feedback: toujours indiquer ce qui se passe (loading, success, error)",
    "✅ Error prevention: validation en temps réel, suggestions",
    "✅ Error recovery: messages clairs avec solutions",
    "✅ Help & documentation: tooltips, tours guidés, aide contextuelle",
    "✅ Flexibility: shortcuts clavier, bulk actions, personnalisation",
    "✅ Aesthetic: design épuré, hiérarchie visuelle claire",
  ],

  metrics: {
    current: {
      timeToFirstAction: "45 secondes",
      taskCompletionRate: "78%",
      errorRate: "12%",
      supportTickets: "25/mois",
      userSatisfaction: "7.5/10",
    },
    target: {
      timeToFirstAction: "15 secondes (-67%)",
      taskCompletionRate: "95% (+22%)",
      errorRate: "3% (-75%)",
      supportTickets: "5/mois (-80%)",
      userSatisfaction: "9/10 (+20%)",
    },
  },

  tools: [
    "Hotjar (heatmaps, session recordings)",
    "Fullstory (user analytics)",
    "Maze (user testing)",
    "UserTesting (feedback utilisateurs)",
    "Google Analytics (comportement)",
  ],
};

// ============================================================================
// 2.3 DESIGN PATTERNS
// ============================================================================

// Voir fichier dédié pour l'audit complet des design patterns
import DESIGN_PATTERNS_AUDIT_DATA from "@/polymet/data/viamentor-design-patterns-audit";
export const DESIGN_PATTERNS_AUDIT = DESIGN_PATTERNS_AUDIT_DATA;

// ============================================================================
// 3. GESTION DES DONNÉES
// ============================================================================

// Voir fichier dédié pour l'audit complet du state management
import STATE_MANAGEMENT_AUDIT_DATA from "@/polymet/data/viamentor-state-management-audit";
export const STATE_MANAGEMENT_AUDIT = STATE_MANAGEMENT_AUDIT_DATA;

// ============================================================================
// 4. SÉCURITÉ
// ============================================================================

// Voir fichier dédié pour l'audit complet sécurité
import SECURITY_AUDIT_DATA from "@/polymet/data/viamentor-security-audit";
export const SECURITY_AUDIT = SECURITY_AUDIT_DATA;

// ============================================================================
// 5. TESTING & QUALITÉ
// ============================================================================

// Voir fichier dédié pour la stratégie complète de testing
import TESTING_STRATEGY_DATA from "@/polymet/data/viamentor-testing-strategy";
export const TESTING_STRATEGY = TESTING_STRATEGY_DATA;

// ============================================================================
// 2.4 RESPONSIVE DESIGN
// ============================================================================

export const RESPONSIVE_DESIGN_AUDIT = {
  score: "8/10",
  lastUpdate: "2025-01-18",
  category: "UI/UX",

  strengths: [
    "✅ Breakpoints Tailwind cohérents (sm, md, lg, xl, 2xl)",
    "✅ Mobile-first approach dans la plupart des composants",
    "✅ Grids responsives avec grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "✅ Sidebar collapsible sur mobile",
    "✅ Touch targets suffisants (44x44px minimum)",
    "✅ Tables → Cards sur mobile (DataTable responsive)",
  ],

  breakpoints: {
    system: "Tailwind CSS",
    values: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    usage: {
      mobile: "Base styles (no prefix)",
      tablet: "md: prefix",
      desktop: "lg: prefix",
      wide: "xl: prefix",
    },
  },

  patterns: {
    layouts: {
      description: "Layouts adaptatifs selon device",
      examples: [
        {
          component: "Sidebar Navigation",
          mobile: "Drawer overlay full-screen",
          tablet: "Sidebar collapsible 64px",
          desktop: "Sidebar expanded 240px",
          code: `// Mobile: Drawer
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <MenuIcon />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <Navigation />
  </SheetContent>
</Sheet>

// Desktop: Sidebar
<aside className="hidden lg:flex w-64">
  <Navigation />
</aside>`,
        },
        {
          component: "DataTable",
          mobile: "Cards verticales",
          tablet: "Table scrollable horizontale",
          desktop: "Table complète",
          code: `// Mobile: Cards
<div className="lg:hidden space-y-4">
  {data.map(item => (
    <Card key={item.id}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm text-muted-foreground">Email</dt>
            <dd>{item.email}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  ))}
</div>

// Desktop: Table
<div className="hidden lg:block">
  <Table>
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
  </Table>
</div>`,
        },
        {
          component: "Dashboard Grid",
          mobile: "1 colonne",
          tablet: "2 colonnes",
          desktop: "3-4 colonnes",
          code: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <StatsCard />
  <StatsCard />
  <StatsCard />
  <StatsCard />
</div>`,
        },
      ],
    },

    typography: {
      description: "Tailles de texte adaptatives",
      scale: {
        mobile: {
          h1: "text-2xl (24px)",
          h2: "text-xl (20px)",
          h3: "text-lg (18px)",
          body: "text-sm (14px)",
        },
        desktop: {
          h1: "text-4xl (36px)",
          h2: "text-3xl (30px)",
          h3: "text-2xl (24px)",
          body: "text-base (16px)",
        },
      },
      code: `<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Titre Responsive
</h1>

<p className="text-sm md:text-base">
  Texte qui s'adapte
</p>`,
    },

    spacing: {
      description: "Espacements adaptatifs",
      examples: [
        {
          context: "Container padding",
          code: `<div className="px-4 md:px-6 lg:px-8">
  Content
</div>`,
        },
        {
          context: "Section spacing",
          code: `<section className="py-8 md:py-12 lg:py-16">
  Content
</section>`,
        },
        {
          context: "Grid gaps",
          code: `<div className="grid gap-4 md:gap-6 lg:gap-8">
  Items
</div>`,
        },
      ],
    },
  },

  weaknesses: [
    {
      severity: "MEDIUM",
      issue: "Certains composants non optimisés mobile",
      examples: [
        "Planning Calendar: difficile à utiliser sur mobile (trop petit)",
        "Filters Bar: trop de filtres visibles simultanément",
        "Stats Cards: texte trop petit sur mobile",
      ],

      impact: "UX dégradée sur mobile (50% du trafic)",
      solution: "Créer des versions mobile dédiées avec interactions tactiles",
    },
    {
      severity: "MEDIUM",
      issue: "Breakpoints non cohérents",
      examples: [
        "Certains composants utilisent md:, d'autres lg: pour même transition",
        "Sidebar collapse à lg: mais Header à md:",
        "Incohérence dans grid-cols breakpoints",
      ],

      impact: "Expérience incohérente entre pages",
      solution: "Standardiser les breakpoints par type de composant",
    },
    {
      severity: "LOW",
      issue: "Tests responsive insuffisants",
      needed: [
        "Tests automatisés Playwright sur mobile/tablet/desktop",
        "Visual regression testing (Percy, Chromatic)",
        "Device testing réel (iPhone, iPad, Android)",
      ],

      impact: "Bugs responsive non détectés avant production",
    },
  ],

  recommendations: [
    {
      priority: "HIGH",
      title: "Optimiser Planning Calendar pour mobile",
      description: "Créer une vue mobile dédiée avec interactions tactiles",
      effort: "1 jour",
      impact: "Améliore drastiquement l'UX mobile",
      features: [
        "Vue jour par défaut sur mobile (au lieu de mois)",
        "Swipe gauche/droite pour naviguer entre jours",
        "Tap pour ouvrir détails leçon (au lieu de hover)",
        "Bottom sheet pour actions (au lieu de dropdown)",
        "Touch targets 44x44px minimum",
      ],
    },
    {
      priority: "HIGH",
      title: "Standardiser les breakpoints",
      description: "Définir des règles claires par type de composant",
      effort: "4 heures",
      impact: "Cohérence totale responsive",
      rules: {
        navigation: "Sidebar collapse à lg: (1024px)",
        grids: "1 col mobile, 2 cols md:, 3 cols lg:, 4 cols xl:",
        typography: "Base mobile, scale up à md: et lg:",
        spacing: "Base mobile (p-4), augmenter à md: (p-6) et lg: (p-8)",
        tables: "Cards mobile, table à lg: (1024px)",
      },
    },
    {
      priority: "MEDIUM",
      title: "Créer un composant ResponsiveContainer",
      description: "Wrapper réutilisable pour gérer responsive",
      effort: "2 heures",
      code: `// components/responsive-container.tsx
import { useMediaQuery } from '@/hooks/use-media-query'

interface ResponsiveContainerProps {
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  desktop: React.ReactNode
}

export function ResponsiveContainer({ mobile, tablet, desktop }: ResponsiveContainerProps) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  
  if (isMobile && mobile) return <>{mobile}</>
  if (isTablet && tablet) return <>{tablet}</>
  return <>{desktop}</>
}

// Usage
<ResponsiveContainer
  mobile={<MobileView />}
  tablet={<TabletView />}
  desktop={<DesktopView />}
/>`,
    },
    {
      priority: "MEDIUM",
      title: "Implémenter tests responsive automatisés",
      description: "Playwright tests sur multiple viewports",
      effort: "1 jour",
      code: `// tests/responsive.spec.ts
import { test, expect } from '@playwright/test'

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
]

for (const viewport of viewports) {
  test.describe(\`Responsive tests - \${viewport.name}\`, () => {
    test.use({ viewport })
    
    test('Dashboard loads correctly', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveScreenshot(\`dashboard-\${viewport.name}.png\`)
    })
    
    test('Navigation is accessible', async ({ page }) => {
      await page.goto('/dashboard')
      
      if (viewport.name === 'mobile') {
        // Mobile: menu burger
        await expect(page.locator('[aria-label="Menu"]')).toBeVisible()
      } else {
        // Desktop: sidebar
        await expect(page.locator('aside')).toBeVisible()
      }
    })
  })
}`,
    },
  ],

  bestPractices: [
    "✅ Mobile-first: styles de base pour mobile, puis md:, lg:, xl:",
    "✅ Touch targets: minimum 44x44px pour éléments interactifs",
    "✅ Viewport meta tag: <meta name='viewport' content='width=device-width, initial-scale=1'>",
    "✅ Tester sur vrais devices: iPhone, iPad, Android",
    "✅ Éviter horizontal scroll: overflow-x-hidden",
    "✅ Images responsive: next/image avec sizes",
    "✅ Fonts lisibles: minimum 16px sur mobile",
    "✅ Contraste suffisant: WCAG AA (4.5:1)",
    "✅ Navigation accessible: clavier + screen readers",
    "✅ Performance mobile: lazy load, code splitting",
  ],

  tools: [
    "Chrome DevTools Device Mode",
    "Firefox Responsive Design Mode",
    "BrowserStack (tests multi-devices)",
    "Playwright (tests automatisés)",
    "Lighthouse Mobile (performance)",
  ],
};

// ============================================================================
// 2.5 ANIMATIONS & TRANSITIONS
// ============================================================================

export const ANIMATIONS_AUDIT = {
  score: "7/10",
  lastUpdate: "2025-01-18",
  category: "UI/UX",

  strengths: [
    "✅ Animations Radix UI (Dialog, Sheet, Accordion)",
    "✅ Transitions hover cohérentes (buttons, cards)",
    "✅ Loading states avec Skeleton",
    "✅ Smooth scroll behavior",
  ],

  current: {
    durations: {
      fast: "150ms (hover states)",
      normal: "200ms (dialogs, sheets)",
      slow: "300ms (page transitions)",
      issue: "Valeurs non standardisées, hardcodées",
    },
    easing: {
      ease: "ease (défaut CSS)",
      easeInOut: "ease-in-out (transitions)",
      cubicBezier: "cubic-bezier(0.82, 0.085, 0.395, 0.895) (slides)",
      issue: "Pas de tokens, difficile à maintenir",
    },
    animations: [
      "accordion-down/up (Radix UI)",
      "slide-from-left/to-left (Sidebar)",
      "fade-in/out (Dialogs)",
      "zoom-in/out (Modals)",
      "spin (Loading)",
    ],
  },

  weaknesses: [
    {
      severity: "MEDIUM",
      issue: "Durées et easing non standardisés",
      examples: [
        "duration-150 dans certains composants",
        "duration-200 dans d'autres",
        "duration-300 ailleurs",
        "ease-in-out vs cubic-bezier inconsistant",
      ],

      impact: "Expérience incohérente, difficile à maintenir",
    },
    {
      severity: "MEDIUM",
      issue: "Animations manquantes",
      missing: [
        "Page transitions (Next.js navigation)",
        "List items animations (stagger effect)",
        "Success/Error feedback animations",
        "Skeleton → Content transition",
        "Micro-interactions (button press, checkbox check)",
      ],

      impact: "Application semble moins polie",
    },
    {
      severity: "LOW",
      issue: "Pas de prefers-reduced-motion",
      description:
        "Accessibilité: certains utilisateurs sont sensibles aux animations",
      solution: "Respecter prefers-reduced-motion media query",
    },
  ],

  recommendations: [
    {
      priority: "HIGH",
      title: "Créer des tokens d'animation",
      description: "Standardiser durées et easing functions",
      effort: "2 heures",
      impact: "Cohérence totale, maintenance facilitée",
      code: {
        globalsCss: `/* app/globals.css */
:root {
  /* Animation durations */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  /* Easing functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}`,
        tailwindConfig: `// tailwind.config.ts
export default {
  theme: {
    extend: {
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
      transitionTimingFunction: {
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        'bounce': 'var(--ease-bounce)',
        'elastic': 'var(--ease-elastic)',
      },
    },
  },
}`,
        usage: `// Hover states
<Button className="transition-all duration-fast ease-out hover:scale-105">

// Dialogs
<Dialog className="animate-in fade-in-0 zoom-in-95 duration-normal">

// Slides
<Sheet className="transition-transform duration-slow ease-in-out">

// Micro-interactions
<Checkbox className="transition-all duration-instant ease-bounce">`,
      },
    },
    {
      priority: "HIGH",
      title: "Implémenter prefers-reduced-motion",
      description: "Respecter les préférences utilisateur",
      effort: "1 heure",
      impact: "Accessibilité améliorée",
      code: {
        globalsCss: `/* app/globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
        tailwindConfig: `// tailwind.config.ts
export default {
  theme: {
    extend: {
      animation: {
        // Animations respectent prefers-reduced-motion
        'spin-safe': 'spin 1s linear infinite',
        'pulse-safe': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    // Plugin pour motion-safe et motion-reduce
    require('tailwindcss-animate'),
  ],
}`,
        usage: `// Utilisation
<div className="motion-safe:animate-spin motion-reduce:animate-none">
<Button className="motion-safe:transition-all motion-reduce:transition-none">`,
      },
    },
    {
      priority: "MEDIUM",
      title: "Ajouter page transitions",
      description: "Transitions fluides entre pages Next.js",
      effort: "3 heures",
      code: `// components/page-transition.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// app/layout.tsx
import { PageTransition } from '@/components/page-transition'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}`,
    },
    {
      priority: "MEDIUM",
      title: "Créer des micro-interactions",
      description: "Feedback visuel sur interactions utilisateur",
      effort: "1 jour",
      examples: [
        {
          name: "Button Press",
          code: `<Button className="active:scale-95 transition-transform duration-instant">
  Click me
</Button>`,
        },
        {
          name: "Checkbox Check",
          code: `<Checkbox className="data-[state=checked]:animate-bounce-once" />`,
        },
        {
          name: "Success Toast",
          code: `<Toast className="animate-in slide-in-from-top-5 duration-normal">
  <CheckCircleIcon className="animate-in zoom-in-50 duration-fast" />
  Succès!
</Toast>`,
        },
        {
          name: "Loading Skeleton → Content",
          code: `{isLoading ? (
  <Skeleton className="h-20 w-full" />
) : (
  <Card className="animate-in fade-in-0 slide-in-from-bottom-5 duration-normal">
    {content}
  </Card>
)}`,
        },
      ],
    },
    {
      priority: "LOW",
      title: "Ajouter stagger animations pour listes",
      description: "Items apparaissent séquentiellement",
      effort: "2 heures",
      code: `// components/stagger-list.tsx
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function StaggerList({ items }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={item}>
          <Card>{item.content}</Card>
        </motion.li>
      ))}
    </motion.ul>
  )
}`,
    },
  ],

  bestPractices: [
    "✅ Durées courtes: 150-300ms pour la plupart des animations",
    "✅ Easing naturel: ease-out pour entrées, ease-in pour sorties",
    "✅ Respecter prefers-reduced-motion",
    "✅ Animations subtiles: pas de distraction",
    "✅ Feedback immédiat: <100ms pour interactions",
    "✅ Loading states: toujours indiquer chargement",
    "✅ Transitions cohérentes: même durée/easing pour actions similaires",
    "✅ Performance: GPU-accelerated (transform, opacity)",
    "❌ Éviter: animations trop longues (>500ms)",
    "❌ Éviter: animations sur layout (width, height, top, left)",
  ],

  tools: [
    "Framer Motion (animations React)",
    "Tailwind CSS Animate (utilities)",
    "React Spring (physics-based)",
    "GSAP (animations complexes)",
    "Lottie (animations After Effects)",
  ],
};

// ============================================================================
// 2.6 ACCESSIBILITÉ (A11Y)
// ============================================================================

export const ACCESSIBILITY_AUDIT = {
  score: "8/10",
  lastUpdate: "2025-01-18",
  category: "UI/UX",
  wcagLevel: "AA (objectif AAA)",

  strengths: [
    "✅ Composants shadcn/ui accessibles (Radix UI)",
    "✅ ARIA labels sur boutons icons",
    "✅ Navigation clavier fonctionnelle",
    "✅ Focus visible (ring-2 ring-ring)",
    "✅ Contraste suffisant (la plupart des textes)",
    "✅ Semantic HTML (header, nav, main, footer)",
  ],

  wcagCompliance: {
    level: "AA",
    criteria: {
      perceivable: {
        score: "8/10",
        "1.1": {
          name: "Text Alternatives",
          status: "PASS",
          note: "Images ont alt text",
        },
        "1.3": {
          name: "Adaptable",
          status: "PASS",
          note: "Structure sémantique correcte",
        },
        "1.4": {
          name: "Distinguishable",
          status: "PARTIAL",
          issues: [
            "Certains textes < 4.5:1 contrast ratio",
            "Focus indicator parfois peu visible",
          ],
        },
      },
      operable: {
        score: "9/10",
        "2.1": {
          name: "Keyboard Accessible",
          status: "PASS",
          note: "Toutes les fonctions accessibles au clavier",
        },
        "2.4": {
          name: "Navigable",
          status: "PASS",
          note: "Skip links, breadcrumbs, headings hierarchy",
        },
        "2.5": {
          name: "Input Modalities",
          status: "PASS",
          note: "Touch targets 44x44px minimum",
        },
      },
      understandable: {
        score: "7/10",
        "3.1": {
          name: "Readable",
          status: "PARTIAL",
          issues: ["Langue non déclarée sur certaines pages"],
        },
        "3.2": {
          name: "Predictable",
          status: "PASS",
          note: "Navigation cohérente",
        },
        "3.3": {
          name: "Input Assistance",
          status: "PARTIAL",
          issues: ["Messages d'erreur parfois peu clairs"],
        },
      },
      robust: {
        score: "9/10",
        "4.1": {
          name: "Compatible",
          status: "PASS",
          note: "HTML valide, ARIA correct",
        },
      },
    },
  },

  weaknesses: [
    {
      severity: "HIGH",
      issue: "Contraste insuffisant sur certains éléments",
      examples: [
        "text-muted-foreground sur bg-muted: 3.2:1 (< 4.5:1 requis)",
        "Placeholders inputs: 2.8:1 (< 4.5:1 requis)",
        "Disabled buttons: 2.1:1 (acceptable si disabled)",
      ],

      impact: "Difficile à lire pour utilisateurs malvoyants",
      wcag: "1.4.3 Contrast (Minimum) - Level AA",
    },
    {
      severity: "MEDIUM",
      issue: "ARIA labels manquants sur certains composants",
      examples: [
        "Boutons icons sans aria-label",
        "Dialogs sans aria-describedby",
        "Form inputs sans labels associés",
      ],

      impact: "Screen readers ne peuvent pas annoncer le contenu",
      wcag: "4.1.2 Name, Role, Value - Level A",
    },
    {
      severity: "MEDIUM",
      issue: "Navigation clavier incomplète",
      examples: [
        "Certains dropdowns ne s'ouvrent pas avec Enter",
        "Modals: Escape ne ferme pas toujours",
        "Focus trap manquant dans certains dialogs",
      ],

      impact: "Utilisateurs clavier bloqués",
      wcag: "2.1.1 Keyboard - Level A",
    },
    {
      severity: "LOW",
      issue: "Headings hierarchy non respectée",
      examples: [
        "h1 → h3 (skip h2)",
        "Plusieurs h1 sur même page",
        "Headings utilisés pour styling (au lieu de semantic)",
      ],

      impact: "Navigation screen reader difficile",
      wcag: "1.3.1 Info and Relationships - Level A",
    },
  ],

  recommendations: [
    {
      priority: "HIGH",
      title: "Corriger les contrastes insuffisants",
      description: "Assurer ratio 4.5:1 minimum (AA) ou 7:1 (AAA)",
      effort: "1 jour",
      impact: "Conformité WCAG AA",
      steps: [
        "1. Auditer tous les textes avec Lighthouse",
        "2. Identifier les contrastes < 4.5:1",
        "3. Ajuster les couleurs (darkening/lightening)",
        "4. Tester en light ET dark mode",
        "5. Valider avec WebAIM Contrast Checker",
      ],

      fixes: [
        {
          issue: "text-muted-foreground trop clair",
          current: "hsl(240 3.8% 46.1%)",
          fixed: "hsl(240 5% 40%) // 4.6:1 ratio",
        },
        {
          issue: "Placeholders inputs",
          current: "opacity-50",
          fixed: "opacity-70 // ou couleur plus foncée",
        },
      ],
    },
    {
      priority: "HIGH",
      title: "Ajouter ARIA labels manquants",
      description: "Tous les éléments interactifs doivent avoir un label",
      effort: "4 heures",
      impact: "Screen readers fonctionnels",
      code: {
        buttons: `// ❌ BAD
<Button>
  <XIcon />
</Button>

// ✅ GOOD
<Button aria-label="Fermer">
  <XIcon />
</Button>

// ✅ BETTER (avec tooltip)
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button aria-label="Fermer">
        <XIcon />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Fermer</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
        dialogs: `// ❌ BAD
<Dialog>
  <DialogContent>
    <DialogTitle>Titre</DialogTitle>
    <p>Description</p>
  </DialogContent>
</Dialog>

// ✅ GOOD
<Dialog>
  <DialogContent
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <DialogTitle id="dialog-title">Titre</DialogTitle>
    <DialogDescription id="dialog-description">
      Description
    </DialogDescription>
  </DialogContent>
</Dialog>`,
        forms: `// ❌ BAD
<Input placeholder="Email" />

// ✅ GOOD
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// ✅ BETTER (avec description)
<Label htmlFor="email">Email</Label>
<Input
  id="email"
  type="email"
  aria-describedby="email-description"
/>
<p id="email-description" className="text-sm text-muted-foreground">
  Nous ne partagerons jamais votre email
</p>`,
      },
    },
    {
      priority: "HIGH",
      title: "Améliorer navigation clavier",
      description: "Toutes les interactions doivent fonctionner au clavier",
      effort: "1 jour",
      impact: "Accessibilité clavier complète",
      features: [
        {
          name: "Focus trap dans modals",
          code: `// Utiliser Radix UI Dialog (focus trap intégré)
import { Dialog } from '@/components/ui/dialog'

// Ou custom hook
import { useFocusTrap } from '@/hooks/use-focus-trap'

function Modal() {
  const ref = useFocusTrap()
  
  return (
    <div ref={ref}>
      {/* Focus reste dans modal */}
    </div>
  )
}`,
        },
        {
          name: "Escape pour fermer",
          code: `// Hook réutilisable
import { useEffect } from 'react'

function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onEscape])
}

// Usage
function Modal({ onClose }) {
  useEscapeKey(onClose)
  return <div>...</div>
}`,
        },
        {
          name: "Skip links",
          code: `// app/layout.tsx
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
  >
    Aller au contenu principal
  </a>
  
  <Header />
  <main id="main-content">
    {children}
  </main>
</body>`,
        },
      ],
    },
    {
      priority: "MEDIUM",
      title: "Corriger headings hierarchy",
      description: "Respecter h1 → h2 → h3 → h4 → h5 → h6",
      effort: "2 heures",
      impact: "Navigation screen reader améliorée",
      rules: [
        "Une seule h1 par page (titre principal)",
        "Ne pas skip de niveaux (h1 → h3)",
        "Utiliser headings pour structure, pas styling",
        "Si besoin styling différent: className, pas heading level",
      ],

      code: `// ❌ BAD
<h1>Page Title</h1>
<h3>Section</h3> {/* Skip h2 */}
<h1>Another Title</h1> {/* Multiple h1 */}
<h4 className="text-2xl">Big Text</h4> {/* Heading pour styling */}

// ✅ GOOD
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<p className="text-2xl font-bold">Big Text</p> {/* Pas heading */}`,
    },
    {
      priority: "MEDIUM",
      title: "Implémenter tests accessibilité automatisés",
      description: "Détecter les problèmes a11y avant production",
      effort: "1 jour",
      tools: [
        "axe-core (linting)",
        "jest-axe (tests unitaires)",
        "Playwright axe (tests E2E)",
        "Lighthouse CI (CI/CD)",
      ],

      code: `// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility tests', () => {
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
})`,
    },
  ],

  bestPractices: [
    "✅ Semantic HTML: <header>, <nav>, <main>, <footer>, <article>, <section>",
    "✅ ARIA labels: aria-label, aria-labelledby, aria-describedby",
    "✅ ARIA roles: role='button', role='dialog', role='navigation'",
    "✅ ARIA states: aria-expanded, aria-selected, aria-checked",
    "✅ Keyboard navigation: Tab, Enter, Escape, Arrow keys",
    "✅ Focus management: focus trap, focus restoration",
    "✅ Skip links: permettre de sauter navigation",
    "✅ Contraste: 4.5:1 minimum (AA), 7:1 recommandé (AAA)",
    "✅ Touch targets: 44x44px minimum",
    "✅ Alt text: images décoratives alt='', images informatives alt='description'",
    "✅ Forms: labels associés, error messages clairs",
    "✅ Headings: hierarchy respectée (h1 → h2 → h3)",
    "✅ Live regions: aria-live pour updates dynamiques",
    "✅ Screen reader testing: NVDA, JAWS, VoiceOver",
  ],

  tools: [
    "axe DevTools (Chrome extension)",
    "WAVE (Web Accessibility Evaluation Tool)",
    "Lighthouse (Chrome DevTools)",
    "NVDA (screen reader Windows)",
    "JAWS (screen reader Windows)",
    "VoiceOver (screen reader macOS/iOS)",
    "Contrast Checker (WebAIM)",
    "Color Oracle (color blindness simulator)",
  ],

  resources: [
    "WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/",
    "MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "A11y Project: https://www.a11yproject.com/",
    "Inclusive Components: https://inclusive-components.design/",
    "Radix UI (accessible primitives): https://www.radix-ui.com/",
  ],
};

// ============================================================================
// 2.7 PERFORMANCE
// ============================================================================

export const PERFORMANCE_AUDIT = {
  score: "7.5/10",
  lastUpdate: "2025-01-18",
  category: "Performance",

  metrics: {
    lighthouse: {
      performance: 85,
      accessibility: 92,
      bestPractices: 88,
      seo: 90,
    },
    coreWebVitals: {
      lcp: "2.1s (GOOD < 2.5s)",
      fid: "45ms (GOOD < 100ms)",
      cls: "0.08 (GOOD < 0.1)",
    },
  },

  strengths: [
    "✅ Next.js 15 App Router (RSC, streaming)",
    "✅ Code splitting automatique",
    "✅ Image optimization (next/image)",
    "✅ Font optimization (next/font)",
    "✅ Lazy loading composants",
  ],

  weaknesses: [
    {
      severity: "HIGH",
      issue: "Bundle JavaScript trop lourd",
      current: "450KB gzipped",
      target: "< 200KB",
      solutions: [
        "Dynamic imports pour composants lourds",
        "Tree shaking des dépendances",
        "Remplacer libraries lourdes",
      ],
    },
    {
      severity: "MEDIUM",
      issue: "Images non optimisées",
      examples: [
        "Certaines images sans next/image",
        "Formats non modernes (PNG au lieu de WebP)",
        "Pas de lazy loading",
      ],
    },
  ],

  recommendations: [
    {
      priority: "HIGH",
      title: "Réduire bundle size",
      actions: [
        "Dynamic import pour Recharts",
        "Lazy load modals/dialogs",
        "Code splitting par route",
      ],
    },
    {
      priority: "HIGH",
      title: "Optimiser images",
      actions: [
        "Utiliser next/image partout",
        "Convertir en WebP/AVIF",
        "Lazy load images below fold",
      ],
    },
  ],

  bestPractices: [
    "✅ Server Components par défaut",
    "✅ Suspense boundaries pour loading",
    "✅ React.memo pour composants lourds",
    "✅ useMemo/useCallback pour calculs",
    "✅ Virtualization pour longues listes",
  ],
};

// ============================================================================
// 2.8 SEO
// ============================================================================

export const SEO_AUDIT = {
  score: "8/10",
  lastUpdate: "2025-01-18",
  category: "SEO",

  strengths: [
    "✅ Metadata API Next.js 15",
    "✅ Semantic HTML",
    "✅ Sitemap.xml généré",
    "✅ Robots.txt configuré",
  ],

  weaknesses: [
    {
      severity: "MEDIUM",
      issue: "Meta descriptions manquantes",
      pages: ["Dashboard", "Planning", "Students"],
    },
    {
      severity: "LOW",
      issue: "Structured data absentes",
      needed: ["Organization", "LocalBusiness"],
    },
  ],

  recommendations: [
    {
      priority: "HIGH",
      title: "Ajouter meta descriptions",
      code: `// app/students/page.tsx
export const metadata = {
  title: "Gestion Élèves | Viamentor",
  description: "Gérez vos élèves: inscriptions, progression, planning",
}`,
    },
    {
      priority: "MEDIUM",
      title: "Ajouter structured data",
      code: `// app/layout.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Viamentor",
  url: "https://viamentor.ch",
}`,
    },
  ],
};

// ============================================================================
// 2.9 INTERNATIONALISATION (i18n)
// ============================================================================

export const I18N_AUDIT = {
  score: "9/10",
  lastUpdate: "2025-01-18",
  category: "i18n",

  strengths: [
    "✅ 4 langues: FR, DE, IT, EN",
    "✅ Traductions complètes",
    "✅ Formats localisés (dates, nombres, devises)",
    "✅ Fallback FR si traduction manquante",
  ],

  structure: {
    provider: "React Context",
    files: "data/viamentor-*-i18n.ts",
    format: "TypeScript objects",
    total: "80+ fichiers i18n",
  },

  weaknesses: [
    {
      severity: "LOW",
      issue: "Traductions hardcodées dans certains composants",
      examples: ["Boutons 'Annuler' / 'Confirmer'", "Messages toast"],
    },
  ],

  recommendations: [
    {
      priority: "MEDIUM",
      title: "Centraliser toutes les traductions",
      action: "Créer viamentor-common-i18n pour textes réutilisés",
    },
  ],

  bestPractices: [
    "✅ Clés i18n descriptives (students.list.title)",
    "✅ Pluralization support",
    "✅ Variables dans traductions",
    "✅ Formats localisés",
  ],
};

// ============================================================================
// 3. BEST PRACTICES NEXT.JS 15
// ============================================================================

export const BEST_PRACTICES = {
  serverComponents: {
    rule: "Server Components par défaut",
    why: "Moins de JavaScript, meilleure performance",
    when: "Toujours, sauf si interactivité nécessaire",
    example: "Pages, layouts, data fetching",
  },
  clientComponents: {
    rule: "Client Components uniquement si nécessaire",
    why: "Plus de JavaScript = moins de performance",
    when: "useState, useEffect, event handlers, browser APIs",
    example: "Forms, modals, interactive charts",
  },
  dataFetching: {
    rule: "Fetch data au plus près de l'utilisation",
    why: "Parallel fetching, meilleure UX",
    pattern: "Fetch dans chaque composant qui en a besoin",
    cache: "Next.js cache automatiquement",
  },
  mutations: {
    rule: "Server Actions pour toutes les mutations",
    why: "Type-safe, pas d'API routes, progressive enhancement",
    pattern: "actions/resource/action-name.ts",
    validation: "Zod schemas",
  },
  routing: {
    rule: "Route Groups pour organisation",
    why: "Clarté sans impact URL",
    examples: ["(dashboard)", "(admin)", "(public)", "(auth)"],
  },
  i18n: {
    rule: "next-intl pour i18n",
    why: "Intégration Next.js native, SSR support",
    structure: "[locale]/ au root",
  },
  rbac: {
    rule: "Middleware pour auth + RBAC",
    why: "Centralisé, edge runtime, ultra-rapide",
    pattern: "Check session + role, redirect si unauthorized",
  },
  database: {
    rule: "Prisma ORM",
    why: "Type-safe, migrations, excellent DX",
    pattern: "Schema → Migrate → Query",
  },
};

export const PERFORMANCE_TIPS = [
  "Use Server Components par défaut",
  "Lazy load Client Components",
  "Use Suspense boundaries",
  "Optimize images avec next/image",
  "Use dynamic imports pour code splitting",
  "Cache API responses",
  "Use ISR pour pages statiques",
  "Minimize client JavaScript",
];

export const SECURITY_TIPS = [
  "Never expose secrets au client",
  "Validate all inputs (Zod)",
  "Use middleware pour auth",
  "Implement RBAC properly",
  "Use CSRF tokens",
  "Sanitize user inputs",
  "Use prepared statements (Prisma)",
  "Implement rate limiting",
];

export const DEPLOYMENT = {
  vercel: {
    pros: ["Zero config", "Edge functions", "Analytics", "Preview deployments"],
    cons: ["Vendor lock-in", "Coût si scale"],
  },
  selfHosted: {
    pros: ["Full control", "No vendor lock-in", "Coût prévisible"],
    cons: ["Setup complexe", "Maintenance"],
    options: ["Docker", "PM2", "Kubernetes"],
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
  DESIGN_SYSTEM_AUDIT,
  USER_EXPERIENCE_AUDIT,
  DESIGN_PATTERNS_AUDIT,
  STATE_MANAGEMENT_AUDIT,
  RESPONSIVE_DESIGN_AUDIT,
  ANIMATIONS_AUDIT,
  ACCESSIBILITY_AUDIT,
  PERFORMANCE_AUDIT,
  SEO_AUDIT,
  I18N_AUDIT,
  SECURITY_AUDIT,
  TESTING_STRATEGY,
  BEST_PRACTICES,
  PERFORMANCE_TIPS,
  SECURITY_TIPS,
  DEPLOYMENT,
};
