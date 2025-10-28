/**
 * VIAMENTOR - Super Admin Quick Actions
 * Configuration des actions rapides pour Super Admin
 *
 * FEATURES:
 * - Actions système critiques
 * - Monitoring et alertes
 * - Gestion tenants
 * - Configuration plateforme
 * - Analytics et rapports
 */

import { type QuickAction } from "@/viamentor/components/viamentor-quick-actions-grid";

// ============================================================================
// TYPES
// ============================================================================

export type SuperAdminLocale = "fr" | "de" | "it" | "en";

export interface QuickActionsConfig {
  critical: QuickAction[];
  management: QuickAction[];
  monitoring: QuickAction[];
  configuration: QuickAction[];
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    // Actions critiques
    createTenant: "Créer tenant",
    createTenantDesc: "Nouveau client",
    systemHealth: "Santé système",
    systemHealthDesc: "Monitoring",
    securityAlerts: "Alertes sécurité",
    securityAlertsDesc: "Incidents actifs",
    backupNow: "Backup maintenant",
    backupNowDesc: "Sauvegarde manuelle",

    // Gestion
    manageTenants: "Gérer tenants",
    manageTenantsDesc: "247 actifs",
    globalUsers: "Utilisateurs",
    globalUsersDesc: "3,842 total",
    billingOverview: "Facturation",
    billingOverviewDesc: "CHF 156K MRR",
    auditLogs: "Logs audit",
    auditLogsDesc: "Traçabilité",

    // Monitoring
    apiMetrics: "Métriques API",
    apiMetricsDesc: "2.8M appels",
    databaseStatus: "Base de données",
    databaseStatusDesc: "Performance",
    storageUsage: "Stockage",
    storageUsageDesc: "847GB / 2TB",
    errorTracking: "Suivi erreurs",
    errorTrackingDesc: "Incidents",

    // Configuration
    systemConfig: "Config système",
    systemConfigDesc: "Paramètres",
    featureFlags: "Feature flags",
    featureFlagsDesc: "Activation",
    emailTemplates: "Templates email",
    emailTemplatesDesc: "Communications",
    integrations: "Intégrations",
    integrationsDesc: "APIs externes",

    // Sections
    criticalActions: "Actions critiques",
    tenantManagement: "Gestion tenants",
    systemMonitoring: "Monitoring système",
    platformConfig: "Configuration plateforme",
  },
  de: {
    createTenant: "Tenant erstellen",
    createTenantDesc: "Neuer Kunde",
    systemHealth: "Systemzustand",
    systemHealthDesc: "Überwachung",
    securityAlerts: "Sicherheitswarnungen",
    securityAlertsDesc: "Aktive Vorfälle",
    backupNow: "Jetzt sichern",
    backupNowDesc: "Manuelle Sicherung",

    manageTenants: "Tenants verwalten",
    manageTenantsDesc: "247 aktiv",
    globalUsers: "Benutzer",
    globalUsersDesc: "3'842 gesamt",
    billingOverview: "Abrechnung",
    billingOverviewDesc: "CHF 156K MRR",
    auditLogs: "Audit-Logs",
    auditLogsDesc: "Nachverfolgbarkeit",

    apiMetrics: "API-Metriken",
    apiMetricsDesc: "2.8M Aufrufe",
    databaseStatus: "Datenbank",
    databaseStatusDesc: "Leistung",
    storageUsage: "Speicher",
    storageUsageDesc: "847GB / 2TB",
    errorTracking: "Fehlerverfolgung",
    errorTrackingDesc: "Vorfälle",

    systemConfig: "Systemkonfiguration",
    systemConfigDesc: "Einstellungen",
    featureFlags: "Feature-Flags",
    featureFlagsDesc: "Aktivierung",
    emailTemplates: "E-Mail-Vorlagen",
    emailTemplatesDesc: "Kommunikation",
    integrations: "Integrationen",
    integrationsDesc: "Externe APIs",

    criticalActions: "Kritische Aktionen",
    tenantManagement: "Tenant-Verwaltung",
    systemMonitoring: "Systemüberwachung",
    platformConfig: "Plattformkonfiguration",
  },
  it: {
    createTenant: "Crea tenant",
    createTenantDesc: "Nuovo cliente",
    systemHealth: "Salute sistema",
    systemHealthDesc: "Monitoraggio",
    securityAlerts: "Avvisi sicurezza",
    securityAlertsDesc: "Incidenti attivi",
    backupNow: "Backup ora",
    backupNowDesc: "Backup manuale",

    manageTenants: "Gestisci tenant",
    manageTenantsDesc: "247 attivi",
    globalUsers: "Utenti",
    globalUsersDesc: "3'842 totale",
    billingOverview: "Fatturazione",
    billingOverviewDesc: "CHF 156K MRR",
    auditLogs: "Log audit",
    auditLogsDesc: "Tracciabilità",

    apiMetrics: "Metriche API",
    apiMetricsDesc: "2.8M chiamate",
    databaseStatus: "Database",
    databaseStatusDesc: "Prestazioni",
    storageUsage: "Archiviazione",
    storageUsageDesc: "847GB / 2TB",
    errorTracking: "Tracciamento errori",
    errorTrackingDesc: "Incidenti",

    systemConfig: "Config sistema",
    systemConfigDesc: "Parametri",
    featureFlags: "Feature flag",
    featureFlagsDesc: "Attivazione",
    emailTemplates: "Template email",
    emailTemplatesDesc: "Comunicazioni",
    integrations: "Integrazioni",
    integrationsDesc: "API esterne",

    criticalActions: "Azioni critiche",
    tenantManagement: "Gestione tenant",
    systemMonitoring: "Monitoraggio sistema",
    platformConfig: "Configurazione piattaforma",
  },
  en: {
    createTenant: "Create tenant",
    createTenantDesc: "New customer",
    systemHealth: "System health",
    systemHealthDesc: "Monitoring",
    securityAlerts: "Security alerts",
    securityAlertsDesc: "Active incidents",
    backupNow: "Backup now",
    backupNowDesc: "Manual backup",

    manageTenants: "Manage tenants",
    manageTenantsDesc: "247 active",
    globalUsers: "Users",
    globalUsersDesc: "3,842 total",
    billingOverview: "Billing",
    billingOverviewDesc: "CHF 156K MRR",
    auditLogs: "Audit logs",
    auditLogsDesc: "Traceability",

    apiMetrics: "API metrics",
    apiMetricsDesc: "2.8M calls",
    databaseStatus: "Database",
    databaseStatusDesc: "Performance",
    storageUsage: "Storage",
    storageUsageDesc: "847GB / 2TB",
    errorTracking: "Error tracking",
    errorTrackingDesc: "Incidents",

    systemConfig: "System config",
    systemConfigDesc: "Settings",
    featureFlags: "Feature flags",
    featureFlagsDesc: "Activation",
    emailTemplates: "Email templates",
    emailTemplatesDesc: "Communications",
    integrations: "Integrations",
    integrationsDesc: "External APIs",

    criticalActions: "Critical actions",
    tenantManagement: "Tenant management",
    systemMonitoring: "System monitoring",
    platformConfig: "Platform configuration",
  },
};

