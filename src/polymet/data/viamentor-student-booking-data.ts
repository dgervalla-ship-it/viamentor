/**
 * VIAMENTOR - Student Booking Data
 * Mock data et types pour réservation autonome leçons élève
 */

import type { LicenseCategory } from "@/polymet/data/viamentor-students-data";

/**
 * Types de durée de leçon
 */
export type LessonDuration = "single" | "double";

/**
 * Status de leçon
 */
export type LessonStatus =
  | "upcoming"
  | "completed"
  | "canceled"
  | "no_show"
  | "rescheduled";

/**
 * Type de point de rendez-vous
 */
export type MeetingPointType = "school" | "home" | "custom";

/**
 * Slot de disponibilité
 */
export interface TimeSlot {
  id: string;
  time: string; // Format "HH:mm"
  available: boolean;
  reason?: string; // Si unavailable
  instructorId?: string;
  vehicleId?: string;
  placesLeft?: number; // Si limited
}

/**
 * Disponibilité journalière
 */
export interface DayAvailability {
  date: string; // ISO date
  available: boolean;
  reason?: string; // Si unavailable (holiday, instructor off, etc.)
  slots: TimeSlot[];
}

/**
 * Moniteur disponible
 */
export interface AvailableInstructor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  categories: LicenseCategory[];
  isPreferred: boolean;
}

/**
 * Véhicule disponible
 */
export interface AvailableVehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  category: LicenseCategory;
  photo?: string;
}

/**
 * Données de réservation Step 1
 */
export interface DurationStepData {
  duration: LessonDuration;
  objectives?: string;
}

/**
 * Données de réservation Step 2
 */
export interface DateTimeStepData {
  date: string;
  slotId: string;
  instructorId: string;
  vehicleId: string;
  filterPreferredInstructor: boolean;
  filterTimeOfDay?: "morning" | "afternoon" | "evening";
}

/**
 * Données de réservation Step 3
 */
export interface LocationStepData {
  type: MeetingPointType;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

/**
 * Données de réservation Step 4
 */
export interface ConfirmationStepData {
  acceptTerms: boolean;
  addToCalendar: boolean;
}

/**
 * Données complètes de réservation
 */
export interface BookingData {
  duration: DurationStepData;
  dateTime: DateTimeStepData;
  location: LocationStepData;
  confirmation: ConfirmationStepData;
}

/**
 * Leçon élève
 */
export interface StudentLesson {
  id: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: LessonStatus;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    email: string;
  };
  vehicle: {
    id: string;
    plate: string;
    brand: string;
    model: string;
    photo?: string;
  };
  category: LicenseCategory;
  meetingPoint: {
    type: MeetingPointType;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    notes?: string;
  };
  objectives?: string;
  price: number;
  evaluation?: {
    rating: number;
    comment: string;
    themes: string[];
    signature?: string;
  };
  canceledAt?: string;
  cancelReason?: string;
  cancelFee?: number;
}

/**
 * Solde leçons élève
 */
export interface StudentBalance {
  studentId: string;
  totalLessons: number;
  usedLessons: number;
  remainingLessons: number;
  nextLesson?: {
    date: string;
    time: string;
    instructorName: string;
  };
  preferredInstructor?: {
    id: string;
    name: string;
    avatar: string;
  };
}

/**
 * Configuration tarifs
 */
export interface PricingConfig {
  singleLessonPrice: number;
  doubleLessonPrice: number;
  doubleLessonDiscount: number; // percentage
  cancellationFee48h: number;
  cancellationFee24h: number;
}

/**
 * Mock pricing config
 */
export const mockPricingConfig: PricingConfig = {
  singleLessonPrice: 90,
  doubleLessonPrice: 171, // 90 * 2 * 0.95
  doubleLessonDiscount: 5,
  cancellationFee48h: 0,
  cancellationFee24h: 45,
};

/**
 * Mock student balance
 */
export const mockStudentBalance: StudentBalance = {
  studentId: "student-1",
  totalLessons: 30,
  usedLessons: 12,
  remainingLessons: 18,
  nextLesson: {
    date: "2024-03-20",
    time: "14:00",
    instructorName: "Marc Dubois",
  },
  preferredInstructor: {
    id: "instructor-1",
    name: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
  },
};

