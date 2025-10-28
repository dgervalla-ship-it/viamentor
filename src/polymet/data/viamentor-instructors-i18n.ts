/**
 * VIAMENTOR Instructors i18n
 *
 * Traductions FR/DE/IT/EN pour module gestion moniteurs
 */

export type InstructorsLocale = "fr" | "de" | "it" | "en";

export interface InstructorsTranslations {
  // Page title & breadcrumb
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbInstructors: string;

  // Stats Cards
  statsTotal: string;
  statsAvailable: string;
  statsInLesson: string;
  statsAbsent: string;

  // Actions
  newInstructor: string;
  searchPlaceholder: string;
  filtersButton: string;
  viewToggle: string;
  exportExcel: string;
  exportPDF: string;

  // Table columns
  colPhoto: string;
  colName: string;
  colCategories: string;
  colLessonsToday: string;
  colMonthStats: string;
  colOMCoStatus: string;
  colActions: string;

  // Month stats
  lessonsCount: string;
  totalHours: string;
  rating: string;

  // Status
  statusAvailable: string;
  statusInLesson: string;
  statusAbsent: string;
  statusOnBreak: string;

  // OMCo Status
  omcoConforme: string;
  omcoAttention: string;
  omcoNonConforme: string;

  // Filters
  filtersTitle: string;
  filterCategories: string;
  filterAvailability: string;
  filterAvailabilityAll: string;
  filterAvailabilityAvailable: string;
  filterAvailabilityInLesson: string;
  filterAvailabilityAbsent: string;
  filterOMCoStatus: string;
  filterTrainingDue: string;
  applyFilters: string;
  resetFilters: string;

  // Actions dropdown
  actionView: string;
  actionEdit: string;
  actionPlanning: string;
  actionSuspend: string;
  actionDelete: string;

  // Grid view
  activeStudents: string;
  joinedDate: string;

  // Pagination
  rowsPerPage: string;
  page: string;
  of: string;

  // Empty states
  noInstructors: string;
  noResults: string;
}

export const INSTRUCTORS_TRANSLATIONS: Record<
  InstructorsLocale,
  InstructorsTranslations
