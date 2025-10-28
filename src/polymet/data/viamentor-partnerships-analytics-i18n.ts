/**
 * VIAMENTOR - Partnerships Analytics i18n
 * Traductions FR/DE/IT/EN pour analytics partenariats
 */

// ============================================================================
// TYPES
// ============================================================================

export type PartnershipsAnalyticsLocale = "fr" | "de" | "it" | "en";

export interface PartnershipsAnalyticsTranslations {
  // Navigation
  breadcrumb: {
    analytics: string;
    partnerships: string;
  };

  // Page
  title: string;
  subtitle: string;

  // Period Selector
  period: {
    label: string;
    currentQuarter: string;
    lastQuarter: string;
    currentYear: string;
    lastYear: string;
    custom: string;
  };

  // Model Comparison
  modelComparison: {
    title: string;
    subtitle: string;
    free: {
      title: string;
      description: string;
    };
    monthlyFlat: {
      title: string;
      description: string;
    };
    commission: {
      title: string;
      description: string;
    };
    metrics: {
      activeInstructors: string;
      totalRevenue: string;
      schoolReversal: string;
      satisfaction: string;
      turnoverRate: string;
      avgCommission: string;
      mrr: string;
      instructorNet: string;
    };
  };

  // Charts
  charts: {
    revenueByModel: {
      title: string;
      subtitle: string;
    };
    evolutionTrends: {
      title: string;
      subtitle: string;
    };
    conversionFunnel: {
      title: string;
      subtitle: string;
      stages: {
        prospects: string;
        negotiation: string;
        signed: string;
        active: string;
        renewed: string;
      };
    };
  };

  // Instructors Table
  instructorsTable: {
    title: string;
    subtitle: string;
    columns: {
      instructor: string;
      status: string;
      model: string;
      contractStart: string;
      contractEnd: string;
      revenueYTD: string;
      schoolReversal: string;
      netInstructor: string;
      lessonsCount: string;
      satisfaction: string;
      actions: string;
    };
    actions: {
      viewProfile: string;
      renegotiate: string;
      viewContract: string;
      viewHistory: string;
    };
    contractTypes: {
      CDI: string;
      CDD: string;
      freelance: string;
    };
    daysRemaining: string;
  };

  // Contracts Management
  contracts: {
    title: string;
    subtitle: string;
    renewalAlert: {
      title: string;
      message: string;
    };
    table: {
      columns: {
        instructor: string;
        endDate: string;
        daysRemaining: string;
        currentModel: string;
        revenue12M: string;
        satisfaction: string;
        status: string;
        actions: string;
      };
    };
    status: {
      pending: string;
      proposed: string;
      negotiating: string;
      signed: string;
      declined: string;
    };
    actions: {
      proposeRenewal: string;
      viewDetails: string;
      sendReminder: string;
    };
  };

  // Renegotiation Wizard
  renegotiation: {
    title: string;
    subtitle: string;
    steps: {
      review: string;
      proposal: string;
      negotiation: string;
      signature: string;
    };
    step1: {
      title: string;
      subtitle: string;
      performance: {
        title: string;
        revenue: string;
        satisfaction: string;
        turnover: string;
        roi: string;
      };
      recommendation: string;
    };
    step2: {
      title: string;
      subtitle: string;
      currentModel: string;
      proposedModel: string;
      benefits: string;
      costs: string;
      comparison: string;
    };
    step3: {
      title: string;
      subtitle: string;
      instructorFeedback: string;
      counterOffer: string;
      discussion: string;
      notes: string;
    };
    step4: {
      title: string;
      subtitle: string;
      contractPreview: string;
      signatureLabel: string;
      signaturePlaceholder: string;
      legalNotice: string;
      confirm: string;
    };
    actions: {
      previous: string;
      next: string;
      save: string;
      send: string;
      sign: string;
    };
  };

  // Reports
  reports: {
    title: string;
    subtitle: string;
    generate: string;
    download: string;
    types: {
      executive: string;
      detailed: string;
      comparison: string;
      forecast: string;
    };
    sections: {
      cover: string;
      summary: string;
      overview: string;
      charts: string;
      recommendations: string;
    };
  };

