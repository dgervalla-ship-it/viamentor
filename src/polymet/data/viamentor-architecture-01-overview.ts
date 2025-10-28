/**
 * ============================================================================
 * VIAMENTOR - DOCUMENTATION ARCHITECTURE COMPLÈTE
 * ============================================================================
 *
 * Partie 1/6 : VUE D'ENSEMBLE ET CONTEXTE
 *
 * Cette documentation explique l'architecture actuelle du projet Viamentor,
 * sa structure cible Next.js 15, et le plan de migration complet.
 */

// ============================================================================
// 1. CONTEXTE DU PROJET
// ============================================================================

/**
 * 1.1 Environnement Actuel : Polymet
 *
 * Viamentor est actuellement développé dans l'environnement Polymet,
 * une plateforme de prototypage rapide qui utilise React Router.
 *
 * ⚠️ IMPORTANT : Ce n'est PAS la structure de production finale !
 *
 * Avantages de Polymet :
 * - Prototypage rapide
 * - Itération rapide sur l'UI/UX
 * - Tests utilisateurs précoces
 * - Validation des concepts
 *
 * Limitations :
 * - React Router (non Next.js)
 * - Pas de SSR/SSG
 * - Pas d'API routes intégrées
 * - Pas de Server Actions
 */

export const POLYMET_CONTEXT = {
  purpose: "Prototypage rapide et validation UI/UX",
  router: "React Router v6",
  rendering: "Client-side only (CSR)",
  deployment: "Plateforme Polymet",
  production_ready: false,
  migration_required: true,
} as const;

/**
 * 1.2 Structure Actuelle (Polymet)
 *
 * polymet/
 * ├── components/          # Composants réutilisables (✅ Production-ready)
 * │   ├── viamentor-header
 * │   ├── viamentor-sidebar
 * │   └── ...
 * ├── pages/              # Pages React Router (❌ Nécessite migration)
 * │   ├── viamentor-dashboard-school-page
 * │   ├── viamentor-students-page
 * │   └── ...
 * ├── layouts/            # Layouts (✅ Réutilisables)
 * │   └── viamentor-main-layout
 * ├── data/               # Data, types, i18n (✅ Réutilisables)
 * │   ├── viamentor-students-data
 * │   ├── viamentor-students-i18n
 * │   └── ...
 * └── prototypes/         # Routing React Router (❌ À remplacer)
 *     └── viamentor-system-prototype
 */

export const CURRENT_STRUCTURE = {
  components: {
    count: 150,
    status: "production_ready",
    migration: "Réutilisables directement",
    notes: "Imports absolus @/, compatibles Next.js",
  },
  pages: {
    count: 80,
    status: "needs_migration",
    migration: "Conversion en Server/Client Components",
    notes: "Structure à adapter pour App Router",
  },
  layouts: {
    count: 1,
    status: "needs_adaptation",
    migration: "Conversion en Layout Next.js",
    notes: "Ajouter metadata, loading, error handling",
  },
  data: {
    count: 100,
    status: "production_ready",
    migration: "Réutilisables directement",
    notes: "Types TypeScript, i18n, mock data",
  },
  prototypes: {
    count: 1,
    status: "to_replace",
    migration: "Remplacer par App Router",
    notes: "Routing à recréer dans app/",
  },
} as const;

/**
 * 1.3 Architecture Cible : Next.js 15
 *
 * Pourquoi Next.js 15 ?
 * - ✅ App Router stable et performant
 * - ✅ Server Components par défaut
 * - ✅ Server Actions intégrées
 * - ✅ Streaming SSR
 * - ✅ Route Handlers (API routes)
 * - ✅ Middleware puissant
 * - ✅ i18n routing natif
 * - ✅ Optimisations images/fonts
 * - ✅ Turbopack (dev ultra-rapide)
 */

export const TARGET_ARCHITECTURE = {
  framework: "Next.js 15",
  router: "App Router",
  rendering: "Server Components + Client Components",
  styling: "Tailwind CSS + Shadcn UI",
  state: "Zustand (client) + Server State (server)",
  data_fetching: "Server Components + Server Actions",
  api: "Route Handlers + Server Actions",
  auth: "Supabase Auth + Middleware",
  database: "Supabase (PostgreSQL) + Prisma ORM",
  i18n: "next-intl",
  deployment: "Vercel / Self-hosted",
} as const;

/**
 * 1.4 Principes d'Architecture Next.js 15
 *
 * 1. Server Components par défaut
 *    - Toutes les pages sont Server Components sauf indication contraire
 *    - Utiliser 'use client' uniquement quand nécessaire
 *
 * 2. Colocation
 *    - Composants près de leur utilisation
 *    - Fichiers privés avec underscore _component.tsx
 *
 * 3. Route Groups
 *    - Organisation logique sans impact sur l'URL
 *    - (auth), (dashboard), (admin), etc.
 *
 * 4. Parallel Routes
 *    - Slots @modal, @sidebar pour UI complexes
 *
 * 5. Intercepting Routes
 *    - Modals avec navigation préservée
 */

export const NEXTJS_PRINCIPLES = {
  server_first: "Server Components par défaut",
  client_minimal: "Client Components uniquement si nécessaire",
  colocation: "Composants près de leur utilisation",
  route_groups: "Organisation logique avec ()",
  parallel_routes: "Slots @ pour UI complexes",
  intercepting: "Modals avec (.) (..) (..)(..) (...)",
  streaming: "Suspense boundaries pour loading states",
  error_handling: "error.tsx et not-found.tsx par route",
} as const;

