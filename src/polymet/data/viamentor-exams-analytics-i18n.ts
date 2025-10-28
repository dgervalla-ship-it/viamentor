/**
 * VIAMENTOR - Exams Analytics i18n
 * Traductions FR/DE/IT/EN pour analytics examens
 */

import type {
  ExamType,
  ExamCategory,
  FailureReason,
} from "@/polymet/data/viamentor-exams-analytics-data";

// ============================================================================
// TYPES
// ============================================================================

export type ExamsLocale = "fr" | "de" | "it" | "en";

export interface ExamsTranslations {
  // Page
  title: string;
  subtitle: string;

  // Header Stats
  stats: {
    totalExams: string;
    successRate: string;
    failures: string;
    averageAttempts: string;
    trend: string;
  };

  // Tabs
  tabs: {
    successRates: string;
    byInstructor: string;
    failures: string;
    preparation: string;
    timing: string;
    benchmarking: string;
    recommendations: string;
  };

  // Success Rates
  successRates: {
    title: string;
    filters: {
      dateRange: string;
      category: string;
      examType: string;
      allCategories: string;
      allTypes: string;
    };
    global: {
      title: string;
      vsPrevious: string;
      vsNational: string;
    };
    byCategory: {
      title: string;
      chart: string;
    };
    details: {
      title: string;
      category: string;
      theory: string;
      practical: string;
      total: string;
      passed: string;
      rate: string;
      avgAttempts: string;
      avgLessons: string;
      avgDays: string;
    };
    evolution: {
      title: string;
      theory: string;
      practical: string;
    };
  };

  // Instructor Performance
  instructorPerf: {
    title: string;
    table: {
      instructor: string;
      presented: string;
      passed: string;
      rate: string;
      avgAttempts: string;
      avgLessons: string;
    };
    scatter: {
      title: string;
      xAxis: string;
      yAxis: string;
      efficient: string;
      inefficient: string;
    };
    topInstructors: {
      title: string;
      subtitle: string;
    };
  };

  // Failure Analysis
  failures: {
    title: string;
    reasons: {
      title: string;
      subtitle: string;
    };
    multipleFailures: {
      title: string;
      subtitle: string;
      alert: string;
      table: {
        student: string;
        category: string;
        attempts: string;
        lastExam: string;
        instructor: string;
        progression: string;
        actions: string;
      };
      actionButtons: {
        attestation: string;
        targetedLessons: string;
        changeInstructor: string;
        support: string;
      };
    };
  };

  // Preparation
  preparation: {
    title: string;
    distribution: {
      title: string;
      subtitle: string;
      xAxis: string;
      yAxis: string;
      optimal: string;
    };
    averages: {
      title: string;
      category: string;
      recommended: string;
      actual: string;
      delta: string;
      duration: string;
      interpretation: string;
    };
    correlation: {
      title: string;
      subtitle: string;
      threshold: string;
    };
  };

  // Timing
  timing: {
    title: string;
    averageDelay: {
      title: string;
      days: string;
      interpretation: string;
    };
    byTiming: {
      title: string;
      subtitle: string;
    };
    seasonality: {
      title: string;
      subtitle: string;
      best: string;
      worst: string;
    };
  };

  // Benchmarking
  benchmarking: {
    title: string;
    vsNational: {
      title: string;
      our: string;
      national: string;
      delta: string;
      better: string;
      worse: string;
    };
    vsTargets: {
      title: string;
      target: string;
      current: string;
      gap: string;
      actions: string;
    };
  };

  // Recommendations
  recommendations: {
    title: string;
    subtitle: string;
    priority: {
      high: string;
      medium: string;
      low: string;
    };
    impact: string;
    actions: string;
    implement: string;
  };

  // Exam Types
  examTypes: {
    theory: string;
    practical: string;
  };

  // Failure Reasons
  failureReasons: {
    maneuvers: string;
    priorities: string;
    parking: string;
    stress: string;
    speed: string;
    observation: string;
    other: string;
  };

