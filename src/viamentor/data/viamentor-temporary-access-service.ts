/**
 * VIAMENTOR - Temporary Access Service
 * Service API pour gestion CRUD accès temporaires avec validation business rules
 */

import type {
  TemporaryAccess,
  TemporaryAccessStatus,
  StudentCategory,
  AssignmentLocale,
} from "@/viamentor/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

export interface CreateTemporaryAccessInput {
  studentId: string;
  primaryInstructorId: string;
  temporaryInstructorId: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  maxLessons: number;
  authorizedCategories: StudentCategory[];
  reason: string;
  allowDirectBooking: boolean;
  notifyPrimaryInstructor: boolean;
  notifyTemporaryInstructor: boolean;
  notifyStudent: boolean;
  createdBy: string;
}

export interface ExtendTemporaryAccessInput {
  accessId: string;
  newEndDate: string; // ISO date
  additionalLessons?: number;
  reason: string;
  extendedBy: string;
}

export interface RevokeTemporaryAccessInput {
  accessId: string;
  reason: string;
  revokedBy: string;
}

export interface TemporaryAccessFilters {
  studentId?: string;
  primaryInstructorId?: string;
  temporaryInstructorId?: string;
  status?: TemporaryAccessStatus;
  startDateFrom?: string;
  startDateTo?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// BUSINESS RULES VALIDATION
// ============================================================================

export class TemporaryAccessValidator {
  /**
   * Valider les dates
   */
  static validateDates(
    startDate: string,
    endDate: string,
    locale: AssignmentLocale = "fr"
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    // Date de début ne peut pas être dans le passé (sauf aujourd'hui)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      errors.push(
        locale === "fr"
          ? "La date de début ne peut pas être dans le passé"
          : locale === "de"
            ? "Das Startdatum darf nicht in der Vergangenheit liegen"
            : locale === "it"
              ? "La data di inizio non può essere nel passato"
              : "Start date cannot be in the past"
      );
    }

    // Date de fin doit être après date de début
    if (end <= start) {
      errors.push(
        locale === "fr"
          ? "La date de fin doit être après la date de début"
          : locale === "de"
            ? "Das Enddatum muss nach dem Startdatum liegen"
            : locale === "it"
              ? "La data di fine deve essere dopo la data di inizio"
              : "End date must be after start date"
      );
    }

    // Durée maximale recommandée: 30 jours
    const durationDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (durationDays > 30) {
      warnings.push(
        locale === "fr"
          ? `Durée de ${durationDays} jours supérieure à la recommandation (30 jours max)`
          : locale === "de"
            ? `Dauer von ${durationDays} Tagen überschreitet Empfehlung (max 30 Tage)`
            : locale === "it"
              ? `Durata di ${durationDays} giorni superiore alla raccomandazione (max 30 giorni)`
              : `Duration of ${durationDays} days exceeds recommendation (30 days max)`
      );
    }

