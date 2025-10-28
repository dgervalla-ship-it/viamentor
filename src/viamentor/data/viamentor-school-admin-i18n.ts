/**
 * VIAMENTOR - School Admin i18n
 * Traductions FR/DE/IT/EN pour dashboard School Admin
 *
 * FEATURES:
 * - Terminologie auto-école complète
 * - Stats et métriques
 * - Actions et événements
 * - Alertes et notifications
 */

export type SchoolAdminLocale = "fr" | "de" | "it" | "en";

export interface SchoolAdminTranslations {
  // Page Title
  pageTitle: string;
  pageDescription: string;

  // Sections
  sections: {
    overview: string;
    stats: string;
    quickActions: string;
    recentActivity: string;
    upcomingEvents: string;
    performance: string;
    alerts: string;
  };

  // Stats Cards
  stats: {
    students: {
      title: string;
      total: string;
      active: string;
      inactive: string;
      newThisMonth: string;
    };
    instructors: {
      title: string;
      total: string;
      active: string;
      onLeave: string;
      avgRating: string;
    };
    vehicles: {
      title: string;
      total: string;
      available: string;
      inMaintenance: string;
      avgUtilization: string;
    };
    lessons: {
      title: string;
      totalThisMonth: string;
      completed: string;
      cancelled: string;
      upcoming: string;
    };
    revenue: {
      title: string;
      thisMonth: string;
      lastMonth: string;
      pending: string;
      overdue: string;
    };
    exams: {
      title: string;
      scheduled: string;
      passRate: string;
      avgAttempts: string;
    };
  };

  // Activity Types
  activityTypes: {
    student_registered: string;
    lesson_completed: string;
    exam_passed: string;
    payment_received: string;
    vehicle_maintenance: string;
    instructor_added: string;
  };

  // Event Types
  eventTypes: {
    lesson: string;
    exam: string;
    theory_course: string;
    maintenance: string;
    meeting: string;
  };

  // Event Status
  eventStatus: {
    scheduled: string;
    confirmed: string;
    pending: string;
  };

  // Performance Metrics
  performanceMetrics: {
    studentSatisfaction: string;
    lessonCompletion: string;
    examPassRate: string;
    revenuePerStudent: string;
    vehicleUtilization: string;
    instructorEfficiency: string;
  };

  // Alert Types
  alertTypes: {
    info: string;
    warning: string;
    error: string;
    success: string;
  };

  // Alert Priority
  alertPriority: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };

  // Actions
  actions: {
    viewAll: string;
    viewDetails: string;
    refresh: string;
    export: string;
    filter: string;
    dismiss: string;
    markAsRead: string;
    configure: string;
  };

  // Quick Actions
  quickActions: {
    addStudent: string;
    scheduleLesson: string;
    createInvoice: string;
    scheduleExam: string;
    addInstructor: string;
    addVehicle: string;
    viewReports: string;
    settings: string;
  };

  // Trends
  trends: {
    up: string;
    down: string;
    stable: string;
    vsLastMonth: string;
  };

  // Status
  status: {
    excellent: string;
    good: string;
    warning: string;
    critical: string;
  };

  // Common
  common: {
    loading: string;
    noData: string;
    error: string;
    today: string;
    thisWeek: string;
    thisMonth: string;
    target: string;
    actual: string;
  };
}

export const schoolAdminTranslations: Record<
  SchoolAdminLocale,
  SchoolAdminTranslations
