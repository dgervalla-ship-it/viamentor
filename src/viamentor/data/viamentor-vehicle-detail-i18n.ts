/**
 * VIAMENTOR - Vehicle Detail i18n
 * Traductions FR/DE/IT/EN pour page détail véhicule
 */

export type VehicleDetailLocale = "fr" | "de" | "it" | "en";

export interface VehicleDetailTranslations {
  header: {
    title: string;
    edit: string;
    planning: string;
    maintenance: string;
    deactivate: string;
    delete: string;
    export: string;
    status: {
      available: string;
      in_lesson: string;
      maintenance: string;
      inactive: string;
    };
  };
  tabs: {
    informations: string;
    history: string;
    gps: string;
    costs: string;
    fuel: string;
    analytics: string;
    planning: string;
    documents: string;
  };
  planning: {
    title: string;
    totalLessons: string;
    scheduled: string;
    conflicts: string;
    today: string;
    allStatus: string;
    statusScheduled: string;
    statusInProgress: string;
    statusCompleted: string;
    statusCancelled: string;
    bookLesson: string;
    conflict: string;
    conflictsDetected: string;
    conflictsMessage: string;
  };
  documents: {
    title: string;
    totalDocs: string;
    valid: string;
    expiringSoon: string;
    expired: string;
    expirationAlert: string;
    expiredMessage: string;
    expiringSoonMessage: string;
    search: string;
    upload: string;
    preview: string;
    download: string;
    delete: string;
    uploaded: string;
    expires: string;
    statusValid: string;
    statusExpiringSoon: string;
    statusExpired: string;
    noDocuments: string;
    previewNotAvailable: string;
  };
  history: {
    title: string;
    filters: {
      date: string;
      user: string;
      action: string;
      search: string;
      reset: string;
    };
    actions: {
      status_change: string;
      update: string;
      maintenance: string;
      document: string;
      cost: string;
      fuel: string;
      other: string;
    };
    templates: {
      status_change: string;
      update: string;
      maintenance: string;
      document: string;
    };
    export: string;
    noData: string;
    viewDetails: string;
  };
  gps: {
    title: string;
    realtime: {
      title: string;
      currentPosition: string;
      lastUpdate: string;
      inLesson: string;
      notAvailable: string;
    };
    trajectories: {
      title: string;
      selectLesson: string;
      stats: {
        distance: string;
        duration: string;
        avgSpeed: string;
        maxSpeed: string;
        zones: string;
        city: string;
        highway: string;
        rural: string;
      };
      viewDetails: string;
      noData: string;
    };
    settings: {
      title: string;
      enableRealtime: string;
      autoRecord: string;
      speedAlerts: string;
      speedThreshold: string;
      privacy: string;
    };
    events: {
      start: string;
      stop: string;
      speeding: string;
    };
  };
  costs: {
    title: string;
    period: string;
    stats: {
      total: string;
      perKm: string;
      perHour: string;
      roi: string;
    };
    categories: {
      maintenance: string;
      fuel: string;
      insurance: string;
      tax: string;
      other: string;
    };
    table: {
      date: string;
      category: string;
      description: string;
      amount: string;
      invoice: string;
      km: string;
      actions: string;
    };
    add: string;
    edit: string;
    delete: string;
    export: string;
    charts: {
      cumulative: string;
      distribution: string;
      monthly: string;
    };
    noData: string;
  };
  fuel: {
    title: string;
    quickAdd: {
      title: string;
      date: string;
      km: string;
      liters: string;
      amount: string;
      type: string;
      receipt: string;
      paymentMethod: string;
      save: string;
    };
    paymentMethods: {
      cash: string;
      card: string;
      fuel_card: string;
      invoice: string;
    };
    types: {
      gasoline: string;
      diesel: string;
      electric: string;
      hybrid: string;
    };
    stats: {
      avgConsumption: string;
      totalLiters: string;
      totalCost: string;
      target: string;
    };
    table: {
      date: string;
      km: string;
      liters: string;
      amount: string;
      consumption: string;
      receipt: string;
      paymentMethod: string;
      actions: string;
    };
    chart: {
      title: string;
      consumption: string;
    };
    noData: string;
  };
  analytics: {
    title: string;
    heatmap: {
      title: string;
      days: string[];
      hours: string;
    };
    topInstructors: {
      title: string;
      hours: string;
      lessons: string;
    };
    topStudents: {
      title: string;
      lessons: string;
    };
    inactive: {
      title: string;
      days: string;
      warning: string;
      recommendation: string;
    };
    noData: string;
  };
  depreciation: {
    title: string;
    currentValue: string;
    totalDepreciation: string;
    bookValue: string;
    chart: string;
  };
  export: {
    title: string;
    description: string;
    generate: string;
  };
}

