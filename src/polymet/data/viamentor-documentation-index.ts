/**
 * VIAMENTOR - Documentation Index
 * Index master de toute la documentation avec liens vers tous les guides
 */

// ============================================================================
// VUE D'ENSEMBLE
// ============================================================================

/**
 * Bienvenue dans la documentation complète de Viamentor !
 *
 * Cette documentation couvre tous les aspects du système:
 * - Architecture et stack technique
 * - Guides de développement
 * - Conventions et standards
 * - Guides utilisateurs
 * - API et références
 *
 * Version: 1.0.0
 * Dernière mise à jour: 2025-01-20
 */

// ============================================================================
// 📚 DOCUMENTATION TECHNIQUE
// ============================================================================

export const TECHNICAL_DOCUMENTATION = {
  // 1. Architecture Overview
  architecture: {
    title: "Architecture Overview",
    file: "@/polymet/data/viamentor-docs-architecture-overview",
    description: "Vue d'ensemble complète de l'architecture système",
    topics: [
      "Stack technique",
      "Structure du projet",
      "Architecture des composants",
      "Gestion de l'état",
      "Routing et navigation",
      "Performance et optimisation",
      "Sécurité",
      "Best practices",
    ],

    priority: "HIGH",
    status: "COMPLETE",
  },

  // 2. Routing & Navigation Guide
  routing: {
    title: "Routing & Navigation Guide",
    file: "@/polymet/data/viamentor-docs-routing-guide",
    description: "Guide complet du système de routing React Router",
    topics: [
      "Vue d'ensemble du routing",
      "Structure des routes",
      "Conventions de nommage",
      "Navigation entre pages",
      "Paramètres et query params",
      "Guards et protection",
      "Troubleshooting",
    ],

    priority: "HIGH",
    status: "COMPLETE",
  },

  // 3. Testing Guide
  testing: {
    title: "Testing Guide",
    file: "@/polymet/data/viamentor-docs-testing-guide",
    description: "Guide complet pour tester pages et composants",
    topics: [
      "Méthodologie de test",
      "Checklist test page",
      "Checklist test composant",
      "Tests visuels",
      "Tests fonctionnels",
      "Tests i18n",
      "Tests responsive",
      "Tests RBAC",
    ],

    priority: "HIGH",
    status: "COMPLETE",
  },

  // 4. Naming Conventions
  naming: {
    title: "Naming Conventions",
    file: "@/polymet/data/viamentor-naming-conventions",
    description: "Standards de nommage complets du projet",
    topics: [
      "Conventions générales",
      "Conventions par type de fichier",
      "Conventions par domaine",
      "Conventions routes",
      "Conventions i18n",
      "Conventions TypeScript",
      "Anti-patterns à éviter",
    ],

    priority: "HIGH",
    status: "COMPLETE",
  },

  // 5. I18n Complete Guide
  i18n: {
    title: "I18n Complete Guide",
    file: "@/polymet/data/viamentor-docs-i18n-complete-guide",
    description: "Guide complet de l'internationalisation",
    topics: [
      "Vue d'ensemble i18n",
      "Langues supportées",
      "Structure des traductions",
      "Namespaces et organisation",
      "Utilisation dans composants",
      "Formatage des données",
      "Pluriels et genres",
      "Best practices",
    ],

    priority: "HIGH",
    status: "COMPLETE",
  },
};

// ============================================================================
// 🎨 DESIGN SYSTEM
// ============================================================================

