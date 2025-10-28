/**
 * VIAMENTOR - Assignment Algorithm Service
 * Algorithme intelligent d'attribution élèves-moniteurs avec workload balancing
 */

import type {
  InstructorWorkload,
  AssignmentRecommendation,
  AssignmentLocale,
} from "@/polymet/data/viamentor-assignments-data";
import type { StudentCategory } from "@/polymet/data/viamentor-students-data";

// ============================================================================
// TYPES
// ============================================================================

interface StudentProfile {
  id: string;
  name: string;
  category: StudentCategory;
  preferredLanguages?: string[];
  location?: {
    lat: number;
    lng: number;
  };
}

interface ScoreBreakdown {
  baseScore: number;
  activeStudentsPenalty: number;
  weeklyHoursPenalty: number;
  availabilityBonus: number;
  ratingBonus: number;
  categoryMatchBonus: number;
  languageMatchBonus: number;
  distancePenalty: number;
  finalScore: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SCORING_WEIGHTS = {
  BASE_SCORE: 100,
  ACTIVE_STUDENTS_PENALTY: 5, // per student
  WEEKLY_HOURS_PENALTY: 2, // per hour
  AVAILABILITY_BONUS: 3, // per available hour
  RATING_BONUS: 10, // per rating point
  CATEGORY_MATCH_BONUS: 15,
  LANGUAGE_MATCH_BONUS: 10,
  DISTANCE_PENALTY: 20, // if > 20km
  MAX_CAPACITY_THRESHOLD: 0.8, // 80%
  DISTANCE_THRESHOLD_KM: 20,
} as const;

// ============================================================================
// ALGORITHM SERVICE
// ============================================================================

export class AssignmentAlgorithmService {
  /**
   * Calcule le score d'attribution pour un moniteur
   */
  static calculateScore(
    instructor: InstructorWorkload,
    student: StudentProfile
  ): ScoreBreakdown {
    let score = SCORING_WEIGHTS.BASE_SCORE;

    // Pénalité: nombre d'élèves actifs
    const activeStudentsPenalty =
      instructor.activeStudents * SCORING_WEIGHTS.ACTIVE_STUDENTS_PENALTY;
    score -= activeStudentsPenalty;

    // Pénalité: heures hebdomadaires
    const weeklyHoursPenalty =
      instructor.weeklyHours * SCORING_WEIGHTS.WEEKLY_HOURS_PENALTY;
    score -= weeklyHoursPenalty;

    // Bonus: disponibilités futures
    const availableHours = instructor.availableHours - instructor.weeklyHours;
    const availabilityBonus =
      availableHours * SCORING_WEIGHTS.AVAILABILITY_BONUS;
    score += availabilityBonus;

    // Bonus: évaluations
    const ratingBonus = instructor.rating * SCORING_WEIGHTS.RATING_BONUS;
    score += ratingBonus;

    // Bonus: catégories match
    const categoryMatchBonus = instructor.categories.includes(student.category)
      ? SCORING_WEIGHTS.CATEGORY_MATCH_BONUS
      : 0;
    score += categoryMatchBonus;

    // Bonus: langues match
    const languageMatchBonus = student.preferredLanguages?.some((lang) =>
      instructor.languages.includes(lang)
    )
      ? SCORING_WEIGHTS.LANGUAGE_MATCH_BONUS
      : 0;
    score += languageMatchBonus;

    // Pénalité: distance géographique
    let distancePenalty = 0;
    if (student.location && instructor.location) {
      const distance = this.calculateDistance(
        student.location,
        instructor.location
      );
      if (distance > SCORING_WEIGHTS.DISTANCE_THRESHOLD_KM) {
        distancePenalty = SCORING_WEIGHTS.DISTANCE_PENALTY;
        score -= distancePenalty;
      }
    }

    // Normaliser le score entre 0-100
    const finalScore = Math.max(0, Math.min(100, score));

    return {
      baseScore: SCORING_WEIGHTS.BASE_SCORE,
      activeStudentsPenalty,
      weeklyHoursPenalty,
      availabilityBonus,
      ratingBonus,
      categoryMatchBonus,
      languageMatchBonus,
      distancePenalty,
      finalScore,
    };
  }

