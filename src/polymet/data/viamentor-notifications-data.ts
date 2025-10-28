/**
 * VIAMENTOR - Notifications & Communications Data
 * Mock data et types pour paramètres notifications
 */

// ============================================================================
// TYPES
// ============================================================================

export type NotificationChannel = "email" | "sms" | "push" | "whatsapp";
export type SMSProvider = "twint" | "vonage" | "twilio" | "messagebird";
export type EventType =
  | "student_registration"
  | "lesson_booked"
  | "invoice_issued"
  | "payment_reminder"
  | "exam_passed"
  | "student_birthday"
  | "lesson_cancelled"
  | "document_uploaded"
  | "instructor_assigned";
export type RecipientType = "student" | "instructor" | "admin" | "all";
export type DelayType = "immediate" | "hours_before" | "days_before";
export type TemplateLanguage = "fr" | "de" | "it" | "en";
export type ListType = "automatic" | "manual";

export interface SMTPConfig {
  enabled: boolean;
  useDefault: boolean; // Resend
  customHost?: string;
  port?: number;
  username?: string;
  password?: string;
  testEmail?: string;
}

export interface SMSConfig {
  enabled: boolean;
  provider?: SMSProvider;
  apiKey?: string;
  senderName?: string;
  monthlyBudget?: number;
  currentUsage: number;
  testNumber?: string;
}

export interface PushConfig {
  enabled: boolean;
  firebaseCredentials?: string; // JSON
}

export interface WhatsAppConfig {
  enabled: boolean;
  businessApiKey?: string;
}

export interface CommunicationChannels {
  email: SMTPConfig;
  sms: SMSConfig;
  push: PushConfig;
  whatsapp: WhatsAppConfig;
}

export interface EventTrigger {
  id: string;
  event: EventType;
  description: string;
  channels: NotificationChannel[];
  recipients: RecipientType[];
  delay?: {
    type: DelayType;
    value?: number;
  };
  active: boolean;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  language: TemplateLanguage;
  event?: EventType;
  subject: string;
  body: string; // HTML
  footer?: string;
  lastModified: string;
  modifiedBy: string;
  isSystem: boolean;
}

export interface SMSTemplate {
  id: string;
  name: string;
  language: TemplateLanguage;
  event?: EventType;
  content: string; // Plain text
  characterCount: number;
  lastModified: string;
  modifiedBy: string;
  isSystem: boolean;
}

export interface SendingPreferences {
  testMode: boolean;
  testEmail?: string;
  throttling: {
    enabled: boolean;
    maxEmailsPerHour?: number;
    maxSMSPerHour?: number;
  };
  timezone: string;
  retry: {
    enabled: boolean;
    maxAttempts: number;
    delayMinutes: number;
  };
  tracking: {
    enabled: boolean;
    informRecipients: boolean;
  };
}

export interface DistributionList {
  id: string;
  name: string;
  description: string;
  type: ListType;
  subscriberCount: number;
  criteria?: {
    categories?: string[];
    statuses?: string[];
    instructors?: string[];
  };
  subscribers?: string[]; // emails
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockChannels: CommunicationChannels = {
  email: {
    enabled: true,
    useDefault: true,
    testEmail: "admin@viamentor.ch",
  },
  sms: {
    enabled: true,
    provider: "twilio",
    apiKey: "sk_test_*********************",
    senderName: "Auto-école Viamentor",
    monthlyBudget: 500,
    currentUsage: 127.5,
    testNumber: "+41 79 123 45 67",
  },
  push: {
    enabled: false,
  },
  whatsapp: {
    enabled: false,
  },
};

export const mockEventTriggers: EventTrigger[] = [
  {
    id: "trigger-1",
    event: "student_registration",
    description: "Nouvelle inscription élève",
    channels: ["email", "sms"],
    recipients: ["student", "admin"],
    delay: { type: "immediate" },
    active: true,
    templateId: "email-welcome",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "trigger-2",
    event: "lesson_booked",
    description: "Leçon réservée",
    channels: ["email", "sms"],
    recipients: ["student", "instructor"],
    delay: { type: "immediate" },
    active: true,
    templateId: "email-lesson-confirm",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "trigger-3",
    event: "payment_reminder",
    description: "Rappel paiement",
    channels: ["email"],
    recipients: ["student"],
    delay: { type: "days_before", value: 3 },
    active: true,
    templateId: "email-payment-reminder",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: "email-welcome",
    name: "Bienvenue nouvel élève",
    language: "fr",
    event: "student_registration",
    subject: "Bienvenue chez {schoolName} !",
    body: "<h1>Bienvenue {studentName} !</h1><p>Nous sommes ravis de vous accueillir...</p>",
    footer: "Cordialement, L'équipe {schoolName}",
    lastModified: "2025-01-10T10:00:00Z",
    modifiedBy: "Admin",
    isSystem: true,
  },
  {
    id: "email-lesson-confirm",
    name: "Confirmation leçon",
    language: "fr",
    event: "lesson_booked",
    subject: "Confirmation de votre leçon du {date}",
    body: "<p>Bonjour {studentName},</p><p>Votre leçon est confirmée le {date} à {time} avec {instructorName}.</p>",
    lastModified: "2025-01-10T10:00:00Z",
    modifiedBy: "Admin",
    isSystem: true,
  },
];

export const mockSMSTemplates: SMSTemplate[] = [
  {
    id: "sms-lesson-reminder",
    name: "Rappel leçon",
    language: "fr",
    event: "lesson_booked",
    content:
      "Rappel: Leçon demain {date} à {time} avec {instructorName}. {schoolName}",
    characterCount: 72,
    lastModified: "2025-01-10T10:00:00Z",
    modifiedBy: "Admin",
    isSystem: true,
  },
];

export const mockSendingPreferences: SendingPreferences = {
  testMode: false,
  testEmail: "test@viamentor.ch",
  throttling: {
    enabled: true,
    maxEmailsPerHour: 100,
    maxSMSPerHour: 50,
  },
  timezone: "Europe/Zurich",
  retry: {
    enabled: true,
    maxAttempts: 3,
    delayMinutes: 5,
  },
  tracking: {
    enabled: true,
    informRecipients: true,
  },
};

export const mockDistributionLists: DistributionList[] = [
  {
    id: "list-1",
    name: "Élèves actifs catégorie B",
    description: "Tous les élèves en formation permis B",
    type: "automatic",
    subscriberCount: 127,
    criteria: {
      categories: ["B"],
      statuses: ["active", "in_training"],
    },
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "list-2",
    name: "Newsletter mensuelle",
    description: "Abonnés newsletter",
    type: "manual",
    subscriberCount: 342,
    subscribers: ["student1@example.com", "student2@example.com"],
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
];
