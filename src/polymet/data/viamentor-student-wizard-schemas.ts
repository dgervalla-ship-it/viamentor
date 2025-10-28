/**
 * VIAMENTOR Student Wizard Schemas
 * Validation Zod avec règles légales OAC suisses
 */

import { z } from "zod";

/**
 * Types de catégories permis
 */
export type LicenseCategory = "B" | "A" | "BE" | "A1" | "BPT";

/**
 * Âges minimums selon OAC Art. 6
 */
export const OAC_MINIMUM_AGES: Record<LicenseCategory, number> = {
  A1: 16,
  B: 18,
  A: 18,
  BE: 18,
  BPT: 21,
};

/**
 * Step 1 - Identité
 */
export const identitySchema = z.object({
  photo: z.string().optional(),
  firstName: z.string().min(2, "Minimum 2 caractères requis"),
  lastName: z.string().min(2, "Minimum 2 caractères requis"),
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 16; // Minimum absolu A1
  }, "Âge minimum 16 ans requis"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  street: z.string().min(3, "Adresse requise"),
  zipCode: z
    .string()
    .regex(/^[1-9]\d{3}$/, "NPA suisse invalide (1000-9999)")
    .length(4),
  city: z.string().min(2, "Ville requise"),
  canton: z.string().length(2, "Canton requis"),
  email: z.string().email("Format email invalide"),
  phone: z
    .string()
    .regex(
      /^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Format téléphone suisse invalide"
    ),
  preferredLanguage: z.enum(["fr", "de", "it", "en"]),
});

export type IdentityData = z.infer<typeof identitySchema>;

/**
 * Step 2 - Formation (par catégorie)
 */
export const trainingCategorySchema = z.object({
  category: z.enum(["B", "A", "BE", "A1", "BPT"]),
  enrollmentDate: z.string(),
  instructorId: z.string().optional(),
  packageType: z.enum([
    "single",
    "package_10",
    "package_20",
    "unlimited_monthly",
  ]),
  examTargetDate: z.string().optional(),
  notes: z.string().max(500, "Maximum 500 caractères").optional(),
});

export const trainingSchema = z.object({
  categories: z
    .array(trainingCategorySchema)
    .min(1, "Au moins une catégorie requise"),
});

export type TrainingData = z.infer<typeof trainingSchema>;
export type TrainingCategoryData = z.infer<typeof trainingCategorySchema>;

/**
 * Step 3 - Prérequis légaux OAC
 */
export const legalRequirementsSchema = z.object({
  // Permis élève
  learnerPermitNumber: z.string().min(5, "Numéro permis requis"),
  learnerPermitIssueDate: z.string(),
  learnerPermitExpiryDate: z.string(),
  learnerPermitVerified: z.boolean().refine((val) => val === true, {
    message: "Vérification permis original requise",
  }),
  learnerPermitScan: z.string().optional(),

  // Examen vue
  visionTestCompleted: z.boolean().refine((val) => val === true, {
    message: "Examen vue obligatoire (Art. 11 OAC)",
  }),
  visionTestDate: z.string().optional(),
  visionTestCertificate: z.string().optional(),

  // Cours premiers secours
  firstAidOrganization: z.string().optional(),
  firstAidDate: z.string().optional(),
  firstAidHours: z
    .number()
    .min(10, "Minimum 10h requis (Art. 11 OAC)")
    .optional(),
  firstAidCompleted: z.boolean(),
  firstAidCertificate: z.string().optional(),

  // Cours sensibilisation
  trafficCourseCompleted: z.boolean(),
  trafficCourseDate: z.string().optional(),
  trafficCourseCertificate: z.string().optional(),

  // Examen théorique
  theoryExamStatus: z.enum(["not_taken", "passed", "failed"]),
  theoryExamDate: z.string().optional(),
  theoryExamScore: z.number().min(0).max(50).optional(),
  theoryExamFailCount: z.number().min(0).optional(),
  theoryExamConfirmation: z.string().optional(),

  // Cours moto obligatoire (si catégories A/A1)
  motorcycleCourseCompleted: z.boolean().optional(),
  motorcycleCourseStartDate: z.string().optional(),
  motorcycleCourseEndDate: z.string().optional(),
  motorcycleCourseOrganization: z.string().optional(),
  motorcycleCourseCertificate: z.string().optional(),
});

