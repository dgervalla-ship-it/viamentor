/**
 * VIAMENTOR - Maintenance TCO Analytics & ML Predictions
 * Analytics avancées coût total de possession et prédictions ML
 */

"use client";

import type { Vehicle } from "./viamentor-vehicles-data";
import type { MaintenanceTask } from "./viamentor-maintenance-data";

// ============================================================================
// TYPES
// ============================================================================

export interface TCOAnalysis {
  vehicleId: string;
  vehicleName: string;
  period: "month" | "year" | "lifetime";

  // Coûts
  acquisitionCost: number;
  maintenanceCost: number;
  fuelCost: number;
  insuranceCost: number;
  taxCost: number;
  depreciationCost: number;
  totalCost: number;

  // Métriques
  costPerKm: number;
  costPerDay: number;
  costPerLesson: number;

  // Comparaisons
  averageTCO: number;
  percentileRank: number; // 0-100
  efficiency: "excellent" | "good" | "average" | "poor";
}

export interface TCOComparison {
  vehicles: TCOAnalysis[];
  bestPerformer: string;
  worstPerformer: string;
  averageCostPerKm: number;
  totalFleetCost: number;
}

export interface MaintenancePrediction {
  vehicleId: string;
  vehicleName: string;
  predictions: Prediction[];
  riskScore: number; // 0-100
  recommendedActions: string[];
  estimatedCostNextYear: number;
}

export interface Prediction {
  type: "breakdown" | "maintenance" | "replacement";
  component: string;
  probability: number; // 0-100
  estimatedDate: string;
  estimatedCost: number;
  severity: "low" | "medium" | "high" | "critical";
  confidence: number; // 0-100
  factors: string[];
}

export interface MLModel {
  name: string;
  version: string;
  accuracy: number;
  lastTrained: string;
  features: string[];
}

export interface CostTrend {
  month: string;
  maintenance: number;
  fuel: number;
  insurance: number;
  total: number;
}

