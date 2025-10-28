/**
 * VIAMENTOR - Exams Analytics Data
 * Mock data et types pour analytics examens
 */

// ============================================================================
// TYPES
// ============================================================================

export type ExamType = "theory" | "practical";
export type ExamCategory = "B" | "A" | "A1" | "BE" | "C" | "D";
export type ExamResult = "passed" | "failed";
export type FailureReason =
  | "maneuvers"
  | "priorities"
  | "parking"
  | "stress"
  | "speed"
  | "observation"
  | "other";

export interface ExamRecord {
  id: string;
  studentId: string;
  studentName: string;
  instructorId: string;
  instructorName: string;
  category: ExamCategory;
  type: ExamType;
  date: string;
  result: ExamResult;
  attemptNumber: number;
  lessonsBeforeExam: number;
  progressionAtExam: number; // %
  trainingDurationDays: number;
  failureReason?: FailureReason;
  notes?: string;
}

export interface ExamStats {
  totalExams: number;
  successRate: number;
  successRateTrend: number; // vs previous period
  failures: number;
  averageAttempts: number;
}

export interface CategorySuccessRate {
  category: ExamCategory;
  theoryExams: {
    total: number;
    passed: number;
    rate: number;
  };
  practicalExams: {
    total: number;
    passed: number;
    rate: number;
  };
  averageAttempts: number;
  averageLessons: number;
  averageTrainingDays: number;
}

export interface MonthlySuccessRate {
  month: string;
  theoryRate: number;
  practicalRate: number;
}

export interface InstructorExamPerformance {
  instructorId: string;
  instructorName: string;
  avatar: string;
  studentsPresented: number;
  studentsPassed: number;
  successRate: number;
  averageAttempts: number;
  averageLessons: number;
}

export interface FailureAnalysis {
  reason: FailureReason;
  count: number;
  percentage: number;
}

export interface MultipleFailureStudent {
  studentId: string;
  studentName: string;
  category: ExamCategory;
  attempts: number;
  lastExamDate: string;
  instructorName: string;
  progression: number;
  needsIntervention: boolean;
}

export interface LessonsDistribution {
  range: string;
  count: number;
}

export interface TimingBucket {
  range: string;
  successRate: number;
  count: number;
}

export interface SeasonalityData {
  month: string;
  categories: Record<ExamCategory, number>;
}

