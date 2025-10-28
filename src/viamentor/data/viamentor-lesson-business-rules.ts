/**
 * VIAMENTOR - Lesson Business Rules
 * Règles métier pour gestion leçons avec conformité légale suisse
 */

import { addHours, differenceInHours, isSameDay } from "date-fns";

// ============================================================================
// TYPES
// ============================================================================

export interface Lesson {
  id: string;
  instructorId: string;
  studentId: string;
  vehicleId: string;
  category: string;
  date: Date;
  startTime: string;
  duration: number;
  startLocation: Location;
  endLocation: Location;
  status: "scheduled" | "completed" | "cancelled";
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface AvailabilityCheck {
  available: boolean;
  reason?: string;
  suggestions?: Date[];
}

// ============================================================================
// CONTRAINTES LÉGALES SUISSES
// ============================================================================

export const LEGAL_CONSTRAINTS = {
  MAX_DAILY_HOURS: 9,
  MAX_WEEKLY_HOURS: 45,
  MIN_REST_HOURS: 11,
  MIN_BREAK_AFTER_HOURS: 5.5,
  MIN_BREAK_DURATION: 30,
  BUFFER_TIME: 10,
} as const;

// ============================================================================
// BUSINESS LOGIC
// ============================================================================

export class LessonBusinessLogic {
  /**
   * Vérifier disponibilité moniteur avec toutes les règles légales
   */
  async canInstructorTeach(
    instructorId: string,
    date: Date,
    duration: number,
    category: string
  ): Promise<AvailabilityCheck> {
    const schedule = await this.getInstructorSchedule(instructorId);
    const certifications = await this.getInstructorCertifications(instructorId);
    const existingLessons = await this.getInstructorLessons(instructorId);

    // 1. Vérifier jour de travail
    if (!schedule.workingDays.includes(date.getDay())) {
      return { available: false, reason: "Moniteur ne travaille pas ce jour" };
    }

    // 2. Vérifier temps de repos (11h)
    const lastLesson = this.getLastLessonBefore(existingLessons, date);
    if (lastLesson) {
      const lastEnd = this.getLessonEndTime(lastLesson);
      const hoursBetween = differenceInHours(date, lastEnd);

      if (hoursBetween < LEGAL_CONSTRAINTS.MIN_REST_HOURS) {
        return {
          available: false,
          reason: `Repos légal non respecté (${hoursBetween}h < 11h)`,
          suggestions: [addHours(lastEnd, LEGAL_CONSTRAINTS.MIN_REST_HOURS)],
        };
      }
    }

    // 3. Vérifier heures max quotidiennes (9h)
    const todayLessons = existingLessons.filter((l) => isSameDay(l.date, date));
    const todayHours =
      todayLessons.reduce((sum, l) => sum + l.duration, 0) / 60;

    if (todayHours + duration / 60 > LEGAL_CONSTRAINTS.MAX_DAILY_HOURS) {
      return {
        available: false,
        reason: `Dépassement 9h/jour (${(todayHours + duration / 60).toFixed(1)}h)`,
      };
    }

    // 4. Vérifier heures max hebdomadaires (45h)
    const weekHours = this.getWeeklyHours(existingLessons, date);
    if (weekHours + duration / 60 > LEGAL_CONSTRAINTS.MAX_WEEKLY_HOURS) {
      return {
        available: false,
        reason: `Dépassement 45h/semaine (${(weekHours + duration / 60).toFixed(1)}h)`,
      };
    }

    // 5. Vérifier certification catégorie
    if (!certifications.categories.includes(category)) {
      return {
        available: false,
        reason: `Non certifié catégorie ${category}`,
      };
    }

    // 6. Vérifier conflits horaire
    const conflicts = this.checkScheduleConflicts(
      existingLessons,
      date,
      duration
    );
    if (conflicts.length > 0) {
      return {
        available: false,
        reason: "Conflit d'horaire",
        suggestions: this.suggestAlternativeTimes(
          existingLessons,
          date,
          duration,
          schedule
        ),
      };
    }

    return { available: true };
  }

  /**
   * Calculer temps de trajet entre leçons
   */
  calculateTravelTime(lesson1: Lesson, lesson2: Lesson): number {
    const distance = this.calculateDistance(
      lesson1.endLocation,
      lesson2.startLocation
    );
    const avgSpeed = distance > 20 ? 80 : 30; // km/h
    const baseTime = (distance / avgSpeed) * 60;
    const trafficMultiplier = this.getTrafficMultiplier(lesson1.startTime);

    return (
      Math.ceil(baseTime * trafficMultiplier) + LEGAL_CONSTRAINTS.BUFFER_TIME
    );
  }