  /**
   * Génère les recommandations d'attribution triées par score
   */
  static generateRecommendations(
    instructors: InstructorWorkload[],
    student: StudentProfile,
    locale: AssignmentLocale = "fr"
  ): AssignmentRecommendation[] {
    // Filtrer les moniteurs éligibles (catégorie compatible)
    const eligibleInstructors = instructors.filter((instructor) =>
      instructor.categories.includes(student.category)
    );

    // Calculer les scores
    const recommendations = eligibleInstructors.map((instructor) => {
      const scoreBreakdown = this.calculateScore(instructor, student);
      const reasons = this.generateReasons(
        instructor,
        student,
        scoreBreakdown,
        locale
      );
      const warnings = this.generateWarnings(instructor, locale);

      return {
        instructor,
        score: scoreBreakdown.finalScore,
        rank: 0, // sera calculé après tri
        reasons,
        warnings,
      };
    });

    // Trier par score décroissant
    recommendations.sort((a, b) => b.score - a.score);

    // Assigner les rangs
    recommendations.forEach((rec, index) => {
      rec.rank = index + 1;
    });

    return recommendations;
  }

  /**
   * Génère les raisons de la recommandation
   */
  private static generateReasons(
    instructor: InstructorWorkload,
    student: StudentProfile,
    scoreBreakdown: ScoreBreakdown,
    locale: AssignmentLocale
  ): string[] {
    const reasons: string[] = [];

    const translations = {
      fr: {
        lowWorkload: "Charge de travail faible ({count} élèves)",
        goodAvailability: "Bonne disponibilité ({hours}h disponibles)",
        highRating: "Excellentes évaluations ({rating}/5)",
        categoryMatch: "Catégorie {category} autorisée",
        languageMatch: "Langues compatibles",
        closeDistance: "Proximité géographique ({city})",
      },
      de: {
        lowWorkload: "Geringe Auslastung ({count} Schüler)",
        goodAvailability: "Gute Verfügbarkeit ({hours}h verfügbar)",
        highRating: "Ausgezeichnete Bewertungen ({rating}/5)",
        categoryMatch: "Kategorie {category} zugelassen",
        languageMatch: "Kompatible Sprachen",
        closeDistance: "Geografische Nähe ({city})",
      },
      it: {
        lowWorkload: "Carico di lavoro basso ({count} allievi)",
        goodAvailability: "Buona disponibilità ({hours}h disponibili)",
        highRating: "Ottime valutazioni ({rating}/5)",
        categoryMatch: "Categoria {category} autorizzata",
        languageMatch: "Lingue compatibili",
        closeDistance: "Prossimità geografica ({city})",
      },
      en: {
        lowWorkload: "Low workload ({count} students)",
        goodAvailability: "Good availability ({hours}h available)",
        highRating: "Excellent ratings ({rating}/5)",
        categoryMatch: "Category {category} authorized",
        languageMatch: "Compatible languages",
        closeDistance: "Geographic proximity ({city})",
      },
    };

    const t = translations[locale];

    // Charge de travail
    if (instructor.activeStudents < 10) {
      reasons.push(
        t.lowWorkload.replace("{count}", instructor.activeStudents.toString())
      );
    }

    // Disponibilité
    const availableHours = instructor.availableHours - instructor.weeklyHours;
    if (availableHours > 10) {
      reasons.push(
        t.goodAvailability.replace("{hours}", availableHours.toString())
      );
    }

    // Évaluations
    if (instructor.rating >= 4.7) {
      reasons.push(
        t.highRating.replace("{rating}", instructor.rating.toFixed(1))
      );
    }

    // Catégorie
    if (scoreBreakdown.categoryMatchBonus > 0) {
      reasons.push(t.categoryMatch.replace("{category}", student.category));
    }

    // Langues
    if (scoreBreakdown.languageMatchBonus > 0) {
      reasons.push(t.languageMatch);
    }

    // Distance
    if (scoreBreakdown.distancePenalty === 0 && instructor.location) {
      reasons.push(t.closeDistance.replace("{city}", instructor.location.city));
    }

    return reasons;
  }

