/**
 * VIAMENTOR - RBAC Permissions i18n
 * Traductions FR/DE/IT/EN pour rôles, permissions, resources, actions
 *
 * USAGE:
 * ```tsx
 * import { rbacI18n } from '@/viamentor/data/viamentor-rbac-permissions-i18n';
 * const t = rbacI18n[locale];
 * console.log(t.roles.super_admin); // "Super Administrateur"
 * ```
 */

export type RBACLocale = "fr" | "de" | "it" | "en";

export interface RBACTranslations {
  // Rôles (15)
  roles: {
    super_admin: string;
    platform_admin: string;
    school_admin: string;
    instructor_manager: string;
    marketing_manager: string;
    finance_manager: string;
    accountant: string;
    secretary: string;
    theory_instructor: string;
    instructor: string;
    prospect: string;
    student: string;
    alumni: string;
    parent: string;
    guest: string;
  };

  // Resources (16)
  resources: {
    students: string;
    instructors: string;
    vehicles: string;
    lessons: string;
    theory_courses: string;
    invoices: string;
    payments: string;
    prospects: string;
    campaigns: string;
    pixels: string;
    tasks: string;
    messages: string;
    settings: string;
    audit_logs: string;
    tenants: string;
    roles: string;
  };

  // Actions CRUD
  crudActions: {
    create: string;
    read: string;
    update: string;
    delete: string;
    execute: string;
  };

  // UI Labels
  ui: {
    role: string;
    roles: string;
    permission: string;
    permissions: string;
    resource: string;
    action: string;
    description: string;
    level: string;
    hierarchy: string;
    inherited: string;
    system: string;
    custom: string;
    granted: string;
    revoked: string;
    assign: string;
    unassign: string;
    manage_permissions: string;
    manage_roles: string;
    view_details: string;
    search_placeholder: string;
    filter_by_resource: string;
    filter_by_action: string;
    no_permissions: string;
    all_permissions: string;
    inherited_from: string;
  };

  // Conflict Types
  conflicts: {
    instructor_busy: string;
    vehicle_busy: string;
    room_busy: string;
    student_double_booking: string;
  };

  // Communication Types
  communications: {
    email: string;
    sms: string;
    call: string;
    meeting: string;
    inbound: string;
    outbound: string;
    sent: string;
    delivered: string;
    bounced: string;
    failed: string;
  };

  // Task Priorities
  tasks: {
    urgent: string;
    high: string;
    normal: string;
    low: string;
    pending: string;
    in_progress: string;
    completed: string;
    cancelled: string;
  };

  // Expiration Events
  expiration: {
    created: string;
    reminder_7d: string;
    reminder_3d: string;
    reminder_1d: string;
    expired: string;
    used: string;
  };

  // Page Admin RBAC
  page: {
    title: string;
    description: string;
  };

  // Actions
  actions: {
    import: string;
    export: string;
    sync: string;
  };

  // Stats
  stats: {
    totalRoles: string;
    totalPermissions: string;
    totalUsers: string;
    systemHealth: string;
    hierarchical: string;
    granular: string;
    activeUsers: string;
    lastSync: string;
  };

  // Health Status
  health: {
    healthy: string;
    warning: string;
    error: string;
  };

  // Alerts
  alerts: {
    systemWarning: string;
  };

  // Tabs
  tabs: {
    overview: string;
    management: string;
    audit: string;
    settings: string;
  };

  // Overview
  overview: {
    rolesHierarchy: string;
    rolesDescription: string;
    permissionsSummary: string;
    permissionsDescription: string;
    level: string;
    users: string;
    permissions: string;
  };

  // Management
  management: {
    title: string;
    description: string;
  };

  // Audit
  audit: {
    title: string;
    description: string;
    searchPlaceholder: string;
    export: string;
  };

  // Settings
  settings: {
    systemConfig: string;
    systemConfigDescription: string;
    sessionTimeout: string;
    sessionTimeoutDescription: string;
    maxRolesPerUser: string;
    maxRolesDescription: string;
    auditLogging: string;
    auditLoggingDescription: string;
    securityPolicies: string;
    securityPoliciesDescription: string;
    enforceRLS: string;
    enforceRLSDescription: string;
    requireMFA: string;
    requireMFADescription: string;
    passwordPolicy: string;
    passwordPolicyDescription: string;
    securityNote: string;
    enabled: string;
    adminOnly: string;
    configure: string;
  };
}