export interface VehicleHealthScore {
  vehicleId: string;
  overallScore: number; // 0-100
  maintenanceScore: number;
  reliabilityScore: number;
  efficiencyScore: number;
  complianceScore: number;
  trend: "improving" | "stable" | "declining";
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockTCOAnalyses: TCOAnalysis[] = [
  {
    vehicleId: "veh-001",
    vehicleName: "VW Golf 8 (VD 123456)",
    period: "year",
    acquisitionCost: 35000,
    maintenanceCost: 3500,
    fuelCost: 4200,
    insuranceCost: 1800,
    taxCost: 450,
    depreciationCost: 7000,
    totalCost: 51950,
    costPerKm: 0.58,
    costPerDay: 142,
    costPerLesson: 42,
    averageTCO: 48000,
    percentileRank: 65,
    efficiency: "good",
  },
  {
    vehicleId: "veh-002",
    vehicleName: "BMW 320d (GE 789012)",
    period: "year",
    acquisitionCost: 48000,
    maintenanceCost: 5200,
    fuelCost: 5800,
    insuranceCost: 2400,
    taxCost: 600,
    depreciationCost: 9600,
    totalCost: 71600,
    costPerKm: 0.92,
    costPerDay: 196,
    costPerLesson: 58,
    averageTCO: 48000,
    percentileRank: 35,
    efficiency: "average",
  },
  {
    vehicleId: "veh-003",
    vehicleName: "Audi A3 (BE 345678)",
    period: "year",
    acquisitionCost: 42000,
    maintenanceCost: 1800,
    fuelCost: 3200,
    insuranceCost: 2000,
    taxCost: 500,
    depreciationCost: 8400,
    totalCost: 57900,
    costPerKm: 0.64,
    costPerDay: 159,
    costPerLesson: 47,
    averageTCO: 48000,
    percentileRank: 55,
    efficiency: "good",
  },
];

export const mockMaintenancePredictions: MaintenancePrediction[] = [
  {
    vehicleId: "veh-002",
    vehicleName: "BMW 320d (GE 789012)",
    riskScore: 72,
    estimatedCostNextYear: 6800,
    recommendedActions: [
      "Planifier remplacement plaquettes de frein (3 mois)",
      "Surveiller niveau huile moteur (mensuel)",
      "Vérifier système de refroidissement (1 mois)",
      "Prévoir révision complète (2 mois)",
    ],

    predictions: [
      {
        type: "maintenance",
        component: "Plaquettes de frein avant",
        probability: 85,
        estimatedDate: "2025-04-15",
        estimatedCost: 450,
        severity: "medium",
        confidence: 92,
        factors: [
          "Kilométrage élevé (78'000 km)",
          "Historique: dernier changement à 50'000 km",
          "Usage intensif (leçons quotidiennes)",
        ],
      },
      {
        type: "breakdown",
        component: "Batterie",
        probability: 65,
        estimatedDate: "2025-06-20",
        estimatedCost: 280,
        severity: "high",
        confidence: 78,
        factors: [
          "Âge: 4 ans",
          "Démarrages difficiles récents",
          "Température hivernale",
        ],
      },
      {
        type: "replacement",
        component: "Pneus",
        probability: 55,
        estimatedDate: "2025-08-10",
        estimatedCost: 800,
        severity: "medium",
        confidence: 85,
        factors: [
          "Profondeur actuelle: 3.5mm",
          "Usure régulière observée",
          "Kilométrage prévu: +15'000 km",
        ],
      },
    ],
  },
  {
    vehicleId: "veh-005",
    vehicleName: "Mercedes Sprinter (FR 567890)",
    riskScore: 88,
    estimatedCostNextYear: 12500,
    recommendedActions: [
      "Inspection complète urgente (immédiat)",
      "Remplacement système de freinage (1 mois)",
      "Révision transmission (2 mois)",
      "Évaluer remplacement véhicule",
    ],

    predictions: [
      {
        type: "breakdown",
        component: "Transmission",
        probability: 78,
        estimatedDate: "2025-03-01",
        estimatedCost: 4500,
        severity: "critical",
        confidence: 88,
        factors: [
          "Kilométrage critique (125'000 km)",
          "Bruits anormaux signalés",
          "Historique: réparations fréquentes",
        ],
      },
      {
        type: "maintenance",
        component: "Système de freinage",
        probability: 92,
        estimatedDate: "2025-02-15",
        estimatedCost: 1200,
        severity: "critical",
        confidence: 95,
        factors: [
          "Inspection révèle usure avancée",
          "Sécurité compromise",
          "Usage intensif véhicule lourd",
        ],
      },
    ],
  },
];

export const mockCostTrends: CostTrend[] = [
  {
    month: "2024-07",
    maintenance: 2800,
    fuel: 3200,
    insurance: 1500,
    total: 7500,
  },
  {
    month: "2024-08",
    maintenance: 3200,
    fuel: 3400,
    insurance: 1500,
    total: 8100,
  },
  {
    month: "2024-09",
    maintenance: 4500,
    fuel: 3600,
    insurance: 1500,
    total: 9600,
  },
  {
    month: "2024-10",
    maintenance: 2900,
    fuel: 3800,
    insurance: 1500,
    total: 8200,
  },
  {
    month: "2024-11",
    maintenance: 3800,
    fuel: 4000,
    insurance: 1500,
    total: 9300,
  },
  {
    month: "2024-12",
    maintenance: 5200,
    fuel: 4200,
    insurance: 1500,
    total: 10900,
  },
];

export const mockVehicleHealthScores: VehicleHealthScore[] = [
  {
    vehicleId: "veh-001",
    overallScore: 85,
    maintenanceScore: 88,
    reliabilityScore: 90,
    efficiencyScore: 82,
    complianceScore: 95,
    trend: "stable",
  },
  {
    vehicleId: "veh-002",
    overallScore: 72,
    maintenanceScore: 68,
    reliabilityScore: 75,
    efficiencyScore: 70,
    complianceScore: 85,
    trend: "declining",
  },
  {
    vehicleId: "veh-003",
    overallScore: 92,
    maintenanceScore: 95,
    reliabilityScore: 94,
    efficiencyScore: 88,
    complianceScore: 98,
    trend: "improving",
  },
];

export const mockMLModel: MLModel = {
  name: "MaintenancePredictorV2",
  version: "2.1.0",
  accuracy: 87.5,
  lastTrained: "2025-01-01T00:00:00Z",
  features: [
    "mileage",
    "age",
    "maintenance_history",
    "usage_intensity",
    "brand_reliability",
    "seasonal_factors",
    "driver_behavior",
  ],
};

// ============================================================================
// TCO CALCULATIONS
// ============================================================================

/**
 * Calcule le TCO complet d'un véhicule
 */
export function calculateTCO(
  vehicle: Vehicle,
  maintenanceTasks: MaintenanceTask[],
  period: "month" | "year" | "lifetime" = "year"
): TCOAnalysis {
  const vehicleTasks = maintenanceTasks.filter(
    (task) => task.vehicleId === vehicle.id && task.status === "completed"
  );

  const maintenanceCost = vehicleTasks.reduce(
    (sum, task) => sum + (task.actualCost || task.estimatedCost),
    0
  );

  // Estimations basées sur moyennes suisses
  const fuelCostPerKm = 0.12; // CHF/km
  const fuelCost = vehicle.mileage * fuelCostPerKm;

  const insuranceCost = vehicle.category === "B" ? 1800 : 1200;
  const taxCost = 450;

  // Dépréciation: 20% par an
  const acquisitionCost = 35000; // Estimation
  const yearsOld = new Date().getFullYear() - vehicle.year;
  const depreciationRate = Math.min(yearsOld * 0.2, 0.8);
  const depreciationCost = acquisitionCost * depreciationRate;

  const totalCost =
    acquisitionCost +
    maintenanceCost +
    fuelCost +
    insuranceCost +
    taxCost +
    depreciationCost;

  const costPerKm = totalCost / vehicle.mileage;
  const costPerDay = totalCost / (yearsOld * 365 || 365);
  const costPerLesson = totalCost / (vehicle.totalHours / 1.5); // 1.5h par leçon

  return {
    vehicleId: vehicle.id,
    vehicleName: `${vehicle.brand} ${vehicle.model} (${vehicle.licensePlate})`,
    period,
    acquisitionCost,
    maintenanceCost,
    fuelCost,
    insuranceCost,
    taxCost,
    depreciationCost,
    totalCost: Math.round(totalCost),
    costPerKm: Math.round(costPerKm * 100) / 100,
    costPerDay: Math.round(costPerDay),
    costPerLesson: Math.round(costPerLesson),
    averageTCO: 48000,
    percentileRank: 50,
    efficiency: totalCost < 48000 ? "good" : "average",
  };
}

/**
 * Compare les TCO de plusieurs véhicules
 */
export function compareTCO(analyses: TCOAnalysis[]): TCOComparison {
  const sorted = [...analyses].sort((a, b) => a.totalCost - b.totalCost);

  return {
    vehicles: analyses,
    bestPerformer: sorted[0].vehicleId,
    worstPerformer: sorted[sorted.length - 1].vehicleId,
    averageCostPerKm:
      analyses.reduce((sum, a) => sum + a.costPerKm, 0) / analyses.length,
    totalFleetCost: analyses.reduce((sum, a) => sum + a.totalCost, 0),
  };
}

// ============================================================================
// ML PREDICTIONS
// ============================================================================

/**
 * Prédit les pannes et maintenances futures (simulation ML)
 */
export function predictMaintenanceNeeds(
  vehicle: Vehicle,
  maintenanceTasks: MaintenanceTask[]
): MaintenancePrediction {
  // Facteurs de risque
  const ageRisk = (new Date().getFullYear() - vehicle.year) * 10;
  const mileageRisk = Math.min((vehicle.mileage / 200000) * 100, 100);
  const maintenanceRisk =
    maintenanceTasks.filter((t) => t.status === "overdue").length * 15;

  const riskScore = Math.min(
    Math.round((ageRisk + mileageRisk + maintenanceRisk) / 3),
    100
  );

  // Prédictions basées sur le risque
  const predictions: Prediction[] = [];

  if (vehicle.mileage > 50000) {
    predictions.push({
      type: "maintenance",
      component: "Plaquettes de frein",
      probability: Math.min(60 + (vehicle.mileage - 50000) / 1000, 95),
      estimatedDate: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ).toISOString(),
      estimatedCost: 450,
      severity: "medium",
      confidence: 85,
      factors: ["Kilométrage élevé", "Usure normale"],
    });
  }

