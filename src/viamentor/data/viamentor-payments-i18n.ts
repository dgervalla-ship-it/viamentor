/**
 * VIAMENTOR - Payments i18n
 * Traductions pour module Payments
 */

export type PaymentsLocale = "fr" | "de" | "it" | "en";

export interface PaymentsTranslations {
  // Page titles
  pageTitle: string;
  breadcrumb: string;

  // Stats
  stats: {
    totalCollected: string;
    paymentsCount: string;
    pendingValidation: string;
    averageAmount: string;
  };

  // Actions
  actions: {
    newPayment: string;
    importCamt: string;
    export: string;
    exportExcel: string;
    exportCSV: string;
    exportPDF: string;
    viewDetail: string;
    edit: string;
    cancel: string;
    delete: string;
    downloadReceipt: string;
  };

  // Record Payment Modal
  recordPayment: {
    title: string;
    searchStudent: string;
    selectStudent: string;
    openInvoices: string;
    selectInvoices: string;
    totalSelected: string;
    amount: string;
    amountPlaceholder: string;
    amountExceedsError: string;
    allowPartial: string;
    date: string;
    time: string;
    method: string;
    selectMethod: string;
    reference: string;
    referencePlaceholder: string;
    receipt: string;
    uploadReceipt: string;
    notes: string;
    notesPlaceholder: string;
    createAccounting: string;
    accountingPreview: string;
    submit: string;
    submitting: string;
    successToast: string;
  };

  // Payment Methods
  methods: {
    cash: string;
    card: string;
    bank_transfer: string;
    twint: string;
    postfinance: string;
    other: string;
    otherPlaceholder: string;
  };

  // Payment Status
  status: {
    validated: string;
    pending: string;
    rejected: string;
  };

  // Table columns
  table: {
    dateTime: string;
    student: string;
    invoices: string;
    amount: string;
    method: string;
    reference: string;
    recordedBy: string;
    status: string;
    actions: string;
  };

  // Filters
  filters: {
    title: string;
    dateRange: string;
    student: string;
    methods: string;
    status: string;
    amountMin: string;
    amountMax: string;
    apply: string;
    reset: string;
  };

  // Import Camt Modal
  importCamt: {
    title: string;
    infoAlert: string;
    step1Title: string;
    step1Upload: string;
    step1Browse: string;
    step1Analyzing: string;
    step1InvalidXML: string;
    step2Title: string;
    step2Bank: string;
    step2IBAN: string;
    step2Period: string;
    step2Transactions: string;
    step2Credits: string;
    step2Debits: string;
    step2TotalCredits: string;
    step2Continue: string;
    step3Title: string;
    step3AllFilter: string;
    step3MatchedFilter: string;
    step3UnmatchedFilter: string;
    step3StatsAuto: string;
    step3StatsVerify: string;
    step3StatsUnmatched: string;
    step4Title: string;
    step4Summary: string;
    step4Processed: string;
    step4Created: string;
    step4Ignored: string;
    step4WarningUnmatched: string;
    step4AccountingAuto: string;
    step4Submit: string;
    step4Submitting: string;
    step4Progress: string;
    successToast: string;
  };

  // Matching Status
  matching: {
    auto_matched: string;
    to_verify: string;
    unmatched: string;
    confidence: string;
    assignManually: string;
    assign: string;
  };

  // Matching Table
  matchingTable: {
    date: string;
    debtor: string;
    amount: string;
    reference: string;
    status: string;
    invoice: string;
    actions: string;
  };

  // Unreconciled
  unreconciled: {
    title: string;
    description: string;
    source: string;
    associate: string;
    createInvoice: string;
    markVerified: string;
    reason: string;
    reasons: {
      no_invoice: string;
      amount_mismatch: string;
      student_unknown: string;
      manual_review: string;
    };
    lastReview: string;
    reviewNotes: string;
    noUnreconciled: string;
  };

  // Accounting Reports
  accounting: {
    title: string;
    description: string;
    journalTitle: string;
    journalDescription: string;
    vatTitle: string;
    vatDescription: string;
    period: string;
    selectPeriod: string;
    customDateRange: string;
    selectDateRange: string;
    exportJournal: string;
    exportVAT: string;
    generateReport: string;
    noJournalEntries: string;
    noVATData: string;
    periods?: {
      currentMonth: string;
      lastMonth: string;
      currentQuarter: string;
      lastQuarter: string;
      currentYear: string;
      lastYear: string;
      custom: string;
    };
    journalColumns: {
      date: string;
      payment: string;
      student: string;
      invoice: string;
      description: string;
      debit: string;
      credit: string;
      amount: string;
      vat: string;
    };
    vatSummary: {
      rate: string;
      netAmount: string;
      vatAmount: string;
      grossAmount: string;
      transactions: string;
    };
    totalRevenue: string;
    totalVAT: string;
    totalGross: string;
    accountLabels?: {
      [key: string]: string;
    };
  };

  // Notifications
  notifications: {
    title: string;
    description: string;
    templates: string;
    logs: string;
    templateName: string;
    type: string;
    enabled: string;
    trigger: string;
    recipients: string;
    subject: string;
    body: string;
    variables: string;
    lastSent: string;
    sentCount: string;
    actions: {
      edit: string;
      test: string;
      disable: string;
      enable: string;
      viewLogs: string;
    };
    types: {
      receipt: string;
      validation_alert: string;
      unreconciled_reminder: string;
    };
    logColumns: {
      date: string;
      type: string;
      recipient: string;
      subject: string;
      status: string;
      payment: string;
    };
    logStatus: {
      sent: string;
      failed: string;
      pending: string;
    };
    testSendSuccess: string;
    saveSuccess: string;
  };

