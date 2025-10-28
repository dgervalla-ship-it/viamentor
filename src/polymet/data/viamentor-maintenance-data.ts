/**
 * VIAMENTOR - Maintenance Management Data
 * Mock data et types pour gestion maintenance véhicules
 */

"use client";

// ============================================================================
// TYPES
// ============================================================================

export type MaintenanceType =
  | "preventive"
  | "corrective"
  | "inspection"
  | "repair";
export type MaintenanceStatus =
  | "scheduled"
  | "in_progress"
  | "completed"
  | "overdue"
  | "cancelled";
export type MaintenancePriority = "low" | "medium" | "high" | "critical";
export type MaintenanceCategory =
  | "oil_change"
  | "tire_rotation"
  | "brake_service"
  | "engine"
  | "transmission"
  | "electrical"
  | "bodywork"
  | "inspection"
  | "other";

export interface MaintenanceTask {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  type: MaintenanceType;
  category: MaintenanceCategory;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;

  // Planning
  scheduledDate: string;
  dueDate: string;
  completedDate?: string;
  estimatedDuration: number; // minutes
  actualDuration?: number;

  // Triggers
  triggerType: "mileage" | "time" | "both" | "manual";
  triggerMileage?: number;
  currentMileage?: number;
  triggerInterval?: number; // days

  // Costs
  estimatedCost: number;
  actualCost?: number;
  laborCost?: number;
  partsCost?: number;

  // Assignment
  assignedTo?: string;
  garage?: string;
  garageAddress?: string;

  // Parts
  parts?: MaintenancePart[];

  // Documentation
  notes?: string;
  attachments?: string[];
  invoiceUrl?: string;

  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export interface MaintenancePart {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  supplier?: string;
  warrantyMonths?: number;
}

export interface MaintenanceSchedule {
  id: string;
  vehicleId: string;
  category: MaintenanceCategory;
  title: string;
  description: string;
  intervalType: "mileage" | "time" | "both";
  intervalMileage?: number;
  intervalDays?: number;
  lastPerformedDate?: string;
  lastPerformedMileage?: number;
  nextDueDate?: string;
  nextDueMileage?: number;
  estimatedCost: number;
  isActive: boolean;
}

export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  taskId?: string;
  type: "overdue" | "due_soon" | "mileage_threshold" | "inspection_required";
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
  dueDate?: string;
  dueMileage?: number;
  currentMileage?: number;
  daysOverdue?: number;
  createdAt: string;
  isRead: boolean;
  isResolved: boolean;
}

export interface MaintenanceCostSummary {
  period: string;
  totalCost: number;
  preventiveCost: number;
  correctiveCost: number;
  laborCost: number;
  partsCost: number;
  taskCount: number;
  averageCostPerTask: number;
  costPerKm: number;
}

export interface VehicleMaintenanceStats {
  vehicleId: string;
  vehicleName: string;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  totalCost: number;
  averageCostPerTask: number;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  maintenanceScore: number; // 0-100
  reliability: "excellent" | "good" | "fair" | "poor";
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: "maint-001",
    vehicleId: "veh-001",
    vehicleName: "VW Golf 8",
    vehiclePlate: "VD 123456",
    type: "preventive",
    category: "oil_change",
    title: "Vidange moteur",
    description: "Vidange huile moteur + filtre à huile + contrôle niveaux",
    status: "scheduled",
    priority: "medium",
    scheduledDate: "2025-01-20T09:00:00Z",
    dueDate: "2025-01-20T09:00:00Z",
    estimatedDuration: 60,
    triggerType: "both",
    triggerMileage: 15000,
    currentMileage: 14850,
    triggerInterval: 365,
    estimatedCost: 180,
    assignedTo: "Garage Central SA",
    garage: "Garage Central SA",
    garageAddress: "Route de Lausanne 45, 1020 Renens",
    parts: [
      {
        id: "part-001",
        name: "Huile moteur 5W30",
        partNumber: "OIL-5W30-5L",
        quantity: 5,
        unitPrice: 12,
        totalPrice: 60,
        supplier: "Castrol",
        warrantyMonths: 12,
      },
    ],

    notes: "Vérifier également l'état des freins",
    createdAt: "2024-12-15T10:00:00Z",
    createdBy: "admin",
    updatedAt: "2024-12-15T10:00:00Z",
  },
];

export const mockMaintenanceAlerts: MaintenanceAlert[] = [
  {
    id: "alert-001",
    vehicleId: "veh-001",
    vehicleName: "VW Golf 8 (VD 123456)",
    taskId: "maint-003",
    type: "overdue",
    severity: "critical",
    title: "Contrôle technique en retard",
    message: "Le contrôle technique est en retard de 5 jours.",
    dueDate: "2025-01-10T10:00:00Z",
    daysOverdue: 5,
    createdAt: "2025-01-11T00:00:00Z",
    isRead: false,
    isResolved: false,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getMaintenanceStatusColor(status: MaintenanceStatus): string {
  const colors: Record<MaintenanceStatus, string> = {
    scheduled: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
    in_progress:
      "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
    completed:
      "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950",
    overdue: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
    cancelled: "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950",
  };
  return colors[status];
}

export function getMaintenancePriorityColor(
  priority: MaintenancePriority
): string {
  const colors: Record<MaintenancePriority, string> = {
    low: "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950",
    medium: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
    high: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
    critical: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
  };
  return colors[priority];
}

export function getMaintenanceTypeColor(type: MaintenanceType): string {
  const colors: Record<MaintenanceType, string> = {
    preventive:
      "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950",
    corrective:
      "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
    inspection: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
    repair: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
  };
  return colors[type];
}

// ============================================================================
// VEHICLE STATUS SYNCHRONIZATION
// ============================================================================

/**
 * Synchronise le statut du véhicule avec les tâches de maintenance
 * Met à jour Vehicle.status = "maintenance" quand une tâche est en cours
 */
export function syncVehicleMaintenanceStatus(
  vehicleId: string,
  tasks: MaintenanceTask[]
): "available" | "maintenance" {
  const activeTasks = tasks.filter(
    (task) =>
      task.vehicleId === vehicleId &&
      (task.status === "in_progress" || task.status === "scheduled")
  );

  return activeTasks.length > 0 ? "maintenance" : "available";
}

/**
 * Hook pour mettre à jour le statut du véhicule lors de changements de tâche
 */
export function updateVehicleStatusOnTaskChange(
  task: MaintenanceTask,
  newStatus: MaintenanceStatus
): void {
  // Simuler l'appel API pour mettre à jour le statut du véhicule
  console.log(
    `[Vehicle Status Sync] Updating vehicle ${task.vehicleId} status based on task ${task.id} status change to ${newStatus}`
  );

  // En production, ceci serait un appel API:
  // await updateVehicleStatus(task.vehicleId, newStatus === 'in_progress' ? 'maintenance' : 'available');
}

/**
 * Vérifie si un véhicule peut être utilisé pour une leçon
 */
export function isVehicleAvailableForLesson(
  vehicleId: string,
  tasks: MaintenanceTask[]
): { available: boolean; reason?: string } {
  const activeTasks = tasks.filter(
    (task) =>
      task.vehicleId === vehicleId &&
      (task.status === "in_progress" || task.status === "scheduled")
  );

  if (activeTasks.length === 0) {
    return { available: true };
  }

  const criticalTask = activeTasks.find(
    (task) => task.priority === "critical" || task.status === "in_progress"
  );

  if (criticalTask) {
    return {
      available: false,
      reason: `Véhicule en maintenance: ${criticalTask.title}`,
    };
  }

  return { available: true };
}
