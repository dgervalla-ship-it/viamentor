/**
 * VIAMENTOR - About Page Types
 * Types TypeScript stricts avec validation Zod pour la page À propos
 */

import { z } from "zod";
import type { ShapesIcon as LucideIcon } from "lucide-react";

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

/**
 * Schema de validation pour un membre de l'équipe
 */
export const TeamMemberSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  role: z.string().min(1, "Le rôle est requis"),
  bio: z.string().min(1, "La bio est requise"),
  avatar: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
});

/**
 * Schema de validation pour une étape de la timeline
 */
export const TimelineMilestoneSchema = z.object({
  year: z.string().regex(/^\d{4}$/, "L'année doit être au format YYYY"),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
});

/**
 * Schema de validation pour une valeur d'entreprise
 */
export const ValueSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
});

/**
 * Schema de validation pour les props de la page
 */
export const AboutPagePropsSchema = z.object({
  initialLocale: z.enum(["fr", "de", "it", "en"]).optional(),
});

// ============================================================================
// TYPESCRIPT TYPES
// ============================================================================

/**
 * Type pour un membre de l'équipe
 */
export type TeamMember = z.infer<typeof TeamMemberSchema>;

/**
 * Type pour une étape de la timeline
 */
export type TimelineMilestone = z.infer<typeof TimelineMilestoneSchema>;

/**
 * Type pour une valeur d'entreprise
 */
export type Value = z.infer<typeof ValueSchema>;

/**
 * Type pour les props de la page À propos
 */
export type AboutPageProps = z.infer<typeof AboutPagePropsSchema>;

/**
 * Type pour les clés d'icônes de valeurs
 */
export type ValueIconKey =
  | "Innovation"
  | "Qualité"
  | "Simplicité"
  | "Transparence";

/**
 * Type pour le mapping des icônes de valeurs
 */
export type ValueIconsMap = Record<ValueIconKey, LucideIcon>;

/**
 * Type pour les locales marketing
 */
export type MarketingLocale = "fr" | "de" | "it" | "en";

/**
 * Type pour les éléments de breadcrumb
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

/**
 * Type pour les métadonnées SEO
 */
export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  locale: MarketingLocale;
}

/**
 * Type pour les données structurées JSON-LD
 */
export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Valide un membre de l'équipe
 * @param data - Données à valider
 * @returns Données validées ou null si invalide
 */
export function validateTeamMember(data: unknown): TeamMember | null {
  try {
    return TeamMemberSchema.parse(data);
  } catch (error) {
    console.error("Validation error for team member:", error);
    return null;
  }
}

/**
 * Valide une étape de timeline
 * @param data - Données à valider
 * @returns Données validées ou null si invalide
 */
export function validateTimelineMilestone(
  data: unknown
): TimelineMilestone | null {
  try {
    return TimelineMilestoneSchema.parse(data);
  } catch (error) {
    console.error("Validation error for timeline milestone:", error);
    return null;
  }
}

/**
 * Valide une valeur d'entreprise
 * @param data - Données à valider
 * @returns Données validées ou null si invalide
 */
export function validateValue(data: unknown): Value | null {
  try {
    return ValueSchema.parse(data);
  } catch (error) {
    console.error("Validation error for value:", error);
    return null;
  }
}

/**
 * Valide les props de la page
 * @param data - Données à valider
 * @returns Données validées ou null si invalide
 */
export function validateAboutPageProps(data: unknown): AboutPageProps | null {
  try {
    return AboutPagePropsSchema.parse(data);
  } catch (error) {
    console.error("Validation error for about page props:", error);
    return null;
  }
}
