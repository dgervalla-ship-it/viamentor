/**
 * VIAMENTOR - Revenue Forecast ML Service
 * Service de prévisions revenus avec ML et confidence intervals
 */

import type {
  RevenueDataPoint,
  ForecastDataPoint,
  ScenarioType,
} from "@/viamentor/data/viamentor-financial-analytics-data";

// ============================================================================
// TYPES
// ============================================================================

export interface ForecastConfig {
  historicalData: RevenueDataPoint[];
  monthsAhead: number;
  includeSeasonality: boolean;
  growthRate: number;
  confidenceLevel: number;
}

export interface SeasonalityFactors {
  [month: string]: number;
}

export interface TrendAnalysis {
  slope: number;
  intercept: number;
  r2: number;
}

// ============================================================================
// ML FORECASTING SERVICE
// ============================================================================

/**
 * Calculate linear regression for trend analysis
 */
function calculateLinearRegression(data: number[]): TrendAnalysis {
  const n = data.length;
  const x = Array.from({ length: n }, (_, i) => i);

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R²
  const yMean = sumY / n;
  const ssTotal = data.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
  const ssResidual = data.reduce((sum, yi, i) => {
    const predicted = slope * i + intercept;
    return sum + Math.pow(yi - predicted, 2);
  }, 0);
  const r2 = 1 - ssResidual / ssTotal;

  return { slope, intercept, r2 };
}

/**
 * Calculate seasonality factors from historical data
 */
function calculateSeasonality(data: RevenueDataPoint[]): SeasonalityFactors {
  const monthlyAverages: { [key: string]: number[] } = {};

  // Group by month name
  data.forEach((point) => {
    const monthName = point.month.split(" ")[0]; // "Jan", "Fév", etc.
    const total =
      point.lessons + point.packages + point.theory + point.exams + point.other;

    if (!monthlyAverages[monthName]) {
      monthlyAverages[monthName] = [];
    }
    monthlyAverages[monthName].push(total);
  });

  // Calculate average for each month
  const seasonalityFactors: SeasonalityFactors = {};
  const overallAverage =
    data.reduce((sum, point) => {
      return (
        sum +
        point.lessons +
        point.packages +
        point.theory +
        point.exams +
        point.other
      );
    }, 0) / data.length;

  Object.entries(monthlyAverages).forEach(([month, values]) => {
    const monthAverage = values.reduce((a, b) => a + b, 0) / values.length;
    seasonalityFactors[month] = monthAverage / overallAverage;
  });

  return seasonalityFactors;
}

/**
 * Generate forecast with ML model
 */
export function generateForecast(config: ForecastConfig): ForecastDataPoint[] {
  const {
    historicalData,
    monthsAhead,
    includeSeasonality,
    growthRate,
    confidenceLevel,
  } = config;

  // Extract total revenue from historical data
  const historicalRevenues = historicalData.map(
    (point) =>
      point.lessons + point.packages + point.theory + point.exams + point.other
  );

  // Calculate trend
  const trend = calculateLinearRegression(historicalRevenues);

  // Calculate seasonality if enabled
  const seasonality = includeSeasonality
    ? calculateSeasonality(historicalData)
    : null;

  // Month names for cycling
  const monthNames = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  const lastMonth = historicalData[historicalData.length - 1].month;
  const lastMonthIndex = monthNames.findIndex((m) => lastMonth.startsWith(m));

  // Generate forecast
  const forecast: ForecastDataPoint[] = [];
  const baseIndex = historicalData.length;

  for (let i = 0; i < monthsAhead; i++) {
    const monthIndex = (lastMonthIndex + i + 1) % 12;
    const monthName = monthNames[monthIndex];
    const year = 2025; // Next year

    // Base prediction from trend
    let predicted = trend.slope * (baseIndex + i) + trend.intercept;

    // Apply growth rate
    predicted *= 1 + growthRate / 100;

    // Apply seasonality
    if (seasonality && seasonality[monthName]) {
      predicted *= seasonality[monthName];
    }

    // Calculate expenses (estimated as 70% of revenue based on historical margin)
    const expenses = predicted * 0.7;

    // Calculate confidence interval
    const standardError = Math.sqrt(
      historicalRevenues.reduce((sum, actual, idx) => {
        const predicted = trend.slope * idx + trend.intercept;
        return sum + Math.pow(actual - predicted, 2);
      }, 0) /
        (historicalRevenues.length - 2)
    );

    const confidenceMargin = standardError * (confidenceLevel / 100) * 2;

    // Cumulative cash flow
    const previousCashFlow = i > 0 ? forecast[i - 1].cashFlow : 0;
    const cashFlow = previousCashFlow + (predicted - expenses);

    // Detect events (simplified)
    const events: Array<{ type: string; label: string }> = [];
    if (monthName === "Jan") {
      events.push({ type: "rentree", label: "Rentrée Hiver" });
    } else if (monthName === "Mar") {
      events.push({ type: "promotion", label: "Promo Printemps" });
    } else if (monthName === "Sep") {
      events.push({ type: "rentree", label: "Rentrée Automne" });
    }

    forecast.push({
      month: `${monthName} ${year}`,
      revenueExpected: Math.round(predicted),
      expensesExpected: Math.round(expenses),
      cashFlow: Math.round(cashFlow),
      confidence: Math.round(Math.max(60, 90 - i * 3)), // Confidence decreases over time
      confidenceMin: Math.round(predicted - confidenceMargin),
      confidenceMax: Math.round(predicted + confidenceMargin),
      events: events.length > 0 ? events : undefined,
    });
  }

  return forecast;
}

