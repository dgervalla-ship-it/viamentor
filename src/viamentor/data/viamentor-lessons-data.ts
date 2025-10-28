/**
 * VIAMENTOR - Lessons Data
 * Mock data pour leçons pratiques avec types complets
 */

import type { LicenseCategory } from "./viamentor-students-data";

/**
 * Status de leçon
 */
export type LessonStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "canceled";

/**
 * Type de leçon
 */
export type LessonType = "practical" | "theory" | "exam" | "evaluation";

/**
 * Point de rendez-vous
 */
export interface MeetingPoint {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * Historique de leçon
 */
export interface LessonHistoryEntry {
  id: string;
  action:
    | "created"
    | "scheduled"
    | "confirmed"
    | "started"
    | "completed"
    | "canceled"
    | "rescheduled";
  date: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
  details?: string;
  metadata?: Record<string, any>;
}

/**
 * Leçon pratique
 */
export interface Lesson {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  category: LicenseCategory;
  type: LessonType;
  status: LessonStatus;
  startDate: string;
  endDate: string;
  duration: number; // minutes
  meetingPoint: MeetingPoint;
  notes?: string;
  price: number;
  isPaid: boolean;
  cancelReason?: string;
  completionNotes?: string;
  instructorRating?: number;
  history: LessonHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Raisons d'annulation templates
 */
export const CANCEL_REASONS = {
  student_unavailable: "Élève indisponible",
  instructor_sick: "Moniteur malade",
  vehicle_breakdown: "Panne véhicule",
  weather: "Conditions météo défavorables",
  student_request: "Demande de l'élève",
  administrative: "Raison administrative",
  other: "Autre raison",
} as const;

/**
 * Points de rendez-vous
 */
export const MEETING_POINTS: MeetingPoint[] = [
  {
    id: "mp-1",
    name: "Auto-École (Siège)",
    address: "Rue de la Gare 15, 1201 Genève",
    coordinates: { lat: 46.2104, lng: 6.1432 },
  },
  {
    id: "mp-2",
    name: "Place de Neuve",
    address: "Place de Neuve, 1204 Genève",
    coordinates: { lat: 46.2017, lng: 6.1423 },
  },
  {
    id: "mp-3",
    name: "Gare Cornavin",
    address: "Place de Cornavin, 1201 Genève",
    coordinates: { lat: 46.2104, lng: 6.1432 },
  },
  {
    id: "mp-4",
    name: "Domicile élève",
    address: "Adresse personnalisée",
    coordinates: { lat: 46.2044, lng: 6.1432 },
  },
];

/**
 * Mock lessons data
 */
export const MOCK_LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    studentId: "student-1",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/yusufhilmi.png",
    instructorId: "instructor-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/kdrnp.png",
    vehicleId: "vehicle-1",
    vehiclePlate: "GE 123456",
    vehicleModel: "VW Golf 8",
    category: "B",
    type: "practical",
    status: "scheduled",
    startDate: "2025-01-15T14:30:00",
    endDate: "2025-01-15T16:00:00",
    duration: 90,
    meetingPoint: MEETING_POINTS[0],
    notes: "Première leçon de circulation en ville",
    price: 120,
    isPaid: true,
    history: [
      {
        id: "h-1",
        action: "created",
        date: "2025-01-10T10:00:00",
        user: { id: "admin-1", name: "Admin", role: "School Admin" },
      },
      {
        id: "h-2",
        action: "scheduled",
        date: "2025-01-10T10:05:00",
        user: { id: "admin-1", name: "Admin", role: "School Admin" },
      },
      {
        id: "h-3",
        action: "confirmed",
        date: "2025-01-12T09:30:00",
        user: { id: "student-1", name: "Sophie Martin", role: "Student" },
        details: "Email de confirmation ouvert",
      },
    ],