    // Durée minimale: 1 jour
    if (durationDays < 1) {
      errors.push(
        locale === "fr"
          ? "La durée minimale est de 1 jour"
          : locale === "de"
            ? "Die Mindestdauer beträgt 1 Tag"
            : locale === "it"
              ? "La durata minima è di 1 giorno"
              : "Minimum duration is 1 day"
      );
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valider le nombre de leçons
   */
  static validateMaxLessons(
    maxLessons: number,
    durationDays: number,
    locale: AssignmentLocale = "fr"
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Minimum 1 leçon
    if (maxLessons < 1) {
      errors.push(
        locale === "fr"
          ? "Le nombre minimum de leçons est 1"
          : locale === "de"
            ? "Die Mindestanzahl der Lektionen beträgt 1"
            : locale === "it"
              ? "Il numero minimo di lezioni è 1"
              : "Minimum number of lessons is 1"
      );
    }

    // Maximum 20 leçons
    if (maxLessons > 20) {
      errors.push(
        locale === "fr"
          ? "Le nombre maximum de leçons est 20"
          : locale === "de"
            ? "Die Höchstanzahl der Lektionen beträgt 20"
            : locale === "it"
              ? "Il numero massimo di lezioni è 20"
              : "Maximum number of lessons is 20"
      );
    }

    // Ratio leçons/jours trop élevé
    const ratio = maxLessons / durationDays;
    if (ratio > 1) {
      warnings.push(
        locale === "fr"
          ? `Ratio élevé: ${maxLessons} leçons pour ${durationDays} jours (>1 leçon/jour)`
          : locale === "de"
            ? `Hohes Verhältnis: ${maxLessons} Lektionen für ${durationDays} Tage (>1 Lektion/Tag)`
            : locale === "it"
              ? `Rapporto elevato: ${maxLessons} lezioni per ${durationDays} giorni (>1 lezione/giorno)`
              : `High ratio: ${maxLessons} lessons for ${durationDays} days (>1 lesson/day)`
      );
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valider les catégories
   */
  static validateCategories(
    authorizedCategories: StudentCategory[],
    studentCategories: StudentCategory[],
    instructorCategories: StudentCategory[],
    locale: AssignmentLocale = "fr"
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Au moins une catégorie
    if (authorizedCategories.length === 0) {
      errors.push(
        locale === "fr"
          ? "Au moins une catégorie doit être autorisée"
          : locale === "de"
            ? "Mindestens eine Kategorie muss autorisiert sein"
            : locale === "it"
              ? "Almeno una categoria deve essere autorizzata"
              : "At least one category must be authorized"
      );
    }

    // Vérifier que les catégories sont valides pour l'élève
    const invalidStudentCategories = authorizedCategories.filter(
      (cat) => !studentCategories.includes(cat)
    );
    if (invalidStudentCategories.length > 0) {
      errors.push(
        locale === "fr"
          ? `Catégories non valides pour l'élève: ${invalidStudentCategories.join(", ")}`
          : locale === "de"
            ? `Ungültige Kategorien für den Schüler: ${invalidStudentCategories.join(", ")}`
            : locale === "it"
              ? `Categorie non valide per l'allievo: ${invalidStudentCategories.join(", ")}`
              : `Invalid categories for student: ${invalidStudentCategories.join(", ")}`
      );
    }

    // Vérifier que le moniteur temporaire a les catégories
    const missingInstructorCategories = authorizedCategories.filter(
      (cat) => !instructorCategories.includes(cat)
    );
    if (missingInstructorCategories.length > 0) {
      errors.push(
        locale === "fr"
          ? `Le moniteur temporaire n'a pas les catégories: ${missingInstructorCategories.join(", ")}`
          : locale === "de"
            ? `Der vorübergehende Fahrlehrer hat nicht die Kategorien: ${missingInstructorCategories.join(", ")}`
            : locale === "it"
              ? `L'istruttore temporaneo non ha le categorie: ${missingInstructorCategories.join(", ")}`
              : `Temporary instructor doesn't have categories: ${missingInstructorCategories.join(", ")}`
      );
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valider la raison
   */
  static validateReason(
    reason: string,
    locale: AssignmentLocale = "fr"
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Minimum 20 caractères
    if (reason.trim().length < 20) {
      errors.push(
        locale === "fr"
          ? "La raison doit contenir au moins 20 caractères"
          : locale === "de"
            ? "Der Grund muss mindestens 20 Zeichen enthalten"
            : locale === "it"
              ? "Il motivo deve contenere almeno 20 caratteri"
              : "Reason must contain at least 20 characters"
      );
    }

    // Maximum 200 caractères
    if (reason.trim().length > 200) {
      errors.push(
        locale === "fr"
          ? "La raison ne peut pas dépasser 200 caractères"
          : locale === "de"
            ? "Der Grund darf 200 Zeichen nicht überschreiten"
            : locale === "it"
              ? "Il motivo non può superare 200 caratteri"
              : "Reason cannot exceed 200 characters"
      );
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Valider création complète
   */
  static validateCreate(
    input: CreateTemporaryAccessInput,
    studentCategories: StudentCategory[],
    instructorCategories: StudentCategory[],
    locale: AssignmentLocale = "fr"
  ): ValidationResult {
    const allErrors: string[] = [];
    const allWarnings: string[] = [];

    // Valider dates
    const datesValidation = this.validateDates(
      input.startDate,
      input.endDate,
      locale
    );
    allErrors.push(...datesValidation.errors);
    allWarnings.push(...datesValidation.warnings);

    // Calculer durée
    const start = new Date(input.startDate);
    const end = new Date(input.endDate);
    const durationDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Valider leçons
    const lessonsValidation = this.validateMaxLessons(
      input.maxLessons,
      durationDays,
      locale
    );
    allErrors.push(...lessonsValidation.errors);
    allWarnings.push(...lessonsValidation.warnings);

    // Valider catégories
    const categoriesValidation = this.validateCategories(
      input.authorizedCategories,
      studentCategories,
      instructorCategories,
      locale
    );
    allErrors.push(...categoriesValidation.errors);
    allWarnings.push(...categoriesValidation.warnings);

    // Valider raison
    const reasonValidation = this.validateReason(input.reason, locale);
    allErrors.push(...reasonValidation.errors);
    allWarnings.push(...reasonValidation.warnings);

    return {
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings,
    };
  }
}

// ============================================================================
// SERVICE API
// ============================================================================

export class TemporaryAccessService {
  /**
   * Créer un accès temporaire
   */
  static async create(
    input: CreateTemporaryAccessInput
  ): Promise<TemporaryAccess> {
    // TODO: Implémenter appel API réel
    console.log("Creating temporary access:", input);

    // Mock response
    const newAccess: TemporaryAccess = {
      id: `temp-${Date.now()}`,
      studentId: input.studentId,
      studentName: "Mock Student",
      primaryInstructorId: input.primaryInstructorId,
      primaryInstructorName: "Mock Primary Instructor",
      temporaryInstructorId: input.temporaryInstructorId,
      temporaryInstructorName: "Mock Temporary Instructor",
      startDate: input.startDate,
      endDate: input.endDate,
      maxLessons: input.maxLessons,
      completedLessons: 0,
      authorizedCategories: input.authorizedCategories,
      reason: input.reason,
      allowDirectBooking: input.allowDirectBooking,
      status: "Active",
      createdAt: new Date().toISOString(),
      createdBy: input.createdBy,
    };

    return newAccess;
  }

  /**
   * Prolonger un accès temporaire
   */
  static async extend(
    input: ExtendTemporaryAccessInput
  ): Promise<TemporaryAccess> {
    // TODO: Implémenter appel API réel
    console.log("Extending temporary access:", input);

    // Mock response
    throw new Error("Not implemented");
  }

  /**
   * Révoquer un accès temporaire
   */
  static async revoke(
    input: RevokeTemporaryAccessInput
  ): Promise<TemporaryAccess> {
    // TODO: Implémenter appel API réel
    console.log("Revoking temporary access:", input);

    // Mock response
    throw new Error("Not implemented");
  }

  /**
   * Lister les accès temporaires
   */
  static async list(
    filters?: TemporaryAccessFilters
  ): Promise<TemporaryAccess[]> {
    // TODO: Implémenter appel API réel
    console.log("Listing temporary access:", filters);

    // Mock response
    return [];
  }

  /**
   * Obtenir un accès temporaire par ID
   */
  static async getById(accessId: string): Promise<TemporaryAccess | null> {
    // TODO: Implémenter appel API réel
    console.log("Getting temporary access by ID:", accessId);

    // Mock response
    return null;
  }

  /**
   * Vérifier si un accès temporaire est expiré
   */
  static isExpired(access: TemporaryAccess): boolean {
    const now = new Date();
    const endDate = new Date(access.endDate);
    return now > endDate;
  }

  /**
   * Vérifier si un accès temporaire a atteint le max de leçons
   */
  static hasReachedMaxLessons(access: TemporaryAccess): boolean {
    return access.completedLessons >= access.maxLessons;
  }

  /**
   * Calculer les jours restants
   */
  static getDaysRemaining(access: TemporaryAccess): number {
    const now = new Date();
    const endDate = new Date(access.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Calculer le statut actuel
   */
  static getCurrentStatus(access: TemporaryAccess): TemporaryAccessStatus {
    if (access.status === "Revoked") {
      return "Revoked";
    }

    if (this.isExpired(access) || this.hasReachedMaxLessons(access)) {
      return "Expired";
    }

    return "Active";
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TemporaryAccessService;
