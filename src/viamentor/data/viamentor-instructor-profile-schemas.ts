/**
 * VIAMENTOR - Instructor Profile Validation Schemas
 * Schémas Zod validation profil moniteur avec règles métier OAC
 */

import { z } from "zod";

// ============================================================================
// PERSONAL INFO SCHEMA
// ============================================================================

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Prénom requis (min 2 caractères)"),
  lastName: z.string().min(2, "Nom requis (min 2 caractères)"),
  birthDate: z.date().refine(
    (date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 21 && age <= 70;
    },
    { message: "Âge doit être entre 21 et 70 ans (OAC Art. 66)" }
  ),
  gender: z.enum(["male", "female", "other", "not_specified"]).optional(),
  email: z.string().email("Email invalide").min(1, "Email requis"),
  phone: z
    .string()
    .regex(
      /^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Format téléphone suisse invalide (+41 XX XXX XX XX)"
    ),
  address: z.string().min(5, "Adresse requise"),
  postalCode: z.string().regex(/^\d{4}$/, "NPA doit être 4 chiffres"),
  city: z.string().min(2, "Ville requise"),
  canton: z.string().length(2, "Canton requis (code 2 lettres)"),
  locale: z.enum(["fr", "de", "it", "en"]),
  avatar: z.string().url().optional(),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;

// ============================================================================
// CERTIFICATIONS SCHEMA
// ============================================================================

export const certificateTypeEnum = z.enum([
  "teaching_permit",
  "pedagogical_certificate",
  "continuing_education",
  "professional_liability",
  "criminal_record",
  "medical_certificate",
  "other",
]);

export const certificateStatusEnum = z.enum([
  "valid",
  "expiring_soon",
  "expired",
]);

export const certificateSchema = z.object({
  id: z.string(),
  type: certificateTypeEnum,
  status: certificateStatusEnum,
  issueDate: z.date(),
  expirationDate: z.date().optional(),
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  notes: z.string().max(500).optional(),
});

export type CertificateData = z.infer<typeof certificateSchema>;

export const addCertificateSchema = z.object({
  type: certificateTypeEnum,
  issueDate: z.date(),
  expirationDate: z.date().optional(),
  file: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Fichier max 5MB",
  }),
  notes: z.string().max(500).optional(),
});

// ============================================================================
// SPECIALTIES SCHEMA
// ============================================================================

export const specialtyEnum = z.enum([
  "beginners",
  "advanced",
  "sport_driving",
  "eco_driving",
  "seniors",
  "handicap",
  "intensive",
  "exam_prep",
  "defensive",
  "night",
  "highway",
  "other",
]);

export const specialtiesSchema = z.object({
  specialties: z
    .array(specialtyEnum)
    .min(1, "Sélectionner au moins 1 spécialité"),
  otherSpecialty: z.string().max(100).optional(),
  bio: z
    .string()
    .min(50, "Présentation minimum 50 caractères")
    .max(500, "Présentation maximum 500 caractères"),
});

export type SpecialtiesData = z.infer<typeof specialtiesSchema>;

// ============================================================================
// TEACHING PREFERENCES SCHEMA
// ============================================================================

export const studentTypeEnum = z.enum([
  "young_adults",
  "adults",
  "seniors",
  "career_change",
  "foreigners",
]);

export const timeSlotEnum = z.enum([
  "morning",
  "afternoon",
  "evening",
  "weekend",
]);

export const teachingPreferencesSchema = z.object({
  preferredStudentTypes: z.array(studentTypeEnum).optional(),
  preferredTimeSlots: z
    .array(timeSlotEnum)
    .min(1, "Sélectionner au moins 1 créneau"),
  hourlyRate: z
    .number()
    .min(50, "Tarif minimum CHF 50")
    .max(200, "Tarif maximum CHF 200")
    .optional(),
  maxStudentsPerWeek: z.number().min(1).max(50).optional(),
  preferredVehicleIds: z.array(z.string()).optional(),
});

export type TeachingPreferencesData = z.infer<typeof teachingPreferencesSchema>;

// ============================================================================
// SECURITY SCHEMA
// ============================================================================

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z
      .string()
      .min(8, "Minimum 8 caractères")
      .regex(/[A-Z]/, "Au moins 1 majuscule")
      .regex(/[a-z]/, "Au moins 1 minuscule")
      .regex(/[0-9]/, "Au moins 1 chiffre")
      .regex(/[^A-Za-z0-9]/, "Au moins 1 caractère spécial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

// ============================================================================
// COMPLETE PROFILE SCHEMA
// ============================================================================

export const instructorProfileSchema = z.object({
  personalInfo: personalInfoSchema,
  specialties: specialtiesSchema,
  teachingPreferences: teachingPreferencesSchema,
});

export type InstructorProfileData = z.infer<typeof instructorProfileSchema>;
