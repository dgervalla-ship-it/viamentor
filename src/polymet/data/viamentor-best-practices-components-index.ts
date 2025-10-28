/**
 * VIAMENTOR - Best Practices Components Index
 * Index de tous les composants exemples créés avec best practices
 */

// ============================================================================
// COMPOSANTS CRÉÉS
// ============================================================================

export const BEST_PRACTICES_COMPONENTS = {
  helpTooltip: {
    path: "@/polymet/components/viamentor-help-tooltip",
    description: "Composant réutilisable pour aide contextuelle",
    features: [
      "Tooltip avec contenu riche",
      "Exemples d'utilisation",
      "Lien 'En savoir plus'",
      "Option 'Ne plus afficher'",
      "Tailles configurables (sm, md, lg)",
      "Placements multiples (top, right, bottom, left)",
      "Accessible (ARIA, keyboard)",
    ],

    usage: `import { HelpTooltip } from "@/polymet/components/viamentor-help-tooltip"

<Label>
  Catégorie permis
  <HelpTooltip content="Catégorie B = voiture, A = moto, C = camion" />
</Label>`,
  },

  wizardTemplate: {
    path: "@/polymet/components/viamentor-wizard-template",
    description: "Template réutilisable pour wizards multi-steps",
    features: [
      "Multi-steps avec validation",
      "Barre de progression",
      "Indicateurs d'étapes",
      "Navigation précédent/suivant",
      "Gestion erreurs",
      "État de soumission",
      "Tailles configurables",
      "TypeScript type-safe",
      "Responsive",
      "Accessible",
    ],

    usage: `import { Wizard, WizardStep } from "@/polymet/components/viamentor-wizard-template"

const steps: WizardStep<FormData>[] = [
  {
    id: "step1",
    title: "Étape 1",
    description: "Description",
    component: Step1Component,
    validate: (data) => data.field ? true : "Champ requis",
  },
]

<Wizard
  steps={steps}
  title="Créer un élève"
  open={open}
  onOpenChange={setOpen}
  onComplete={handleComplete}
/>`,
  },

  bulkActions: {
    path: "@/polymet/components/viamentor-bulk-actions",
    description: "Composant pour actions groupées",
    features: [
      "Floating bar en bas de page",
      "Compteur d'éléments sélectionnés",
      "Actions configurables",
      "Variants (default, destructive, secondary)",
      "Animation slide-in",
      "Bouton annuler",
    ],

    usage: `import { BulkActions } from "@/polymet/components/viamentor-bulk-actions"

const actions = [
  {
    id: "export",
    label: "Exporter",
    icon: <DownloadIcon />,
    onClick: () => handleExport(),
  },
  {
    id: "delete",
    label: "Supprimer",
    icon: <TrashIcon />,
    variant: "destructive",
    onClick: () => handleDelete(),
  },
]

<BulkActions
  selectedIds={selectedIds}
  actions={actions}
  onClear={() => setSelectedIds([])}
/>`,
  },

  studentCardExample: {
    path: "@/polymet/components/viamentor-student-card-example",
    description: "Composant exemple avec TOUS les best practices",
    features: [
      "✅ Design System: couleurs sémantiques, spacing, typography",
      "✅ UX: feedback, tooltips, progress bar",
      "✅ Responsive: mobile-first, touch targets",
      "✅ Animations: hover effects, transitions",
      "✅ Accessibility: ARIA, keyboard, contraste",
      "✅ Performance: React.memo, optimized images",
      "✅ i18n: 4 langues, formats localisés",
      "✅ TypeScript: types stricts, type-safe",
    ],

    usage: `import { StudentCard } from "@/polymet/components/viamentor-student-card-example"

<StudentCard
  student={student}
  locale="fr"
  onView={(id) => console.log("View", id)}
  onEdit={(id) => console.log("Edit", id)}
  onDelete={(id) => console.log("Delete", id)}
  onContact={(id, type) => console.log("Contact", id, type)}
/>`,
  },
};

// ============================================================================
// SECTIONS AJOUTÉES AU DOCUMENT D'ARCHITECTURE
// ============================================================================

