/**
 * VIAMENTOR - Maintenance i18n
 * Traductions FR/DE/IT/EN pour gestion maintenance
 */

"use client";

export type MaintenanceLocale = "fr" | "de" | "it" | "en";

export interface MaintenanceTranslations {
  // Page title
  title: string;
  description: string;

  // Tabs
  tabs: {
    calendar: string;
    tasks: string;
    history: string;
    costs: string;
    alerts: string;
    schedules: string;
  };

  // Actions
  actions: {
    createTask: string;
    editTask: string;
    deleteTask: string;
    completeTask: string;
    cancelTask: string;
    scheduleTask: string;
    exportData: string;
    printReport: string;
    filterTasks: string;
  };

  // Types
  types: {
    preventive: string;
    corrective: string;
    inspection: string;
    repair: string;
  };

  // Status
  status: {
    scheduled: string;
    in_progress: string;
    completed: string;
    overdue: string;
    cancelled: string;
  };

  // Priority
  priority: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };

  // Categories
  categories: {
    oil_change: string;
    tire_rotation: string;
    brake_service: string;
    engine: string;
    transmission: string;
    electrical: string;
    bodywork: string;
    inspection: string;
    other: string;
  };

  // Fields
  fields: {
    vehicle: string;
    type: string;
    category: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    scheduledDate: string;
    dueDate: string;
    completedDate: string;
    estimatedDuration: string;
    actualDuration: string;
    estimatedCost: string;
    actualCost: string;
    laborCost: string;
    partsCost: string;
    assignedTo: string;
    garage: string;
    notes: string;
    attachments: string;
  };

  // Alerts
  alerts: {
    overdue: string;
    dueSoon: string;
    mileageThreshold: string;
    inspectionRequired: string;
    noAlerts: string;
  };

  // Stats
  stats: {
    totalTasks: string;
    completedTasks: string;
    overdueTasks: string;
    totalCost: string;
    averageCost: string;
    maintenanceScore: string;
    reliability: string;
  };

  // Reliability
  reliability: {
    excellent: string;
    good: string;
    fair: string;
    poor: string;
  };

  // Messages
  messages: {
    taskCreated: string;
    taskUpdated: string;
    taskDeleted: string;
    taskCompleted: string;
    confirmDelete: string;
    noTasks: string;
    noHistory: string;
  };
}

export const maintenanceTranslations: Record<
  MaintenanceLocale,
  MaintenanceTranslations