// ============================================================================
// TRADUCTIONS FR
// ============================================================================

const fr: RBACTranslations = {
  roles: {
    super_admin: "Super Administrateur",
    platform_admin: "Administrateur Plateforme",
    school_admin: "Administrateur École",
    instructor_manager: "Responsable Moniteurs",
    marketing_manager: "Responsable Marketing",
    finance_manager: "Responsable Finances",
    accountant: "Comptable",
    secretary: "Secrétaire",
    theory_instructor: "Moniteur Théorie",
    instructor: "Moniteur",
    prospect: "Prospect",
    student: "Élève",
    alumni: "Ancien Élève",
    parent: "Parent",
    guest: "Invité",
  },

  resources: {
    students: "Élèves",
    instructors: "Moniteurs",
    vehicles: "Véhicules",
    lessons: "Leçons Pratiques",
    theory_courses: "Cours Théoriques",
    invoices: "Factures",
    payments: "Paiements",
    prospects: "Prospects",
    campaigns: "Campagnes",
    pixels: "Pixels Tracking",
    tasks: "Tâches",
    messages: "Messages",
    settings: "Paramètres",
    audit_logs: "Logs Audit",
    tenants: "Tenants",
    roles: "Rôles",
  },

  crudActions: {
    create: "Créer",
    read: "Consulter",
    update: "Modifier",
    delete: "Supprimer",
    execute: "Exécuter",
  },

  ui: {
    role: "Rôle",
    roles: "Rôles",
    permission: "Permission",
    permissions: "Permissions",
    resource: "Ressource",
    action: "Action",
    description: "Description",
    level: "Niveau",
    hierarchy: "Hiérarchie",
    inherited: "Hérité",
    system: "Système",
    custom: "Personnalisé",
    granted: "Accordé",
    revoked: "Révoqué",
    assign: "Assigner",
    unassign: "Retirer",
    manage_permissions: "Gérer les Permissions",
    manage_roles: "Gérer les Rôles",
    view_details: "Voir Détails",
    search_placeholder: "Rechercher permissions...",
    filter_by_resource: "Filtrer par ressource",
    filter_by_action: "Filtrer par action",
    no_permissions: "Aucune permission",
    all_permissions: "Toutes les permissions",
    inherited_from: "Hérité de",
  },

  conflicts: {
    instructor_busy: "Moniteur occupé",
    vehicle_busy: "Véhicule occupé",
    room_busy: "Salle occupée",
    student_double_booking: "Élève double réservation",
  },

  communications: {
    email: "Email",
    sms: "SMS",
    call: "Appel",
    meeting: "Rendez-vous",
    inbound: "Entrant",
    outbound: "Sortant",
    sent: "Envoyé",
    delivered: "Délivré",
    bounced: "Rebondi",
    failed: "Échoué",
  },

  tasks: {
    urgent: "Urgent",
    high: "Haute",
    normal: "Normale",
    low: "Basse",
    pending: "En attente",
    in_progress: "En cours",
    completed: "Complétée",
    cancelled: "Annulée",
  },

  expiration: {
    created: "Créé",
    reminder_7d: "Rappel J-7",
    reminder_3d: "Rappel J-3",
    reminder_1d: "Rappel J-1",
    expired: "Expiré",
    used: "Utilisé",
  },

  page: {
    title: "Administration RBAC",
    description: "Gestion complète des rôles et permissions système",
  },

  actions: {
    import: "Importer",
    export: "Exporter",
    sync: "Synchroniser",
  },

  stats: {
    totalRoles: "Total Rôles",
    totalPermissions: "Total Permissions",
    totalUsers: "Total Utilisateurs",
    systemHealth: "Santé Système",
    hierarchical: "Hiérarchiques",
    granular: "Granulaires",
    activeUsers: "Utilisateurs actifs",
    lastSync: "Dernière sync",
  },

  health: {
    healthy: "Sain",
    warning: "Attention",
    error: "Erreur",
  },

  alerts: {
    systemWarning:
      "Attention : Des problèmes de permissions ont été détectés. Vérifiez la configuration RBAC.",
  },

  tabs: {
    overview: "Vue d'ensemble",
    management: "Gestion",
    audit: "Audit",
    settings: "Paramètres",
  },

  overview: {
    rolesHierarchy: "Hiérarchie des Rôles",
    rolesDescription: "Structure hiérarchique avec héritage des permissions",
    permissionsSummary: "Résumé des Permissions",
    permissionsDescription: "Permissions groupées par ressource système",
    level: "Niveau",
    users: "utilisateurs",
    permissions: "permissions",
  },

  management: {
    title: "Gestion des Rôles et Permissions",
    description:
      "Interface complète pour assigner et gérer les permissions par rôle",
  },

  audit: {
    title: "Journal d'Audit RBAC",
    description: "Historique complet des modifications de rôles et permissions",
    searchPlaceholder: "Rechercher dans les logs...",
    export: "Exporter",
  },

  settings: {
    systemConfig: "Configuration Système",
    systemConfigDescription: "Paramètres globaux de sécurité et RBAC",
    sessionTimeout: "Timeout Session (min)",
    sessionTimeoutDescription:
      "Durée d'inactivité avant déconnexion automatique",
    maxRolesPerUser: "Max Rôles par Utilisateur",
    maxRolesDescription: "Nombre maximum de rôles assignables à un utilisateur",
    auditLogging: "Logs d'Audit",
    auditLoggingDescription: "Enregistrement automatique des actions RBAC",
    securityPolicies: "Politiques de Sécurité",
    securityPoliciesDescription: "Règles de sécurité et contrôles d'accès",
    enforceRLS: "Forcer RLS Supabase",
    enforceRLSDescription:
      "Row Level Security obligatoire sur toutes les tables",
    requireMFA: "Exiger MFA",
    requireMFADescription:
      "Authentification multi-facteurs pour rôles sensibles",
    passwordPolicy: "Politique Mots de Passe",
    passwordPolicyDescription:
      "Règles de complexité et rotation des mots de passe",
    securityNote:
      "Les modifications de sécurité nécessitent une validation par un Super Admin.",
    enabled: "Activé",
    adminOnly: "Admin seulement",
    configure: "Configurer",
  },
};

