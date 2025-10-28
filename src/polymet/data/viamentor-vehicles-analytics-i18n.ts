/**
 * VIAMENTOR - Vehicles Analytics i18n
 * Traductions FR/DE/IT/EN pour analytics véhicules
 */

import type { VehiclesAnalyticsLocale } from "@/polymet/data/viamentor-vehicles-analytics-data";

export const vehiclesAnalyticsI18n = {
  fr: {
    title: "Analytics Véhicules",
    tabs: {
      utilization: "Utilisation Flotte",
      costs: "Analyse Coûts",
      maintenance: "Suivi Maintenance",
      fuel: "Consommation Carburant",
    },
    stats: {
      totalVehicles: "Total Véhicules",
      totalKm: "Km Parcourus",
      totalHours: "Heures Utilisation",
      maintenanceCosts: "Coûts Maintenance",
    },
    utilization: {
      title: "Utilisation Flotte",
      table: {
        plate: "Plaque",
        vehicle: "Véhicule",
        category: "Catégorie",
        lessons: "Leçons",
        hours: "Heures",
        km: "Km",
        occupancy: "Taux Occupation",
        inactive: "Jours Inactivité",
        revenue: "Revenue Généré",
        actions: "Actions",
      },
      chart: {
        title: "Comparaison Utilisation",
        avgLine: "Moyenne Flotte",
      },
      heatmap: {
        title: "Utilisation Hebdomadaire",
        days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      alerts: {
        inactive: "Inactif depuis {{days}} jours",
        underutilized: "Sous-utilisé",
      },
    },
    costs: {
      title: "Analyse Coûts",
      breakdown: {
        title: "Répartition Coûts Totaux",
        maintenance: "Maintenance",
        fuel: "Carburant",
        insurance: "Assurances",
        depreciation: "Amortissement",
        other: "Autres",
      },
      table: {
        plate: "Plaque",
        totalCosts: "Coûts Total",
        costPerKm: "Coût/km",
        costPerHour: "Coût/heure",
        km: "Km",
        hours: "Heures",
        roi: "ROI",
      },
      evolution: {
        title: "Évolution Coûts Cumulés",
      },
      expensive: {
        title: "Véhicules Coûteux",
        subtitle: "Top 5 coûts les plus élevés",
        consider: "Considérer remplacement",
      },
    },
    maintenance: {
      title: "Historique Maintenances",
      table: {
        date: "Date",
        plate: "Véhicule",
        type: "Type",
        km: "Km Compteur",
        cost: "Coût",
        nextDue: "Prochaine Échéance",
        description: "Description",
      },
      types: {
        preventive: "Préventive",
        corrective: "Corrective",
        inspection: "Inspection",
        tire_change: "Changement Pneus",
        other: "Autre",
      },
      chart: {
        title: "Coûts par Type",
      },
      alerts: {
        title: "Maintenances à Planifier",
        due: "Échéance dans {{days}} jours",
      },
    },
    fuel: {
      title: "Consommation Carburant",
      avgCard: {
        title: "Consommation Moyenne Flotte",
        target: "Objectif Éco",
      },
      table: {
        plate: "Plaque",
        vehicle: "Véhicule",
        consumption: "Consommation",
        liters: "Total Litres",
        cost: "Total CHF",
        trend: "Évolution",
        status: "Statut",
      },
      chart: {
        title: "Tendances Consommation",
      },
      status: {
        efficient: "Efficace",
        inefficient: "À Améliorer",
      },
    },
    actions: {
      viewDetail: "Voir Détail",
      viewPlanning: "Planning",
      schedule: "Planifier",
      export: "Exporter",
    },
  },
  de: {
    title: "Fahrzeug-Analytics",
    tabs: {
      utilization: "Flottennutzung",
      costs: "Kostenanalyse",
      maintenance: "Wartungsverfolgung",
      fuel: "Kraftstoffverbrauch",
    },
    stats: {
      totalVehicles: "Fahrzeuge Gesamt",
      totalKm: "Gefahrene Km",
      totalHours: "Nutzungsstunden",
      maintenanceCosts: "Wartungskosten",
    },
    utilization: {
      title: "Flottennutzung",
      table: {
        plate: "Kennzeichen",
        vehicle: "Fahrzeug",
        category: "Kategorie",
        lessons: "Lektionen",
        hours: "Stunden",
        km: "Km",
        occupancy: "Auslastung",
        inactive: "Inaktive Tage",
        revenue: "Umsatz",
        actions: "Aktionen",
      },
      chart: {
        title: "Nutzungsvergleich",
        avgLine: "Flottendurchschnitt",
      },
      heatmap: {
        title: "Wöchentliche Nutzung",
        days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      },
      alerts: {
        inactive: "Inaktiv seit {{days}} Tagen",
        underutilized: "Unterausgelastet",
      },
    },
    costs: {
      title: "Kostenanalyse",
      breakdown: {
        title: "Kostenaufschlüsselung",
        maintenance: "Wartung",
        fuel: "Kraftstoff",
        insurance: "Versicherung",
        depreciation: "Abschreibung",
        other: "Sonstiges",
      },
      table: {
        plate: "Kennzeichen",
        totalCosts: "Gesamtkosten",
        costPerKm: "Kosten/km",
        costPerHour: "Kosten/Stunde",
        km: "Km",
        hours: "Stunden",
        roi: "ROI",
      },
      evolution: {
        title: "Kostenentwicklung",
      },
      expensive: {
        title: "Teure Fahrzeuge",
        subtitle: "Top 5 höchste Kosten",
        consider: "Ersatz erwägen",
      },
    },
    maintenance: {
      title: "Wartungshistorie",
      table: {
        date: "Datum",
        plate: "Fahrzeug",
        type: "Typ",
        km: "Km-Stand",
        cost: "Kosten",
        nextDue: "Nächste Fälligkeit",
        description: "Beschreibung",
      },
      types: {
        preventive: "Vorbeugend",
        corrective: "Korrigierend",
        inspection: "Inspektion",
        tire_change: "Reifenwechsel",
        other: "Sonstiges",
      },
      chart: {
        title: "Kosten nach Typ",
      },
      alerts: {
        title: "Zu planende Wartungen",
        due: "Fällig in {{days}} Tagen",
      },
    },
    fuel: {
      title: "Kraftstoffverbrauch",
      avgCard: {
        title: "Durchschnitt Flottenverbrauch",
        target: "Öko-Ziel",
      },
      table: {
        plate: "Kennzeichen",
        vehicle: "Fahrzeug",
        consumption: "Verbrauch",
        liters: "Liter Gesamt",
        cost: "CHF Gesamt",
        trend: "Entwicklung",
        status: "Status",
      },
      chart: {
        title: "Verbrauchstrends",
      },
      status: {
        efficient: "Effizient",
        inefficient: "Zu verbessern",
      },
    },
    actions: {
      viewDetail: "Details",
      viewPlanning: "Planung",
      schedule: "Planen",
      export: "Exportieren",
    },
  },
  it: {
    title: "Analytics Veicoli",
    tabs: {
      utilization: "Utilizzo Flotta",
      costs: "Analisi Costi",
      maintenance: "Monitoraggio Manutenzione",
      fuel: "Consumo Carburante",
    },
    stats: {
      totalVehicles: "Veicoli Totali",
      totalKm: "Km Percorsi",
      totalHours: "Ore Utilizzo",
      maintenanceCosts: "Costi Manutenzione",
    },
    utilization: {
      title: "Utilizzo Flotta",
      table: {
        plate: "Targa",
        vehicle: "Veicolo",
        category: "Categoria",
        lessons: "Lezioni",
        hours: "Ore",
        km: "Km",
        occupancy: "Tasso Occupazione",
        inactive: "Giorni Inattività",
        revenue: "Ricavi Generati",
        actions: "Azioni",
      },
      chart: {
        title: "Confronto Utilizzo",
        avgLine: "Media Flotta",
      },
      heatmap: {
        title: "Utilizzo Settimanale",
        days: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      },
      alerts: {
        inactive: "Inattivo da {{days}} giorni",
        underutilized: "Sottoutilizzato",
      },
    },
    costs: {
      title: "Analisi Costi",
      breakdown: {
        title: "Ripartizione Costi Totali",
        maintenance: "Manutenzione",
        fuel: "Carburante",
        insurance: "Assicurazioni",
        depreciation: "Ammortamento",
        other: "Altri",
      },
      table: {
        plate: "Targa",
        totalCosts: "Costi Totali",
        costPerKm: "Costo/km",
        costPerHour: "Costo/ora",
        km: "Km",
        hours: "Ore",
        roi: "ROI",
      },
      evolution: {
        title: "Evoluzione Costi Cumulati",
      },
      expensive: {
        title: "Veicoli Costosi",
        subtitle: "Top 5 costi più elevati",
        consider: "Considerare sostituzione",
      },
    },
    maintenance: {
      title: "Storico Manutenzioni",
      table: {
        date: "Data",
        plate: "Veicolo",
        type: "Tipo",
        km: "Km Contatore",
        cost: "Costo",
        nextDue: "Prossima Scadenza",
        description: "Descrizione",
      },
      types: {
        preventive: "Preventiva",
        corrective: "Correttiva",
        inspection: "Ispezione",
        tire_change: "Cambio Pneumatici",
        other: "Altro",
      },
      chart: {
        title: "Costi per Tipo",
      },
      alerts: {
        title: "Manutenzioni da Pianificare",
        due: "Scadenza tra {{days}} giorni",
      },
    },
    fuel: {
      title: "Consumo Carburante",
      avgCard: {
        title: "Consumo Medio Flotta",
        target: "Obiettivo Eco",
      },
      table: {
        plate: "Targa",
        vehicle: "Veicolo",
        consumption: "Consumo",
        liters: "Litri Totali",
        cost: "CHF Totali",
        trend: "Evoluzione",
        status: "Stato",
      },
      chart: {
        title: "Tendenze Consumo",
      },
      status: {
        efficient: "Efficiente",
        inefficient: "Da Migliorare",
      },
    },
    actions: {
      viewDetail: "Vedi Dettaglio",
      viewPlanning: "Pianificazione",
      schedule: "Pianifica",
      export: "Esporta",
    },
  },
  en: {
    title: "Vehicles Analytics",
    tabs: {
      utilization: "Fleet Utilization",
      costs: "Costs Analysis",
      maintenance: "Maintenance Tracking",
      fuel: "Fuel Consumption",
    },
    stats: {
      totalVehicles: "Total Vehicles",
      totalKm: "Km Driven",
      totalHours: "Usage Hours",
      maintenanceCosts: "Maintenance Costs",
    },
    utilization: {
      title: "Fleet Utilization",
      table: {
        plate: "Plate",
        vehicle: "Vehicle",
        category: "Category",
        lessons: "Lessons",
        hours: "Hours",
        km: "Km",
        occupancy: "Occupancy Rate",
        inactive: "Inactive Days",
        revenue: "Revenue Generated",
        actions: "Actions",
      },
      chart: {
        title: "Utilization Comparison",
        avgLine: "Fleet Average",
      },
      heatmap: {
        title: "Weekly Utilization",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      alerts: {
        inactive: "Inactive for {{days}} days",
        underutilized: "Underutilized",
      },
    },
    costs: {
      title: "Costs Analysis",
      breakdown: {
        title: "Total Costs Breakdown",
        maintenance: "Maintenance",
        fuel: "Fuel",
        insurance: "Insurance",
        depreciation: "Depreciation",
        other: "Other",
      },
      table: {
        plate: "Plate",
        totalCosts: "Total Costs",
        costPerKm: "Cost/km",
        costPerHour: "Cost/hour",
        km: "Km",
        hours: "Hours",
        roi: "ROI",
      },
      evolution: {
        title: "Cumulative Costs Evolution",
      },
      expensive: {
        title: "Expensive Vehicles",
        subtitle: "Top 5 highest costs",
        consider: "Consider replacement",
      },
    },
    maintenance: {
      title: "Maintenance History",
      table: {
        date: "Date",
        plate: "Vehicle",
        type: "Type",
        km: "Km Counter",
        cost: "Cost",
        nextDue: "Next Due",
        description: "Description",
      },
      types: {
        preventive: "Preventive",
        corrective: "Corrective",
        inspection: "Inspection",
        tire_change: "Tire Change",
        other: "Other",
      },
      chart: {
        title: "Costs by Type",
      },
      alerts: {
        title: "Maintenances to Schedule",
        due: "Due in {{days}} days",
      },
    },
    fuel: {
      title: "Fuel Consumption",
      avgCard: {
        title: "Fleet Average Consumption",
        target: "Eco Target",
      },
      table: {
        plate: "Plate",
        vehicle: "Vehicle",
        consumption: "Consumption",
        liters: "Total Liters",
        cost: "Total CHF",
        trend: "Trend",
        status: "Status",
      },
      chart: {
        title: "Consumption Trends",
      },
      status: {
        efficient: "Efficient",
        inefficient: "To Improve",
      },
    },
    actions: {
      viewDetail: "View Detail",
      viewPlanning: "Planning",
      schedule: "Schedule",
      export: "Export",
    },
  },
};

export function getVehiclesAnalyticsTranslations(
  locale: VehiclesAnalyticsLocale = "fr"
) {
  return vehiclesAnalyticsI18n[locale];
}
