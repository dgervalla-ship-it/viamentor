/**
 * VIAMENTOR - Revenue Split Data
 * Mock data pour système reversements
 */

import type {
  RevenueSplit,
  MonthlyFee,
  StatusType,
  PaymentModelType,
  PaymentStatus,
  PaymentMethod,
} from "@/polymet/data/viamentor-revenue-split-schemas";

// ============================================================================
// TYPES ÉTENDUS
// ============================================================================

export interface LessonRevenue {
  id: string;
  lessonId: string;
  date: Date;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  duration: number; // minutes
  totalPrice: number;
  paymentModel: PaymentModelType;
  commissionRate?: number;
  schoolAmount: number;
  instructorAmount: number;
  paymentStatus: PaymentStatus;
  paidAt?: Date;
  notes?: string;
}

export interface InstructorRevenue {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  statusType: StatusType;
  paymentModel: PaymentModelType;
  commissionRate?: number;
  monthlyFeeAmount?: number;

  // Stats période courante
  revenueGenerated: number;
  reversalDue: number;
  paid: number;
  balance: number;

  // Metadata
  lastPaymentDate?: Date;
  unpaidCount: number;
}

export interface RevenueStats {
  // Moniteur
  grossRevenue: number;
  schoolShare: number;
  netToPay: number;
  paid: number;

  // École
  totalReversals: number;
  unpaid: number;
  instructorsRevenue: number;

  // Counts
  lessonsCount: number;
  instructorsCount: number;
}

export interface RevenueEvolution {
  month: string;
  grossRevenue: number;
  schoolShare: number;
  netInstructor: number;
}

export interface RevenueByInstructor {
  instructorId: string;
  instructorName: string;
  amount: number;
  percentage: number;
}

export interface PaymentModelVolume {
  model: PaymentModelType;
  count: number;
  amount: number;
}

// ============================================================================
// MOCK DATA - LESSONS REVENUE
// ============================================================================

export const mockLessonsRevenue: LessonRevenue[] = [
  {
    id: "lr-1",
    lessonId: "lesson-1",
    date: new Date("2025-01-15T10:00:00"),
    studentId: "student-1",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/yusufhilmi.png",
    duration: 90,
    totalPrice: 90,
    paymentModel: "commission",
    commissionRate: 20,
    schoolAmount: 18,
    instructorAmount: 72,
    paymentStatus: "paid",
    paidAt: new Date("2025-01-20T14:30:00"),
  },
  {
    id: "lr-2",
    lessonId: "lesson-2",
    date: new Date("2025-01-14T14:00:00"),
    studentId: "student-2",
    studentName: "Marc Dubois",
    studentAvatar: "https://github.com/kdrnp.png",
    duration: 90,
    totalPrice: 90,
    paymentModel: "commission",
    commissionRate: 20,
    schoolAmount: 18,
    instructorAmount: 72,
    paymentStatus: "pending",
  },
  {
    id: "lr-3",
    lessonId: "lesson-3",
    date: new Date("2025-01-13T09:00:00"),
    studentId: "student-3",
    studentName: "Julie Rousseau",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    duration: 90,
    totalPrice: 90,
    paymentModel: "free",
    schoolAmount: 0,
    instructorAmount: 90,
    paymentStatus: "paid",
    paidAt: new Date("2025-01-20T14:30:00"),
  },
  {
    id: "lr-4",
    lessonId: "lesson-4",
    date: new Date("2025-01-12T16:00:00"),
    studentId: "student-4",
    studentName: "Thomas Bernard",
    studentAvatar: "https://github.com/denizbuyuktas.png",
    duration: 90,
    totalPrice: 90,
    paymentModel: "monthly_flat",
    schoolAmount: 0,
    instructorAmount: 90,
    paymentStatus: "paid",
    paidAt: new Date("2025-01-20T14:30:00"),
  },
  {
    id: "lr-5",
    lessonId: "lesson-5",
    date: new Date("2025-01-11T11:00:00"),
    studentId: "student-5",
    studentName: "Emma Leroy",
    studentAvatar: "https://github.com/shoaibux1.png",
    duration: 90,
    totalPrice: 90,
    paymentModel: "commission",
    commissionRate: 15,
    schoolAmount: 13.5,
    instructorAmount: 76.5,
    paymentStatus: "pending",
  },
];

// ============================================================================
// MOCK DATA - INSTRUCTORS REVENUE
// ============================================================================

