/**
 * VIAMENTOR GDPR i18n
 *
 * Traductions juridiques strictes FR/DE/IT/EN
 *
 * @module data/viamentor-gdpr-i18n
 * @version 1.0.0
 */

export type GDPRLocale = "fr" | "de" | "it" | "en";

export interface GDPRTranslations {
  dashboard: {
    title: string;
    pendingRequests: string;
    urgentBadge: string;
    processAction: string;
    dataBreaches: string;
    consentRate: string;
    lastAudit: string;
    newAudit: string;
    exportGDPR: string;
    dataBreachReport: string;
  };
  requestTypes: {
    Access: string;
    Delete: string;
    Export: string;
    Rectify: string;
  };
  requestStatus: {
    Pending: string;
    "In Progress": string;
    Completed: string;
    Rejected: string;
  };
  rights: {
    access: string;
    erasure: string;
    rectification: string;
    portability: string;
  };
  articles: {
    art15: string;
    art16: string;
    art17: string;
    art20: string;
  };
  workflow: {
    verifyIdentity: string;
    collectData: string;
    generateReport: string;
    delivery: string;
    legalChecks: string;
    anonymizationStrategy: string;
    executeDeletion: string;
    certificate: string;
  };
  dates: {
    submitted: string;
    deadline: string;
    daysAgo: (days: number) => string;
    daysLeft: (days: number) => string;
    overdue: string;
  };
}

