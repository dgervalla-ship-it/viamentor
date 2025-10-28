/**
 * VIAMENTOR - Accountant i18n
 * Traductions FR/DE/IT/EN pour dashboard comptable
 *
 * Sections:
 * - Header (titre, actions)
 * - KPIs (revenus, créances, trésorerie, taux encaissement)
 * - Transactions (liste, statuts, filtres)
 * - Analytics (charts revenus, répartition, moyens paiement)
 * - Actions rapides (export, rapports, réconciliation)
 * - Alertes (impayés, anomalies)
 */

export type AccountantLocale = "fr" | "de" | "it" | "en";

export interface AccountantTranslations {
  header: {
    title: string;
    subtitle: string;
    period: string;
    export: string;
    reports: string;
    reconcile: string;
  };
  kpis: {
    monthlyRevenue: string;
    receivables: string;
    cashFlow: string;
    collectionRate: string;
    avgInvoice: string;
    overdue: string;
    trend: {
      up: string;
      down: string;
      stable: string;
    };
  };
  transactions: {
    title: string;
    recent: string;
    date: string;
    reference: string;
    student: string;
    amount: string;
    method: string;
    status: string;
    viewAll: string;
    statuses: {
      paid: string;
      pending: string;
      overdue: string;
      cancelled: string;
    };
    methods: {
      card: string;
      qr: string;
      transfer: string;
      cash: string;
    };
  };
  analytics: {
    title: string;
    revenueEvolution: string;
    revenueBreakdown: string;
    paymentMethods: string;
    target: string;
    actual: string;
    categories: {
      lessons: string;
      packages: string;
      exams: string;
      other: string;
    };
  };
  quickActions: {
    title: string;
    exportInvoices: string;
    exportPayments: string;
    vatReport: string;
    accountingReport: string;
    reconcilePayments: string;
    viewReceivables: string;
    viewOverdue: string;
  };
  alerts: {
    title: string;
    overdueInvoices: string;
    pendingPayments: string;
    lowCashFlow: string;
    reconciliationNeeded: string;
    view: string;
    resolve: string;
  };
  periods: {
    today: string;
    week: string;
    month: string;
    quarter: string;
    year: string;
    custom: string;
  };
  formats: {
    currency: string;
    percentage: string;
    date: string;
  };
}

