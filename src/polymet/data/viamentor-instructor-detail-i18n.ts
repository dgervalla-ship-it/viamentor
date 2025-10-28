/**
 * VIAMENTOR - Instructor Detail i18n
 *
 * Traductions FR/DE/IT/EN pour page de détail moniteur
 */

export type InstructorDetailLocale = "fr" | "de" | "it" | "en";

export interface InstructorDetailTranslations {
  // Breadcrumb
  breadcrumbHome: string;
  breadcrumbInstructors: string;

  // Header actions
  actionEdit: string;
  actionPlanning: string;
  actionAssign: string;
  actionSuspend: string;
  actionDelete: string;

  // Status
  statusAvailable: string;
  statusInLesson: string;
  statusOnBreak: string;
  statusUnavailable: string;
  statusSuspended: string;

  // Tabs
  tabInformations: string;
  tabPlanning: string;
  tabStudents: string;
  tabPerformance: string;

  // Tab Informations
  infoCoordinates: string;
  infoFirstName: string;
  infoLastName: string;
  infoEmail: string;
  infoPhone: string;
  infoAddress: string;
  infoStreet: string;
  infoZipCode: string;
  infoCity: string;
  infoCanton: string;
  infoNationality: string;
  infoLanguages: string;

  infoQualifications: string;
  infoFederalLicense: string;
  infoLicenseNumber: string;
  infoLicenseDate: string;
  infoCategories: string;
  infoSpecialties: string;

  infoAvailability: string;
  infoDays: string;
  infoTimeSlots: string;
  infoMaxHours: string;
  infoVacations: string;

  infoEmergencyContact: string;
  infoContactName: string;
  infoContactRelationship: string;
  infoContactPhone: string;

  infoPreferences: string;
  infoNotifications: string;
  infoNotifEmail: string;
  infoNotifSMS: string;
  infoNotifPush: string;
  infoVehicles: string;
  infoNotes: string;

  // Tab Planning
  planningTitle: string;
  planningNewLesson: string;
  planningViewMonth: string;
  planningViewWeek: string;
  planningViewDay: string;
  planningFilters: string;
  planningExport: string;
  planningUtilization: string;
  planningAvailable: string;
  planningBooked: string;
  planningTarget: string;

  // Lesson types
  lessonTheory: string;
  lessonPractical: string;
  lessonExam: string;
  lessonEvaluation: string;

  // Lesson status
  lessonScheduled: string;
  lessonCompleted: string;
  lessonCancelled: string;
  lessonInProgress: string;

  // Tab Students
  studentsTitle: string;
  studentsAssign: string;
  studentsTotal: string;
  studentsActive: string;
  studentsLessons7d: string;
  studentsSuccessRate: string;

  studentsColName: string;
  studentsColCategory: string;
  studentsColProgression: string;
  studentsColLessons: string;
  studentsColLastLesson: string;
  studentsColNextLesson: string;
  studentsColRating: string;
  studentsColActions: string;

  studentsActionPlanning: string;
  studentsActionUnassign: string;

  // Tab Performance
  perfTitle: string;
  perfPeriod: string;
  perfLast7Days: string;
  perfLast30Days: string;
  perfLast90Days: string;
  perfThisYear: string;

  perfLessons: string;
  perfHours: string;
  perfAttendance: string;
  perfRating: string;

  perfLessonsPerDay: string;
  perfHoursByCategory: string;
  perfLessonTypes: string;

  perfFeedback: string;
  perfAverageRating: string;
  perfDistribution: string;
  perfReply: string;

  perfComparison: string;
  perfRank: string;
  perfInstructor: string;
  perfSuccessRate: string;

  perfGoals: string;
  perfGoalTarget: string;
  perfGoalCurrent: string;
  perfGoalHistory: string;

  // Days of week
  dayMonday: string;
  dayTuesday: string;
  dayWednesday: string;
  dayThursday: string;
  dayFriday: string;
  daySaturday: string;
  daySunday: string;

  // Common
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  confirm: string;
  loading: string;
  noData: string;
}

export const INSTRUCTOR_DETAIL_TRANSLATIONS: Record<
  InstructorDetailLocale,
  InstructorDetailTranslations
> = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbInstructors: "Moniteurs",

    actionEdit: "Modifier",
    actionPlanning: "Planning",
    actionAssign: "Affecter élève",
    actionSuspend: "Suspendre",
    actionDelete: "Supprimer",

    statusAvailable: "Disponible",
    statusInLesson: "En leçon",
    statusOnBreak: "En pause",
    statusUnavailable: "Indisponible",
    statusSuspended: "Suspendu",

    tabInformations: "Informations",
    tabPlanning: "Planning",
    tabStudents: "Élèves assignés",
    tabPerformance: "Performance",

    infoCoordinates: "Coordonnées",
    infoFirstName: "Prénom",
    infoLastName: "Nom",
    infoEmail: "Email",
    infoPhone: "Téléphone",
    infoAddress: "Adresse",
    infoStreet: "Rue",
    infoZipCode: "NPA",
    infoCity: "Ville",
    infoCanton: "Canton",
    infoNationality: "Nationalité",
    infoLanguages: "Langues",

    infoQualifications: "Qualifications",
    infoFederalLicense: "Brevet fédéral",
    infoLicenseNumber: "Numéro",
    infoLicenseDate: "Date d'obtention",
    infoCategories: "Habilitations",
    infoSpecialties: "Spécialités",

    infoAvailability: "Disponibilités",
    infoDays: "Jours de travail",
    infoTimeSlots: "Plages horaires",
    infoMaxHours: "Heures max/semaine",
    infoVacations: "Congés",

    infoEmergencyContact: "Contact d'urgence",
    infoContactName: "Nom",
    infoContactRelationship: "Lien",
    infoContactPhone: "Téléphone",

    infoPreferences: "Préférences",
    infoNotifications: "Notifications",
    infoNotifEmail: "Email",
    infoNotifSMS: "SMS",
    infoNotifPush: "Push",
    infoVehicles: "Véhicules",
    infoNotes: "Notes",

    planningTitle: "Planning",
    planningNewLesson: "Nouvelle leçon",
    planningViewMonth: "Mois",
    planningViewWeek: "Semaine",
    planningViewDay: "Jour",
    planningFilters: "Filtres",
    planningExport: "Exporter .ics",
    planningUtilization: "Utilisation",
    planningAvailable: "Disponible",
    planningBooked: "Réservé",
    planningTarget: "Objectif",

    lessonTheory: "Théorie",
    lessonPractical: "Pratique",
    lessonExam: "Examen",
    lessonEvaluation: "Évaluation",

    lessonScheduled: "Planifié",
    lessonCompleted: "Terminé",
    lessonCancelled: "Annulé",
    lessonInProgress: "En cours",

    studentsTitle: "Élèves assignés",
    studentsAssign: "Affecter élève",
    studentsTotal: "Total élèves",
    studentsActive: "Actifs",
    studentsLessons7d: "Leçons 7j",
    studentsSuccessRate: "Taux réussite",

    studentsColName: "Nom",
    studentsColCategory: "Catégorie",
    studentsColProgression: "Progression",
    studentsColLessons: "Leçons",
    studentsColLastLesson: "Dernière leçon",
    studentsColNextLesson: "Prochaine leçon",
    studentsColRating: "Note",
    studentsColActions: "Actions",

    studentsActionPlanning: "Planning",
    studentsActionUnassign: "Désassigner",

    perfTitle: "Performance",
    perfPeriod: "Période",
    perfLast7Days: "7 derniers jours",
    perfLast30Days: "30 derniers jours",
    perfLast90Days: "90 derniers jours",
    perfThisYear: "Cette année",

    perfLessons: "Leçons",
    perfHours: "Heures",
    perfAttendance: "Présence",
    perfRating: "Note",

    perfLessonsPerDay: "Leçons par jour",
    perfHoursByCategory: "Heures par catégorie",
    perfLessonTypes: "Types de leçons",

    perfFeedback: "Avis élèves",
    perfAverageRating: "Note moyenne",
    perfDistribution: "Distribution",
    perfReply: "Réponse",

    perfComparison: "Comparaison",
    perfRank: "Rang",
    perfInstructor: "Moniteur",
    perfSuccessRate: "Taux réussite",

    perfGoals: "Objectifs",
    perfGoalTarget: "Objectif",
    perfGoalCurrent: "Actuel",
    perfGoalHistory: "Historique",

    dayMonday: "Lundi",
    dayTuesday: "Mardi",
    dayWednesday: "Mercredi",
    dayThursday: "Jeudi",
    dayFriday: "Vendredi",
    daySaturday: "Samedi",
    daySunday: "Dimanche",

    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    confirm: "Confirmer",
    loading: "Chargement...",
    noData: "Aucune donnée",
  },

  de: {
    breadcrumbHome: "Startseite",
    breadcrumbInstructors: "Fahrlehrer",

    actionEdit: "Bearbeiten",
    actionPlanning: "Planung",
    actionAssign: "Schüler zuweisen",
    actionSuspend: "Suspendieren",
    actionDelete: "Löschen",

    statusAvailable: "Verfügbar",
    statusInLesson: "Im Unterricht",
    statusOnBreak: "Pause",
    statusUnavailable: "Nicht verfügbar",
    statusSuspended: "Suspendiert",

    tabInformations: "Informationen",
    tabPlanning: "Planung",
    tabStudents: "Zugewiesene Schüler",
    tabPerformance: "Leistung",

    infoCoordinates: "Kontaktdaten",
    infoFirstName: "Vorname",
    infoLastName: "Nachname",
    infoEmail: "E-Mail",
    infoPhone: "Telefon",
    infoAddress: "Adresse",
    infoStreet: "Straße",
    infoZipCode: "PLZ",
    infoCity: "Stadt",
    infoCanton: "Kanton",
    infoNationality: "Nationalität",
    infoLanguages: "Sprachen",

    infoQualifications: "Qualifikationen",
    infoFederalLicense: "Bundespatent",
    infoLicenseNumber: "Nummer",
    infoLicenseDate: "Erhaltungsdatum",
    infoCategories: "Berechtigungen",
    infoSpecialties: "Spezialitäten",

    infoAvailability: "Verfügbarkeit",
    infoDays: "Arbeitstage",
    infoTimeSlots: "Zeitfenster",
    infoMaxHours: "Max. Stunden/Woche",
    infoVacations: "Urlaub",

    infoEmergencyContact: "Notfallkontakt",
    infoContactName: "Name",
    infoContactRelationship: "Beziehung",
    infoContactPhone: "Telefon",

    infoPreferences: "Präferenzen",
    infoNotifications: "Benachrichtigungen",
    infoNotifEmail: "E-Mail",
    infoNotifSMS: "SMS",
    infoNotifPush: "Push",
    infoVehicles: "Fahrzeuge",
    infoNotes: "Notizen",

    planningTitle: "Planung",
    planningNewLesson: "Neue Lektion",
    planningViewMonth: "Monat",
    planningViewWeek: "Woche",
    planningViewDay: "Tag",
    planningFilters: "Filter",
    planningExport: "Exportieren .ics",
    planningUtilization: "Auslastung",
    planningAvailable: "Verfügbar",
    planningBooked: "Gebucht",
    planningTarget: "Ziel",

    lessonTheory: "Theorie",
    lessonPractical: "Praxis",
    lessonExam: "Prüfung",
    lessonEvaluation: "Bewertung",

    lessonScheduled: "Geplant",
    lessonCompleted: "Abgeschlossen",
    lessonCancelled: "Abgesagt",
    lessonInProgress: "Läuft",

    studentsTitle: "Zugewiesene Schüler",
    studentsAssign: "Schüler zuweisen",
    studentsTotal: "Gesamt Schüler",
    studentsActive: "Aktiv",
    studentsLessons7d: "Lektionen 7T",
    studentsSuccessRate: "Erfolgsquote",

    studentsColName: "Name",
    studentsColCategory: "Kategorie",
    studentsColProgression: "Fortschritt",
    studentsColLessons: "Lektionen",
    studentsColLastLesson: "Letzte Lektion",
    studentsColNextLesson: "Nächste Lektion",
    studentsColRating: "Bewertung",
    studentsColActions: "Aktionen",

    studentsActionPlanning: "Planung",
    studentsActionUnassign: "Zuweisung aufheben",

    perfTitle: "Leistung",
    perfPeriod: "Zeitraum",
    perfLast7Days: "Letzte 7 Tage",
    perfLast30Days: "Letzte 30 Tage",
    perfLast90Days: "Letzte 90 Tage",
    perfThisYear: "Dieses Jahr",

    perfLessons: "Lektionen",
    perfHours: "Stunden",
    perfAttendance: "Anwesenheit",
    perfRating: "Bewertung",

    perfLessonsPerDay: "Lektionen pro Tag",
    perfHoursByCategory: "Stunden nach Kategorie",
    perfLessonTypes: "Lektionstypen",

    perfFeedback: "Schülerbewertungen",
    perfAverageRating: "Durchschnittsbewertung",
    perfDistribution: "Verteilung",
    perfReply: "Antwort",

    perfComparison: "Vergleich",
    perfRank: "Rang",
    perfInstructor: "Fahrlehrer",
    perfSuccessRate: "Erfolgsquote",

    perfGoals: "Ziele",
    perfGoalTarget: "Ziel",
    perfGoalCurrent: "Aktuell",
    perfGoalHistory: "Verlauf",

    dayMonday: "Montag",
    dayTuesday: "Dienstag",
    dayWednesday: "Mittwoch",
    dayThursday: "Donnerstag",
    dayFriday: "Freitag",
    daySaturday: "Samstag",
    daySunday: "Sonntag",

    save: "Speichern",
    cancel: "Abbrechen",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirm: "Bestätigen",
    loading: "Laden...",
    noData: "Keine Daten",
  },

  it: {
    breadcrumbHome: "Home",
    breadcrumbInstructors: "Istruttori",

    actionEdit: "Modifica",
    actionPlanning: "Pianificazione",
    actionAssign: "Assegna studente",
    actionSuspend: "Sospendi",
    actionDelete: "Elimina",

    statusAvailable: "Disponibile",
    statusInLesson: "In lezione",
    statusOnBreak: "In pausa",
    statusUnavailable: "Non disponibile",
    statusSuspended: "Sospeso",

    tabInformations: "Informazioni",
    tabPlanning: "Pianificazione",
    tabStudents: "Studenti assegnati",
    tabPerformance: "Prestazioni",

    infoCoordinates: "Coordinate",
    infoFirstName: "Nome",
    infoLastName: "Cognome",
    infoEmail: "Email",
    infoPhone: "Telefono",
    infoAddress: "Indirizzo",
    infoStreet: "Via",
    infoZipCode: "CAP",
    infoCity: "Città",
    infoCanton: "Cantone",
    infoNationality: "Nazionalità",
    infoLanguages: "Lingue",

    infoQualifications: "Qualifiche",
    infoFederalLicense: "Patente federale",
    infoLicenseNumber: "Numero",
    infoLicenseDate: "Data di ottenimento",
    infoCategories: "Abilitazioni",
    infoSpecialties: "Specialità",

    infoAvailability: "Disponibilità",
    infoDays: "Giorni lavorativi",
    infoTimeSlots: "Fasce orarie",
    infoMaxHours: "Ore max/settimana",
    infoVacations: "Ferie",

    infoEmergencyContact: "Contatto di emergenza",
    infoContactName: "Nome",
    infoContactRelationship: "Relazione",
    infoContactPhone: "Telefono",

    infoPreferences: "Preferenze",
    infoNotifications: "Notifiche",
    infoNotifEmail: "Email",
    infoNotifSMS: "SMS",
    infoNotifPush: "Push",
    infoVehicles: "Veicoli",
    infoNotes: "Note",

    planningTitle: "Pianificazione",
    planningNewLesson: "Nuova lezione",
    planningViewMonth: "Mese",
    planningViewWeek: "Settimana",
    planningViewDay: "Giorno",
    planningFilters: "Filtri",
    planningExport: "Esporta .ics",
    planningUtilization: "Utilizzo",
    planningAvailable: "Disponibile",
    planningBooked: "Prenotato",
    planningTarget: "Obiettivo",

    lessonTheory: "Teoria",
    lessonPractical: "Pratica",
    lessonExam: "Esame",
    lessonEvaluation: "Valutazione",

    lessonScheduled: "Pianificato",
    lessonCompleted: "Completato",
    lessonCancelled: "Annullato",
    lessonInProgress: "In corso",

    studentsTitle: "Studenti assegnati",
    studentsAssign: "Assegna studente",
    studentsTotal: "Totale studenti",
    studentsActive: "Attivi",
    studentsLessons7d: "Lezioni 7g",
    studentsSuccessRate: "Tasso successo",

    studentsColName: "Nome",
    studentsColCategory: "Categoria",
    studentsColProgression: "Progressione",
    studentsColLessons: "Lezioni",
    studentsColLastLesson: "Ultima lezione",
    studentsColNextLesson: "Prossima lezione",
    studentsColRating: "Valutazione",
    studentsColActions: "Azioni",

    studentsActionPlanning: "Pianificazione",
    studentsActionUnassign: "Rimuovi assegnazione",

    perfTitle: "Prestazioni",
    perfPeriod: "Periodo",
    perfLast7Days: "Ultimi 7 giorni",
    perfLast30Days: "Ultimi 30 giorni",
    perfLast90Days: "Ultimi 90 giorni",
    perfThisYear: "Quest'anno",

    perfLessons: "Lezioni",
    perfHours: "Ore",
    perfAttendance: "Presenza",
    perfRating: "Valutazione",

    perfLessonsPerDay: "Lezioni al giorno",
    perfHoursByCategory: "Ore per categoria",
    perfLessonTypes: "Tipi di lezioni",

    perfFeedback: "Recensioni studenti",
    perfAverageRating: "Valutazione media",
    perfDistribution: "Distribuzione",
    perfReply: "Risposta",

    perfComparison: "Confronto",
    perfRank: "Posizione",
    perfInstructor: "Istruttore",
    perfSuccessRate: "Tasso successo",

    perfGoals: "Obiettivi",
    perfGoalTarget: "Obiettivo",
    perfGoalCurrent: "Attuale",
    perfGoalHistory: "Storico",

    dayMonday: "Lunedì",
    dayTuesday: "Martedì",
    dayWednesday: "Mercoledì",
    dayThursday: "Giovedì",
    dayFriday: "Venerdì",
    daySaturday: "Sabato",
    daySunday: "Domenica",

    save: "Salva",
    cancel: "Annulla",
    edit: "Modifica",
    delete: "Elimina",
    confirm: "Conferma",
    loading: "Caricamento...",
    noData: "Nessun dato",
  },

  en: {
    breadcrumbHome: "Home",
    breadcrumbInstructors: "Instructors",

    actionEdit: "Edit",
    actionPlanning: "Planning",
    actionAssign: "Assign student",
    actionSuspend: "Suspend",
    actionDelete: "Delete",

    statusAvailable: "Available",
    statusInLesson: "In lesson",
    statusOnBreak: "On break",
    statusUnavailable: "Unavailable",
    statusSuspended: "Suspended",

    tabInformations: "Informations",
    tabPlanning: "Planning",
    tabStudents: "Assigned students",
    tabPerformance: "Performance",

    infoCoordinates: "Contact details",
    infoFirstName: "First name",
    infoLastName: "Last name",
    infoEmail: "Email",
    infoPhone: "Phone",
    infoAddress: "Address",
    infoStreet: "Street",
    infoZipCode: "Zip code",
    infoCity: "City",
    infoCanton: "Canton",
    infoNationality: "Nationality",
    infoLanguages: "Languages",

    infoQualifications: "Qualifications",
    infoFederalLicense: "Federal license",
    infoLicenseNumber: "Number",
    infoLicenseDate: "Issue date",
    infoCategories: "Categories",
    infoSpecialties: "Specialties",

    infoAvailability: "Availability",
    infoDays: "Working days",
    infoTimeSlots: "Time slots",
    infoMaxHours: "Max hours/week",
    infoVacations: "Vacations",

    infoEmergencyContact: "Emergency contact",
    infoContactName: "Name",
    infoContactRelationship: "Relationship",
    infoContactPhone: "Phone",

    infoPreferences: "Preferences",
    infoNotifications: "Notifications",
    infoNotifEmail: "Email",
    infoNotifSMS: "SMS",
    infoNotifPush: "Push",
    infoVehicles: "Vehicles",
    infoNotes: "Notes",

    planningTitle: "Planning",
    planningNewLesson: "New lesson",
    planningViewMonth: "Month",
    planningViewWeek: "Week",
    planningViewDay: "Day",
    planningFilters: "Filters",
    planningExport: "Export .ics",
    planningUtilization: "Utilization",
    planningAvailable: "Available",
    planningBooked: "Booked",
    planningTarget: "Target",

    lessonTheory: "Theory",
    lessonPractical: "Practical",
    lessonExam: "Exam",
    lessonEvaluation: "Evaluation",

    lessonScheduled: "Scheduled",
    lessonCompleted: "Completed",
    lessonCancelled: "Cancelled",
    lessonInProgress: "In progress",

    studentsTitle: "Assigned students",
    studentsAssign: "Assign student",
    studentsTotal: "Total students",
    studentsActive: "Active",
    studentsLessons7d: "Lessons 7d",
    studentsSuccessRate: "Success rate",

    studentsColName: "Name",
    studentsColCategory: "Category",
    studentsColProgression: "Progression",
    studentsColLessons: "Lessons",
    studentsColLastLesson: "Last lesson",
    studentsColNextLesson: "Next lesson",
    studentsColRating: "Rating",
    studentsColActions: "Actions",

    studentsActionPlanning: "Planning",
    studentsActionUnassign: "Unassign",

    perfTitle: "Performance",
    perfPeriod: "Period",
    perfLast7Days: "Last 7 days",
    perfLast30Days: "Last 30 days",
    perfLast90Days: "Last 90 days",
    perfThisYear: "This year",

    perfLessons: "Lessons",
    perfHours: "Hours",
    perfAttendance: "Attendance",
    perfRating: "Rating",

    perfLessonsPerDay: "Lessons per day",
    perfHoursByCategory: "Hours by category",
    perfLessonTypes: "Lesson types",

    perfFeedback: "Student feedback",
    perfAverageRating: "Average rating",
    perfDistribution: "Distribution",
    perfReply: "Reply",

    perfComparison: "Comparison",
    perfRank: "Rank",
    perfInstructor: "Instructor",
    perfSuccessRate: "Success rate",

    perfGoals: "Goals",
    perfGoalTarget: "Target",
    perfGoalCurrent: "Current",
    perfGoalHistory: "History",

    dayMonday: "Monday",
    dayTuesday: "Tuesday",
    dayWednesday: "Wednesday",
    dayThursday: "Thursday",
    dayFriday: "Friday",
    daySaturday: "Saturday",
    daySunday: "Sunday",

    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    loading: "Loading...",
    noData: "No data",
  },
};

