/**
 * VIAMENTOR - System Settings i18n
 * Traductions paramètres système
 */

export type SystemLocale = "fr" | "de" | "it" | "en";

export const systemSettingsI18n = {
  fr: {
    pageTitle: "Paramètres Système",
    pageDescription: "Configuration avancée intégrations, sécurité, conformité",
    saveAll: "Enregistrer tout",
    exportConfig: "Exporter config",
    importConfig: "Importer config",

    // Tabs
    tabIntegrations: "Intégrations",
    tabSecurity: "Sécurité",
    tabCompliance: "Conformité",
    tabAdvanced: "Avancé",

    // Calendars
    calendarsTitle: "Calendriers",
    googleCalendar: "Google Calendar",
    connect: "Connecter",
    disconnect: "Déconnecter",
    syncNow: "Synchroniser maintenant",
    syncPracticalLessons: "Leçons pratiques",
    syncTheoryCourses: "Cours théoriques",
    eventColor: "Couleur événements",
    lastSync: "Dernière sync",

    // Payments
    paymentsTitle: "Paiements",
    stripe: "Stripe",
    twint: "Twint",
    postfinance: "PostFinance",
    apiKeyPublic: "Clé API publique",
    apiKeySecret: "Clé API secrète",
    mode: "Mode",
    testConnection: "Tester connexion",
    transactions: "Transactions",

    // Security
    authenticationTitle: "Authentification",
    twoFactorAuth: "Authentification 2FA",
    sessionDuration: "Durée session",
    passwordsTitle: "Mots de passe",
    strongPolicy: "Politique forte",
    minLength: "Longueur minimale",

    // Compliance
    gdprTitle: "RGPD",
    strictMode: "Mode strict",
    dpoEmail: "Email DPO",
    cookiesTitle: "Cookies",
    bannerEnabled: "Bandeau actif",

    // Advanced
    maintenanceTitle: "Maintenance",
    clearCache: "Vider cache",
    backupsTitle: "Sauvegardes",
    autoBackups: "Sauvegardes auto",

    // Common
    enabled: "Activé",
    disabled: "Désactivé",
    save: "Enregistrer",
    cancel: "Annuler",
    success: "Succès",
    error: "Erreur",
  },
  de: {
    pageTitle: "Systemeinstellungen",
    pageDescription:
      "Erweiterte Konfiguration Integrationen, Sicherheit, Compliance",
    saveAll: "Alles speichern",
    exportConfig: "Konfiguration exportieren",
    importConfig: "Konfiguration importieren",

    tabIntegrations: "Integrationen",
    tabSecurity: "Sicherheit",
    tabCompliance: "Compliance",
    tabAdvanced: "Erweitert",

    calendarsTitle: "Kalender",
    googleCalendar: "Google Kalender",
    connect: "Verbinden",
    disconnect: "Trennen",
    syncNow: "Jetzt synchronisieren",
    syncPracticalLessons: "Praktische Lektionen",
    syncTheoryCourses: "Theoriekurse",
    eventColor: "Ereignisfarbe",
    lastSync: "Letzte Sync",

    paymentsTitle: "Zahlungen",
    stripe: "Stripe",
    twint: "Twint",
    postfinance: "PostFinance",
    apiKeyPublic: "Öffentlicher API-Schlüssel",
    apiKeySecret: "Geheimer API-Schlüssel",
    mode: "Modus",
    testConnection: "Verbindung testen",
    transactions: "Transaktionen",

    authenticationTitle: "Authentifizierung",
    twoFactorAuth: "2FA-Authentifizierung",
    sessionDuration: "Sitzungsdauer",
    passwordsTitle: "Passwörter",
    strongPolicy: "Starke Richtlinie",
    minLength: "Mindestlänge",

    gdprTitle: "DSGVO",
    strictMode: "Strenger Modus",
    dpoEmail: "DSB-E-Mail",
    cookiesTitle: "Cookies",
    bannerEnabled: "Banner aktiv",

    maintenanceTitle: "Wartung",
    clearCache: "Cache leeren",
    backupsTitle: "Backups",
    autoBackups: "Auto-Backups",

    enabled: "Aktiviert",
    disabled: "Deaktiviert",
    save: "Speichern",
    cancel: "Abbrechen",
    success: "Erfolg",
    error: "Fehler",
  },
  it: {
    pageTitle: "Impostazioni Sistema",
    pageDescription:
      "Configurazione avanzata integrazioni, sicurezza, conformità",
    saveAll: "Salva tutto",
    exportConfig: "Esporta config",
    importConfig: "Importa config",

    tabIntegrations: "Integrazioni",
    tabSecurity: "Sicurezza",
    tabCompliance: "Conformità",
    tabAdvanced: "Avanzate",

    calendarsTitle: "Calendari",
    googleCalendar: "Google Calendar",
    connect: "Connetti",
    disconnect: "Disconnetti",
    syncNow: "Sincronizza ora",
    syncPracticalLessons: "Lezioni pratiche",
    syncTheoryCourses: "Corsi teorici",
    eventColor: "Colore eventi",
    lastSync: "Ultima sync",

    paymentsTitle: "Pagamenti",
    stripe: "Stripe",
    twint: "Twint",
    postfinance: "PostFinance",
    apiKeyPublic: "Chiave API pubblica",
    apiKeySecret: "Chiave API segreta",
    mode: "Modalità",
    testConnection: "Testa connessione",
    transactions: "Transazioni",

    authenticationTitle: "Autenticazione",
    twoFactorAuth: "Autenticazione 2FA",
    sessionDuration: "Durata sessione",
    passwordsTitle: "Password",
    strongPolicy: "Politica forte",
    minLength: "Lunghezza minima",

    gdprTitle: "GDPR",
    strictMode: "Modalità rigorosa",
    dpoEmail: "Email DPO",
    cookiesTitle: "Cookie",
    bannerEnabled: "Banner attivo",

    maintenanceTitle: "Manutenzione",
    clearCache: "Svuota cache",
    backupsTitle: "Backup",
    autoBackups: "Backup auto",

    enabled: "Attivato",
    disabled: "Disattivato",
    save: "Salva",
    cancel: "Annulla",
    success: "Successo",
    error: "Errore",
  },
  en: {
    pageTitle: "System Settings",
    pageDescription:
      "Advanced configuration integrations, security, compliance",
    saveAll: "Save all",
    exportConfig: "Export config",
    importConfig: "Import config",

    tabIntegrations: "Integrations",
    tabSecurity: "Security",
    tabCompliance: "Compliance",
    tabAdvanced: "Advanced",

    calendarsTitle: "Calendars",
    googleCalendar: "Google Calendar",
    connect: "Connect",
    disconnect: "Disconnect",
    syncNow: "Sync now",
    syncPracticalLessons: "Practical lessons",
    syncTheoryCourses: "Theory courses",
    eventColor: "Event color",
    lastSync: "Last sync",

    paymentsTitle: "Payments",
    stripe: "Stripe",
    twint: "Twint",
    postfinance: "PostFinance",
    apiKeyPublic: "Public API key",
    apiKeySecret: "Secret API key",
    mode: "Mode",
    testConnection: "Test connection",
    transactions: "Transactions",

    authenticationTitle: "Authentication",
    twoFactorAuth: "Two-factor authentication",
    sessionDuration: "Session duration",
    passwordsTitle: "Passwords",
    strongPolicy: "Strong policy",
    minLength: "Minimum length",

    gdprTitle: "GDPR",
    strictMode: "Strict mode",
    dpoEmail: "DPO email",
    cookiesTitle: "Cookies",
    bannerEnabled: "Banner enabled",

    maintenanceTitle: "Maintenance",
    clearCache: "Clear cache",
    backupsTitle: "Backups",
    autoBackups: "Auto backups",

    enabled: "Enabled",
    disabled: "Disabled",
    save: "Save",
    cancel: "Cancel",
    success: "Success",
    error: "Error",
  },
};

export function getSystemSettingsTranslation(locale: SystemLocale) {
  return systemSettingsI18n[locale] || systemSettingsI18n.fr;
}
