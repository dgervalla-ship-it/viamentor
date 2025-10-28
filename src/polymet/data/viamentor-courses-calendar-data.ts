/**
 * VIAMENTOR - Courses Calendar Data
 * Mock data et types TypeScript pour calendrier cours théoriques
 */

// ============================================================================
// TYPES
// ============================================================================

export type CalendarView = "month" | "week" | "day" | "agenda";

export type CalendarLocale = "fr" | "de" | "it" | "en";

export interface CalendarEvent {
  id: string;
  courseTypeId: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  title: string;
  description?: string;
  startDate: string; // ISO date
  startTime: string; // HH:mm
  duration: number; // hours
  location?: string;
  instructorId?: string;
  instructorName?: string;
  instructorAvatar?: string;
  capacity: number;
  enrolled: number;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

export interface CalendarFilters {
  categories: string[];
  instructorId?: string;
  hideFullCourses: boolean;
  showPastCourses: boolean;
  searchKeyword: string;
}

export interface CalendarInstructor {
  id: string;
  name: string;
  avatar?: string;
}

// ============================================================================
// MOCK DATA - INSTRUCTORS
// ============================================================================

export const mockCalendarInstructors: CalendarInstructor[] = [
  {
    id: "inst-1",
    name: "Jean Dupont",
    avatar: "https://github.com/yusufhilmi.png",
  },
  {
    id: "inst-2",
    name: "Marie Martin",
    avatar: "https://github.com/kdrnp.png",
  },
  {
    id: "inst-3",
    name: "Pierre Bernard",
    avatar: "https://github.com/yahyabedirhan.png",
  },
];

// ============================================================================
// MOCK DATA - CALENDAR EVENTS
// ============================================================================

export const mockCalendarEvents: CalendarEvent[] = [
  // CTC - Octobre 2025
  {
    id: "evt-1",
    courseTypeId: "type-1",
    categoryId: "cat-1",
    categoryName: "CTC",
    categoryColor: "#FFC107",
    title: "CTC Partie 1",
    description: "Introduction sécurité routière",
    startDate: "2025-10-16",
    startTime: "18:30",
    duration: 2,
    location: "Salle A",
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    capacity: 24,
    enrolled: 18,
    status: "scheduled",
  },
  {
    id: "evt-2",
    courseTypeId: "type-1",
    categoryId: "cat-1",
    categoryName: "CTC",
    categoryColor: "#FFC107",
    title: "CTC Partie 2",
    description: "Signalisation routière",
    startDate: "2025-10-17",
    startTime: "18:30",
    duration: 2,
    location: "Salle A",
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    capacity: 24,
    enrolled: 18,
    status: "scheduled",
  },
  {
    id: "evt-3",
    courseTypeId: "type-2",
    categoryId: "cat-1",
    categoryName: "CTC",
    categoryColor: "#FFC107",
    title: "CTC Weekend Intensif",
    description: "Formation intensive 2 jours",
    startDate: "2025-10-18",
    startTime: "09:00",
    duration: 4,
    location: "Salle B",
    instructorId: "inst-2",
    instructorName: "Marie Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    capacity: 20,
    enrolled: 20,
    status: "scheduled",
  },
  {
    id: "evt-4",
    courseTypeId: "type-2",
    categoryId: "cat-1",
    categoryName: "CTC",
    categoryColor: "#FFC107",
    title: "CTC Weekend Intensif",
    description: "Formation intensive 2 jours",
    startDate: "2025-10-19",
    startTime: "09:00",
    duration: 4,
    location: "Salle B",
    instructorId: "inst-2",
    instructorName: "Marie Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    capacity: 20,
    enrolled: 20,
    status: "scheduled",
  },

  // Premier Secours - Octobre 2025
  {
    id: "evt-5",
    courseTypeId: "type-3",
    categoryId: "cat-2",
    categoryName: "Premier Secours",
    categoryColor: "#F44336",
    title: "PS Standard Partie 1",
    description: "Gestes de premiers secours",
    startDate: "2025-10-20",
    startTime: "19:00",
    duration: 2,
    location: "Salle C",
    instructorId: "inst-3",
    instructorName: "Pierre Bernard",
    instructorAvatar: "https://github.com/yahyabedirhan.png",
    capacity: 16,
    enrolled: 12,
    status: "scheduled",
  },
  {
    id: "evt-6",
    courseTypeId: "type-3",
    categoryId: "cat-2",
    categoryName: "Premier Secours",
    categoryColor: "#F44336",
    title: "PS Standard Partie 2",
    description: "Gestes de premiers secours",
    startDate: "2025-10-22",
    startTime: "19:00",
    duration: 2,
    location: "Salle C",
    instructorId: "inst-3",
    instructorName: "Pierre Bernard",
    instructorAvatar: "https://github.com/yahyabedirhan.png",
    capacity: 16,
    enrolled: 12,
    status: "scheduled",
  },

  // Sensibilisation - Octobre 2025
  {
    id: "evt-7",
    courseTypeId: "type-4",
    categoryId: "cat-3",
    categoryName: "Sensibilisation",
    categoryColor: "#4CAF50",
    title: "SENS Semaine Partie 1",
    description: "Sensibilisation sécurité",
    startDate: "2025-10-21",
    startTime: "18:00",
    duration: 2,
    location: "Salle A",
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    capacity: 24,
    enrolled: 15,
    status: "scheduled",
  },
  {
    id: "evt-8",
    courseTypeId: "type-4",
    categoryId: "cat-3",
    categoryName: "Sensibilisation",
    categoryColor: "#4CAF50",
    title: "SENS Semaine Partie 2",
    description: "Sensibilisation sécurité",
    startDate: "2025-10-23",
    startTime: "18:00",
    duration: 2,
    location: "Salle A",
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    capacity: 24,
    enrolled: 15,
    status: "scheduled",
  },

  // Novembre 2025
  {
    id: "evt-9",
    courseTypeId: "type-1",
    categoryId: "cat-1",
    categoryName: "CTC",
    categoryColor: "#FFC107",
    title: "CTC Partie 1",
    description: "Introduction sécurité routière",
    startDate: "2025-11-03",
    startTime: "18:30",
    duration: 2,
    location: "Salle A",
    instructorId: "inst-2",
    instructorName: "Marie Martin",
    instructorAvatar: "https://github.com/kdrnp.png",
    capacity: 24,
    enrolled: 8,
    status: "scheduled",
  },
];

// ============================================================================
// I18N TRANSLATIONS
// ============================================================================

export const calendarI18n = {
  fr: {
    title: "Calendrier des cours",
    breadcrumb: {
      school: "École",
      theoryCourses: "Cours théoriques",
      calendar: "Calendrier",
    },
    filters: {
      title: "Filtres",
      categories: "Catégories",
      allCategories: "Toutes les catégories",
      instructor: "Moniteur",
      allInstructors: "Tous les moniteurs",
      hideFull: "Masquer cours complets",
      showPast: "Afficher cours passés",
      search: "Rechercher...",
      reset: "Réinitialiser",
    },
    views: {
      month: "Mois",
      week: "Semaine",
      day: "Jour",
      agenda: "Agenda",
    },
    navigation: {
      today: "Aujourd'hui",
      previous: "Précédent",
      next: "Suivant",
    },
    legend: {
      title: "Légende",
    },
    event: {
      capacity: "{{enrolled}}/{{capacity}} places",
      full: "Complet",
      available: "{{available}} places",
      instructor: "Moniteur",
      location: "Lieu",
      duration: "{{duration}}h",
    },
    empty: {
      title: "Aucun cours planifié",
      description: "Créez votre premier cours théorique",
      action: "Nouveau cours",
    },
  },
  de: {
    title: "Kurskalender",
    breadcrumb: {
      school: "Schule",
      theoryCourses: "Theoriekurse",
      calendar: "Kalender",
    },
    filters: {
      title: "Filter",
      categories: "Kategorien",
      allCategories: "Alle Kategorien",
      instructor: "Fahrlehrer",
      allInstructors: "Alle Fahrlehrer",
      hideFull: "Volle Kurse ausblenden",
      showPast: "Vergangene Kurse anzeigen",
      search: "Suchen...",
      reset: "Zurücksetzen",
    },
    views: {
      month: "Monat",
      week: "Woche",
      day: "Tag",
      agenda: "Agenda",
    },
    navigation: {
      today: "Heute",
      previous: "Zurück",
      next: "Weiter",
    },
    legend: {
      title: "Legende",
    },
    event: {
      capacity: "{{enrolled}}/{{capacity}} Plätze",
      full: "Ausgebucht",
      available: "{{available}} Plätze",
      instructor: "Fahrlehrer",
      location: "Ort",
      duration: "{{duration}}h",
    },
    empty: {
      title: "Keine Kurse geplant",
      description: "Erstellen Sie Ihren ersten Theoriekurs",
      action: "Neuer Kurs",
    },
  },
  it: {
    title: "Calendario corsi",
    breadcrumb: {
      school: "Scuola",
      theoryCourses: "Corsi teorici",
      calendar: "Calendario",
    },
    filters: {
      title: "Filtri",
      categories: "Categorie",
      allCategories: "Tutte le categorie",
      instructor: "Istruttore",
      allInstructors: "Tutti gli istruttori",
      hideFull: "Nascondi corsi completi",
      showPast: "Mostra corsi passati",
      search: "Cerca...",
      reset: "Reimposta",
    },
    views: {
      month: "Mese",
      week: "Settimana",
      day: "Giorno",
      agenda: "Agenda",
    },
    navigation: {
      today: "Oggi",
      previous: "Precedente",
      next: "Successivo",
    },
    legend: {
      title: "Legenda",
    },
    event: {
      capacity: "{{enrolled}}/{{capacity}} posti",
      full: "Completo",
      available: "{{available}} posti",
      instructor: "Istruttore",
      location: "Luogo",
      duration: "{{duration}}h",
    },
    empty: {
      title: "Nessun corso pianificato",
      description: "Crea il tuo primo corso teorico",
      action: "Nuovo corso",
    },
  },
  en: {
    title: "Course Calendar",
    breadcrumb: {
      school: "School",
      theoryCourses: "Theory Courses",
      calendar: "Calendar",
    },
    filters: {
      title: "Filters",
      categories: "Categories",
      allCategories: "All categories",
      instructor: "Instructor",
      allInstructors: "All instructors",
      hideFull: "Hide full courses",
      showPast: "Show past courses",
      search: "Search...",
      reset: "Reset",
    },
    views: {
      month: "Month",
      week: "Week",
      day: "Day",
      agenda: "Agenda",
    },
    navigation: {
      today: "Today",
      previous: "Previous",
      next: "Next",
    },
    legend: {
      title: "Legend",
    },
    event: {
      capacity: "{{enrolled}}/{{capacity}} seats",
      full: "Full",
      available: "{{available}} seats",
      instructor: "Instructor",
      location: "Location",
      duration: "{{duration}}h",
    },
    empty: {
      title: "No courses scheduled",
      description: "Create your first theory course",
      action: "New course",
    },
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function filterCalendarEvents(
  events: CalendarEvent[],
  filters: CalendarFilters
): CalendarEvent[] {
  return events.filter((event) => {
    // Filter by categories
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(event.categoryId)
    ) {
      return false;
    }

    // Filter by instructor
    if (filters.instructorId && event.instructorId !== filters.instructorId) {
      return false;
    }

    // Filter full courses
    if (filters.hideFullCourses && event.enrolled >= event.capacity) {
      return false;
    }

    // Filter past courses
    if (!filters.showPastCourses) {
      const eventDate = new Date(event.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        return false;
      }
    }

    // Filter by search keyword
    if (filters.searchKeyword) {
      const keyword = filters.searchKeyword.toLowerCase();
      const searchableText =
        `${event.title} ${event.description} ${event.location} ${event.instructorName}`.toLowerCase();
      if (!searchableText.includes(keyword)) {
        return false;
      }
    }

    return true;
  });
}

export function getEventEndTime(startTime: string, duration: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const endHours = hours + Math.floor(duration);
  const endMinutes = minutes + (duration % 1) * 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}

export function isEventFull(event: CalendarEvent): boolean {
  return event.enrolled >= event.capacity;
}

export function getAvailableSeats(event: CalendarEvent): number {
  return Math.max(0, event.capacity - event.enrolled);
}
