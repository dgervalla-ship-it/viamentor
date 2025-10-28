/**
 * VIAMENTOR - Maintenance Notifications Service
 * Service notifications automatiques emails/SMS pour échéances maintenance
 */

"use client";

import type {
  MaintenanceTask,
  MaintenanceAlert,
} from "./viamentor-maintenance-data";

// ============================================================================
// TYPES
// ============================================================================

export type NotificationChannel = "email" | "sms" | "both";
export type NotificationTiming = "7_days" | "3_days" | "1_day" | "same_day";
export type NotificationLocale = "fr" | "de" | "it" | "en";

export interface NotificationConfig {
  id: string;
  enabled: boolean;
  maintenanceType: "preventive" | "corrective" | "all";
  channels: NotificationChannel[];
  timings: NotificationTiming[];
  recipients: NotificationRecipient[];
  locale: NotificationLocale;
  customMessage?: string;
}

export interface NotificationRecipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "admin" | "manager" | "mechanic";
}

export interface NotificationTemplate {
  id: string;
  type: "email" | "sms";
  locale: NotificationLocale;
  timing: NotificationTiming;
  subject?: string;
  body: string;
  variables: string[];
}

export interface NotificationLog {
  id: string;
  taskId: string;
  vehicleId: string;
  channel: "email" | "sms";
  recipient: string;
  status: "sent" | "failed" | "pending";
  sentAt: string;
  error?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockNotificationConfigs: NotificationConfig[] = [
  {
    id: "config-001",
    enabled: true,
    maintenanceType: "preventive",
    channels: ["email", "sms"],
    timings: ["7_days", "3_days", "1_day"],
    recipients: [
      {
        id: "rec-001",
        name: "Jean Dupont",
        email: "jean.dupont@viamentor.ch",
        phone: "+41 79 123 45 67",
        role: "admin",
      },
      {
        id: "rec-002",
        name: "Marie Martin",
        email: "marie.martin@viamentor.ch",
        phone: "+41 79 234 56 78",
        role: "manager",
      },
    ],

    locale: "fr",
  },
  {
    id: "config-002",
    enabled: true,
    maintenanceType: "corrective",
    channels: ["email"],
    timings: ["same_day"],
    recipients: [
      {
        id: "rec-001",
        name: "Jean Dupont",
        email: "jean.dupont@viamentor.ch",
        role: "admin",
      },
    ],

    locale: "fr",
  },
];

export const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: "tpl-email-7days-fr",
    type: "email",
    locale: "fr",
    timing: "7_days",
    subject: "Rappel: Maintenance {{vehicleName}} dans 7 jours",
    body: `Bonjour,

Ce message vous rappelle que la maintenance suivante est prévue dans 7 jours:

Véhicule: {{vehicleName}} ({{vehiclePlate}})
Type: {{maintenanceType}}
Date prévue: {{scheduledDate}}
Description: {{description}}
Coût estimé: CHF {{estimatedCost}}

Garage: {{garage}}
Adresse: {{garageAddress}}

Merci de confirmer la disponibilité du véhicule.

Cordialement,
ViaMenutor`,
    variables: [
      "vehicleName",
      "vehiclePlate",
      "maintenanceType",
      "scheduledDate",
      "description",
      "estimatedCost",
      "garage",
      "garageAddress",
    ],
  },
  {
    id: "tpl-sms-3days-fr",
    type: "sms",
    locale: "fr",
    timing: "3_days",
    body: "ViaMenutor: Maintenance {{vehicleName}} ({{vehiclePlate}}) dans 3 jours le {{scheduledDate}}. {{garage}}",
    variables: ["vehicleName", "vehiclePlate", "scheduledDate", "garage"],
  },
  {
    id: "tpl-email-1day-fr",
    type: "email",
    locale: "fr",
    timing: "1_day",
    subject: "Urgent: Maintenance {{vehicleName}} demain",
    body: `Bonjour,

RAPPEL URGENT: La maintenance est prévue demain:

Véhicule: {{vehicleName}} ({{vehiclePlate}})
Date: {{scheduledDate}}
Heure: {{scheduledTime}}
Garage: {{garage}}

⚠️ Merci de libérer le véhicule à temps.

Cordialement,
ViaMenutor`,
    variables: [
      "vehicleName",
      "vehiclePlate",
      "scheduledDate",
      "scheduledTime",
      "garage",
    ],
  },
];

export const mockNotificationLogs: NotificationLog[] = [
  {
    id: "log-001",
    taskId: "maint-001",
    vehicleId: "veh-001",
    channel: "email",
    recipient: "jean.dupont@viamentor.ch",
    status: "sent",
    sentAt: "2025-01-13T09:00:00Z",
  },
  {
    id: "log-002",
    taskId: "maint-001",
    vehicleId: "veh-001",
    channel: "sms",
    recipient: "+41 79 123 45 67",
    status: "sent",
    sentAt: "2025-01-13T09:01:00Z",
  },
];

// ============================================================================
// NOTIFICATION SERVICE
// ============================================================================

