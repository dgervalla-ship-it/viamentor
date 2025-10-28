/**
 * VIAMENTOR - Lessons i18n
 * Traductions FR/DE/IT/EN pour module Lessons
 */

export type LessonsLocale = "fr" | "de" | "it" | "en";

export interface LessonsTranslations {
  // Status
  status: {
    scheduled: string;
    in_progress: string;
    completed: string;
    canceled: string;
  };

  // Types
  types: {
    practical: string;
    theory: string;
    exam: string;
    evaluation: string;
  };

  // Event Card
  eventCard: {
    duration: string;
    minutes: string;
  };

  // Popover Details
  details: {
    title: string;
    date: string;
    time: string;
    duration: string;
    category: string;
    instructor: string;
    vehicle: string;
    meetingPoint: string;
    notes: string;
    price: string;
    paid: string;
    unpaid: string;
    completionNotes: string;
    instructorRating: string;
  };

  // Actions
  actions: {
    title: string;
    edit: string;
    cancel: string;
    markCompleted: string;
    contactStudent: string;
    viewStudent: string;
    print: string;
    close: string;
  };

  // Cancel Dialog
  cancelDialog: {
    title: string;
    description: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    reasonError: string;
    notifyStudent: string;
    notifyInstructor: string;
    reschedule: string;
    newDate: string;
    confirm: string;
    cancel: string;
    success: string;
    error: string;
  };

  // Complete Dialog
  completeDialog: {
    title: string;
    description: string;
    effectiveDate: string;
    effectiveTime: string;
    startTime: string;
    endTime: string;
    notes: string;
    notesPlaceholder: string;
    rating: string;
    ratingLabel: string;
    confirm: string;
    cancel: string;
    success: string;
    error: string;
  };

  // History
  history: {
    title: string;
    created: string;
    scheduled: string;
    confirmed: string;
    started: string;
    completed: string;
    canceled: string;
    rescheduled: string;
    by: string;
    adminNotes: string;
    adminNotesPlaceholder: string;
  };

  // Drag & Drop
  dragDrop: {
    confirmTitle: string;
    confirmDescription: string;
    notify: string;
    confirm: string;
    cancel: string;
    success: string;
    error: string;
  };

  // Resize
  resize: {
    confirmTitle: string;
    confirmDescription: string;
    newDuration: string;
    priceAdjust: string;
    confirm: string;
    cancel: string;
    success: string;
    error: string;
  };

  // Cancel Reasons
  cancelReasons: {
    student_unavailable: string;
    instructor_sick: string;
    vehicle_breakdown: string;
    weather: string;
    student_request: string;
    administrative: string;
    other: string;
  };

  // Toast Messages
  toast: {
    lessonUpdated: string;
    lessonCanceled: string;
    lessonCompleted: string;
    lessonRescheduled: string;
    emailSent: string;
    pdfGenerated: string;
  };
}