export const mockInstructorsRevenue: InstructorRevenue[] = [
  {
    id: "ir-1",
    instructorId: "instructor-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    statusType: "independent_attached",
    paymentModel: "commission",
    commissionRate: 20,
    revenueGenerated: 3600,
    reversalDue: 720,
    paid: 500,
    balance: 220,
    lastPaymentDate: new Date("2025-01-15T10:00:00"),
    unpaidCount: 8,
  },
  {
    id: "ir-2",
    instructorId: "instructor-2",
    instructorName: "Marie Leclerc",
    instructorAvatar: "https://github.com/kdrnp.png",
    statusType: "independent_attached",
    paymentModel: "monthly_flat",
    monthlyFeeAmount: 500,
    revenueGenerated: 2700,
    reversalDue: 500,
    paid: 500,
    balance: 0,
    lastPaymentDate: new Date("2025-01-05T09:00:00"),
    unpaidCount: 0,
  },
  {
    id: "ir-3",
    instructorId: "instructor-3",
    instructorName: "Pierre Moreau",
    instructorAvatar: "https://github.com/yahyabedirhan.png",
    statusType: "independent_attached",
    paymentModel: "free",
    revenueGenerated: 1800,
    reversalDue: 0,
    paid: 0,
    balance: 0,
    unpaidCount: 0,
  },
  {
    id: "ir-4",
    instructorId: "instructor-4",
    instructorName: "Sophie Laurent",
    instructorAvatar: "https://github.com/denizbuyuktas.png",
    statusType: "independent_attached",
    paymentModel: "commission",
    commissionRate: 15,
    revenueGenerated: 2250,
    reversalDue: 337.5,
    paid: 200,
    balance: 137.5,
    lastPaymentDate: new Date("2025-01-10T14:00:00"),
    unpaidCount: 5,
  },
  {
    id: "ir-5",
    instructorId: "instructor-5",
    instructorName: "Luc Martin",
    instructorAvatar: "https://github.com/shoaibux1.png",
    statusType: "employee",
    paymentModel: "free",
    revenueGenerated: 4500,
    reversalDue: 0,
    paid: 0,
    balance: 0,
    unpaidCount: 0,
  },
];

// ============================================================================
// MOCK DATA - MONTHLY FEES
// ============================================================================

export const mockMonthlyFees: MonthlyFee[] = [
  {
    id: "mf-1",
    instructorId: "instructor-2",
    schoolId: "school-1",
    month: "2025-01",
    amount: 500,
    status: "paid",
    dueDate: new Date("2025-01-05T00:00:00"),
    paidAt: new Date("2025-01-05T09:00:00"),
    paymentMethod: "bank_transfer",
    createdAt: new Date("2025-01-01T00:00:00"),
  },
  {
    id: "mf-2",
    instructorId: "instructor-2",
    schoolId: "school-1",
    month: "2024-12",
    amount: 500,
    status: "paid",
    dueDate: new Date("2024-12-05T00:00:00"),
    paidAt: new Date("2024-12-04T10:30:00"),
    paymentMethod: "bank_transfer",
    createdAt: new Date("2024-12-01T00:00:00"),
  },
  {
    id: "mf-3",
    instructorId: "instructor-2",
    schoolId: "school-1",
    month: "2024-11",
    amount: 500,
    status: "paid",
    dueDate: new Date("2024-11-05T00:00:00"),
    paidAt: new Date("2024-11-05T15:00:00"),
    paymentMethod: "cash",
    createdAt: new Date("2024-11-01T00:00:00"),
  },
];

// ============================================================================
// MOCK DATA - REVENUE STATS
// ============================================================================

export const mockRevenueStatsInstructor: RevenueStats = {
  grossRevenue: 3600,
  schoolShare: 720,
  netToPay: 2880,
  paid: 2500,
  unpaid: 0,
  totalReversals: 0,
  instructorsRevenue: 0,
  lessonsCount: 40,
  instructorsCount: 0,
};

export const mockRevenueStatsSchool: RevenueStats = {
  grossRevenue: 0,
  schoolShare: 0,
  netToPay: 0,
  paid: 0,
  unpaid: 1157.5,
  totalReversals: 2200,
  instructorsRevenue: 14850,
  lessonsCount: 165,
  instructorsCount: 5,
};

// ============================================================================
// MOCK DATA - REVENUE EVOLUTION
// ============================================================================

