/**
 * VIAMENTOR - Garages API Integration
 * Service intégration API garages partenaires pour réservation automatique
 */

"use client";

import type {
  MaintenanceTask,
  MaintenanceCategory,
} from "./viamentor-maintenance-data";

// ============================================================================
// TYPES
// ============================================================================

export interface Garage {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;

  // Services
  services: MaintenanceCategory[];
  specialties: string[];

  // Horaires
  openingHours: OpeningHours;

  // Tarifs
  hourlyRate: number;
  estimatedWaitTime: number; // minutes

  // Partenariat
  isPartner: boolean;
  partnerSince?: string;
  discount?: number; // percentage

  // API
  apiEnabled: boolean;
  apiEndpoint?: string;
  apiKey?: string;
}

export interface OpeningHours {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm
  end: string; // HH:mm
}

export interface GarageAvailability {
  garageId: string;
  date: string;
  slots: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  start: string; // HH:mm
  end: string; // HH:mm
  available: boolean;
  estimatedDuration: number; // minutes
  price: number;
}

export interface BookingRequest {
  garageId: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleBrand: string;
  vehicleModel: string;
  maintenanceType: MaintenanceCategory;
  description: string;
  preferredDate: string;
  preferredTime: string;
  estimatedDuration: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  confirmationNumber?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  garage?: Garage;
  estimatedCost?: number;
  message?: string;
  error?: string;
}

export interface BookingStatus {
  bookingId: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  garage: Garage;
  scheduledDate: string;
  scheduledTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  cost?: number;
  notes?: string;
  updatedAt: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockGarages: Garage[] = [
  {
    id: "garage-001",
    name: "Garage Central SA",
    address: "Route de Lausanne 45",
    city: "Renens",
    postalCode: "1020",
    phone: "+41 21 634 12 34",
    email: "info@garagecentral.ch",
    website: "https://garagecentral.ch",
    rating: 4.8,
    reviewCount: 156,
    services: [
      "oil_change",
      "tire_rotation",
      "brake_service",
      "engine",
      "inspection",
    ],

    specialties: ["Volkswagen", "Audi", "BMW"],
    openingHours: {
      monday: [
        { start: "08:00", end: "12:00" },
        { start: "13:30", end: "18:00" },
      ],

      tuesday: [
        { start: "08:00", end: "12:00" },
        { start: "13:30", end: "18:00" },
      ],

      wednesday: [
        { start: "08:00", end: "12:00" },
        { start: "13:30", end: "18:00" },
      ],

      thursday: [
        { start: "08:00", end: "12:00" },
        { start: "13:30", end: "18:00" },
      ],

      friday: [
        { start: "08:00", end: "12:00" },
        { start: "13:30", end: "18:00" },
      ],

      saturday: [{ start: "08:00", end: "12:00" }],
      sunday: [],
    },
    hourlyRate: 120,
    estimatedWaitTime: 30,
    isPartner: true,
    partnerSince: "2020-01-15",
    discount: 10,
    apiEnabled: true,
    apiEndpoint: "https://api.garagecentral.ch/v1",
    apiKey: "gc_test_key_123",
  },
  {
    id: "garage-002",
    name: "Auto Service Plus",
    address: "Avenue de la Gare 12",
    city: "Lausanne",
    postalCode: "1003",
    phone: "+41 21 312 45 67",
    email: "contact@autoserviceplus.ch",
    rating: 4.6,
    reviewCount: 89,
    services: [
      "oil_change",
      "brake_service",
      "electrical",
      "bodywork",
      "inspection",
    ],

    specialties: ["Toutes marques"],
    openingHours: {
      monday: [{ start: "07:30", end: "18:30" }],
      tuesday: [{ start: "07:30", end: "18:30" }],
      wednesday: [{ start: "07:30", end: "18:30" }],
      thursday: [{ start: "07:30", end: "18:30" }],
      friday: [{ start: "07:30", end: "18:30" }],
      saturday: [{ start: "08:00", end: "16:00" }],
      sunday: [],
    },
    hourlyRate: 110,
    estimatedWaitTime: 45,
    isPartner: true,
    partnerSince: "2021-06-01",
    discount: 5,
    apiEnabled: true,
    apiEndpoint: "https://api.autoserviceplus.ch/bookings",
    apiKey: "asp_test_key_456",
  },
  {
    id: "garage-003",
    name: "Moto Expert",
    address: "Chemin des Acacias 8",
    city: "Genève",
    postalCode: "1227",
    phone: "+41 22 789 01 23",
    email: "info@motoexpert.ch",
    rating: 4.9,
    reviewCount: 234,
    services: [
      "oil_change",
      "tire_rotation",
      "brake_service",
      "engine",
      "inspection",
    ],

    specialties: ["Motos", "Scooters"],
    openingHours: {
      monday: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],

      tuesday: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],

      wednesday: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],