export type LegalRequirementsData = z.infer<typeof legalRequirementsSchema>;

/**
 * Step 4 - Récapitulatif
 */
export const summarySchema = z.object({
  dataVerified: z.boolean().refine((val) => val === true, {
    message: "Vérification des informations requise",
  }),
  sendWelcomeEmail: z.boolean().optional(),
});

export type SummaryData = z.infer<typeof summarySchema>;

/**
 * Schema complet wizard
 */
export const createStudentWizardSchema = z.object({
  identity: identitySchema,
  training: trainingSchema,
  legalRequirements: legalRequirementsSchema,
  summary: summarySchema,
});

export type CreateStudentWizardData = z.infer<typeof createStudentWizardSchema>;

/**
 * Validation âge selon catégorie OAC
 */
export function validateAgeForCategory(
  birthDate: string,
  category: LicenseCategory
): { valid: boolean; age: number; minimumAge: number; message?: string } {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const minimumAge = OAC_MINIMUM_AGES[category];

  if (age < minimumAge) {
    return {
      valid: false,
      age,
      minimumAge,
      message: `Âge minimum ${minimumAge} ans requis pour catégorie ${category} (Art. 6 OAC)`,
    };
  }

  return { valid: true, age, minimumAge };
}

/**
 * Calcul jours avant expiration permis
 */
export function calculateDaysUntilExpiry(expiryDate: string): number {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Validation permis élève (2 ans validité, renouvelable 1 fois)
 */
export function validateLearnerPermit(
  issueDate: string,
  expiryDate: string
): { valid: boolean; daysRemaining: number; warning?: string } {
  const daysRemaining = calculateDaysUntilExpiry(expiryDate);

  if (daysRemaining < 0) {
    return {
      valid: false,
      daysRemaining,
      warning: "Permis élève expiré. Renouvellement requis.",
    };
  }

  if (daysRemaining < 60) {
    return {
      valid: true,
      daysRemaining,
      warning: `Permis expire dans ${daysRemaining} jours. Planifier prorogation.`,
    };
  }

  return { valid: true, daysRemaining };
}

/**
 * Check si catégories motos nécessitent cours 12h
 */
export function requiresMotorcycleCourse(
  categories: LicenseCategory[]
): boolean {
  return categories.some((cat) => ["A", "A1"].includes(cat));
}

/**
 * Calcul estimation coûts
 */
export const PACKAGE_PRICES: Record<string, number> = {
  single: 120, // Prix unitaire leçon
  package_10: 1140, // -5%
  package_20: 2160, // -10%
  unlimited_monthly: 800, // Forfait mensuel
};

export const ADDITIONAL_COSTS = {
  trafficCourse: 250, // Cours sensibilisation 8h
  firstAidCourse: 150, // Cours premiers secours 10h
  motorcycleCourse: 1200, // Cours moto obligatoire 12h
  examSimulation: 180, // Examen blanc
};

export function calculateEstimatedCost(training: TrainingData): {
  packagesCost: number;
  additionalCosts: number;
  total: number;
  breakdown: Array<{ label: string; amount: number }>;
} {
  const breakdown: Array<{ label: string; amount: number }> = [];
  let packagesCost = 0;

  training.categories.forEach((cat) => {
    const price = PACKAGE_PRICES[cat.packageType];
    packagesCost += price;
    breakdown.push({
      label: `Catégorie ${cat.category} - ${cat.packageType}`,
      amount: price,
    });
  });

  const additionalCosts = 0; // Calculé selon prérequis manquants

  return {
    packagesCost,
    additionalCosts,
    total: packagesCost + additionalCosts,
    breakdown,
  };
}
