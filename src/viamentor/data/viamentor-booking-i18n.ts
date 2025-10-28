/**
 * VIAMENTOR - Booking i18n
 * Traductions FR/DE/IT/EN pour wizard réservation leçon
 */

export type BookingLocale = "fr" | "de" | "it" | "en";

export interface BookingTranslations {
  // Dialog
  dialogTitle: string;
  dialogDescription: string;
  closeConfirm: string;
  closeConfirmMessage: string;

  // Stepper
  steps: {
    student: string;
    instructorVehicle: string;
    dateTime: string;
    summary: string;
  };

  // Navigation
  previous: string;
  next: string;
  book: string;
  cancel: string;
  loading: string;

  // Step 1 - Student
  step1: {
    title: string;
    searchPlaceholder: string;
    noResults: string;
    lessonsBalance: string;
    insufficientBalance: string;
    addLessons: string;
    selectedStudent: string;
    selectCategory: string;
    assignedInstructor: string;
    continue: string;
  };

  // Step 2 - Instructor & Vehicle
  step2: {
    title: string;
    selectInstructor: string;
    selectVehicle: string;
    availability: {
      available: string;
      busy: string;
      absent: string;
    };
    lessonsToday: string;
    rating: string;
    viewPlanning: string;
    assignedInstructor: string;
    notQualified: string;
    allInstructors: string;
    vehicleInfo: string;
    vehicleStatus: {
      available: string;
      inUse: string;
      maintenance: string;
    };
    oacCompliance: string;
  };

  // Step 3 - Date & Time
  step3: {
    title: string;
    selectDate: string;
    selectTime: string;
    availableSlots: string;
    duration: {
      label: string;
      oneLesson: string;
      twoLessons: string;
      recommended: string;
    };
    timeRange: string;
    meetingPoint: {
      label: string;
      school: string;
      studentHome: string;
      other: string;
    };
    notes: {
      label: string;
      placeholder: string;
    };
    emailConfirmation: string;
    slotUnavailable: string;
    instructorBusy: string;
    vehicleReserved: string;
  };

  // Step 4 - Summary
  step4: {
    title: string;
    student: string;
    category: string;
    instructor: string;
    vehicle: string;
    date: string;
    time: string;
    duration: string;
    meetingPoint: string;
    notes: string;
    price: string;
    options: {
      sendEmail: string;
      sendSms: string;
      addCalendar: string;
    };
    terms: string;
    bookLesson: string;
  };

  // Validation
  validation: {
    studentRequired: string;
    categoryRequired: string;
    instructorRequired: string;
    vehicleRequired: string;
    dateRequired: string;
    timeRequired: string;
    meetingPointRequired: string;
    termsRequired: string;
  };

  // Success/Error
  success: string;
  successMessage: string;
  error: string;
  conflictDetected: string;
  suggestAlternatives: string;

  // Formats
  formats: {
    minutes: string;
    chf: string;
  };
}

