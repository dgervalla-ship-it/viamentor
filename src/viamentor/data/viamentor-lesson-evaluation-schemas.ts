/**
 * VIAMENTOR - Lesson Evaluation Schemas
 * Schémas Zod validation évaluation leçon OAC Art. 67
 */

import { z } from "zod";

// ============================================================================
// TYPES & SCHEMAS
// ============================================================================

/**
 * Thèmes L-drive officiels Suisse
 */
export const LDriveThemes = {
  circulation: ["urban_driving", "rural_driving", "highway_driving"] as const,
  maneuvers: [
    "parallel_parking",
    "angle_parking",
    "bay_parking",
    "reverse_driving",
    "u_turn",
  ] as const,
  priorities: [
    "intersections",
    "roundabouts",
    "traffic_signs",
    "pedestrian_crossings",
  ] as const,
  speed: ["speed_adaptation"] as const,
  distances: ["safety_distances"] as const,
  overtaking: ["overtaking_technique"] as const,
  direction_changes: ["direction_signaling"] as const,
  defensive: ["defensive_driving"] as const,
  special_conditions: [
    "night_driving",
    "rain_driving",
    "snow_driving",
    "fog_driving",
  ] as const,
  eco_driving: ["fuel_economy"] as const,
  parking: ["parking_types"] as const,
  highway: ["highway_access_exit"] as const,
  other: ["other_custom"] as const,
};

export type ThemeCategory = keyof typeof LDriveThemes;
export type ThemeId = (typeof LDriveThemes)[ThemeCategory][number];

/**
 * Note globale 1-5 étoiles
 */
export const GlobalRatingSchema = z.enum(["1", "2", "3", "4", "5"]);
export type GlobalRating = z.infer<typeof GlobalRatingSchema>;

/**
 * Points vigilance sécurité
 */
export const SafetyConcerns = [
  "blind_spots_not_checked",
  "insufficient_safety_distances",
  "inappropriate_speed",
  "traffic_signs_ignored",
  "priorities_not_respected",
  "high_stress",
  "fatigue",
  "other_custom",
] as const;

export type SafetyConcern = (typeof SafetyConcerns)[number];

/**
 * Évaluation détaillée par thème
 */
export const ThemeEvaluationSchema = z.object({
  themeId: z.string(),
  rating: z.enum(["1", "2", "3", "4", "5"]),
  comment: z.string().max(150).optional(),
});

export type ThemeEvaluation = z.infer<typeof ThemeEvaluationSchema>;

/**
 * Signature digitale
 */
export const DigitalSignatureSchema = z.object({
  signatureData: z.string().min(1, "Signature requise"),
  timestamp: z.string(),
  location: z
    .object({
      city: z.string().optional(),
      canton: z.string().optional(),
    })
    .optional(),
  ipAddress: z.string().optional(),
});

export type DigitalSignature = z.infer<typeof DigitalSignatureSchema>;

/**
 * Schéma complet évaluation leçon
 */
export const LessonEvaluationSchema = z.object({
  // Context leçon (readonly)
  lessonId: z.string(),
  studentId: z.string(),
  instructorId: z.string(),
  date: z.string(),
  duration: z.number(),
  category: z.enum(["B", "A", "A1", "BE", "C", "D"]),
  vehicleId: z.string(),
  meetingPoint: z.string(),

  // Thèmes abordés (required min 1)
  themes: z.array(z.string()).min(1, "Sélectionner au moins 1 thème"),
  customTheme: z.string().max(100).optional(),

  // Évaluation globale (required)
  globalRating: GlobalRatingSchema,

  // Évaluation détaillée par thème (optional)
  themeEvaluations: z.array(ThemeEvaluationSchema).optional(),

  // Commentaire général (required min 50 chars)
  generalComment: z
    .string()
    .min(50, "Commentaire minimum 50 caractères")
    .max(500, "Commentaire maximum 500 caractères"),

  // Progression estimée (optional)
  progressEstimate: z.number().min(0).max(100).optional(),

  // Recommandations prochaine leçon (optional)
  recommendations: z.string().max(300).optional(),

  // Points vigilance sécurité (optional)
  safetyConcerns: z.array(z.string()).optional(),
  safetyConcernsCustom: z.string().max(200).optional(),

  // Signatures digitales (required)
  instructorSignature: DigitalSignatureSchema,
  studentSignature: DigitalSignatureSchema.optional(),
  studentAbsent: z.boolean().default(false),
});

export type LessonEvaluation = z.infer<typeof LessonEvaluationSchema>;

/**
 * Helper: Get rating label
 */
export function getRatingLabel(
  rating: GlobalRating,
  locale: "fr" | "de" | "it" | "en" = "fr"
): string {
  const labels = {
    fr: {
      "1": "Insuffisant",
      "2": "Faible",
      "3": "Moyen",
      "4": "Bien",
      "5": "Excellent",
    },
    de: {
      "1": "Ungenügend",
      "2": "Schwach",
      "3": "Mittel",
      "4": "Gut",
      "5": "Ausgezeichnet",
    },
    it: {
      "1": "Insufficiente",
      "2": "Debole",
      "3": "Medio",
      "4": "Buono",
      "5": "Eccellente",
    },
    en: {
      "1": "Insufficient",
      "2": "Weak",
      "3": "Average",
      "4": "Good",
      "5": "Excellent",
    },
  };
  return labels[locale][rating];
}

/**
 * Helper: Get rating color
 */
export function getRatingColor(rating: GlobalRating): string {
  const colors = {
    "1": "destructive",
    "2": "orange",
    "3": "yellow",
    "4": "green",
    "5": "emerald",
  };
  return colors[rating];
}

/**
 * Helper: Get progress color
 */
export function getProgressColor(progress: number): string {
  if (progress < 30) return "destructive";
  if (progress < 70) return "orange";
  return "green";
}
