/**
 * VIAMENTOR - Student Progression Data
 * Mock data et types pour suivi progression élève avec thèmes L-drive officiels
 */

// ============================================================================
// TYPES
// ============================================================================

export type MasteryLevel = "initiation" | "en_cours" | "bien" | "maitrise";
export type ThemeCategory =
  | "traffic"
  | "highway"
  | "parking"
  | "maneuvers"
  | "priorities"
  | "speed";
export type ObjectiveStatus = "completed" | "in_progress" | "not_started";
export type ReadinessLevel = "ready" | "soon" | "not_yet";

export interface ThemeScore {
  category: ThemeCategory;
  score: number; // 0-100
}

export interface ProgressionStats {
  globalProgress: number; // 0-100
  masteredThemes: number;
  learningThemes: number;
  toWorkThemes: number;
  lessonsCompleted: number;
  lessonsRecommended: number;
  categoryCode: string; // "B", "A", etc.
}

export interface LDriveTheme {
  id: string;
  code: string; // "T1.1", "T2.3", etc.
  nameKey: string; // i18n key
  category: ThemeCategory;
  level: MasteryLevel;
  score: number; // 0-100
  lessonsCount: number;
  lastPracticeDate: Date | null;
  nextPracticeDate: Date | null;
  lastEvaluation: {
    date: Date;
    instructorId: string;
    instructorName: string;
    instructorAvatar: string;
    rating: number; // 1-5
    comment: string;
  } | null;
  relatedThemes: string[]; // IDs of related themes
}

export interface ThemeEvaluation {
  id: string;
  themeId: string;
  lessonId: string;
  date: Date;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  rating: number; // 1-5
  comment: string;
  kmDriven?: number;
}

export interface LessonHistoryItem {
  id: string;
  date: Date;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  duration: number; // minutes
  themes: string[]; // theme IDs
  globalRating: number; // 1-5
  comment: string;
  signatureUrl?: string;
  kmDriven?: number;
  vehiclePlate: string;
}

export interface Objective {
  id: string;
  type:
    | "learner_permit"
    | "theory_course"
    | "min_lessons"
    | "awareness_course"
    | "theory_exam"
    | "practical_exam";
  status: ObjectiveStatus;
  completedDate?: Date;
  scheduledDate?: Date;
  progress?: number; // 0-100 for in_progress
  currentValue?: number;
  targetValue?: number;
  result?: string; // exam result
}

export interface Milestone {
  id: string;
  titleKey: string;
  completed: boolean;
  date?: Date;
  icon: string;
}

export interface Recommendation {
  id: string;
  type: "continue" | "focus" | "ready" | "review";
  titleKey: string;
  descriptionKey: string;
  priority: "high" | "medium" | "low";
  actionType: "book_lesson" | "contact_instructor" | "none";
  themeId?: string;
  dismissed: boolean;
}

export interface Certificate {
  id: string;
  type:
    | "lessons_attestation"
    | "theory_course"
    | "advanced_training"
    | "custom";
  titleKey: string;
  issueDate: Date;
  pdfUrl: string;
  signatureUrl: string;
  officialStamp: boolean;
}