  // Common
  common: {
    loading: string;
    noData: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    export: string;
    filter: string;
    search: string;
    all: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<
  PartnershipsAnalyticsLocale,
  PartnershipsAnalyticsTranslations
> = {
  fr: {
    breadcrumb: {
      analytics: "Analytics",
      partnerships: "Partenariats moniteurs",
    },
    title: "Analyse modèles rémunération",
    subtitle: "Performances et comparaisons des partenariats moniteurs",
    period: {
      label: "Période",
      currentQuarter: "Trimestre actuel",
      lastQuarter: "Trimestre précédent",
      currentYear: "Année en cours",
      lastYear: "Année précédente",
      custom: "Personnalisé",
    },
    modelComparison: {
      title: "Performances par modèle paiement",
      subtitle: "Comparaison des différents modèles de rémunération",
      free: {
        title: "Gratuit 0%",
        description: "Moniteurs autonomes sans reversement",
      },
      monthlyFlat: {
        title: "Forfait mensuel",
        description: "Revenus fixes prévisibles",
      },
      commission: {
        title: "Commission %",
        description: "Reversement basé sur le CA",
      },
      metrics: {
        activeInstructors: "Moniteurs actifs",
        totalRevenue: "CA total généré",
        schoolReversal: "Reversement école",
        satisfaction: "Taux satisfaction",
        turnoverRate: "Taux rotation",
        avgCommission: "Commission moyenne",
        mrr: "Revenus récurrents",
        instructorNet: "Net moniteur",
      },
    },
    charts: {
      revenueByModel: {
        title: "CA généré par modèle",
        subtitle: "Comparaison des volumes de revenus",
      },
      evolutionTrends: {
        title: "Évolution tendances 12 mois",
        subtitle: "Analyse des patterns saisonniers",
      },
      conversionFunnel: {
        title: "Funnel conversion partenariats",
        subtitle: "Lifecycle du recrutement à la fidélisation",
        stages: {
          prospects: "Prospects",
          negotiation: "Négociation",
          signed: "Contrats signés",
          active: "Partenariats actifs",
          renewed: "Renouvelés",
        },
      },
    },
    instructorsTable: {
      title: "Moniteurs détaillé",
      subtitle: "Vue complète des partenariats actifs",
      columns: {
        instructor: "Moniteur",
        status: "Statut",
        model: "Modèle paiement",
        contractStart: "Début contrat",
        contractEnd: "Fin contrat",
        revenueYTD: "CA généré YTD",
        schoolReversal: "Reversement école",
        netInstructor: "Net moniteur",
        lessonsCount: "Nb leçons",
        satisfaction: "Satisfaction",
        actions: "Actions",
      },
      actions: {
        viewProfile: "Voir fiche",
        renegotiate: "Renégocier contrat",
        viewContract: "Voir contrat",
        viewHistory: "Historique",
      },
      contractTypes: {
        CDI: "CDI",
        CDD: "CDD",
        freelance: "Indépendant",
      },
      daysRemaining: "jours restants",
    },
    contracts: {
      title: "Contrats à renouveler",
      subtitle: "Gestion proactive des renouvellements",
      renewalAlert: {
        title: "Attention",
        message: "contrats expirent dans les 30 prochains jours",
      },
      table: {
        columns: {
          instructor: "Moniteur",
          endDate: "Date fin",
          daysRemaining: "Jours restants",
          currentModel: "Modèle actuel",
          revenue12M: "CA 12 mois",
          satisfaction: "Satisfaction",
          status: "Statut",
          actions: "Actions",
        },
      },
      status: {
        pending: "En attente",
        proposed: "Proposé",
        negotiating: "Négociation",
        signed: "Signé",
        declined: "Refusé",
      },
      actions: {
        proposeRenewal: "Proposer renouvellement",
        viewDetails: "Voir détails",
        sendReminder: "Envoyer rappel",
      },
    },
    renegotiation: {
      title: "Renégociation contrat",
      subtitle: "Processus guidé de renouvellement",
      steps: {
        review: "Revue performance",
        proposal: "Proposition",
        negotiation: "Négociation",
        signature: "Signature",
      },
      step1: {
        title: "Revue performance passée",
        subtitle: "Analyse des résultats et contribution",
        performance: {
          title: "Indicateurs clés",
          revenue: "Chiffre d'affaires",
          satisfaction: "Satisfaction élèves",
          turnover: "Taux rotation",
          roi: "ROI partenariat",
        },
        recommendation: "Recommandation",
      },
      step2: {
        title: "Proposition modèle",
        subtitle: "Sélection et configuration du modèle de rémunération",
        currentModel: "Modèle actuel",
        proposedModel: "Modèle proposé",
        benefits: "Avantages",
        costs: "Coûts",
        comparison: "Comparaison",
      },
      step3: {
        title: "Négociation",
        subtitle: "Discussion et ajustements",
        instructorFeedback: "Retour moniteur",
        counterOffer: "Contre-proposition",
        discussion: "Discussion",
        notes: "Notes internes",
      },
      step4: {
        title: "Signature digitale",
        subtitle: "Finalisation du contrat",
        contractPreview: "Aperçu contrat",
        signatureLabel: "Signature",
        signaturePlaceholder: "Dessinez votre signature",
        legalNotice: "En signant, vous acceptez les termes du contrat",
        confirm: "Confirmer et signer",
      },
      actions: {
        previous: "Précédent",
        next: "Suivant",
        save: "Enregistrer",
        send: "Envoyer",
        sign: "Signer",
      },
    },
    reports: {
      title: "Rapports exécutifs",
      subtitle: "Génération de rapports d'analyse",
      generate: "Générer rapport",
      download: "Télécharger PDF",
      types: {
        executive: "Résumé direction",
        detailed: "Rapport détaillé",
        comparison: "Comparaison modèles",
        forecast: "Prévisions",
      },
      sections: {
        cover: "Page de garde",
        summary: "Résumé exécutif",
        overview: "Vue d'ensemble",
        charts: "Graphiques",
        recommendations: "Recommandations",
      },
    },
    common: {
      loading: "Chargement...",
      noData: "Aucune donnée",
      error: "Erreur",
      success: "Succès",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Enregistrer",
      export: "Exporter",
      filter: "Filtrer",
      search: "Rechercher",
      all: "Tous",
    },
  },

  de: {
    breadcrumb: {
      analytics: "Analytics",
      partnerships: "Fahrlehrer-Partnerschaften",
    },
    title: "Analyse Vergütungsmodelle",
    subtitle: "Leistungen und Vergleiche der Fahrlehrer-Partnerschaften",
    period: {
      label: "Zeitraum",
      currentQuarter: "Aktuelles Quartal",
      lastQuarter: "Letztes Quartal",
      currentYear: "Laufendes Jahr",
      lastYear: "Vorjahr",
      custom: "Benutzerdefiniert",
    },
    modelComparison: {
      title: "Leistungen nach Zahlungsmodell",
      subtitle: "Vergleich der verschiedenen Vergütungsmodelle",
      free: {
        title: "Kostenlos 0%",
        description: "Autonome Fahrlehrer ohne Rückvergütung",
      },
      monthlyFlat: {
        title: "Monatspauschale",
        description: "Vorhersehbare Fixeinnahmen",
      },
      commission: {
        title: "Provision %",
        description: "Umsatzbasierte Rückvergütung",
      },
      metrics: {
        activeInstructors: "Aktive Fahrlehrer",
        totalRevenue: "Gesamtumsatz generiert",
        schoolReversal: "Rückvergütung Fahrschule",
        satisfaction: "Zufriedenheitsrate",
        turnoverRate: "Fluktuationsrate",
        avgCommission: "Durchschnittsprovision",
        mrr: "Wiederkehrende Einnahmen",
        instructorNet: "Netto Fahrlehrer",
      },
    },
    charts: {
      revenueByModel: {
        title: "Umsatz nach Modell",
        subtitle: "Vergleich der Umsatzvolumen",
      },
      evolutionTrends: {
        title: "Entwicklungstrends 12 Monate",
        subtitle: "Analyse saisonaler Muster",
      },
      conversionFunnel: {
        title: "Conversion-Funnel Partnerschaften",
        subtitle: "Lebenszyklus von Rekrutierung bis Bindung",
        stages: {
          prospects: "Interessenten",
          negotiation: "Verhandlung",
          signed: "Verträge unterzeichnet",
          active: "Aktive Partnerschaften",
          renewed: "Verlängert",
        },
      },
    },
    instructorsTable: {
      title: "Fahrlehrer detailliert",
      subtitle: "Vollständige Ansicht aktiver Partnerschaften",
      columns: {
        instructor: "Fahrlehrer",
        status: "Status",
        model: "Zahlungsmodell",
        contractStart: "Vertragsbeginn",
        contractEnd: "Vertragsende",
        revenueYTD: "Umsatz YTD",
        schoolReversal: "Rückvergütung Fahrschule",
        netInstructor: "Netto Fahrlehrer",
        lessonsCount: "Anzahl Lektionen",
        satisfaction: "Zufriedenheit",
        actions: "Aktionen",
      },
      actions: {
        viewProfile: "Profil anzeigen",
        renegotiate: "Vertrag neu verhandeln",
        viewContract: "Vertrag anzeigen",
        viewHistory: "Verlauf",
      },
      contractTypes: {
        CDI: "Unbefristet",
        CDD: "Befristet",
        freelance: "Freiberuflich",
      },
      daysRemaining: "Tage verbleibend",
    },
    contracts: {
      title: "Zu verlängernde Verträge",
      subtitle: "Proaktives Verlängerungsmanagement",
      renewalAlert: {
        title: "Achtung",
        message: "Verträge laufen in den nächsten 30 Tagen ab",
      },
      table: {
        columns: {
          instructor: "Fahrlehrer",
          endDate: "Enddatum",
          daysRemaining: "Verbleibende Tage",
          currentModel: "Aktuelles Modell",
          revenue12M: "Umsatz 12 Monate",
          satisfaction: "Zufriedenheit",
          status: "Status",
          actions: "Aktionen",
        },
      },
      status: {
        pending: "Ausstehend",
        proposed: "Vorgeschlagen",
        negotiating: "Verhandlung",
        signed: "Unterzeichnet",
        declined: "Abgelehnt",
      },
      actions: {
        proposeRenewal: "Verlängerung vorschlagen",
        viewDetails: "Details anzeigen",
        sendReminder: "Erinnerung senden",
      },
    },
    renegotiation: {
      title: "Vertragsverhandlung",
      subtitle: "Geführter Verlängerungsprozess",
      steps: {
        review: "Leistungsüberprüfung",
        proposal: "Vorschlag",
        negotiation: "Verhandlung",
        signature: "Unterschrift",
      },
      step1: {
        title: "Überprüfung vergangener Leistungen",
        subtitle: "Analyse der Ergebnisse und Beiträge",
        performance: {
          title: "Schlüsselindikatoren",
          revenue: "Umsatz",
          satisfaction: "Schülerzufriedenheit",
          turnover: "Fluktuationsrate",
          roi: "ROI Partnerschaft",
        },
        recommendation: "Empfehlung",
      },
      step2: {
        title: "Modellvorschlag",
        subtitle: "Auswahl und Konfiguration des Vergütungsmodells",
        currentModel: "Aktuelles Modell",
        proposedModel: "Vorgeschlagenes Modell",
        benefits: "Vorteile",
        costs: "Kosten",
        comparison: "Vergleich",
      },
      step3: {
        title: "Verhandlung",
        subtitle: "Diskussion und Anpassungen",
        instructorFeedback: "Feedback Fahrlehrer",
        counterOffer: "Gegenangebot",
        discussion: "Diskussion",
        notes: "Interne Notizen",
      },
      step4: {
        title: "Digitale Unterschrift",
        subtitle: "Vertragsabschluss",
        contractPreview: "Vertragsvorschau",
        signatureLabel: "Unterschrift",
        signaturePlaceholder: "Zeichnen Sie Ihre Unterschrift",
        legalNotice:
          "Mit der Unterzeichnung akzeptieren Sie die Vertragsbedingungen",
        confirm: "Bestätigen und unterschreiben",
      },
      actions: {
        previous: "Zurück",
        next: "Weiter",
        save: "Speichern",
        send: "Senden",
        sign: "Unterschreiben",
      },
    },
    reports: {
      title: "Führungsberichte",
      subtitle: "Erstellung von Analyseberichten",
      generate: "Bericht erstellen",
      download: "PDF herunterladen",
      types: {
        executive: "Führungszusammenfassung",
        detailed: "Detaillierter Bericht",
        comparison: "Modellvergleich",
        forecast: "Prognosen",
      },
      sections: {
        cover: "Deckblatt",
        summary: "Zusammenfassung",
        overview: "Übersicht",
        charts: "Diagramme",
        recommendations: "Empfehlungen",
      },
    },
    common: {
      loading: "Laden...",
      noData: "Keine Daten",
      error: "Fehler",
      success: "Erfolg",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
      save: "Speichern",
      export: "Exportieren",
      filter: "Filtern",
      search: "Suchen",
      all: "Alle",
    },
  },

  it: {
    breadcrumb: {
      analytics: "Analytics",
      partnerships: "Partnership istruttori",
    },
    title: "Analisi modelli retribuzione",
    subtitle: "Prestazioni e confronti delle partnership istruttori",
    period: {
      label: "Periodo",
      currentQuarter: "Trimestre corrente",
      lastQuarter: "Trimestre precedente",
      currentYear: "Anno in corso",
      lastYear: "Anno precedente",
      custom: "Personalizzato",
    },
    modelComparison: {
      title: "Prestazioni per modello pagamento",
      subtitle: "Confronto dei diversi modelli di retribuzione",
      free: {
        title: "Gratuito 0%",
        description: "Istruttori autonomi senza rimborso",
      },
      monthlyFlat: {
        title: "Forfait mensile",
        description: "Entrate fisse prevedibili",
      },
      commission: {
        title: "Commissione %",
        description: "Rimborso basato sul fatturato",
      },
      metrics: {
        activeInstructors: "Istruttori attivi",
        totalRevenue: "Fatturato totale generato",
        schoolReversal: "Rimborso scuola",
        satisfaction: "Tasso soddisfazione",
        turnoverRate: "Tasso rotazione",
        avgCommission: "Commissione media",
        mrr: "Entrate ricorrenti",
        instructorNet: "Netto istruttore",
      },
    },
    charts: {
      revenueByModel: {
        title: "Fatturato per modello",
        subtitle: "Confronto dei volumi di entrate",
      },
      evolutionTrends: {
        title: "Evoluzione tendenze 12 mesi",
        subtitle: "Analisi dei pattern stagionali",
      },
      conversionFunnel: {
        title: "Funnel conversione partnership",
        subtitle: "Ciclo di vita dal reclutamento alla fidelizzazione",
        stages: {
          prospects: "Prospect",
          negotiation: "Negoziazione",
          signed: "Contratti firmati",
          active: "Partnership attive",
          renewed: "Rinnovate",
        },
      },
    },
    instructorsTable: {
      title: "Istruttori dettagliato",
      subtitle: "Vista completa delle partnership attive",
      columns: {
        instructor: "Istruttore",
        status: "Stato",
        model: "Modello pagamento",
        contractStart: "Inizio contratto",
        contractEnd: "Fine contratto",
        revenueYTD: "Fatturato YTD",
        schoolReversal: "Rimborso scuola",
        netInstructor: "Netto istruttore",
        lessonsCount: "N. lezioni",
        satisfaction: "Soddisfazione",
        actions: "Azioni",
      },
      actions: {
        viewProfile: "Vedi profilo",
        renegotiate: "Rinegoziare contratto",
        viewContract: "Vedi contratto",
        viewHistory: "Storico",
      },
      contractTypes: {
        CDI: "Indeterminato",
        CDD: "Determinato",
        freelance: "Autonomo",
      },
      daysRemaining: "giorni rimanenti",
    },
    contracts: {
      title: "Contratti da rinnovare",
      subtitle: "Gestione proattiva dei rinnovi",
      renewalAlert: {
        title: "Attenzione",
        message: "contratti scadono nei prossimi 30 giorni",
      },
      table: {
        columns: {
          instructor: "Istruttore",
          endDate: "Data fine",
          daysRemaining: "Giorni rimanenti",
          currentModel: "Modello attuale",
          revenue12M: "Fatturato 12 mesi",
          satisfaction: "Soddisfazione",
          status: "Stato",
          actions: "Azioni",
        },
      },
      status: {
        pending: "In attesa",
        proposed: "Proposto",
        negotiating: "Negoziazione",
        signed: "Firmato",
        declined: "Rifiutato",
      },
      actions: {
        proposeRenewal: "Proporre rinnovo",
        viewDetails: "Vedi dettagli",
        sendReminder: "Invia promemoria",
      },
    },
    renegotiation: {
      title: "Rinegoziazione contratto",
      subtitle: "Processo guidato di rinnovo",
      steps: {
        review: "Revisione prestazioni",
        proposal: "Proposta",
        negotiation: "Negoziazione",
        signature: "Firma",
      },
      step1: {
        title: "Revisione prestazioni passate",
        subtitle: "Analisi dei risultati e contributo",
        performance: {
          title: "Indicatori chiave",
          revenue: "Fatturato",
          satisfaction: "Soddisfazione studenti",
          turnover: "Tasso rotazione",
          roi: "ROI partnership",
        },
        recommendation: "Raccomandazione",
      },
      step2: {
        title: "Proposta modello",
        subtitle: "Selezione e configurazione del modello di retribuzione",
        currentModel: "Modello attuale",
        proposedModel: "Modello proposto",
        benefits: "Vantaggi",
        costs: "Costi",
        comparison: "Confronto",
      },
      step3: {
        title: "Negoziazione",
        subtitle: "Discussione e aggiustamenti",
        instructorFeedback: "Feedback istruttore",
        counterOffer: "Controproposta",
        discussion: "Discussione",
        notes: "Note interne",
      },
      step4: {
        title: "Firma digitale",
        subtitle: "Finalizzazione del contratto",
        contractPreview: "Anteprima contratto",
        signatureLabel: "Firma",
        signaturePlaceholder: "Disegna la tua firma",
        legalNotice: "Firmando, accetti i termini del contratto",
        confirm: "Conferma e firma",
      },
      actions: {
        previous: "Precedente",
        next: "Successivo",
        save: "Salva",
        send: "Invia",
        sign: "Firma",
      },
    },
    reports: {
      title: "Report esecutivi",
      subtitle: "Generazione di report di analisi",
      generate: "Genera report",
      download: "Scarica PDF",
      types: {
        executive: "Riepilogo direzione",
        detailed: "Report dettagliato",
        comparison: "Confronto modelli",
        forecast: "Previsioni",
      },
      sections: {
        cover: "Copertina",
        summary: "Riepilogo esecutivo",
        overview: "Panoramica",
        charts: "Grafici",
        recommendations: "Raccomandazioni",
      },
    },
    common: {
      loading: "Caricamento...",
      noData: "Nessun dato",
      error: "Errore",
      success: "Successo",
      cancel: "Annulla",
      confirm: "Conferma",
      save: "Salva",
      export: "Esporta",
      filter: "Filtra",
      search: "Cerca",
      all: "Tutti",
    },
  },

  en: {
    breadcrumb: {
      analytics: "Analytics",
      partnerships: "Instructor partnerships",
    },
    title: "Compensation models analysis",
    subtitle: "Performance and comparisons of instructor partnerships",
    period: {
      label: "Period",
      currentQuarter: "Current quarter",
      lastQuarter: "Last quarter",
      currentYear: "Current year",
      lastYear: "Last year",
      custom: "Custom",
    },
    modelComparison: {
      title: "Performance by payment model",
      subtitle: "Comparison of different compensation models",
      free: {
        title: "Free 0%",
        description: "Autonomous instructors without reversal",
      },
      monthlyFlat: {
        title: "Monthly flat",
        description: "Predictable fixed revenue",
      },
      commission: {
        title: "Commission %",
        description: "Revenue-based reversal",
      },
      metrics: {
        activeInstructors: "Active instructors",
        totalRevenue: "Total revenue generated",
        schoolReversal: "School reversal",
        satisfaction: "Satisfaction rate",
        turnoverRate: "Turnover rate",
        avgCommission: "Average commission",
        mrr: "Recurring revenue",
        instructorNet: "Instructor net",
      },
    },
    charts: {
      revenueByModel: {
        title: "Revenue by model",
        subtitle: "Comparison of revenue volumes",
      },
      evolutionTrends: {
        title: "Evolution trends 12 months",
        subtitle: "Analysis of seasonal patterns",
      },
      conversionFunnel: {
        title: "Partnership conversion funnel",
        subtitle: "Lifecycle from recruitment to retention",
        stages: {
          prospects: "Prospects",
          negotiation: "Negotiation",
          signed: "Signed contracts",
          active: "Active partnerships",
          renewed: "Renewed",
        },
      },
    },
    instructorsTable: {
      title: "Instructors detailed",
      subtitle: "Complete view of active partnerships",
      columns: {
        instructor: "Instructor",
        status: "Status",
        model: "Payment model",
        contractStart: "Contract start",
        contractEnd: "Contract end",
        revenueYTD: "Revenue YTD",
        schoolReversal: "School reversal",
        netInstructor: "Instructor net",
        lessonsCount: "Lessons count",
        satisfaction: "Satisfaction",
        actions: "Actions",
      },
      actions: {
        viewProfile: "View profile",
        renegotiate: "Renegotiate contract",
        viewContract: "View contract",
        viewHistory: "History",
      },
      contractTypes: {
        CDI: "Permanent",
        CDD: "Fixed-term",
        freelance: "Freelance",
      },
      daysRemaining: "days remaining",
    },
    contracts: {
      title: "Contracts to renew",
      subtitle: "Proactive renewal management",
      renewalAlert: {
        title: "Warning",
        message: "contracts expire in the next 30 days",
      },
      table: {
        columns: {
          instructor: "Instructor",
          endDate: "End date",
          daysRemaining: "Days remaining",
          currentModel: "Current model",
          revenue12M: "Revenue 12 months",
          satisfaction: "Satisfaction",
          status: "Status",
          actions: "Actions",
        },
      },
      status: {
        pending: "Pending",
        proposed: "Proposed",
        negotiating: "Negotiating",
        signed: "Signed",
        declined: "Declined",
      },
      actions: {
        proposeRenewal: "Propose renewal",
        viewDetails: "View details",
        sendReminder: "Send reminder",
      },
    },
    renegotiation: {
      title: "Contract renegotiation",
      subtitle: "Guided renewal process",
      steps: {
        review: "Performance review",
        proposal: "Proposal",
        negotiation: "Negotiation",
        signature: "Signature",
      },
      step1: {
        title: "Past performance review",
        subtitle: "Analysis of results and contribution",
        performance: {
          title: "Key indicators",
          revenue: "Revenue",
          satisfaction: "Student satisfaction",
          turnover: "Turnover rate",
          roi: "Partnership ROI",
        },
        recommendation: "Recommendation",
      },
      step2: {
        title: "Model proposal",
        subtitle: "Selection and configuration of compensation model",
        currentModel: "Current model",
        proposedModel: "Proposed model",
        benefits: "Benefits",
        costs: "Costs",
        comparison: "Comparison",
      },
      step3: {
        title: "Negotiation",
        subtitle: "Discussion and adjustments",
        instructorFeedback: "Instructor feedback",
        counterOffer: "Counter-offer",
        discussion: "Discussion",
        notes: "Internal notes",
      },
      step4: {
        title: "Digital signature",
        subtitle: "Contract finalization",
        contractPreview: "Contract preview",
        signatureLabel: "Signature",
        signaturePlaceholder: "Draw your signature",
        legalNotice: "By signing, you accept the contract terms",
        confirm: "Confirm and sign",
      },
      actions: {
        previous: "Previous",
        next: "Next",
        save: "Save",
        send: "Send",
        sign: "Sign",
      },
    },
    reports: {
      title: "Executive reports",
      subtitle: "Generation of analysis reports",
      generate: "Generate report",
      download: "Download PDF",
      types: {
        executive: "Executive summary",
        detailed: "Detailed report",
        comparison: "Model comparison",
        forecast: "Forecasts",
      },
      sections: {
        cover: "Cover page",
        summary: "Executive summary",
        overview: "Overview",
        charts: "Charts",
        recommendations: "Recommendations",
      },
    },
    common: {
      loading: "Loading...",
      noData: "No data",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      export: "Export",
      filter: "Filter",
      search: "Search",
      all: "All",
    },
  },
};

// ============================================================================
// HOOK
// ============================================================================

export function usePartnershipsAnalyticsTranslations(
  locale: PartnershipsAnalyticsLocale = "fr"
): PartnershipsAnalyticsTranslations {
  return translations[locale];
}

export default translations;
