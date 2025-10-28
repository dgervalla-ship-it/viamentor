/**
 * VIAMENTOR Validation Schemas (Zod)
 *
 * Schémas de validation centralisés pour tous les formulaires
 * Utilise Zod pour validation TypeScript-first
 *
 * @module data/viamentor-validation-schemas
 * @version 1.0.0
 */

import { z } from "zod";
import { UserRole } from "@/viamentor/data/viamentor-roles";

/**
 * Schéma de validation pour login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Schéma de validation pour création d'utilisateur
 */
export const userSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Rôle invalide" }),
  }),
  tenantId: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Numéro de téléphone invalide")
    .optional()
    .or(z.literal("")),
  birthDate: z.coerce.date().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;

/**
 * Schéma de validation pour étudiant
 */
export const studentSchema = userSchema.extend({
  studentNumber: z
    .string()
    .min(1, "Le numéro d'étudiant est requis")
    .regex(/^[A-Z0-9-]+$/, "Format invalide (lettres majuscules et chiffres)"),
  licenseCategory: z.enum(["A", "B", "C", "D", "BE", "CE"], {
    errorMap: () => ({ message: "Catégorie de permis invalide" }),
  }),
  theoryExamDate: z.coerce.date().optional(),
  practicalExamDate: z.coerce.date().optional(),
  instructorId: z.string().min(1, "L'instructeur est requis"),
});

export type StudentFormData = z.infer<typeof studentSchema>;

/**
 * Schéma de validation pour leçon
 */
export const lessonSchema = z.object({
  studentId: z.string().min(1, "L'étudiant est requis"),
  instructorId: z.string().min(1, "L'instructeur est requis"),
  date: z.coerce.date({
    required_error: "La date est requise",
    invalid_type_error: "Date invalide",
  }),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide"),
  duration: z
    .number()
    .min(30, "La durée minimale est de 30 minutes")
    .max(240, "La durée maximale est de 4 heures"),
  type: z.enum(["THEORY", "PRACTICAL", "SIMULATION"], {
    errorMap: () => ({ message: "Type de leçon invalide" }),
  }),
  location: z.string().min(1, "Le lieu est requis"),
  notes: z
    .string()
    .max(500, "Les notes ne peuvent pas dépasser 500 caractères")
    .optional(),
});

export type LessonFormData = z.infer<typeof lessonSchema>;

/**
 * Schéma de validation pour facture
 */
export const invoiceSchema = z.object({
  studentId: z.string().min(1, "L'étudiant est requis"),
  amount: z
    .number()
    .positive("Le montant doit être positif")
    .max(10000, "Le montant ne peut pas dépasser 10'000 CHF"),
  currency: z
    .enum(["CHF", "EUR"], {
      errorMap: () => ({ message: "Devise invalide" }),
    })
    .default("CHF"),
  dueDate: z.coerce.date({
    required_error: "La date d'échéance est requise",
  }),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(200, "La description ne peut pas dépasser 200 caractères"),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "La description est requise"),
        quantity: z.number().positive("La quantité doit être positive"),
        unitPrice: z.number().positive("Le prix unitaire doit être positif"),
      })
    )
    .min(1, "Au moins un article est requis"),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

/**
 * Helpers de validation
 */
export const ValidationHelpers = {
  /**
   * Valide un email suisse
   */
  isSwissEmail: (email: string): boolean => {
    return email.endsWith(".ch");
  },

  /**
   * Valide un numéro de téléphone suisse
   */
  isSwissPhone: (phone: string): boolean => {
    return /^(\+41|0041|0)[1-9]\d{8}$/.test(phone);
  },

  /**
   * Valide un âge minimum
   */
  isMinimumAge: (birthDate: Date, minAge: number): boolean => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= minAge;
  },
};
