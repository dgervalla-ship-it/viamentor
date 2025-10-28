/**
 * VIAMENTOR - Layout Architecture Documentation
 * Documentation complète du système de layout avec routing multi-tenant
 *
 * @version 1.0.0
 * @author Viamentor Team
 */

export const LAYOUT_ARCHITECTURE_DOC = {
  version: "1.0.0",
  lastUpdated: "2024-01-14",

  /**
   * STRUCTURE DES ROUTES
   */
  routeStructure: {
    description: "Architecture de routing multi-tenant avec i18n",
    pattern: "app/[locale]/[tenant]/...",
    examples: [
      {
        route: "/fr/auto-ecole-geneve/dashboard",
        description:
          "Dashboard école en français pour tenant 'auto-ecole-geneve'",
      },
      {
        route: "/de/fahrschule-zurich/instructor-dashboard",
        description:
          "Dashboard moniteur en allemand pour tenant 'fahrschule-zurich'",
      },
      {
        route: "/it/scuola-guida-lugano/student-dashboard",
        description:
          "Dashboard élève en italien pour tenant 'scuola-guida-lugano'",
      },
    ],

    parameters: {
      locale: {
        type: "string",
        values: ["fr", "de", "it", "en"],
        description: "Langue de l'interface utilisateur",
      },
      tenant: {
        type: "string",
        description: "Slug unique identifiant l'auto-école (tenant)",
        validation: "Doit exister dans la base de données Supabase",
      },
    },
  },

  /**
   * LAYOUT PRINCIPAL
   */
  mainLayout: {
    path: "@/polymet/layouts/viamentor-main-layout",
    description: "Layout racine avec Sidebar + Header + Main content",
    structure: {
      sidebar: {
        component: "@/polymet/components/viamentor-sidebar",
        width: "280px",
        collapsible: true,
        collapsedWidth: "64px",
        features: [
          "Navigation RBAC (role-based access control)",
          "User profile avec status dot",
          "Collapse/expand avec persistence localStorage",
          "Mobile responsive avec Sheet overlay",
          "Badge counts pour notifications",
        ],
      },
      header: {
        component: "@/polymet/components/viamentor-header",
        height: "64px (h-16)",
        position: "sticky top-0",
        features: [
          "Breadcrumb navigation dynamique",
          "Global search avec Combobox",
          "Notifications realtime avec badge count",
          "Messages preview",
          "Quick actions dropdown",
          "Help menu",
          "Language selector",
          "User menu avec theme/status",
        ],
      },
      main: {
        className: "flex-1 overflow-y-auto bg-background p-6",
        features: [
          "ErrorBoundary pour gérer les erreurs de rendu",
          "Suspense pour lazy loading des pages",
          "Scrollable content area",
        ],
      },
    },
  },

  /**
   * AUTHENTIFICATION SUPABASE
   */
  authentication: {
    provider: "Supabase Auth",
    flow: [
      {
        step: 1,
        action: "User accède à une route protégée",
        check: "Layout vérifie l'authentification via Supabase",
      },
      {
        step: 2,
        action: "Si non authentifié",
        redirect: "/login",
      },
      {
        step: 3,
        action: "Si authentifié",
        load: "Charger les données utilisateur et permissions RBAC",
      },
    ],

    implementation: {
      production: `
// En production avec Supabase
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  router.push('/login')
}
      `,
      mock: `
// Version mock pour développement
const useAuth = () => {
  const { user } = useUserStore()
  return { isAuthenticated: !!user, user }
}
      `,
    },
  },

  /**
   * VALIDATION TENANT
   */
  tenantValidation: {
    description: "Validation de l'existence du tenant dans la base de données",
    flow: [
      {
        step: 1,
        action: "Extraire le slug tenant depuis l'URL",
      },
      {
        step: 2,
        action: "Query Supabase pour vérifier l'existence",
        query: "SELECT * FROM tenants WHERE slug = :tenantSlug",
      },
      {
        step: 3,
        action: "Si tenant n'existe pas",
        response: "404 Not Found",
      },
      {
        step: 4,
        action: "Si tenant existe",
        load: "Charger les données du tenant (nom, logo, config)",
      },
    ],

    implementation: {
      production: `
// En production avec Supabase
const { data: tenant, error } = await supabase
  .from('tenants')
  .select('*')
  .eq('slug', tenantSlug)
  .single()

if (error || !tenant) {
  return <NotFoundPage />
}
      `,
      mock: `
// Version mock pour développement
const tenant = {
  id: "tenant-1",
  slug: tenantSlug,
  name: "Auto-École Genève",
  logo: "https://github.com/polymet-ai.png",
}
      `,
    },
  },

  /**
   * RBAC (Role-Based Access Control)
   */
  rbac: {
    description: "Contrôle d'accès basé sur les rôles utilisateur",
    roles: [
      {
        role: "Platform Admin",
        access: [
          "Tous les tenants",
          "Configuration système",
          "Gestion utilisateurs",
        ],

        dashboardRoute: "/dashboard",
      },
      {
        role: "Finance Admin",
        access: ["Finances", "Factures", "Analytics revenus"],
        dashboardRoute: "/dashboard",
      },
      {
        role: "Security Officer",
        access: ["RGPD", "Audit logs", "Consentements"],
        dashboardRoute: "/dashboard",
      },
      {
        role: "School Admin",
        access: ["Élèves", "Moniteurs", "Planning", "Factures"],
        dashboardRoute: "/dashboard",
      },
      {
        role: "Instructor",
        access: ["Mes élèves", "Mon planning", "Mes stats"],
        dashboardRoute: "/instructor-dashboard",
      },
      {
        role: "Student",
        access: [
          "Ma progression",
          "Mes leçons",
          "Mes documents",
          "Mes paiements",
        ],

        dashboardRoute: "/student-dashboard",
      },
    ],

    implementation: `
// Chargement des permissions RBAC
const { data: permissions } = await supabase
  .from('user_permissions')
  .select('*')
  .eq('user_id', user.id)

// Filtrage de la navigation selon le rôle
const navigationConfig = NAVIGATION_BY_ROLE[user.role]
    `,
  },

  /**
   * INTERNATIONALISATION (i18n)
   */
  i18n: {
    description: "Support multi-langues FR/DE/IT/EN",
    implementation: {
      provider: "@/polymet/components/viamentor-locale-provider",
      config: "@/polymet/data/viamentor-i18n-config",
      usage: `
// Utilisation dans les composants
import { useLocale } from '@/polymet/components/viamentor-locale-provider'

const { locale, t } = useLocale()
const text = t('common.welcome') // "Bienvenue" en FR
      `,
    },
    features: [
      "Traductions complètes pour tous les composants",
      "Formatage des nombres selon la locale",
      "Formatage des devises (CHF)",
      "Formatage des dates",
      "Règles grammaticales par langue",
    ],
  },

  /**
   * THEME MANAGEMENT
   */
  themeManagement: {
    description: "Gestion du thème clair/sombre/système",
    provider: "@/polymet/components/viamentor-theme-provider",
    modes: ["light", "dark", "system"],
    persistence: "localStorage",
    implementation: `
// Utilisation du thème
import { useTheme } from '@/polymet/components/viamentor-theme-provider'

const { theme, setTheme } = useTheme()
setTheme('dark') // Passer en mode sombre
    `,
  },

  /**
   * REALTIME FEATURES
   */
  realtimeFeatures: {
    description: "Fonctionnalités temps réel avec WebSocket",
    features: [
      {
        name: "Notifications",
        channel: "user:{userId}:notifications",
        events: ["new_notification", "notification_read"],
      },
      {
        name: "User Status",
        channel: "tenant:{tenantId}:users",
        events: ["user_status_change", "user_online", "user_offline"],
      },
      {
        name: "Lesson Updates",
        channel: "tenant:{tenantId}:lessons",
        events: ["lesson_created", "lesson_updated", "lesson_cancelled"],
      },
    ],

    implementation: {
      production: `
// Supabase Realtime
const channel = supabase
  .channel('user-notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: \`user_id=eq.\${userId}\`
  }, (payload) => {
    // Nouvelle notification reçue
    addNotification(payload.new)
  })
  .subscribe()
      `,
      mock: `
// Mock WebSocket simulation
useEffect(() => {
  const interval = setInterval(() => {
    // Simuler une nouvelle notification toutes les 30s
    addNotification(generateMockNotification())
  }, 30000)
  return () => clearInterval(interval)
}, [])
      `,
    },
  },

  /**
   * PAGES DASHBOARD
   */
  dashboardPages: {
    school: {
      path: "@/polymet/pages/viamentor-dashboard-school-page",
      route: "/dashboard",
      roles: [
        "Platform Admin",
        "Finance Admin",
        "Security Officer",
        "School Admin",
      ],

      features: [
        "KPIs: Élèves actifs, Leçons du jour, Moniteurs disponibles, Examens",
        "Activité récente",
        "Examens à venir",
        "Alertes importantes",
        "Actions rapides",
      ],
    },
    instructor: {
      path: "@/polymet/pages/viamentor-dashboard-instructor-page",
      route: "/instructor-dashboard",
      roles: ["Instructor"],
      features: [
        "Stats: Leçons aujourd'hui/semaine, Élèves actifs, Note moyenne, Taux de réussite",
        "Planning du jour avec détails leçons",
        "Liste élèves assignés avec progression",
        "Avis récents des élèves",
      ],
    },
    student: {
      path: "@/polymet/pages/viamentor-dashboard-student-page",
      route: "/student-dashboard",
      roles: ["Student"],
      features: [
        "Progression globale avec barre de progression",
        "Status examens théorique/pratique",
        "Prochaines leçons planifiées",
        "Progression par thème L-drive",
        "Documents et attestations",
        "Solde et paiements",
      ],
    },
  },

  /**
   * ERROR HANDLING
   */
  errorHandling: {
    errorBoundary: {
      component: "@/polymet/components/viamentor-error-boundary",
      description: "Capture les erreurs de rendu React",
      features: [
        "Affichage d'un message d'erreur élégant",
        "Détails techniques en mode développement",
        "Bouton 'Réessayer' pour reset l'état",
        "Bouton 'Retour à l'accueil'",
      ],
    },
    loadingStates: {
      component: "@/polymet/components/viamentor-loading-page",
      description: "États de chargement avec Suspense",
      usage: [
        "Chargement initial de l'application",
        "Lazy loading des pages",
        "Chargement des données asynchrones",
      ],
    },
  },

  /**
   * BEST PRACTICES
   */
  bestPractices: {
    security: [
      "Toujours vérifier l'authentification côté serveur",
      "Valider les permissions RBAC pour chaque action",
      "Sanitizer les inputs utilisateur",
      "Utiliser HTTPS en production",
      "Implémenter CSRF protection",
    ],

    performance: [
      "Lazy loading des pages avec React.lazy()",
      "Code splitting par route",
      "Memoization des composants lourds",
      "Virtualisation des longues listes",
      "Optimisation des images",
    ],

    accessibility: [
      "Utiliser des labels ARIA appropriés",
      "Support navigation clavier",
      "Contraste de couleurs suffisant",
      "Focus visible sur les éléments interactifs",
      "Textes alternatifs pour les images",
    ],

    seo: [
      "Meta tags appropriés",
      "Sitemap.xml",
      "Robots.txt",
      "Structured data (JSON-LD)",
      "URLs sémantiques",
    ],
  },

  /**
   * DEPLOYMENT
   */
  deployment: {
    environment: {
      development: {
        url: "http://localhost:3000",
        supabase: "Development project",
        features: ["Mock data", "Hot reload", "Debug mode"],
      },
      staging: {
        url: "https://staging.viamentor.ch",
        supabase: "Staging project",
        features: ["Real data", "Testing environment"],
      },
      production: {
        url: "https://app.viamentor.ch",
        supabase: "Production project",
        features: ["Real data", "Monitoring", "Analytics"],
      },
    },
    envVariables: [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "NEXT_PUBLIC_APP_URL",
    ],
  },
};

/**
 * Export types pour TypeScript
 */
export type LayoutArchitectureDoc = typeof LAYOUT_ARCHITECTURE_DOC;
export type RouteStructure = typeof LAYOUT_ARCHITECTURE_DOC.routeStructure;
export type MainLayout = typeof LAYOUT_ARCHITECTURE_DOC.mainLayout;
export type RBACConfig = typeof LAYOUT_ARCHITECTURE_DOC.rbac;

export default LAYOUT_ARCHITECTURE_DOC;