> = {
  fr: {
    pageTitle: "Moniteurs",
    breadcrumbHome: "Accueil",
    breadcrumbInstructors: "Moniteurs",

    statsTotal: "Total moniteurs",
    statsAvailable: "Disponibles aujourd'hui",
    statsInLesson: "En leçon",
    statsAbsent: "Absents",

    newInstructor: "Nouveau moniteur",
    searchPlaceholder: "Rechercher nom, email...",
    filtersButton: "Filtres",
    viewToggle: "Basculer la vue",
    exportExcel: "Exporter Excel",
    exportPDF: "Exporter PDF",

    colPhoto: "Photo",
    colName: "Nom complet",
    colCategories: "Habilitations",
    colLessonsToday: "Leçons aujourd'hui",
    colMonthStats: "Stats mois",
    colOMCoStatus: "Statut OMCo",
    colActions: "Actions",

    lessonsCount: "Leçons",
    totalHours: "Heures",
    rating: "Note",

    statusAvailable: "Disponible",
    statusInLesson: "En leçon",
    statusAbsent: "Absent",
    statusOnBreak: "En pause",

    omcoConforme: "Conforme",
    omcoAttention: "Attention",
    omcoNonConforme: "Non conforme",

    filtersTitle: "Filtres",
    filterCategories: "Habilitations",
    filterAvailability: "Disponibilité",
    filterAvailabilityAll: "Tous",
    filterAvailabilityAvailable: "Disponibles",
    filterAvailabilityInLesson: "En leçon",
    filterAvailabilityAbsent: "Absents",
    filterOMCoStatus: "Statut OMCo",
    filterTrainingDue: "Perfectionnement dû",
    applyFilters: "Appliquer",
    resetFilters: "Réinitialiser",

    actionView: "Voir la fiche",
    actionEdit: "Modifier",
    actionPlanning: "Planning",
    actionSuspend: "Suspendre",
    actionDelete: "Supprimer",

    activeStudents: "élèves actifs",
    joinedDate: "Membre depuis",

    rowsPerPage: "Lignes par page",
    page: "Page",
    of: "sur",

    noInstructors: "Aucun moniteur",
    noResults: "Aucun résultat trouvé",
  },

  de: {
    pageTitle: "Fahrlehrer",
    breadcrumbHome: "Startseite",
    breadcrumbInstructors: "Fahrlehrer",

    statsTotal: "Gesamt Fahrlehrer",
    statsAvailable: "Heute verfügbar",
    statsInLesson: "Im Unterricht",
    statsAbsent: "Abwesend",

    newInstructor: "Neuer Fahrlehrer",
    searchPlaceholder: "Name, E-Mail suchen...",
    filtersButton: "Filter",
    viewToggle: "Ansicht wechseln",
    exportExcel: "Excel exportieren",
    exportPDF: "PDF exportieren",

    colPhoto: "Foto",
    colName: "Vollständiger Name",
    colCategories: "Berechtigungen",
    colLessonsToday: "Lektionen heute",
    colMonthStats: "Monatsstatistik",
    colOMCoStatus: "OMCo-Status",
    colActions: "Aktionen",

    lessonsCount: "Lektionen",
    totalHours: "Stunden",
    rating: "Bewertung",

    statusAvailable: "Verfügbar",
    statusInLesson: "Im Unterricht",
    statusAbsent: "Abwesend",
    statusOnBreak: "Pause",

    omcoConforme: "Konform",
    omcoAttention: "Achtung",
    omcoNonConforme: "Nicht konform",

    filtersTitle: "Filter",
    filterCategories: "Berechtigungen",
    filterAvailability: "Verfügbarkeit",
    filterAvailabilityAll: "Alle",
    filterAvailabilityAvailable: "Verfügbar",
    filterAvailabilityInLesson: "Im Unterricht",
    filterAvailabilityAbsent: "Abwesend",
    filterOMCoStatus: "OMCo-Status",
    filterTrainingDue: "Weiterbildung fällig",
    applyFilters: "Anwenden",
    resetFilters: "Zurücksetzen",

    actionView: "Profil anzeigen",
    actionEdit: "Bearbeiten",
    actionPlanning: "Planung",
    actionSuspend: "Suspendieren",
    actionDelete: "Löschen",

    activeStudents: "aktive Schüler",
    joinedDate: "Mitglied seit",

    rowsPerPage: "Zeilen pro Seite",
    page: "Seite",
    of: "von",

    noInstructors: "Keine Fahrlehrer",
    noResults: "Keine Ergebnisse gefunden",
  },

  it: {
    pageTitle: "Istruttori",
    breadcrumbHome: "Home",
    breadcrumbInstructors: "Istruttori",

    statsTotal: "Totale istruttori",
    statsAvailable: "Disponibili oggi",
    statsInLesson: "In lezione",
    statsAbsent: "Assenti",

    newInstructor: "Nuovo istruttore",
    searchPlaceholder: "Cerca nome, email...",
    filtersButton: "Filtri",
    viewToggle: "Cambia vista",
    exportExcel: "Esporta Excel",
    exportPDF: "Esporta PDF",

    colPhoto: "Foto",
    colName: "Nome completo",
    colCategories: "Abilitazioni",
    colLessonsToday: "Lezioni oggi",
    colMonthStats: "Statistiche mese",
    colOMCoStatus: "Stato OMCo",
    colActions: "Azioni",

    lessonsCount: "Lezioni",
    totalHours: "Ore",
    rating: "Valutazione",

    statusAvailable: "Disponibile",
    statusInLesson: "In lezione",
    statusAbsent: "Assente",
    statusOnBreak: "In pausa",

    omcoConforme: "Conforme",
    omcoAttention: "Attenzione",
    omcoNonConforme: "Non conforme",

    filtersTitle: "Filtri",
    filterCategories: "Abilitazioni",
    filterAvailability: "Disponibilità",
    filterAvailabilityAll: "Tutti",
    filterAvailabilityAvailable: "Disponibili",
    filterAvailabilityInLesson: "In lezione",
    filterAvailabilityAbsent: "Assenti",
    filterOMCoStatus: "Stato OMCo",
    filterTrainingDue: "Formazione dovuta",
    applyFilters: "Applica",
    resetFilters: "Reimposta",

    actionView: "Visualizza profilo",
    actionEdit: "Modifica",
    actionPlanning: "Pianificazione",
    actionSuspend: "Sospendi",
    actionDelete: "Elimina",

    activeStudents: "studenti attivi",
    joinedDate: "Membro dal",

    rowsPerPage: "Righe per pagina",
    page: "Pagina",
    of: "di",

    noInstructors: "Nessun istruttore",
    noResults: "Nessun risultato trovato",
  },

  en: {
    pageTitle: "Instructors",
    breadcrumbHome: "Home",
    breadcrumbInstructors: "Instructors",

    statsTotal: "Total instructors",
    statsAvailable: "Available today",
    statsInLesson: "In lesson",
    statsAbsent: "Absent",

    newInstructor: "New instructor",
    searchPlaceholder: "Search name, email...",
    filtersButton: "Filters",
    viewToggle: "Toggle view",
    exportExcel: "Export Excel",
    exportPDF: "Export PDF",

    colPhoto: "Photo",
    colName: "Full name",
    colCategories: "Qualifications",
    colLessonsToday: "Lessons today",
    colMonthStats: "Month stats",
    colOMCoStatus: "OMCo status",
    colActions: "Actions",

    lessonsCount: "Lessons",
    totalHours: "Hours",
    rating: "Rating",

    statusAvailable: "Available",
    statusInLesson: "In lesson",
    statusAbsent: "Absent",
    statusOnBreak: "On break",

    omcoConforme: "Compliant",
    omcoAttention: "Warning",
    omcoNonConforme: "Non-compliant",

    filtersTitle: "Filters",
    filterCategories: "Qualifications",
    filterAvailability: "Availability",
    filterAvailabilityAll: "All",
    filterAvailabilityAvailable: "Available",
    filterAvailabilityInLesson: "In lesson",
    filterAvailabilityAbsent: "Absent",
    filterOMCoStatus: "OMCo status",
    filterTrainingDue: "Training due",
    applyFilters: "Apply",
    resetFilters: "Reset",

    actionView: "View profile",
    actionEdit: "Edit",
    actionPlanning: "Planning",
    actionSuspend: "Suspend",
    actionDelete: "Delete",

    activeStudents: "active students",
    joinedDate: "Member since",

    rowsPerPage: "Rows per page",
    page: "Page",
    of: "of",

    noInstructors: "No instructors",
    noResults: "No results found",
  },
};

export function useInstructorsTranslations(locale: InstructorsLocale = "fr") {
  return INSTRUCTORS_TRANSLATIONS[locale];
}
