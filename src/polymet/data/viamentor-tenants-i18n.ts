/**
 * VIAMENTOR Tenants i18n Translations
 *
 * Traductions multilingues pour la page de gestion des tenants
 * Langues supportées : FR, DE, IT, EN
 *
 * @module data/viamentor-tenants-i18n
 * @version 1.0.0
 */

export type SupportedLocale = "fr" | "de" | "it" | "en";

export interface TenantsTranslations {
  // Page Header
  pageTitle: string;
  pageDescription: string;
  createButton: string;
  breadcrumbHome: string;
  breadcrumbTenants: string;

  // Stats KPIs
  statsActive: string;
  statsTrial: string;
  statsSuspended: string;
  statsTotalMrr: string;

  // Filters
  searchPlaceholder: string;
  filterPlan: string;
  filterStatus: string;
  filterCanton: string;
  filterAllPlans: string;
  filterAllStatus: string;
  filterAllCantons: string;
  resetFilters: string;
  saveFilters: string;
  savedPresets: string;

  // Plans
  planFree: string;
  planPro: string;
  planEnterprise: string;

  // Status
  statusActive: string;
  statusTrial: string;
  statusSuspended: string;

  // View Toggle
  viewGrid: string;
  viewList: string;

  // Results
  resultsCount: string;
  resultsCountPlural: string;
  noResults: string;
  noResultsDescription: string;
  createFirstTenant: string;

  // Actions
  actionView: string;
  actionEdit: string;
  actionSettings: string;
  actionImpersonate: string;
  actionBilling: string;
  actionDelete: string;
  actionSuspend: string;
  actionActivate: string;
  actionChangePlan: string;
  actionSendEmail: string;
  actionExportCsv: string;
  actionCancel: string;

  // Bulk Actions
  bulkSelected: string;
  bulkMaxSelection: string;

  // Table Headers
  tableHeaderLogo: string;
  tableHeaderName: string;
  tableHeaderAddress: string;
  tableHeaderPlan: string;
  tableHeaderCreated: string;
  tableHeaderStudents: string;
  tableHeaderInstructors: string;
  tableHeaderMrr: string;
  tableHeaderStatus: string;
  tableHeaderLastActivity: string;
  tableHeaderActions: string;

  // Pagination
  paginationRowsPerPage: string;
  paginationTotal: string;
  paginationPage: string;
  paginationOf: string;

  // Dialog
  dialogSaveTitle: string;
  dialogSaveDescription: string;
  dialogPresetName: string;
  dialogSave: string;

  // Relative Time
  timeAgo: string;
  timeDaysAgo: (days: number) => string;
  timeMonthsAgo: (months: number) => string;
}

/**
 * Traductions françaises
 */
