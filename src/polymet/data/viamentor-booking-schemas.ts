import { z } from "zod";

/**
 * VIAMENTOR - Booking Schemas
 * Schémas validation Zod pour wizard réservation leçon
 */

// ============================================================================
// STEP 1 - STUDENT SELECTION
// ============================================================================

export const selectStudentSchema = z.object({
  studentId: z.string().min(1, "Élève requis"),
  categoryId: z.string().min(1, "Catégorie requise"),
  lessonsBalance: z.number().min(1, "Solde leçons insuffisant"),
  assignedInstructorId: z.string().optional(),
});

export type SelectStudentData = z.infer<typeof selectStudentSchema>;

// ============================================================================
// STEP 2 - INSTRUCTOR & VEHICLE SELECTION
// ============================================================================

export const selectInstructorVehicleSchema = z.object({
  instructorId: z.string().min(1, "Moniteur requis"),
  vehicleId: z.string().min(1, "Véhicule requis"),
  instructorQualified: z.boolean().refine((val) => val === true, {
    message: "Moniteur non habilité pour cette catégorie",
  }),
  vehicleAvailable: z.boolean().refine((val) => val === true, {
    message: "Véhicule non disponible",
  }),
});

export type SelectInstructorVehicleData = z.infer<
  typeof selectInstructorVehicleSchema
>;

// ============================================================================
// STEP 3 - DATE & TIME SELECTION
// ============================================================================

export const selectDateTimeSchema = z.object({
  date: z.string().min(1, "Date requise"),
  startTime: z.string().min(1, "Horaire requis"),
  duration: z.enum(["45", "90"], {
    errorMap: () => ({ message: "Durée invalide" }),
  }),
  meetingPoint: z.string().min(1, "Point de rendez-vous requis"),
  notes: z
    .string()
    .max(300, "Notes trop longues (max 300 caractères)")
    .optional(),
  slotAvailable: z.boolean().refine((val) => val === true, {
    message: "Créneau non disponible",
  }),
});

export type SelectDateTimeData = z.infer<typeof selectDateTimeSchema>;

// ============================================================================
// STEP 4 - BOOKING SUMMARY
// ============================================================================

export const bookingSummarySchema = z.object({
  sendEmailConfirmation: z.boolean().default(true),
  sendSmsReminder: z.boolean().default(false),
  addToGoogleCalendar: z.boolean().default(false),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions",
  }),
});

export type BookingSummaryData = z.infer<typeof bookingSummarySchema>;

// ============================================================================
// COMPLETE BOOKING DATA
// ============================================================================

export const completeBookingSchema = z.object({
  student: selectStudentSchema,
  instructorVehicle: selectInstructorVehicleSchema,
  dateTime: selectDateTimeSchema,
  summary: bookingSummarySchema,
});

export type CompleteBookingData = z.infer<typeof completeBookingSchema>;

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface AvailabilityCheckRequest {
  date: string;
  instructorId: string;
  vehicleId: string;
  duration: number;
  excludeLessonId?: string;
}

export interface AvailabilityCheckResponse {
  available: boolean;
  slots: TimeSlot[];
  conflicts: Conflict[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
  reason?: string;
}

export interface Conflict {
  type: "instructor" | "vehicle" | "student";
  startTime: string;
  endTime: string;
  reason: string;
}

export interface CreateLessonRequest {
  studentId: string;
  instructorId: string;
  vehicleId: string;
  categoryId: string;
  date: string;
  startTime: string;
  duration: number;
  meetingPoint: string;
  notes?: string;
  sendEmailConfirmation: boolean;
  sendSmsReminder: boolean;
  addToGoogleCalendar: boolean;
}

export interface CreateLessonResponse {
  success: boolean;
  lessonId: string;
  message: string;
  calendarEventId?: string;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export const validateStep = (
  step: number,
  data: any
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  try {
    switch (step) {
      case 1:
        selectStudentSchema.parse(data);
        break;
      case 2:
        selectInstructorVehicleSchema.parse(data);
        break;
      case 3:
        selectDateTimeSchema.parse(data);
        break;
      case 4:
        bookingSummarySchema.parse(data);
        break;
      default:
        errors.push("Étape invalide");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors.push(err.message);
      });
    }
  }

  return { valid: errors.length === 0, errors };
};

export const calculateEndTime = (
  startTime: string,
  duration: number
): string => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
};

export const formatTimeRange = (
  startTime: string,
  duration: number
): string => {
  const endTime = calculateEndTime(startTime, duration);
  return `${startTime} - ${endTime}`;
};
