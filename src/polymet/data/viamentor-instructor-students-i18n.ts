/**
 * VIAMENTOR - Instructor Students i18n
 * Traductions FR/DE/IT/EN pour gestion élèves moniteur
 */

"use client";

import type { InstructorStudent } from "@/polymet/data/viamentor-instructor-students-data";

// ============================================================================
// TYPES
// ============================================================================

export type InstructorStudentsLocale = "fr" | "de" | "it" | "en";

export interface InstructorStudentsTranslations {
  // Page header
  pageTitle: string;
  breadcrumb: string;

  // Stats cards
  stats: {
    totalStudents: string;
    activeThisMonth: string;
    averageProgression: string;
    upcomingExams: string;
  };

  // Toolbar
  toolbar: {
    search: string;
    filterCategory: string;
    filterProgression: string;
    filterStatus: string;
    viewToggle: string;
    viewTable: string;
    viewCards: string;
    export: string;
    exportCSV: string;
    exportPDF: string;
  };

  // Filters
  filters: {
    allCategories: string;
    progressionLow: string;
    progressionMedium: string;
    progressionHigh: string;
    statusActive: string;
    statusInactive: string;
    statusExamReady: string;
    statusAbandoned: string;
  };

  // Student card/table
  student: {
    category: string;
    progression: string;
    lessonsCompleted: string;
    lastLesson: string;
    nextLesson: string;
    averageRating: string;
    status: string;
    balance: string;
    lessonsRemaining: string;
  };

  // Actions
  actions: {
    viewDetails: string;
    contact: string;
    planLesson: string;
    quickEvaluation: string;
    addNote: string;
    sendGroupMessage: string;
    exportSelection: string;
  };

  // Empty state
  emptyState: {
    title: string;
    description: string;
    contactAdmin: string;
  };

  // Detail sheet tabs
  tabs: {
    summary: string;
    progression: string;
    lessons: string;
    evaluations: string;
    notes: string;
    contact: string;
  };

  // Summary tab
  summary: {
    information: string;
    age: string;
    registrationDate: string;
    phone: string;
    email: string;
    address: string;
    assignedInstructor: string;
    statistics: string;
    totalLessons: string;
    drivingHours: string;
    globalProgression: string;
    nextLesson: string;
    lastContact: string;
    trainingGoal: string;
    examIn: string;
    days: string;
    quickActions: string;
    lowBalanceWarning: string;
    buyPackage: string;
  };

  // Progression tab
  progression: {
    byTheme: string;
    mastered: string;
    inProgress: string;
    toWork: string;
    recommendations: string;
    planTargetedLesson: string;
  };

  // Lessons tab
  lessons: {
    date: string;
    duration: string;
    vehicle: string;
    meetingPoint: string;
    themes: string;
    rating: string;
    comment: string;
    kmDriven: string;
    status: string;
    viewDetail: string;
    modifyEvaluation: string;
    totalHours: string;
    totalKm: string;
    averageRating: string;
    generateReport: string;
  };

  // Evaluations tab
  evaluations: {
    evaluationDate: string;
    themesEvaluated: string;
    globalRating: string;
    comment: string;
    digitalSignature: string;
    newEvaluation: string;
    edit: string;
    delete: string;
    averageEvolution: string;
  };

  // Notes tab
  notes: {
    privateNotes: string;
    addNote: string;
    autoSaved: string;
    history: string;
  };

  // Contact tab
  contact: {
    contactInfo: string;
    call: string;
    sendSMS: string;
    sendEmail: string;
    directions: string;
    communicationHistory: string;
    channel: string;
    subject: string;
    content: string;
    status: string;
    sent: string;
    delivered: string;
    read: string;
    failed: string;
  };

  // Quick evaluation dialog
  quickEvaluation: {
    title: string;
    selectStudent: string;
    lessonDate: string;
    themesAddressed: string;
    globalRating: string;
    comment: string;
    digitalSignature: string;
    save: string;
    cancel: string;
    successMessage: string;
  };

  // Status labels
  statusLabels: {
    active: string;
    inactive: string;
    exam_ready: string;
    abandoned: string;
  };

