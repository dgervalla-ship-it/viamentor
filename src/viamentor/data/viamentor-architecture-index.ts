/**
 * ============================================================================
 * VIAMENTOR - DOCUMENTATION ARCHITECTURE COMPLÈTE
 * ============================================================================
 *
 * INDEX ET NAVIGATION
 *
 * Cette documentation est divisée en 6 parties pour une meilleure lisibilité.
 * Chaque partie couvre un aspect spécifique de l'architecture.
 */

export const DOCUMENTATION_INDEX = {
  part1: {
    file: "@/viamentor/data/viamentor-architecture-01-overview",
    title: "Vue d'ensemble et Contexte",
    topics: [
      "Contexte Viamentor (environnement actuel)",
      "Structure actuelle du projet",
      "Architecture cible Next.js 15",
      "Principes d'architecture Next.js",
      "Avantages de la migration",
      "Plan de migration (vue d'ensemble)",
      "Ressources et documentation",
    ],

    audience: "Tous (Product Owner, Tech Lead, Développeurs)",
    priority: "🔴 Critique - À lire en premier",
  },
  part2: {
    file: "@/viamentor/data/viamentor-architecture-02-nextjs-structure",
    title: "Structure Next.js 15 Détaillée",
    topics: [
      "Arborescence complète du projet",
      "Organisation des dossiers",
      "Conventions de nommage",
      "Route Groups et organisation",
      "Explications détaillées de chaque dossier",
    ],

    audience: "Développeurs, Tech Lead",
    priority: "🟠 Important - Structure du projet",
  },
  part3: {
    file: "@/viamentor/data/viamentor-architecture-03-api-server-actions",
    title: "API Routes et Server Actions",
    topics: [
      "Server Actions (recommandé pour mutations)",
      "API Routes (webhooks, cron, external APIs)",
      "Exemples de code",
      "Quand utiliser quoi",
      "Best practices",
    ],

    audience: "Développeurs Backend/Fullstack",
    priority: "🟠 Important - Data mutations",
  },
  part4: {
    file: "@/viamentor/data/viamentor-architecture-04-middleware-auth",
    title: "Middleware et Authentification",
    topics: [
      "Next.js Middleware",
      "Authentification Supabase",
      "RBAC (Role-Based Access Control)",
      "Multi-tenant routing",
      "i18n routing",
      "Exemples de code",
    ],

    audience: "Développeurs Backend/Fullstack, Security",
    priority: "🔴 Critique - Sécurité",
  },
  part5: {
    file: "@/viamentor/data/viamentor-architecture-05-migration-guide",
    title: "Guide de Migration Viamentor → Next.js",
    topics: [
      "Mapping Viamentor → Next.js",
      "Migration step-by-step",
      "Conversion des pages",
      "Conversion des composants",
      "Conversion des layouts",
      "Migration de la data",
    ],

    audience: "Développeurs (migration team)",
    priority: "🟠 Important - Plan d'action",
  },
  part6: {
    file: "@/viamentor/data/viamentor-architecture-06-best-practices",
    title: "Best Practices et Recommandations",
    topics: [
      "Server vs Client Components",
      "Data fetching patterns",
      "Performance tips",
      "Security tips",
      "Deployment options",
      "Do's and Don'ts",
    ],

    audience: "Tous les développeurs",
    priority: "🟢 Recommandé - Qualité du code",
  },
};

/**
 * RÉSUMÉ EXÉCUTIF (Pour Product Owner / Management)
 */
export const EXECUTIVE_SUMMARY = {
  situation: {
    current: "Prototype Viamentor avec React Router (non production-ready)",
    target: "Application Next.js 15 production-ready",
    reason: "Performance, SEO, scalabilité, maintenabilité",
  },
  timeline: {
    total: "13-19 semaines (3-5 mois)",
    phases: [
      "Préparation: 1-2 semaines",
      "Core Features: 3-4 semaines",
      "Modules Métier: 4-6 semaines",
      "Modules Avancés: 3-4 semaines",
      "Optimisation & Déploiement: 2-3 semaines",
    ],
  },
  benefits: {
    performance: "40-60% moins de JavaScript client, TTFB < 200ms",
    seo: "Contenu indexable immédiatement, meilleur ranking",
    dx: "Hot reload < 100ms, TypeScript first-class",
    security: "Code sensible côté serveur, CSRF protection native",
  },
  risks: {
    low: [
      "Composants déjà compatibles Next.js",
      "Structure claire et documentée",
      "Migration progressive possible",
    ],

    medium: ["Apprentissage App Router pour l'équipe", "Tests E2E à refaire"],
  },
  recommendation: "✅ Migration recommandée - ROI positif",
};

/**
 * QUICK START (Pour développeurs qui démarrent)
 */
export const QUICK_START = {
  step1: {
    title: "Lire la Partie 1 (Overview)",
    why: "Comprendre le contexte et les objectifs",
    duration: "30 minutes",
  },
  step2: {
    title: "Lire la Partie 2 (Structure)",
    why: "Comprendre l'organisation du projet",
    duration: "20 minutes",
  },
  step3: {
    title: "Setup environnement local",
    commands: [
      "npx create-next-app@latest viamentor-nextjs",
      "cd viamentor-nextjs",
      "npm install",
      "npm run dev",
    ],

    duration: "15 minutes",
  },
  step4: {
    title: "Lire les Parties 3-6 selon besoin",
    why: "Approfondir les sujets spécifiques",
    duration: "Variable",
  },
};

/**
 * FAQ
 */
export const FAQ = [
  {
    q: "Pourquoi migrer de Viamentor vers Next.js ?",
    a: "Viamentor est un outil de prototypage, pas une solution de production. Next.js offre performance, SEO, scalabilité et maintenabilité nécessaires pour une application en production.",
  },
  {
    q: "Peut-on garder React Router ?",
    a: "Non. Next.js App Router est incompatible avec React Router. La migration est nécessaire mais les composants sont réutilisables.",
  },
  {
    q: "Combien de temps prendra la migration ?",
    a: "13-19 semaines (3-5 mois) selon la taille de l'équipe et la complexité des fonctionnalités.",
  },
  {
    q: "Les composants actuels sont-ils réutilisables ?",
    a: "Oui ! 90% des composants sont déjà compatibles Next.js. Seuls les pages et routing nécessitent une refonte.",
  },
  {
    q: "Faut-il tout migrer d'un coup ?",
    a: "Non. Migration progressive possible : commencer par les pages simples, puis les modules complexes.",
  },
  {
    q: "Quel est le coût de la migration ?",
    a: "Investissement initial de 3-5 mois, mais ROI positif grâce à la performance, maintenabilité et scalabilité.",
  },
];

/**
 * RESSOURCES EXTERNES
 */
export const EXTERNAL_RESOURCES = {
  nextjs: {
    docs: "https://nextjs.org/docs",
    learn: "https://nextjs.org/learn",
    examples: "https://github.com/vercel/next.js/tree/canary/examples",
  },
  supabase: {
    docs: "https://supabase.com/docs",
    nextjs:
      "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs",
  },
  prisma: {
    docs: "https://www.prisma.io/docs",
    nextjs:
      "https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel",
  },
  i18n: {
    nextIntl: "https://next-intl-docs.vercel.app/",
  },
  deployment: {
    vercel: "https://vercel.com/docs",
    docker: "https://nextjs.org/docs/deployment#docker-image",
  },
};

export default {
  DOCUMENTATION_INDEX,
  EXECUTIVE_SUMMARY,
  QUICK_START,
  FAQ,
  EXTERNAL_RESOURCES,
};
