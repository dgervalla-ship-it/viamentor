/**
 * ============================================================================
 * VIAMENTOR - Exams i18n
 * Traductions FR/DE/IT/EN pour gestion examens
 * ============================================================================
 */

export interface ExamsLocale {
  // Navigation
  nav: {
    exams: string;
    examsList: string;
    bookExam: string;
    mockExams: string;
  };

  // Types
  types: {
    theory: string;
    practical: string;
    first_aid: string;
    awareness: string;
  };

  // Statuts
  status: {
    scheduled: string;
    in_progress: string;
    completed: string;
    passed: string;
    failed: string;
    cancelled: string;
    no_show: string;
  };

  // Liste
  list: {
    title: string;
    description: string;
    search: string;
    filters: string;
    allTypes: string;
    allStatuses: string;
    allCategories: string;
    dateRange: string;
    paidOnly: string;
    unpaidOnly: string;
    export: string;
    refresh: string;
  };

  // Stats
  stats: {
    total: string;
    scheduled: string;
    completed: string;
    passed: string;
    failed: string;
    cancelled: string;
    noShow: string;
    successRate: string;
    averageScore: string;
    averageAttempts: string;
  };

  // Détail
  detail: {
    title: string;
    information: string;
    student: string;
    scheduling: string;
    location: string;
    examiner: string;
    instructor: string;
    vehicle: string;
    result: string;
    documents: string;
    history: string;
    notes: string;
    actions: string;
  };

  // Résultats
  result: {
    score: string;
    totalQuestions: string;
    correctAnswers: string;
    passingScore: string;
    themeResults: string;
    evaluatorNotes: string;
    weakPoints: string;
    strongPoints: string;
    passed: string;
    failed: string;
  };

  // Réservation
  booking: {
    title: string;
    description: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    selectStudent: string;
    selectType: string;
    selectCategory: string;
    selectDate: string;
    selectTime: string;
    selectCenter: string;
    selectInstructor: string;
    selectVehicle: string;
    review: string;
    confirm: string;
    success: string;
    error: string;
  };

  // Examens blancs
  mock: {
    title: string;
    description: string;
    schedule: string;
    history: string;
    statistics: string;
    createMock: string;
    viewResults: string;
    compareResults: string;
    recommendations: string;
  };

  // Documents
  documents: {
    convocation: string;
    result: string;
    certificate: string;
    invoice: string;
    download: string;
    upload: string;
    delete: string;
  };

  // Actions
  actions: {
    book: string;
    reschedule: string;
    cancel: string;
    viewDetails: string;
    downloadConvocation: string;
    downloadResult: string;
    payFee: string;
    addNotes: string;
    editResult: string;
    markPassed: string;
    markFailed: string;
    markNoShow: string;
  };

  // Messages
  messages: {
    bookingSuccess: string;
    bookingError: string;
    cancelSuccess: string;
    cancelError: string;
    rescheduleSuccess: string;
    rescheduleError: string;
    resultSaved: string;
    resultError: string;
    documentUploaded: string;
    documentError: string;
  };

  // Validation
  validation: {
    studentRequired: string;
    typeRequired: string;
    categoryRequired: string;
    dateRequired: string;
    timeRequired: string;
    centerRequired: string;
    instructorRequired: string;
    vehicleRequired: string;
    feeRequired: string;
  };
}