export const frTranslations: TenantsTranslations = {
  pageTitle: "Gestion auto-écoles",
  pageDescription: "Gérez les auto-écoles de la plateforme VIAMENTOR",
  createButton: "Créer auto-école",
  breadcrumbHome: "Accueil",
  breadcrumbTenants: "Gestion auto-écoles",

  statsActive: "Active",
  statsTrial: "Trial",
  statsSuspended: "Suspended",
  statsTotalMrr: "Total MRR",

  searchPlaceholder: "Rechercher par nom ou email...",
  filterPlan: "Plan",
  filterStatus: "Status",
  filterCanton: "Canton",
  filterAllPlans: "Tous les plans",
  filterAllStatus: "Tous les status",
  filterAllCantons: "Tous les cantons",
  resetFilters: "Reset filtres",
  saveFilters: "Sauvegarder",
  savedPresets: "Presets",

  planFree: "Free",
  planPro: "Pro",
  planEnterprise: "Enterprise",

  statusActive: "Active",
  statusTrial: "Trial",
  statusSuspended: "Suspended",

  viewGrid: "Grille",
  viewList: "Liste",

  resultsCount: "auto-école trouvée",
  resultsCountPlural: "auto-écoles trouvées",
  noResults: "Aucune auto-école trouvée",
  noResultsDescription:
    "Essayez de modifier vos filtres ou créez une nouvelle auto-école",
  createFirstTenant: "Créer première auto-école",

  actionView: "Voir",
  actionEdit: "Modifier",
  actionSettings: "Paramètres",
  actionImpersonate: "Impersonate",
  actionBilling: "Facturation",
  actionDelete: "Supprimer",
  actionSuspend: "Suspendre",
  actionActivate: "Activer",
  actionChangePlan: "Changer plan",
  actionSendEmail: "Envoyer email",
  actionExportCsv: "Exporter CSV",
  actionCancel: "Annuler",

  bulkSelected: "sélectionnés",
  bulkMaxSelection: "Maximum 10 sélections",

  tableHeaderLogo: "Logo",
  tableHeaderName: "Nom",
  tableHeaderAddress: "Adresse",
  tableHeaderPlan: "Plan",
  tableHeaderCreated: "Créé",
  tableHeaderStudents: "Students",
  tableHeaderInstructors: "Instructors",
  tableHeaderMrr: "MRR",
  tableHeaderStatus: "Status",
  tableHeaderLastActivity: "Dernière activité",
  tableHeaderActions: "Actions",

  paginationRowsPerPage: "Lignes par page:",
  paginationTotal: "tenants au total",
  paginationPage: "Page",
  paginationOf: "sur",

  dialogSaveTitle: "Sauvegarder les filtres",
  dialogSaveDescription: "Donnez un nom à cette configuration de filtres",
  dialogPresetName: "Nom du preset...",
  dialogSave: "Sauvegarder",

  timeAgo: "il y a",
  timeDaysAgo: (days) => `il y a ${days} jour${days > 1 ? "s" : ""}`,
  timeMonthsAgo: (months) => `il y a ${months} mois`,
};

/**
 * Traductions allemandes
 */
export const deTranslations: TenantsTranslations = {
  pageTitle: "Fahrschulverwaltung",
  pageDescription: "Verwalten Sie die Fahrschulen der VIAMENTOR-Plattform",
  createButton: "Fahrschule erstellen",
  breadcrumbHome: "Startseite",
  breadcrumbTenants: "Fahrschulverwaltung",

  statsActive: "Aktiv",
  statsTrial: "Testversion",
  statsSuspended: "Gesperrt",
  statsTotalMrr: "Gesamt-MRR",

  searchPlaceholder: "Nach Name oder E-Mail suchen...",
  filterPlan: "Plan",
  filterStatus: "Status",
  filterCanton: "Kanton",
  filterAllPlans: "Alle Pläne",
  filterAllStatus: "Alle Status",
  filterAllCantons: "Alle Kantone",
  resetFilters: "Filter zurücksetzen",
  saveFilters: "Speichern",
  savedPresets: "Voreinstellungen",

  planFree: "Kostenlos",
  planPro: "Pro",
  planEnterprise: "Enterprise",

  statusActive: "Aktiv",
  statusTrial: "Testversion",
  statusSuspended: "Gesperrt",

  viewGrid: "Raster",
  viewList: "Liste",

  resultsCount: "Fahrschule gefunden",
  resultsCountPlural: "Fahrschulen gefunden",
  noResults: "Keine Fahrschule gefunden",
  noResultsDescription:
    "Versuchen Sie, Ihre Filter zu ändern oder erstellen Sie eine neue Fahrschule",
  createFirstTenant: "Erste Fahrschule erstellen",

  actionView: "Ansehen",
  actionEdit: "Bearbeiten",
  actionSettings: "Einstellungen",
  actionImpersonate: "Verkörpern",
  actionBilling: "Abrechnung",
  actionDelete: "Löschen",
  actionSuspend: "Sperren",
  actionActivate: "Aktivieren",
  actionChangePlan: "Plan ändern",
  actionSendEmail: "E-Mail senden",
  actionExportCsv: "CSV exportieren",
  actionCancel: "Abbrechen",

  bulkSelected: "ausgewählt",
  bulkMaxSelection: "Maximal 10 Auswahlen",

  tableHeaderLogo: "Logo",
  tableHeaderName: "Name",
  tableHeaderAddress: "Adresse",
  tableHeaderPlan: "Plan",
  tableHeaderCreated: "Erstellt",
  tableHeaderStudents: "Schüler",
  tableHeaderInstructors: "Lehrer",
  tableHeaderMrr: "MRR",
  tableHeaderStatus: "Status",
  tableHeaderLastActivity: "Letzte Aktivität",
  tableHeaderActions: "Aktionen",

  paginationRowsPerPage: "Zeilen pro Seite:",
  paginationTotal: "Tenants insgesamt",
  paginationPage: "Seite",
  paginationOf: "von",

  dialogSaveTitle: "Filter speichern",
  dialogSaveDescription: "Geben Sie dieser Filterkonfiguration einen Namen",
  dialogPresetName: "Name der Voreinstellung...",
  dialogSave: "Speichern",

  timeAgo: "vor",
  timeDaysAgo: (days) => `vor ${days} Tag${days > 1 ? "en" : ""}`,
  timeMonthsAgo: (months) => `vor ${months} Monat${months > 1 ? "en" : ""}`,
};

