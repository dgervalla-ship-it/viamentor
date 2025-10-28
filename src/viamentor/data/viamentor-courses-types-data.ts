/**
 * VIAMENTOR - Course Types Data
 * Types TypeScript, mock data et i18n pour types de cours théoriques
 */

// ============================================================================
// TYPES
// ============================================================================

export type CourseTypeLocale = "fr" | "de" | "it" | "en";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface CourseSession {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
  startTime: string; // Format "HH:mm"
  duration: number; // En heures (décimal)
  content?: string;
  order: number;
}

export interface CourseType {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  sessions: CourseSession[];
  price?: number; // Si null, hérite de la catégorie
  minParticipants: number;
  maxParticipants: number;
  waitingListEnabled: boolean;
  defaultLocation?: string;
  authorizedInstructors?: string[];
  visibleOnWebsite: boolean;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseTypeFormData {
  name: string;
  description?: string;
  sessions: Omit<CourseSession, "id">[];
  price?: number;
  minParticipants: number;
  maxParticipants: number;
  waitingListEnabled: boolean;
  defaultLocation?: string;
  authorizedInstructors?: string[];
  visibleOnWebsite: boolean;
  active: boolean;
}

// ============================================================================
// I18N
// ============================================================================

export const courseTypesI18n = {
  fr: {
    title: "Types de cours",
    subtitle: "Définissez les formats: semaine, weekend, intensif...",
    newType: "Nouveau type",
    editType: "Modifier le type",
    deleteType: "Supprimer le type",
    duplicateType: "Dupliquer le type",

    // Table columns
    name: "Nom du type",
    format: "Format",
    days: "Jours",
    schedule: "Horaire",
    price: "Prix",
    sessions: "Séances",
    participants: "Participants",
    active: "Actif",
    order: "Ordre",
    actions: "Actions",

    // Form tabs
    tabInformation: "Informations",
    tabSessions: "Séances",
    tabSettings: "Paramètres",

    // Form fields
    typeName: "Nom du type",
    typeNamePlaceholder: "Cours semaine soir",
    description: "Description",
    descriptionPlaceholder: "Formation répartie sur 4 soirées consécutives",
    priceLabel: "Prix (CHF)",
    pricePlaceholder: "450",
    priceInherit: "Hérite de la catégorie",
    activeLabel: "Type actif",

    // Sessions
    sessionsTitle: "Structure du cours",
    sessionsAlert: "Un type doit avoir minimum 1 séance",
    addSession: "Ajouter une séance",
    removeSession: "Retirer la séance",
    sessionName: "Nom de la séance",
    sessionNamePlaceholder: "CTC Partie 1",
    sessionDay: "Jour de la semaine",
    sessionTime: "Heure de début",
    sessionDuration: "Durée (heures)",
    sessionContent: "Contenu",
    sessionContentPlaceholder: "Introduction sécurité routière, signalisation",

    // Days of week
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",

    // Days short
    mon: "Lu",
    tue: "Ma",
    wed: "Me",
    thu: "Je",
    fri: "Ve",
    sat: "Sa",
    sun: "Di",

    // Settings
    minParticipants: "Participants minimum",
    maxParticipants: "Participants maximum",
    waitingList: "Liste d'attente",
    waitingListHelp: "Autoriser les inscriptions au-delà de la capacité",
    defaultLocation: "Lieu par défaut",
    authorizedInstructors: "Moniteurs autorisés",
    visibleWebsite: "Visible sur le site web",

    // Actions
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    duplicate: "Dupliquer",

    // Messages
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce type de cours ?",
    deleteWarning: "Cette action est irréversible.",
    saveSuccess: "Type de cours enregistré avec succès",
    deleteSuccess: "Type de cours supprimé avec succès",
    duplicateSuccess: "Type de cours dupliqué avec succès",

    // Validation
    nameRequired: "Le nom est requis",
    sessionsRequired: "Au moins une séance est requise",
    sessionNameRequired: "Le nom de la séance est requis",
    sessionDayRequired: "Le jour est requis",
    sessionTimeRequired: "L'heure est requise",
    sessionDurationRequired: "La durée est requise",
    participantsInvalid: "Le minimum doit être inférieur au maximum",

    // Format display
    formatDisplay: "{count} × {duration}h",
    sessionsCount: "+{count} séances",
  },
  de: {
    title: "Kurstypen",
    subtitle: "Definieren Sie die Formate: Woche, Wochenende, Intensiv...",
    newType: "Neuer Typ",
    editType: "Typ bearbeiten",
    deleteType: "Typ löschen",
    duplicateType: "Typ duplizieren",

    name: "Typname",
    format: "Format",
    days: "Tage",
    schedule: "Zeit",
    price: "Preis",
    sessions: "Sitzungen",
    participants: "Teilnehmer",
    active: "Aktiv",
    order: "Reihenfolge",
    actions: "Aktionen",

    tabInformation: "Informationen",
    tabSessions: "Sitzungen",
    tabSettings: "Einstellungen",

    typeName: "Typname",
    typeNamePlaceholder: "Abendkurs Woche",
    description: "Beschreibung",
    descriptionPlaceholder: "Schulung über 4 aufeinanderfolgende Abende",
    priceLabel: "Preis (CHF)",
    pricePlaceholder: "450",
    priceInherit: "Von Kategorie geerbt",
    activeLabel: "Typ aktiv",

    sessionsTitle: "Kursstruktur",
    sessionsAlert: "Ein Typ muss mindestens 1 Sitzung haben",
    addSession: "Sitzung hinzufügen",
    removeSession: "Sitzung entfernen",
    sessionName: "Sitzungsname",
    sessionNamePlaceholder: "VKU Teil 1",
    sessionDay: "Wochentag",
    sessionTime: "Startzeit",
    sessionDuration: "Dauer (Stunden)",
    sessionContent: "Inhalt",
    sessionContentPlaceholder: "Einführung Verkehrssicherheit, Signalisation",

    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",

    mon: "Mo",
    tue: "Di",
    wed: "Mi",
    thu: "Do",
    fri: "Fr",
    sat: "Sa",
    sun: "So",

    minParticipants: "Mindestteilnehmer",
    maxParticipants: "Maximale Teilnehmer",
    waitingList: "Warteliste",
    waitingListHelp: "Anmeldungen über Kapazität hinaus zulassen",
    defaultLocation: "Standardort",
    authorizedInstructors: "Autorisierte Lehrer",
    visibleWebsite: "Auf Website sichtbar",

    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    duplicate: "Duplizieren",

    formatDisplay: "{count} × {duration}h",
    sessionsCount: "+{count} Sitzungen",
  },
  it: {
    title: "Tipi di corso",
    subtitle: "Definisci i formati: settimana, weekend, intensivo...",
    newType: "Nuovo tipo",

    name: "Nome tipo",
    format: "Formato",
    days: "Giorni",
    schedule: "Orario",
    price: "Prezzo",
    sessions: "Sessioni",

    monday: "Lunedì",
    tuesday: "Martedì",
    wednesday: "Mercoledì",
    thursday: "Giovedì",
    friday: "Venerdì",
    saturday: "Sabato",
    sunday: "Domenica",

    mon: "Lu",
    tue: "Ma",
    wed: "Me",
    thu: "Gi",
    fri: "Ve",
    sat: "Sa",
    sun: "Do",
  },
  en: {
    title: "Course Types",
    subtitle: "Define formats: week, weekend, intensive...",
    newType: "New Type",

    name: "Type Name",
    format: "Format",
    days: "Days",
    schedule: "Schedule",
    price: "Price",
    sessions: "Sessions",

    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockCourseTypes: CourseType[] = [
  {
    id: "type-1",
    categoryId: "cat-1", // CTC
    name: "Cours semaine soir",
    description: "Formation répartie sur 4 soirées consécutives",
    sessions: [
      {
        id: "session-1-1",
        name: "CTC Partie 1",
        dayOfWeek: "monday",
        startTime: "18:30",
        duration: 2,
        content: "Introduction sécurité routière, signalisation",
        order: 1,
      },
      {
        id: "session-1-2",
        name: "CTC Partie 2",
        dayOfWeek: "tuesday",
        startTime: "18:30",
        duration: 2,
        content: "Règles de circulation, priorités",
        order: 2,
      },
      {
        id: "session-1-3",
        name: "CTC Partie 3",
        dayOfWeek: "wednesday",
        startTime: "18:30",
        duration: 2,
        content: "Conduite défensive, distances",
        order: 3,
      },
      {
        id: "session-1-4",
        name: "CTC Partie 4",
        dayOfWeek: "thursday",
        startTime: "18:30",
        duration: 2,
        content: "Situations d'urgence, révision",
        order: 4,
      },
    ],

    price: 450,
    minParticipants: 8,
    maxParticipants: 24,
    waitingListEnabled: true,
    visibleOnWebsite: true,
    active: true,
    order: 1,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type-2",
    categoryId: "cat-1", // CTC
    name: "Cours weekend intensif",
    description: "Formation intensive sur un weekend",
    sessions: [
      {
        id: "session-2-1",
        name: "CTC Samedi",
        dayOfWeek: "saturday",
        startTime: "09:00",
        duration: 4,
        content: "Théorie complète partie 1 et 2",
        order: 1,
      },
      {
        id: "session-2-2",
        name: "CTC Dimanche",
        dayOfWeek: "sunday",
        startTime: "09:00",
        duration: 4,
        content: "Théorie complète partie 3 et 4",
        order: 2,
      },
    ],

    price: 480,
    minParticipants: 10,
    maxParticipants: 20,
    waitingListEnabled: true,
    visibleOnWebsite: true,
    active: true,
    order: 2,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type-3",
    categoryId: "cat-2", // Premier Secours
    name: "PS Standard",
    description: "Formation premiers secours répartie sur 5 soirées",
    sessions: [
      {
        id: "session-3-1",
        name: "PS Partie 1",
        dayOfWeek: "monday",
        startTime: "19:00",
        duration: 2,
        content: "Bases premiers secours",
        order: 1,
      },
      {
        id: "session-3-2",
        name: "PS Partie 2",
        dayOfWeek: "wednesday",
        startTime: "19:00",
        duration: 2,
        content: "Réanimation cardio-pulmonaire",
        order: 2,
      },
      {
        id: "session-3-3",
        name: "PS Partie 3",
        dayOfWeek: "friday",
        startTime: "19:00",
        duration: 2,
        content: "Traumatismes et blessures",
        order: 3,
      },
      {
        id: "session-3-4",
        name: "PS Partie 4",
        dayOfWeek: "monday",
        startTime: "19:00",
        duration: 2,
        content: "Situations d'urgence",
        order: 4,
      },
      {
        id: "session-3-5",
        name: "PS Partie 5",
        dayOfWeek: "wednesday",
        startTime: "19:00",
        duration: 2,
        content: "Examen pratique",
        order: 5,
      },
    ],

    minParticipants: 6,
    maxParticipants: 16,
    waitingListEnabled: false,
    visibleOnWebsite: true,
    active: true,
    order: 1,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type-4",
    categoryId: "cat-3", // Sensibilisation
    name: "SENS Semaine",
    description: "Cours de sensibilisation sur 4 soirées",
    sessions: [
      {
        id: "session-4-1",
        name: "SENS Partie 1",
        dayOfWeek: "tuesday",
        startTime: "18:00",
        duration: 2,
        content: "Perception des dangers",
        order: 1,
      },
      {
        id: "session-4-2",
        name: "SENS Partie 2",
        dayOfWeek: "thursday",
        startTime: "18:00",
        duration: 2,
        content: "Conduite écologique",
        order: 2,
      },
      {
        id: "session-4-3",
        name: "SENS Partie 3",
        dayOfWeek: "tuesday",
        startTime: "18:00",
        duration: 2,
        content: "Tactiques de sécurité",
        order: 3,
      },
      {
        id: "session-4-4",
        name: "SENS Partie 4",
        dayOfWeek: "thursday",
        startTime: "18:00",
        duration: 2,
        content: "Situations complexes",
        order: 4,
      },
    ],

    minParticipants: 8,
    maxParticipants: 20,
    waitingListEnabled: true,
    visibleOnWebsite: true,
    active: true,
    order: 1,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];