export const bookingTranslations: Record<BookingLocale, BookingTranslations> = {
  fr: {
    dialogTitle: "Réserver une leçon",
    dialogDescription: "Planifiez une nouvelle leçon pratique en 4 étapes",
    closeConfirm: "Confirmer la fermeture",
    closeConfirmMessage:
      "Voulez-vous vraiment annuler la réservation en cours ?",

    steps: {
      student: "Élève",
      instructorVehicle: "Moniteur & Véhicule",
      dateTime: "Date & Horaire",
      summary: "Récapitulatif",
    },

    previous: "Précédent",
    next: "Suivant",
    book: "Réserver",
    cancel: "Annuler",
    loading: "Création...",

    step1: {
      title: "Choisir l'élève",
      searchPlaceholder: "Rechercher un élève...",
      noResults: "Aucun élève trouvé",
      lessonsBalance: "Solde leçons",
      insufficientBalance: "Solde leçons insuffisant",
      addLessons: "Ajouter des leçons",
      selectedStudent: "Élève sélectionné",
      selectCategory: "Sélectionner la catégorie",
      assignedInstructor: "Moniteur habituel",
      continue: "Continuer",
    },

    step2: {
      title: "Moniteur et véhicule",
      selectInstructor: "Sélectionner un moniteur",
      selectVehicle: "Sélectionner un véhicule",
      availability: {
        available: "Disponible",
        busy: "Occupé",
        absent: "Absent",
      },
      lessonsToday: "leçons aujourd'hui",
      rating: "Note",
      viewPlanning: "Voir planning",
      assignedInstructor: "Moniteur habituel",
      notQualified: "Non habilité catégorie",
      allInstructors: "Tous les moniteurs",
      vehicleInfo: "Informations véhicule",
      vehicleStatus: {
        available: "Disponible",
        inUse: "En leçon",
        maintenance: "Maintenance",
      },
      oacCompliance: "Véhicule doit avoir équipements auto-école OAC Art. 65",
    },

    step3: {
      title: "Planifier la leçon",
      selectDate: "Sélectionner la date",
      selectTime: "Sélectionner l'horaire",
      availableSlots: "Créneaux disponibles",
      duration: {
        label: "Durée",
        oneLesson: "1 leçon (45 min)",
        twoLessons: "2 leçons (90 min)",
        recommended: "Recommandé",
      },
      timeRange: "Horaire",
      meetingPoint: {
        label: "Point de rendez-vous",
        school: "Auto-école",
        studentHome: "Domicile élève",
        other: "Autre adresse",
      },
      notes: {
        label: "Notes de leçon",
        placeholder: "Objectifs de la leçon, thèmes à aborder...",
      },
      emailConfirmation: "L'élève recevra un email de confirmation automatique",
      slotUnavailable: "Créneau non disponible",
      instructorBusy: "Moniteur occupé",
      vehicleReserved: "Véhicule réservé",
    },

    step4: {
      title: "Confirmer la réservation",
      student: "Élève",
      category: "Catégorie",
      instructor: "Moniteur",
      vehicle: "Véhicule",
      date: "Date",
      time: "Horaire",
      duration: "Durée",
      meetingPoint: "Point de rendez-vous",
      notes: "Notes",
      price: "Prix",
      options: {
        sendEmail: "Envoyer email de confirmation à l'élève",
        sendSms: "Envoyer SMS de rappel 24h avant",
        addCalendar: "Ajouter au calendrier Google",
      },
      terms: "J'accepte les conditions de réservation",
      bookLesson: "Réserver la leçon",
    },

    validation: {
      studentRequired: "Veuillez sélectionner un élève",
      categoryRequired: "Veuillez sélectionner une catégorie",
      instructorRequired: "Veuillez sélectionner un moniteur",
      vehicleRequired: "Veuillez sélectionner un véhicule",
      dateRequired: "Veuillez sélectionner une date",
      timeRequired: "Veuillez sélectionner un horaire",
      meetingPointRequired: "Veuillez indiquer le point de rendez-vous",
      termsRequired: "Vous devez accepter les conditions",
    },

    success: "Succès",
    successMessage: "Leçon réservée pour {student} !",
    error: "Erreur",
    conflictDetected: "Créneau plus disponible",
    suggestAlternatives: "Créneaux alternatifs disponibles :",

    formats: {
      minutes: "min",
      chf: "CHF",
    },
  },

  de: {
    dialogTitle: "Lektion buchen",
    dialogDescription: "Planen Sie eine neue praktische Lektion in 4 Schritten",
    closeConfirm: "Schließen bestätigen",
    closeConfirmMessage: "Möchten Sie die laufende Buchung wirklich abbrechen?",

    steps: {
      student: "Schüler",
      instructorVehicle: "Lehrer & Fahrzeug",
      dateTime: "Datum & Uhrzeit",
      summary: "Zusammenfassung",
    },

    previous: "Zurück",
    next: "Weiter",
    book: "Buchen",
    cancel: "Abbrechen",
    loading: "Erstellen...",

    step1: {
      title: "Schüler wählen",
      searchPlaceholder: "Schüler suchen...",
      noResults: "Keine Schüler gefunden",
      lessonsBalance: "Lektionsguthaben",
      insufficientBalance: "Unzureichendes Lektionsguthaben",
      addLessons: "Lektionen hinzufügen",
      selectedStudent: "Ausgewählter Schüler",
      selectCategory: "Kategorie wählen",
      assignedInstructor: "Stammlehrer",
      continue: "Weiter",
    },

    step2: {
      title: "Lehrer und Fahrzeug",
      selectInstructor: "Lehrer wählen",
      selectVehicle: "Fahrzeug wählen",
      availability: {
        available: "Verfügbar",
        busy: "Beschäftigt",
        absent: "Abwesend",
      },
      lessonsToday: "Lektionen heute",
      rating: "Bewertung",
      viewPlanning: "Planung ansehen",
      assignedInstructor: "Stammlehrer",
      notQualified: "Nicht qualifiziert Kategorie",
      allInstructors: "Alle Lehrer",
      vehicleInfo: "Fahrzeuginformationen",
      vehicleStatus: {
        available: "Verfügbar",
        inUse: "In Lektion",
        maintenance: "Wartung",
      },
      oacCompliance: "Fahrzeug muss Fahrschulausrüstung OAC Art. 65 haben",
    },

    step3: {
      title: "Lektion planen",
      selectDate: "Datum wählen",
      selectTime: "Uhrzeit wählen",
      availableSlots: "Verfügbare Zeitfenster",
      duration: {
        label: "Dauer",
        oneLesson: "1 Lektion (45 Min.)",
        twoLessons: "2 Lektionen (90 Min.)",
        recommended: "Empfohlen",
      },
      timeRange: "Uhrzeit",
      meetingPoint: {
        label: "Treffpunkt",
        school: "Fahrschule",
        studentHome: "Schüler Zuhause",
        other: "Andere Adresse",
      },
      notes: {
        label: "Lektionsnotizen",
        placeholder: "Lektionsziele, zu behandelnde Themen...",
      },
      emailConfirmation:
        "Der Schüler erhält automatisch eine Bestätigungs-E-Mail",
      slotUnavailable: "Zeitfenster nicht verfügbar",
      instructorBusy: "Lehrer beschäftigt",
      vehicleReserved: "Fahrzeug reserviert",
    },

    step4: {
      title: "Buchung bestätigen",
      student: "Schüler",
      category: "Kategorie",
      instructor: "Lehrer",
      vehicle: "Fahrzeug",
      date: "Datum",
      time: "Uhrzeit",
      duration: "Dauer",
      meetingPoint: "Treffpunkt",
      notes: "Notizen",
      price: "Preis",
      options: {
        sendEmail: "Bestätigungs-E-Mail an Schüler senden",
        sendSms: "Erinnerungs-SMS 24h vorher senden",
        addCalendar: "Zu Google Kalender hinzufügen",
      },
      terms: "Ich akzeptiere die Buchungsbedingungen",
      bookLesson: "Lektion buchen",
    },

    validation: {
      studentRequired: "Bitte wählen Sie einen Schüler",
      categoryRequired: "Bitte wählen Sie eine Kategorie",
      instructorRequired: "Bitte wählen Sie einen Lehrer",
      vehicleRequired: "Bitte wählen Sie ein Fahrzeug",
      dateRequired: "Bitte wählen Sie ein Datum",
      timeRequired: "Bitte wählen Sie eine Uhrzeit",
      meetingPointRequired: "Bitte geben Sie den Treffpunkt an",
      termsRequired: "Sie müssen die Bedingungen akzeptieren",
    },

    success: "Erfolg",
    successMessage: "Lektion für {student} gebucht!",
    error: "Fehler",
    conflictDetected: "Zeitfenster nicht mehr verfügbar",
    suggestAlternatives: "Alternative Zeitfenster verfügbar:",

    formats: {
      minutes: "Min.",
      chf: "CHF",
    },
  },

  it: {
    dialogTitle: "Prenotare una lezione",
    dialogDescription: "Pianifica una nuova lezione pratica in 4 passaggi",
    closeConfirm: "Conferma chiusura",
    closeConfirmMessage: "Vuoi davvero annullare la prenotazione in corso?",

    steps: {
      student: "Allievo",
      instructorVehicle: "Istruttore & Veicolo",
      dateTime: "Data & Orario",
      summary: "Riepilogo",
    },

    previous: "Precedente",
    next: "Successivo",
    book: "Prenota",
    cancel: "Annulla",
    loading: "Creazione...",

    step1: {
      title: "Scegliere l'allievo",
      searchPlaceholder: "Cerca un allievo...",
      noResults: "Nessun allievo trovato",
      lessonsBalance: "Saldo lezioni",
      insufficientBalance: "Saldo lezioni insufficiente",
      addLessons: "Aggiungi lezioni",
      selectedStudent: "Allievo selezionato",
      selectCategory: "Seleziona categoria",
      assignedInstructor: "Istruttore abituale",
      continue: "Continua",
    },

    step2: {
      title: "Istruttore e veicolo",
      selectInstructor: "Seleziona istruttore",
      selectVehicle: "Seleziona veicolo",
      availability: {
        available: "Disponibile",
        busy: "Occupato",
        absent: "Assente",
      },
      lessonsToday: "lezioni oggi",
      rating: "Valutazione",
      viewPlanning: "Vedi pianificazione",
      assignedInstructor: "Istruttore abituale",
      notQualified: "Non qualificato categoria",
      allInstructors: "Tutti gli istruttori",
      vehicleInfo: "Informazioni veicolo",
      vehicleStatus: {
        available: "Disponibile",
        inUse: "In lezione",
        maintenance: "Manutenzione",
      },
      oacCompliance:
        "Il veicolo deve avere attrezzature autoscuola OAC Art. 65",
    },

    step3: {
      title: "Pianificare la lezione",
      selectDate: "Seleziona data",
      selectTime: "Seleziona orario",
      availableSlots: "Fasce orarie disponibili",
      duration: {
        label: "Durata",
        oneLesson: "1 lezione (45 min)",
        twoLessons: "2 lezioni (90 min)",
        recommended: "Consigliato",
      },
      timeRange: "Orario",
      meetingPoint: {
        label: "Punto di incontro",
        school: "Autoscuola",
        studentHome: "Domicilio allievo",
        other: "Altro indirizzo",
      },
      notes: {
        label: "Note lezione",
        placeholder: "Obiettivi della lezione, argomenti da trattare...",
      },
      emailConfirmation: "L'allievo riceverà un'email di conferma automatica",
      slotUnavailable: "Fascia oraria non disponibile",
      instructorBusy: "Istruttore occupato",
      vehicleReserved: "Veicolo riservato",
    },

    step4: {
      title: "Confermare la prenotazione",
      student: "Allievo",
      category: "Categoria",
      instructor: "Istruttore",
      vehicle: "Veicolo",
      date: "Data",
      time: "Orario",
      duration: "Durata",
      meetingPoint: "Punto di incontro",
      notes: "Note",
      price: "Prezzo",
      options: {
        sendEmail: "Invia email di conferma all'allievo",
        sendSms: "Invia SMS di promemoria 24h prima",
        addCalendar: "Aggiungi al calendario Google",
      },
      terms: "Accetto le condizioni di prenotazione",
      bookLesson: "Prenota la lezione",
    },

    validation: {
      studentRequired: "Seleziona un allievo",
      categoryRequired: "Seleziona una categoria",
      instructorRequired: "Seleziona un istruttore",
      vehicleRequired: "Seleziona un veicolo",
      dateRequired: "Seleziona una data",
      timeRequired: "Seleziona un orario",
      meetingPointRequired: "Indica il punto di incontro",
      termsRequired: "Devi accettare le condizioni",
    },

    success: "Successo",
    successMessage: "Lezione prenotata per {student}!",
    error: "Errore",
    conflictDetected: "Fascia oraria non più disponibile",
    suggestAlternatives: "Fasce orarie alternative disponibili:",

    formats: {
      minutes: "min",
      chf: "CHF",
    },
  },

  en: {
    dialogTitle: "Book a Lesson",
    dialogDescription: "Schedule a new practical lesson in 4 steps",
    closeConfirm: "Confirm Close",
    closeConfirmMessage:
      "Do you really want to cancel the booking in progress?",

    steps: {
      student: "Student",
      instructorVehicle: "Instructor & Vehicle",
      dateTime: "Date & Time",
      summary: "Summary",
    },

    previous: "Previous",
    next: "Next",
    book: "Book",
    cancel: "Cancel",
    loading: "Creating...",

    step1: {
      title: "Choose Student",
      searchPlaceholder: "Search for a student...",
      noResults: "No students found",
      lessonsBalance: "Lessons Balance",
      insufficientBalance: "Insufficient lessons balance",
      addLessons: "Add Lessons",
      selectedStudent: "Selected Student",
      selectCategory: "Select Category",
      assignedInstructor: "Assigned Instructor",
      continue: "Continue",
    },

    step2: {
      title: "Instructor and Vehicle",
      selectInstructor: "Select Instructor",
      selectVehicle: "Select Vehicle",
      availability: {
        available: "Available",
        busy: "Busy",
        absent: "Absent",
      },
      lessonsToday: "lessons today",
      rating: "Rating",
      viewPlanning: "View Planning",
      assignedInstructor: "Assigned Instructor",
      notQualified: "Not qualified category",
      allInstructors: "All Instructors",
      vehicleInfo: "Vehicle Information",
      vehicleStatus: {
        available: "Available",
        inUse: "In Lesson",
        maintenance: "Maintenance",
      },
      oacCompliance: "Vehicle must have driving school equipment OAC Art. 65",
    },

    step3: {
      title: "Schedule Lesson",
      selectDate: "Select Date",
      selectTime: "Select Time",
      availableSlots: "Available Slots",
      duration: {
        label: "Duration",
        oneLesson: "1 lesson (45 min)",
        twoLessons: "2 lessons (90 min)",
        recommended: "Recommended",
      },
      timeRange: "Time",
      meetingPoint: {
        label: "Meeting Point",
        school: "Driving School",
        studentHome: "Student Home",
        other: "Other Address",
      },
      notes: {
        label: "Lesson Notes",
        placeholder: "Lesson objectives, topics to cover...",
      },
      emailConfirmation: "Student will receive automatic confirmation email",
      slotUnavailable: "Slot unavailable",
      instructorBusy: "Instructor busy",
      vehicleReserved: "Vehicle reserved",
    },

    step4: {
      title: "Confirm Booking",
      student: "Student",
      category: "Category",
      instructor: "Instructor",
      vehicle: "Vehicle",
      date: "Date",
      time: "Time",
      duration: "Duration",
      meetingPoint: "Meeting Point",
      notes: "Notes",
      price: "Price",
      options: {
        sendEmail: "Send confirmation email to student",
        sendSms: "Send SMS reminder 24h before",
        addCalendar: "Add to Google Calendar",
      },
      terms: "I accept the booking terms",
      bookLesson: "Book Lesson",
    },

    validation: {
      studentRequired: "Please select a student",
      categoryRequired: "Please select a category",
      instructorRequired: "Please select an instructor",
      vehicleRequired: "Please select a vehicle",
      dateRequired: "Please select a date",
      timeRequired: "Please select a time",
      meetingPointRequired: "Please indicate the meeting point",
      termsRequired: "You must accept the terms",
    },

    success: "Success",
    successMessage: "Lesson booked for {student}!",
    error: "Error",
    conflictDetected: "Slot no longer available",
    suggestAlternatives: "Alternative slots available:",

    formats: {
      minutes: "min",
      chf: "CHF",
    },
  },
};

export const getBookingTranslations = (
  locale: BookingLocale = "fr"
): BookingTranslations => {
  return bookingTranslations[locale] || bookingTranslations.fr;
};
