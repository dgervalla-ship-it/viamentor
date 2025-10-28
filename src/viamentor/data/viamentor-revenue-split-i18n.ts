/**
 * VIAMENTOR - Revenue Split i18n
 * Traductions FR/DE/IT/EN pour système reversements
 */

export type RevenueSplitLocale = "fr" | "de" | "it" | "en";

export interface RevenueSplitTranslations {
  // Navigation
  nav: {
    myRevenue: string;
    instructorRevenue: string;
    schoolRevenue: string;
  };

  // Stats Cards
  stats: {
    grossRevenue: string;
    grossRevenueDesc: string;
    schoolShare: string;
    schoolShareDesc: string;
    netToPay: string;
    netToPayDesc: string;
    paid: string;
    paidDesc: string;
    totalReversals: string;
    totalReversalsDesc: string;
    unpaid: string;
    unpaidDesc: string;
    instructorsRevenue: string;
    instructorsRevenueDesc: string;
  };

  // Payment Models
  paymentModels: {
    free: string;
    monthlyFlat: string;
    commission: string;
  };

  // Status Types
  statusTypes: {
    independentSolo: string;
    independentAttached: string;
    employee: string;
  };

  // Payment Status
  paymentStatus: {
    pending: string;
    paid: string;
    overdue: string;
    cancelled: string;
  };

  // Payment Methods
  paymentMethods: {
    bankTransfer: string;
    cash: string;
    compensation: string;
    card: string;
  };

  // Charts
  charts: {
    revenueEvolution: string;
    revenueEvolutionDesc: string;
    revenueBreakdown: string;
    revenueBreakdownDesc: string;
    grossRevenue: string;
    schoolShare: string;
    netInstructor: string;
    revenueByInstructor: string;
    revenueByInstructorDesc: string;
    paymentModelsComparison: string;
    paymentModelsComparisonDesc: string;
  };

  // Table Lessons
  tableLessons: {
    title: string;
    date: string;
    student: string;
    duration: string;
    totalPrice: string;
    model: string;
    schoolShare: string;
    netInstructor: string;
    status: string;
    actions: string;
    viewDetails: string;
    dispute: string;
    noLessons: string;
  };

  // Filters
  filters: {
    period: string;
    paymentStatus: string;
    allStatuses: string;
    sortBy: string;
    dateDesc: string;
    dateAsc: string;
    amountDesc: string;
    amountAsc: string;
  };

  // Monthly Fee
  monthlyFee: {
    title: string;
    currentMonth: string;
    month: string;
    amountDue: string;
    status: string;
    dueDate: string;
    payNow: string;
    history: string;
    paid: string;
    paymentDate: string;
    paymentMethod: string;
    exportCsv: string;
    unpaidAlert: string;
    overdueAlert: string;
  };

  // Instructors Table
  tableInstructors: {
    title: string;
    instructor: string;
    status: string;
    paymentModel: string;
    revenueGenerated: string;
    reversalDue: string;
    paid: string;
    balance: string;
    actions: string;
    viewDetails: string;
    payInstructor: string;
    sendReminder: string;
    noInstructors: string;
  };

  // Batch Payments
  batchPayments: {
    title: string;
    selectInstructors: string;
    paymentDate: string;
    paymentMethod: string;
    notes: string;
    notesPlaceholder: string;
    confirm: string;
    cancel: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
    selectAtLeastOne: string;
  };

  // Reminders
  reminders: {
    emailSubject: string;
    emailBody: string;
    escalationWarning: string;
    suspensionWarning: string;
  };

  // Accounting Export
  accountingExport: {
    title: string;
    period: string;
    format: string;
    excel: string;
    csv: string;
    pdf: string;
    includeAttachments: string;
    export: string;
    cancel: string;
    successTitle: string;
    successMessage: string;
  };

  // Months
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };

  // Common
  common: {
    loading: string;
    error: string;
    noData: string;
    total: string;
    yes: string;
    no: string;
    na: string;
    chf: string;
  };
}

