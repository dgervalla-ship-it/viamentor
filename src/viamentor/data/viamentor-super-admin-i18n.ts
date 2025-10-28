/**
 * VIAMENTOR - Super Admin i18n
 * Traductions FR/DE/IT/EN pour dashboard Super Admin
 */

export type SuperAdminLocale = "fr" | "de" | "it" | "en";

export interface SuperAdminTranslations {
  page: {
    title: string;
    description: string;
  };

  stats: {
    totalTenants: string;
    activeTenants: string;
    totalUsers: string;
    activeUsers: string;
    totalRevenue: string;
    monthlyRevenue: string;
    systemHealth: string;
    uptime: string;
    apiCalls: string;
    storageUsed: string;
    storageLimit: string;
  };

  health: {
    healthy: string;
    warning: string;
    critical: string;
  };

  tenants: {
    title: string;
    name: string;
    plan: string;
    status: string;
    users: string;
    students: string;
    revenue: string;
    lastActivity: string;
    health: string;
    viewDetails: string;
    suspend: string;
    activate: string;
  };

  plans: {
    starter: string;
    professional: string;
    enterprise: string;
  };

  tenantStatus: {
    active: string;
    suspended: string;
    trial: string;
    cancelled: string;
  };

  activity: {
    title: string;
    recentActivity: string;
    type: string;
    description: string;
    severity: string;
    timestamp: string;
    viewAll: string;
  };

  activityTypes: {
    tenant_created: string;
    tenant_suspended: string;
    payment_received: string;
    system_alert: string;
    security_event: string;
  };

  severity: {
    info: string;
    warning: string;
    error: string;
    critical: string;
  };

  security: {
    title: string;
    alerts: string;
    type: string;
    description: string;
    status: string;
    resolvedBy: string;
    investigate: string;
    resolve: string;
    dismiss: string;
  };

  securityTypes: {
    failed_login: string;
    suspicious_activity: string;
    data_breach_attempt: string;
    permission_escalation: string;
  };

  securityStatus: {
    open: string;
    investigating: string;
    resolved: string;
    false_positive: string;
  };

  logs: {
    title: string;
    systemLogs: string;
    level: string;
    service: string;
    message: string;
    timestamp: string;
    viewDetails: string;
    export: string;
  };

  logLevels: {
    debug: string;
    info: string;
    warn: string;
    error: string;
    fatal: string;
  };

  metrics: {
    title: string;
    revenue: string;
    usage: string;
    mrr: string;
    arr: string;
    newRevenue: string;
    churnRevenue: string;
    apiCalls: string;
    storage: string;
    activeUsers: string;
    activeTenants: string;
  };

  actions: {
    refresh: string;
    export: string;
    configure: string;
    viewAll: string;
    filter: string;
    search: string;
  };

  tabs: {
    overview: string;
    tenants: string;
    activity: string;
    security: string;
    logs: string;
    metrics: string;
    settings: string;
  };
}

// ============================================================================
// TRADUCTIONS FR
// ============================================================================

