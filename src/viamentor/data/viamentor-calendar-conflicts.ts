/**
 * VIAMENTOR Calendar Conflicts Utility
 *
 * Service de détection et validation des conflits pour planning cours collectifs
 * avec vérification disponibilités salles, moniteurs, capacités
 */

import { format, parse, isWithinInterval, addMinutes } from "date-fns";

/**
 * Types
 */
export interface TimeSlot {
  date: Date;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export interface GroupLesson {
  id: string;
  typeId: string;
  date: Date;
  startTime: string;
  duration: number; // minutes
  roomId?: string;
  instructorId?: string;
  participants: string[];
  maxCapacity: number;
  status: "draft" | "confirmed" | "cancelled" | "completed";
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  available: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  available: boolean;
}

export interface ConflictResult {
  hasConflict: boolean;
  conflicts: Conflict[];
  suggestions?: string[];
}

export interface Conflict {
  type: "room" | "instructor" | "capacity" | "overlap";
  severity: "error" | "warning";
  message: string;
  details?: any;
}

/**
 * Calculate end time from start time and duration
 */
export function calculateEndTime(startTime: string, duration: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  const endDate = addMinutes(date, duration);
  return format(endDate, "HH:mm");
}

/**
 * Check if two time slots overlap
 */
export function timeSlotsOverlap(slot1: TimeSlot, slot2: TimeSlot): boolean {
  // Check if same date
  if (format(slot1.date, "yyyy-MM-dd") !== format(slot2.date, "yyyy-MM-dd")) {
    return false;
  }

  const start1 = parse(slot1.startTime, "HH:mm", slot1.date);
  const end1 = parse(slot1.endTime, "HH:mm", slot1.date);
  const start2 = parse(slot2.startTime, "HH:mm", slot2.date);
  const end2 = parse(slot2.endTime, "HH:mm", slot2.date);

  return (start1 < end2 && end1 > start2) || (start2 < end1 && end2 > start1);
}

/**
 * Check room availability for a time slot
 */
export function checkRoomAvailability(
  roomId: string,
  slot: TimeSlot,
  existingLessons: GroupLesson[],
  rooms: Room[]
): ConflictResult {
  const conflicts: Conflict[] = [];
  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    conflicts.push({
      type: "room",
      severity: "error",
      message: "Salle introuvable",
    });
    return { hasConflict: true, conflicts };
  }

  if (!room.available) {
    conflicts.push({
      type: "room",
      severity: "error",
      message: `Salle ${room.name} non disponible`,
    });
  }

  // Check for overlapping lessons in the same room
  const overlappingLessons = existingLessons.filter((lesson) => {
    if (lesson.roomId !== roomId) return false;
    if (lesson.status === "cancelled") return false;

    const lessonSlot: TimeSlot = {
      date: lesson.date,
      startTime: lesson.startTime,
      endTime: calculateEndTime(lesson.startTime, lesson.duration),
    };

    return timeSlotsOverlap(slot, lessonSlot);
  });

  if (overlappingLessons.length > 0) {
    overlappingLessons.forEach((lesson) => {
      conflicts.push({
        type: "room",
        severity: "error",
        message: `Salle ${room.name} occupée ${lesson.startTime}-${calculateEndTime(
          lesson.startTime,
          lesson.duration
        )}`,
        details: lesson,
      });
    });
  }

  return {
    hasConflict: conflicts.length > 0,
    conflicts,
  };
}

/**
 * Check instructor availability for a time slot
 */
export function checkInstructorAvailability(
  instructorId: string,
  slot: TimeSlot,
  existingLessons: GroupLesson[],
  instructors: Instructor[]
): ConflictResult {
  const conflicts: Conflict[] = [];
  const instructor = instructors.find((i) => i.id === instructorId);

  if (!instructor) {
    conflicts.push({
      type: "instructor",
      severity: "error",
      message: "Moniteur introuvable",
    });
    return { hasConflict: true, conflicts };
  }

  if (!instructor.available) {
    conflicts.push({
      type: "instructor",
      severity: "error",
      message: `${instructor.name} non disponible`,
    });
  }

  // Check for overlapping lessons with the same instructor
  const overlappingLessons = existingLessons.filter((lesson) => {
    if (lesson.instructorId !== instructorId) return false;
    if (lesson.status === "cancelled") return false;

    const lessonSlot: TimeSlot = {
      date: lesson.date,
      startTime: lesson.startTime,
      endTime: calculateEndTime(lesson.startTime, lesson.duration),
    };

    return timeSlotsOverlap(slot, lessonSlot);
  });

  if (overlappingLessons.length > 0) {
    overlappingLessons.forEach((lesson) => {
      conflicts.push({
        type: "instructor",
        severity: "error",
        message: `${instructor.name} occupé ${lesson.startTime}-${calculateEndTime(
          lesson.startTime,
          lesson.duration
        )}`,
        details: lesson,
      });
    });
  }

  return {
    hasConflict: conflicts.length > 0,
    conflicts,
  };
}

