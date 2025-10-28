/**
 * i18n Translations - Revenue Analytics
 *
 * Traductions terminologie analytics revenus FR/DE/IT/EN
 * Termes financiers, charts, rapports
 */

export type AnalyticsLocale = "fr" | "de" | "it" | "en";

export interface AnalyticsTranslations {
  // Page title & navigation
  pageTitle: string;
  tabOverview: string;
  tabCohorts: string;
  tabForecasting: string;
  tabChurn: string;

  // Period selection
  periodLabel: string;
  thisMonth: string;
  thisQuarter: string;
  thisYear: string;
  allTime: string;
  customPeriod: string;

  // Actions
  exportReport: string;
  scheduleReport: string;
  generateReport: string;
  downloadPDF: string;
  downloadExcel: string;
  downloadCSV: string;

  // KPIs
  totalRevenue: string;
  averageMRR: string;
  growthRate: string;
  customerCount: string;
  arpu: string;
  arr: string;

  // Charts
  mrrByPlan: string;
  revenueSplit: string;
  churnRateTrend: string;
  retentionHeatmap: string;
  forecastChart: string;

  // Plans
  planFree: string;
  planPro: string;
  planEnterprise: string;

  // Cohorts
  cohort: string;
  cohortMonth: string;
  initialSize: string;
  currentActive: string;
  retentionRate: string;
  averageLTV: string;
  churnMonth: string;
  monthsSinceSignup: string;
  retainedUsers: string;

  // Forecasting
  forecastingTitle: string;
  forecastingIntro: string;
  historicalMRR: string;
  predictedMRR: string;
  confidenceInterval: string;
  predictedARR: string;
  expectedChurnRate: string;
  estimatedNewMRR: string;
  confidenceScore: string;
  includeSeasonality: string;
  growthRateAssumption: string;
  recalculateForecast: string;
  forecastDisclaimer: string;

  // Churn Analysis
  churnAnalysisTitle: string;
  churnAnalysisIntro: string;
  tenantsCanceled: string;
  planCanceled: string;
  canceledDate: string;
  activeDuration: string;
  totalRevenueContributed: string;
  cancellationReason: string;
  feedback: string;
  lostMRR: string;
  contactAttempted: string;
  winBackOffer: string;
  notes: string;
  totalChurned: string;
  churnRate: string;
  topReasons: string;

  // Churn Reasons
  reasonPriceTooHigh: string;
  reasonMissingFeatures: string;
  reasonMovedCompetitor: string;
  reasonOther: string;

  // Win-back Campaigns
  winBackCampaigns: string;
  campaignName: string;
  sentDate: string;
  targetCount: string;
  reactivatedCount: string;
  successRate: string;
  roi: string;
  newWinBackCampaign: string;

  // Financial Reports
  financialReports: string;
  reportTemplates: string;
  monthlyRevenue: string;
  bankReconciliation: string;
  agingReport: string;
  vatReport: string;
  estimatedTime: string;

  // Report Generation
  selectTemplate: string;
  configurePeriod: string;
  previewReport: string;
  includeCharts: string;
  includeTenantDetails: string;
  includeComparisons: string;
  selectFormat: string;
  selectLanguage: string;
  generatingReport: string;
  reportReady: string;

  // Scheduled Reports
  scheduledReports: string;
  reportType: string;
  recipients: string;
  frequency: string;
  nextRun: string;
  lastRun: string;
  status: string;
  active: string;
  paused: string;
  weekly: string;
  monthly: string;
  quarterly: string;

  // Historical Reports
  historicalReports: string;
  reportName: string;
  period: string;
  generatedBy: string;
  generatedDate: string;
  fileSize: string;
  download: string;
  email: string;
  delete: string;

  // Export Data
  exportAllData: string;
  selectEntities: string;
  subscriptions: string;
  invoices: string;
  payments: string;
  transactions: string;
  refunds: string;

  // Misc
  loading: string;
  noData: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  edit: string;
  view: string;
  send: string;
}