  if (vehicle.year < 2020) {
    predictions.push({
      type: "breakdown",
      component: "Batterie",
      probability: 70,
      estimatedDate: new Date(
        Date.now() + 120 * 24 * 60 * 60 * 1000
      ).toISOString(),
      estimatedCost: 280,
      severity: "high",
      confidence: 75,
      factors: ["Âge du véhicule", "Conditions hivernales"],
    });
  }

  const estimatedCostNextYear = predictions.reduce(
    (sum, p) => sum + p.estimatedCost * (p.probability / 100),
    0
  );

  return {
    vehicleId: vehicle.id,
    vehicleName: `${vehicle.brand} ${vehicle.model} (${vehicle.licensePlate})`,
    predictions,
    riskScore,
    recommendedActions: generateRecommendations(riskScore, predictions),
    estimatedCostNextYear: Math.round(estimatedCostNextYear),
  };
}

/**
 * Génère des recommandations basées sur les prédictions
 */
function generateRecommendations(
  riskScore: number,
  predictions: Prediction[]
): string[] {
  const recommendations: string[] = [];

  if (riskScore > 80) {
    recommendations.push("⚠️ Risque élevé - Inspection complète recommandée");
  }

  predictions
    .filter((p) => p.probability > 70)
    .forEach((p) => {
      const months = Math.ceil(
        (new Date(p.estimatedDate).getTime() - Date.now()) /
          (30 * 24 * 60 * 60 * 1000)
      );
      recommendations.push(
        `Planifier ${p.component} dans ${months} mois (${p.probability}% probabilité)`
      );
    });

  if (recommendations.length === 0) {
    recommendations.push("✅ Aucune action urgente requise");
  }

  return recommendations;
}

