import { z } from "zod";

/**
 * VIAMENTOR - Instructor Creation Wizard Schemas
 *
 * Schémas de validation Zod pour le wizard de création de moniteur
 * avec conformité aux règles OMCo suisses (âge minimum 21 ans)
 */

// Types de base
export type Gender = "male" | "female" | "other";
export type Canton =
  | "AG"
  | "AI"
  | "AR"
  | "BE"
  | "BL"
  | "BS"
  | "FR"
  | "GE"
  | "GL"
  | "GR"
  | "JU"
  | "LU"
  | "NE"
  | "NW"
  | "OW"
  | "SG"
  | "SH"
  | "SO"
  | "SZ"
  | "TG"
  | "TI"
  | "UR"
  | "VD"
  | "VS"
  | "ZG"
  | "ZH";
export type Language = "fr" | "de" | "it" | "en";
export type LicenseCategory = "B" | "A" | "BE" | "A1" | "BPT";
export type Specialty =
  | "urban"
  | "highway"
  | "eco_driving"
  | "defensive"
  | "advanced";

// Validation âge minimum OMCo (21 ans)
const validateMinAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 21;
  }
  return age >= 21;
};

// Validation IBAN Suisse
const validateSwissIBAN = (iban: string) => {
  const cleanIBAN = iban.replace(/\s/g, "").toUpperCase();
  return cleanIBAN.startsWith("CH") && cleanIBAN.length === 21;
};

// Validation téléphone suisse
const validateSwissPhone = (phone: string) => {
  const cleanPhone = phone.replace(/\s/g, "");
  return /^(\+41|0041|0)[1-9]\d{8}$/.test(cleanPhone);
};

/**
 * Step 1 - Personal Information Schema
 */
export const personalInfoSchema = z.object({
  // Photo
  photo: z.string().optional(),

  // Identité
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-ZÀ-ÿ\s-']+$/,
      "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes"
    ),

  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-ZÀ-ÿ\s-']+$/,
      "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"
    ),

  birthDate: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Date de naissance invalide")
    .refine(
      validateMinAge,
      "L'âge minimum requis est de 21 ans selon les règles OMCo"
    ),

  gender: z.enum(["male", "female", "other"]).optional(),

  // Adresse
  street: z
    .string()
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(100, "L'adresse ne peut pas dépasser 100 caractères"),

  zipCode: z
    .string()
    .regex(/^\d{4}$/, "Le NPA doit contenir exactement 4 chiffres"),

  city: z
    .string()
    .min(2, "La ville doit contenir au moins 2 caractères")
    .max(50, "La ville ne peut pas dépasser 50 caractères"),

  canton: z.enum([
    "AG",
    "AI",
    "AR",
    "BE",
    "BL",
    "BS",
    "FR",
    "GE",
    "GL",
    "GR",
    "JU",
    "LU",
    "NE",
    "NW",
    "OW",
    "SG",
    "SH",
    "SO",
    "SZ",
    "TG",
    "TI",
    "UR",
    "VD",
    "VS",
    "ZG",
    "ZH",
  ]),

  // Contact
  email: z
    .string()
    .email("Format d'email invalide")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),

  phone: z
    .string()
    .refine(
      validateSwissPhone,
      "Format de téléphone suisse invalide (+41 ou 0XX XXX XX XX)"
    ),

  // Informations complémentaires
  nationality: z.string().min(2, "La nationalité est requise"),

  languages: z
    .array(z.enum(["fr", "de", "it", "en"]))
    .min(1, "Au moins une langue est requise")
    .max(4, "Maximum 4 langues autorisées"),

  iban: z
    .string()
    .optional()
    .refine(
      (iban) => !iban || validateSwissIBAN(iban),
      "Format IBAN suisse invalide (CH + 19 chiffres)"
    ),
});

/**
 * Step 2 - Qualifications Schema
 */
