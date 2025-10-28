/**
 * VIAMENTOR - Instructor Planning Data
 * Mock data et types pour planning moniteur avec disponibilités et sync externe
 */

// ============================================================================
// TYPES
// ============================================================================

export type PlanningLocale = "fr" | "de" | "it" | "en";

export type EventType = "lesson" | "availability" | "personal" | "break";
export type LessonStatus =
  | "confirmed"
  | "tentative"
  | "cancelled"
  | "completed";
export type Category = "B" | "A" | "A1" | "BE" | "C" | "D";
export type ViewType = "month" | "week" | "day" | "agenda";
export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface TimeRange {
  start: string; // HH:mm format
  end: string;
}

export interface CalendarEvent {
  id: string;
  type: EventType;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;

  // Lesson specific
  studentId?: string;
  studentName?: string;
  studentAvatar?: string;
  category?: Category;
  vehicleId?: string;
  vehicleName?: string;
  meetingAddress?: string;
  objectives?: string[];
  status?: LessonStatus;

  // Availability specific
  isBookable?: boolean;
  customLabel?: string;

  // Personal event specific
  reason?: string;
  isPrivate?: boolean;

  // Common
  notes?: string;
  color?: string;
  borderStyle?: "solid" | "dashed" | "dotted";
}

export interface WeeklyTemplateDay {
  day: DayOfWeek;
  isAvailable: boolean;
  morningSlot?: TimeRange;
  afternoonSlot?: TimeRange;
  lunchBreak?: TimeRange;
}

export interface DateOverride {
  id: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // For ranges
  isUnavailable: boolean;
  customSlots?: TimeRange[];
  reason?: string;
  notifyAdmin: boolean;
  createdAt: string;
}

export interface ExternalCalendarSync {
  id: string;
  provider: "google" | "outlook" | "apple";
  email: string;
  isConnected: boolean;
  selectedCalendars: string[];
  importAsUnavailable: boolean;
  exportLessons: boolean;
  lastSync?: string;
  syncStatus: "idle" | "syncing" | "error";
  errorMessage?: string;
}

export interface NotificationPreferences {
  newLessonBooked: boolean;
  lessonModified: boolean;
  reminderHoursBefore: number;
  conflictsDetected: boolean;
  availabilityAlmostFull: boolean;
}

export interface ConflictDetection {
  hasConflict: boolean;
  conflicts: {
    eventId: string;
    eventTitle: string;
    date: string;
    time: string;
    type: EventType;
  }[];
  suggestions: {
    date: string;
    slots: TimeRange[];
  }[];
}

