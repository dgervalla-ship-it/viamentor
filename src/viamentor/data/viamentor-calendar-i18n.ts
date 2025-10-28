/**
 * VIAMENTOR Calendar i18n
 *
 * Traductions FR/DE/IT/EN pour grille calendrier drag-drop cours collectifs
 */

export type CalendarLocale = "fr" | "de" | "it" | "en";

export interface CalendarTranslations {
  views: {
    month: string;
    week: string;
    day: string;
    agenda: string;
  };
  navigation: {
    today: string;
    previous: string;
    next: string;
  };
  event: {
    participants: string;
    full: string;
    placesLeft: string;
    instructor: string;
    room: string;
    duration: string;
    status: {
      draft: string;
      confirmed: string;
      cancelled: string;
      completed: string;
    };
  };
  dropZone: {
    dropHere: string;
    validSlot: string;
    invalidSlot: string;
  };
  conflicts: {
    roomOccupied: string;
    instructorBusy: string;
    capacityExceeded: string;
    roomCapacityExceeded: string;
    nearCapacity: string;
    roomNotFound: string;
    instructorNotFound: string;
    roomUnavailable: string;
    instructorUnavailable: string;
  };
  suggestions: {
    availableRooms: string;
    availableInstructors: string;
    alternativeTimes: string;
  };
  actions: {
    createLesson: string;
    editLesson: string;
    cancelLesson: string;
    deleteLesson: string;
    viewDetails: string;
    undo: string;
    redo: string;
  };
  toast: {
    lessonCreated: string;
    lessonUpdated: string;
    lessonCancelled: string;
    lessonDeleted: string;
    undoSuccess: string;
    error: string;
  };
  weekDays: {
    short: string[];
    long: string[];
  };
  months: {
    short: string[];
    long: string[];
  };
}

export const calendarTranslations: Record<
  CalendarLocale,
  CalendarTranslations
