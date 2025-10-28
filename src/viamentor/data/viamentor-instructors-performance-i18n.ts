/**
 * VIAMENTOR - Instructors Performance Analytics i18n
 * Traductions pour analytics performance moniteurs
 */

export type PerformanceLocale = "fr" | "de" | "it" | "en";

export interface PerformanceTranslations {
  header: {
    title: string;
    totalInstructors: string;
    totalLessons: string;
    totalHours: string;
    averageRating: string;
  };
  ranking: {
    title: string;
    position: string;
    instructor: string;
    categories: string;
    lessons: string;
    hours: string;
    students: string;
    rating: string;
    examSuccess: string;
    attendance: string;
    revenue: string;
    actions: string;
    viewDetail: string;
    viewPlanning: string;
    filters: {
      category: string;
      ratingRange: string;
      lessonsRange: string;
    };
    export: string;
  };
  detail: {
    title: string;
    selectInstructor: string;
    kpis: {
      lessons: string;
      hours: string;
      students: string;
      rating: string;
      examSuccess: string;
      occupation: string;
    };
    activity: {
      title: string;
      lessonsPerDay: string;
      hoursByCategory: string;
    };
    assignedStudents: {
      title: string;
      student: string;
      category: string;
      lessonsCompleted: string;
      progression: string;
      ratingGiven: string;
    };
    reviews: {
      title: string;
      noReviews: string;
      reply: string;
    };
  };
  workload: {
    title: string;
    filters: {
      dateRange: string;
      selectInstructors: string;
      compare: string;
    };
    chart: {
      title: string;
      hoursTeaching: string;
      optimalRange: string;
    };
    table: {
      instructor: string;
      weeklyHours: string;
      lessons: string;
      daysWorked: string;
      hoursPerDay: string;
      availabilityRemaining: string;
      status: string;
      actions: string;
    };
    status: {
      underutilized: string;
      optimal: string;
      overloaded: string;
    };
    alerts: {
      warning: string;
      danger: string;
    };
    actions: {
      adjustAvailability: string;
      reassignStudents: string;
    };
  };
  expertise: {
    title: string;
    table: {
      instructor: string;
      lessons: string;
      hours: string;
      examSuccess: string;
      rating: string;
    };
    radar: {
      title: string;
      selectInstructor: string;
    };
  };
  satisfaction: {
    title: string;
    topRated: {
      title: string;
      reviews: string;
    };
    needsImprovement: {
      title: string;
      issues: string;
      actions: {
        training: string;
        feedback: string;
        reassign: string;
      };
    };
    distribution: {
      title: string;
    };
  };
  availability: {
    title: string;
    underutilized: {
      title: string;
      bookingRate: string;
    };
    conflicts: {
      title: string;
      count: string;
      lastConflict: string;
      suggestFix: string;
    };
  };
  evolution: {
    title: string;
    selectInstructor: string;
    chart: {
      lessons: string;
      rating: string;
      examSuccess: string;
    };
    events: {
      training: string;
      vacation: string;
      scheduleChange: string;
    };
  };
  common: {
    export: string;
    filters: string;
    reset: string;
    apply: string;
    loading: string;
    noData: string;
    trend: {
      up: string;
      down: string;
      stable: string;
    };
  };
}

export const performanceTranslations: Record<
  PerformanceLocale,
  PerformanceTranslations