export function useInstructorDetailTranslations(
  locale: InstructorDetailLocale = "fr"
) {
  return INSTRUCTOR_DETAIL_TRANSLATIONS[locale];
}

// Structured i18n for components
export const INSTRUCTOR_DETAIL_I18N: Record<
  InstructorDetailLocale,
  {
    tabs: {
      performance: {
        title: string;
        periods: Record<"7d" | "30d" | "90d" | "1y", string>;
        kpis: {
          lessons: string;
          hours: string;
          attendance: string;
          rating: string;
          avgPerLesson: string;
        };
        charts: {
          lessonsPerDay: string;
          hoursByCategory: string;
          lessonTypes: string;
        };
        reviews: {
          title: string;
          count: string;
          reply: string;
          replyPlaceholder: string;
          replyButton: string;
          send: string;
          cancel: string;
        };
        ranking: {
          title: string;
          you: string;
          lessons: string;
          rating: string;
        };
        objectives: {
          title: string;
          monthlyTarget: string;
          update: string;
          progress: string;
          lessons: string;
          remaining: string;
          achieved: string;
          history: string;
          target: string;
          actual: string;
        };
      };
      students: {
        title: string;
        assign: string;
        stats: {
          total: string;
          active: string;
          lessons7d: string;
          successRate: string;
        };
        table: {
          name: string;
          category: string;
          progression: string;
          lessons: string;
          lastLesson: string;
          nextLesson: string;
          rating: string;
          actions: string;
        };
        actions: {
          planning: string;
          unassign: string;
        };
        status: {
          active: string;
          inactive: string;
          suspended: string;
        };
      };
    };
  }