const translations: Record<VehicleDetailLocale, VehicleDetailTranslations> = {
  fr: {
    header: {
      title: "Détail véhicule",
      edit: "Modifier",
      planning: "Planning",
      maintenance: "Maintenance",
      deactivate: "Désactiver",
      delete: "Supprimer",
      export: "Exporter",
      status: {
        available: "Disponible",
        in_lesson: "En leçon",
        maintenance: "Maintenance",
        inactive: "Inactif",
      },
    },
    tabs: {
      informations: "Informations",
      history: "Historique",
      gps: "GPS",
      costs: "Coûts",
      fuel: "Carburant",
      analytics: "Analytics",
      planning: "Planning",
      documents: "Documents",
    },
    planning: {
      title: "Planning véhicule",
      totalLessons: "Total leçons",
      scheduled: "Planifiées",
      conflicts: "Conflits",
      today: "Aujourd'hui",
      allStatus: "Tous les statuts",
      statusScheduled: "Planifiée",
      statusInProgress: "En cours",
      statusCompleted: "Terminée",
      statusCancelled: "Annulée",
      bookLesson: "Réserver leçon",
      conflict: "Conflit",
      conflictsDetected: "Conflits détectés",
      conflictsMessage:
        "Certaines leçons ont des conflits horaires. Veuillez les résoudre.",
    },
    documents: {
      title: "Documents véhicule",
      totalDocs: "Total documents",
      valid: "Valides",
      expiringSoon: "Expirent bientôt",
      expired: "Expirés",
      expirationAlert: "Attention aux expirations",
      expiredMessage:
        "Certains documents sont expirés. Veuillez les renouveler immédiatement.",
      expiringSoonMessage:
        "Certains documents expirent bientôt. Veuillez les renouveler.",
      search: "Rechercher documents...",
      upload: "Télécharger",
      preview: "Aperçu",
      download: "Télécharger",
      delete: "Supprimer",
      uploaded: "Téléchargé le",
      expires: "Expire le",
      statusValid: "Valide",
      statusExpiringSoon: "Expire bientôt",
      statusExpired: "Expiré",
      noDocuments: "Aucun document trouvé",
      previewNotAvailable: "Aperçu non disponible",
    },
    history: {
      title: "Historique des actions",
      filters: {
        date: "Date",
        user: "Utilisateur",
        action: "Type d'action",
        search: "Rechercher...",
        reset: "Réinitialiser",
      },
      actions: {
        status_change: "Changement statut",
        update: "Mise à jour",
        maintenance: "Maintenance",
        document: "Document",
        cost: "Coût",
        fuel: "Carburant",
        other: "Autre",
      },
      templates: {
        status_change: "a changé le statut de {old} à {new}",
        update: "a mis à jour {field} de {old} à {new}",
        maintenance: "a ajouté une maintenance {type}",
        document: "a téléchargé {documentType}",
      },
      export: "Exporter CSV",
      noData: "Aucun historique disponible",
      viewDetails: "Voir détails JSON",
    },
    gps: {
      title: "Géolocalisation GPS",
      realtime: {
        title: "Position en temps réel",
        currentPosition: "Position actuelle",
        lastUpdate: "Dernière mise à jour",
        inLesson: "En leçon avec",
        notAvailable: "GPS non disponible",
      },
      trajectories: {
        title: "Trajets historiques",
        selectLesson: "Sélectionner une leçon",
        stats: {
          distance: "Distance",
          duration: "Durée",
          avgSpeed: "Vitesse moyenne",
          maxSpeed: "Vitesse max",
          zones: "Zones pratiquées",
          city: "Ville",
          highway: "Autoroute",
          rural: "Campagne",
        },
        viewDetails: "Voir trajet détaillé",
        noData: "Aucun trajet enregistré",
      },
      settings: {
        title: "Paramètres GPS",
        enableRealtime: "Activer suivi temps réel",
        autoRecord: "Enregistrer trajets automatiquement",
        speedAlerts: "Alertes dépassement vitesse",
        speedThreshold: "Seuil vitesse (km/h)",
        privacy: "Données GPS stockées 90 jours puis supprimées (RGPD)",
      },
      events: {
        start: "Départ",
        stop: "Arrivée",
        speeding: "Dépassement vitesse",
      },
    },
    costs: {
      title: "Gestion des coûts",
      period: "Période",
      stats: {
        total: "Total dépenses",
        perKm: "Coût par km",
        perHour: "Coût par heure",
        roi: "ROI",
      },
      categories: {
        maintenance: "Entretien",
        fuel: "Carburant",
        insurance: "Assurance",
        tax: "Taxe",
        other: "Autre",
      },
      table: {
        date: "Date",
        category: "Catégorie",
        description: "Description",
        amount: "Montant",
        invoice: "Facture",
        km: "Km",
        actions: "Actions",
      },
      add: "Ajouter dépense",
      edit: "Modifier",
      delete: "Supprimer",
      export: "Rapport coûts",
      charts: {
        cumulative: "Coûts cumulés",
        distribution: "Répartition par catégorie",
        monthly: "Coûts mensuels",
      },
      noData: "Aucune dépense enregistrée",
    },
    fuel: {
      title: "Suivi carburant",
      quickAdd: {
        title: "Ajouter un plein",
        date: "Date",
        km: "Kilométrage",
        liters: "Litres",
        amount: "Montant (CHF)",
        type: "Type",
        receipt: "Quittance",
        paymentMethod: "Mode de paiement",
        save: "Enregistrer",
      },
      paymentMethods: {
        cash: "Espèces",
        card: "Carte bancaire",
        fuel_card: "Carte carburant",
        invoice: "Facture",
      },
      types: {
        gasoline: "Essence",
        diesel: "Diesel",
        electric: "Électrique",
        hybrid: "Hybride",
      },
      stats: {
        avgConsumption: "Consommation moyenne",
        totalLiters: "Total litres",
        totalCost: "Total CHF",
        target: "Objectif éco-conduite",
      },
      table: {
        date: "Date",
        km: "Km",
        liters: "Litres",
        amount: "CHF",
        consumption: "L/100km",
        receipt: "Quittance",
        paymentMethod: "Paiement",
        actions: "Actions",
      },
      chart: {
        title: "Évolution consommation",
        consumption: "Consommation (L/100km)",
      },
      noData: "Aucun plein enregistré",
    },
    analytics: {
      title: "Analyses d'utilisation",
      heatmap: {
        title: "Fréquence d'utilisation",
        days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        hours: "Heures",
      },
      topInstructors: {
        title: "Top moniteurs",
        hours: "heures",
        lessons: "leçons",
      },
      topStudents: {
        title: "Top élèves",
        lessons: "leçons",
      },
      inactive: {
        title: "Jours d'inactivité",
        days: "jours",
        warning: "Véhicule sous-utilisé",
        recommendation: "Considérer réduction flotte ou augmentation marketing",
      },
      noData: "Données insuffisantes",
    },
    depreciation: {
      title: "Dépréciation",
      currentValue: "Valeur estimée actuelle",
      totalDepreciation: "Dépréciation totale",
      bookValue: "Valeur comptable",
      chart: "Évolution de la valeur",
    },
    export: {
      title: "Dossier complet véhicule",
      description: "Générer un PDF complet avec toutes les informations",
      generate: "Générer PDF",
    },
  },
  de: {
    header: {
      title: "Fahrzeugdetails",
      edit: "Bearbeiten",
      planning: "Planung",
      maintenance: "Wartung",
      deactivate: "Deaktivieren",
      delete: "Löschen",
      export: "Exportieren",
      status: {
        available: "Verfügbar",
        in_lesson: "In Lektion",
        maintenance: "Wartung",
        inactive: "Inaktiv",
      },
    },
    tabs: {
      informations: "Informationen",
      history: "Verlauf",
      gps: "GPS",
      costs: "Kosten",
      fuel: "Kraftstoff",
      analytics: "Analysen",
      planning: "Planung",
      documents: "Dokumente",
    },
    planning: {
      title: "Fahrzeugplanung",
      totalLessons: "Gesamt Lektionen",
      scheduled: "Geplant",
      conflicts: "Konflikte",
      today: "Heute",
      allStatus: "Alle Status",
      statusScheduled: "Geplant",
      statusInProgress: "In Bearbeitung",
      statusCompleted: "Abgeschlossen",
      statusCancelled: "Storniert",
      bookLesson: "Lektion buchen",
      conflict: "Konflikt",
      conflictsDetected: "Konflikte erkannt",
      conflictsMessage:
        "Einige Lektionen haben Zeitkonflikte. Bitte lösen Sie diese.",
    },
    documents: {
      title: "Fahrzeugdokumente",
      totalDocs: "Gesamt Dokumente",
      valid: "Gültig",
      expiringSoon: "Läuft bald ab",
      expired: "Abgelaufen",
      expirationAlert: "Achtung Ablaufdaten",
      expiredMessage:
        "Einige Dokumente sind abgelaufen. Bitte erneuern Sie diese sofort.",
      expiringSoonMessage:
        "Einige Dokumente laufen bald ab. Bitte erneuern Sie diese.",
      search: "Dokumente suchen...",
      upload: "Hochladen",
      preview: "Vorschau",
      download: "Herunterladen",
      delete: "Löschen",
      uploaded: "Hochgeladen am",
      expires: "Läuft ab am",
      statusValid: "Gültig",
      statusExpiringSoon: "Läuft bald ab",
      statusExpired: "Abgelaufen",
      noDocuments: "Keine Dokumente gefunden",
      previewNotAvailable: "Vorschau nicht verfügbar",
    },
    history: {
      title: "Aktionsverlauf",
      filters: {
        date: "Datum",
        user: "Benutzer",
        action: "Aktionstyp",
        search: "Suchen...",
        reset: "Zurücksetzen",
      },
      actions: {
        status_change: "Statusänderung",
        update: "Aktualisierung",
        maintenance: "Wartung",
        document: "Dokument",
        cost: "Kosten",
        fuel: "Kraftstoff",
        other: "Andere",
      },
      templates: {
        status_change: "hat Status von {old} zu {new} geändert",
        update: "hat {field} von {old} zu {new} aktualisiert",
        maintenance: "hat Wartung {type} hinzugefügt",
        document: "hat {documentType} hochgeladen",
      },
      export: "CSV exportieren",
      noData: "Kein Verlauf verfügbar",
      viewDetails: "JSON-Details anzeigen",
    },
    gps: {
      title: "GPS-Ortung",
      realtime: {
        title: "Echtzeit-Position",
        currentPosition: "Aktuelle Position",
        lastUpdate: "Letzte Aktualisierung",
        inLesson: "In Lektion mit",
        notAvailable: "GPS nicht verfügbar",
      },
      trajectories: {
        title: "Historische Routen",
        selectLesson: "Lektion auswählen",
        stats: {
          distance: "Entfernung",
          duration: "Dauer",
          avgSpeed: "Durchschnittsgeschwindigkeit",
          maxSpeed: "Höchstgeschwindigkeit",
          zones: "Geübte Zonen",
          city: "Stadt",
          highway: "Autobahn",
          rural: "Land",
        },
        viewDetails: "Detaillierte Route anzeigen",
        noData: "Keine Routen aufgezeichnet",
      },
      settings: {
        title: "GPS-Einstellungen",
        enableRealtime: "Echtzeit-Tracking aktivieren",
        autoRecord: "Routen automatisch aufzeichnen",
        speedAlerts: "Geschwindigkeitsüberschreitung Warnungen",
        speedThreshold: "Geschwindigkeitsschwelle (km/h)",
        privacy: "GPS-Daten 90 Tage gespeichert, dann gelöscht (DSGVO)",
      },
      events: {
        start: "Start",
        stop: "Ankunft",
        speeding: "Geschwindigkeitsüberschreitung",
      },
    },
    costs: {
      title: "Kostenverwaltung",
      period: "Zeitraum",
      stats: {
        total: "Gesamtausgaben",
        perKm: "Kosten pro km",
        perHour: "Kosten pro Stunde",
        roi: "ROI",
      },
      categories: {
        maintenance: "Wartung",
        fuel: "Kraftstoff",
        insurance: "Versicherung",
        tax: "Steuer",
        other: "Andere",
      },
      table: {
        date: "Datum",
        category: "Kategorie",
        description: "Beschreibung",
        amount: "Betrag",
        invoice: "Rechnung",
        km: "Km",
        actions: "Aktionen",
      },
      add: "Ausgabe hinzufügen",
      edit: "Bearbeiten",
      delete: "Löschen",
      export: "Kostenbericht",
      charts: {
        cumulative: "Kumulative Kosten",
        distribution: "Verteilung nach Kategorie",
        monthly: "Monatliche Kosten",
      },
      noData: "Keine Ausgaben erfasst",
    },
    fuel: {
      title: "Kraftstoffverfolgung",
      quickAdd: {
        title: "Tankfüllung hinzufügen",
        date: "Datum",
        km: "Kilometerstand",
        liters: "Liter",
        amount: "Betrag (CHF)",
        type: "Typ",
        receipt: "Quittung",
        paymentMethod: "Zahlungsmethode",
        save: "Speichern",
      },
      paymentMethods: {
        cash: "Bargeld",
        card: "Bankkarte",
        fuel_card: "Tankkarte",
        invoice: "Rechnung",
      },
      types: {
        gasoline: "Benzin",
        diesel: "Diesel",
        electric: "Elektrisch",
        hybrid: "Hybrid",
      },
      stats: {
        avgConsumption: "Durchschnittsverbrauch",
        totalLiters: "Gesamt Liter",
        totalCost: "Gesamt CHF",
        target: "Öko-Fahrziel",
      },
      table: {
        date: "Datum",
        km: "Km",
        liters: "Liter",
        amount: "CHF",
        consumption: "L/100km",
        receipt: "Quittung",
        paymentMethod: "Zahlung",
        actions: "Aktionen",
      },
      chart: {
        title: "Verbrauchsentwicklung",
        consumption: "Verbrauch (L/100km)",
      },
      noData: "Keine Tankfüllungen erfasst",
    },
    analytics: {
      title: "Nutzungsanalysen",
      heatmap: {
        title: "Nutzungshäufigkeit",
        days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        hours: "Stunden",
      },
      topInstructors: {
        title: "Top Fahrlehrer",
        hours: "Stunden",
        lessons: "Lektionen",
      },
      topStudents: {
        title: "Top Schüler",
        lessons: "Lektionen",
      },
      inactive: {
        title: "Inaktive Tage",
        days: "Tage",
        warning: "Fahrzeug unterausgelastet",
        recommendation: "Flottenreduzierung oder Marketing-Steigerung erwägen",
      },
      noData: "Unzureichende Daten",
    },
    depreciation: {
      title: "Wertminderung",
      currentValue: "Aktueller Schätzwert",
      totalDepreciation: "Gesamtwertminderung",
      bookValue: "Buchwert",
      chart: "Wertentwicklung",
    },
    export: {
      title: "Vollständige Fahrzeugakte",
      description: "Vollständiges PDF mit allen Informationen generieren",
      generate: "PDF generieren",
    },
  },
  it: {
    header: {
      title: "Dettagli veicolo",
      edit: "Modificare",
      planning: "Pianificazione",
      maintenance: "Manutenzione",
      deactivate: "Disattivare",
      delete: "Eliminare",
      export: "Esportare",
      status: {
        available: "Disponibile",
        in_lesson: "In lezione",
        maintenance: "Manutenzione",
        inactive: "Inattivo",
      },
    },
    tabs: {
      informations: "Informazioni",
      history: "Cronologia",
      gps: "GPS",
      costs: "Costi",
      fuel: "Carburante",
      analytics: "Analisi",
      planning: "Pianificazione",
      documents: "Documenti",
    },
    planning: {
      title: "Pianificazione veicolo",
      totalLessons: "Totale lezioni",
      scheduled: "Pianificate",
      conflicts: "Conflitti",
      today: "Oggi",
      allStatus: "Tutti gli stati",
      statusScheduled: "Pianificata",
      statusInProgress: "In corso",
      statusCompleted: "Completata",
      statusCancelled: "Annullata",
      bookLesson: "Prenota lezione",
      conflict: "Conflitto",
      conflictsDetected: "Conflitti rilevati",
      conflictsMessage:
        "Alcune lezioni hanno conflitti orari. Si prega di risolverli.",
    },
    documents: {
      title: "Documenti veicolo",
      totalDocs: "Totale documenti",
      valid: "Validi",
      expiringSoon: "In scadenza",
      expired: "Scaduti",
      expirationAlert: "Attenzione alle scadenze",
      expiredMessage:
        "Alcuni documenti sono scaduti. Si prega di rinnovarli immediatamente.",
      expiringSoonMessage:
        "Alcuni documenti scadono presto. Si prega di rinnovarli.",
      search: "Cerca documenti...",
      upload: "Carica",
      preview: "Anteprima",
      download: "Scarica",
      delete: "Elimina",
      uploaded: "Caricato il",
      expires: "Scade il",
      statusValid: "Valido",
      statusExpiringSoon: "In scadenza",
      statusExpired: "Scaduto",
      noDocuments: "Nessun documento trovato",
      previewNotAvailable: "Anteprima non disponibile",
    },
    history: {
      title: "Cronologia azioni",
      filters: {
        date: "Data",
        user: "Utente",
        action: "Tipo di azione",
        search: "Cercare...",
        reset: "Ripristinare",
      },
      actions: {
        status_change: "Cambio stato",
        update: "Aggiornamento",
        maintenance: "Manutenzione",
        document: "Documento",
        cost: "Costo",
        fuel: "Carburante",
        other: "Altro",
      },
      templates: {
        status_change: "ha cambiato lo stato da {old} a {new}",
        update: "ha aggiornato {field} da {old} a {new}",
        maintenance: "ha aggiunto manutenzione {type}",
        document: "ha caricato {documentType}",
      },
      export: "Esporta CSV",
      noData: "Nessuna cronologia disponibile",
      viewDetails: "Visualizza dettagli JSON",
    },
    gps: {
      title: "Geolocalizzazione GPS",
      realtime: {
        title: "Posizione in tempo reale",
        currentPosition: "Posizione attuale",
        lastUpdate: "Ultimo aggiornamento",
        inLesson: "In lezione con",
        notAvailable: "GPS non disponibile",
      },
      trajectories: {
        title: "Percorsi storici",
        selectLesson: "Seleziona lezione",
        stats: {
          distance: "Distanza",
          duration: "Durata",
          avgSpeed: "Velocità media",
          maxSpeed: "Velocità max",
          zones: "Zone praticate",
          city: "Città",
          highway: "Autostrada",
          rural: "Campagna",
        },
        viewDetails: "Visualizza percorso dettagliato",
        noData: "Nessun percorso registrato",
      },
      settings: {
        title: "Impostazioni GPS",
        enableRealtime: "Attiva tracciamento tempo reale",
        autoRecord: "Registra percorsi automaticamente",
        speedAlerts: "Avvisi superamento velocità",
        speedThreshold: "Soglia velocità (km/h)",
        privacy: "Dati GPS conservati 90 giorni poi eliminati (GDPR)",
      },
      events: {
        start: "Partenza",
        stop: "Arrivo",
        speeding: "Superamento velocità",
      },
    },
    costs: {
      title: "Gestione costi",
      period: "Periodo",
      stats: {
        total: "Spese totali",
        perKm: "Costo per km",
        perHour: "Costo per ora",
        roi: "ROI",
      },
      categories: {
        maintenance: "Manutenzione",
        fuel: "Carburante",
        insurance: "Assicurazione",
        tax: "Tassa",
        other: "Altro",
      },
      table: {
        date: "Data",
        category: "Categoria",
        description: "Descrizione",
        amount: "Importo",
        invoice: "Fattura",
        km: "Km",
        actions: "Azioni",
      },
      add: "Aggiungi spesa",
      edit: "Modificare",
      delete: "Eliminare",
      export: "Rapporto costi",
      charts: {
        cumulative: "Costi cumulativi",
        distribution: "Distribuzione per categoria",
        monthly: "Costi mensili",
      },
      noData: "Nessuna spesa registrata",
    },
    fuel: {
      title: "Monitoraggio carburante",
      quickAdd: {
        title: "Aggiungi rifornimento",
        date: "Data",
        km: "Chilometraggio",
        liters: "Litri",
        amount: "Importo (CHF)",
        type: "Tipo",
        receipt: "Ricevuta",
        paymentMethod: "Metodo di pagamento",
        save: "Salvare",
      },
      paymentMethods: {
        cash: "Contanti",
        card: "Carta bancaria",
        fuel_card: "Carta carburante",
        invoice: "Fattura",
      },
      types: {
        gasoline: "Benzina",
        diesel: "Diesel",
        electric: "Elettrico",
        hybrid: "Ibrido",
      },
      stats: {
        avgConsumption: "Consumo medio",
        totalLiters: "Totale litri",
        totalCost: "Totale CHF",
        target: "Obiettivo eco-guida",
      },
      table: {
        date: "Data",
        km: "Km",
        liters: "Litri",
        amount: "CHF",
        consumption: "L/100km",
        receipt: "Ricevuta",
        paymentMethod: "Pagamento",
        actions: "Azioni",
      },
      chart: {
        title: "Evoluzione consumo",
        consumption: "Consumo (L/100km)",
      },
      noData: "Nessun rifornimento registrato",
    },
    analytics: {
      title: "Analisi utilizzo",
      heatmap: {
        title: "Frequenza di utilizzo",
        days: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
        hours: "Ore",
      },
      topInstructors: {
        title: "Top istruttori",
        hours: "ore",
        lessons: "lezioni",
      },
      topStudents: {
        title: "Top allievi",
        lessons: "lezioni",
      },
      inactive: {
        title: "Giorni di inattività",
        days: "giorni",
        warning: "Veicolo sottoutilizzato",
        recommendation: "Considerare riduzione flotta o aumento marketing",
      },
      noData: "Dati insufficienti",
    },
    depreciation: {
      title: "Ammortamento",
      currentValue: "Valore stimato attuale",
      totalDepreciation: "Ammortamento totale",
      bookValue: "Valore contabile",
      chart: "Evoluzione del valore",
    },
    export: {
      title: "Fascicolo completo veicolo",
      description: "Genera PDF completo con tutte le informazioni",
      generate: "Genera PDF",
    },
  },
  en: {
    header: {
      title: "Vehicle details",
      edit: "Edit",
      planning: "Planning",
      maintenance: "Maintenance",
      deactivate: "Deactivate",
      delete: "Delete",
      export: "Export",
      status: {
        available: "Available",
        in_lesson: "In lesson",
        maintenance: "Maintenance",
        inactive: "Inactive",
      },
    },
    tabs: {
      informations: "Informations",
      history: "History",
      gps: "GPS",
      costs: "Costs",
      fuel: "Fuel",
      analytics: "Analytics",
      planning: "Planning",
      documents: "Documents",
    },
    planning: {
      title: "Vehicle planning",
      totalLessons: "Total lessons",
      scheduled: "Scheduled",
      conflicts: "Conflicts",
      today: "Today",
      allStatus: "All statuses",
      statusScheduled: "Scheduled",
      statusInProgress: "In progress",
      statusCompleted: "Completed",
      statusCancelled: "Cancelled",
      bookLesson: "Book lesson",
      conflict: "Conflict",
      conflictsDetected: "Conflicts detected",
      conflictsMessage:
        "Some lessons have time conflicts. Please resolve them.",
    },
    documents: {
      title: "Vehicle documents",
      totalDocs: "Total documents",
      valid: "Valid",
      expiringSoon: "Expiring soon",
      expired: "Expired",
      expirationAlert: "Expiration alert",
      expiredMessage:
        "Some documents are expired. Please renew them immediately.",
      expiringSoonMessage:
        "Some documents are expiring soon. Please renew them.",
      search: "Search documents...",
      upload: "Upload",
      preview: "Preview",
      download: "Download",
      delete: "Delete",
      uploaded: "Uploaded on",
      expires: "Expires on",
      statusValid: "Valid",
      statusExpiringSoon: "Expiring soon",
      statusExpired: "Expired",
      noDocuments: "No documents found",
      previewNotAvailable: "Preview not available",
    },
    history: {
      title: "Action history",
      filters: {
        date: "Date",
        user: "User",
        action: "Action type",
        search: "Search...",
        reset: "Reset",
      },
      actions: {
        status_change: "Status change",
        update: "Update",
        maintenance: "Maintenance",
        document: "Document",
        cost: "Cost",
        fuel: "Fuel",
        other: "Other",
      },
      templates: {
        status_change: "changed status from {old} to {new}",
        update: "updated {field} from {old} to {new}",
        maintenance: "added maintenance {type}",
        document: "uploaded {documentType}",
      },
      export: "Export CSV",
      noData: "No history available",
      viewDetails: "View JSON details",
    },
    gps: {
      title: "GPS Tracking",
      realtime: {
        title: "Real-time position",
        currentPosition: "Current position",
        lastUpdate: "Last update",
        inLesson: "In lesson with",
        notAvailable: "GPS not available",
      },
      trajectories: {
        title: "Historical routes",
        selectLesson: "Select lesson",
        stats: {
          distance: "Distance",
          duration: "Duration",
          avgSpeed: "Average speed",
          maxSpeed: "Max speed",
          zones: "Practiced zones",
          city: "City",
          highway: "Highway",
          rural: "Rural",
        },
        viewDetails: "View detailed route",
        noData: "No routes recorded",
      },
      settings: {
        title: "GPS Settings",
        enableRealtime: "Enable real-time tracking",
        autoRecord: "Auto-record routes",
        speedAlerts: "Speed limit alerts",
        speedThreshold: "Speed threshold (km/h)",
        privacy: "GPS data stored 90 days then deleted (GDPR)",
      },
      events: {
        start: "Start",
        stop: "Stop",
        speeding: "Speeding",
      },
    },
    costs: {
      title: "Cost management",
      period: "Period",
      stats: {
        total: "Total expenses",
        perKm: "Cost per km",
        perHour: "Cost per hour",
        roi: "ROI",
      },
      categories: {
        maintenance: "Maintenance",
        fuel: "Fuel",
        insurance: "Insurance",
        tax: "Tax",
        other: "Other",
      },
      table: {
        date: "Date",
        category: "Category",
        description: "Description",
        amount: "Amount",
        invoice: "Invoice",
        km: "Km",
        actions: "Actions",
      },
      add: "Add expense",
      edit: "Edit",
      delete: "Delete",
      export: "Cost report",
      charts: {
        cumulative: "Cumulative costs",
        distribution: "Distribution by category",
        monthly: "Monthly costs",
      },
      noData: "No expenses recorded",
    },
    fuel: {
      title: "Fuel tracking",
      quickAdd: {
        title: "Add refueling",
        date: "Date",
        km: "Mileage",
        liters: "Liters",
        amount: "Amount (CHF)",
        type: "Type",
        receipt: "Receipt",
        paymentMethod: "Payment method",
        save: "Save",
      },
      paymentMethods: {
        cash: "Cash",
        card: "Bank card",
        fuel_card: "Fuel card",
        invoice: "Invoice",
      },
      types: {
        gasoline: "Gasoline",
        diesel: "Diesel",
        electric: "Electric",
        hybrid: "Hybrid",
      },
      stats: {
        avgConsumption: "Average consumption",
        totalLiters: "Total liters",
        totalCost: "Total CHF",
        target: "Eco-driving target",
      },
      table: {
        date: "Date",
        km: "Km",
        liters: "Liters",
        amount: "CHF",
        consumption: "L/100km",
        receipt: "Receipt",
        paymentMethod: "Payment",
        actions: "Actions",
      },
      chart: {
        title: "Consumption evolution",
        consumption: "Consumption (L/100km)",
      },
      noData: "No refueling recorded",
    },
    analytics: {
      title: "Usage analytics",
      heatmap: {
        title: "Usage frequency",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        hours: "Hours",
      },
      topInstructors: {
        title: "Top instructors",
        hours: "hours",
        lessons: "lessons",
      },
      topStudents: {
        title: "Top students",
        lessons: "lessons",
      },
      inactive: {
        title: "Inactive days",
        days: "days",
        warning: "Vehicle underutilized",
        recommendation: "Consider fleet reduction or marketing increase",
      },
      noData: "Insufficient data",
    },
    depreciation: {
      title: "Depreciation",
      currentValue: "Current estimated value",
      totalDepreciation: "Total depreciation",
      bookValue: "Book value",
      chart: "Value evolution",
    },
    export: {
      title: "Complete vehicle file",
      description: "Generate comprehensive PDF with all information",
      generate: "Generate PDF",
    },
  },
};

export function getVehicleDetailI18n(
  locale: VehicleDetailLocale = "fr"
): VehicleDetailTranslations {
  return translations[locale] || translations.fr;
}
