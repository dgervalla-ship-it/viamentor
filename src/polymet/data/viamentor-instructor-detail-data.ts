/**
 * VIAMENTOR - Instructor Detail Data
 *
 * Mock data pour page de détail moniteur avec types complets:
 * - Informations personnelles et qualifications
 * - Planning et disponibilités
 * - Élèves assignés
 * - Performance et reviews
 */

// ============================================================================
// TYPES
// ============================================================================

export type InstructorStatus =
  | "available"
  | "in_lesson"
  | "on_break"
  | "unavailable"
  | "suspended";

export type LicenseCategory = "A" | "A1" | "B" | "BE" | "C" | "CE" | "D" | "DE";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface InstructorDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  status: InstructorStatus;
  rating: number;
  reviewsCount: number;

  // Coordonnées
  address: {
    street: string;
    zipCode: string;
    city: string;
    canton: string;
  };
  nationality: string;
  languages: string[];

  // Qualifications
  federalLicense: {
    number: string;
    date: string;
    scan: string;
  };
  categories: LicenseCategory[];
  specialties: string[];

  // Disponibilités
  availability: {
    days: DayOfWeek[];
    timeSlots: { start: string; end: string }[];
    maxHoursPerWeek: number;
    vacations: { start: string; end: string; reason: string }[];
  };

  // Contact urgence
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  // Préférences
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    vehicles: string[];
    notes: string;
  };

  // Stats
  stats: {
    totalStudents: number;
    activeStudents: number;
    lessonsLast7Days: number;
    successRate: number;
    totalLessons: number;
    totalHours: number;
    attendanceRate: number;
  };
}

export interface InstructorLesson {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  category: LicenseCategory;
  type: "theory" | "practical" | "exam" | "evaluation";
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  vehicle: string;
  status: "scheduled" | "completed" | "cancelled" | "in_progress";
  location: string;
  notes?: string;
}

export interface AssignedStudent {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  category: LicenseCategory;
  progression: number;
  lessonsCount: number;
  lastLesson: string | null;
  nextLesson: string | null;
  rating: number;
  status: "active" | "paused" | "completed";
}

export interface InstructorReview {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
}

export interface PerformanceMetrics {
  period: string;
  lessonsCount: number;
  lessonsTrend: number;
  totalHours: number;
  attendanceRate: number;
  averageRating: number;
  lessonsPerDay: { date: string; count: number }[];
  hoursByCategory: { category: LicenseCategory; hours: number }[];
  lessonTypes: { type: string; count: number; percentage: number }[];
  ratingDistribution: { stars: number; count: number }[];
}

export interface InstructorPerformance {
  lessonsCount: number;
  lessonsTrend: number;
  totalHours: number;
  attendanceRate: number;
  averageRating: number;
  target: number;
  lessonsPerDay: { date: string; count: number }[];
  hoursByCategory: { category: string; hours: number }[];
  lessonTypes: { name: string; count: number }[];
  targetHistory: { month: string; target: number; actual: number }[];
}

export interface InstructorRanking {
  id: string;
  name: string;
  avatar: string;
  lessonsCount: number;
  rating: number;
  isCurrent: boolean;
}

