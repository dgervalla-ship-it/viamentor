/**
 * VIAMENTOR - Onboarding Wizard Schemas
 * Validation Zod pour configuration initiale tenant
 */

import { z } from "zod";

/**
 * Step 1: Informations École
 */
export const schoolInfoSchema = z.object({
  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Le logo ne doit pas dépasser 5 MB"
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Format accepté : JPG, PNG, WEBP"
    ),
  logoPreview: z.string().optional(),
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s\-']+$/, "Caractères alphanumériques uniquement"),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional(),
  email: z
    .string()
    .email("Format email invalide")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email invalide"
    ),
  phone: z
    .string()
    .regex(
      /^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Format : +41 XX XXX XX XX"
    ),
  address: z.object({
    street: z.string().min(5, "Adresse requise"),
    zip: z
      .string()
      .regex(/^\d{4}$/, "Code postal suisse : 4 chiffres")
      .refine((val) => parseInt(val) >= 1000 && parseInt(val) <= 9999, {
        message: "Code postal invalide (1000-9999)",
      }),
    city: z.string().min(2, "Ville requise"),
    canton: z
      .string()
      .length(2, "Code canton : 2 lettres")
      .regex(/^[A-Z]{2}$/, "Code canton invalide"),
  }),
  brandColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Format couleur hex : #RRGGBB")
    .default("#3b82f6"),
  multiSites: z.boolean().default(false),
});

export type SchoolInfoData = z.infer<typeof schoolInfoSchema>;

/**
 * Step 2: Utilisateurs & Rôles
 */
export const userInviteSchema = z.object({
  email: z
    .string()
    .email("Format email invalide")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email invalide"
    ),
  role: z.enum(["INSTRUCTOR", "SECRETARY", "SCHOOL_ADMIN"], {
    required_error: "Rôle requis",
    invalid_type_error: "Rôle invalide",
  }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  sendInviteNow: z.boolean().default(true),
});

export const usersRolesSchema = z
  .object({
    invites: z
      .array(userInviteSchema)
      .min(1, "Au moins 1 utilisateur requis")
      .max(50, "Maximum 50 invitations simultanées"),
  })
  .refine(
    (data) => {
      // Au moins 1 moniteur requis
      return data.invites.some((invite) => invite.role === "INSTRUCTOR");
    },
    {
      message: "Au moins 1 moniteur requis pour démarrer",
      path: ["invites"],
    }
  )
  .refine(
    (data) => {
      // Emails uniques
      const emails = data.invites.map((i) => i.email.toLowerCase());
      return emails.length === new Set(emails).size;
    },
    {
      message: "Emails en double détectés",
      path: ["invites"],
    }
  );

export type UserInviteData = z.infer<typeof userInviteSchema>;
export type UsersRolesData = z.infer<typeof usersRolesSchema>;

/**
 * Step 3: Catégories & Véhicules
 */
export const categoryConfigSchema = z.object({
  category: z.enum(["A1", "A", "B", "BE", "C", "CE", "D", "DE", "F", "G", "M"]),
  enabled: z.boolean().default(true),
  price: z
    .number()
    .min(50, "Prix minimum : CHF 50")
    .max(300, "Prix maximum : CHF 300")
    .optional(),
  duration: z
    .number()
    .min(30, "Durée minimum : 30 minutes")
    .max(180, "Durée maximum : 180 minutes")
    .optional(),
});

export const quickVehicleSchema = z.object({
  licensePlate: z
    .string()
    .regex(/^[A-Z]{2}\s?\d{1,6}$/, "Format plaque suisse : XX 123456"),
  category: z.enum(["A1", "A", "B", "BE", "C", "CE", "D", "DE", "F", "G", "M"]),
  transmission: z.enum(["manual", "automatic"]),
});

export const categoriesVehiclesSchema = z.object({
  categories: z
    .array(categoryConfigSchema)
    .min(1, "Au moins 1 catégorie requise")
    .refine(
      (cats) => cats.some((c) => c.category === "B" && c.enabled),
      "La catégorie B est obligatoire"
    ),
  quickVehicles: z.array(quickVehicleSchema).default([]),
  addVehiclesLater: z.boolean().default(false),
});

export type CategoryConfig = z.infer<typeof categoryConfigSchema>;
export type QuickVehicle = z.infer<typeof quickVehicleSchema>;
export type CategoriesVehiclesData = z.infer<typeof categoriesVehiclesSchema>;

/**
 * Step 4: Configuration Paiements
 */
export const paymentConfigSchema = z
  .object({
    invoicingEnabled: z.boolean().default(true),
    vatNumber: z
      .string()
      .regex(/^CHE-\d{3}\.\d{3}\.\d{3}$/, "Format TVA suisse : CHE-XXX.XXX.XXX")
      .optional(),
    iban: z
      .string()
      .regex(
        /^CH\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d$/,
        "IBAN suisse invalide (format : CH00 0000 0000 0000 0000 0)"
      )
      .optional(),
    paymentMethods: z
      .array(z.enum(["cash", "card", "bank_transfer", "twint"]))
      .min(1, "Au moins 1 méthode de paiement requise")
      .default(["cash"]),
    paymentDeadlineDays: z
      .number()
      .int("Nombre entier requis")
      .min(7, "Minimum 7 jours")
      .max(90, "Maximum 90 jours")
      .default(30),
    termsAndConditions: z
      .string()
      .max(500, "Maximum 500 caractères")
      .optional(),
    qrBillEnabled: z.boolean().default(true),
  })
  .refine(
    (data) => {
      // Si facturation activée, IBAN requis
      if (data.invoicingEnabled && !data.iban) {
        return false;
      }
      return true;
    },
    {
      message: "IBAN requis si facturation activée",
      path: ["iban"],
    }
  );

export type PaymentConfigData = z.infer<typeof paymentConfigSchema>;

/**
 * Step 5: Finalisation
 */
export const finalizationSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  newsletter: z.boolean().default(false),
  dataProcessingConsent: z.boolean().default(true),
});

export type FinalizationData = z.infer<typeof finalizationSchema>;

/**
 * Schema complet onboarding
 */
export const onboardingSchema = z.object({
  schoolInfo: schoolInfoSchema,
  usersRoles: usersRolesSchema,
  categoriesVehicles: categoriesVehiclesSchema,
  paymentConfig: paymentConfigSchema,
  finalization: finalizationSchema,
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

/**
 * Validation partielle pour auto-save
 */
export function validatePartial<T>(
  schema: z.ZodSchema<T>,
  data: Partial<T>
): { success: boolean; errors?: z.ZodError } {
  try {
    schema.partial().parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    return { success: false };
  }
}
