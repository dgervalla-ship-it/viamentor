/**
 * VIAMENTOR - No Auth Mode Summary
 * Résumé complet des modifications pour le mode sans authentification
 *
 * @module data/viamentor-no-auth-summary
 * @version 1.0.0
 */

export const NO_AUTH_SUMMARY = {
  version: "1.0.0",
  date: new Date().toISOString(),
  status: "COMPLETED",

  /**
   * Fichiers modifiés
   */
  modifiedFiles: [
    {
      path: "layouts/viamentor-main-layout",
      changes: [
        "Suppression du hook useAuth() avec Supabase",
        "Suppression du hook useTenantValidation() avec Supabase",
        "Ajout du hook useMockUser() avec utilisateur par défaut",
        "Ajout du hook useMockTenant() avec tenant par défaut",
        "Suppression des écrans LoadingScreen et ErrorScreen",
        "Suppression de l'import useSupabaseMock",
        "Suppression de toutes les vérifications d'authentification",
      ],
    },
    {
      path: "prototypes/viamentor-system-prototype",
      changes: [
        "Ajout de l'import ViamentorNoAuthInfoPage",
        "Ajout de la route /no-auth-info",
        "Redirection de / vers /no-auth-info au lieu de /login",
      ],
    },
  ],

  /**
   * Nouveaux fichiers créés
   */
  newFiles: [
    {
      path: "data/viamentor-no-auth-mode-readme",
      description: "Documentation complète du mode sans authentification",
      type: "documentation",
    },
    {
      path: "pages/viamentor-no-auth-info-page",
      description: "Page d'information sur le mode sans authentification",
      type: "page",
    },
    {
      path: "data/viamentor-no-auth-summary",
      description: "Résumé des modifications",
      type: "data",
    },
  ],

  /**
   * Utilisateur mock par défaut
   */
  mockUser: {
    id: "mock-user-school-admin",
    email: "school@viamentor.ch",
    name: "Admin École",
    role: "school_admin",
  },

  /**
   * Tenant mock par défaut
   */
  mockTenant: {
    id: "tenant-mock-1",
    slug: "auto-ecole-geneve",
    name: "Auto-École Genève",
    logo: "https://github.com/polymet-ai.png",
  },

  /**
   * Routes accessibles
   */
  accessibleRoutes: [
    { path: "/", description: "Page d'accueil (redirige vers /no-auth-info)" },
    { path: "/no-auth-info", description: "Information mode sans auth" },
    { path: "/login", description: "Page de login (redirige automatiquement)" },
    { path: "/dashboard", description: "Dashboard École" },
    { path: "/instructor-dashboard", description: "Dashboard Moniteur" },
    { path: "/student-dashboard", description: "Dashboard Élève" },
    { path: "/students", description: "Gestion Élèves" },
    { path: "/students/:id", description: "Détail Élève" },
    { path: "/instructors", description: "Gestion Moniteurs" },
    { path: "/instructors/:id", description: "Détail Moniteur" },
    { path: "/tenants", description: "Gestion Tenants" },
    { path: "/tenants/:id", description: "Détail Tenant" },
    { path: "/finance", description: "Finance Admin" },
    { path: "/finance/invoices", description: "Factures" },
    { path: "/finance/analytics", description: "Analytics Revenus" },
    { path: "/compliance/gdpr", description: "RGPD" },
  ],

  /**
   * Fonctionnalités supprimées
   */
  removedFeatures: [
    "Authentification Supabase",
    "Vérification isAuthenticated",
    "Écrans de login obligatoire",
    "Redirections vers /login",
    "Validation tenant Supabase",
    "Écrans d'erreur tenant",
    "Loading screens pour auth",
  ],

  /**
   * Fonctionnalités ajoutées
   */
  addedFeatures: [
    "Hook useMockUser() avec utilisateur par défaut",
    "Hook useMockTenant() avec tenant par défaut",
    "Accès direct à toutes les pages",
    "Navigation sans friction",
    "Page d'information /no-auth-info",
    "Documentation complète",
  ],

  /**
   * Avantages
   */
  benefits: {
    development: [
      "Accès rapide sans login",
      "Tests simplifiés",
      "Pas de dépendances Supabase",
      "Démo facile",
    ],

    demo: [
      "Navigation libre",
      "Pas de friction",
      "Expérience fluide",
      "Focus sur les fonctionnalités",
    ],
  },

  /**
   * Avertissements
   */
  warnings: [
    "Mode développement uniquement",
    "Ne pas utiliser en production",
    "Réactiver l'authentification pour la production",
    "Ajouter les vérifications de sécurité",
    "Implémenter les permissions RBAC",
  ],

  /**
   * Instructions pour retour à l'authentification
   */
  revertInstructions: [
    "1. Restaurer le hook useAuth() dans layouts/viamentor-main-layout",
    "2. Restaurer la vérification isAuthenticated",
    "3. Restaurer le hook useTenantValidation()",
    "4. Restaurer les écrans LoadingScreen et ErrorScreen",
    "5. Restaurer l'import useSupabaseMock",
    "6. Restaurer la redirection / vers /login",
  ],
};

export default NO_AUTH_SUMMARY;
