/**
 * VIAMENTOR - Student Booking i18n
 * Traductions pour réservation autonome leçons élève
 */

export type BookingLocale = "fr" | "de" | "it" | "en";

export interface BookingTranslations {
  pageTitle: string;
  infoAlert: string;
  balance: { label: string; lessons: string };
  nextLesson: { label: string; on: string; at: string };
  wizard: {
    steps: {
      duration: string;
      dateTime: string;
      location: string;
      confirmation: string;
    };
    navigation: { back: string; next: string; confirm: string };
  };
  step1: {
    title: string;
    singleLesson: { label: string; duration: string };
    doubleLesson: {
      label: string;
      duration: string;
      badge: string;
      discount: string;
    };
    price: string;
    balanceAfter: string;
    objectives: { label: string; placeholder: string };
  };
  step2: {
    title: string;
    selectDate: string;
    selectTime: string;
    refresh: string;
    noSlots: { title: string; description: string };
  };
  step3: {
    title: string;
    types: { school: string; home: string; custom: string };
    notes: { label: string; placeholder: string };
  };
  step4: {
    title: string;
    confirmButton: string;
    loading: string;
    success: { title: string; description: string };
  };
  myLessons: {
    title: string;
    tabs: { upcoming: string; past: string; canceled: string };
    empty: { title: string; action: string };
  };
  common: { loading: string; minutes: string; at: string };
}

