/**
 * VIAMENTOR - Vehicles Analytics Data
 * Mock data et types pour analytics véhicules
 */

export type VehiclesAnalyticsLocale = "fr" | "de" | "it" | "en";

// ============================================================================
// TYPES
// ============================================================================

export interface VehicleAnalyticsStats {
  totalVehicles: number;
  totalKm: number;
  totalHours: number;
  maintenanceCosts: number;
}

export interface VehicleUtilization {
  id: string;
  plate: string;
  brand: string;
  model: string;
  category: "B" | "A" | "BE" | "A1";
  lessonsCount: number;
  hoursUsed: number;
  kmDriven: number;
  occupancyRate: number; // %
  inactiveDays: number;
  revenueGenerated: number;
  hoursAvailable: number;
  dailyUsage: number[]; // 7 days
}

export interface VehicleCosts {
  id: string;
  plate: string;
  totalCosts: number;
  costPerKm: number;
  costPerHour: number;
  kmDriven: number;
  hoursUsed: number;
  revenue: number;
  roi: number; // %
  breakdown: {
    maintenance: number;
    fuel: number;
    insurance: number;
    depreciation: number;
    other: number;
  };
  monthlyHistory: Array<{
    month: string;
    costs: number;
  }>;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  vehicleId: string;
  plate: string;
  type: "preventive" | "corrective" | "inspection" | "tire_change" | "other";
  kmCounter: number;
  cost: number;
  nextDue?: {
    date: string;
    km: number;
  };
  description: string;
}

export interface FuelConsumption {
  id: string;
  plate: string;
  brand: string;
  model: string;
  avgConsumption: number; // L/100km
  totalLiters: number;
  totalCost: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  efficient: boolean;
  monthlyHistory: Array<{
    month: string;
    consumption: number;
  }>;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const vehiclesAnalyticsStats: VehicleAnalyticsStats = {
  totalVehicles: 12,
  totalKm: 45680,
  totalHours: 1847,
  maintenanceCosts: 18450,
};

export const vehiclesUtilization: VehicleUtilization[] = [
  {
    id: "v1",
    plate: "VD 123456",
    brand: "Volkswagen",
    model: "Golf 8",
    category: "B",
    lessonsCount: 187,
    hoursUsed: 374,
    kmDriven: 5610,
    occupancyRate: 85,
    inactiveDays: 2,
    revenueGenerated: 37400,
    hoursAvailable: 440,
    dailyUsage: [8, 9, 7, 8, 6, 4, 2],
  },
  {
    id: "v2",
    plate: "VD 234567",
    brand: "Audi",
    model: "A3",
    category: "B",
    lessonsCount: 165,
    hoursUsed: 330,
    kmDriven: 4950,
    occupancyRate: 75,
    inactiveDays: 3,
    revenueGenerated: 33000,
    hoursAvailable: 440,
    dailyUsage: [7, 8, 6, 7, 5, 3, 2],
  },
  {
    id: "v3",
    plate: "VD 345678",
    brand: "BMW",
    model: "Serie 1",
    category: "B",
    lessonsCount: 152,
    hoursUsed: 304,
    kmDriven: 4560,
    occupancyRate: 69,
    inactiveDays: 4,
    revenueGenerated: 30400,
    hoursAvailable: 440,
    dailyUsage: [6, 7, 5, 6, 5, 3, 1],
  },
  {
    id: "v4",
    plate: "VD 456789",
    brand: "Yamaha",
    model: "MT-07",
    category: "A",
    lessonsCount: 98,
    hoursUsed: 196,
    kmDriven: 2940,
    occupancyRate: 45,
    inactiveDays: 8,
    revenueGenerated: 19600,
    hoursAvailable: 440,
    dailyUsage: [3, 4, 3, 3, 2, 1, 0],
  },
  {
    id: "v5",
    plate: "VD 567890",
    brand: "Mercedes",
    model: "Sprinter",
    category: "BE",
    lessonsCount: 45,
    hoursUsed: 90,
    kmDriven: 1350,
    occupancyRate: 20,
    inactiveDays: 15,
    revenueGenerated: 9000,
    hoursAvailable: 440,
    dailyUsage: [1, 2, 1, 1, 1, 0, 0],
  },
];

export const vehiclesCosts: VehicleCosts[] = [
  {
    id: "v1",
    plate: "VD 123456",
    totalCosts: 8500,
    costPerKm: 1.51,
    costPerHour: 22.73,
    kmDriven: 5610,
    hoursUsed: 374,
    revenue: 37400,
    roi: 340,
    breakdown: {
      maintenance: 2500,
      fuel: 3200,
      insurance: 1800,
      depreciation: 800,
      other: 200,
    },
    monthlyHistory: [
      { month: "Jan", costs: 650 },
      { month: "Fév", costs: 720 },
      { month: "Mar", costs: 680 },
      { month: "Avr", costs: 710 },
      { month: "Mai", costs: 750 },
      { month: "Juin", costs: 690 },
    ],
  },
  {
    id: "v2",
    plate: "VD 234567",
    totalCosts: 7800,
    costPerKm: 1.58,
    costPerHour: 23.64,
    kmDriven: 4950,
    hoursUsed: 330,
    revenue: 33000,
    roi: 323,
    breakdown: {
      maintenance: 2200,
      fuel: 2900,
      insurance: 1800,
      depreciation: 700,
      other: 200,
    },
    monthlyHistory: [
      { month: "Jan", costs: 600 },
      { month: "Fév", costs: 680 },
      { month: "Mar", costs: 650 },
      { month: "Avr", costs: 670 },
      { month: "Mai", costs: 700 },
      { month: "Juin", costs: 650 },
    ],
  },
  {
    id: "v3",
    plate: "VD 345678",
    totalCosts: 9200,
    costPerKm: 2.02,
    costPerHour: 30.26,
    kmDriven: 4560,
    hoursUsed: 304,
    revenue: 30400,
    roi: 230,
    breakdown: {
      maintenance: 3500,
      fuel: 2700,
      insurance: 2000,
      depreciation: 800,
      other: 200,
    },
    monthlyHistory: [
      { month: "Jan", costs: 750 },
      { month: "Fév", costs: 820 },
      { month: "Mar", costs: 780 },
      { month: "Avr", costs: 800 },
      { month: "Mai", costs: 850 },
      { month: "Juin", costs: 780 },
    ],
  },
  {
    id: "v4",
    plate: "VD 456789",
    totalCosts: 4200,
    costPerKm: 1.43,
    costPerHour: 21.43,
    kmDriven: 2940,
    hoursUsed: 196,
    revenue: 19600,
    roi: 367,
    breakdown: {
      maintenance: 1200,
      fuel: 1500,
      insurance: 1000,
      depreciation: 400,
      other: 100,
    },
    monthlyHistory: [
      { month: "Jan", costs: 350 },
      { month: "Fév", costs: 380 },
      { month: "Mar", costs: 360 },
      { month: "Avr", costs: 370 },
      { month: "Mai", costs: 400 },
      { month: "Juin", costs: 360 },
    ],
  },
  {
    id: "v5",
    plate: "VD 567890",
    totalCosts: 5500,
    costPerKm: 4.07,
    costPerHour: 61.11,
    kmDriven: 1350,
    hoursUsed: 90,
    revenue: 9000,
    roi: 64,
    breakdown: {
      maintenance: 1800,
      fuel: 1200,
      insurance: 1500,
      depreciation: 800,
      other: 200,
    },
    monthlyHistory: [
      { month: "Jan", costs: 450 },
      { month: "Fév", costs: 480 },
      { month: "Mar", costs: 460 },
      { month: "Avr", costs: 470 },
      { month: "Mai", costs: 500 },
      { month: "Juin", costs: 460 },
    ],
  },
];

export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: "m1",
    date: "2025-01-15",
    vehicleId: "v1",
    plate: "VD 123456",
    type: "preventive",
    kmCounter: 45000,
    cost: 450,
    nextDue: { date: "2025-07-15", km: 55000 },
    description: "Révision 45'000 km - Vidange + filtres",
  },
  {
    id: "m2",
    date: "2025-01-20",
    vehicleId: "v3",
    plate: "VD 345678",
    type: "corrective",
    kmCounter: 38000,
    cost: 1200,
    description: "Remplacement plaquettes frein avant",
  },
  {
    id: "m3",
    date: "2025-02-05",
    vehicleId: "v2",
    plate: "VD 234567",
    type: "inspection",
    kmCounter: 42000,
    cost: 120,
    nextDue: { date: "2026-02-05", km: 52000 },
    description: "Contrôle technique annuel",
  },
  {
    id: "m4",
    date: "2025-02-10",
    vehicleId: "v4",
    plate: "VD 456789",
    type: "tire_change",
    kmCounter: 25000,
    cost: 680,
    nextDue: { date: "2025-10-10", km: 30000 },
    description: "Changement pneus été",
  },
  {
    id: "m5",
    date: "2025-02-25",
    vehicleId: "v5",
    plate: "VD 567890",
    type: "corrective",
    kmCounter: 65000,
    cost: 1500,
    description: "Réparation système freinage",
  },
];

