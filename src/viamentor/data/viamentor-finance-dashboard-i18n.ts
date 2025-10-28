/**
 * VIAMENTOR - Finance Dashboard i18n
 * Traductions FR/DE/IT/EN pour dashboard finance et rapports TVA
 */

// ============================================================================
// TYPES
// ============================================================================

export type FinanceDashboardLocale = "fr" | "de" | "it" | "en";

export interface FinanceDashboardTranslations {
  page: {
    title: string;
    description: string;
    breadcrumb: {
      finance: string;
      dashboard: string;
      vatReports: string;
    };
  };
  stats: {
    revenue: string;
    mrr: string;
    arr: string;
    outstanding: string;
    paymentRate: string;
    netMargin: string;
    trend: {
      increase: string;
      decrease: string;
      stable: string;
    };
  };
  analytics: {
    title: string;
    revenueChart: {
      title: string;
      description: string;
    };
    sourceChart: {
      title: string;
      description: string;
      sources: {
        lessons: string;
        theory: string;
        exams: string;
        packages: string;
      };
    };
    paymentMethodsChart: {
      title: string;
      description: string;
      methods: {
        card: string;
        transfer: string;
        cash: string;
        twint: string;
      };
    };
    cashFlowChart: {
      title: string;
      description: string;
      inflow: string;
      outflow: string;
    };
  };
  forecasting: {
    title: string;
    description: string;
    horizon: {
      label: string;
      oneMonth: string;
      threeMonths: string;
      sixMonths: string;
      oneYear: string;
    };
    scenarios: {
      optimistic: string;
      realistic: string;
      pessimistic: string;
    };
    metrics: {
      mae: string;
      confidence: string;
    };
  };
  vat: {
    title: string;
    description: string;
    alert: string;
    rates: {
      normal: string;
      reduced: string;
      accommodation: string;
    };
    period: {
      label: string;
      q1: string;
      q2: string;
      q3: string;
      q4: string;
    };
    stats: {
      turnover: string;
      collected: string;
      deductible: string;
      toPay: string;
    };
    table: {
      date: string;
      client: string;
      amountHT: string;
      vatRate: string;
      vatAmount: string;
      category: string;
    };
    categories: {
      training: string;
      exam: string;
      rental: string;
      other: string;
    };
    actions: {
      generate: string;
      export: string;
    };
  };
  exports: {
    title: string;
    description: string;
    format: {
      label: string;
      excel: string;
      csv: string;
      datev: string;
      banana: string;
      sap: string;
      sage: string;
      bexio: string;
    };
    accounts: {
      label: string;
      pme: string;
      gaap: string;
      ifrs: string;
    };
    anonymize: string;
  };
  actions: {
    refresh: string;
    export: string;
    generate: string;
    download: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const financeDashboardTranslations: Record<
  FinanceDashboardLocale,
  FinanceDashboardTranslations
> = {
  fr: {
    page: {
      title: "Tableau de bord Finance",
      description: "Vue d'ensemble financière",
      breadcrumb: {
        finance: "Finance",
        dashboard: "Tableau de bord",
        vatReports: "Rapports TVA",
      },
    },
    stats: {
      revenue: "Revenus total",
      mrr: "MRR",
      arr: "ARR",
      outstanding: "Impayés",
      paymentRate: "Taux paiement",
      netMargin: "Marge nette",
      trend: {
        increase: "en hausse",
        decrease: "en baisse",
        stable: "stable",
      },
    },
    analytics: {
      title: "Analyse revenus",
      revenueChart: {
        title: "Évolution revenus",
        description: "Revenus mensuels sur 12 mois",
      },
      sourceChart: {
        title: "Revenus par source",
        description: "Distribution des revenus",
        sources: {
          lessons: "Leçons pratiques",
          theory: "Cours théoriques",
          exams: "Examens",
          packages: "Forfaits",
        },
      },
      paymentMethodsChart: {
        title: "Méthodes de paiement",
        description: "Préférences de paiement",
        methods: {
          card: "Carte",
          transfer: "Virement",
          cash: "Espèces",
          twint: "Twint",
        },
      },
      cashFlowChart: {
        title: "Cash-flow",
        description: "Entrées et sorties cumulées",
        inflow: "Entrées",
        outflow: "Sorties",
      },
    },
    forecasting: {
      title: "Prévisions revenus",
      description: "Prévisions basées sur l'algorithme Prophet",
      horizon: {
        label: "Horizon",
        oneMonth: "1 mois",
        threeMonths: "3 mois",
        sixMonths: "6 mois",
        oneYear: "1 an",
      },
      scenarios: {
        optimistic: "Optimiste",
        realistic: "Réaliste",
        pessimistic: "Pessimiste",
      },
      metrics: {
        mae: "Erreur moyenne",
        confidence: "Intervalle de confiance",
      },
    },
    vat: {
      title: "Déclarations TVA suisses",
      description: "Rapports TVA conformes AFC",
      alert: "Taux TVA: Normal 8.1%, Réduit 2.6%, Hébergement 3.8%",
      rates: {
        normal: "Normal (8.1%)",
        reduced: "Réduit (2.6%)",
        accommodation: "Hébergement (3.8%)",
      },
      period: {
        label: "Période",
        q1: "T1 2025 (Jan-Fév-Mars)",
        q2: "T2 2025 (Avr-Mai-Juin)",
        q3: "T3 2025 (Juil-Août-Sept)",
        q4: "T4 2025 (Oct-Nov-Déc)",
      },
      stats: {
        turnover: "Chiffre d'affaires HT",
        collected: "TVA collectée",
        deductible: "TVA déductible",
        toPay: "TVA à payer",
      },
      table: {
        date: "Date",
        client: "Client",
        amountHT: "Montant HT",
        vatRate: "Taux TVA",
        vatAmount: "TVA",
        category: "Catégorie",
      },
      categories: {
        training: "Formation",
        exam: "Examen",
        rental: "Location",
        other: "Autre",
      },
      actions: {
        generate: "Générer déclaration",
        export: "Exporter",
      },
    },
    exports: {
      title: "Exports avancés",
      description: "Exports comptables multi-formats",
      format: {
        label: "Format",
        excel: "Excel détaillé",
        csv: "CSV brut",
        datev: "DATEV (Allemagne)",
        banana: "Banana (Suisse)",
        sap: "SAP",
        sage: "Sage",
        bexio: "Bexio API",
      },
      accounts: {
        label: "Plan comptable",
        pme: "Plan comptable PME",
        gaap: "US GAAP",
        ifrs: "IFRS",
      },
      anonymize: "Anonymiser (RGPD)",
    },
    actions: {
      refresh: "Actualiser",
      export: "Exporter",
      generate: "Générer",
      download: "Télécharger",
    },
  },
  de: {
    page: {
      title: "Finanz-Dashboard",
      description: "Finanzübersicht",
      breadcrumb: {
        finance: "Finanzen",
        dashboard: "Dashboard",
        vatReports: "MwSt-Berichte",
      },
    },
    stats: {
      revenue: "Gesamtumsatz",
      mrr: "MRR",
      arr: "ARR",
      outstanding: "Ausstehend",
      paymentRate: "Zahlungsrate",
      netMargin: "Nettomarge",
      trend: {
        increase: "steigend",
        decrease: "fallend",
        stable: "stabil",
      },
    },
    analytics: {
      title: "Umsatzanalyse",
      revenueChart: {
        title: "Umsatzentwicklung",
        description: "Monatliche Einnahmen über 12 Monate",
      },
      sourceChart: {
        title: "Einnahmen nach Quelle",
        description: "Verteilung der Einnahmen",
        sources: {
          lessons: "Praktische Lektionen",
          theory: "Theoriekurse",
          exams: "Prüfungen",
          packages: "Pakete",
        },
      },
      paymentMethodsChart: {
        title: "Zahlungsmethoden",
        description: "Zahlungspräferenzen",
        methods: {
          card: "Karte",
          transfer: "Überweisung",
          cash: "Bargeld",
          twint: "Twint",
        },
      },
      cashFlowChart: {
        title: "Cashflow",
        description: "Kumulierte Ein- und Ausgänge",
        inflow: "Eingänge",
        outflow: "Ausgänge",
      },
    },
    forecasting: {
      title: "Umsatzprognosen",
      description: "Prognosen basierend auf Prophet-Algorithmus",
      horizon: {
        label: "Horizont",
        oneMonth: "1 Monat",
        threeMonths: "3 Monate",
        sixMonths: "6 Monate",
        oneYear: "1 Jahr",
      },
      scenarios: {
        optimistic: "Optimistisch",
        realistic: "Realistisch",
        pessimistic: "Pessimistisch",
      },
      metrics: {
        mae: "Mittlerer Fehler",
        confidence: "Konfidenzintervall",
      },
    },
    vat: {
      title: "Schweizer MwSt-Erklärungen",
      description: "ESTV-konforme MwSt-Berichte",
      alert: "MwSt-Sätze: Normal 8.1%, Reduziert 2.6%, Beherbergung 3.8%",
      rates: {
        normal: "Normal (8.1%)",
        reduced: "Reduziert (2.6%)",
        accommodation: "Beherbergung (3.8%)",
      },
      period: {
        label: "Periode",
        q1: "Q1 2025 (Jan-Feb-Mär)",
        q2: "Q2 2025 (Apr-Mai-Jun)",
        q3: "Q3 2025 (Jul-Aug-Sep)",
        q4: "Q4 2025 (Okt-Nov-Dez)",
      },
      stats: {
        turnover: "Umsatz ohne MwSt",
        collected: "Geschuldete MwSt",
        deductible: "Vorsteuer",
        toPay: "Zu zahlende MwSt",
      },
      table: {
        date: "Datum",
        client: "Kunde",
        amountHT: "Betrag ohne MwSt",
        vatRate: "MwSt-Satz",
        vatAmount: "MwSt",
        category: "Kategorie",
      },
      categories: {
        training: "Ausbildung",
        exam: "Prüfung",
        rental: "Vermietung",
        other: "Andere",
      },
      actions: {
        generate: "Erklärung erstellen",
        export: "Exportieren",
      },
    },
    exports: {
      title: "Erweiterte Exporte",
      description: "Buchhaltungsexporte in mehreren Formaten",
      format: {
        label: "Format",
        excel: "Excel detailliert",
        csv: "CSV roh",
        datev: "DATEV (Deutschland)",
        banana: "Banana (Schweiz)",
        sap: "SAP",
        sage: "Sage",
        bexio: "Bexio API",
      },
      accounts: {
        label: "Kontenplan",
        pme: "KMU-Kontenplan",
        gaap: "US GAAP",
        ifrs: "IFRS",
      },
      anonymize: "Anonymisieren (DSGVO)",
    },
    actions: {
      refresh: "Aktualisieren",
      export: "Exportieren",
      generate: "Erstellen",
      download: "Herunterladen",
    },
  },
  it: {
    page: {
      title: "Dashboard Finanze",
      description: "Panoramica finanziaria",
      breadcrumb: {
        finance: "Finanze",
        dashboard: "Dashboard",
        vatReports: "Rapporti IVA",
      },
    },
    stats: {
      revenue: "Ricavi totali",
      mrr: "MRR",
      arr: "ARR",
      outstanding: "Insoluti",
      paymentRate: "Tasso pagamento",
      netMargin: "Margine netto",
      trend: {
        increase: "in aumento",
        decrease: "in diminuzione",
        stable: "stabile",
      },
    },
    analytics: {
      title: "Analisi ricavi",
      revenueChart: {
        title: "Evoluzione ricavi",
        description: "Ricavi mensili su 12 mesi",
      },
      sourceChart: {
        title: "Ricavi per fonte",
        description: "Distribuzione dei ricavi",
        sources: {
          lessons: "Lezioni pratiche",
          theory: "Corsi teorici",
          exams: "Esami",
          packages: "Pacchetti",
        },
      },
      paymentMethodsChart: {
        title: "Metodi di pagamento",
        description: "Preferenze di pagamento",
        methods: {
          card: "Carta",
          transfer: "Bonifico",
          cash: "Contanti",
          twint: "Twint",
        },
      },
      cashFlowChart: {
        title: "Flusso di cassa",
        description: "Entrate e uscite cumulative",
        inflow: "Entrate",
        outflow: "Uscite",
      },
    },
    forecasting: {
      title: "Previsioni ricavi",
      description: "Previsioni basate sull'algoritmo Prophet",
      horizon: {
        label: "Orizzonte",
        oneMonth: "1 mese",
        threeMonths: "3 mesi",
        sixMonths: "6 mesi",
        oneYear: "1 anno",
      },
      scenarios: {
        optimistic: "Ottimistico",
        realistic: "Realistico",
        pessimistic: "Pessimistico",
      },
      metrics: {
        mae: "Errore medio",
        confidence: "Intervallo di confidenza",
      },
    },
    vat: {
      title: "Dichiarazioni IVA svizzere",
      description: "Rapporti IVA conformi AFC",
      alert: "Aliquote IVA: Normale 8.1%, Ridotta 2.6%, Alloggio 3.8%",
      rates: {
        normal: "Normale (8.1%)",
        reduced: "Ridotta (2.6%)",
        accommodation: "Alloggio (3.8%)",
      },
      period: {
        label: "Periodo",
        q1: "T1 2025 (Gen-Feb-Mar)",
        q2: "T2 2025 (Apr-Mag-Giu)",
        q3: "T3 2025 (Lug-Ago-Set)",
        q4: "T4 2025 (Ott-Nov-Dic)",
      },
      stats: {
        turnover: "Fatturato netto",
        collected: "IVA riscossa",
        deductible: "IVA deducibile",
        toPay: "IVA da pagare",
      },
      table: {
        date: "Data",
        client: "Cliente",
        amountHT: "Importo netto",
        vatRate: "Aliquota IVA",
        vatAmount: "IVA",
        category: "Categoria",
      },
      categories: {
        training: "Formazione",
        exam: "Esame",
        rental: "Noleggio",
        other: "Altro",
      },
      actions: {
        generate: "Genera dichiarazione",
        export: "Esporta",
      },
    },
    exports: {
      title: "Esportazioni avanzate",
      description: "Esportazioni contabili multi-formato",
      format: {
        label: "Formato",
        excel: "Excel dettagliato",
        csv: "CSV grezzo",
        datev: "DATEV (Germania)",
        banana: "Banana (Svizzera)",
        sap: "SAP",
        sage: "Sage",
        bexio: "Bexio API",
      },
      accounts: {
        label: "Piano dei conti",
        pme: "Piano PMI",
        gaap: "US GAAP",
        ifrs: "IFRS",
      },
      anonymize: "Anonimizza (GDPR)",
    },
    actions: {
      refresh: "Aggiorna",
      export: "Esporta",
      generate: "Genera",
      download: "Scarica",
    },
  },
  en: {
    page: {
      title: "Finance Dashboard",
      description: "Financial overview",
      breadcrumb: {
        finance: "Finance",
        dashboard: "Dashboard",
        vatReports: "VAT Reports",
      },
    },
    stats: {
      revenue: "Total revenue",
      mrr: "MRR",
      arr: "ARR",
      outstanding: "Outstanding",
      paymentRate: "Payment rate",
      netMargin: "Net margin",
      trend: {
        increase: "increasing",
        decrease: "decreasing",
        stable: "stable",
      },
    },
    analytics: {
      title: "Revenue analysis",
      revenueChart: {
        title: "Revenue evolution",
        description: "Monthly revenue over 12 months",
      },
      sourceChart: {
        title: "Revenue by source",
        description: "Revenue distribution",
        sources: {
          lessons: "Practical lessons",
          theory: "Theory courses",
          exams: "Exams",
          packages: "Packages",
        },
      },
      paymentMethodsChart: {
        title: "Payment methods",
        description: "Payment preferences",
        methods: {
          card: "Card",
          transfer: "Transfer",
          cash: "Cash",
          twint: "Twint",
        },
      },
      cashFlowChart: {
        title: "Cash flow",
        description: "Cumulative inflows and outflows",
        inflow: "Inflows",
        outflow: "Outflows",
      },
    },
    forecasting: {
      title: "Revenue forecasts",
      description: "Forecasts based on Prophet algorithm",
      horizon: {
        label: "Horizon",
        oneMonth: "1 month",
        threeMonths: "3 months",
        sixMonths: "6 months",
        oneYear: "1 year",
      },
      scenarios: {
        optimistic: "Optimistic",
        realistic: "Realistic",
        pessimistic: "Pessimistic",
      },
      metrics: {
        mae: "Mean error",
        confidence: "Confidence interval",
      },
    },
    vat: {
      title: "Swiss VAT declarations",
      description: "FTA-compliant VAT reports",
      alert: "VAT rates: Standard 8.1%, Reduced 2.6%, Accommodation 3.8%",
      rates: {
        normal: "Standard (8.1%)",
        reduced: "Reduced (2.6%)",
        accommodation: "Accommodation (3.8%)",
      },
      period: {
        label: "Period",
        q1: "Q1 2025 (Jan-Feb-Mar)",
        q2: "Q2 2025 (Apr-May-Jun)",
        q3: "Q3 2025 (Jul-Aug-Sep)",
        q4: "Q4 2025 (Oct-Nov-Dec)",
      },
      stats: {
        turnover: "Turnover excl. VAT",
        collected: "VAT collected",
        deductible: "Deductible VAT",
        toPay: "VAT to pay",
      },
      table: {
        date: "Date",
        client: "Client",
        amountHT: "Amount excl. VAT",
        vatRate: "VAT rate",
        vatAmount: "VAT",
        category: "Category",
      },
      categories: {
        training: "Training",
        exam: "Exam",
        rental: "Rental",
        other: "Other",
      },
      actions: {
        generate: "Generate declaration",
        export: "Export",
      },
    },
    exports: {
      title: "Advanced exports",
      description: "Multi-format accounting exports",
      format: {
        label: "Format",
        excel: "Detailed Excel",
        csv: "Raw CSV",
        datev: "DATEV (Germany)",
        banana: "Banana (Switzerland)",
        sap: "SAP",
        sage: "Sage",
        bexio: "Bexio API",
      },
      accounts: {
        label: "Chart of accounts",
        pme: "SME chart",
        gaap: "US GAAP",
        ifrs: "IFRS",
      },
      anonymize: "Anonymize (GDPR)",
    },
    actions: {
      refresh: "Refresh",
      export: "Export",
      generate: "Generate",
      download: "Download",
    },
  },
};

// ============================================================================
// HELPER
// ============================================================================

export function getFinanceDashboardTranslations(
  locale: FinanceDashboardLocale = "fr"
): FinanceDashboardTranslations {
  return (
    financeDashboardTranslations[locale] || financeDashboardTranslations.fr
  );
}
