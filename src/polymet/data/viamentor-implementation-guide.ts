/**
 * ============================================================================
 * VIAMENTOR - IMPLEMENTATION GUIDE
 * ============================================================================
 *
 * Guide complet d'implémentation des recommandations Best Practices
 * Roadmap, priorités, étapes détaillées et métriques de succès
 */

// ============================================================================
// 1. ROADMAP GLOBALE
// ============================================================================

export const roadmap = {
  phase1: {
    title: "Phase 1: Design System Tokens",
    duration: "2 jours",
    priority: "HIGH",
    impact: "+2 points (9/10 → 10/10)",
    tasks: [
      {
        id: "1.1",
        title: "Ajouter variants sémantiques (success, warning, info)",
        duration: "2 heures",
        files: [
          "app/globals.css",
          "tailwind.config.ts",
          "components/ui/badge.tsx",
          "components/ui/alert.tsx",
          "components/ui/button.tsx",
        ],

        steps: [
          "1. Ajouter variables CSS dans globals.css",
          "2. Mettre à jour tailwind.config.ts",
          "3. Créer variants dans composants shadcn/ui",
          "4. Tester en light ET dark mode",
          "5. Valider contraste WCAG AA",
        ],

        reference: "@/polymet/data/viamentor-design-system-tokens",
      },
      {
        id: "1.2",
        title: "Remplacer couleurs hardcodées",
        duration: "4 heures",
        files: ["src/**/*.tsx"],
        steps: [
          "1. Exécuter script migration-colors.sh",
          "2. Vérifier avec git diff",
          "3. Tester toutes les pages",
          "4. Valider en light/dark mode",
        ],

        reference: "@/polymet/data/viamentor-design-system-tokens",
      },
      {
        id: "1.3",
        title: "Créer documentation Storybook",
        duration: "1 jour",
        files: ["stories/**/*.stories.tsx"],
        steps: [
          "1. Installer Storybook 8",
          "2. Créer stories pour tous les composants",
          "3. Documenter variants et props",
          "4. Déployer sur Vercel",
        ],

        reference: "@/polymet/data/viamentor-design-system-tokens",
      },
    ],
  },

  phase2: {
    title: "Phase 2: Optimistic Updates",
    duration: "2 jours",
    priority: "HIGH",
    impact: "+2 points (7/10 → 9/10)",
    tasks: [
      {
        id: "2.1",
        title: "Créer hooks optimistic updates",
        duration: "2 heures",
        files: [
          "data/viamentor-optimistic-updates-hooks.ts",
          "hooks/use-update-student.ts",
          "hooks/use-delete-student.ts",
          "hooks/use-create-student.ts",
        ],

        steps: [
          "1. Créer hooks génériques (useOptimisticUpdate, useOptimisticDelete, useOptimisticCreate)",
          "2. Créer hooks spécifiques pour chaque entité",
          "3. Tester rollback en cas d'erreur",
          "4. Tester undo avec toast",
        ],

        reference: "@/polymet/data/viamentor-optimistic-updates-hooks",
      },
      {
        id: "2.2",
        title: "Migrer toutes les mutations",
        duration: "1 jour",
        files: ["components/**/*.tsx", "pages/**/*.tsx"],
        steps: [
          "1. Identifier toutes les mutations (create, update, delete)",
          "2. Remplacer par hooks optimistic updates",
          "3. Tester chaque mutation",
          "4. Valider UX (0ms latence perçue)",
        ],

        reference: "@/polymet/data/viamentor-optimistic-updates-hooks",
      },
    ],
  },

  phase3: {
    title: "Phase 3: Accessibilité",
    duration: "2 jours",
    priority: "HIGH",
    impact: "+1 point (8/10 → 9/10)",
    tasks: [
      {
        id: "3.1",
        title: "Créer utilitaires accessibilité",
        duration: "2 heures",
        files: [
          "data/viamentor-accessibility-utils.ts",
          "hooks/use-focus-trap.ts",
          "hooks/use-escape-key.ts",
          "hooks/use-aria-announcer.ts",
        ],

        steps: [
          "1. Créer hooks (useFocusTrap, useEscapeKey, useFocusRestoration)",
          "2. Créer composants (AriaAnnouncer, SkipLink)",
          "3. Tester avec screen readers",
        ],

        reference: "@/polymet/data/viamentor-accessibility-utils",
      },
      {
        id: "3.2",
        title: "Corriger contrastes insuffisants",
        duration: "4 heures",
        files: ["app/globals.css", "components/**/*.tsx"],
        steps: [
          "1. Auditer avec Lighthouse",
          "2. Identifier contrastes < 4.5:1",
          "3. Ajuster couleurs",
          "4. Valider avec WebAIM Contrast Checker",
        ],

        reference: "@/polymet/data/viamentor-accessibility-utils",
      },
      {
        id: "3.3",
        title: "Ajouter ARIA labels manquants",
        duration: "4 heures",
        files: ["components/**/*.tsx"],
        steps: [
          "1. Identifier éléments sans labels",
          "2. Ajouter aria-label, aria-labelledby, aria-describedby",
          "3. Tester avec screen readers",
        ],

        reference: "@/polymet/data/viamentor-accessibility-utils",
      },
      {
        id: "3.4",
        title: "Implémenter tests accessibilité",
        duration: "1 jour",
        files: ["tests/accessibility.spec.ts"],
        steps: [
          "1. Installer axe-core et jest-axe",
          "2. Créer tests automatisés",
          "3. Intégrer dans CI/CD",
        ],

        reference: "@/polymet/data/viamentor-accessibility-utils",
      },
    ],
  },

  phase4: {
    title: "Phase 4: Animations",
    duration: "1 jour",
    priority: "MEDIUM",
    impact: "+0.5 point (7/10 → 7.5/10)",
    tasks: [
      {
        id: "4.1",
        title: "Créer tokens animations",
        duration: "2 heures",
        files: ["app/globals.css", "tailwind.config.ts"],
        steps: [
          "1. Ajouter variables CSS (durées, easing)",
          "2. Mettre à jour tailwind.config.ts",
          "3. Implémenter prefers-reduced-motion",
          "4. Tester animations",
        ],

        reference: "@/polymet/data/viamentor-animation-tokens",
      },
      {
        id: "4.2",
        title: "Ajouter micro-interactions",
        duration: "4 heures",
        files: ["components/**/*.tsx"],
        steps: [
          "1. Button press (active:scale-95)",
          "2. Checkbox check (animate-bounce-once)",
          "3. Toast animations (slide-in-from-top)",
          "4. Loading → Content transitions",
        ],

        reference: "@/polymet/data/viamentor-animation-tokens",
      },
    ],
  },

  phase5: {
    title: "Phase 5: Responsive Design",
    duration: "1 jour",
    priority: "MEDIUM",
    impact: "+0.5 point (8/10 → 8.5/10)",
    tasks: [
      {
        id: "5.1",
        title: "Créer composant ResponsiveContainer",
        duration: "2 heures",
        files: [
          "components/viamentor-responsive-container.tsx",
          "hooks/use-media-query.ts",
        ],

        steps: [
          "1. Créer composant wrapper",
          "2. Créer hook useMediaQuery",
          "3. Tester sur mobile/tablette/desktop",
        ],

        reference: "@/components/viamentor-responsive-container",
      },
      {
        id: "5.2",
        title: "Optimiser Planning Calendar mobile",
        duration: "4 heures",
        files: ["components/viamentor-planning-calendar.tsx"],
        steps: [
          "1. Créer vue mobile (jour par jour)",
          "2. Implémenter swipe navigation",
          "3. Touch targets 44x44px",
          "4. Tester sur vrais devices",
        ],

        reference: "@/components/viamentor-responsive-container",
      },
    ],
  },
};

