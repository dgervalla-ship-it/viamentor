/**
 * VIAMENTOR Rooms Management Data
 * Mock data et types pour gestion salles formation
 */

// ============================================================================
// TYPES
// ============================================================================

export type RoomStatus = "active" | "inactive" | "maintenance" | "reserved";

export type EquipmentCategory =
  | "pedagogical"
  | "furniture"
  | "comfort"
  | "accessibility"
  | "services"
  | "security";

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  quantity?: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
  notes?: string;
}

export interface RoomException {
  id: string;
  date: string;
  type: "closed" | "modified";
  reason: string;
  customHours?: {
    morning?: { start: string; end: string };
    afternoon?: { start: string; end: string };
  };
  createdBy: string;
  createdAt: string;
}

export interface RoomReservation {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  courseType: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  participants: number;
  capacity: number;
  status: "confirmed" | "tentative" | "cancelled";
}

export interface RoomAvailability {
  monday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
  tuesday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
  wednesday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
  thursday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
  friday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
  saturday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
  sunday: {
    enabled: boolean;
    morning: string;
    afternoon: string;
    break: string;
  };
}

export interface RoomHistoryEvent {
  id: string;
  type: "created" | "updated" | "reservation" | "cancellation" | "maintenance";
  description: string;
  user: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

export interface Room {
  id: string;
  name: string;
  number?: string;
  location: string;
  floor?: number;
  capacity: number;
  area?: number; // m²
  description?: string;
  photos: string[];
  color: string;
  status: RoomStatus;
  statusReason?: string;
  statusDateRange?: { start: string; end: string };
  equipment: Equipment[];
  availability: RoomAvailability;
  exceptions: RoomException[];
  reservations: RoomReservation[];
  history: RoomHistoryEvent[];
  stats: {
    sessionsThisMonth: number;
    hoursUsed: number;
    occupancyRate: number;
    nextSession?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RoomStats {
  totalRooms: number;
  totalCapacity: number;
  occupancyRate: number;
  nextSession?: string;
}

export interface RoomFilters {
  search: string;
  status: RoomStatus[];
  capacityRange: [number, number];
  equipment: string[];
  location: string[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Salle Théorie A",
    number: "A101",
    location: "Bâtiment Principal",
    floor: 1,
    capacity: 20,
    area: 45,
    description: "Salle principale pour cours de sensibilisation et théorie",
    photos: ["https://images.unsplash.com/photo-1497366216548-37526070297c"],
    color: "#3b82f6",
    status: "active",
    equipment: [
      {
        id: "eq-1",
        name: "Projecteur HD",
        category: "pedagogical",
        quantity: 1,
        lastMaintenance: "2024-12-01",
        nextMaintenance: "2025-06-01",
      },
      {
        id: "eq-2",
        name: "Tableau blanc",
        category: "pedagogical",
        quantity: 2,
      },
      {
        id: "eq-3",
        name: "WiFi",
        category: "pedagogical",
      },
      {
        id: "eq-4",
        name: "Climatisation",
        category: "comfort",
      },
      {
        id: "eq-5",
        name: "Accès PMR",
        category: "accessibility",
      },
    ],

    availability: {
      monday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      tuesday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      wednesday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      thursday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      friday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      saturday: {
        enabled: true,
        morning: "09:00-12:00",
        afternoon: "13:00-16:00",
        break: "12:00-13:00",
      },
      sunday: { enabled: false, morning: "", afternoon: "", break: "" },
    },
    exceptions: [
      {
        id: "exc-1",
        date: "2025-02-15",
        type: "closed",
        reason: "Maintenance annuelle",
        createdBy: "Admin",
        createdAt: "2025-01-10T10:00:00Z",
      },
    ],

    reservations: [
      {
        id: "res-1",
        date: "2025-01-25",
        startTime: "09:00",
        endTime: "17:00",
        duration: 480,
        courseType: "Sensibilisation 8h",
        instructor: {
          id: "inst-1",
          name: "Marc Dubois",
          avatar: "https://github.com/yusufhilmi.png",
        },
        participants: 18,
        capacity: 20,
        status: "confirmed",
      },
    ],

    history: [
      {
        id: "hist-1",
        type: "created",
        description: "Salle créée",
        user: "Admin",
        timestamp: "2024-01-01T10:00:00Z",
      },
    ],

    stats: {
      sessionsThisMonth: 12,
      hoursUsed: 96,
      occupancyRate: 75,
      nextSession: "2025-01-25T09:00:00Z",
    },
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
  },
  {
    id: "room-2",
    name: "Salle Théorie B",
    number: "B202",
    location: "Bâtiment Annexe",
    floor: 2,
    capacity: 15,
    area: 35,
    description: "Salle secondaire pour petits groupes",
    photos: [],
    color: "#10b981",
    status: "active",
    equipment: [
      {
        id: "eq-6",
        name: 'Écran TV 55"',
        category: "pedagogical",
        quantity: 1,
      },
      {
        id: "eq-7",
        name: "Tableau blanc",
        category: "pedagogical",
        quantity: 1,
      },
      {
        id: "eq-8",
        name: "WiFi",
        category: "pedagogical",
      },
    ],

    availability: {
      monday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      tuesday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      wednesday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      thursday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      friday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-17:00",
        break: "12:00-13:00",
      },
      saturday: { enabled: false, morning: "", afternoon: "", break: "" },
      sunday: { enabled: false, morning: "", afternoon: "", break: "" },
    },
    exceptions: [],
    reservations: [],
    history: [
      {
        id: "hist-2",
        type: "created",
        description: "Salle créée",
        user: "Admin",
        timestamp: "2024-01-15T10:00:00Z",
      },
    ],

    stats: {
      sessionsThisMonth: 8,
      hoursUsed: 64,
      occupancyRate: 55,
      nextSession: "2025-01-28T14:00:00Z",
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
  },
  {
    id: "room-3",
    name: "Salle Multimédia",
    number: "C103",
    location: "Bâtiment Principal",
    floor: 1,
    capacity: 25,
    area: 60,
    description: "Salle équipée pour formations multimédia et e-learning",
    photos: [],
    color: "#f59e0b",
    status: "maintenance",
    statusReason: "Mise à jour équipement informatique",
    statusDateRange: { start: "2025-01-20", end: "2025-01-27" },
    equipment: [
      {
        id: "eq-9",
        name: "Ordinateurs",
        category: "pedagogical",
        quantity: 12,
      },
      {
        id: "eq-10",
        name: "Projecteur 4K",
        category: "pedagogical",
        quantity: 1,
      },
      {
        id: "eq-11",
        name: "WiFi Haut Débit",
        category: "pedagogical",
      },
      {
        id: "eq-12",
        name: "Climatisation",
        category: "comfort",
      },
    ],

    availability: {
      monday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-18:00",
        break: "12:00-13:00",
      },
      tuesday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-18:00",
        break: "12:00-13:00",
      },
      wednesday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-18:00",
        break: "12:00-13:00",
      },
      thursday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-18:00",
        break: "12:00-13:00",
      },
      friday: {
        enabled: true,
        morning: "08:00-12:00",
        afternoon: "13:00-18:00",
        break: "12:00-13:00",
      },
      saturday: {
        enabled: true,
        morning: "09:00-12:00",
        afternoon: "",
        break: "",
      },
      sunday: { enabled: false, morning: "", afternoon: "", break: "" },
    },
    exceptions: [],
    reservations: [],
    history: [
      {
        id: "hist-3",
        type: "created",
        description: "Salle créée",
        user: "Admin",
        timestamp: "2024-02-01T10:00:00Z",
      },
      {
        id: "hist-4",
        type: "maintenance",
        description: "Début maintenance équipement",
        user: "Tech Support",
        timestamp: "2025-01-20T08:00:00Z",
      },
    ],

