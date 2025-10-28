/**
 * VIAMENTOR - Instructor Makeups Data
 * Mock data pour suivi moniteur rattrapages
 */

import type {
  MakeupCredit,
  MakeupReason,
  MakeupStatus,
} from "./viamentor-makeups-data";

/**
 * Stats rattrapages par élève pour moniteur
 */
export interface StudentMakeupsStats {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  available: number;
  expiresIn?: {
    days: number;
    date: string;
    urgent: boolean; // <3 days
  };
  used: number;
  expired: number;
  usageRate: number; // %
  makeups: MakeupCredit[];
}

/**
 * Extension historique
 */
export interface MakeupExtension {
  id: string;
  makeupId: string;
  extendedBy: string;
  extendedByName: string;
  extendedByAvatar: string;
  extendedAt: string;
  daysAdded: number;
  previousExpiry: string;
  newExpiry: string;
  reason: string;
  notified: boolean;
}

/**
 * Stats globales moniteur
 */
export interface InstructorMakeupsGlobalStats {
  available: number;
  expiredThisMonth: number;
  used: number;
  usageRate: number; // %
}

/**
 * Mock extensions
 */
export const MOCK_MAKEUP_EXTENSIONS: MakeupExtension[] = [
  {
    id: "ext-1",
    makeupId: "makeup-1",
    extendedBy: "instructor-1",
    extendedByName: "Pierre Dupont",
    extendedByAvatar: "https://github.com/yusufhilmi.png",
    extendedAt: "2025-01-20T14:30:00Z",
    daysAdded: 7,
    previousExpiry: "2025-02-10T18:00:00Z",
    newExpiry: "2025-02-17T18:00:00Z",
    reason: "Élève en déplacement professionnel",
    notified: true,
  },
];

/**
 * Mock students makeups stats
 */