// ============================================================================
// 2. PRIORITÉS
// ============================================================================

export const priorities = {
  critical: {
    title: "CRITICAL (Semaine 1)",
    duration: "5 jours",
    tasks: [
      "Phase 1: Design System Tokens (2 jours)",
      "Phase 2: Optimistic Updates (2 jours)",
      "Phase 3.1-3.2: Accessibilité (1 jour)",
    ],

    impact: "+4 points",
    reason: "Améliore drastiquement UX, cohérence et accessibilité",
  },

  high: {
    title: "HIGH (Semaine 2)",
    duration: "3 jours",
    tasks: [
      "Phase 3.3-3.4: Accessibilité complète (2 jours)",
      "Phase 4: Animations (1 jour)",
    ],

    impact: "+1.5 points",
    reason: "Finalise accessibilité et améliore polish",
  },

  medium: {
    title: "MEDIUM (Semaine 3)",
    duration: "1 jour",
    tasks: ["Phase 5: Responsive Design (1 jour)"],
    impact: "+0.5 point",
    reason: "Améliore UX mobile",
  },
};

// ============================================================================
// 3. MÉTRIQUES DE SUCCÈS
// ============================================================================

export const successMetrics = {
  designSystem: {
    before: {
      score: "9/10",
      colorTokens: 5,
      hardcodedColors: "100+",
      darkModeSupport: "Partiel",
    },
    after: {
      score: "10/10",
      colorTokens: 8,
      hardcodedColors: "0",
      darkModeSupport: "Complet",
    },
    improvement: "+1 point",
  },

  dataFetching: {
    before: {
      score: "7/10",
      perceivedLatency: "500ms",
      userFeedback: "Spinner",
      undo: "Non disponible",
    },
    after: {
      score: "9/10",
      perceivedLatency: "0ms",
      userFeedback: "UI instantanée",
      undo: "Disponible (5s)",
    },
    improvement: "+2 points",
  },

  accessibility: {
    before: {
      score: "8/10",
      wcagLevel: "AA partiel",
      contrastIssues: "15+",
      ariaLabels: "70%",
    },
    after: {
      score: "9/10",
      wcagLevel: "AA complet",
      contrastIssues: "0",
      ariaLabels: "100%",
    },
    improvement: "+1 point",
  },

  animations: {
    before: {
      score: "7/10",
      standardized: "Non",
      reducedMotion: "Non",
      microInteractions: "Peu",
    },
    after: {
      score: "7.5/10",
      standardized: "Oui",
      reducedMotion: "Oui",
      microInteractions: "Complet",
    },
    improvement: "+0.5 point",
  },

  responsive: {
    before: {
      score: "8/10",
      mobileOptimized: "Partiel",
      touchTargets: "Parfois < 44px",
      breakpoints: "Inconsistants",
    },
    after: {
      score: "8.5/10",
      mobileOptimized: "Complet",
      touchTargets: "Toujours >= 44px",
      breakpoints: "Standardisés",
    },
    improvement: "+0.5 point",
  },

  overall: {
    before: {
      designSystem: "9/10",
      ux: "8.5/10",
      dataFetching: "7/10",
      accessibility: "8/10",
      animations: "7/10",
      responsive: "8/10",
      average: "7.9/10",
    },
    after: {
      designSystem: "10/10",
      ux: "9/10",
      dataFetching: "9/10",
      accessibility: "9/10",
      animations: "7.5/10",
      responsive: "8.5/10",
      average: "8.8/10",
    },
    improvement: "+0.9 point",
  },
};