/**
 * Traductions italiennes
 */
export const itTranslations: TenantsTranslations = {
  pageTitle: "Gestione autoscuole",
  pageDescription: "Gestisci le autoscuole della piattaforma VIAMENTOR",
  createButton: "Crea autoscuola",
  breadcrumbHome: "Home",
  breadcrumbTenants: "Gestione autoscuole",

  statsActive: "Attivo",
  statsTrial: "Prova",
  statsSuspended: "Sospeso",
  statsTotalMrr: "MRR totale",

  searchPlaceholder: "Cerca per nome o email...",
  filterPlan: "Piano",
  filterStatus: "Stato",
  filterCanton: "Cantone",
  filterAllPlans: "Tutti i piani",
  filterAllStatus: "Tutti gli stati",
  filterAllCantons: "Tutti i cantoni",
  resetFilters: "Ripristina filtri",
  saveFilters: "Salva",
  savedPresets: "Preset",

  planFree: "Gratuito",
  planPro: "Pro",
  planEnterprise: "Enterprise",

  statusActive: "Attivo",
  statusTrial: "Prova",
  statusSuspended: "Sospeso",

  viewGrid: "Griglia",
  viewList: "Lista",

  resultsCount: "autoscuola trovata",
  resultsCountPlural: "autoscuole trovate",
  noResults: "Nessuna autoscuola trovata",
  noResultsDescription:
    "Prova a modificare i filtri o crea una nuova autoscuola",
  createFirstTenant: "Crea prima autoscuola",

  actionView: "Visualizza",
  actionEdit: "Modifica",
  actionSettings: "Impostazioni",
  actionImpersonate: "Impersona",
  actionBilling: "Fatturazione",
  actionDelete: "Elimina",
  actionSuspend: "Sospendi",
  actionActivate: "Attiva",
  actionChangePlan: "Cambia piano",
  actionSendEmail: "Invia email",
  actionExportCsv: "Esporta CSV",
  actionCancel: "Annulla",

  bulkSelected: "selezionati",
  bulkMaxSelection: "Massimo 10 selezioni",

  tableHeaderLogo: "Logo",
  tableHeaderName: "Nome",
  tableHeaderAddress: "Indirizzo",
  tableHeaderPlan: "Piano",
  tableHeaderCreated: "Creato",
  tableHeaderStudents: "Studenti",
  tableHeaderInstructors: "Istruttori",
  tableHeaderMrr: "MRR",
  tableHeaderStatus: "Stato",
  tableHeaderLastActivity: "Ultima attività",
  tableHeaderActions: "Azioni",

  paginationRowsPerPage: "Righe per pagina:",
  paginationTotal: "tenant in totale",
  paginationPage: "Pagina",
  paginationOf: "di",

  dialogSaveTitle: "Salva filtri",
  dialogSaveDescription: "Dai un nome a questa configurazione di filtri",
  dialogPresetName: "Nome del preset...",
  dialogSave: "Salva",

  timeAgo: "fa",
  timeDaysAgo: (days) => `${days} giorno${days > 1 ? "i" : ""} fa`,
  timeMonthsAgo: (months) => `${months} mes${months > 1 ? "i" : "e"} fa`,
};

