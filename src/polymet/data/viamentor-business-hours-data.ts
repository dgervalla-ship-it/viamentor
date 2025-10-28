/**
 * VIAMENTOR - Business Hours Settings Data
 * Mock data et types pour paramètres horaires et disponibilités
 */

// ============================================================================
// TYPES
// ============================================================================

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
export type LessonDuration = 45 | 60 | 90 | number;
export type SlotGranularity = 15 | 30 | 60;
export type HolidayType = "federal" | "cantonal" | "custom";
export type ClosureReason =
  | "vacation"
  | "training"
  | "event"
  | "maintenance"
  | "other";
export type ClosureStatus = "upcoming" | "ongoing" | "past";
export type BusinessHoursLocale = "fr" | "de" | "it" | "en";

export interface TimeRange {
  start: string; // Format "HH:mm"
  end: string;
}

export interface DaySchedule {
  day: DayOfWeek;
  isOpen: boolean;
  morning?: TimeRange;
  afternoon?: TimeRange;
}

export interface LessonSlotsConfig {
  standardDuration: LessonDuration;
  customDuration?: number;
  granularity: SlotGranularity;
  allowDoubleLessons: boolean;
  minimumBreak: number; // minutes
  minimumBookingAdvance: number; // hours
  freeCancellationDelay: number; // hours
}

export interface Holiday {
  id: string;
  date: string; // ISO date
  name: string;
  type: HolidayType;
  isRecurring: boolean;
  canton?: string;
}

export interface Closure {
  id: string;
  startDate: string;
  endDate: string;
  duration: number; // days
  reason: ClosureReason;
  customReason?: string;
  description?: string;
  visibleToStudents: boolean;
  notifyStudents: boolean;
  status: ClosureStatus;
  affectedLessons: number;
  affectedStudents: string[];
  createdAt: string;
  createdBy: string;
}

export interface Exception {
  id: string;
  date: string;
  isClosed: boolean;
  customHours?: TimeRange[];
  reason: string;
  createdAt: string;
}

export interface TheoryCoursesConfig {
  sessionDuration: number; // hours
  lunchBreak: number; // minutes
  preferredDays: DayOfWeek[];
  minParticipants: number;
  maxParticipants: number;
}

