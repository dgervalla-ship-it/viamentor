/**
 * VIAMENTOR - Secretary Dashboard i18n
 * Traductions FR/DE/IT/EN pour dashboard secrétariat
 */

export type SecretaryDashboardLocale = "fr" | "de" | "it" | "en";

export const secretaryDashboardTranslations = {
  fr: {
    // Header
    breadcrumb: "Secrétariat",
    greeting: {
      morning: "Bonjour",
      afternoon: "Bon après-midi",
      evening: "Bonsoir",
    },
    todayDate: "Aujourd'hui",

    // Tabs
    tabs: {
      dashboard: "Tableau de bord",
      inscriptions: "Inscriptions",
      planning: "Planning",
      messages: "Messages",
      tasks: "Tâches",
    },

    // Today's Overview
    overview: {
      title: "Aperçu du jour",
      encouragement: {
        morning: "Belle journée! Tu gères {count} tâches",
        afternoon: "Bon courage! Tu gères {count} tâches",
        evening: "Presque fini! Tu gères {count} tâches",
      },
      stats: {
        calls: "Appels reçus",
        inscriptions: "Inscriptions créées",
        lessons: "Leçons planifiées",
        messages: "Messages traités",
      },
    },

    // Quick Stats
    quickStats: {
      urgentTasks: {
        title: "Tâches prioritaires",
        alert: "Beaucoup aujourd'hui!",
        button: "Voir liste",
      },
      messages: {
        title: "Appels/Messages",
        waiting: "En attente",
        button: "Messages",
      },
      lessonsToday: {
        title: "Leçons aujourd'hui",
        button: "Voir planning",
      },
      newProspects: {
        title: "Nouveaux prospects",
        thisMonth: "Ce mois",
        button: "Convertir",
      },
    },

    // Tasks
    tasks: {
      title: "Mes tâches aujourd'hui",
      filters: {
        all: "Toutes",
        urgent: "Urgentes",
        mine: "Mes tâches",
        assigned: "Assignées à moi",
      },
      types: {
        phone: "Appel",
        email: "Email",
        document: "Document",
        payment: "Paiement",
        booking: "Réservation",
        follow_up: "Suivi",
      },
      priority: {
        1: "Basse",
        2: "Moyenne",
        3: "Haute",
      },
      status: {
        pending: "En attente",
        in_progress: "En cours",
        completed: "Terminée",
        cancelled: "Annulée",
      },
      actions: {
        markDone: "Marquer fait",
        postpone: "Reporter",
        assign: "Assigner",
        delete: "Supprimer",
      },
      emptyState: {
        title: "Toutes tâches terminées!",
        subtitle: "Bravo!",
      },
      newTask: "Nouvelle tâche",
      dueIn: "Dans",
      overdue: "Échéance dépassée!",
    },

    // Quick Actions
    quickActions: {
      title: "Actions rapides",
      newStudent: {
        title: "Nouvel élève",
        description: "Inscription rapide",
      },
      bookLesson: {
        title: "Réserver leçon",
        description: "Planning élève",
      },
      callProspect: {
        title: "Appel prospect",
        description: "CRM & suivi",
      },
      sendEmail: {
        title: "Email groupe",
        description: "Communication",
      },
    },

    // Messages
    messages: {
      title: "Messages & communications",
      tabs: {
        all: "Tous",
        unread: "Non lus",
        urgent: "Urgents",
        archived: "Archivés",
      },
      types: {
        email: "Email",
        sms: "SMS",
        internal: "Interne",
        whatsapp: "WhatsApp",
      },
      priority: {
        normal: "Normal",
        urgent: "Urgent",
      },
      status: {
        unread: "Non lu",
        read: "Lu",
        archived: "Archivé",
      },
      actions: {
        reply: "Répondre",
        archive: "Archiver",
        delete: "Supprimer",
      },
    },

    // Phone Log
    phoneLog: {
      title: "Journal téléphonique",
      direction: {
        incoming: "Entrant",
        outgoing: "Sortant",
        missed: "Manqué",
      },
      duration: "Durée",
      notes: "Notes",
      addNote: "Ajouter note",
    },

    // Recent Activity
    activity: {
      title: "Activité récente",
      types: {
        inscription: "a inscrit",
        booking: "a réservé une leçon pour",
        call: "a appelé",
        message: "a envoyé un message à",
        task_completed: "a terminé la tâche",
        payment: "a enregistré un paiement de",
      },
      viewAll: "Historique complet",
    },

    // Appointments
    appointments: {
      title: "RDV & événements prochains",
      types: {
        prospect_visit: "Visite prospect",
        inscription_meeting: "RDV inscription",
        scheduled_call: "Appel planifié",
        team_meeting: "Réunion équipe",
      },
      status: {
        scheduled: "Planifié",
        confirmed: "Confirmé",
        cancelled: "Annulé",
      },
      actions: {
        view: "Voir détail",
        confirm: "Confirmer",
        postpone: "Reporter",
        cancel: "Annuler",
      },
      syncCalendar: "Synchroniser Google Calendar",
    },

    // School Info
    schoolInfo: {
      title: "Auto-école",
      openingHours: "Horaires ouverture",
      currentStatus: {
        open: "Ouvert",
        closed: "Fermé",
      },
      availableInstructors: "Moniteurs disponibles",
      availableVehicles: "Véhicules disponibles",
      instructorStatus: {
        available: "Disponible",
        in_lesson: "En leçon",
        break: "Pause",
      },
      editInfo: "Modifier infos",
      usefulLinks: "Liens utiles",
    },

    // Notifications
    notifications: {
      title: "Notifications",
      markAllRead: "Tout marquer lu",
      settings: "Paramètres notifications",
      types: {
        task_assigned: "Tâche assignée",
        message_received: "Message reçu",
        booking_created: "Réservation créée",
        payment_received: "Paiement reçu",
        document_uploaded: "Document uploadé",
        system_alert: "Alerte système",
      },
    },

    // Common
    common: {
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      view: "Voir",
      create: "Créer",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      refresh: "Actualiser",
      loading: "Chargement...",
      noData: "Aucune donnée",
      error: "Erreur",
      success: "Succès",
    },
  },

  de: {
    breadcrumb: "Sekretariat",
    greeting: {
      morning: "Guten Morgen",
      afternoon: "Guten Tag",
      evening: "Guten Abend",
    },
    todayDate: "Heute",

    tabs: {
      dashboard: "Dashboard",
      inscriptions: "Anmeldungen",
      planning: "Planung",
      messages: "Nachrichten",
      tasks: "Aufgaben",
    },

    overview: {
      title: "Tagesübersicht",
      encouragement: {
        morning: "Schönen Tag! Du verwaltest {count} Aufgaben",
        afternoon: "Viel Erfolg! Du verwaltest {count} Aufgaben",
        evening: "Fast geschafft! Du verwaltest {count} Aufgaben",
      },
      stats: {
        calls: "Anrufe erhalten",
        inscriptions: "Anmeldungen erstellt",
        lessons: "Lektionen geplant",
        messages: "Nachrichten bearbeitet",
      },
    },

    quickStats: {
      urgentTasks: {
        title: "Prioritätsaufgaben",
        alert: "Viel heute!",
        button: "Liste anzeigen",
      },
      messages: {
        title: "Anrufe/Nachrichten",
        waiting: "Wartend",
        button: "Nachrichten",
      },
      lessonsToday: {
        title: "Lektionen heute",
        button: "Planung anzeigen",
      },
      newProspects: {
        title: "Neue Interessenten",
        thisMonth: "Diesen Monat",
        button: "Konvertieren",
      },
    },

    tasks: {
      title: "Meine Aufgaben heute",
      filters: {
        all: "Alle",
        urgent: "Dringend",
        mine: "Meine Aufgaben",
        assigned: "Mir zugewiesen",
      },
      types: {
        phone: "Anruf",
        email: "E-Mail",
        document: "Dokument",
        payment: "Zahlung",
        booking: "Buchung",
        follow_up: "Nachverfolgung",
      },
      priority: {
        1: "Niedrig",
        2: "Mittel",
        3: "Hoch",
      },
      status: {
        pending: "Ausstehend",
        in_progress: "In Bearbeitung",
        completed: "Abgeschlossen",
        cancelled: "Abgebrochen",
      },
      actions: {
        markDone: "Als erledigt markieren",
        postpone: "Verschieben",
        assign: "Zuweisen",
        delete: "Löschen",
      },
      emptyState: {
        title: "Alle Aufgaben erledigt!",
        subtitle: "Bravo!",
      },
      newTask: "Neue Aufgabe",
      dueIn: "In",
      overdue: "Überfällig!",
    },

    quickActions: {
      title: "Schnellaktionen",
      newStudent: {
        title: "Neuer Schüler",
        description: "Schnellanmeldung",
      },
      bookLesson: {
        title: "Lektion buchen",
        description: "Schülerplanung",
      },
      callProspect: {
        title: "Interessent anrufen",
        description: "CRM & Nachverfolgung",
      },
      sendEmail: {
        title: "Gruppen-E-Mail",
        description: "Kommunikation",
      },
    },

    messages: {
      title: "Nachrichten & Kommunikation",
      tabs: {
        all: "Alle",
        unread: "Ungelesen",
        urgent: "Dringend",
        archived: "Archiviert",
      },
      types: {
        email: "E-Mail",
        sms: "SMS",
        internal: "Intern",
        whatsapp: "WhatsApp",
      },
      priority: {
        normal: "Normal",
        urgent: "Dringend",
      },
      status: {
        unread: "Ungelesen",
        read: "Gelesen",
        archived: "Archiviert",
      },
      actions: {
        reply: "Antworten",
        archive: "Archivieren",
        delete: "Löschen",
      },
    },

    phoneLog: {
      title: "Telefonprotokoll",
      direction: {
        incoming: "Eingehend",
        outgoing: "Ausgehend",
        missed: "Verpasst",
      },
      duration: "Dauer",
      notes: "Notizen",
      addNote: "Notiz hinzufügen",
    },

    activity: {
      title: "Letzte Aktivität",
      types: {
        inscription: "hat angemeldet",
        booking: "hat eine Lektion gebucht für",
        call: "hat angerufen",
        message: "hat eine Nachricht gesendet an",
        task_completed: "hat die Aufgabe abgeschlossen",
        payment: "hat eine Zahlung registriert von",
      },
      viewAll: "Vollständiger Verlauf",
    },

    appointments: {
      title: "Termine & kommende Ereignisse",
      types: {
        prospect_visit: "Interessentenbesuch",
        inscription_meeting: "Anmeldungstermin",
        scheduled_call: "Geplanter Anruf",
        team_meeting: "Teambesprechung",
      },
      status: {
        scheduled: "Geplant",
        confirmed: "Bestätigt",
        cancelled: "Abgesagt",
      },
      actions: {
        view: "Details anzeigen",
        confirm: "Bestätigen",
        postpone: "Verschieben",
        cancel: "Absagen",
      },
      syncCalendar: "Google Kalender synchronisieren",
    },

    schoolInfo: {
      title: "Fahrschule",
      openingHours: "Öffnungszeiten",
      currentStatus: {
        open: "Geöffnet",
        closed: "Geschlossen",
      },
      availableInstructors: "Verfügbare Fahrlehrer",
      availableVehicles: "Verfügbare Fahrzeuge",
      instructorStatus: {
        available: "Verfügbar",
        in_lesson: "In Lektion",
        break: "Pause",
      },
      editInfo: "Infos bearbeiten",
      usefulLinks: "Nützliche Links",
    },

    notifications: {
      title: "Benachrichtigungen",
      markAllRead: "Alle als gelesen markieren",
      settings: "Benachrichtigungseinstellungen",
      types: {
        task_assigned: "Aufgabe zugewiesen",
        message_received: "Nachricht erhalten",
        booking_created: "Buchung erstellt",
        payment_received: "Zahlung erhalten",
        document_uploaded: "Dokument hochgeladen",
        system_alert: "Systemwarnung",
      },
    },

    common: {
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      view: "Anzeigen",
      create: "Erstellen",
      search: "Suchen",
      filter: "Filtern",
      export: "Exportieren",
      refresh: "Aktualisieren",
      loading: "Laden...",
      noData: "Keine Daten",
      error: "Fehler",
      success: "Erfolg",
    },
  },

  it: {
    breadcrumb: "Segreteria",
    greeting: {
      morning: "Buongiorno",
      afternoon: "Buon pomeriggio",
      evening: "Buonasera",
    },
    todayDate: "Oggi",

    tabs: {
      dashboard: "Dashboard",
      inscriptions: "Iscrizioni",
      planning: "Pianificazione",
      messages: "Messaggi",
      tasks: "Compiti",
    },

    overview: {
      title: "Panoramica del giorno",
      encouragement: {
        morning: "Buona giornata! Gestisci {count} compiti",
        afternoon: "Buon lavoro! Gestisci {count} compiti",
        evening: "Quasi finito! Gestisci {count} compiti",
      },
      stats: {
        calls: "Chiamate ricevute",
        inscriptions: "Iscrizioni create",
        lessons: "Lezioni pianificate",
        messages: "Messaggi elaborati",
      },
    },

    quickStats: {
      urgentTasks: {
        title: "Compiti prioritari",
        alert: "Molti oggi!",
        button: "Vedi lista",
      },
      messages: {
        title: "Chiamate/Messaggi",
        waiting: "In attesa",
        button: "Messaggi",
      },
      lessonsToday: {
        title: "Lezioni oggi",
        button: "Vedi pianificazione",
      },
      newProspects: {
        title: "Nuovi prospect",
        thisMonth: "Questo mese",
        button: "Convertire",
      },
    },

    tasks: {
      title: "I miei compiti oggi",
      filters: {
        all: "Tutti",
        urgent: "Urgenti",
        mine: "I miei compiti",
        assigned: "Assegnati a me",
      },
      types: {
        phone: "Chiamata",
        email: "Email",
        document: "Documento",
        payment: "Pagamento",
        booking: "Prenotazione",
        follow_up: "Follow-up",
      },
      priority: {
        1: "Bassa",
        2: "Media",
        3: "Alta",
      },
      status: {
        pending: "In attesa",
        in_progress: "In corso",
        completed: "Completato",
        cancelled: "Annullato",
      },
      actions: {
        markDone: "Segna fatto",
        postpone: "Posticipare",
        assign: "Assegnare",
        delete: "Eliminare",
      },
      emptyState: {
        title: "Tutti i compiti completati!",
        subtitle: "Bravo!",
      },
      newTask: "Nuovo compito",
      dueIn: "Tra",
      overdue: "Scadenza superata!",
    },

    quickActions: {
      title: "Azioni rapide",
      newStudent: {
        title: "Nuovo allievo",
        description: "Iscrizione rapida",
      },
      bookLesson: {
        title: "Prenota lezione",
        description: "Pianificazione allievo",
      },
      callProspect: {
        title: "Chiama prospect",
        description: "CRM & follow-up",
      },
      sendEmail: {
        title: "Email gruppo",
        description: "Comunicazione",
      },
    },

    messages: {
      title: "Messaggi & comunicazioni",
      tabs: {
        all: "Tutti",
        unread: "Non letti",
        urgent: "Urgenti",
        archived: "Archiviati",
      },
      types: {
        email: "Email",
        sms: "SMS",
        internal: "Interno",
        whatsapp: "WhatsApp",
      },
      priority: {
        normal: "Normale",
        urgent: "Urgente",
      },
      status: {
        unread: "Non letto",
        read: "Letto",
        archived: "Archiviato",
      },
      actions: {
        reply: "Rispondi",
        archive: "Archivia",
        delete: "Elimina",
      },
    },

    phoneLog: {
      title: "Registro telefonico",
      direction: {
        incoming: "In entrata",
        outgoing: "In uscita",
        missed: "Perso",
      },
      duration: "Durata",
      notes: "Note",
      addNote: "Aggiungi nota",
    },

    activity: {
      title: "Attività recente",
      types: {
        inscription: "ha iscritto",
        booking: "ha prenotato una lezione per",
        call: "ha chiamato",
        message: "ha inviato un messaggio a",
        task_completed: "ha completato il compito",
        payment: "ha registrato un pagamento di",
      },
      viewAll: "Cronologia completa",
    },

    appointments: {
      title: "Appuntamenti & eventi prossimi",
      types: {
        prospect_visit: "Visita prospect",
        inscription_meeting: "Appuntamento iscrizione",
        scheduled_call: "Chiamata pianificata",
        team_meeting: "Riunione team",
      },
      status: {
        scheduled: "Pianificato",
        confirmed: "Confermato",
        cancelled: "Annullato",
      },
      actions: {
        view: "Vedi dettagli",
        confirm: "Conferma",
        postpone: "Posticipa",
        cancel: "Annulla",
      },
      syncCalendar: "Sincronizza Google Calendar",
    },

    schoolInfo: {
      title: "Scuola guida",
      openingHours: "Orari apertura",
      currentStatus: {
        open: "Aperto",
        closed: "Chiuso",
      },
      availableInstructors: "Istruttori disponibili",
      availableVehicles: "Veicoli disponibili",
      instructorStatus: {
        available: "Disponibile",
        in_lesson: "In lezione",
        break: "Pausa",
      },
      editInfo: "Modifica info",
      usefulLinks: "Link utili",
    },

    notifications: {
      title: "Notifiche",
      markAllRead: "Segna tutto letto",
      settings: "Impostazioni notifiche",
      types: {
        task_assigned: "Compito assegnato",
        message_received: "Messaggio ricevuto",
        booking_created: "Prenotazione creata",
        payment_received: "Pagamento ricevuto",
        document_uploaded: "Documento caricato",
        system_alert: "Avviso sistema",
      },
    },

    common: {
      save: "Salva",
      cancel: "Annulla",
      delete: "Elimina",
      edit: "Modifica",
      view: "Visualizza",
      create: "Crea",
      search: "Cerca",
      filter: "Filtra",
      export: "Esporta",
      refresh: "Aggiorna",
      loading: "Caricamento...",
      noData: "Nessun dato",
      error: "Errore",
      success: "Successo",
    },
  },

  en: {
    breadcrumb: "Secretary",
    greeting: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
    },
    todayDate: "Today",

    tabs: {
      dashboard: "Dashboard",
      inscriptions: "Registrations",
      planning: "Planning",
      messages: "Messages",
      tasks: "Tasks",
    },

    overview: {
      title: "Today's Overview",
      encouragement: {
        morning: "Have a great day! You're managing {count} tasks",
        afternoon: "Keep it up! You're managing {count} tasks",
        evening: "Almost done! You're managing {count} tasks",
      },
      stats: {
        calls: "Calls received",
        inscriptions: "Registrations created",
        lessons: "Lessons scheduled",
        messages: "Messages processed",
      },
    },

    quickStats: {
      urgentTasks: {
        title: "Priority Tasks",
        alert: "Busy day!",
        button: "View list",
      },
      messages: {
        title: "Calls/Messages",
        waiting: "Waiting",
        button: "Messages",
      },
      lessonsToday: {
        title: "Lessons today",
        button: "View planning",
      },
      newProspects: {
        title: "New prospects",
        thisMonth: "This month",
        button: "Convert",
      },
    },

    tasks: {
      title: "My tasks today",
      filters: {
        all: "All",
        urgent: "Urgent",
        mine: "My tasks",
        assigned: "Assigned to me",
      },
      types: {
        phone: "Call",
        email: "Email",
        document: "Document",
        payment: "Payment",
        booking: "Booking",
        follow_up: "Follow-up",
      },
      priority: {
        1: "Low",
        2: "Medium",
        3: "High",
      },
      status: {
        pending: "Pending",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      },
      actions: {
        markDone: "Mark done",
        postpone: "Postpone",
        assign: "Assign",
        delete: "Delete",
      },
      emptyState: {
        title: "All tasks completed!",
        subtitle: "Well done!",
      },
      newTask: "New task",
      dueIn: "In",
      overdue: "Overdue!",
    },

    quickActions: {
      title: "Quick Actions",
      newStudent: {
        title: "New Student",
        description: "Quick registration",
      },
      bookLesson: {
        title: "Book Lesson",
        description: "Student planning",
      },
      callProspect: {
        title: "Call Prospect",
        description: "CRM & follow-up",
      },
      sendEmail: {
        title: "Group Email",
        description: "Communication",
      },
    },

    messages: {
      title: "Messages & Communications",
      tabs: {
        all: "All",
        unread: "Unread",
        urgent: "Urgent",
        archived: "Archived",
      },
      types: {
        email: "Email",
        sms: "SMS",
        internal: "Internal",
        whatsapp: "WhatsApp",
      },
      priority: {
        normal: "Normal",
        urgent: "Urgent",
      },
      status: {
        unread: "Unread",
        read: "Read",
        archived: "Archived",
      },
      actions: {
        reply: "Reply",
        archive: "Archive",
        delete: "Delete",
      },
    },

    phoneLog: {
      title: "Phone Log",
      direction: {
        incoming: "Incoming",
        outgoing: "Outgoing",
        missed: "Missed",
      },
      duration: "Duration",
      notes: "Notes",
      addNote: "Add note",
    },

    activity: {
      title: "Recent Activity",
      types: {
        inscription: "registered",
        booking: "booked a lesson for",
        call: "called",
        message: "sent a message to",
        task_completed: "completed the task",
        payment: "recorded a payment from",
      },
      viewAll: "Full history",
    },

    appointments: {
      title: "Upcoming Appointments & Events",
      types: {
        prospect_visit: "Prospect visit",
        inscription_meeting: "Registration meeting",
        scheduled_call: "Scheduled call",
        team_meeting: "Team meeting",
      },
      status: {
        scheduled: "Scheduled",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
      },
      actions: {
        view: "View details",
        confirm: "Confirm",
        postpone: "Postpone",
        cancel: "Cancel",
      },
      syncCalendar: "Sync Google Calendar",
    },

    schoolInfo: {
      title: "Driving School",
      openingHours: "Opening hours",
      currentStatus: {
        open: "Open",
        closed: "Closed",
      },
      availableInstructors: "Available instructors",
      availableVehicles: "Available vehicles",
      instructorStatus: {
        available: "Available",
        in_lesson: "In lesson",
        break: "Break",
      },
      editInfo: "Edit info",
      usefulLinks: "Useful links",
    },

    notifications: {
      title: "Notifications",
      markAllRead: "Mark all read",
      settings: "Notification settings",
      types: {
        task_assigned: "Task assigned",
        message_received: "Message received",
        booking_created: "Booking created",
        payment_received: "Payment received",
        document_uploaded: "Document uploaded",
        system_alert: "System alert",
      },
    },

    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      create: "Create",
      search: "Search",
      filter: "Filter",
      export: "Export",
      refresh: "Refresh",
      loading: "Loading...",
      noData: "No data",
      error: "Error",
      success: "Success",
    },
  },
} as const;
