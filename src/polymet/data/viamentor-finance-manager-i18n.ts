/**
 * VIAMENTOR - Finance Manager i18n
 * Traductions FR/DE/IT/EN pour dashboard Finance Manager
 *
 * Sections:
 * - Dashboard KPIs (revenus, créances, cash-flow)
 * - Transactions récentes
 * - Analytics financières
 * - Actions rapides
 */

export type FinanceManagerLocale = "fr" | "de" | "it" | "en";

export interface FinanceManagerTranslations {
  page: {
    title: string;
    subtitle: string;
    lastUpdate: string;
  };
  kpis: {
    monthlyRevenue: string;
    monthlyRevenueDesc: string;
    outstandingInvoices: string;
    outstandingInvoicesDesc: string;
    cashFlow: string;
    cashFlowDesc: string;
    paymentRate: string;
    paymentRateDesc: string;
    avgInvoiceValue: string;
    avgInvoiceValueDesc: string;
    overdueAmount: string;
    overdueAmountDesc: string;
  };
  sections: {
    overview: string;
    recentTransactions: string;
    analytics: string;
    quickActions: string;
    revenueBreakdown: string;
    paymentMethods: string;
    alerts: string;
  };
  transactions: {
    date: string;
    type: string;
    student: string;
    amount: string;
    status: string;
    method: string;
    viewAll: string;
    noTransactions: string;
    types: {
      payment: string;
      invoice: string;
      refund: string;
      credit: string;
    };
    statuses: {
      completed: string;
      pending: string;
      failed: string;
      refunded: string;
    };
  };
  analytics: {
    revenueEvolution: string;
    paymentMethodsDistribution: string;
    categoryBreakdown: string;
    period: {
      week: string;
      month: string;
      quarter: string;
      year: string;
    };
  };
  actions: {
    createInvoice: string;
    recordPayment: string;
    exportReport: string;
    viewInvoices: string;
    viewPayments: string;
    manageReminders: string;
    viewAnalytics: string;
    configurePricing: string;
  };
  alerts: {
    overdueInvoices: string;
    overdueInvoicesDesc: string;
    lowCashFlow: string;
    lowCashFlowDesc: string;
    pendingPayments: string;
    pendingPaymentsDesc: string;
    viewDetails: string;
  };
  revenue: {
    lessons: string;
    packages: string;
    exams: string;
    other: string;
    total: string;
  };
  paymentMethods: {
    cash: string;
    card: string;
    transfer: string;
    qrBill: string;
    other: string;
  };
  common: {
    currency: string;
    loading: string;
    error: string;
    noData: string;
    refresh: string;
    export: string;
    filter: string;
  };
}

export const FINANCE_MANAGER_I18N: Record<
  FinanceManagerLocale,
  FinanceManagerTranslations