      thursday: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],

      friday: [
        { start: "08:00", end: "12:00" },
        { start: "14:00", end: "18:00" },
      ],

      saturday: [{ start: "09:00", end: "13:00" }],
      sunday: [],
    },
    hourlyRate: 130,
    estimatedWaitTime: 20,
    isPartner: true,
    partnerSince: "2019-03-20",
    discount: 15,
    apiEnabled: true,
    apiEndpoint: "https://api.motoexpert.ch/api/v2",
    apiKey: "me_test_key_789",
  },
  {
    id: "garage-004",
    name: "Carrosserie Moderne",
    address: "Route de Berne 156",
    city: "Fribourg",
    postalCode: "1700",
    phone: "+41 26 345 67 89",
    email: "contact@carrosseriemoderne.ch",
    rating: 4.5,
    reviewCount: 67,
    services: ["bodywork", "inspection"],
    specialties: ["Carrosserie", "Peinture"],
    openingHours: {
      monday: [{ start: "08:00", end: "17:00" }],
      tuesday: [{ start: "08:00", end: "17:00" }],
      wednesday: [{ start: "08:00", end: "17:00" }],
      thursday: [{ start: "08:00", end: "17:00" }],
      friday: [{ start: "08:00", end: "17:00" }],
      saturday: [],
      sunday: [],
    },
    hourlyRate: 140,
    estimatedWaitTime: 60,
    isPartner: false,
    apiEnabled: false,
  },
  {
    id: "garage-005",
    name: "Garage Express",
    address: "Rue du Commerce 23",
    city: "Neuchâtel",
    postalCode: "2000",
    phone: "+41 32 456 78 90",
    email: "info@garageexpress.ch",
    rating: 4.7,
    reviewCount: 112,
    services: ["oil_change", "tire_rotation", "brake_service", "inspection"],
    specialties: ["Service rapide", "Sans rendez-vous"],
    openingHours: {
      monday: [{ start: "07:00", end: "19:00" }],
      tuesday: [{ start: "07:00", end: "19:00" }],
      wednesday: [{ start: "07:00", end: "19:00" }],
      thursday: [{ start: "07:00", end: "19:00" }],
      friday: [{ start: "07:00", end: "19:00" }],
      saturday: [{ start: "08:00", end: "17:00" }],
      sunday: [{ start: "09:00", end: "13:00" }],
    },
    hourlyRate: 100,
    estimatedWaitTime: 15,
    isPartner: true,
    partnerSince: "2022-09-01",
    discount: 8,
    apiEnabled: true,
    apiEndpoint: "https://api.garageexpress.ch/v1/bookings",
    apiKey: "ge_test_key_012",
  },
];

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Récupère les garages disponibles pour un type de maintenance
 */
export function getAvailableGarages(
  maintenanceType: MaintenanceCategory,
  city?: string
): Garage[] {
  let garages = mockGarages.filter((garage) =>
    garage.services.includes(maintenanceType)
  );

  if (city) {
    garages = garages.filter(
      (garage) => garage.city.toLowerCase() === city.toLowerCase()
    );
  }

  return garages.sort((a, b) => b.rating - a.rating);
}