export interface InstructorPlanning {
  instructorId: string;
  instructorName: string;
  events: CalendarEvent[];
  weeklyTemplate: WeeklyTemplateDay[];
  dateOverrides: DateOverride[];
  externalSyncs: ExternalCalendarSync[];
  notificationPrefs: NotificationPreferences;
  iCalToken: string;
  workingHours: {
    start: string;
    end: string;
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockWeeklyTemplate: WeeklyTemplateDay[] = [
  {
    day: "monday",
    isAvailable: true,
    morningSlot: { start: "08:00", end: "12:00" },
    afternoonSlot: { start: "13:00", end: "18:00" },
    lunchBreak: { start: "12:00", end: "13:00" },
  },
  {
    day: "tuesday",
    isAvailable: true,
    morningSlot: { start: "08:00", end: "12:00" },
    afternoonSlot: { start: "13:00", end: "18:00" },
    lunchBreak: { start: "12:00", end: "13:00" },
  },
  {
    day: "wednesday",
    isAvailable: true,
    morningSlot: { start: "08:00", end: "12:00" },
    afternoonSlot: { start: "14:00", end: "18:00" },
    lunchBreak: { start: "12:00", end: "14:00" },
  },
  {
    day: "thursday",
    isAvailable: true,
    morningSlot: { start: "08:00", end: "12:00" },
    afternoonSlot: { start: "13:00", end: "18:00" },
    lunchBreak: { start: "12:00", end: "13:00" },
  },
  {
    day: "friday",
    isAvailable: true,
    morningSlot: { start: "08:00", end: "12:00" },
    afternoonSlot: { start: "13:00", end: "17:00" },
    lunchBreak: { start: "12:00", end: "13:00" },
  },
  {
    day: "saturday",
    isAvailable: true,
    morningSlot: { start: "09:00", end: "12:00" },
    afternoonSlot: { start: "13:00", end: "16:00" },
    lunchBreak: { start: "12:00", end: "13:00" },
  },
  {
    day: "sunday",
    isAvailable: false,
  },
];

export const mockDateOverrides: DateOverride[] = [
  {
    id: "ov1",
    date: "2025-01-15",
    isUnavailable: true,
    reason: "Formation continue OMCo",
    notifyAdmin: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "ov2",
    date: "2025-02-10",
    endDate: "2025-02-16",
    isUnavailable: true,
    reason: "Vacances d'hiver",
    notifyAdmin: true,
    createdAt: "2024-12-15T14:30:00Z",
  },
  {
    id: "ov3",
    date: "2025-01-20",
    isUnavailable: false,
    customSlots: [{ start: "14:00", end: "18:00" }],

    reason: "RDV médecin matin",
    notifyAdmin: false,
    createdAt: "2025-01-10T09:15:00Z",
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  // Lessons
  {
    id: "evt1",
    type: "lesson",
    title: "09:00 - Sophie Martin - B",
    start: new Date(2025, 0, 13, 9, 0),
    end: new Date(2025, 0, 13, 10, 30),
    studentId: "std1",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/kdrnp.png",
    category: "B",
    vehicleId: "veh1",
    vehicleName: "VW Golf - GE 12345",
    meetingAddress: "Place de la Navigation, Genève",
    objectives: ["Circulation urbaine", "Priorités"],
    status: "confirmed",
    color: "#3b82f6",
    borderStyle: "solid",
  },
  {
    id: "evt2",
    type: "lesson",
    title: "11:00 - Lucas Dubois - A",
    start: new Date(2025, 0, 13, 11, 0),
    end: new Date(2025, 0, 13, 11, 45),
    studentId: "std2",
    studentName: "Lucas Dubois",
    studentAvatar: "https://github.com/yusufhilmi.png",
    category: "A",
    vehicleId: "veh5",
    vehicleName: "Honda CB500 - GE 98765",
    meetingAddress: "Auto-école, Rue du Commerce 15",
    objectives: ["Manœuvres lentes", "Équilibre"],
    status: "confirmed",
    color: "#f97316",
    borderStyle: "solid",
  },
  {
    id: "evt3",
    type: "lesson",
    title: "14:00 - Emma Rousseau - B",
    start: new Date(2025, 0, 13, 14, 0),
    end: new Date(2025, 0, 13, 15, 30),
    studentId: "std3",
    studentName: "Emma Rousseau",
    studentAvatar: "https://github.com/shoaibux1.png",
    category: "B",
    vehicleId: "veh1",
    vehicleName: "VW Golf - GE 12345",
    meetingAddress: "Gare Cornavin, Genève",
    objectives: ["Autoroute", "Dépassements"],
    status: "tentative",
    color: "#3b82f6",
    borderStyle: "dashed",
  },
  // Availability slots
  {
    id: "avail1",
    type: "availability",
    title: "Disponible",
    start: new Date(2025, 0, 14, 9, 0),
    end: new Date(2025, 0, 14, 12, 0),
    isBookable: true,
    color: "#10b981",
    borderStyle: "solid",
  },
  {
    id: "avail2",
    type: "availability",
    title: "Disponible",
    start: new Date(2025, 0, 14, 14, 0),
    end: new Date(2025, 0, 14, 18, 0),
    isBookable: true,
    color: "#10b981",
    borderStyle: "solid",
  },
  // Personal events
  {
    id: "pers1",
    type: "personal",
    title: "RDV médecin",
    start: new Date(2025, 0, 15, 10, 0),
    end: new Date(2025, 0, 15, 11, 0),
    reason: "Contrôle annuel",
    isPrivate: true,
    color: "#6b7280",
    borderStyle: "solid",
  },
  // Lunch breaks
  {
    id: "break1",
    type: "break",
    title: "Pause déjeuner",
    start: new Date(2025, 0, 13, 12, 0),
    end: new Date(2025, 0, 13, 13, 0),
    color: "#94a3b8",
    borderStyle: "solid",
  },
];

export const mockExternalSyncs: ExternalCalendarSync[] = [
  {
    id: "sync1",
    provider: "google",
    email: "marc.dubois@gmail.com",
    isConnected: true,
    selectedCalendars: ["primary", "work"],
    importAsUnavailable: true,
    exportLessons: true,
    lastSync: "2025-01-13T08:30:00Z",
    syncStatus: "idle",
  },
];

export const mockNotificationPrefs: NotificationPreferences = {
  newLessonBooked: true,
  lessonModified: true,
  reminderHoursBefore: 2,
  conflictsDetected: true,
  availabilityAlmostFull: true,
};

export const mockInstructorPlanning: InstructorPlanning = {
  instructorId: "inst1",
  instructorName: "Marc Dubois",
  events: mockCalendarEvents,
  weeklyTemplate: mockWeeklyTemplate,
  dateOverrides: mockDateOverrides,
  externalSyncs: mockExternalSyncs,
  notificationPrefs: mockNotificationPrefs,
  iCalToken: "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
  workingHours: {
    start: "07:00",
    end: "22:00",
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getCategoryColor(category: Category): string {
  const colors: Record<Category, string> = {
    B: "#3b82f6", // blue
    A: "#f97316", // orange
    A1: "#f59e0b", // amber
    BE: "#10b981", // green
    C: "#8b5cf6", // purple
    D: "#ec4899", // pink
  };
  return colors[category];
}

export function getEventTypeColor(type: EventType): string {
  const colors: Record<EventType, string> = {
    lesson: "#3b82f6",
    availability: "#10b981",
    personal: "#6b7280",
    break: "#94a3b8",
  };
  return colors[type];
}

export function getStatusBorderStyle(
  status: LessonStatus
): "solid" | "dashed" | "dotted" {
  const styles: Record<LessonStatus, "solid" | "dashed" | "dotted"> = {
    confirmed: "solid",
    tentative: "dashed",
    cancelled: "dotted",
    completed: "solid",
  };
  return styles[status];
}

export function formatTimeRange(start: string, end: string): string {
  return `${start} - ${end}`;
}

export function getDayName(day: DayOfWeek, locale: PlanningLocale): string {
  const names: Record<PlanningLocale, Record<DayOfWeek, string>> = {
    fr: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
    de: {
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
    },
    it: {
      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
      sunday: "Domenica",
    },
    en: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
  };
  return names[locale][day];
}

export function detectConflicts(
  newEvent: Partial<CalendarEvent>,
  existingEvents: CalendarEvent[]
): ConflictDetection {
  if (!newEvent.start || !newEvent.end) {
    return { hasConflict: false, conflicts: [], suggestions: [] };
  }

  const conflicts = existingEvents.filter((event) => {
    // Check if events overlap
    return (
      (newEvent.start! >= event.start && newEvent.start! < event.end) ||
      (newEvent.end! > event.start && newEvent.end! <= event.end) ||
      (newEvent.start! <= event.start && newEvent.end! >= event.end)
    );
  });

  return {
    hasConflict: conflicts.length > 0,
    conflicts: conflicts.map((c) => ({
      eventId: c.id,
      eventTitle: c.title,
      date: c.start.toLocaleDateString(),
      time: c.start.toLocaleTimeString(),
      type: c.type,
    })),
    suggestions: [], // Would be calculated based on available slots
  };
}
