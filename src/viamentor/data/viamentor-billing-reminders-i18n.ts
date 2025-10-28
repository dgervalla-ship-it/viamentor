/**
 * VIAMENTOR - Billing Reminders i18n
 * Traductions FR/DE/IT/EN pour module rappels facturation
 */

export type BillingRemindersLocale = "fr" | "de" | "it" | "en";

export interface BillingRemindersTranslations {
  title: string;
  description: string;
  tabs: {
    reminders: string;
    templates: string;
    settings: string;
  };
  stats: {
    pending: string;
    sent: string;
    failed: string;
    total: string;
  };
  filters: {
    search: string;
    status: string;
    type: string;
    all: string;
  };
  actions: {
    create: string;
    send: string;
    export: string;
    refresh: string;
  };
  table: {
    invoice: string;
    student: string;
    amount: string;
    overdue: string;
    type: string;
    status: string;
    nextReminder: string;
    actions: string;
  };
  status: {
    pending: string;
    sent: string;
    failed: string;
    cancelled: string;
  };
  type: {
    first: string;
    second: string;
    final: string;
    legal: string;
  };
  menu: {
    send: string;
    edit: string;
    cancel: string;
    delete: string;
    viewInvoice: string;
  };
  templates: {
    title: string;
    name: string;
    type: string;
    delay: string;
    channels: string;
    status: string;
    active: string;
    inactive: string;
  };
  settings: {
    title: string;
    autoReminders: string;
    autoRemindersDesc: string;
    emailNotifications: string;
    emailNotificationsDesc: string;
    smsEnabled: string;
    smsEnabledDesc: string;
  };
}

export const billingRemindersTranslations: Record<
  BillingRemindersLocale,
  BillingRemindersTranslations
