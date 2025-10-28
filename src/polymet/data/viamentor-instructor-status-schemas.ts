/**
 * VIAMENTOR - Instructor Status Validation Schemas
 * Schémas Zod pour configuration statut professionnel et rémunération moniteurs
 *
 * Types statuts:
 * - independent_solo: Indépendant autonome sans lien école
 * - independent_attached: Indépendant rattaché avec infrastructure école
 * - employee: Employé salarié contrat travail
 *
 * Modèles rémunération (independent_attached):
 * - free: Gratuit 0% - Moniteur garde 100% CA
 * - flat_fee: Forfait mensuel fixe
 * - commission: Commission % variable sur CA
 */

import { z } from "zod";

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

export const InstructorStatusType = {
  INDEPENDENT_SOLO: "independent_solo",
  INDEPENDENT_ATTACHED: "independent_attached",
  EMPLOYEE: "employee",
} as const;

export const PaymentModel = {
  FREE: "free",
  FLAT_FEE: "flat_fee",
  COMMISSION: "commission",
} as const;

export const ContractType = {
  CDI: "cdi", // Contrat durée indéterminée
  CDD: "cdd", // Contrat durée déterminée
  APPRENTICESHIP: "apprenticeship",
  INTERNSHIP: "internship",
} as const;

// Limites réalistes marché suisse
export const LIMITS = {
  FLAT_FEE_MIN: 0,
  FLAT_FEE_MAX: 5000, // CHF/mois
  COMMISSION_MIN: 0,
  COMMISSION_MAX: 50, // %
  SALARY_MIN: 3000, // CHF brut/mois (minimum vital)
  SALARY_MAX: 15000, // CHF brut/mois (réaliste auto-école)
  WEEKLY_HOURS_MIN: 20,
  WEEKLY_HOURS_MAX: 42, // Légal Suisse
  LESSON_PRICE_MIN: 50,
  LESSON_PRICE_MAX: 200, // CHF
  LESSONS_PER_MONTH_MIN: 0,
  LESSONS_PER_MONTH_MAX: 200,
} as const;

// ============================================================================
// BASE SCHEMAS
// ============================================================================

/**
 * Schéma base statut moniteur
 */
export const instructorStatusBaseSchema = z.object({
  statusType: z.enum([
    InstructorStatusType.INDEPENDENT_SOLO,
    InstructorStatusType.INDEPENDENT_ATTACHED,
    InstructorStatusType.EMPLOYEE,
  ]),
});

/**
 * Schéma modèle gratuit (0%)
 */
export const freeModelSchema = z.object({
  model: z.literal(PaymentModel.FREE),
  notes: z.string().max(500).optional(),
});

/**
 * Schéma forfait mensuel fixe
 */