    stats: {
      sessionsThisMonth: 0,
      hoursUsed: 0,
      occupancyRate: 0,
    },
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2025-01-20T08:00:00Z",
  },
];

export const mockRoomStats: RoomStats = {
  totalRooms: 3,
  totalCapacity: 60,
  occupancyRate: 65,
  nextSession: "2025-01-25T09:00:00Z",
};

export const mockLocations = [
  "Bâtiment Principal",
  "Bâtiment Annexe",
  "Centre Formation",
];

export const mockEquipmentList = {
  pedagogical: [
    "Projecteur HD",
    "Projecteur 4K",
    "Écran TV",
    "Tableau blanc",
    "Tableau interactif",
    "Ordinateurs",
    "WiFi",
    "Micro",
    "Caméra",
  ],

  furniture: ["Tables", "Chaises", "Armoires"],
  comfort: ["Climatisation", "Chauffage", "Ventilation", "Éclairage LED"],
  accessibility: [
    "Accès PMR",
    "Rampe",
    "Toilettes PMR",
    "Parking PMR",
    "Alarme visuelle",
  ],

  services: [
    "Distributeurs",
    "Machine à café",
    "Réfrigérateur",
    "Fontaine à eau",
  ],

  security: ["Extincteur", "Issues de secours", "Détecteurs fumée", "Caméras"],
};

// ============================================================================
// HELPERS
// ============================================================================

export function getRoomStatusColor(status: RoomStatus): string {
  const colors: Record<RoomStatus, string> = {
    active: "bg-green-500",
    inactive: "bg-gray-500",
    maintenance: "bg-orange-500",
    reserved: "bg-blue-500",
  };
  return colors[status];
}

export function getOccupancyColor(rate: number): string {
  if (rate < 60) return "text-green-600";
  if (rate < 85) return "text-orange-600";
  return "text-red-600";
}

export function getOccupancyVariant(
  rate: number
): "default" | "secondary" | "destructive" {
  if (rate < 60) return "default";
  if (rate < 85) return "secondary";
  return "destructive";
}

export function filterRooms(
  rooms: Room[],
  filters: Partial<RoomFilters>
): Room[] {
  return rooms.filter((room) => {
    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        room.name.toLowerCase().includes(search) ||
        room.number?.toLowerCase().includes(search) ||
        room.location.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(room.status)) return false;
    }

    // Capacity range filter
    if (filters.capacityRange) {
      const [min, max] = filters.capacityRange;
      if (room.capacity < min || room.capacity > max) return false;
    }

    // Equipment filter
    if (filters.equipment && filters.equipment.length > 0) {
      const roomEquipmentNames = room.equipment.map((eq) => eq.name);
      const hasAllEquipment = filters.equipment.every((eq) =>
        roomEquipmentNames.includes(eq)
      );
      if (!hasAllEquipment) return false;
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      if (!filters.location.includes(room.location)) return false;
    }

    return true;
  });
}

export function calculateRoomStats(rooms: Room[]): RoomStats {
  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const avgOccupancy =
    rooms.reduce((sum, room) => sum + room.stats.occupancyRate, 0) / totalRooms;

  const nextSessions = rooms
    .map((room) => room.stats.nextSession)
    .filter(Boolean)
    .sort();

  return {
    totalRooms,
    totalCapacity,
    occupancyRate: Math.round(avgOccupancy),
    nextSession: nextSessions[0],
  };
}
