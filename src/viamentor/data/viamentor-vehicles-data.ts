/**
 * VIAMENTOR - Vehicles Data
 * Mock data pour module Vehicles avec types complets
 * Conformité OAC Art. 65-68
 */

// ============================================================================
// TYPES
// ============================================================================

export type VehicleCategory = "B" | "A" | "BE" | "A1" | "BPT";
export type VehicleStatus =
  | "available"
  | "in_lesson"
  | "maintenance"
  | "out_of_service";
export type ComplianceStatus = "compliant" | "warning" | "non_compliant";
export type MaintenanceType =
  | "revision"
  | "repair"
  | "inspection"
  | "expertise";

export interface Vehicle {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  category: VehicleCategory;
  photo?: string;
  mileage: number;
  status: VehicleStatus;

  // Conformité OAC Art. 65-68
  nextRevision: string; // ISO date
  insuranceExpiry: string; // ISO date
  expertiseExpiry: string; // ISO date
  complianceStatus: ComplianceStatus;
  complianceIssues?: string[];

  // Utilisation
  totalHours: number;
  averageKmPerDay: number;
  maintenanceCost: number;
  availabilityRate: number;

  // Assignation
  currentInstructorId?: string;
  currentStudentId?: string;
  currentLessonId?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface VehicleStats {
  total: number;
  available: number;
  inLesson: number;
  maintenance: number;
  outOfService: number;
  complianceRate: number;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  date: string;
  description: string;
  cost: number;
  mileage: number;
  nextDue?: string;
  performedBy: string;
}

export interface UtilizationData {
  vehicleId: string;
  licensePlate: string;
  totalHours: number;
  mileageEvolution: { date: string; mileage: number }[];
  lessonTypes: { type: VehicleCategory; count: number; hours: number }[];
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "veh-001",
    licensePlate: "VD 123456",
    brand: "Volkswagen",
    model: "Golf",
    year: 2022,
    category: "B",
    photo: "https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=400",
    mileage: 45000,
    status: "available",
    nextRevision: "2025-03-15",
    insuranceExpiry: "2025-12-31",
    expertiseExpiry: "2026-01-15",
    complianceStatus: "compliant",
    totalHours: 1250,
    averageKmPerDay: 85,
    maintenanceCost: 3500,
    availabilityRate: 92,
    createdAt: "2022-01-15T10:00:00Z",
    updatedAt: "2025-01-10T14:30:00Z",
  },
  {
    id: "veh-002",
    licensePlate: "GE 789012",
    brand: "BMW",
    model: "320d",
    year: 2021,
    category: "B",
    photo: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
    mileage: 78000,
    status: "in_lesson",
    nextRevision: "2025-02-28",
    insuranceExpiry: "2025-11-30",
    expertiseExpiry: "2025-12-20",
    complianceStatus: "warning",
    complianceIssues: ["Révision due dans 15 jours"],
    totalHours: 1850,
    averageKmPerDay: 120,
    maintenanceCost: 5200,
    availabilityRate: 88,
    currentInstructorId: "inst-001",
    currentStudentId: "stu-001",
    currentLessonId: "lesson-001",
    createdAt: "2021-03-20T10:00:00Z",
    updatedAt: "2025-01-13T09:15:00Z",
  },
  {
    id: "veh-003",
    licensePlate: "BE 345678",
    brand: "Audi",
    model: "A3",
    year: 2023,
    category: "B",
    photo: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
    mileage: 25000,
    status: "available",
    nextRevision: "2025-06-30",
    insuranceExpiry: "2026-03-15",
    expertiseExpiry: "2026-06-30",
    complianceStatus: "compliant",
    totalHours: 680,
    averageKmPerDay: 65,
    maintenanceCost: 1800,
    availabilityRate: 95,
    createdAt: "2023-01-10T10:00:00Z",
    updatedAt: "2025-01-13T16:45:00Z",
  },
  {
    id: "veh-004",
    licensePlate: "VS 901234",
    brand: "Honda",
    model: "CB500X",
    year: 2022,
    category: "A",
    photo: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400",
    mileage: 12000,
    status: "available",
    nextRevision: "2025-04-20",
    insuranceExpiry: "2025-10-31",
    expertiseExpiry: "2025-11-15",
    complianceStatus: "compliant",
    totalHours: 420,
    averageKmPerDay: 35,
    maintenanceCost: 1200,
    availabilityRate: 90,
    createdAt: "2022-04-15T10:00:00Z",
    updatedAt: "2025-01-12T11:20:00Z",
  },
  {
    id: "veh-005",
    licensePlate: "FR 567890",
    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2020,
    category: "BE",
    photo: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400",
    mileage: 125000,
    status: "maintenance",
    nextRevision: "2025-01-20",
    insuranceExpiry: "2025-08-31",
    expertiseExpiry: "2025-09-15",
    complianceStatus: "warning",
    complianceIssues: ["Révision en cours", "Kilométrage élevé"],
    totalHours: 2100,
    averageKmPerDay: 95,
    maintenanceCost: 8500,
    availabilityRate: 75,
    createdAt: "2020-02-10T10:00:00Z",
    updatedAt: "2025-01-13T08:00:00Z",
  },
  {
    id: "veh-006",
    licensePlate: "NE 234567",
    brand: "Yamaha",
    model: "MT-07",
    year: 2021,
    category: "A",
    photo: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400",
    mileage: 18000,
    status: "in_lesson",
    nextRevision: "2025-05-10",
    insuranceExpiry: "2025-12-15",
    expertiseExpiry: "2026-01-20",
    complianceStatus: "compliant",
    totalHours: 580,
    averageKmPerDay: 42,
    maintenanceCost: 1500,
    availabilityRate: 87,
    currentInstructorId: "inst-002",
    currentStudentId: "stu-002",
    currentLessonId: "lesson-002",
    createdAt: "2021-05-20T10:00:00Z",
    updatedAt: "2025-01-13T10:30:00Z",
  },
  {
    id: "veh-007",
    licensePlate: "TI 678901",
    brand: "Renault",
    model: "Clio",
    year: 2019,
    category: "B",
    photo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400",
    mileage: 210000,
    status: "out_of_service",
    nextRevision: "2024-12-31",
    insuranceExpiry: "2025-01-10",
    expertiseExpiry: "2025-01-05",
    complianceStatus: "non_compliant",
    complianceIssues: [
      "Assurance expirée",
      "Expertise expirée",
      "Kilométrage critique",
    ],

    totalHours: 3200,
    averageKmPerDay: 145,
    maintenanceCost: 12000,
    availabilityRate: 45,
    createdAt: "2019-03-15T10:00:00Z",
    updatedAt: "2025-01-13T07:00:00Z",
  },
  {
    id: "veh-008",
    licensePlate: "ZH 345678",
    brand: "Suzuki",
    model: "GSX-S125",
    year: 2023,
    category: "A1",
    photo: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400",
    mileage: 5000,
    status: "available",
    nextRevision: "2025-08-15",
    insuranceExpiry: "2026-02-28",
    expertiseExpiry: "2026-08-15",
    complianceStatus: "compliant",
    totalHours: 180,
    averageKmPerDay: 18,
    maintenanceCost: 450,
    availabilityRate: 98,
    createdAt: "2023-08-10T10:00:00Z",
    updatedAt: "2025-01-13T15:00:00Z",
  },
];

