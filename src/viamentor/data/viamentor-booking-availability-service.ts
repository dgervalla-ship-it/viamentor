/**
 * VIAMENTOR - Booking Availability Service
 * Service API simulation pour vérification disponibilités temps réel
 */

import type {
  AvailabilityCheckRequest,
  AvailabilityCheckResponse,
  TimeSlot,
  Conflict,
  CreateLessonRequest,
  CreateLessonResponse,
} from "@/viamentor/data/viamentor-booking-schemas";

// ============================================================================
// MOCK DATA - EXISTING BOOKINGS
// ============================================================================

interface ExistingBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  instructorId: string;
  vehicleId: string;
  studentId: string;
}

const mockExistingBookings: ExistingBooking[] = [
  {
    id: "lesson-1",
    date: "2025-10-15",
    startTime: "09:00",
    endTime: "10:30",
    instructorId: "instructor-1",
    vehicleId: "vehicle-1",
    studentId: "student-1",
  },
  {
    id: "lesson-2",
    date: "2025-10-15",
    startTime: "14:00",
    endTime: "15:30",
    instructorId: "instructor-1",
    vehicleId: "vehicle-2",
    studentId: "student-2",
  },
  {
    id: "lesson-3",
    date: "2025-10-15",
    startTime: "11:00",
    endTime: "12:30",
    instructorId: "instructor-2",
    vehicleId: "vehicle-1",
    studentId: "student-3",
  },
];

// ============================================================================
// TIME UTILITIES
// ============================================================================

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const hasTimeConflict = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const start1Min = timeToMinutes(start1);
  const end1Min = timeToMinutes(end1);
  const start2Min = timeToMinutes(start2);
  const end2Min = timeToMinutes(end2);

  return start1Min < end2Min && end1Min > start2Min;
};

// ============================================================================
// AVAILABILITY CHECK
// ============================================================================

export const checkAvailability = async (
  request: AvailabilityCheckRequest
): Promise<AvailabilityCheckResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { date, instructorId, vehicleId, duration, excludeLessonId } = request;

  // Get existing bookings for the date
  const dayBookings = mockExistingBookings.filter(
    (booking) => booking.date === date && booking.id !== excludeLessonId
  );

  // Find conflicts
  const conflicts: Conflict[] = [];

  dayBookings.forEach((booking) => {
    if (booking.instructorId === instructorId) {
      conflicts.push({
        type: "instructor",
        startTime: booking.startTime,
        endTime: booking.endTime,
        reason: "Moniteur occupé",
      });
    }
    if (booking.vehicleId === vehicleId) {
      conflicts.push({
        type: "vehicle",
        startTime: booking.startTime,
        endTime: booking.endTime,
        reason: "Véhicule réservé",
      });
    }
  });

  // Generate time slots (8:00 - 18:00, 15min intervals)
  const slots: TimeSlot[] = [];
  const startHour = 8;
  const endHour = 18;
  const intervalMinutes = 15;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const startMinutes = hour * 60 + minute;
      const endMinutes = startMinutes + duration;
      const startTime = minutesToTime(startMinutes);
      const endTime = minutesToTime(endMinutes);

      // Check if slot is within working hours
      if (endMinutes > endHour * 60) {
        break;
      }

      // Check for conflicts
      let available = true;
      let reason: string | undefined;

      for (const conflict of conflicts) {
        if (
          hasTimeConflict(
            startTime,
            endTime,
            conflict.startTime,
            conflict.endTime
          )
        ) {
          available = false;
          reason = conflict.reason;
          break;
        }
      }

      slots.push({
        startTime,
        endTime,
        available,
        reason,
      });
    }
  }

  return {
    available: slots.some((slot) => slot.available),
    slots,
    conflicts,
  };
};

// ============================================================================
// CREATE LESSON
// ============================================================================