> = {
  fr: {
    pageTitle: "Dashboard École",
    pageDescription: "Vue d'ensemble de votre auto-école",

    sections: {
      overview: "Vue d'ensemble",
      stats: "Statistiques",
      quickActions: "Actions rapides",
      recentActivity: "Activité récente",
      upcomingEvents: "Événements à venir",
      performance: "Performance",
      alerts: "Alertes",
    },

    stats: {
      students: {
        title: "Élèves",
        total: "Total",
        active: "Actifs",
        inactive: "Inactifs",
        newThisMonth: "Nouveaux ce mois",
      },
      instructors: {
        title: "Moniteurs",
        total: "Total",
        active: "Actifs",
        onLeave: "En congé",
        avgRating: "Note moyenne",
      },
      vehicles: {
        title: "Véhicules",
        total: "Total",
        available: "Disponibles",
        inMaintenance: "En maintenance",
        avgUtilization: "Utilisation moyenne",
      },
      lessons: {
        title: "Leçons",
        totalThisMonth: "Total ce mois",
        completed: "Complétées",
        cancelled: "Annulées",
        upcoming: "À venir",
      },
      revenue: {
        title: "Revenus",
        thisMonth: "Ce mois",
        lastMonth: "Mois dernier",
        pending: "En attente",
        overdue: "En retard",
      },
      exams: {
        title: "Examens",
        scheduled: "Planifiés",
        passRate: "Taux de réussite",
        avgAttempts: "Tentatives moyennes",
      },
    },

    activityTypes: {
      student_registered: "Élève inscrit",
      lesson_completed: "Leçon terminée",
      exam_passed: "Examen réussi",
      payment_received: "Paiement reçu",
      vehicle_maintenance: "Maintenance véhicule",
      instructor_added: "Moniteur ajouté",
    },

    eventTypes: {
      lesson: "Leçon",
      exam: "Examen",
      theory_course: "Cours théorique",
      maintenance: "Maintenance",
      meeting: "Réunion",
    },

    eventStatus: {
      scheduled: "Planifié",
      confirmed: "Confirmé",
      pending: "En attente",
    },

    performanceMetrics: {
      studentSatisfaction: "Satisfaction élèves",
      lessonCompletion: "Taux de complétion",
      examPassRate: "Taux de réussite",
      revenuePerStudent: "Revenu par élève",
      vehicleUtilization: "Utilisation véhicules",
      instructorEfficiency: "Efficacité moniteurs",
    },

    alertTypes: {
      info: "Information",
      warning: "Avertissement",
      error: "Erreur",
      success: "Succès",
    },

    alertPriority: {
      low: "Basse",
      medium: "Moyenne",
      high: "Haute",
      critical: "Critique",
    },

    actions: {
      viewAll: "Voir tout",
      viewDetails: "Voir les détails",
      refresh: "Actualiser",
      export: "Exporter",
      filter: "Filtrer",
      dismiss: "Ignorer",
      markAsRead: "Marquer comme lu",
      configure: "Configurer",
    },

    quickActions: {
      addStudent: "Nouvel élève",
      scheduleLesson: "Planifier leçon",
      createInvoice: "Nouvelle facture",
      scheduleExam: "Planifier examen",
      addInstructor: "Nouveau moniteur",
      addVehicle: "Nouveau véhicule",
      viewReports: "Rapports",
      settings: "Paramètres",
    },

    trends: {
      up: "En hausse",
      down: "En baisse",
      stable: "Stable",
      vsLastMonth: "vs mois dernier",
    },

    status: {
      excellent: "Excellent",
      good: "Bon",
      warning: "Attention",
      critical: "Critique",
    },

    common: {
      loading: "Chargement...",
      noData: "Aucune donnée",
      error: "Erreur",
      today: "Aujourd'hui",
      thisWeek: "Cette semaine",
      thisMonth: "Ce mois",
      target: "Objectif",
      actual: "Réel",
    },
  },

  de: {
    pageTitle: "Schul-Dashboard",
    pageDescription: "Übersicht Ihrer Fahrschule",

    sections: {
      overview: "Übersicht",
      stats: "Statistiken",
      quickActions: "Schnellaktionen",
      recentActivity: "Letzte Aktivität",
      upcomingEvents: "Kommende Ereignisse",
      performance: "Leistung",
      alerts: "Warnungen",
    },

    stats: {
      students: {
        title: "Schüler",
        total: "Gesamt",
        active: "Aktiv",
        inactive: "Inaktiv",
        newThisMonth: "Neu diesen Monat",
      },
      instructors: {
        title: "Fahrlehrer",
        total: "Gesamt",
        active: "Aktiv",
        onLeave: "Im Urlaub",
        avgRating: "Durchschnittsbewertung",
      },
      vehicles: {
        title: "Fahrzeuge",
        total: "Gesamt",
        available: "Verfügbar",
        inMaintenance: "In Wartung",
        avgUtilization: "Durchschnittliche Auslastung",
      },
      lessons: {
        title: "Lektionen",
        totalThisMonth: "Gesamt diesen Monat",
        completed: "Abgeschlossen",
        cancelled: "Abgesagt",
        upcoming: "Bevorstehend",
      },
      revenue: {
        title: "Einnahmen",
        thisMonth: "Dieser Monat",
        lastMonth: "Letzter Monat",
        pending: "Ausstehend",
        overdue: "Überfällig",
      },
      exams: {
        title: "Prüfungen",
        scheduled: "Geplant",
        passRate: "Erfolgsquote",
        avgAttempts: "Durchschnittliche Versuche",
      },
    },

    activityTypes: {
      student_registered: "Schüler registriert",
      lesson_completed: "Lektion abgeschlossen",
      exam_passed: "Prüfung bestanden",
      payment_received: "Zahlung erhalten",
      vehicle_maintenance: "Fahrzeugwartung",
      instructor_added: "Fahrlehrer hinzugefügt",
    },

    eventTypes: {
      lesson: "Lektion",
      exam: "Prüfung",
      theory_course: "Theoriekurs",
      maintenance: "Wartung",
      meeting: "Besprechung",
    },

    eventStatus: {
      scheduled: "Geplant",
      confirmed: "Bestätigt",
      pending: "Ausstehend",
    },

    performanceMetrics: {
      studentSatisfaction: "Schülerzufriedenheit",
      lessonCompletion: "Abschlussquote",
      examPassRate: "Erfolgsquote",
      revenuePerStudent: "Umsatz pro Schüler",
      vehicleUtilization: "Fahrzeugauslastung",
      instructorEfficiency: "Lehrereffizienz",
    },

    alertTypes: {
      info: "Information",
      warning: "Warnung",
      error: "Fehler",
      success: "Erfolg",
    },

    alertPriority: {
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
      critical: "Kritisch",
    },

    actions: {
      viewAll: "Alle anzeigen",
      viewDetails: "Details anzeigen",
      refresh: "Aktualisieren",
      export: "Exportieren",
      filter: "Filtern",
      dismiss: "Verwerfen",
      markAsRead: "Als gelesen markieren",
      configure: "Konfigurieren",
    },

    quickActions: {
      addStudent: "Neuer Schüler",
      scheduleLesson: "Lektion planen",
      createInvoice: "Neue Rechnung",
      scheduleExam: "Prüfung planen",
      addInstructor: "Neuer Fahrlehrer",
      addVehicle: "Neues Fahrzeug",
      viewReports: "Berichte",
      settings: "Einstellungen",
    },

    trends: {
      up: "Steigend",
      down: "Fallend",
      stable: "Stabil",
      vsLastMonth: "vs letzter Monat",
    },

    status: {
      excellent: "Ausgezeichnet",
      good: "Gut",
      warning: "Achtung",
      critical: "Kritisch",
    },

    common: {
      loading: "Laden...",
      noData: "Keine Daten",
      error: "Fehler",
      today: "Heute",
      thisWeek: "Diese Woche",
      thisMonth: "Dieser Monat",
      target: "Ziel",
      actual: "Tatsächlich",
    },
  },

  it: {
    pageTitle: "Dashboard Scuola",
    pageDescription: "Panoramica della tua scuola guida",

    sections: {
      overview: "Panoramica",
      stats: "Statistiche",
      quickActions: "Azioni rapide",
      recentActivity: "Attività recente",
      upcomingEvents: "Eventi imminenti",
      performance: "Prestazioni",
      alerts: "Avvisi",
    },

    stats: {
      students: {
        title: "Allievi",
        total: "Totale",
        active: "Attivi",
        inactive: "Inattivi",
        newThisMonth: "Nuovi questo mese",
      },
      instructors: {
        title: "Istruttori",
        total: "Totale",
        active: "Attivi",
        onLeave: "In congedo",
        avgRating: "Valutazione media",
      },
      vehicles: {
        title: "Veicoli",
        total: "Totale",
        available: "Disponibili",
        inMaintenance: "In manutenzione",
        avgUtilization: "Utilizzo medio",
      },
      lessons: {
        title: "Lezioni",
        totalThisMonth: "Totale questo mese",
        completed: "Completate",
        cancelled: "Annullate",
        upcoming: "Prossime",
      },
      revenue: {
        title: "Entrate",
        thisMonth: "Questo mese",
        lastMonth: "Mese scorso",
        pending: "In attesa",
        overdue: "In ritardo",
      },
      exams: {
        title: "Esami",
        scheduled: "Programmati",
        passRate: "Tasso di successo",
        avgAttempts: "Tentativi medi",
      },
    },

    activityTypes: {
      student_registered: "Allievo iscritto",
      lesson_completed: "Lezione completata",
      exam_passed: "Esame superato",
      payment_received: "Pagamento ricevuto",
      vehicle_maintenance: "Manutenzione veicolo",
      instructor_added: "Istruttore aggiunto",
    },

    eventTypes: {
      lesson: "Lezione",
      exam: "Esame",
      theory_course: "Corso teorico",
      maintenance: "Manutenzione",
      meeting: "Riunione",
    },

    eventStatus: {
      scheduled: "Programmato",
      confirmed: "Confermato",
      pending: "In attesa",
    },

    performanceMetrics: {
      studentSatisfaction: "Soddisfazione allievi",
      lessonCompletion: "Tasso di completamento",
      examPassRate: "Tasso di successo",
      revenuePerStudent: "Entrate per allievo",
      vehicleUtilization: "Utilizzo veicoli",
      instructorEfficiency: "Efficienza istruttori",
    },

    alertTypes: {
      info: "Informazione",
      warning: "Avviso",
      error: "Errore",
      success: "Successo",
    },

    alertPriority: {
      low: "Bassa",
      medium: "Media",
      high: "Alta",
      critical: "Critica",
    },

    actions: {
      viewAll: "Vedi tutto",
      viewDetails: "Vedi dettagli",
      refresh: "Aggiorna",
      export: "Esporta",
      filter: "Filtra",
      dismiss: "Ignora",
      markAsRead: "Segna come letto",
      configure: "Configura",
    },

    quickActions: {
      addStudent: "Nuovo allievo",
      scheduleLesson: "Programma lezione",
      createInvoice: "Nuova fattura",
      scheduleExam: "Programma esame",
      addInstructor: "Nuovo istruttore",
      addVehicle: "Nuovo veicolo",
      viewReports: "Rapporti",
      settings: "Impostazioni",
    },

    trends: {
      up: "In aumento",
      down: "In diminuzione",
      stable: "Stabile",
      vsLastMonth: "vs mese scorso",
    },

    status: {
      excellent: "Eccellente",
      good: "Buono",
      warning: "Attenzione",
      critical: "Critico",
    },

    common: {
      loading: "Caricamento...",
      noData: "Nessun dato",
      error: "Errore",
      today: "Oggi",
      thisWeek: "Questa settimana",
      thisMonth: "Questo mese",
      target: "Obiettivo",
      actual: "Effettivo",
    },
  },

  en: {
    pageTitle: "School Dashboard",
    pageDescription: "Overview of your driving school",

    sections: {
      overview: "Overview",
      stats: "Statistics",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      upcomingEvents: "Upcoming Events",
      performance: "Performance",
      alerts: "Alerts",
    },

    stats: {
      students: {
        title: "Students",
        total: "Total",
        active: "Active",
        inactive: "Inactive",
        newThisMonth: "New this month",
      },
      instructors: {
        title: "Instructors",
        total: "Total",
        active: "Active",
        onLeave: "On leave",
        avgRating: "Average rating",
      },
      vehicles: {
        title: "Vehicles",
        total: "Total",
        available: "Available",
        inMaintenance: "In maintenance",
        avgUtilization: "Average utilization",
      },
      lessons: {
        title: "Lessons",
        totalThisMonth: "Total this month",
        completed: "Completed",
        cancelled: "Cancelled",
        upcoming: "Upcoming",
      },
      revenue: {
        title: "Revenue",
        thisMonth: "This month",
        lastMonth: "Last month",
        pending: "Pending",
        overdue: "Overdue",
      },
      exams: {
        title: "Exams",
        scheduled: "Scheduled",
        passRate: "Pass rate",
        avgAttempts: "Average attempts",
      },
    },

    activityTypes: {
      student_registered: "Student registered",
      lesson_completed: "Lesson completed",
      exam_passed: "Exam passed",
      payment_received: "Payment received",
      vehicle_maintenance: "Vehicle maintenance",
      instructor_added: "Instructor added",
    },

    eventTypes: {
      lesson: "Lesson",
      exam: "Exam",
      theory_course: "Theory course",
      maintenance: "Maintenance",
      meeting: "Meeting",
    },

    eventStatus: {
      scheduled: "Scheduled",
      confirmed: "Confirmed",
      pending: "Pending",
    },

    performanceMetrics: {
      studentSatisfaction: "Student satisfaction",
      lessonCompletion: "Completion rate",
      examPassRate: "Pass rate",
      revenuePerStudent: "Revenue per student",
      vehicleUtilization: "Vehicle utilization",
      instructorEfficiency: "Instructor efficiency",
    },

    alertTypes: {
      info: "Information",
      warning: "Warning",
      error: "Error",
      success: "Success",
    },

    alertPriority: {
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
    },

    actions: {
      viewAll: "View all",
      viewDetails: "View details",
      refresh: "Refresh",
      export: "Export",
      filter: "Filter",
      dismiss: "Dismiss",
      markAsRead: "Mark as read",
      configure: "Configure",
    },

    quickActions: {
      addStudent: "New student",
      scheduleLesson: "Schedule lesson",
      createInvoice: "New invoice",
      scheduleExam: "Schedule exam",
      addInstructor: "New instructor",
      addVehicle: "New vehicle",
      viewReports: "Reports",
      settings: "Settings",
    },

    trends: {
      up: "Up",
      down: "Down",
      stable: "Stable",
      vsLastMonth: "vs last month",
    },

    status: {
      excellent: "Excellent",
      good: "Good",
      warning: "Warning",
      critical: "Critical",
    },

    common: {
      loading: "Loading...",
      noData: "No data",
      error: "Error",
      today: "Today",
      thisWeek: "This week",
      thisMonth: "This month",
      target: "Target",
      actual: "Actual",
    },
  },
};
