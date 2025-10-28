/**
 * VIAMENTOR - Maintenance Costs Analytics Component
 * Analytics des coûts de maintenance avec graphiques et statistiques détaillées
 */

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  EuroIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  WrenchIcon,
  AlertTriangleIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  MaintenanceTask,
  MaintenanceCostSummary,
} from "@/viamentor/data/viamentor-maintenance-data";

// ============================================================================
// TYPES
// ============================================================================

interface MaintenanceCostsAnalyticsProps {
  tasks: MaintenanceTask[];
  className?: string;
}

interface MonthlyData {
  month: string;
  preventive: number;
  corrective: number;
  inspection: number;
  repair: number;
  total: number;
}

interface TypeDistribution {
  name: string;
  value: number;
  color: string;
}

// ============================================================================
// HELPERS
// ============================================================================

const COLORS = {
  preventive: "hsl(var(--chart-1))",
  corrective: "hsl(var(--chart-2))",
  inspection: "hsl(var(--chart-3))",
  repair: "hsl(var(--chart-4))",
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatMonth = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date);
};

// ============================================================================
// COMPONENT
// ============================================================================

export function MaintenanceCostsAnalytics({
  tasks,
  className,
}: MaintenanceCostsAnalyticsProps) {
  // Calculate monthly costs
  const monthlyData = useMemo(() => {
    const dataMap = new Map<string, MonthlyData>();

    tasks.forEach((task) => {
      const date = new Date(task.dueDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!dataMap.has(monthKey)) {
        dataMap.set(monthKey, {
          month: formatMonth(task.dueDate),
          preventive: 0,
          corrective: 0,
          inspection: 0,
          repair: 0,
          total: 0,
        });
      }

      const data = dataMap.get(monthKey)!;
      data[task.type as keyof Omit<MonthlyData, "month" | "total">] +=
        task.cost;
      data.total += task.cost;
    });

    return Array.from(dataMap.values()).slice(-6); // Last 6 months
  }, [tasks]);

  // Calculate type distribution
  const typeDistribution = useMemo(() => {
    const distribution: Record<string, number> = {
      preventive: 0,
      corrective: 0,
      inspection: 0,
      repair: 0,
    };

    tasks.forEach((task) => {
      distribution[task.type] += task.cost;
    });

    return [
      {
        name: "Préventif",
        value: distribution.preventive,
        color: COLORS.preventive,
      },
      {
        name: "Correctif",
        value: distribution.corrective,
        color: COLORS.corrective,
      },
      {
        name: "Inspection",
        value: distribution.inspection,
        color: COLORS.inspection,
      },
      { name: "Réparation", value: distribution.repair, color: COLORS.repair },
    ].filter((item) => item.value > 0);
  }, [tasks]);

  // Calculate summary stats
  const summary = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "completed");
    const totalCost = completed.reduce((sum, t) => sum + t.cost, 0);
    const avgCost = completed.length > 0 ? totalCost / completed.length : 0;

    const lastMonth = completed.filter((t) => {
      const date = new Date(t.dueDate);
      const now = new Date();
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return date >= lastMonthDate;
    });

    const lastMonthCost = lastMonth.reduce((sum, t) => sum + t.cost, 0);

    const previousMonth = completed.filter((t) => {
      const date = new Date(t.dueDate);
      const now = new Date();
      const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return date >= prevMonthDate && date < lastMonthDate;
    });

    const previousMonthCost = previousMonth.reduce((sum, t) => sum + t.cost, 0);
    const trend =
      previousMonthCost > 0
        ? ((lastMonthCost - previousMonthCost) / previousMonthCost) * 100
        : 0;

    return {
      totalCost,
      avgCost,
      lastMonthCost,
      trend,
      completedCount: completed.length,
    };
  }, [tasks]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Coût Total</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(summary.totalCost)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <EuroIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Coût Moyen</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(summary.avgCost)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <WrenchIcon className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mois Dernier</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(summary.lastMonthCost)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <ClipboardCheckIcon className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tendance</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold">
                    {Math.abs(summary.trend).toFixed(1)}%
                  </p>
                  {summary.trend > 0 ? (
                    <TrendingUpIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <TrendingDownIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center",
                  summary.trend > 0 ? "bg-red-500/10" : "bg-green-500/10"
                )}
              >
                {summary.trend > 0 ? (
                  <AlertTriangleIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <TrendingDownIcon className="h-6 w-6 text-green-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Costs Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Coûts Mensuels par Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />

                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />

                <Legend />

                <Bar
                  dataKey="preventive"
                  name="Préventif"
                  fill={COLORS.preventive}
                  stackId="a"
                />

                <Bar
                  dataKey="corrective"
                  name="Correctif"
                  fill={COLORS.corrective}
                  stackId="a"
                />

                <Bar
                  dataKey="inspection"
                  name="Inspection"
                  fill={COLORS.inspection}
                  stackId="a"
                />

                <Bar
                  dataKey="repair"
                  name="Réparation"
                  fill={COLORS.repair}
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Type Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Répartition par Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cumulative Costs Line Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Évolution Cumulative des Coûts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData.map((item, index, arr) => ({
                  ...item,
                  cumulative: arr
                    .slice(0, index + 1)
                    .reduce((sum, d) => sum + d.total, 0),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />

                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />

                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="total"
                  name="Mensuel"
                  stroke={COLORS.preventive}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="cumulative"
                  name="Cumulé"
                  stroke={COLORS.corrective}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
