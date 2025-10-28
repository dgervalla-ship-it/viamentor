/**
 * VIAMENTOR - Schémas Validation Autorisations Légales OMCo
 *
 * Validation Zod pour Step 3 wizard création moniteur
 * Conformité OMCo 2007 Art. 3 - Autorisations cantonales et TPP
 */

import { z } from "zod";

/**
 * Schéma Autorisation Cantonale
 * OMCo Art. 3: Autorisation cantonale obligatoire
 */
export const cantonalAuthorizationSchema = z.object({
  authorizationNumber: z
    .string()
    .min(1, "authorization_number_required")
    .max(50, "authorization_number_too_long"),

  issuingCanton: z
    .string()
    .min(2, "issuing_canton_required")
    .max(2, "issuing_canton_invalid"),

  issueDate: z
    .string()
    .min(1, "issue_date_required")
    .refine((date) => {
      const issueDate = new Date(date);
      const today = new Date();
      return issueDate <= today;
    }, "issue_date_future"),

  expirationDate: z
    .string()
    .min(1, "expiration_date_required")
    .refine((date) => {
      const expDate = new Date(date);
      const today = new Date();
      return expDate > today;
    }, "expiration_date_past"),

  scanUrl: z
    .string()
    .min(1, "scan_required")
    .url("scan_invalid_url")
    .optional()
    .or(z.literal("")),
});

/**
 * Schéma TPP (Transport Personnes Professionnel)
 * OMCo Art. 3: TPP obligatoire en Suisse
 */
export const tppSchema = z.object({
  hasValidTPP: z.boolean().refine((val) => val === true, "tpp_required_omco"),

  tppNumber: z
    .string()
    .min(1, "tpp_number_required")
    .max(50, "tpp_number_too_long")
    .optional()
    .or(z.literal("")),

  expirationDate: z
    .string()
    .min(1, "tpp_expiration_required")
    .refine((date) => {
      if (!date) return true;
      const expDate = new Date(date);
      const today = new Date();
      return expDate > today;
    }, "tpp_expiration_past")
    .optional()
    .or(z.literal("")),

  certificateUrl: z
    .string()
    .url("certificate_invalid_url")
    .optional()
    .or(z.literal("")),
});

/**
 * Schéma Casier Judiciaire
 * Extrait récent (<3 mois) obligatoire pour sécurité élèves
 */
export const criminalRecordSchema = z.object({
  extractDate: z
    .string()
    .min(1, "extract_date_required")
    .refine((date) => {
      const extractDate = new Date(date);
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);

      return extractDate >= threeMonthsAgo && extractDate <= today;
    }, "extract_date_too_old"),

  documentUrl: z
    .string()
    .min(1, "criminal_record_required")
    .url("document_invalid_url")
    .optional()
    .or(z.literal("")),

  verifiedCompliant: z.boolean().optional(),
});

/**
 * Schéma Assurance RC Professionnelle
 * Recommandée pour protection moniteur
 */
export const professionalLiabilitySchema = z.object({
  insuranceCompany: z
    .string()
    .max(100, "company_name_too_long")
    .optional()
    .or(z.literal("")),

  policyNumber: z
    .string()
    .max(50, "policy_number_too_long")
    .optional()
    .or(z.literal("")),

  expirationDate: z
    .string()
    .refine((date) => {
      if (!date) return true;
      const expDate = new Date(date);
      const today = new Date();
      return expDate > today;
    }, "insurance_expiration_past")
    .optional()
    .or(z.literal("")),

  attestationUrl: z
    .string()
    .url("attestation_invalid_url")
    .optional()
    .or(z.literal("")),
});

/**
 * Schéma complet Autorisations Légales
 */
export const legalAuthorizationsSchema = z.object({
  cantonalAuthorization: cantonalAuthorizationSchema,
  tpp: tppSchema,
  criminalRecord: criminalRecordSchema,
  professionalLiability: professionalLiabilitySchema.optional(),
});

/**
 * Types TypeScript
 */
export type CantonalAuthorizationData = z.infer<
  typeof cantonalAuthorizationSchema
>;

export type TPPData = z.infer<typeof tppSchema>;
export type CriminalRecordData = z.infer<typeof criminalRecordSchema>;
export type ProfessionalLiabilityData = z.infer<
  typeof professionalLiabilitySchema
>;

export type LegalAuthorizationsData = z.infer<typeof legalAuthorizationsSchema>;

/**
 * Helper: Calculer jours avant expiration
 */
export function calculateDaysUntilExpiration(expirationDate: string): number {
  const expDate = new Date(expirationDate);
  const today = new Date();
  const diffTime = expDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Helper: Vérifier si renouvellement proche (<180 jours)
 */
export function isRenewalSoon(expirationDate: string): boolean {
  const daysUntil = calculateDaysUntilExpiration(expirationDate);
  return daysUntil > 0 && daysUntil < 180;
}

/**
 * Helper: Vérifier si expiré
 */
export function isExpired(expirationDate: string): boolean {
  const daysUntil = calculateDaysUntilExpiration(expirationDate);
  return daysUntil <= 0;
}

/**
 * Helper: Valider données autorisations légales
 */
export function validateLegalAuthorizations(
  data: Partial<LegalAuthorizationsData>
): { success: boolean; errors: Record<string, string> } {
  try {
    legalAuthorizationsSchema.parse(data);
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
    return { success: false, errors: { general: "validation_failed" } };
  }
}