export const ARCHITECTURE_SECTIONS_ADDED = {
  "2.3": {
    title: "Design Patterns",
    score: "8/10",
    content: [
      "Patterns implémentés: Contextual Navigation, Master-Detail, Progressive Disclosure, Inline Editing, Bulk Actions",
      "Patterns manquants: Optimistic Updates, Undo/Redo, Auto-save, Pagination, Empty States",
      "Recommandations HIGH: Optimistic Updates (2-3j), Undo/Redo (2j)",
      "Recommandations MEDIUM: Auto-save (1-2j), Pagination (2-3j)",
      "Métriques: Perceived speed <100ms, User confidence élevée, Data loss 0%",
    ],
  },

  "2.4": {
    title: "Responsive Design",
    score: "8/10",
    content: [
      "Forces: Breakpoints cohérents, mobile-first, grids responsives",
      "Faiblesses: Certains composants non optimisés mobile",
      "Recommandations: Optimiser Planning Calendar mobile, standardiser breakpoints",
      "Best practices: Touch targets 44x44px, viewport meta tag",
    ],
  },

  "2.5": {
    title: "Animations & Transitions",
    score: "7/10",
    content: [
      "Forces: Animations Radix UI, transitions hover",
      "Faiblesses: Durées non standardisées, animations manquantes",
      "Recommandations: Créer tokens animation, implémenter prefers-reduced-motion",
      "Best practices: Durées 150-300ms, easing naturel",
    ],
  },

  "2.6": {
    title: "Accessibilité (A11Y)",
    score: "8/10",
    content: [
      "Forces: Composants shadcn/ui accessibles, ARIA labels, navigation clavier",
      "Faiblesses: Contraste insuffisant, ARIA labels manquants",
      "Recommandations: Corriger contrastes, ajouter ARIA labels, améliorer navigation clavier",
      "WCAG Level: AA (objectif AAA)",
    ],
  },

  "2.7": {
    title: "Performance",
    score: "7.5/10",
    content: [
      "Métriques Lighthouse et Core Web Vitals",
      "Forces: RSC, code splitting, image optimization",
      "Faiblesses: bundle size, images non optimisées",
      "Recommandations: dynamic imports, WebP/AVIF",
      "Best practices: Server Components, Suspense, memo",
    ],
  },

  "2.8": {
    title: "SEO",
    score: "8/10",
    content: [
      "Forces: Metadata API, semantic HTML, sitemap",
      "Faiblesses: meta descriptions manquantes",
      "Recommandations: ajouter descriptions, structured data",
      "Code examples: metadata, JSON-LD",
    ],
  },

  "2.9": {
    title: "Internationalisation (i18n)",
    score: "9/10",
    content: [
      "4 langues: FR, DE, IT, EN",
      "Traductions complètes (80+ fichiers)",
      "Formats localisés (dates, nombres, devises)",
      "Fallback FR si traduction manquante",
      "Recommandation: centraliser traductions communes",
    ],
  },

  "3.1": {
    title: "State Management",
    score: "6.5/10",
    severity: "HIGH",
    content: [
      "PROBLÈME MAJEUR: Fragmentation 4 systèmes (useState, TanStack Query, Zustand, Context API)",
      "Impact: confusion, duplication, bugs synchronisation, complexité accrue",
      "Stratégie unifiée: TanStack Query (server state), Zustand (global client state), useState (local UI state)",
      "Plan migration: 2-3 semaines, 5 phases",
      "Recommandations CRITICAL: Unifier state management, migrer server data vers TanStack Query",
    ],
  },

  "4": {
    title: "Sécurité",
    score: "7.5/10",
    severity: "CRITICAL",
    content: [
      "OWASP Top 10 Compliance: Partial",
      "Forces: Auth Supabase, RBAC frontend, validation Zod, HTTPS, Prisma ORM",
      "CRITIQUE: Pas de vérification RBAC côté serveur",
      "HIGH: Pas de rate limiting, headers sécurité manquants",
      "MEDIUM: Pas de logging sécurité, pas de 2FA",
      "Recommandations CRITICAL: Implémenter RBAC serveur (1 semaine), rate limiting (2j)",
      "Recommandations HIGH: Headers sécurité (2h), logging (3j)",
    ],
  },

  "5": {
    title: "Testing & Qualité",
    score: "6/10",
    severity: "HIGH",
    content: [
      "Coverage actuel: 0% unit, 0% integration, 0% E2E",
      "Coverage cible: 80% (700+ tests)",
      "Testing Pyramid: 70% unit, 20% integration, 10% E2E",
      "Recommandations CRITICAL: Unit tests (2 semaines), E2E tests (1 semaine)",
      "Recommandations HIGH: Tests accessibilité (2j), CI/CD (2j)",
      "Tools: Vitest, React Testing Library, Playwright, axe-core",
    ],
  },
};

// ============================================================================
// CHECKLIST COMPLÈTE BEST PRACTICES
// ============================================================================