const fr: SuperAdminTranslations = {
  page: {
    title: "Dashboard Super Administrateur",
    description: "Vue d'ensemble complète de la plateforme Viamentor",
  },

  stats: {
    totalTenants: "Total Tenants",
    activeTenants: "Tenants Actifs",
    totalUsers: "Total Utilisateurs",
    activeUsers: "Utilisateurs Actifs",
    totalRevenue: "Revenu Total",
    monthlyRevenue: "Revenu Mensuel",
    systemHealth: "Santé Système",
    uptime: "Disponibilité",
    apiCalls: "Appels API",
    storageUsed: "Stockage Utilisé",
    storageLimit: "Limite Stockage",
  },

  health: {
    healthy: "Sain",
    warning: "Attention",
    critical: "Critique",
  },

  tenants: {
    title: "Gestion Tenants",
    name: "Nom",
    plan: "Plan",
    status: "Statut",
    users: "Utilisateurs",
    students: "Élèves",
    revenue: "Revenu",
    lastActivity: "Dernière Activité",
    health: "Santé",
    viewDetails: "Voir Détails",
    suspend: "Suspendre",
    activate: "Activer",
  },

  plans: {
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  },

  tenantStatus: {
    active: "Actif",
    suspended: "Suspendu",
    trial: "Essai",
    cancelled: "Annulé",
  },

  activity: {
    title: "Activité Plateforme",
    recentActivity: "Activité Récente",
    type: "Type",
    description: "Description",
    severity: "Sévérité",
    timestamp: "Horodatage",
    viewAll: "Voir Tout",
  },

  activityTypes: {
    tenant_created: "Tenant Créé",
    tenant_suspended: "Tenant Suspendu",
    payment_received: "Paiement Reçu",
    system_alert: "Alerte Système",
    security_event: "Événement Sécurité",
  },

  severity: {
    info: "Info",
    warning: "Attention",
    error: "Erreur",
    critical: "Critique",
  },

  security: {
    title: "Sécurité",
    alerts: "Alertes Sécurité",
    type: "Type",
    description: "Description",
    status: "Statut",
    resolvedBy: "Résolu Par",
    investigate: "Enquêter",
    resolve: "Résoudre",
    dismiss: "Ignorer",
  },

  securityTypes: {
    failed_login: "Échec Connexion",
    suspicious_activity: "Activité Suspecte",
    data_breach_attempt: "Tentative Violation Données",
    permission_escalation: "Escalade Permissions",
  },

  securityStatus: {
    open: "Ouvert",
    investigating: "En Investigation",
    resolved: "Résolu",
    false_positive: "Faux Positif",
  },

  logs: {
    title: "Logs Système",
    systemLogs: "Logs Système",
    level: "Niveau",
    service: "Service",
    message: "Message",
    timestamp: "Horodatage",
    viewDetails: "Voir Détails",
    export: "Exporter",
  },

  logLevels: {
    debug: "Debug",
    info: "Info",
    warn: "Attention",
    error: "Erreur",
    fatal: "Fatal",
  },

  metrics: {
    title: "Métriques",
    revenue: "Revenus",
    usage: "Utilisation",
    mrr: "MRR",
    arr: "ARR",
    newRevenue: "Nouveaux Revenus",
    churnRevenue: "Revenus Perdus",
    apiCalls: "Appels API",
    storage: "Stockage",
    activeUsers: "Utilisateurs Actifs",
    activeTenants: "Tenants Actifs",
  },

  actions: {
    refresh: "Actualiser",
    export: "Exporter",
    configure: "Configurer",
    viewAll: "Voir Tout",
    filter: "Filtrer",
    search: "Rechercher",
  },

  tabs: {
    overview: "Vue d'ensemble",
    tenants: "Tenants",
    activity: "Activité",
    security: "Sécurité",
    logs: "Logs",
    metrics: "Métriques",
    settings: "Paramètres",
  },
};

// ============================================================================
// TRADUCTIONS DE
// ============================================================================

const de: SuperAdminTranslations = {
  page: {
    title: "Super Administrator Dashboard",
    description: "Vollständige Übersicht der Viamentor Plattform",
  },

  stats: {
    totalTenants: "Gesamt Mandanten",
    activeTenants: "Aktive Mandanten",
    totalUsers: "Gesamt Benutzer",
    activeUsers: "Aktive Benutzer",
    totalRevenue: "Gesamt Umsatz",
    monthlyRevenue: "Monatlicher Umsatz",
    systemHealth: "System Gesundheit",
    uptime: "Verfügbarkeit",
    apiCalls: "API Aufrufe",
    storageUsed: "Verwendeter Speicher",
    storageLimit: "Speicher Limit",
  },

  health: {
    healthy: "Gesund",
    warning: "Warnung",
    critical: "Kritisch",
  },

  tenants: {
    title: "Mandanten Verwaltung",
    name: "Name",
    plan: "Plan",
    status: "Status",
    users: "Benutzer",
    students: "Schüler",
    revenue: "Umsatz",
    lastActivity: "Letzte Aktivität",
    health: "Gesundheit",
    viewDetails: "Details Anzeigen",
    suspend: "Suspendieren",
    activate: "Aktivieren",
  },

  plans: {
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  },

  tenantStatus: {
    active: "Aktiv",
    suspended: "Suspendiert",
    trial: "Testversion",
    cancelled: "Abgebrochen",
  },

  activity: {
    title: "Plattform Aktivität",
    recentActivity: "Letzte Aktivität",
    type: "Typ",
    description: "Beschreibung",
    severity: "Schweregrad",
    timestamp: "Zeitstempel",
    viewAll: "Alle Anzeigen",
  },

  activityTypes: {
    tenant_created: "Mandant Erstellt",
    tenant_suspended: "Mandant Suspendiert",
    payment_received: "Zahlung Erhalten",
    system_alert: "System Warnung",
    security_event: "Sicherheits Ereignis",
  },

  severity: {
    info: "Info",
    warning: "Warnung",
    error: "Fehler",
    critical: "Kritisch",
  },

  security: {
    title: "Sicherheit",
    alerts: "Sicherheits Warnungen",
    type: "Typ",
    description: "Beschreibung",
    status: "Status",
    resolvedBy: "Gelöst Von",
    investigate: "Untersuchen",
    resolve: "Lösen",
    dismiss: "Verwerfen",
  },

  securityTypes: {
    failed_login: "Fehlgeschlagene Anmeldung",
    suspicious_activity: "Verdächtige Aktivität",
    data_breach_attempt: "Datenschutzverletzung Versuch",
    permission_escalation: "Berechtigungs Eskalation",
  },

  securityStatus: {
    open: "Offen",
    investigating: "In Untersuchung",
    resolved: "Gelöst",
    false_positive: "Falscher Alarm",
  },

  logs: {
    title: "System Protokolle",
    systemLogs: "System Protokolle",
    level: "Stufe",
    service: "Dienst",
    message: "Nachricht",
    timestamp: "Zeitstempel",
    viewDetails: "Details Anzeigen",
    export: "Exportieren",
  },

  logLevels: {
    debug: "Debug",
    info: "Info",
    warn: "Warnung",
    error: "Fehler",
    fatal: "Fatal",
  },

  metrics: {
    title: "Metriken",
    revenue: "Umsätze",
    usage: "Nutzung",
    mrr: "MRR",
    arr: "ARR",
    newRevenue: "Neue Umsätze",
    churnRevenue: "Verlorene Umsätze",
    apiCalls: "API Aufrufe",
    storage: "Speicher",
    activeUsers: "Aktive Benutzer",
    activeTenants: "Aktive Mandanten",
  },

  actions: {
    refresh: "Aktualisieren",
    export: "Exportieren",
    configure: "Konfigurieren",
    viewAll: "Alle Anzeigen",
    filter: "Filtern",
    search: "Suchen",
  },

  tabs: {
    overview: "Übersicht",
    tenants: "Mandanten",
    activity: "Aktivität",
    security: "Sicherheit",
    logs: "Protokolle",
    metrics: "Metriken",
    settings: "Einstellungen",
  },
};