export const flatFeeModelSchema = z.object({
  model: z.literal(PaymentModel.FLAT_FEE),
  monthlyAmount: z
    .number()
    .min(LIMITS.FLAT_FEE_MIN, "Montant minimum 0 CHF")
    .max(LIMITS.FLAT_FEE_MAX, "Montant maximum 5000 CHF"),
  startDate: z.date({
    required_error: "Date début prélèvement requise",
  }),
  autoDebit: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

/**
 * Schéma commission % variable
 */
export const commissionModelSchema = z.object({
  model: z.literal(PaymentModel.COMMISSION),
  commissionRate: z
    .number()
    .min(LIMITS.COMMISSION_MIN, "Commission minimum 0%")
    .max(LIMITS.COMMISSION_MAX, "Commission maximum 50%"),
  notes: z.string().max(500).optional(),
});

/**
 * Schéma union modèles paiement
 */
export const paymentModelSchema = z.discriminatedUnion("model", [
  freeModelSchema,
  flatFeeModelSchema,
  commissionModelSchema,
]);

/**
 * Schéma documents contractuels
 */
export const contractDocumentsSchema = z.object({
  contractFileUrl: z.string().url().optional(),
  contractFileName: z.string().optional(),
  contractFileSize: z.number().optional(),
  startDate: z.date({
    required_error: "Date début contrat requise si statut rattaché",
  }),
  endDate: z.date().optional(), // Optional = CDI
  internalNotes: z.string().max(500).optional(),
});

/**
 * Schéma informations employé
 */
export const employeeInfoSchema = z.object({
  monthlySalaryGross: z
    .number()
    .min(LIMITS.SALARY_MIN, "Salaire minimum 3000 CHF brut")
    .max(LIMITS.SALARY_MAX, "Salaire maximum 15000 CHF brut"),
  contractType: z.enum([
    ContractType.CDI,
    ContractType.CDD,
    ContractType.APPRENTICESHIP,
    ContractType.INTERNSHIP,
  ]),
  hireDate: z.date({
    required_error: "Date embauche requise",
  }),
  weeklyHours: z
    .number()
    .min(LIMITS.WEEKLY_HOURS_MIN, "Minimum 20h/semaine")
    .max(LIMITS.WEEKLY_HOURS_MAX, "Maximum 42h/semaine (légal Suisse)"),
  performanceBonusEnabled: z.boolean().default(false),
  benefits: z.string().max(300).optional(),
});

// ============================================================================
// MAIN SCHEMAS
// ============================================================================

/**
 * Schéma complet indépendant solo
 */
export const independentSoloSchema = instructorStatusBaseSchema.extend({
  statusType: z.literal(InstructorStatusType.INDEPENDENT_SOLO),
});

/**
 * Schéma complet indépendant rattaché
 */
export const independentAttachedSchema = instructorStatusBaseSchema.extend({
  statusType: z.literal(InstructorStatusType.INDEPENDENT_ATTACHED),
  paymentModel: paymentModelSchema,
  contract: contractDocumentsSchema.optional(),
});

/**
 * Schéma complet employé
 */
export const employeeSchema = instructorStatusBaseSchema.extend({
  statusType: z.literal(InstructorStatusType.EMPLOYEE),
  employeeInfo: employeeInfoSchema,
  contract: contractDocumentsSchema.optional(),
});

/**
 * Schéma union configuration statut moniteur
 */
export const instructorStatusConfigSchema = z.discriminatedUnion("statusType", [
  independentSoloSchema,
  independentAttachedSchema,
  employeeSchema,
]);

/**
 * Schéma simulation revenus
 */
export const revenueSimulationSchema = z.object({
  lessonsPerMonth: z
    .number()
    .min(LIMITS.LESSONS_PER_MONTH_MIN)
    .max(LIMITS.LESSONS_PER_MONTH_MAX),
  averageLessonPrice: z
    .number()
    .min(LIMITS.LESSON_PRICE_MIN)
    .max(LIMITS.LESSON_PRICE_MAX),
});

// ============================================================================
// TYPES
// ============================================================================

export type InstructorStatusType =
  (typeof InstructorStatusType)[keyof typeof InstructorStatusType];
export type PaymentModel = (typeof PaymentModel)[keyof typeof PaymentModel];
export type ContractType = (typeof ContractType)[keyof typeof ContractType];

export type InstructorStatusBase = z.infer<typeof instructorStatusBaseSchema>;
export type FreeModel = z.infer<typeof freeModelSchema>;
export type FlatFeeModel = z.infer<typeof flatFeeModelSchema>;
export type CommissionModel = z.infer<typeof commissionModelSchema>;
export type PaymentModelConfig = z.infer<typeof paymentModelSchema>;
export type ContractDocuments = z.infer<typeof contractDocumentsSchema>;
export type EmployeeInfo = z.infer<typeof employeeInfoSchema>;

export type IndependentSoloConfig = z.infer<typeof independentSoloSchema>;
export type IndependentAttachedConfig = z.infer<
  typeof independentAttachedSchema
>;

export type EmployeeConfig = z.infer<typeof employeeSchema>;

export type InstructorStatusConfig = z.infer<
  typeof instructorStatusConfigSchema
>;

export type RevenueSimulation = z.infer<typeof revenueSimulationSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calcule le net moniteur selon modèle rémunération
 */
export function calculateInstructorNet(
  grossRevenue: number,
  config: InstructorStatusConfig
): {
  grossRevenue: number;
  schoolShare: number;
  flatFee: number;
  instructorNet: number;
} {
  if (config.statusType === InstructorStatusType.INDEPENDENT_SOLO) {
    return {
      grossRevenue,
      schoolShare: 0,
      flatFee: 0,
      instructorNet: grossRevenue,
    };
  }

  if (config.statusType === InstructorStatusType.INDEPENDENT_ATTACHED) {
    const { paymentModel } = config;

    if (paymentModel.model === PaymentModel.FREE) {
      return {
        grossRevenue,
        schoolShare: 0,
        flatFee: 0,
        instructorNet: grossRevenue,
      };
    }

    if (paymentModel.model === PaymentModel.FLAT_FEE) {
      return {
        grossRevenue,
        schoolShare: 0,
        flatFee: paymentModel.monthlyAmount,
        instructorNet: grossRevenue - paymentModel.monthlyAmount,
      };
    }

    if (paymentModel.model === PaymentModel.COMMISSION) {
      const schoolShare = (grossRevenue * paymentModel.commissionRate) / 100;
      return {
        grossRevenue,
        schoolShare,
        flatFee: 0,
        instructorNet: grossRevenue - schoolShare,
      };
    }
  }

  // Employee: 100% CA école
  return {
    grossRevenue,
    schoolShare: grossRevenue,
    flatFee: 0,
    instructorNet: 0, // Reçoit salaire fixe
  };
}

/**
 * Formate le split commission pour affichage
 */
export function formatCommissionSplit(commissionRate: number): {
  instructor: number;
  school: number;
} {
  return {
    instructor: 100 - commissionRate,
    school: commissionRate,
  };
}

/**
 * Génère exemple calcul leçon
 */
export function generateLessonExample(
  lessonPrice: number,
  commissionRate: number
): {
  lessonPrice: number;
  instructorShare: number;
  schoolShare: number;
} {
  const schoolShare = (lessonPrice * commissionRate) / 100;
  const instructorShare = lessonPrice - schoolShare;

  return {
    lessonPrice,
    instructorShare,
    schoolShare,
  };
}
