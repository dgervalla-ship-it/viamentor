/**
 * VIAMENTOR - Vehicle Detail Data
 * Mock data pour page détail véhicule avec historique, GPS, coûts, analytics
 */

// ============================================================================
// TYPES
// ============================================================================

export type VehicleStatus =
  | "available"
  | "in_lesson"
  | "maintenance"
  | "inactive";
export type ActionType =
  | "status_change"
  | "update"
  | "maintenance"
  | "document"
  | "cost"
  | "fuel"
  | "other";
export type CostCategory =
  | "maintenance"
  | "fuel"
  | "insurance"
  | "tax"
  | "other";
export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid";
export type PaymentMethod = "cash" | "card" | "fuel_card" | "invoice";

export interface VehicleDetail {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  status: VehicleStatus;
  photo: string;
  vin: string;
  color: string;
  transmission: "manual" | "automatic";
  fuelType: FuelType;
  purchaseDate: string;
  purchasePrice: number;
  currentKm: number;
  lastMaintenanceKm: number;
  nextMaintenanceKm: number;
  gpsEnabled: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
    lastUpdate: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
  action: ActionType;
  description: string;
  details?: {
    field?: string;
    oldValue?: any;
    newValue?: any;
    metadata?: Record<string, any>;
  };
}

export interface GPSTrajectory {
  id: string;
  lessonId: string;
  lessonDate: string;
  instructor: string;
  student: string;
  startTime: string;
  endTime: string;
  distance: number;
  duration: number;
  avgSpeed: number;
  maxSpeed: number;
  zones: {
    city: number;
    highway: number;
    rural: number;
  };
  route: Array<{
    lat: number;
    lng: number;
    speed: number;
    timestamp: string;
  }>;
  events: Array<{
    type: "start" | "stop" | "speeding";
    timestamp: string;
    location: { lat: number; lng: number };
    details?: string;
  }>;
}

export interface VehicleCost {
  id: string;
  date: string;
  category: CostCategory;
  description: string;
  amount: number;
  invoice?: string;
  km: number;
}

export interface FuelEntry {
  id: string;
  date: string;
  km: number;
  liters: number;
  amount: number;
  type: FuelType;
  consumption?: number;
  receipt?: string;
  paymentMethod?: PaymentMethod;
}

export interface UtilizationData {
  heatmap: Array<{
    day: number;
    hour: number;
    count: number;
  }>;
  topInstructors: Array<{
    id: string;
    name: string;
    hours: number;
    lessons: number;
  }>;
  topStudents: Array<{
    id: string;
    name: string;
    lessons: number;
  }>;
  inactiveDays: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockVehicleDetail: VehicleDetail = {
  id: "veh-001",
  plate: "GE 123456",
  brand: "Volkswagen",
  model: "Golf 8",
  year: 2022,
  category: "B",
  status: "available",
  photo: "https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800",
  vin: "WVWZZZ1KZEW123456",
  color: "Gris métallisé",
  transmission: "manual",
  fuelType: "gasoline",
  purchaseDate: "2022-03-15",
  purchasePrice: 32500,
  currentKm: 45250,
  lastMaintenanceKm: 45000,
  nextMaintenanceKm: 50000,
  gpsEnabled: true,
  currentLocation: {
    lat: 46.2044,
    lng: 6.1432,
    address: "Route de Chêne 36, 1208 Genève",
    lastUpdate: new Date().toISOString(),
  },
};

export const mockAuditLogs: AuditLog[] = [
  {
    id: "log-001",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: {
      id: "user-001",
      name: "Sophie Martin",
      role: "school_admin",
      avatar: "https://github.com/yusufhilmi.png",
    },
    action: "update",
    description: "a mis à jour le kilométrage de 45000 à 45250 km",
    details: {
      field: "currentKm",
      oldValue: 45000,
      newValue: 45250,
    },
  },
  {
    id: "log-002",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: "user-002",
      name: "Marc Dubois",
      role: "instructor",
      avatar: "https://github.com/kdrnp.png",
    },
    action: "status_change",
    description: "a changé le statut de Maintenance à Disponible",
    details: {
      field: "status",
      oldValue: "maintenance",
      newValue: "available",
    },
  },
  {
    id: "log-003",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: "user-001",
      name: "Sophie Martin",
      role: "school_admin",
      avatar: "https://github.com/yusufhilmi.png",
    },
    action: "maintenance",
    description: "a ajouté une maintenance Vidange moteur",
    details: {
      metadata: {
        type: "Vidange moteur",
        cost: 180,
        garage: "Garage Central SA",
      },
    },
  },
  {
    id: "log-004",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: "user-003",
      name: "Jean Dupont",
      role: "instructor",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    action: "document",
    description: "a téléchargé le certificat d'assurance RC",
    details: {
      metadata: {
        documentType: "RC Certificate",
        fileName: "rc-certificate-2024.pdf",
      },
    },
  },
];