// ============================================================================
// 4. CHECKLIST VALIDATION
// ============================================================================

export const validationChecklist = {
  designSystem: [
    "☐ Variables CSS ajoutées (success, warning, info)",
    "☐ Tailwind config mis à jour",
    "☐ Composants shadcn/ui mis à jour",
    "☐ Migration script exécuté",
    "☐ Testé en light mode",
    "☐ Testé en dark mode",
    "☐ Contraste validé (WCAG AA)",
    "☐ Storybook déployé",
  ],

  optimisticUpdates: [
    "☐ Hooks créés (useOptimisticUpdate, useOptimisticDelete, useOptimisticCreate)",
    "☐ Toutes les mutations migrées",
    "☐ Rollback testé",
    "☐ Undo testé (toast 5s)",
    "☐ Latence perçue = 0ms",
  ],

  accessibility: [
    "☐ Hooks créés (useFocusTrap, useEscapeKey, etc.)",
    "☐ Contrastes corrigés (4.5:1 minimum)",
    "☐ ARIA labels ajoutés (100%)",
    "☐ Focus trap dans modals",
    "☐ Escape ferme overlays",
    "☐ Skip links ajoutés",
    "☐ Tests automatisés (axe-core)",
    "☐ Testé avec NVDA",
    "☐ Testé avec VoiceOver",
  ],

  animations: [
    "☐ Tokens créés (durées, easing)",
    "☐ Prefers-reduced-motion implémenté",
    "☐ Micro-interactions ajoutées",
    "☐ Animations fluides (60fps)",
    "☐ Testé sur mobile/tablette/desktop",
  ],

  responsive: [
    "☐ ResponsiveContainer créé",
    "☐ useMediaQuery créé",
    "☐ Planning Calendar optimisé mobile",
    "☐ Touch targets >= 44px",
    "☐ Testé sur vrais devices",
  ],
};

// ============================================================================
// 5. RESSOURCES
// ============================================================================

export const resources = {
  documentation: [
    {
      title: "Design System Tokens",
      path: "@/polymet/data/viamentor-design-system-tokens",
      description: "Variables CSS, Tailwind config, usage examples",
    },
    {
      title: "Optimistic Updates Hooks",
      path: "@/polymet/data/viamentor-optimistic-updates-hooks",
      description: "Hooks réutilisables pour mutations optimistes",
    },
    {
      title: "Accessibility Utils",
      path: "@/polymet/data/viamentor-accessibility-utils",
      description: "Hooks et composants pour accessibilité",
    },
    {
      title: "Animation Tokens",
      path: "@/polymet/data/viamentor-animation-tokens",
      description: "Tokens standardisés pour animations",
    },
    {
      title: "Responsive Container",
      path: "@/components/viamentor-responsive-container",
      description: "Composant wrapper pour responsive design",
    },
  ],

  tools: [
    "Storybook 8 (documentation composants)",
    "Lighthouse (performance + accessibilité)",
    "axe DevTools (accessibilité)",
    "WebAIM Contrast Checker (contraste)",
    "NVDA / VoiceOver (screen readers)",
    "BrowserStack (tests multi-devices)",
  ],

  externalLinks: [
    "WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/",
    "Tailwind CSS: https://tailwindcss.com/docs",
    "TanStack Query: https://tanstack.com/query/latest",
    "Radix UI: https://www.radix-ui.com/",
    "Framer Motion: https://www.framer.com/motion/",
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
  roadmap,
  priorities,
  successMetrics,
  validationChecklist,
  resources,
};
