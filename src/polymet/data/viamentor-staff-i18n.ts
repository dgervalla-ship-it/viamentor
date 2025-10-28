/**
 * VIAMENTOR Staff i18n
 *
 * Traductions FR/DE/IT/EN pour interfaces secrétariat (planning, messages, tâches)
 */

export type StaffLocale = "fr" | "de" | "it" | "en";

export interface StaffTranslations {
  // Planning
  planning: {
    title: string;
    subtitle: string;
    views: {
      month: string;
      week: string;
      day: string;
      agenda: string;
    };
    filters: {
      title: string;
      instructors: string;
      vehicles: string;
      status: string;
      dateRange: string;
      showAvailability: string;
      apply: string;
      reset: string;
    };
    status: {
      all: string;
      confirmed: string;
      tentative: string;
      cancelled: string;
      completed: string;
    };
    availability: {
      available: string;
      busy: string;
    };
    actions: {
      bookLesson: string;
      viewDetails: string;
      modify: string;
      cancel: string;
      contactStudent: string;
    };
    stats: {
      totalLessons: string;
      confirmed: string;
      tentative: string;
      cancelled: string;
      instructorsActive: string;
      vehiclesInUse: string;
      utilization: string;
    };
  };

  // Messages
  messages: {
    title: string;
    subtitle: string;
    folders: {
      inbox: string;
      sent: string;
      drafts: string;
      archived: string;
      trash: string;
    };
    priority: {
      normal: string;
      urgent: string;
    };
    actions: {
      newMessage: string;
      reply: string;
      forward: string;
      archive: string;
      delete: string;
      markAsRead: string;
      markAsUnread: string;
    };
    compose: {
      title: string;
      to: string;
      subject: string;
      body: string;
      attachments: string;
      priority: string;
      send: string;
      cancel: string;
      saveDraft: string;
    };
    groups: {
      students: string;
      instructors: string;
      staff: string;
      admin: string;
    };
  };

  // Tasks
  tasks: {
    title: string;
    subtitle: string;
    status: {
      todo: string;
      inProgress: string;
      completed: string;
      postponed: string;
      cancelled: string;
    };
    priority: {
      label: string;
      low: string;
      medium: string;
      high: string;
      urgent: string;
      critical: string;
    };
    actions: {
      newTask: string;
      edit: string;
      reassign: string;
      complete: string;
      delete: string;
      viewDetails: string;
    };
    views: {
      list: string;
      kanban: string;
    };
    filters: {
      assignedTo: string;
      createdBy: string;
      status: string;
      priority: string;
      dueDate: string;
    };
    stats: {
      total: string;
      todo: string;
      inProgress: string;
      completed: string;
      overdue: string;
    };
    form: {
      title: string;
      description: string;
      assignTo: string;
      dueDate: string;
      priority: string;
      create: string;
      update: string;
      cancel: string;
    };
  };

  // Common
  common: {
    search: string;
    filter: string;
    sort: string;
    export: string;
    refresh: string;
    loading: string;
    noResults: string;
    daysUntil: string;
    overdue: string;
    today: string;
    tomorrow: string;
  };
}