> = {
  fr: {
    views: {
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      agenda: "Agenda",
    },
    navigation: {
      today: "Aujourd'hui",
      previous: "Précédent",
      next: "Suivant",
    },
    event: {
      participants: "participants",
      full: "COMPLET",
      placesLeft: "places",
      instructor: "Moniteur",
      room: "Salle",
      duration: "Durée",
      status: {
        draft: "Brouillon",
        confirmed: "Confirmé",
        cancelled: "Annulé",
        completed: "Terminé",
      },
    },
    dropZone: {
      dropHere: "Déposer ici",
      validSlot: "Créneau disponible",
      invalidSlot: "Créneau non disponible",
    },
    conflicts: {
      roomOccupied: "Salle occupée",
      instructorBusy: "Moniteur occupé",
      capacityExceeded: "Capacité maximale dépassée",
      roomCapacityExceeded: "Capacité salle dépassée",
      nearCapacity: "Presque complet",
      roomNotFound: "Salle introuvable",
      instructorNotFound: "Moniteur introuvable",
      roomUnavailable: "Salle non disponible",
      instructorUnavailable: "Moniteur non disponible",
    },
    suggestions: {
      availableRooms: "Salles disponibles",
      availableInstructors: "Moniteurs disponibles",
      alternativeTimes: "Horaires alternatifs",
    },
    actions: {
      createLesson: "Créer un cours",
      editLesson: "Modifier le cours",
      cancelLesson: "Annuler le cours",
      deleteLesson: "Supprimer le cours",
      viewDetails: "Voir les détails",
      undo: "Annuler",
      redo: "Rétablir",
    },
    toast: {
      lessonCreated: "Cours créé avec succès",
      lessonUpdated: "Cours mis à jour",
      lessonCancelled: "Cours annulé",
      lessonDeleted: "Cours supprimé",
      undoSuccess: "Action annulée",
      error: "Une erreur est survenue",
    },
    weekDays: {
      short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      long: [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ],
    },
    months: {
      short: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Août",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ],

      long: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
    },
  },
  de: {
    views: {
      month: "Monat",
      week: "Woche",
      day: "Tag",
      agenda: "Agenda",
    },
    navigation: {
      today: "Heute",
      previous: "Zurück",
      next: "Weiter",
    },
    event: {
      participants: "Teilnehmer",
      full: "VOLL",
      placesLeft: "Plätze",
      instructor: "Lehrer",
      room: "Raum",
      duration: "Dauer",
      status: {
        draft: "Entwurf",
        confirmed: "Bestätigt",
        cancelled: "Abgesagt",
        completed: "Abgeschlossen",
      },
    },
    dropZone: {
      dropHere: "Hier ablegen",
      validSlot: "Verfügbarer Zeitraum",
      invalidSlot: "Nicht verfügbar",
    },
    conflicts: {
      roomOccupied: "Raum besetzt",
      instructorBusy: "Lehrer beschäftigt",
      capacityExceeded: "Maximale Kapazität überschritten",
      roomCapacityExceeded: "Raumkapazität überschritten",
      nearCapacity: "Fast voll",
      roomNotFound: "Raum nicht gefunden",
      instructorNotFound: "Lehrer nicht gefunden",
      roomUnavailable: "Raum nicht verfügbar",
      instructorUnavailable: "Lehrer nicht verfügbar",
    },
    suggestions: {
      availableRooms: "Verfügbare Räume",
      availableInstructors: "Verfügbare Lehrer",
      alternativeTimes: "Alternative Zeiten",
    },
    actions: {
      createLesson: "Kurs erstellen",
      editLesson: "Kurs bearbeiten",
      cancelLesson: "Kurs absagen",
      deleteLesson: "Kurs löschen",
      viewDetails: "Details anzeigen",
      undo: "Rückgängig",
      redo: "Wiederholen",
    },
    toast: {
      lessonCreated: "Kurs erfolgreich erstellt",
      lessonUpdated: "Kurs aktualisiert",
      lessonCancelled: "Kurs abgesagt",
      lessonDeleted: "Kurs gelöscht",
      undoSuccess: "Aktion rückgängig gemacht",
      error: "Ein Fehler ist aufgetreten",
    },
    weekDays: {
      short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      long: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ],
    },
    months: {
      short: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],

      long: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
    },
  },
  it: {
    views: {
      month: "Mese",
      week: "Settimana",
      day: "Giorno",
      agenda: "Agenda",
    },
    navigation: {
      today: "Oggi",
      previous: "Precedente",
      next: "Successivo",
    },
    event: {
      participants: "partecipanti",
      full: "COMPLETO",
      placesLeft: "posti",
      instructor: "Istruttore",
      room: "Sala",
      duration: "Durata",
      status: {
        draft: "Bozza",
        confirmed: "Confermato",
        cancelled: "Annullato",
        completed: "Completato",
      },
    },
    dropZone: {
      dropHere: "Rilascia qui",
      validSlot: "Slot disponibile",
      invalidSlot: "Slot non disponibile",
    },
    conflicts: {
      roomOccupied: "Sala occupata",
      instructorBusy: "Istruttore occupato",
      capacityExceeded: "Capacità massima superata",
      roomCapacityExceeded: "Capacità sala superata",
      nearCapacity: "Quasi completo",
      roomNotFound: "Sala non trovata",
      instructorNotFound: "Istruttore non trovato",
      roomUnavailable: "Sala non disponibile",
      instructorUnavailable: "Istruttore non disponibile",
    },
    suggestions: {
      availableRooms: "Sale disponibili",
      availableInstructors: "Istruttori disponibili",
      alternativeTimes: "Orari alternativi",
    },
    actions: {
      createLesson: "Crea corso",
      editLesson: "Modifica corso",
      cancelLesson: "Annulla corso",
      deleteLesson: "Elimina corso",
      viewDetails: "Vedi dettagli",
      undo: "Annulla",
      redo: "Ripeti",
    },
    toast: {
      lessonCreated: "Corso creato con successo",
      lessonUpdated: "Corso aggiornato",
      lessonCancelled: "Corso annullato",
      lessonDeleted: "Corso eliminato",
      undoSuccess: "Azione annullata",
      error: "Si è verificato un errore",
    },
    weekDays: {
      short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      long: [
        "Domenica",
        "Lunedì",
        "Martedì",
        "Mercoledì",
        "Giovedì",
        "Venerdì",
        "Sabato",
      ],
    },
    months: {
      short: [
        "Gen",
        "Feb",
        "Mar",
        "Apr",
        "Mag",
        "Giu",
        "Lug",
        "Ago",
        "Set",
        "Ott",
        "Nov",
        "Dic",
      ],

      long: [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ],
    },
  },
  en: {
    views: {
      month: "Month",
      week: "Week",
      day: "Day",
      agenda: "Agenda",
    },
    navigation: {
      today: "Today",
      previous: "Previous",
      next: "Next",
    },
    event: {
      participants: "participants",
      full: "FULL",
      placesLeft: "places",
      instructor: "Instructor",
      room: "Room",
      duration: "Duration",
      status: {
        draft: "Draft",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
        completed: "Completed",
      },
    },
    dropZone: {
      dropHere: "Drop here",
      validSlot: "Available slot",
      invalidSlot: "Unavailable slot",
    },
    conflicts: {
      roomOccupied: "Room occupied",
      instructorBusy: "Instructor busy",
      capacityExceeded: "Maximum capacity exceeded",
      roomCapacityExceeded: "Room capacity exceeded",
      nearCapacity: "Nearly full",
      roomNotFound: "Room not found",
      instructorNotFound: "Instructor not found",
      roomUnavailable: "Room unavailable",
      instructorUnavailable: "Instructor unavailable",
    },
    suggestions: {
      availableRooms: "Available rooms",
      availableInstructors: "Available instructors",
      alternativeTimes: "Alternative times",
    },
    actions: {
      createLesson: "Create lesson",
      editLesson: "Edit lesson",
      cancelLesson: "Cancel lesson",
      deleteLesson: "Delete lesson",
      viewDetails: "View details",
      undo: "Undo",
      redo: "Redo",
    },
    toast: {
      lessonCreated: "Lesson created successfully",
      lessonUpdated: "Lesson updated",
      lessonCancelled: "Lesson cancelled",
      lessonDeleted: "Lesson deleted",
      undoSuccess: "Action undone",
      error: "An error occurred",
    },
    weekDays: {
      short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      long: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    months: {
      short: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      long: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
  },
};
