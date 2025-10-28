/**
 * VIAMENTOR - Makeups Expiration Cron Job
 * Job scheduler expiration automatique rattrapages
 */

import type { MakeupCredit } from "@/polymet/data/viamentor-makeups-data";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Configuration cron job
 */
export interface ExpirationJobConfig {
  schedule: string; // Cron expression "0 1 * * *" = 01:00 UTC
  timezone: string; // Timezone tenant
  batchSize: number; // Batch processing size
  enabled: boolean;
}

/**
 * Log expiration audit trail
 */
export interface ExpirationLog {
  id: string;
  makeupId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  lessonDate: string;
  reason: string;
  expiredAt: string;
  notificationsSent: number;
  lastNotificationDate: string;
  surveyResponse?: SurveyResponse;
  createdAt: string;
}

/**
 * Réponse survey expiration
 */
export interface SurveyResponse {
  reason: "forgot" | "no_slot" | "no_need" | "other";
  details?: string;
  submittedAt: string;
}

/**
 * Stats expiration job
 */
export interface ExpirationJobStats {
  totalExpired: number;
  emailsSent: number;
  emailsFailed: number;
  surveysReceived: number;
  processingTime: number;
  errors: string[];
}

/**
 * Email template expiration
 */
export interface ExpirationEmailTemplate {
  subject: string;
  body: string;
  surveyLink: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Configuration par défaut
 */
export const defaultExpirationConfig: ExpirationJobConfig = {
  schedule: "0 1 * * *", // 01:00 UTC daily
  timezone: "Europe/Zurich",
  batchSize: 100,
  enabled: true,
};

/**
 * Logs expiration récents
 */
export const mockExpirationLogs: ExpirationLog[] = [
  {
    id: "log-001",
    makeupId: "makeup-001",
    studentId: "student-001",
    studentName: "Sophie Martin",
    studentEmail: "sophie.martin@example.com",
    lessonDate: "2024-01-15",
    reason: "deadline_passed",
    expiredAt: "2024-02-15T01:00:00Z",
    notificationsSent: 3,
    lastNotificationDate: "2024-02-14T10:00:00Z",
    surveyResponse: {
      reason: "forgot",
      details: "Les emails étaient dans mes spams",
      submittedAt: "2024-02-15T09:30:00Z",
    },
    createdAt: "2024-02-15T01:00:00Z",
  },
  {
    id: "log-002",
    makeupId: "makeup-002",
    studentId: "student-002",
    studentName: "Lucas Bernard",
    studentEmail: "lucas.bernard@example.com",
    lessonDate: "2024-01-20",
    reason: "deadline_passed",
    expiredAt: "2024-02-15T01:00:00Z",
    notificationsSent: 3,
    lastNotificationDate: "2024-02-14T10:00:00Z",
    surveyResponse: {
      reason: "no_slot",
      details: "Aucun créneau compatible avec mon horaire de travail",
      submittedAt: "2024-02-15T11:15:00Z",
    },
    createdAt: "2024-02-15T01:00:00Z",
  },
  {
    id: "log-003",
    makeupId: "makeup-003",
    studentId: "student-003",
    studentName: "Emma Dubois",
    studentEmail: "emma.dubois@example.com",
    lessonDate: "2024-01-18",
    reason: "deadline_passed",
    expiredAt: "2024-02-15T01:00:00Z",
    notificationsSent: 3,
    lastNotificationDate: "2024-02-14T10:00:00Z",
    createdAt: "2024-02-15T01:00:00Z",
  },
];

/**
 * Stats job dernière exécution
 */
export const mockLastJobStats: ExpirationJobStats = {
  totalExpired: 12,
  emailsSent: 12,
  emailsFailed: 0,
  surveysReceived: 5,
  processingTime: 3.2,
  errors: [],
};

// ============================================================================
// EXPIRATION SERVICE
// ============================================================================

/**
 * Service expiration rattrapages
 */
export class MakeupsExpirationService {
  /**
   * Exécuter job expiration
   */
  static async runExpirationJob(
    config: ExpirationJobConfig
  ): Promise<ExpirationJobStats> {
    const startTime = Date.now();
    const stats: ExpirationJobStats = {
      totalExpired: 0,
      emailsSent: 0,
      emailsFailed: 0,
      surveysReceived: 0,
      processingTime: 0,
      errors: [],
    };

    try {
      // 1. Query makeups expirés
      const expiredMakeups = await this.queryExpiredMakeups();
      stats.totalExpired = expiredMakeups.length;

      // 2. Batch processing
      const batches = this.createBatches(expiredMakeups, config.batchSize);

      for (const batch of batches) {
        await this.processBatch(batch, stats);
      }

      // 3. Calculate processing time
      stats.processingTime = (Date.now() - startTime) / 1000;

      return stats;
    } catch (error) {
      stats.errors.push(
        error instanceof Error ? error.message : "Unknown error"
      );
      stats.processingTime = (Date.now() - startTime) / 1000;
      return stats;
    }
  }

  /**
   * Query makeups expirés
   */
  private static async queryExpiredMakeups(): Promise<MakeupCredit[]> {
    // Simulation query database
    // WHERE status='available' AND expiresAt < now()
    const now = new Date();
    return []; // Mock data
  }