> = {
  fr: {
    page: {
      title: "Gestion Financière",
      subtitle: "Vue d'ensemble et pilotage financier de l'école",
      lastUpdate: "Dernière mise à jour",
    },
    kpis: {
      monthlyRevenue: "Revenus du mois",
      monthlyRevenueDesc: "Revenus encaissés ce mois",
      outstandingInvoices: "Factures en attente",
      outstandingInvoicesDesc: "Montant total à encaisser",
      cashFlow: "Trésorerie",
      cashFlowDesc: "Solde de trésorerie actuel",
      paymentRate: "Taux d'encaissement",
      paymentRateDesc: "Factures payées dans les délais",
      avgInvoiceValue: "Valeur moyenne facture",
      avgInvoiceValueDesc: "Montant moyen par facture",
      overdueAmount: "Impayés",
      overdueAmountDesc: "Factures en retard de paiement",
    },
    sections: {
      overview: "Vue d'ensemble",
      recentTransactions: "Transactions récentes",
      analytics: "Analyses financières",
      quickActions: "Actions rapides",
      revenueBreakdown: "Répartition des revenus",
      paymentMethods: "Moyens de paiement",
      alerts: "Alertes financières",
    },
    transactions: {
      date: "Date",
      type: "Type",
      student: "Élève",
      amount: "Montant",
      status: "Statut",
      method: "Méthode",
      viewAll: "Voir toutes les transactions",
      noTransactions: "Aucune transaction récente",
      types: {
        payment: "Paiement",
        invoice: "Facture",
        refund: "Remboursement",
        credit: "Avoir",
      },
      statuses: {
        completed: "Complété",
        pending: "En attente",
        failed: "Échoué",
        refunded: "Remboursé",
      },
    },
    analytics: {
      revenueEvolution: "Évolution des revenus",
      paymentMethodsDistribution: "Répartition moyens de paiement",
      categoryBreakdown: "Revenus par catégorie",
      period: {
        week: "Semaine",
        month: "Mois",
        quarter: "Trimestre",
        year: "Année",
      },
    },
    actions: {
      createInvoice: "Créer une facture",
      recordPayment: "Enregistrer un paiement",
      exportReport: "Exporter rapport",
      viewInvoices: "Voir les factures",
      viewPayments: "Voir les paiements",
      manageReminders: "Gérer les rappels",
      viewAnalytics: "Analytics détaillées",
      configurePricing: "Configurer tarifs",
    },
    alerts: {
      overdueInvoices: "Factures en retard",
      overdueInvoicesDesc: "factures impayées nécessitent un suivi",
      lowCashFlow: "Trésorerie faible",
      lowCashFlowDesc: "Le solde de trésorerie est inférieur au seuil",
      pendingPayments: "Paiements en attente",
      pendingPaymentsDesc: "paiements à valider",
      viewDetails: "Voir les détails",
    },
    revenue: {
      lessons: "Leçons pratiques",
      packages: "Forfaits",
      exams: "Examens",
      other: "Autres",
      total: "Total",
    },
    paymentMethods: {
      cash: "Espèces",
      card: "Carte bancaire",
      transfer: "Virement",
      qrBill: "QR-facture",
      other: "Autre",
    },
    common: {
      currency: "CHF",
      loading: "Chargement...",
      error: "Erreur de chargement",
      noData: "Aucune donnée disponible",
      refresh: "Actualiser",
      export: "Exporter",
      filter: "Filtrer",
    },
  },
  de: {
    page: {
      title: "Finanzverwaltung",
      subtitle: "Überblick und Finanzsteuerung der Fahrschule",
      lastUpdate: "Letzte Aktualisierung",
    },
    kpis: {
      monthlyRevenue: "Monatsumsatz",
      monthlyRevenueDesc: "Eingenommene Einnahmen diesen Monat",
      outstandingInvoices: "Ausstehende Rechnungen",
      outstandingInvoicesDesc: "Gesamtbetrag einzuziehen",
      cashFlow: "Cashflow",
      cashFlowDesc: "Aktueller Kassenbestand",
      paymentRate: "Zahlungsrate",
      paymentRateDesc: "Fristgerecht bezahlte Rechnungen",
      avgInvoiceValue: "Durchschnittlicher Rechnungswert",
      avgInvoiceValueDesc: "Durchschnittsbetrag pro Rechnung",
      overdueAmount: "Überfällige Beträge",
      overdueAmountDesc: "Verspätete Rechnungen",
    },
    sections: {
      overview: "Überblick",
      recentTransactions: "Letzte Transaktionen",
      analytics: "Finanzanalysen",
      quickActions: "Schnellaktionen",
      revenueBreakdown: "Umsatzverteilung",
      paymentMethods: "Zahlungsmethoden",
      alerts: "Finanzwarnungen",
    },
    transactions: {
      date: "Datum",
      type: "Typ",
      student: "Schüler",
      amount: "Betrag",
      status: "Status",
      method: "Methode",
      viewAll: "Alle Transaktionen anzeigen",
      noTransactions: "Keine aktuellen Transaktionen",
      types: {
        payment: "Zahlung",
        invoice: "Rechnung",
        refund: "Rückerstattung",
        credit: "Gutschrift",
      },
      statuses: {
        completed: "Abgeschlossen",
        pending: "Ausstehend",
        failed: "Fehlgeschlagen",
        refunded: "Erstattet",
      },
    },
    analytics: {
      revenueEvolution: "Umsatzentwicklung",
      paymentMethodsDistribution: "Verteilung Zahlungsmethoden",
      categoryBreakdown: "Umsatz nach Kategorie",
      period: {
        week: "Woche",
        month: "Monat",
        quarter: "Quartal",
        year: "Jahr",
      },
    },
    actions: {
      createInvoice: "Rechnung erstellen",
      recordPayment: "Zahlung erfassen",
      exportReport: "Bericht exportieren",
      viewInvoices: "Rechnungen anzeigen",
      viewPayments: "Zahlungen anzeigen",
      manageReminders: "Erinnerungen verwalten",
      viewAnalytics: "Detaillierte Analytics",
      configurePricing: "Preise konfigurieren",
    },
    alerts: {
      overdueInvoices: "Überfällige Rechnungen",
      overdueInvoicesDesc: "unbezahlte Rechnungen erfordern Nachverfolgung",
      lowCashFlow: "Niedriger Cashflow",
      lowCashFlowDesc: "Kassenbestand unter Schwellenwert",
      pendingPayments: "Ausstehende Zahlungen",
      pendingPaymentsDesc: "zu validierende Zahlungen",
      viewDetails: "Details anzeigen",
    },
    revenue: {
      lessons: "Fahrstunden",
      packages: "Pakete",
      exams: "Prüfungen",
      other: "Sonstiges",
      total: "Gesamt",
    },
    paymentMethods: {
      cash: "Bargeld",
      card: "Karte",
      transfer: "Überweisung",
      qrBill: "QR-Rechnung",
      other: "Andere",
    },
    common: {
      currency: "CHF",
      loading: "Laden...",
      error: "Ladefehler",
      noData: "Keine Daten verfügbar",
      refresh: "Aktualisieren",
      export: "Exportieren",
      filter: "Filtern",
    },
  },
  it: {
    page: {
      title: "Gestione Finanziaria",
      subtitle: "Panoramica e controllo finanziario della scuola",
      lastUpdate: "Ultimo aggiornamento",
    },
    kpis: {
      monthlyRevenue: "Entrate mensili",
      monthlyRevenueDesc: "Entrate incassate questo mese",
      outstandingInvoices: "Fatture in sospeso",
      outstandingInvoicesDesc: "Importo totale da incassare",
      cashFlow: "Flusso di cassa",
      cashFlowDesc: "Saldo di cassa attuale",
      paymentRate: "Tasso di incasso",
      paymentRateDesc: "Fatture pagate nei termini",
      avgInvoiceValue: "Valore medio fattura",
      avgInvoiceValueDesc: "Importo medio per fattura",
      overdueAmount: "Insoluti",
      overdueAmountDesc: "Fatture in ritardo di pagamento",
    },
    sections: {
      overview: "Panoramica",
      recentTransactions: "Transazioni recenti",
      analytics: "Analisi finanziarie",
      quickActions: "Azioni rapide",
      revenueBreakdown: "Ripartizione entrate",
      paymentMethods: "Metodi di pagamento",
      alerts: "Avvisi finanziari",
    },
    transactions: {
      date: "Data",
      type: "Tipo",
      student: "Allievo",
      amount: "Importo",
      status: "Stato",
      method: "Metodo",
      viewAll: "Vedi tutte le transazioni",
      noTransactions: "Nessuna transazione recente",
      types: {
        payment: "Pagamento",
        invoice: "Fattura",
        refund: "Rimborso",
        credit: "Nota di credito",
      },
      statuses: {
        completed: "Completato",
        pending: "In attesa",
        failed: "Fallito",
        refunded: "Rimborsato",
      },
    },
    analytics: {
      revenueEvolution: "Evoluzione entrate",
      paymentMethodsDistribution: "Distribuzione metodi di pagamento",
      categoryBreakdown: "Entrate per categoria",
      period: {
        week: "Settimana",
        month: "Mese",
        quarter: "Trimestre",
        year: "Anno",
      },
    },
    actions: {
      createInvoice: "Crea fattura",
      recordPayment: "Registra pagamento",
      exportReport: "Esporta rapporto",
      viewInvoices: "Vedi fatture",
      viewPayments: "Vedi pagamenti",
      manageReminders: "Gestisci promemoria",
      viewAnalytics: "Analytics dettagliate",
      configurePricing: "Configura prezzi",
    },
    alerts: {
      overdueInvoices: "Fatture in ritardo",
      overdueInvoicesDesc: "fatture non pagate richiedono follow-up",
      lowCashFlow: "Flusso di cassa basso",
      lowCashFlowDesc: "Il saldo di cassa è sotto la soglia",
      pendingPayments: "Pagamenti in attesa",
      pendingPaymentsDesc: "pagamenti da validare",
      viewDetails: "Vedi dettagli",
    },
    revenue: {
      lessons: "Lezioni pratiche",
      packages: "Pacchetti",
      exams: "Esami",
      other: "Altro",
      total: "Totale",
    },
    paymentMethods: {
      cash: "Contanti",
      card: "Carta",
      transfer: "Bonifico",
      qrBill: "Fattura QR",
      other: "Altro",
    },
    common: {
      currency: "CHF",
      loading: "Caricamento...",
      error: "Errore di caricamento",
      noData: "Nessun dato disponibile",
      refresh: "Aggiorna",
      export: "Esporta",
      filter: "Filtra",
    },
  },
  en: {
    page: {
      title: "Financial Management",
      subtitle: "School financial overview and control",
      lastUpdate: "Last update",
    },
    kpis: {
      monthlyRevenue: "Monthly revenue",
      monthlyRevenueDesc: "Revenue collected this month",
      outstandingInvoices: "Outstanding invoices",
      outstandingInvoicesDesc: "Total amount to collect",
      cashFlow: "Cash flow",
      cashFlowDesc: "Current cash balance",
      paymentRate: "Payment rate",
      paymentRateDesc: "Invoices paid on time",
      avgInvoiceValue: "Average invoice value",
      avgInvoiceValueDesc: "Average amount per invoice",
      overdueAmount: "Overdue amount",
      overdueAmountDesc: "Late payment invoices",
    },
    sections: {
      overview: "Overview",
      recentTransactions: "Recent transactions",
      analytics: "Financial analytics",
      quickActions: "Quick actions",
      revenueBreakdown: "Revenue breakdown",
      paymentMethods: "Payment methods",
      alerts: "Financial alerts",
    },
    transactions: {
      date: "Date",
      type: "Type",
      student: "Student",
      amount: "Amount",
      status: "Status",
      method: "Method",
      viewAll: "View all transactions",
      noTransactions: "No recent transactions",
      types: {
        payment: "Payment",
        invoice: "Invoice",
        refund: "Refund",
        credit: "Credit",
      },
      statuses: {
        completed: "Completed",
        pending: "Pending",
        failed: "Failed",
        refunded: "Refunded",
      },
    },
    analytics: {
      revenueEvolution: "Revenue evolution",
      paymentMethodsDistribution: "Payment methods distribution",
      categoryBreakdown: "Revenue by category",
      period: {
        week: "Week",
        month: "Month",
        quarter: "Quarter",
        year: "Year",
      },
    },
    actions: {
      createInvoice: "Create invoice",
      recordPayment: "Record payment",
      exportReport: "Export report",
      viewInvoices: "View invoices",
      viewPayments: "View payments",
      manageReminders: "Manage reminders",
      viewAnalytics: "Detailed analytics",
      configurePricing: "Configure pricing",
    },
    alerts: {
      overdueInvoices: "Overdue invoices",
      overdueInvoicesDesc: "unpaid invoices require follow-up",
      lowCashFlow: "Low cash flow",
      lowCashFlowDesc: "Cash balance is below threshold",
      pendingPayments: "Pending payments",
      pendingPaymentsDesc: "payments to validate",
      viewDetails: "View details",
    },
    revenue: {
      lessons: "Practical lessons",
      packages: "Packages",
      exams: "Exams",
      other: "Other",
      total: "Total",
    },
    paymentMethods: {
      cash: "Cash",
      card: "Card",
      transfer: "Transfer",
      qrBill: "QR bill",
      other: "Other",
    },
    common: {
      currency: "CHF",
      loading: "Loading...",
      error: "Loading error",
      noData: "No data available",
      refresh: "Refresh",
      export: "Export",
      filter: "Filter",
    },
  },
};