export const qualificationsSchema = z.object({
  // Brevet fédéral
  federalLicenseNumber: z
    .string()
    .min(5, "Le numéro de brevet doit contenir au moins 5 caractères")
    .max(20, "Le numéro de brevet ne peut pas dépasser 20 caractères")
    .regex(
      /^[A-Z0-9-]+$/,
      "Le numéro de brevet ne peut contenir que des lettres majuscules, chiffres et tirets"
    ),

  federalLicenseDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
  }, "Date d'obtention invalide ou future"),

  federalLicenseScan: z
    .string()
    .min(1, "Le scan du brevet fédéral est obligatoire"),

  isVerified: z.boolean().default(false),

  // Habilitations par catégorie
  categories: z
    .array(
      z.object({
        category: z.enum(["B", "A", "BE", "A1", "BPT"]),
        obtainedDate: z.string().refine((date) => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
        }, "Date d'obtention invalide ou future"),
        experience: z
          .string()
          .max(500, "L'expérience ne peut pas dépasser 500 caractères")
          .optional(),
        certificates: z.array(z.string()).optional(),
      })
    )
    .min(1, "Au moins une catégorie d'habilitation est requise"),

  // Spécialités
  specialties: z
    .array(z.enum(["urban", "highway", "eco_driving", "defensive", "advanced"]))
    .max(5, "Maximum 5 spécialités autorisées")
    .optional(),

  // Diplômes additionnels
  additionalDiplomas: z
    .string()
    .max(
      500,
      "Les diplômes additionnels ne peuvent pas dépasser 500 caractères"
    )
    .optional(),
});

// Schema complet du wizard
export const instructorWizardSchema = z.object({
  personalInfo: personalInfoSchema,
  qualifications: qualificationsSchema,
});

// Types TypeScript dérivés
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type QualificationsData = z.infer<typeof qualificationsSchema>;
export type InstructorWizardData = z.infer<typeof instructorWizardSchema>;

// Validation par étape
export const validatePersonalInfo = (data: Partial<PersonalInfoData>) => {
  try {
    personalInfoSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Erreur de validation" } };
  }
};

export const validateQualifications = (data: Partial<QualificationsData>) => {
  try {
    qualificationsSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Erreur de validation" } };
  }
};

// Helpers pour les options
export const GENDER_OPTIONS = [
  { value: "male", labelKey: "gender.male" },
  { value: "female", labelKey: "gender.female" },
  { value: "other", labelKey: "gender.other" },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: "fr", labelKey: "languages.french", flag: "🇫🇷" },
  { value: "de", labelKey: "languages.german", flag: "🇩🇪" },
  { value: "it", labelKey: "languages.italian", flag: "🇮🇹" },
  { value: "en", labelKey: "languages.english", flag: "🇬🇧" },
] as const;

export const CATEGORY_OPTIONS = [
  { value: "B", labelKey: "categories.B", icon: "🚗", description: "Voiture" },
  { value: "A", labelKey: "categories.A", icon: "🏍️", description: "Moto" },
  {
    value: "BE",
    labelKey: "categories.BE",
    icon: "🚛",
    description: "Voiture + remorque",
  },
  {
    value: "A1",
    labelKey: "categories.A1",
    icon: "🛵",
    description: "Moto légère",
  },
  {
    value: "BPT",
    labelKey: "categories.BPT",
    icon: "🚌",
    description: "Transport professionnel",
  },
] as const;

export const SPECIALTY_OPTIONS = [
  { value: "urban", labelKey: "specialties.urban", icon: "🏙️" },
  { value: "highway", labelKey: "specialties.highway", icon: "🛣️" },
  { value: "eco_driving", labelKey: "specialties.eco_driving", icon: "🌱" },
  { value: "defensive", labelKey: "specialties.defensive", icon: "🛡️" },
  { value: "advanced", labelKey: "specialties.advanced", icon: "⭐" },
] as const;
