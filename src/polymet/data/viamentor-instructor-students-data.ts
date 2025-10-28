/**
 * VIAMENTOR - Instructor Students Data
 * Mock data et types pour gestion élèves moniteur
 */

"use client";

// ============================================================================
// TYPES
// ============================================================================

export type StudentStatus = "active" | "inactive" | "exam_ready" | "abandoned";
export type LicenseCategory = "B" | "A" | "BE" | "A1" | "C" | "D";
export type EvaluationRating = 1 | 2 | 3 | 4 | 5;
export type CommunicationChannel = "email" | "phone" | "sms" | "in_app";
export type MessageStatus = "sent" | "delivered" | "read" | "failed";

export interface InstructorStudent {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  address?: string;
  birthDate: string;
  registrationDate: string;
  category: LicenseCategory;
  status: StudentStatus;
  progression: number; // 0-100%
  lessonsCompleted: number;
  lessonsRemaining: number;
  totalHours: number;
  totalKm?: number;
  lastLessonDate?: string;
  nextLessonDate?: string;
  averageRating?: number;
  targetExamDate?: string;
  balance: number; // Solde leçons
}

export interface StudentStats {
  totalStudents: number;
  activeThisMonth: number;
  averageProgression: number;
  upcomingExams: number;
}

export interface LessonRecord {
  id: string;
  studentId: string;
  date: string;
  duration: number; // minutes
  vehicle: string;
  meetingPoint: string;
  themes: string[];
  rating?: EvaluationRating;
  comment?: string;
  kmDriven?: number;
  status: "completed" | "canceled";
  instructorId: string;
}