export const bookingTranslations: Record<BookingLocale, BookingTranslations> = {
  fr: {
    pageTitle: "Réserver ma leçon",
    infoAlert:
      "Tu peux réserver tes leçons selon les disponibilités de ton moniteur et ton solde restant.",
    balance: { label: "Solde leçons", lessons: "leçons" },
    nextLesson: { label: "Prochaine leçon", on: "le", at: "à" },
    wizard: {
      steps: {
        duration: "Durée",
        dateTime: "Date & Heure",
        location: "Lieu",
        confirmation: "Confirmation",
      },
      navigation: {
        back: "Retour",
        next: "Suivant",
        confirm: "Confirmer réservation",
      },
    },
    step1: {
      title: "Choisis la durée de ta leçon",
      singleLesson: { label: "1 leçon", duration: "45 minutes" },
      doubleLesson: {
        label: "2 leçons",
        duration: "90 minutes",
        badge: "Meilleur rapport",
        discount: "-5%",
      },
      price: "Prix",
      balanceAfter: "Solde après",
      objectives: {
        label: "Objectifs (optionnel)",
        placeholder: "Ex: Pratiquer le stationnement...",
      },
    },
    step2: {
      title: "Choisis la date et l'heure",
      selectDate: "Sélectionne une date",
      selectTime: "Sélectionne un créneau",
      refresh: "Actualiser",
      noSlots: {
        title: "Aucune disponibilité",
        description: "Essaie une autre date",
      },
    },
    step3: {
      title: "Où se retrouver ?",
      types: {
        school: "Auto-école",
        home: "Mon domicile",
        custom: "Autre adresse",
      },
      notes: {
        label: "Notes (optionnel)",
        placeholder: "Ex: Devant le bâtiment rouge...",
      },
    },
    step4: {
      title: "Vérifie ta réservation",
      confirmButton: "Confirmer ma réservation",
      loading: "Réservation...",
      success: {
        title: "Leçon réservée !",
        description: "Tu recevras une confirmation par email.",
      },
    },
    myLessons: {
      title: "Mes leçons",
      tabs: { upcoming: "À venir", past: "Passées", canceled: "Annulées" },
      empty: {
        title: "Aucune leçon trouvée",
        action: "Réserver ma première leçon",
      },
    },
    common: { loading: "Chargement...", minutes: "min", at: "à" },
  },
  de: {
    pageTitle: "Meine Lektion buchen",
    infoAlert: "Du kannst deine Lektionen je nach Verfügbarkeit buchen.",
    balance: { label: "Lektionsguthaben", lessons: "Lektionen" },
    nextLesson: { label: "Nächste Lektion", on: "am", at: "um" },
    wizard: {
      steps: {
        duration: "Dauer",
        dateTime: "Datum & Zeit",
        location: "Ort",
        confirmation: "Bestätigung",
      },
      navigation: {
        back: "Zurück",
        next: "Weiter",
        confirm: "Buchung bestätigen",
      },
    },
    step1: {
      title: "Wähle die Dauer",
      singleLesson: { label: "1 Lektion", duration: "45 Minuten" },
      doubleLesson: {
        label: "2 Lektionen",
        duration: "90 Minuten",
        badge: "Bestes Angebot",
        discount: "-5%",
      },
      price: "Preis",
      balanceAfter: "Guthaben danach",
      objectives: {
        label: "Ziele (optional)",
        placeholder: "Z.B.: Parkieren üben...",
      },
    },
    step2: {
      title: "Wähle Datum und Zeit",
      selectDate: "Datum wählen",
      selectTime: "Zeitfenster wählen",
      refresh: "Aktualisieren",
      noSlots: {
        title: "Keine Verfügbarkeit",
        description: "Versuche ein anderes Datum",
      },
    },
    step3: {
      title: "Wo treffen wir uns?",
      types: {
        school: "Fahrschule",
        home: "Mein Zuhause",
        custom: "Andere Adresse",
      },
      notes: {
        label: "Notizen (optional)",
        placeholder: "Z.B.: Vor dem roten Gebäude...",
      },
    },
    step4: {
      title: "Überprüfe deine Buchung",
      confirmButton: "Buchung bestätigen",
      loading: "Buchung läuft...",
      success: {
        title: "Lektion gebucht!",
        description: "Du erhältst eine Bestätigung per E-Mail.",
      },
    },
    myLessons: {
      title: "Meine Lektionen",
      tabs: {
        upcoming: "Bevorstehend",
        past: "Vergangen",
        canceled: "Storniert",
      },
      empty: {
        title: "Keine Lektionen gefunden",
        action: "Erste Lektion buchen",
      },
    },
    common: { loading: "Laden...", minutes: "Min", at: "um" },
  },
  it: {
    pageTitle: "Prenota la mia lezione",
    infoAlert: "Puoi prenotare le tue lezioni in base alla disponibilità.",
    balance: { label: "Saldo lezioni", lessons: "lezioni" },
    nextLesson: { label: "Prossima lezione", on: "il", at: "alle" },
    wizard: {
      steps: {
        duration: "Durata",
        dateTime: "Data e Ora",
        location: "Luogo",
        confirmation: "Conferma",
      },
      navigation: {
        back: "Indietro",
        next: "Avanti",
        confirm: "Conferma prenotazione",
      },
    },
    step1: {
      title: "Scegli la durata",
      singleLesson: { label: "1 lezione", duration: "45 minuti" },
      doubleLesson: {
        label: "2 lezioni",
        duration: "90 minuti",
        badge: "Miglior rapporto",
        discount: "-5%",
      },
      price: "Prezzo",
      balanceAfter: "Saldo dopo",
      objectives: {
        label: "Obiettivi (opzionale)",
        placeholder: "Es: Praticare il parcheggio...",
      },
    },
    step2: {
      title: "Scegli data e ora",
      selectDate: "Seleziona una data",
      selectTime: "Seleziona un orario",
      refresh: "Aggiorna",
      noSlots: {
        title: "Nessuna disponibilità",
        description: "Prova un'altra data",
      },
    },
    step3: {
      title: "Dove ci incontriamo?",
      types: {
        school: "Scuola guida",
        home: "Il mio domicilio",
        custom: "Altro indirizzo",
      },
      notes: {
        label: "Note (opzionale)",
        placeholder: "Es: Davanti all'edificio rosso...",
      },
    },
    step4: {
      title: "Verifica la prenotazione",
      confirmButton: "Conferma prenotazione",
      loading: "Prenotazione...",
      success: {
        title: "Lezione prenotata!",
        description: "Riceverai una conferma via email.",
      },
    },
    myLessons: {
      title: "Le mie lezioni",
      tabs: { upcoming: "Prossime", past: "Passate", canceled: "Cancellate" },
      empty: {
        title: "Nessuna lezione trovata",
        action: "Prenota la prima lezione",
      },
    },
    common: { loading: "Caricamento...", minutes: "min", at: "alle" },
  },
  en: {
    pageTitle: "Book my lesson",
    infoAlert: "You can book your lessons based on availability.",
    balance: { label: "Lesson balance", lessons: "lessons" },
    nextLesson: { label: "Next lesson", on: "on", at: "at" },
    wizard: {
      steps: {
        duration: "Duration",
        dateTime: "Date & Time",
        location: "Location",
        confirmation: "Confirmation",
      },
      navigation: { back: "Back", next: "Next", confirm: "Confirm booking" },
    },
    step1: {
      title: "Choose duration",
      singleLesson: { label: "1 lesson", duration: "45 minutes" },
      doubleLesson: {
        label: "2 lessons",
        duration: "90 minutes",
        badge: "Best value",
        discount: "-5%",
      },
      price: "Price",
      balanceAfter: "Balance after",
      objectives: {
        label: "Objectives (optional)",
        placeholder: "E.g.: Practice parking...",
      },
    },
    step2: {
      title: "Choose date and time",
      selectDate: "Select a date",
      selectTime: "Select a time slot",
      refresh: "Refresh",
      noSlots: { title: "No availability", description: "Try another date" },
    },
    step3: {
      title: "Where to meet?",
      types: {
        school: "Driving school",
        home: "My home",
        custom: "Other address",
      },
      notes: {
        label: "Notes (optional)",
        placeholder: "E.g.: In front of red building...",
      },
    },
    step4: {
      title: "Review your booking",
      confirmButton: "Confirm booking",
      loading: "Booking...",
      success: {
        title: "Lesson booked!",
        description: "You will receive a confirmation by email.",
      },
    },
    myLessons: {
      title: "My lessons",
      tabs: { upcoming: "Upcoming", past: "Past", canceled: "Canceled" },
      empty: { title: "No lessons found", action: "Book my first lesson" },
    },
    common: { loading: "Loading...", minutes: "min", at: "at" },
  },
};