export const mockGPSTrajectories: GPSTrajectory[] = [
  {
    id: "traj-001",
    lessonId: "lesson-001",
    lessonDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    instructor: "Marc Dubois",
    student: "Emma Rousseau",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    distance: 28.5,
    duration: 60,
    avgSpeed: 42,
    maxSpeed: 85,
    zones: {
      city: 60,
      highway: 25,
      rural: 15,
    },
    route: [
      {
        lat: 46.2044,
        lng: 6.1432,
        speed: 0,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        lat: 46.21,
        lng: 6.15,
        speed: 45,
        timestamp: new Date(Date.now() - 115 * 60 * 1000).toISOString(),
      },
      {
        lat: 46.22,
        lng: 6.16,
        speed: 80,
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      },
      {
        lat: 46.2044,
        lng: 6.1432,
        speed: 0,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],

    events: [
      {
        type: "start",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        location: { lat: 46.2044, lng: 6.1432 },
      },
      {
        type: "speeding",
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        location: { lat: 46.22, lng: 6.16 },
        details: "Dépassement vitesse: 85 km/h (limite: 80 km/h)",
      },
      {
        type: "stop",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        location: { lat: 46.2044, lng: 6.1432 },
      },
    ],
  },
];

export const mockVehicleCosts: VehicleCost[] = [
  {
    id: "cost-001",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    category: "maintenance",
    description: "Vidange moteur + filtre",
    amount: 180,
    invoice: "/invoices/vidange-2024-01.pdf",
    km: 45000,
  },
  {
    id: "cost-002",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    category: "insurance",
    description: "Prime RC annuelle",
    amount: 1200,
    invoice: "/invoices/rc-2024.pdf",
    km: 42000,
  },
  {
    id: "cost-003",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    category: "fuel",
    description: "Carburant mois",
    amount: 450,
    km: 40000,
  },
  {
    id: "cost-004",
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    category: "tax",
    description: "Vignette autoroute 2024",
    amount: 40,
    km: 38000,
  },
];

export const mockFuelEntries: FuelEntry[] = [
  {
    id: "fuel-001",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    km: 45250,
    liters: 42,
    amount: 75.6,
    type: "gasoline",
    consumption: 6.8,
    receipt: "/receipts/fuel-001.pdf",
    paymentMethod: "card",
  },
  {
    id: "fuel-002",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    km: 44650,
    liters: 40,
    amount: 72,
    type: "gasoline",
    consumption: 6.5,
    receipt: "/receipts/fuel-002.pdf",
    paymentMethod: "fuel_card",
  },
  {
    id: "fuel-003",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    km: 44050,
    liters: 38,
    amount: 68.4,
    type: "gasoline",
    consumption: 6.3,
    receipt: "/receipts/fuel-003.pdf",
    paymentMethod: "cash",
  },
];

export const mockUtilizationData: UtilizationData = {
  heatmap: [
    { day: 1, hour: 8, count: 3 },
    { day: 1, hour: 10, count: 5 },
    { day: 1, hour: 14, count: 4 },
    { day: 2, hour: 9, count: 4 },
    { day: 2, hour: 11, count: 6 },
    { day: 2, hour: 15, count: 5 },
    { day: 3, hour: 8, count: 2 },
    { day: 3, hour: 13, count: 3 },
    { day: 4, hour: 10, count: 5 },
    { day: 4, hour: 16, count: 4 },
    { day: 5, hour: 9, count: 6 },
    { day: 5, hour: 14, count: 7 },
  ],

  topInstructors: [
    { id: "inst-001", name: "Marc Dubois", hours: 45, lessons: 38 },
    { id: "inst-002", name: "Sophie Martin", hours: 38, lessons: 32 },
    { id: "inst-003", name: "Jean Dupont", hours: 32, lessons: 28 },
  ],

  topStudents: [
    { id: "stud-001", name: "Emma Rousseau", lessons: 15 },
    { id: "stud-002", name: "Lucas Bernard", lessons: 12 },
    { id: "stud-003", name: "Léa Petit", lessons: 10 },
  ],

  inactiveDays: 2,
};