/**
 * 1.5 Avantages de la Migration
 *
 * Performance :
 * - ⚡ Server Components = moins de JavaScript client
 * - ⚡ Streaming SSR = TTFB ultra-rapide
 * - ⚡ Automatic code splitting
 * - ⚡ Image optimization
 *
 * SEO :
 * - 🔍 SSR/SSG natif
 * - 🔍 Metadata API
 * - 🔍 Sitemap/robots.txt automatiques
 *
 * DX (Developer Experience) :
 * - 🛠️ TypeScript first-class
 * - 🛠️ Hot reload ultra-rapide (Turbopack)
 * - 🛠️ Server Actions = pas besoin d'API routes
 * - 🛠️ Middleware puissant
 *
 * Sécurité :
 * - 🔐 Server Components = code sensible côté serveur
 * - 🔐 Middleware pour auth/RBAC
 * - 🔐 CSRF protection native
 */

export const MIGRATION_BENEFITS = {
  performance: {
    server_components: "Réduction 40-60% JavaScript client",
    streaming_ssr: "TTFB < 200ms",
    code_splitting: "Automatic par route",
    images: "Optimization automatique WebP/AVIF",
  },
  seo: {
    ssr_ssg: "Contenu indexable immédiatement",
    metadata: "Meta tags dynamiques par page",
    sitemap: "Génération automatique",
  },
  dx: {
    typescript: "Support natif excellent",
    hot_reload: "< 100ms avec Turbopack",
    server_actions: "Pas besoin d'API routes pour mutations",
    middleware: "Auth/i18n/RBAC centralisés",
  },
  security: {
    server_code: "Secrets jamais exposés au client",
    middleware: "Protection routes centralisée",
    csrf: "Protection native",
  },
} as const;

/**
 * 1.6 Plan de Migration (Vue d'ensemble)
 *
 * Phase 1 : Préparation (1-2 semaines)
 * - Setup projet Next.js 15
 * - Configuration Supabase + Prisma
 * - Migration composants réutilisables
 * - Setup i18n (next-intl)
 *
 * Phase 2 : Core Features (3-4 semaines)
 * - Auth + Middleware
 * - Layouts principaux
 * - Pages publiques
 * - Dashboards par rôle
 *
 * Phase 3 : Modules Métier (4-6 semaines)
 * - Gestion élèves
 * - Gestion moniteurs
 * - Planning/Leçons
 * - Facturation
 *
 * Phase 4 : Modules Avancés (3-4 semaines)
 * - Analytics
 * - GDPR
 * - Multi-tenant
 * - Admin tools
 *
 * Phase 5 : Optimisation & Déploiement (2-3 semaines)
 * - Performance tuning
 * - SEO optimization
 * - Tests E2E
 * - Déploiement production
 *
 * Total : 13-19 semaines (3-5 mois)
 */

export const MIGRATION_PHASES = {
  phase_1: {
    name: "Préparation",
    duration: "1-2 semaines",
    tasks: [
      "Setup Next.js 15 + TypeScript",
      "Configuration Supabase + Prisma",
      "Migration composants UI",
      "Setup i18n (next-intl)",
      "Configuration Tailwind + Shadcn",
    ],
  },
  phase_2: {
    name: "Core Features",
    duration: "3-4 semaines",
    tasks: [
      "Auth + Middleware RBAC",
      "Layouts principaux",
      "Pages publiques (contact, etc.)",
      "Dashboards par rôle",
      "Navigation + Header + Sidebar",
    ],
  },
  phase_3: {
    name: "Modules Métier",
    duration: "4-6 semaines",
    tasks: [
      "Gestion élèves (CRUD + détails)",
      "Gestion moniteurs (CRUD + détails)",
      "Planning + Leçons",
      "Facturation + Paiements",
      "Véhicules",
    ],
  },
  phase_4: {
    name: "Modules Avancés",
    duration: "3-4 semaines",
    tasks: [
      "Analytics (revenus, performance, etc.)",
      "GDPR + Consentements",
      "Multi-tenant",
      "Admin tools (Super Admin, Platform Admin)",
    ],
  },
  phase_5: {
    name: "Optimisation & Déploiement",
    duration: "2-3 semaines",
    tasks: [
      "Performance tuning",
      "SEO optimization",
      "Tests E2E (Playwright)",
      "CI/CD setup",
      "Déploiement production",
    ],
  },
} as const;

/**
 * 1.7 Ressources et Documentation
 */

export const RESOURCES = {
  nextjs: {
    docs: "https://nextjs.org/docs",
    app_router: "https://nextjs.org/docs/app",
    server_components:
      "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
    server_actions:
      "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
  },
  supabase: {
    docs: "https://supabase.com/docs",
    auth: "https://supabase.com/docs/guides/auth",
    nextjs:
      "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs",
  },
  prisma: {
    docs: "https://www.prisma.io/docs",
    nextjs:
      "https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel",
  },
  i18n: {
    next_intl: "https://next-intl-docs.vercel.app/",
  },
} as const;

export default {
  POLYMET_CONTEXT,
  CURRENT_STRUCTURE,
  TARGET_ARCHITECTURE,
  NEXTJS_PRINCIPLES,
  MIGRATION_BENEFITS,
  MIGRATION_PHASES,
  RESOURCES,
};