export const revenueSplitTranslations: Record<
  RevenueSplitLocale,
  RevenueSplitTranslations
> = {
  fr: {
    nav: {
      myRevenue: "Mes revenus",
      instructorRevenue: "Revenus moniteurs",
      schoolRevenue: "Revenus école",
    },
    stats: {
      grossRevenue: "CA brut total",
      grossRevenueDesc: "Somme de toutes les leçons enseignées",
      schoolShare: "Reversements école",
      schoolShareDesc: "Total des commissions versées",
      netToPay: "Net à percevoir",
      netToPayDesc: "Solde en attente de paiement",
      paid: "Payé",
      paidDesc: "Montant déjà reçu",
      totalReversals: "Total reversements reçus",
      totalReversalsDesc: "Commissions + forfaits perçus",
      unpaid: "Impayés",
      unpaidDesc: "Montants en attente",
      instructorsRevenue: "CA moniteurs global",
      instructorsRevenueDesc: "Volume total d'activité",
    },
    paymentModels: {
      free: "Gratuit 0%",
      monthlyFlat: "Forfait mensuel",
      commission: "Commission",
    },
    statusTypes: {
      independentSolo: "Indépendant solo",
      independentAttached: "Indépendant rattaché",
      employee: "Employé salarié",
    },
    paymentStatus: {
      pending: "En attente",
      paid: "Payé",
      overdue: "En retard",
      cancelled: "Annulé",
    },
    paymentMethods: {
      bankTransfer: "Virement bancaire",
      cash: "Espèces",
      compensation: "Compensation",
      card: "Carte",
    },
    charts: {
      revenueEvolution: "Évolution CA/mois",
      revenueEvolutionDesc: "Tendance sur 12 mois",
      revenueBreakdown: "Répartition revenus",
      revenueBreakdownDesc: "CA brut / École / Net",
      grossRevenue: "CA brut",
      schoolShare: "Part école",
      netInstructor: "Net moniteur",
      revenueByInstructor: "Répartition par moniteur",
      revenueByInstructorDesc: "Top contributeurs",
      paymentModelsComparison: "Comparaison modèles",
      paymentModelsComparisonDesc: "Volumes par modèle",
    },
    tableLessons: {
      title: "Détail des leçons",
      date: "Date",
      student: "Élève",
      duration: "Durée",
      totalPrice: "Prix total",
      model: "Modèle",
      schoolShare: "Part école",
      netInstructor: "Net moniteur",
      status: "Statut",
      actions: "Actions",
      viewDetails: "Voir détail",
      dispute: "Contester",
      noLessons: "Aucune leçon trouvée",
    },
    filters: {
      period: "Période",
      paymentStatus: "Statut paiement",
      allStatuses: "Tous les statuts",
      sortBy: "Trier par",
      dateDesc: "Date (récent)",
      dateAsc: "Date (ancien)",
      amountDesc: "Montant (élevé)",
      amountAsc: "Montant (faible)",
    },
    monthlyFee: {
      title: "Forfait mensuel",
      currentMonth: "Mois en cours",
      month: "Mois",
      amountDue: "Montant dû",
      status: "Statut",
      dueDate: "Date d'échéance",
      payNow: "Payer maintenant",
      history: "Historique",
      paid: "Payé",
      paymentDate: "Date paiement",
      paymentMethod: "Méthode",
      exportCsv: "Exporter CSV",
      unpaidAlert: "Forfait impayé",
      overdueAlert: "Échéance dépassée",
    },
    tableInstructors: {
      title: "Moniteurs",
      instructor: "Moniteur",
      status: "Statut",
      paymentModel: "Modèle",
      revenueGenerated: "CA généré",
      reversalDue: "Reversement dû",
      paid: "Payé",
      balance: "Solde",
      actions: "Actions",
      viewDetails: "Voir détail",
      payInstructor: "Payer moniteur",
      sendReminder: "Relancer",
      noInstructors: "Aucun moniteur trouvé",
    },
    batchPayments: {
      title: "Payer moniteurs",
      selectInstructors: "Sélectionnez les moniteurs à payer",
      paymentDate: "Date de paiement",
      paymentMethod: "Méthode de paiement",
      notes: "Notes",
      notesPlaceholder: "Virement 15.01.2025 lot 3 moniteurs",
      confirm: "Confirmer paiements",
      cancel: "Annuler",
      successTitle: "Paiements effectués",
      successMessage: "{count} moniteurs payés - Total {amount}",
      errorTitle: "Erreur",
      errorMessage: "Impossible d'effectuer les paiements",
      selectAtLeastOne: "Sélectionnez au moins un moniteur",
    },
    reminders: {
      emailSubject: "Rappel forfait mensuel impayé",
      emailBody:
        "Votre forfait mensuel de {amount} est impayé. Échéance dépassée.",
      escalationWarning: "Après 15 jours, une lettre recommandée sera envoyée.",
      suspensionWarning:
        "Accès au système suspendu en cas de non-paiement persistant.",
    },
    accountingExport: {
      title: "Exporter comptabilité",
      period: "Période",
      format: "Format",
      excel: "Excel détaillé",
      csv: "CSV brut",
      pdf: "PDF résumé",
      includeAttachments: "Inclure pièces justificatives",
      export: "Exporter",
      cancel: "Annuler",
      successTitle: "Export réussi",
      successMessage: "Le fichier a été téléchargé",
    },
    months: {
      january: "Janvier",
      february: "Février",
      march: "Mars",
      april: "Avril",
      may: "Mai",
      june: "Juin",
      july: "Juillet",
      august: "Août",
      september: "Septembre",
      october: "Octobre",
      november: "Novembre",
      december: "Décembre",
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      noData: "Aucune donnée",
      total: "Total",
      yes: "Oui",
      no: "Non",
      na: "N/A",
      chf: "CHF",
    },
  },

  de: {
    nav: {
      myRevenue: "Meine Einnahmen",
      instructorRevenue: "Fahrlehrer-Einnahmen",
      schoolRevenue: "Schul-Einnahmen",
    },
    stats: {
      grossRevenue: "Bruttoumsatz gesamt",
      grossRevenueDesc: "Summe aller unterrichteten Lektionen",
      schoolShare: "Rückvergütungen Schule",
      schoolShareDesc: "Total gezahlte Provisionen",
      netToPay: "Netto zu erhalten",
      netToPayDesc: "Ausstehender Saldo",
      paid: "Bezahlt",
      paidDesc: "Bereits erhaltener Betrag",
      totalReversals: "Total erhaltene Rückvergütungen",
      totalReversalsDesc: "Provisionen + Pauschalen erhalten",
      unpaid: "Unbezahlt",
      unpaidDesc: "Ausstehende Beträge",
      instructorsRevenue: "Fahrlehrer-Umsatz global",
      instructorsRevenueDesc: "Gesamtes Aktivitätsvolumen",
    },
    paymentModels: {
      free: "Kostenlos 0%",
      monthlyFlat: "Monatliche Pauschale",
      commission: "Provision",
    },
    statusTypes: {
      independentSolo: "Selbständig solo",
      independentAttached: "Selbständig angeschlossen",
      employee: "Angestellter",
    },
    paymentStatus: {
      pending: "Ausstehend",
      paid: "Bezahlt",
      overdue: "Überfällig",
      cancelled: "Storniert",
    },
    paymentMethods: {
      bankTransfer: "Banküberweisung",
      cash: "Bargeld",
      compensation: "Verrechnung",
      card: "Karte",
    },
    charts: {
      revenueEvolution: "Umsatzentwicklung/Monat",
      revenueEvolutionDesc: "Trend über 12 Monate",
      revenueBreakdown: "Umsatzverteilung",
      revenueBreakdownDesc: "Brutto / Schule / Netto",
      grossRevenue: "Bruttoumsatz",
      schoolShare: "Schulanteil",
      netInstructor: "Netto Fahrlehrer",
      revenueByInstructor: "Verteilung nach Fahrlehrer",
      revenueByInstructorDesc: "Top-Beiträger",
      paymentModelsComparison: "Modellvergleich",
      paymentModelsComparisonDesc: "Volumen nach Modell",
    },
    tableLessons: {
      title: "Lektionsdetails",
      date: "Datum",
      student: "Schüler",
      duration: "Dauer",
      totalPrice: "Gesamtpreis",
      model: "Modell",
      schoolShare: "Schulanteil",
      netInstructor: "Netto Fahrlehrer",
      status: "Status",
      actions: "Aktionen",
      viewDetails: "Details anzeigen",
      dispute: "Anfechten",
      noLessons: "Keine Lektionen gefunden",
    },
    filters: {
      period: "Zeitraum",
      paymentStatus: "Zahlungsstatus",
      allStatuses: "Alle Status",
      sortBy: "Sortieren nach",
      dateDesc: "Datum (neueste)",
      dateAsc: "Datum (älteste)",
      amountDesc: "Betrag (hoch)",
      amountAsc: "Betrag (niedrig)",
    },
    monthlyFee: {
      title: "Monatliche Pauschale",
      currentMonth: "Aktueller Monat",
      month: "Monat",
      amountDue: "Fälliger Betrag",
      status: "Status",
      dueDate: "Fälligkeitsdatum",
      payNow: "Jetzt bezahlen",
      history: "Verlauf",
      paid: "Bezahlt",
      paymentDate: "Zahlungsdatum",
      paymentMethod: "Methode",
      exportCsv: "CSV exportieren",
      unpaidAlert: "Unbezahlte Pauschale",
      overdueAlert: "Fälligkeit überschritten",
    },
    tableInstructors: {
      title: "Fahrlehrer",
      instructor: "Fahrlehrer",
      status: "Status",
      paymentModel: "Modell",
      revenueGenerated: "Generierter Umsatz",
      reversalDue: "Fällige Rückvergütung",
      paid: "Bezahlt",
      balance: "Saldo",
      actions: "Aktionen",
      viewDetails: "Details anzeigen",
      payInstructor: "Fahrlehrer bezahlen",
      sendReminder: "Erinnern",
      noInstructors: "Keine Fahrlehrer gefunden",
    },
    batchPayments: {
      title: "Fahrlehrer bezahlen",
      selectInstructors: "Wählen Sie die zu bezahlenden Fahrlehrer",
      paymentDate: "Zahlungsdatum",
      paymentMethod: "Zahlungsmethode",
      notes: "Notizen",
      notesPlaceholder: "Überweisung 15.01.2025 Charge 3 Fahrlehrer",
      confirm: "Zahlungen bestätigen",
      cancel: "Abbrechen",
      successTitle: "Zahlungen durchgeführt",
      successMessage: "{count} Fahrlehrer bezahlt - Total {amount}",
      errorTitle: "Fehler",
      errorMessage: "Zahlungen konnten nicht durchgeführt werden",
      selectAtLeastOne: "Wählen Sie mindestens einen Fahrlehrer",
    },
    reminders: {
      emailSubject: "Erinnerung unbezahlte monatliche Pauschale",
      emailBody:
        "Ihre monatliche Pauschale von {amount} ist unbezahlt. Fälligkeit überschritten.",
      escalationWarning: "Nach 15 Tagen wird ein Einschreiben versendet.",
      suspensionWarning:
        "Systemzugang bei anhaltendem Zahlungsausfall gesperrt.",
    },
    accountingExport: {
      title: "Buchhaltung exportieren",
      period: "Zeitraum",
      format: "Format",
      excel: "Excel detailliert",
      csv: "CSV roh",
      pdf: "PDF Zusammenfassung",
      includeAttachments: "Belege einschließen",
      export: "Exportieren",
      cancel: "Abbrechen",
      successTitle: "Export erfolgreich",
      successMessage: "Die Datei wurde heruntergeladen",
    },
    months: {
      january: "Januar",
      february: "Februar",
      march: "März",
      april: "April",
      may: "Mai",
      june: "Juni",
      july: "Juli",
      august: "August",
      september: "September",
      october: "Oktober",
      november: "November",
      december: "Dezember",
    },
    common: {
      loading: "Laden...",
      error: "Fehler",
      noData: "Keine Daten",
      total: "Gesamt",
      yes: "Ja",
      no: "Nein",
      na: "N/V",
      chf: "CHF",
    },
  },

  it: {
    nav: {
      myRevenue: "I miei ricavi",
      instructorRevenue: "Ricavi istruttori",
      schoolRevenue: "Ricavi scuola",
    },
    stats: {
      grossRevenue: "Fatturato lordo totale",
      grossRevenueDesc: "Somma di tutte le lezioni insegnate",
      schoolShare: "Rimborsi scuola",
      schoolShareDesc: "Totale commissioni versate",
      netToPay: "Netto da ricevere",
      netToPayDesc: "Saldo in attesa di pagamento",
      paid: "Pagato",
      paidDesc: "Importo già ricevuto",
      totalReversals: "Totale rimborsi ricevuti",
      totalReversalsDesc: "Commissioni + forfait ricevuti",
      unpaid: "Non pagati",
      unpaidDesc: "Importi in attesa",
      instructorsRevenue: "Fatturato istruttori globale",
      instructorsRevenueDesc: "Volume totale di attività",
    },
    paymentModels: {
      free: "Gratuito 0%",
      monthlyFlat: "Forfait mensile",
      commission: "Commissione",
    },
    statusTypes: {
      independentSolo: "Indipendente solo",
      independentAttached: "Indipendente collegato",
      employee: "Dipendente",
    },
    paymentStatus: {
      pending: "In attesa",
      paid: "Pagato",
      overdue: "In ritardo",
      cancelled: "Annullato",
    },
    paymentMethods: {
      bankTransfer: "Bonifico bancario",
      cash: "Contanti",
      compensation: "Compensazione",
      card: "Carta",
    },
    charts: {
      revenueEvolution: "Evoluzione fatturato/mese",
      revenueEvolutionDesc: "Tendenza su 12 mesi",
      revenueBreakdown: "Ripartizione ricavi",
      revenueBreakdownDesc: "Lordo / Scuola / Netto",
      grossRevenue: "Fatturato lordo",
      schoolShare: "Quota scuola",
      netInstructor: "Netto istruttore",
      revenueByInstructor: "Ripartizione per istruttore",
      revenueByInstructorDesc: "Top contributori",
      paymentModelsComparison: "Confronto modelli",
      paymentModelsComparisonDesc: "Volumi per modello",
    },
    tableLessons: {
      title: "Dettaglio lezioni",
      date: "Data",
      student: "Allievo",
      duration: "Durata",
      totalPrice: "Prezzo totale",
      model: "Modello",
      schoolShare: "Quota scuola",
      netInstructor: "Netto istruttore",
      status: "Stato",
      actions: "Azioni",
      viewDetails: "Vedi dettaglio",
      dispute: "Contestare",
      noLessons: "Nessuna lezione trovata",
    },
    filters: {
      period: "Periodo",
      paymentStatus: "Stato pagamento",
      allStatuses: "Tutti gli stati",
      sortBy: "Ordina per",
      dateDesc: "Data (recente)",
      dateAsc: "Data (vecchia)",
      amountDesc: "Importo (alto)",
      amountAsc: "Importo (basso)",
    },
    monthlyFee: {
      title: "Forfait mensile",
      currentMonth: "Mese corrente",
      month: "Mese",
      amountDue: "Importo dovuto",
      status: "Stato",
      dueDate: "Data scadenza",
      payNow: "Paga ora",
      history: "Storico",
      paid: "Pagato",
      paymentDate: "Data pagamento",
      paymentMethod: "Metodo",
      exportCsv: "Esporta CSV",
      unpaidAlert: "Forfait non pagato",
      overdueAlert: "Scadenza superata",
    },
    tableInstructors: {
      title: "Istruttori",
      instructor: "Istruttore",
      status: "Stato",
      paymentModel: "Modello",
      revenueGenerated: "Fatturato generato",
      reversalDue: "Rimborso dovuto",
      paid: "Pagato",
      balance: "Saldo",
      actions: "Azioni",
      viewDetails: "Vedi dettaglio",
      payInstructor: "Paga istruttore",
      sendReminder: "Sollecitare",
      noInstructors: "Nessun istruttore trovato",
    },
    batchPayments: {
      title: "Paga istruttori",
      selectInstructors: "Seleziona gli istruttori da pagare",
      paymentDate: "Data pagamento",
      paymentMethod: "Metodo di pagamento",
      notes: "Note",
      notesPlaceholder: "Bonifico 15.01.2025 lotto 3 istruttori",
      confirm: "Conferma pagamenti",
      cancel: "Annulla",
      successTitle: "Pagamenti effettuati",
      successMessage: "{count} istruttori pagati - Totale {amount}",
      errorTitle: "Errore",
      errorMessage: "Impossibile effettuare i pagamenti",
      selectAtLeastOne: "Seleziona almeno un istruttore",
    },
    reminders: {
      emailSubject: "Promemoria forfait mensile non pagato",
      emailBody:
        "Il tuo forfait mensile di {amount} è non pagato. Scadenza superata.",
      escalationWarning: "Dopo 15 giorni, sarà inviata una raccomandata.",
      suspensionWarning:
        "Accesso al sistema sospeso in caso di mancato pagamento persistente.",
    },
    accountingExport: {
      title: "Esporta contabilità",
      period: "Periodo",
      format: "Formato",
      excel: "Excel dettagliato",
      csv: "CSV grezzo",
      pdf: "PDF riepilogo",
      includeAttachments: "Includi documenti giustificativi",
      export: "Esporta",
      cancel: "Annulla",
      successTitle: "Esportazione riuscita",
      successMessage: "Il file è stato scaricato",
    },
    months: {
      january: "Gennaio",
      february: "Febbraio",
      march: "Marzo",
      april: "Aprile",
      may: "Maggio",
      june: "Giugno",
      july: "Luglio",
      august: "Agosto",
      september: "Settembre",
      october: "Ottobre",
      november: "Novembre",
      december: "Dicembre",
    },
    common: {
      loading: "Caricamento...",
      error: "Errore",
      noData: "Nessun dato",
      total: "Totale",
      yes: "Sì",
      no: "No",
      na: "N/D",
      chf: "CHF",
    },
  },

  en: {
    nav: {
      myRevenue: "My Revenue",
      instructorRevenue: "Instructor Revenue",
      schoolRevenue: "School Revenue",
    },
    stats: {
      grossRevenue: "Total Gross Revenue",
      grossRevenueDesc: "Sum of all lessons taught",
      schoolShare: "School Reversals",
      schoolShareDesc: "Total commissions paid",
      netToPay: "Net to Receive",
      netToPayDesc: "Outstanding balance",
      paid: "Paid",
      paidDesc: "Amount already received",
      totalReversals: "Total Reversals Received",
      totalReversalsDesc: "Commissions + fees received",
      unpaid: "Unpaid",
      unpaidDesc: "Outstanding amounts",
      instructorsRevenue: "Global Instructors Revenue",
      instructorsRevenueDesc: "Total activity volume",
    },
    paymentModels: {
      free: "Free 0%",
      monthlyFlat: "Monthly Flat Fee",
      commission: "Commission",
    },
    statusTypes: {
      independentSolo: "Independent Solo",
      independentAttached: "Independent Attached",
      employee: "Employee",
    },
    paymentStatus: {
      pending: "Pending",
      paid: "Paid",
      overdue: "Overdue",
      cancelled: "Cancelled",
    },
    paymentMethods: {
      bankTransfer: "Bank Transfer",
      cash: "Cash",
      compensation: "Compensation",
      card: "Card",
    },
    charts: {
      revenueEvolution: "Revenue Evolution/Month",
      revenueEvolutionDesc: "12-month trend",
      revenueBreakdown: "Revenue Breakdown",
      revenueBreakdownDesc: "Gross / School / Net",
      grossRevenue: "Gross Revenue",
      schoolShare: "School Share",
      netInstructor: "Net Instructor",
      revenueByInstructor: "Distribution by Instructor",
      revenueByInstructorDesc: "Top Contributors",
      paymentModelsComparison: "Models Comparison",
      paymentModelsComparisonDesc: "Volumes by Model",
    },
    tableLessons: {
      title: "Lessons Details",
      date: "Date",
      student: "Student",
      duration: "Duration",
      totalPrice: "Total Price",
      model: "Model",
      schoolShare: "School Share",
      netInstructor: "Net Instructor",
      status: "Status",
      actions: "Actions",
      viewDetails: "View Details",
      dispute: "Dispute",
      noLessons: "No lessons found",
    },
    filters: {
      period: "Period",
      paymentStatus: "Payment Status",
      allStatuses: "All Statuses",
      sortBy: "Sort By",
      dateDesc: "Date (recent)",
      dateAsc: "Date (old)",
      amountDesc: "Amount (high)",
      amountAsc: "Amount (low)",
    },
    monthlyFee: {
      title: "Monthly Flat Fee",
      currentMonth: "Current Month",
      month: "Month",
      amountDue: "Amount Due",
      status: "Status",
      dueDate: "Due Date",
      payNow: "Pay Now",
      history: "History",
      paid: "Paid",
      paymentDate: "Payment Date",
      paymentMethod: "Method",
      exportCsv: "Export CSV",
      unpaidAlert: "Unpaid Fee",
      overdueAlert: "Deadline Exceeded",
    },
    tableInstructors: {
      title: "Instructors",
      instructor: "Instructor",
      status: "Status",
      paymentModel: "Model",
      revenueGenerated: "Revenue Generated",
      reversalDue: "Reversal Due",
      paid: "Paid",
      balance: "Balance",
      actions: "Actions",
      viewDetails: "View Details",
      payInstructor: "Pay Instructor",
      sendReminder: "Send Reminder",
      noInstructors: "No instructors found",
    },
    batchPayments: {
      title: "Pay Instructors",
      selectInstructors: "Select instructors to pay",
      paymentDate: "Payment Date",
      paymentMethod: "Payment Method",
      notes: "Notes",
      notesPlaceholder: "Transfer 15.01.2025 batch 3 instructors",
      confirm: "Confirm Payments",
      cancel: "Cancel",
      successTitle: "Payments Completed",
      successMessage: "{count} instructors paid - Total {amount}",
      errorTitle: "Error",
      errorMessage: "Unable to process payments",
      selectAtLeastOne: "Select at least one instructor",
    },
    reminders: {
      emailSubject: "Reminder Unpaid Monthly Fee",
      emailBody: "Your monthly fee of {amount} is unpaid. Deadline exceeded.",
      escalationWarning: "After 15 days, a registered letter will be sent.",
      suspensionWarning:
        "System access suspended in case of persistent non-payment.",
    },
    accountingExport: {
      title: "Export Accounting",
      period: "Period",
      format: "Format",
      excel: "Detailed Excel",
      csv: "Raw CSV",
      pdf: "Summary PDF",
      includeAttachments: "Include Supporting Documents",
      export: "Export",
      cancel: "Cancel",
      successTitle: "Export Successful",
      successMessage: "File has been downloaded",
    },
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      noData: "No Data",
      total: "Total",
      yes: "Yes",
      no: "No",
      na: "N/A",
      chf: "CHF",
    },
  },
};

/**
 * Hook pour accéder aux traductions
 */
export function useRevenueSplitTranslations(
  locale: RevenueSplitLocale = "fr"
): RevenueSplitTranslations {
  return revenueSplitTranslations[locale] || revenueSplitTranslations.fr;
}
