/**
 * VIAMENTOR Students i18n
 * Traductions FR/DE/IT/EN pour module gestion élèves
 */

export type StudentsLocale = "fr" | "de" | "it" | "en";

export interface StudentsTranslations {
  // Page title & breadcrumb
  pageTitle: string;
  breadcrumb: string;

  // Stats cards
  totalStudents: string;
  activeStudents: string;
  inTraining: string;
  upcomingExams: string;
  nextExam: string;

  // Actions header
  newStudent: string;
  searchPlaceholder: string;
  advancedFilters: string;
  toggleView: string;
  export: string;
  exportExcel: string;
  exportCSV: string;
  exportPDF: string;

  // Table columns
  photo: string;
  fullName: string;
  contact: string;
  categories: string;
  progression: string;
  assignedInstructor: string;
  nextLesson: string;
  remainingLessons: string;
  financialBalance: string;
  status: string;
  actions: string;

  // Statuses
  statusActive: string;
  statusInactive: string;
  statusPaused: string;
  statusCompleted: string;
  statusAbandoned: string;
  statusSuspended: string;

  // Categories
  categoryB: string;
  categoryA: string;
  categoryBE: string;
  categoryA1: string;
  categoryBPT: string;

  // Filters
  filterEnrollmentDate: string;
  filterCategories: string;
  filterInstructor: string;
  filterStatuses: string;
  filterProgression: string;
  filterNegativeBalance: string;
  filterPermitExpired: string;
  filterUpcomingExams: string;
  filterAgeRange: string;
  filterGender: string;
  allInstructors: string;
  unassigned: string;
  applyFilters: string;
  resetFilters: string;
  saveFilter: string;
  savedFilters: string;

  // Bulk actions
  selectedStudents: string;
  assignInstructor: string;
  sendEmail: string;
  changeStatus: string;
  exportSelection: string;
  printConvocations: string;
  deleteSelected: string;

  // Actions dropdown
  viewProfile: string;
  edit: string;
  bookLesson: string;
  invoice: string;
  documents: string;
  delete: string;

  // Dialogs
  confirmChangeStatus: string;
  confirmDelete: string;
  confirmBulkDelete: string;
  deleteWarning: string;
  typeDeleteConfirm: string;
  reason: string;
  reasonRequired: string;
  iUnderstand: string;

  // Messages
  assignSuccess: string;
  emailSent: string;
  statusChanged: string;
  exportReady: string;
  deleteSuccess: string;
  noStudentsFound: string;
  createFirstStudent: string;

  // Relative dates
  today: string;
  tomorrow: string;

  // Gender
  male: string;
  female: string;
  other: string;
  all: string;

  // Export options
  exportOptions: string;
  selectColumns: string;
  includeArchived: string;
  generateExport: string;
}

export const STUDENTS_TRANSLATIONS: Record<
  StudentsLocale,
  StudentsTranslations