export const BEST_PRACTICES_CHECKLIST = {
  stateManagement: [
    "☐ CRITICAL: Unifier state management (TanStack Query + Zustand)",
    "☐ HIGH: Migrer server data vers TanStack Query",
    "☐ HIGH: Migrer global state vers Zustand",
    "☐ HIGH: Migrer filters vers URL query params",
    "☐ MEDIUM: Supprimer Context API redondants",
    "☐ MEDIUM: Créer documentation state management",
    "☐ LOW: Tests automatiques state management",
  ],

  security: [
    "☐ CRITICAL: Implémenter RBAC côté serveur (1 semaine)",
    "☐ CRITICAL: Implémenter rate limiting (2 jours)",
    "☐ HIGH: Ajouter headers sécurité (2 heures)",
    "☐ HIGH: Implémenter logging sécurité (3 jours)",
    "☐ MEDIUM: Ajouter 2FA (1 semaine)",
    "☐ MEDIUM: Implémenter CAPTCHA (1 jour)",
    "☐ LOW: Audit sécurité régulier",
  ],

  testing: [
    "☐ CRITICAL: Implémenter tests unitaires (2 semaines)",
    "☐ CRITICAL: Implémenter tests E2E (1 semaine)",
    "☐ HIGH: Tests accessibilité (2 jours)",
    "☐ MEDIUM: Visual regression tests (3 jours)",
    "☐ MEDIUM: Setup CI/CD pipeline (2 jours)",
    "☐ LOW: Performance tests",
    "☐ LOW: Load tests",
  ],

  designPatterns: [
    "☐ Optimistic updates: UI instantané sur mutations",
    "☐ Undo/Redo: Toast avec 'Annuler' 5s",
    "☐ Auto-save: Debounce 2s + feedback visuel",
    "☐ Pagination: 20-50 items par page",
    "☐ Empty states: Message + illustration + action",
    "☐ Contextual navigation: Navigation entre entités",
    "☐ Master-detail: Liste + panneau latéral",
    "☐ Progressive disclosure: Tabs, accordions",
    "☐ Inline editing: Click pour éditer",
    "☐ Bulk actions: Sélection multiple + actions groupées",
  ],

  designSystem: [
    "☐ Utiliser couleurs sémantiques (bg-primary, text-success)",
    "☐ Respecter spacing Tailwind (gap-4, p-6)",
    "☐ Hiérarchie typography (h1 > h2 > h3)",
    "☐ Border radius cohérent (rounded-lg)",
    "☐ Shadows pour depth (shadow-lg)",
  ],

  ux: [
    "☐ Feedback visuel (hover, active, disabled states)",
    "☐ Loading states (Skeleton, Spinner)",
    "☐ Error messages clairs avec solutions",
    "☐ Tooltips sur éléments non évidents",
    "☐ Progress indicators pour processus longs",
    "☐ Confirmation pour actions destructives",
  ],

  responsive: [
    "☐ Mobile-first approach",
    "☐ Touch targets 44x44px minimum",
    "☐ Breakpoints cohérents (md:, lg:, xl:)",
    "☐ Truncate long text",
    "☐ Grids responsives (grid-cols-1 md:grid-cols-2)",
  ],

  animations: [
    "☐ Durées courtes (150-300ms)",
    "☐ Easing naturel (ease-out, ease-in-out)",
    "☐ Respecter prefers-reduced-motion",
    "☐ GPU-accelerated (transform, opacity)",
    "☐ Transitions cohérentes",
  ],

  accessibility: [
    "☐ ARIA labels sur boutons icons",
    "☐ Keyboard navigation complète",
    "☐ Focus visible (ring-2 ring-ring)",
    "☐ Contraste WCAG AA (4.5:1 minimum)",
    "☐ Semantic HTML (header, nav, main)",
    "☐ Alt text sur images",
    "☐ Headings hierarchy (h1 > h2 > h3)",
  ],

  performance: [
    "☐ React.memo pour composants lourds",
    "☐ useMemo/useCallback pour calculs",
    "☐ Dynamic imports pour code splitting",
    "☐ next/image pour images",
    "☐ Lazy loading below fold",
    "☐ Virtualization pour longues listes",
  ],

  i18n: [
    "☐ Traductions complètes",
    "☐ Formats localisés (dates, nombres)",
    "☐ Fallback langue par défaut",
    "☐ Clés i18n descriptives",
    "☐ Support pluralization",
  ],

  typescript: [
    "☐ Types stricts (interfaces, types)",
    "☐ Type-safe callbacks",
    "☐ Enums pour constantes",
    "☐ Pas de 'any'",
    "☐ Props interfaces documentées",
  ],
};

// ============================================================================
// RESSOURCES UTILES
// ============================================================================

export const RESOURCES = {
  documentation: [
    {
      name: "ViaMenutor Architecture",
      path: "@/polymet/data/viamentor-architecture-index",
      description: "Documentation complète architecture",
    },
    {
      name: "Design System Audit",
      path: "@/polymet/data/viamentor-architecture-06-best-practices",
      description: "Audit complet UI/UX avec recommandations",
    },
    {
      name: "Security Audit",
      path: "@/polymet/data/viamentor-security-audit",
      description: "Audit sécurité OWASP Top 10",
    },
    {
      name: "Testing Strategy",
      path: "@/polymet/data/viamentor-testing-strategy",
      description: "Stratégie complète de testing",
    },
  ],

  components: [
    {
      name: "shadcn/ui",
      url: "https://ui.shadcn.com/",
      description: "Composants accessibles Radix UI",
    },
    {
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/",
      description: "Utility-first CSS framework",
    },
  ],

  tools: [
    {
      name: "Lighthouse",
      description: "Performance, accessibility, SEO audit",
    },
    {
      name: "axe DevTools",
      description: "Accessibility testing",
    },
    {
      name: "React DevTools",
      description: "Component profiling",
    },
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
  BEST_PRACTICES_COMPONENTS,
  ARCHITECTURE_SECTIONS_ADDED,
  BEST_PRACTICES_CHECKLIST,
  RESOURCES,
};