export interface Benchmark {
  metric: string;
  ourValue: number;
  nationalAverage: number;
  delta: number;
  better: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  impact: string;
  actions: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockExamRecords: ExamRecord[] = [
  // Category B - Theory
  {
    id: "ex-001",
    studentId: "st-001",
    studentName: "Sophie Martin",
    instructorId: "in-001",
    instructorName: "Jean Dupont",
    category: "B",
    type: "theory",
    date: "2024-01-15",
    result: "passed",
    attemptNumber: 1,
    lessonsBeforeExam: 8,
    progressionAtExam: 95,
    trainingDurationDays: 45,
  },
  {
    id: "ex-002",
    studentId: "st-002",
    studentName: "Marc Dubois",
    category: "B",
    type: "theory",
    date: "2024-01-20",
    result: "failed",
    attemptNumber: 1,
    lessonsBeforeExam: 6,
    progressionAtExam: 65,
    trainingDurationDays: 30,
    instructorId: "in-002",
    instructorName: "Marie Laurent",
    failureReason: "priorities",
  },
  // Category B - Practical
  {
    id: "ex-003",
    studentId: "st-003",
    studentName: "Julie Bernard",
    instructorId: "in-001",
    instructorName: "Jean Dupont",
    category: "B",
    type: "practical",
    date: "2024-02-10",
    result: "passed",
    attemptNumber: 1,
    lessonsBeforeExam: 28,
    progressionAtExam: 88,
    trainingDurationDays: 120,
  },
  {
    id: "ex-004",
    studentId: "st-004",
    studentName: "Pierre Moreau",
    instructorId: "in-003",
    instructorName: "Thomas Petit",
    category: "B",
    type: "practical",
    date: "2024-02-15",
    result: "failed",
    attemptNumber: 1,
    lessonsBeforeExam: 18,
    progressionAtExam: 62,
    trainingDurationDays: 75,
    failureReason: "maneuvers",
  },
  {
    id: "ex-005",
    studentId: "st-004",
    studentName: "Pierre Moreau",
    instructorId: "in-003",
    instructorName: "Thomas Petit",
    category: "B",
    type: "practical",
    date: "2024-03-20",
    result: "failed",
    attemptNumber: 2,
    lessonsBeforeExam: 25,
    progressionAtExam: 70,
    trainingDurationDays: 110,
    failureReason: "parking",
  },
  {
    id: "ex-006",
    studentId: "st-004",
    studentName: "Pierre Moreau",
    instructorId: "in-001",
    instructorName: "Jean Dupont",
    category: "B",
    type: "practical",
    date: "2024-04-25",
    result: "passed",
    attemptNumber: 3,
    lessonsBeforeExam: 35,
    progressionAtExam: 85,
    trainingDurationDays: 145,
  },
  // Category A
  {
    id: "ex-007",
    studentId: "st-005",
    studentName: "Luc Girard",
    instructorId: "in-004",
    instructorName: "Claire Simon",
    category: "A",
    type: "theory",
    date: "2024-03-05",
    result: "passed",
    attemptNumber: 1,
    lessonsBeforeExam: 10,
    progressionAtExam: 92,
    trainingDurationDays: 50,
  },
  {
    id: "ex-008",
    studentId: "st-005",
    studentName: "Luc Girard",
    instructorId: "in-004",
    instructorName: "Claire Simon",
    category: "A",
    type: "practical",
    date: "2024-04-10",
    result: "failed",
    attemptNumber: 1,
    lessonsBeforeExam: 15,
    progressionAtExam: 58,
    trainingDurationDays: 85,
    failureReason: "maneuvers",
  },
];

export const mockExamStats: ExamStats = {
  totalExams: 156,
  successRate: 78.2,
  successRateTrend: 3.5,
  failures: 34,
  averageAttempts: 1.4,
};

export const mockCategorySuccessRates: CategorySuccessRate[] = [
  {
    category: "B",
    theoryExams: { total: 85, passed: 78, rate: 91.8 },
    practicalExams: { total: 85, passed: 62, rate: 72.9 },
    averageAttempts: 1.3,
    averageLessons: 28.5,
    averageTrainingDays: 125,
  },
  {
    category: "A",
    theoryExams: { total: 25, passed: 22, rate: 88.0 },
    practicalExams: { total: 25, passed: 17, rate: 68.0 },
    averageAttempts: 1.5,
    averageLessons: 22.3,
    averageTrainingDays: 95,
  },
  {
    category: "BE",
    theoryExams: { total: 12, passed: 11, rate: 91.7 },
    practicalExams: { total: 12, passed: 10, rate: 83.3 },
    averageAttempts: 1.2,
    averageLessons: 12.8,
    averageTrainingDays: 45,
  },
];

export const mockMonthlySuccessRates: MonthlySuccessRate[] = [
  { month: "Jan 2024", theoryRate: 88.5, practicalRate: 70.2 },
  { month: "Fév 2024", theoryRate: 90.2, practicalRate: 72.8 },
  { month: "Mar 2024", theoryRate: 89.8, practicalRate: 75.5 },
  { month: "Avr 2024", theoryRate: 91.5, practicalRate: 78.2 },
  { month: "Mai 2024", theoryRate: 90.8, practicalRate: 76.8 },
  { month: "Juin 2024", theoryRate: 92.2, practicalRate: 79.5 },
];

export const mockInstructorPerformance: InstructorExamPerformance[] = [
  {
    instructorId: "in-001",
    instructorName: "Jean Dupont",
    avatar: "https://github.com/yusufhilmi.png",
    studentsPresented: 45,
    studentsPassed: 38,
    successRate: 84.4,
    averageAttempts: 1.2,
    averageLessons: 26.5,
  },
  {
    instructorId: "in-002",
    instructorName: "Marie Laurent",
    avatar: "https://github.com/kdrnp.png",
    studentsPresented: 38,
    studentsPassed: 30,
    successRate: 78.9,
    averageAttempts: 1.4,
    averageLessons: 29.2,
  },
  {
    instructorId: "in-003",
    instructorName: "Thomas Petit",
    avatar: "https://github.com/yahyabedirhan.png",
    studentsPresented: 32,
    studentsPassed: 22,
    successRate: 68.8,
    averageAttempts: 1.6,
    averageLessons: 31.8,
  },
  {
    instructorId: "in-004",
    instructorName: "Claire Simon",
    avatar: "https://github.com/denizbuyuktas.png",
    studentsPresented: 28,
    studentsPassed: 24,
    successRate: 85.7,
    averageAttempts: 1.3,
    averageLessons: 25.2,
  },
];

export const mockFailureReasons: FailureAnalysis[] = [
  { reason: "maneuvers", count: 12, percentage: 35.3 },
  { reason: "priorities", count: 8, percentage: 23.5 },
  { reason: "parking", count: 6, percentage: 17.6 },
  { reason: "stress", count: 4, percentage: 11.8 },
  { reason: "speed", count: 3, percentage: 8.8 },
  { reason: "observation", count: 1, percentage: 2.9 },
];

export const mockMultipleFailureStudents: MultipleFailureStudent[] = [
  {
    studentId: "st-004",
    studentName: "Pierre Moreau",
    category: "B",
    attempts: 3,
    lastExamDate: "2024-04-25",
    instructorName: "Jean Dupont",
    progression: 85,
    needsIntervention: true,
  },
  {
    studentId: "st-008",
    studentName: "Emma Rousseau",
    category: "B",
    attempts: 2,
    lastExamDate: "2024-05-10",
    instructorName: "Marie Laurent",
    progression: 72,
    needsIntervention: false,
  },
];

export const mockLessonsDistribution: LessonsDistribution[] = [
  { range: "0-15", count: 8 },
  { range: "15-25", count: 22 },
  { range: "25-35", count: 38 },
  { range: "35-45", count: 18 },
  { range: ">45", count: 6 },
];

export const mockTimingBuckets: TimingBucket[] = [
  { range: "<3 mois", successRate: 62.5, count: 24 },
  { range: "3-6 mois", successRate: 82.3, count: 58 },
  { range: "6-12 mois", successRate: 75.8, count: 32 },
  { range: ">12 mois", successRate: 68.2, count: 12 },
];

export const mockSeasonalityData: SeasonalityData[] = [
  { month: "Jan", categories: { B: 75, A: 70, A1: 0, BE: 80, C: 0, D: 0 } },
  { month: "Fév", categories: { B: 78, A: 72, A1: 0, BE: 82, C: 0, D: 0 } },
  { month: "Mar", categories: { B: 82, A: 75, A1: 0, BE: 85, C: 0, D: 0 } },
  { month: "Avr", categories: { B: 85, A: 78, A1: 0, BE: 88, C: 0, D: 0 } },
  { month: "Mai", categories: { B: 83, A: 76, A1: 0, BE: 86, C: 0, D: 0 } },
  { month: "Juin", categories: { B: 88, A: 82, A1: 0, BE: 90, C: 0, D: 0 } },
];

export const mockBenchmarks: Benchmark[] = [
  {
    metric: "Taux réussite global",
    ourValue: 78.2,
    nationalAverage: 72.5,
    delta: 5.7,
    better: true,
  },
  {
    metric: "Taux réussite théorique",
    ourValue: 90.5,
    nationalAverage: 88.2,
    delta: 2.3,
    better: true,
  },
  {
    metric: "Taux réussite pratique",
    ourValue: 73.8,
    nationalAverage: 68.5,
    delta: 5.3,
    better: true,
  },
  {
    metric: "Tentatives moyennes",
    ourValue: 1.4,
    nationalAverage: 1.6,
    delta: -0.2,
    better: true,
  },
];