/**
 * Récupère les disponibilités d'un garage pour une date
 */
export async function getGarageAvailability(
  garageId: string,
  date: string
): Promise<GarageAvailability> {
  const garage = mockGarages.find((g) => g.id === garageId);
  if (!garage) {
    throw new Error("Garage not found");
  }

  // Simuler l'appel API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Générer des créneaux disponibles (simulation)
  const dayOfWeek = new Date(date)
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toLowerCase() as keyof OpeningHours;

  const openingHours = garage.openingHours[dayOfWeek];
  const slots: AvailabilitySlot[] = [];

  openingHours.forEach((period) => {
    const startHour = parseInt(period.start.split(":")[0]);
    const endHour = parseInt(period.end.split(":")[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      // Simuler disponibilité aléatoire
      const available = Math.random() > 0.3;

      slots.push({
        start: `${hour.toString().padStart(2, "0")}:00`,
        end: `${(hour + 1).toString().padStart(2, "0")}:00`,
        available,
        estimatedDuration: 60,
        price: garage.hourlyRate,
      });
    }
  });

  return {
    garageId,
    date,
    slots,
  };
}

/**
 * Crée une réservation auprès d'un garage
 */
export async function createBooking(
  request: BookingRequest
): Promise<BookingResponse> {
  const garage = mockGarages.find((g) => g.id === request.garageId);

  if (!garage) {
    return {
      success: false,
      error: "Garage not found",
    };
  }

  if (!garage.apiEnabled) {
    return {
      success: false,
      error: "Garage does not support online booking",
    };
  }

  // Simuler l'appel API
  console.log("[Garage API] Creating booking:", {
    garage: garage.name,
    vehicle: `${request.vehicleBrand} ${request.vehicleModel} (${request.vehiclePlate})`,
    date: request.preferredDate,
    time: request.preferredTime,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simuler réponse succès
  const bookingId = `BK-${Date.now()}`;
  const confirmationNumber = `CONF-${Math.random().toString(36).substring(7).toUpperCase()}`;

  const basePrice = garage.hourlyRate * (request.estimatedDuration / 60);
  const discount = garage.discount || 0;
  const estimatedCost = basePrice * (1 - discount / 100);

  return {
    success: true,
    bookingId,
    confirmationNumber,
    scheduledDate: request.preferredDate,
    scheduledTime: request.preferredTime,
    garage,
    estimatedCost: Math.round(estimatedCost),
    message: `Réservation confirmée chez ${garage.name}. Numéro de confirmation: ${confirmationNumber}`,
  };
}

/**
 * Récupère le statut d'une réservation
 */
export async function getBookingStatus(
  bookingId: string
): Promise<BookingStatus> {
  // Simuler l'appel API
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    bookingId,
    status: "confirmed",
    garage: mockGarages[0],
    scheduledDate: "2025-01-20",
    scheduledTime: "09:00",
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Annule une réservation
 */
export async function cancelBooking(
  bookingId: string,
  reason?: string
): Promise<{ success: boolean; message?: string }> {
  console.log("[Garage API] Cancelling booking:", bookingId, reason);

  // Simuler l'appel API
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    message: "Réservation annulée avec succès",
  };
}

/**
 * Calcule le coût estimé avec remise partenaire
 */
export function calculateEstimatedCost(
  garage: Garage,
  durationMinutes: number
): { basePrice: number; discount: number; finalPrice: number } {
  const basePrice = garage.hourlyRate * (durationMinutes / 60);
  const discountAmount = garage.discount
    ? basePrice * (garage.discount / 100)
    : 0;
  const finalPrice = basePrice - discountAmount;

  return {
    basePrice: Math.round(basePrice),
    discount: Math.round(discountAmount),
    finalPrice: Math.round(finalPrice),
  };
}