  /**
   * Valider leçon avant création
   */
  async validateLesson(lesson: Partial<Lesson>): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!lesson.instructorId) errors.push("Moniteur requis");
    if (!lesson.studentId) errors.push("Élève requis");
    if (!lesson.vehicleId) errors.push("Véhicule requis");
    if (!lesson.date) errors.push("Date requise");
    if (!lesson.duration) errors.push("Durée requise");

    if (lesson.duration && (lesson.duration < 45 || lesson.duration > 120)) {
      errors.push("Durée doit être entre 45 et 120 minutes");
    }

    if (lesson.date && lesson.date < new Date()) {
      errors.push("Date dans le passé");
    }

    if (
      lesson.instructorId &&
      lesson.date &&
      lesson.duration &&
      lesson.category
    ) {
      const availability = await this.canInstructorTeach(
        lesson.instructorId,
        lesson.date,
        lesson.duration,
        lesson.category
      );

      if (!availability.available) {
        errors.push(availability.reason || "Moniteur non disponible");
      }
    }

    if (lesson.duration && lesson.duration > 120) {
      warnings.push("Leçon longue (>2h) - risque fatigue");
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  private async getInstructorSchedule(instructorId: string) {
    return {
      instructorId,
      workingDays: [1, 2, 3, 4, 5],
      workingHours: { start: "08:00", end: "18:00" },
      breaks: [{ start: "12:00", end: "13:00" }],
    };
  }

  private async getInstructorCertifications(instructorId: string) {
    return {
      instructorId,
      categories: ["B", "A"],
      validUntil: new Date("2025-12-31"),
    };
  }

  private async getInstructorLessons(instructorId: string): Promise<Lesson[]> {
    return [];
  }

  private getLessonEndTime(lesson: Lesson): Date {
    const end = new Date(lesson.date);
    end.setMinutes(end.getMinutes() + lesson.duration);
    return end;
  }

  private getLastLessonBefore(lessons: Lesson[], date: Date): Lesson | null {
    return (
      lessons
        .filter((l) => l.date < date)
        .sort((a, b) => b.date.getTime() - a.date.getTime())[0] || null
    );
  }

  private getWeeklyHours(lessons: Lesson[], date: Date): number {
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);

    const weekEnd = new Date(date);
    weekEnd.setDate(weekEnd.getDate() + (7 - weekEnd.getDay()));

    return (
      lessons
        .filter((l) => l.date >= weekStart && l.date <= weekEnd)
        .reduce((sum, l) => sum + l.duration, 0) / 60
    );
  }

  private checkScheduleConflicts(
    lessons: Lesson[],
    date: Date,
    duration: number
  ): Lesson[] {
    const end = new Date(date);
    end.setMinutes(end.getMinutes() + duration);

    return lessons.filter((lesson) => {
      const existingEnd = this.getLessonEndTime(lesson);
      return (
        (date >= lesson.date && date < existingEnd) ||
        (end > lesson.date && end <= existingEnd) ||
        (date <= lesson.date && end >= existingEnd)
      );
    });
  }

  private suggestAlternativeTimes(
    lessons: Lesson[],
    date: Date,
    duration: number,
    schedule: any
  ): Date[] {
    const suggestions: Date[] = [];
    const workStart = this.parseTime(schedule.workingHours.start);
    const workEnd = this.parseTime(schedule.workingHours.end);

    for (let time = workStart; time < workEnd - duration; time += 30) {
      const testDate = new Date(date);
      testDate.setHours(Math.floor(time / 60));
      testDate.setMinutes(time % 60);

      if (
        this.checkScheduleConflicts(lessons, testDate, duration).length === 0
      ) {
        suggestions.push(testDate);
        if (suggestions.length >= 3) break;
      }
    }

    return suggestions;
  }

  private parseTime(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  private calculateDistance(loc1: Location, loc2: Location): number {
    const R = 6371;
    const dLat = this.toRad(loc2.lat - loc1.lat);
    const dLon = this.toRad(loc2.lng - loc1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(loc1.lat)) *
        Math.cos(this.toRad(loc2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private getTrafficMultiplier(time: string): number {
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 7 && hour < 9) return 1.5;
    if (hour >= 17 && hour < 19) return 1.6;
    if (hour >= 11 && hour < 13) return 1.2;
    return 1.0;
  }
}

export const lessonBusinessLogic = new LessonBusinessLogic();

export async function validateLessonCreation(lesson: Partial<Lesson>) {
  return lessonBusinessLogic.validateLesson(lesson);
}

export async function checkInstructorAvailability(
  instructorId: string,
  date: Date,
  duration: number,
  category: string
) {
  return lessonBusinessLogic.canInstructorTeach(
    instructorId,
    date,
    duration,
    category
  );
}