// ============================================================================
// QUICK ACTIONS CONFIGURATION
// ============================================================================

export function getSuperAdminQuickActions(
  locale: SuperAdminLocale = "fr"
): QuickActionsConfig {
  const t = translations[locale];

  return {
    // Actions critiques
    critical: [
      {
        id: "create-tenant",
        label: t.createTenant,
        description: t.createTenantDesc,
        icon: "Plus",
        href: "/tenants/new",
        color: "primary",
      },
      {
        id: "system-health",
        label: t.systemHealth,
        description: t.systemHealthDesc,
        icon: "Activity",
        href: "/system/health",
        color: "success",
      },
      {
        id: "security-alerts",
        label: t.securityAlerts,
        description: t.securityAlertsDesc,
        icon: "AlertTriangle",
        href: "/security/alerts",
        badge: 3,
        color: "danger",
      },
      {
        id: "backup-now",
        label: t.backupNow,
        description: t.backupNowDesc,
        icon: "Database",
        onClick: () => console.log("Backup triggered"),
        color: "warning",
      },
    ],

    // Gestion tenants
    management: [
      {
        id: "manage-tenants",
        label: t.manageTenants,
        description: t.manageTenantsDesc,
        icon: "Building2",
        href: "/tenants",
      },
      {
        id: "global-users",
        label: t.globalUsers,
        description: t.globalUsersDesc,
        icon: "Users",
        href: "/users",
      },
      {
        id: "billing-overview",
        label: t.billingOverview,
        description: t.billingOverviewDesc,
        icon: "DollarSign",
        href: "/billing",
      },
      {
        id: "audit-logs",
        label: t.auditLogs,
        description: t.auditLogsDesc,
        icon: "FileBarChart",
        href: "/audit",
      },
    ],

    // Monitoring système
    monitoring: [
      {
        id: "api-metrics",
        label: t.apiMetrics,
        description: t.apiMetricsDesc,
        icon: "TrendingUp",
        href: "/monitoring/api",
      },
      {
        id: "database-status",
        label: t.databaseStatus,
        description: t.databaseStatusDesc,
        icon: "Database",
        href: "/monitoring/database",
      },
      {
        id: "storage-usage",
        label: t.storageUsage,
        description: t.storageUsageDesc,
        icon: "Server",
        href: "/monitoring/storage",
        badge: "85%",
        color: "warning",
      },
      {
        id: "error-tracking",
        label: t.errorTracking,
        description: t.errorTrackingDesc,
        icon: "AlertTriangle",
        href: "/monitoring/errors",
        badge: 12,
        color: "danger",
      },
    ],

    // Configuration plateforme
    configuration: [
      {
        id: "system-config",
        label: t.systemConfig,
        description: t.systemConfigDesc,
        icon: "Settings",
        href: "/config",
      },
      {
        id: "feature-flags",
        label: t.featureFlags,
        description: t.featureFlagsDesc,
        icon: "Zap",
        href: "/config/features",
      },
      {
        id: "email-templates",
        label: t.emailTemplates,
        description: t.emailTemplatesDesc,
        icon: "Mail",
        href: "/config/emails",
      },
      {
        id: "integrations",
        label: t.integrations,
        description: t.integrationsDesc,
        icon: "Globe",
        href: "/config/integrations",
      },
    ],
  };
}

// ============================================================================
// SECTION TITLES
// ============================================================================

export function getSectionTitles(locale: SuperAdminLocale = "fr") {
  const t = translations[locale];
  return {
    critical: t.criticalActions,
    management: t.tenantManagement,
    monitoring: t.systemMonitoring,
    configuration: t.platformConfig,
  };
}

export default {
  getSuperAdminQuickActions,
  getSectionTitles,
};