> = {
  fr: {
    title: "Rappels de Facturation",
    description: "Gestion automatique des relances et rappels de paiement",
    tabs: {
      reminders: "Rappels actifs",
      templates: "Templates",
      settings: "Paramètres",
    },
    stats: {
      pending: "En attente",
      sent: "Envoyés",
      failed: "Échecs",
      total: "Total rappels",
    },
    filters: {
      search: "Rechercher...",
      status: "Statut",
      type: "Type",
      all: "Tous",
    },
    actions: {
      create: "Nouveau rappel",
      send: "Envoyer",
      export: "Exporter",
      refresh: "Actualiser",
    },
    table: {
      invoice: "Facture",
      student: "Élève",
      amount: "Montant",
      overdue: "Retard",
      type: "Type",
      status: "Statut",
      nextReminder: "Prochain rappel",
      actions: "Actions",
    },
    status: {
      pending: "En attente",
      sent: "Envoyé",
      failed: "Échec",
      cancelled: "Annulé",
    },
    type: {
      first: "1er rappel",
      second: "2e rappel",
      final: "Dernier rappel",
      legal: "Mise en demeure",
    },
    menu: {
      send: "Envoyer maintenant",
      edit: "Modifier",
      cancel: "Annuler",
      delete: "Supprimer",
      viewInvoice: "Voir facture",
    },
    templates: {
      title: "Templates de rappels",
      name: "Nom",
      type: "Type",
      delay: "Délai",
      channels: "Canaux",
      status: "Statut",
      active: "Actif",
      inactive: "Inactif",
    },
    settings: {
      title: "Paramètres des rappels",
      autoReminders: "Rappels automatiques",
      autoRemindersDesc:
        "Envoyer automatiquement les rappels selon les templates",
      emailNotifications: "Notifications email",
      emailNotificationsDesc:
        "Recevoir une notification pour chaque rappel envoyé",
      smsEnabled: "SMS activés",
      smsEnabledDesc: "Autoriser l'envoi de rappels par SMS",
    },
  },
  de: {
    title: "Zahlungserinnerungen",
    description:
      "Automatische Verwaltung von Mahnungen und Zahlungserinnerungen",
    tabs: {
      reminders: "Aktive Erinnerungen",
      templates: "Vorlagen",
      settings: "Einstellungen",
    },
    stats: {
      pending: "Ausstehend",
      sent: "Gesendet",
      failed: "Fehler",
      total: "Gesamt Erinnerungen",
    },
    filters: {
      search: "Suchen...",
      status: "Status",
      type: "Typ",
      all: "Alle",
    },
    actions: {
      create: "Neue Erinnerung",
      send: "Senden",
      export: "Exportieren",
      refresh: "Aktualisieren",
    },
    table: {
      invoice: "Rechnung",
      student: "Schüler",
      amount: "Betrag",
      overdue: "Verzug",
      type: "Typ",
      status: "Status",
      nextReminder: "Nächste Erinnerung",
      actions: "Aktionen",
    },
    status: {
      pending: "Ausstehend",
      sent: "Gesendet",
      failed: "Fehler",
      cancelled: "Abgebrochen",
    },
    type: {
      first: "1. Mahnung",
      second: "2. Mahnung",
      final: "Letzte Mahnung",
      legal: "Rechtliche Mahnung",
    },
    menu: {
      send: "Jetzt senden",
      edit: "Bearbeiten",
      cancel: "Abbrechen",
      delete: "Löschen",
      viewInvoice: "Rechnung anzeigen",
    },
    templates: {
      title: "Erinnerungsvorlagen",
      name: "Name",
      type: "Typ",
      delay: "Verzögerung",
      channels: "Kanäle",
      status: "Status",
      active: "Aktiv",
      inactive: "Inaktiv",
    },
    settings: {
      title: "Erinnerungseinstellungen",
      autoReminders: "Automatische Erinnerungen",
      autoRemindersDesc: "Erinnerungen automatisch gemäß Vorlagen senden",
      emailNotifications: "E-Mail-Benachrichtigungen",
      emailNotificationsDesc:
        "Benachrichtigung für jede gesendete Erinnerung erhalten",
      smsEnabled: "SMS aktiviert",
      smsEnabledDesc: "Versand von Erinnerungen per SMS erlauben",
    },
  },
  it: {
    title: "Solleciti di Pagamento",
    description: "Gestione automatica dei solleciti e promemoria di pagamento",
    tabs: {
      reminders: "Solleciti attivi",
      templates: "Modelli",
      settings: "Impostazioni",
    },
    stats: {
      pending: "In attesa",
      sent: "Inviati",
      failed: "Falliti",
      total: "Totale solleciti",
    },
    filters: {
      search: "Cerca...",
      status: "Stato",
      type: "Tipo",
      all: "Tutti",
    },
    actions: {
      create: "Nuovo sollecito",
      send: "Invia",
      export: "Esporta",
      refresh: "Aggiorna",
    },
    table: {
      invoice: "Fattura",
      student: "Studente",
      amount: "Importo",
      overdue: "Ritardo",
      type: "Tipo",
      status: "Stato",
      nextReminder: "Prossimo sollecito",
      actions: "Azioni",
    },
    status: {
      pending: "In attesa",
      sent: "Inviato",
      failed: "Fallito",
      cancelled: "Annullato",
    },
    type: {
      first: "1° sollecito",
      second: "2° sollecito",
      final: "Ultimo sollecito",
      legal: "Diffida",
    },
    menu: {
      send: "Invia ora",
      edit: "Modifica",
      cancel: "Annulla",
      delete: "Elimina",
      viewInvoice: "Vedi fattura",
    },
    templates: {
      title: "Modelli di sollecito",
      name: "Nome",
      type: "Tipo",
      delay: "Ritardo",
      channels: "Canali",
      status: "Stato",
      active: "Attivo",
      inactive: "Inattivo",
    },
    settings: {
      title: "Impostazioni solleciti",
      autoReminders: "Solleciti automatici",
      autoRemindersDesc: "Invia automaticamente i solleciti secondo i modelli",
      emailNotifications: "Notifiche email",
      emailNotificationsDesc: "Ricevi una notifica per ogni sollecito inviato",
      smsEnabled: "SMS abilitati",
      smsEnabledDesc: "Autorizza l'invio di solleciti via SMS",
    },
  },
  en: {
    title: "Billing Reminders",
    description: "Automatic management of payment reminders and follow-ups",
    tabs: {
      reminders: "Active reminders",
      templates: "Templates",
      settings: "Settings",
    },
    stats: {
      pending: "Pending",
      sent: "Sent",
      failed: "Failed",
      total: "Total reminders",
    },
    filters: {
      search: "Search...",
      status: "Status",
      type: "Type",
      all: "All",
    },
    actions: {
      create: "New reminder",
      send: "Send",
      export: "Export",
      refresh: "Refresh",
    },
    table: {
      invoice: "Invoice",
      student: "Student",
      amount: "Amount",
      overdue: "Overdue",
      type: "Type",
      status: "Status",
      nextReminder: "Next reminder",
      actions: "Actions",
    },
    status: {
      pending: "Pending",
      sent: "Sent",
      failed: "Failed",
      cancelled: "Cancelled",
    },
    type: {
      first: "1st reminder",
      second: "2nd reminder",
      final: "Final reminder",
      legal: "Legal notice",
    },
    menu: {
      send: "Send now",
      edit: "Edit",
      cancel: "Cancel",
      delete: "Delete",
      viewInvoice: "View invoice",
    },
    templates: {
      title: "Reminder templates",
      name: "Name",
      type: "Type",
      delay: "Delay",
      channels: "Channels",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
    },
    settings: {
      title: "Reminder settings",
      autoReminders: "Automatic reminders",
      autoRemindersDesc: "Automatically send reminders according to templates",
      emailNotifications: "Email notifications",
      emailNotificationsDesc: "Receive a notification for each reminder sent",
      smsEnabled: "SMS enabled",
      smsEnabledDesc: "Allow sending reminders via SMS",
    },
  },
};
