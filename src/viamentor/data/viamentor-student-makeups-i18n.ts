/**
 * VIAMENTOR - Student Makeups i18n
 * Traductions interface élève rattrapages
 */

export type StudentMakeupsLocale = "fr" | "de" | "it" | "en";

export const studentMakeupsTranslations: Record<
  StudentMakeupsLocale,
  {
    breadcrumb: {
      dashboard: string;
      makeups: string;
    };
    title: string;
    alert: {
      available: string;
      availablePlural: string;
    };
    table: {
      columns: {
        cancelledDate: string;
        originalLesson: string;
        reason: string;
        createdAt: string;
        expiresIn: string;
        status: string;
        actions: string;
      };
      filters: {
        status: string;
        dateRange: string;
        from: string;
        to: string;
        reset: string;
      };
      sort: {
        expiryAsc: string;
        expiryDesc: string;
        createdAsc: string;
        createdDesc: string;
      };
      empty: {
        title: string;
        description: string;
      };
      actions: {
        book: string;
        booked: string;
        used: string;
        expired: string;
        pending: string;
      };
      tooltips: {
        expired: string;
        used: string;
        pending: string;
      };
    };
    reasons: {
      illness_with_certificate: string;
      family_emergency: string;
      dangerous_weather: string;
      vehicle_breakdown: string;
      professional_impediment: string;
      other_justified: string;
    };
    status: {
      available: string;
      booked: string;
      used: string;
      expired: string;
      pending: string;
    };
    wizard: {
      title: string;
      steps: {
        datetime: string;
        confirmation: string;
      };
      step1: {
        context: {
          title: string;
          cancelledOn: string;
          instructor: string;
          reason: string;
          replaceBy: string;
        };
        datePicker: {
          label: string;
          placeholder: string;
        };
        timePicker: {
          label: string;
          available: string;
          occupied: string;
          selected: string;
        };
        alert: {
          expiryWarning: string;
        };
        continue: string;
      };
      step2: {
        title: string;
        summary: {
          original: string;
          newLesson: string;
          credit: string;
        };
        originalLesson: {
          date: string;
          instructor: string;
          reason: string;
        };
        newLesson: {
          datetime: string;
          instructor: string;
          vehicle: string;
          meetingPoint: string;
        };
        creditInfo: {
          message: string;
          badge: string;
        };
        checkbox: {
          label: string;
        };
        confirm: string;
        confirming: string;
        success: string;
        error: string;
      };
      cancel: string;
      back: string;
    };
    countdown: {
      days: string;
      hours: string;
      minutes: string;
      expired: string;
      in: string;
    };
  }
