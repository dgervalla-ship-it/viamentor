/**
 * VIAMENTOR - Makeups Data
 * Mock data et types pour système rattrapages
 */

import type { LicenseCategory } from "./viamentor-students-data";

/**
 * Raisons d'annulation valides pour rattrapage
 */
export type MakeupReason =
  | "illness_with_certificate"
  | "family_emergency"
  | "dangerous_weather"
  | "vehicle_breakdown"
  | "professional_impediment"
  | "other_justified";

/**
 * Status crédit rattrapage
 */
export type MakeupStatus =
  | "available"
  | "booked"
  | "pending"
  | "used"
  | "expired"
  | "cancelled";

/**
 * Configuration règles rattrapages par catégorie
 */
export interface MakeupConfig {
  id: string;
  tenantId: string;
  category: LicenseCategory | "all";
  maxDaysFromCancellation: number; // 7-90 jours
  expiryDays: number; // Durée validité crédit
  validReasons: MakeupReason[];
  requiresAdminValidation: boolean;
  autoNotifyStudent: boolean;
  sendReminders: boolean; // J-7, J-3, J-1
  reminderDays: number[]; // [7, 3, 1]
  minBookingHoursAdvance: number; // 24h par défaut
  allowMultipleMakeups: boolean; // Cumul ou limite 1
  createdAt: string;
  updatedAt: string;
}

/**
 * Crédit rattrapage élève
 */