> = {
  fr: {
    pageTitle: "Gestion des Élèves",
    breadcrumb: "Élèves",
    totalStudents: "Total élèves",
    activeStudents: "Élèves actifs",
    inTraining: "En formation",
    upcomingExams: "Examens prévus",
    nextExam: "Prochain examen",
    newStudent: "Nouvel élève",
    searchPlaceholder: "Rechercher nom, email, téléphone...",
    advancedFilters: "Filtres avancés",
    toggleView: "Changer vue",
    export: "Exporter",
    exportExcel: "Exporter Excel",
    exportCSV: "Exporter CSV",
    exportPDF: "Exporter PDF",
    photo: "Photo",
    fullName: "Nom complet",
    contact: "Contact",
    categories: "Catégorie(s)",
    progression: "Progression",
    assignedInstructor: "Moniteur assigné",
    nextLesson: "Prochaine leçon",
    remainingLessons: "Leçons restantes",
    financialBalance: "Solde financier",
    status: "Statut",
    actions: "Actions",
    statusActive: "Actif",
    statusInactive: "Inactif",
    statusPaused: "En pause",
    statusCompleted: "Terminé",
    statusAbandoned: "Abandonné",
    statusSuspended: "Suspendu",
    categoryB: "Catégorie B",
    categoryA: "Catégorie A",
    categoryBE: "Catégorie BE",
    categoryA1: "Catégorie A1",
    categoryBPT: "Catégorie BPT",
    filterEnrollmentDate: "Date d'inscription",
    filterCategories: "Catégories",
    filterInstructor: "Moniteur",
    filterStatuses: "Statuts",
    filterProgression: "Progression",
    filterNegativeBalance: "Solde négatif seulement",
    filterPermitExpired: "Permis expiré",
    filterUpcomingExams: "Examens < 30j",
    filterAgeRange: "Tranche d'âge",
    filterGender: "Genre",
    allInstructors: "Tous les moniteurs",
    unassigned: "Non assignés",
    applyFilters: "Appliquer",
    resetFilters: "Réinitialiser",
    saveFilter: "Sauvegarder filtre",
    savedFilters: "Filtres sauvegardés",
    selectedStudents: "élèves sélectionnés",
    assignInstructor: "Assigner moniteur",
    sendEmail: "Envoyer email",
    changeStatus: "Changer statut",
    exportSelection: "Exporter sélection",
    printConvocations: "Imprimer convocations",
    deleteSelected: "Supprimer",
    viewProfile: "Voir fiche",
    edit: "Modifier",
    bookLesson: "Réserver leçon",
    invoice: "Facturer",
    documents: "Documents",
    delete: "Supprimer",
    confirmChangeStatus: "Changer le statut de l'élève",
    confirmDelete: "Supprimer l'élève",
    confirmBulkDelete: "Supprimer les élèves sélectionnés",
    deleteWarning:
      "Action IRRÉVERSIBLE. Toutes les données (leçons, factures, documents) seront supprimées.",
    typeDeleteConfirm: "Tapez DELETE pour confirmer",
    reason: "Raison",
    reasonRequired: "Raison requise",
    iUnderstand: "Je comprends les conséquences",
    assignSuccess: "Moniteur assigné avec succès",
    emailSent: "Emails envoyés avec succès",
    statusChanged: "Statut modifié avec succès",
    exportReady: "Export prêt au téléchargement",
    deleteSuccess: "Suppression effectuée avec succès",
    noStudentsFound: "Aucun élève trouvé",
    createFirstStudent: "Commencez par créer votre premier élève",
    today: "Aujourd'hui",
    tomorrow: "Demain",
    male: "Homme",
    female: "Femme",
    other: "Autre",
    all: "Tous",
    exportOptions: "Options d'export",
    selectColumns: "Sélectionner les colonnes",
    includeArchived: "Inclure les archivés",
    generateExport: "Générer l'export",
  },
  de: {
    pageTitle: "Schülerverwaltung",
    breadcrumb: "Schüler",
    totalStudents: "Schüler gesamt",
    activeStudents: "Aktive Schüler",
    inTraining: "In Ausbildung",
    upcomingExams: "Bevorstehende Prüfungen",
    nextExam: "Nächste Prüfung",
    newStudent: "Neuer Schüler",
    searchPlaceholder: "Name, E-Mail, Telefon suchen...",
    advancedFilters: "Erweiterte Filter",
    toggleView: "Ansicht wechseln",
    export: "Exportieren",
    exportExcel: "Excel exportieren",
    exportCSV: "CSV exportieren",
    exportPDF: "PDF exportieren",
    photo: "Foto",
    fullName: "Vollständiger Name",
    contact: "Kontakt",
    categories: "Kategorie(n)",
    progression: "Fortschritt",
    assignedInstructor: "Zugewiesener Fahrlehrer",
    nextLesson: "Nächste Lektion",
    remainingLessons: "Verbleibende Lektionen",
    financialBalance: "Finanzsaldo",
    status: "Status",
    actions: "Aktionen",
    statusActive: "Aktiv",
    statusInactive: "Inaktiv",
    statusPaused: "Pausiert",
    statusCompleted: "Abgeschlossen",
    statusAbandoned: "Abgebrochen",
    statusSuspended: "Suspendiert",
    categoryB: "Kategorie B",
    categoryA: "Kategorie A",
    categoryBE: "Kategorie BE",
    categoryA1: "Kategorie A1",
    categoryBPT: "Kategorie BPT",
    filterEnrollmentDate: "Anmeldedatum",
    filterCategories: "Kategorien",
    filterInstructor: "Fahrlehrer",
    filterStatuses: "Status",
    filterProgression: "Fortschritt",
    filterNegativeBalance: "Nur negativer Saldo",
    filterPermitExpired: "Führerschein abgelaufen",
    filterUpcomingExams: "Prüfungen < 30T",
    filterAgeRange: "Altersbereich",
    filterGender: "Geschlecht",
    allInstructors: "Alle Fahrlehrer",
    unassigned: "Nicht zugewiesen",
    applyFilters: "Anwenden",
    resetFilters: "Zurücksetzen",
    saveFilter: "Filter speichern",
    savedFilters: "Gespeicherte Filter",
    selectedStudents: "Schüler ausgewählt",
    assignInstructor: "Fahrlehrer zuweisen",
    sendEmail: "E-Mail senden",
    changeStatus: "Status ändern",
    exportSelection: "Auswahl exportieren",
    printConvocations: "Einladungen drucken",
    deleteSelected: "Löschen",
    viewProfile: "Profil anzeigen",
    edit: "Bearbeiten",
    bookLesson: "Lektion buchen",
    invoice: "Rechnung",
    documents: "Dokumente",
    delete: "Löschen",
    confirmChangeStatus: "Schülerstatus ändern",
    confirmDelete: "Schüler löschen",
    confirmBulkDelete: "Ausgewählte Schüler löschen",
    deleteWarning:
      "UNWIDERRUFLICHE Aktion. Alle Daten (Lektionen, Rechnungen, Dokumente) werden gelöscht.",
    typeDeleteConfirm: "DELETE eingeben zur Bestätigung",
    reason: "Grund",
    reasonRequired: "Grund erforderlich",
    iUnderstand: "Ich verstehe die Konsequenzen",
    assignSuccess: "Fahrlehrer erfolgreich zugewiesen",
    emailSent: "E-Mails erfolgreich gesendet",
    statusChanged: "Status erfolgreich geändert",
    exportReady: "Export bereit zum Download",
    deleteSuccess: "Erfolgreich gelöscht",
    noStudentsFound: "Keine Schüler gefunden",
    createFirstStudent: "Erstellen Sie Ihren ersten Schüler",
    today: "Heute",
    tomorrow: "Morgen",
    male: "Mann",
    female: "Frau",
    other: "Andere",
    all: "Alle",
    exportOptions: "Exportoptionen",
    selectColumns: "Spalten auswählen",
    includeArchived: "Archivierte einschließen",
    generateExport: "Export generieren",
  },
  it: {
    pageTitle: "Gestione Allievi",
    breadcrumb: "Allievi",
    totalStudents: "Totale allievi",
    activeStudents: "Allievi attivi",
    inTraining: "In formazione",
    upcomingExams: "Esami previsti",
    nextExam: "Prossimo esame",
    newStudent: "Nuovo allievo",
    searchPlaceholder: "Cerca nome, email, telefono...",
    advancedFilters: "Filtri avanzati",
    toggleView: "Cambia vista",
    export: "Esporta",
    exportExcel: "Esporta Excel",
    exportCSV: "Esporta CSV",
    exportPDF: "Esporta PDF",
    photo: "Foto",
    fullName: "Nome completo",
    contact: "Contatto",
    categories: "Categoria(e)",
    progression: "Progressione",
    assignedInstructor: "Istruttore assegnato",
    nextLesson: "Prossima lezione",
    remainingLessons: "Lezioni rimanenti",
    financialBalance: "Saldo finanziario",
    status: "Stato",
    actions: "Azioni",
    statusActive: "Attivo",
    statusInactive: "Inattivo",
    statusPaused: "In pausa",
    statusCompleted: "Completato",
    statusAbandoned: "Abbandonato",
    statusSuspended: "Sospeso",
    categoryB: "Categoria B",
    categoryA: "Categoria A",
    categoryBE: "Categoria BE",
    categoryA1: "Categoria A1",
    categoryBPT: "Categoria BPT",
    filterEnrollmentDate: "Data iscrizione",
    filterCategories: "Categorie",
    filterInstructor: "Istruttore",
    filterStatuses: "Stati",
    filterProgression: "Progressione",
    filterNegativeBalance: "Solo saldo negativo",
    filterPermitExpired: "Permesso scaduto",
    filterUpcomingExams: "Esami < 30g",
    filterAgeRange: "Fascia d'età",
    filterGender: "Genere",
    allInstructors: "Tutti gli istruttori",
    unassigned: "Non assegnati",
    applyFilters: "Applica",
    resetFilters: "Reimposta",
    saveFilter: "Salva filtro",
    savedFilters: "Filtri salvati",
    selectedStudents: "allievi selezionati",
    assignInstructor: "Assegna istruttore",
    sendEmail: "Invia email",
    changeStatus: "Cambia stato",
    exportSelection: "Esporta selezione",
    printConvocations: "Stampa convocazioni",
    deleteSelected: "Elimina",
    viewProfile: "Vedi profilo",
    edit: "Modifica",
    bookLesson: "Prenota lezione",
    invoice: "Fattura",
    documents: "Documenti",
    delete: "Elimina",
    confirmChangeStatus: "Cambiare stato allievo",
    confirmDelete: "Eliminare allievo",
    confirmBulkDelete: "Eliminare allievi selezionati",
    deleteWarning:
      "Azione IRREVERSIBILE. Tutti i dati (lezioni, fatture, documenti) saranno eliminati.",
    typeDeleteConfirm: "Digitare DELETE per confermare",
    reason: "Motivo",
    reasonRequired: "Motivo richiesto",
    iUnderstand: "Comprendo le conseguenze",
    assignSuccess: "Istruttore assegnato con successo",
    emailSent: "Email inviate con successo",
    statusChanged: "Stato modificato con successo",
    exportReady: "Export pronto per il download",
    deleteSuccess: "Eliminazione completata con successo",
    noStudentsFound: "Nessun allievo trovato",
    createFirstStudent: "Inizia creando il tuo primo allievo",
    today: "Oggi",
    tomorrow: "Domani",
    male: "Uomo",
    female: "Donna",
    other: "Altro",
    all: "Tutti",
    exportOptions: "Opzioni di esportazione",
    selectColumns: "Seleziona colonne",
    includeArchived: "Includi archiviati",
    generateExport: "Genera esportazione",
  },
  en: {
    pageTitle: "Students Management",
    breadcrumb: "Students",
    totalStudents: "Total students",
    activeStudents: "Active students",
    inTraining: "In training",
    upcomingExams: "Upcoming exams",
    nextExam: "Next exam",
    newStudent: "New student",
    searchPlaceholder: "Search name, email, phone...",
    advancedFilters: "Advanced filters",
    toggleView: "Toggle view",
    export: "Export",
    exportExcel: "Export Excel",
    exportCSV: "Export CSV",
    exportPDF: "Export PDF",
    photo: "Photo",
    fullName: "Full name",
    contact: "Contact",
    categories: "Category(ies)",
    progression: "Progression",
    assignedInstructor: "Assigned instructor",
    nextLesson: "Next lesson",
    remainingLessons: "Remaining lessons",
    financialBalance: "Financial balance",
    status: "Status",
    actions: "Actions",
    statusActive: "Active",
    statusInactive: "Inactive",
    statusPaused: "Paused",
    statusCompleted: "Completed",
    statusAbandoned: "Abandoned",
    statusSuspended: "Suspended",
    categoryB: "Category B",
    categoryA: "Category A",
    categoryBE: "Category BE",
    categoryA1: "Category A1",
    categoryBPT: "Category BPT",
    filterEnrollmentDate: "Enrollment date",
    filterCategories: "Categories",
    filterInstructor: "Instructor",
    filterStatuses: "Statuses",
    filterProgression: "Progression",
    filterNegativeBalance: "Negative balance only",
    filterPermitExpired: "Permit expired",
    filterUpcomingExams: "Exams < 30d",
    filterAgeRange: "Age range",
    filterGender: "Gender",
    allInstructors: "All instructors",
    unassigned: "Unassigned",
    applyFilters: "Apply",
    resetFilters: "Reset",
    saveFilter: "Save filter",
    savedFilters: "Saved filters",
    selectedStudents: "students selected",
    assignInstructor: "Assign instructor",
    sendEmail: "Send email",
    changeStatus: "Change status",
    exportSelection: "Export selection",
    printConvocations: "Print convocations",
    deleteSelected: "Delete",
    viewProfile: "View profile",
    edit: "Edit",
    bookLesson: "Book lesson",
    invoice: "Invoice",
    documents: "Documents",
    delete: "Delete",
    confirmChangeStatus: "Change student status",
    confirmDelete: "Delete student",
    confirmBulkDelete: "Delete selected students",
    deleteWarning:
      "IRREVERSIBLE action. All data (lessons, invoices, documents) will be deleted.",
    typeDeleteConfirm: "Type DELETE to confirm",
    reason: "Reason",
    reasonRequired: "Reason required",
    iUnderstand: "I understand the consequences",
    assignSuccess: "Instructor assigned successfully",
    emailSent: "Emails sent successfully",
    statusChanged: "Status changed successfully",
    exportReady: "Export ready for download",
    deleteSuccess: "Successfully deleted",
    noStudentsFound: "No students found",
    createFirstStudent: "Start by creating your first student",
    today: "Today",
    tomorrow: "Tomorrow",
    male: "Male",
    female: "Female",
    other: "Other",
    all: "All",
    exportOptions: "Export options",
    selectColumns: "Select columns",
    includeArchived: "Include archived",
    generateExport: "Generate export",
  },
};

export function useStudentsTranslations(locale: StudentsLocale) {
  return STUDENTS_TRANSLATIONS[locale];
}

export function formatCurrency(amount: number, locale: StudentsLocale): string {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : `${locale}-CH`, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
}

export function formatDate(dateString: string, locale: StudentsLocale): string {
  return new Date(dateString).toLocaleDateString(
    locale === "en" ? "en-US" : `${locale}-CH`
  );
}

export function formatDateTime(
  dateString: string,
  locale: StudentsLocale
): string {
  return new Date(dateString).toLocaleString(
    locale === "en" ? "en-US" : `${locale}-CH`
  );
}
