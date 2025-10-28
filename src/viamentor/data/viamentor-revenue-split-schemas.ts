/**
 * VIAMENTOR - Revenue Split Schemas
 * Schémas validation Zod pour calculs automatiques reversements
 *
 * Features:
 * - Validation revenue splits avec règles métier
 * - Calculs automatiques commission/forfait
 * - Types TypeScript complets
 * - Helper functions calcul
 */

import { z } from "zod";

// ============================================================================
// ENUMS
// ============================================================================

export const PaymentModelType = z.enum(["free", "monthly_flat", "commission"]);
export type PaymentModelType = z.infer<typeof PaymentModelType>;

export const StatusType = z.enum([
  "independent_solo",
  "independent_attached",
  "employee",
]);
export type StatusType = z.infer<typeof StatusType>;

export const PaymentStatus = z.enum([
  "pending",
  "paid",
  "overdue",
  "cancelled",
]);
export type PaymentStatus = z.infer<typeof PaymentStatus>;

export const PaymentMethod = z.enum([
  "bank_transfer",
  "cash",
  "compensation",
  "card",
]);
export type PaymentMethod = z.infer<typeof PaymentMethod>;

// ============================================================================
// REVENUE SPLIT SCHEMAS
// ============================================================================

/**
 * Schéma pour un revenue split (calcul automatique)
 */
export const RevenueSplitSchema = z.object({
  id: z.string().uuid(),
  lessonId: z.string().uuid(),
  instructorId: z.string().uuid(),
  schoolId: z.string().uuid(),

  // Montants
  totalAmount: z.number().min(0, "Le montant total doit être positif"),
  instructorAmount: z.number().min(0, "Le montant moniteur doit être positif"),
  schoolAmount: z.number().min(0, "Le montant école doit être positif"),

  // Configuration
  paymentModel: PaymentModelType,
  commissionRate: z.number().min(0).max(50).optional(),
  statusType: StatusType,

  // Metadata
  createdAt: z.date(),
  paidToInstructor: z.boolean().default(false),
  paidAt: z.date().optional(),
  paymentMethod: PaymentMethod.optional(),
  notes: z.string().max(500).optional(),
});

export type RevenueSplit = z.infer<typeof RevenueSplitSchema>;

/**
 * Schéma pour un forfait mensuel
 */
export const MonthlyFeeSchema = z.object({
  id: z.string().uuid(),
  instructorId: z.string().uuid(),
  schoolId: z.string().uuid(),

  // Période
  month: z.string().regex(/^\d{4}-\d{2}$/, "Format mois invalide (YYYY-MM)"),

  // Montant
  amount: z.number().min(0).max(5000, "Montant forfait max 5000 CHF"),

  // Statut
  status: PaymentStatus,
  dueDate: z.date(),
  paidAt: z.date().optional(),
  paymentMethod: PaymentMethod.optional(),

  // Metadata
  createdAt: z.date(),
  reminderSentAt: z.date().optional(),
  notes: z.string().max(500).optional(),
});

export type MonthlyFee = z.infer<typeof MonthlyFeeSchema>;

/**
 * Schéma pour paiement batch moniteurs
 */
export const BatchPaymentSchema = z.object({
  instructorIds: z
    .array(z.string().uuid())
    .min(1, "Sélectionnez au moins un moniteur"),
  paymentDate: z.date(),
  paymentMethod: PaymentMethod,
  notes: z.string().max(200).optional(),
});

export type BatchPayment = z.infer<typeof BatchPaymentSchema>;

/**
 * Schéma pour export comptable
 */
export const AccountingExportSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  format: z.enum(["excel", "csv", "pdf"]),
  includeAttachments: z.boolean().default(false),
});

export type AccountingExport = z.infer<typeof AccountingExportSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calcule le split de revenus selon le modèle de paiement
 */