  /**
   * Créer batches pour processing
   */
  private static createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Traiter batch makeups
   */
  private static async processBatch(
    batch: MakeupCredit[],
    stats: ExpirationJobStats
  ): Promise<void> {
    const promises = batch.map(async (makeup) => {
      try {
        // 1. Update status expired
        await this.expireMakeup(makeup.id);

        // 2. Create audit log
        await this.createExpirationLog(makeup);

        // 3. Send email notification
        const emailSent = await this.sendExpirationEmail(makeup);
        if (emailSent) {
          stats.emailsSent++;
        } else {
          stats.emailsFailed++;
        }
      } catch (error) {
        stats.errors.push(
          `Error processing makeup ${makeup.id}: ${error instanceof Error ? error.message : "Unknown"}`
        );
      }
    });

    await Promise.all(promises);
  }

  /**
   * Expirer makeup
   */
  private static async expireMakeup(makeupId: string): Promise<void> {
    // UPDATE makeups SET status='expired', usedAt=null WHERE id=makeupId
    console.log(`Expired makeup: ${makeupId}`);
  }

  /**
   * Créer log expiration
   */
  private static async createExpirationLog(
    makeup: MakeupCredit
  ): Promise<void> {
    const log: ExpirationLog = {
      id: `log-${Date.now()}`,
      makeupId: makeup.id,
      studentId: makeup.studentId,
      studentName: makeup.studentName,
      studentEmail: "", // From student record
      lessonDate: makeup.originalLessonDate,
      reason: "deadline_passed",
      expiredAt: new Date().toISOString(),
      notificationsSent: 3, // From notification history
      lastNotificationDate: "", // From notification history
      createdAt: new Date().toISOString(),
    };

    // INSERT INTO expiration_logs
    console.log("Created expiration log:", log);
  }

  /**
   * Envoyer email expiration
   */
  private static async sendExpirationEmail(
    makeup: MakeupCredit
  ): Promise<boolean> {
    try {
      // Queue email avec Bull/BullMQ
      const template = this.getEmailTemplate("fr");

      // Send email via service
      console.log(`Sending expiration email for makeup: ${makeup.id}`);

      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }

  /**
   * Get email template
   */
  private static getEmailTemplate(locale: string): ExpirationEmailTemplate {
    const templates: Record<string, ExpirationEmailTemplate> = {
      fr: {
        subject: "Votre rattrapage a expiré",
        body: `Bonjour,

Nous sommes désolés de vous informer que votre crédit de rattrapage a expiré.

Détails:
- Leçon d'origine: {lessonDate}
- Date d'expiration: {expiryDate}
- Notifications envoyées: {notificationCount} (J-7, J-3, J-1)

Nous vous avions informé à plusieurs reprises de l'échéance approchante. Malheureusement, le délai est maintenant dépassé et le crédit ne peut plus être utilisé.

Cette politique garantit l'équité pour tous les élèves et permet une gestion efficace des plannings.

Nous vous invitons à partager votre expérience pour nous aider à améliorer notre service:
{surveyLink}

Cordialement,
L'équipe ViaMenutor`,
        surveyLink: "/survey/expiration/{makeupId}",
      },
      de: {
        subject: "Ihr Nachholtermin ist abgelaufen",
        body: "Guten Tag,\n\nWir bedauern, Ihnen mitteilen zu müssen...",
        surveyLink: "/survey/expiration/{makeupId}",
      },
      it: {
        subject: "Il tuo recupero è scaduto",
        body: "Buongiorno,\n\nSiamo spiacenti di informarla...",
        surveyLink: "/survey/expiration/{makeupId}",
      },
      en: {
        subject: "Your makeup lesson has expired",
        body: "Hello,\n\nWe regret to inform you...",
        surveyLink: "/survey/expiration/{makeupId}",
      },
    };

    return templates[locale] || templates.fr;
  }
}

// ============================================================================
// SURVEY ANALYTICS
// ============================================================================

/**
 * Analytics réponses survey
 */
export interface SurveyAnalytics {
  totalResponses: number;
  responseRate: number;
  reasonsDistribution: {
    forgot: number;
    no_slot: number;
    no_need: number;
    other: number;
  };
  commonIssues: string[];
  recommendations: string[];
}

/**
 * Calculer analytics survey
 */
export function calculateSurveyAnalytics(
  logs: ExpirationLog[]
): SurveyAnalytics {
  const responses = logs.filter((log) => log.surveyResponse);
  const totalExpired = logs.length;

  const distribution = {
    forgot: 0,
    no_slot: 0,
    no_need: 0,
    other: 0,
  };

  responses.forEach((log) => {
    if (log.surveyResponse) {
      distribution[log.surveyResponse.reason]++;
    }
  });

  return {
    totalResponses: responses.length,
    responseRate:
      totalExpired > 0 ? (responses.length / totalExpired) * 100 : 0,
    reasonsDistribution: distribution,
    commonIssues: [
      "Emails dans spam",
      "Horaires moniteurs limités",
      "Délai trop court",
    ],

    recommendations: [
      "Améliorer délivrabilité emails",
      "Étendre horaires disponibilité",
      "Prolonger délai expiration",
    ],
  };
}
