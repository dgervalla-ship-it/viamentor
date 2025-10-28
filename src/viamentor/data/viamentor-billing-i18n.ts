/**
 * VIAMENTOR - Billing Dashboard i18n
 * Traductions FR/DE/IT/EN pour dashboard facturation School Admin
 */

export type BillingLocale = "fr" | "de" | "it" | "en";

export interface BillingTranslations {
  title: string;
  breadcrumb: string;

  // KPIs
  kpis: {
    monthRevenue: string;
    unpaidInvoices: string;
    pendingPayments: string;
    yearToDate: string;
    monthInvoicesCount: string;
    collectionRate: string;
    averagePaymentDelay: string;
    overdueOver90Days: string;
    vsLastMonth: string;
    target: string;
    urgent: string;
  };

  // Actions
  actions: {
    newInvoice: string;
    collectPayment: string;
    importCamt: string;
    export: string;
    exportExcel: string;
    exportPDF: string;
  };

  // Tabs
  tabs: {
    overview: string;
    revenue: string;
    payments: string;
    reminders: string;
  };

  // Overview Tab
  overview: {
    revenueChart: string;
    revenue: string;
    paymentsReceived: string;
    actionsRequired: string;
    processAll: string;
    upcomingDues: string;
    nextDays: string;
    sendReminder: string;
    markPaid: string;
    viewInvoice: string;
    daysUntilDue: string;
    daysOverdue: string;
  };

  // Revenue Tab
  revenue: {
    periodSelector: string;
    week: string;
    month: string;
    quarter: string;
    year: string;
    byCategory: string;
    byProductType: string;
    averageBasket: string;
    revenuePerStudent: string;
    topProducts: string;
    product: string;
    count: string;
    total: string;
    rank: string;
  };

  // Payments Tab
  payments: {
    paymentsReceived: string;
    byMethod: string;
    method: string;
    amount: string;
    percentage: string;
    averageDelay: string;
    days: string;
  };

  // Reminders Tab
  reminders: {
    remindersSent: string;
    conversionRate: string;
    averageDelayAfterReminder: string;
    byLevel: string;
    level: string;
    sent: string;
    paid: string;
    successRate: string;
  };

  // Invoices Preview
  invoicesPreview: {
    title: string;
    invoiceNumber: string;
    date: string;
    student: string;
    amount: string;
    status: string;
    dueDate: string;
    actions: string;
    viewAll: string;
  };

  // Calendar
  calendar: {
    title: string;
    duesOn: string;
    invoices: string;
  };

  // Status
  status: {
    draft: string;
    sent: string;
    paid: string;
    overdue: string;
    void: string;
  };

  // Payment Methods
  paymentMethods: {
    cash: string;
    card: string;
    transfer: string;
    twint: string;
    other: string;
  };

  // Product Types
  productTypes: {
    lesson: string;
    package: string;
    course: string;
    exam: string;
    other: string;
  };

  // Actions Required Types
  actionTypes: {
    draft: string;
    reminder: string;
    validation: string;
    credit: string;
  };
}

