/**
 * ============================================================================
 * VIAMENTOR - Exams Data
 * Mock data et types pour gestion examens théoriques et pratiques
 * ============================================================================
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Types d'examens
 */
export type ExamType = "theory" | "practical" | "first_aid" | "awareness";

/**
 * Statuts d'examen
 */
export type ExamStatus =
  | "scheduled" // Planifié
  | "in_progress" // En cours
  | "completed" // Terminé
  | "passed" // Réussi
  | "failed" // Échoué
  | "cancelled" // Annulé
  | "no_show"; // Absent

/**
 * Catégories de permis
 */
export type LicenseCategory = "A" | "A1" | "B" | "C" | "D" | "BE" | "CE" | "DE";

/**
 * Résultat par thème
 */
export interface ExamThemeResult {
  themeId: string;
  themeName: string;
  questionsCount: number;
  correctAnswers: number;
  score: number; // Pourcentage
  passed: boolean;
}

/**
 * Résultat d'examen
 */
export interface ExamResult {
  totalQuestions?: number;
  correctAnswers?: number;
  score: number; // Pourcentage ou points
  passed: boolean;
  passingScore: number;
  themeResults?: ExamThemeResult[];
  evaluatorNotes?: string;
  weakPoints?: string[];
  strongPoints?: string[];
}

/**
 * Document d'examen
 */
export interface ExamDocument {
  id: string;
  type: "convocation" | "result" | "certificate" | "invoice";
  name: string;
  url: string;
  uploadedAt: Date;
  size: number;
}

/**
 * Examen
 */
export interface Exam {
  id: string;
  type: ExamType;
  category: LicenseCategory;
  status: ExamStatus;

  // Étudiant
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;

  // Planification
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // minutes
  location: string;
  locationAddress: string;

  // Examinateur (pour pratique)
  examinerId?: string;
  examinerName?: string;

  // Moniteur référent (pour pratique)
  instructorId?: string;
  instructorName?: string;

  // Véhicule (pour pratique)
  vehicleId?: string;
  vehiclePlate?: string;

  // Résultats
  result?: ExamResult;
  completedAt?: Date;

  // Financier
  fee: number;
  paid: boolean;
  invoiceId?: string;

  // Documents
  documents: ExamDocument[];

  // Tentatives
  attemptNumber: number;
  previousAttempts?: string[]; // IDs des tentatives précédentes

  // Métadonnées
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Examen blanc
 */
export interface MockExam {
  id: string;
  type: "theory" | "practical";
  category: LicenseCategory;
  status: "scheduled" | "completed" | "cancelled";

  // Étudiant
  studentId: string;
  studentName: string;

  // Planification
  scheduledDate: Date;
  scheduledTime: string;
  duration: number;

  // Instructeur (pour pratique)
  instructorId?: string;
  instructorName?: string;

  // Résultats
  result?: ExamResult;
  completedAt?: Date;