export interface MakeupCredit {
  id: string;
  studentId: string;
  studentName: string;
  lessonId: string;
  originalDate: string;
  category: LicenseCategory;
  reason: MakeupReason;
  reasonDetails?: string;
  status: MakeupStatus;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
  usedLessonId?: string;
  notified: boolean;
  notifiedAt?: string;
  validatedBy?: string;
  validatedAt?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

/**
 * Template email rattrapage
 */
export interface MakeupEmailTemplate {
  id: string;
  type: "available" | "reminder_7" | "reminder_3" | "reminder_1" | "expired";
  language: "fr" | "de" | "it" | "en";
  subject: string;
  body: string; // HTML avec variables
  active: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Variables disponibles pour templates
 */
export const TEMPLATE_VARIABLES = {
  studentName: "Nom de l'élève",
  lessonDate: "Date leçon annulée",
  reason: "Raison annulation",
  expiryDate: "Date expiration crédit",
  daysRemaining: "Jours restants",
  bookingLink: "Lien réservation",
  schoolName: "Nom auto-école",
  schoolPhone: "Téléphone école",
  schoolEmail: "Email école",
} as const;

/**
 * Analytics rattrapages
 */
export interface MakeupAnalytics {
  period: {
    start: string;
    end: string;
  };
  stats: {
    creditsCreated: number;
    creditsUsed: number;
    creditsExpired: number;
    creditsPending: number;
    usageRate: number; // %
    expiryRate: number; // %
    avgDaysToUse: number;
  };
  byCategory: {
    category: LicenseCategory;
    created: number;
    used: number;
    expired: number;
    usageRate: number;
  }[];
  byReason: {
    reason: MakeupReason;
    count: number;
    percentage: number;
  }[];
  trend: {
    month: string;
    created: number;
    used: number;
    expired: number;
  }[];
}

/**
 * Mock configurations
 */
export const MOCK_MAKEUP_CONFIGS: MakeupConfig[] = [
  {
    id: "config-1",
    tenantId: "tenant-1",
    category: "all",
    maxDaysFromCancellation: 30,
    expiryDays: 30,
    validReasons: [
      "illness_with_certificate",
      "family_emergency",
      "dangerous_weather",
      "vehicle_breakdown",
      "professional_impediment",
      "other_justified",
    ],

    requiresAdminValidation: false,
    autoNotifyStudent: true,
    sendReminders: true,
    reminderDays: [7, 3, 1],
    minBookingHoursAdvance: 24,
    allowMultipleMakeups: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
];

/**
 * Mock crédits rattrapages
 */
export const MOCK_MAKEUP_CREDITS: MakeupCredit[] = [
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
    expiresAt: "2025-02-10T18:00:00Z",
    notified: true,
    notifiedAt: "2025-01-11T18:05:00Z",
  },
  {
    id: "makeup-2",
    studentId: "student-2",
    studentName: "Marc Dubois",
    lessonId: "lesson-5",
    originalDate: "2025-01-05T14:00:00",
    category: "B",
    reason: "dangerous_weather",
    reasonDetails: "Tempête de neige",
    status: "used",
    createdAt: "2025-01-04T16:00:00Z",
    expiresAt: "2025-02-03T16:00:00Z",
    usedAt: "2025-01-08T10:00:00Z",
    usedLessonId: "lesson-6",
    notified: true,
    notifiedAt: "2025-01-04T16:05:00Z",
  },
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
    usedAt: undefined,
    usedLessonId: "lesson-9",
    notified: true,
    notifiedAt: "2025-01-07T19:05:00Z",
  },
  {
    id: "makeup-5",
    studentId: "student-1",
    studentName: "Sophie Martin",
    lessonId: "lesson-10",
    originalDate: "2025-01-03T15:00:00",
    category: "B",
    reason: "professional_impediment",
    reasonDetails: "Réunion professionnelle urgente",
    status: "pending",
    createdAt: "2025-01-02T22:00:00Z",
    expiresAt: "2025-02-01T22:00:00Z",
    notified: false,
    validatedBy: undefined,
    validatedAt: undefined,
  },
];

/**
 * Mock templates emails
 */
export const MOCK_EMAIL_TEMPLATES: MakeupEmailTemplate[] = [
  {
    id: "template-1",
    type: "available",
    language: "fr",
    subject: "Crédit rattrapage disponible - {studentName}",
    body: `<p>Bonjour {studentName},</p>
<p>Suite à l'annulation de votre leçon du {lessonDate} pour raison de {reason}, un crédit rattrapage a été créé sur votre compte.</p>
<p><strong>Validité :</strong> Jusqu'au {expiryDate}</p>
<p>Vous pouvez réserver votre leçon de rattrapage en cliquant sur le lien ci-dessous :</p>
<p><a href="{bookingLink}">Réserver ma leçon de rattrapage</a></p>
<p>Cordialement,<br>{schoolName}</p>`,
    active: true,
    isDefault: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "template-2",
    type: "reminder_7",
    language: "fr",
    subject: "Rappel : Votre crédit rattrapage expire dans 7 jours",
    body: `<p>Bonjour {studentName},</p>
<p>Nous vous rappelons que votre crédit rattrapage expire dans <strong>7 jours</strong> ({expiryDate}).</p>
<p>N'oubliez pas de réserver votre leçon avant cette date !</p>
<p><a href="{bookingLink}">Réserver maintenant</a></p>
<p>Cordialement,<br>{schoolName}</p>`,
    active: true,
    isDefault: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
];

/**
 * Mock analytics
 */
export const MOCK_MAKEUP_ANALYTICS: MakeupAnalytics = {
  period: {
    start: "2024-07-01",
    end: "2025-01-15",
  },
  stats: {
    creditsCreated: 45,
    creditsUsed: 32,
    creditsExpired: 8,
    creditsPending: 5,
    usageRate: 71.1,
    expiryRate: 17.8,
    avgDaysToUse: 12.5,
  },
  byCategory: [
    {
      category: "B",
      created: 35,
      used: 25,
      expired: 6,
      usageRate: 71.4,
    },
    {
      category: "A",
      created: 10,
      used: 7,
      expired: 2,
      usageRate: 70.0,
    },
  ],

  byReason: [
    {
      reason: "illness_with_certificate",
      count: 18,
      percentage: 40.0,
    },
    {
      reason: "dangerous_weather",
      count: 12,
      percentage: 26.7,
    },
    {
      reason: "family_emergency",
      count: 8,
      percentage: 17.8,
    },
    {
      reason: "vehicle_breakdown",
      count: 4,
      percentage: 8.9,
    },
    {
      reason: "professional_impediment",
      count: 2,
      percentage: 4.4,
    },
    {
      reason: "other_justified",
      count: 1,
      percentage: 2.2,
    },
  ],

  trend: [
    { month: "2024-07", created: 6, used: 4, expired: 1 },
    { month: "2024-08", created: 8, used: 6, expired: 1 },
    { month: "2024-09", created: 7, used: 5, expired: 2 },
    { month: "2024-10", created: 5, used: 4, expired: 0 },
    { month: "2024-11", created: 9, used: 7, expired: 2 },
    { month: "2024-12", created: 10, used: 6, expired: 2 },
  ],
};