export const ACCOUNTANT_I18N: Record<AccountantLocale, AccountantTranslations> =
  {
    fr: {
      header: {
        title: "Comptabilité",
        subtitle: "Gestion financière et rapports comptables",
        period: "Période",
        export: "Exporter",
        reports: "Rapports",
        reconcile: "Réconcilier",
      },
      kpis: {
        monthlyRevenue: "Revenus mensuels",
        receivables: "Créances",
        cashFlow: "Trésorerie",
        collectionRate: "Taux d'encaissement",
        avgInvoice: "Facture moyenne",
        overdue: "Impayés",
        trend: {
          up: "en hausse",
          down: "en baisse",
          stable: "stable",
        },
      },
      transactions: {
        title: "Transactions",
        recent: "Transactions récentes",
        date: "Date",
        reference: "Référence",
        student: "Élève",
        amount: "Montant",
        method: "Méthode",
        status: "Statut",
        viewAll: "Voir toutes les transactions",
        statuses: {
          paid: "Payé",
          pending: "En attente",
          overdue: "En retard",
          cancelled: "Annulé",
        },
        methods: {
          card: "Carte bancaire",
          qr: "QR-facture",
          transfer: "Virement",
          cash: "Espèces",
        },
      },
      analytics: {
        title: "Analytics",
        revenueEvolution: "Évolution des revenus",
        revenueBreakdown: "Répartition des revenus",
        paymentMethods: "Moyens de paiement",
        target: "Objectif",
        actual: "Réel",
        categories: {
          lessons: "Leçons",
          packages: "Forfaits",
          exams: "Examens",
          other: "Autres",
        },
      },
      quickActions: {
        title: "Actions rapides",
        exportInvoices: "Exporter factures",
        exportPayments: "Exporter paiements",
        vatReport: "Rapport TVA",
        accountingReport: "Rapport comptable",
        reconcilePayments: "Réconcilier paiements",
        viewReceivables: "Voir créances",
        viewOverdue: "Voir impayés",
      },
      alerts: {
        title: "Alertes comptables",
        overdueInvoices: "factures en retard",
        pendingPayments: "paiements en attente",
        lowCashFlow: "Trésorerie faible",
        reconciliationNeeded: "Réconciliation nécessaire",
        view: "Voir",
        resolve: "Résoudre",
      },
      periods: {
        today: "Aujourd'hui",
        week: "Cette semaine",
        month: "Ce mois",
        quarter: "Ce trimestre",
        year: "Cette année",
        custom: "Personnalisé",
      },
      formats: {
        currency: "CHF",
        percentage: "%",
        date: "DD.MM.YYYY",
      },
    },
    de: {
      header: {
        title: "Buchhaltung",
        subtitle: "Finanzverwaltung und Buchhaltungsberichte",
        period: "Zeitraum",
        export: "Exportieren",
        reports: "Berichte",
        reconcile: "Abgleichen",
      },
      kpis: {
        monthlyRevenue: "Monatliche Einnahmen",
        receivables: "Forderungen",
        cashFlow: "Cashflow",
        collectionRate: "Inkassoquote",
        avgInvoice: "Durchschnittliche Rechnung",
        overdue: "Überfällig",
        trend: {
          up: "steigend",
          down: "fallend",
          stable: "stabil",
        },
      },
      transactions: {
        title: "Transaktionen",
        recent: "Letzte Transaktionen",
        date: "Datum",
        reference: "Referenz",
        student: "Schüler",
        amount: "Betrag",
        method: "Methode",
        status: "Status",
        viewAll: "Alle Transaktionen anzeigen",
        statuses: {
          paid: "Bezahlt",
          pending: "Ausstehend",
          overdue: "Überfällig",
          cancelled: "Storniert",
        },
        methods: {
          card: "Kreditkarte",
          qr: "QR-Rechnung",
          transfer: "Überweisung",
          cash: "Bargeld",
        },
      },
      analytics: {
        title: "Analytics",
        revenueEvolution: "Umsatzentwicklung",
        revenueBreakdown: "Umsatzverteilung",
        paymentMethods: "Zahlungsmethoden",
        target: "Ziel",
        actual: "Ist",
        categories: {
          lessons: "Fahrstunden",
          packages: "Pakete",
          exams: "Prüfungen",
          other: "Sonstiges",
        },
      },
      quickActions: {
        title: "Schnellaktionen",
        exportInvoices: "Rechnungen exportieren",
        exportPayments: "Zahlungen exportieren",
        vatReport: "MwSt-Bericht",
        accountingReport: "Buchhaltungsbericht",
        reconcilePayments: "Zahlungen abgleichen",
        viewReceivables: "Forderungen anzeigen",
        viewOverdue: "Überfällige anzeigen",
      },
      alerts: {
        title: "Buchhaltungswarnungen",
        overdueInvoices: "überfällige Rechnungen",
        pendingPayments: "ausstehende Zahlungen",
        lowCashFlow: "Niedriger Cashflow",
        reconciliationNeeded: "Abgleich erforderlich",
        view: "Anzeigen",
        resolve: "Lösen",
      },
      periods: {
        today: "Heute",
        week: "Diese Woche",
        month: "Dieser Monat",
        quarter: "Dieses Quartal",
        year: "Dieses Jahr",
        custom: "Benutzerdefiniert",
      },
      formats: {
        currency: "CHF",
        percentage: "%",
        date: "DD.MM.YYYY",
      },
    },
    it: {
      header: {
        title: "Contabilità",
        subtitle: "Gestione finanziaria e rapporti contabili",
        period: "Periodo",
        export: "Esporta",
        reports: "Rapporti",
        reconcile: "Riconcilia",
      },
      kpis: {
        monthlyRevenue: "Entrate mensili",
        receivables: "Crediti",
        cashFlow: "Flusso di cassa",
        collectionRate: "Tasso di riscossione",
        avgInvoice: "Fattura media",
        overdue: "Insoluti",
        trend: {
          up: "in aumento",
          down: "in diminuzione",
          stable: "stabile",
        },
      },
      transactions: {
        title: "Transazioni",
        recent: "Transazioni recenti",
        date: "Data",
        reference: "Riferimento",
        student: "Allievo",
        amount: "Importo",
        method: "Metodo",
        status: "Stato",
        viewAll: "Vedi tutte le transazioni",
        statuses: {
          paid: "Pagato",
          pending: "In attesa",
          overdue: "In ritardo",
          cancelled: "Annullato",
        },
        methods: {
          card: "Carta di credito",
          qr: "Fattura QR",
          transfer: "Bonifico",
          cash: "Contanti",
        },
      },
      analytics: {
        title: "Analytics",
        revenueEvolution: "Evoluzione delle entrate",
        revenueBreakdown: "Ripartizione delle entrate",
        paymentMethods: "Metodi di pagamento",
        target: "Obiettivo",
        actual: "Effettivo",
        categories: {
          lessons: "Lezioni",
          packages: "Pacchetti",
          exams: "Esami",
          other: "Altro",
        },
      },
      quickActions: {
        title: "Azioni rapide",
        exportInvoices: "Esporta fatture",
        exportPayments: "Esporta pagamenti",
        vatReport: "Rapporto IVA",
        accountingReport: "Rapporto contabile",
        reconcilePayments: "Riconcilia pagamenti",
        viewReceivables: "Vedi crediti",
        viewOverdue: "Vedi insoluti",
      },
      alerts: {
        title: "Avvisi contabili",
        overdueInvoices: "fatture in ritardo",
        pendingPayments: "pagamenti in attesa",
        lowCashFlow: "Flusso di cassa basso",
        reconciliationNeeded: "Riconciliazione necessaria",
        view: "Vedi",
        resolve: "Risolvi",
      },
      periods: {
        today: "Oggi",
        week: "Questa settimana",
        month: "Questo mese",
        quarter: "Questo trimestre",
        year: "Quest'anno",
        custom: "Personalizzato",
      },
      formats: {
        currency: "CHF",
        percentage: "%",
        date: "DD.MM.YYYY",
      },
    },
    en: {
      header: {
        title: "Accounting",
        subtitle: "Financial management and accounting reports",
        period: "Period",
        export: "Export",
        reports: "Reports",
        reconcile: "Reconcile",
      },
      kpis: {
        monthlyRevenue: "Monthly revenue",
        receivables: "Receivables",
        cashFlow: "Cash flow",
        collectionRate: "Collection rate",
        avgInvoice: "Average invoice",
        overdue: "Overdue",
        trend: {
          up: "up",
          down: "down",
          stable: "stable",
        },
      },
      transactions: {
        title: "Transactions",
        recent: "Recent transactions",
        date: "Date",
        reference: "Reference",
        student: "Student",
        amount: "Amount",
        method: "Method",
        status: "Status",
        viewAll: "View all transactions",
        statuses: {
          paid: "Paid",
          pending: "Pending",
          overdue: "Overdue",
          cancelled: "Cancelled",
        },
        methods: {
          card: "Credit card",
          qr: "QR invoice",
          transfer: "Bank transfer",
          cash: "Cash",
        },
      },
      analytics: {
        title: "Analytics",
        revenueEvolution: "Revenue evolution",
        revenueBreakdown: "Revenue breakdown",
        paymentMethods: "Payment methods",
        target: "Target",
        actual: "Actual",
        categories: {
          lessons: "Lessons",
          packages: "Packages",
          exams: "Exams",
          other: "Other",
        },
      },
      quickActions: {
        title: "Quick actions",
        exportInvoices: "Export invoices",
        exportPayments: "Export payments",
        vatReport: "VAT report",
        accountingReport: "Accounting report",
        reconcilePayments: "Reconcile payments",
        viewReceivables: "View receivables",
        viewOverdue: "View overdue",
      },
      alerts: {
        title: "Accounting alerts",
        overdueInvoices: "overdue invoices",
        pendingPayments: "pending payments",
        lowCashFlow: "Low cash flow",
        reconciliationNeeded: "Reconciliation needed",
        view: "View",
        resolve: "Resolve",
      },
      periods: {
        today: "Today",
        week: "This week",
        month: "This month",
        quarter: "This quarter",
        year: "This year",
        custom: "Custom",
      },
      formats: {
        currency: "CHF",
        percentage: "%",
        date: "DD.MM.YYYY",
      },
    },
  };