// ============================================================================
// TRADUCTIONS DE
// ============================================================================

const de: RBACTranslations = {
  roles: {
    super_admin: "Super Administrator",
    platform_admin: "Plattform Administrator",
    school_admin: "Schul Administrator",
    instructor_manager: "Fahrlehrer Manager",
    marketing_manager: "Marketing Manager",
    finance_manager: "Finanz Manager",
    accountant: "Buchhalter",
    secretary: "Sekretär",
    theory_instructor: "Theorie Lehrer",
    instructor: "Fahrlehrer",
    prospect: "Interessent",
    student: "Schüler",
    alumni: "Ehemaliger Schüler",
    parent: "Elternteil",
    guest: "Gast",
  },

  resources: {
    students: "Schüler",
    instructors: "Fahrlehrer",
    vehicles: "Fahrzeuge",
    lessons: "Praktische Lektionen",
    theory_courses: "Theoriekurse",
    invoices: "Rechnungen",
    payments: "Zahlungen",
    prospects: "Interessenten",
    campaigns: "Kampagnen",
    pixels: "Tracking Pixel",
    tasks: "Aufgaben",
    messages: "Nachrichten",
    settings: "Einstellungen",
    audit_logs: "Audit Protokolle",
    tenants: "Mandanten",
    roles: "Rollen",
  },

  crudActions: {
    create: "Erstellen",
    read: "Ansehen",
    update: "Bearbeiten",
    delete: "Löschen",
    execute: "Ausführen",
  },

  ui: {
    role: "Rolle",
    roles: "Rollen",
    permission: "Berechtigung",
    permissions: "Berechtigungen",
    resource: "Ressource",
    action: "Aktion",
    description: "Beschreibung",
    level: "Stufe",
    hierarchy: "Hierarchie",
    inherited: "Vererbt",
    system: "System",
    custom: "Benutzerdefiniert",
    granted: "Gewährt",
    revoked: "Widerrufen",
    assign: "Zuweisen",
    unassign: "Entfernen",
    manage_permissions: "Berechtigungen Verwalten",
    manage_roles: "Rollen Verwalten",
    view_details: "Details Anzeigen",
    search_placeholder: "Berechtigungen suchen...",
    filter_by_resource: "Nach Ressource filtern",
    filter_by_action: "Nach Aktion filtern",
    no_permissions: "Keine Berechtigungen",
    all_permissions: "Alle Berechtigungen",
    inherited_from: "Vererbt von",
  },

  conflicts: {
    instructor_busy: "Fahrlehrer beschäftigt",
    vehicle_busy: "Fahrzeug besetzt",
    room_busy: "Raum besetzt",
    student_double_booking: "Schüler Doppelbuchung",
  },

  communications: {
    email: "E-Mail",
    sms: "SMS",
    call: "Anruf",
    meeting: "Termin",
    inbound: "Eingehend",
    outbound: "Ausgehend",
    sent: "Gesendet",
    delivered: "Zugestellt",
    bounced: "Zurückgewiesen",
    failed: "Fehlgeschlagen",
  },

  tasks: {
    urgent: "Dringend",
    high: "Hoch",
    normal: "Normal",
    low: "Niedrig",
    pending: "Ausstehend",
    in_progress: "In Bearbeitung",
    completed: "Abgeschlossen",
    cancelled: "Abgebrochen",
  },

  expiration: {
    created: "Erstellt",
    reminder_7d: "Erinnerung T-7",
    reminder_3d: "Erinnerung T-3",
    reminder_1d: "Erinnerung T-1",
    expired: "Abgelaufen",
    used: "Verwendet",
  },

  page: {
    title: "RBAC Administration",
    description: "Vollständige Verwaltung von Systemrollen und -berechtigungen",
  },

  actions: {
    import: "Importieren",
    export: "Exportieren",
    sync: "Synchronisieren",
  },

  stats: {
    totalRoles: "Gesamt Rollen",
    totalPermissions: "Gesamt Berechtigungen",
    totalUsers: "Gesamt Benutzer",
    systemHealth: "System Gesundheit",
    hierarchical: "Hierarchisch",
    granular: "Granular",
    activeUsers: "Aktive Benutzer",
    lastSync: "Letzte Sync",
  },

  health: {
    healthy: "Gesund",
    warning: "Warnung",
    error: "Fehler",
  },

  alerts: {
    systemWarning:
      "Achtung: Berechtigungsprobleme wurden erkannt. Überprüfen Sie die RBAC-Konfiguration.",
  },

  tabs: {
    overview: "Übersicht",
    management: "Verwaltung",
    audit: "Audit",
    settings: "Einstellungen",
  },

  overview: {
    rolesHierarchy: "Rollen Hierarchie",
    rolesDescription: "Hierarchische Struktur mit Berechtigungsvererbung",
    permissionsSummary: "Berechtigungen Zusammenfassung",
    permissionsDescription: "Nach Systemressource gruppierte Berechtigungen",
    level: "Stufe",
    users: "Benutzer",
    permissions: "Berechtigungen",
  },

  management: {
    title: "Rollen- und Berechtigungsverwaltung",
    description:
      "Vollständige Schnittstelle zur Zuweisung und Verwaltung von Berechtigungen nach Rollen",
  },

  audit: {
    title: "RBAC Audit Journal",
    description:
      "Vollständige Historie der Rollen- und Berechtigungsänderungen",
    searchPlaceholder: "In Logs suchen...",
    export: "Exportieren",
  },

  settings: {
    systemConfig: "Systemkonfiguration",
    systemConfigDescription: "Globale Sicherheits- und RBAC-Einstellungen",
    sessionTimeout: "Session Timeout (min)",
    sessionTimeoutDescription: "Inaktivitätsdauer vor automatischer Abmeldung",
    maxRolesPerUser: "Max Rollen pro Benutzer",
    maxRolesDescription: "Maximale Anzahl zuweisbarer Rollen pro Benutzer",
    auditLogging: "Audit Protokollierung",
    auditLoggingDescription: "Automatische Aufzeichnung von RBAC-Aktionen",
    securityPolicies: "Sicherheitsrichtlinien",
    securityPoliciesDescription: "Sicherheitsregeln und Zugangskontrollen",
    enforceRLS: "RLS Supabase Erzwingen",
    enforceRLSDescription: "Row Level Security obligatorisch für alle Tabellen",
    requireMFA: "MFA Erforderlich",
    requireMFADescription: "Multi-Faktor-Authentifizierung für sensible Rollen",
    passwordPolicy: "Passwort-Richtlinie",
    passwordPolicyDescription: "Komplexitätsregeln und Passwort-Rotation",
    securityNote:
      "Sicherheitsänderungen erfordern eine Validierung durch einen Super Admin.",
    enabled: "Aktiviert",
    adminOnly: "Nur Admin",
    configure: "Konfigurieren",
  },
};

