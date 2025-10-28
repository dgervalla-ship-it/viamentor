/**
 * VIAMENTOR - Navigation i18n
 * Traductions FR/DE/IT/EN pour navigation sidebar
 *
 * Sections:
 * - Navigation labels (sections, links)
 * - Sidebar UI (collapse, shortcuts, status)
 * - User menu (profile, settings, logout)
 */

export type NavigationLocale = "fr" | "de" | "it" | "en";

export interface NavigationTranslations {
  navigation: {
    sections: {
      systemAdmin: string;
      platform: string;
      school: string;
      planning: string;
      commercial: string;
      marketing: string;
      billing: string;
      analytics: string;
      settings: string;
    };
    // Common
    dashboard: string;
    support: string;
    profile: string;
    planning: string;
    lessons: string;
    settings: string;
    // Super Admin
    superAdminDashboard: string;
    tenants: string;
    globalUsers: string;
    auditLogs: string;
    systemConfig: string;
    platformAnalytics: string;
    tenantsBilling: string;
    systemHealth: string;
    securityAlerts: string;
    featureFlags: string;
    documentation: string;
    monitoring: string;
    configuration: string;
    // Platform Admin
    activeTenants: string;
    supportTickets: string;
    gdprExports: string;
    globalReports: string;
    // School Admin
    students: string;
    instructors: string;
    secretaries: string;
    vehicles: string;
    rooms: string;
    lessonsCalendar: string;
    instructorsAvailability: string;
    groupLessons: string;
    makeups: string;
    prospectsCRM: string;
    registrations: string;
    marketingCampaigns: string;
    pixelsTracking: string;
    invoices: string;
    payments: string;
    qrInvoices: string;
    reminders: string;
    dashboardAnalytics: string;
    reports: string;
    performance: string;
    roiCampaigns: string;
    schoolSettings: string;
    pricing: string;
    categories: string;
    courseTypes: string;
    makeupsConfig: string;
    integrations: string;
    users: string;
    // Instructor Manager
    instructorManagerDashboard: string;
    teamManagement: string;
    teamPlanning: string;
    teamPerformance: string;
    studentAssignments: string;
    teamRequests: string;
    // Marketing Manager
    marketingManagerDashboard: string;
    reviewsManagement: string;
    roiAnalytics: string;
    attribution: string;
    // Finance Manager
    financeManagerDashboard: string;
    financialAnalytics: string;
    revenueAnalytics: string;
    // Accountant
    accountantDashboard: string;
    accountingReports: string;
    vatReports: string;
    reports: string;
    // Instructor
    personalPlanning: string;
    myStudents: string;
    evaluations: string;
    availability: string;
    studentsMakeups: string;
    // Student
    bookLesson: string;
    myProgression: string;
    myLessons: string;
    documents: string;
    // Secretary
    dailyTasks: string;
    quickRegister: string;
    schoolPlanning: string;
    prospects: string;
    messages: string;
  };
  sidebar: {
    collapse: string;
    expand: string;
    shortcuts: string;
    version: string;
    status: string;
    profile: string;
    settings: string;
    preferences: string;
    theme: string;
    logout: string;
    online: string;
    away: string;
    offline: string;
    apiHealthy: string;
    apiDegraded: string;
    apiDown: string;
  };
}