> = {
  fr: {
    tabs: {
      performance: {
        title: "Performance",
        periods: {
          "7d": "7 derniers jours",
          "30d": "30 derniers jours",
          "90d": "90 derniers jours",
          "1y": "Cette année",
        },
        kpis: {
          lessons: "Leçons",
          hours: "Heures",
          attendance: "Présence",
          rating: "Note",
          avgPerLesson: "Moy. par leçon",
        },
        charts: {
          lessonsPerDay: "Leçons par jour",
          hoursByCategory: "Heures par catégorie",
          lessonTypes: "Types de leçons",
        },
        reviews: {
          title: "Avis élèves",
          count: "avis",
          reply: "Réponse du moniteur",
          replyPlaceholder: "Votre réponse...",
          replyButton: "Répondre",
          send: "Envoyer",
          cancel: "Annuler",
        },
        ranking: {
          title: "Classement moniteurs",
          you: "Vous",
          lessons: "Leçons",
          rating: "Note",
        },
        objectives: {
          title: "Objectifs",
          monthlyTarget: "Objectif mensuel (leçons)",
          update: "Mettre à jour",
          progress: "Progression",
          lessons: "leçons",
          remaining: "leçons restantes",
          achieved: "Objectif atteint !",
          history: "Historique",
          target: "Objectif",
          actual: "Réalisé",
        },
      },
      students: {
        title: "Élèves assignés",
        assign: "Affecter élève",
        stats: {
          total: "Total élèves",
          active: "Actifs",
          lessons7d: "Leçons 7j",
          successRate: "Taux réussite",
        },
        table: {
          name: "Nom",
          category: "Catégorie",
          progression: "Progression",
          lessons: "Leçons",
          lastLesson: "Dernière leçon",
          nextLesson: "Prochaine leçon",
          rating: "Note",
          actions: "Actions",
        },
        actions: {
          planning: "Planning",
          unassign: "Désassigner",
        },
        status: {
          active: "actif",
          inactive: "inactif",
          suspended: "suspendu",
        },
      },
    },
  },
  de: {
    tabs: {
      performance: {
        title: "Leistung",
        periods: {
          "7d": "Letzte 7 Tage",
          "30d": "Letzte 30 Tage",
          "90d": "Letzte 90 Tage",
          "1y": "Dieses Jahr",
        },
        kpis: {
          lessons: "Lektionen",
          hours: "Stunden",
          attendance: "Anwesenheit",
          rating: "Bewertung",
          avgPerLesson: "Durchschn. pro Lektion",
        },
        charts: {
          lessonsPerDay: "Lektionen pro Tag",
          hoursByCategory: "Stunden nach Kategorie",
          lessonTypes: "Lektionstypen",
        },
        reviews: {
          title: "Schülerbewertungen",
          count: "Bewertungen",
          reply: "Antwort des Fahrlehrers",
          replyPlaceholder: "Ihre Antwort...",
          replyButton: "Antworten",
          send: "Senden",
          cancel: "Abbrechen",
        },
        ranking: {
          title: "Fahrlehrer-Ranking",
          you: "Sie",
          lessons: "Lektionen",
          rating: "Bewertung",
        },
        objectives: {
          title: "Ziele",
          monthlyTarget: "Monatsziel (Lektionen)",
          update: "Aktualisieren",
          progress: "Fortschritt",
          lessons: "Lektionen",
          remaining: "verbleibende Lektionen",
          achieved: "Ziel erreicht!",
          history: "Verlauf",
          target: "Ziel",
          actual: "Erreicht",
        },
      },
      students: {
        title: "Zugewiesene Schüler",
        assign: "Schüler zuweisen",
        stats: {
          total: "Gesamt Schüler",
          active: "Aktiv",
          lessons7d: "Lektionen 7T",
          successRate: "Erfolgsquote",
        },
        table: {
          name: "Name",
          category: "Kategorie",
          progression: "Fortschritt",
          lessons: "Lektionen",
          lastLesson: "Letzte Lektion",
          nextLesson: "Nächste Lektion",
          rating: "Bewertung",
          actions: "Aktionen",
        },
        actions: {
          planning: "Planung",
          unassign: "Zuweisung aufheben",
        },
        status: {
          active: "aktiv",
          inactive: "inaktiv",
          suspended: "suspendiert",
        },
      },
    },
  },
  it: {
    tabs: {
      performance: {
        title: "Prestazioni",
        periods: {
          "7d": "Ultimi 7 giorni",
          "30d": "Ultimi 30 giorni",
          "90d": "Ultimi 90 giorni",
          "1y": "Quest'anno",
        },
        kpis: {
          lessons: "Lezioni",
          hours: "Ore",
          attendance: "Presenza",
          rating: "Valutazione",
          avgPerLesson: "Media per lezione",
        },
        charts: {
          lessonsPerDay: "Lezioni al giorno",
          hoursByCategory: "Ore per categoria",
          lessonTypes: "Tipi di lezioni",
        },
        reviews: {
          title: "Recensioni studenti",
          count: "recensioni",
          reply: "Risposta dell'istruttore",
          replyPlaceholder: "La tua risposta...",
          replyButton: "Rispondi",
          send: "Invia",
          cancel: "Annulla",
        },
        ranking: {
          title: "Classifica istruttori",
          you: "Tu",
          lessons: "Lezioni",
          rating: "Valutazione",
        },
        objectives: {
          title: "Obiettivi",
          monthlyTarget: "Obiettivo mensile (lezioni)",
          update: "Aggiorna",
          progress: "Progressione",
          lessons: "lezioni",
          remaining: "lezioni rimanenti",
          achieved: "Obiettivo raggiunto!",
          history: "Storico",
          target: "Obiettivo",
          actual: "Realizzato",
        },
      },
      students: {
        title: "Studenti assegnati",
        assign: "Assegna studente",
        stats: {
          total: "Totale studenti",
          active: "Attivi",
          lessons7d: "Lezioni 7g",
          successRate: "Tasso successo",
        },
        table: {
          name: "Nome",
          category: "Categoria",
          progression: "Progressione",
          lessons: "Lezioni",
          lastLesson: "Ultima lezione",
          nextLesson: "Prossima lezione",
          rating: "Valutazione",
          actions: "Azioni",
        },
        actions: {
          planning: "Pianificazione",
          unassign: "Rimuovi assegnazione",
        },
        status: {
          active: "attivo",
          inactive: "inattivo",
          suspended: "sospeso",
        },
      },
    },
  },
  en: {
    tabs: {
      performance: {
        title: "Performance",
        periods: {
          "7d": "Last 7 days",
          "30d": "Last 30 days",
          "90d": "Last 90 days",
          "1y": "This year",
        },
        kpis: {
          lessons: "Lessons",
          hours: "Hours",
          attendance: "Attendance",
          rating: "Rating",
          avgPerLesson: "Avg. per lesson",
        },
        charts: {
          lessonsPerDay: "Lessons per day",
          hoursByCategory: "Hours by category",
          lessonTypes: "Lesson types",
        },
        reviews: {
          title: "Student reviews",
          count: "reviews",
          reply: "Instructor reply",
          replyPlaceholder: "Your reply...",
          replyButton: "Reply",
          send: "Send",
          cancel: "Cancel",
        },
        ranking: {
          title: "Instructor ranking",
          you: "You",
          lessons: "Lessons",
          rating: "Rating",
        },
        objectives: {
          title: "Objectives",
          monthlyTarget: "Monthly target (lessons)",
          update: "Update",
          progress: "Progress",
          lessons: "lessons",
          remaining: "lessons remaining",
          achieved: "Goal achieved!",
          history: "History",
          target: "Target",
          actual: "Actual",
        },
      },
      students: {
        title: "Assigned students",
        assign: "Assign student",
        stats: {
          total: "Total students",
          active: "Active",
          lessons7d: "Lessons 7d",
          successRate: "Success rate",
        },
        table: {
          name: "Name",
          category: "Category",
          progression: "Progression",
          lessons: "Lessons",
          lastLesson: "Last lesson",
          nextLesson: "Next lesson",
          rating: "Rating",
          actions: "Actions",
        },
        actions: {
          planning: "Planning",
          unassign: "Unassign",
        },
        status: {
          active: "active",
          inactive: "inactive",
          suspended: "suspended",
        },
      },
    },
  },
};