// ============================================================================
// TRADUCTIONS IT
// ============================================================================

const it: RBACTranslations = {
  roles: {
    super_admin: "Super Amministratore",
    platform_admin: "Amministratore Piattaforma",
    school_admin: "Amministratore Scuola",
    instructor_manager: "Responsabile Istruttori",
    marketing_manager: "Responsabile Marketing",
    finance_manager: "Responsabile Finanze",
    accountant: "Contabile",
    secretary: "Segretario",
    theory_instructor: "Istruttore Teoria",
    instructor: "Istruttore",
    prospect: "Prospetto",
    student: "Allievo",
    alumni: "Ex Allievo",
    parent: "Genitore",
    guest: "Ospite",
  },

  resources: {
    students: "Allievi",
    instructors: "Istruttori",
    vehicles: "Veicoli",
    lessons: "Lezioni Pratiche",
    theory_courses: "Corsi Teorici",
    invoices: "Fatture",
    payments: "Pagamenti",
    prospects: "Prospetti",
    campaigns: "Campagne",
    pixels: "Pixel Tracking",
    tasks: "Compiti",
    messages: "Messaggi",
    settings: "Impostazioni",
    audit_logs: "Log Audit",
    tenants: "Tenant",
    roles: "Ruoli",
  },

  crudActions: {
    create: "Creare",
    read: "Consultare",
    update: "Modificare",
    delete: "Eliminare",
    execute: "Eseguire",
  },

  ui: {
    role: "Ruolo",
    roles: "Ruoli",
    permission: "Permesso",
    permissions: "Permessi",
    resource: "Risorsa",
    action: "Azione",
    description: "Descrizione",
    level: "Livello",
    hierarchy: "Gerarchia",
    inherited: "Ereditato",
    system: "Sistema",
    custom: "Personalizzato",
    granted: "Concesso",
    revoked: "Revocato",
    assign: "Assegnare",
    unassign: "Rimuovere",
    manage_permissions: "Gestire Permessi",
    manage_roles: "Gestire Ruoli",
    view_details: "Visualizza Dettagli",
    search_placeholder: "Cerca permessi...",
    filter_by_resource: "Filtra per risorsa",
    filter_by_action: "Filtra per azione",
    no_permissions: "Nessun permesso",
    all_permissions: "Tutti i permessi",
    inherited_from: "Ereditato da",
  },

  conflicts: {
    instructor_busy: "Istruttore occupato",
    vehicle_busy: "Veicolo occupato",
    room_busy: "Sala occupata",
    student_double_booking: "Allievo doppia prenotazione",
  },

  communications: {
    email: "Email",
    sms: "SMS",
    call: "Chiamata",
    meeting: "Appuntamento",
    inbound: "In entrata",
    outbound: "In uscita",
    sent: "Inviato",
    delivered: "Consegnato",
    bounced: "Rimbalzato",
    failed: "Fallito",
  },

  tasks: {
    urgent: "Urgente",
    high: "Alta",
    normal: "Normale",
    low: "Bassa",
    pending: "In attesa",
    in_progress: "In corso",
    completed: "Completato",
    cancelled: "Annullato",
  },

  expiration: {
    created: "Creato",
    reminder_7d: "Promemoria G-7",
    reminder_3d: "Promemoria G-3",
    reminder_1d: "Promemoria G-1",
    expired: "Scaduto",
    used: "Utilizzato",
  },

  page: {
    title: "Amministrazione RBAC",
    description: "Gestione completa di ruoli e permessi di sistema",
  },

  actions: {
    import: "Importare",
    export: "Esportare",
    sync: "Sincronizzare",
  },

  stats: {
    totalRoles: "Totale Ruoli",
    totalPermissions: "Totale Permessi",
    totalUsers: "Totale Utenti",
    systemHealth: "Salute Sistema",
    hierarchical: "Gerarchici",
    granular: "Granulari",
    activeUsers: "Utenti attivi",
    lastSync: "Ultima sync",
  },

  health: {
    healthy: "Sano",
    warning: "Attenzione",
    error: "Errore",
  },

  alerts: {
    systemWarning:
      "Attenzione: Sono stati rilevati problemi di permessi. Verificare la configurazione RBAC.",
  },

  tabs: {
    overview: "Panoramica",
    management: "Gestione",
    audit: "Audit",
    settings: "Impostazioni",
  },

  overview: {
    rolesHierarchy: "Gerarchia dei Ruoli",
    rolesDescription: "Struttura gerarchica con ereditarietà dei permessi",
    permissionsSummary: "Riassunto dei Permessi",
    permissionsDescription: "Permessi raggruppati per risorsa di sistema",
    level: "Livello",
    users: "utenti",
    permissions: "permessi",
  },

  management: {
    title: "Gestione Ruoli e Permessi",
    description:
      "Interfaccia completa per assegnare e gestire i permessi per ruolo",
  },

  audit: {
    title: "Giornale Audit RBAC",
    description: "Cronologia completa delle modifiche di ruoli e permessi",
    searchPlaceholder: "Cerca nei log...",
    export: "Esportare",
  },

  settings: {
    systemConfig: "Configurazione Sistema",
    systemConfigDescription: "Impostazioni globali di sicurezza e RBAC",
    sessionTimeout: "Timeout Sessione (min)",
    sessionTimeoutDescription:
      "Durata di inattività prima della disconnessione automatica",
    maxRolesPerUser: "Max Ruoli per Utente",
    maxRolesDescription: "Numero massimo di ruoli assegnabili a un utente",
    auditLogging: "Log di Audit",
    auditLoggingDescription: "Registrazione automatica delle azioni RBAC",
    securityPolicies: "Politiche di Sicurezza",
    securityPoliciesDescription: "Regole di sicurezza e controlli di accesso",
    enforceRLS: "Forza RLS Supabase",
    enforceRLSDescription:
      "Row Level Security obbligatorio su tutte le tabelle",
    requireMFA: "Richiedi MFA",
    requireMFADescription: "Autenticazione multi-fattore per ruoli sensibili",
    passwordPolicy: "Politica Password",
    passwordPolicyDescription:
      "Regole di complessità e rotazione delle password",
    securityNote:
      "Le modifiche di sicurezza richiedono la validazione da parte di un Super Admin.",
    enabled: "Abilitato",
    adminOnly: "Solo Admin",
    configure: "Configurare",
  },
};