export const LESSONS_TRANSLATIONS: Record<LessonsLocale, LessonsTranslations> =
  {
    fr: {
      status: {
        scheduled: "Planifiée",
        in_progress: "En cours",
        completed: "Terminée",
        canceled: "Annulée",
      },
      types: {
        practical: "Pratique",
        theory: "Théorie",
        exam: "Examen",
        evaluation: "Évaluation",
      },
      eventCard: {
        duration: "Durée",
        minutes: "min",
      },
      details: {
        title: "Détails de la leçon",
        date: "Date",
        time: "Horaire",
        duration: "Durée",
        category: "Catégorie",
        instructor: "Moniteur",
        vehicle: "Véhicule",
        meetingPoint: "Point de RDV",
        notes: "Notes",
        price: "Prix",
        paid: "Payé",
        unpaid: "Non payé",
        completionNotes: "Commentaire de fin",
        instructorRating: "Évaluation moniteur",
      },
      actions: {
        title: "Actions",
        edit: "Modifier",
        cancel: "Annuler la leçon",
        markCompleted: "Marquer terminée",
        contactStudent: "Contacter l'élève",
        viewStudent: "Voir la fiche élève",
        print: "Imprimer",
        close: "Fermer",
      },
      cancelDialog: {
        title: "Annuler la leçon",
        description: "Veuillez indiquer la raison de l'annulation",
        reasonLabel: "Raison de l'annulation",
        reasonPlaceholder:
          "Décrivez la raison de l'annulation (minimum 20 caractères)...",
        reasonError: "La raison doit contenir au moins 20 caractères",
        notifyStudent: "Notifier l'élève par email",
        notifyInstructor: "Notifier le moniteur",
        reschedule: "Proposer une nouvelle date",
        newDate: "Nouvelle date proposée",
        confirm: "Confirmer l'annulation",
        cancel: "Annuler",
        success: "Leçon annulée avec succès",
        error: "Erreur lors de l'annulation",
      },
      completeDialog: {
        title: "Marquer la leçon comme terminée",
        description: "Confirmez les détails de la leçon terminée",
        effectiveDate: "Date effective",
        effectiveTime: "Horaire effectif",
        startTime: "Heure de début",
        endTime: "Heure de fin",
        notes: "Commentaire de fin",
        notesPlaceholder: "Commentaire sur la leçon (optionnel)...",
        rating: "Évaluation du moniteur",
        ratingLabel: "Note",
        confirm: "Valider",
        cancel: "Annuler",
        success: "Leçon marquée comme terminée",
        error: "Erreur lors de la validation",
      },
      history: {
        title: "Historique",
        created: "Créée",
        scheduled: "Planifiée",
        confirmed: "Confirmée",
        started: "Démarrée",
        completed: "Terminée",
        canceled: "Annulée",
        rescheduled: "Reportée",
        by: "par",
        adminNotes: "Notes administratives",
        adminNotesPlaceholder: "Ajouter des notes internes...",
      },
      dragDrop: {
        confirmTitle: "Déplacer la leçon",
        confirmDescription:
          "Voulez-vous déplacer cette leçon vers la nouvelle date/heure ?",
        notify: "Notifier les participants",
        confirm: "Confirmer",
        cancel: "Annuler",
        success: "Leçon déplacée avec succès",
        error: "Erreur lors du déplacement",
      },
      resize: {
        confirmTitle: "Modifier la durée",
        confirmDescription: "Voulez-vous modifier la durée de cette leçon ?",
        newDuration: "Nouvelle durée",
        priceAdjust: "Ajustement du prix",
        confirm: "Confirmer",
        cancel: "Annuler",
        success: "Durée modifiée avec succès",
        error: "Erreur lors de la modification",
      },
      cancelReasons: {
        student_unavailable: "Élève indisponible",
        instructor_sick: "Moniteur malade",
        vehicle_breakdown: "Panne véhicule",
        weather: "Conditions météo défavorables",
        student_request: "Demande de l'élève",
        administrative: "Raison administrative",
        other: "Autre raison",
      },
      toast: {
        lessonUpdated: "Leçon mise à jour",
        lessonCanceled: "Leçon annulée",
        lessonCompleted: "Leçon terminée",
        lessonRescheduled: "Leçon reportée",
        emailSent: "Email envoyé",
        pdfGenerated: "PDF généré",
      },
    },
    de: {
      status: {
        scheduled: "Geplant",
        in_progress: "Im Gang",
        completed: "Abgeschlossen",
        canceled: "Storniert",
      },
      types: {
        practical: "Praktisch",
        theory: "Theorie",
        exam: "Prüfung",
        evaluation: "Bewertung",
      },
      eventCard: {
        duration: "Dauer",
        minutes: "Min",
      },
      details: {
        title: "Lektionsdetails",
        date: "Datum",
        time: "Zeit",
        duration: "Dauer",
        category: "Kategorie",
        instructor: "Fahrlehrer",
        vehicle: "Fahrzeug",
        meetingPoint: "Treffpunkt",
        notes: "Notizen",
        price: "Preis",
        paid: "Bezahlt",
        unpaid: "Unbezahlt",
        completionNotes: "Abschlusskommentar",
        instructorRating: "Bewertung Fahrlehrer",
      },
      actions: {
        title: "Aktionen",
        edit: "Bearbeiten",
        cancel: "Lektion stornieren",
        markCompleted: "Als abgeschlossen markieren",
        contactStudent: "Schüler kontaktieren",
        viewStudent: "Schülerprofil anzeigen",
        print: "Drucken",
        close: "Schließen",
      },
      cancelDialog: {
        title: "Lektion stornieren",
        description: "Bitte geben Sie den Grund für die Stornierung an",
        reasonLabel: "Stornierungsgrund",
        reasonPlaceholder:
          "Beschreiben Sie den Grund (mindestens 20 Zeichen)...",
        reasonError: "Der Grund muss mindestens 20 Zeichen enthalten",
        notifyStudent: "Schüler per E-Mail benachrichtigen",
        notifyInstructor: "Fahrlehrer benachrichtigen",
        reschedule: "Neues Datum vorschlagen",
        newDate: "Vorgeschlagenes neues Datum",
        confirm: "Stornierung bestätigen",
        cancel: "Abbrechen",
        success: "Lektion erfolgreich storniert",
        error: "Fehler beim Stornieren",
      },
      completeDialog: {
        title: "Lektion als abgeschlossen markieren",
        description: "Bestätigen Sie die Details der abgeschlossenen Lektion",
        effectiveDate: "Effektives Datum",
        effectiveTime: "Effektive Zeit",
        startTime: "Startzeit",
        endTime: "Endzeit",
        notes: "Abschlusskommentar",
        notesPlaceholder: "Kommentar zur Lektion (optional)...",
        rating: "Bewertung des Fahrlehrers",
        ratingLabel: "Note",
        confirm: "Bestätigen",
        cancel: "Abbrechen",
        success: "Lektion als abgeschlossen markiert",
        error: "Fehler beim Bestätigen",
      },
      history: {
        title: "Verlauf",
        created: "Erstellt",
        scheduled: "Geplant",
        confirmed: "Bestätigt",
        started: "Gestartet",
        completed: "Abgeschlossen",
        canceled: "Storniert",
        rescheduled: "Verschoben",
        by: "von",
        adminNotes: "Verwaltungsnotizen",
        adminNotesPlaceholder: "Interne Notizen hinzufügen...",
      },
      dragDrop: {
        confirmTitle: "Lektion verschieben",
        confirmDescription:
          "Möchten Sie diese Lektion zum neuen Datum/Zeit verschieben?",
        notify: "Teilnehmer benachrichtigen",
        confirm: "Bestätigen",
        cancel: "Abbrechen",
        success: "Lektion erfolgreich verschoben",
        error: "Fehler beim Verschieben",
      },
      resize: {
        confirmTitle: "Dauer ändern",
        confirmDescription: "Möchten Sie die Dauer dieser Lektion ändern?",
        newDuration: "Neue Dauer",
        priceAdjust: "Preisanpassung",
        confirm: "Bestätigen",
        cancel: "Abbrechen",
        success: "Dauer erfolgreich geändert",
        error: "Fehler beim Ändern",
      },
      cancelReasons: {
        student_unavailable: "Schüler nicht verfügbar",
        instructor_sick: "Fahrlehrer krank",
        vehicle_breakdown: "Fahrzeugpanne",
        weather: "Ungünstige Wetterbedingungen",
        student_request: "Anfrage des Schülers",
        administrative: "Verwaltungsgrund",
        other: "Anderer Grund",
      },
      toast: {
        lessonUpdated: "Lektion aktualisiert",
        lessonCanceled: "Lektion storniert",
        lessonCompleted: "Lektion abgeschlossen",
        lessonRescheduled: "Lektion verschoben",
        emailSent: "E-Mail gesendet",
        pdfGenerated: "PDF generiert",
      },
    },
    it: {
      status: {
        scheduled: "Pianificata",
        in_progress: "In corso",
        completed: "Completata",
        canceled: "Annullata",
      },
      types: {
        practical: "Pratica",
        theory: "Teoria",
        exam: "Esame",
        evaluation: "Valutazione",
      },
      eventCard: {
        duration: "Durata",
        minutes: "min",
      },
      details: {
        title: "Dettagli della lezione",
        date: "Data",
        time: "Orario",
        duration: "Durata",
        category: "Categoria",
        instructor: "Istruttore",
        vehicle: "Veicolo",
        meetingPoint: "Punto d'incontro",
        notes: "Note",
        price: "Prezzo",
        paid: "Pagato",
        unpaid: "Non pagato",
        completionNotes: "Commento finale",
        instructorRating: "Valutazione istruttore",
      },
      actions: {
        title: "Azioni",
        edit: "Modifica",
        cancel: "Annulla lezione",
        markCompleted: "Segna come completata",
        contactStudent: "Contatta studente",
        viewStudent: "Vedi profilo studente",
        print: "Stampa",
        close: "Chiudi",
      },
      cancelDialog: {
        title: "Annulla lezione",
        description: "Indica il motivo dell'annullamento",
        reasonLabel: "Motivo dell'annullamento",
        reasonPlaceholder: "Descrivi il motivo (minimo 20 caratteri)...",
        reasonError: "Il motivo deve contenere almeno 20 caratteri",
        notifyStudent: "Notifica studente via email",
        notifyInstructor: "Notifica istruttore",
        reschedule: "Proponi nuova data",
        newDate: "Nuova data proposta",
        confirm: "Conferma annullamento",
        cancel: "Annulla",
        success: "Lezione annullata con successo",
        error: "Errore durante l'annullamento",
      },
      completeDialog: {
        title: "Segna lezione come completata",
        description: "Conferma i dettagli della lezione completata",
        effectiveDate: "Data effettiva",
        effectiveTime: "Orario effettivo",
        startTime: "Ora di inizio",
        endTime: "Ora di fine",
        notes: "Commento finale",
        notesPlaceholder: "Commento sulla lezione (opzionale)...",
        rating: "Valutazione istruttore",
        ratingLabel: "Voto",
        confirm: "Conferma",
        cancel: "Annulla",
        success: "Lezione segnata come completata",
        error: "Errore durante la conferma",
      },
      history: {
        title: "Cronologia",
        created: "Creata",
        scheduled: "Pianificata",
        confirmed: "Confermata",
        started: "Iniziata",
        completed: "Completata",
        canceled: "Annullata",
        rescheduled: "Riprogrammata",
        by: "da",
        adminNotes: "Note amministrative",
        adminNotesPlaceholder: "Aggiungi note interne...",
      },
      dragDrop: {
        confirmTitle: "Sposta lezione",
        confirmDescription: "Vuoi spostare questa lezione alla nuova data/ora?",
        notify: "Notifica partecipanti",
        confirm: "Conferma",
        cancel: "Annulla",
        success: "Lezione spostata con successo",
        error: "Errore durante lo spostamento",
      },
      resize: {
        confirmTitle: "Modifica durata",
        confirmDescription: "Vuoi modificare la durata di questa lezione?",
        newDuration: "Nuova durata",
        priceAdjust: "Adeguamento prezzo",
        confirm: "Conferma",
        cancel: "Annulla",
        success: "Durata modificata con successo",
        error: "Errore durante la modifica",
      },
      cancelReasons: {
        student_unavailable: "Studente non disponibile",
        instructor_sick: "Istruttore malato",
        vehicle_breakdown: "Guasto veicolo",
        weather: "Condizioni meteo sfavorevoli",
        student_request: "Richiesta studente",
        administrative: "Motivo amministrativo",
        other: "Altro motivo",
      },
      toast: {
        lessonUpdated: "Lezione aggiornata",
        lessonCanceled: "Lezione annullata",
        lessonCompleted: "Lezione completata",
        lessonRescheduled: "Lezione riprogrammata",
        emailSent: "Email inviata",
        pdfGenerated: "PDF generato",
      },
    },
    en: {
      status: {
        scheduled: "Scheduled",
        in_progress: "In Progress",
        completed: "Completed",
        canceled: "Canceled",
      },
      types: {
        practical: "Practical",
        theory: "Theory",
        exam: "Exam",
        evaluation: "Evaluation",
      },
      eventCard: {
        duration: "Duration",
        minutes: "min",
      },
      details: {
        title: "Lesson Details",
        date: "Date",
        time: "Time",
        duration: "Duration",
        category: "Category",
        instructor: "Instructor",
        vehicle: "Vehicle",
        meetingPoint: "Meeting Point",
        notes: "Notes",
        price: "Price",
        paid: "Paid",
        unpaid: "Unpaid",
        completionNotes: "Completion Notes",
        instructorRating: "Instructor Rating",
      },
      actions: {
        title: "Actions",
        edit: "Edit",
        cancel: "Cancel Lesson",
        markCompleted: "Mark Completed",
        contactStudent: "Contact Student",
        viewStudent: "View Student Profile",
        print: "Print",
        close: "Close",
      },
      cancelDialog: {
        title: "Cancel Lesson",
        description: "Please provide a reason for cancellation",
        reasonLabel: "Cancellation Reason",
        reasonPlaceholder: "Describe the reason (minimum 20 characters)...",
        reasonError: "Reason must be at least 20 characters",
        notifyStudent: "Notify student by email",
        notifyInstructor: "Notify instructor",
        reschedule: "Propose new date",
        newDate: "Proposed new date",
        confirm: "Confirm Cancellation",
        cancel: "Cancel",
        success: "Lesson canceled successfully",
        error: "Error canceling lesson",
      },
      completeDialog: {
        title: "Mark Lesson as Completed",
        description: "Confirm the completed lesson details",
        effectiveDate: "Effective Date",
        effectiveTime: "Effective Time",
        startTime: "Start Time",
        endTime: "End Time",
        notes: "Completion Notes",
        notesPlaceholder: "Comment on the lesson (optional)...",
        rating: "Instructor Rating",
        ratingLabel: "Rating",
        confirm: "Confirm",
        cancel: "Cancel",
        success: "Lesson marked as completed",
        error: "Error confirming lesson",
      },
      history: {
        title: "History",
        created: "Created",
        scheduled: "Scheduled",
        confirmed: "Confirmed",
        started: "Started",
        completed: "Completed",
        canceled: "Canceled",
        rescheduled: "Rescheduled",
        by: "by",
        adminNotes: "Admin Notes",
        adminNotesPlaceholder: "Add internal notes...",
      },
      dragDrop: {
        confirmTitle: "Move Lesson",
        confirmDescription:
          "Do you want to move this lesson to the new date/time?",
        notify: "Notify participants",
        confirm: "Confirm",
        cancel: "Cancel",
        success: "Lesson moved successfully",
        error: "Error moving lesson",
      },
      resize: {
        confirmTitle: "Change Duration",
        confirmDescription:
          "Do you want to change the duration of this lesson?",
        newDuration: "New Duration",
        priceAdjust: "Price Adjustment",
        confirm: "Confirm",
        cancel: "Cancel",
        success: "Duration changed successfully",
        error: "Error changing duration",
      },
      cancelReasons: {
        student_unavailable: "Student unavailable",
        instructor_sick: "Instructor sick",
        vehicle_breakdown: "Vehicle breakdown",
        weather: "Unfavorable weather conditions",
        student_request: "Student request",
        administrative: "Administrative reason",
        other: "Other reason",
      },
      toast: {
        lessonUpdated: "Lesson updated",
        lessonCanceled: "Lesson canceled",
        lessonCompleted: "Lesson completed",
        lessonRescheduled: "Lesson rescheduled",
        emailSent: "Email sent",
        pdfGenerated: "PDF generated",
      },
    },
  };

/**
 * Helper: Get translations for locale
 */
export function getLessonsTranslations(
  locale: LessonsLocale = "fr"
): LessonsTranslations {
  return LESSONS_TRANSLATIONS[locale];
}