/**
 * Calcule le score de santé global d'un véhicule
 */
export function calculateHealthScore(
  vehicle: Vehicle,
  maintenanceTasks: MaintenanceTask[]
): VehicleHealthScore {
  // Score maintenance (basé sur historique)
  const completedTasks = maintenanceTasks.filter(
    (t) => t.vehicleId === vehicle.id && t.status === "completed"
  ).length;
  const overdueTasks = maintenanceTasks.filter(
    (t) => t.vehicleId === vehicle.id && t.status === "overdue"
  ).length;
  const maintenanceScore = Math.max(
    0,
    100 - overdueTasks * 20 + completedTasks * 2
  );

  // Score fiabilité (basé sur âge et kilométrage)
  const ageScore = Math.max(
    0,
    100 - (new Date().getFullYear() - vehicle.year) * 10
  );
  const mileageScore = Math.max(0, 100 - vehicle.mileage / 2000);
  const reliabilityScore = Math.round((ageScore + mileageScore) / 2);

  // Score efficacité (basé sur disponibilité)
  const efficiencyScore = vehicle.availabilityRate;

  // Score conformité
  const complianceScore =
    vehicle.complianceStatus === "compliant"
      ? 100
      : vehicle.complianceStatus === "warning"
        ? 70
        : 30;

  const overallScore = Math.round(
    (maintenanceScore + reliabilityScore + efficiencyScore + complianceScore) /
      4
  );

  return {
    vehicleId: vehicle.id,
    overallScore,
    maintenanceScore: Math.min(maintenanceScore, 100),
    reliabilityScore,
    efficiencyScore,
    complianceScore,
    trend:
      overallScore > 80 ? "stable" : overallScore > 60 ? "stable" : "declining",
  };
}
