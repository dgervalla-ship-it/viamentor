/**
 * VIAMENTOR Students Data
 * Mock data pour module gestion élèves School Admin
 */

// ============================================================================
// TYPES
// ============================================================================

export type StudentCategory = "B" | "A" | "BE" | "A1" | "BPT";
export type StudentStatus =
  | "Actif"
  | "Inactif"
  | "En pause"
  | "Terminé"
  | "Abandonné"
  | "Suspendu";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  categories: StudentCategory[];
  status: StudentStatus;
  progression: number; // 0-100%
  instructorId: string | null;
  instructorName: string | null;
  nextLesson: string | null; // ISO date
  remainingLessons: number;
  financialBalance: number; // CHF (negative = owes money)
  enrollmentDate: string; // ISO date
  age: number;
  gender?: "Homme" | "Femme" | "Autre";
  hasUpcomingExam: boolean;
  examDate?: string | null;
  permitExpired?: boolean;
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  categories: StudentCategory[];
  activeStudents: number;
}

export interface StudentStats {
  total: number;
  active: number;
  activePercentage: number;
  inTraining: number;
  upcomingExams: number;
  nextExamDate: string | null;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    categories?: StudentCategory[];
    statuses?: StudentStatus[];
    instructorId?: string | null;
    progressionMin?: number;
    progressionMax?: number;
    negativeBalanceOnly?: boolean;
    permitExpired?: boolean;
    upcomingExams?: boolean;
    enrollmentDateFrom?: string;
    enrollmentDateTo?: string;
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: "inst-1",
    firstName: "Jean",
    lastName: "Dupont",
    avatar: "https://github.com/yusufhilmi.png",
    categories: ["B", "A", "BE"],
    activeStudents: 12,
  },
  {
    id: "inst-2",
    firstName: "Marie",
    lastName: "Martin",
    avatar: "https://github.com/kdrnp.png",
    categories: ["A", "A1"],
    activeStudents: 8,
  },
  {
    id: "inst-3",
    firstName: "Pierre",
    lastName: "Dubois",
    avatar: "https://github.com/yahyabedirhan.png",
    categories: ["B", "BE", "BPT"],
    activeStudents: 15,
  },
  {
    id: "inst-4",
    firstName: "Sophie",
    lastName: "Bernard",
    avatar: "https://github.com/denizbuyuktas.png",
    categories: ["B", "A"],
    activeStudents: 10,
  },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "std-1",
    firstName: "Lucas",
    lastName: "Müller",
    email: "lucas.muller@example.ch",
    phone: "+41 79 123 45 67",
    avatar: "https://github.com/yusufhilmi.png",
    categories: ["B"],
    status: "Actif",
    progression: 75,
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    nextLesson: "2025-01-15T10:00:00Z",
    remainingLessons: 8,
    financialBalance: 0,
    enrollmentDate: "2024-09-01T00:00:00Z",
    age: 18,
    gender: "Homme",
    hasUpcomingExam: true,
    examDate: "2025-02-10T00:00:00Z",
    permitExpired: false,
  },
  {
    id: "std-2",
    firstName: "Emma",
    lastName: "Schmidt",
    email: "emma.schmidt@example.ch",
    phone: "+41 78 234 56 78",
    avatar: "https://github.com/kdrnp.png",
    categories: ["A", "A1"],
    status: "Actif",
    progression: 45,
    instructorId: "inst-2",
    instructorName: "Marie Martin",
    nextLesson: "2025-01-14T14:00:00Z",
    remainingLessons: 12,
    financialBalance: 150,
    enrollmentDate: "2024-10-15T00:00:00Z",
    age: 22,
    gender: "Femme",
    hasUpcomingExam: false,
    permitExpired: false,
  },
  {
    id: "std-3",
    firstName: "Noah",
    lastName: "Weber",
    email: "noah.weber@example.ch",
    phone: "+41 76 345 67 89",
    categories: ["B", "BE"],
    status: "En pause",
    progression: 30,
    instructorId: "inst-3",
    instructorName: "Pierre Dubois",
    nextLesson: null,
    remainingLessons: 2,
    financialBalance: -450,
    enrollmentDate: "2024-08-20T00:00:00Z",
    age: 19,
    gender: "Homme",
    hasUpcomingExam: false,
    permitExpired: true,
  },
  {
    id: "std-4",
    firstName: "Mia",
    lastName: "Fischer",
    email: "mia.fischer@example.ch",
    phone: "+41 77 456 78 90",
    avatar: "https://github.com/shoaibux1.png",
    categories: ["B"],
    status: "Actif",
    progression: 90,
    instructorId: "inst-1",
    instructorName: "Jean Dupont",
    nextLesson: "2025-01-14T09:00:00Z",
    remainingLessons: 3,
    financialBalance: 0,
    enrollmentDate: "2024-07-10T00:00:00Z",
    age: 20,
    gender: "Femme",
    hasUpcomingExam: true,
    examDate: "2025-01-25T00:00:00Z",
    permitExpired: false,
  },
  {
    id: "std-5",
    firstName: "Liam",
    lastName: "Meyer",
    email: "liam.meyer@example.ch",
    phone: "+41 79 567 89 01",
    categories: ["A"],
    status: "Terminé",
    progression: 100,
    instructorId: null,
    instructorName: null,
    nextLesson: null,
    remainingLessons: 0,
    financialBalance: 0,
    enrollmentDate: "2024-03-01T00:00:00Z",
    age: 25,
    gender: "Homme",
    hasUpcomingExam: false,
    permitExpired: false,
  },
];

