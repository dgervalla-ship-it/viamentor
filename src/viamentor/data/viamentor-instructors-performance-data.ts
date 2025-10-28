/**
 * VIAMENTOR - Instructors Performance Analytics Data
 * Mock data pour analytics performance moniteurs
 */

// ============================================================================
// TYPES
// ============================================================================

export type PerformanceLocale = "fr" | "de" | "it" | "en";

export interface InstructorPerformanceStats {
  totalInstructors: number;
  totalLessons: number;
  totalHours: number;
  averageRating: number;
}

export interface InstructorRanking {
  id: string;
  rank: number;
  avatar: string;
  name: string;
  categories: string[];
  lessonsCompleted: number;
  totalHours: number;
  activeStudents: number;
  averageRating: number;
  examSuccessRate: number;
  attendanceRate: number;
  revenueGenerated: number;
}

export interface InstructorDetailStats {
  id: string;
  avatar: string;
  name: string;
  categories: string[];
  period: {
    lessonsCount: number;
    lessonsTrend: number;
    totalHours: number;
    hoursTrend: number;
    studentsCount: number;
    studentsTrend: number;
    averageRating: number;
    ratingTrend: number;
    examSuccessRate: number;
    successTrend: number;
    occupationRate: number;
    occupationTrend: number;
  };
  activityData: ActivityDataPoint[];
  assignedStudents: AssignedStudentPerformance[];
  recentReviews: StudentReview[];
}

export interface ActivityDataPoint {
  date: string;
  lessonsCount: number;
  hoursB: number;
  hoursA: number;
  hoursBE: number;
}

export interface AssignedStudentPerformance {
  id: string;
  avatar: string;
  name: string;
  category: string;
  lessonsCompleted: number;
  progressionRate: number;
  ratingGiven: number;
}

export interface StudentReview {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  instructorReply?: string;
}

export interface WorkloadData {
  instructorId: string;
  instructorName: string;
  avatar: string;
  weeklyHours: number;
  lessonsCount: number;
  daysWorked: number;
  hoursPerDay: number;
  availabilityRemaining: number;
  status: "underutilized" | "optimal" | "overloaded";
  hoursByCategory: {
    B: number;
    A: number;
    BE: number;
  };
  dailyHours: Record<string, number>;
}

export interface CategoryExpertise {
  instructorId: string;
  instructorName: string;
  avatar: string;
  categories: {
    B?: CategoryStats;
    A?: CategoryStats;
    BE?: CategoryStats;
  };
  radarScores: {
    B: number;
    A: number;
    BE: number;
  };
}

export interface CategoryStats {
  lessonsCount: number;
  totalHours: number;
  examSuccessRate: number;
  averageRating: number;
}

export interface SatisfactionData {
  topRated: TopRatedInstructor[];
  needsImprovement: NeedsImprovementInstructor[];
  distributionData: RatingDistribution[];
}

export interface TopRatedInstructor {
  id: string;
  avatar: string;
  name: string;
  rating: number;
  reviewsCount: number;
  bestComment: string;
}

export interface NeedsImprovementInstructor {
  id: string;
  avatar: string;
  name: string;
  rating: number;
  reviewsCount: number;
  recurringIssues: string[];
}

export interface RatingDistribution {
  instructorId: string;
  instructorName: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers: number[];
}

export interface AvailabilityOptimization {
  underutilizedSlots: HeatmapSlot[][];
  recurringConflicts: ConflictData[];
}

export interface HeatmapSlot {
  instructorId: string;
  instructorName: string;
  timeSlot: string;
  bookingRate: number;
}

export interface ConflictData {
  instructorId: string;
  instructorName: string;
  avatar: string;
  conflictsCount: number;
  lastConflictDate: string;
}

export interface PerformanceEvolution {
  instructorId: string;
  monthlyData: MonthlyPerformance[];
  events: PerformanceEvent[];
}

export interface MonthlyPerformance {
  month: string;
  lessonsCount: number;
  averageRating: number;
  examSuccessRate: number;
}