export const DESIGN_SYSTEM_DOCUMENTATION = {
  // 1. Design System Reference
  reference: {
    title: "Design System Reference",
    file: "@/polymet/data/viamentor-design-system-reference",
    description: "Référence complète du design system",
    topics: [
      "Couleurs et thèmes",
      "Typographie",
      "Spacing et layout",
      "Composants UI",
      "Icônes",
      "Animations",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 2. Design Tokens
  tokens: {
    title: "Design Tokens",
    file: "@/polymet/data/viamentor-design-system-tokens",
    description: "Tokens de design centralisés",
    topics: [
      "Couleurs",
      "Spacing",
      "Typography",
      "Shadows",
      "Borders",
      "Animations",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 3. Theme Configuration
  theme: {
    title: "Theme Configuration",
    file: "@/polymet/data/viamentor-theme-config",
    description: "Configuration du thème UI",
    topics: [
      "Variables CSS",
      "Thèmes prédéfinis",
      "Dark mode",
      "Personnalisation",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },
};

// ============================================================================
// 🔧 GUIDES DE DÉVELOPPEMENT
// ============================================================================

export const DEVELOPMENT_GUIDES = {
  // 1. Validation & Forms
  validation: {
    title: "Validation & Forms Guide",
    file: "@/polymet/data/viamentor-validation-complete-guide",
    description: "Guide complet validation et formulaires",
    topics: [
      "Schémas Zod",
      "React Hook Form",
      "Validation patterns",
      "Error handling",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 2. State Management
  stateManagement: {
    title: "State Management Guide",
    file: "@/polymet/data/viamentor-state-management-migration-guide",
    description: "Guide gestion de l'état",
    topics: [
      "Zustand stores",
      "TanStack Query",
      "Local state",
      "Server state",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "IN_PROGRESS",
  },

  // 3. Responsive & Mobile
  responsive: {
    title: "Responsive & Mobile Guide",
    file: "@/polymet/data/viamentor-mobile-optimization-guide",
    description: "Guide optimisation responsive et mobile",
    topics: [
      "Breakpoints",
      "Touch gestures",
      "Mobile components",
      "Performance mobile",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 4. Security Guide
  security: {
    title: "Security Guide",
    file: "@/polymet/data/viamentor-security-readme",
    description: "Guide sécurité et best practices",
    topics: [
      "Authentication",
      "Authorization RBAC",
      "Input validation",
      "XSS prevention",
      "API security",
    ],

    priority: "HIGH",
    status: "COMPLETE",
  },
};

// ============================================================================
// 📖 GUIDES UTILISATEURS
// ============================================================================

export const USER_GUIDES = {
  // 1. School Admin Guide
  schoolAdmin: {
    title: "Guide Utilisateur School Admin",
    file: "@/polymet/data/viamentor-docs-user-school-admin",
    description: "Guide complet pour administrateurs d'école",
    topics: [
      "Dashboard école",
      "Gestion élèves",
      "Gestion moniteurs",
      "Planning et leçons",
      "Facturation",
      "Analytics",
    ],

    priority: "MEDIUM",
    status: "TODO",
  },

  // 2. Secretary Guide
  secretary: {
    title: "Guide Utilisateur Secretary",
    file: "@/polymet/data/viamentor-docs-user-secretary",
    description: "Guide complet pour secrétaires",
    topics: [
      "Dashboard secrétariat",
      "Inscriptions rapides",
      "Planning",
      "Communications",
      "Tâches",
    ],

    priority: "MEDIUM",
    status: "TODO",
  },

  // 3. Instructor Guide
  instructor: {
    title: "Guide Utilisateur Instructor",
    file: "@/polymet/data/viamentor-docs-user-instructor",
    description: "Guide complet pour moniteurs",
    topics: [
      "Dashboard moniteur",
      "Planning personnel",
      "Gestion élèves",
      "Évaluations",
      "Rattrapages",
    ],

    priority: "MEDIUM",
    status: "TODO",
  },

  // 4. Student Guide
  student: {
    title: "Guide Utilisateur Student",
    file: "@/polymet/data/viamentor-docs-user-student",
    description: "Guide complet pour élèves",
    topics: [
      "Dashboard élève",
      "Réservation leçons",
      "Progression",
      "Facturation",
      "Documents",
    ],

    priority: "MEDIUM",
    status: "TODO",
  },

  // 5. FAQ
  faq: {
    title: "FAQ Complète",
    file: "@/polymet/data/viamentor-docs-faq",
    description: "Questions fréquemment posées",
    topics: [
      "Questions générales",
      "Questions techniques",
      "Questions fonctionnelles",
      "Troubleshooting",
    ],

    priority: "LOW",
    status: "TODO",
  },
};

// ============================================================================
// 🔌 API & RÉFÉRENCES
// ============================================================================

export const API_DOCUMENTATION = {
  // 1. API Endpoints
  endpoints: {
    title: "API Endpoints Reference",
    file: "@/polymet/data/viamentor-docs-api-reference",
    description: "Documentation complète des API endpoints",
    topics: [
      "Authentication",
      "Students",
      "Instructors",
      "Lessons",
      "Invoices",
      "Analytics",
    ],

    priority: "LOW",
    status: "TODO",
  },

  // 2. Validation Schemas
  schemas: {
    title: "Validation Schemas Reference",
    file: "@/polymet/data/viamentor-docs-schemas-reference",
    description: "Documentation des schémas Zod",
    topics: [
      "Student schemas",
      "Instructor schemas",
      "Lesson schemas",
      "Invoice schemas",
      "Custom validators",
    ],

    priority: "LOW",
    status: "TODO",
  },

  // 3. TanStack Query Hooks
  queryHooks: {
    title: "TanStack Query Hooks Reference",
    file: "@/polymet/data/viamentor-docs-query-hooks-reference",
    description: "Documentation des hooks TanStack Query",
    topics: [
      "useStudents",
      "useInstructors",
      "useLessons",
      "useInvoices",
      "Mutations",
    ],

    priority: "LOW",
    status: "TODO",
  },

  // 4. Zustand Stores
  stores: {
    title: "Zustand Stores Reference",
    file: "@/polymet/data/viamentor-docs-stores-reference",
    description: "Documentation des stores Zustand",
    topics: ["useUserStore", "useThemeStore", "useLocaleStore", "useUIStore"],

    priority: "LOW",
    status: "TODO",
  },

  // 5. Usage Examples
  examples: {
    title: "Usage Examples",
    file: "@/polymet/data/viamentor-docs-usage-examples",
    description: "Exemples d'utilisation complets",
    topics: [
      "Créer un élève",
      "Réserver une leçon",
      "Générer une facture",
      "Afficher analytics",
    ],

    priority: "LOW",
    status: "TODO",
  },
};

// ============================================================================
// 👨‍💻 GUIDES DÉVELOPPEURS
// ============================================================================

export const DEVELOPER_GUIDES = {
  // 1. Contribution Guide
  contribution: {
    title: "Contribution Guide",
    file: "@/polymet/data/viamentor-docs-contributing",
    description: "Guide pour contribuer au projet",
    topics: [
      "Setup environnement",
      "Workflow Git",
      "Code review",
      "Standards de code",
      "Pull requests",
    ],

    priority: "LOW",
    status: "COMPLETE",
  },

  // 2. Setup Environment
  setup: {
    title: "Setup Environment Guide",
    file: "@/polymet/data/viamentor-docs-setup-environment",
    description: "Guide installation et configuration",
    topics: [
      "Prérequis",
      "Installation",
      "Configuration",
      "Variables d'environnement",
      "Troubleshooting",
    ],

    priority: "LOW",
    status: "TODO",
  },

  // 3. Debugging Guide
  debugging: {
    title: "Debugging Guide",
    file: "@/polymet/data/viamentor-docs-debugging",
    description: "Guide debugging et troubleshooting",
    topics: [
      "DevTools",
      "React DevTools",
      "Network debugging",
      "Performance profiling",
      "Common issues",
    ],

    priority: "LOW",
    status: "TODO",
  },

  // 4. Performance Guide
  performance: {
    title: "Performance Guide",
    file: "@/polymet/data/viamentor-docs-performance",
    description: "Guide optimisation performance",
    topics: [
      "Code splitting",
      "Lazy loading",
      "Memoization",
      "Bundle optimization",
      "Monitoring",
    ],

    priority: "LOW",
    status: "TODO",
  },

  // 5. Security Guide
  securityDev: {
    title: "Security Guide (Dev)",
    file: "@/polymet/data/viamentor-docs-security-dev",
    description: "Guide sécurité pour développeurs",
    topics: [
      "Input validation",
      "XSS prevention",
      "CSRF protection",
      "API security",
      "Best practices",
    ],

    priority: "LOW",
    status: "TODO",
  },
};

// ============================================================================
// 📊 MODULES FONCTIONNELS
// ============================================================================

export const FUNCTIONAL_MODULES = {
  // 1. Lessons Module
  lessons: {
    title: "Lessons Module Guide",
    file: "@/polymet/data/viamentor-lessons-module-guide",
    description: "Guide complet module leçons",
    topics: [
      "Architecture",
      "Composants",
      "Workflows",
      "Business rules",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 2. Planning Module
  planning: {
    title: "Planning Module Guide",
    file: "@/polymet/data/viamentor-planning-features-guide",
    description: "Guide complet module planning",
    topics: [
      "Calendar views",
      "Drag & drop",
      "Conflicts detection",
      "Export/Print",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 3. Makeups Module
  makeups: {
    title: "Makeups Module Guide",
    file: "@/polymet/data/viamentor-makeups-system-guide",
    description: "Guide complet système rattrapages",
    topics: [
      "Configuration",
      "Crédits",
      "Expiration",
      "Analytics",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },

  // 4. Pixels Monitoring
  pixels: {
    title: "Pixels Monitoring Guide",
    file: "@/polymet/data/viamentor-pixels-monitoring-guide",
    description: "Guide monitoring santé pixels",
    topics: [
      "Configuration",
      "Platforms",
      "Alerts",
      "Diagnostics",
      "Best practices",
    ],

    priority: "MEDIUM",
    status: "COMPLETE",
  },
};

// ============================================================================
// 📝 CHANGELOG & DEPLOYMENT
// ============================================================================

export const PROJECT_MANAGEMENT = {
  // 1. Changelog
  changelog: {
    title: "Changelog",
    file: "@/polymet/data/viamentor-docs-changelog",
    description: "Historique des versions et changements",
    topics: ["Versions", "Features", "Bug fixes", "Breaking changes"],

    priority: "LOW",
    status: "COMPLETE",
  },

  // 2. Deployment Guide
  deployment: {
    title: "Deployment Guide",
    file: "@/polymet/data/viamentor-docs-deployment",
    description: "Guide déploiement et CI/CD",
    topics: ["Environnements", "Build process", "Deployment", "Monitoring"],

    priority: "LOW",
    status: "COMPLETE",
  },
};

// ============================================================================
// 📋 RÉSUMÉ PAR PRIORITÉ
// ============================================================================

export const DOCUMENTATION_SUMMARY = {
  // Priorité HAUTE (Complétée)
  highPriority: {
    total: 5,
    completed: 5,
    percentage: 100,
    items: [
      "Architecture Overview ✅",
      "Routing & Navigation Guide ✅",
      "Testing Guide ✅",
      "Naming Conventions ✅",
      "I18n Complete Guide ✅",
    ],
  },

  // Priorité MOYENNE (En cours)
  mediumPriority: {
    total: 10,
    completed: 7,
    percentage: 70,
    items: [
      "Design System Reference ✅",
      "Design Tokens ✅",
      "Theme Configuration ✅",
      "Validation & Forms Guide ✅",
      "Responsive & Mobile Guide ✅",
      "Security Guide ✅",
      "Lessons Module Guide ✅",
      "Planning Module Guide ✅",
      "Makeups Module Guide ✅",
      "Pixels Monitoring Guide ✅",
      "State Management Guide 🔄",
      "School Admin Guide ⏳",
      "Secretary Guide ⏳",
      "Instructor Guide ⏳",
      "Student Guide ⏳",
    ],
  },

  // Priorité BASSE (À faire)
  lowPriority: {
    total: 15,
    completed: 2,
    percentage: 13,
    items: [
      "Contribution Guide ✅",
      "Changelog ✅",
      "Deployment Guide ✅",
      "FAQ ⏳",
      "API Endpoints Reference ⏳",
      "Validation Schemas Reference ⏳",
      "TanStack Query Hooks Reference ⏳",
      "Zustand Stores Reference ⏳",
      "Usage Examples ⏳",
      "Setup Environment Guide ⏳",
      "Debugging Guide ⏳",
      "Performance Guide ⏳",
      "Security Guide (Dev) ⏳",
    ],
  },

  // Total
  total: {
    total: 30,
    completed: 14,
    percentage: 47,
  },
};

// ============================================================================
// 🎯 PROCHAINES ÉTAPES RECOMMANDÉES
// ============================================================================

export const NEXT_STEPS = {
  // Phase 4: Documentation Utilisateur (Priorité MOYENNE)
  phase4: {
    title: "Phase 4 - Documentation Utilisateur",
    priority: "MEDIUM",
    items: [
      "Créer guide utilisateur School Admin",
      "Créer guide utilisateur Secretary",
      "Créer guide utilisateur Instructor",
      "Créer guide utilisateur Student",
      "Créer FAQ complète",
    ],
  },

  // Phase 5: Documentation API (Priorité BASSE)
  phase5: {
    title: "Phase 5 - Documentation API",
    priority: "LOW",
    items: [
      "Documenter API endpoints",
      "Documenter schémas validation",
      "Documenter hooks TanStack Query",
      "Documenter stores Zustand",
      "Créer exemples d'utilisation",
    ],
  },

  // Phase 6: Guides Développeur (Priorité BASSE)
  phase6: {
    title: "Phase 6 - Guides Développeur",
    priority: "LOW",
    items: [
      "Créer guide setup environnement",
      "Créer guide debugging",
      "Créer guide performance",
      "Créer guide sécurité dev",
    ],
  },
};

// ============================================================================
// 📚 COMMENT UTILISER CETTE DOCUMENTATION
// ============================================================================

export const HOW_TO_USE = `
# Comment utiliser cette documentation

## 1. Pour les développeurs

### Démarrage rapide:
1. Lire "Architecture Overview"
2. Lire "Routing & Navigation Guide"
3. Lire "Naming Conventions"
4. Lire "Testing Guide"

### Développement quotidien:
- Consulter "I18n Complete Guide" pour les traductions
- Consulter "Validation & Forms Guide" pour les formulaires
- Consulter "Design System Reference" pour l'UI

## 2. Pour les utilisateurs

### Guides par rôle:
- School Admin → "Guide Utilisateur School Admin"
- Secretary → "Guide Utilisateur Secretary"
- Instructor → "Guide Utilisateur Instructor"
- Student → "Guide Utilisateur Student"

### Questions fréquentes:
- Consulter "FAQ Complète"

## 3. Pour les contributeurs

### Avant de contribuer:
1. Lire "Contribution Guide"
2. Lire "Setup Environment Guide"
3. Lire "Naming Conventions"
4. Lire "Security Guide"

## 4. Recherche rapide

### Par sujet:
- Architecture → "Architecture Overview"
- Routing → "Routing & Navigation Guide"
- Testing → "Testing Guide"
- I18n → "I18n Complete Guide"
- Design → "Design System Reference"
- Sécurité → "Security Guide"

### Par module:
- Leçons → "Lessons Module Guide"
- Planning → "Planning Module Guide"
- Rattrapages → "Makeups Module Guide"
- Pixels → "Pixels Monitoring Guide"
`;

// ============================================================================
// RESSOURCES
// ============================================================================

export const DOCUMENTATION_RESOURCES = {
  // Documentation interne
  internal: [
    "Tous les guides dans @/polymet/data/viamentor-docs-*",
    "Conventions dans @/polymet/data/viamentor-naming-conventions",
    "Design system dans @/polymet/data/viamentor-design-system-*",
  ],

  // Documentation externe
  external: [
    "React: https://react.dev/",
    "TypeScript: https://www.typescriptlang.org/",
    "Tailwind CSS: https://tailwindcss.com/",
    "Shadcn UI: https://ui.shadcn.com/",
    "React Router: https://reactrouter.com/",
    "TanStack Query: https://tanstack.com/query/",
    "Zustand: https://zustand-demo.pmnd.rs/",
    "Zod: https://zod.dev/",
  ],
};

export const DOCUMENTATION_INDEX_VERSION = "1.0.0";
export const DOCUMENTATION_INDEX_LAST_UPDATE = "2025-01-20";
