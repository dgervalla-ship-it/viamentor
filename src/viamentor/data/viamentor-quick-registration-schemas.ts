/**
 * VIAMENTOR - Quick Registration Schemas
 * Schémas Zod validation inscription rapide secrétariat
 * OAC Art. 10 compliance - Protection mineurs
 */

import { z } from "zod";

// ============================================================================
// STEP 1 - IDENTITY SCHEMA
// ============================================================================

export const identityStepSchema = z
  .object({
    // Informations personnelles
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne peut pas dépasser 50 caractères")
      .regex(
        /^[a-zA-ZÀ-ÿ\s'-]+$/,
        "Le prénom ne peut contenir que des lettres"
      ),

    lastName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne peut pas dépasser 50 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne peut contenir que des lettres"),

    gender: z.enum(["male", "female", "other"]).optional(),

    birthDate: z.date({
      required_error: "La date de naissance est requise",
      invalid_type_error: "Date invalide",
    }),

    // Protection mineurs OAC
    isMinor: z.boolean(),
    legalGuardianName: z.string().optional(),
    legalGuardianPhone: z.string().optional(),
    parentalConsent: z.boolean().optional(),

    // Contact
    phone: z
      .string()
      .min(10, "Le numéro de téléphone est invalide")
      .regex(/^(\+41|0)[0-9]{9}$/, "Format: +41 XX XXX XX XX ou 0XX XXX XX XX"),

    email: z.string().email("L'adresse email est invalide").toLowerCase(),

    // Adresse (optionnelle pour inscription rapide)
    address: z.string().max(200).optional(),
    postalCode: z
      .string()
      .regex(/^[0-9]{4}$/, "Le NPA doit contenir 4 chiffres")
      .optional(),
    city: z.string().max(100).optional(),
    canton: z.string().length(2).optional(),

    // Photo
    photoUrl: z.string().url().optional(),

    // Permis élève
    hasLearnerPermit: z.boolean().default(false),
    learnerPermitNumber: z.string().optional(),
    learnerPermitDate: z.date().optional(),
  })
  .refine(
    (data) => {
      // Si mineur, représentant légal requis
      if (data.isMinor) {
        return !!(
          data.legalGuardianName &&
          data.legalGuardianPhone &&
          data.parentalConsent
        );
      }
      return true;
    },
    {
      message:
        "Les informations du représentant légal sont requises pour les mineurs",
      path: ["legalGuardianName"],
    }
  )
  .refine(
    (data) => {
      // Si permis élève coché, date et numéro requis
      if (data.hasLearnerPermit) {
        return !!(data.learnerPermitNumber && data.learnerPermitDate);
      }
      return true;
    },
    {
      message: "Le numéro et la date du permis élève sont requis",
      path: ["learnerPermitNumber"],
    }
  );

// ============================================================================
// STEP 2 - TRAINING SCHEMA
// ============================================================================

export const trainingStepSchema = z.object({
  // Catégories
  categories: z
    .array(z.enum(["B", "A", "BE", "A1", "BPT"]))
    .min(1, "Sélectionnez au moins une catégorie"),

  // Moniteur
  instructorId: z.string().optional(),
  autoAssignInstructor: z.boolean().default(true),

  // Forfait
  packageId: z.string().optional(),
  packagePrice: z.number().optional(),

  // Cours théorique
  requiresTheoryClass: z.boolean().default(false),

  // Objectifs
  goals: z.string().max(300).optional(),
});

// ============================================================================
// STEP 3 - CONFIRMATION SCHEMA
// ============================================================================

export const confirmationStepSchema = z.object({
  // Actions rapides
  scheduleFirstLesson: z.boolean().default(false),
  sendWelcomeEmail: z.boolean().default(true),
  createStudentAccount: z.boolean().default(true),
  activateImmediately: z.boolean().default(true),

  // Paiement
  paymentMethod: z
    .enum(["cash", "card", "transfer", "twint", "invoice"])
    .optional(),

  paymentAmount: z.number().optional(),
  paymentReceived: z.boolean().default(false),
});

// ============================================================================
// COMPLETE REGISTRATION SCHEMA
// ============================================================================

export const quickRegistrationSchema = z.object({
  identity: identityStepSchema,
  training: trainingStepSchema,
  confirmation: confirmationStepSchema,
});

// ============================================================================
// TYPES
// ============================================================================

export type IdentityStepData = z.infer<typeof identityStepSchema>;
export type TrainingStepData = z.infer<typeof trainingStepSchema>;
export type ConfirmationStepData = z.infer<typeof confirmationStepSchema>;
export type QuickRegistrationData = z.infer<typeof quickRegistrationSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Calcule l'âge à partir de la date de naissance
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * Vérifie si une personne est mineure
 */
export function isMinor(birthDate: Date): boolean {
  return calculateAge(birthDate) < 18;
}

/**
 * Valide un email unique (simulation API)
 */
export async function validateUniqueEmail(email: string): Promise<boolean> {
  // Simulation API check
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock: emails déjà utilisés
  const usedEmails = ["jean.dupont@example.com", "marie.martin@example.com"];

  return !usedEmails.includes(email.toLowerCase());
}

/**
 * Calcule les économies d'un forfait
 */
export function calculatePackageSavings(
  packagePrice: number,
  lessonCount: number,
  unitPrice: number
): number {
  const totalWithoutPackage = lessonCount * unitPrice;
  return Math.max(0, totalWithoutPackage - packagePrice);
}