export const ANALYTICS_TRANSLATIONS: Record<
  AnalyticsLocale,
  AnalyticsTranslations
> = {
  fr: {
    pageTitle: "Analytics Revenus",
    tabOverview: "Vue d'ensemble",
    tabCohorts: "Cohortes",
    tabForecasting: "Prévisions",
    tabChurn: "Analyse Churn",

    periodLabel: "Période d'analyse",
    thisMonth: "Ce mois",
    thisQuarter: "Ce trimestre",
    thisYear: "Cette année",
    allTime: "Tout le temps",
    customPeriod: "Période personnalisée",

    exportReport: "Exporter rapport",
    scheduleReport: "Planifier rapport",
    generateReport: "Générer rapport",
    downloadPDF: "Télécharger PDF",
    downloadExcel: "Télécharger Excel",
    downloadCSV: "Télécharger CSV",

    totalRevenue: "Revenu Total",
    averageMRR: "MRR Moyen",
    growthRate: "Taux de Croissance",
    customerCount: "Nombre de Clients",
    arpu: "ARPU",
    arr: "ARR",

    mrrByPlan: "MRR par Plan",
    revenueSplit: "Répartition Revenus",
    churnRateTrend: "Évolution Taux de Churn",
    retentionHeatmap: "Carte de Rétention",
    forecastChart: "Graphique Prévisionnel",

    planFree: "Gratuit",
    planPro: "Pro",
    planEnterprise: "Enterprise",

    cohort: "Cohorte",
    cohortMonth: "Mois Cohorte",
    initialSize: "Taille Initiale",
    currentActive: "Actifs Actuels",
    retentionRate: "Taux de Rétention",
    averageLTV: "LTV Moyenne",
    churnMonth: "Mois de Churn",
    monthsSinceSignup: "Mois depuis inscription",
    retainedUsers: "Utilisateurs retenus",

    forecastingTitle: "Prévisions Revenus",
    forecastingIntro: "Prédictions revenus 12 mois futurs basées sur ML",
    historicalMRR: "MRR Historique",
    predictedMRR: "MRR Prédit",
    confidenceInterval: "Intervalle de Confiance",
    predictedARR: "ARR Prédit",
    expectedChurnRate: "Taux de Churn Attendu",
    estimatedNewMRR: "Nouveau MRR Estimé",
    confidenceScore: "Score de Confiance",
    includeSeasonality: "Inclure saisonnalité",
    growthRateAssumption: "Hypothèse taux de croissance",
    recalculateForecast: "Recalculer prévisions",
    forecastDisclaimer:
      "Prédictions basées sur régression linéaire historique. La précision peut varier selon événements externes.",

    churnAnalysisTitle: "Analyse Désabonnements",
    churnAnalysisIntro: "Analyse désabonnements 3 derniers mois",
    tenantsCanceled: "Tenants Annulés",
    planCanceled: "Plan Annulé",
    canceledDate: "Date d'Annulation",
    activeDuration: "Durée Active",
    totalRevenueContributed: "Revenu Total Contribué",
    cancellationReason: "Raison d'Annulation",
    feedback: "Commentaires",
    lostMRR: "MRR Perdu",
    contactAttempted: "Contact Tenté",
    winBackOffer: "Offre de Reconquête",
    notes: "Notes",
    totalChurned: "Total Churné",
    churnRate: "Taux de Churn",
    topReasons: "Principales Raisons",

    reasonPriceTooHigh: "Prix trop élevé",
    reasonMissingFeatures: "Fonctionnalités manquantes",
    reasonMovedCompetitor: "Migration concurrent",
    reasonOther: "Autre",

    winBackCampaigns: "Campagnes de Reconquête",
    campaignName: "Nom de Campagne",
    sentDate: "Date d'Envoi",
    targetCount: "Cibles",
    reactivatedCount: "Réactivés",
    successRate: "Taux de Succès",
    roi: "ROI",
    newWinBackCampaign: "Nouvelle Campagne",

    financialReports: "Rapports Financiers",
    reportTemplates: "Modèles de Rapports",
    monthlyRevenue: "Revenu Mensuel",
    bankReconciliation: "Rapprochement Bancaire",
    agingReport: "État des Créances",
    vatReport: "Rapport TVA",
    estimatedTime: "Temps Estimé",

    selectTemplate: "Sélectionner Modèle",
    configurePeriod: "Configurer Période",
    previewReport: "Prévisualiser Rapport",
    includeCharts: "Inclure graphiques",
    includeTenantDetails: "Inclure détails tenants",
    includeComparisons: "Inclure comparaisons",
    selectFormat: "Sélectionner Format",
    selectLanguage: "Sélectionner Langue",
    generatingReport: "Génération du rapport...",
    reportReady: "Rapport prêt",

    scheduledReports: "Rapports Planifiés",
    reportType: "Type de Rapport",
    recipients: "Destinataires",
    frequency: "Fréquence",
    nextRun: "Prochaine Exécution",
    lastRun: "Dernière Exécution",
    status: "Statut",
    active: "Actif",
    paused: "En Pause",
    weekly: "Hebdomadaire",
    monthly: "Mensuel",
    quarterly: "Trimestriel",

    historicalReports: "Historique Rapports",
    reportName: "Nom du Rapport",
    period: "Période",
    generatedBy: "Généré par",
    generatedDate: "Date de Génération",
    fileSize: "Taille Fichier",
    download: "Télécharger",
    email: "Envoyer par Email",
    delete: "Supprimer",

    exportAllData: "Exporter Toutes Données",
    selectEntities: "Sélectionner Entités",
    subscriptions: "Abonnements",
    invoices: "Factures",
    payments: "Paiements",
    transactions: "Transactions",
    refunds: "Remboursements",

    loading: "Chargement...",
    noData: "Aucune donnée",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    save: "Enregistrer",
    edit: "Modifier",
    view: "Voir",
    send: "Envoyer",
  },

  de: {
    pageTitle: "Umsatz-Analytics",
    tabOverview: "Übersicht",
    tabCohorts: "Kohorten",
    tabForecasting: "Prognose",
    tabChurn: "Abwanderungsanalyse",

    periodLabel: "Analysezeitraum",
    thisMonth: "Dieser Monat",
    thisQuarter: "Dieses Quartal",
    thisYear: "Dieses Jahr",
    allTime: "Gesamte Zeit",
    customPeriod: "Benutzerdefinierter Zeitraum",

    exportReport: "Bericht exportieren",
    scheduleReport: "Bericht planen",
    generateReport: "Bericht generieren",
    downloadPDF: "PDF herunterladen",
    downloadExcel: "Excel herunterladen",
    downloadCSV: "CSV herunterladen",

    totalRevenue: "Gesamtumsatz",
    averageMRR: "Durchschnittlicher MRR",
    growthRate: "Wachstumsrate",
    customerCount: "Kundenanzahl",
    arpu: "ARPU",
    arr: "ARR",

    mrrByPlan: "MRR nach Plan",
    revenueSplit: "Umsatzaufteilung",
    churnRateTrend: "Abwanderungsrate-Trend",
    retentionHeatmap: "Retention-Heatmap",
    forecastChart: "Prognosediagramm",

    planFree: "Kostenlos",
    planPro: "Pro",
    planEnterprise: "Enterprise",

    cohort: "Kohorte",
    cohortMonth: "Kohortenmonat",
    initialSize: "Anfangsgröße",
    currentActive: "Aktuell Aktiv",
    retentionRate: "Retention-Rate",
    averageLTV: "Durchschnittlicher LTV",
    churnMonth: "Abwanderungsmonat",
    monthsSinceSignup: "Monate seit Anmeldung",
    retainedUsers: "Behaltene Benutzer",

    forecastingTitle: "Umsatzprognose",
    forecastingIntro: "ML-basierte Umsatzprognosen für 12 zukünftige Monate",
    historicalMRR: "Historischer MRR",
    predictedMRR: "Prognostizierter MRR",
    confidenceInterval: "Konfidenzintervall",
    predictedARR: "Prognostizierter ARR",
    expectedChurnRate: "Erwartete Abwanderungsrate",
    estimatedNewMRR: "Geschätzter neuer MRR",
    confidenceScore: "Konfidenz-Score",
    includeSeasonality: "Saisonalität einbeziehen",
    growthRateAssumption: "Wachstumsraten-Annahme",
    recalculateForecast: "Prognose neu berechnen",
    forecastDisclaimer:
      "Prognosen basieren auf linearer Regression historischer Daten. Genauigkeit kann durch externe Ereignisse variieren.",

    churnAnalysisTitle: "Abwanderungsanalyse",
    churnAnalysisIntro: "Analyse der Kündigungen der letzten 3 Monate",
    tenantsCanceled: "Gekündigte Tenants",
    planCanceled: "Gekündigter Plan",
    canceledDate: "Kündigungsdatum",
    activeDuration: "Aktive Dauer",
    totalRevenueContributed: "Gesamtumsatzbeitrag",
    cancellationReason: "Kündigungsgrund",
    feedback: "Feedback",
    lostMRR: "Verlorener MRR",
    contactAttempted: "Kontakt versucht",
    winBackOffer: "Rückgewinnungsangebot",
    notes: "Notizen",
    totalChurned: "Gesamt Abgewandert",
    churnRate: "Abwanderungsrate",
    topReasons: "Hauptgründe",

    reasonPriceTooHigh: "Preis zu hoch",
    reasonMissingFeatures: "Fehlende Funktionen",
    reasonMovedCompetitor: "Zu Konkurrent gewechselt",
    reasonOther: "Andere",

    winBackCampaigns: "Rückgewinnungskampagnen",
    campaignName: "Kampagnenname",
    sentDate: "Sendedatum",
    targetCount: "Zielanzahl",
    reactivatedCount: "Reaktiviert",
    successRate: "Erfolgsrate",
    roi: "ROI",
    newWinBackCampaign: "Neue Kampagne",

    financialReports: "Finanzberichte",
    reportTemplates: "Berichtsvorlagen",
    monthlyRevenue: "Monatsumsatz",
    bankReconciliation: "Bankabstimmung",
    agingReport: "Forderungsbericht",
    vatReport: "MWST-Bericht",
    estimatedTime: "Geschätzte Zeit",

    selectTemplate: "Vorlage auswählen",
    configurePeriod: "Zeitraum konfigurieren",
    previewReport: "Bericht vorschauen",
    includeCharts: "Diagramme einbeziehen",
    includeTenantDetails: "Tenant-Details einbeziehen",
    includeComparisons: "Vergleiche einbeziehen",
    selectFormat: "Format auswählen",
    selectLanguage: "Sprache auswählen",
    generatingReport: "Bericht wird generiert...",
    reportReady: "Bericht bereit",

    scheduledReports: "Geplante Berichte",
    reportType: "Berichtstyp",
    recipients: "Empfänger",
    frequency: "Häufigkeit",
    nextRun: "Nächste Ausführung",
    lastRun: "Letzte Ausführung",
    status: "Status",
    active: "Aktiv",
    paused: "Pausiert",
    weekly: "Wöchentlich",
    monthly: "Monatlich",
    quarterly: "Vierteljährlich",

    historicalReports: "Berichtsverlauf",
    reportName: "Berichtsname",
    period: "Zeitraum",
    generatedBy: "Generiert von",
    generatedDate: "Generierungsdatum",
    fileSize: "Dateigröße",
    download: "Herunterladen",
    email: "Per E-Mail senden",
    delete: "Löschen",

    exportAllData: "Alle Daten exportieren",
    selectEntities: "Entitäten auswählen",
    subscriptions: "Abonnements",
    invoices: "Rechnungen",
    payments: "Zahlungen",
    transactions: "Transaktionen",
    refunds: "Rückerstattungen",

    loading: "Laden...",
    noData: "Keine Daten",
    error: "Fehler",
    success: "Erfolg",
    cancel: "Abbrechen",
    save: "Speichern",
    edit: "Bearbeiten",
    view: "Ansehen",
    send: "Senden",
  },

  it: {
    pageTitle: "Analytics Ricavi",
    tabOverview: "Panoramica",
    tabCohorts: "Coorti",
    tabForecasting: "Previsioni",
    tabChurn: "Analisi Abbandono",

    periodLabel: "Periodo di analisi",
    thisMonth: "Questo mese",
    thisQuarter: "Questo trimestre",
    thisYear: "Quest'anno",
    allTime: "Tutto il tempo",
    customPeriod: "Periodo personalizzato",

    exportReport: "Esporta report",
    scheduleReport: "Pianifica report",
    generateReport: "Genera report",
    downloadPDF: "Scarica PDF",
    downloadExcel: "Scarica Excel",
    downloadCSV: "Scarica CSV",

    totalRevenue: "Ricavo Totale",
    averageMRR: "MRR Medio",
    growthRate: "Tasso di Crescita",
    customerCount: "Numero Clienti",
    arpu: "ARPU",
    arr: "ARR",

    mrrByPlan: "MRR per Piano",
    revenueSplit: "Ripartizione Ricavi",
    churnRateTrend: "Trend Tasso Abbandono",
    retentionHeatmap: "Mappa Ritenzione",
    forecastChart: "Grafico Previsionale",

    planFree: "Gratuito",
    planPro: "Pro",
    planEnterprise: "Enterprise",

    cohort: "Coorte",
    cohortMonth: "Mese Coorte",
    initialSize: "Dimensione Iniziale",
    currentActive: "Attivi Attuali",
    retentionRate: "Tasso di Ritenzione",
    averageLTV: "LTV Medio",
    churnMonth: "Mese di Abbandono",
    monthsSinceSignup: "Mesi dall'iscrizione",
    retainedUsers: "Utenti mantenuti",

    forecastingTitle: "Previsioni Ricavi",
    forecastingIntro: "Previsioni ricavi 12 mesi futuri basate su ML",
    historicalMRR: "MRR Storico",
    predictedMRR: "MRR Previsto",
    confidenceInterval: "Intervallo di Confidenza",
    predictedARR: "ARR Previsto",
    expectedChurnRate: "Tasso Abbandono Atteso",
    estimatedNewMRR: "Nuovo MRR Stimato",
    confidenceScore: "Punteggio Confidenza",
    includeSeasonality: "Includi stagionalità",
    growthRateAssumption: "Ipotesi tasso crescita",
    recalculateForecast: "Ricalcola previsioni",
    forecastDisclaimer:
      "Previsioni basate su regressione lineare storica. La precisione può variare per eventi esterni.",

    churnAnalysisTitle: "Analisi Abbandoni",
    churnAnalysisIntro: "Analisi abbandoni ultimi 3 mesi",
    tenantsCanceled: "Tenant Cancellati",
    planCanceled: "Piano Cancellato",
    canceledDate: "Data Cancellazione",
    activeDuration: "Durata Attiva",
    totalRevenueContributed: "Ricavo Totale Contribuito",
    cancellationReason: "Motivo Cancellazione",
    feedback: "Feedback",
    lostMRR: "MRR Perso",
    contactAttempted: "Contatto Tentato",
    winBackOffer: "Offerta Riconquista",
    notes: "Note",
    totalChurned: "Totale Abbandonati",
    churnRate: "Tasso Abbandono",
    topReasons: "Motivi Principali",

    reasonPriceTooHigh: "Prezzo troppo alto",
    reasonMissingFeatures: "Funzionalità mancanti",
    reasonMovedCompetitor: "Passato a concorrente",
    reasonOther: "Altro",

    winBackCampaigns: "Campagne Riconquista",
    campaignName: "Nome Campagna",
    sentDate: "Data Invio",
    targetCount: "Obiettivi",
    reactivatedCount: "Riattivati",
    successRate: "Tasso Successo",
    roi: "ROI",
    newWinBackCampaign: "Nuova Campagna",

    financialReports: "Report Finanziari",
    reportTemplates: "Modelli Report",
    monthlyRevenue: "Ricavo Mensile",
    bankReconciliation: "Riconciliazione Bancaria",
    agingReport: "Stato Crediti",
    vatReport: "Report IVA",
    estimatedTime: "Tempo Stimato",

    selectTemplate: "Seleziona Modello",
    configurePeriod: "Configura Periodo",
    previewReport: "Anteprima Report",
    includeCharts: "Includi grafici",
    includeTenantDetails: "Includi dettagli tenant",
    includeComparisons: "Includi confronti",
    selectFormat: "Seleziona Formato",
    selectLanguage: "Seleziona Lingua",
    generatingReport: "Generazione report...",
    reportReady: "Report pronto",

    scheduledReports: "Report Pianificati",
    reportType: "Tipo Report",
    recipients: "Destinatari",
    frequency: "Frequenza",
    nextRun: "Prossima Esecuzione",
    lastRun: "Ultima Esecuzione",
    status: "Stato",
    active: "Attivo",
    paused: "In Pausa",
    weekly: "Settimanale",
    monthly: "Mensile",
    quarterly: "Trimestrale",

    historicalReports: "Storico Report",
    reportName: "Nome Report",
    period: "Periodo",
    generatedBy: "Generato da",
    generatedDate: "Data Generazione",
    fileSize: "Dimensione File",
    download: "Scarica",
    email: "Invia Email",
    delete: "Elimina",

    exportAllData: "Esporta Tutti Dati",
    selectEntities: "Seleziona Entità",
    subscriptions: "Abbonamenti",
    invoices: "Fatture",
    payments: "Pagamenti",
    transactions: "Transazioni",
    refunds: "Rimborsi",

    loading: "Caricamento...",
    noData: "Nessun dato",
    error: "Errore",
    success: "Successo",
    cancel: "Annulla",
    save: "Salva",
    edit: "Modifica",
    view: "Visualizza",
    send: "Invia",
  },

  en: {
    pageTitle: "Revenue Analytics",
    tabOverview: "Overview",
    tabCohorts: "Cohorts",
    tabForecasting: "Forecasting",
    tabChurn: "Churn Analysis",

    periodLabel: "Analysis Period",
    thisMonth: "This Month",
    thisQuarter: "This Quarter",
    thisYear: "This Year",
    allTime: "All Time",
    customPeriod: "Custom Period",

    exportReport: "Export Report",
    scheduleReport: "Schedule Report",
    generateReport: "Generate Report",
    downloadPDF: "Download PDF",
    downloadExcel: "Download Excel",
    downloadCSV: "Download CSV",

    totalRevenue: "Total Revenue",
    averageMRR: "Average MRR",
    growthRate: "Growth Rate",
    customerCount: "Customer Count",
    arpu: "ARPU",
    arr: "ARR",

    mrrByPlan: "MRR by Plan",
    revenueSplit: "Revenue Split",
    churnRateTrend: "Churn Rate Trend",
    retentionHeatmap: "Retention Heatmap",
    forecastChart: "Forecast Chart",

    planFree: "Free",
    planPro: "Pro",
    planEnterprise: "Enterprise",

    cohort: "Cohort",
    cohortMonth: "Cohort Month",
    initialSize: "Initial Size",
    currentActive: "Current Active",
    retentionRate: "Retention Rate",
    averageLTV: "Average LTV",
    churnMonth: "Churn Month",
    monthsSinceSignup: "Months Since Signup",
    retainedUsers: "Retained Users",

    forecastingTitle: "Revenue Forecasting",
    forecastingIntro: "ML-based revenue predictions for next 12 months",
    historicalMRR: "Historical MRR",
    predictedMRR: "Predicted MRR",
    confidenceInterval: "Confidence Interval",
    predictedARR: "Predicted ARR",
    expectedChurnRate: "Expected Churn Rate",
    estimatedNewMRR: "Estimated New MRR",
    confidenceScore: "Confidence Score",
    includeSeasonality: "Include Seasonality",
    growthRateAssumption: "Growth Rate Assumption",
    recalculateForecast: "Recalculate Forecast",
    forecastDisclaimer:
      "Predictions based on linear regression of historical data. Accuracy may vary due to external events.",

    churnAnalysisTitle: "Churn Analysis",
    churnAnalysisIntro: "Analysis of cancellations in last 3 months",
    tenantsCanceled: "Canceled Tenants",
    planCanceled: "Canceled Plan",
    canceledDate: "Canceled Date",
    activeDuration: "Active Duration",
    totalRevenueContributed: "Total Revenue Contributed",
    cancellationReason: "Cancellation Reason",
    feedback: "Feedback",
    lostMRR: "Lost MRR",
    contactAttempted: "Contact Attempted",
    winBackOffer: "Win-back Offer",
    notes: "Notes",
    totalChurned: "Total Churned",
    churnRate: "Churn Rate",
    topReasons: "Top Reasons",

    reasonPriceTooHigh: "Price too high",
    reasonMissingFeatures: "Missing features",
    reasonMovedCompetitor: "Moved to competitor",
    reasonOther: "Other",

    winBackCampaigns: "Win-back Campaigns",
    campaignName: "Campaign Name",
    sentDate: "Sent Date",
    targetCount: "Target Count",
    reactivatedCount: "Reactivated",
    successRate: "Success Rate",
    roi: "ROI",
    newWinBackCampaign: "New Campaign",

    financialReports: "Financial Reports",
    reportTemplates: "Report Templates",
    monthlyRevenue: "Monthly Revenue",
    bankReconciliation: "Bank Reconciliation",
    agingReport: "Aging Report",
    vatReport: "VAT Report",
    estimatedTime: "Estimated Time",

    selectTemplate: "Select Template",
    configurePeriod: "Configure Period",
    previewReport: "Preview Report",
    includeCharts: "Include Charts",
    includeTenantDetails: "Include Tenant Details",
    includeComparisons: "Include Comparisons",
    selectFormat: "Select Format",
    selectLanguage: "Select Language",
    generatingReport: "Generating report...",
    reportReady: "Report ready",

    scheduledReports: "Scheduled Reports",
    reportType: "Report Type",
    recipients: "Recipients",
    frequency: "Frequency",
    nextRun: "Next Run",
    lastRun: "Last Run",
    status: "Status",
    active: "Active",
    paused: "Paused",
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",

    historicalReports: "Historical Reports",
    reportName: "Report Name",
    period: "Period",
    generatedBy: "Generated By",
    generatedDate: "Generated Date",
    fileSize: "File Size",
    download: "Download",
    email: "Email",
    delete: "Delete",

    exportAllData: "Export All Data",
    selectEntities: "Select Entities",
    subscriptions: "Subscriptions",
    invoices: "Invoices",
    payments: "Payments",
    transactions: "Transactions",
    refunds: "Refunds",

    loading: "Loading...",
    noData: "No data",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    view: "View",
    send: "Send",
  },
};

export function useAnalyticsTranslations(
  locale: AnalyticsLocale = "fr"
): AnalyticsTranslations {
  return ANALYTICS_TRANSLATIONS[locale];
}

export function formatCurrency(
  value: number,
  locale: AnalyticsLocale = "fr"
): string {
  const localeMap: Record<AnalyticsLocale, string> = {
    fr: "fr-CH",
    de: "de-CH",
    it: "it-CH",
    en: "en-CH",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(
  value: number,
  locale: AnalyticsLocale = "fr"
): string {
  const localeMap: Record<AnalyticsLocale, string> = {
    fr: "fr-CH",
    de: "de-CH",
    it: "it-CH",
    en: "en-CH",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}