/**
 * Apply scenario to forecast
 */
export function applyScenario(
  baseForecast: ForecastDataPoint[],
  scenario: ScenarioType
): ForecastDataPoint[] {
  const multipliers: Record<ScenarioType, number> = {
    optimistic: 1.2,
    realistic: 1.0,
    pessimistic: 0.8,
  };

  const multiplier = multipliers[scenario];

  return baseForecast.map((point, index) => {
    const revenueAdjusted = Math.round(point.revenueExpected * multiplier);
    const expensesAdjusted = Math.round(point.expensesExpected * multiplier);
    const previousCashFlow = index > 0 ? baseForecast[index - 1].cashFlow : 0;
    const cashFlowAdjusted = Math.round(
      previousCashFlow + (revenueAdjusted - expensesAdjusted)
    );

    return {
      ...point,
      revenueExpected: revenueAdjusted,
      expensesExpected: expensesAdjusted,
      cashFlow: cashFlowAdjusted,
      confidenceMin: Math.round(point.confidenceMin * multiplier),
      confidenceMax: Math.round(point.confidenceMax * multiplier),
    };
  });
}

/**
 * Detect negative cash flow alerts
 */
export function detectCashFlowAlerts(forecast: ForecastDataPoint[]): Array<{
  month: string;
  balance: number;
  severity: "warning" | "critical";
}> {
  const alerts: Array<{
    month: string;
    balance: number;
    severity: "warning" | "critical";
  }> = [];

  forecast.forEach((point) => {
    if (point.cashFlow < 0) {
      alerts.push({
        month: point.month,
        balance: point.cashFlow,
        severity: point.cashFlow < -10000 ? "critical" : "warning",
      });
    }
  });

  return alerts;
}

/**
 * Calculate forecast accuracy metrics
 */
export function calculateAccuracyMetrics(
  actual: number[],
  predicted: number[]
): {
  mae: number;
  rmse: number;
  mape: number;
} {
  const n = Math.min(actual.length, predicted.length);

  let sumAbsError = 0;
  let sumSquaredError = 0;
  let sumPercentError = 0;

  for (let i = 0; i < n; i++) {
    const error = actual[i] - predicted[i];
    sumAbsError += Math.abs(error);
    sumSquaredError += error * error;
    sumPercentError += Math.abs(error / actual[i]) * 100;
  }

  return {
    mae: sumAbsError / n, // Mean Absolute Error
    rmse: Math.sqrt(sumSquaredError / n), // Root Mean Squared Error
    mape: sumPercentError / n, // Mean Absolute Percentage Error
  };
}

/**
 * Recommend actions based on forecast
 */
export function recommendActions(forecast: ForecastDataPoint[]): string[] {
  const recommendations: string[] = [];

  // Check for negative cash flow
  const negativeMonths = forecast.filter((p) => p.cashFlow < 0);
  if (negativeMonths.length > 0) {
    recommendations.push(
      "Attention: Solde négatif prévu - Envisager promotions ou réduction coûts"
    );
  }

  // Check for declining trend
  const revenues = forecast.map((p) => p.revenueExpected);
  const trend = calculateLinearRegression(revenues);
  if (trend.slope < 0) {
    recommendations.push(
      "Tendance baissière détectée - Intensifier marketing et acquisition"
    );
  }

  // Check for low confidence
  const lowConfidence = forecast.filter((p) => p.confidence < 70);
  if (lowConfidence.length > 0) {
    recommendations.push(
      "Confiance faible sur certains mois - Surveiller indicateurs avancés"
    );
  }

  // Check for high expenses ratio
  const avgExpenseRatio =
    forecast.reduce(
      (sum, p) => sum + p.expensesExpected / p.revenueExpected,
      0
    ) / forecast.length;
  if (avgExpenseRatio > 0.75) {
    recommendations.push(
      "Ratio dépenses élevé (>75%) - Optimiser coûts opérationnels"
    );
  }

  return recommendations;
}

export default {
  generateForecast,
  applyScenario,
  detectCashFlowAlerts,
  calculateAccuracyMetrics,
  recommendActions,
};
