/**
 * VIAMENTOR - Instructors Availability Data
 * Mock data pour calendrier disponibilités, créneaux horaires et statistiques performance
 */

export type TimeSlotStatus = "available" | "busy" | "blocked";
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TimeSlot {
  instructorId: string;
  date: string; // ISO date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: TimeSlotStatus;
  lessonId?: string;
  studentName?: string;
}

export interface WeekAvailability {
  instructorId: string;
  weekStart: string; // ISO date
  slots: TimeSlot[];
}

export interface PerformanceStats {
  instructorId: string;
  instructorName: string;
  avatar: string;
  monthLessons: number;
  monthHours: number;
  averageRating: number;
  studentsCount: number;
  completionRate: number; // %
  punctualityRate: number; // %
  cancellationRate: number; // %
}

export interface BulkMessageTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

// Time slots configuration
export const TIME_SLOTS_CONFIG = {
  startHour: 8,
  endHour: 20,
  slotDuration: 30, // minutes
};

// Generate time slots for a day
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (
    let hour = TIME_SLOTS_CONFIG.startHour;
    hour < TIME_SLOTS_CONFIG.endHour;
    hour++
  ) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

// Get week dates from start date
export function getWeekDates(startDate: Date): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
}

// Mock availability data
export const MOCK_AVAILABILITY_SLOTS: TimeSlot[] = [
  // Marc Dubois - Lundi
  {
    instructorId: "inst-1",
    date: "2025-01-20",
    startTime: "08:00",
    endTime: "08:30",
    status: "available",
  },
  {
    instructorId: "inst-1",
    date: "2025-01-20",
    startTime: "09:00",
    endTime: "09:30",
    status: "busy",
    lessonId: "lesson-1",
    studentName: "Sophie Martin",
  },
  {
    instructorId: "inst-1",
    date: "2025-01-20",
    startTime: "14:00",
    endTime: "14:30",
    status: "available",
  },
  {
    instructorId: "inst-1",
    date: "2025-01-20",
    startTime: "16:00",
    endTime: "16:30",
    status: "blocked",
  },
  // Sophie Weber - Mardi
  {
    instructorId: "inst-2",
    date: "2025-01-21",
    startTime: "10:00",
    endTime: "10:30",
    status: "available",
  },
  {
    instructorId: "inst-2",
    date: "2025-01-21",
    startTime: "11:00",
    endTime: "11:30",
    status: "busy",
    lessonId: "lesson-2",
    studentName: "Lucas Bernard",
  },
];

// Mock performance stats
export const MOCK_PERFORMANCE_STATS: PerformanceStats[] = [
  {
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    monthLessons: 87,
    monthHours: 130.5,
    averageRating: 4.9,
    studentsCount: 12,
    completionRate: 98,
    punctualityRate: 99,
    cancellationRate: 2,
  },
  {
    instructorId: "inst-2",
    instructorName: "Sophie Weber",
    avatar: "https://github.com/kdrnp.png",
    monthLessons: 76,
    monthHours: 114,
    averageRating: 4.8,
    studentsCount: 10,
    completionRate: 96,
    punctualityRate: 97,
    cancellationRate: 4,
  },
  {
    instructorId: "inst-3",
    instructorName: "Thomas Müller",
    avatar: "https://github.com/yahyabedirhan.png",
    monthLessons: 65,
    monthHours: 97.5,
    averageRating: 4.7,
    studentsCount: 9,
    completionRate: 94,
    punctualityRate: 95,
    cancellationRate: 6,
  },
  {
    instructorId: "inst-4",
    instructorName: "Laura Rossi",
    avatar: "https://github.com/denizbuyuktas.png",
    monthLessons: 54,
    monthHours: 81,
    averageRating: 4.6,
    studentsCount: 8,
    completionRate: 92,
    punctualityRate: 94,
    cancellationRate: 8,
  },
];

// Bulk message templates
export const MOCK_MESSAGE_TEMPLATES: BulkMessageTemplate[] = [
  {
    id: "template-1",
    name: "Rappel planning semaine",
    subject: "Planning de la semaine du {date}",
    body: "Bonjour {prenom},\n\nVoici votre planning pour la semaine du {date}.\n\nCordialement,\nL'équipe Viamentor",
  },
  {
    id: "template-2",
    name: "Demande disponibilités",
    subject: "Mise à jour de vos disponibilités",
    body: "Bonjour {prenom},\n\nMerci de mettre à jour vos disponibilités pour le mois prochain.\n\nCordialement,\nL'équipe Viamentor",
  },
  {
    id: "template-3",
    name: "Information importante",
    subject: "Information importante",
    body: "Bonjour {prenom},\n\n[Votre message ici]\n\nCordialement,\nL'équipe Viamentor",
  },
];

// Helper functions
export function getStatusColor(status: TimeSlotStatus): string {
  switch (status) {
    case "available":
      return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
    case "busy":
      return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700";
    case "blocked":
      return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700";
  }
}

export function getTopPerformer(
  stats: PerformanceStats[]
): PerformanceStats | null {
  if (stats.length === 0) return null;
  return stats.reduce((top, current) =>
    current.monthLessons > top.monthLessons ? current : top
  );
}

export function getBestRated(
  stats: PerformanceStats[]
): PerformanceStats | null {
  if (stats.length === 0) return null;
  return stats.reduce((best, current) =>
    current.averageRating > best.averageRating ? current : best
  );
}

export function formatTimeSlot(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}