export interface PerformanceGoal {
  id: string;
  metric: "lessons" | "hours" | "rating" | "students";
  target: number;
  current: number;
  period: "weekly" | "monthly" | "yearly";
  history: { date: string; value: number }[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_INSTRUCTOR_DETAIL: InstructorDetail = {
  id: "inst-001",
  firstName: "Marc",
  lastName: "Dubois",
  email: "marc.dubois@viamentor.ch",
  phone: "+41 79 123 45 67",
  avatar: "https://github.com/yusufhilmi.png",
  status: "available",
  rating: 4.8,
  reviewsCount: 127,

  address: {
    street: "Rue de la Paix 12",
    zipCode: "1000",
    city: "Lausanne",
    canton: "VD",
  },
  nationality: "Suisse",
  languages: ["fr", "de", "en"],

  federalLicense: {
    number: "CH-MON-2020-001",
    date: "2020-06-15",
    scan: "scan-url-here",
  },
  categories: ["B", "BE", "A", "A1"],
  specialties: ["urban", "highway", "eco_driving"],

  availability: {
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    timeSlots: [
      { start: "08:00", end: "12:00" },
      { start: "14:00", end: "18:00" },
    ],

    maxHoursPerWeek: 40,
    vacations: [
      { start: "2024-07-15", end: "2024-07-30", reason: "Vacances d'été" },
      { start: "2024-12-24", end: "2024-12-31", reason: "Vacances de Noël" },
    ],
  },

  emergencyContact: {
    name: "Sophie Dubois",
    relationship: "Épouse",
    phone: "+41 79 987 65 43",
  },

  preferences: {
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    vehicles: ["VW Golf", "BMW 320d"],
    notes: "Préfère les leçons matinales. Spécialiste conduite écologique.",
  },

  stats: {
    totalStudents: 45,
    activeStudents: 18,
    lessonsLast7Days: 12,
    successRate: 87.5,
    totalLessons: 856,
    totalHours: 1284,
    attendanceRate: 96.2,
  },
};

export const MOCK_INSTRUCTOR_LESSONS: InstructorLesson[] = [
  {
    id: "lesson-001",
    studentId: "stu-001",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/kdrnp.png",
    category: "B",
    type: "practical",
    date: "2024-06-15",
    startTime: "09:00",
    endTime: "10:30",
    duration: 90,
    vehicle: "VW Golf",
    status: "completed",
    location: "Lausanne Centre",
    notes: "Excellente progression sur les manœuvres",
  },
  {
    id: "lesson-002",
    studentId: "stu-002",
    studentName: "Thomas Müller",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    category: "B",
    type: "practical",
    date: "2024-06-15",
    startTime: "14:00",
    endTime: "15:30",
    duration: 90,
    vehicle: "BMW 320d",
    status: "in_progress",
    location: "Autoroute A1",
  },
  {
    id: "lesson-003",
    studentId: "stu-003",
    studentName: "Emma Rossi",
    studentAvatar: "https://github.com/shoaibux1.png",
    category: "A",
    type: "practical",
    date: "2024-06-16",
    startTime: "10:00",
    endTime: "11:30",
    duration: 90,
    vehicle: "Yamaha MT-07",
    status: "scheduled",
    location: "Parking Beaulieu",
  },
];

export const MOCK_ASSIGNED_STUDENTS: AssignedStudent[] = [
  {
    id: "stu-001",
    firstName: "Sophie",
    lastName: "Martin",
    avatar: "https://github.com/kdrnp.png",
    category: "B",
    progression: 75,
    lessonsCount: 28,
    lastLesson: "2024-06-15",
    nextLesson: "2024-06-18",
    rating: 5,
    status: "active",
  },
  {
    id: "stu-002",
    firstName: "Thomas",
    lastName: "Müller",
    avatar: "https://github.com/yahyabedirhan.png",
    category: "B",
    progression: 45,
    lessonsCount: 15,
    lastLesson: "2024-06-15",
    nextLesson: "2024-06-17",
    rating: 4.5,
    status: "active",
  },
  {
    id: "stu-003",
    firstName: "Emma",
    lastName: "Rossi",
    avatar: "https://github.com/shoaibux1.png",
    category: "A",
    progression: 60,
    lessonsCount: 20,
    lastLesson: "2024-06-14",
    nextLesson: "2024-06-16",
    rating: 5,
    status: "active",
  },
];

export const MOCK_INSTRUCTOR_REVIEWS: InstructorReview[] = [
  {
    id: "rev-001",
    studentId: "stu-001",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/kdrnp.png",
    rating: 5,
    comment:
      "Excellent moniteur ! Très pédagogue et patient. J'ai réussi mon examen du premier coup grâce à lui.",
    date: "2024-06-10",
    reply:
      "Merci Sophie ! Félicitations pour ton permis, tu l'as bien mérité !",
  },
  {
    id: "rev-002",
    studentId: "stu-004",
    studentName: "Lucas Bernard",
    studentAvatar: "https://github.com/denizbuyuktas.png",
    rating: 5,
    comment:
      "Marc est un super prof ! Explications claires et ambiance détendue. Je recommande vivement.",
    date: "2024-06-08",
  },
  {
    id: "rev-003",
    studentId: "stu-005",
    studentName: "Léa Favre",
    studentAvatar: "https://github.com/shoaibux1.png",
    rating: 4,
    comment:
      "Très bon moniteur, peut-être un peu exigeant mais c'est pour notre bien !",
    date: "2024-06-05",
  },
];

export const MOCK_PERFORMANCE_METRICS: PerformanceMetrics = {
  period: "last_30_days",
  lessonsCount: 48,
  lessonsTrend: 12.5,
  totalHours: 72,
  attendanceRate: 96.2,
  averageRating: 4.8,
  lessonsPerDay: [
    { date: "2024-06-01", count: 2 },
    { date: "2024-06-02", count: 3 },
    { date: "2024-06-03", count: 2 },
    { date: "2024-06-04", count: 4 },
    { date: "2024-06-05", count: 3 },
    { date: "2024-06-06", count: 2 },
    { date: "2024-06-07", count: 1 },
  ],

  hoursByCategory: [
    { category: "B", hours: 45 },
    { category: "BE", hours: 12 },
    { category: "A", hours: 10 },
    { category: "A1", hours: 5 },
  ],

  lessonTypes: [
    { type: "Pratique", count: 38, percentage: 79.2 },
    { type: "Théorie", count: 6, percentage: 12.5 },
    { type: "Examen", count: 3, percentage: 6.3 },
    { type: "Évaluation", count: 1, percentage: 2.1 },
  ],

  ratingDistribution: [
    { stars: 5, count: 85 },
    { stars: 4, count: 32 },
    { stars: 3, count: 8 },
    { stars: 2, count: 2 },
    { stars: 1, count: 0 },
  ],
};

export const MOCK_INSTRUCTOR_RANKING: InstructorRanking[] = [
  {
    id: "inst-005",
    name: "Pierre Favre",
    avatar: "https://github.com/yusufhilmi.png",
    lessonsCount: 62,
    rating: 4.9,
    isCurrent: false,
  },
  {
    id: "inst-001",
    name: "Marc Dubois",
    avatar: "https://github.com/kdrnp.png",
    lessonsCount: 48,
    rating: 4.8,
    isCurrent: true,
  },
  {
    id: "inst-003",
    name: "Julie Perrin",
    avatar: "https://github.com/yahyabedirhan.png",
    lessonsCount: 45,
    rating: 4.7,
    isCurrent: false,
  },
  {
    id: "inst-007",
    name: "Thomas Weber",
    avatar: "https://github.com/denizbuyuktas.png",
    lessonsCount: 42,
    rating: 4.6,
    isCurrent: false,
  },
  {
    id: "inst-009",
    name: "Sophie Blanc",
    avatar: "https://github.com/shoaibux1.png",
    lessonsCount: 38,
    rating: 4.5,
    isCurrent: false,
  },
];

export const MOCK_PERFORMANCE_GOALS: PerformanceGoal[] = [
  {
    id: "goal-001",
    metric: "lessons",
    target: 50,
    current: 48,
    period: "monthly",
    history: [
      { date: "2024-01", value: 42 },
      { date: "2024-02", value: 45 },
      { date: "2024-03", value: 48 },
      { date: "2024-04", value: 52 },
      { date: "2024-05", value: 47 },
      { date: "2024-06", value: 48 },
    ],
  },
  {
    id: "goal-002",
    metric: "rating",
    target: 4.9,
    current: 4.8,
    period: "monthly",
    history: [
      { date: "2024-01", value: 4.6 },
      { date: "2024-02", value: 4.7 },
      { date: "2024-03", value: 4.7 },
      { date: "2024-04", value: 4.8 },
      { date: "2024-05", value: 4.8 },
      { date: "2024-06", value: 4.8 },
    ],
  },
];

export const MOCK_INSTRUCTOR_PERFORMANCE: InstructorPerformance = {
  lessonsCount: 48,
  lessonsTrend: 12.5,
  totalHours: 72,
  attendanceRate: 96.2,
  averageRating: 4.8,
  target: 50,
  lessonsPerDay: [
    { date: "01/06", count: 2 },
    { date: "02/06", count: 3 },
    { date: "03/06", count: 2 },
    { date: "04/06", count: 4 },
    { date: "05/06", count: 3 },
    { date: "06/06", count: 2 },
    { date: "07/06", count: 1 },
    { date: "08/06", count: 3 },
    { date: "09/06", count: 2 },
    { date: "10/06", count: 4 },
  ],

  hoursByCategory: [
    { category: "B", hours: 45 },
    { category: "BE", hours: 12 },
    { category: "A", hours: 10 },
    { category: "A1", hours: 5 },
  ],

  lessonTypes: [
    { name: "Pratique", count: 38 },
    { name: "Théorie", count: 6 },
    { name: "Examen", count: 3 },
    { name: "Évaluation", count: 1 },
  ],

  targetHistory: [
    { month: "Jan", target: 50, actual: 42 },
    { month: "Fév", target: 50, actual: 45 },
    { month: "Mar", target: 50, actual: 48 },
    { month: "Avr", target: 50, actual: 52 },
    { month: "Mai", target: 50, actual: 47 },
    { month: "Juin", target: 50, actual: 48 },
  ],
};
