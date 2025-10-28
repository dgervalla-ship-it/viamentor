/**
 * VIAMENTOR - Instructor Makeups i18n
 * Traductions interface moniteur rattrapages
 */

export type InstructorMakeupsLocale = "fr" | "de" | "it" | "en";

export const instructorMakeupsTranslations: Record<
  InstructorMakeupsLocale,
  {
    title: string;
    breadcrumb: {
      instructor: string;
      makeups: string;
    };
    description: string;
    alert: {
      title: string;
      description: string;
    };
    stats: {
      available: {
        label: string;
        description: string;
      };
      expired: {
        label: string;
        description: string;
        alert: string;
      };
      used: {
        label: string;
        description: string;
      };
      usageRate: {
        label: string;
        description: string;
        optimal: string;
        acceptable: string;
        critical: string;
      };
    };
    table: {
      columns: {
        student: string;
        available: string;
        expiresIn: string;
        used: string;
        expired: string;
        usageRate: string;
        actions: string;
      };
      filters: {
        search: string;
        status: string;
        statusOptions: {
          all: string;
          available: string;
          expired: string;
          used: string;
        };
        expiration: string;
        usageRate: string;
      };
      sort: {
        expirationAsc: string;
        availableDesc: string;
        usedDesc: string;
      };
      actions: {
        viewDetail: string;
        extend: string;
        cancel: string;
      };
      empty: {
        title: string;
        description: string;
      };
      expiresIn: {
        days: string;
        urgent: string;
        soon: string;
      };
    };
    extend: {
      title: string;
      subtitle: string;
      context: {
        student: string;
        originalLesson: string;
        currentExpiry: string;
        reason: string;
      };
      fields: {
        days: {
          label: string;
          helper: string;
          placeholder: string;
        };
        newExpiry: {
          label: string;
          preview: string;
        };
        reason: {
          label: string;
          placeholder: string;
          helper: string;
        };
        notify: {
          label: string;
          description: string;
        };
      };
      actions: {
        cancel: string;
        extend: string;
      };
      success: string;
      error: string;
      emailSubject: string;
      emailBody: string;
    };
    cancel: {
      title: string;
      warning: string;
      description: string;
      fields: {
        reason: {
          label: string;
          placeholder: string;
          helper: string;
        };
        confirm: {
          label: string;
        };
      };
      actions: {
        cancel: string;
        confirm: string;
      };
      success: string;
      error: string;
      emailSubject: string;
      emailBody: string;
    };
    detail: {
      title: string;
      timeline: {
        title: string;
        created: string;
        extended: string;
        used: string;
        expired: string;
        cancelled: string;
      };
      makeup: {
        created: string;
        originalLesson: string;
        expiration: string;
        status: string;
        usedOn: string;
        newLesson: string;
        feedback: string;
        extensionHistory: string;
        extendedBy: string;
      };
      stats: {
        title: string;
        totalCreated: string;
        used: string;
        expired: string;
        avgDays: string;
      };
      actions: {
        close: string;
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
      pending: string;
      used: string;
      expired: string;
      cancelled: string;
    };
  }
> = {
  fr: {
    title: "Rattrapages Élèves",
    breadcrumb: {
      instructor: "Moniteur",
      makeups: "Rattrapages",
    },
    description: "Gérer les rattrapages de vos élèves assignés",
    alert: {
      title: "Suivi des rattrapages",
      description:
        "Suivez l'utilisation des rattrapages et identifiez les élèves nécessitant une relance.",
    },
    stats: {
      available: {
        label: "Disponibles",
        description: "Crédits actifs",
      },
      expired: {
        label: "Expirés ce mois",
        description: "Crédits perdus",
        alert: "Identifier les causes",
      },
      used: {
        label: "Utilisés",
        description: "Crédits consommés",
      },
      usageRate: {
        label: "Taux d'utilisation",
        description: "Performance globale",
        optimal: "Optimal (>80%)",
        acceptable: "Acceptable (60-80%)",
        critical: "Critique (<60%)",
      },
    },
    table: {
      columns: {
        student: "Élève",
        available: "Disponibles",
        expiresIn: "Expiration proche",
        used: "Utilisés",
        expired: "Expirés",
        usageRate: "Taux utilisation",
        actions: "Actions",
      },
      filters: {
        search: "Rechercher par nom ou email...",
        status: "Statut",
        statusOptions: {
          all: "Tous",
          available: "Disponibles",
          expired: "Expirés",
          used: "Utilisés",
        },
        expiration: "Expiration",
        usageRate: "Taux d'utilisation",
      },
      sort: {
        expirationAsc: "Expiration (urgent d'abord)",
        availableDesc: "Plus de crédits",
        usedDesc: "Meilleurs utilisateurs",
      },
      actions: {
        viewDetail: "Voir détail",
        extend: "Prolonger délai",
        cancel: "Annuler crédit",
      },
      empty: {
        title: "Aucun rattrapage",
        description: "Vos élèves n'ont pas de crédits rattrapage actuellement.",
      },
      expiresIn: {
        days: "Expire dans {days}j",
        urgent: "Urgent",
        soon: "Bientôt",
      },
    },
    extend: {
      title: "Prolonger délai rattrapage",
      subtitle: "Accorder une extension exceptionnelle",
      context: {
        student: "Élève",
        originalLesson: "Leçon d'origine",
        currentExpiry: "Expire actuellement",
        reason: "Raison",
      },
      fields: {
        days: {
          label: "Nombre de jours d'extension",
          helper: "Extension de 1 à 30 jours",
          placeholder: "7",
        },
        newExpiry: {
          label: "Nouvelle échéance",
          preview: "Nouvelle échéance : {date}",
        },
        reason: {
          label: "Raison de l'extension",
          placeholder: "Expliquez pourquoi vous accordez cette extension...",
          helper: "300 caractères maximum - Notes internes",
        },
        notify: {
          label: "Notifier l'élève par email",
          description: "Envoyer un email automatique informant de l'extension",
        },
      },
      actions: {
        cancel: "Annuler",
        extend: "Prolonger",
      },
      success: "Délai prolongé de {days} jours",
      error: "Erreur lors de la prolongation",
      emailSubject: "Bonne nouvelle ! Délai de rattrapage prolongé",
      emailBody:
        "Votre délai de rattrapage a été prolongé jusqu'au {date}. Vous avez maintenant plus de temps pour réserver votre leçon.",
    },
    cancel: {
      title: "Annuler crédit rattrapage",
      warning: "Action irréversible - Le crédit sera définitivement supprimé",
      description: "Raison d'annulation requise",
      fields: {
        reason: {
          label: "Raison de l'annulation",
          placeholder: "Expliquez pourquoi vous annulez ce crédit...",
          helper: "200 caractères minimum - Requis pour audit RGPD",
        },
        confirm: {
          label: "Je confirme l'annulation définitive",
        },
      },
      actions: {
        cancel: "Annuler",
        confirm: "Annuler le crédit",
      },
      success: "Crédit annulé",
      error: "Erreur lors de l'annulation",
      emailSubject: "Crédit rattrapage annulé",
      emailBody: "Votre crédit rattrapage a été annulé. Raison : {reason}",
    },
    detail: {
      title: "Historique rattrapages",
      timeline: {
        title: "Historique complet",
        created: "Créé le",
        extended: "Prolongé le",
        used: "Utilisé le",
        expired: "Expiré le",
        cancelled: "Annulé le",
      },
      makeup: {
        created: "Créé le",
        originalLesson: "Leçon d'origine",
        expiration: "Expiration",
        status: "Statut",
        usedOn: "Utilisé le",
        newLesson: "Nouvelle leçon",
        feedback: "Retour élève",
        extensionHistory: "Historique extensions",
        extendedBy: "Prolongé par",
      },
      stats: {
        title: "Statistiques",
        totalCreated: "Total créés",
        used: "Utilisés",
        expired: "Expirés",
        avgDays: "Délai moyen",
      },
      actions: {
        close: "Fermer",
      },
    },
    reasons: {
      illness_with_certificate: "Maladie avec certificat",
      family_emergency: "Urgence familiale",
      dangerous_weather: "Météo dangereuse",
      vehicle_breakdown: "Panne véhicule",
      professional_impediment: "Empêchement professionnel",
      other_justified: "Autre motif justifié",
    },
    status: {
      available: "Disponible",
      booked: "Réservé",
      pending: "En attente",
      used: "Utilisé",
      expired: "Expiré",
      cancelled: "Annulé",
    },
  },
  de: {
    title: "Schüler-Nachholtermine",
    breadcrumb: {
      instructor: "Fahrlehrer",
      makeups: "Nachholtermine",
    },
    description: "Nachholtermine Ihrer zugewiesenen Schüler verwalten",
    alert: {
      title: "Nachholtermin-Tracking",
      description:
        "Verfolgen Sie die Nutzung von Nachholtermine und identifizieren Sie Schüler, die eine Erinnerung benötigen.",
    },
    stats: {
      available: {
        label: "Verfügbar",
        description: "Aktive Guthaben",
      },
      expired: {
        label: "Diesen Monat abgelaufen",
        description: "Verlorene Guthaben",
        alert: "Ursachen identifizieren",
      },
      used: {
        label: "Verwendet",
        description: "Verbrauchte Guthaben",
      },
      usageRate: {
        label: "Nutzungsrate",
        description: "Gesamtleistung",
        optimal: "Optimal (>80%)",
        acceptable: "Akzeptabel (60-80%)",
        critical: "Kritisch (<60%)",
      },
    },
    table: {
      columns: {
        student: "Schüler",
        available: "Verfügbar",
        expiresIn: "Läuft bald ab",
        used: "Verwendet",
        expired: "Abgelaufen",
        usageRate: "Nutzungsrate",
        actions: "Aktionen",
      },
      filters: {
        search: "Nach Name oder E-Mail suchen...",
        status: "Status",
        statusOptions: {
          all: "Alle",
          available: "Verfügbar",
          expired: "Abgelaufen",
          used: "Verwendet",
        },
        expiration: "Ablauf",
        usageRate: "Nutzungsrate",
      },
      sort: {
        expirationAsc: "Ablauf (dringend zuerst)",
        availableDesc: "Mehr Guthaben",
        usedDesc: "Beste Nutzer",
      },
      actions: {
        viewDetail: "Details anzeigen",
        extend: "Frist verlängern",
        cancel: "Guthaben stornieren",
      },
      empty: {
        title: "Keine Nachholtermine",
        description: "Ihre Schüler haben derzeit keine Nachholtermin-Guthaben.",
      },
      expiresIn: {
        days: "Läuft ab in {days}T",
        urgent: "Dringend",
        soon: "Bald",
      },
    },
    extend: {
      title: "Nachholtermin-Frist verlängern",
      subtitle: "Ausnahmeverlängerung gewähren",
      context: {
        student: "Schüler",
        originalLesson: "Original-Lektion",
        currentExpiry: "Läuft derzeit ab",
        reason: "Grund",
      },
      fields: {
        days: {
          label: "Anzahl Verlängerungstage",
          helper: "Verlängerung von 1 bis 30 Tagen",
          placeholder: "7",
        },
        newExpiry: {
          label: "Neuer Ablauf",
          preview: "Neuer Ablauf: {date}",
        },
        reason: {
          label: "Grund der Verlängerung",
          placeholder: "Erklären Sie, warum Sie diese Verlängerung gewähren...",
          helper: "Maximal 300 Zeichen - Interne Notizen",
        },
        notify: {
          label: "Schüler per E-Mail benachrichtigen",
          description: "Automatische E-Mail über die Verlängerung senden",
        },
      },
      actions: {
        cancel: "Abbrechen",
        extend: "Verlängern",
      },
      success: "Frist um {days} Tage verlängert",
      error: "Fehler bei der Verlängerung",
      emailSubject: "Gute Nachrichten! Nachholtermin-Frist verlängert",
      emailBody:
        "Ihre Nachholtermin-Frist wurde bis {date} verlängert. Sie haben jetzt mehr Zeit, Ihre Lektion zu buchen.",
    },
    cancel: {
      title: "Nachholtermin-Guthaben stornieren",
      warning: "Unwiderrufliche Aktion - Das Guthaben wird endgültig gelöscht",
      description: "Stornierungsgrund erforderlich",
      fields: {
        reason: {
          label: "Grund der Stornierung",
          placeholder: "Erklären Sie, warum Sie dieses Guthaben stornieren...",
          helper: "Mindestens 200 Zeichen - Erforderlich für DSGVO-Audit",
        },
        confirm: {
          label: "Ich bestätige die endgültige Stornierung",
        },
      },
      actions: {
        cancel: "Abbrechen",
        confirm: "Guthaben stornieren",
      },
      success: "Guthaben storniert",
      error: "Fehler bei der Stornierung",
      emailSubject: "Nachholtermin-Guthaben storniert",
      emailBody: "Ihr Nachholtermin-Guthaben wurde storniert. Grund: {reason}",
    },
    detail: {
      title: "Nachholtermin-Verlauf",
      timeline: {
        title: "Vollständiger Verlauf",
        created: "Erstellt am",
        extended: "Verlängert am",
        used: "Verwendet am",
        expired: "Abgelaufen am",
        cancelled: "Storniert am",
      },
      makeup: {
        created: "Erstellt am",
        originalLesson: "Original-Lektion",
        expiration: "Ablauf",
        status: "Status",
        usedOn: "Verwendet am",
        newLesson: "Neue Lektion",
        feedback: "Schüler-Feedback",
        extensionHistory: "Verlängerungsverlauf",
        extendedBy: "Verlängert von",
      },
      stats: {
        title: "Statistiken",
        totalCreated: "Gesamt erstellt",
        used: "Verwendet",
        expired: "Abgelaufen",
        avgDays: "Durchschnittliche Dauer",
      },
      actions: {
        close: "Schließen",
      },
    },
    reasons: {
      illness_with_certificate: "Krankheit mit Attest",
      family_emergency: "Familiennotfall",
      dangerous_weather: "Gefährliches Wetter",
      vehicle_breakdown: "Fahrzeugpanne",
      professional_impediment: "Berufliche Verhinderung",
      other_justified: "Anderer gerechtfertigter Grund",
    },
    status: {
      available: "Verfügbar",
      booked: "Gebucht",
      pending: "Ausstehend",
      used: "Verwendet",
      expired: "Abgelaufen",
      cancelled: "Storniert",
    },
  },
  it: {
    title: "Recuperi Allievi",
    breadcrumb: {
      instructor: "Istruttore",
      makeups: "Recuperi",
    },
    description: "Gestire i recuperi dei tuoi allievi assegnati",
    alert: {
      title: "Monitoraggio recuperi",
      description:
        "Monitora l'utilizzo dei recuperi e identifica gli allievi che necessitano un sollecito.",
    },
    stats: {
      available: {
        label: "Disponibili",
        description: "Crediti attivi",
      },
      expired: {
        label: "Scaduti questo mese",
        description: "Crediti persi",
        alert: "Identificare le cause",
      },
      used: {
        label: "Utilizzati",
        description: "Crediti consumati",
      },
      usageRate: {
        label: "Tasso di utilizzo",
        description: "Performance globale",
        optimal: "Ottimale (>80%)",
        acceptable: "Accettabile (60-80%)",
        critical: "Critico (<60%)",
      },
    },
    table: {
      columns: {
        student: "Allievo",
        available: "Disponibili",
        expiresIn: "Scadenza prossima",
        used: "Utilizzati",
        expired: "Scaduti",
        usageRate: "Tasso utilizzo",
        actions: "Azioni",
      },
      filters: {
        search: "Cerca per nome o email...",
        status: "Stato",
        statusOptions: {
          all: "Tutti",
          available: "Disponibili",
          expired: "Scaduti",
          used: "Utilizzati",
        },
        expiration: "Scadenza",
        usageRate: "Tasso di utilizzo",
      },
      sort: {
        expirationAsc: "Scadenza (urgente prima)",
        availableDesc: "Più crediti",
        usedDesc: "Migliori utilizzatori",
      },
      actions: {
        viewDetail: "Vedi dettaglio",
        extend: "Prolunga termine",
        cancel: "Annulla credito",
      },
      empty: {
        title: "Nessun recupero",
        description: "I tuoi allievi non hanno crediti recupero attualmente.",
      },
      expiresIn: {
        days: "Scade tra {days}g",
        urgent: "Urgente",
        soon: "Presto",
      },
    },
    extend: {
      title: "Prolunga termine recupero",
      subtitle: "Concedere un'estensione eccezionale",
      context: {
        student: "Allievo",
        originalLesson: "Lezione originale",
        currentExpiry: "Scade attualmente",
        reason: "Motivo",
      },
      fields: {
        days: {
          label: "Numero di giorni di estensione",
          helper: "Estensione da 1 a 30 giorni",
          placeholder: "7",
        },
        newExpiry: {
          label: "Nuova scadenza",
          preview: "Nuova scadenza: {date}",
        },
        reason: {
          label: "Motivo dell'estensione",
          placeholder: "Spiega perché concedi questa estensione...",
          helper: "Massimo 300 caratteri - Note interne",
        },
        notify: {
          label: "Notifica l'allievo via email",
          description: "Invia email automatica informando dell'estensione",
        },
      },
      actions: {
        cancel: "Annulla",
        extend: "Prolunga",
      },
      success: "Termine prolungato di {days} giorni",
      error: "Errore durante la proroga",
      emailSubject: "Buone notizie! Termine recupero prolungato",
      emailBody:
        "Il tuo termine recupero è stato prolungato fino al {date}. Hai ora più tempo per prenotare la tua lezione.",
    },
    cancel: {
      title: "Annulla credito recupero",
      warning:
        "Azione irreversibile - Il credito sarà eliminato definitivamente",
      description: "Motivo di annullamento richiesto",
      fields: {
        reason: {
          label: "Motivo dell'annullamento",
          placeholder: "Spiega perché annulli questo credito...",
          helper: "Minimo 200 caratteri - Richiesto per audit GDPR",
        },
        confirm: {
          label: "Confermo l'annullamento definitivo",
        },
      },
      actions: {
        cancel: "Annulla",
        confirm: "Annulla credito",
      },
      success: "Credito annullato",
      error: "Errore durante l'annullamento",
      emailSubject: "Credito recupero annullato",
      emailBody: "Il tuo credito recupero è stato annullato. Motivo: {reason}",
    },
    detail: {
      title: "Storico recuperi",
      timeline: {
        title: "Storico completo",
        created: "Creato il",
        extended: "Prolungato il",
        used: "Utilizzato il",
        expired: "Scaduto il",
        cancelled: "Annullato il",
      },
      makeup: {
        created: "Creato il",
        originalLesson: "Lezione originale",
        expiration: "Scadenza",
        status: "Stato",
        usedOn: "Utilizzato il",
        newLesson: "Nuova lezione",
        feedback: "Feedback allievo",
        extensionHistory: "Storico estensioni",
        extendedBy: "Prolungato da",
      },
      stats: {
        title: "Statistiche",
        totalCreated: "Totale creati",
        used: "Utilizzati",
        expired: "Scaduti",
        avgDays: "Tempo medio",
      },
      actions: {
        close: "Chiudi",
      },
    },
    reasons: {
      illness_with_certificate: "Malattia con certificato",
      family_emergency: "Emergenza familiare",
      dangerous_weather: "Meteo pericoloso",
      vehicle_breakdown: "Guasto veicolo",
      professional_impediment: "Impedimento professionale",
      other_justified: "Altro motivo giustificato",
    },
    status: {
      available: "Disponibile",
      booked: "Prenotato",
      pending: "In attesa",
      used: "Utilizzato",
      expired: "Scaduto",
      cancelled: "Annullato",
    },
  },
  en: {
    title: "Student Makeups",
    breadcrumb: {
      instructor: "Instructor",
      makeups: "Makeups",
    },
    description: "Manage makeups for your assigned students",
    alert: {
      title: "Makeup tracking",
      description:
        "Track makeup usage and identify students needing follow-up.",
    },
    stats: {
      available: {
        label: "Available",
        description: "Active credits",
      },
      expired: {
        label: "Expired this month",
        description: "Lost credits",
        alert: "Identify causes",
      },
      used: {
        label: "Used",
        description: "Consumed credits",
      },
      usageRate: {
        label: "Usage rate",
        description: "Overall performance",
        optimal: "Optimal (>80%)",
        acceptable: "Acceptable (60-80%)",
        critical: "Critical (<60%)",
      },
    },
    table: {
      columns: {
        student: "Student",
        available: "Available",
        expiresIn: "Expires soon",
        used: "Used",
        expired: "Expired",
        usageRate: "Usage rate",
        actions: "Actions",
      },
      filters: {
        search: "Search by name or email...",
        status: "Status",
        statusOptions: {
          all: "All",
          available: "Available",
          expired: "Expired",
          used: "Used",
        },
        expiration: "Expiration",
        usageRate: "Usage rate",
      },
      sort: {
        expirationAsc: "Expiration (urgent first)",
        availableDesc: "Most credits",
        usedDesc: "Best users",
      },
      actions: {
        viewDetail: "View detail",
        extend: "Extend deadline",
        cancel: "Cancel credit",
      },
      empty: {
        title: "No makeups",
        description: "Your students don't have makeup credits currently.",
      },
      expiresIn: {
        days: "Expires in {days}d",
        urgent: "Urgent",
        soon: "Soon",
      },
    },
    extend: {
      title: "Extend makeup deadline",
      subtitle: "Grant exceptional extension",
      context: {
        student: "Student",
        originalLesson: "Original lesson",
        currentExpiry: "Currently expires",
        reason: "Reason",
      },
      fields: {
        days: {
          label: "Number of extension days",
          helper: "Extension from 1 to 30 days",
          placeholder: "7",
        },
        newExpiry: {
          label: "New expiry",
          preview: "New expiry: {date}",
        },
        reason: {
          label: "Extension reason",
          placeholder: "Explain why you're granting this extension...",
          helper: "300 characters maximum - Internal notes",
        },
        notify: {
          label: "Notify student by email",
          description: "Send automatic email informing of extension",
        },
      },
      actions: {
        cancel: "Cancel",
        extend: "Extend",
      },
      success: "Deadline extended by {days} days",
      error: "Error extending",
      emailSubject: "Good news! Makeup deadline extended",
      emailBody:
        "Your makeup deadline has been extended until {date}. You now have more time to book your lesson.",
    },
    cancel: {
      title: "Cancel makeup credit",
      warning: "Irreversible action - Credit will be permanently deleted",
      description: "Cancellation reason required",
      fields: {
        reason: {
          label: "Cancellation reason",
          placeholder: "Explain why you're canceling this credit...",
          helper: "200 characters minimum - Required for GDPR audit",
        },
        confirm: {
          label: "I confirm permanent cancellation",
        },
      },
      actions: {
        cancel: "Cancel",
        confirm: "Cancel credit",
      },
      success: "Credit cancelled",
      error: "Error cancelling",
      emailSubject: "Makeup credit cancelled",
      emailBody: "Your makeup credit has been cancelled. Reason: {reason}",
    },
    detail: {
      title: "Makeup history",
      timeline: {
        title: "Complete history",
        created: "Created on",
        extended: "Extended on",
        used: "Used on",
        expired: "Expired on",
        cancelled: "Cancelled on",
      },
      makeup: {
        created: "Created on",
        originalLesson: "Original lesson",
        expiration: "Expiration",
        status: "Status",
        usedOn: "Used on",
        newLesson: "New lesson",
        feedback: "Student feedback",
        extensionHistory: "Extension history",
        extendedBy: "Extended by",
      },
      stats: {
        title: "Statistics",
        totalCreated: "Total created",
        used: "Used",
        expired: "Expired",
        avgDays: "Average time",
      },
      actions: {
        close: "Close",
      },
    },
    reasons: {
      illness_with_certificate: "Illness with certificate",
      family_emergency: "Family emergency",
      dangerous_weather: "Dangerous weather",
      vehicle_breakdown: "Vehicle breakdown",
      professional_impediment: "Professional impediment",
      other_justified: "Other justified reason",
    },
    status: {
      available: "Available",
      booked: "Booked",
      pending: "Pending",
      used: "Used",
      expired: "Expired",
      cancelled: "Cancelled",
    },
  },
};
