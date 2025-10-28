/**
 * VIAMENTOR - Makeups i18n
 * Traductions pour système rattrapages
 */

export type MakeupsLocale = "fr" | "de" | "it" | "en";

export const makeupsTranslations: Record<
  MakeupsLocale,
  {
    title: string;
    breadcrumb: {
      settings: string;
      makeups: string;
    };
    description: string;
    alert: {
      title: string;
      description: string;
    };
    config: {
      title: string;
      tabs: {
        all: string;
        categoryB: string;
        categoryA: string;
        categoryBE: string;
      };
      fields: {
        maxDays: {
          label: string;
          helper: string;
          placeholder: string;
        };
        expiryDays: {
          label: string;
          helper: string;
        };
        validReasons: {
          label: string;
          options: {
            illness: string;
            family: string;
            weather: string;
            vehicle: string;
            professional: string;
            other: string;
          };
        };
        requireValidation: {
          label: string;
          description: string;
        };
        autoNotify: {
          label: string;
          description: string;
        };
        sendReminders: {
          label: string;
          description: string;
        };
        minBookingHours: {
          label: string;
          helper: string;
        };
        allowMultiple: {
          label: string;
          description: string;
        };
      };
      save: string;
      saveSuccess: string;
      saveError: string;
    };
    templates: {
      title: string;
      description: string;
      types: {
        available: string;
        reminder_7: string;
        reminder_3: string;
        reminder_1: string;
        expired: string;
      };
      fields: {
        subject: string;
        body: string;
        variables: string;
        preview: string;
        active: string;
      };
      actions: {
        restore: string;
        test: string;
        testDialog: {
          title: string;
          email: string;
          send: string;
          success: string;
          error: string;
        };
      };
      variablesList: {
        studentName: string;
        lessonDate: string;
        reason: string;
        expiryDate: string;
        daysRemaining: string;
        bookingLink: string;
        schoolName: string;
        schoolPhone: string;
        schoolEmail: string;
      };
    };
    analytics: {
      title: string;
      period: {
        label: string;
        last30: string;
        last90: string;
        last6months: string;
        custom: string;
      };
      stats: {
        created: {
          label: string;
          description: string;
        };
        used: {
          label: string;
          description: string;
        };
        expired: {
          label: string;
          description: string;
        };
        pending: {
          label: string;
          description: string;
        };
        avgDays: {
          label: string;
          description: string;
        };
      };
      charts: {
        trend: {
          title: string;
          created: string;
          used: string;
          expired: string;
        };
        byReason: {
          title: string;
        };
        byCategory: {
          title: string;
        };
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
      pending: string;
      used: string;
      expired: string;
      cancelled: string;
    };
  }
> = {
  fr: {
    title: "Gestion des Rattrapages",
    breadcrumb: {
      settings: "Paramètres",
      makeups: "Rattrapages",
    },
    description: "Gérer les conditions de rattrapages automatiques",
    alert: {
      title: "Configuration automatique",
      description:
        "Définissez les règles automatiques de création de crédits rattrapage lors des annulations de leçons.",
    },
    config: {
      title: "Configuration des règles",
      tabs: {
        all: "Toutes catégories",
        categoryB: "Catégorie B",
        categoryA: "Catégorie A",
        categoryBE: "Catégorie BE",
      },
      fields: {
        maxDays: {
          label: "Délai maximum depuis annulation",
          helper: "Expire dans : {days} jours",
          placeholder: "30",
        },
        expiryDays: {
          label: "Durée de validité du crédit",
          helper: "Nombre de jours avant expiration",
        },
        validReasons: {
          label: "Raisons valides pour rattrapage",
          options: {
            illness: "Maladie avec certificat médical",
            family: "Urgence familiale justifiée",
            weather: "Conditions météo dangereuses",
            vehicle: "Panne véhicule",
            professional: "Empêchement professionnel",
            other: "Autre motif justifié",
          },
        },
        requireValidation: {
          label: "Validation administrateur requise",
          description: "Les crédits doivent être approuvés avant utilisation",
        },
        autoNotify: {
          label: "Notification automatique élève",
          description: "Envoyer un email lors de la création du crédit",
        },
        sendReminders: {
          label: "Rappels d'expiration",
          description: "Envoyer des rappels à J-7, J-3 et J-1",
        },
        minBookingHours: {
          label: "Délai minimum de réservation",
          helper: "Heures d'avance requises pour réserver",
        },
        allowMultiple: {
          label: "Autoriser le cumul de rattrapages",
          description: "Permettre plusieurs crédits simultanés par élève",
        },
      },
      save: "Enregistrer les règles",
      saveSuccess: "Configuration sauvegardée avec succès",
      saveError: "Erreur lors de la sauvegarde",
    },
    templates: {
      title: "Templates de notifications",
      description: "Personnalisez les emails automatiques envoyés aux élèves",
      types: {
        available: "Rattrapage disponible",
        reminder_7: "Rappel J-7",
        reminder_3: "Rappel J-3",
        reminder_1: "Rappel J-1",
        expired: "Rattrapage expiré",
      },
      fields: {
        subject: "Objet",
        body: "Corps du message",
        variables: "Variables disponibles",
        preview: "Aperçu",
        active: "Actif",
      },
      actions: {
        restore: "Restaurer par défaut",
        test: "Tester l'envoi",
        testDialog: {
          title: "Tester l'envoi d'email",
          email: "Email de test",
          send: "Envoyer",
          success: "Email de test envoyé avec succès",
          error: "Erreur lors de l'envoi",
        },
      },
      variablesList: {
        studentName: "Nom de l'élève",
        lessonDate: "Date de la leçon annulée",
        reason: "Raison de l'annulation",
        expiryDate: "Date d'expiration du crédit",
        daysRemaining: "Jours restants",
        bookingLink: "Lien de réservation",
        schoolName: "Nom de l'auto-école",
        schoolPhone: "Téléphone de l'école",
        schoolEmail: "Email de l'école",
      },
    },
    analytics: {
      title: "Statistiques des rattrapages",
      period: {
        label: "Période",
        last30: "30 derniers jours",
        last90: "90 derniers jours",
        last6months: "6 derniers mois",
        custom: "Personnalisé",
      },
      stats: {
        created: {
          label: "Crédits créés",
          description: "Total des crédits générés",
        },
        used: {
          label: "Crédits utilisés",
          description: "Taux d'utilisation",
        },
        expired: {
          label: "Crédits expirés",
          description: "Crédits non utilisés",
        },
        pending: {
          label: "En attente validation",
          description: "Crédits à approuver",
        },
        avgDays: {
          label: "Délai moyen d'utilisation",
          description: "Jours entre création et utilisation",
        },
      },
      charts: {
        trend: {
          title: "Évolution sur 6 mois",
          created: "Créés",
          used: "Utilisés",
          expired: "Expirés",
        },
        byReason: {
          title: "Répartition par raison",
        },
        byCategory: {
          title: "Utilisation par catégorie",
        },
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
      pending: "En attente",
      used: "Utilisé",
      expired: "Expiré",
      cancelled: "Annulé",
    },
  },
  de: {
    title: "Nachholtermin-Verwaltung",
    breadcrumb: {
      settings: "Einstellungen",
      makeups: "Nachholtermine",
    },
    description: "Bedingungen für automatische Nachholtermine verwalten",
    alert: {
      title: "Automatische Konfiguration",
      description:
        "Definieren Sie automatische Regeln für die Erstellung von Nachholtermin-Guthaben bei Lektionsabsagen.",
    },
    config: {
      title: "Regelkonfiguration",
      tabs: {
        all: "Alle Kategorien",
        categoryB: "Kategorie B",
        categoryA: "Kategorie A",
        categoryBE: "Kategorie BE",
      },
      fields: {
        maxDays: {
          label: "Maximale Frist seit Absage",
          helper: "Läuft ab in: {days} Tagen",
          placeholder: "30",
        },
        expiryDays: {
          label: "Gültigkeitsdauer des Guthabens",
          helper: "Anzahl Tage bis zum Ablauf",
        },
        validReasons: {
          label: "Gültige Gründe für Nachholtermin",
          options: {
            illness: "Krankheit mit ärztlichem Attest",
            family: "Gerechtfertigter Familiennotfall",
            weather: "Gefährliche Wetterbedingungen",
            vehicle: "Fahrzeugpanne",
            professional: "Berufliche Verhinderung",
            other: "Anderer gerechtfertigter Grund",
          },
        },
        requireValidation: {
          label: "Administrator-Validierung erforderlich",
          description: "Guthaben müssen vor Verwendung genehmigt werden",
        },
        autoNotify: {
          label: "Automatische Schülerbenachrichtigung",
          description: "E-Mail bei Guthabenerstellung senden",
        },
        sendReminders: {
          label: "Ablauferinnerungen",
          description: "Erinnerungen an T-7, T-3 und T-1 senden",
        },
        minBookingHours: {
          label: "Mindestvorlaufzeit für Buchung",
          helper: "Erforderliche Vorlaufstunden für Buchung",
        },
        allowMultiple: {
          label: "Kumulation von Nachholtermine erlauben",
          description: "Mehrere gleichzeitige Guthaben pro Schüler erlauben",
        },
      },
      save: "Regeln speichern",
      saveSuccess: "Konfiguration erfolgreich gespeichert",
      saveError: "Fehler beim Speichern",
    },
    templates: {
      title: "Benachrichtigungsvorlagen",
      description: "Passen Sie automatische E-Mails an Schüler an",
      types: {
        available: "Nachholtermin verfügbar",
        reminder_7: "Erinnerung T-7",
        reminder_3: "Erinnerung T-3",
        reminder_1: "Erinnerung T-1",
        expired: "Nachholtermin abgelaufen",
      },
      fields: {
        subject: "Betreff",
        body: "Nachrichtentext",
        variables: "Verfügbare Variablen",
        preview: "Vorschau",
        active: "Aktiv",
      },
      actions: {
        restore: "Standard wiederherstellen",
        test: "Versand testen",
        testDialog: {
          title: "E-Mail-Versand testen",
          email: "Test-E-Mail",
          send: "Senden",
          success: "Test-E-Mail erfolgreich gesendet",
          error: "Fehler beim Senden",
        },
      },
      variablesList: {
        studentName: "Name des Schülers",
        lessonDate: "Datum der abgesagten Lektion",
        reason: "Grund der Absage",
        expiryDate: "Ablaufdatum des Guthabens",
        daysRemaining: "Verbleibende Tage",
        bookingLink: "Buchungslink",
        schoolName: "Name der Fahrschule",
        schoolPhone: "Telefon der Schule",
        schoolEmail: "E-Mail der Schule",
      },
    },
    analytics: {
      title: "Nachholtermin-Statistiken",
      period: {
        label: "Zeitraum",
        last30: "Letzte 30 Tage",
        last90: "Letzte 90 Tage",
        last6months: "Letzte 6 Monate",
        custom: "Benutzerdefiniert",
      },
      stats: {
        created: {
          label: "Erstellte Guthaben",
          description: "Gesamtzahl generierter Guthaben",
        },
        used: {
          label: "Verwendete Guthaben",
          description: "Nutzungsrate",
        },
        expired: {
          label: "Abgelaufene Guthaben",
          description: "Nicht verwendete Guthaben",
        },
        pending: {
          label: "Ausstehende Validierung",
          description: "Zu genehmigende Guthaben",
        },
        avgDays: {
          label: "Durchschnittliche Nutzungsdauer",
          description: "Tage zwischen Erstellung und Nutzung",
        },
      },
      charts: {
        trend: {
          title: "Entwicklung über 6 Monate",
          created: "Erstellt",
          used: "Verwendet",
          expired: "Abgelaufen",
        },
        byReason: {
          title: "Verteilung nach Grund",
        },
        byCategory: {
          title: "Nutzung nach Kategorie",
        },
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
      pending: "Ausstehend",
      used: "Verwendet",
      expired: "Abgelaufen",
      cancelled: "Storniert",
    },
  },
  it: {
    title: "Gestione Recuperi",
    breadcrumb: {
      settings: "Impostazioni",
      makeups: "Recuperi",
    },
    description: "Gestire le condizioni di recupero automatico",
    alert: {
      title: "Configurazione automatica",
      description:
        "Definisci le regole automatiche per la creazione di crediti recupero in caso di cancellazione lezioni.",
    },
    config: {
      title: "Configurazione regole",
      tabs: {
        all: "Tutte le categorie",
        categoryB: "Categoria B",
        categoryA: "Categoria A",
        categoryBE: "Categoria BE",
      },
      fields: {
        maxDays: {
          label: "Termine massimo dalla cancellazione",
          helper: "Scade tra: {days} giorni",
          placeholder: "30",
        },
        expiryDays: {
          label: "Durata di validità del credito",
          helper: "Numero di giorni prima della scadenza",
        },
        validReasons: {
          label: "Motivi validi per recupero",
          options: {
            illness: "Malattia con certificato medico",
            family: "Emergenza familiare giustificata",
            weather: "Condizioni meteo pericolose",
            vehicle: "Guasto veicolo",
            professional: "Impedimento professionale",
            other: "Altro motivo giustificato",
          },
        },
        requireValidation: {
          label: "Validazione amministratore richiesta",
          description: "I crediti devono essere approvati prima dell'uso",
        },
        autoNotify: {
          label: "Notifica automatica allievo",
          description: "Inviare email alla creazione del credito",
        },
        sendReminders: {
          label: "Promemoria scadenza",
          description: "Inviare promemoria a G-7, G-3 e G-1",
        },
        minBookingHours: {
          label: "Preavviso minimo prenotazione",
          helper: "Ore di anticipo richieste per prenotare",
        },
        allowMultiple: {
          label: "Consentire cumulo recuperi",
          description: "Permettere più crediti simultanei per allievo",
        },
      },
      save: "Salva regole",
      saveSuccess: "Configurazione salvata con successo",
      saveError: "Errore durante il salvataggio",
    },
    templates: {
      title: "Template notifiche",
      description: "Personalizza le email automatiche inviate agli allievi",
      types: {
        available: "Recupero disponibile",
        reminder_7: "Promemoria G-7",
        reminder_3: "Promemoria G-3",
        reminder_1: "Promemoria G-1",
        expired: "Recupero scaduto",
      },
      fields: {
        subject: "Oggetto",
        body: "Corpo del messaggio",
        variables: "Variabili disponibili",
        preview: "Anteprima",
        active: "Attivo",
      },
      actions: {
        restore: "Ripristina predefinito",
        test: "Testa invio",
        testDialog: {
          title: "Testa invio email",
          email: "Email di test",
          send: "Invia",
          success: "Email di test inviata con successo",
          error: "Errore durante l'invio",
        },
      },
      variablesList: {
        studentName: "Nome dell'allievo",
        lessonDate: "Data della lezione cancellata",
        reason: "Motivo della cancellazione",
        expiryDate: "Data di scadenza del credito",
        daysRemaining: "Giorni rimanenti",
        bookingLink: "Link di prenotazione",
        schoolName: "Nome dell'autoscuola",
        schoolPhone: "Telefono della scuola",
        schoolEmail: "Email della scuola",
      },
    },
    analytics: {
      title: "Statistiche recuperi",
      period: {
        label: "Periodo",
        last30: "Ultimi 30 giorni",
        last90: "Ultimi 90 giorni",
        last6months: "Ultimi 6 mesi",
        custom: "Personalizzato",
      },
      stats: {
        created: {
          label: "Crediti creati",
          description: "Totale crediti generati",
        },
        used: {
          label: "Crediti utilizzati",
          description: "Tasso di utilizzo",
        },
        expired: {
          label: "Crediti scaduti",
          description: "Crediti non utilizzati",
        },
        pending: {
          label: "In attesa validazione",
          description: "Crediti da approvare",
        },
        avgDays: {
          label: "Tempo medio di utilizzo",
          description: "Giorni tra creazione e utilizzo",
        },
      },
      charts: {
        trend: {
          title: "Evoluzione su 6 mesi",
          created: "Creati",
          used: "Utilizzati",
          expired: "Scaduti",
        },
        byReason: {
          title: "Ripartizione per motivo",
        },
        byCategory: {
          title: "Utilizzo per categoria",
        },
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
      pending: "In attesa",
      used: "Utilizzato",
      expired: "Scaduto",
      cancelled: "Annullato",
    },
  },
  en: {
    title: "Makeup Lessons Management",
    breadcrumb: {
      settings: "Settings",
      makeups: "Makeups",
    },
    description: "Manage automatic makeup lesson conditions",
    alert: {
      title: "Automatic configuration",
      description:
        "Define automatic rules for creating makeup credits when lessons are cancelled.",
    },
    config: {
      title: "Rules configuration",
      tabs: {
        all: "All categories",
        categoryB: "Category B",
        categoryA: "Category A",
        categoryBE: "Category BE",
      },
      fields: {
        maxDays: {
          label: "Maximum delay since cancellation",
          helper: "Expires in: {days} days",
          placeholder: "30",
        },
        expiryDays: {
          label: "Credit validity duration",
          helper: "Number of days before expiration",
        },
        validReasons: {
          label: "Valid reasons for makeup",
          options: {
            illness: "Illness with medical certificate",
            family: "Justified family emergency",
            weather: "Dangerous weather conditions",
            vehicle: "Vehicle breakdown",
            professional: "Professional impediment",
            other: "Other justified reason",
          },
        },
        requireValidation: {
          label: "Administrator validation required",
          description: "Credits must be approved before use",
        },
        autoNotify: {
          label: "Automatic student notification",
          description: "Send email when credit is created",
        },
        sendReminders: {
          label: "Expiration reminders",
          description: "Send reminders at D-7, D-3 and D-1",
        },
        minBookingHours: {
          label: "Minimum booking advance",
          helper: "Hours in advance required to book",
        },
        allowMultiple: {
          label: "Allow makeup accumulation",
          description: "Allow multiple simultaneous credits per student",
        },
      },
      save: "Save rules",
      saveSuccess: "Configuration saved successfully",
      saveError: "Error saving",
    },
    templates: {
      title: "Notification templates",
      description: "Customize automatic emails sent to students",
      types: {
        available: "Makeup available",
        reminder_7: "Reminder D-7",
        reminder_3: "Reminder D-3",
        reminder_1: "Reminder D-1",
        expired: "Makeup expired",
      },
      fields: {
        subject: "Subject",
        body: "Message body",
        variables: "Available variables",
        preview: "Preview",
        active: "Active",
      },
      actions: {
        restore: "Restore default",
        test: "Test sending",
        testDialog: {
          title: "Test email sending",
          email: "Test email",
          send: "Send",
          success: "Test email sent successfully",
          error: "Error sending",
        },
      },
      variablesList: {
        studentName: "Student name",
        lessonDate: "Cancelled lesson date",
        reason: "Cancellation reason",
        expiryDate: "Credit expiration date",
        daysRemaining: "Days remaining",
        bookingLink: "Booking link",
        schoolName: "Driving school name",
        schoolPhone: "School phone",
        schoolEmail: "School email",
      },
    },
    analytics: {
      title: "Makeup statistics",
      period: {
        label: "Period",
        last30: "Last 30 days",
        last90: "Last 90 days",
        last6months: "Last 6 months",
        custom: "Custom",
      },
      stats: {
        created: {
          label: "Credits created",
          description: "Total credits generated",
        },
        used: {
          label: "Credits used",
          description: "Usage rate",
        },
        expired: {
          label: "Credits expired",
          description: "Unused credits",
        },
        pending: {
          label: "Pending validation",
          description: "Credits to approve",
        },
        avgDays: {
          label: "Average usage time",
          description: "Days between creation and use",
        },
      },
      charts: {
        trend: {
          title: "6-month trend",
          created: "Created",
          used: "Used",
          expired: "Expired",
        },
        byReason: {
          title: "Distribution by reason",
        },
        byCategory: {
          title: "Usage by category",
        },
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
      pending: "Pending",
      used: "Used",
      expired: "Expired",
      cancelled: "Cancelled",
    },
  },
};
