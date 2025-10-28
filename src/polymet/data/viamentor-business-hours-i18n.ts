/**
 * VIAMENTOR - Business Hours i18n
 * Traductions FR/DE/IT/EN pour paramètres horaires
 */

import type {
  BusinessHoursLocale,
  DayOfWeek,
  ClosureReason,
  HolidayType,
} from "@/polymet/data/viamentor-business-hours-data";

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const businessHoursTranslations = {
  fr: {
    title: "Horaires et Disponibilités",
    subtitle: "Configuration des horaires d'ouverture, créneaux et fermetures",

    // Days of week
    days: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },

    // Opening Hours Section
    openingHours: {
      title: "Horaires d'ouverture standard",
      description: "Définir les disponibilités par défaut de l'auto-école",
      info: "Horaires appliqués par défaut aux nouveaux moniteurs/salles, modifiable individuellement",
      dayColumn: "Jour",
      openColumn: "Ouvert",
      morningColumn: "Horaires matin",
      afternoonColumn: "Horaires après-midi",
      actionsColumn: "Actions",
      duplicate: "Dupliquer",
      copyAll: "Tout copier",
      closed: "Fermé",
      preview: "Aperçu semaine",
    },

    // Lesson Slots Section
    lessonSlots: {
      title: "Créneaux leçons",
      description: "Configurer les durées et slots des leçons pratiques",
      standardDuration: "Durée leçon standard",
      duration45: "45 minutes (recommandé)",
      duration60: "60 minutes",
      duration90: "90 minutes",
      durationCustom: "Autre (minutes)",
      granularity: "Granularité slots",
      granularity15: "15 minutes",
      granularity30: "30 minutes",
      granularity60: "60 minutes",
      allowDouble: "Autoriser leçons doubles",
      minimumBreak: "Pause minimale entre leçons (minutes)",
      bookingAdvance: "Délai réservation minimum (heures)",
      cancellationDelay: "Délai annulation gratuite (heures)",
    },

    // Holidays Section
    holidays: {
      title: "Jours fériés suisses",
      description: "Gestion des fermetures officielles",
      autoImport: "Importer jours fériés suisses automatiquement",
      includeFederal: "Inclure fériés fédéraux",
      includeCantonal: "Inclure fériés cantonaux",
      syncNow: "Synchroniser maintenant",
      syncSuccess: "{count} jours fériés importés",
      lastSync: "Dernière synchronisation: {date}",
      addCustom: "Ajouter jour férié personnalisé",
      dateColumn: "Date",
      nameColumn: "Nom",
      typeColumn: "Type",
      recurringColumn: "Répétition",
      actionsColumn: "Actions",
      recurring: "Annuel",
      types: {
        federal: "Fédéral",
        cantonal: "Cantonal",
        custom: "Personnalisé",
      },
    },

    // Closures Section
    closures: {
      title: "Congés & Fermetures exceptionnelles",
      description: "Périodes de fermeture exceptionnelle de l'école complète",
      addClosure: "Ajouter période fermeture",
      startDateColumn: "Date début",
      endDateColumn: "Date fin",
      durationColumn: "Durée",
      reasonColumn: "Raison",
      visibleColumn: "Visible élèves",
      notificationsColumn: "Notifications",
      statusColumn: "Statut",
      actionsColumn: "Actions",
      days: "{count} jours",
      reasons: {
        vacation: "Vacances",
        training: "Formation",
        event: "Événement",
        maintenance: "Maintenance",
        other: "Autre",
      },
      status: {
        upcoming: "À venir",
        ongoing: "En cours",
        past: "Passé",
      },
      impactWarning: "{count} leçons planifiées seront annulées",
      notifyStudents: "Notifier élèves avec leçons planifiées",
    },

    // Exceptions Section
    exceptions: {
      title: "Exceptions ponctuelles",
      description:
        "Modifier les horaires pour des dates spécifiques sans affecter le standard",
      addException: "Ajouter exception",
      dateColumn: "Date",
      hoursColumn: "Horaires modifiés",
      reasonColumn: "Raison",
      actionsColumn: "Actions",
      closed: "Fermé",
      modified: "Horaires modifiés",
    },

    // Theory Courses Section
    theoryCourses: {
      title: "Configuration cours théoriques",
      description: "Planification des salles et sessions",
      sessionDuration: "Durée session standard (heures)",
      lunchBreak: "Pause déjeuner (minutes)",
      preferredDays: "Jours préférés",
      minParticipants: "Participants minimum",
      maxParticipants: "Participants maximum",
    },

    // Actions
    actions: {
      save: "Enregistrer horaires",
      preview: "Prévisualiser impact",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      confirm: "Confirmer",
    },

    // Messages
    messages: {
      saveSuccess: "Horaires mis à jour avec succès",
      saveError: "Erreur lors de l'enregistrement",
      deleteConfirm: "Confirmer la suppression ?",
      conflictDetected: "Conflit détecté avec les horaires existants",
    },
  },

  de: {
    title: "Öffnungszeiten und Verfügbarkeit",
    subtitle: "Konfiguration der Öffnungszeiten, Zeitfenster und Schließungen",

    days: {
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
    },

    openingHours: {
      title: "Standard-Öffnungszeiten",
      description: "Standard-Verfügbarkeiten der Fahrschule definieren",
      info: "Standardmäßig auf neue Fahrlehrer/Räume angewendet, individuell änderbar",
      dayColumn: "Tag",
      openColumn: "Geöffnet",
      morningColumn: "Vormittag",
      afternoonColumn: "Nachmittag",
      actionsColumn: "Aktionen",
      duplicate: "Duplizieren",
      copyAll: "Alle kopieren",
      closed: "Geschlossen",
      preview: "Wochenvorschau",
    },

    lessonSlots: {
      title: "Fahrstunden-Zeitfenster",
      description: "Dauer und Slots der praktischen Fahrstunden konfigurieren",
      standardDuration: "Standard-Fahrstundendauer",
      duration45: "45 Minuten (empfohlen)",
      duration60: "60 Minuten",
      duration90: "90 Minuten",
      durationCustom: "Andere (Minuten)",
      granularity: "Slot-Granularität",
      granularity15: "15 Minuten",
      granularity30: "30 Minuten",
      granularity60: "60 Minuten",
      allowDouble: "Doppelstunden erlauben",
      minimumBreak: "Mindestpause zwischen Stunden (Minuten)",
      bookingAdvance: "Mindestvorlaufzeit Buchung (Stunden)",
      cancellationDelay: "Kostenlose Stornierungsfrist (Stunden)",
    },

    holidays: {
      title: "Schweizer Feiertage",
      description: "Verwaltung offizieller Schließungen",
      autoImport: "Schweizer Feiertage automatisch importieren",
      includeFederal: "Bundesfeiertage einschließen",
      includeCantonal: "Kantonale Feiertage einschließen",
      syncNow: "Jetzt synchronisieren",
      syncSuccess: "{count} Feiertage importiert",
      lastSync: "Letzte Synchronisation: {date}",
      addCustom: "Benutzerdefinierten Feiertag hinzufügen",
      dateColumn: "Datum",
      nameColumn: "Name",
      typeColumn: "Typ",
      recurringColumn: "Wiederholung",
      actionsColumn: "Aktionen",
      recurring: "Jährlich",
      types: {
        federal: "Bundesweit",
        cantonal: "Kantonal",
        custom: "Benutzerdefiniert",
      },
    },

    closures: {
      title: "Ferien & Außerordentliche Schließungen",
      description: "Außerordentliche Schließungsperioden der gesamten Schule",
      addClosure: "Schließungsperiode hinzufügen",
      startDateColumn: "Startdatum",
      endDateColumn: "Enddatum",
      durationColumn: "Dauer",
      reasonColumn: "Grund",
      visibleColumn: "Für Schüler sichtbar",
      notificationsColumn: "Benachrichtigungen",
      statusColumn: "Status",
      actionsColumn: "Aktionen",
      days: "{count} Tage",
      reasons: {
        vacation: "Ferien",
        training: "Schulung",
        event: "Veranstaltung",
        maintenance: "Wartung",
        other: "Andere",
      },
      status: {
        upcoming: "Bevorstehend",
        ongoing: "Laufend",
        past: "Vergangen",
      },
      impactWarning: "{count} geplante Fahrstunden werden storniert",
      notifyStudents: "Schüler mit geplanten Fahrstunden benachrichtigen",
    },

    exceptions: {
      title: "Punktuelle Ausnahmen",
      description:
        "Öffnungszeiten für bestimmte Daten ändern ohne Standard zu beeinflussen",
      addException: "Ausnahme hinzufügen",
      dateColumn: "Datum",
      hoursColumn: "Geänderte Zeiten",
      reasonColumn: "Grund",
      actionsColumn: "Aktionen",
      closed: "Geschlossen",
      modified: "Geänderte Zeiten",
    },

    theoryCourses: {
      title: "Konfiguration Theoriekurse",
      description: "Planung der Räume und Sitzungen",
      sessionDuration: "Standard-Sitzungsdauer (Stunden)",
      lunchBreak: "Mittagspause (Minuten)",
      preferredDays: "Bevorzugte Tage",
      minParticipants: "Mindestteilnehmer",
      maxParticipants: "Maximale Teilnehmer",
    },

    actions: {
      save: "Öffnungszeiten speichern",
      preview: "Auswirkungen vorschauen",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      delete: "Löschen",
      confirm: "Bestätigen",
    },

    messages: {
      saveSuccess: "Öffnungszeiten erfolgreich aktualisiert",
      saveError: "Fehler beim Speichern",
      deleteConfirm: "Löschen bestätigen?",
      conflictDetected: "Konflikt mit bestehenden Öffnungszeiten erkannt",
    },
  },

  it: {
    title: "Orari e Disponibilità",
    subtitle: "Configurazione orari di apertura, slot e chiusure",

    days: {
      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
      sunday: "Domenica",
    },

    openingHours: {
      title: "Orari di apertura standard",
      description: "Definire le disponibilità predefinite della scuola guida",
      info: "Orari applicati per impostazione predefinita ai nuovi istruttori/aule, modificabile individualmente",
      dayColumn: "Giorno",
      openColumn: "Aperto",
      morningColumn: "Orari mattina",
      afternoonColumn: "Orari pomeriggio",
      actionsColumn: "Azioni",
      duplicate: "Duplica",
      copyAll: "Copia tutto",
      closed: "Chiuso",
      preview: "Anteprima settimana",
    },

    lessonSlots: {
      title: "Slot lezioni",
      description: "Configurare durate e slot delle lezioni pratiche",
      standardDuration: "Durata lezione standard",
      duration45: "45 minuti (consigliato)",
      duration60: "60 minuti",
      duration90: "90 minuti",
      durationCustom: "Altro (minuti)",
      granularity: "Granularità slot",
      granularity15: "15 minuti",
      granularity30: "30 minuti",
      granularity60: "60 minuti",
      allowDouble: "Consenti lezioni doppie",
      minimumBreak: "Pausa minima tra lezioni (minuti)",
      bookingAdvance: "Anticipo minimo prenotazione (ore)",
      cancellationDelay: "Termine cancellazione gratuita (ore)",
    },

    holidays: {
      title: "Giorni festivi svizzeri",
      description: "Gestione chiusure ufficiali",
      autoImport: "Importa automaticamente giorni festivi svizzeri",
      includeFederal: "Includi festività federali",
      includeCantonal: "Includi festività cantonali",
      syncNow: "Sincronizza ora",
      syncSuccess: "{count} giorni festivi importati",
      lastSync: "Ultima sincronizzazione: {date}",
      addCustom: "Aggiungi giorno festivo personalizzato",
      dateColumn: "Data",
      nameColumn: "Nome",
      typeColumn: "Tipo",
      recurringColumn: "Ripetizione",
      actionsColumn: "Azioni",
      recurring: "Annuale",
      types: {
        federal: "Federale",
        cantonal: "Cantonale",
        custom: "Personalizzato",
      },
    },

    closures: {
      title: "Ferie & Chiusure eccezionali",
      description: "Periodi di chiusura eccezionale della scuola completa",
      addClosure: "Aggiungi periodo chiusura",
      startDateColumn: "Data inizio",
      endDateColumn: "Data fine",
      durationColumn: "Durata",
      reasonColumn: "Motivo",
      visibleColumn: "Visibile allievi",
      notificationsColumn: "Notifiche",
      statusColumn: "Stato",
      actionsColumn: "Azioni",
      days: "{count} giorni",
      reasons: {
        vacation: "Vacanze",
        training: "Formazione",
        event: "Evento",
        maintenance: "Manutenzione",
        other: "Altro",
      },
      status: {
        upcoming: "Prossimo",
        ongoing: "In corso",
        past: "Passato",
      },
      impactWarning: "{count} lezioni pianificate saranno annullate",
      notifyStudents: "Notifica allievi con lezioni pianificate",
    },

    exceptions: {
      title: "Eccezioni puntuali",
      description:
        "Modificare orari per date specifiche senza influenzare lo standard",
      addException: "Aggiungi eccezione",
      dateColumn: "Data",
      hoursColumn: "Orari modificati",
      reasonColumn: "Motivo",
      actionsColumn: "Azioni",
      closed: "Chiuso",
      modified: "Orari modificati",
    },

    theoryCourses: {
      title: "Configurazione corsi teorici",
      description: "Pianificazione aule e sessioni",
      sessionDuration: "Durata sessione standard (ore)",
      lunchBreak: "Pausa pranzo (minuti)",
      preferredDays: "Giorni preferiti",
      minParticipants: "Partecipanti minimi",
      maxParticipants: "Partecipanti massimi",
    },

    actions: {
      save: "Salva orari",
      preview: "Anteprima impatto",
      cancel: "Annulla",
      edit: "Modifica",
      delete: "Elimina",
      confirm: "Conferma",
    },

    messages: {
      saveSuccess: "Orari aggiornati con successo",
      saveError: "Errore durante il salvataggio",
      deleteConfirm: "Confermare l'eliminazione?",
      conflictDetected: "Conflitto rilevato con orari esistenti",
    },
  },

  en: {
    title: "Business Hours & Availability",
    subtitle: "Configuration of opening hours, slots and closures",

    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },

    openingHours: {
      title: "Standard Opening Hours",
      description: "Define default availability of the driving school",
      info: "Hours applied by default to new instructors/rooms, individually modifiable",
      dayColumn: "Day",
      openColumn: "Open",
      morningColumn: "Morning Hours",
      afternoonColumn: "Afternoon Hours",
      actionsColumn: "Actions",
      duplicate: "Duplicate",
      copyAll: "Copy All",
      closed: "Closed",
      preview: "Week Preview",
    },

    lessonSlots: {
      title: "Lesson Slots",
      description: "Configure durations and slots for practical lessons",
      standardDuration: "Standard Lesson Duration",
      duration45: "45 minutes (recommended)",
      duration60: "60 minutes",
      duration90: "90 minutes",
      durationCustom: "Other (minutes)",
      granularity: "Slot Granularity",
      granularity15: "15 minutes",
      granularity30: "30 minutes",
      granularity60: "60 minutes",
      allowDouble: "Allow Double Lessons",
      minimumBreak: "Minimum Break Between Lessons (minutes)",
      bookingAdvance: "Minimum Booking Advance (hours)",
      cancellationDelay: "Free Cancellation Delay (hours)",
    },

    holidays: {
      title: "Swiss Public Holidays",
      description: "Management of official closures",
      autoImport: "Automatically import Swiss public holidays",
      includeFederal: "Include federal holidays",
      includeCantonal: "Include cantonal holidays",
      syncNow: "Sync Now",
      syncSuccess: "{count} holidays imported",
      lastSync: "Last sync: {date}",
      addCustom: "Add Custom Holiday",
      dateColumn: "Date",
      nameColumn: "Name",
      typeColumn: "Type",
      recurringColumn: "Recurring",
      actionsColumn: "Actions",
      recurring: "Annual",
      types: {
        federal: "Federal",
        cantonal: "Cantonal",
        custom: "Custom",
      },
    },

    closures: {
      title: "Holidays & Exceptional Closures",
      description: "Exceptional closure periods of the entire school",
      addClosure: "Add Closure Period",
      startDateColumn: "Start Date",
      endDateColumn: "End Date",
      durationColumn: "Duration",
      reasonColumn: "Reason",
      visibleColumn: "Visible to Students",
      notificationsColumn: "Notifications",
      statusColumn: "Status",
      actionsColumn: "Actions",
      days: "{count} days",
      reasons: {
        vacation: "Vacation",
        training: "Training",
        event: "Event",
        maintenance: "Maintenance",
        other: "Other",
      },
      status: {
        upcoming: "Upcoming",
        ongoing: "Ongoing",
        past: "Past",
      },
      impactWarning: "{count} scheduled lessons will be cancelled",
      notifyStudents: "Notify students with scheduled lessons",
    },

    exceptions: {
      title: "One-time Exceptions",
      description: "Modify hours for specific dates without affecting standard",
      addException: "Add Exception",
      dateColumn: "Date",
      hoursColumn: "Modified Hours",
      reasonColumn: "Reason",
      actionsColumn: "Actions",
      closed: "Closed",
      modified: "Modified Hours",
    },

    theoryCourses: {
      title: "Theory Courses Configuration",
      description: "Planning of rooms and sessions",
      sessionDuration: "Standard Session Duration (hours)",
      lunchBreak: "Lunch Break (minutes)",
      preferredDays: "Preferred Days",
      minParticipants: "Minimum Participants",
      maxParticipants: "Maximum Participants",
    },

    actions: {
      save: "Save Hours",
      preview: "Preview Impact",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
    },

    messages: {
      saveSuccess: "Hours updated successfully",
      saveError: "Error saving",
      deleteConfirm: "Confirm deletion?",
      conflictDetected: "Conflict detected with existing hours",
    },
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getBusinessHoursTranslation(
  locale: BusinessHoursLocale = "fr"
) {
  return businessHoursTranslations[locale];
}

export function formatDayName(
  day: DayOfWeek,
  locale: BusinessHoursLocale = "fr"
): string {
  return businessHoursTranslations[locale].days[day];
}

export function formatClosureReason(
  reason: ClosureReason,
  locale: BusinessHoursLocale = "fr"
): string {
  return businessHoursTranslations[locale].closures.reasons[reason];
}

export function formatHolidayType(
  type: HolidayType,
  locale: BusinessHoursLocale = "fr"
): string {
  return businessHoursTranslations[locale].holidays.types[type];
}

export function formatTimeRange(
  start: string,
  end: string,
  locale: BusinessHoursLocale = "fr"
): string {
  if (locale === "de") {
    return `${start} Uhr - ${end} Uhr`;
  }
  if (locale === "fr") {
    return `${start.replace(":", "h")} - ${end.replace(":", "h")}`;
  }
  return `${start} - ${end}`;
}