export const staffTranslations: Record<StaffLocale, StaffTranslations> = {
  fr: {
    planning: {
      title: "Planning École",
      subtitle: "Vue d'ensemble des leçons et disponibilités",
      views: {
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        agenda: "Agenda",
      },
      filters: {
        title: "Filtres",
        instructors: "Moniteurs",
        vehicles: "Véhicules",
        status: "Statut",
        dateRange: "Période",
        showAvailability: "Afficher disponibilités",
        apply: "Appliquer",
        reset: "Réinitialiser",
      },
      status: {
        all: "Toutes",
        confirmed: "Confirmées",
        tentative: "Tentatives",
        cancelled: "Annulées",
        completed: "Terminées",
      },
      availability: {
        available: "Disponible",
        busy: "Occupé",
      },
      actions: {
        bookLesson: "Réserver leçon",
        viewDetails: "Voir détails",
        modify: "Modifier",
        cancel: "Annuler",
        contactStudent: "Contacter élève",
      },
      stats: {
        totalLessons: "Total leçons",
        confirmed: "Confirmées",
        tentative: "Tentatives",
        cancelled: "Annulées",
        instructorsActive: "Moniteurs actifs",
        vehiclesInUse: "Véhicules utilisés",
        utilization: "Taux d'utilisation",
      },
    },
    messages: {
      title: "Messagerie",
      subtitle: "Communications internes",
      folders: {
        inbox: "Réception",
        sent: "Envoyés",
        drafts: "Brouillons",
        archived: "Archivés",
        trash: "Corbeille",
      },
      priority: {
        normal: "Normal",
        urgent: "Urgent",
      },
      actions: {
        newMessage: "Nouveau message",
        reply: "Répondre",
        forward: "Transférer",
        archive: "Archiver",
        delete: "Supprimer",
        markAsRead: "Marquer comme lu",
        markAsUnread: "Marquer comme non lu",
      },
      compose: {
        title: "Nouveau message",
        to: "Destinataires",
        subject: "Objet",
        body: "Message",
        attachments: "Pièces jointes",
        priority: "Priorité",
        send: "Envoyer",
        cancel: "Annuler",
        saveDraft: "Enregistrer brouillon",
      },
      groups: {
        students: "Élèves",
        instructors: "Moniteurs",
        staff: "Personnel",
        admin: "Administration",
      },
    },
    tasks: {
      title: "Tâches",
      subtitle: "Gestion des tâches et coordination",
      status: {
        todo: "À faire",
        inProgress: "En cours",
        completed: "Terminée",
        postponed: "Reportée",
        cancelled: "Annulée",
      },
      priority: {
        label: "Priorité",
        low: "Basse",
        medium: "Moyenne",
        high: "Haute",
        urgent: "Urgente",
        critical: "Critique",
      },
      actions: {
        newTask: "Nouvelle tâche",
        edit: "Modifier",
        reassign: "Réassigner",
        complete: "Terminer",
        delete: "Supprimer",
        viewDetails: "Voir détails",
      },
      views: {
        list: "Liste",
        kanban: "Kanban",
      },
      filters: {
        assignedTo: "Assigné à",
        createdBy: "Créé par",
        status: "Statut",
        priority: "Priorité",
        dueDate: "Échéance",
      },
      stats: {
        total: "Total",
        todo: "À faire",
        inProgress: "En cours",
        completed: "Terminées",
        overdue: "En retard",
      },
      form: {
        title: "Titre",
        description: "Description",
        assignTo: "Assigner à",
        dueDate: "Date d'échéance",
        priority: "Priorité",
        create: "Créer",
        update: "Mettre à jour",
        cancel: "Annuler",
      },
    },
    common: {
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      export: "Exporter",
      refresh: "Actualiser",
      loading: "Chargement...",
      noResults: "Aucun résultat",
      daysUntil: "jours restants",
      overdue: "En retard",
      today: "Aujourd'hui",
      tomorrow: "Demain",
    },
  },
  de: {
    planning: {
      title: "Schulplanung",
      subtitle: "Übersicht über Lektionen und Verfügbarkeiten",
      views: {
        month: "Monat",
        week: "Woche",
        day: "Tag",
        agenda: "Agenda",
      },
      filters: {
        title: "Filter",
        instructors: "Fahrlehrer",
        vehicles: "Fahrzeuge",
        status: "Status",
        dateRange: "Zeitraum",
        showAvailability: "Verfügbarkeiten anzeigen",
        apply: "Anwenden",
        reset: "Zurücksetzen",
      },
      status: {
        all: "Alle",
        confirmed: "Bestätigt",
        tentative: "Vorläufig",
        cancelled: "Abgesagt",
        completed: "Abgeschlossen",
      },
      availability: {
        available: "Verfügbar",
        busy: "Besetzt",
      },
      actions: {
        bookLesson: "Lektion buchen",
        viewDetails: "Details anzeigen",
        modify: "Ändern",
        cancel: "Absagen",
        contactStudent: "Schüler kontaktieren",
      },
      stats: {
        totalLessons: "Lektionen gesamt",
        confirmed: "Bestätigt",
        tentative: "Vorläufig",
        cancelled: "Abgesagt",
        instructorsActive: "Aktive Fahrlehrer",
        vehiclesInUse: "Fahrzeuge im Einsatz",
        utilization: "Auslastung",
      },
    },
    messages: {
      title: "Nachrichten",
      subtitle: "Interne Kommunikation",
      folders: {
        inbox: "Posteingang",
        sent: "Gesendet",
        drafts: "Entwürfe",
        archived: "Archiviert",
        trash: "Papierkorb",
      },
      priority: {
        normal: "Normal",
        urgent: "Dringend",
      },
      actions: {
        newMessage: "Neue Nachricht",
        reply: "Antworten",
        forward: "Weiterleiten",
        archive: "Archivieren",
        delete: "Löschen",
        markAsRead: "Als gelesen markieren",
        markAsUnread: "Als ungelesen markieren",
      },
      compose: {
        title: "Neue Nachricht",
        to: "Empfänger",
        subject: "Betreff",
        body: "Nachricht",
        attachments: "Anhänge",
        priority: "Priorität",
        send: "Senden",
        cancel: "Abbrechen",
        saveDraft: "Entwurf speichern",
      },
      groups: {
        students: "Schüler",
        instructors: "Fahrlehrer",
        staff: "Personal",
        admin: "Verwaltung",
      },
    },
    tasks: {
      title: "Aufgaben",
      subtitle: "Aufgabenverwaltung und Koordination",
      status: {
        todo: "Zu erledigen",
        inProgress: "In Bearbeitung",
        completed: "Abgeschlossen",
        postponed: "Verschoben",
        cancelled: "Abgebrochen",
      },
      priority: {
        label: "Priorität",
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
        urgent: "Dringend",
        critical: "Kritisch",
      },
      actions: {
        newTask: "Neue Aufgabe",
        edit: "Bearbeiten",
        reassign: "Neu zuweisen",
        complete: "Abschließen",
        delete: "Löschen",
        viewDetails: "Details anzeigen",
      },
      views: {
        list: "Liste",
        kanban: "Kanban",
      },
      filters: {
        assignedTo: "Zugewiesen an",
        createdBy: "Erstellt von",
        status: "Status",
        priority: "Priorität",
        dueDate: "Fälligkeitsdatum",
      },
      stats: {
        total: "Gesamt",
        todo: "Zu erledigen",
        inProgress: "In Bearbeitung",
        completed: "Abgeschlossen",
        overdue: "Überfällig",
      },
      form: {
        title: "Titel",
        description: "Beschreibung",
        assignTo: "Zuweisen an",
        dueDate: "Fälligkeitsdatum",
        priority: "Priorität",
        create: "Erstellen",
        update: "Aktualisieren",
        cancel: "Abbrechen",
      },
    },
    common: {
      search: "Suchen",
      filter: "Filtern",
      sort: "Sortieren",
      export: "Exportieren",
      refresh: "Aktualisieren",
      loading: "Laden...",
      noResults: "Keine Ergebnisse",
      daysUntil: "Tage verbleibend",
      overdue: "Überfällig",
      today: "Heute",
      tomorrow: "Morgen",
    },
  },
  it: {
    planning: {
      title: "Pianificazione Scuola",
      subtitle: "Panoramica lezioni e disponibilità",
      views: {
        month: "Mese",
        week: "Settimana",
        day: "Giorno",
        agenda: "Agenda",
      },
      filters: {
        title: "Filtri",
        instructors: "Istruttori",
        vehicles: "Veicoli",
        status: "Stato",
        dateRange: "Periodo",
        showAvailability: "Mostra disponibilità",
        apply: "Applica",
        reset: "Reimposta",
      },
      status: {
        all: "Tutte",
        confirmed: "Confermate",
        tentative: "Provvisorie",
        cancelled: "Annullate",
        completed: "Completate",
      },
      availability: {
        available: "Disponibile",
        busy: "Occupato",
      },
      actions: {
        bookLesson: "Prenota lezione",
        viewDetails: "Vedi dettagli",
        modify: "Modifica",
        cancel: "Annulla",
        contactStudent: "Contatta allievo",
      },
      stats: {
        totalLessons: "Lezioni totali",
        confirmed: "Confermate",
        tentative: "Provvisorie",
        cancelled: "Annullate",
        instructorsActive: "Istruttori attivi",
        vehiclesInUse: "Veicoli in uso",
        utilization: "Tasso di utilizzo",
      },
    },
    messages: {
      title: "Messaggi",
      subtitle: "Comunicazioni interne",
      folders: {
        inbox: "Posta in arrivo",
        sent: "Inviati",
        drafts: "Bozze",
        archived: "Archiviati",
        trash: "Cestino",
      },
      priority: {
        normal: "Normale",
        urgent: "Urgente",
      },
      actions: {
        newMessage: "Nuovo messaggio",
        reply: "Rispondi",
        forward: "Inoltra",
        archive: "Archivia",
        delete: "Elimina",
        markAsRead: "Segna come letto",
        markAsUnread: "Segna come non letto",
      },
      compose: {
        title: "Nuovo messaggio",
        to: "Destinatari",
        subject: "Oggetto",
        body: "Messaggio",
        attachments: "Allegati",
        priority: "Priorità",
        send: "Invia",
        cancel: "Annulla",
        saveDraft: "Salva bozza",
      },
      groups: {
        students: "Allievi",
        instructors: "Istruttori",
        staff: "Personale",
        admin: "Amministrazione",
      },
    },
    tasks: {
      title: "Compiti",
      subtitle: "Gestione compiti e coordinamento",
      status: {
        todo: "Da fare",
        inProgress: "In corso",
        completed: "Completato",
        postponed: "Posticipato",
        cancelled: "Annullato",
      },
      priority: {
        label: "Priorità",
        low: "Bassa",
        medium: "Media",
        high: "Alta",
        urgent: "Urgente",
        critical: "Critica",
      },
      actions: {
        newTask: "Nuovo compito",
        edit: "Modifica",
        reassign: "Riassegna",
        complete: "Completa",
        delete: "Elimina",
        viewDetails: "Vedi dettagli",
      },
      views: {
        list: "Lista",
        kanban: "Kanban",
      },
      filters: {
        assignedTo: "Assegnato a",
        createdBy: "Creato da",
        status: "Stato",
        priority: "Priorità",
        dueDate: "Scadenza",
      },
      stats: {
        total: "Totale",
        todo: "Da fare",
        inProgress: "In corso",
        completed: "Completati",
        overdue: "In ritardo",
      },
      form: {
        title: "Titolo",
        description: "Descrizione",
        assignTo: "Assegna a",
        dueDate: "Data di scadenza",
        priority: "Priorità",
        create: "Crea",
        update: "Aggiorna",
        cancel: "Annulla",
      },
    },
    common: {
      search: "Cerca",
      filter: "Filtra",
      sort: "Ordina",
      export: "Esporta",
      refresh: "Aggiorna",
      loading: "Caricamento...",
      noResults: "Nessun risultato",
      daysUntil: "giorni rimanenti",
      overdue: "In ritardo",
      today: "Oggi",
      tomorrow: "Domani",
    },
  },
  en: {
    planning: {
      title: "School Planning",
      subtitle: "Overview of lessons and availability",
      views: {
        month: "Month",
        week: "Week",
        day: "Day",
        agenda: "Agenda",
      },
      filters: {
        title: "Filters",
        instructors: "Instructors",
        vehicles: "Vehicles",
        status: "Status",
        dateRange: "Period",
        showAvailability: "Show availability",
        apply: "Apply",
        reset: "Reset",
      },
      status: {
        all: "All",
        confirmed: "Confirmed",
        tentative: "Tentative",
        cancelled: "Cancelled",
        completed: "Completed",
      },
      availability: {
        available: "Available",
        busy: "Busy",
      },
      actions: {
        bookLesson: "Book lesson",
        viewDetails: "View details",
        modify: "Modify",
        cancel: "Cancel",
        contactStudent: "Contact student",
      },
      stats: {
        totalLessons: "Total lessons",
        confirmed: "Confirmed",
        tentative: "Tentative",
        cancelled: "Cancelled",
        instructorsActive: "Active instructors",
        vehiclesInUse: "Vehicles in use",
        utilization: "Utilization rate",
      },
    },
    messages: {
      title: "Messages",
      subtitle: "Internal communications",
      folders: {
        inbox: "Inbox",
        sent: "Sent",
        drafts: "Drafts",
        archived: "Archived",
        trash: "Trash",
      },
      priority: {
        normal: "Normal",
        urgent: "Urgent",
      },
      actions: {
        newMessage: "New message",
        reply: "Reply",
        forward: "Forward",
        archive: "Archive",
        delete: "Delete",
        markAsRead: "Mark as read",
        markAsUnread: "Mark as unread",
      },
      compose: {
        title: "New message",
        to: "Recipients",
        subject: "Subject",
        body: "Message",
        attachments: "Attachments",
        priority: "Priority",
        send: "Send",
        cancel: "Cancel",
        saveDraft: "Save draft",
      },
      groups: {
        students: "Students",
        instructors: "Instructors",
        staff: "Staff",
        admin: "Administration",
      },
    },
    tasks: {
      title: "Tasks",
      subtitle: "Task management and coordination",
      status: {
        todo: "To do",
        inProgress: "In progress",
        completed: "Completed",
        postponed: "Postponed",
        cancelled: "Cancelled",
      },
      priority: {
        label: "Priority",
        low: "Low",
        medium: "Medium",
        high: "High",
        urgent: "Urgent",
        critical: "Critical",
      },
      actions: {
        newTask: "New task",
        edit: "Edit",
        reassign: "Reassign",
        complete: "Complete",
        delete: "Delete",
        viewDetails: "View details",
      },
      views: {
        list: "List",
        kanban: "Kanban",
      },
      filters: {
        assignedTo: "Assigned to",
        createdBy: "Created by",
        status: "Status",
        priority: "Priority",
        dueDate: "Due date",
      },
      stats: {
        total: "Total",
        todo: "To do",
        inProgress: "In progress",
        completed: "Completed",
        overdue: "Overdue",
      },
      form: {
        title: "Title",
        description: "Description",
        assignTo: "Assign to",
        dueDate: "Due date",
        priority: "Priority",
        create: "Create",
        update: "Update",
        cancel: "Cancel",
      },
    },
    common: {
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      export: "Export",
      refresh: "Refresh",
      loading: "Loading...",
      noResults: "No results",
      daysUntil: "days remaining",
      overdue: "Overdue",
      today: "Today",
      tomorrow: "Tomorrow",
    },
  },
};

export const getStaffTranslations = (
  locale: StaffLocale = "fr"
): StaffTranslations => {
  return staffTranslations[locale] || staffTranslations.fr;
};