export const billingTranslations: Record<BillingLocale, BillingTranslations> = {
  fr: {
    title: "Facturation",
    breadcrumb: "Facturation",

    kpis: {
      monthRevenue: "Revenus du mois",
      unpaidInvoices: "Factures impayées",
      pendingPayments: "Paiements en attente",
      yearToDate: "CA année",
      monthInvoicesCount: "Factures émises ce mois",
      collectionRate: "Taux d'encaissement",
      averagePaymentDelay: "Délai moyen de paiement",
      overdueOver90Days: "Créances > 90 jours",
      vsLastMonth: "vs mois dernier",
      target: "Objectif",
      urgent: "Urgent",
    },

    actions: {
      newInvoice: "Nouvelle facture",
      collectPayment: "Encaisser paiement",
      importCamt: "Import Camt.054",
      export: "Exporter",
      exportExcel: "Exporter Excel",
      exportPDF: "Exporter PDF",
    },

    tabs: {
      overview: "Vue d'ensemble",
      revenue: "Revenus",
      payments: "Paiements",
      reminders: "Rappels",
    },

    overview: {
      revenueChart: "Revenus et paiements (12 derniers mois)",
      revenue: "Revenus",
      paymentsReceived: "Paiements reçus",
      actionsRequired: "Actions requises",
      processAll: "Traiter tout",
      upcomingDues: "Prochaines échéances",
      nextDays: "7 prochains jours",
      sendReminder: "Envoyer rappel",
      markPaid: "Marquer payé",
      viewInvoice: "Voir facture",
      daysUntilDue: "j restants",
      daysOverdue: "j de retard",
    },

    revenue: {
      periodSelector: "Période",
      week: "Semaine",
      month: "Mois",
      quarter: "Trimestre",
      year: "Année",
      byCategory: "Revenus par catégorie",
      byProductType: "Répartition par type",
      averageBasket: "Panier moyen",
      revenuePerStudent: "Revenu par élève",
      topProducts: "Top produits",
      product: "Produit",
      count: "Qté",
      total: "Total",
      rank: "Rang",
    },

    payments: {
      paymentsReceived: "Paiements reçus",
      byMethod: "Par méthode de paiement",
      method: "Méthode",
      amount: "Montant",
      percentage: "%",
      averageDelay: "Délai moyen",
      days: "jours",
    },

    reminders: {
      remindersSent: "Rappels envoyés ce mois",
      conversionRate: "Taux de conversion rappel → paiement",
      averageDelayAfterReminder: "Délai moyen après rappel",
      byLevel: "Par niveau de rappel",
      level: "Niveau",
      sent: "Envoyés",
      paid: "Payés",
      successRate: "Taux de succès",
    },

    invoicesPreview: {
      title: "Dernières factures",
      invoiceNumber: "N° facture",
      date: "Date",
      student: "Élève",
      amount: "Montant",
      status: "Statut",
      dueDate: "Échéance",
      actions: "Actions",
      viewAll: "Voir toutes les factures",
    },

    calendar: {
      title: "Échéances",
      duesOn: "Échéances le",
      invoices: "factures",
    },

    status: {
      draft: "Brouillon",
      sent: "Envoyée",
      paid: "Payée",
      overdue: "En retard",
      void: "Annulée",
    },

    paymentMethods: {
      cash: "Espèces",
      card: "Carte bancaire",
      transfer: "Virement",
      twint: "Twint",
      other: "Autre",
    },

    productTypes: {
      lesson: "Leçons",
      package: "Forfaits",
      course: "Cours",
      exam: "Examens",
      other: "Autres",
    },

    actionTypes: {
      draft: "Factures brouillon à finaliser",
      reminder: "Rappels à envoyer",
      validation: "Paiements à valider",
      credit: "Avoirs à créer",
    },
  },

  de: {
    title: "Rechnungswesen",
    breadcrumb: "Rechnungswesen",

    kpis: {
      monthRevenue: "Einnahmen des Monats",
      unpaidInvoices: "Unbezahlte Rechnungen",
      pendingPayments: "Ausstehende Zahlungen",
      yearToDate: "Umsatz Jahr",
      monthInvoicesCount: "Rechnungen diesen Monat",
      collectionRate: "Inkassoquote",
      averagePaymentDelay: "Durchschnittliche Zahlungsfrist",
      overdueOver90Days: "Forderungen > 90 Tage",
      vsLastMonth: "vs letzter Monat",
      target: "Ziel",
      urgent: "Dringend",
    },

    actions: {
      newInvoice: "Neue Rechnung",
      collectPayment: "Zahlung erfassen",
      importCamt: "Camt.054 Import",
      export: "Exportieren",
      exportExcel: "Excel exportieren",
      exportPDF: "PDF exportieren",
    },

    tabs: {
      overview: "Übersicht",
      revenue: "Einnahmen",
      payments: "Zahlungen",
      reminders: "Mahnungen",
    },

    overview: {
      revenueChart: "Einnahmen und Zahlungen (letzte 12 Monate)",
      revenue: "Einnahmen",
      paymentsReceived: "Erhaltene Zahlungen",
      actionsRequired: "Erforderliche Aktionen",
      processAll: "Alle bearbeiten",
      upcomingDues: "Kommende Fälligkeiten",
      nextDays: "Nächste 7 Tage",
      sendReminder: "Mahnung senden",
      markPaid: "Als bezahlt markieren",
      viewInvoice: "Rechnung anzeigen",
      daysUntilDue: "T verbleibend",
      daysOverdue: "T überfällig",
    },

    revenue: {
      periodSelector: "Zeitraum",
      week: "Woche",
      month: "Monat",
      quarter: "Quartal",
      year: "Jahr",
      byCategory: "Einnahmen nach Kategorie",
      byProductType: "Verteilung nach Typ",
      averageBasket: "Durchschnittlicher Warenkorb",
      revenuePerStudent: "Umsatz pro Schüler",
      topProducts: "Top-Produkte",
      product: "Produkt",
      count: "Anz.",
      total: "Gesamt",
      rank: "Rang",
    },

    payments: {
      paymentsReceived: "Erhaltene Zahlungen",
      byMethod: "Nach Zahlungsmethode",
      method: "Methode",
      amount: "Betrag",
      percentage: "%",
      averageDelay: "Durchschnittliche Verzögerung",
      days: "Tage",
    },

    reminders: {
      remindersSent: "Mahnungen diesen Monat",
      conversionRate: "Konversionsrate Mahnung → Zahlung",
      averageDelayAfterReminder: "Durchschnittliche Verzögerung nach Mahnung",
      byLevel: "Nach Mahnstufe",
      level: "Stufe",
      sent: "Gesendet",
      paid: "Bezahlt",
      successRate: "Erfolgsquote",
    },

    invoicesPreview: {
      title: "Letzte Rechnungen",
      invoiceNumber: "Rechnungsnr.",
      date: "Datum",
      student: "Schüler",
      amount: "Betrag",
      status: "Status",
      dueDate: "Fälligkeit",
      actions: "Aktionen",
      viewAll: "Alle Rechnungen anzeigen",
    },

    calendar: {
      title: "Fälligkeiten",
      duesOn: "Fällig am",
      invoices: "Rechnungen",
    },

    status: {
      draft: "Entwurf",
      sent: "Gesendet",
      paid: "Bezahlt",
      overdue: "Überfällig",
      void: "Storniert",
    },

    paymentMethods: {
      cash: "Bargeld",
      card: "Karte",
      transfer: "Überweisung",
      twint: "Twint",
      other: "Andere",
    },

    productTypes: {
      lesson: "Lektionen",
      package: "Pakete",
      course: "Kurse",
      exam: "Prüfungen",
      other: "Andere",
    },

    actionTypes: {
      draft: "Entwürfe zu finalisieren",
      reminder: "Mahnungen zu senden",
      validation: "Zahlungen zu validieren",
      credit: "Gutschriften zu erstellen",
    },
  },

  it: {
    title: "Fatturazione",
    breadcrumb: "Fatturazione",

    kpis: {
      monthRevenue: "Entrate del mese",
      unpaidInvoices: "Fatture non pagate",
      pendingPayments: "Pagamenti in sospeso",
      yearToDate: "Fatturato anno",
      monthInvoicesCount: "Fatture emesse questo mese",
      collectionRate: "Tasso di riscossione",
      averagePaymentDelay: "Ritardo medio di pagamento",
      overdueOver90Days: "Crediti > 90 giorni",
      vsLastMonth: "vs mese scorso",
      target: "Obiettivo",
      urgent: "Urgente",
    },

    actions: {
      newInvoice: "Nuova fattura",
      collectPayment: "Incassare pagamento",
      importCamt: "Importa Camt.054",
      export: "Esporta",
      exportExcel: "Esporta Excel",
      exportPDF: "Esporta PDF",
    },

    tabs: {
      overview: "Panoramica",
      revenue: "Entrate",
      payments: "Pagamenti",
      reminders: "Solleciti",
    },

    overview: {
      revenueChart: "Entrate e pagamenti (ultimi 12 mesi)",
      revenue: "Entrate",
      paymentsReceived: "Pagamenti ricevuti",
      actionsRequired: "Azioni richieste",
      processAll: "Elabora tutto",
      upcomingDues: "Prossime scadenze",
      nextDays: "Prossimi 7 giorni",
      sendReminder: "Invia sollecito",
      markPaid: "Segna come pagato",
      viewInvoice: "Vedi fattura",
      daysUntilDue: "g rimanenti",
      daysOverdue: "g di ritardo",
    },

    revenue: {
      periodSelector: "Periodo",
      week: "Settimana",
      month: "Mese",
      quarter: "Trimestre",
      year: "Anno",
      byCategory: "Entrate per categoria",
      byProductType: "Ripartizione per tipo",
      averageBasket: "Carrello medio",
      revenuePerStudent: "Entrate per allievo",
      topProducts: "Prodotti top",
      product: "Prodotto",
      count: "Qtà",
      total: "Totale",
      rank: "Pos.",
    },

    payments: {
      paymentsReceived: "Pagamenti ricevuti",
      byMethod: "Per metodo di pagamento",
      method: "Metodo",
      amount: "Importo",
      percentage: "%",
      averageDelay: "Ritardo medio",
      days: "giorni",
    },

    reminders: {
      remindersSent: "Solleciti inviati questo mese",
      conversionRate: "Tasso di conversione sollecito → pagamento",
      averageDelayAfterReminder: "Ritardo medio dopo sollecito",
      byLevel: "Per livello di sollecito",
      level: "Livello",
      sent: "Inviati",
      paid: "Pagati",
      successRate: "Tasso di successo",
    },

    invoicesPreview: {
      title: "Ultime fatture",
      invoiceNumber: "N° fattura",
      date: "Data",
      student: "Allievo",
      amount: "Importo",
      status: "Stato",
      dueDate: "Scadenza",
      actions: "Azioni",
      viewAll: "Vedi tutte le fatture",
    },

    calendar: {
      title: "Scadenze",
      duesOn: "Scadenze il",
      invoices: "fatture",
    },

    status: {
      draft: "Bozza",
      sent: "Inviata",
      paid: "Pagata",
      overdue: "In ritardo",
      void: "Annullata",
    },

    paymentMethods: {
      cash: "Contanti",
      card: "Carta",
      transfer: "Bonifico",
      twint: "Twint",
      other: "Altro",
    },

    productTypes: {
      lesson: "Lezioni",
      package: "Pacchetti",
      course: "Corsi",
      exam: "Esami",
      other: "Altri",
    },

    actionTypes: {
      draft: "Bozze da finalizzare",
      reminder: "Solleciti da inviare",
      validation: "Pagamenti da validare",
      credit: "Note di credito da creare",
    },
  },

  en: {
    title: "Billing",
    breadcrumb: "Billing",

    kpis: {
      monthRevenue: "Month Revenue",
      unpaidInvoices: "Unpaid Invoices",
      pendingPayments: "Pending Payments",
      yearToDate: "Year to Date",
      monthInvoicesCount: "Invoices Issued This Month",
      collectionRate: "Collection Rate",
      averagePaymentDelay: "Average Payment Delay",
      overdueOver90Days: "Overdue > 90 Days",
      vsLastMonth: "vs last month",
      target: "Target",
      urgent: "Urgent",
    },

    actions: {
      newInvoice: "New Invoice",
      collectPayment: "Collect Payment",
      importCamt: "Import Camt.054",
      export: "Export",
      exportExcel: "Export Excel",
      exportPDF: "Export PDF",
    },

    tabs: {
      overview: "Overview",
      revenue: "Revenue",
      payments: "Payments",
      reminders: "Reminders",
    },

    overview: {
      revenueChart: "Revenue and Payments (Last 12 Months)",
      revenue: "Revenue",
      paymentsReceived: "Payments Received",
      actionsRequired: "Actions Required",
      processAll: "Process All",
      upcomingDues: "Upcoming Dues",
      nextDays: "Next 7 Days",
      sendReminder: "Send Reminder",
      markPaid: "Mark Paid",
      viewInvoice: "View Invoice",
      daysUntilDue: "d left",
      daysOverdue: "d overdue",
    },

    revenue: {
      periodSelector: "Period",
      week: "Week",
      month: "Month",
      quarter: "Quarter",
      year: "Year",
      byCategory: "Revenue by Category",
      byProductType: "Distribution by Type",
      averageBasket: "Average Basket",
      revenuePerStudent: "Revenue per Student",
      topProducts: "Top Products",
      product: "Product",
      count: "Qty",
      total: "Total",
      rank: "Rank",
    },

    payments: {
      paymentsReceived: "Payments Received",
      byMethod: "By Payment Method",
      method: "Method",
      amount: "Amount",
      percentage: "%",
      averageDelay: "Average Delay",
      days: "days",
    },

    reminders: {
      remindersSent: "Reminders Sent This Month",
      conversionRate: "Conversion Rate Reminder → Payment",
      averageDelayAfterReminder: "Average Delay After Reminder",
      byLevel: "By Reminder Level",
      level: "Level",
      sent: "Sent",
      paid: "Paid",
      successRate: "Success Rate",
    },

    invoicesPreview: {
      title: "Recent Invoices",
      invoiceNumber: "Invoice #",
      date: "Date",
      student: "Student",
      amount: "Amount",
      status: "Status",
      dueDate: "Due Date",
      actions: "Actions",
      viewAll: "View All Invoices",
    },

    calendar: {
      title: "Due Dates",
      duesOn: "Due on",
      invoices: "invoices",
    },

    status: {
      draft: "Draft",
      sent: "Sent",
      paid: "Paid",
      overdue: "Overdue",
      void: "Void",
    },

    paymentMethods: {
      cash: "Cash",
      card: "Card",
      transfer: "Transfer",
      twint: "Twint",
      other: "Other",
    },

    productTypes: {
      lesson: "Lessons",
      package: "Packages",
      course: "Courses",
      exam: "Exams",
      other: "Other",
    },

    actionTypes: {
      draft: "Draft invoices to finalize",
      reminder: "Reminders to send",
      validation: "Payments to validate",
      credit: "Credits to create",
    },
  },
};
