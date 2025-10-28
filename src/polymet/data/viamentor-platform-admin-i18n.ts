/**
 * VIAMENTOR - Platform Admin i18n
 * Traductions FR/DE/IT/EN pour dashboard Platform Admin
 */

import type { PlatformAdminLocale } from "@/polymet/data/viamentor-platform-admin-data";

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const platformAdminTranslations = {
  fr: {
    // Page title
    title: "Platform Admin",
    subtitle: "Gestion multi-tenant et monitoring système",

    // Tabs
    tabs: {
      overview: "Vue d'ensemble",
      tenants: "Tenants",
      monitoring: "Monitoring",
      incidents: "Incidents",
      audit: "Audit Logs",
      configuration: "Configuration",
    },

    // System Stats
    stats: {
      tenants: {
        title: "Tenants",
        total: "Total",
        active: "Actifs",
        trial: "En essai",
        suspended: "Suspendus",
        newThisMonth: "Nouveaux ce mois",
        churnRate: "Taux de désabonnement",
      },
      users: {
        title: "Utilisateurs",
        total: "Total",
        active: "Actifs",
        newThisMonth: "Nouveaux ce mois",
        averagePerTenant: "Moyenne par tenant",
      },
      revenue: {
        title: "Revenus",
        mrr: "MRR",
        arr: "ARR",
        growth: "Croissance",
        churnMrr: "MRR perdu",
      },
      infrastructure: {
        title: "Infrastructure",
        uptime: "Disponibilité",
        responseTime: "Temps de réponse",
        errorRate: "Taux d'erreur",
        requestsPerSecond: "Requêtes/sec",
      },
    },

    // Tenant Status
    tenantStatus: {
      active: "Actif",
      suspended: "Suspendu",
      trial: "Essai",
      pending: "En attente",
      cancelled: "Annulé",
    },

    // Subscription Plans
    plans: {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
      custom: "Custom",
    },

    // Health Status
    healthStatus: {
      healthy: "Sain",
      degraded: "Dégradé",
      critical: "Critique",
      maintenance: "Maintenance",
    },

    // Tenants Table
    tenantsTable: {
      name: "Nom",
      status: "Statut",
      plan: "Plan",
      users: "Utilisateurs",
      mrr: "MRR",
      uptime: "Disponibilité",
      createdAt: "Créé le",
      actions: "Actions",
      viewDetails: "Voir détails",
      impersonate: "Se connecter en tant que",
      suspend: "Suspendre",
      activate: "Activer",
      delete: "Supprimer",
      filters: {
        all: "Tous",
        active: "Actifs",
        trial: "Essais",
        suspended: "Suspendus",
        search: "Rechercher un tenant...",
      },
    },

    // System Components
    components: {
      title: "Composants Système",
      database: "Base de données",
      api: "API",
      storage: "Stockage",
      cache: "Cache",
      queue: "File d'attente",
      cdn: "CDN",
      uptime: "Disponibilité",
      responseTime: "Temps de réponse",
      region: "Région",
      lastIncident: "Dernier incident",
    },

    // Incidents
    incidents: {
      title: "Incidents Système",
      severity: {
        low: "Faible",
        medium: "Moyen",
        high: "Élevé",
        critical: "Critique",
      },
      status: {
        open: "Ouvert",
        investigating: "En investigation",
        resolved: "Résolu",
        closed: "Fermé",
      },
      affectedTenants: "Tenants affectés",
      affectedUsers: "Utilisateurs affectés",
      startedAt: "Début",
      resolvedAt: "Résolu le",
      assignedTo: "Assigné à",
      updates: "Mises à jour",
      createIncident: "Créer un incident",
    },

    // Audit Logs
    audit: {
      title: "Logs d'Audit",
      timestamp: "Horodatage",
      actor: "Acteur",
      action: "Action",
      resource: "Ressource",
      tenant: "Tenant",
      result: "Résultat",
      details: "Détails",
      ipAddress: "Adresse IP",
      userAgent: "User Agent",
      success: "Succès",
      failure: "Échec",
      filters: {
        all: "Tous",
        today: "Aujourd'hui",
        week: "Cette semaine",
        month: "Ce mois",
        search: "Rechercher dans les logs...",
      },
      actions: {
        "tenant.create": "Création tenant",
        "tenant.update": "Modification tenant",
        "tenant.suspend": "Suspension tenant",
        "tenant.activate": "Activation tenant",
        "tenant.delete": "Suppression tenant",
        "tenant.impersonate": "Connexion en tant que tenant",
        "config.update": "Modification configuration",
        "user.create": "Création utilisateur",
        "user.update": "Modification utilisateur",
        "user.delete": "Suppression utilisateur",
      },
    },

    // Configuration
    configuration: {
      title: "Configuration Plateforme",
      general: {
        title: "Général",
        maintenanceMode: "Mode maintenance",
        maintenanceModeDesc:
          "Activer le mode maintenance pour bloquer l'accès à la plateforme",
        allowNewSignups: "Autoriser nouvelles inscriptions",
        allowNewSignupsDesc: "Permettre aux nouveaux tenants de s'inscrire",
        defaultPlan: "Plan par défaut",
        defaultPlanDesc: "Plan attribué aux nouveaux tenants",
        trialDuration: "Durée d'essai (jours)",
        trialDurationDesc: "Nombre de jours d'essai gratuit",
      },
      security: {
        title: "Sécurité",
        enforceSSO: "Forcer SSO",
        enforceSSODesc: "Exiger l'authentification SSO pour tous les tenants",
        enforce2FA: "Forcer 2FA",
        enforce2FADesc: "Exiger l'authentification à deux facteurs",
        sessionTimeout: "Timeout session (secondes)",
        sessionTimeoutDesc: "Durée avant expiration de session",
        passwordPolicy: "Politique de mot de passe",
        minLength: "Longueur minimale",
        requireUppercase: "Majuscules requises",
        requireNumbers: "Chiffres requis",
        requireSpecialChars: "Caractères spéciaux requis",
      },
      limits: {
        title: "Limites",
        maxUsersPerTenant: "Utilisateurs max par tenant",
        maxStoragePerTenant: "Stockage max par tenant (GB)",
        maxApiCallsPerMonth: "Appels API max par mois",
      },
      features: {
        title: "Fonctionnalités",
        enabledFeatures: "Fonctionnalités activées",
        betaFeatures: "Fonctionnalités bêta",
      },
      save: "Enregistrer",
      cancel: "Annuler",
      saved: "Configuration enregistrée",
    },

    // Actions
    actions: {
      refresh: "Actualiser",
      export: "Exporter",
      filter: "Filtrer",
      search: "Rechercher",
      viewAll: "Voir tout",
      viewDetails: "Voir détails",
      edit: "Modifier",
      delete: "Supprimer",
      confirm: "Confirmer",
      cancel: "Annuler",
    },

    // Messages
    messages: {
      loading: "Chargement...",
      noData: "Aucune donnée disponible",
      error: "Une erreur s'est produite",
      success: "Opération réussie",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
      confirmSuspend: "Êtes-vous sûr de vouloir suspendre ce tenant ?",
      confirmActivate: "Êtes-vous sûr de vouloir activer ce tenant ?",
    },
  },

  de: {
    title: "Platform Admin",
    subtitle: "Multi-Tenant-Verwaltung und Systemüberwachung",

    tabs: {
      overview: "Übersicht",
      tenants: "Mandanten",
      monitoring: "Überwachung",
      incidents: "Vorfälle",
      audit: "Audit-Protokolle",
      configuration: "Konfiguration",
    },

    stats: {
      tenants: {
        title: "Mandanten",
        total: "Gesamt",
        active: "Aktiv",
        trial: "Testversion",
        suspended: "Gesperrt",
        newThisMonth: "Neu diesen Monat",
        churnRate: "Abwanderungsrate",
      },
      users: {
        title: "Benutzer",
        total: "Gesamt",
        active: "Aktiv",
        newThisMonth: "Neu diesen Monat",
        averagePerTenant: "Durchschnitt pro Mandant",
      },
      revenue: {
        title: "Umsatz",
        mrr: "MRR",
        arr: "ARR",
        growth: "Wachstum",
        churnMrr: "Verlorener MRR",
      },
      infrastructure: {
        title: "Infrastruktur",
        uptime: "Verfügbarkeit",
        responseTime: "Antwortzeit",
        errorRate: "Fehlerrate",
        requestsPerSecond: "Anfragen/Sek",
      },
    },

    tenantStatus: {
      active: "Aktiv",
      suspended: "Gesperrt",
      trial: "Testversion",
      pending: "Ausstehend",
      cancelled: "Storniert",
    },

    plans: {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
      custom: "Custom",
    },

    healthStatus: {
      healthy: "Gesund",
      degraded: "Beeinträchtigt",
      critical: "Kritisch",
      maintenance: "Wartung",
    },

    tenantsTable: {
      name: "Name",
      status: "Status",
      plan: "Plan",
      users: "Benutzer",
      mrr: "MRR",
      uptime: "Verfügbarkeit",
      createdAt: "Erstellt am",
      actions: "Aktionen",
      viewDetails: "Details anzeigen",
      impersonate: "Als Mandant anmelden",
      suspend: "Sperren",
      activate: "Aktivieren",
      delete: "Löschen",
      filters: {
        all: "Alle",
        active: "Aktiv",
        trial: "Testversionen",
        suspended: "Gesperrt",
        search: "Mandant suchen...",
      },
    },

    components: {
      title: "Systemkomponenten",
      database: "Datenbank",
      api: "API",
      storage: "Speicher",
      cache: "Cache",
      queue: "Warteschlange",
      cdn: "CDN",
      uptime: "Verfügbarkeit",
      responseTime: "Antwortzeit",
      region: "Region",
      lastIncident: "Letzter Vorfall",
    },

    incidents: {
      title: "Systemvorfälle",
      severity: {
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
        critical: "Kritisch",
      },
      status: {
        open: "Offen",
        investigating: "In Untersuchung",
        resolved: "Gelöst",
        closed: "Geschlossen",
      },
      affectedTenants: "Betroffene Mandanten",
      affectedUsers: "Betroffene Benutzer",
      startedAt: "Beginn",
      resolvedAt: "Gelöst am",
      assignedTo: "Zugewiesen an",
      updates: "Updates",
      createIncident: "Vorfall erstellen",
    },

    audit: {
      title: "Audit-Protokolle",
      timestamp: "Zeitstempel",
      actor: "Akteur",
      action: "Aktion",
      resource: "Ressource",
      tenant: "Mandant",
      result: "Ergebnis",
      details: "Details",
      ipAddress: "IP-Adresse",
      userAgent: "User Agent",
      success: "Erfolg",
      failure: "Fehler",
      filters: {
        all: "Alle",
        today: "Heute",
        week: "Diese Woche",
        month: "Dieser Monat",
        search: "In Protokollen suchen...",
      },
      actions: {
        "tenant.create": "Mandant erstellt",
        "tenant.update": "Mandant aktualisiert",
        "tenant.suspend": "Mandant gesperrt",
        "tenant.activate": "Mandant aktiviert",
        "tenant.delete": "Mandant gelöscht",
        "tenant.impersonate": "Als Mandant angemeldet",
        "config.update": "Konfiguration aktualisiert",
        "user.create": "Benutzer erstellt",
        "user.update": "Benutzer aktualisiert",
        "user.delete": "Benutzer gelöscht",
      },
    },

    configuration: {
      title: "Plattformkonfiguration",
      general: {
        title: "Allgemein",
        maintenanceMode: "Wartungsmodus",
        maintenanceModeDesc:
          "Wartungsmodus aktivieren, um Zugriff zu blockieren",
        allowNewSignups: "Neue Registrierungen erlauben",
        allowNewSignupsDesc: "Neuen Mandanten Registrierung ermöglichen",
        defaultPlan: "Standardplan",
        defaultPlanDesc: "Plan für neue Mandanten",
        trialDuration: "Testdauer (Tage)",
        trialDurationDesc: "Anzahl kostenloser Testtage",
      },
      security: {
        title: "Sicherheit",
        enforceSSO: "SSO erzwingen",
        enforceSSODesc: "SSO-Authentifizierung für alle Mandanten erforderlich",
        enforce2FA: "2FA erzwingen",
        enforce2FADesc: "Zwei-Faktor-Authentifizierung erforderlich",
        sessionTimeout: "Sitzungs-Timeout (Sekunden)",
        sessionTimeoutDesc: "Dauer bis Sitzungsablauf",
        passwordPolicy: "Passwortrichtlinie",
        minLength: "Mindestlänge",
        requireUppercase: "Großbuchstaben erforderlich",
        requireNumbers: "Zahlen erforderlich",
        requireSpecialChars: "Sonderzeichen erforderlich",
      },
      limits: {
        title: "Limits",
        maxUsersPerTenant: "Max. Benutzer pro Mandant",
        maxStoragePerTenant: "Max. Speicher pro Mandant (GB)",
        maxApiCallsPerMonth: "Max. API-Aufrufe pro Monat",
      },
      features: {
        title: "Funktionen",
        enabledFeatures: "Aktivierte Funktionen",
        betaFeatures: "Beta-Funktionen",
      },
      save: "Speichern",
      cancel: "Abbrechen",
      saved: "Konfiguration gespeichert",
    },

    actions: {
      refresh: "Aktualisieren",
      export: "Exportieren",
      filter: "Filtern",
      search: "Suchen",
      viewAll: "Alle anzeigen",
      viewDetails: "Details anzeigen",
      edit: "Bearbeiten",
      delete: "Löschen",
      confirm: "Bestätigen",
      cancel: "Abbrechen",
    },

    messages: {
      loading: "Laden...",
      noData: "Keine Daten verfügbar",
      error: "Ein Fehler ist aufgetreten",
      success: "Operation erfolgreich",
      confirmDelete: "Möchten Sie wirklich löschen?",
      confirmSuspend: "Möchten Sie diesen Mandanten wirklich sperren?",
      confirmActivate: "Möchten Sie diesen Mandanten wirklich aktivieren?",
    },
  },

  it: {
    title: "Platform Admin",
    subtitle: "Gestione multi-tenant e monitoraggio sistema",

    tabs: {
      overview: "Panoramica",
      tenants: "Tenant",
      monitoring: "Monitoraggio",
      incidents: "Incidenti",
      audit: "Log di Audit",
      configuration: "Configurazione",
    },

    stats: {
      tenants: {
        title: "Tenant",
        total: "Totale",
        active: "Attivi",
        trial: "In prova",
        suspended: "Sospesi",
        newThisMonth: "Nuovi questo mese",
        churnRate: "Tasso di abbandono",
      },
      users: {
        title: "Utenti",
        total: "Totale",
        active: "Attivi",
        newThisMonth: "Nuovi questo mese",
        averagePerTenant: "Media per tenant",
      },
      revenue: {
        title: "Ricavi",
        mrr: "MRR",
        arr: "ARR",
        growth: "Crescita",
        churnMrr: "MRR perso",
      },
      infrastructure: {
        title: "Infrastruttura",
        uptime: "Disponibilità",
        responseTime: "Tempo di risposta",
        errorRate: "Tasso di errore",
        requestsPerSecond: "Richieste/sec",
      },
    },

    tenantStatus: {
      active: "Attivo",
      suspended: "Sospeso",
      trial: "Prova",
      pending: "In attesa",
      cancelled: "Annullato",
    },

    plans: {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
      custom: "Custom",
    },

    healthStatus: {
      healthy: "Sano",
      degraded: "Degradato",
      critical: "Critico",
      maintenance: "Manutenzione",
    },

    tenantsTable: {
      name: "Nome",
      status: "Stato",
      plan: "Piano",
      users: "Utenti",
      mrr: "MRR",
      uptime: "Disponibilità",
      createdAt: "Creato il",
      actions: "Azioni",
      viewDetails: "Vedi dettagli",
      impersonate: "Accedi come tenant",
      suspend: "Sospendi",
      activate: "Attiva",
      delete: "Elimina",
      filters: {
        all: "Tutti",
        active: "Attivi",
        trial: "Prove",
        suspended: "Sospesi",
        search: "Cerca tenant...",
      },
    },

    components: {
      title: "Componenti Sistema",
      database: "Database",
      api: "API",
      storage: "Archiviazione",
      cache: "Cache",
      queue: "Coda",
      cdn: "CDN",
      uptime: "Disponibilità",
      responseTime: "Tempo di risposta",
      region: "Regione",
      lastIncident: "Ultimo incidente",
    },

    incidents: {
      title: "Incidenti Sistema",
      severity: {
        low: "Basso",
        medium: "Medio",
        high: "Alto",
        critical: "Critico",
      },
      status: {
        open: "Aperto",
        investigating: "In indagine",
        resolved: "Risolto",
        closed: "Chiuso",
      },
      affectedTenants: "Tenant interessati",
      affectedUsers: "Utenti interessati",
      startedAt: "Inizio",
      resolvedAt: "Risolto il",
      assignedTo: "Assegnato a",
      updates: "Aggiornamenti",
      createIncident: "Crea incidente",
    },

    audit: {
      title: "Log di Audit",
      timestamp: "Timestamp",
      actor: "Attore",
      action: "Azione",
      resource: "Risorsa",
      tenant: "Tenant",
      result: "Risultato",
      details: "Dettagli",
      ipAddress: "Indirizzo IP",
      userAgent: "User Agent",
      success: "Successo",
      failure: "Fallimento",
      filters: {
        all: "Tutti",
        today: "Oggi",
        week: "Questa settimana",
        month: "Questo mese",
        search: "Cerca nei log...",
      },
      actions: {
        "tenant.create": "Tenant creato",
        "tenant.update": "Tenant aggiornato",
        "tenant.suspend": "Tenant sospeso",
        "tenant.activate": "Tenant attivato",
        "tenant.delete": "Tenant eliminato",
        "tenant.impersonate": "Accesso come tenant",
        "config.update": "Configurazione aggiornata",
        "user.create": "Utente creato",
        "user.update": "Utente aggiornato",
        "user.delete": "Utente eliminato",
      },
    },

    configuration: {
      title: "Configurazione Piattaforma",
      general: {
        title: "Generale",
        maintenanceMode: "Modalità manutenzione",
        maintenanceModeDesc:
          "Attiva modalità manutenzione per bloccare l'accesso",
        allowNewSignups: "Consenti nuove registrazioni",
        allowNewSignupsDesc: "Permetti ai nuovi tenant di registrarsi",
        defaultPlan: "Piano predefinito",
        defaultPlanDesc: "Piano assegnato ai nuovi tenant",
        trialDuration: "Durata prova (giorni)",
        trialDurationDesc: "Numero di giorni di prova gratuita",
      },
      security: {
        title: "Sicurezza",
        enforceSSO: "Forza SSO",
        enforceSSODesc: "Richiedi autenticazione SSO per tutti i tenant",
        enforce2FA: "Forza 2FA",
        enforce2FADesc: "Richiedi autenticazione a due fattori",
        sessionTimeout: "Timeout sessione (secondi)",
        sessionTimeoutDesc: "Durata prima della scadenza della sessione",
        passwordPolicy: "Politica password",
        minLength: "Lunghezza minima",
        requireUppercase: "Maiuscole richieste",
        requireNumbers: "Numeri richiesti",
        requireSpecialChars: "Caratteri speciali richiesti",
      },
      limits: {
        title: "Limiti",
        maxUsersPerTenant: "Utenti max per tenant",
        maxStoragePerTenant: "Archiviazione max per tenant (GB)",
        maxApiCallsPerMonth: "Chiamate API max al mese",
      },
      features: {
        title: "Funzionalità",
        enabledFeatures: "Funzionalità attivate",
        betaFeatures: "Funzionalità beta",
      },
      save: "Salva",
      cancel: "Annulla",
      saved: "Configurazione salvata",
    },

    actions: {
      refresh: "Aggiorna",
      export: "Esporta",
      filter: "Filtra",
      search: "Cerca",
      viewAll: "Vedi tutto",
      viewDetails: "Vedi dettagli",
      edit: "Modifica",
      delete: "Elimina",
      confirm: "Conferma",
      cancel: "Annulla",
    },

    messages: {
      loading: "Caricamento...",
      noData: "Nessun dato disponibile",
      error: "Si è verificato un errore",
      success: "Operazione riuscita",
      confirmDelete: "Sei sicuro di voler eliminare?",
      confirmSuspend: "Sei sicuro di voler sospendere questo tenant?",
      confirmActivate: "Sei sicuro di voler attivare questo tenant?",
    },
  },

  en: {
    title: "Platform Admin",
    subtitle: "Multi-tenant management and system monitoring",

    tabs: {
      overview: "Overview",
      tenants: "Tenants",
      monitoring: "Monitoring",
      incidents: "Incidents",
      audit: "Audit Logs",
      configuration: "Configuration",
    },

    stats: {
      tenants: {
        title: "Tenants",
        total: "Total",
        active: "Active",
        trial: "Trial",
        suspended: "Suspended",
        newThisMonth: "New this month",
        churnRate: "Churn rate",
      },
      users: {
        title: "Users",
        total: "Total",
        active: "Active",
        newThisMonth: "New this month",
        averagePerTenant: "Average per tenant",
      },
      revenue: {
        title: "Revenue",
        mrr: "MRR",
        arr: "ARR",
        growth: "Growth",
        churnMrr: "Churned MRR",
      },
      infrastructure: {
        title: "Infrastructure",
        uptime: "Uptime",
        responseTime: "Response time",
        errorRate: "Error rate",
        requestsPerSecond: "Requests/sec",
      },
    },

    tenantStatus: {
      active: "Active",
      suspended: "Suspended",
      trial: "Trial",
      pending: "Pending",
      cancelled: "Cancelled",
    },

    plans: {
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
      custom: "Custom",
    },

    healthStatus: {
      healthy: "Healthy",
      degraded: "Degraded",
      critical: "Critical",
      maintenance: "Maintenance",
    },

    tenantsTable: {
      name: "Name",
      status: "Status",
      plan: "Plan",
      users: "Users",
      mrr: "MRR",
      uptime: "Uptime",
      createdAt: "Created",
      actions: "Actions",
      viewDetails: "View details",
      impersonate: "Login as tenant",
      suspend: "Suspend",
      activate: "Activate",
      delete: "Delete",
      filters: {
        all: "All",
        active: "Active",
        trial: "Trials",
        suspended: "Suspended",
        search: "Search tenant...",
      },
    },

    components: {
      title: "System Components",
      database: "Database",
      api: "API",
      storage: "Storage",
      cache: "Cache",
      queue: "Queue",
      cdn: "CDN",
      uptime: "Uptime",
      responseTime: "Response time",
      region: "Region",
      lastIncident: "Last incident",
    },

    incidents: {
      title: "System Incidents",
      severity: {
        low: "Low",
        medium: "Medium",
        high: "High",
        critical: "Critical",
      },
      status: {
        open: "Open",
        investigating: "Investigating",
        resolved: "Resolved",
        closed: "Closed",
      },
      affectedTenants: "Affected tenants",
      affectedUsers: "Affected users",
      startedAt: "Started",
      resolvedAt: "Resolved",
      assignedTo: "Assigned to",
      updates: "Updates",
      createIncident: "Create incident",
    },

    audit: {
      title: "Audit Logs",
      timestamp: "Timestamp",
      actor: "Actor",
      action: "Action",
      resource: "Resource",
      tenant: "Tenant",
      result: "Result",
      details: "Details",
      ipAddress: "IP Address",
      userAgent: "User Agent",
      success: "Success",
      failure: "Failure",
      filters: {
        all: "All",
        today: "Today",
        week: "This week",
        month: "This month",
        search: "Search logs...",
      },
      actions: {
        "tenant.create": "Tenant created",
        "tenant.update": "Tenant updated",
        "tenant.suspend": "Tenant suspended",
        "tenant.activate": "Tenant activated",
        "tenant.delete": "Tenant deleted",
        "tenant.impersonate": "Logged in as tenant",
        "config.update": "Configuration updated",
        "user.create": "User created",
        "user.update": "User updated",
        "user.delete": "User deleted",
      },
    },

    configuration: {
      title: "Platform Configuration",
      general: {
        title: "General",
        maintenanceMode: "Maintenance mode",
        maintenanceModeDesc: "Enable maintenance mode to block platform access",
        allowNewSignups: "Allow new signups",
        allowNewSignupsDesc: "Allow new tenants to sign up",
        defaultPlan: "Default plan",
        defaultPlanDesc: "Plan assigned to new tenants",
        trialDuration: "Trial duration (days)",
        trialDurationDesc: "Number of free trial days",
      },
      security: {
        title: "Security",
        enforceSSO: "Enforce SSO",
        enforceSSODesc: "Require SSO authentication for all tenants",
        enforce2FA: "Enforce 2FA",
        enforce2FADesc: "Require two-factor authentication",
        sessionTimeout: "Session timeout (seconds)",
        sessionTimeoutDesc: "Duration before session expires",
        passwordPolicy: "Password policy",
        minLength: "Minimum length",
        requireUppercase: "Require uppercase",
        requireNumbers: "Require numbers",
        requireSpecialChars: "Require special characters",
      },
      limits: {
        title: "Limits",
        maxUsersPerTenant: "Max users per tenant",
        maxStoragePerTenant: "Max storage per tenant (GB)",
        maxApiCallsPerMonth: "Max API calls per month",
      },
      features: {
        title: "Features",
        enabledFeatures: "Enabled features",
        betaFeatures: "Beta features",
      },
      save: "Save",
      cancel: "Cancel",
      saved: "Configuration saved",
    },

    actions: {
      refresh: "Refresh",
      export: "Export",
      filter: "Filter",
      search: "Search",
      viewAll: "View all",
      viewDetails: "View details",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      cancel: "Cancel",
    },

    messages: {
      loading: "Loading...",
      noData: "No data available",
      error: "An error occurred",
      success: "Operation successful",
      confirmDelete: "Are you sure you want to delete?",
      confirmSuspend: "Are you sure you want to suspend this tenant?",
      confirmActivate: "Are you sure you want to activate this tenant?",
    },
  },
};

// ============================================================================
// HELPER FUNCTION
// ============================================================================

export function getPlatformAdminTranslations(
  locale: PlatformAdminLocale = "fr"
) {
  return platformAdminTranslations[locale];
}