  // Common
  common: {
    export: string;
    filter: string;
    reset: string;
    viewDetails: string;
    noData: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const examsTranslations: Record<ExamsLocale, ExamsTranslations> = {
  fr: {
    title: "Analytics Examens",
    subtitle: "Analyse détaillée des résultats d'examens et taux de réussite",

    stats: {
      totalExams: "Examens passés",
      successRate: "Taux de réussite",
      failures: "Échecs",
      averageAttempts: "Tentatives moyennes",
      trend: "vs période précédente",
    },

    tabs: {
      successRates: "Taux de Réussite",
      byInstructor: "Par Moniteur",
      failures: "Analyse Échecs",
      preparation: "Préparation",
      timing: "Timing",
      benchmarking: "Comparaisons",
      recommendations: "Recommandations",
    },

    successRates: {
      title: "Taux de Réussite",
      filters: {
        dateRange: "Période",
        category: "Catégorie",
        examType: "Type d'examen",
        allCategories: "Toutes catégories",
        allTypes: "Tous types",
      },
      global: {
        title: "Taux Global",
        vsPrevious: "vs période précédente",
        vsNational: "vs moyenne suisse",
      },
      byCategory: {
        title: "Réussite par Catégorie",
        chart: "Taux de réussite par catégorie et type",
      },
      details: {
        title: "Détails par Catégorie",
        category: "Catégorie",
        theory: "Examens Théoriques",
        practical: "Examens Pratiques",
        total: "Passés",
        passed: "Réussis",
        rate: "Taux",
        avgAttempts: "Tentatives moy.",
        avgLessons: "Leçons moy.",
        avgDays: "Durée moy. (jours)",
      },
      evolution: {
        title: "Évolution des Taux",
        theory: "Théorique",
        practical: "Pratique",
      },
    },

    instructorPerf: {
      title: "Performance par Moniteur",
      table: {
        instructor: "Moniteur",
        presented: "Présentés",
        passed: "Réussis",
        rate: "Taux",
        avgAttempts: "Tentatives moy.",
        avgLessons: "Leçons moy.",
      },
      scatter: {
        title: "Performance Moniteurs",
        xAxis: "Leçons moyennes",
        yAxis: "Taux de réussite (%)",
        efficient: "Efficace",
        inefficient: "À améliorer",
      },
      topInstructors: {
        title: "Top Moniteurs",
        subtitle: "Meilleurs taux de réussite",
      },
    },

    failures: {
      title: "Analyse des Échecs",
      reasons: {
        title: "Motifs d'Échec",
        subtitle: "Répartition des raisons d'échec",
      },
      multipleFailures: {
        title: "Élèves en Difficulté",
        subtitle: "Élèves avec échecs multiples (≥2)",
        alert: "élèves nécessitent une intervention urgente",
        table: {
          student: "Élève",
          category: "Catégorie",
          attempts: "Tentatives",
          lastExam: "Dernier examen",
          instructor: "Moniteur",
          progression: "Progression",
          actions: "Actions",
        },
        actionButtons: {
          attestation: "Attestation Art.23",
          targetedLessons: "Leçons ciblées",
          changeInstructor: "Changer moniteur",
          support: "Support psy.",
        },
      },
    },

    preparation: {
      title: "Analyse de Préparation",
      distribution: {
        title: "Distribution des Leçons",
        subtitle: "Nombre de leçons avant réussite",
        xAxis: "Nombre de leçons",
        yAxis: "Nombre d'élèves",
        optimal: "Zone optimale: 25-35 leçons",
      },
      averages: {
        title: "Moyennes par Catégorie",
        category: "Catégorie",
        recommended: "Recommandé",
        actual: "Moyenne réelle",
        delta: "Écart",
        duration: "Durée (jours)",
        interpretation: "Interprétation",
      },
      correlation: {
        title: "Corrélation Progression/Réussite",
        subtitle: "Progression minimale recommandée: 75%",
        threshold: "Seuil recommandé",
      },
    },

    timing: {
      title: "Analyse du Timing",
      averageDelay: {
        title: "Délai Moyen Inscription → Examen",
        days: "jours",
        interpretation: "Interprétation",
      },
      byTiming: {
        title: "Réussite par Durée de Formation",
        subtitle: "Taux de réussite selon la durée",
      },
      seasonality: {
        title: "Saisonnalité",
        subtitle: "Taux de réussite par mois et catégorie",
        best: "Meilleur mois",
        worst: "Moins bon mois",
      },
    },

    benchmarking: {
      title: "Comparaisons",
      vsNational: {
        title: "vs Moyenne Suisse",
        our: "Notre taux",
        national: "Moyenne nationale",
        delta: "Écart",
        better: "Meilleur",
        worse: "Inférieur",
      },
      vsTargets: {
        title: "vs Objectifs",
        target: "Objectif",
        current: "Actuel",
        gap: "Écart",
        actions: "Actions requises",
      },
    },

    recommendations: {
      title: "Recommandations",
      subtitle: "Insights générés automatiquement",
      priority: {
        high: "Priorité haute",
        medium: "Priorité moyenne",
        low: "Priorité basse",
      },
      impact: "Impact estimé",
      actions: "Actions suggérées",
      implement: "Mettre en œuvre",
    },

    examTypes: {
      theory: "Théorique",
      practical: "Pratique",
    },

    failureReasons: {
      maneuvers: "Manœuvres",
      priorities: "Priorités",
      parking: "Stationnement",
      stress: "Stress",
      speed: "Vitesse",
      observation: "Observation",
      other: "Autre",
    },

    common: {
      export: "Exporter",
      filter: "Filtrer",
      reset: "Réinitialiser",
      viewDetails: "Voir détails",
      noData: "Aucune donnée disponible",
    },
  },

  de: {
    title: "Prüfungs-Analytics",
    subtitle: "Detaillierte Analyse der Prüfungsergebnisse und Erfolgsquoten",

    stats: {
      totalExams: "Abgelegte Prüfungen",
      successRate: "Erfolgsquote",
      failures: "Durchgefallen",
      averageAttempts: "Durchschn. Versuche",
      trend: "vs vorherige Periode",
    },

    tabs: {
      successRates: "Erfolgsquoten",
      byInstructor: "Nach Fahrlehrer",
      failures: "Fehleranalyse",
      preparation: "Vorbereitung",
      timing: "Timing",
      benchmarking: "Vergleiche",
      recommendations: "Empfehlungen",
    },

    successRates: {
      title: "Erfolgsquoten",
      filters: {
        dateRange: "Zeitraum",
        category: "Kategorie",
        examType: "Prüfungstyp",
        allCategories: "Alle Kategorien",
        allTypes: "Alle Typen",
      },
      global: {
        title: "Gesamtquote",
        vsPrevious: "vs vorherige Periode",
        vsNational: "vs Schweizer Durchschnitt",
      },
      byCategory: {
        title: "Erfolg nach Kategorie",
        chart: "Erfolgsquote nach Kategorie und Typ",
      },
      details: {
        title: "Details nach Kategorie",
        category: "Kategorie",
        theory: "Theoretische Prüfungen",
        practical: "Praktische Prüfungen",
        total: "Abgelegt",
        passed: "Bestanden",
        rate: "Quote",
        avgAttempts: "Durchschn. Versuche",
        avgLessons: "Durchschn. Lektionen",
        avgDays: "Durchschn. Dauer (Tage)",
      },
      evolution: {
        title: "Entwicklung der Quoten",
        theory: "Theoretisch",
        practical: "Praktisch",
      },
    },

    instructorPerf: {
      title: "Leistung nach Fahrlehrer",
      table: {
        instructor: "Fahrlehrer",
        presented: "Präsentiert",
        passed: "Bestanden",
        rate: "Quote",
        avgAttempts: "Durchschn. Versuche",
        avgLessons: "Durchschn. Lektionen",
      },
      scatter: {
        title: "Fahrlehrer-Performance",
        xAxis: "Durchschnittliche Lektionen",
        yAxis: "Erfolgsquote (%)",
        efficient: "Effizient",
        inefficient: "Zu verbessern",
      },
      topInstructors: {
        title: "Top Fahrlehrer",
        subtitle: "Beste Erfolgsquoten",
      },
    },

    failures: {
      title: "Fehleranalyse",
      reasons: {
        title: "Durchfallgründe",
        subtitle: "Verteilung der Durchfallgründe",
      },
      multipleFailures: {
        title: "Schüler in Schwierigkeiten",
        subtitle: "Schüler mit mehrfachen Durchfällen (≥2)",
        alert: "Schüler benötigen dringende Intervention",
        table: {
          student: "Schüler",
          category: "Kategorie",
          attempts: "Versuche",
          lastExam: "Letzte Prüfung",
          instructor: "Fahrlehrer",
          progression: "Fortschritt",
          actions: "Aktionen",
        },
        actionButtons: {
          attestation: "Bescheinigung Art.23",
          targetedLessons: "Gezielte Lektionen",
          changeInstructor: "Fahrlehrer wechseln",
          support: "Psych. Unterstützung",
        },
      },
    },

    preparation: {
      title: "Vorbereitungsanalyse",
      distribution: {
        title: "Lektionenverteilung",
        subtitle: "Anzahl Lektionen vor Erfolg",
        xAxis: "Anzahl Lektionen",
        yAxis: "Anzahl Schüler",
        optimal: "Optimaler Bereich: 25-35 Lektionen",
      },
      averages: {
        title: "Durchschnitte nach Kategorie",
        category: "Kategorie",
        recommended: "Empfohlen",
        actual: "Tatsächlicher Durchschnitt",
        delta: "Abweichung",
        duration: "Dauer (Tage)",
        interpretation: "Interpretation",
      },
      correlation: {
        title: "Korrelation Fortschritt/Erfolg",
        subtitle: "Empfohlener Mindestfortschritt: 75%",
        threshold: "Empfohlener Schwellenwert",
      },
    },

    timing: {
      title: "Timing-Analyse",
      averageDelay: {
        title: "Durchschn. Verzögerung Anmeldung → Prüfung",
        days: "Tage",
        interpretation: "Interpretation",
      },
      byTiming: {
        title: "Erfolg nach Ausbildungsdauer",
        subtitle: "Erfolgsquote nach Dauer",
      },
      seasonality: {
        title: "Saisonalität",
        subtitle: "Erfolgsquote nach Monat und Kategorie",
        best: "Bester Monat",
        worst: "Schlechtester Monat",
      },
    },

    benchmarking: {
      title: "Vergleiche",
      vsNational: {
        title: "vs Schweizer Durchschnitt",
        our: "Unsere Quote",
        national: "Nationaler Durchschnitt",
        delta: "Abweichung",
        better: "Besser",
        worse: "Schlechter",
      },
      vsTargets: {
        title: "vs Ziele",
        target: "Ziel",
        current: "Aktuell",
        gap: "Abweichung",
        actions: "Erforderliche Aktionen",
      },
    },

    recommendations: {
      title: "Empfehlungen",
      subtitle: "Automatisch generierte Insights",
      priority: {
        high: "Hohe Priorität",
        medium: "Mittlere Priorität",
        low: "Niedrige Priorität",
      },
      impact: "Geschätzter Impact",
      actions: "Vorgeschlagene Aktionen",
      implement: "Umsetzen",
    },

    examTypes: {
      theory: "Theoretisch",
      practical: "Praktisch",
    },

    failureReasons: {
      maneuvers: "Manöver",
      priorities: "Vortritt",
      parking: "Parkieren",
      stress: "Stress",
      speed: "Geschwindigkeit",
      observation: "Beobachtung",
      other: "Andere",
    },

    common: {
      export: "Exportieren",
      filter: "Filtern",
      reset: "Zurücksetzen",
      viewDetails: "Details anzeigen",
      noData: "Keine Daten verfügbar",
    },
  },

  it: {
    title: "Analytics Esami",
    subtitle:
      "Analisi dettagliata dei risultati degli esami e tassi di successo",

    stats: {
      totalExams: "Esami sostenuti",
      successRate: "Tasso di successo",
      failures: "Bocciature",
      averageAttempts: "Tentativi medi",
      trend: "vs periodo precedente",
    },

    tabs: {
      successRates: "Tassi di Successo",
      byInstructor: "Per Istruttore",
      failures: "Analisi Bocciature",
      preparation: "Preparazione",
      timing: "Tempistiche",
      benchmarking: "Confronti",
      recommendations: "Raccomandazioni",
    },

    successRates: {
      title: "Tassi di Successo",
      filters: {
        dateRange: "Periodo",
        category: "Categoria",
        examType: "Tipo di esame",
        allCategories: "Tutte le categorie",
        allTypes: "Tutti i tipi",
      },
      global: {
        title: "Tasso Globale",
        vsPrevious: "vs periodo precedente",
        vsNational: "vs media svizzera",
      },
      byCategory: {
        title: "Successo per Categoria",
        chart: "Tasso di successo per categoria e tipo",
      },
      details: {
        title: "Dettagli per Categoria",
        category: "Categoria",
        theory: "Esami Teorici",
        practical: "Esami Pratici",
        total: "Sostenuti",
        passed: "Superati",
        rate: "Tasso",
        avgAttempts: "Tentativi medi",
        avgLessons: "Lezioni medie",
        avgDays: "Durata media (giorni)",
      },
      evolution: {
        title: "Evoluzione dei Tassi",
        theory: "Teorico",
        practical: "Pratico",
      },
    },

    instructorPerf: {
      title: "Performance per Istruttore",
      table: {
        instructor: "Istruttore",
        presented: "Presentati",
        passed: "Superati",
        rate: "Tasso",
        avgAttempts: "Tentativi medi",
        avgLessons: "Lezioni medie",
      },
      scatter: {
        title: "Performance Istruttori",
        xAxis: "Lezioni medie",
        yAxis: "Tasso di successo (%)",
        efficient: "Efficiente",
        inefficient: "Da migliorare",
      },
      topInstructors: {
        title: "Top Istruttori",
        subtitle: "Migliori tassi di successo",
      },
    },

    failures: {
      title: "Analisi delle Bocciature",
      reasons: {
        title: "Motivi di Bocciatura",
        subtitle: "Distribuzione dei motivi di bocciatura",
      },
      multipleFailures: {
        title: "Allievi in Difficoltà",
        subtitle: "Allievi con bocciature multiple (≥2)",
        alert: "allievi necessitano intervento urgente",
        table: {
          student: "Allievo",
          category: "Categoria",
          attempts: "Tentativi",
          lastExam: "Ultimo esame",
          instructor: "Istruttore",
          progression: "Progressione",
          actions: "Azioni",
        },
        actionButtons: {
          attestation: "Attestato Art.23",
          targetedLessons: "Lezioni mirate",
          changeInstructor: "Cambiare istruttore",
          support: "Supporto psic.",
        },
      },
    },

    preparation: {
      title: "Analisi della Preparazione",
      distribution: {
        title: "Distribuzione delle Lezioni",
        subtitle: "Numero di lezioni prima del successo",
        xAxis: "Numero di lezioni",
        yAxis: "Numero di allievi",
        optimal: "Zona ottimale: 25-35 lezioni",
      },
      averages: {
        title: "Medie per Categoria",
        category: "Categoria",
        recommended: "Raccomandato",
        actual: "Media reale",
        delta: "Scarto",
        duration: "Durata (giorni)",
        interpretation: "Interpretazione",
      },
      correlation: {
        title: "Correlazione Progressione/Successo",
        subtitle: "Progressione minima raccomandata: 75%",
        threshold: "Soglia raccomandata",
      },
    },

    timing: {
      title: "Analisi delle Tempistiche",
      averageDelay: {
        title: "Ritardo Medio Iscrizione → Esame",
        days: "giorni",
        interpretation: "Interpretazione",
      },
      byTiming: {
        title: "Successo per Durata della Formazione",
        subtitle: "Tasso di successo secondo la durata",
      },
      seasonality: {
        title: "Stagionalità",
        subtitle: "Tasso di successo per mese e categoria",
        best: "Mese migliore",
        worst: "Mese peggiore",
      },
    },

    benchmarking: {
      title: "Confronti",
      vsNational: {
        title: "vs Media Svizzera",
        our: "Nostro tasso",
        national: "Media nazionale",
        delta: "Scarto",
        better: "Migliore",
        worse: "Inferiore",
      },
      vsTargets: {
        title: "vs Obiettivi",
        target: "Obiettivo",
        current: "Attuale",
        gap: "Scarto",
        actions: "Azioni richieste",
      },
    },

    recommendations: {
      title: "Raccomandazioni",
      subtitle: "Insights generati automaticamente",
      priority: {
        high: "Priorità alta",
        medium: "Priorità media",
        low: "Priorità bassa",
      },
      impact: "Impatto stimato",
      actions: "Azioni suggerite",
      implement: "Implementare",
    },

    examTypes: {
      theory: "Teorico",
      practical: "Pratico",
    },

    failureReasons: {
      maneuvers: "Manovre",
      priorities: "Priorità",
      parking: "Parcheggio",
      stress: "Stress",
      speed: "Velocità",
      observation: "Osservazione",
      other: "Altro",
    },

    common: {
      export: "Esportare",
      filter: "Filtrare",
      reset: "Ripristinare",
      viewDetails: "Vedi dettagli",
      noData: "Nessun dato disponibile",
    },
  },

  en: {
    title: "Exams Analytics",
    subtitle: "Detailed analysis of exam results and success rates",

    stats: {
      totalExams: "Exams taken",
      successRate: "Success rate",
      failures: "Failures",
      averageAttempts: "Average attempts",
      trend: "vs previous period",
    },

    tabs: {
      successRates: "Success Rates",
      byInstructor: "By Instructor",
      failures: "Failure Analysis",
      preparation: "Preparation",
      timing: "Timing",
      benchmarking: "Benchmarking",
      recommendations: "Recommendations",
    },

    successRates: {
      title: "Success Rates",
      filters: {
        dateRange: "Period",
        category: "Category",
        examType: "Exam type",
        allCategories: "All categories",
        allTypes: "All types",
      },
      global: {
        title: "Global Rate",
        vsPrevious: "vs previous period",
        vsNational: "vs Swiss average",
      },
      byCategory: {
        title: "Success by Category",
        chart: "Success rate by category and type",
      },
      details: {
        title: "Details by Category",
        category: "Category",
        theory: "Theory Exams",
        practical: "Practical Exams",
        total: "Taken",
        passed: "Passed",
        rate: "Rate",
        avgAttempts: "Avg. attempts",
        avgLessons: "Avg. lessons",
        avgDays: "Avg. duration (days)",
      },
      evolution: {
        title: "Rate Evolution",
        theory: "Theory",
        practical: "Practical",
      },
    },

    instructorPerf: {
      title: "Performance by Instructor",
      table: {
        instructor: "Instructor",
        presented: "Presented",
        passed: "Passed",
        rate: "Rate",
        avgAttempts: "Avg. attempts",
        avgLessons: "Avg. lessons",
      },
      scatter: {
        title: "Instructor Performance",
        xAxis: "Average lessons",
        yAxis: "Success rate (%)",
        efficient: "Efficient",
        inefficient: "To improve",
      },
      topInstructors: {
        title: "Top Instructors",
        subtitle: "Best success rates",
      },
    },

    failures: {
      title: "Failure Analysis",
      reasons: {
        title: "Failure Reasons",
        subtitle: "Distribution of failure reasons",
      },
      multipleFailures: {
        title: "Students in Difficulty",
        subtitle: "Students with multiple failures (≥2)",
        alert: "students require urgent intervention",
        table: {
          student: "Student",
          category: "Category",
          attempts: "Attempts",
          lastExam: "Last exam",
          instructor: "Instructor",
          progression: "Progression",
          actions: "Actions",
        },
        actionButtons: {
          attestation: "Certificate Art.23",
          targetedLessons: "Targeted lessons",
          changeInstructor: "Change instructor",
          support: "Psych. support",
        },
      },
    },

    preparation: {
      title: "Preparation Analysis",
      distribution: {
        title: "Lessons Distribution",
        subtitle: "Number of lessons before success",
        xAxis: "Number of lessons",
        yAxis: "Number of students",
        optimal: "Optimal range: 25-35 lessons",
      },
      averages: {
        title: "Averages by Category",
        category: "Category",
        recommended: "Recommended",
        actual: "Actual average",
        delta: "Delta",
        duration: "Duration (days)",
        interpretation: "Interpretation",
      },
      correlation: {
        title: "Progression/Success Correlation",
        subtitle: "Recommended minimum progression: 75%",
        threshold: "Recommended threshold",
      },
    },

    timing: {
      title: "Timing Analysis",
      averageDelay: {
        title: "Average Delay Registration → Exam",
        days: "days",
        interpretation: "Interpretation",
      },
      byTiming: {
        title: "Success by Training Duration",
        subtitle: "Success rate by duration",
      },
      seasonality: {
        title: "Seasonality",
        subtitle: "Success rate by month and category",
        best: "Best month",
        worst: "Worst month",
      },
    },

    benchmarking: {
      title: "Benchmarking",
      vsNational: {
        title: "vs Swiss Average",
        our: "Our rate",
        national: "National average",
        delta: "Delta",
        better: "Better",
        worse: "Worse",
      },
      vsTargets: {
        title: "vs Targets",
        target: "Target",
        current: "Current",
        gap: "Gap",
        actions: "Required actions",
      },
    },

    recommendations: {
      title: "Recommendations",
      subtitle: "Automatically generated insights",
      priority: {
        high: "High priority",
        medium: "Medium priority",
        low: "Low priority",
      },
      impact: "Estimated impact",
      actions: "Suggested actions",
      implement: "Implement",
    },

    examTypes: {
      theory: "Theory",
      practical: "Practical",
    },

    failureReasons: {
      maneuvers: "Maneuvers",
      priorities: "Priorities",
      parking: "Parking",
      stress: "Stress",
      speed: "Speed",
      observation: "Observation",
      other: "Other",
    },

    common: {
      export: "Export",
      filter: "Filter",
      reset: "Reset",
      viewDetails: "View details",
      noData: "No data available",
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getExamsTranslations(
  locale: ExamsLocale = "fr"
): ExamsTranslations {
  return examsTranslations[locale] || examsTranslations.fr;
}

export function getExamTypeLabel(
  type: ExamType,
  locale: ExamsLocale = "fr"
): string {
  const t = getExamsTranslations(locale);
  return t.examTypes[type];
}

export function getFailureReasonLabel(
  reason: FailureReason,
  locale: ExamsLocale = "fr"
): string {
  const t = getExamsTranslations(locale);
  return t.failureReasons[reason];
}