export interface StudentProgression {
  studentId: string;
  stats: ProgressionStats;
  themeScores: ThemeScore[];
  themes: LDriveTheme[];
  evaluations: ThemeEvaluation[];
  lessonHistory: LessonHistoryItem[];
  objectives: Objective[];
  milestones: Milestone[];
  recommendations: Recommendation[];
  certificates: Certificate[];
  personalGoalDate?: Date;
  averageRating: number;
  totalHours: number;
  totalKm: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockThemeScores: ThemeScore[] = [
  { category: "traffic", score: 75 },
  { category: "highway", score: 60 },
  { category: "parking", score: 85 },
  { category: "maneuvers", score: 70 },
  { category: "priorities", score: 65 },
  { category: "speed", score: 80 },
];

export const mockLDriveThemes: LDriveTheme[] = [
  {
    id: "theme-1",
    code: "T1.1",
    nameKey: "themes.urban_traffic",
    category: "traffic",
    level: "bien",
    score: 75,
    lessonsCount: 8,
    lastPracticeDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    nextPracticeDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    lastEvaluation: {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      instructorId: "inst-1",
      instructorName: "Marc Dubois",
      instructorAvatar: "https://github.com/yusufhilmi.png",
      rating: 4,
      comment: "Bonne progression en circulation urbaine. Continue comme ça!",
    },
    relatedThemes: ["theme-5", "theme-6"],
  },
  {
    id: "theme-2",
    code: "T2.1",
    nameKey: "themes.highway_driving",
    category: "highway",
    level: "en_cours",
    score: 60,
    lessonsCount: 4,
    lastPracticeDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    nextPracticeDate: null,
    lastEvaluation: {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      instructorId: "inst-1",
      instructorName: "Marc Dubois",
      instructorAvatar: "https://github.com/yusufhilmi.png",
      rating: 3,
      comment:
        "Besoin de plus de pratique sur autoroute. Travaille la gestion des distances.",
    },
    relatedThemes: ["theme-6"],
  },
  {
    id: "theme-3",
    code: "T3.1",
    nameKey: "themes.parking",
    category: "parking",
    level: "maitrise",
    score: 85,
    lessonsCount: 10,
    lastPracticeDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    nextPracticeDate: null,
    lastEvaluation: {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      instructorId: "inst-1",
      instructorName: "Marc Dubois",
      instructorAvatar: "https://github.com/yusufhilmi.png",
      rating: 5,
      comment:
        "Excellent! Stationnement maîtrisé. Prêt pour l'examen sur ce point.",
    },
    relatedThemes: ["theme-4"],
  },
  {
    id: "theme-4",
    code: "T4.1",
    nameKey: "themes.maneuvers",
    category: "maneuvers",
    level: "bien",
    score: 70,
    lessonsCount: 6,
    lastPracticeDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    nextPracticeDate: null,
    lastEvaluation: {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      instructorId: "inst-1",
      instructorName: "Marc Dubois",
      instructorAvatar: "https://github.com/yusufhilmi.png",
      rating: 4,
      comment: "Manœuvres correctes. Améliore la fluidité des demi-tours.",
    },
    relatedThemes: ["theme-3"],
  },
  {
    id: "theme-5",
    code: "T5.1",
    nameKey: "themes.priorities",
    category: "priorities",
    level: "en_cours",
    score: 65,
    lessonsCount: 5,
    lastPracticeDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    nextPracticeDate: null,
    lastEvaluation: {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      instructorId: "inst-1",
      instructorName: "Marc Dubois",
      instructorAvatar: "https://github.com/yusufhilmi.png",
      rating: 3,
      comment: "Attention aux priorités à droite. Révise les règles.",
    },
    relatedThemes: ["theme-1"],
  },
  {
    id: "theme-6",
    code: "T6.1",
    nameKey: "themes.speed_management",
    category: "speed",
    level: "bien",
    score: 80,
    lessonsCount: 7,
    lastPracticeDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextPracticeDate: null,
    lastEvaluation: {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      instructorId: "inst-1",
      instructorName: "Marc Dubois",
      instructorAvatar: "https://github.com/yusufhilmi.png",
      rating: 4,
      comment:
        "Bonne gestion de la vitesse. Continue à adapter selon les conditions.",
    },
    relatedThemes: ["theme-1", "theme-2"],
  },
];

export const mockLessonHistory: LessonHistoryItem[] = [
  {
    id: "lesson-1",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    duration: 45,
    themes: ["theme-3"],
    globalRating: 5,
    comment: "Excellente leçon! Stationnement parfaitement maîtrisé.",
    signatureUrl: "/signatures/lesson-1.png",
    kmDriven: 12.5,
    vehiclePlate: "VD 123456",
  },
  {
    id: "lesson-2",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    instructorId: "inst-1",
    instructorName: "Marc Dubois",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    duration: 45,
    themes: ["theme-6"],
    globalRating: 4,
    comment:
      "Bonne gestion de la vitesse. Continue à adapter selon les conditions météo.",
    signatureUrl: "/signatures/lesson-2.png",
    kmDriven: 18.3,
    vehiclePlate: "VD 123456",
  },
];

export const mockObjectives: Objective[] = [
  {
    id: "obj-1",
    type: "learner_permit",
    status: "completed",
    completedDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
  },
  {
    id: "obj-2",
    type: "theory_course",
    status: "completed",
    completedDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
    currentValue: 8,
    targetValue: 8,
    progress: 100,
  },
  {
    id: "obj-3",
    type: "min_lessons",
    status: "in_progress",
    currentValue: 18,
    targetValue: 25,
    progress: 72,
  },
  {
    id: "obj-4",
    type: "awareness_course",
    status: "completed",
    completedDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
  },
  {
    id: "obj-5",
    type: "theory_exam",
    status: "completed",
    completedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    result: "45/50",
  },
  {
    id: "obj-6",
    type: "practical_exam",
    status: "not_started",
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    type: "continue",
    titleKey: "recommendations.parking_progress",
    descriptionKey: "recommendations.parking_progress_desc",
    priority: "low",
    actionType: "none",
    themeId: "theme-3",
    dismissed: false,
  },
  {
    id: "rec-2",
    type: "focus",
    titleKey: "recommendations.parking_needs_work",
    descriptionKey: "recommendations.parking_needs_work_desc",
    priority: "high",
    actionType: "book_lesson",
    themeId: "theme-2",
    dismissed: false,
  },
  {
    id: "rec-3",
    type: "review",
    titleKey: "recommendations.priorities_review",
    descriptionKey: "recommendations.priorities_review_desc",
    priority: "medium",
    actionType: "contact_instructor",
    themeId: "theme-5",
    dismissed: false,
  },
];

export const mockStudentProgression: StudentProgression = {
  studentId: "student-1",
  stats: {
    globalProgress: 72,
    masteredThemes: 1,
    learningThemes: 3,
    toWorkThemes: 2,
    lessonsCompleted: 18,
    lessonsRecommended: 25,
    categoryCode: "B",
  },
  themeScores: mockThemeScores,
  themes: mockLDriveThemes,
  evaluations: [],
  lessonHistory: mockLessonHistory,
  objectives: mockObjectives,
  milestones: [],
  recommendations: mockRecommendations,
  certificates: [],
  personalGoalDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  averageRating: 4.2,
  totalHours: 13.5,
  totalKm: 156.8,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getMasteryLevelColor(level: MasteryLevel): string {
  switch (level) {
    case "initiation":
      return "bg-red-500";
    case "en_cours":
      return "bg-orange-500";
    case "bien":
      return "bg-yellow-500";
    case "maitrise":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

export function getScoreColor(score: number): string {
  if (score < 50) return "bg-red-500";
  if (score < 75) return "bg-orange-500";
  return "bg-green-500";
}

export function calculateReadiness(
  progression: StudentProgression
): ReadinessLevel {
  const { stats, averageRating } = progression;
  const lessonsProgress = stats.lessonsCompleted / stats.lessonsRecommended;
  const globalProgress = stats.globalProgress / 100;
  const ratingScore = averageRating / 5;

  const readinessScore = (lessonsProgress + globalProgress + ratingScore) / 3;

  if (readinessScore >= 0.85) return "ready";
  if (readinessScore >= 0.7) return "soon";
  return "not_yet";
}