> = {
  fr: {
    breadcrumb: {
      dashboard: "Tableau de bord",
      makeups: "Mes rattrapages",
    },
    title: "Mes rattrapages",
    alert: {
      available:
        "Vous avez {count} rattrapage disponible - Réservez avant expiration !",
      availablePlural:
        "Vous avez {count} rattrapages disponibles - Réservez avant expiration !",
    },
    table: {
      columns: {
        cancelledDate: "Date annulation",
        originalLesson: "Leçon origine",
        reason: "Raison",
        createdAt: "Créé le",
        expiresIn: "Expire dans",
        status: "Statut",
        actions: "Actions",
      },
      filters: {
        status: "Statut",
        dateRange: "Période",
        from: "Du",
        to: "Au",
        reset: "Réinitialiser",
      },
      sort: {
        expiryAsc: "Expiration (urgent d'abord)",
        expiryDesc: "Expiration (récent d'abord)",
        createdAsc: "Création (ancien d'abord)",
        createdDesc: "Création (récent d'abord)",
      },
      empty: {
        title: "Aucun rattrapage disponible",
        description:
          "Les rattrapages apparaissent lors d'annulations justifiées",
      },
      actions: {
        book: "Réserver",
        booked: "Réservé",
        used: "Utilisé",
        expired: "Expiré",
        pending: "En attente",
      },
      tooltips: {
        expired: "Délai dépassé - crédit expiré",
        used: "Crédit déjà consommé",
        pending: "En attente d'approbation administrateur",
      },
    },
    reasons: {
      illness_with_certificate: "Maladie",
      family_emergency: "Urgence familiale",
      dangerous_weather: "Météo",
      vehicle_breakdown: "Panne",
      professional_impediment: "Empêchement pro",
      other_justified: "Autre",
    },
    status: {
      available: "Disponible",
      booked: "Réservé",
      used: "Utilisé",
      expired: "Expiré",
      pending: "En attente",
    },
    wizard: {
      title: "Réserver un rattrapage",
      steps: {
        datetime: "Date & Heure",
        confirmation: "Confirmation",
      },
      step1: {
        context: {
          title: "Leçon annulée",
          cancelledOn: "Annulée le",
          instructor: "Moniteur",
          reason: "Raison",
          replaceBy: "À remplacer avant le",
        },
        datePicker: {
          label: "Choisir une date",
          placeholder: "Sélectionner...",
        },
        timePicker: {
          label: "Choisir un horaire",
          available: "Disponible",
          occupied: "Occupé",
          selected: "Sélectionné",
        },
        alert: {
          expiryWarning: "⚠️ Attention : expire dans {days} jours",
        },
        continue: "Continuer",
      },
      step2: {
        title: "Confirmer la réservation",
        summary: {
          original: "Leçon origine",
          newLesson: "Nouvelle leçon",
          credit: "Crédit",
        },
        originalLesson: {
          date: "Date",
          instructor: "Moniteur",
          reason: "Raison",
        },
        newLesson: {
          datetime: "Date et heure",
          instructor: "Moniteur",
          vehicle: "Véhicule",
          meetingPoint: "Point de rendez-vous",
        },
        creditInfo: {
          message: "1 crédit rattrapage sera utilisé",
          badge: "Gratuit",
        },
        checkbox: {
          label: "Utiliser le crédit rattrapage",
        },
        confirm: "Confirmer le rattrapage",
        confirming: "Réservation...",
        success: "Rattrapage réservé avec succès !",
        error: "Erreur lors de la réservation",
      },
      cancel: "Annuler",
      back: "Retour",
    },
    countdown: {
      days: "j",
      hours: "h",
      minutes: "min",
      expired: "Expiré",
      in: "Dans",
    },
  },
  de: {
    breadcrumb: {
      dashboard: "Dashboard",
      makeups: "Meine Nachholtermine",
    },
    title: "Meine Nachholtermine",
    alert: {
      available:
        "Sie haben {count} verfügbaren Nachholtermin - Buchen Sie vor Ablauf!",
      availablePlural:
        "Sie haben {count} verfügbare Nachholtermine - Buchen Sie vor Ablauf!",
    },
    table: {
      columns: {
        cancelledDate: "Absagedatum",
        originalLesson: "Ursprungslektion",
        reason: "Grund",
        createdAt: "Erstellt am",
        expiresIn: "Läuft ab in",
        status: "Status",
        actions: "Aktionen",
      },
      filters: {
        status: "Status",
        dateRange: "Zeitraum",
        from: "Von",
        to: "Bis",
        reset: "Zurücksetzen",
      },
      sort: {
        expiryAsc: "Ablauf (dringend zuerst)",
        expiryDesc: "Ablauf (neueste zuerst)",
        createdAsc: "Erstellung (älteste zuerst)",
        createdDesc: "Erstellung (neueste zuerst)",
      },
      empty: {
        title: "Keine Nachholtermine verfügbar",
        description: "Nachholtermine erscheinen bei gerechtfertigten Absagen",
      },
      actions: {
        book: "Buchen",
        booked: "Gebucht",
        used: "Verwendet",
        expired: "Abgelaufen",
        pending: "Ausstehend",
      },
      tooltips: {
        expired: "Frist überschritten - Guthaben abgelaufen",
        used: "Guthaben bereits verbraucht",
        pending: "Wartet auf Administrator-Genehmigung",
      },
    },
    reasons: {
      illness_with_certificate: "Krankheit",
      family_emergency: "Familiennotfall",
      dangerous_weather: "Wetter",
      vehicle_breakdown: "Panne",
      professional_impediment: "Berufl. Verhinderung",
      other_justified: "Andere",
    },
    status: {
      available: "Verfügbar",
      booked: "Gebucht",
      used: "Verwendet",
      expired: "Abgelaufen",
      pending: "Ausstehend",
    },
    wizard: {
      title: "Nachholtermin buchen",
      steps: {
        datetime: "Datum & Uhrzeit",
        confirmation: "Bestätigung",
      },
      step1: {
        context: {
          title: "Abgesagte Lektion",
          cancelledOn: "Abgesagt am",
          instructor: "Fahrlehrer",
          reason: "Grund",
          replaceBy: "Zu ersetzen bis",
        },
        datePicker: {
          label: "Datum wählen",
          placeholder: "Auswählen...",
        },
        timePicker: {
          label: "Uhrzeit wählen",
          available: "Verfügbar",
          occupied: "Besetzt",
          selected: "Ausgewählt",
        },
        alert: {
          expiryWarning: "⚠️ Achtung: läuft ab in {days} Tagen",
        },
        continue: "Weiter",
      },
      step2: {
        title: "Buchung bestätigen",
        summary: {
          original: "Ursprungslektion",
          newLesson: "Neue Lektion",
          credit: "Guthaben",
        },
        originalLesson: {
          date: "Datum",
          instructor: "Fahrlehrer",
          reason: "Grund",
        },
        newLesson: {
          datetime: "Datum und Uhrzeit",
          instructor: "Fahrlehrer",
          vehicle: "Fahrzeug",
          meetingPoint: "Treffpunkt",
        },
        creditInfo: {
          message: "1 Nachholtermin-Guthaben wird verwendet",
          badge: "Kostenlos",
        },
        checkbox: {
          label: "Nachholtermin-Guthaben verwenden",
        },
        confirm: "Nachholtermin bestätigen",
        confirming: "Buchung...",
        success: "Nachholtermin erfolgreich gebucht!",
        error: "Fehler bei der Buchung",
      },
      cancel: "Abbrechen",
      back: "Zurück",
    },
    countdown: {
      days: "T",
      hours: "Std",
      minutes: "Min",
      expired: "Abgelaufen",
      in: "In",
    },
  },
  it: {
    breadcrumb: {
      dashboard: "Dashboard",
      makeups: "I miei recuperi",
    },
    title: "I miei recuperi",
    alert: {
      available:
        "Hai {count} recupero disponibile - Prenota prima della scadenza!",
      availablePlural:
        "Hai {count} recuperi disponibili - Prenota prima della scadenza!",
    },
    table: {
      columns: {
        cancelledDate: "Data cancellazione",
        originalLesson: "Lezione origine",
        reason: "Motivo",
        createdAt: "Creato il",
        expiresIn: "Scade tra",
        status: "Stato",
        actions: "Azioni",
      },
      filters: {
        status: "Stato",
        dateRange: "Periodo",
        from: "Dal",
        to: "Al",
        reset: "Reimposta",
      },
      sort: {
        expiryAsc: "Scadenza (urgente prima)",
        expiryDesc: "Scadenza (recente prima)",
        createdAsc: "Creazione (vecchio prima)",
        createdDesc: "Creazione (recente prima)",
      },
      empty: {
        title: "Nessun recupero disponibile",
        description:
          "I recuperi appaiono in caso di cancellazioni giustificate",
      },
      actions: {
        book: "Prenota",
        booked: "Prenotato",
        used: "Utilizzato",
        expired: "Scaduto",
        pending: "In attesa",
      },
      tooltips: {
        expired: "Termine superato - credito scaduto",
        used: "Credito già consumato",
        pending: "In attesa di approvazione amministratore",
      },
    },
    reasons: {
      illness_with_certificate: "Malattia",
      family_emergency: "Emergenza familiare",
      dangerous_weather: "Meteo",
      vehicle_breakdown: "Guasto",
      professional_impediment: "Impedimento prof.",
      other_justified: "Altro",
    },
    status: {
      available: "Disponibile",
      booked: "Prenotato",
      used: "Utilizzato",
      expired: "Scaduto",
      pending: "In attesa",
    },
    wizard: {
      title: "Prenotare un recupero",
      steps: {
        datetime: "Data & Ora",
        confirmation: "Conferma",
      },
      step1: {
        context: {
          title: "Lezione cancellata",
          cancelledOn: "Cancellata il",
          instructor: "Istruttore",
          reason: "Motivo",
          replaceBy: "Da sostituire entro il",
        },
        datePicker: {
          label: "Scegli una data",
          placeholder: "Seleziona...",
        },
        timePicker: {
          label: "Scegli un orario",
          available: "Disponibile",
          occupied: "Occupato",
          selected: "Selezionato",
        },
        alert: {
          expiryWarning: "⚠️ Attenzione: scade tra {days} giorni",
        },
        continue: "Continua",
      },
      step2: {
        title: "Confermare la prenotazione",
        summary: {
          original: "Lezione origine",
          newLesson: "Nuova lezione",
          credit: "Credito",
        },
        originalLesson: {
          date: "Data",
          instructor: "Istruttore",
          reason: "Motivo",
        },
        newLesson: {
          datetime: "Data e ora",
          instructor: "Istruttore",
          vehicle: "Veicolo",
          meetingPoint: "Punto d'incontro",
        },
        creditInfo: {
          message: "1 credito recupero sarà utilizzato",
          badge: "Gratuito",
        },
        checkbox: {
          label: "Utilizzare il credito recupero",
        },
        confirm: "Confermare il recupero",
        confirming: "Prenotazione...",
        success: "Recupero prenotato con successo!",
        error: "Errore durante la prenotazione",
      },
      cancel: "Annulla",
      back: "Indietro",
    },
    countdown: {
      days: "g",
      hours: "h",
      minutes: "min",
      expired: "Scaduto",
      in: "Tra",
    },
  },
  en: {
    breadcrumb: {
      dashboard: "Dashboard",
      makeups: "My makeups",
    },
    title: "My makeup lessons",
    alert: {
      available: "You have {count} makeup available - Book before expiration!",
      availablePlural:
        "You have {count} makeups available - Book before expiration!",
    },
    table: {
      columns: {
        cancelledDate: "Cancellation date",
        originalLesson: "Original lesson",
        reason: "Reason",
        createdAt: "Created on",
        expiresIn: "Expires in",
        status: "Status",
        actions: "Actions",
      },
      filters: {
        status: "Status",
        dateRange: "Period",
        from: "From",
        to: "To",
        reset: "Reset",
      },
      sort: {
        expiryAsc: "Expiry (urgent first)",
        expiryDesc: "Expiry (recent first)",
        createdAsc: "Creation (oldest first)",
        createdDesc: "Creation (recent first)",
      },
      empty: {
        title: "No makeups available",
        description: "Makeups appear when justified cancellations occur",
      },
      actions: {
        book: "Book",
        booked: "Booked",
        used: "Used",
        expired: "Expired",
        pending: "Pending",
      },
      tooltips: {
        expired: "Deadline passed - credit expired",
        used: "Credit already consumed",
        pending: "Awaiting administrator approval",
      },
    },
    reasons: {
      illness_with_certificate: "Illness",
      family_emergency: "Family emergency",
      dangerous_weather: "Weather",
      vehicle_breakdown: "Breakdown",
      professional_impediment: "Prof. impediment",
      other_justified: "Other",
    },
    status: {
      available: "Available",
      booked: "Booked",
      used: "Used",
      expired: "Expired",
      pending: "Pending",
    },
    wizard: {
      title: "Book a makeup",
      steps: {
        datetime: "Date & Time",
        confirmation: "Confirmation",
      },
      step1: {
        context: {
          title: "Cancelled lesson",
          cancelledOn: "Cancelled on",
          instructor: "Instructor",
          reason: "Reason",
          replaceBy: "To replace by",
        },
        datePicker: {
          label: "Choose a date",
          placeholder: "Select...",
        },
        timePicker: {
          label: "Choose a time",
          available: "Available",
          occupied: "Occupied",
          selected: "Selected",
        },
        alert: {
          expiryWarning: "⚠️ Warning: expires in {days} days",
        },
        continue: "Continue",
      },
      step2: {
        title: "Confirm booking",
        summary: {
          original: "Original lesson",
          newLesson: "New lesson",
          credit: "Credit",
        },
        originalLesson: {
          date: "Date",
          instructor: "Instructor",
          reason: "Reason",
        },
        newLesson: {
          datetime: "Date and time",
          instructor: "Instructor",
          vehicle: "Vehicle",
          meetingPoint: "Meeting point",
        },
        creditInfo: {
          message: "1 makeup credit will be used",
          badge: "Free",
        },
        checkbox: {
          label: "Use makeup credit",
        },
        confirm: "Confirm makeup",
        confirming: "Booking...",
        success: "Makeup booked successfully!",
        error: "Error during booking",
      },
      cancel: "Cancel",
      back: "Back",
    },
    countdown: {
      days: "d",
      hours: "h",
      minutes: "min",
      expired: "Expired",
      in: "In",
    },
  },
};
