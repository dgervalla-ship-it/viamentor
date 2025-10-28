/**
 * VIAMENTOR - Instructor Manager i18n
 * Traductions FR/DE/IT/EN pour Responsable des Moniteurs
 *
 * Sections:
 * - Dashboard KPIs
 * - Team management
 * - Planning & assignments
 * - Performance analytics
 * - Actions & workflows
 */

export type InstructorManagerLocale = "fr" | "de" | "it" | "en";

export const INSTRUCTOR_MANAGER_I18N = {
  fr: {
    // Page title
    pageTitle: "Gestion des Moniteurs",
    pageDescription: "Pilotage de l'équipe pédagogique",

    // Dashboard sections
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bienvenue, Responsable des Moniteurs",
      overview: "Vue d'ensemble de l'équipe",
    },

    // KPIs
    kpis: {
      totalInstructors: "Moniteurs actifs",
      availableToday: "Disponibles aujourd'hui",
      lessonsToday: "Leçons du jour",
      avgSatisfaction: "Satisfaction moyenne",
      utilizationRate: "Taux d'utilisation",
      pendingRequests: "Demandes en attente",
    },

    // Team management
    team: {
      title: "Équipe pédagogique",
      subtitle: "Gestion des moniteurs et affectations",
      activeInstructors: "Moniteurs actifs",
      onLeave: "En congé",
      newHires: "Nouvelles recrues",
      viewAll: "Voir tous les moniteurs",
      addInstructor: "Ajouter un moniteur",
      manageTeam: "Gérer l'équipe",

      // Status
      status: {
        available: "Disponible",
        busy: "Occupé",
        onLeave: "En congé",
        offDuty: "Hors service",
      },

      // Actions
      assignStudents: "Affecter des élèves",
      viewSchedule: "Voir le planning",
      viewPerformance: "Voir les performances",
      editProfile: "Modifier le profil",
      manageAvailability: "Gérer les disponibilités",
    },

    // Planning
    planning: {
      title: "Planning équipe",
      subtitle: "Organisation des leçons et disponibilités",
      weekView: "Vue semaine",
      dayView: "Vue jour",
      monthView: "Vue mois",
      conflicts: "Conflits détectés",
      optimizePlanning: "Optimiser le planning",
      autoAssign: "Affectation automatique",

      // Filters
      filters: {
        allInstructors: "Tous les moniteurs",
        available: "Disponibles",
        fullyBooked: "Complets",
        category: "Par catégorie",
      },
    },

    // Performance
    performance: {
      title: "Performance de l'équipe",
      subtitle: "Indicateurs et analytics",
      topPerformers: "Meilleurs moniteurs",
      needsSupport: "Besoin d'accompagnement",
      avgSuccessRate: "Taux de réussite moyen",
      studentSatisfaction: "Satisfaction élèves",
      lessonsCompleted: "Leçons réalisées",

      // Metrics
      metrics: {
        punctuality: "Ponctualité",
        pedagogy: "Pédagogie",
        safety: "Sécurité",
        communication: "Communication",
      },
    },

    // Assignments
    assignments: {
      title: "Affectations élèves",
      subtitle: "Gestion des binômes moniteur-élève",
      pending: "En attente",
      active: "Actives",
      completed: "Terminées",
      autoMatch: "Matching automatique",
      manualAssign: "Affectation manuelle",

      // Criteria
      criteria: {
        category: "Catégorie",
        availability: "Disponibilités",
        location: "Localisation",
        language: "Langue",
        experience: "Expérience",
      },
    },

    // Requests
    requests: {
      title: "Demandes",
      subtitle: "Gestion des requêtes de l'équipe",
      leaveRequests: "Demandes de congé",
      scheduleChanges: "Modifications planning",
      supportNeeded: "Besoin d'aide",
      approve: "Approuver",
      reject: "Refuser",
      pending: "En attente",
      approved: "Approuvées",
      rejected: "Refusées",
    },

    // Reports
    reports: {
      title: "Rapports",
      subtitle: "Analyses et exports",
      weeklyReport: "Rapport hebdomadaire",
      monthlyReport: "Rapport mensuel",
      performanceReport: "Rapport de performance",
      utilizationReport: "Rapport d'utilisation",
      exportPDF: "Exporter en PDF",
      exportExcel: "Exporter en Excel",
    },

    // Actions
    actions: {
      viewDetails: "Voir les détails",
      edit: "Modifier",
      delete: "Supprimer",
      approve: "Approuver",
      reject: "Refuser",
      assign: "Affecter",
      unassign: "Désaffecter",
      contact: "Contacter",
      sendMessage: "Envoyer un message",
      schedule: "Planifier",
      export: "Exporter",
      print: "Imprimer",
      refresh: "Actualiser",
    },

    // Notifications
    notifications: {
      assignmentCreated: "Affectation créée avec succès",
      requestApproved: "Demande approuvée",
      requestRejected: "Demande refusée",
      planningUpdated: "Planning mis à jour",
      conflictDetected: "Conflit détecté dans le planning",
    },

    // Empty states
    empty: {
      noInstructors: "Aucun moniteur disponible",
      noRequests: "Aucune demande en attente",
      noAssignments: "Aucune affectation",
      noData: "Aucune donnée disponible",
    },
  },

  de: {
    pageTitle: "Fahrlehrer-Verwaltung",
    pageDescription: "Verwaltung des Lehrteams",

    dashboard: {
      title: "Dashboard",
      welcome: "Willkommen, Fahrlehrer-Manager",
      overview: "Teamübersicht",
    },

    kpis: {
      totalInstructors: "Aktive Fahrlehrer",
      availableToday: "Heute verfügbar",
      lessonsToday: "Lektionen heute",
      avgSatisfaction: "Durchschnittliche Zufriedenheit",
      utilizationRate: "Auslastungsrate",
      pendingRequests: "Ausstehende Anfragen",
    },

    team: {
      title: "Lehrteam",
      subtitle: "Verwaltung der Fahrlehrer und Zuweisungen",
      activeInstructors: "Aktive Fahrlehrer",
      onLeave: "Im Urlaub",
      newHires: "Neue Mitarbeiter",
      viewAll: "Alle Fahrlehrer anzeigen",
      addInstructor: "Fahrlehrer hinzufügen",
      manageTeam: "Team verwalten",

      status: {
        available: "Verfügbar",
        busy: "Beschäftigt",
        onLeave: "Im Urlaub",
        offDuty: "Außer Dienst",
      },

      assignStudents: "Schüler zuweisen",
      viewSchedule: "Zeitplan anzeigen",
      viewPerformance: "Leistung anzeigen",
      editProfile: "Profil bearbeiten",
      manageAvailability: "Verfügbarkeit verwalten",
    },

    planning: {
      title: "Team-Planung",
      subtitle: "Organisation von Lektionen und Verfügbarkeiten",
      weekView: "Wochenansicht",
      dayView: "Tagesansicht",
      monthView: "Monatsansicht",
      conflicts: "Konflikte erkannt",
      optimizePlanning: "Planung optimieren",
      autoAssign: "Automatische Zuweisung",

      filters: {
        allInstructors: "Alle Fahrlehrer",
        available: "Verfügbar",
        fullyBooked: "Ausgebucht",
        category: "Nach Kategorie",
      },
    },

    performance: {
      title: "Team-Leistung",
      subtitle: "Kennzahlen und Analysen",
      topPerformers: "Top-Fahrlehrer",
      needsSupport: "Unterstützung benötigt",
      avgSuccessRate: "Durchschnittliche Erfolgsquote",
      studentSatisfaction: "Schülerzufriedenheit",
      lessonsCompleted: "Abgeschlossene Lektionen",

      metrics: {
        punctuality: "Pünktlichkeit",
        pedagogy: "Pädagogik",
        safety: "Sicherheit",
        communication: "Kommunikation",
      },
    },

    assignments: {
      title: "Schülerzuweisungen",
      subtitle: "Verwaltung der Fahrlehrer-Schüler-Paare",
      pending: "Ausstehend",
      active: "Aktiv",
      completed: "Abgeschlossen",
      autoMatch: "Automatisches Matching",
      manualAssign: "Manuelle Zuweisung",

      criteria: {
        category: "Kategorie",
        availability: "Verfügbarkeiten",
        location: "Standort",
        language: "Sprache",
        experience: "Erfahrung",
      },
    },

    requests: {
      title: "Anfragen",
      subtitle: "Verwaltung der Team-Anfragen",
      leaveRequests: "Urlaubsanträge",
      scheduleChanges: "Planänderungen",
      supportNeeded: "Hilfe benötigt",
      approve: "Genehmigen",
      reject: "Ablehnen",
      pending: "Ausstehend",
      approved: "Genehmigt",
      rejected: "Abgelehnt",
    },

    reports: {
      title: "Berichte",
      subtitle: "Analysen und Exporte",
      weeklyReport: "Wochenbericht",
      monthlyReport: "Monatsbericht",
      performanceReport: "Leistungsbericht",
      utilizationReport: "Auslastungsbericht",
      exportPDF: "Als PDF exportieren",
      exportExcel: "Als Excel exportieren",
    },

    actions: {
      viewDetails: "Details anzeigen",
      edit: "Bearbeiten",
      delete: "Löschen",
      approve: "Genehmigen",
      reject: "Ablehnen",
      assign: "Zuweisen",
      unassign: "Zuweisung aufheben",
      contact: "Kontaktieren",
      sendMessage: "Nachricht senden",
      schedule: "Planen",
      export: "Exportieren",
      print: "Drucken",
      refresh: "Aktualisieren",
    },

    notifications: {
      assignmentCreated: "Zuweisung erfolgreich erstellt",
      requestApproved: "Anfrage genehmigt",
      requestRejected: "Anfrage abgelehnt",
      planningUpdated: "Planung aktualisiert",
      conflictDetected: "Konflikt in der Planung erkannt",
    },

    empty: {
      noInstructors: "Keine Fahrlehrer verfügbar",
      noRequests: "Keine ausstehenden Anfragen",
      noAssignments: "Keine Zuweisungen",
      noData: "Keine Daten verfügbar",
    },
  },

  it: {
    pageTitle: "Gestione Istruttori",
    pageDescription: "Gestione del team didattico",

    dashboard: {
      title: "Dashboard",
      welcome: "Benvenuto, Responsabile Istruttori",
      overview: "Panoramica del team",
    },

    kpis: {
      totalInstructors: "Istruttori attivi",
      availableToday: "Disponibili oggi",
      lessonsToday: "Lezioni di oggi",
      avgSatisfaction: "Soddisfazione media",
      utilizationRate: "Tasso di utilizzo",
      pendingRequests: "Richieste in sospeso",
    },

    team: {
      title: "Team didattico",
      subtitle: "Gestione istruttori e assegnazioni",
      activeInstructors: "Istruttori attivi",
      onLeave: "In ferie",
      newHires: "Nuovi assunti",
      viewAll: "Vedi tutti gli istruttori",
      addInstructor: "Aggiungi istruttore",
      manageTeam: "Gestisci team",

      status: {
        available: "Disponibile",
        busy: "Occupato",
        onLeave: "In ferie",
        offDuty: "Fuori servizio",
      },

      assignStudents: "Assegna allievi",
      viewSchedule: "Vedi pianificazione",
      viewPerformance: "Vedi prestazioni",
      editProfile: "Modifica profilo",
      manageAvailability: "Gestisci disponibilità",
    },

    planning: {
      title: "Pianificazione team",
      subtitle: "Organizzazione lezioni e disponibilità",
      weekView: "Vista settimanale",
      dayView: "Vista giornaliera",
      monthView: "Vista mensile",
      conflicts: "Conflitti rilevati",
      optimizePlanning: "Ottimizza pianificazione",
      autoAssign: "Assegnazione automatica",

      filters: {
        allInstructors: "Tutti gli istruttori",
        available: "Disponibili",
        fullyBooked: "Completi",
        category: "Per categoria",
      },
    },

    performance: {
      title: "Prestazioni del team",
      subtitle: "Indicatori e analytics",
      topPerformers: "Migliori istruttori",
      needsSupport: "Necessita supporto",
      avgSuccessRate: "Tasso di successo medio",
      studentSatisfaction: "Soddisfazione allievi",
      lessonsCompleted: "Lezioni completate",

      metrics: {
        punctuality: "Puntualità",
        pedagogy: "Pedagogia",
        safety: "Sicurezza",
        communication: "Comunicazione",
      },
    },

    assignments: {
      title: "Assegnazioni allievi",
      subtitle: "Gestione coppie istruttore-allievo",
      pending: "In attesa",
      active: "Attive",
      completed: "Completate",
      autoMatch: "Matching automatico",
      manualAssign: "Assegnazione manuale",

      criteria: {
        category: "Categoria",
        availability: "Disponibilità",
        location: "Località",
        language: "Lingua",
        experience: "Esperienza",
      },
    },

    requests: {
      title: "Richieste",
      subtitle: "Gestione richieste del team",
      leaveRequests: "Richieste di ferie",
      scheduleChanges: "Modifiche pianificazione",
      supportNeeded: "Necessita aiuto",
      approve: "Approva",
      reject: "Rifiuta",
      pending: "In attesa",
      approved: "Approvate",
      rejected: "Rifiutate",
    },

    reports: {
      title: "Report",
      subtitle: "Analisi ed esportazioni",
      weeklyReport: "Report settimanale",
      monthlyReport: "Report mensile",
      performanceReport: "Report prestazioni",
      utilizationReport: "Report utilizzo",
      exportPDF: "Esporta in PDF",
      exportExcel: "Esporta in Excel",
    },

    actions: {
      viewDetails: "Vedi dettagli",
      edit: "Modifica",
      delete: "Elimina",
      approve: "Approva",
      reject: "Rifiuta",
      assign: "Assegna",
      unassign: "Rimuovi assegnazione",
      contact: "Contatta",
      sendMessage: "Invia messaggio",
      schedule: "Pianifica",
      export: "Esporta",
      print: "Stampa",
      refresh: "Aggiorna",
    },

    notifications: {
      assignmentCreated: "Assegnazione creata con successo",
      requestApproved: "Richiesta approvata",
      requestRejected: "Richiesta rifiutata",
      planningUpdated: "Pianificazione aggiornata",
      conflictDetected: "Conflitto rilevato nella pianificazione",
    },

    empty: {
      noInstructors: "Nessun istruttore disponibile",
      noRequests: "Nessuna richiesta in attesa",
      noAssignments: "Nessuna assegnazione",
      noData: "Nessun dato disponibile",
    },
  },

  en: {
    pageTitle: "Instructor Management",
    pageDescription: "Teaching team management",

    dashboard: {
      title: "Dashboard",
      welcome: "Welcome, Instructor Manager",
      overview: "Team overview",
    },

    kpis: {
      totalInstructors: "Active instructors",
      availableToday: "Available today",
      lessonsToday: "Today's lessons",
      avgSatisfaction: "Average satisfaction",
      utilizationRate: "Utilization rate",
      pendingRequests: "Pending requests",
    },

    team: {
      title: "Teaching team",
      subtitle: "Instructor and assignment management",
      activeInstructors: "Active instructors",
      onLeave: "On leave",
      newHires: "New hires",
      viewAll: "View all instructors",
      addInstructor: "Add instructor",
      manageTeam: "Manage team",

      status: {
        available: "Available",
        busy: "Busy",
        onLeave: "On leave",
        offDuty: "Off duty",
      },

      assignStudents: "Assign students",
      viewSchedule: "View schedule",
      viewPerformance: "View performance",
      editProfile: "Edit profile",
      manageAvailability: "Manage availability",
    },

    planning: {
      title: "Team planning",
      subtitle: "Lesson and availability organization",
      weekView: "Week view",
      dayView: "Day view",
      monthView: "Month view",
      conflicts: "Conflicts detected",
      optimizePlanning: "Optimize planning",
      autoAssign: "Auto-assign",

      filters: {
        allInstructors: "All instructors",
        available: "Available",
        fullyBooked: "Fully booked",
        category: "By category",
      },
    },

    performance: {
      title: "Team performance",
      subtitle: "Metrics and analytics",
      topPerformers: "Top performers",
      needsSupport: "Needs support",
      avgSuccessRate: "Average success rate",
      studentSatisfaction: "Student satisfaction",
      lessonsCompleted: "Lessons completed",

      metrics: {
        punctuality: "Punctuality",
        pedagogy: "Pedagogy",
        safety: "Safety",
        communication: "Communication",
      },
    },

    assignments: {
      title: "Student assignments",
      subtitle: "Instructor-student pair management",
      pending: "Pending",
      active: "Active",
      completed: "Completed",
      autoMatch: "Auto-match",
      manualAssign: "Manual assign",

      criteria: {
        category: "Category",
        availability: "Availability",
        location: "Location",
        language: "Language",
        experience: "Experience",
      },
    },

    requests: {
      title: "Requests",
      subtitle: "Team request management",
      leaveRequests: "Leave requests",
      scheduleChanges: "Schedule changes",
      supportNeeded: "Support needed",
      approve: "Approve",
      reject: "Reject",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },

    reports: {
      title: "Reports",
      subtitle: "Analysis and exports",
      weeklyReport: "Weekly report",
      monthlyReport: "Monthly report",
      performanceReport: "Performance report",
      utilizationReport: "Utilization report",
      exportPDF: "Export to PDF",
      exportExcel: "Export to Excel",
    },

    actions: {
      viewDetails: "View details",
      edit: "Edit",
      delete: "Delete",
      approve: "Approve",
      reject: "Reject",
      assign: "Assign",
      unassign: "Unassign",
      contact: "Contact",
      sendMessage: "Send message",
      schedule: "Schedule",
      export: "Export",
      print: "Print",
      refresh: "Refresh",
    },

    notifications: {
      assignmentCreated: "Assignment created successfully",
      requestApproved: "Request approved",
      requestRejected: "Request rejected",
      planningUpdated: "Planning updated",
      conflictDetected: "Conflict detected in planning",
    },

    empty: {
      noInstructors: "No instructors available",
      noRequests: "No pending requests",
      noAssignments: "No assignments",
      noData: "No data available",
    },
  },
} as const;