  // Messages
  messages: {
    deleteConfirm: string;
    cancelConfirm: string;
    cancelReason: string;
    editOnlyRecent: string;
    cancelOnlyRecent: string;
    noOpenInvoices: string;
    selectAtLeastOne: string;
  };

  // Common
  common?: {
    cancel: string;
    validate: string;
  };
}

export const paymentsTranslations: Record<
  PaymentsLocale,
  PaymentsTranslations
> = {
  fr: {
    pageTitle: "Paiements",
    breadcrumb: "Facturation / Paiements",

    stats: {
      totalCollected: "Total encaissé ce mois",
      paymentsCount: "Paiements",
      pendingValidation: "En attente validation",
      averageAmount: "Montant moyen",
    },

    actions: {
      newPayment: "Nouveau paiement",
      importCamt: "Import Camt.054",
      export: "Exporter",
      exportExcel: "Excel",
      exportCSV: "CSV",
      exportPDF: "PDF",
      viewDetail: "Voir détail",
      edit: "Modifier",
      cancel: "Annuler",
      delete: "Supprimer",
      downloadReceipt: "Télécharger reçu",
    },

    recordPayment: {
      title: "Enregistrer paiement",
      searchStudent: "Rechercher élève",
      selectStudent: "Sélectionner un élève",
      openInvoices: "Factures ouvertes",
      selectInvoices: "Sélectionner facture(s)",
      totalSelected: "Total sélectionné",
      amount: "Montant du paiement",
      amountPlaceholder: "0.00",
      amountExceedsError: "Le montant dépasse le total des factures",
      allowPartial: "Autoriser paiement partiel",
      date: "Date du paiement",
      time: "Heure",
      method: "Méthode de paiement",
      selectMethod: "Sélectionner",
      reference: "Référence",
      referencePlaceholder: "Transaction ID, numéro...",
      receipt: "Justificatif",
      uploadReceipt: "Télécharger justificatif (PDF/Image, max 5MB)",
      notes: "Notes internes",
      notesPlaceholder: "Notes...",
      createAccounting: "Créer écriture comptable",
      accountingPreview: "Aperçu écriture",
      submit: "Enregistrer",
      submitting: "Enregistrement...",
      successToast: "Paiement {amount} CHF enregistré",
    },

    methods: {
      cash: "Espèces",
      card: "Carte bancaire",
      bank_transfer: "Virement bancaire",
      twint: "Twint",
      postfinance: "PostFinance",
      other: "Autre",
      otherPlaceholder: "Préciser...",
    },

    status: {
      validated: "Validé",
      pending: "En attente",
      rejected: "Rejeté",
    },

    table: {
      dateTime: "Date & Heure",
      student: "Élève",
      invoices: "Facture(s)",
      amount: "Montant",
      method: "Méthode",
      reference: "Référence",
      recordedBy: "Enregistré par",
      status: "Statut",
      actions: "Actions",
    },

    filters: {
      title: "Filtres",
      dateRange: "Période",
      student: "Élève",
      methods: "Méthodes",
      status: "Statut",
      amountMin: "Montant min",
      amountMax: "Montant max",
      apply: "Appliquer",
      reset: "Réinitialiser",
    },

    importCamt: {
      title: "Import relevé Camt.054",
      infoAlert:
        "Le format XML Camt.054 est le standard bancaire suisse qui automatise la réconciliation des paiements avec les factures via références QR/BVR.",
      step1Title: "Étape 1: Téléchargement",
      step1Upload: "Déposer fichier XML ici",
      step1Browse: "Parcourir",
      step1Analyzing: "Analyse du fichier...",
      step1InvalidXML: "Fichier XML invalide",
      step2Title: "Étape 2: Aperçu",
      step2Bank: "Banque",
      step2IBAN: "IBAN",
      step2Period: "Période",
      step2Transactions: "Transactions",
      step2Credits: "Crédits",
      step2Debits: "Débits",
      step2TotalCredits: "Total crédits",
      step2Continue: "Continuer",
      step3Title: "Étape 3: Réconciliation",
      step3AllFilter: "Tous",
      step3MatchedFilter: "Matchés",
      step3UnmatchedFilter: "Non matchés",
      step3StatsAuto: "auto-matchés",
      step3StatsVerify: "à vérifier",
      step3StatsUnmatched: "non matchés",
      step4Title: "Étape 4: Validation",
      step4Summary: "Résumé des actions",
      step4Processed: "paiements enregistrés et factures payées",
      step4Created: "paiements créés sans lien (à traiter manuellement)",
      step4Ignored: "transactions ignorées (débits/frais)",
      step4WarningUnmatched:
        "Certains paiements nécessitent une validation manuelle",
      step4AccountingAuto: "Créer écritures comptables automatiquement",
      step4Submit: "Importer et réconcilier",
      step4Submitting: "Import en cours...",
      step4Progress: "{current}/{total} transactions traitées",
      successToast:
        "Import terminé: {processed} traités, {paid} factures payées",
    },

    matching: {
      auto_matched: "Auto-matché",
      to_verify: "À vérifier",
      unmatched: "Non matché",
      confidence: "Confiance",
      assignManually: "Assigner manuellement",
      assign: "Assigner",
    },

    matchingTable: {
      date: "Date",
      debtor: "Débiteur",
      amount: "Montant",
      reference: "Référence",
      status: "Statut",
      invoice: "Facture",
      actions: "Actions",
    },

    unreconciled: {
      title: "Paiements non réconciliés",
      description:
        "Ces paiements n'ont pas pu être associés automatiquement à une facture",
      source: "Source",
      associate: "Associer à facture",
      createInvoice: "Créer facture rétroactive",
      markVerified: "Marquer vérifié",
      reason: "Raison",
      reasons: {
        no_invoice: "Aucune facture",
        amount_mismatch: "Montant différent",
        student_unknown: "Élève inconnu",
        manual_review: "Revue manuelle",
      },
      lastReview: "Dernière revue",
      reviewNotes: "Notes de revue",
      noUnreconciled: "Aucun paiement non réconcilié",
    },

    accounting: {
      title: "Rapports comptables",
      description: "Exports journal et rapports TVA",
      journalTitle: "Écritures comptables",
      journalDescription:
        "Export comptable de toutes les écritures avec détails",
      vatTitle: "Rapport TVA",
      vatDescription: "Ventilation TVA par taux avec totaux",
      period: "Période",
      selectPeriod: "Sélectionner période",
      customDateRange: "Plage de dates",
      selectDateRange: "Sélectionner une plage",
      exportJournal: "Exporter écritures",
      exportVAT: "Exporter déclaration TVA",
      generateReport: "Générer rapport",
      noJournalEntries: "Aucune écriture comptable pour cette période.",
      noVATData: "Aucune donnée TVA disponible pour cette période.",
      periods: {
        currentMonth: "Mois en cours",
        lastMonth: "Mois dernier",
        currentQuarter: "Trimestre en cours",
        lastQuarter: "Trimestre dernier",
        currentYear: "Année en cours",
        lastYear: "Année dernière",
        custom: "Période personnalisée",
      },
      journalColumns: {
        date: "Date",
        payment: "Paiement",
        student: "Élève",
        invoice: "Facture",
        description: "Description",
        debit: "Débit",
        credit: "Crédit",
        amount: "Montant",
        vat: "TVA",
      },
      vatSummary: {
        rate: "Taux",
        netAmount: "Montant net (HT)",
        vatAmount: "Montant TVA",
        grossAmount: "Montant TTC",
        transactions: "Transactions",
      },
      totalRevenue: "Revenu total (HT)",
      totalVAT: "TVA totale",
      totalGross: "Total TTC",
      accountLabels: {
        "1020": "Banque",
        "1000": "Caisse",
        "1100": "Clients",
        "3200": "Revenus formations",
        "2200": "TVA due",
      },
    },

    notifications: {
      title: "Notifications",
      description: "Configuration emails automatiques",
      templates: "Modèles d'emails",
      logs: "Historique envois",
      templateName: "Nom du modèle",
      type: "Type",
      enabled: "Activé",
      trigger: "Déclencheur",
      recipients: "Destinataires",
      subject: "Sujet",
      body: "Corps du message",
      variables: "Variables disponibles",
      lastSent: "Dernier envoi",
      sentCount: "Envois",
      actions: {
        edit: "Modifier",
        test: "Tester",
        disable: "Désactiver",
        enable: "Activer",
        viewLogs: "Voir historique",
      },
      types: {
        receipt: "Reçu de paiement",
        validation_alert: "Alerte validation",
        unreconciled_reminder: "Rappel non réconciliés",
      },
      logColumns: {
        date: "Date",
        type: "Type",
        recipient: "Destinataire",
        subject: "Sujet",
        status: "Statut",
        payment: "Paiement",
      },
      logStatus: {
        sent: "Envoyé",
        failed: "Échoué",
        pending: "En attente",
      },
      testSendSuccess: "Email de test envoyé",
      saveSuccess: "Modèle enregistré",
    },

    messages: {
      deleteConfirm: "Supprimer ce paiement ?",
      cancelConfirm: "Annuler ce paiement ?",
      cancelReason: "Raison de l'annulation",
      editOnlyRecent: "Modification possible uniquement dans les 48h",
      cancelOnlyRecent: "Annulation possible uniquement dans les 7 jours",
      noOpenInvoices: "Aucune facture ouverte",
      selectAtLeastOne: "Sélectionner au moins une facture",
    },

    common: {
      cancel: "Annuler",
      validate: "Valider",
    },
  },

  de: {
    pageTitle: "Zahlungen",
    breadcrumb: "Rechnungsstellung / Zahlungen",

    stats: {
      totalCollected: "Gesamteinnahmen diesen Monat",
      paymentsCount: "Zahlungen",
      pendingValidation: "Ausstehende Validierung",
      averageAmount: "Durchschnittsbetrag",
    },

    actions: {
      newPayment: "Neue Zahlung",
      importCamt: "Camt.054 Import",
      export: "Exportieren",
      exportExcel: "Excel",
      exportCSV: "CSV",
      exportPDF: "PDF",
      viewDetail: "Details anzeigen",
      edit: "Bearbeiten",
      cancel: "Stornieren",
      delete: "Löschen",
      downloadReceipt: "Quittung herunterladen",
    },

    recordPayment: {
      title: "Zahlung erfassen",
      searchStudent: "Schüler suchen",
      selectStudent: "Schüler auswählen",
      openInvoices: "Offene Rechnungen",
      selectInvoices: "Rechnung(en) auswählen",
      totalSelected: "Ausgewählte Summe",
      amount: "Zahlungsbetrag",
      amountPlaceholder: "0.00",
      amountExceedsError: "Betrag übersteigt Rechnungssumme",
      allowPartial: "Teilzahlung erlauben",
      date: "Zahlungsdatum",
      time: "Uhrzeit",
      method: "Zahlungsmethode",
      selectMethod: "Auswählen",
      reference: "Referenz",
      referencePlaceholder: "Transaktions-ID, Nummer...",
      receipt: "Beleg",
      uploadReceipt: "Beleg hochladen (PDF/Bild, max 5MB)",
      notes: "Interne Notizen",
      notesPlaceholder: "Notizen...",
      createAccounting: "Buchungssatz erstellen",
      accountingPreview: "Buchungsvorschau",
      submit: "Erfassen",
      submitting: "Erfassung läuft...",
      successToast: "Zahlung {amount} CHF erfasst",
    },

    methods: {
      cash: "Bargeld",
      card: "Karte",
      bank_transfer: "Banküberweisung",
      twint: "Twint",
      postfinance: "PostFinance",
      other: "Andere",
      otherPlaceholder: "Angeben...",
    },

    status: {
      validated: "Validiert",
      pending: "Ausstehend",
      rejected: "Abgelehnt",
    },

    table: {
      dateTime: "Datum & Zeit",
      student: "Schüler",
      invoices: "Rechnung(en)",
      amount: "Betrag",
      method: "Methode",
      reference: "Referenz",
      recordedBy: "Erfasst von",
      status: "Status",
      actions: "Aktionen",
    },

    filters: {
      title: "Filter",
      dateRange: "Zeitraum",
      student: "Schüler",
      methods: "Methoden",
      status: "Status",
      amountMin: "Mindestbetrag",
      amountMax: "Höchstbetrag",
      apply: "Anwenden",
      reset: "Zurücksetzen",
    },

    importCamt: {
      title: "Camt.054 Import",
      infoAlert:
        "Das XML-Format Camt.054 ist der Schweizer Bankstandard zur Automatisierung der Zahlungsabstimmung mit Rechnungen über QR/ESR-Referenzen.",
      step1Title: "Schritt 1: Upload",
      step1Upload: "XML-Datei hier ablegen",
      step1Browse: "Durchsuchen",
      step1Analyzing: "Datei wird analysiert...",
      step1InvalidXML: "Ungültige XML-Datei",
      step2Title: "Schritt 2: Vorschau",
      step2Bank: "Bank",
      step2IBAN: "IBAN",
      step2Period: "Zeitraum",
      step2Transactions: "Transaktionen",
      step2Credits: "Gutschriften",
      step2Debits: "Belastungen",
      step2TotalCredits: "Gesamtgutschriften",
      step2Continue: "Weiter",
      step3Title: "Schritt 3: Abstimmung",
      step3AllFilter: "Alle",
      step3MatchedFilter: "Zugeordnet",
      step3UnmatchedFilter: "Nicht zugeordnet",
      step3StatsAuto: "automatisch zugeordnet",
      step3StatsVerify: "zu prüfen",
      step3StatsUnmatched: "nicht zugeordnet",
      step4Title: "Schritt 4: Validierung",
      step4Summary: "Zusammenfassung",
      step4Processed: "Zahlungen erfasst und Rechnungen bezahlt",
      step4Created: "Zahlungen ohne Zuordnung erstellt (manuell bearbeiten)",
      step4Ignored: "Transaktionen ignoriert (Belastungen/Gebühren)",
      step4WarningUnmatched: "Einige Zahlungen erfordern manuelle Validierung",
      step4AccountingAuto: "Buchungssätze automatisch erstellen",
      step4Submit: "Importieren und abstimmen",
      step4Submitting: "Import läuft...",
      step4Progress: "{current}/{total} Transaktionen verarbeitet",
      successToast:
        "Import abgeschlossen: {processed} verarbeitet, {paid} Rechnungen bezahlt",
    },

    matching: {
      auto_matched: "Automatisch zugeordnet",
      to_verify: "Zu prüfen",
      unmatched: "Nicht zugeordnet",
      confidence: "Vertrauen",
      assignManually: "Manuell zuordnen",
      assign: "Zuordnen",
    },

    matchingTable: {
      date: "Datum",
      debtor: "Schuldner",
      amount: "Betrag",
      reference: "Referenz",
      status: "Status",
      invoice: "Rechnung",
      actions: "Aktionen",
    },

    unreconciled: {
      title: "Nicht abgestimmte Zahlungen",
      description:
        "Diese Zahlungen konnten nicht automatisch einer Rechnung zugeordnet werden",
      source: "Quelle",
      associate: "Mit Rechnung verknüpfen",
      createInvoice: "Rückwirkende Rechnung erstellen",
      markVerified: "Als geprüft markieren",
      reason: "Grund",
      reasons: {
        no_invoice: "Keine Rechnung",
        amount_mismatch: "Betrag unterschiedlich",
        student_unknown: "Schüler unbekannt",
        manual_review: "Manuelle Prüfung",
      },
      lastReview: "Letzte Prüfung",
      reviewNotes: "Prüfungsnotizen",
      noUnreconciled: "Keine nicht abgestimmten Zahlungen",
    },

    accounting: {
      title: "Buchhaltungsberichte",
      description: "Journal-Exporte und MwSt-Berichte",
      journalTitle: "Buchungssätze",
      journalDescription: "Buchhaltungsexport aller Buchungssätze mit Details",
      vatTitle: "MwSt-Bericht",
      vatDescription: "MwSt-Aufschlüsselung nach Sätzen mit Summen",
      period: "Zeitraum",
      selectPeriod: "Zeitraum auswählen",
      customDateRange: "Datumsbereich",
      selectDateRange: "Bereich auswählen",
      exportJournal: "Buchungssätze exportieren",
      exportVAT: "MwSt-Erklärung exportieren",
      generateReport: "Bericht erstellen",
      noJournalEntries: "Keine Buchungssätze für diesen Zeitraum.",
      noVATData: "Keine MwSt-Daten für diesen Zeitraum verfügbar.",
      periods: {
        currentMonth: "Aktueller Monat",
        lastMonth: "Letzter Monat",
        currentQuarter: "Aktuelles Quartal",
        lastQuarter: "Letztes Quartal",
        currentYear: "Aktuelles Jahr",
        lastYear: "Letztes Jahr",
        custom: "Benutzerdefinierter Zeitraum",
      },
      journalColumns: {
        date: "Datum",
        payment: "Zahlung",
        student: "Schüler",
        invoice: "Rechnung",
        description: "Beschreibung",
        debit: "Soll",
        credit: "Haben",
        amount: "Betrag",
        vat: "MwSt",
      },
      vatSummary: {
        rate: "Satz",
        netAmount: "Nettobetrag (exkl. MwSt)",
        vatAmount: "MwSt-Betrag",
        grossAmount: "Bruttobetrag (inkl. MwSt)",
        transactions: "Transaktionen",
      },
      totalRevenue: "Gesamtumsatz (exkl. MwSt)",
      totalVAT: "Gesamt-MwSt",
      totalGross: "Gesamtbrutto (inkl. MwSt)",
      accountLabels: {
        "1020": "Bank",
        "1000": "Kasse",
        "1100": "Debitoren",
        "3200": "Ausbildungserlöse",
        "2200": "Geschuldete MwSt",
      },
    },

    notifications: {
      title: "Benachrichtigungen",
      description: "Automatische E-Mail-Konfiguration",
      templates: "E-Mail-Vorlagen",
      logs: "Versandhistorie",
      templateName: "Vorlagenname",
      type: "Typ",
      enabled: "Aktiviert",
      trigger: "Auslöser",
      recipients: "Empfänger",
      subject: "Betreff",
      body: "Nachrichtentext",
      variables: "Verfügbare Variablen",
      lastSent: "Letzter Versand",
      sentCount: "Versendungen",
      actions: {
        edit: "Bearbeiten",
        test: "Testen",
        disable: "Deaktivieren",
        enable: "Aktivieren",
        viewLogs: "Historie anzeigen",
      },
      types: {
        receipt: "Zahlungsbeleg",
        validation_alert: "Validierungsalarm",
        unreconciled_reminder: "Erinnerung nicht abgestimmt",
      },
      logColumns: {
        date: "Datum",
        type: "Typ",
        recipient: "Empfänger",
        subject: "Betreff",
        status: "Status",
        payment: "Zahlung",
      },
      logStatus: {
        sent: "Gesendet",
        failed: "Fehlgeschlagen",
        pending: "Ausstehend",
      },
      testSendSuccess: "Test-E-Mail gesendet",
      saveSuccess: "Vorlage gespeichert",
    },

    messages: {
      deleteConfirm: "Diese Zahlung löschen?",
      cancelConfirm: "Diese Zahlung stornieren?",
      cancelReason: "Stornierungsgrund",
      editOnlyRecent: "Bearbeitung nur innerhalb von 48 Stunden möglich",
      cancelOnlyRecent: "Stornierung nur innerhalb von 7 Tagen möglich",
      noOpenInvoices: "Keine offenen Rechnungen",
      selectAtLeastOne: "Mindestens eine Rechnung auswählen",
    },

    common: {
      cancel: "Abbrechen",
      validate: "Bestätigen",
    },
  },

  it: {
    pageTitle: "Pagamenti",
    breadcrumb: "Fatturazione / Pagamenti",

    stats: {
      totalCollected: "Totale incassato questo mese",
      paymentsCount: "Pagamenti",
      pendingValidation: "In attesa di convalida",
      averageAmount: "Importo medio",
    },

    actions: {
      newPayment: "Nuovo pagamento",
      importCamt: "Import Camt.054",
      export: "Esporta",
      exportExcel: "Excel",
      exportCSV: "CSV",
      exportPDF: "PDF",
      viewDetail: "Vedi dettaglio",
      edit: "Modifica",
      cancel: "Annulla",
      delete: "Elimina",
      downloadReceipt: "Scarica ricevuta",
    },

    recordPayment: {
      title: "Registra pagamento",
      searchStudent: "Cerca allievo",
      selectStudent: "Seleziona allievo",
      openInvoices: "Fatture aperte",
      selectInvoices: "Seleziona fattura/e",
      totalSelected: "Totale selezionato",
      amount: "Importo pagamento",
      amountPlaceholder: "0.00",
      amountExceedsError: "L'importo supera il totale delle fatture",
      allowPartial: "Consenti pagamento parziale",
      date: "Data pagamento",
      time: "Ora",
      method: "Metodo di pagamento",
      selectMethod: "Seleziona",
      reference: "Riferimento",
      referencePlaceholder: "ID transazione, numero...",
      receipt: "Giustificativo",
      uploadReceipt: "Carica giustificativo (PDF/Immagine, max 5MB)",
      notes: "Note interne",
      notesPlaceholder: "Note...",
      createAccounting: "Crea registrazione contabile",
      accountingPreview: "Anteprima registrazione",
      submit: "Registra",
      submitting: "Registrazione...",
      successToast: "Pagamento {amount} CHF registrato",
    },

    methods: {
      cash: "Contanti",
      card: "Carta",
      bank_transfer: "Bonifico bancario",
      twint: "Twint",
      postfinance: "PostFinance",
      other: "Altro",
      otherPlaceholder: "Specificare...",
    },

    status: {
      validated: "Convalidato",
      pending: "In attesa",
      rejected: "Rifiutato",
    },

    table: {
      dateTime: "Data & Ora",
      student: "Allievo",
      invoices: "Fattura/e",
      amount: "Importo",
      method: "Metodo",
      reference: "Riferimento",
      recordedBy: "Registrato da",
      status: "Stato",
      actions: "Azioni",
    },

    filters: {
      title: "Filtri",
      dateRange: "Periodo",
      student: "Allievo",
      methods: "Metodi",
      status: "Stato",
      amountMin: "Importo min",
      amountMax: "Importo max",
      apply: "Applica",
      reset: "Reimposta",
    },

    importCamt: {
      title: "Import estratto Camt.054",
      infoAlert:
        "Il formato XML Camt.054 è lo standard bancario svizzero che automatizza la riconciliazione dei pagamenti con le fatture tramite riferimenti QR/BVR.",
      step1Title: "Passo 1: Caricamento",
      step1Upload: "Trascina file XML qui",
      step1Browse: "Sfoglia",
      step1Analyzing: "Analisi file...",
      step1InvalidXML: "File XML non valido",
      step2Title: "Passo 2: Anteprima",
      step2Bank: "Banca",
      step2IBAN: "IBAN",
      step2Period: "Periodo",
      step2Transactions: "Transazioni",
      step2Credits: "Accrediti",
      step2Debits: "Addebiti",
      step2TotalCredits: "Totale accrediti",
      step2Continue: "Continua",
      step3Title: "Passo 3: Riconciliazione",
      step3AllFilter: "Tutti",
      step3MatchedFilter: "Abbinati",
      step3UnmatchedFilter: "Non abbinati",
      step3StatsAuto: "abbinati automaticamente",
      step3StatsVerify: "da verificare",
      step3StatsUnmatched: "non abbinati",
      step4Title: "Passo 4: Convalida",
      step4Summary: "Riepilogo azioni",
      step4Processed: "pagamenti registrati e fatture pagate",
      step4Created:
        "pagamenti creati senza collegamento (da trattare manualmente)",
      step4Ignored: "transazioni ignorate (addebiti/commissioni)",
      step4WarningUnmatched: "Alcuni pagamenti richiedono convalida manuale",
      step4AccountingAuto: "Crea registrazioni contabili automaticamente",
      step4Submit: "Importa e riconcilia",
      step4Submitting: "Import in corso...",
      step4Progress: "{current}/{total} transazioni elaborate",
      successToast:
        "Import completato: {processed} elaborati, {paid} fatture pagate",
    },

    matching: {
      auto_matched: "Abbinato automaticamente",
      to_verify: "Da verificare",
      unmatched: "Non abbinato",
      confidence: "Confidenza",
      assignManually: "Assegna manualmente",
      assign: "Assegna",
    },

    matchingTable: {
      date: "Data",
      debtor: "Debitore",
      amount: "Importo",
      reference: "Riferimento",
      status: "Stato",
      invoice: "Fattura",
      actions: "Azioni",
    },

    unreconciled: {
      title: "Pagamenti non riconciliati",
      description:
        "Questi pagamenti non sono stati associati automaticamente a una fattura",
      source: "Fonte",
      associate: "Associa a fattura",
      createInvoice: "Crea fattura retroattiva",
      markVerified: "Segna verificato",
      reason: "Motivo",
      reasons: {
        no_invoice: "Nessuna fattura",
        amount_mismatch: "Importo diverso",
        student_unknown: "Allievo sconosciuto",
        manual_review: "Revisione manuale",
      },
      lastReview: "Ultima revisione",
      reviewNotes: "Note di revisione",
      noUnreconciled: "Nessun pagamento non riconciliato",
    },

    accounting: {
      title: "Rapporti contabili",
      description: "Export giornale e rapporti IVA",
      journalTitle: "Registrazioni contabili",
      journalDescription:
        "Export contabile di tutte le registrazioni con dettagli",
      vatTitle: "Rapporto IVA",
      vatDescription: "Ripartizione IVA per aliquota con totali",
      period: "Periodo",
      selectPeriod: "Seleziona periodo",
      customDateRange: "Intervallo date",
      selectDateRange: "Seleziona intervallo",
      exportJournal: "Esporta registrazioni",
      exportVAT: "Esporta dichiarazione IVA",
      generateReport: "Genera rapporto",
      noJournalEntries: "Nessuna registrazione contabile per questo periodo.",
      noVATData: "Nessun dato IVA disponibile per questo periodo.",
      periods: {
        currentMonth: "Mese corrente",
        lastMonth: "Mese scorso",
        currentQuarter: "Trimestre corrente",
        lastQuarter: "Trimestre scorso",
        currentYear: "Anno corrente",
        lastYear: "Anno scorso",
        custom: "Periodo personalizzato",
      },
      journalColumns: {
        date: "Data",
        payment: "Pagamento",
        student: "Allievo",
        invoice: "Fattura",
        description: "Descrizione",
        debit: "Dare",
        credit: "Avere",
        amount: "Importo",
        vat: "IVA",
      },
      vatSummary: {
        rate: "Aliquota",
        netAmount: "Importo netto (IVA esclusa)",
        vatAmount: "Importo IVA",
        grossAmount: "Importo lordo (IVA inclusa)",
        transactions: "Transazioni",
      },
      totalRevenue: "Ricavo totale (IVA esclusa)",
      totalVAT: "IVA totale",
      totalGross: "Totale lordo (IVA inclusa)",
      accountLabels: {
        "1020": "Banca",
        "1000": "Cassa",
        "1100": "Clienti",
        "3200": "Ricavi formazione",
        "2200": "IVA dovuta",
      },
    },

    notifications: {
      title: "Notifiche",
      description: "Configurazione email automatiche",
      templates: "Modelli email",
      logs: "Storico invii",
      templateName: "Nome modello",
      type: "Tipo",
      enabled: "Attivo",
      trigger: "Trigger",
      recipients: "Destinatari",
      subject: "Oggetto",
      body: "Corpo del messaggio",
      variables: "Variabili disponibili",
      lastSent: "Ultimo invio",
      sentCount: "Invii",
      actions: {
        edit: "Modifica",
        test: "Testa",
        disable: "Disattiva",
        enable: "Attiva",
        viewLogs: "Vedi storico",
      },
      types: {
        receipt: "Ricevuta pagamento",
        validation_alert: "Avviso convalida",
        unreconciled_reminder: "Promemoria non riconciliati",
      },
      logColumns: {
        date: "Data",
        type: "Tipo",
        recipient: "Destinatario",
        subject: "Oggetto",
        status: "Stato",
        payment: "Pagamento",
      },
      logStatus: {
        sent: "Inviato",
        failed: "Fallito",
        pending: "In attesa",
      },
      testSendSuccess: "Email di test inviata",
      saveSuccess: "Modello salvato",
    },

    messages: {
      deleteConfirm: "Eliminare questo pagamento?",
      cancelConfirm: "Annullare questo pagamento?",
      cancelReason: "Motivo dell'annullamento",
      editOnlyRecent: "Modifica possibile solo entro 48 ore",
      cancelOnlyRecent: "Annullamento possibile solo entro 7 giorni",
      noOpenInvoices: "Nessuna fattura aperta",
      selectAtLeastOne: "Selezionare almeno una fattura",
    },

    common: {
      cancel: "Annulla",
      validate: "Conferma",
    },
  },

  en: {
    pageTitle: "Payments",
    breadcrumb: "Billing / Payments",

    stats: {
      totalCollected: "Total collected this month",
      paymentsCount: "Payments",
      pendingValidation: "Pending validation",
      averageAmount: "Average amount",
    },

    actions: {
      newPayment: "New payment",
      importCamt: "Import Camt.054",
      export: "Export",
      exportExcel: "Excel",
      exportCSV: "CSV",
      exportPDF: "PDF",
      viewDetail: "View detail",
      edit: "Edit",
      cancel: "Cancel",
      delete: "Delete",
      downloadReceipt: "Download receipt",
    },

    recordPayment: {
      title: "Record payment",
      searchStudent: "Search student",
      selectStudent: "Select student",
      openInvoices: "Open invoices",
      selectInvoices: "Select invoice(s)",
      totalSelected: "Total selected",
      amount: "Payment amount",
      amountPlaceholder: "0.00",
      amountExceedsError: "Amount exceeds invoice total",
      allowPartial: "Allow partial payment",
      date: "Payment date",
      time: "Time",
      method: "Payment method",
      selectMethod: "Select",
      reference: "Reference",
      referencePlaceholder: "Transaction ID, number...",
      receipt: "Receipt",
      uploadReceipt: "Upload receipt (PDF/Image, max 5MB)",
      notes: "Internal notes",
      notesPlaceholder: "Notes...",
      createAccounting: "Create accounting entry",
      accountingPreview: "Entry preview",
      submit: "Record",
      submitting: "Recording...",
      successToast: "Payment {amount} CHF recorded",
    },

    methods: {
      cash: "Cash",
      card: "Card",
      bank_transfer: "Bank transfer",
      twint: "Twint",
      postfinance: "PostFinance",
      other: "Other",
      otherPlaceholder: "Specify...",
    },

    status: {
      validated: "Validated",
      pending: "Pending",
      rejected: "Rejected",
    },

    table: {
      dateTime: "Date & Time",
      student: "Student",
      invoices: "Invoice(s)",
      amount: "Amount",
      method: "Method",
      reference: "Reference",
      recordedBy: "Recorded by",
      status: "Status",
      actions: "Actions",
    },

    filters: {
      title: "Filters",
      dateRange: "Date range",
      student: "Student",
      methods: "Methods",
      status: "Status",
      amountMin: "Min amount",
      amountMax: "Max amount",
      apply: "Apply",
      reset: "Reset",
    },

    importCamt: {
      title: "Import Camt.054 statement",
      infoAlert:
        "The Camt.054 XML format is the Swiss banking standard that automates payment reconciliation with invoices via QR/BVR references.",
      step1Title: "Step 1: Upload",
      step1Upload: "Drop XML file here",
      step1Browse: "Browse",
      step1Analyzing: "Analyzing file...",
      step1InvalidXML: "Invalid XML file",
      step2Title: "Step 2: Preview",
      step2Bank: "Bank",
      step2IBAN: "IBAN",
      step2Period: "Period",
      step2Transactions: "Transactions",
      step2Credits: "Credits",
      step2Debits: "Debits",
      step2TotalCredits: "Total credits",
      step2Continue: "Continue",
      step3Title: "Step 3: Reconciliation",
      step3AllFilter: "All",
      step3MatchedFilter: "Matched",
      step3UnmatchedFilter: "Unmatched",
      step3StatsAuto: "auto-matched",
      step3StatsVerify: "to verify",
      step3StatsUnmatched: "unmatched",
      step4Title: "Step 4: Validation",
      step4Summary: "Actions summary",
      step4Processed: "payments recorded and invoices paid",
      step4Created: "payments created without link (process manually)",
      step4Ignored: "transactions ignored (debits/fees)",
      step4WarningUnmatched: "Some payments require manual validation",
      step4AccountingAuto: "Create accounting entries automatically",
      step4Submit: "Import and reconcile",
      step4Submitting: "Importing...",
      step4Progress: "{current}/{total} transactions processed",
      successToast:
        "Import completed: {processed} processed, {paid} invoices paid",
    },

    matching: {
      auto_matched: "Auto-matched",
      to_verify: "To verify",
      unmatched: "Unmatched",
      confidence: "Confidence",
      assignManually: "Assign manually",
      assign: "Assign",
    },

    matchingTable: {
      date: "Date",
      debtor: "Debtor",
      amount: "Amount",
      reference: "Reference",
      status: "Status",
      invoice: "Invoice",
      actions: "Actions",
    },

    unreconciled: {
      title: "Unreconciled payments",
      description:
        "These payments could not be automatically associated with an invoice",
      source: "Source",
      associate: "Associate with invoice",
      createInvoice: "Create retroactive invoice",
      markVerified: "Mark verified",
      reason: "Reason",
      reasons: {
        no_invoice: "No invoice",
        amount_mismatch: "Amount mismatch",
        student_unknown: "Student unknown",
        manual_review: "Manual review",
      },
      lastReview: "Last review",
      reviewNotes: "Review notes",
      noUnreconciled: "No unreconciled payments",
    },

    accounting: {
      title: "Accounting reports",
      description: "Journal exports and VAT reports",
      journalTitle: "Accounting entries",
      journalDescription: "Accounting export of all entries with details",
      vatTitle: "VAT report",
      vatDescription: "VAT breakdown by rate with totals",
      period: "Period",
      selectPeriod: "Select period",
      customDateRange: "Date range",
      selectDateRange: "Select range",
      exportJournal: "Export entries",
      exportVAT: "Export VAT declaration",
      generateReport: "Generate report",
      noJournalEntries: "No accounting entries for this period.",
      noVATData: "No VAT data available for this period.",
      periods: {
        currentMonth: "Current month",
        lastMonth: "Last month",
        currentQuarter: "Current quarter",
        lastQuarter: "Last quarter",
        currentYear: "Current year",
        lastYear: "Last year",
        custom: "Custom period",
      },
      journalColumns: {
        date: "Date",
        payment: "Payment",
        student: "Student",
        invoice: "Invoice",
        description: "Description",
        debit: "Debit",
        credit: "Credit",
        amount: "Amount",
        vat: "VAT",
      },
      vatSummary: {
        rate: "Rate",
        netAmount: "Net amount (excl. VAT)",
        vatAmount: "VAT amount",
        grossAmount: "Gross amount (incl. VAT)",
        transactions: "Transactions",
      },
      totalRevenue: "Total revenue (excl. VAT)",
      totalVAT: "Total VAT",
      totalGross: "Total gross (incl. VAT)",
      accountLabels: {
        "1020": "Bank",
        "1000": "Cash",
        "1100": "Accounts receivable",
        "3200": "Training revenue",
        "2200": "VAT payable",
      },
    },

    notifications: {
      title: "Notifications",
      description: "Automatic email configuration",
      templates: "Email templates",
      logs: "Sending history",
      templateName: "Template name",
      type: "Type",
      enabled: "Enabled",
      trigger: "Trigger",
      recipients: "Recipients",
      subject: "Subject",
      body: "Message body",
      variables: "Available variables",
      lastSent: "Last sent",
      sentCount: "Sent count",
      actions: {
        edit: "Edit",
        test: "Test",
        disable: "Disable",
        enable: "Enable",
        viewLogs: "View history",
      },
      types: {
        receipt: "Payment receipt",
        validation_alert: "Validation alert",
        unreconciled_reminder: "Unreconciled reminder",
      },
      logColumns: {
        date: "Date",
        type: "Type",
        recipient: "Recipient",
        subject: "Subject",
        status: "Status",
        payment: "Payment",
      },
      logStatus: {
        sent: "Sent",
        failed: "Failed",
        pending: "Pending",
      },
      testSendSuccess: "Test email sent",
      saveSuccess: "Template saved",
    },

    messages: {
      deleteConfirm: "Delete this payment?",
      cancelConfirm: "Cancel this payment?",
      cancelReason: "Cancellation reason",
      editOnlyRecent: "Edit only possible within 48 hours",
      cancelOnlyRecent: "Cancellation only possible within 7 days",
      noOpenInvoices: "No open invoices",
      selectAtLeastOne: "Select at least one invoice",
    },

    common: {
      cancel: "Cancel",
      validate: "Validate",
    },
  },
};

export function getPaymentsTranslations(
  locale: PaymentsLocale = "fr"
): PaymentsTranslations {
  return paymentsTranslations[locale] || paymentsTranslations.fr;
}