// ============================================================================
// TRADUCTIONS IT
// ============================================================================

const it: SuperAdminTranslations = {
  page: {
    title: "Dashboard Super Amministratore",
    description: "Panoramica completa della piattaforma Viamentor",
  },

  stats: {
    totalTenants: "Totale Tenant",
    activeTenants: "Tenant Attivi",
    totalUsers: "Totale Utenti",
    activeUsers: "Utenti Attivi",
    totalRevenue: "Ricavo Totale",
    monthlyRevenue: "Ricavo Mensile",
    systemHealth: "Salute Sistema",
    uptime: "Disponibilità",
    apiCalls: "Chiamate API",
    storageUsed: "Archiviazione Utilizzata",
    storageLimit: "Limite Archiviazione",
  },

  health: {
    healthy: "Sano",
    warning: "Attenzione",
    critical: "Critico",
  },

  tenants: {
    title: "Gestione Tenant",
    name: "Nome",
    plan: "Piano",
    status: "Stato",
    users: "Utenti",
    students: "Allievi",
    revenue: "Ricavo",
    lastActivity: "Ultima Attività",
    health: "Salute",
    viewDetails: "Visualizza Dettagli",
    suspend: "Sospendere",
    activate: "Attivare",
  },

  plans: {
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  },

  tenantStatus: {
    active: "Attivo",
    suspended: "Sospeso",
    trial: "Prova",
    cancelled: "Annullato",
  },

  activity: {
    title: "Attività Piattaforma",
    recentActivity: "Attività Recente",
    type: "Tipo",
    description: "Descrizione",
    severity: "Gravità",
    timestamp: "Timestamp",
    viewAll: "Visualizza Tutto",
  },

  activityTypes: {
    tenant_created: "Tenant Creato",
    tenant_suspended: "Tenant Sospeso",
    payment_received: "Pagamento Ricevuto",
    system_alert: "Avviso Sistema",
    security_event: "Evento Sicurezza",
  },

  severity: {
    info: "Info",
    warning: "Attenzione",
    error: "Errore",
    critical: "Critico",
  },

  security: {
    title: "Sicurezza",
    alerts: "Avvisi Sicurezza",
    type: "Tipo",
    description: "Descrizione",
    status: "Stato",
    resolvedBy: "Risolto Da",
    investigate: "Investigare",
    resolve: "Risolvere",
    dismiss: "Ignorare",
  },

  securityTypes: {
    failed_login: "Accesso Fallito",
    suspicious_activity: "Attività Sospetta",
    data_breach_attempt: "Tentativo Violazione Dati",
    permission_escalation: "Escalation Permessi",
  },

  securityStatus: {
    open: "Aperto",
    investigating: "In Investigazione",
    resolved: "Risolto",
    false_positive: "Falso Positivo",
  },

  logs: {
    title: "Log Sistema",
    systemLogs: "Log Sistema",
    level: "Livello",
    service: "Servizio",
    message: "Messaggio",
    timestamp: "Timestamp",
    viewDetails: "Visualizza Dettagli",
    export: "Esportare",
  },

  logLevels: {
    debug: "Debug",
    info: "Info",
    warn: "Attenzione",
    error: "Errore",
    fatal: "Fatale",
  },

  metrics: {
    title: "Metriche",
    revenue: "Ricavi",
    usage: "Utilizzo",
    mrr: "MRR",
    arr: "ARR",
    newRevenue: "Nuovi Ricavi",
    churnRevenue: "Ricavi Persi",
    apiCalls: "Chiamate API",
    storage: "Archiviazione",
    activeUsers: "Utenti Attivi",
    activeTenants: "Tenant Attivi",
  },

  actions: {
    refresh: "Aggiornare",
    export: "Esportare",
    configure: "Configurare",
    viewAll: "Visualizza Tutto",
    filter: "Filtrare",
    search: "Cercare",
  },

  tabs: {
    overview: "Panoramica",
    tenants: "Tenant",
    activity: "Attività",
    security: "Sicurezza",
    logs: "Log",
    metrics: "Metriche",
    settings: "Impostazioni",
  },
};

