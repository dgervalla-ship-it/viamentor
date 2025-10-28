/**
 * VIAMENTOR - Settings Centralization Fix
 * Documentation de la correction de l'incohérence des paramètres
 *
 * Problème résolu: Settings dispersés sans hiérarchie claire
 * Solution: Page centrale /settings avec navigation par sections
 *
 * @module data/viamentor-settings-centralization-fix
 */

// ============================================================================
// PROBLÈME IDENTIFIÉ
// ============================================================================

/**
 * AVANT (settings dispersés):
 *
 * ❌ Mélange de settings globaux et spécifiques à l'école
 * ❌ Pas de hiérarchie claire entre settings système vs école
 * ❌ Navigation confuse pour l'utilisateur
 * ❌ Difficile de savoir où chercher un paramètre
 *
 * Routes dispersées:
 * - /settings/pricing
 * - /settings/notifications
 * - /settings/course-types
 * - /settings/makeups
 * - /settings/reviews
 * - /settings/school ← école
 * - /settings/categories ← école
 * - /settings/integrations ← école
 * - /settings/users ← école
 */

// ============================================================================
// SOLUTION IMPLÉMENTÉE
// ============================================================================

/**
 * APRÈS (settings centralisés):
 *
 * ✅ Page /settings centrale avec navigation par sections
 * ✅ Hiérarchie claire: École / Utilisateurs / Facturation / Marketing / Système
 * ✅ Navigation cohérente et intuitive
 * ✅ Vue d'ensemble centralisée des paramètres
 * ✅ Découverte facile des settings disponibles
 *
 * Architecture finale:
 * - /settings → Hub central avec tabs navigation
 * - /settings/school → Paramètres école (nouveau)
 * - /settings/categories → Catégories permis
 * - /settings/course-types → Types de cours
 * - /settings/pricing → Tarification
 * - /settings/notifications → Notifications
 * - /settings/makeups → Rattrapages
 * - /settings/reviews → Avis Google
 * - /settings/integrations → Intégrations
 * - /settings/users → Gestion utilisateurs
 */

// ============================================================================
// ARCHITECTURE SETTINGS CENTRAL PAGE
// ============================================================================

export interface SettingsArchitecture {
  route: string;
  purpose: string;
  sections: SettingsSection[];
}

export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  items: SettingsItem[];
}

export interface SettingsItem {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "success" | "warning" | "destructive";
  };
}

/**
 * Architecture complète de la page Settings Central
 */
export const SETTINGS_ARCHITECTURE: SettingsArchitecture = {
  route: "/settings",
  purpose: "Hub central pour tous les paramètres de l'auto-école",
  sections: [
    {
      id: "school",
      title: "Paramètres École",
      description: "Configuration générale de votre auto-école",
      items: [
        {
          id: "school-general",
          title: "Informations Générales",
          description: "Nom, adresse, horaires, contact de l'école",
          href: "/settings/school",
        },
        {
          id: "categories",
          title: "Catégories de Permis",
          description:
            "Gérez les catégories de permis proposées (A, B, C, etc.)",
          href: "/settings/categories",
        },
        {
          id: "course-types",
          title: "Types de Cours",
          description: "Configuration des cours théoriques et pratiques",
          href: "/settings/course-types",
        },
        {
          id: "rooms",
          title: "Salles de Formation",
          description: "Gestion des salles pour cours théoriques",
          href: "/rooms",
        },
      ],
    },
    {
      id: "users",
      title: "Gestion Utilisateurs",
      description: "Comptes, rôles et permissions",
      items: [
        {
          id: "users-management",
          title: "Comptes Utilisateurs",
          description:
            "Gérez les comptes moniteurs, secrétaires et administrateurs",
          href: "/settings/users",
        },
        {
          id: "roles",
          title: "Rôles & Permissions",
          description: "Configuration des rôles et droits d'accès RBAC",
          href: "/admin/rbac",
        },
      ],
    },
    {
      id: "billing",
      title: "Facturation & Tarifs",
      description: "Configuration financière et comptable",
      items: [
        {
          id: "pricing",
          title: "Tarification",
          description: "Prix des leçons, forfaits, promotions et TVA",
          href: "/settings/pricing",
        },
        {
          id: "notifications",
          title: "Notifications",
          description: "Templates emails/SMS pour rappels et communications",
          href: "/settings/notifications",
        },
        {
          id: "makeups",
          title: "Rattrapages",
          description: "Configuration du système de crédits de rattrapage",
          href: "/settings/makeups",
        },
      ],
    },
    {
      id: "marketing",
      title: "Marketing & Communication",
      description: "Outils marketing et gestion de la réputation",
      items: [
        {
          id: "reviews",
          title: "Avis Google",
          description: "Configuration Google Business et gestion des avis",
          href: "/settings/reviews",
        },
        {
          id: "campaigns",
          title: "Campagnes Marketing",
          description: "Configuration des campagnes et tracking pixels",
          href: "/staff/marketing/campaigns",
          badge: { text: "Bientôt", variant: "secondary" },
        },
      ],
    },
    {
      id: "system",
      title: "Système & Intégrations",
      description: "Configuration technique et intégrations",
      items: [
        {
          id: "integrations",
          title: "Intégrations",
          description: "Stripe, Twilio, Google Business, webhooks",
          href: "/settings/integrations",
        },
        {
          id: "advanced",
          title: "Paramètres Avancés",
          description: "Configuration technique et API",
          href: "/config",
          badge: { text: "Admin", variant: "warning" },
        },
      ],
    },
  ],
};

/**
 * Routes settings après centralisation
 */
export const SETTINGS_ROUTES = {
  hub: "/settings",
  school: "/settings/school",
  categories: "/settings/categories",
  courseTypes: "/settings/course-types",
  rooms: "/rooms",
  users: "/settings/users",
  roles: "/admin/rbac",
  pricing: "/settings/pricing",
  notifications: "/settings/notifications",
  makeups: "/settings/makeups",
  reviews: "/settings/reviews",
  campaigns: "/staff/marketing/campaigns",
  integrations: "/settings/integrations",
  advanced: "/config",
} as const;

export default SETTINGS_ARCHITECTURE;