export interface BusinessHoursSettings {
  openingHours: DaySchedule[];
  lessonSlots: LessonSlotsConfig;
  holidays: Holiday[];
  closures: Closure[];
  exceptions: Exception[];
  theoryCourses: TheoryCoursesConfig;
  autoImportHolidays: boolean;
  includeFederalHolidays: boolean;
  includeCantonalHolidays: boolean;
  canton: string;
  lastSync?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockOpeningHours: DaySchedule[] = [
  {
    day: "monday",
    isOpen: true,
    morning: { start: "08:00", end: "12:00" },
    afternoon: { start: "13:30", end: "18:30" },
  },
  {
    day: "tuesday",
    isOpen: true,
    morning: { start: "08:00", end: "12:00" },
    afternoon: { start: "13:30", end: "18:30" },
  },
  {
    day: "wednesday",
    isOpen: true,
    morning: { start: "08:00", end: "12:00" },
    afternoon: { start: "13:30", end: "18:30" },
  },
  {
    day: "thursday",
    isOpen: true,
    morning: { start: "08:00", end: "12:00" },
    afternoon: { start: "13:30", end: "18:30" },
  },
  {
    day: "friday",
    isOpen: true,
    morning: { start: "08:00", end: "12:00" },
    afternoon: { start: "13:30", end: "17:00" },
  },
  {
    day: "saturday",
    isOpen: true,
    morning: { start: "09:00", end: "12:00" },
    afternoon: undefined,
  },
  {
    day: "sunday",
    isOpen: false,
    morning: undefined,
    afternoon: undefined,
  },
];

export const mockLessonSlotsConfig: LessonSlotsConfig = {
  standardDuration: 45,
  granularity: 15,
  allowDoubleLessons: true,
  minimumBreak: 0,
  minimumBookingAdvance: 24,
  freeCancellationDelay: 48,
};

export const mockHolidays: Holiday[] = [
  {
    id: "h1",
    date: "2025-01-01",
    name: "Nouvel An",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h2",
    date: "2025-04-18",
    name: "Vendredi Saint",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h3",
    date: "2025-04-21",
    name: "Lundi de Pâques",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h4",
    date: "2025-05-01",
    name: "Fête du Travail",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h5",
    date: "2025-05-29",
    name: "Ascension",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h6",
    date: "2025-06-09",
    name: "Lundi de Pentecôte",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h7",
    date: "2025-08-01",
    name: "Fête Nationale",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h8",
    date: "2025-12-25",
    name: "Noël",
    type: "federal",
    isRecurring: true,
  },
  {
    id: "h9",
    date: "2025-12-26",
    name: "Saint-Étienne",
    type: "cantonal",
    isRecurring: true,
    canton: "VD",
  },
  {
    id: "h10",
    date: "2025-09-20",
    name: "Jeûne Fédéral",
    type: "cantonal",
    isRecurring: true,
    canton: "VD",
  },
];

export const mockClosures: Closure[] = [
  {
    id: "c1",
    startDate: "2025-07-15",
    endDate: "2025-08-05",
    duration: 22,
    reason: "vacation",
    description: "Fermeture estivale annuelle",
    visibleToStudents: true,
    notifyStudents: true,
    status: "upcoming",
    affectedLessons: 45,
    affectedStudents: ["s1", "s2", "s3", "s5", "s8"],
    createdAt: "2025-03-15T10:00:00Z",
    createdBy: "admin",
  },
  {
    id: "c2",
    startDate: "2025-12-23",
    endDate: "2026-01-03",
    duration: 12,
    reason: "vacation",
    description: "Vacances de fin d'année",
    visibleToStudents: true,
    notifyStudents: true,
    status: "upcoming",
    affectedLessons: 28,
    affectedStudents: ["s1", "s4", "s6"],
    createdAt: "2025-09-10T14:30:00Z",
    createdBy: "admin",
  },
  {
    id: "c3",
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    duration: 3,
    reason: "training",
    customReason: "Formation continue moniteurs",
    description: "Formation obligatoire OMCo pour tous les moniteurs",
    visibleToStudents: true,
    notifyStudents: true,
    status: "upcoming",
    affectedLessons: 12,
    affectedStudents: ["s2", "s7"],
    createdAt: "2025-04-20T09:00:00Z",
    createdBy: "admin",
  },
];

export const mockExceptions: Exception[] = [
  {
    id: "e1",
    date: "2025-05-30",
    isClosed: false,
    customHours: [{ start: "08:00", end: "13:00" }],
    reason: "Fermeture anticipée - Événement spécial",
    createdAt: "2025-05-01T10:00:00Z",
  },
  {
    id: "e2",
    date: "2025-06-14",
    isClosed: true,
    reason: "Journée portes ouvertes - École fermée",
    createdAt: "2025-05-15T14:00:00Z",
  },
];

export const mockTheoryCoursesConfig: TheoryCoursesConfig = {
  sessionDuration: 8,
  lunchBreak: 60,
  preferredDays: ["saturday", "sunday"],
  minParticipants: 5,
  maxParticipants: 12,
};

export const mockBusinessHoursSettings: BusinessHoursSettings = {
  openingHours: mockOpeningHours,
  lessonSlots: mockLessonSlotsConfig,
  holidays: mockHolidays,
  closures: mockClosures,
  exceptions: mockExceptions,
  theoryCourses: mockTheoryCoursesConfig,
  autoImportHolidays: true,
  includeFederalHolidays: true,
  includeCantonalHolidays: true,
  canton: "VD",
  lastSync: "2025-01-15T08:00:00Z",
};