export const NAVIGATION_I18N: Record<NavigationLocale, NavigationTranslations> =
  {
    fr: {
      navigation: {
        sections: {
          systemAdmin: "Administration Système",
          platform: "Gestion Plateforme",
          school: "École",
          planning: "Planning",
          commercial: "Commercial",
          marketing: "Marketing",
          billing: "Facturation",
          analytics: "Statistiques",
          settings: "Paramètres",
        },
        dashboard: "Tableau de bord",
        support: "Support",
        profile: "Profil",
        planning: "Planning",
        lessons: "Leçons",
        settings: "Paramètres",
        // Super Admin
        superAdminDashboard: "Dashboard Super Admin",
        tenants: "Tenants",
        globalUsers: "Utilisateurs globaux",
        auditLogs: "Audit logs",
        systemConfig: "Configurations système",
        platformAnalytics: "Analytics plateforme",
        tenantsBilling: "Facturation tenants",
        systemHealth: "Santé système",
        securityAlerts: "Alertes sécurité",
        featureFlags: "Feature flags",
        documentation: "Documentation",
        monitoring: "Monitoring",
        configuration: "Configuration",
        // Platform Admin
        activeTenants: "Tenants actifs",
        supportTickets: "Support tickets",
        gdprExports: "Exports RGPD",
        globalReports: "Rapports globaux",
        // School Admin
        students: "Élèves",
        instructors: "Moniteurs",
        secretaries: "Secrétaires",
        vehicles: "Véhicules",
        rooms: "Salles",
        lessonsCalendar: "Calendrier leçons",
        instructorsAvailability: "Disponibilités moniteurs",
        groupLessons: "Cours collectifs",
        makeups: "Rattrapages",
        prospectsCRM: "Prospects CRM",
        registrations: "Inscriptions",
        marketingCampaigns: "Campagnes marketing",
        pixelsTracking: "Pixels tracking",
        invoices: "Factures",
        payments: "Paiements",
        qrInvoices: "QR-factures",
        reminders: "Rappels",
        dashboardAnalytics: "Dashboard analytics",
        reports: "Rapports",
        performance: "Performances",
        roiCampaigns: "ROI campagnes",
        schoolSettings: "École",
        pricing: "Tarifs",
        categories: "Catégories",
        courseTypes: "Types cours",
        makeupsConfig: "Rattrapages config",
        integrations: "Intégrations",
        users: "Utilisateurs",
        // Instructor Manager
        instructorManagerDashboard: "Gestion des moniteurs",
        teamManagement: "Équipe pédagogique",
        teamPlanning: "Planning équipe",
        teamPerformance: "Performance équipe",
        studentAssignments: "Affectations élèves",
        teamRequests: "Demandes équipe",
        // Marketing Manager
        marketingManagerDashboard: "Marketing Manager",
        reviewsManagement: "Gestion avis",
        roiAnalytics: "Analytics ROI",
        attribution: "Attribution",
        // Finance Manager
        financeManagerDashboard: "Gestion Financière",
        financialAnalytics: "Analytics financières",
        revenueAnalytics: "Analytics revenus",
        // Accountant
        accountantDashboard: "Comptabilité",
        accountingReports: "Rapports comptables",
        vatReports: "Rapports TVA",
        reports: "Rapports",
        // Instructor
        personalPlanning: "Planning personnel",
        myStudents: "Mes élèves",
        evaluations: "Évaluations",
        availability: "Disponibilités",
        studentsMakeups: "Rattrapages élèves",
        // Student
        bookLesson: "Réserver leçon",
        myProgression: "Ma progression",
        myLessons: "Mes leçons",
        documents: "Documents",
        // Secretary
        dailyTasks: "Tâches quotidiennes",
        quickRegister: "Inscription rapide",
        schoolPlanning: "Planning école",
        prospects: "Prospects",
        messages: "Messages",
      },
      sidebar: {
        collapse: "Réduire",
        expand: "Étendre",
        shortcuts: "Raccourcis clavier",
        version: "Version",
        status: "Statut",
        profile: "Profil",
        settings: "Paramètres",
        preferences: "Préférences",
        theme: "Thème",
        logout: "Déconnexion",
        online: "En ligne",
        away: "Absent",
        offline: "Hors ligne",
        apiHealthy: "API opérationnelle",
        apiDegraded: "API dégradée",
        apiDown: "API indisponible",
      },
    },
    de: {
      navigation: {
        sections: {
          systemAdmin: "Systemverwaltung",
          platform: "Plattformverwaltung",
          school: "Schule",
          planning: "Planung",
          commercial: "Vertrieb",
          marketing: "Marketing",
          billing: "Abrechnung",
          analytics: "Statistiken",
          settings: "Einstellungen",
        },
        dashboard: "Dashboard",
        support: "Support",
        profile: "Profil",
        planning: "Planung",
        lessons: "Lektionen",
        settings: "Einstellungen",
        // Super Admin
        superAdminDashboard: "Super Admin Dashboard",
        tenants: "Mandanten",
        globalUsers: "Globale Benutzer",
        auditLogs: "Audit-Protokolle",
        systemConfig: "Systemkonfiguration",
        platformAnalytics: "Plattform-Analytics",
        tenantsBilling: "Mandanten-Abrechnung",
        systemHealth: "Systemzustand",
        securityAlerts: "Sicherheitswarnungen",
        featureFlags: "Feature-Flags",
        documentation: "Dokumentation",
        monitoring: "Überwachung",
        configuration: "Konfiguration",
        // Platform Admin
        activeTenants: "Aktive Mandanten",
        supportTickets: "Support-Tickets",
        gdprExports: "DSGVO-Exporte",
        globalReports: "Globale Berichte",
        // School Admin
        students: "Schüler",
        instructors: "Fahrlehrer",
        secretaries: "Sekretärinnen",
        vehicles: "Fahrzeuge",
        rooms: "Räume",
        lessonsCalendar: "Fahrstunden-Kalender",
        instructorsAvailability: "Fahrlehrer-Verfügbarkeit",
        groupLessons: "Gruppenkurse",
        makeups: "Nachholstunden",
        prospectsCRM: "Interessenten-CRM",
        registrations: "Anmeldungen",
        marketingCampaigns: "Marketing-Kampagnen",
        pixelsTracking: "Pixel-Tracking",
        invoices: "Rechnungen",
        payments: "Zahlungen",
        qrInvoices: "QR-Rechnungen",
        reminders: "Erinnerungen",
        dashboardAnalytics: "Dashboard-Analytics",
        reports: "Berichte",
        performance: "Leistungen",
        roiCampaigns: "ROI-Kampagnen",
        schoolSettings: "Fahrschule",
        pricing: "Preise",
        categories: "Kategorien",
        courseTypes: "Kurstypen",
        makeupsConfig: "Nachholstunden-Konfiguration",
        integrations: "Integrationen",
        users: "Benutzer",
        // Instructor Manager
        instructorManagerDashboard: "Fahrlehrer-Verwaltung",
        teamManagement: "Lehrteam",
        teamPlanning: "Team-Planung",
        teamPerformance: "Team-Leistung",
        studentAssignments: "Schülerzuweisungen",
        teamRequests: "Team-Anfragen",
        // Marketing Manager
        marketingManagerDashboard: "Marketing Manager",
        reviewsManagement: "Bewertungsverwaltung",
        roiAnalytics: "ROI-Analytics",
        attribution: "Attribution",
        // Finance Manager
        financeManagerDashboard: "Finanzverwaltung",
        financialAnalytics: "Finanzanalysen",
        revenueAnalytics: "Umsatzanalysen",
        // Accountant
        accountantDashboard: "Buchhaltung",
        accountingReports: "Buchhaltungsberichte",
        vatReports: "MwSt-Berichte",
        reports: "Berichte",
        // Instructor
        personalPlanning: "Persönliche Planung",
        myStudents: "Meine Schüler",
        evaluations: "Bewertungen",
        availability: "Verfügbarkeit",
        studentsMakeups: "Schüler-Nachholstunden",
        // Student
        bookLesson: "Fahrstunde buchen",
        myProgression: "Mein Fortschritt",
        myLessons: "Meine Fahrstunden",
        documents: "Dokumente",
        // Secretary
        dailyTasks: "Tägliche Aufgaben",
        quickRegister: "Schnellanmeldung",
        schoolPlanning: "Schulplanung",
        prospects: "Interessenten",
        messages: "Nachrichten",
      },
      sidebar: {
        collapse: "Einklappen",
        expand: "Ausklappen",
        shortcuts: "Tastenkombinationen",
        version: "Version",
        status: "Status",
        profile: "Profil",
        settings: "Einstellungen",
        preferences: "Einstellungen",
        theme: "Thema",
        logout: "Abmelden",
        online: "Online",
        away: "Abwesend",
        offline: "Offline",
        apiHealthy: "API betriebsbereit",
        apiDegraded: "API beeinträchtigt",
        apiDown: "API nicht verfügbar",
      },
    },
    it: {
      navigation: {
        sections: {
          systemAdmin: "Amministrazione Sistema",
          platform: "Gestione Piattaforma",
          school: "Scuola",
          planning: "Pianificazione",
          commercial: "Commerciale",
          marketing: "Marketing",
          billing: "Fatturazione",
          analytics: "Statistiche",
          settings: "Impostazioni",
        },
        dashboard: "Dashboard",
        support: "Supporto",
        profile: "Profilo",
        planning: "Pianificazione",
        lessons: "Lezioni",
        settings: "Impostazioni",
        // Super Admin
        superAdminDashboard: "Dashboard Super Admin",
        tenants: "Tenant",
        globalUsers: "Utenti globali",
        auditLogs: "Log di audit",
        systemConfig: "Configurazione sistema",
        platformAnalytics: "Analytics piattaforma",
        tenantsBilling: "Fatturazione tenant",
        systemHealth: "Salute sistema",
        securityAlerts: "Avvisi sicurezza",
        featureFlags: "Feature flag",
        documentation: "Documentazione",
        monitoring: "Monitoraggio",
        configuration: "Configurazione",
        // Platform Admin
        activeTenants: "Tenant attivi",
        supportTickets: "Ticket di supporto",
        gdprExports: "Esportazioni GDPR",
        globalReports: "Rapporti globali",
        // School Admin
        students: "Allievi",
        instructors: "Istruttori",
        secretaries: "Segretarie",
        vehicles: "Veicoli",
        rooms: "Aule",
        lessonsCalendar: "Calendario lezioni",
        instructorsAvailability: "Disponibilità istruttori",
        groupLessons: "Corsi collettivi",
        makeups: "Recuperi",
        prospectsCRM: "Prospect CRM",
        registrations: "Iscrizioni",
        marketingCampaigns: "Campagne marketing",
        pixelsTracking: "Tracking pixel",
        invoices: "Fatture",
        payments: "Pagamenti",
        qrInvoices: "Fatture QR",
        reminders: "Promemoria",
        dashboardAnalytics: "Dashboard analytics",
        reports: "Rapporti",
        performance: "Prestazioni",
        roiCampaigns: "ROI campagne",
        schoolSettings: "Scuola guida",
        pricing: "Prezzi",
        categories: "Categorie",
        courseTypes: "Tipi di corso",
        makeupsConfig: "Configurazione recuperi",
        integrations: "Integrazioni",
        users: "Utenti",
        // Instructor Manager
        instructorManagerDashboard: "Gestione istruttori",
        teamManagement: "Team didattico",
        teamPlanning: "Pianificazione team",
        teamPerformance: "Prestazioni team",
        studentAssignments: "Assegnazioni allievi",
        teamRequests: "Richieste team",
        // Marketing Manager
        marketingManagerDashboard: "Marketing Manager",
        reviewsManagement: "Gestione recensioni",
        roiAnalytics: "Analytics ROI",
        attribution: "Attribuzione",
        // Finance Manager
        financeManagerDashboard: "Gestione Finanziaria",
        financialAnalytics: "Analisi finanziarie",
        revenueAnalytics: "Analisi entrate",
        // Accountant
        accountantDashboard: "Contabilità",
        accountingReports: "Rapporti contabili",
        vatReports: "Rapporti IVA",
        reports: "Rapporti",
        // Instructor
        personalPlanning: "Pianificazione personale",
        myStudents: "I miei allievi",
        evaluations: "Valutazioni",
        availability: "Disponibilità",
        studentsMakeups: "Recuperi allievi",
        // Student
        bookLesson: "Prenota lezione",
        myProgression: "La mia progressione",
        myLessons: "Le mie lezioni",
        documents: "Documenti",
        // Secretary
        dailyTasks: "Compiti quotidiani",
        quickRegister: "Iscrizione rapida",
        schoolPlanning: "Pianificazione scuola",
        prospects: "Prospect",
        messages: "Messaggi",
      },
      sidebar: {
        collapse: "Riduci",
        expand: "Espandi",
        shortcuts: "Scorciatoie da tastiera",
        version: "Versione",
        status: "Stato",
        profile: "Profilo",
        settings: "Impostazioni",
        preferences: "Preferenze",
        theme: "Tema",
        logout: "Disconnetti",
        online: "Online",
        away: "Assente",
        offline: "Offline",
        apiHealthy: "API operativa",
        apiDegraded: "API degradata",
        apiDown: "API non disponibile",
      },
    },
    en: {
      navigation: {
        sections: {
          systemAdmin: "System Administration",
          platform: "Platform Management",
          school: "School",
          planning: "Planning",
          commercial: "Sales",
          marketing: "Marketing",
          billing: "Billing",
          analytics: "Statistics",
          settings: "Settings",
        },
        dashboard: "Dashboard",
        support: "Support",
        profile: "Profile",
        planning: "Planning",
        lessons: "Lessons",
        settings: "Settings",
        // Super Admin
        superAdminDashboard: "Super Admin Dashboard",
        tenants: "Tenants",
        globalUsers: "Global users",
        auditLogs: "Audit logs",
        systemConfig: "System configuration",
        platformAnalytics: "Platform analytics",
        tenantsBilling: "Tenants billing",
        systemHealth: "System health",
        securityAlerts: "Security alerts",
        featureFlags: "Feature flags",
        documentation: "Documentation",
        monitoring: "Monitoring",
        configuration: "Configuration",
        // Platform Admin
        activeTenants: "Active tenants",
        supportTickets: "Support tickets",
        gdprExports: "GDPR exports",
        globalReports: "Global reports",
        // School Admin
        students: "Students",
        instructors: "Instructors",
        secretaries: "Secretaries",
        vehicles: "Vehicles",
        rooms: "Rooms",
        lessonsCalendar: "Lessons calendar",
        instructorsAvailability: "Instructors availability",
        groupLessons: "Group lessons",
        makeups: "Makeups",
        prospectsCRM: "Prospects CRM",
        registrations: "Registrations",
        marketingCampaigns: "Marketing campaigns",
        pixelsTracking: "Pixels tracking",
        invoices: "Invoices",
        payments: "Payments",
        qrInvoices: "QR invoices",
        reminders: "Reminders",
        dashboardAnalytics: "Dashboard analytics",
        reports: "Reports",
        performance: "Performance",
        roiCampaigns: "ROI campaigns",
        schoolSettings: "School",
        pricing: "Pricing",
        categories: "Categories",
        courseTypes: "Course types",
        makeupsConfig: "Makeups configuration",
        integrations: "Integrations",
        users: "Users",
        // Instructor Manager
        instructorManagerDashboard: "Instructor management",
        teamManagement: "Teaching team",
        teamPlanning: "Team planning",
        teamPerformance: "Team performance",
        studentAssignments: "Student assignments",
        teamRequests: "Team requests",
        // Marketing Manager
        marketingManagerDashboard: "Marketing Manager",
        reviewsManagement: "Reviews management",
        roiAnalytics: "ROI Analytics",
        attribution: "Attribution",
        // Finance Manager
        financeManagerDashboard: "Financial Management",
        financialAnalytics: "Financial analytics",
        revenueAnalytics: "Revenue analytics",
        // Accountant
        accountantDashboard: "Accounting",
        accountingReports: "Accounting reports",
        vatReports: "VAT reports",
        reports: "Reports",
        // Instructor
        personalPlanning: "Personal planning",
        myStudents: "My students",
        evaluations: "Evaluations",
        availability: "Availability",
        studentsMakeups: "Students makeups",
        // Student
        bookLesson: "Book lesson",
        myProgression: "My progression",
        myLessons: "My lessons",
        documents: "Documents",
        // Secretary
        dailyTasks: "Daily tasks",
        quickRegister: "Quick register",
        schoolPlanning: "School planning",
        prospects: "Prospects",
        messages: "Messages",
      },
      sidebar: {
        collapse: "Collapse",
        expand: "Expand",
        shortcuts: "Keyboard shortcuts",
        version: "Version",
        status: "Status",
        profile: "Profile",
        settings: "Settings",
        preferences: "Preferences",
        theme: "Theme",
        logout: "Logout",
        online: "Online",
        away: "Away",
        offline: "Offline",
        apiHealthy: "API healthy",
        apiDegraded: "API degraded",
        apiDown: "API down",
      },
    },
  };