export const GDPR_TRANSLATIONS: Record<GDPRLocale, GDPRTranslations> = {
  fr: {
    dashboard: {
      title: "Tableau de bord DPO",
      pendingRequests: "Requêtes en attente",
      urgentBadge: "Urgent",
      processAction: "Traiter",
      dataBreaches: "Violations de données",
      consentRate: "Taux de consentement",
      lastAudit: "Dernier audit",
      newAudit: "Nouvel audit",
      exportGDPR: "Export RGPD",
      dataBreachReport: "Rapport de violation",
    },
    requestTypes: {
      Access: "Accès",
      Delete: "Suppression",
      Export: "Export",
      Rectify: "Rectification",
    },
    requestStatus: {
      Pending: "En attente",
      "In Progress": "En cours",
      Completed: "Terminé",
      Rejected: "Rejeté",
    },
    rights: {
      access: "Droit d'accès",
      erasure: "Droit à l'oubli",
      rectification: "Droit de rectification",
      portability: "Droit à la portabilité",
    },
    articles: {
      art15: "Art. 15 RGPD - Droit d'accès",
      art16: "Art. 16 RGPD - Droit de rectification",
      art17: "Art. 17 RGPD - Droit à l'effacement",
      art20: "Art. 20 RGPD - Droit à la portabilité",
    },
    workflow: {
      verifyIdentity: "Vérifier l'identité de l'utilisateur",
      collectData: "Collecter les données personnelles",
      generateReport: "Générer le rapport",
      delivery: "Livraison",
      legalChecks: "Vérifications légales",
      anonymizationStrategy: "Stratégie de suppression",
      executeDeletion: "Exécuter la suppression",
      certificate: "Certificat de destruction",
    },
    dates: {
      submitted: "Soumis",
      deadline: "Échéance",
      daysAgo: (days: number) => `il y a ${days}j`,
      daysLeft: (days: number) => `J-${days}`,
      overdue: "En retard",
    },
  },
  de: {
    dashboard: {
      title: "DPO-Dashboard",
      pendingRequests: "Ausstehende Anfragen",
      urgentBadge: "Dringend",
      processAction: "Bearbeiten",
      dataBreaches: "Datenschutzverletzungen",
      consentRate: "Zustimmungsrate",
      lastAudit: "Letztes Audit",
      newAudit: "Neues Audit",
      exportGDPR: "DSGVO-Export",
      dataBreachReport: "Verletzungsbericht",
    },
    requestTypes: {
      Access: "Zugriff",
      Delete: "Löschung",
      Export: "Export",
      Rectify: "Berichtigung",
    },
    requestStatus: {
      Pending: "Ausstehend",
      "In Progress": "In Bearbeitung",
      Completed: "Abgeschlossen",
      Rejected: "Abgelehnt",
    },
    rights: {
      access: "Auskunftsrecht",
      erasure: "Recht auf Vergessenwerden",
      rectification: "Berichtigungsrecht",
      portability: "Recht auf Datenübertragbarkeit",
    },
    articles: {
      art15: "Art. 15 DSGVO - Auskunftsrecht",
      art16: "Art. 16 DSGVO - Recht auf Berichtigung",
      art17: "Art. 17 DSGVO - Recht auf Löschung",
      art20: "Art. 20 DSGVO - Recht auf Datenübertragbarkeit",
    },
    workflow: {
      verifyIdentity: "Identität des Benutzers überprüfen",
      collectData: "Personenbezogene Daten sammeln",
      generateReport: "Bericht erstellen",
      delivery: "Zustellung",
      legalChecks: "Rechtliche Prüfungen",
      anonymizationStrategy: "Löschungsstrategie",
      executeDeletion: "Löschung durchführen",
      certificate: "Löschzertifikat",
    },
    dates: {
      submitted: "Eingereicht",
      deadline: "Frist",
      daysAgo: (days: number) => `vor ${days} Tagen`,
      daysLeft: (days: number) => `${days} Tage`,
      overdue: "Überfällig",
    },
  },
  it: {
    dashboard: {
      title: "Dashboard DPO",
      pendingRequests: "Richieste in sospeso",
      urgentBadge: "Urgente",
      processAction: "Elaborare",
      dataBreaches: "Violazioni dei dati",
      consentRate: "Tasso di consenso",
      lastAudit: "Ultimo audit",
      newAudit: "Nuovo audit",
      exportGDPR: "Esportazione GDPR",
      dataBreachReport: "Rapporto violazione",
    },
    requestTypes: {
      Access: "Accesso",
      Delete: "Cancellazione",
      Export: "Esportazione",
      Rectify: "Rettifica",
    },
    requestStatus: {
      Pending: "In attesa",
      "In Progress": "In corso",
      Completed: "Completato",
      Rejected: "Rifiutato",
    },
    rights: {
      access: "Diritto di accesso",
      erasure: "Diritto all'oblio",
      rectification: "Diritto di rettifica",
      portability: "Diritto alla portabilità",
    },
    articles: {
      art15: "Art. 15 GDPR - Diritto di accesso",
      art16: "Art. 16 GDPR - Diritto di rettifica",
      art17: "Art. 17 GDPR - Diritto alla cancellazione",
      art20: "Art. 20 GDPR - Diritto alla portabilità",
    },
    workflow: {
      verifyIdentity: "Verificare l'identità dell'utente",
      collectData: "Raccogliere i dati personali",
      generateReport: "Generare il rapporto",
      delivery: "Consegna",
      legalChecks: "Verifiche legali",
      anonymizationStrategy: "Strategia di cancellazione",
      executeDeletion: "Eseguire la cancellazione",
      certificate: "Certificato di distruzione",
    },
    dates: {
      submitted: "Inviato",
      deadline: "Scadenza",
      daysAgo: (days: number) => `${days} giorni fa`,
      daysLeft: (days: number) => `${days} giorni`,
      overdue: "In ritardo",
    },
  },
  en: {
    dashboard: {
      title: "DPO Dashboard",
      pendingRequests: "Pending Requests",
      urgentBadge: "Urgent",
      processAction: "Process",
      dataBreaches: "Data Breaches",
      consentRate: "Consent Rate",
      lastAudit: "Last Audit",
      newAudit: "New Audit",
      exportGDPR: "GDPR Export",
      dataBreachReport: "Data Breach Report",
    },
    requestTypes: {
      Access: "Access",
      Delete: "Deletion",
      Export: "Export",
      Rectify: "Rectification",
    },
    requestStatus: {
      Pending: "Pending",
      "In Progress": "In Progress",
      Completed: "Completed",
      Rejected: "Rejected",
    },
    rights: {
      access: "Right of access",
      erasure: "Right to erasure",
      rectification: "Right to rectification",
      portability: "Right to data portability",
    },
    articles: {
      art15: "Art. 15 GDPR - Right of access",
      art16: "Art. 16 GDPR - Right to rectification",
      art17: "Art. 17 GDPR - Right to erasure",
      art20: "Art. 20 GDPR - Right to data portability",
    },
    workflow: {
      verifyIdentity: "Verify user identity",
      collectData: "Collect personal data",
      generateReport: "Generate report",
      delivery: "Delivery",
      legalChecks: "Legal checks",
      anonymizationStrategy: "Deletion strategy",
      executeDeletion: "Execute deletion",
      certificate: "Destruction certificate",
    },
    dates: {
      submitted: "Submitted",
      deadline: "Deadline",
      daysAgo: (days: number) => `${days} days ago`,
      daysLeft: (days: number) => `${days} days`,
      overdue: "Overdue",
    },
  },
};

export function useGDPRTranslations(locale: GDPRLocale = "fr") {
  return GDPR_TRANSLATIONS[locale];
}