export const MOCK_INSTRUCTOR_STUDENTS_MAKEUPS: StudentMakeupsStats[] = [
  {
    studentId: "student-1",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/kdrnp.png",
    studentEmail: "sophie.martin@example.com",
    available: 2,
    expiresIn: {
      days: 2,
      date: "2025-01-18T18:00:00Z",
      urgent: true,
    },
    used: 3,
    expired: 1,
    usageRate: 75.0,
    makeups: [
      {
        id: "makeup-1",
        studentId: "student-1",
        studentName: "Sophie Martin",
        lessonId: "lesson-4",
        originalDate: "2025-01-12T09:00:00",
        category: "B",
        reason: "illness_with_certificate",
        reasonDetails: "Certificat médical fourni",
        status: "available",
        createdAt: "2025-01-11T18:00:00Z",
        expiresAt: "2025-01-18T18:00:00Z",
        notified: true,
        notifiedAt: "2025-01-11T18:05:00Z",
      },
      {
        id: "makeup-4",
        studentId: "student-1",
        studentName: "Sophie Martin",
        lessonId: "lesson-8",
        originalDate: "2025-01-08T11:00:00",
        category: "B",
        reason: "vehicle_breakdown",
        reasonDetails: "Panne véhicule école",
        status: "booked",
        createdAt: "2025-01-07T19:00:00Z",
        expiresAt: "2025-02-06T19:00:00Z",
        usedLessonId: "lesson-9",
        notified: true,
        notifiedAt: "2025-01-07T19:05:00Z",
      },
      {
        id: "makeup-10",
        studentId: "student-1",
        studentName: "Sophie Martin",
        lessonId: "lesson-20",
        originalDate: "2025-01-02T14:00:00",
        category: "B",
        reason: "dangerous_weather",
        reasonDetails: "Neige abondante",
        status: "used",
        createdAt: "2025-01-01T20:00:00Z",
        expiresAt: "2025-01-31T20:00:00Z",
        usedAt: "2025-01-05T10:00:00Z",
        usedLessonId: "lesson-21",
        notified: true,
        notifiedAt: "2025-01-01T20:05:00Z",
      },
      {
        id: "makeup-11",
        studentId: "student-1",
        studentName: "Sophie Martin",
        lessonId: "lesson-22",
        originalDate: "2024-12-20T10:00:00",
        category: "B",
        reason: "family_emergency",
        reasonDetails: "Urgence familiale",
        status: "expired",
        createdAt: "2024-12-19T18:00:00Z",
        expiresAt: "2025-01-10T18:00:00Z",
        notified: true,
        notifiedAt: "2024-12-19T18:05:00Z",
      },
    ],
  },
  {
    studentId: "student-2",
    studentName: "Marc Dubois",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    studentEmail: "marc.dubois@example.com",
    available: 1,
    expiresIn: {
      days: 15,
      date: "2025-01-31T16:00:00Z",
      urgent: false,
    },
    used: 4,
    expired: 0,
    usageRate: 100.0,
    makeups: [
      {
        id: "makeup-6",
        studentId: "student-2",
        studentName: "Marc Dubois",
        lessonId: "lesson-12",
        originalDate: "2025-01-10T14:00:00",
        category: "B",
        reason: "professional_impediment",
        reasonDetails: "Réunion professionnelle urgente",
        status: "available",
        createdAt: "2025-01-09T16:00:00Z",
        expiresAt: "2025-01-31T16:00:00Z",
        notified: true,
        notifiedAt: "2025-01-09T16:05:00Z",
      },
    ],
  },
  {
    studentId: "student-3",
    studentName: "Emma Rousseau",
    studentAvatar: "https://github.com/denizbuyuktas.png",
    studentEmail: "emma.rousseau@example.com",
    available: 0,
    expiresIn: undefined,
    used: 2,
    expired: 3,
    usageRate: 40.0,
    makeups: [
      {
        id: "makeup-3",
        studentId: "student-3",
        studentName: "Emma Rousseau",
        lessonId: "lesson-7",
        originalDate: "2024-12-15T10:00:00",
        category: "B",
        reason: "family_emergency",
        reasonDetails: "Urgence familiale",
        status: "expired",
        createdAt: "2024-12-14T20:00:00Z",
        expiresAt: "2025-01-13T20:00:00Z",
        notified: true,
        notifiedAt: "2024-12-14T20:05:00Z",
      },
      {
        id: "makeup-7",
        studentId: "student-3",
        studentName: "Emma Rousseau",
        lessonId: "lesson-13",
        originalDate: "2024-12-10T09:00:00",
        category: "B",
        reason: "illness_with_certificate",
        reasonDetails: "Grippe",
        status: "expired",
        createdAt: "2024-12-09T18:00:00Z",
        expiresAt: "2025-01-08T18:00:00Z",
        notified: true,
        notifiedAt: "2024-12-09T18:05:00Z",
      },
      {
        id: "makeup-8",
        studentId: "student-3",
        studentName: "Emma Rousseau",
        lessonId: "lesson-14",
        originalDate: "2024-12-05T15:00:00",
        category: "B",
        reason: "dangerous_weather",
        reasonDetails: "Verglas",
        status: "expired",
        createdAt: "2024-12-04T20:00:00Z",
        expiresAt: "2025-01-03T20:00:00Z",
        notified: true,
        notifiedAt: "2024-12-04T20:05:00Z",
      },
    ],
  },
  {
    studentId: "student-4",
    studentName: "Lucas Bernard",
    studentAvatar: "https://github.com/shoaibux1.png",
    studentEmail: "lucas.bernard@example.com",
    available: 1,
    expiresIn: {
      days: 5,
      date: "2025-01-21T10:00:00Z",
      urgent: false,
    },
    used: 5,
    expired: 1,
    usageRate: 83.3,
    makeups: [
      {
        id: "makeup-9",
        studentId: "student-4",
        studentName: "Lucas Bernard",
        lessonId: "lesson-15",
        originalDate: "2025-01-11T10:00:00",
        category: "B",
        reason: "vehicle_breakdown",
        reasonDetails: "Panne véhicule",
        status: "available",
        createdAt: "2025-01-10T18:00:00Z",
        expiresAt: "2025-01-21T10:00:00Z",
        notified: true,
        notifiedAt: "2025-01-10T18:05:00Z",
      },
    ],
  },
  {
    studentId: "student-5",
    studentName: "Léa Petit",
    studentAvatar: "https://github.com/viamentor-ai.png",
    studentEmail: "lea.petit@example.com",
    available: 0,
    expiresIn: undefined,
    used: 6,
    expired: 0,
    usageRate: 100.0,
    makeups: [],
  },
];

/**
 * Mock global stats
 */
export const MOCK_INSTRUCTOR_MAKEUPS_GLOBAL_STATS: InstructorMakeupsGlobalStats =
  {
    available: 4,
    expiredThisMonth: 5,
    used: 20,
    usageRate: 76.9,
  };
