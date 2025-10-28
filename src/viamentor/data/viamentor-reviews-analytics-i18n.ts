/**
 * VIAMENTOR - Reviews Analytics i18n
 * Traductions FR/DE/IT/EN pour dashboard analytics avis
 */

// ============================================================================
// TYPES
// ============================================================================

export type ReviewsAnalyticsLocale = "fr" | "de" | "it" | "en";

export interface ReviewsAnalyticsTranslations {
  page: {
    breadcrumb: string;
    title: string;
  };
  period: {
    label: string;
    last7days: string;
    last30days: string;
    last90days: string;
    last12months: string;
    custom: string;
    compare: string;
  };
  kpis: {
    averageRating: string;
    totalReviews: string;
    responseRate: string;
    nps: string;
    trend: string;
    target: string;
  };
  distribution: {
    title: string;
    stars: string;
    reviews: string;
    percentage: string;
    clickToFilter: string;
  };
  trends: {
    title: string;
    averageRating: string;
    reviewsCount: string;
    month: string;
    viewCombined: string;
    viewRating: string;
    viewSentiment: string;
    clickToDrillDown: string;
  };
  filters: {
    title: string;
    byRating: string;
    bySentiment: string;
    byDate: string;
    verifiedOnly: string;
    reset: string;
  };
  sentiment: {
    title: string;
    positive: string;
    neutral: string;
    negative: string;
    wordCloud: string;
    topWords: string;
  };
  topReviewers: {
    title: string;
    rank: string;
    name: string;
    reviews: string;
    rating: string;
    lastReview: string;
    badges: {
      champion: string;
      elite: string;
      contributor: string;
    };
  };
  insights: {
    title: string;
    subtitle: string;
    categories: {
      strength: string;
      weakness: string;
      opportunity: string;
      threat: string;
    };
    priority: {
      high: string;
      medium: string;
      low: string;
    };
    evidence: string;
    createTask: string;
    noInsights: string;
  };
  actions: {
    export: string;
    schedule: string;
    refresh: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const reviewsAnalyticsTranslations: Record<
  ReviewsAnalyticsLocale,
  ReviewsAnalyticsTranslations
> = {
  fr: {
    page: {
      breadcrumb: "Avis / Tableau de bord",
      title: "Réputation en ligne Google",
    },
    period: {
      label: "Période",
      last7days: "7 derniers jours",
      last30days: "30 derniers jours",
      last90days: "90 derniers jours",
      last12months: "12 derniers mois",
      custom: "Personnalisée",
      compare: "Comparer avec période précédente",
    },
    kpis: {
      averageRating: "Note moyenne",
      totalReviews: "Total avis",
      responseRate: "Taux de réponse",
      nps: "Net Promoter Score",
      trend: "vs période précédente",
      target: "Objectif",
    },
    distribution: {
      title: "Répartition des étoiles",
      stars: "étoiles",
      reviews: "avis",
      percentage: "du total",
      clickToFilter: "Cliquer pour filtrer",
    },
    trends: {
      title: "Tendances temporelles",
      averageRating: "Note moyenne",
      reviewsCount: "Avis reçus",
      month: "Mois",
      viewCombined: "Vue combinée",
      viewRating: "Par note",
      viewSentiment: "Par sentiment",
      clickToDrillDown: "Cliquer pour détails",
    },
    filters: {
      title: "Filtres avancés",
      byRating: "Par note",
      bySentiment: "Par sentiment",
      byDate: "Par date",
      verifiedOnly: "Achats vérifiés uniquement",
      reset: "Réinitialiser",
    },
    sentiment: {
      title: "Sentiments exprimés",
      positive: "Positif",
      neutral: "Neutre",
      negative: "Négatif",
      wordCloud: "Mots fréquents",
      topWords: "Mots les plus mentionnés",
    },
    topReviewers: {
      title: "Top contributeurs",
      rank: "Rang",
      name: "Nom",
      reviews: "Avis",
      rating: "Note moy.",
      lastReview: "Dernier avis",
      badges: {
        champion: "Champion",
        elite: "Élite",
        contributor: "Contributeur",
      },
    },
    insights: {
      title: "Recommandations intelligence artificielle",
      subtitle: "Insights générés par analyse Claude AI",
      categories: {
        strength: "Forces",
        weakness: "Faiblesses",
        opportunity: "Opportunités",
        threat: "Menaces",
      },
      priority: {
        high: "Haute",
        medium: "Moyenne",
        low: "Basse",
      },
      evidence: "Preuves",
      createTask: "Créer tâche",
      noInsights: "Aucun insight disponible",
    },
    actions: {
      export: "Exporter",
      schedule: "Planifier rapport",
      refresh: "Actualiser",
    },
  },

  de: {
    page: {
      breadcrumb: "Bewertungen / Dashboard",
      title: "Google Online-Reputation",
    },
    period: {
      label: "Zeitraum",
      last7days: "Letzte 7 Tage",
      last30days: "Letzte 30 Tage",
      last90days: "Letzte 90 Tage",
      last12months: "Letzte 12 Monate",
      custom: "Benutzerdefiniert",
      compare: "Mit vorherigem Zeitraum vergleichen",
    },
    kpis: {
      averageRating: "Durchschnittsbewertung",
      totalReviews: "Bewertungen gesamt",
      responseRate: "Antwortrate",
      nps: "Net Promoter Score",
      trend: "vs. vorheriger Zeitraum",
      target: "Ziel",
    },
    distribution: {
      title: "Sterne-Verteilung",
      stars: "Sterne",
      reviews: "Bewertungen",
      percentage: "der Gesamtzahl",
      clickToFilter: "Klicken zum Filtern",
    },
    trends: {
      title: "Zeitliche Trends",
      averageRating: "Durchschnittsbewertung",
      reviewsCount: "Erhaltene Bewertungen",
      month: "Monat",
      viewCombined: "Kombinierte Ansicht",
      viewRating: "Nach Bewertung",
      viewSentiment: "Nach Stimmung",
      clickToDrillDown: "Klicken für Details",
    },
    filters: {
      title: "Erweiterte Filter",
      byRating: "Nach Bewertung",
      bySentiment: "Nach Stimmung",
      byDate: "Nach Datum",
      verifiedOnly: "Nur verifizierte Käufe",
      reset: "Zurücksetzen",
    },
    sentiment: {
      title: "Ausgedrückte Stimmungen",
      positive: "Positiv",
      neutral: "Neutral",
      negative: "Negativ",
      wordCloud: "Häufige Wörter",
      topWords: "Am häufigsten erwähnte Wörter",
    },
    topReviewers: {
      title: "Top-Beitragende",
      rank: "Rang",
      name: "Name",
      reviews: "Bewertungen",
      rating: "Durchschn.",
      lastReview: "Letzte Bewertung",
      badges: {
        champion: "Champion",
        elite: "Elite",
        contributor: "Beitragender",
      },
    },
    insights: {
      title: "KI-Empfehlungen",
      subtitle: "Insights durch Claude AI-Analyse generiert",
      categories: {
        strength: "Stärken",
        weakness: "Schwächen",
        opportunity: "Chancen",
        threat: "Bedrohungen",
      },
      priority: {
        high: "Hoch",
        medium: "Mittel",
        low: "Niedrig",
      },
      evidence: "Beweise",
      createTask: "Aufgabe erstellen",
      noInsights: "Keine Insights verfügbar",
    },
    actions: {
      export: "Exportieren",
      schedule: "Bericht planen",
      refresh: "Aktualisieren",
    },
  },

  it: {
    page: {
      breadcrumb: "Recensioni / Dashboard",
      title: "Reputazione online Google",
    },
    period: {
      label: "Periodo",
      last7days: "Ultimi 7 giorni",
      last30days: "Ultimi 30 giorni",
      last90days: "Ultimi 90 giorni",
      last12months: "Ultimi 12 mesi",
      custom: "Personalizzato",
      compare: "Confronta con periodo precedente",
    },
    kpis: {
      averageRating: "Valutazione media",
      totalReviews: "Recensioni totali",
      responseRate: "Tasso di risposta",
      nps: "Net Promoter Score",
      trend: "vs periodo precedente",
      target: "Obiettivo",
    },
    distribution: {
      title: "Distribuzione stelle",
      stars: "stelle",
      reviews: "recensioni",
      percentage: "del totale",
      clickToFilter: "Clicca per filtrare",
    },
    trends: {
      title: "Tendenze temporali",
      averageRating: "Valutazione media",
      reviewsCount: "Recensioni ricevute",
      month: "Mese",
      viewCombined: "Vista combinata",
      viewRating: "Per valutazione",
      viewSentiment: "Per sentimento",
      clickToDrillDown: "Clicca per dettagli",
    },
    filters: {
      title: "Filtri avanzati",
      byRating: "Per valutazione",
      bySentiment: "Per sentimento",
      byDate: "Per data",
      verifiedOnly: "Solo acquisti verificati",
      reset: "Ripristina",
    },
    sentiment: {
      title: "Sentimenti espressi",
      positive: "Positivo",
      neutral: "Neutro",
      negative: "Negativo",
      wordCloud: "Parole frequenti",
      topWords: "Parole più menzionate",
    },
    topReviewers: {
      title: "Top contributori",
      rank: "Posizione",
      name: "Nome",
      reviews: "Recensioni",
      rating: "Media",
      lastReview: "Ultima recensione",
      badges: {
        champion: "Campione",
        elite: "Elite",
        contributor: "Contributore",
      },
    },
    insights: {
      title: "Raccomandazioni intelligenza artificiale",
      subtitle: "Insights generati da analisi Claude AI",
      categories: {
        strength: "Punti di forza",
        weakness: "Punti deboli",
        opportunity: "Opportunità",
        threat: "Minacce",
      },
      priority: {
        high: "Alta",
        medium: "Media",
        low: "Bassa",
      },
      evidence: "Prove",
      createTask: "Crea attività",
      noInsights: "Nessun insight disponibile",
    },
    actions: {
      export: "Esporta",
      schedule: "Pianifica report",
      refresh: "Aggiorna",
    },
  },

  en: {
    page: {
      breadcrumb: "Reviews / Dashboard",
      title: "Google Online Reputation",
    },
    period: {
      label: "Period",
      last7days: "Last 7 days",
      last30days: "Last 30 days",
      last90days: "Last 90 days",
      last12months: "Last 12 months",
      custom: "Custom",
      compare: "Compare with previous period",
    },
    kpis: {
      averageRating: "Average rating",
      totalReviews: "Total reviews",
      responseRate: "Response rate",
      nps: "Net Promoter Score",
      trend: "vs previous period",
      target: "Target",
    },
    distribution: {
      title: "Star distribution",
      stars: "stars",
      reviews: "reviews",
      percentage: "of total",
      clickToFilter: "Click to filter",
    },
    trends: {
      title: "Temporal trends",
      averageRating: "Average rating",
      reviewsCount: "Reviews received",
      month: "Month",
      viewCombined: "Combined view",
      viewRating: "By rating",
      viewSentiment: "By sentiment",
      clickToDrillDown: "Click for details",
    },
    filters: {
      title: "Advanced filters",
      byRating: "By rating",
      bySentiment: "By sentiment",
      byDate: "By date",
      verifiedOnly: "Verified purchases only",
      reset: "Reset",
    },
    sentiment: {
      title: "Expressed sentiments",
      positive: "Positive",
      neutral: "Neutral",
      negative: "Negative",
      wordCloud: "Frequent words",
      topWords: "Most mentioned words",
    },
    topReviewers: {
      title: "Top contributors",
      rank: "Rank",
      name: "Name",
      reviews: "Reviews",
      rating: "Avg rating",
      lastReview: "Last review",
      badges: {
        champion: "Champion",
        elite: "Elite",
        contributor: "Contributor",
      },
    },
    insights: {
      title: "Artificial intelligence recommendations",
      subtitle: "Insights generated by Claude AI analysis",
      categories: {
        strength: "Strengths",
        weakness: "Weaknesses",
        opportunity: "Opportunities",
        threat: "Threats",
      },
      priority: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      evidence: "Evidence",
      createTask: "Create task",
      noInsights: "No insights available",
    },
    actions: {
      export: "Export",
      schedule: "Schedule report",
      refresh: "Refresh",
    },
  },
};