  // Métadonnées
  notes?: string;
  createdAt: Date;
}

/**
 * Statistiques examens
 */
export interface ExamStats {
  total: number;
  scheduled: number;
  completed: number;
  passed: number;
  failed: number;
  cancelled: number;
  noShow: number;
  successRate: number;
  averageScore: number;
  averageAttempts: number;
}

/**
 * Filtres examens
 */
export interface ExamFilters {
  search?: string;
  type?: ExamType[];
  status?: ExamStatus[];
  category?: LicenseCategory[];
  dateFrom?: Date;
  dateTo?: Date;
  studentId?: string;
  instructorId?: string;
  paid?: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Examens mock
 */
export const mockExams: Exam[] = [
  {
    id: "exam-001",
    type: "theory",
    category: "B",
    status: "passed",
    studentId: "student-001",
    studentName: "Sophie Martin",
    studentEmail: "sophie.martin@email.com",
    studentPhone: "+41 79 123 45 67",
    scheduledDate: new Date("2024-01-15T09:00:00"),
    scheduledTime: "09:00",
    duration: 45,
    location: "Centre d'examen Lausanne",
    locationAddress: "Rue de Genève 15, 1003 Lausanne",
    result: {
      totalQuestions: 50,
      correctAnswers: 47,
      score: 94,
      passed: true,
      passingScore: 90,
      themeResults: [
        {
          themeId: "theme-1",
          themeName: "Signalisation",
          questionsCount: 15,
          correctAnswers: 14,
          score: 93,
          passed: true,
        },
        {
          themeId: "theme-2",
          themeName: "Règles de circulation",
          questionsCount: 20,
          correctAnswers: 19,
          score: 95,
          passed: true,
        },
        {
          themeId: "theme-3",
          themeName: "Sécurité routière",
          questionsCount: 15,
          correctAnswers: 14,
          score: 93,
          passed: true,
        },
      ],

      strongPoints: [
        "Excellente connaissance de la signalisation",
        "Bonne maîtrise des priorités",
      ],

      weakPoints: ["Quelques hésitations sur les distances de sécurité"],
    },
    completedAt: new Date("2024-01-15T09:45:00"),
    fee: 150,
    paid: true,
    invoiceId: "inv-001",
    documents: [
      {
        id: "doc-001",
        type: "convocation",
        name: "Convocation examen théorique",
        url: "/documents/convocation-001.pdf",
        uploadedAt: new Date("2024-01-08"),
        size: 245000,
      },
      {
        id: "doc-002",
        type: "result",
        name: "Résultat examen théorique",
        url: "/documents/result-001.pdf",
        uploadedAt: new Date("2024-01-15"),
        size: 180000,
      },
    ],

    attemptNumber: 1,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "exam-002",
    type: "practical",
    category: "B",
    status: "scheduled",
    studentId: "student-002",
    studentName: "Marc Dubois",
    studentEmail: "marc.dubois@email.com",
    studentPhone: "+41 79 234 56 78",
    scheduledDate: new Date("2024-12-20T14:00:00"),
    scheduledTime: "14:00",
    duration: 75,
    location: "Centre d'examen Genève",
    locationAddress: "Avenue de France 23, 1202 Genève",
    examinerId: "examiner-001",
    examinerName: "Pierre Leclerc",
    instructorId: "instructor-001",
    instructorName: "Jean Dupont",
    vehicleId: "vehicle-001",
    vehiclePlate: "VD 123456",
    fee: 250,
    paid: true,
    invoiceId: "inv-002",
    documents: [
      {
        id: "doc-003",
        type: "convocation",
        name: "Convocation examen pratique",
        url: "/documents/convocation-002.pdf",
        uploadedAt: new Date("2024-12-13"),
        size: 260000,
      },
    ],

    attemptNumber: 1,
    notes: "Élève bien préparé, confiant",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-13"),
  },
  {
    id: "exam-003",
    type: "practical",
    category: "B",
    status: "failed",
    studentId: "student-003",
    studentName: "Julie Rousseau",
    studentEmail: "julie.rousseau@email.com",
    studentPhone: "+41 79 345 67 89",
    scheduledDate: new Date("2024-01-10T10:00:00"),
    scheduledTime: "10:00",
    duration: 75,
    location: "Centre d'examen Lausanne",
    locationAddress: "Rue de Genève 15, 1003 Lausanne",
    examinerId: "examiner-002",
    examinerName: "Marie Favre",
    instructorId: "instructor-002",
    instructorName: "Claire Moreau",
    vehicleId: "vehicle-002",
    vehiclePlate: "VD 234567",
    result: {
      score: 65,
      passed: false,
      passingScore: 80,
      evaluatorNotes:
        "Manque d'assurance dans les manœuvres de stationnement. Contrôles visuels insuffisants.",
      weakPoints: [
        "Stationnement en créneau",
        "Contrôles des angles morts",
        "Gestion du stress",
      ],

      strongPoints: [
        "Bonne maîtrise de la boîte manuelle",
        "Respect des limitations de vitesse",
      ],
    },
    completedAt: new Date("2024-01-10T11:15:00"),
    fee: 250,
    paid: true,
    invoiceId: "inv-003",
    documents: [
      {
        id: "doc-004",
        type: "convocation",
        name: "Convocation examen pratique",
        url: "/documents/convocation-003.pdf",
        uploadedAt: new Date("2024-01-03"),
        size: 255000,
      },
      {
        id: "doc-005",
        type: "result",
        name: "Résultat examen pratique",
        url: "/documents/result-003.pdf",
        uploadedAt: new Date("2024-01-10"),
        size: 190000,
      },
    ],

    attemptNumber: 1,
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "exam-004",
    type: "first_aid",
    category: "B",
    status: "passed",
    studentId: "student-004",
    studentName: "Thomas Blanc",
    studentEmail: "thomas.blanc@email.com",
    studentPhone: "+41 79 456 78 90",
    scheduledDate: new Date("2024-01-08T13:00:00"),
    scheduledTime: "13:00",
    duration: 600, // 10 heures
    location: "Croix-Rouge Suisse - Lausanne",
    locationAddress: "Avenue de la Gare 10, 1003 Lausanne",
    result: {
      score: 100,
      passed: true,
      passingScore: 100,
    },
    completedAt: new Date("2024-01-08T18:00:00"),
    fee: 150,
    paid: true,
    invoiceId: "inv-004",
    documents: [
      {
        id: "doc-006",
        type: "certificate",
        name: "Certificat premiers secours",
        url: "/documents/certificate-001.pdf",
        uploadedAt: new Date("2024-01-08"),
        size: 320000,
      },
    ],

    attemptNumber: 1,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-08"),
  },
];

/**
 * Examens blancs mock
 */
export const mockMockExams: MockExam[] = [
  {
    id: "mock-001",
    type: "theory",
    category: "B",
    status: "completed",
    studentId: "student-001",
    studentName: "Sophie Martin",
    scheduledDate: new Date("2024-01-10T14:00:00"),
    scheduledTime: "14:00",
    duration: 45,
    result: {
      totalQuestions: 50,
      correctAnswers: 42,
      score: 84,
      passed: false,
      passingScore: 90,
      themeResults: [
        {
          themeId: "theme-1",
          themeName: "Signalisation",
          questionsCount: 15,
          correctAnswers: 13,
          score: 87,
          passed: true,
        },
        {
          themeId: "theme-2",
          themeName: "Règles de circulation",
          questionsCount: 20,
          correctAnswers: 16,
          score: 80,
          passed: false,
        },
        {
          themeId: "theme-3",
          themeName: "Sécurité routière",
          questionsCount: 15,
          correctAnswers: 13,
          score: 87,
          passed: true,
        },
      ],

      weakPoints: ["Priorités aux intersections", "Distances de sécurité"],
    },
    completedAt: new Date("2024-01-10T14:45:00"),
    notes: "Bon niveau général, réviser les priorités",
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "mock-002",
    type: "practical",
    category: "B",
    status: "completed",
    studentId: "student-002",
    studentName: "Marc Dubois",
    scheduledDate: new Date("2024-12-15T10:00:00"),
    scheduledTime: "10:00",
    duration: 75,
    instructorId: "instructor-001",
    instructorName: "Jean Dupont",
    result: {
      score: 88,
      passed: true,
      passingScore: 80,
      evaluatorNotes: "Très bonne prestation, prêt pour l'examen officiel",
      strongPoints: [
        "Excellente maîtrise du véhicule",
        "Bons contrôles visuels",
        "Anticipation correcte",
      ],

      weakPoints: ["Légère nervosité au démarrage"],
    },
    completedAt: new Date("2024-12-15T11:15:00"),
    notes: "Élève prêt pour l'examen",
    createdAt: new Date("2024-12-13"),
  },
];

/**
 * Statistiques examens
 */
export const mockExamStats: ExamStats = {
  total: 156,
  scheduled: 23,
  completed: 133,
  passed: 98,
  failed: 28,
  cancelled: 5,
  noShow: 2,
  successRate: 77.8,
  averageScore: 82.5,
  averageAttempts: 1.3,
};

/**
 * Thèmes d'examen théorique
 */
export const theoryExamThemes = [
  { id: "theme-1", name: "Signalisation", questionsCount: 15 },
  { id: "theme-2", name: "Règles de circulation", questionsCount: 20 },
  { id: "theme-3", name: "Sécurité routière", questionsCount: 15 },
];

/**
 * Centres d'examen
 */
export const examCenters = [
  {
    id: "center-001",
    name: "Centre d'examen Lausanne",
    address: "Rue de Genève 15, 1003 Lausanne",
    canton: "VD",
    types: ["theory", "practical"],
  },
  {
    id: "center-002",
    name: "Centre d'examen Genève",
    address: "Avenue de France 23, 1202 Genève",
    canton: "GE",
    types: ["theory", "practical"],
  },
  {
    id: "center-003",
    name: "Croix-Rouge Suisse - Lausanne",
    address: "Avenue de la Gare 10, 1003 Lausanne",
    canton: "VD",
    types: ["first_aid"],
  },
];