/**
 * Calcule les notifications à envoyer pour une tâche
 */
export function calculateNotificationsForTask(
  task: MaintenanceTask,
  config: NotificationConfig
): { timing: NotificationTiming; daysUntil: number }[] {
  const scheduledDate = new Date(task.scheduledDate);
  const now = new Date();
  const daysUntil = Math.ceil(
    (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const notifications: { timing: NotificationTiming; daysUntil: number }[] = [];

  if (config.timings.includes("7_days") && daysUntil === 7) {
    notifications.push({ timing: "7_days", daysUntil: 7 });
  }
  if (config.timings.includes("3_days") && daysUntil === 3) {
    notifications.push({ timing: "3_days", daysUntil: 3 });
  }
  if (config.timings.includes("1_day") && daysUntil === 1) {
    notifications.push({ timing: "1_day", daysUntil: 1 });
  }
  if (config.timings.includes("same_day") && daysUntil === 0) {
    notifications.push({ timing: "same_day", daysUntil: 0 });
  }

  return notifications;
}

/**
 * Remplace les variables dans un template
 */
export function replaceTemplateVariables(
  template: string,
  task: MaintenanceTask
): string {
  let result = template;

  const variables: Record<string, string> = {
    vehicleName: task.vehicleName,
    vehiclePlate: task.vehiclePlate,
    maintenanceType: task.type,
    scheduledDate: new Date(task.scheduledDate).toLocaleDateString("fr-CH"),
    scheduledTime: new Date(task.scheduledDate).toLocaleTimeString("fr-CH", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    description: task.description,
    estimatedCost: task.estimatedCost.toString(),
    garage: task.garage || "Non défini",
    garageAddress: task.garageAddress || "Non défini",
  };

  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  });

  return result;
}

/**
 * Envoie une notification email (simulation)
 */
export async function sendEmailNotification(
  recipient: string,
  subject: string,
  body: string
): Promise<{ success: boolean; error?: string }> {
  console.log("[Email Notification]", {
    to: recipient,
    subject,
    body,
  });

  // Simulation d'envoi
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

/**
 * Envoie une notification SMS (simulation)
 */
export async function sendSMSNotification(
  recipient: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  console.log("[SMS Notification]", {
    to: recipient,
    message,
  });

  // Simulation d'envoi
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

/**
 * Traite les notifications pour toutes les tâches
 */
export async function processMaintenanceNotifications(
  tasks: MaintenanceTask[],
  configs: NotificationConfig[]
): Promise<NotificationLog[]> {
  const logs: NotificationLog[] = [];

  for (const task of tasks) {
    if (task.status !== "scheduled") continue;

    for (const config of configs) {
      if (!config.enabled) continue;

      // Vérifier si le type de maintenance correspond
      if (
        config.maintenanceType !== "all" &&
        config.maintenanceType !== task.type
      ) {
        continue;
      }

      const notifications = calculateNotificationsForTask(task, config);

      for (const notification of notifications) {
        const template = mockNotificationTemplates.find(
          (t) => t.timing === notification.timing && t.locale === config.locale
        );

        if (!template) continue;

        for (const recipient of config.recipients) {
          if (config.channels.includes("email") && recipient.email) {
            const subject = replaceTemplateVariables(
              template.subject || "",
              task
            );
            const body = replaceTemplateVariables(template.body, task);

            const result = await sendEmailNotification(
              recipient.email,
              subject,
              body
            );

            logs.push({
              id: `log-${Date.now()}-${Math.random()}`,
              taskId: task.id,
              vehicleId: task.vehicleId,
              channel: "email",
              recipient: recipient.email,
              status: result.success ? "sent" : "failed",
              sentAt: new Date().toISOString(),
              error: result.error,
            });
          }

          if (config.channels.includes("sms") && recipient.phone) {
            const smsTemplate = mockNotificationTemplates.find(
              (t) =>
                t.type === "sms" &&
                t.timing === notification.timing &&
                t.locale === config.locale
            );

            if (smsTemplate) {
              const message = replaceTemplateVariables(smsTemplate.body, task);

              const result = await sendSMSNotification(
                recipient.phone,
                message
              );

              logs.push({
                id: `log-${Date.now()}-${Math.random()}`,
                taskId: task.id,
                vehicleId: task.vehicleId,
                channel: "sms",
                recipient: recipient.phone,
                status: result.success ? "sent" : "failed",
                sentAt: new Date().toISOString(),
                error: result.error,
              });
            }
          }
        }
      }
    }
  }

  return logs;
}

// ============================================================================
// I18N
// ============================================================================

export const notificationI18n = {
  fr: {
    timings: {
      "7_days": "7 jours avant",
      "3_days": "3 jours avant",
      "1_day": "1 jour avant",
      same_day: "Le jour même",
    },
    channels: {
      email: "Email",
      sms: "SMS",
      both: "Email + SMS",
    },
    status: {
      sent: "Envoyé",
      failed: "Échec",
      pending: "En attente",
    },
  },
};
