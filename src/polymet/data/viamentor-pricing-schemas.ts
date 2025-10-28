/**
 * VIAMENTOR - Pricing Validation Schemas
 * Schémas Zod pour validation tarification
 */

import { z } from "zod";

// ============================================================================
// LESSON PRICES SCHEMA
// ============================================================================

export const lessonPriceSchema = z.object({
  category: z.enum(["B", "A", "BE", "A1", "BPT"]),
  price45min: z
    .number()
    .positive("Le prix doit être supérieur à 0")
    .max(500, "Le prix ne peut pas dépasser CHF 500"),
  price90min: z
    .number()
    .positive("Le prix doit être supérieur à 0")
    .max(1000, "Le prix ne peut pas dépasser CHF 1000"),
  autoCalculate90min: z.boolean(),
  visibleForBooking: z.boolean(),
});

export const lessonPricesFormSchema = z.object({
  prices: z.array(lessonPriceSchema),
});

export type LessonPriceFormData = z.infer<typeof lessonPriceSchema>;
export type LessonPricesFormData = z.infer<typeof lessonPricesFormSchema>;

// ============================================================================
// PACKAGE SCHEMA
// ============================================================================

export const packageSchema = z
  .object({
    name: z
      .string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    category: z.enum(["B", "A", "BE", "A1", "BPT", "all"]),
    lessonCount: z
      .number()
      .int("Le nombre de leçons doit être un entier")
      .min(5, "Minimum 5 leçons")
      .max(50, "Maximum 50 leçons"),
    totalPrice: z
      .number()
      .positive("Le prix total doit être supérieur à 0")
      .max(10000, "Le prix total ne peut pas dépasser CHF 10'000"),
    validityMonths: z
      .number()
      .int("La validité doit être un entier")
      .positive("La validité doit être supérieure à 0")
      .max(36, "La validité ne peut pas dépasser 36 mois")
      .nullable(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      const unitPrice = data.totalPrice / data.lessonCount;
      return unitPrice > 0 && unitPrice < 500;
    },
    {
      message: "Le prix unitaire doit être entre CHF 0 et CHF 500",
      path: ["totalPrice"],
    }
  );

export type PackageFormData = z.infer<typeof packageSchema>;

// ============================================================================
// PRODUCT SCHEMA
// ============================================================================

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(200, "La description ne peut pas dépasser 200 caractères"),
  price: z
    .number()
    .positive("Le prix doit être supérieur à 0")
    .max(5000, "Le prix ne peut pas dépasser CHF 5'000"),
  category: z.enum(["B", "A", "BE", "A1", "BPT", "all", "other"]),
  durationHours: z
    .number()
    .positive("La durée doit être supérieure à 0")
    .max(100, "La durée ne peut pas dépasser 100 heures")
    .nullable(),
  isMandatory: z.boolean(),
  vatRate: z.enum([0, 2.5, 8.1]),
  isActive: z.boolean(),
  type: z.enum(["theory_course", "exam", "fee", "other"]),
});

export type ProductFormData = z.infer<typeof productSchema>;

// ============================================================================
// PROMOTION SCHEMA
// ============================================================================

export const promotionSchema = z
  .object({
    code: z
      .string()
      .min(3, "Le code doit contenir au moins 3 caractères")
      .max(20, "Le code ne peut pas dépasser 20 caractères")
      .regex(
        /^[A-Z0-9]+$/,
        "Le code doit contenir uniquement des lettres majuscules et chiffres"
      )
      .transform((val) => val.toUpperCase()),
    type: z.enum(["percentage", "fixed_amount"]),
    value: z.number().positive("La valeur doit être supérieure à 0"),
    applicableTo: z
      .array(z.enum(["lessons", "packages", "courses", "all"]))
      .min(1, "Sélectionnez au moins une option"),
    startDate: z.string().datetime("Date de début invalide"),
    endDate: z.string().datetime("Date de fin invalide"),
    maxUsages: z.number().int().positive().nullable(),
    minPurchaseAmount: z.number().positive().optional(),
    newStudentsOnly: z.boolean().optional(),
    categories: z.array(z.enum(["B", "A", "BE", "A1", "BPT"])).optional(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.type === "percentage") {
        return data.value > 0 && data.value <= 100;
      }
      return data.value > 0 && data.value <= 1000;
    },
    {
      message: "Pourcentage: 0-100%, Montant fixe: CHF 0-1000",
      path: ["value"],
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: "La date de fin doit être après la date de début",
      path: ["endDate"],
    }
  );