export function calculateRevenueSplit(
  totalAmount: number,
  statusType: StatusType,
  paymentModel: PaymentModelType,
  commissionRate?: number
): { instructorAmount: number; schoolAmount: number } {
  // Solo: moniteur garde 100%
  if (statusType === "independent_solo") {
    return {
      instructorAmount: totalAmount,
      schoolAmount: 0,
    };
  }

  // Employé: école garde 100%
  if (statusType === "employee") {
    return {
      instructorAmount: 0,
      schoolAmount: totalAmount,
    };
  }

  // Rattaché: selon modèle
  if (statusType === "independent_attached") {
    switch (paymentModel) {
      case "free":
        return {
          instructorAmount: totalAmount,
          schoolAmount: 0,
        };

      case "commission":
        if (!commissionRate) {
          throw new Error("Commission rate required for commission model");
        }
        const schoolAmount =
          Math.round(((totalAmount * commissionRate) / 100) * 100) / 100;
        const instructorAmount =
          Math.round((totalAmount - schoolAmount) * 100) / 100;
        return { instructorAmount, schoolAmount };

      case "monthly_flat":
        // Forfait mensuel: moniteur garde 100% CA (forfait payé séparément)
        return {
          instructorAmount: totalAmount,
          schoolAmount: 0,
        };

      default:
        throw new Error(`Unknown payment model: ${paymentModel}`);
    }
  }

  throw new Error(`Unknown status type: ${statusType}`);
}

/**
 * Formate un montant en CHF
 */
export function formatCurrency(
  amount: number,
  locale: string = "fr-CH"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
}

/**
 * Calcule le pourcentage
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100 * 10) / 10;
}

/**
 * Génère un exemple de split visuel
 */
export function generateSplitExample(
  lessonPrice: number,
  commissionRate: number
): string {
  const schoolAmount =
    Math.round(((lessonPrice * commissionRate) / 100) * 100) / 100;
  const instructorAmount = Math.round((lessonPrice - schoolAmount) * 100) / 100;

  return `Leçon ${formatCurrency(lessonPrice)} → Moniteur ${formatCurrency(instructorAmount)} | École ${formatCurrency(schoolAmount)}`;
}

/**
 * Vérifie si un forfait est en retard
 */
export function isOverdue(dueDate: Date): boolean {
  return new Date() > dueDate;
}

/**
 * Calcule le nombre de jours de retard
 */
export function getDaysOverdue(dueDate: Date): number {
  const now = new Date();
  const diff = now.getTime() - dueDate.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Génère le mois au format YYYY-MM
 */
export function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Parse le mois depuis YYYY-MM
 */
export function parseMonth(monthStr: string): Date {
  const [year, month] = monthStr.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Valide que les montants sont cohérents
 */
export function validateSplitAmounts(
  total: number,
  instructor: number,
  school: number
): boolean {
  const sum = Math.round((instructor + school) * 100) / 100;
  const totalRounded = Math.round(total * 100) / 100;
  return Math.abs(sum - totalRounded) < 0.01; // Tolérance 1 centime
}

/**
 * Valide la configuration du modèle de paiement
 */
export function validatePaymentModelConfig(
  statusType: StatusType,
  paymentModel: PaymentModelType,
  commissionRate?: number
): { valid: boolean; error?: string } {
  // Solo: pas de modèle de paiement
  if (statusType === "independent_solo") {
    return { valid: true };
  }

  // Employé: pas de modèle de paiement
  if (statusType === "employee") {
    return { valid: true };
  }

  // Rattaché: modèle requis
  if (statusType === "independent_attached") {
    if (paymentModel === "commission" && !commissionRate) {
      return {
        valid: false,
        error: "Taux de commission requis pour le modèle commission",
      };
    }

    if (paymentModel === "commission" && commissionRate) {
      if (commissionRate < 0 || commissionRate > 50) {
        return {
          valid: false,
          error: "Taux de commission doit être entre 0% et 50%",
        };
      }
    }

    return { valid: true };
  }

  return {
    valid: false,
    error: "Type de statut invalide",
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const RevenueSplitSchemas = {
  RevenueSplit: RevenueSplitSchema,
  MonthlyFee: MonthlyFeeSchema,
  BatchPayment: BatchPaymentSchema,
  AccountingExport: AccountingExportSchema,
};

export const RevenueSplitHelpers = {
  calculateRevenueSplit,
  formatCurrency,
  calculatePercentage,
  generateSplitExample,
  isOverdue,
  getDaysOverdue,
  formatMonth,
  parseMonth,
  validateSplitAmounts,
  validatePaymentModelConfig,
};
