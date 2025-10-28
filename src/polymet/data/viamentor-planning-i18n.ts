/**
 * Traductions i18n pour page Planning Viamentor
 * Support FR/DE/IT/EN avec terminologie auto-école
 */

export type PlanningLocale = "fr" | "de" | "it" | "en";

export const planningTranslations = {
  fr: {
    title: "Planning",
    subtitle: "Gestion du planning des cours et leçons",

    // Views
    views: {
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      agenda: "Agenda",
    },

    // Filters
    filters: {
      title: "Filtres",
      all: "Tous les événements",
      theoryCourses: "Cours théoriques",
      practicalLessons: "Leçons pratiques",
      exams: "Examens",
      maintenance: "Maintenance",
      instructor: "Moniteur",
      vehicle: "Véhicule",
      category: "Catégorie",
      status: "Statut",
      reset: "Réinitialiser",
      apply: "Appliquer",
    },

    // Actions
    actions: {
      newTheoryCourse: "Nouveau cours théorique",
      newPracticalLesson: "Nouvelle leçon pratique",
      newExam: "Nouvel examen",
      export: "Exporter Excel",
      exportPdf: "Exporter PDF",
      print: "Imprimer",
      refresh: "Actualiser",
      dragAndDrop: "Glisser-déposer pour déplacer",
    },

    // Stats
    stats: {
      totalEvents: "Événements totaux",
      theoryCourses: "Cours théoriques",
      practicalLessons: "Leçons pratiques",
      exams: "Examens",
      today: "Aujourd'hui",
      thisWeek: "Cette semaine",
      thisMonth: "Ce mois",
    },

    // Calendar
    calendar: {
      today: "Aujourd'hui",
      previous: "Précédent",
      next: "Suivant",
      noEvents: "Aucun événement",
      loading: "Chargement...",
    },

    // Event types
    eventTypes: {
      theoryCourse: "Cours théorique",
      practicalLesson: "Leçon pratique",
      exam: "Examen",
      maintenance: "Maintenance",
    },

    // Export
    export: {
      title: "Exporter le planning",
      format: "Format",
      period: "Période",
      includeFilters: "Inclure les filtres actifs",
      success: "Export réussi",
      error: "Erreur lors de l'export",
    },

    // Drag & Drop
    dragDrop: {
      moving: "Déplacement en cours...",
      success: "Événement déplacé avec succès",
      error: "Impossible de déplacer l'événement",
      conflict: "Conflit d'horaire détecté",
    },
  },

  de: {
    title: "Planung",
    subtitle: "Verwaltung der Kurs- und Lektionsplanung",

    views: {
      month: "Monat",
      week: "Woche",
      day: "Tag",
      agenda: "Agenda",
    },

    filters: {
      title: "Filter",
      all: "Alle Ereignisse",
      theoryCourses: "Theoriekurse",
      practicalLessons: "Fahrstunden",
      exams: "Prüfungen",
      maintenance: "Wartung",
      instructor: "Fahrlehrer",
      vehicle: "Fahrzeug",
      category: "Kategorie",
      status: "Status",
      reset: "Zurücksetzen",
      apply: "Anwenden",
    },

    actions: {
      newTheoryCourse: "Neuer Theoriekurs",
      newPracticalLesson: "Neue Fahrstunde",
      newExam: "Neue Prüfung",
      export: "Excel exportieren",
      exportPdf: "PDF exportieren",
      print: "Drucken",
      refresh: "Aktualisieren",
      dragAndDrop: "Ziehen und Ablegen zum Verschieben",
    },

    stats: {
      totalEvents: "Ereignisse gesamt",
      theoryCourses: "Theoriekurse",
      practicalLessons: "Fahrstunden",
      exams: "Prüfungen",
      today: "Heute",
      thisWeek: "Diese Woche",
      thisMonth: "Dieser Monat",
    },

    calendar: {
      today: "Heute",
      previous: "Zurück",
      next: "Weiter",
      noEvents: "Keine Ereignisse",
      loading: "Laden...",
    },

    eventTypes: {
      theoryCourse: "Theoriekurs",
      practicalLesson: "Fahrstunde",
      exam: "Prüfung",
      maintenance: "Wartung",
    },

    export: {
      title: "Planung exportieren",
      format: "Format",
      period: "Zeitraum",
      includeFilters: "Aktive Filter einbeziehen",
      success: "Export erfolgreich",
      error: "Fehler beim Export",
    },

    dragDrop: {
      moving: "Verschieben...",
      success: "Ereignis erfolgreich verschoben",
      error: "Ereignis kann nicht verschoben werden",
      conflict: "Zeitkonflikt erkannt",
    },
  },

  it: {
    title: "Pianificazione",
    subtitle: "Gestione della pianificazione dei corsi e delle lezioni",

    views: {
      month: "Mese",
      week: "Settimana",
      day: "Giorno",
      agenda: "Agenda",
    },

    filters: {
      title: "Filtri",
      all: "Tutti gli eventi",
      theoryCourses: "Corsi teorici",
      practicalLessons: "Lezioni pratiche",
      exams: "Esami",
      maintenance: "Manutenzione",
      instructor: "Istruttore",
      vehicle: "Veicolo",
      category: "Categoria",
      status: "Stato",
      reset: "Ripristina",
      apply: "Applica",
    },

    actions: {
      newTheoryCourse: "Nuovo corso teorico",
      newPracticalLesson: "Nuova lezione pratica",
      newExam: "Nuovo esame",
      export: "Esporta Excel",
      exportPdf: "Esporta PDF",
      print: "Stampa",
      refresh: "Aggiorna",
      dragAndDrop: "Trascina e rilascia per spostare",
    },

    stats: {
      totalEvents: "Eventi totali",
      theoryCourses: "Corsi teorici",
      practicalLessons: "Lezioni pratiche",
      exams: "Esami",
      today: "Oggi",
      thisWeek: "Questa settimana",
      thisMonth: "Questo mese",
    },

    calendar: {
      today: "Oggi",
      previous: "Precedente",
      next: "Successivo",
      noEvents: "Nessun evento",
      loading: "Caricamento...",
    },

    eventTypes: {
      theoryCourse: "Corso teorico",
      practicalLesson: "Lezione pratica",
      exam: "Esame",
      maintenance: "Manutenzione",
    },

    export: {
      title: "Esporta pianificazione",
      format: "Formato",
      period: "Periodo",
      includeFilters: "Includi filtri attivi",
      success: "Esportazione riuscita",
      error: "Errore durante l'esportazione",
    },

    dragDrop: {
      moving: "Spostamento in corso...",
      success: "Evento spostato con successo",
      error: "Impossibile spostare l'evento",
      conflict: "Conflitto di orario rilevato",
    },
  },

  en: {
    title: "Planning",
    subtitle: "Course and lesson planning management",

    views: {
      month: "Month",
      week: "Week",
      day: "Day",
      agenda: "Agenda",
    },

    filters: {
      title: "Filters",
      all: "All events",
      theoryCourses: "Theory courses",
      practicalLessons: "Practical lessons",
      exams: "Exams",
      maintenance: "Maintenance",
      instructor: "Instructor",
      vehicle: "Vehicle",
      category: "Category",
      status: "Status",
      reset: "Reset",
      apply: "Apply",
    },

    actions: {
      newTheoryCourse: "New theory course",
      newPracticalLesson: "New practical lesson",
      newExam: "New exam",
      export: "Export Excel",
      exportPdf: "Export PDF",
      print: "Print",
      refresh: "Refresh",
      dragAndDrop: "Drag and drop to move",
    },

    stats: {
      totalEvents: "Total events",
      theoryCourses: "Theory courses",
      practicalLessons: "Practical lessons",
      exams: "Exams",
      today: "Today",
      thisWeek: "This week",
      thisMonth: "This month",
    },

    calendar: {
      today: "Today",
      previous: "Previous",
      next: "Next",
      noEvents: "No events",
      loading: "Loading...",
    },

    eventTypes: {
      theoryCourse: "Theory course",
      practicalLesson: "Practical lesson",
      exam: "Exam",
      maintenance: "Maintenance",
    },

    export: {
      title: "Export planning",
      format: "Format",
      period: "Period",
      includeFilters: "Include active filters",
      success: "Export successful",
      error: "Export error",
    },

    dragDrop: {
      moving: "Moving...",
      success: "Event moved successfully",
      error: "Cannot move event",
      conflict: "Schedule conflict detected",
    },
  },
} as const;