  /**
   * Génère les avertissements
   */
  private static generateWarnings(
    instructor: InstructorWorkload,
    locale: AssignmentLocale
  ): string[] {
    const warnings: string[] = [];

    const translations = {
      fr: {
        nearCapacity: "Proche de la capacité maximale ({percentage}%)",
        highWorkload: "Charge de travail élevée ({hours}h/semaine)",
        limitedAvailability: "Disponibilités limitées",
      },
      de: {
        nearCapacity: "Nahe der maximalen Kapazität ({percentage}%)",
        highWorkload: "Hohe Auslastung ({hours}h/Woche)",
        limitedAvailability: "Begrenzte Verfügbarkeit",
      },
      it: {
        nearCapacity: "Vicino alla capacità massima ({percentage}%)",
        highWorkload: "Carico di lavoro elevato ({hours}h/settimana)",
        limitedAvailability: "Disponibilità limitate",
      },
      en: {
        nearCapacity: "Near maximum capacity ({percentage}%)",
        highWorkload: "High workload ({hours}h/week)",
        limitedAvailability: "Limited availability",
      },
    };

    const t = translations[locale];

    // Capacité
    const utilizationPercentage =
      (instructor.activeStudents / instructor.maxCapacity) * 100;
    if (utilizationPercentage >= SCORING_WEIGHTS.MAX_CAPACITY_THRESHOLD * 100) {
      warnings.push(
        t.nearCapacity.replace("{percentage}", utilizationPercentage.toFixed(0))
      );
    }

    // Heures hebdomadaires
    if (instructor.weeklyHours >= 35) {
      warnings.push(
        t.highWorkload.replace("{hours}", instructor.weeklyHours.toString())
      );
    }

    // Disponibilités
    const availableHours = instructor.availableHours - instructor.weeklyHours;
    if (availableHours < 5) {
      warnings.push(t.limitedAvailability);
    }

    return warnings;
  }

  /**
   * Calcule la distance entre deux points (formule Haversine)
   */
  private static calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(point2.lat - point1.lat);
    const dLon = this.toRad(point2.lng - point1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(point1.lat)) *
        Math.cos(this.toRad(point2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convertit des degrés en radians
   */
  private static toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Vérifie si un moniteur est disponible pour une nouvelle attribution
   */
  static isInstructorAvailable(instructor: InstructorWorkload): boolean {
    const utilizationPercentage =
      (instructor.activeStudents / instructor.maxCapacity) * 100;
    return utilizationPercentage < SCORING_WEIGHTS.MAX_CAPACITY_THRESHOLD * 100;
  }

  /**
   * Calcule la distribution de charge optimale
   */
  static calculateOptimalDistribution(
    instructors: InstructorWorkload[],
    totalStudents: number
  ): Map<string, number> {
    const distribution = new Map<string, number>();

    // Trier par charge croissante
    const sortedInstructors = [...instructors].sort(
      (a, b) => a.activeStudents - b.activeStudents
    );

    let remainingStudents = totalStudents;

    for (const instructor of sortedInstructors) {
      if (remainingStudents === 0) break;

      const availableCapacity =
        instructor.maxCapacity - instructor.activeStudents;
      const toAssign = Math.min(availableCapacity, remainingStudents);

      distribution.set(instructor.instructorId, toAssign);
      remainingStudents -= toAssign;
    }

    return distribution;
  }
}