export const examsLocales: Record<string, ExamsLocale> = {
  fr: {
    nav: {
      exams: "Examens",
      examsList: "Liste des examens",
      bookExam: "Réserver un examen",
      mockExams: "Examens blancs",
    },
    types: {
      theory: "Théorique",
      practical: "Pratique",
      first_aid: "Premiers secours",
      awareness: "Sensibilisation",
    },
    status: {
      scheduled: "Planifié",
      in_progress: "En cours",
      completed: "Terminé",
      passed: "Réussi",
      failed: "Échoué",
      cancelled: "Annulé",
      no_show: "Absent",
    },
    list: {
      title: "Gestion des Examens",
      description: "Gérez tous les examens théoriques et pratiques",
      search: "Rechercher un examen...",
      filters: "Filtres",
      allTypes: "Tous les types",
      allStatuses: "Tous les statuts",
      allCategories: "Toutes les catégories",
      dateRange: "Période",
      paidOnly: "Payés uniquement",
      unpaidOnly: "Non payés uniquement",
      export: "Exporter",
      refresh: "Actualiser",
    },
    stats: {
      total: "Total",
      scheduled: "Planifiés",
      completed: "Terminés",
      passed: "Réussis",
      failed: "Échoués",
      cancelled: "Annulés",
      noShow: "Absents",
      successRate: "Taux de réussite",
      averageScore: "Score moyen",
      averageAttempts: "Tentatives moyennes",
    },
    detail: {
      title: "Détail de l'Examen",
      information: "Informations",
      student: "Élève",
      scheduling: "Planification",
      location: "Lieu",
      examiner: "Examinateur",
      instructor: "Moniteur référent",
      vehicle: "Véhicule",
      result: "Résultat",
      documents: "Documents",
      history: "Historique",
      notes: "Notes",
      actions: "Actions",
    },
    result: {
      score: "Score",
      totalQuestions: "Questions totales",
      correctAnswers: "Réponses correctes",
      passingScore: "Score requis",
      themeResults: "Résultats par thème",
      evaluatorNotes: "Notes de l'examinateur",
      weakPoints: "Points faibles",
      strongPoints: "Points forts",
      passed: "Réussi",
      failed: "Échoué",
    },
    booking: {
      title: "Réserver un Examen",
      description: "Planifiez un nouvel examen pour un élève",
      step1: "Élève et Type",
      step2: "Date et Lieu",
      step3: "Détails",
      step4: "Confirmation",
      selectStudent: "Sélectionner l'élève",
      selectType: "Type d'examen",
      selectCategory: "Catégorie",
      selectDate: "Date",
      selectTime: "Heure",
      selectCenter: "Centre d'examen",
      selectInstructor: "Moniteur (optionnel)",
      selectVehicle: "Véhicule (optionnel)",
      review: "Vérifier",
      confirm: "Confirmer la réservation",
      success: "Examen réservé avec succès",
      error: "Erreur lors de la réservation",
    },
    mock: {
      title: "Examens Blancs",
      description: "Organisez et suivez les examens blancs",
      schedule: "Planifier",
      history: "Historique",
      statistics: "Statistiques",
      createMock: "Créer un examen blanc",
      viewResults: "Voir les résultats",
      compareResults: "Comparer les résultats",
      recommendations: "Recommandations",
    },
    documents: {
      convocation: "Convocation",
      result: "Résultat",
      certificate: "Certificat",
      invoice: "Facture",
      download: "Télécharger",
      upload: "Importer",
      delete: "Supprimer",
    },
    actions: {
      book: "Réserver",
      reschedule: "Reprogrammer",
      cancel: "Annuler",
      viewDetails: "Voir détails",
      downloadConvocation: "Télécharger convocation",
      downloadResult: "Télécharger résultat",
      payFee: "Payer les frais",
      addNotes: "Ajouter notes",
      editResult: "Modifier résultat",
      markPassed: "Marquer réussi",
      markFailed: "Marquer échoué",
      markNoShow: "Marquer absent",
    },
    messages: {
      bookingSuccess: "Examen réservé avec succès",
      bookingError: "Erreur lors de la réservation",
      cancelSuccess: "Examen annulé avec succès",
      cancelError: "Erreur lors de l'annulation",
      rescheduleSuccess: "Examen reprogrammé avec succès",
      rescheduleError: "Erreur lors de la reprogrammation",
      resultSaved: "Résultat enregistré avec succès",
      resultError: "Erreur lors de l'enregistrement",
      documentUploaded: "Document importé avec succès",
      documentError: "Erreur lors de l'import",
    },
    validation: {
      studentRequired: "Élève requis",
      typeRequired: "Type requis",
      categoryRequired: "Catégorie requise",
      dateRequired: "Date requise",
      timeRequired: "Heure requise",
      centerRequired: "Centre requis",
      instructorRequired: "Moniteur requis",
      vehicleRequired: "Véhicule requis",
      feeRequired: "Frais requis",
    },
  },
  de: {
    nav: {
      exams: "Prüfungen",
      examsList: "Prüfungsliste",
      bookExam: "Prüfung buchen",
      mockExams: "Probeprüfungen",
    },
    types: {
      theory: "Theoretisch",
      practical: "Praktisch",
      first_aid: "Erste Hilfe",
      awareness: "Sensibilisierung",
    },
    status: {
      scheduled: "Geplant",
      in_progress: "In Bearbeitung",
      completed: "Abgeschlossen",
      passed: "Bestanden",
      failed: "Nicht bestanden",
      cancelled: "Abgesagt",
      no_show: "Nicht erschienen",
    },
    list: {
      title: "Prüfungsverwaltung",
      description: "Verwalten Sie alle theoretischen und praktischen Prüfungen",
      search: "Prüfung suchen...",
      filters: "Filter",
      allTypes: "Alle Typen",
      allStatuses: "Alle Status",
      allCategories: "Alle Kategorien",
      dateRange: "Zeitraum",
      paidOnly: "Nur bezahlt",
      unpaidOnly: "Nur unbezahlt",
      export: "Exportieren",
      refresh: "Aktualisieren",
    },
    stats: {
      total: "Gesamt",
      scheduled: "Geplant",
      completed: "Abgeschlossen",
      passed: "Bestanden",
      failed: "Nicht bestanden",
      cancelled: "Abgesagt",
      noShow: "Nicht erschienen",
      successRate: "Erfolgsquote",
      averageScore: "Durchschnittliche Punktzahl",
      averageAttempts: "Durchschnittliche Versuche",
    },
    detail: {
      title: "Prüfungsdetails",
      information: "Informationen",
      student: "Schüler",
      scheduling: "Planung",
      location: "Ort",
      examiner: "Prüfer",
      instructor: "Fahrlehrer",
      vehicle: "Fahrzeug",
      result: "Ergebnis",
      documents: "Dokumente",
      history: "Verlauf",
      notes: "Notizen",
      actions: "Aktionen",
    },
    result: {
      score: "Punktzahl",
      totalQuestions: "Gesamtfragen",
      correctAnswers: "Richtige Antworten",
      passingScore: "Erforderliche Punktzahl",
      themeResults: "Ergebnisse nach Thema",
      evaluatorNotes: "Prüfernotizen",
      weakPoints: "Schwachstellen",
      strongPoints: "Stärken",
      passed: "Bestanden",
      failed: "Nicht bestanden",
    },
    booking: {
      title: "Prüfung buchen",
      description: "Planen Sie eine neue Prüfung für einen Schüler",
      step1: "Schüler und Typ",
      step2: "Datum und Ort",
      step3: "Details",
      step4: "Bestätigung",
      selectStudent: "Schüler auswählen",
      selectType: "Prüfungstyp",
      selectCategory: "Kategorie",
      selectDate: "Datum",
      selectTime: "Uhrzeit",
      selectCenter: "Prüfungszentrum",
      selectInstructor: "Fahrlehrer (optional)",
      selectVehicle: "Fahrzeug (optional)",
      review: "Überprüfen",
      confirm: "Buchung bestätigen",
      success: "Prüfung erfolgreich gebucht",
      error: "Fehler bei der Buchung",
    },
    mock: {
      title: "Probeprüfungen",
      description: "Organisieren und verfolgen Sie Probeprüfungen",
      schedule: "Planen",
      history: "Verlauf",
      statistics: "Statistiken",
      createMock: "Probeprüfung erstellen",
      viewResults: "Ergebnisse anzeigen",
      compareResults: "Ergebnisse vergleichen",
      recommendations: "Empfehlungen",
    },
    documents: {
      convocation: "Aufgebot",
      result: "Ergebnis",
      certificate: "Zertifikat",
      invoice: "Rechnung",
      download: "Herunterladen",
      upload: "Hochladen",
      delete: "Löschen",
    },
    actions: {
      book: "Buchen",
      reschedule: "Umplanen",
      cancel: "Abbrechen",
      viewDetails: "Details anzeigen",
      downloadConvocation: "Aufgebot herunterladen",
      downloadResult: "Ergebnis herunterladen",
      payFee: "Gebühr bezahlen",
      addNotes: "Notizen hinzufügen",
      editResult: "Ergebnis bearbeiten",
      markPassed: "Als bestanden markieren",
      markFailed: "Als nicht bestanden markieren",
      markNoShow: "Als nicht erschienen markieren",
    },
    messages: {
      bookingSuccess: "Prüfung erfolgreich gebucht",
      bookingError: "Fehler bei der Buchung",
      cancelSuccess: "Prüfung erfolgreich abgesagt",
      cancelError: "Fehler beim Absagen",
      rescheduleSuccess: "Prüfung erfolgreich umgeplant",
      rescheduleError: "Fehler beim Umplanen",
      resultSaved: "Ergebnis erfolgreich gespeichert",
      resultError: "Fehler beim Speichern",
      documentUploaded: "Dokument erfolgreich hochgeladen",
      documentError: "Fehler beim Hochladen",
    },
    validation: {
      studentRequired: "Schüler erforderlich",
      typeRequired: "Typ erforderlich",
      categoryRequired: "Kategorie erforderlich",
      dateRequired: "Datum erforderlich",
      timeRequired: "Uhrzeit erforderlich",
      centerRequired: "Zentrum erforderlich",
      instructorRequired: "Fahrlehrer erforderlich",
      vehicleRequired: "Fahrzeug erforderlich",
      feeRequired: "Gebühr erforderlich",
    },
  },
  it: {
    nav: {
      exams: "Esami",
      examsList: "Elenco esami",
      bookExam: "Prenota esame",
      mockExams: "Esami simulati",
    },
    types: {
      theory: "Teorico",
      practical: "Pratico",
      first_aid: "Primo soccorso",
      awareness: "Sensibilizzazione",
    },
    status: {
      scheduled: "Pianificato",
      in_progress: "In corso",
      completed: "Completato",
      passed: "Superato",
      failed: "Non superato",
      cancelled: "Annullato",
      no_show: "Assente",
    },
    list: {
      title: "Gestione Esami",
      description: "Gestisci tutti gli esami teorici e pratici",
      search: "Cerca esame...",
      filters: "Filtri",
      allTypes: "Tutti i tipi",
      allStatuses: "Tutti gli stati",
      allCategories: "Tutte le categorie",
      dateRange: "Periodo",
      paidOnly: "Solo pagati",
      unpaidOnly: "Solo non pagati",
      export: "Esporta",
      refresh: "Aggiorna",
    },
    stats: {
      total: "Totale",
      scheduled: "Pianificati",
      completed: "Completati",
      passed: "Superati",
      failed: "Non superati",
      cancelled: "Annullati",
      noShow: "Assenti",
      successRate: "Tasso di successo",
      averageScore: "Punteggio medio",
      averageAttempts: "Tentativi medi",
    },
    detail: {
      title: "Dettaglio Esame",
      information: "Informazioni",
      student: "Allievo",
      scheduling: "Pianificazione",
      location: "Luogo",
      examiner: "Esaminatore",
      instructor: "Istruttore",
      vehicle: "Veicolo",
      result: "Risultato",
      documents: "Documenti",
      history: "Cronologia",
      notes: "Note",
      actions: "Azioni",
    },
    result: {
      score: "Punteggio",
      totalQuestions: "Domande totali",
      correctAnswers: "Risposte corrette",
      passingScore: "Punteggio richiesto",
      themeResults: "Risultati per tema",
      evaluatorNotes: "Note dell'esaminatore",
      weakPoints: "Punti deboli",
      strongPoints: "Punti forti",
      passed: "Superato",
      failed: "Non superato",
    },
    booking: {
      title: "Prenota Esame",
      description: "Pianifica un nuovo esame per un allievo",
      step1: "Allievo e Tipo",
      step2: "Data e Luogo",
      step3: "Dettagli",
      step4: "Conferma",
      selectStudent: "Seleziona allievo",
      selectType: "Tipo di esame",
      selectCategory: "Categoria",
      selectDate: "Data",
      selectTime: "Ora",
      selectCenter: "Centro d'esame",
      selectInstructor: "Istruttore (opzionale)",
      selectVehicle: "Veicolo (opzionale)",
      review: "Verifica",
      confirm: "Conferma prenotazione",
      success: "Esame prenotato con successo",
      error: "Errore durante la prenotazione",
    },
    mock: {
      title: "Esami Simulati",
      description: "Organizza e monitora gli esami simulati",
      schedule: "Pianifica",
      history: "Cronologia",
      statistics: "Statistiche",
      createMock: "Crea esame simulato",
      viewResults: "Visualizza risultati",
      compareResults: "Confronta risultati",
      recommendations: "Raccomandazioni",
    },
    documents: {
      convocation: "Convocazione",
      result: "Risultato",
      certificate: "Certificato",
      invoice: "Fattura",
      download: "Scarica",
      upload: "Carica",
      delete: "Elimina",
    },
    actions: {
      book: "Prenota",
      reschedule: "Riprogramma",
      cancel: "Annulla",
      viewDetails: "Visualizza dettagli",
      downloadConvocation: "Scarica convocazione",
      downloadResult: "Scarica risultato",
      payFee: "Paga tassa",
      addNotes: "Aggiungi note",
      editResult: "Modifica risultato",
      markPassed: "Segna come superato",
      markFailed: "Segna come non superato",
      markNoShow: "Segna come assente",
    },
    messages: {
      bookingSuccess: "Esame prenotato con successo",
      bookingError: "Errore durante la prenotazione",
      cancelSuccess: "Esame annullato con successo",
      cancelError: "Errore durante l'annullamento",
      rescheduleSuccess: "Esame riprogrammato con successo",
      rescheduleError: "Errore durante la riprogrammazione",
      resultSaved: "Risultato salvato con successo",
      resultError: "Errore durante il salvataggio",
      documentUploaded: "Documento caricato con successo",
      documentError: "Errore durante il caricamento",
    },
    validation: {
      studentRequired: "Allievo obbligatorio",
      typeRequired: "Tipo obbligatorio",
      categoryRequired: "Categoria obbligatoria",
      dateRequired: "Data obbligatoria",
      timeRequired: "Ora obbligatoria",
      centerRequired: "Centro obbligatorio",
      instructorRequired: "Istruttore obbligatorio",
      vehicleRequired: "Veicolo obbligatorio",
      feeRequired: "Tassa obbligatoria",
    },
  },
  en: {
    nav: {
      exams: "Exams",
      examsList: "Exams list",
      bookExam: "Book exam",
      mockExams: "Mock exams",
    },
    types: {
      theory: "Theory",
      practical: "Practical",
      first_aid: "First aid",
      awareness: "Awareness",
    },
    status: {
      scheduled: "Scheduled",
      in_progress: "In progress",
      completed: "Completed",
      passed: "Passed",
      failed: "Failed",
      cancelled: "Cancelled",
      no_show: "No show",
    },
    list: {
      title: "Exams Management",
      description: "Manage all theory and practical exams",
      search: "Search exam...",
      filters: "Filters",
      allTypes: "All types",
      allStatuses: "All statuses",
      allCategories: "All categories",
      dateRange: "Date range",
      paidOnly: "Paid only",
      unpaidOnly: "Unpaid only",
      export: "Export",
      refresh: "Refresh",
    },
    stats: {
      total: "Total",
      scheduled: "Scheduled",
      completed: "Completed",
      passed: "Passed",
      failed: "Failed",
      cancelled: "Cancelled",
      noShow: "No show",
      successRate: "Success rate",
      averageScore: "Average score",
      averageAttempts: "Average attempts",
    },
    detail: {
      title: "Exam Details",
      information: "Information",
      student: "Student",
      scheduling: "Scheduling",
      location: "Location",
      examiner: "Examiner",
      instructor: "Instructor",
      vehicle: "Vehicle",
      result: "Result",
      documents: "Documents",
      history: "History",
      notes: "Notes",
      actions: "Actions",
    },
    result: {
      score: "Score",
      totalQuestions: "Total questions",
      correctAnswers: "Correct answers",
      passingScore: "Passing score",
      themeResults: "Results by theme",
      evaluatorNotes: "Evaluator notes",
      weakPoints: "Weak points",
      strongPoints: "Strong points",
      passed: "Passed",
      failed: "Failed",
    },
    booking: {
      title: "Book Exam",
      description: "Schedule a new exam for a student",
      step1: "Student & Type",
      step2: "Date & Location",
      step3: "Details",
      step4: "Confirmation",
      selectStudent: "Select student",
      selectType: "Exam type",
      selectCategory: "Category",
      selectDate: "Date",
      selectTime: "Time",
      selectCenter: "Exam center",
      selectInstructor: "Instructor (optional)",
      selectVehicle: "Vehicle (optional)",
      review: "Review",
      confirm: "Confirm booking",
      success: "Exam booked successfully",
      error: "Booking error",
    },
    mock: {
      title: "Mock Exams",
      description: "Organize and track mock exams",
      schedule: "Schedule",
      history: "History",
      statistics: "Statistics",
      createMock: "Create mock exam",
      viewResults: "View results",
      compareResults: "Compare results",
      recommendations: "Recommendations",
    },
    documents: {
      convocation: "Convocation",
      result: "Result",
      certificate: "Certificate",
      invoice: "Invoice",
      download: "Download",
      upload: "Upload",
      delete: "Delete",
    },
    actions: {
      book: "Book",
      reschedule: "Reschedule",
      cancel: "Cancel",
      viewDetails: "View details",
      downloadConvocation: "Download convocation",
      downloadResult: "Download result",
      payFee: "Pay fee",
      addNotes: "Add notes",
      editResult: "Edit result",
      markPassed: "Mark as passed",
      markFailed: "Mark as failed",
      markNoShow: "Mark as no show",
    },
    messages: {
      bookingSuccess: "Exam booked successfully",
      bookingError: "Booking error",
      cancelSuccess: "Exam cancelled successfully",
      cancelError: "Cancellation error",
      rescheduleSuccess: "Exam rescheduled successfully",
      rescheduleError: "Rescheduling error",
      resultSaved: "Result saved successfully",
      resultError: "Save error",
      documentUploaded: "Document uploaded successfully",
      documentError: "Upload error",
    },
    validation: {
      studentRequired: "Student required",
      typeRequired: "Type required",
      categoryRequired: "Category required",
      dateRequired: "Date required",
      timeRequired: "Time required",
      centerRequired: "Center required",
      instructorRequired: "Instructor required",
      vehicleRequired: "Vehicle required",
      feeRequired: "Fee required",
    },
  },
};