    createdAt: "2025-01-10T10:00:00",
    updatedAt: "2025-01-12T09:30:00",
  },
  {
    id: "lesson-2",
    studentId: "student-2",
    studentName: "Marc Dubois",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    instructorId: "instructor-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/kdrnp.png",
    vehicleId: "vehicle-1",
    vehiclePlate: "GE 123456",
    vehicleModel: "VW Golf 8",
    category: "B",
    type: "practical",
    status: "in_progress",
    startDate: "2025-01-14T10:00:00",
    endDate: "2025-01-14T11:30:00",
    duration: 90,
    meetingPoint: MEETING_POINTS[1],
    notes: "Leçon de stationnement et manœuvres",
    price: 120,
    isPaid: true,
    history: [
      {
        id: "h-4",
        action: "created",
        date: "2025-01-08T14:00:00",
        user: { id: "admin-1", name: "Admin", role: "School Admin" },
      },
      {
        id: "h-5",
        action: "started",
        date: "2025-01-14T10:00:00",
        user: { id: "instructor-1", name: "Jean Dupont", role: "Instructor" },
        details: "Leçon démarrée",
      },
    ],

    createdAt: "2025-01-08T14:00:00",
    updatedAt: "2025-01-14T10:00:00",
  },
  {
    id: "lesson-3",
    studentId: "student-3",
    studentName: "Emma Rousseau",
    studentAvatar: "https://github.com/denizbuyuktas.png",
    instructorId: "instructor-2",
    instructorName: "Marie Leclerc",
    instructorAvatar: "https://github.com/shoaibux1.png",
    vehicleId: "vehicle-2",
    vehiclePlate: "GE 789012",
    vehicleModel: "Audi A3",
    category: "B",
    type: "practical",
    status: "completed",
    startDate: "2025-01-13T16:00:00",
    endDate: "2025-01-13T17:30:00",
    duration: 90,
    meetingPoint: MEETING_POINTS[2],
    notes: "Leçon de conduite sur autoroute",
    price: 120,
    isPaid: true,
    completionNotes: "Excellente progression, prête pour l'examen",
    instructorRating: 5,
    history: [
      {
        id: "h-6",
        action: "created",
        date: "2025-01-05T11:00:00",
        user: { id: "admin-1", name: "Admin", role: "School Admin" },
      },
      {
        id: "h-7",
        action: "started",
        date: "2025-01-13T16:00:00",
        user: { id: "instructor-2", name: "Marie Leclerc", role: "Instructor" },
      },
      {
        id: "h-8",
        action: "completed",
        date: "2025-01-13T17:30:00",
        user: { id: "instructor-2", name: "Marie Leclerc", role: "Instructor" },
        details: "Leçon terminée avec succès",
      },
    ],

    createdAt: "2025-01-05T11:00:00",
    updatedAt: "2025-01-13T17:30:00",
  },
  {
    id: "lesson-4",
    studentId: "student-4",
    studentName: "Lucas Bernard",
    studentAvatar: "https://github.com/yusufhilmi.png",
    instructorId: "instructor-1",
    instructorName: "Jean Dupont",
    instructorAvatar: "https://github.com/kdrnp.png",
    vehicleId: "vehicle-1",
    vehiclePlate: "GE 123456",
    vehicleModel: "VW Golf 8",
    category: "B",
    type: "practical",
    status: "canceled",
    startDate: "2025-01-12T09:00:00",
    endDate: "2025-01-12T10:30:00",
    duration: 90,
    meetingPoint: MEETING_POINTS[0],
    notes: "Leçon de conduite en ville",
    price: 120,
    isPaid: false,
    cancelReason: "Élève malade, demande de report à la semaine prochaine",
    history: [
      {
        id: "h-9",
        action: "created",
        date: "2025-01-03T15:00:00",
        user: { id: "admin-1", name: "Admin", role: "School Admin" },
      },
      {
        id: "h-10",
        action: "canceled",
        date: "2025-01-11T18:00:00",
        user: { id: "student-4", name: "Lucas Bernard", role: "Student" },
        details: "Annulation par l'élève",
      },
    ],

    createdAt: "2025-01-03T15:00:00",
    updatedAt: "2025-01-11T18:00:00",
  },
];

/**
 * Helper: Get lesson by ID
 */
export function getLessonById(id: string): Lesson | undefined {
  return MOCK_LESSONS.find((lesson) => lesson.id === id);
}

/**
 * Helper: Get lessons by student
 */
export function getLessonsByStudent(studentId: string): Lesson[] {
  return MOCK_LESSONS.filter((lesson) => lesson.studentId === studentId);
}

/**
 * Helper: Get lessons by instructor
 */
export function getLessonsByInstructor(instructorId: string): Lesson[] {
  return MOCK_LESSONS.filter((lesson) => lesson.instructorId === instructorId);
}

/**
 * Helper: Get lessons by date range
 */
export function getLessonsByDateRange(
  startDate: string,
  endDate: string
): Lesson[] {
  return MOCK_LESSONS.filter(
    (lesson) => lesson.startDate >= startDate && lesson.startDate <= endDate
  );
}

/**
 * Helper: Get lessons by status
 */
export function getLessonsByStatus(status: LessonStatus): Lesson[] {
  return MOCK_LESSONS.filter((lesson) => lesson.status === status);
}