/**
 * Traductions anglaises
 */
export const enTranslations: TenantsTranslations = {
  pageTitle: "Driving Schools Management",
  pageDescription: "Manage driving schools on the VIAMENTOR platform",
  createButton: "Create driving school",
  breadcrumbHome: "Home",
  breadcrumbTenants: "Driving Schools Management",

  statsActive: "Active",
  statsTrial: "Trial",
  statsSuspended: "Suspended",
  statsTotalMrr: "Total MRR",

  searchPlaceholder: "Search by name or email...",
  filterPlan: "Plan",
  filterStatus: "Status",
  filterCanton: "Canton",
  filterAllPlans: "All plans",
  filterAllStatus: "All statuses",
  filterAllCantons: "All cantons",
  resetFilters: "Reset filters",
  saveFilters: "Save",
  savedPresets: "Presets",

  planFree: "Free",
  planPro: "Pro",
  planEnterprise: "Enterprise",

  statusActive: "Active",
  statusTrial: "Trial",
  statusSuspended: "Suspended",

  viewGrid: "Grid",
  viewList: "List",

  resultsCount: "driving school found",
  resultsCountPlural: "driving schools found",
  noResults: "No driving school found",
  noResultsDescription:
    "Try modifying your filters or create a new driving school",
  createFirstTenant: "Create first driving school",

  actionView: "View",
  actionEdit: "Edit",
  actionSettings: "Settings",
  actionImpersonate: "Impersonate",
  actionBilling: "Billing",
  actionDelete: "Delete",
  actionSuspend: "Suspend",
  actionActivate: "Activate",
  actionChangePlan: "Change plan",
  actionSendEmail: "Send email",
  actionExportCsv: "Export CSV",
  actionCancel: "Cancel",

  bulkSelected: "selected",
  bulkMaxSelection: "Maximum 10 selections",

  tableHeaderLogo: "Logo",
  tableHeaderName: "Name",
  tableHeaderAddress: "Address",
  tableHeaderPlan: "Plan",
  tableHeaderCreated: "Created",
  tableHeaderStudents: "Students",
  tableHeaderInstructors: "Instructors",
  tableHeaderMrr: "MRR",
  tableHeaderStatus: "Status",
  tableHeaderLastActivity: "Last Activity",
  tableHeaderActions: "Actions",

  paginationRowsPerPage: "Rows per page:",
  paginationTotal: "tenants total",
  paginationPage: "Page",
  paginationOf: "of",

  dialogSaveTitle: "Save filters",
  dialogSaveDescription: "Give this filter configuration a name",
  dialogPresetName: "Preset name...",
  dialogSave: "Save",

  timeAgo: "ago",
  timeDaysAgo: (days) => `${days} day${days > 1 ? "s" : ""} ago`,
  timeMonthsAgo: (months) => `${months} month${months > 1 ? "s" : ""} ago`,
};

/**
 * Map des traductions par locale
 */
export const TENANTS_TRANSLATIONS: Record<
  SupportedLocale,
  TenantsTranslations
> = {
  fr: frTranslations,
  de: deTranslations,
  it: itTranslations,
  en: enTranslations,
};

/**
 * Hook pour obtenir les traductions selon la locale
 */
export function getTenantsTranslations(
  locale: SupportedLocale = "fr"
): TenantsTranslations {
  return TENANTS_TRANSLATIONS[locale] || frTranslations;
}