export interface PerformanceEvent {
  date: string;
  type: "training" | "vacation" | "schedule_change";
  label: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockPerformanceStats: InstructorPerformanceStats = {
  totalInstructors: 24,
  totalLessons: 1847,
  totalHours: 3694,
  averageRating: 4.6,
};

export const mockInstructorRankings: InstructorRanking[] = [
  {
    id: "inst-001",
    rank: 1,
    avatar: "https://github.com/yusufhilmi.png",
    name: "Marc Dubois",
    categories: ["B", "A", "BE"],
    lessonsCompleted: 187,
    totalHours: 374,
    activeStudents: 18,
    averageRating: 4.9,
    examSuccessRate: 92,
    attendanceRate: 98,
    revenueGenerated: 37400,
  },
  {
    id: "inst-002",
    rank: 2,
    avatar: "https://github.com/kdrnp.png",
    name: "Sophie Martin",
    categories: ["B", "A"],
    lessonsCompleted: 165,
    totalHours: 330,
    activeStudents: 16,
    averageRating: 4.8,
    examSuccessRate: 89,
    attendanceRate: 96,
    revenueGenerated: 33000,
  },
  {
    id: "inst-003",
    rank: 3,
    avatar: "https://github.com/yahyabedirhan.png",
    name: "Thomas Müller",
    categories: ["B", "BE"],
    lessonsCompleted: 152,
    totalHours: 304,
    activeStudents: 14,
    averageRating: 4.7,
    examSuccessRate: 87,
    attendanceRate: 95,
    revenueGenerated: 30400,
  },
];

export const mockInstructorDetail: InstructorDetailStats = {
  id: "inst-001",
  avatar: "https://github.com/yusufhilmi.png",
  name: "Marc Dubois",
  categories: ["B", "A", "BE"],
  period: {
    lessonsCount: 187,
    lessonsTrend: 12,
    totalHours: 374,
    hoursTrend: 8,
    studentsCount: 18,
    studentsTrend: 2,
    averageRating: 4.9,
    ratingTrend: 0.2,
    examSuccessRate: 92,
    successTrend: 5,
    occupationRate: 78,
    occupationTrend: -3,
  },
  activityData: [
    { date: "2025-01-06", lessonsCount: 8, hoursB: 6, hoursA: 8, hoursBE: 2 },
    { date: "2025-01-07", lessonsCount: 7, hoursB: 5, hoursA: 7, hoursBE: 2 },
    { date: "2025-01-08", lessonsCount: 9, hoursB: 7, hoursA: 9, hoursBE: 2 },
  ],

  assignedStudents: [
    {
      id: "std-001",
      avatar: "https://github.com/shoaibux1.png",
      name: "Julie Renaud",
      category: "B",
      lessonsCompleted: 28,
      progressionRate: 85,
      ratingGiven: 5.0,
    },
  ],

  recentReviews: [
    {
      id: "rev-001",
      date: "2025-01-10",
      studentId: "std-001",
      studentName: "Julie Renaud",
      studentAvatar: "https://github.com/shoaibux1.png",
      rating: 5,
      comment: "Excellent moniteur, très pédagogue et patient.",
      instructorReply: "Merci Julie, continue comme ça!",
    },
  ],
};

export const mockWorkloadData: WorkloadData[] = [
  {
    instructorId: "inst-001",
    instructorName: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    weeklyHours: 38,
    lessonsCount: 19,
    daysWorked: 5,
    hoursPerDay: 7.6,
    availabilityRemaining: 22,
    status: "optimal",
    hoursByCategory: { B: 14, A: 18, BE: 6 },
    dailyHours: {
      "2025-01-06": 8,
      "2025-01-07": 7,
      "2025-01-08": 9,
      "2025-01-09": 7,
      "2025-01-10": 7,
    },
  },
];

export const mockCategoryExpertise: CategoryExpertise[] = [
  {
    instructorId: "inst-001",
    instructorName: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    categories: {
      B: {
        lessonsCount: 78,
        totalHours: 156,
        examSuccessRate: 94,
        averageRating: 4.9,
      },
      A: {
        lessonsCount: 89,
        totalHours: 178,
        examSuccessRate: 91,
        averageRating: 4.8,
      },
      BE: {
        lessonsCount: 20,
        totalHours: 40,
        examSuccessRate: 88,
        averageRating: 4.9,
      },
    },
    radarScores: { B: 95, A: 92, BE: 88 },
  },
];

export const mockSatisfactionData: SatisfactionData = {
  topRated: [
    {
      id: "inst-001",
      avatar: "https://github.com/yusufhilmi.png",
      name: "Marc Dubois",
      rating: 4.9,
      reviewsCount: 87,
      bestComment: "Le meilleur moniteur que j'ai eu!",
    },
  ],

  needsImprovement: [
    {
      id: "inst-015",
      avatar: "https://github.com/denizbuyuktas.png",
      name: "Pierre Favre",
      rating: 3.8,
      reviewsCount: 42,
      recurringIssues: ["Ponctualité", "Communication"],
    },
  ],

  distributionData: [
    {
      instructorId: "inst-001",
      instructorName: "Marc Dubois",
      min: 4.0,
      q1: 4.5,
      median: 4.9,
      q3: 5.0,
      max: 5.0,
      outliers: [],
    },
  ],
};

export const mockAvailabilityOptimization: AvailabilityOptimization = {
  underutilizedSlots: [],
  recurringConflicts: [
    {
      instructorId: "inst-003",
      instructorName: "Thomas Müller",
      avatar: "https://github.com/yahyabedirhan.png",
      conflictsCount: 5,
      lastConflictDate: "2025-01-08",
    },
  ],
};

export const mockPerformanceEvolution: PerformanceEvolution = {
  instructorId: "inst-001",
  monthlyData: [
    {
      month: "2024-02",
      lessonsCount: 68,
      averageRating: 4.7,
      examSuccessRate: 88,
    },
    {
      month: "2024-03",
      lessonsCount: 72,
      averageRating: 4.8,
      examSuccessRate: 90,
    },
    {
      month: "2024-04",
      lessonsCount: 75,
      averageRating: 4.9,
      examSuccessRate: 92,
    },
  ],

  events: [
    { date: "2024-03-15", type: "training", label: "Formation pédagogique" },
    { date: "2024-07-20", type: "vacation", label: "Vacances d'été" },
  ],
};