export type PromotionFormData = z.infer<typeof promotionSchema>;

// ============================================================================
// VAT CONFIG SCHEMA
// ============================================================================

export const vatConfigSchema = z.object({
  schoolVATNumber: z
    .string()
    .regex(/^CHE-\d{3}\.\d{3}\.\d{3}$/, "Format invalide (CHE-XXX.XXX.XXX)")
    .optional()
    .or(z.literal("")),
  isVATRegistered: z.boolean(),
  displayPricesWithVAT: z.boolean(),
  defaultVATRate: z.enum([0, 2.5, 8.1]),
});

export type VATConfigFormData = z.infer<typeof vatConfigSchema>;

// ============================================================================
// PAYMENT CONDITIONS SCHEMA
// ============================================================================

export const paymentConditionsSchema = z.object({
  paymentTermDays: z
    .number()
    .int("Le délai doit être un entier")
    .min(0, "Le délai doit être positif")
    .max(90, "Le délai ne peut pas dépasser 90 jours"),
  acceptedMethods: z
    .array(z.enum(["cash", "card", "bank_transfer", "twint", "postfinance"]))
    .min(1, "Sélectionnez au moins une méthode de paiement"),
  paymentInstructions: z
    .string()
    .max(500, "Les instructions ne peuvent pas dépasser 500 caractères"),
  requireImmediatePayment: z.boolean(),
  allowDeposits: z.boolean(),
  minimumDepositPercent: z
    .number()
    .int("Le pourcentage doit être un entier")
    .min(0, "Le pourcentage doit être positif")
    .max(100, "Le pourcentage ne peut pas dépasser 100%"),
  minimumDepositAmount: z
    .number()
    .min(0, "Le montant doit être positif")
    .max(10000, "Le montant ne peut pas dépasser CHF 10'000"),
});

export type PaymentConditionsFormData = z.infer<typeof paymentConditionsSchema>;

// ============================================================================
// FEES CONFIG SCHEMA
// ============================================================================

export const feesConfigSchema = z.object({
  lateCancellationEnabled: z.boolean(),
  cancellationGracePeriodHours: z
    .number()
    .int("La période doit être un entier")
    .min(0, "La période doit être positive")
    .max(168, "La période ne peut pas dépasser 168 heures (7 jours)"),
  cancellationFeeAmount: z
    .number()
    .min(0, "Le montant doit être positif")
    .max(500, "Le montant ne peut pas dépasser CHF 500"),
  cancellationFeeIsPercentage: z.boolean(),
  latePaymentFeesEnabled: z.boolean(),
  latePaymentInterestRate: z
    .number()
    .min(0, "Le taux doit être positif")
    .max(20, "Le taux ne peut pas dépasser 20%"),
  latePaymentIsAnnualRate: z.boolean(),
  termsAndConditions: z
    .string()
    .min(50, "Les conditions doivent contenir au moins 50 caractères")
    .max(1000, "Les conditions ne peuvent pas dépasser 1000 caractères"),
});

export type FeesConfigFormData = z.infer<typeof feesConfigSchema>;

// ============================================================================
// COMPLETE PRICING SETTINGS SCHEMA
// ============================================================================

export const pricingSettingsSchema = z.object({
  lessonPrices: z.array(lessonPriceSchema),
  vatConfig: vatConfigSchema,
  paymentConditions: paymentConditionsSchema,
  feesConfig: feesConfigSchema,
});

export type PricingSettingsFormData = z.infer<typeof pricingSettingsSchema>;

// ============================================================================
// VAT CALCULATOR SCHEMA
// ============================================================================

export const vatCalculatorSchema = z.object({
  amountExclVAT: z.number().positive("Le montant doit être supérieur à 0"),
  vatRate: z.enum([0, 2.5, 8.1]),
});

export type VATCalculatorFormData = z.infer<typeof vatCalculatorSchema>;