> = {
  fr: {
    header: {
      title: "Analytics Performance Moniteurs",
      totalInstructors: "Total Moniteurs",
      totalLessons: "Leçons Totales",
      totalHours: "Heures Enseignement",
      averageRating: "Note Moyenne",
    },
    ranking: {
      title: "Classement Performance",
      position: "Position",
      instructor: "Moniteur",
      categories: "Habilitations",
      lessons: "Leçons",
      hours: "Heures",
      students: "Élèves",
      rating: "Note",
      examSuccess: "Taux Réussite",
      attendance: "Taux Présence",
      revenue: "Revenu Généré",
      actions: "Actions",
      viewDetail: "Voir Détail",
      viewPlanning: "Planning",
      filters: {
        category: "Catégorie",
        ratingRange: "Plage de Notes",
        lessonsRange: "Nombre de Leçons",
      },
      export: "Exporter Classement",
    },
    detail: {
      title: "Détail Moniteur",
      selectInstructor: "Sélectionner un moniteur",
      kpis: {
        lessons: "Leçons",
        hours: "Heures",
        students: "Élèves",
        rating: "Note",
        examSuccess: "Taux Réussite",
        occupation: "Taux Occupation",
      },
      activity: {
        title: "Activité",
        lessonsPerDay: "Leçons par Jour",
        hoursByCategory: "Heures par Catégorie",
      },
      assignedStudents: {
        title: "Élèves Assignés",
        student: "Élève",
        category: "Catégorie",
        lessonsCompleted: "Leçons Effectuées",
        progression: "Progression",
        ratingGiven: "Note Donnée",
      },
      reviews: {
        title: "Avis Élèves",
        noReviews: "Aucun avis récent",
        reply: "Réponse",
      },
    },
    workload: {
      title: "Charge de Travail",
      filters: {
        dateRange: "Période",
        selectInstructors: "Sélectionner Moniteurs",
        compare: "Comparer",
      },
      chart: {
        title: "Comparaison Heures Enseignées",
        hoursTeaching: "Heures d'Enseignement",
        optimalRange: "Plage Optimale (35-40h)",
      },
      table: {
        instructor: "Moniteur",
        weeklyHours: "Heures/Semaine",
        lessons: "Leçons",
        daysWorked: "Jours Travaillés",
        hoursPerDay: "Heures/Jour",
        availabilityRemaining: "Disponibilité Restante",
        status: "Statut Charge",
        actions: "Actions",
      },
      status: {
        underutilized: "Sous-utilisé",
        optimal: "Optimal",
        overloaded: "Surchargé",
      },
      alerts: {
        warning: "Attention: Charge élevée (>45h)",
        danger: "Alerte: Surcharge critique (>50h)",
      },
      actions: {
        adjustAvailability: "Ajuster Disponibilités",
        reassignStudents: "Réassigner Élèves",
      },
    },
    expertise: {
      title: "Expertise par Catégories",
      table: {
        instructor: "Moniteur",
        lessons: "Leçons",
        hours: "Heures",
        examSuccess: "Taux Réussite",
        rating: "Note",
      },
      radar: {
        title: "Profil d'Expertise",
        selectInstructor: "Sélectionner un moniteur",
      },
    },
    satisfaction: {
      title: "Satisfaction Élèves",
      topRated: {
        title: "Meilleurs Moniteurs",
        reviews: "avis",
      },
      needsImprovement: {
        title: "Amélioration Nécessaire",
        issues: "Problèmes Récurrents",
        actions: {
          training: "Formation Perfectionnement",
          feedback: "Session Feedback",
          reassign: "Réassigner Élèves",
        },
      },
      distribution: {
        title: "Distribution des Notes",
      },
    },
    availability: {
      title: "Optimisation Disponibilités",
      underutilized: {
        title: "Créneaux Sous-utilisés",
        bookingRate: "Taux de Réservation",
      },
      conflicts: {
        title: "Conflits Récurrents",
        count: "Nombre de Conflits",
        lastConflict: "Dernier Conflit",
        suggestFix: "Ajuster les disponibilités",
      },
    },
    evolution: {
      title: "Évolution Performance",
      selectInstructor: "Sélectionner un moniteur",
      chart: {
        lessons: "Leçons/Mois",
        rating: "Note Moyenne",
        examSuccess: "Taux Réussite",
      },
      events: {
        training: "Formation",
        vacation: "Congés",
        scheduleChange: "Changement Horaires",
      },
    },
    common: {
      export: "Exporter",
      filters: "Filtres",
      reset: "Réinitialiser",
      apply: "Appliquer",
      loading: "Chargement...",
      noData: "Aucune donnée disponible",
      trend: {
        up: "En hausse",
        down: "En baisse",
        stable: "Stable",
      },
    },
  },
  de: {
    header: {
      title: "Fahrlehrer Performance Analytics",
      totalInstructors: "Total Fahrlehrer",
      totalLessons: "Total Lektionen",
      totalHours: "Unterrichtsstunden",
      averageRating: "Durchschnittsnote",
    },
    ranking: {
      title: "Rangliste",
      position: "Position",
      instructor: "Fahrlehrer",
      categories: "Kategorien",
      lessons: "Lektionen",
      hours: "Stunden",
      students: "Schüler",
      rating: "Note",
      examSuccess: "Erfolgsquote",
      attendance: "Anwesenheitsquote",
      revenue: "Umsatz",
      actions: "Aktionen",
      viewDetail: "Details",
      viewPlanning: "Planung",
      filters: {
        category: "Kategorie",
        ratingRange: "Notenbereich",
        lessonsRange: "Lektionenanzahl",
      },
      export: "Rangliste Exportieren",
    },
    detail: {
      title: "Fahrlehrer Details",
      selectInstructor: "Fahrlehrer auswählen",
      kpis: {
        lessons: "Lektionen",
        hours: "Stunden",
        students: "Schüler",
        rating: "Note",
        examSuccess: "Erfolgsquote",
        occupation: "Auslastung",
      },
      activity: {
        title: "Aktivität",
        lessonsPerDay: "Lektionen pro Tag",
        hoursByCategory: "Stunden nach Kategorie",
      },
      assignedStudents: {
        title: "Zugewiesene Schüler",
        student: "Schüler",
        category: "Kategorie",
        lessonsCompleted: "Abgeschlossene Lektionen",
        progression: "Fortschritt",
        ratingGiven: "Bewertung",
      },
      reviews: {
        title: "Schülerbewertungen",
        noReviews: "Keine aktuellen Bewertungen",
        reply: "Antwort",
      },
    },
    workload: {
      title: "Auslastung",
      filters: {
        dateRange: "Zeitraum",
        selectInstructors: "Fahrlehrer Auswählen",
        compare: "Vergleichen",
      },
      chart: {
        title: "Unterrichtsstunden Vergleich",
        hoursTeaching: "Unterrichtsstunden",
        optimalRange: "Optimaler Bereich (35-40h)",
      },
      table: {
        instructor: "Fahrlehrer",
        weeklyHours: "Stunden/Woche",
        lessons: "Lektionen",
        daysWorked: "Arbeitstage",
        hoursPerDay: "Stunden/Tag",
        availabilityRemaining: "Verfügbarkeit",
        status: "Status",
        actions: "Aktionen",
      },
      status: {
        underutilized: "Unterausgelastet",
        optimal: "Optimal",
        overloaded: "Überlastet",
      },
      alerts: {
        warning: "Achtung: Hohe Auslastung (>45h)",
        danger: "Alarm: Kritische Überlastung (>50h)",
      },
      actions: {
        adjustAvailability: "Verfügbarkeit Anpassen",
        reassignStudents: "Schüler Neu Zuweisen",
      },
    },
    expertise: {
      title: "Expertise nach Kategorien",
      table: {
        instructor: "Fahrlehrer",
        lessons: "Lektionen",
        hours: "Stunden",
        examSuccess: "Erfolgsquote",
        rating: "Note",
      },
      radar: {
        title: "Expertise-Profil",
        selectInstructor: "Fahrlehrer auswählen",
      },
    },
    satisfaction: {
      title: "Schülerzufriedenheit",
      topRated: {
        title: "Beste Fahrlehrer",
        reviews: "Bewertungen",
      },
      needsImprovement: {
        title: "Verbesserungsbedarf",
        issues: "Wiederkehrende Probleme",
        actions: {
          training: "Weiterbildung",
          feedback: "Feedback-Sitzung",
          reassign: "Schüler Neu Zuweisen",
        },
      },
      distribution: {
        title: "Notenverteilung",
      },
    },
    availability: {
      title: "Verfügbarkeitsoptimierung",
      underutilized: {
        title: "Unterausgelastete Zeitfenster",
        bookingRate: "Buchungsrate",
      },
      conflicts: {
        title: "Wiederkehrende Konflikte",
        count: "Anzahl Konflikte",
        lastConflict: "Letzter Konflikt",
        suggestFix: "Verfügbarkeit anpassen",
      },
    },
    evolution: {
      title: "Performance-Entwicklung",
      selectInstructor: "Fahrlehrer auswählen",
      chart: {
        lessons: "Lektionen/Monat",
        rating: "Durchschnittsnote",
        examSuccess: "Erfolgsquote",
      },
      events: {
        training: "Weiterbildung",
        vacation: "Urlaub",
        scheduleChange: "Zeitplanänderung",
      },
    },
    common: {
      export: "Exportieren",
      filters: "Filter",
      reset: "Zurücksetzen",
      apply: "Anwenden",
      loading: "Laden...",
      noData: "Keine Daten verfügbar",
      trend: {
        up: "Steigend",
        down: "Fallend",
        stable: "Stabil",
      },
    },
  },
  it: {
    header: {
      title: "Analytics Performance Istruttori",
      totalInstructors: "Totale Istruttori",
      totalLessons: "Lezioni Totali",
      totalHours: "Ore Insegnamento",
      averageRating: "Valutazione Media",
    },
    ranking: {
      title: "Classifica",
      position: "Posizione",
      instructor: "Istruttore",
      categories: "Categorie",
      lessons: "Lezioni",
      hours: "Ore",
      students: "Allievi",
      rating: "Valutazione",
      examSuccess: "Tasso Successo",
      attendance: "Tasso Presenza",
      revenue: "Ricavi",
      actions: "Azioni",
      viewDetail: "Dettagli",
      viewPlanning: "Pianificazione",
      filters: {
        category: "Categoria",
        ratingRange: "Intervallo Valutazioni",
        lessonsRange: "Numero Lezioni",
      },
      export: "Esporta Classifica",
    },
    detail: {
      title: "Dettaglio Istruttore",
      selectInstructor: "Seleziona istruttore",
      kpis: {
        lessons: "Lezioni",
        hours: "Ore",
        students: "Allievi",
        rating: "Valutazione",
        examSuccess: "Tasso Successo",
        occupation: "Tasso Occupazione",
      },
      activity: {
        title: "Attività",
        lessonsPerDay: "Lezioni al Giorno",
        hoursByCategory: "Ore per Categoria",
      },
      assignedStudents: {
        title: "Allievi Assegnati",
        student: "Allievo",
        category: "Categoria",
        lessonsCompleted: "Lezioni Completate",
        progression: "Progressione",
        ratingGiven: "Valutazione Data",
      },
      reviews: {
        title: "Recensioni Allievi",
        noReviews: "Nessuna recensione recente",
        reply: "Risposta",
      },
    },
    workload: {
      title: "Carico di Lavoro",
      filters: {
        dateRange: "Periodo",
        selectInstructors: "Seleziona Istruttori",
        compare: "Confronta",
      },
      chart: {
        title: "Confronto Ore Insegnamento",
        hoursTeaching: "Ore di Insegnamento",
        optimalRange: "Range Ottimale (35-40h)",
      },
      table: {
        instructor: "Istruttore",
        weeklyHours: "Ore/Settimana",
        lessons: "Lezioni",
        daysWorked: "Giorni Lavorati",
        hoursPerDay: "Ore/Giorno",
        availabilityRemaining: "Disponibilità Rimanente",
        status: "Stato Carico",
        actions: "Azioni",
      },
      status: {
        underutilized: "Sottoutilizzato",
        optimal: "Ottimale",
        overloaded: "Sovraccarico",
      },
      alerts: {
        warning: "Attenzione: Carico elevato (>45h)",
        danger: "Allarme: Sovraccarico critico (>50h)",
      },
      actions: {
        adjustAvailability: "Regola Disponibilità",
        reassignStudents: "Riassegna Allievi",
      },
    },
    expertise: {
      title: "Expertise per Categorie",
      table: {
        instructor: "Istruttore",
        lessons: "Lezioni",
        hours: "Ore",
        examSuccess: "Tasso Successo",
        rating: "Valutazione",
      },
      radar: {
        title: "Profilo Expertise",
        selectInstructor: "Seleziona istruttore",
      },
    },
    satisfaction: {
      title: "Soddisfazione Allievi",
      topRated: {
        title: "Migliori Istruttori",
        reviews: "recensioni",
      },
      needsImprovement: {
        title: "Miglioramento Necessario",
        issues: "Problemi Ricorrenti",
        actions: {
          training: "Formazione Perfezionamento",
          feedback: "Sessione Feedback",
          reassign: "Riassegna Allievi",
        },
      },
      distribution: {
        title: "Distribuzione Valutazioni",
      },
    },
    availability: {
      title: "Ottimizzazione Disponibilità",
      underutilized: {
        title: "Fasce Sottoutilizzate",
        bookingRate: "Tasso Prenotazione",
      },
      conflicts: {
        title: "Conflitti Ricorrenti",
        count: "Numero Conflitti",
        lastConflict: "Ultimo Conflitto",
        suggestFix: "Regola disponibilità",
      },
    },
    evolution: {
      title: "Evoluzione Performance",
      selectInstructor: "Seleziona istruttore",
      chart: {
        lessons: "Lezioni/Mese",
        rating: "Valutazione Media",
        examSuccess: "Tasso Successo",
      },
      events: {
        training: "Formazione",
        vacation: "Ferie",
        scheduleChange: "Cambio Orari",
      },
    },
    common: {
      export: "Esporta",
      filters: "Filtri",
      reset: "Reimposta",
      apply: "Applica",
      loading: "Caricamento...",
      noData: "Nessun dato disponibile",
      trend: {
        up: "In aumento",
        down: "In diminuzione",
        stable: "Stabile",
      },
    },
  },
  en: {
    header: {
      title: "Instructors Performance Analytics",
      totalInstructors: "Total Instructors",
      totalLessons: "Total Lessons",
      totalHours: "Teaching Hours",
      averageRating: "Average Rating",
    },
    ranking: {
      title: "Performance Ranking",
      position: "Position",
      instructor: "Instructor",
      categories: "Categories",
      lessons: "Lessons",
      hours: "Hours",
      students: "Students",
      rating: "Rating",
      examSuccess: "Exam Success Rate",
      attendance: "Attendance Rate",
      revenue: "Revenue Generated",
      actions: "Actions",
      viewDetail: "View Detail",
      viewPlanning: "Planning",
      filters: {
        category: "Category",
        ratingRange: "Rating Range",
        lessonsRange: "Lessons Range",
      },
      export: "Export Ranking",
    },
    detail: {
      title: "Instructor Detail",
      selectInstructor: "Select instructor",
      kpis: {
        lessons: "Lessons",
        hours: "Hours",
        students: "Students",
        rating: "Rating",
        examSuccess: "Exam Success",
        occupation: "Occupation Rate",
      },
      activity: {
        title: "Activity",
        lessonsPerDay: "Lessons per Day",
        hoursByCategory: "Hours by Category",
      },
      assignedStudents: {
        title: "Assigned Students",
        student: "Student",
        category: "Category",
        lessonsCompleted: "Lessons Completed",
        progression: "Progression",
        ratingGiven: "Rating Given",
      },
      reviews: {
        title: "Student Reviews",
        noReviews: "No recent reviews",
        reply: "Reply",
      },
    },
    workload: {
      title: "Workload Analysis",
      filters: {
        dateRange: "Date Range",
        selectInstructors: "Select Instructors",
        compare: "Compare",
      },
      chart: {
        title: "Teaching Hours Comparison",
        hoursTeaching: "Teaching Hours",
        optimalRange: "Optimal Range (35-40h)",
      },
      table: {
        instructor: "Instructor",
        weeklyHours: "Weekly Hours",
        lessons: "Lessons",
        daysWorked: "Days Worked",
        hoursPerDay: "Hours/Day",
        availabilityRemaining: "Availability Remaining",
        status: "Workload Status",
        actions: "Actions",
      },
      status: {
        underutilized: "Underutilized",
        optimal: "Optimal",
        overloaded: "Overloaded",
      },
      alerts: {
        warning: "Warning: High workload (>45h)",
        danger: "Alert: Critical overload (>50h)",
      },
      actions: {
        adjustAvailability: "Adjust Availability",
        reassignStudents: "Reassign Students",
      },
    },
    expertise: {
      title: "Expertise by Categories",
      table: {
        instructor: "Instructor",
        lessons: "Lessons",
        hours: "Hours",
        examSuccess: "Exam Success",
        rating: "Rating",
      },
      radar: {
        title: "Expertise Profile",
        selectInstructor: "Select instructor",
      },
    },
    satisfaction: {
      title: "Student Satisfaction",
      topRated: {
        title: "Top Rated Instructors",
        reviews: "reviews",
      },
      needsImprovement: {
        title: "Needs Improvement",
        issues: "Recurring Issues",
        actions: {
          training: "Advanced Training",
          feedback: "Feedback Session",
          reassign: "Reassign Students",
        },
      },
      distribution: {
        title: "Rating Distribution",
      },
    },
    availability: {
      title: "Availability Optimization",
      underutilized: {
        title: "Underutilized Slots",
        bookingRate: "Booking Rate",
      },
      conflicts: {
        title: "Recurring Conflicts",
        count: "Conflicts Count",
        lastConflict: "Last Conflict",
        suggestFix: "Adjust availability",
      },
    },
    evolution: {
      title: "Performance Evolution",
      selectInstructor: "Select instructor",
      chart: {
        lessons: "Lessons/Month",
        rating: "Average Rating",
        examSuccess: "Exam Success Rate",
      },
      events: {
        training: "Training",
        vacation: "Vacation",
        scheduleChange: "Schedule Change",
      },
    },
    common: {
      export: "Export",
      filters: "Filters",
      reset: "Reset",
      apply: "Apply",
      loading: "Loading...",
      noData: "No data available",
      trend: {
        up: "Increasing",
        down: "Decreasing",
        stable: "Stable",
      },
    },
  },
};