  // Relative dates
  relativeDates: {
    today: string;
    yesterday: string;
    daysAgo: (days: number) => string;
    weeksAgo: (weeks: number) => string;
    monthsAgo: (months: number) => string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const instructorStudentsTranslations: Record<
  InstructorStudentsLocale,
  InstructorStudentsTranslations
> = {
  fr: {
    pageTitle: "Mes élèves",
    breadcrumb: "Mes élèves",

    stats: {
      totalStudents: "Total élèves",
      activeThisMonth: "Actifs ce mois",
      averageProgression: "Progression moyenne",
      upcomingExams: "Examens proches",
    },

    toolbar: {
      search: "Rechercher nom, catégorie...",
      filterCategory: "Catégorie",
      filterProgression: "Progression",
      filterStatus: "Statut",
      viewToggle: "Vue",
      viewTable: "Table",
      viewCards: "Cartes",
      export: "Exporter",
      exportCSV: "Exporter CSV",
      exportPDF: "Exporter PDF",
    },

    filters: {
      allCategories: "Toutes catégories",
      progressionLow: "< 30%",
      progressionMedium: "30-70%",
      progressionHigh: "> 70%",
      statusActive: "Actif",
      statusInactive: "Inactif",
      statusExamReady: "Examen proche",
      statusAbandoned: "Abandonné",
    },

    student: {
      category: "Catégorie",
      progression: "Progression",
      lessonsCompleted: "Leçons effectuées",
      lastLesson: "Dernière leçon",
      nextLesson: "Prochaine leçon",
      averageRating: "Note moyenne",
      status: "Statut",
      balance: "Solde",
      lessonsRemaining: "leçons restantes",
    },

    actions: {
      viewDetails: "Voir fiche",
      contact: "Contacter",
      planLesson: "Planifier leçon",
      quickEvaluation: "Évaluation rapide",
      addNote: "Ajouter note",
      sendGroupMessage: "Envoyer message groupe",
      exportSelection: "Exporter sélection",
    },

    emptyState: {
      title: "Aucun élève assigné",
      description: "Vous n'avez actuellement aucun élève assigné.",
      contactAdmin: "Contacter l'administrateur",
    },

    tabs: {
      summary: "Résumé",
      progression: "Progression",
      lessons: "Leçons",
      evaluations: "Évaluations",
      notes: "Notes",
      contact: "Contact",
    },

    summary: {
      information: "Informations",
      age: "Âge",
      registrationDate: "Date d'inscription",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse",
      assignedInstructor: "Moniteur assigné",
      statistics: "Statistiques",
      totalLessons: "Leçons totales",
      drivingHours: "Heures de conduite",
      globalProgression: "Progression globale",
      nextLesson: "Prochaine leçon",
      lastContact: "Dernier contact",
      trainingGoal: "Objectif formation",
      examIn: "Examen dans",
      days: "jours",
      quickActions: "Actions rapides",
      lowBalanceWarning: "Solde faible",
      buyPackage: "Acheter forfait",
    },

    progression: {
      byTheme: "Progression par thème",
      mastered: "Maîtrisés",
      inProgress: "En cours",
      toWork: "À travailler",
      recommendations: "Recommandations",
      planTargetedLesson: "Planifier leçon ciblée",
    },

    lessons: {
      date: "Date",
      duration: "Durée",
      vehicle: "Véhicule",
      meetingPoint: "Point RDV",
      themes: "Thèmes",
      rating: "Note",
      comment: "Commentaire",
      kmDriven: "Km parcourus",
      status: "Statut",
      viewDetail: "Voir détail",
      modifyEvaluation: "Modifier évaluation",
      totalHours: "Total heures",
      totalKm: "Total km",
      averageRating: "Note moyenne",
      generateReport: "Générer rapport",
    },

    evaluations: {
      evaluationDate: "Date évaluation",
      themesEvaluated: "Thèmes évalués",
      globalRating: "Note globale",
      comment: "Commentaire",
      digitalSignature: "Signature digitale",
      newEvaluation: "Nouvelle évaluation",
      edit: "Modifier",
      delete: "Supprimer",
      averageEvolution: "Évolution moyenne",
    },

    notes: {
      privateNotes: "Notes privées",
      addNote: "Ajouter une note",
      autoSaved: "Sauvegarde automatique",
      history: "Historique",
    },

    contact: {
      contactInfo: "Informations de contact",
      call: "Appeler",
      sendSMS: "Envoyer SMS",
      sendEmail: "Envoyer email",
      directions: "Itinéraire",
      communicationHistory: "Historique communications",
      channel: "Canal",
      subject: "Objet",
      content: "Contenu",
      status: "Statut",
      sent: "Envoyé",
      delivered: "Délivré",
      read: "Lu",
      failed: "Échec",
    },

    quickEvaluation: {
      title: "Évaluation rapide",
      selectStudent: "Sélectionner élève",
      lessonDate: "Date leçon",
      themesAddressed: "Thèmes abordés",
      globalRating: "Note globale",
      comment: "Commentaire",
      digitalSignature: "Signature digitale",
      save: "Enregistrer évaluation",
      cancel: "Annuler",
      successMessage: "Évaluation enregistrée!",
    },

    statusLabels: {
      active: "Actif",
      inactive: "Inactif",
      exam_ready: "Examen proche",
      abandoned: "Abandonné",
    },

    relativeDates: {
      today: "Aujourd'hui",
      yesterday: "Hier",
      daysAgo: (days) => `Il y a ${days}j`,
      weeksAgo: (weeks) => `Il y a ${weeks} sem`,
      monthsAgo: (months) => `Il y a ${months} mois`,
    },
  },

  de: {
    pageTitle: "Meine Schüler",
    breadcrumb: "Meine Schüler",

    stats: {
      totalStudents: "Schüler gesamt",
      activeThisMonth: "Aktiv diesen Monat",
      averageProgression: "Durchschnittlicher Fortschritt",
      upcomingExams: "Bevorstehende Prüfungen",
    },

    toolbar: {
      search: "Name, Kategorie suchen...",
      filterCategory: "Kategorie",
      filterProgression: "Fortschritt",
      filterStatus: "Status",
      viewToggle: "Ansicht",
      viewTable: "Tabelle",
      viewCards: "Karten",
      export: "Exportieren",
      exportCSV: "CSV exportieren",
      exportPDF: "PDF exportieren",
    },

    filters: {
      allCategories: "Alle Kategorien",
      progressionLow: "< 30%",
      progressionMedium: "30-70%",
      progressionHigh: "> 70%",
      statusActive: "Aktiv",
      statusInactive: "Inaktiv",
      statusExamReady: "Prüfung bald",
      statusAbandoned: "Abgebrochen",
    },

    student: {
      category: "Kategorie",
      progression: "Fortschritt",
      lessonsCompleted: "Lektionen absolviert",
      lastLesson: "Letzte Lektion",
      nextLesson: "Nächste Lektion",
      averageRating: "Durchschnittsnote",
      status: "Status",
      balance: "Guthaben",
      lessonsRemaining: "verbleibende Lektionen",
    },

    actions: {
      viewDetails: "Details anzeigen",
      contact: "Kontaktieren",
      planLesson: "Lektion planen",
      quickEvaluation: "Schnellbewertung",
      addNote: "Notiz hinzufügen",
      sendGroupMessage: "Gruppennachricht senden",
      exportSelection: "Auswahl exportieren",
    },

    emptyState: {
      title: "Keine Schüler zugewiesen",
      description: "Sie haben derzeit keine zugewiesenen Schüler.",
      contactAdmin: "Administrator kontaktieren",
    },

    tabs: {
      summary: "Zusammenfassung",
      progression: "Fortschritt",
      lessons: "Lektionen",
      evaluations: "Bewertungen",
      notes: "Notizen",
      contact: "Kontakt",
    },

    summary: {
      information: "Informationen",
      age: "Alter",
      registrationDate: "Anmeldedatum",
      phone: "Telefon",
      email: "E-Mail",
      address: "Adresse",
      assignedInstructor: "Zugewiesener Fahrlehrer",
      statistics: "Statistiken",
      totalLessons: "Lektionen gesamt",
      drivingHours: "Fahrstunden",
      globalProgression: "Gesamtfortschritt",
      nextLesson: "Nächste Lektion",
      lastContact: "Letzter Kontakt",
      trainingGoal: "Ausbildungsziel",
      examIn: "Prüfung in",
      days: "Tagen",
      quickActions: "Schnellaktionen",
      lowBalanceWarning: "Niedriges Guthaben",
      buyPackage: "Paket kaufen",
    },

    progression: {
      byTheme: "Fortschritt nach Thema",
      mastered: "Gemeistert",
      inProgress: "In Bearbeitung",
      toWork: "Zu üben",
      recommendations: "Empfehlungen",
      planTargetedLesson: "Gezielte Lektion planen",
    },

    lessons: {
      date: "Datum",
      duration: "Dauer",
      vehicle: "Fahrzeug",
      meetingPoint: "Treffpunkt",
      themes: "Themen",
      rating: "Bewertung",
      comment: "Kommentar",
      kmDriven: "Gefahrene km",
      status: "Status",
      viewDetail: "Details anzeigen",
      modifyEvaluation: "Bewertung ändern",
      totalHours: "Stunden gesamt",
      totalKm: "Km gesamt",
      averageRating: "Durchschnittsnote",
      generateReport: "Bericht erstellen",
    },

    evaluations: {
      evaluationDate: "Bewertungsdatum",
      themesEvaluated: "Bewertete Themen",
      globalRating: "Gesamtnote",
      comment: "Kommentar",
      digitalSignature: "Digitale Signatur",
      newEvaluation: "Neue Bewertung",
      edit: "Bearbeiten",
      delete: "Löschen",
      averageEvolution: "Durchschnittliche Entwicklung",
    },

    notes: {
      privateNotes: "Private Notizen",
      addNote: "Notiz hinzufügen",
      autoSaved: "Automatisch gespeichert",
      history: "Verlauf",
    },

    contact: {
      contactInfo: "Kontaktinformationen",
      call: "Anrufen",
      sendSMS: "SMS senden",
      sendEmail: "E-Mail senden",
      directions: "Wegbeschreibung",
      communicationHistory: "Kommunikationsverlauf",
      channel: "Kanal",
      subject: "Betreff",
      content: "Inhalt",
      status: "Status",
      sent: "Gesendet",
      delivered: "Zugestellt",
      read: "Gelesen",
      failed: "Fehlgeschlagen",
    },

    quickEvaluation: {
      title: "Schnellbewertung",
      selectStudent: "Schüler auswählen",
      lessonDate: "Lektionsdatum",
      themesAddressed: "Behandelte Themen",
      globalRating: "Gesamtnote",
      comment: "Kommentar",
      digitalSignature: "Digitale Signatur",
      save: "Bewertung speichern",
      cancel: "Abbrechen",
      successMessage: "Bewertung gespeichert!",
    },

    statusLabels: {
      active: "Aktiv",
      inactive: "Inaktiv",
      exam_ready: "Prüfung bald",
      abandoned: "Abgebrochen",
    },

    relativeDates: {
      today: "Heute",
      yesterday: "Gestern",
      daysAgo: (days) => `Vor ${days}T`,
      weeksAgo: (weeks) => `Vor ${weeks} Wo`,
      monthsAgo: (months) => `Vor ${months} Mon`,
    },
  },

  it: {
    pageTitle: "I miei allievi",
    breadcrumb: "I miei allievi",

    stats: {
      totalStudents: "Allievi totali",
      activeThisMonth: "Attivi questo mese",
      averageProgression: "Progressione media",
      upcomingExams: "Esami prossimi",
    },

    toolbar: {
      search: "Cerca nome, categoria...",
      filterCategory: "Categoria",
      filterProgression: "Progressione",
      filterStatus: "Stato",
      viewToggle: "Vista",
      viewTable: "Tabella",
      viewCards: "Schede",
      export: "Esporta",
      exportCSV: "Esporta CSV",
      exportPDF: "Esporta PDF",
    },

    filters: {
      allCategories: "Tutte categorie",
      progressionLow: "< 30%",
      progressionMedium: "30-70%",
      progressionHigh: "> 70%",
      statusActive: "Attivo",
      statusInactive: "Inattivo",
      statusExamReady: "Esame vicino",
      statusAbandoned: "Abbandonato",
    },

    student: {
      category: "Categoria",
      progression: "Progressione",
      lessonsCompleted: "Lezioni completate",
      lastLesson: "Ultima lezione",
      nextLesson: "Prossima lezione",
      averageRating: "Voto medio",
      status: "Stato",
      balance: "Saldo",
      lessonsRemaining: "lezioni rimanenti",
    },

    actions: {
      viewDetails: "Vedi scheda",
      contact: "Contatta",
      planLesson: "Pianifica lezione",
      quickEvaluation: "Valutazione rapida",
      addNote: "Aggiungi nota",
      sendGroupMessage: "Invia messaggio gruppo",
      exportSelection: "Esporta selezione",
    },

    emptyState: {
      title: "Nessun allievo assegnato",
      description: "Non hai attualmente allievi assegnati.",
      contactAdmin: "Contatta l'amministratore",
    },

    tabs: {
      summary: "Riepilogo",
      progression: "Progressione",
      lessons: "Lezioni",
      evaluations: "Valutazioni",
      notes: "Note",
      contact: "Contatto",
    },

    summary: {
      information: "Informazioni",
      age: "Età",
      registrationDate: "Data iscrizione",
      phone: "Telefono",
      email: "Email",
      address: "Indirizzo",
      assignedInstructor: "Istruttore assegnato",
      statistics: "Statistiche",
      totalLessons: "Lezioni totali",
      drivingHours: "Ore di guida",
      globalProgression: "Progressione globale",
      nextLesson: "Prossima lezione",
      lastContact: "Ultimo contatto",
      trainingGoal: "Obiettivo formazione",
      examIn: "Esame tra",
      days: "giorni",
      quickActions: "Azioni rapide",
      lowBalanceWarning: "Saldo basso",
      buyPackage: "Acquista pacchetto",
    },

    progression: {
      byTheme: "Progressione per tema",
      mastered: "Padroneggiati",
      inProgress: "In corso",
      toWork: "Da lavorare",
      recommendations: "Raccomandazioni",
      planTargetedLesson: "Pianifica lezione mirata",
    },

    lessons: {
      date: "Data",
      duration: "Durata",
      vehicle: "Veicolo",
      meetingPoint: "Punto incontro",
      themes: "Temi",
      rating: "Voto",
      comment: "Commento",
      kmDriven: "Km percorsi",
      status: "Stato",
      viewDetail: "Vedi dettaglio",
      modifyEvaluation: "Modifica valutazione",
      totalHours: "Ore totali",
      totalKm: "Km totali",
      averageRating: "Voto medio",
      generateReport: "Genera rapporto",
    },

    evaluations: {
      evaluationDate: "Data valutazione",
      themesEvaluated: "Temi valutati",
      globalRating: "Voto globale",
      comment: "Commento",
      digitalSignature: "Firma digitale",
      newEvaluation: "Nuova valutazione",
      edit: "Modifica",
      delete: "Elimina",
      averageEvolution: "Evoluzione media",
    },

    notes: {
      privateNotes: "Note private",
      addNote: "Aggiungi nota",
      autoSaved: "Salvataggio automatico",
      history: "Cronologia",
    },

    contact: {
      contactInfo: "Informazioni contatto",
      call: "Chiama",
      sendSMS: "Invia SMS",
      sendEmail: "Invia email",
      directions: "Indicazioni",
      communicationHistory: "Cronologia comunicazioni",
      channel: "Canale",
      subject: "Oggetto",
      content: "Contenuto",
      status: "Stato",
      sent: "Inviato",
      delivered: "Consegnato",
      read: "Letto",
      failed: "Fallito",
    },

    quickEvaluation: {
      title: "Valutazione rapida",
      selectStudent: "Seleziona allievo",
      lessonDate: "Data lezione",
      themesAddressed: "Temi affrontati",
      globalRating: "Voto globale",
      comment: "Commento",
      digitalSignature: "Firma digitale",
      save: "Salva valutazione",
      cancel: "Annulla",
      successMessage: "Valutazione salvata!",
    },

    statusLabels: {
      active: "Attivo",
      inactive: "Inattivo",
      exam_ready: "Esame vicino",
      abandoned: "Abbandonato",
    },

    relativeDates: {
      today: "Oggi",
      yesterday: "Ieri",
      daysAgo: (days) => `${days}g fa`,
      weeksAgo: (weeks) => `${weeks} sett fa`,
      monthsAgo: (months) => `${months} mesi fa`,
    },
  },

  en: {
    pageTitle: "My Students",
    breadcrumb: "My Students",

    stats: {
      totalStudents: "Total students",
      activeThisMonth: "Active this month",
      averageProgression: "Average progression",
      upcomingExams: "Upcoming exams",
    },

    toolbar: {
      search: "Search name, category...",
      filterCategory: "Category",
      filterProgression: "Progression",
      filterStatus: "Status",
      viewToggle: "View",
      viewTable: "Table",
      viewCards: "Cards",
      export: "Export",
      exportCSV: "Export CSV",
      exportPDF: "Export PDF",
    },

    filters: {
      allCategories: "All categories",
      progressionLow: "< 30%",
      progressionMedium: "30-70%",
      progressionHigh: "> 70%",
      statusActive: "Active",
      statusInactive: "Inactive",
      statusExamReady: "Exam soon",
      statusAbandoned: "Abandoned",
    },

    student: {
      category: "Category",
      progression: "Progression",
      lessonsCompleted: "Lessons completed",
      lastLesson: "Last lesson",
      nextLesson: "Next lesson",
      averageRating: "Average rating",
      status: "Status",
      balance: "Balance",
      lessonsRemaining: "lessons remaining",
    },

    actions: {
      viewDetails: "View details",
      contact: "Contact",
      planLesson: "Plan lesson",
      quickEvaluation: "Quick evaluation",
      addNote: "Add note",
      sendGroupMessage: "Send group message",
      exportSelection: "Export selection",
    },

    emptyState: {
      title: "No students assigned",
      description: "You currently have no assigned students.",
      contactAdmin: "Contact administrator",
    },

    tabs: {
      summary: "Summary",
      progression: "Progression",
      lessons: "Lessons",
      evaluations: "Evaluations",
      notes: "Notes",
      contact: "Contact",
    },

    summary: {
      information: "Information",
      age: "Age",
      registrationDate: "Registration date",
      phone: "Phone",
      email: "Email",
      address: "Address",
      assignedInstructor: "Assigned instructor",
      statistics: "Statistics",
      totalLessons: "Total lessons",
      drivingHours: "Driving hours",
      globalProgression: "Global progression",
      nextLesson: "Next lesson",
      lastContact: "Last contact",
      trainingGoal: "Training goal",
      examIn: "Exam in",
      days: "days",
      quickActions: "Quick actions",
      lowBalanceWarning: "Low balance",
      buyPackage: "Buy package",
    },

    progression: {
      byTheme: "Progression by theme",
      mastered: "Mastered",
      inProgress: "In progress",
      toWork: "To work on",
      recommendations: "Recommendations",
      planTargetedLesson: "Plan targeted lesson",
    },

    lessons: {
      date: "Date",
      duration: "Duration",
      vehicle: "Vehicle",
      meetingPoint: "Meeting point",
      themes: "Themes",
      rating: "Rating",
      comment: "Comment",
      kmDriven: "Km driven",
      status: "Status",
      viewDetail: "View detail",
      modifyEvaluation: "Modify evaluation",
      totalHours: "Total hours",
      totalKm: "Total km",
      averageRating: "Average rating",
      generateReport: "Generate report",
    },

    evaluations: {
      evaluationDate: "Evaluation date",
      themesEvaluated: "Themes evaluated",
      globalRating: "Global rating",
      comment: "Comment",
      digitalSignature: "Digital signature",
      newEvaluation: "New evaluation",
      edit: "Edit",
      delete: "Delete",
      averageEvolution: "Average evolution",
    },

    notes: {
      privateNotes: "Private notes",
      addNote: "Add note",
      autoSaved: "Auto-saved",
      history: "History",
    },

    contact: {
      contactInfo: "Contact information",
      call: "Call",
      sendSMS: "Send SMS",
      sendEmail: "Send email",
      directions: "Directions",
      communicationHistory: "Communication history",
      channel: "Channel",
      subject: "Subject",
      content: "Content",
      status: "Status",
      sent: "Sent",
      delivered: "Delivered",
      read: "Read",
      failed: "Failed",
    },

    quickEvaluation: {
      title: "Quick evaluation",
      selectStudent: "Select student",
      lessonDate: "Lesson date",
      themesAddressed: "Themes addressed",
      globalRating: "Global rating",
      comment: "Comment",
      digitalSignature: "Digital signature",
      save: "Save evaluation",
      cancel: "Cancel",
      successMessage: "Evaluation saved!",
    },

    statusLabels: {
      active: "Active",
      inactive: "Inactive",
      exam_ready: "Exam soon",
      abandoned: "Abandoned",
    },

    relativeDates: {
      today: "Today",
      yesterday: "Yesterday",
      daysAgo: (days) => `${days}d ago`,
      weeksAgo: (weeks) => `${weeks}w ago`,
      monthsAgo: (months) => `${months}mo ago`,
    },
  },
};

// ============================================================================
// HELPER HOOK
// ============================================================================

export function useInstructorStudentsTranslations(
  locale: InstructorStudentsLocale = "fr"
) {
  return instructorStudentsTranslations[locale];
}