export const createLesson = async (
  request: CreateLessonRequest
): Promise<CreateLessonResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Validate availability one more time
  const endTime = minutesToTime(
    timeToMinutes(request.startTime) + request.duration
  );

  const conflicts = mockExistingBookings.filter(
    (booking) =>
      booking.date === request.date &&
      (booking.instructorId === request.instructorId ||
        booking.vehicleId === request.vehicleId) &&
      hasTimeConflict(
        request.startTime,
        endTime,
        booking.startTime,
        booking.endTime
      )
  );

  if (conflicts.length > 0) {
    return {
      success: false,
      lessonId: "",
      message:
        "Créneau plus disponible. Veuillez sélectionner un autre horaire.",
    };
  }

  // Create lesson
  const lessonId = `lesson-${Date.now()}`;

  // Add to mock bookings
  mockExistingBookings.push({
    id: lessonId,
    date: request.date,
    startTime: request.startTime,
    endTime,
    instructorId: request.instructorId,
    vehicleId: request.vehicleId,
    studentId: request.studentId,
  });

  // Simulate calendar event creation
  let calendarEventId: string | undefined;
  if (request.addToGoogleCalendar) {
    calendarEventId = `cal-event-${Date.now()}`;
  }

  return {
    success: true,
    lessonId,
    message: "Leçon créée avec succès",
    calendarEventId,
  };
};

// ============================================================================
// GET ALTERNATIVE SLOTS
// ============================================================================

export const getAlternativeSlots = async (
  date: string,
  instructorId: string,
  vehicleId: string,
  duration: number,
  preferredTime: string,
  count: number = 3
): Promise<TimeSlot[]> => {
  const availability = await checkAvailability({
    date,
    instructorId,
    vehicleId,
    duration,
  });

  const availableSlots = availability.slots.filter((slot) => slot.available);

  // Sort by proximity to preferred time
  const preferredMinutes = timeToMinutes(preferredTime);
  availableSlots.sort((a, b) => {
    const aDiff = Math.abs(timeToMinutes(a.startTime) - preferredMinutes);
    const bDiff = Math.abs(timeToMinutes(b.startTime) - preferredMinutes);
    return aDiff - bDiff;
  });

  return availableSlots.slice(0, count);
};

// ============================================================================
// INSTRUCTOR AVAILABILITY STATUS (WebSocket simulation)
// ============================================================================

export type InstructorAvailabilityStatus = "available" | "busy" | "absent";

export interface InstructorAvailability {
  instructorId: string;
  status: InstructorAvailabilityStatus;
  currentLesson?: {
    studentName: string;
    endTime: string;
  };
  lessonsToday: number;
}

const mockInstructorAvailability: Record<string, InstructorAvailability> = {
  "instructor-1": {
    instructorId: "instructor-1",
    status: "available",
    lessonsToday: 3,
  },
  "instructor-2": {
    instructorId: "instructor-2",
    status: "busy",
    currentLesson: {
      studentName: "Sophie Martin",
      endTime: "15:30",
    },
    lessonsToday: 5,
  },
  "instructor-3": {
    instructorId: "instructor-3",
    status: "absent",
    lessonsToday: 0,
  },
};

export const getInstructorAvailability = async (
  instructorId: string
): Promise<InstructorAvailability> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return (
    mockInstructorAvailability[instructorId] || {
      instructorId,
      status: "available",
      lessonsToday: 0,
    }
  );
};

export const subscribeToInstructorAvailability = (
  instructorId: string,
  callback: (availability: InstructorAvailability) => void
): (() => void) => {
  // Simulate WebSocket subscription
  const interval = setInterval(() => {
    const availability = mockInstructorAvailability[instructorId];
    if (availability) {
      callback(availability);
    }
  }, 5000);

  return () => clearInterval(interval);
};

// ============================================================================
// VEHICLE AVAILABILITY STATUS
// ============================================================================

export type VehicleAvailabilityStatus = "available" | "in_use" | "maintenance";

export interface VehicleAvailability {
  vehicleId: string;
  status: VehicleAvailabilityStatus;
  availableFrom?: string;
}

const mockVehicleAvailability: Record<string, VehicleAvailability> = {
  "vehicle-1": {
    vehicleId: "vehicle-1",
    status: "available",
  },
  "vehicle-2": {
    vehicleId: "vehicle-2",
    status: "in_use",
    availableFrom: "16:00",
  },
  "vehicle-3": {
    vehicleId: "vehicle-3",
    status: "maintenance",
  },
};

export const getVehicleAvailability = async (
  vehicleId: string
): Promise<VehicleAvailability> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return (
    mockVehicleAvailability[vehicleId] || {
      vehicleId,
      status: "available",
    }
  );
};