> = {
  fr: {
    title: "Gestion de la maintenance",
    description:
      "Suivi de la maintenance préventive et corrective des véhicules",

    tabs: {
      calendar: "Calendrier",
      tasks: "Tâches",
      history: "Historique",
      costs: "Coûts",
      alerts: "Alertes",
      schedules: "Plannings",
    },

    actions: {
      createTask: "Nouvelle tâche",
      editTask: "Modifier",
      deleteTask: "Supprimer",
      completeTask: "Marquer terminé",
      cancelTask: "Annuler",
      scheduleTask: "Planifier",
      exportData: "Exporter",
      printReport: "Imprimer",
      filterTasks: "Filtrer",
    },

    types: {
      preventive: "Préventive",
      corrective: "Corrective",
      inspection: "Contrôle",
      repair: "Réparation",
    },

    status: {
      scheduled: "Planifiée",
      in_progress: "En cours",
      completed: "Terminée",
      overdue: "En retard",
      cancelled: "Annulée",
    },

    priority: {
      low: "Basse",
      medium: "Moyenne",
      high: "Haute",
      critical: "Critique",
    },

    categories: {
      oil_change: "Vidange",
      tire_rotation: "Permutation pneus",
      brake_service: "Freins",
      engine: "Moteur",
      transmission: "Transmission",
      electrical: "Électrique",
      bodywork: "Carrosserie",
      inspection: "Contrôle technique",
      other: "Autre",
    },

    fields: {
      vehicle: "Véhicule",
      type: "Type",
      category: "Catégorie",
      title: "Titre",
      description: "Description",
      status: "Statut",
      priority: "Priorité",
      scheduledDate: "Date planifiée",
      dueDate: "Date d'échéance",
      completedDate: "Date de réalisation",
      estimatedDuration: "Durée estimée",
      actualDuration: "Durée réelle",
      estimatedCost: "Coût estimé",
      actualCost: "Coût réel",
      laborCost: "Main d'œuvre",
      partsCost: "Pièces",
      assignedTo: "Assigné à",
      garage: "Garage",
      notes: "Notes",
      attachments: "Pièces jointes",
    },

    alerts: {
      overdue: "En retard",
      dueSoon: "À prévoir",
      mileageThreshold: "Seuil kilométrique",
      inspectionRequired: "Inspection recommandée",
      noAlerts: "Aucune alerte",
    },

    stats: {
      totalTasks: "Total tâches",
      completedTasks: "Tâches terminées",
      overdueTasks: "Tâches en retard",
      totalCost: "Coût total",
      averageCost: "Coût moyen",
      maintenanceScore: "Score maintenance",
      reliability: "Fiabilité",
    },

    reliability: {
      excellent: "Excellente",
      good: "Bonne",
      fair: "Moyenne",
      poor: "Faible",
    },

    messages: {
      taskCreated: "Tâche créée avec succès",
      taskUpdated: "Tâche mise à jour",
      taskDeleted: "Tâche supprimée",
      taskCompleted: "Tâche marquée comme terminée",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer cette tâche ?",
      noTasks: "Aucune tâche de maintenance",
      noHistory: "Aucun historique disponible",
    },
  },

  de: {
    title: "Wartungsverwaltung",
    description:
      "Überwachung der vorbeugenden und korrektiven Wartung von Fahrzeugen",

    tabs: {
      calendar: "Kalender",
      tasks: "Aufgaben",
      history: "Verlauf",
      costs: "Kosten",
      alerts: "Warnungen",
      schedules: "Zeitpläne",
    },

    actions: {
      createTask: "Neue Aufgabe",
      editTask: "Bearbeiten",
      deleteTask: "Löschen",
      completeTask: "Als erledigt markieren",
      cancelTask: "Abbrechen",
      scheduleTask: "Planen",
      exportData: "Exportieren",
      printReport: "Drucken",
      filterTasks: "Filtern",
    },

    types: {
      preventive: "Vorbeugend",
      corrective: "Korrigierend",
      inspection: "Kontrolle",
      repair: "Reparatur",
    },

    status: {
      scheduled: "Geplant",
      in_progress: "In Bearbeitung",
      completed: "Abgeschlossen",
      overdue: "Überfällig",
      cancelled: "Abgebrochen",
    },

    priority: {
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
      critical: "Kritisch",
    },

    categories: {
      oil_change: "Ölwechsel",
      tire_rotation: "Reifenwechsel",
      brake_service: "Bremsen",
      engine: "Motor",
      transmission: "Getriebe",
      electrical: "Elektrisch",
      bodywork: "Karosserie",
      inspection: "Technische Kontrolle",
      other: "Andere",
    },

    fields: {
      vehicle: "Fahrzeug",
      type: "Typ",
      category: "Kategorie",
      title: "Titel",
      description: "Beschreibung",
      status: "Status",
      priority: "Priorität",
      scheduledDate: "Geplantes Datum",
      dueDate: "Fälligkeitsdatum",
      completedDate: "Abschlussdatum",
      estimatedDuration: "Geschätzte Dauer",
      actualDuration: "Tatsächliche Dauer",
      estimatedCost: "Geschätzte Kosten",
      actualCost: "Tatsächliche Kosten",
      laborCost: "Arbeitskosten",
      partsCost: "Teilekosten",
      assignedTo: "Zugewiesen an",
      garage: "Werkstatt",
      notes: "Notizen",
      attachments: "Anhänge",
    },

    alerts: {
      overdue: "Überfällig",
      dueSoon: "Bald fällig",
      mileageThreshold: "Kilometerschwelle",
      inspectionRequired: "Inspektion empfohlen",
      noAlerts: "Keine Warnungen",
    },

    stats: {
      totalTasks: "Gesamtaufgaben",
      completedTasks: "Erledigte Aufgaben",
      overdueTasks: "Überfällige Aufgaben",
      totalCost: "Gesamtkosten",
      averageCost: "Durchschnittskosten",
      maintenanceScore: "Wartungspunktzahl",
      reliability: "Zuverlässigkeit",
    },

    reliability: {
      excellent: "Ausgezeichnet",
      good: "Gut",
      fair: "Durchschnittlich",
      poor: "Schlecht",
    },

    messages: {
      taskCreated: "Aufgabe erfolgreich erstellt",
      taskUpdated: "Aufgabe aktualisiert",
      taskDeleted: "Aufgabe gelöscht",
      taskCompleted: "Aufgabe als erledigt markiert",
      confirmDelete: "Möchten Sie diese Aufgabe wirklich löschen?",
      noTasks: "Keine Wartungsaufgaben",
      noHistory: "Kein Verlauf verfügbar",
    },
  },

  it: {
    title: "Gestione manutenzione",
    description:
      "Monitoraggio della manutenzione preventiva e correttiva dei veicoli",

    tabs: {
      calendar: "Calendario",
      tasks: "Compiti",
      history: "Cronologia",
      costs: "Costi",
      alerts: "Avvisi",
      schedules: "Pianificazioni",
    },

    actions: {
      createTask: "Nuovo compito",
      editTask: "Modifica",
      deleteTask: "Elimina",
      completeTask: "Segna completato",
      cancelTask: "Annulla",
      scheduleTask: "Pianifica",
      exportData: "Esporta",
      printReport: "Stampa",
      filterTasks: "Filtra",
    },

    types: {
      preventive: "Preventiva",
      corrective: "Correttiva",
      inspection: "Controllo",
      repair: "Riparazione",
    },

    status: {
      scheduled: "Pianificato",
      in_progress: "In corso",
      completed: "Completato",
      overdue: "In ritardo",
      cancelled: "Annullato",
    },

    priority: {
      low: "Bassa",
      medium: "Media",
      high: "Alta",
      critical: "Critica",
    },

    categories: {
      oil_change: "Cambio olio",
      tire_rotation: "Rotazione pneumatici",
      brake_service: "Freni",
      engine: "Motore",
      transmission: "Trasmissione",
      electrical: "Elettrico",
      bodywork: "Carrozzeria",
      inspection: "Controllo tecnico",
      other: "Altro",
    },

    fields: {
      vehicle: "Veicolo",
      type: "Tipo",
      category: "Categoria",
      title: "Titolo",
      description: "Descrizione",
      status: "Stato",
      priority: "Priorità",
      scheduledDate: "Data pianificata",
      dueDate: "Data di scadenza",
      completedDate: "Data di completamento",
      estimatedDuration: "Durata stimata",
      actualDuration: "Durata effettiva",
      estimatedCost: "Costo stimato",
      actualCost: "Costo effettivo",
      laborCost: "Manodopera",
      partsCost: "Pezzi",
      assignedTo: "Assegnato a",
      garage: "Officina",
      notes: "Note",
      attachments: "Allegati",
    },

    alerts: {
      overdue: "In ritardo",
      dueSoon: "In scadenza",
      mileageThreshold: "Soglia chilometrica",
      inspectionRequired: "Ispezione consigliata",
      noAlerts: "Nessun avviso",
    },

    stats: {
      totalTasks: "Totale compiti",
      completedTasks: "Compiti completati",
      overdueTasks: "Compiti in ritardo",
      totalCost: "Costo totale",
      averageCost: "Costo medio",
      maintenanceScore: "Punteggio manutenzione",
      reliability: "Affidabilità",
    },

    reliability: {
      excellent: "Eccellente",
      good: "Buona",
      fair: "Media",
      poor: "Scarsa",
    },

    messages: {
      taskCreated: "Compito creato con successo",
      taskUpdated: "Compito aggiornato",
      taskDeleted: "Compito eliminato",
      taskCompleted: "Compito segnato come completato",
      confirmDelete: "Sei sicuro di voler eliminare questo compito?",
      noTasks: "Nessun compito di manutenzione",
      noHistory: "Nessuna cronologia disponibile",
    },
  },

  en: {
    title: "Maintenance Management",
    description: "Tracking preventive and corrective vehicle maintenance",

    tabs: {
      calendar: "Calendar",
      tasks: "Tasks",
      history: "History",
      costs: "Costs",
      alerts: "Alerts",
      schedules: "Schedules",
    },

    actions: {
      createTask: "New Task",
      editTask: "Edit",
      deleteTask: "Delete",
      completeTask: "Mark Complete",
      cancelTask: "Cancel",
      scheduleTask: "Schedule",
      exportData: "Export",
      printReport: "Print",
      filterTasks: "Filter",
    },

    types: {
      preventive: "Preventive",
      corrective: "Corrective",
      inspection: "Inspection",
      repair: "Repair",
    },

    status: {
      scheduled: "Scheduled",
      in_progress: "In Progress",
      completed: "Completed",
      overdue: "Overdue",
      cancelled: "Cancelled",
    },

    priority: {
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
    },

    categories: {
      oil_change: "Oil Change",
      tire_rotation: "Tire Rotation",
      brake_service: "Brake Service",
      engine: "Engine",
      transmission: "Transmission",
      electrical: "Electrical",
      bodywork: "Bodywork",
      inspection: "Technical Inspection",
      other: "Other",
    },

    fields: {
      vehicle: "Vehicle",
      type: "Type",
      category: "Category",
      title: "Title",
      description: "Description",
      status: "Status",
      priority: "Priority",
      scheduledDate: "Scheduled Date",
      dueDate: "Due Date",
      completedDate: "Completion Date",
      estimatedDuration: "Estimated Duration",
      actualDuration: "Actual Duration",
      estimatedCost: "Estimated Cost",
      actualCost: "Actual Cost",
      laborCost: "Labor Cost",
      partsCost: "Parts Cost",
      assignedTo: "Assigned To",
      garage: "Garage",
      notes: "Notes",
      attachments: "Attachments",
    },

    alerts: {
      overdue: "Overdue",
      dueSoon: "Due Soon",
      mileageThreshold: "Mileage Threshold",
      inspectionRequired: "Inspection Recommended",
      noAlerts: "No Alerts",
    },

    stats: {
      totalTasks: "Total Tasks",
      completedTasks: "Completed Tasks",
      overdueTasks: "Overdue Tasks",
      totalCost: "Total Cost",
      averageCost: "Average Cost",
      maintenanceScore: "Maintenance Score",
      reliability: "Reliability",
    },

    reliability: {
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor",
    },

    messages: {
      taskCreated: "Task created successfully",
      taskUpdated: "Task updated",
      taskDeleted: "Task deleted",
      taskCompleted: "Task marked as completed",
      confirmDelete: "Are you sure you want to delete this task?",
      noTasks: "No maintenance tasks",
      noHistory: "No history available",
    },
  },
};