// ============================================================================
// TRADUCTIONS EN
// ============================================================================

const en: SuperAdminTranslations = {
  page: {
    title: "Super Administrator Dashboard",
    description: "Complete overview of the Viamentor platform",
  },

  stats: {
    totalTenants: "Total Tenants",
    activeTenants: "Active Tenants",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    totalRevenue: "Total Revenue",
    monthlyRevenue: "Monthly Revenue",
    systemHealth: "System Health",
    uptime: "Uptime",
    apiCalls: "API Calls",
    storageUsed: "Storage Used",
    storageLimit: "Storage Limit",
  },

  health: {
    healthy: "Healthy",
    warning: "Warning",
    critical: "Critical",
  },

  tenants: {
    title: "Tenant Management",
    name: "Name",
    plan: "Plan",
    status: "Status",
    users: "Users",
    students: "Students",
    revenue: "Revenue",
    lastActivity: "Last Activity",
    health: "Health",
    viewDetails: "View Details",
    suspend: "Suspend",
    activate: "Activate",
  },

  plans: {
    starter: "Starter",
    professional: "Professional",
    enterprise: "Enterprise",
  },

  tenantStatus: {
    active: "Active",
    suspended: "Suspended",
    trial: "Trial",
    cancelled: "Cancelled",
  },

  activity: {
    title: "Platform Activity",
    recentActivity: "Recent Activity",
    type: "Type",
    description: "Description",
    severity: "Severity",
    timestamp: "Timestamp",
    viewAll: "View All",
  },

  activityTypes: {
    tenant_created: "Tenant Created",
    tenant_suspended: "Tenant Suspended",
    payment_received: "Payment Received",
    system_alert: "System Alert",
    security_event: "Security Event",
  },

  severity: {
    info: "Info",
    warning: "Warning",
    error: "Error",
    critical: "Critical",
  },

  security: {
    title: "Security",
    alerts: "Security Alerts",
    type: "Type",
    description: "Description",
    status: "Status",
    resolvedBy: "Resolved By",
    investigate: "Investigate",
    resolve: "Resolve",
    dismiss: "Dismiss",
  },

  securityTypes: {
    failed_login: "Failed Login",
    suspicious_activity: "Suspicious Activity",
    data_breach_attempt: "Data Breach Attempt",
    permission_escalation: "Permission Escalation",
  },

  securityStatus: {
    open: "Open",
    investigating: "Investigating",
    resolved: "Resolved",
    false_positive: "False Positive",
  },

  logs: {
    title: "System Logs",
    systemLogs: "System Logs",
    level: "Level",
    service: "Service",
    message: "Message",
    timestamp: "Timestamp",
    viewDetails: "View Details",
    export: "Export",
  },

  logLevels: {
    debug: "Debug",
    info: "Info",
    warn: "Warning",
    error: "Error",
    fatal: "Fatal",
  },

  metrics: {
    title: "Metrics",
    revenue: "Revenue",
    usage: "Usage",
    mrr: "MRR",
    arr: "ARR",
    newRevenue: "New Revenue",
    churnRevenue: "Churn Revenue",
    apiCalls: "API Calls",
    storage: "Storage",
    activeUsers: "Active Users",
    activeTenants: "Active Tenants",
  },

  actions: {
    refresh: "Refresh",
    export: "Export",
    configure: "Configure",
    viewAll: "View All",
    filter: "Filter",
    search: "Search",
  },

  tabs: {
    overview: "Overview",
    tenants: "Tenants",
    activity: "Activity",
    security: "Security",
    logs: "Logs",
    metrics: "Metrics",
    settings: "Settings",
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export const superAdminI18n: Record<SuperAdminLocale, SuperAdminTranslations> =
  {
    fr,
    de,
    it,
    en,
  };

export default superAdminI18n;