export const MOCK_STUDENT_STATS: StudentStats = {
  total: 5,
  active: 3,
  activePercentage: 60,
  inTraining: 3,
  upcomingExams: 2,
  nextExamDate: "2025-01-25T00:00:00Z",
};

export const MOCK_FILTER_PRESETS: FilterPreset[] = [
  {
    id: "preset-1",
    name: "Élèves actifs catégorie B",
    filters: {
      categories: ["B"],
      statuses: ["Actif"],
    },
  },
  {
    id: "preset-2",
    name: "Solde négatif",
    filters: {
      negativeBalanceOnly: true,
      statuses: ["Actif", "En pause"],
    },
  },
  {
    id: "preset-3",
    name: "Examens prochains 30j",
    filters: {
      upcomingExams: true,
      statuses: ["Actif"],
    },
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function getCategoryColor(category: StudentCategory): string {
  const colors: Record<StudentCategory, string> = {
    B: "hsl(var(--chart-1))",
    A: "hsl(var(--chart-2))",
    BE: "hsl(var(--chart-3))",
    A1: "hsl(var(--chart-4))",
    BPT: "hsl(var(--chart-5))",
  };
  return colors[category];
}

export function getStatusColor(
  status: StudentStatus
): "default" | "secondary" | "destructive" {
  const colors: Record<StudentStatus, "default" | "secondary" | "destructive"> =
    {
      Actif: "default",
      Inactif: "secondary",
      "En pause": "secondary",
      Terminé: "default",
      Abandonné: "destructive",
      Suspendu: "destructive",
    };
  return colors[status];
}

export function getProgressionColor(progression: number): string {
  if (progression < 30) return "hsl(0 84.2% 60.2%)"; // red
  if (progression < 70) return "hsl(43 74% 66%)"; // orange
  return "hsl(173 58% 39%)"; // green
}

export function getRemainingLessonsColor(
  remaining: number
): "default" | "secondary" | "destructive" {
  if (remaining > 5) return "default";
  if (remaining >= 3) return "secondary";
  return "destructive";
}

export function formatPhoneNumber(phone: string): string {
  // Format: +41 XX XXX XX XX
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("41")) {
    const country = cleaned.slice(0, 2);
    const part1 = cleaned.slice(2, 4);
    const part2 = cleaned.slice(4, 7);
    const part3 = cleaned.slice(7, 9);
    const part4 = cleaned.slice(9, 11);
    return `+${country} ${part1} ${part2} ${part3} ${part4}`;
  }
  return phone;
}

export function getRelativeDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 24 && diffHours > 0) {
    return locale === "fr"
      ? "Aujourd'hui"
      : locale === "de"
        ? "Heute"
        : locale === "it"
          ? "Oggi"
          : "Today";
  }
  if (diffHours < 48 && diffHours > 0) {
    return locale === "fr"
      ? "Demain"
      : locale === "de"
        ? "Morgen"
        : locale === "it"
          ? "Domani"
          : "Tomorrow";
  }
  return date.toLocaleDateString(locale);
}