export const MOCK_VEHICLE_STATS: VehicleStats = {
  total: 8,
  available: 4,
  inLesson: 2,
  maintenance: 1,
  outOfService: 1,
  complianceRate: 75,
};

export const MOCK_MAINTENANCE_RECORDS: MaintenanceRecord[] = [
  {
    id: "maint-001",
    vehicleId: "veh-001",
    type: "revision",
    date: "2024-09-15",
    description: "Révision 45'000 km - Vidange + filtres",
    cost: 450,
    mileage: 45000,
    nextDue: "2025-03-15",
    performedBy: "Garage Central SA",
  },
  {
    id: "maint-002",
    vehicleId: "veh-002",
    type: "repair",
    date: "2024-11-20",
    description: "Remplacement plaquettes de frein avant",
    cost: 320,
    mileage: 76000,
    performedBy: "Garage Central SA",
  },
];

export const MOCK_UTILIZATION_DATA: UtilizationData[] = [
  {
    vehicleId: "veh-001",
    licensePlate: "VD 123456",
    totalHours: 1250,
    mileageEvolution: [
      { date: "2024-07", mileage: 35000 },
      { date: "2024-08", mileage: 37500 },
      { date: "2024-09", mileage: 40000 },
      { date: "2024-10", mileage: 42000 },
      { date: "2024-11", mileage: 43500 },
      { date: "2024-12", mileage: 45000 },
    ],

    lessonTypes: [{ type: "B", count: 450, hours: 1250 }],
  },
  {
    vehicleId: "veh-002",
    licensePlate: "GE 789012",
    totalHours: 1850,
    mileageEvolution: [
      { date: "2024-07", mileage: 68000 },
      { date: "2024-08", mileage: 70500 },
      { date: "2024-09", mileage: 72800 },
      { date: "2024-10", mileage: 74500 },
      { date: "2024-11", mileage: 76200 },
      { date: "2024-12", mileage: 78000 },
    ],

    lessonTypes: [{ type: "B", count: 620, hours: 1850 }],
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getVehicleById(id: string): Vehicle | undefined {
  return MOCK_VEHICLES.find((v) => v.id === id);
}

export function getVehiclesByCategory(category: VehicleCategory): Vehicle[] {
  return MOCK_VEHICLES.filter((v) => v.category === category);
}

export function getVehiclesByStatus(status: VehicleStatus): Vehicle[] {
  return MOCK_VEHICLES.filter((v) => v.status === status);
}

export function getComplianceIssues(vehicle: Vehicle): string[] {
  const issues: string[] = [];
  const now = new Date();

  // Check revision
  const revisionDate = new Date(vehicle.nextRevision);
  const daysToRevision = Math.floor(
    (revisionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysToRevision < 0) issues.push("Révision expirée");
  else if (daysToRevision < 15)
    issues.push("Révision due dans moins de 15 jours");

  // Check insurance
  const insuranceDate = new Date(vehicle.insuranceExpiry);
  const daysToInsurance = Math.floor(
    (insuranceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysToInsurance < 0) issues.push("Assurance expirée - Usage interdit");
  else if (daysToInsurance < 30) issues.push("Assurance expire bientôt");

  // Check expertise
  const expertiseDate = new Date(vehicle.expertiseExpiry);
  const daysToExpertise = Math.floor(
    (expertiseDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysToExpertise < 0) issues.push("Expertise expirée - Usage interdit");

  // Check mileage
  if (vehicle.mileage > 200000)
    issues.push("Kilométrage critique - Contrôle recommandé");

  return issues;
}

export function calculateComplianceStatus(vehicle: Vehicle): ComplianceStatus {
  const issues = getComplianceIssues(vehicle);

  if (issues.some((i) => i.includes("interdit"))) return "non_compliant";
  if (issues.length > 0) return "warning";
  return "compliant";
}