export const mockRevenueEvolution: RevenueEvolution[] = [
  {
    month: "2024-02",
    grossRevenue: 2800,
    schoolShare: 560,
    netInstructor: 2240,
  },
  {
    month: "2024-03",
    grossRevenue: 3200,
    schoolShare: 640,
    netInstructor: 2560,
  },
  {
    month: "2024-04",
    grossRevenue: 3000,
    schoolShare: 600,
    netInstructor: 2400,
  },
  {
    month: "2024-05",
    grossRevenue: 3400,
    schoolShare: 680,
    netInstructor: 2720,
  },
  {
    month: "2024-06",
    grossRevenue: 3100,
    schoolShare: 620,
    netInstructor: 2480,
  },
  {
    month: "2024-07",
    grossRevenue: 2900,
    schoolShare: 580,
    netInstructor: 2320,
  },
  {
    month: "2024-08",
    grossRevenue: 2600,
    schoolShare: 520,
    netInstructor: 2080,
  },
  {
    month: "2024-09",
    grossRevenue: 3300,
    schoolShare: 660,
    netInstructor: 2640,
  },
  {
    month: "2024-10",
    grossRevenue: 3500,
    schoolShare: 700,
    netInstructor: 2800,
  },
  {
    month: "2024-11",
    grossRevenue: 3700,
    schoolShare: 740,
    netInstructor: 2960,
  },
  {
    month: "2024-12",
    grossRevenue: 3400,
    schoolShare: 680,
    netInstructor: 2720,
  },
  {
    month: "2025-01",
    grossRevenue: 3600,
    schoolShare: 720,
    netInstructor: 2880,
  },
];

// ============================================================================
// MOCK DATA - REVENUE BY INSTRUCTOR
// ============================================================================

export const mockRevenueByInstructor: RevenueByInstructor[] = [
  {
    instructorId: "instructor-5",
    instructorName: "Luc Martin",
    amount: 4500,
    percentage: 30.3,
  },
  {
    instructorId: "instructor-1",
    instructorName: "Jean Dupont",
    amount: 3600,
    percentage: 24.2,
  },
  {
    instructorId: "instructor-2",
    instructorName: "Marie Leclerc",
    amount: 2700,
    percentage: 18.2,
  },
  {
    instructorId: "instructor-4",
    instructorName: "Sophie Laurent",
    amount: 2250,
    percentage: 15.2,
  },
  {
    instructorId: "instructor-3",
    instructorName: "Pierre Moreau",
    amount: 1800,
    percentage: 12.1,
  },
];

// ============================================================================
// MOCK DATA - PAYMENT MODELS VOLUME
// ============================================================================

export const mockPaymentModelsVolume: PaymentModelVolume[] = [
  {
    model: "commission",
    count: 85,
    amount: 7650,
  },
  {
    model: "monthly_flat",
    count: 30,
    amount: 2700,
  },
  {
    model: "free",
    count: 50,
    amount: 4500,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Filtre les leçons par période
 */
export function filterLessonsByPeriod(
  lessons: LessonRevenue[],
  startDate: Date,
  endDate: Date
): LessonRevenue[] {
  return lessons.filter(
    (lesson) => lesson.date >= startDate && lesson.date <= endDate
  );
}

/**
 * Filtre les leçons par statut paiement
 */
export function filterLessonsByStatus(
  lessons: LessonRevenue[],
  status: PaymentStatus
): LessonRevenue[] {
  return lessons.filter((lesson) => lesson.paymentStatus === status);
}

/**
 * Calcule les stats à partir des leçons
 */
export function calculateStatsFromLessons(
  lessons: LessonRevenue[]
): Partial<RevenueStats> {
  const grossRevenue = lessons.reduce((sum, l) => sum + l.totalPrice, 0);
  const schoolShare = lessons.reduce((sum, l) => sum + l.schoolAmount, 0);
  const netToPay = lessons.reduce((sum, l) => sum + l.instructorAmount, 0);
  const paid = lessons
    .filter((l) => l.paymentStatus === "paid")
    .reduce((sum, l) => sum + l.instructorAmount, 0);

  return {
    grossRevenue,
    schoolShare,
    netToPay,
    paid,
    lessonsCount: lessons.length,
  };
}

/**
 * Génère les données d'évolution pour une période
 */
export function generateEvolutionData(
  lessons: LessonRevenue[],
  months: number = 12
): RevenueEvolution[] {
  const now = new Date();
  const evolution: RevenueEvolution[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    const monthLessons = lessons.filter((l) => {
      const lessonMonth = `${l.date.getFullYear()}-${String(l.date.getMonth() + 1).padStart(2, "0")}`;
      return lessonMonth === monthStr;
    });

    const stats = calculateStatsFromLessons(monthLessons);

    evolution.push({
      month: monthStr,
      grossRevenue: stats.grossRevenue || 0,
      schoolShare: stats.schoolShare || 0,
      netInstructor: stats.netToPay || 0,
    });
  }

  return evolution;
}
