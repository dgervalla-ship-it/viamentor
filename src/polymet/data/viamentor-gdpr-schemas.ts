/**
 * VIAMENTOR GDPR Schemas
 *
 * Schémas de validation Zod pour formulaires RGPD
 *
 * @module data/viamentor-gdpr-schemas
 * @version 1.0.0
 */

import { z } from "zod";

// ============================================================================
// IDENTITY VERIFICATION
// ============================================================================

export const identityVerificationSchema = z.object({
  idDocument: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Le fichier ne doit pas dépasser 5MB"
    )
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "Format accepté: PDF, JPEG, PNG"
    ),
  manualVerification: z.boolean(),
  verifiedBy: z.string().optional(),
  notes: z.string().optional(),
});

export type IdentityVerificationData = z.infer<
  typeof identityVerificationSchema
>;

// ============================================================================
// DATA COLLECTION
// ============================================================================

export const dataCollectionSchema = z.object({
  includeProfile: z.boolean().default(true),
  includeLessons: z.boolean().default(true),
  includeInvoices: z.boolean().default(true),
  includeCommunications: z.boolean().default(true),
  includeAuditLogs: z.boolean().default(false),
});

export type DataCollectionData = z.infer<typeof dataCollectionSchema>;

// ============================================================================
// DELETION STRATEGY
// ============================================================================

export const deletionStrategySchema = z.object({
  strategy: z.enum(["full_delete", "anonymize", "archive"]),
  confirmEligible: z.boolean().refine((val) => val === true, {
    message: "Vous devez confirmer l'éligibilité à la suppression",
  }),
  dpoPassword: z.string().min(1, "Mot de passe requis pour confirmation"),
});

export type DeletionStrategyData = z.infer<typeof deletionStrategySchema>;

// ============================================================================
// RECTIFICATION
// ============================================================================

export const rectificationSchema = z.object({
  firstName: z.string().min(2, "Prénom requis (min 2 caractères)"),
  lastName: z.string().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  address: z.string().optional(),
  justification: z
    .string()
    .min(10, "Justification requise (min 10 caractères)"),
  confirmChanges: z.boolean().refine((val) => val === true, {
    message: "Vous devez confirmer les modifications",
  }),
});

export type RectificationData = z.infer<typeof rectificationSchema>;

// ============================================================================
// DELIVERY OPTIONS
// ============================================================================

export const deliverySchema = z.object({
  recipientEmail: z.string().email("Email invalide"),
  secureLink: z.boolean().default(false),
  sendNotification: z.boolean().default(true),
  expirationDays: z.number().min(1).max(30).default(7),
});

export type DeliveryData = z.infer<typeof deliverySchema>;

// ============================================================================
// CONSENT TYPE
// ============================================================================

export const consentTypeSchema = z.object({
  type: z.string().min(3, "Type requis (min 3 caractères)"),
  description: z.string().min(10, "Description requise (min 10 caractères)"),
  required: z.boolean().default(false),
  defaultOptIn: z.boolean().default(false),
  collectedVia: z
    .array(z.enum(["Signup", "Settings", "Both"]))
    .min(1, "Au moins une méthode de collecte requise"),
});

export type ConsentTypeData = z.infer<typeof consentTypeSchema>;

// ============================================================================
// AUDIT FORM
// ============================================================================

export const auditFormSchema = z.object({
  auditType: z.enum([
    "compliance",
    "security",
    "data_mapping",
    "risk_assessment",
  ]),
  scope: z.string().min(10, "Périmètre requis (min 10 caractères)"),
  auditor: z.string().min(2, "Nom de l'auditeur requis"),
  scheduledDate: z.string().min(1, "Date requise"),
  notes: z.string().optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;

// ============================================================================
// DATA BREACH REPORT
// ============================================================================

export const dataBreachReportSchema = z.object({
  incidentDate: z.string().min(1, "Date de l'incident requise"),
  discoveryDate: z.string().min(1, "Date de découverte requise"),
  affectedUsers: z.number().min(0, "Nombre d'utilisateurs affectés requis"),
  dataTypes: z.array(z.string()).min(1, "Au moins un type de données requis"),
  description: z
    .string()
    .min(50, "Description détaillée requise (min 50 caractères)"),
  containmentActions: z.string().min(20, "Actions de confinement requises"),
  notificationRequired: z.boolean(),
  authorityNotified: z.boolean().default(false),
  severity: z.enum(["low", "medium", "high", "critical"]),
});

export type DataBreachReportData = z.infer<typeof dataBreachReportSchema>;

// ============================================================================
// FILTER PRESET
// ============================================================================

export const filterPresetSchema = z.object({
  name: z.string().min(3, "Nom requis (min 3 caractères)"),
  icon: z.string().optional(),
  filters: z.object({
    types: z.array(z.string()).optional(),
    statuses: z.array(z.string()).optional(),
    priorities: z.array(z.string()).optional(),
    dateRange: z
      .object({
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .optional(),
    tenantId: z.string().optional(),
    assignedToMe: z.boolean().optional(),
  }),
});

export type FilterPresetData = z.infer<typeof filterPresetSchema>;