/**
 * Mock available instructors
 */
export const mockAvailableInstructors: AvailableInstructor[] = [
  {
    id: "instructor-1",
    name: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    rating: 4.8,
    categories: ["B"],
    isPreferred: true,
  },
  {
    id: "instructor-2",
    name: "Sophie Martin",
    avatar: "https://github.com/kdrnp.png",
    rating: 4.9,
    categories: ["B", "BE"],
    isPreferred: false,
  },
  {
    id: "instructor-3",
    name: "Pierre Lefort",
    avatar: "https://github.com/yahyabedirhan.png",
    rating: 4.7,
    categories: ["B", "A1"],
    isPreferred: false,
  },
];

/**
 * Mock available vehicles
 */
export const mockAvailableVehicles: AvailableVehicle[] = [
  {
    id: "vehicle-1",
    plate: "VD 123456",
    brand: "Volkswagen",
    model: "Golf",
    category: "B",
  },
  {
    id: "vehicle-2",
    plate: "VD 234567",
    brand: "Audi",
    model: "A3",
    category: "B",
  },
  {
    id: "vehicle-3",
    plate: "VD 345678",
    brand: "BMW",
    model: "318i",
    category: "B",
  },
];

/**
 * Mock student lessons
 */
export const mockStudentLessons: StudentLesson[] = [
  {
    id: "lesson-1",
    date: "2024-03-20",
    time: "14:00",
    duration: 45,
    status: "upcoming",
    instructor: {
      id: "instructor-1",
      name: "Marc Dubois",
      avatar: "https://github.com/yusufhilmi.png",
      phone: "+41 79 123 45 67",
      email: "marc.dubois@viamentor.ch",
    },
    vehicle: {
      id: "vehicle-1",
      plate: "VD 123456",
      brand: "Volkswagen",
      model: "Golf",
    },
    category: "B",
    meetingPoint: {
      type: "school",
      address: "Route de Lausanne 123, 1020 Renens",
      coordinates: { lat: 46.5367, lng: 6.5881 },
    },
    objectives: "Pratiquer stationnement en créneau et parallèle",
    price: 90,
  },
  {
    id: "lesson-2",
    date: "2024-03-15",
    time: "10:00",
    duration: 90,
    status: "completed",
    instructor: {
      id: "instructor-1",
      name: "Marc Dubois",
      avatar: "https://github.com/yusufhilmi.png",
      phone: "+41 79 123 45 67",
      email: "marc.dubois@viamentor.ch",
    },
    vehicle: {
      id: "vehicle-1",
      plate: "VD 123456",
      brand: "Volkswagen",
      model: "Golf",
    },
    category: "B",
    meetingPoint: {
      type: "home",
      address: "Avenue de la Gare 45, 1003 Lausanne",
      coordinates: { lat: 46.5197, lng: 6.6323 },
      notes: "Devant l'entrée principale",
    },
    objectives: "Circulation autoroute et dépassements",
    price: 171,
    evaluation: {
      rating: 5,
      comment:
        "Excellente progression sur l'autoroute. Bonne gestion des distances de sécurité.",
      themes: ["Autoroute", "Dépassements", "Distances de sécurité"],
    },
  },
];

/**
 * Generate mock time slots for a date
 */
export function generateMockTimeSlots(date: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const hours = [8, 9, 10, 11, 13, 14, 15, 16, 17];

  hours.forEach((hour) => {
    [0, 45].forEach((minute) => {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const random = Math.random();

      slots.push({
        id: `slot-${date}-${time}`,
        time,
        available: random > 0.3,
        reason: random <= 0.3 ? "Moniteur occupé" : undefined,
        instructorId: random > 0.5 ? "instructor-1" : "instructor-2",
        vehicleId: random > 0.5 ? "vehicle-1" : "vehicle-2",
        placesLeft: random > 0.7 && random <= 0.8 ? 2 : undefined,
      });
    });
  });

  return slots;
}