export const fuelConsumption: FuelConsumption[] = [
  {
    id: "v1",
    plate: "VD 123456",
    brand: "Volkswagen",
    model: "Golf 8",
    avgConsumption: 5.7,
    totalLiters: 320,
    totalCost: 640,
    trend: "stable",
    trendPercent: 0,
    efficient: true,
    monthlyHistory: [
      { month: "Jan", consumption: 5.8 },
      { month: "Fév", consumption: 5.7 },
      { month: "Mar", consumption: 5.6 },
      { month: "Avr", consumption: 5.7 },
      { month: "Mai", consumption: 5.8 },
      { month: "Juin", consumption: 5.7 },
    ],
  },
  {
    id: "v2",
    plate: "VD 234567",
    brand: "Audi",
    model: "A3",
    avgConsumption: 5.9,
    totalLiters: 292,
    totalCost: 584,
    trend: "down",
    trendPercent: -3,
    efficient: true,
    monthlyHistory: [
      { month: "Jan", consumption: 6.2 },
      { month: "Fév", consumption: 6.0 },
      { month: "Mar", consumption: 5.9 },
      { month: "Avr", consumption: 5.8 },
      { month: "Mai", consumption: 5.9 },
      { month: "Juin", consumption: 5.8 },
    ],
  },
  {
    id: "v3",
    plate: "VD 345678",
    brand: "BMW",
    model: "Serie 1",
    avgConsumption: 6.8,
    totalLiters: 310,
    totalCost: 620,
    trend: "up",
    trendPercent: 5,
    efficient: false,
    monthlyHistory: [
      { month: "Jan", consumption: 6.5 },
      { month: "Fév", consumption: 6.6 },
      { month: "Mar", consumption: 6.7 },
      { month: "Avr", consumption: 6.8 },
      { month: "Mai", consumption: 6.9 },
      { month: "Juin", consumption: 7.0 },
    ],
  },
];
