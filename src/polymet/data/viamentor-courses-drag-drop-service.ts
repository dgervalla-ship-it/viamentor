/**
 * VIAMENTOR - Courses Drag & Drop Service
 * Service logique métier drag & drop cours théoriques
 * Validation, génération séries, détection conflits
 */

import {
  CalendarEvent,
  CalendarInstructor,
} from "@/polymet/data/viamentor-courses-calendar-data";
import { CourseType } from "@/polymet/data/viamentor-courses-types-data";

// ============================================================================
// TYPES
// ============================================================================

export interface DragDropSession {
  type: CourseType;
  startDate: Date;
  startTime: string;
  locationId: string;
  instructorId: string;
  maxParticipants: number;
  notes?: string;
}

export interface GeneratedSession {
  sessionNumber: number;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  conflicts: SessionConflict[];
}

export interface SessionConflict {
  type: "instructor_busy" | "room_unavailable" | "capacity_exceeded";
  message: string;
  severity: "warning" | "error";
}

export interface DragDropValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// DRAG & DROP SERVICE
// ============================================================================

export class CoursesDragDropService {
  /**
   * Valider drop sur date
   */
  static validateDrop(
    type: CourseType,
    date: Date,
    existingEvents: CalendarEvent[]
  ): DragDropValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Vérifier date passée
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      errors.push("Impossible de créer un cours dans le passé");
    }

    // Vérifier jour de la semaine compatible
    const dayOfWeek = date.getDay();
    const dayNames = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];

    const requiredDays = type.schedule.daysOfWeek;

    if (!requiredDays.includes(dayOfWeek)) {
      warnings.push(
        `Ce type de cours se déroule normalement le ${requiredDays.map((d) => dayNames[d]).join(", ")}`
      );
    }

    // Vérifier conflits potentiels
    const sameDay = existingEvents.filter(
      (e) => e.date.toDateString() === date.toDateString()
    );
    if (sameDay.length > 0) {
      warnings.push(`${sameDay.length} cours déjà planifié(s) ce jour`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Générer séances automatiquement
   */
  static generateSessions(
    session: DragDropSession,
    instructors: CalendarInstructor[],
    existingEvents: CalendarEvent[]
  ): GeneratedSession[] {
    const sessions: GeneratedSession[] = [];
    const {
      type,
      startDate,
      startTime,
      locationId,
      instructorId,
      maxParticipants,
    } = session;

    const instructor = instructors.find((i) => i.id === instructorId);
    if (!instructor) return sessions;

    // Calculer dates selon pattern
    const dates = this.calculateSessionDates(
      startDate,
      type.schedule.daysOfWeek,
      type.schedule.sessionsCount
    );

    // Calculer heure fin
    const endTime = this.calculateEndTime(startTime, type.schedule.duration);

    // Générer chaque séance
    dates.forEach((date, index) => {
      const conflicts = this.detectConflicts(
        date,
        startTime,
        endTime,
        instructorId,
        locationId,
        maxParticipants,
        existingEvents
      );

      sessions.push({
        sessionNumber: index + 1,
        date,
        startTime,
        endTime,
        location: locationId,
        instructor: instructor.name,
        conflicts,
      });
    });

    return sessions;
  }

  /**
   * Calculer dates séances
   */
  private static calculateSessionDates(
    startDate: Date,
    daysOfWeek: number[],
    sessionsCount: number
  ): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    let sessionsAdded = 0;

    // Limiter à 100 itérations pour éviter boucle infinie
    let iterations = 0;
    const maxIterations = 365;

    while (sessionsAdded < sessionsCount && iterations < maxIterations) {
      const dayOfWeek = currentDate.getDay();

      if (daysOfWeek.includes(dayOfWeek)) {
        dates.push(new Date(currentDate));
        sessionsAdded++;
      }

      // Jour suivant
      currentDate.setDate(currentDate.getDate() + 1);
      iterations++;
    }

    return dates;
  }

  /**
   * Calculer heure fin
   */
  private static calculateEndTime(
    startTime: string,
    durationMinutes: number
  ): string {
    const [hours, minutes] = startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationMinutes;

    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;

    return `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}`;
  }

  /**
   * Détecter conflits
   */
  private static detectConflicts(
    date: Date,
    startTime: string,
    endTime: string,
    instructorId: string,
    locationId: string,
    maxParticipants: number,
    existingEvents: CalendarEvent[]
  ): SessionConflict[] {
    const conflicts: SessionConflict[] = [];

    // Événements même jour
    const sameDayEvents = existingEvents.filter(
      (e) => e.date.toDateString() === date.toDateString()
    );

    // Conflit moniteur
    const instructorConflict = sameDayEvents.find(
      (e) =>
        e.instructorId === instructorId &&
        this.timesOverlap(startTime, endTime, e.startTime, e.endTime)
    );

    if (instructorConflict) {
      conflicts.push({
        type: "instructor_busy",
        message: "Moniteur déjà occupé à cette heure",
        severity: "error",
      });
    }

    // Conflit salle
    const roomConflict = sameDayEvents.find(
      (e) =>
        e.location === locationId &&
        this.timesOverlap(startTime, endTime, e.startTime, e.endTime)
    );

    if (roomConflict) {
      conflicts.push({
        type: "room_unavailable",
        message: "Salle déjà réservée à cette heure",
        severity: "error",
      });
    }

    // Capacité
    if (maxParticipants > 20) {
      conflicts.push({
        type: "capacity_exceeded",
        message: "Capacité élevée, vérifier disponibilité salle",
        severity: "warning",
      });
    }

    return conflicts;
  }

  /**
   * Vérifier chevauchement horaires
   */
  private static timesOverlap(
    start1: string,
    end1: string,
    start2: string,
    end2: string
  ): boolean {
    const toMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const s1 = toMinutes(start1);
    const e1 = toMinutes(end1);
    const s2 = toMinutes(start2);
    const e2 = toMinutes(end2);

    return s1 < e2 && s2 < e1;
  }

  /**
   * Créer événements calendrier
   */
  static createCalendarEvents(
    sessions: GeneratedSession[],
    session: DragDropSession
  ): Partial<CalendarEvent>[] {
    return sessions.map((s) => ({
      title: session.type.name,
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
      categoryId: session.type.categoryId,
      location: session.locationId,
      instructorId: session.instructorId,
      capacity: session.maxParticipants,
      enrolled: 0,
      description: session.notes || "",
    }));
  }
}
