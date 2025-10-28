/**
 * VIAMENTOR - Instructor Planning i18n
 * Traductions FR/DE/IT/EN pour planning moniteur
 */

import type { PlanningLocale } from "@/polymet/data/viamentor-instructor-planning-data";

// ============================================================================
// TYPES
// ============================================================================

export interface PlanningTranslations {
  header: {
    title: string;
    breadcrumb: string;
  };
  toolbar: {
    viewMonth: string;
    viewWeek: string;
    viewDay: string;
    viewAgenda: string;
    today: string;
    previous: string;
    next: string;
    availability: string;
    export: string;
    print: string;
    exportICal: string;
    exportGoogle: string;
  };
  calendar: {
    available: string;
    unavailable: string;
    lunchBreak: string;
    noEvents: string;
    eventsCount: string;
    scrollToNow: string;
  };
  availability: {
    title: string;
    description: string;
    infoMessage: string;
    weeklyTemplate: string;
    specificDates: string;
    bulkActions: string;
    save: string;
    cancel: string;
  };
  weeklyTemplate: {
    title: string;
    day: string;
    available: string;
    morningSlot: string;
    afternoonSlot: string;
    lunchBreak: string;
    applyToAll: string;
    saveTemplate: string;
    duplicate: string;
  };
  dateOverrides: {
    title: string;
    description: string;
    date: string;
    hours: string;
    reason: string;
    addException: string;
    unavailableAll: string;
    customHours: string;
    notifyAdmin: string;
    delete: string;
    edit: string;
  };
  bulkActions: {
    title: string;
    dateRange: string;
    cancelLessons: string;
    reason: string;
    confirm: string;
    successMessage: string;
  };
  sync: {
    title: string;
    description: string;
    googleCalendar: string;
    outlookCalendar: string;
    connect: string;
    disconnect: string;
    selectCalendars: string;
    importAsUnavailable: string;
    exportLessons: string;
    lastSync: string;
    syncNow: string;
    syncing: string;
    iCalTitle: string;
    iCalDescription: string;
    copyLink: string;
    linkCopied: string;
    instructions: string;
  };
  notifications: {
    title: string;
    description: string;
    newLesson: string;
    lessonModified: string;
    reminder: string;
    reminderHours: string;
    conflicts: string;
    availabilityFull: string;
    save: string;
  };
  eventDetails: {
    student: string;
    category: string;
    vehicle: string;
    meeting: string;
    objectives: string;
    status: string;
    viewDetails: string;
    modify: string;
    cancel: string;
    contact: string;
    start: string;
  };
  status: {
    confirmed: string;
    tentative: string;
    cancelled: string;
    completed: string;
  };
  conflicts: {
    detected: string;
    message: string;
    suggestions: string;
    alternative: string;
  };
  reasons: {
    vacation: string;
    training: string;
    medical: string;
    personal: string;
    other: string;
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations: Record<PlanningLocale, PlanningTranslations> = {
  fr: {
    header: {
      title: "Mon Planning",
      breadcrumb: "Mon planning",
    },
    toolbar: {
      viewMonth: "Mois",
      viewWeek: "Semaine",
      viewDay: "Jour",
      viewAgenda: "Agenda",
      today: "Aujourd'hui",
      previous: "Précédent",
      next: "Suivant",
      availability: "Mes disponibilités",
      export: "Exporter",
      print: "Imprimer",
      exportICal: "iCal",
      exportGoogle: "Google Calendar",
    },
    calendar: {
      available: "Disponible",
      unavailable: "Indisponible",
      lunchBreak: "Pause déjeuner",
      noEvents: "Aucun événement",
      eventsCount: "événements",
      scrollToNow: "Aller à maintenant",
    },
    availability: {
      title: "Gérer mes disponibilités",
      description: "Configure les créneaux où tu es disponible pour enseigner",
      infoMessage:
        "Les élèves peuvent réserver sur tes créneaux disponibles selon les paramètres de l'auto-école",
      weeklyTemplate: "Modèle hebdomadaire récurrent",
      specificDates: "Exceptions dates spécifiques",
      bulkActions: "Congés prolongés",
      save: "Sauvegarder",
      cancel: "Annuler",
    },
    weeklyTemplate: {
      title: "Modèle hebdomadaire",
      day: "Jour",
      available: "Disponible",
      morningSlot: "Horaires matin",
      afternoonSlot: "Horaires après-midi",
      lunchBreak: "Pause déjeuner",
      applyToAll: "Appliquer à tous les jours",
      saveTemplate: "Sauvegarder le modèle",
      duplicate: "Dupliquer",
    },
    dateOverrides: {
      title: "Exceptions dates spécifiques",
      description:
        "Modifier ta disponibilité ponctuelle sans changer le modèle",
      date: "Date",
      hours: "Horaires",
      reason: "Raison",
      addException: "Ajouter une exception",
      unavailableAll: "Indisponible complet",
      customHours: "Horaires modifiés",
      notifyAdmin: "Notifier l'admin",
      delete: "Supprimer",
      edit: "Modifier",
    },
    bulkActions: {
      title: "Congés prolongés",
      dateRange: "Période",
      cancelLessons: "Annuler les leçons planifiées",
      reason: "Raison",
      confirm: "Confirmer les congés",
      successMessage: "jours bloqués, leçons annulées/reportées",
    },
    sync: {
      title: "Synchronisation calendriers externes",
      description:
        "Connecte tes calendriers Google/Outlook pour afficher les événements importés et éviter les conflits",
      googleCalendar: "Google Calendar",
      outlookCalendar: "Outlook Calendar",
      connect: "Connecter",
      disconnect: "Déconnecter",
      selectCalendars: "Sélectionner les calendriers",
      importAsUnavailable:
        "Importer les événements externes comme indisponibilités",
      exportLessons: "Exporter mes leçons vers le calendrier externe",
      lastSync: "Dernière sync",
      syncNow: "Synchroniser maintenant",
      syncing: "Synchronisation en cours...",
      iCalTitle: "Lien iCal",
      iCalDescription:
        "Abonne-toi à ton planning depuis tes apps calendrier (Apple Calendar, Outlook, Thunderbird)",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié !",
      instructions: "Comment ajouter ce calendrier ?",
    },
    notifications: {
      title: "Notifications planning",
      description: "Reçois des alertes sur les événements de ton planning",
      newLesson: "Nouvelle leçon réservée par un élève",
      lessonModified: "Leçon modifiée/annulée par un élève",
      reminder: "Rappel de leçon",
      reminderHours: "heures avant",
      conflicts: "Conflits de planning détectés",
      availabilityFull: "Disponibilités bientôt complètes",
      save: "Sauvegarder les préférences",
    },
    eventDetails: {
      student: "Élève",
      category: "Catégorie",
      vehicle: "Véhicule",
      meeting: "Point de RDV",
      objectives: "Objectifs",
      status: "Statut",
      viewDetails: "Voir détail",
      modify: "Modifier",
      cancel: "Annuler",
      contact: "Contacter",
      start: "Démarrer",
    },
    status: {
      confirmed: "Confirmée",
      tentative: "Tentative",
      cancelled: "Annulée",
      completed: "Terminée",
    },
    conflicts: {
      detected: "Conflit détecté",
      message: "Un conflit a été détecté avec un événement existant",
      suggestions: "Créneaux alternatifs disponibles",
      alternative: "Alternative",
    },
    reasons: {
      vacation: "Congé",
      training: "Formation",
      medical: "RDV médical",
      personal: "Personnel",
      other: "Autre",
    },
  },
  de: {
    header: {
      title: "Meine Planung",
      breadcrumb: "Meine Planung",
    },
    toolbar: {
      viewMonth: "Monat",
      viewWeek: "Woche",
      viewDay: "Tag",
      viewAgenda: "Agenda",
      today: "Heute",
      previous: "Zurück",
      next: "Weiter",
      availability: "Meine Verfügbarkeit",
      export: "Exportieren",
      print: "Drucken",
      exportICal: "iCal",
      exportGoogle: "Google Kalender",
    },
    calendar: {
      available: "Verfügbar",
      unavailable: "Nicht verfügbar",
      lunchBreak: "Mittagspause",
      noEvents: "Keine Ereignisse",
      eventsCount: "Ereignisse",
      scrollToNow: "Zu jetzt gehen",
    },
    availability: {
      title: "Verfügbarkeit verwalten",
      description:
        "Konfiguriere die Zeitfenster, in denen du zum Unterrichten verfügbar bist",
      infoMessage:
        "Schüler können gemäß den Fahrschuleinstellungen auf deine verfügbaren Zeitfenster buchen",
      weeklyTemplate: "Wiederkehrende Wochenvorlage",
      specificDates: "Ausnahmen für bestimmte Daten",
      bulkActions: "Längerer Urlaub",
      save: "Speichern",
      cancel: "Abbrechen",
    },
    weeklyTemplate: {
      title: "Wochenvorlage",
      day: "Tag",
      available: "Verfügbar",
      morningSlot: "Vormittagszeiten",
      afternoonSlot: "Nachmittagszeiten",
      lunchBreak: "Mittagspause",
      applyToAll: "Auf alle Tage anwenden",
      saveTemplate: "Vorlage speichern",
      duplicate: "Duplizieren",
    },
    dateOverrides: {
      title: "Ausnahmen für bestimmte Daten",
      description:
        "Ändere deine Verfügbarkeit punktuell, ohne die Vorlage zu ändern",
      date: "Datum",
      hours: "Zeiten",
      reason: "Grund",
      addException: "Ausnahme hinzufügen",
      unavailableAll: "Komplett nicht verfügbar",
      customHours: "Geänderte Zeiten",
      notifyAdmin: "Admin benachrichtigen",
      delete: "Löschen",
      edit: "Bearbeiten",
    },
    bulkActions: {
      title: "Längerer Urlaub",
      dateRange: "Zeitraum",
      cancelLessons: "Geplante Lektionen stornieren",
      reason: "Grund",
      confirm: "Urlaub bestätigen",
      successMessage: "Tage blockiert, Lektionen storniert/verschoben",
    },
    sync: {
      title: "Externe Kalender synchronisieren",
      description:
        "Verbinde deine Google/Outlook-Kalender, um importierte Ereignisse anzuzeigen und Konflikte zu vermeiden",
      googleCalendar: "Google Kalender",
      outlookCalendar: "Outlook Kalender",
      connect: "Verbinden",
      disconnect: "Trennen",
      selectCalendars: "Kalender auswählen",
      importAsUnavailable:
        "Externe Ereignisse als Nichtverfügbarkeit importieren",
      exportLessons: "Meine Lektionen in externen Kalender exportieren",
      lastSync: "Letzte Synchronisation",
      syncNow: "Jetzt synchronisieren",
      syncing: "Synchronisierung läuft...",
      iCalTitle: "iCal-Link",
      iCalDescription:
        "Abonniere deine Planung von deinen Kalender-Apps (Apple Calendar, Outlook, Thunderbird)",
      copyLink: "Link kopieren",
      linkCopied: "Link kopiert!",
      instructions: "Wie füge ich diesen Kalender hinzu?",
    },
    notifications: {
      title: "Planungsbenachrichtigungen",
      description:
        "Erhalte Benachrichtigungen über Ereignisse in deiner Planung",
      newLesson: "Neue Lektion von einem Schüler gebucht",
      lessonModified: "Lektion von einem Schüler geändert/storniert",
      reminder: "Lektionserinnerung",
      reminderHours: "Stunden vorher",
      conflicts: "Planungskonflikte erkannt",
      availabilityFull: "Verfügbarkeit bald voll",
      save: "Einstellungen speichern",
    },
    eventDetails: {
      student: "Schüler",
      category: "Kategorie",
      vehicle: "Fahrzeug",
      meeting: "Treffpunkt",
      objectives: "Ziele",
      status: "Status",
      viewDetails: "Details anzeigen",
      modify: "Ändern",
      cancel: "Stornieren",
      contact: "Kontaktieren",
      start: "Starten",
    },
    status: {
      confirmed: "Bestätigt",
      tentative: "Vorläufig",
      cancelled: "Storniert",
      completed: "Abgeschlossen",
    },
    conflicts: {
      detected: "Konflikt erkannt",
      message: "Ein Konflikt mit einem bestehenden Ereignis wurde erkannt",
      suggestions: "Alternative verfügbare Zeitfenster",
      alternative: "Alternative",
    },
    reasons: {
      vacation: "Urlaub",
      training: "Schulung",
      medical: "Arzttermin",
      personal: "Persönlich",
      other: "Andere",
    },
  },
  it: {
    header: {
      title: "La Mia Pianificazione",
      breadcrumb: "La mia pianificazione",
    },
    toolbar: {
      viewMonth: "Mese",
      viewWeek: "Settimana",
      viewDay: "Giorno",
      viewAgenda: "Agenda",
      today: "Oggi",
      previous: "Precedente",
      next: "Successivo",
      availability: "Le Mie Disponibilità",
      export: "Esporta",
      print: "Stampa",
      exportICal: "iCal",
      exportGoogle: "Google Calendar",
    },
    calendar: {
      available: "Disponibile",
      unavailable: "Non disponibile",
      lunchBreak: "Pausa pranzo",
      noEvents: "Nessun evento",
      eventsCount: "eventi",
      scrollToNow: "Vai a ora",
    },
    availability: {
      title: "Gestisci le mie disponibilità",
      description:
        "Configura le fasce orarie in cui sei disponibile per insegnare",
      infoMessage:
        "Gli studenti possono prenotare sulle tue fasce disponibili secondo le impostazioni della scuola guida",
      weeklyTemplate: "Modello settimanale ricorrente",
      specificDates: "Eccezioni date specifiche",
      bulkActions: "Ferie prolungate",
      save: "Salva",
      cancel: "Annulla",
    },
    weeklyTemplate: {
      title: "Modello settimanale",
      day: "Giorno",
      available: "Disponibile",
      morningSlot: "Orari mattina",
      afternoonSlot: "Orari pomeriggio",
      lunchBreak: "Pausa pranzo",
      applyToAll: "Applica a tutti i giorni",
      saveTemplate: "Salva modello",
      duplicate: "Duplica",
    },
    dateOverrides: {
      title: "Eccezioni date specifiche",
      description:
        "Modifica la tua disponibilità puntuale senza cambiare il modello",
      date: "Data",
      hours: "Orari",
      reason: "Motivo",
      addException: "Aggiungi eccezione",
      unavailableAll: "Non disponibile completamente",
      customHours: "Orari modificati",
      notifyAdmin: "Notifica admin",
      delete: "Elimina",
      edit: "Modifica",
    },
    bulkActions: {
      title: "Ferie prolungate",
      dateRange: "Periodo",
      cancelLessons: "Annulla lezioni pianificate",
      reason: "Motivo",
      confirm: "Conferma ferie",
      successMessage: "giorni bloccati, lezioni annullate/rimandate",
    },
    sync: {
      title: "Sincronizzazione calendari esterni",
      description:
        "Connetti i tuoi calendari Google/Outlook per visualizzare gli eventi importati ed evitare conflitti",
      googleCalendar: "Google Calendar",
      outlookCalendar: "Outlook Calendar",
      connect: "Connetti",
      disconnect: "Disconnetti",
      selectCalendars: "Seleziona calendari",
      importAsUnavailable: "Importa eventi esterni come non disponibilità",
      exportLessons: "Esporta le mie lezioni nel calendario esterno",
      lastSync: "Ultima sincronizzazione",
      syncNow: "Sincronizza ora",
      syncing: "Sincronizzazione in corso...",
      iCalTitle: "Link iCal",
      iCalDescription:
        "Abbonati alla tua pianificazione dalle tue app calendario (Apple Calendar, Outlook, Thunderbird)",
      copyLink: "Copia link",
      linkCopied: "Link copiato!",
      instructions: "Come aggiungere questo calendario?",
    },
    notifications: {
      title: "Notifiche pianificazione",
      description: "Ricevi avvisi sugli eventi della tua pianificazione",
      newLesson: "Nuova lezione prenotata da uno studente",
      lessonModified: "Lezione modificata/annullata da uno studente",
      reminder: "Promemoria lezione",
      reminderHours: "ore prima",
      conflicts: "Conflitti di pianificazione rilevati",
      availabilityFull: "Disponibilità quasi complete",
      save: "Salva preferenze",
    },
    eventDetails: {
      student: "Studente",
      category: "Categoria",
      vehicle: "Veicolo",
      meeting: "Punto di incontro",
      objectives: "Obiettivi",
      status: "Stato",
      viewDetails: "Vedi dettagli",
      modify: "Modifica",
      cancel: "Annulla",
      contact: "Contatta",
      start: "Inizia",
    },
    status: {
      confirmed: "Confermata",
      tentative: "Tentativa",
      cancelled: "Annullata",
      completed: "Completata",
    },
    conflicts: {
      detected: "Conflitto rilevato",
      message: "È stato rilevato un conflitto con un evento esistente",
      suggestions: "Fasce alternative disponibili",
      alternative: "Alternativa",
    },
    reasons: {
      vacation: "Ferie",
      training: "Formazione",
      medical: "Appuntamento medico",
      personal: "Personale",
      other: "Altro",
    },
  },
  en: {
    header: {
      title: "My Schedule",
      breadcrumb: "My schedule",
    },
    toolbar: {
      viewMonth: "Month",
      viewWeek: "Week",
      viewDay: "Day",
      viewAgenda: "Agenda",
      today: "Today",
      previous: "Previous",
      next: "Next",
      availability: "My Availability",
      export: "Export",
      print: "Print",
      exportICal: "iCal",
      exportGoogle: "Google Calendar",
    },
    calendar: {
      available: "Available",
      unavailable: "Unavailable",
      lunchBreak: "Lunch break",
      noEvents: "No events",
      eventsCount: "events",
      scrollToNow: "Go to now",
    },
    availability: {
      title: "Manage my availability",
      description: "Configure the time slots when you are available to teach",
      infoMessage:
        "Students can book on your available slots according to the driving school settings",
      weeklyTemplate: "Recurring weekly template",
      specificDates: "Specific date exceptions",
      bulkActions: "Extended leave",
      save: "Save",
      cancel: "Cancel",
    },
    weeklyTemplate: {
      title: "Weekly template",
      day: "Day",
      available: "Available",
      morningSlot: "Morning hours",
      afternoonSlot: "Afternoon hours",
      lunchBreak: "Lunch break",
      applyToAll: "Apply to all days",
      saveTemplate: "Save template",
      duplicate: "Duplicate",
    },
    dateOverrides: {
      title: "Specific date exceptions",
      description:
        "Modify your availability temporarily without changing the template",
      date: "Date",
      hours: "Hours",
      reason: "Reason",
      addException: "Add exception",
      unavailableAll: "Completely unavailable",
      customHours: "Modified hours",
      notifyAdmin: "Notify admin",
      delete: "Delete",
      edit: "Edit",
    },
    bulkActions: {
      title: "Extended leave",
      dateRange: "Period",
      cancelLessons: "Cancel scheduled lessons",
      reason: "Reason",
      confirm: "Confirm leave",
      successMessage: "days blocked, lessons cancelled/rescheduled",
    },
    sync: {
      title: "External calendar sync",
      description:
        "Connect your Google/Outlook calendars to display imported events and avoid conflicts",
      googleCalendar: "Google Calendar",
      outlookCalendar: "Outlook Calendar",
      connect: "Connect",
      disconnect: "Disconnect",
      selectCalendars: "Select calendars",
      importAsUnavailable: "Import external events as unavailability",
      exportLessons: "Export my lessons to external calendar",
      lastSync: "Last sync",
      syncNow: "Sync now",
      syncing: "Syncing...",
      iCalTitle: "iCal Link",
      iCalDescription:
        "Subscribe to your schedule from your calendar apps (Apple Calendar, Outlook, Thunderbird)",
      copyLink: "Copy link",
      linkCopied: "Link copied!",
      instructions: "How to add this calendar?",
    },
    notifications: {
      title: "Schedule notifications",
      description: "Receive alerts about events in your schedule",
      newLesson: "New lesson booked by a student",
      lessonModified: "Lesson modified/cancelled by a student",
      reminder: "Lesson reminder",
      reminderHours: "hours before",
      conflicts: "Schedule conflicts detected",
      availabilityFull: "Availability almost full",
      save: "Save preferences",
    },
    eventDetails: {
      student: "Student",
      category: "Category",
      vehicle: "Vehicle",
      meeting: "Meeting point",
      objectives: "Objectives",
      status: "Status",
      viewDetails: "View details",
      modify: "Modify",
      cancel: "Cancel",
      contact: "Contact",
      start: "Start",
    },
    status: {
      confirmed: "Confirmed",
      tentative: "Tentative",
      cancelled: "Cancelled",
      completed: "Completed",
    },
    conflicts: {
      detected: "Conflict detected",
      message: "A conflict has been detected with an existing event",
      suggestions: "Alternative available slots",
      alternative: "Alternative",
    },
    reasons: {
      vacation: "Vacation",
      training: "Training",
      medical: "Medical appointment",
      personal: "Personal",
      other: "Other",
    },
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export function getPlanningTranslations(
  locale: PlanningLocale
): PlanningTranslations {
  return translations[locale];
}