/**
 * Check capacity constraints
 */
export function checkCapacityConstraints(
  participants: string[],
  maxCapacity: number,
  roomCapacity?: number
): ConflictResult {
  const conflicts: Conflict[] = [];

  if (participants.length > maxCapacity) {
    conflicts.push({
      type: "capacity",
      severity: "error",
      message: `Capacité maximale dépassée (${participants.length}/${maxCapacity})`,
    });
  }

  if (roomCapacity && participants.length > roomCapacity) {
    conflicts.push({
      type: "capacity",
      severity: "error",
      message: `Capacité salle dépassée (${participants.length}/${roomCapacity})`,
    });
  }

  // Warning if near capacity
  if (participants.length >= maxCapacity * 0.9) {
    conflicts.push({
      type: "capacity",
      severity: "warning",
      message: `Presque complet (${participants.length}/${maxCapacity})`,
    });
  }

  return {
    hasConflict: conflicts.some((c) => c.severity === "error"),
    conflicts,
  };
}

/**
 * Comprehensive conflict validation
 */
export function validateLessonSlot(
  slot: TimeSlot,
  duration: number,
  roomId: string | undefined,
  instructorId: string | undefined,
  participants: string[],
  maxCapacity: number,
  existingLessons: GroupLesson[],
  rooms: Room[],
  instructors: Instructor[]
): ConflictResult {
  const allConflicts: Conflict[] = [];
  const suggestions: string[] = [];

  const slotWithEnd: TimeSlot = {
    ...slot,
    endTime: calculateEndTime(slot.startTime, duration),
  };

  // Check room availability
  if (roomId) {
    const roomResult = checkRoomAvailability(
      roomId,
      slotWithEnd,
      existingLessons,
      rooms
    );
    allConflicts.push(...roomResult.conflicts);

    if (roomResult.hasConflict) {
      // Suggest alternative rooms
      const availableRooms = rooms.filter((room) => {
        if (!room.available) return false;
        const result = checkRoomAvailability(
          room.id,
          slotWithEnd,
          existingLessons,
          rooms
        );
        return !result.hasConflict;
      });

      if (availableRooms.length > 0) {
        suggestions.push(
          `Salles disponibles: ${availableRooms.map((r) => r.name).join(", ")}`
        );
      }
    }
  }

  // Check instructor availability
  if (instructorId) {
    const instructorResult = checkInstructorAvailability(
      instructorId,
      slotWithEnd,
      existingLessons,
      instructors
    );
    allConflicts.push(...instructorResult.conflicts);

    if (instructorResult.hasConflict) {
      // Suggest alternative instructors
      const availableInstructors = instructors.filter((instructor) => {
        if (!instructor.available) return false;
        const result = checkInstructorAvailability(
          instructor.id,
          slotWithEnd,
          existingLessons,
          instructors
        );
        return !result.hasConflict;
      });

      if (availableInstructors.length > 0) {
        suggestions.push(
          `Moniteurs disponibles: ${availableInstructors.map((i) => i.name).join(", ")}`
        );
      }
    }
  }

  // Check capacity
  const room = roomId ? rooms.find((r) => r.id === roomId) : undefined;
  const capacityResult = checkCapacityConstraints(
    participants,
    maxCapacity,
    room?.capacity
  );
  allConflicts.push(...capacityResult.conflicts);

  return {
    hasConflict: allConflicts.some((c) => c.severity === "error"),
    conflicts: allConflicts,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
}

/**
 * Find optimal room for a lesson
 */
export function findOptimalRoom(
  slot: TimeSlot,
  duration: number,
  requiredCapacity: number,
  existingLessons: GroupLesson[],
  rooms: Room[]
): Room | null {
  const slotWithEnd: TimeSlot = {
    ...slot,
    endTime: calculateEndTime(slot.startTime, duration),
  };

  // Filter available rooms with sufficient capacity
  const suitableRooms = rooms.filter((room) => {
    if (!room.available) return false;
    if (room.capacity < requiredCapacity) return false;

    const result = checkRoomAvailability(
      room.id,
      slotWithEnd,
      existingLessons,
      rooms
    );
    return !result.hasConflict;
  });

  if (suitableRooms.length === 0) return null;

  // Sort by capacity (prefer smallest suitable room)
  suitableRooms.sort((a, b) => a.capacity - b.capacity);

  return suitableRooms[0];
}
