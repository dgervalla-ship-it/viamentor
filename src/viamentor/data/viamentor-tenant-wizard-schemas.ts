/**
 * VIAMENTOR Tenant Wizard Validation Schemas
 *
 * Schémas Zod pour validation formulaire création tenant
 *
 * @module data/viamentor-tenant-wizard-schemas
 * @version 1.0.0
 */

import { z } from "zod";
import { UserRole } from "@/viamentor/data/viamentor-roles";
import { SupportedLocale } from "@/viamentor/data/viamentor-i18n-config";

/**
 * Step 1 - School Info Schema
 */
export const schoolInfoSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional(),
  logo: z.string().optional(),
  canton: z.string().length(2, "Sélectionnez un canton"),
  address: z.string().min(5, "L'adresse est requise"),
  postalCode: z.string().regex(/^\d{4}$/, "Le NPA doit contenir 4 chiffres"),
  city: z.string().min(2, "La ville est requise"),
  phone: z
    .string()
    .regex(
      /^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Format: +41 XX XXX XX XX"
    ),
  email: z.string().email("Email invalide"),
  website: z
    .string()
    .url("URL invalide")
    .regex(/^https:\/\//, "L'URL doit commencer par https://")
    .optional()
    .or(z.literal("")),
});

export type SchoolInfoData = z.infer<typeof schoolInfoSchema>;

/**
 * Step 2 - Admin User Schema
 */
export const adminUserSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Doit contenir au moins un chiffre")
    .regex(/[^A-Za-z0-9]/, "Doit contenir au moins un symbole"),
  sendWelcomeEmail: z.boolean().default(true),
  locale: z.enum(["fr", "de", "it", "en"] as const),
});

export type AdminUserData = z.infer<typeof adminUserSchema>;

/**
 * Step 3 - Plan & Billing Schema
 */
export const planBillingSchema = z
  .object({
    plan: z.enum(["Free", "Pro", "Enterprise"]),
    iban: z
      .string()
      .regex(
        /^CH\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d$/,
        "Format IBAN suisse invalide"
      )
      .optional(),
    billingName: z.string().min(2, "La raison sociale est requise").optional(),
    freeTrial: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.plan === "Pro" || data.plan === "Enterprise") {
        return !!data.iban && !!data.billingName;
      }
      return true;
    },
    {
      message: "IBAN et raison sociale requis pour les plans payants",
      path: ["iban"],
    }
  );

export type PlanBillingData = z.infer<typeof planBillingSchema>;

/**
 * Step 4 - Configuration Schema
 */
export const configurationSchema = z.object({
  modules: z.object({
    geolocation: z.boolean().default(false),
    smsNotifications: z.boolean().default(false),
    accountingIntegration: z.boolean().default(false),
    qrBill: z.boolean().default(false),
    bankReconciliation: z.boolean().default(false),
  }),
  backupFrequency: z.enum(["daily", "weekly", "manual"]).default("daily"),
  storageQuota: z.number().min(10).max(500).default(100),
});

export type ConfigurationData = z.infer<typeof configurationSchema>;

/**
 * Step 5 - Complete Tenant Schema
 */
export const completeTenantSchema = z.object({
  schoolInfo: schoolInfoSchema,
  adminUser: adminUserSchema,
  planBilling: planBillingSchema,
  configuration: configurationSchema,
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions générales",
  }),
});

export type CompleteTenantData = z.infer<typeof completeTenantSchema>;

/**
 * Plan pricing configuration
 */
export const PLAN_PRICING = {
  Free: {
    price: 0,
    currency: "CHF",
    maxStudents: 10,
    maxInstructors: 1,
    features: [
      "Modules basiques",
      "Support email",
      "10 élèves maximum",
      "1 moniteur",
    ],
  },
  Pro: {
    price: 99,
    currency: "CHF",
    maxStudents: 50,
    maxInstructors: 5,
    features: [
      "Tous les modules",
      "Support prioritaire",
      "50 élèves",
      "5 moniteurs",
      "Rapports avancés",
    ],
  },
  Enterprise: {
    price: null,
    currency: "CHF",
    maxStudents: -1,
    maxInstructors: -1,
    features: [
      "Élèves illimités",
      "Moniteurs illimités",
      "Modules personnalisés",
      "Support dédié",
      "SLA garanti",
    ],
  },
} as const;

/**
 * Module pricing (add-ons)
 */
export const MODULE_PRICING = {
  geolocation: 15,
  smsNotifications: 20,
  accountingIntegration: 25,
  qrBill: 10,
  bankReconciliation: 30,
} as const;

/**
 * Storage pricing (per GB over 100GB)
 */
export const STORAGE_PRICE_PER_GB = 0.5;

/**
 * Swiss VAT rate
 */
export const SWISS_VAT_RATE = 0.081;

/**
 * Calculate total monthly cost
 */
export function calculateMonthlyCost(data: {
  plan: "Free" | "Pro" | "Enterprise";
  modules: ConfigurationData["modules"];
  storageQuota: number;
}): {
  basePlan: number;
  modules: number;
  storage: number;
  subtotal: number;
  vat: number;
  total: number;
} {
  const basePlan = PLAN_PRICING[data.plan].price || 0;

  const modulesTotal = Object.entries(data.modules).reduce(
    (sum, [key, enabled]) => {
      if (enabled && key in MODULE_PRICING) {
        return sum + MODULE_PRICING[key as keyof typeof MODULE_PRICING];
      }
      return sum;
    },
    0
  );

  const extraStorage = Math.max(0, data.storageQuota - 100);
  const storageTotal = extraStorage * STORAGE_PRICE_PER_GB;

  const subtotal = basePlan + modulesTotal + storageTotal;
  const vat = subtotal * SWISS_VAT_RATE;
  const total = subtotal + vat;

  return {
    basePlan,
    modules: modulesTotal,
    storage: storageTotal,
    subtotal,
    vat,
    total,
  };
}

/**
 * Generate secure password
 */
export function generateSecurePassword(length: number = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = uppercase + lowercase + numbers + symbols;

  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

/**
 * Calculate password strength
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  label: "Faible" | "Moyen" | "Fort";
  color: string;
} {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return { score, label: "Faible", color: "text-red-600" };
  } else if (score <= 4) {
    return { score, label: "Moyen", color: "text-orange-600" };
  } else {
    return { score, label: "Fort", color: "text-green-600" };
  }
}
