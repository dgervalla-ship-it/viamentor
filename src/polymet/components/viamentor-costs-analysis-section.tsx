/**
 * VIAMENTOR - Costs Analysis Section
 * Analyse coûts avec breakdown, table, évolution et top coûteux
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangleIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  VehicleCosts,
  VehiclesAnalyticsLocale,
} from "@/polymet/data/viamentor-vehicles-analytics-data";
import { getVehiclesAnalyticsTranslations } from "@/polymet/data/viamentor-vehicles-analytics-i18n";

interface CostsAnalysisSectionProps {
  costs: VehicleCosts[];
  locale?: VehiclesAnalyticsLocale;
}

export function CostsAnalysisSection({
  costs,
  locale = "fr",
}: CostsAnalysisSectionProps) {
  const t = getVehiclesAnalyticsTranslations(locale);

  // Total costs breakdown
  const totalBreakdown = costs.reduce(
    (acc, c) => ({
      maintenance: acc.maintenance + c.breakdown.maintenance,
      fuel: acc.fuel + c.breakdown.fuel,
      insurance: acc.insurance + c.breakdown.insurance,
      depreciation: acc.depreciation + c.breakdown.depreciation,
      other: acc.other + c.breakdown.other,
    }),
    { maintenance: 0, fuel: 0, insurance: 0, depreciation: 0, other: 0 }
  );

  const pieData = [
    {
      name: t.costs.breakdown.maintenance,
      value: totalBreakdown.maintenance,
      color: "hsl(var(--chart-1))",
    },
    {
      name: t.costs.breakdown.fuel,
      value: totalBreakdown.fuel,
      color: "hsl(var(--chart-2))",
    },
    {
      name: t.costs.breakdown.insurance,
      value: totalBreakdown.insurance,
      color: "hsl(var(--chart-3))",
    },
    {
      name: t.costs.breakdown.depreciation,
      value: totalBreakdown.depreciation,
      color: "hsl(var(--chart-4))",
    },
    {
      name: t.costs.breakdown.other,
      value: totalBreakdown.other,
      color: "hsl(var(--chart-5))",
    },
  ];

  // Top 5 expensive
  const topExpensive = [...costs]
    .sort((a, b) => b.totalCosts - a.totalCosts)
    .slice(0, 5);

  // Evolution data (combine all vehicles)
  const evolutionData =
    costs[0]?.monthlyHistory.map((_, index) => {
      const monthData: any = { month: costs[0].monthlyHistory[index].month };
      costs.forEach((c) => {
        monthData[c.plate] = c.monthlyHistory[index].costs;
      });
      return monthData;
    }) || [];

  const getROIBadge = (roi: number) => {
    if (roi > 200) return <Badge className="bg-green-500">{roi}%</Badge>;

    if (roi > 100) return <Badge className="bg-blue-500">{roi}%</Badge>;

    if (roi > 0) return <Badge className="bg-yellow-500">{roi}%</Badge>;

    return <Badge variant="destructive">{roi}%</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Breakdown PieChart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.costs.breakdown.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Table détail */}
      <Card>
        <CardHeader>
          <CardTitle>{t.costs.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium">
                    {t.costs.table.plate}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.costs.table.totalCosts}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.costs.table.costPerKm}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.costs.table.costPerHour}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.costs.table.km}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.costs.table.hours}
                  </th>
                  <th className="text-center p-3 text-sm font-medium">
                    {t.costs.table.roi}
                  </th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost) => (
                  <tr
                    key={cost.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-3 font-bold">{cost.plate}</td>
                    <td className="p-3 text-right">
                      CHF {cost.totalCosts.toLocaleString(locale)}
                    </td>
                    <td className="p-3 text-right">
                      CHF {cost.costPerKm.toFixed(2)}
                    </td>
                    <td className="p-3 text-right">
                      CHF {cost.costPerHour.toFixed(2)}
                    </td>
                    <td className="p-3 text-right">
                      {cost.kmDriven.toLocaleString(locale)}
                    </td>
                    <td className="p-3 text-right">{cost.hoursUsed}h</td>
                    <td className="p-3 text-center">{getROIBadge(cost.roi)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* LineChart Evolution */}
      <Card>
        <CardHeader>
          <CardTitle>{t.costs.evolution.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              {costs.map((c, index) => (
                <Line
                  key={c.id}
                  type="monotone"
                  dataKey={c.plate}
                  stroke={`hsl(var(--chart-${(index % 5) + 1}))`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top 5 Expensive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-orange-500" />

            {t.costs.expensive.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t.costs.expensive.subtitle}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topExpensive.map((cost, index) => (
              <div
                key={cost.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-bold">{cost.plate}</div>
                    <div className="text-sm text-muted-foreground">
                      {cost.kmDriven.toLocaleString(locale)} km •{" "}
                      {cost.hoursUsed}h
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    CHF {cost.totalCosts.toLocaleString(locale)}
                  </div>
                  {cost.roi < 100 && (
                    <div className="text-xs text-orange-500">
                      {t.costs.expensive.consider}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