// ============================================================================
// TRADUCTIONS EN
// ============================================================================

const en: RBACTranslations = {
  roles: {
    super_admin: "Super Administrator",
    platform_admin: "Platform Administrator",
    school_admin: "School Administrator",
    instructor_manager: "Instructor Manager",
    marketing_manager: "Marketing Manager",
    finance_manager: "Finance Manager",
    accountant: "Accountant",
    secretary: "Secretary",
    theory_instructor: "Theory Instructor",
    instructor: "Instructor",
    prospect: "Prospect",
    student: "Student",
    alumni: "Alumni",
    parent: "Parent",
    guest: "Guest",
  },

  resources: {
    students: "Students",
    instructors: "Instructors",
    vehicles: "Vehicles",
    lessons: "Practical Lessons",
    theory_courses: "Theory Courses",
    invoices: "Invoices",
    payments: "Payments",
    prospects: "Prospects",
    campaigns: "Campaigns",
    pixels: "Tracking Pixels",
    tasks: "Tasks",
    messages: "Messages",
    settings: "Settings",
    audit_logs: "Audit Logs",
    tenants: "Tenants",
    roles: "Roles",
  },

  crudActions: {
    create: "Create",
    read: "Read",
    update: "Update",
    delete: "Delete",
    execute: "Execute",
  },

  ui: {
    role: "Role",
    roles: "Roles",
    permission: "Permission",
    permissions: "Permissions",
    resource: "Resource",
    action: "Action",
    description: "Description",
    level: "Level",
    hierarchy: "Hierarchy",
    inherited: "Inherited",
    system: "System",
    custom: "Custom",
    granted: "Granted",
    revoked: "Revoked",
    assign: "Assign",
    unassign: "Unassign",
    manage_permissions: "Manage Permissions",
    manage_roles: "Manage Roles",
    view_details: "View Details",
    search_placeholder: "Search permissions...",
    filter_by_resource: "Filter by resource",
    filter_by_action: "Filter by action",
    no_permissions: "No permissions",
    all_permissions: "All permissions",
    inherited_from: "Inherited from",
  },

  conflicts: {
    instructor_busy: "Instructor busy",
    vehicle_busy: "Vehicle busy",
    room_busy: "Room busy",
    student_double_booking: "Student double booking",
  },

  communications: {
    email: "Email",
    sms: "SMS",
    call: "Call",
    meeting: "Meeting",
    inbound: "Inbound",
    outbound: "Outbound",
    sent: "Sent",
    delivered: "Delivered",
    bounced: "Bounced",
    failed: "Failed",
  },

  tasks: {
    urgent: "Urgent",
    high: "High",
    normal: "Normal",
    low: "Low",
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  },

  expiration: {
    created: "Created",
    reminder_7d: "Reminder D-7",
    reminder_3d: "Reminder D-3",
    reminder_1d: "Reminder D-1",
    expired: "Expired",
    used: "Used",
  },

  page: {
    title: "RBAC Administration",
    description: "Complete management of system roles and permissions",
  },

  actions: {
    import: "Import",
    export: "Export",
    sync: "Sync",
  },

  stats: {
    totalRoles: "Total Roles",
    totalPermissions: "Total Permissions",
    totalUsers: "Total Users",
    systemHealth: "System Health",
    hierarchical: "Hierarchical",
    granular: "Granular",
    activeUsers: "Active users",
    lastSync: "Last sync",
  },

  health: {
    healthy: "Healthy",
    warning: "Warning",
    error: "Error",
  },

  alerts: {
    systemWarning:
      "Warning: Permission issues have been detected. Check RBAC configuration.",
  },

  tabs: {
    overview: "Overview",
    management: "Management",
    audit: "Audit",
    settings: "Settings",
  },

  overview: {
    rolesHierarchy: "Roles Hierarchy",
    rolesDescription: "Hierarchical structure with permission inheritance",
    permissionsSummary: "Permissions Summary",
    permissionsDescription: "Permissions grouped by system resource",
    level: "Level",
    users: "users",
    permissions: "permissions",
  },

  management: {
    title: "Roles and Permissions Management",
    description: "Complete interface to assign and manage permissions by role",
  },

  audit: {
    title: "RBAC Audit Journal",
    description: "Complete history of role and permission changes",
    searchPlaceholder: "Search in logs...",
    export: "Export",
  },

  settings: {
    systemConfig: "System Configuration",
    systemConfigDescription: "Global security and RBAC settings",
    sessionTimeout: "Session Timeout (min)",
    sessionTimeoutDescription: "Inactivity duration before automatic logout",
    maxRolesPerUser: "Max Roles per User",
    maxRolesDescription: "Maximum number of roles assignable to a user",
    auditLogging: "Audit Logging",
    auditLoggingDescription: "Automatic recording of RBAC actions",
    securityPolicies: "Security Policies",
    securityPoliciesDescription: "Security rules and access controls",
    enforceRLS: "Enforce RLS Supabase",
    enforceRLSDescription: "Row Level Security mandatory on all tables",
    requireMFA: "Require MFA",
    requireMFADescription: "Multi-factor authentication for sensitive roles",
    passwordPolicy: "Password Policy",
    passwordPolicyDescription: "Complexity rules and password rotation",
    securityNote: "Security changes require validation by a Super Admin.",
    enabled: "Enabled",
    adminOnly: "Admin only",
    configure: "Configure",
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export const rbacI18n: Record<RBACLocale, RBACTranslations> = {
  fr,
  de,
  it,
  en,
};

export default rbacI18n;