export interface StudentEvaluation {
  id: string;
  studentId: string;
  lessonId: string;
  date: string;
  themes: string[];
  rating: EvaluationRating;
  comment: string;
  digitalSignature?: string;
  instructorId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProgressTheme {
  id: string;
  name: string;
  category: string;
  progress: number; // 0-100%
  status: "mastered" | "in_progress" | "to_work";
  lastEvaluationDate?: string;
  lastRating?: EvaluationRating;
}

export interface StudentNote {
  id: string;
  studentId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  instructorId: string;
}

export interface CommunicationHistory {
  id: string;
  studentId: string;
  channel: CommunicationChannel;
  subject?: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  sentBy: string;
}

export interface QuickEvaluationData {
  studentId: string;
  lessonDate: string;
  themes: string[];
  rating: EvaluationRating;
  comment?: string;
  digitalSignature?: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockInstructorStudents: InstructorStudent[] = [
  {
    id: "st-001",
    firstName: "Sophie",
    lastName: "Martin",
    avatar: "https://github.com/yusufhilmi.png",
    email: "sophie.martin@example.ch",
    phone: "+41 79 123 45 67",
    address: "Rue de Lausanne 45, 1003 Lausanne",
    birthDate: "2005-03-15",
    registrationDate: "2024-09-01",
    category: "B",
    status: "active",
    progression: 65,
    lessonsCompleted: 18,
    lessonsRemaining: 12,
    totalHours: 27,
    totalKm: 450,
    lastLessonDate: "2025-01-08",
    nextLessonDate: "2025-01-15",
    averageRating: 4.2,
    targetExamDate: "2025-03-15",
    balance: 12,
  },
  {
    id: "st-002",
    firstName: "Lucas",
    lastName: "Dubois",
    avatar: "https://github.com/kdrnp.png",
    email: "lucas.dubois@example.ch",
    phone: "+41 78 234 56 78",
    address: "Avenue de la Gare 12, 1005 Lausanne",
    birthDate: "2004-07-22",
    registrationDate: "2024-08-15",
    category: "A",
    status: "exam_ready",
    progression: 92,
    lessonsCompleted: 28,
    lessonsRemaining: 2,
    totalHours: 42,
    totalKm: 680,
    lastLessonDate: "2025-01-10",
    nextLessonDate: "2025-01-16",
    averageRating: 4.8,
    targetExamDate: "2025-01-25",
    balance: 2,
  },
  {
    id: "st-003",
    firstName: "Emma",
    lastName: "Rousseau",
    avatar: "https://github.com/yahyabedirhan.png",
    email: "emma.rousseau@example.ch",
    phone: "+41 76 345 67 89",
    birthDate: "2006-11-08",
    registrationDate: "2024-10-01",
    category: "B",
    status: "active",
    progression: 42,
    lessonsCompleted: 12,
    lessonsRemaining: 18,
    totalHours: 18,
    totalKm: 290,
    lastLessonDate: "2025-01-09",
    nextLessonDate: "2025-01-14",
    averageRating: 3.9,
    balance: 18,
  },
  {
    id: "st-004",
    firstName: "Thomas",
    lastName: "Bernard",
    avatar: "https://github.com/denizbuyuktas.png",
    email: "thomas.bernard@example.ch",
    phone: "+41 77 456 78 90",
    birthDate: "2005-05-30",
    registrationDate: "2024-11-15",
    category: "B",
    status: "active",
    progression: 28,
    lessonsCompleted: 8,
    lessonsRemaining: 22,
    totalHours: 12,
    totalKm: 180,
    lastLessonDate: "2025-01-11",
    balance: 22,
  },
  {
    id: "st-005",
    firstName: "Léa",
    lastName: "Petit",
    avatar: "https://github.com/shoaibux1.png",
    email: "lea.petit@example.ch",
    phone: "+41 79 567 89 01",
    birthDate: "2003-09-12",
    registrationDate: "2024-06-01",
    category: "BE",
    status: "inactive",
    progression: 15,
    lessonsCompleted: 5,
    lessonsRemaining: 0,
    totalHours: 7.5,
    lastLessonDate: "2024-12-10",
    averageRating: 3.4,
    balance: 0,
  },
];

export const mockStudentStats: StudentStats = {
  totalStudents: 5,
  activeThisMonth: 4,
  averageProgression: 48.4,
  upcomingExams: 1,
};

export const mockLessonRecords: LessonRecord[] = [
  {
    id: "les-001",
    studentId: "st-001",
    date: "2025-01-08T09:00:00",
    duration: 90,
    vehicle: "VW Golf - GE 12345",
    meetingPoint: "Place de la Gare, Lausanne",
    themes: ["parking", "roundabouts", "highway"],
    rating: 4,
    comment:
      "Bonne progression sur les ronds-points. À travailler: stationnement en créneau.",
    kmDriven: 35,
    status: "completed",
    instructorId: "inst-001",
  },
  {
    id: "les-002",
    studentId: "st-002",
    date: "2025-01-10T14:00:00",
    duration: 90,
    vehicle: "Honda CB500 - VD 67890",
    meetingPoint: "Parking Migros, Renens",
    themes: ["emergency_braking", "curves", "traffic"],
    rating: 5,
    comment: "Excellent contrôle. Prêt pour l'examen.",
    kmDriven: 45,
    status: "completed",
    instructorId: "inst-001",
  },
];

export const mockStudentEvaluations: StudentEvaluation[] = [
  {
    id: "eval-001",
    studentId: "st-001",
    lessonId: "les-001",
    date: "2025-01-08",
    themes: ["parking", "roundabouts", "highway"],
    rating: 4,
    comment:
      "Bonne progression générale. Points forts: anticipation, fluidité. À améliorer: stationnement en créneau, vérifications angles morts.",
    digitalSignature: "data:image/png;base64,iVBORw0KG...",
    instructorId: "inst-001",
    createdAt: "2025-01-08T11:30:00",
  },
  {
    id: "eval-002",
    studentId: "st-002",
    lessonId: "les-002",
    date: "2025-01-10",
    themes: ["emergency_braking", "curves", "traffic"],
    rating: 5,
    comment:
      "Maîtrise excellente de la moto. Freinage d'urgence parfait, trajectoires optimales. Prêt pour l'examen pratique.",
    instructorId: "inst-001",
    createdAt: "2025-01-10T16:00:00",
  },
];

export const mockProgressThemes: ProgressTheme[] = [
  {
    id: "th-001",
    name: "Démarrage et arrêt",
    category: "Bases",
    progress: 100,
    status: "mastered",
    lastEvaluationDate: "2024-12-15",
    lastRating: 5,
  },
  {
    id: "th-002",
    name: "Changements de vitesse",
    category: "Bases",
    progress: 95,
    status: "mastered",
    lastEvaluationDate: "2024-12-20",
    lastRating: 5,
  },
  {
    id: "th-003",
    name: "Ronds-points",
    category: "Circulation",
    progress: 75,
    status: "in_progress",
    lastEvaluationDate: "2025-01-08",
    lastRating: 4,
  },
  {
    id: "th-004",
    name: "Stationnement",
    category: "Manœuvres",
    progress: 60,
    status: "in_progress",
    lastEvaluationDate: "2025-01-08",
    lastRating: 3,
  },
  {
    id: "th-005",
    name: "Autoroute",
    category: "Circulation",
    progress: 70,
    status: "in_progress",
    lastEvaluationDate: "2025-01-08",
    lastRating: 4,
  },
  {
    id: "th-006",
    name: "Conduite de nuit",
    category: "Conditions",
    progress: 30,
    status: "to_work",
  },
  {
    id: "th-007",
    name: "Marche arrière",
    category: "Manœuvres",
    progress: 45,
    status: "to_work",
    lastEvaluationDate: "2024-12-28",
    lastRating: 3,
  },
];

export const mockStudentNotes: StudentNote[] = [
  {
    id: "note-001",
    studentId: "st-001",
    content:
      "Stress important sur autoroute - patience nécessaire. Préférer routes secondaires au début.",
    createdAt: "2024-12-15T10:30:00",
    instructorId: "inst-001",
  },
  {
    id: "note-002",
    studentId: "st-002",
    content: "Excellente concentration et motivation. Progression rapide.",
    createdAt: "2024-12-20T14:00:00",
    instructorId: "inst-001",
  },
  {
    id: "note-003",
    studentId: "st-005",
    content:
      "Problèmes financiers - flexible sur délais paiement. Famille monoparentale.",
    createdAt: "2024-12-10T16:00:00",
    instructorId: "inst-001",
  },
];

export const mockCommunicationHistory: CommunicationHistory[] = [
  {
    id: "comm-001",
    studentId: "st-001",
    channel: "email",
    subject: "Confirmation leçon 15/01",
    content:
      "Bonjour Sophie, je confirme notre leçon du 15/01 à 14h. RDV Place de la Gare.",
    timestamp: "2025-01-12T10:00:00",
    status: "read",
    sentBy: "inst-001",
  },
  {
    id: "comm-002",
    studentId: "st-002",
    channel: "sms",
    content: "Lucas, rappel: leçon demain 14h. N'oublie pas ton casque!",
    timestamp: "2025-01-12T18:00:00",
    status: "delivered",
    sentBy: "inst-001",
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getStudentFullName(student: InstructorStudent): string {
  return `${student.firstName} ${student.lastName}`;
}

export function getStudentAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function getDaysUntilExam(targetDate: string): number {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getRelativeDate(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffTime = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem`;
  return `Il y a ${Math.floor(diffDays / 30)} mois`;
}

export function getStatusColor(status: StudentStatus): string {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "inactive":
      return "bg-gray-500";
    case "exam_ready":
      return "bg-orange-500";
    case "abandoned":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function getProgressionColor(progression: number): string {
  if (progression < 30) return "text-red-500";
  if (progression < 70) return "text-orange-500";
  return "text-green-500";
}

export function calculateAverageRating(
  evaluations: StudentEvaluation[]
): number {
  if (evaluations.length === 0) return 0;
  const sum = evaluations.reduce(
    (acc, evaluation) => acc + evaluation.rating,
    0
  );
  return Math.round((sum / evaluations.length) * 10) / 10;
}

export function getThemesByStatus(
  themes: ProgressTheme[],
  status: ProgressTheme["status"]
): ProgressTheme[] {
  return themes.filter((theme) => theme.status === status);
}
