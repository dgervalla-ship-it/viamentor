/**
 * VIAMENTOR - Fuel Consumption Section
 * Consommation carburant avec moyenne, table et trends
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GaugeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "lucide-react";
import {
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
  FuelConsumption,
  VehiclesAnalyticsLocale,
} from "@/polymet/data/viamentor-vehicles-analytics-data";
import { getVehiclesAnalyticsTranslations } from "@/polymet/data/viamentor-vehicles-analytics-i18n";

interface FuelConsumptionSectionProps {
  consumption: FuelConsumption[];
  locale?: VehiclesAnalyticsLocale;
}

export function FuelConsumptionSection({
  consumption,
  locale = "fr",
}: FuelConsumptionSectionProps) {
  const t = getVehiclesAnalyticsTranslations(locale);

  const avgConsumption =
    consumption.reduce((acc, c) => acc + c.avgConsumption, 0) /
    consumption.length;
  const ecoTarget = 6.0; // L/100km

  // Chart data
  const chartData =
    consumption[0]?.monthlyHistory.map((_, index) => {
      const monthData: any = {
        month: consumption[0].monthlyHistory[index].month,
      };
      consumption.forEach((c) => {
        monthData[c.plate] = c.monthlyHistory[index].consumption;
      });
      return monthData;
    }) || [];

  const getTrendIcon = (trend: FuelConsumption["trend"]) => {
    if (trend === "up")
      return <TrendingUpIcon className="h-4 w-4 text-red-500" />;

    if (trend === "down")
      return <TrendingDownIcon className="h-4 w-4 text-green-500" />;

    return <MinusIcon className="h-4 w-4 text-gray-500" />;
  };

  const getStatusBadge = (efficient: boolean) => {
    return efficient ? (
      <Badge className="bg-green-500">{t.fuel.status.efficient}</Badge>
    ) : (
      <Badge className="bg-red-500">{t.fuel.status.inefficient}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Average Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GaugeIcon className="h-5 w-5" />

            {t.fuel.avgCard.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold">
                {avgConsumption.toFixed(1)} L/100km
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {t.fuel.avgCard.target}: {ecoTarget} L/100km
              </div>
            </div>
            <div
              className={`text-6xl ${avgConsumption <= ecoTarget ? "text-green-500" : "text-orange-500"}`}
            >
              {avgConsumption <= ecoTarget ? "✓" : "!"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.fuel.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium">
                    {t.fuel.table.plate}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.fuel.table.vehicle}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.fuel.table.consumption}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.fuel.table.liters}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.fuel.table.cost}
                  </th>
                  <th className="text-center p-3 text-sm font-medium">
                    {t.fuel.table.trend}
                  </th>
                  <th className="text-center p-3 text-sm font-medium">
                    {t.fuel.table.status}
                  </th>
                </tr>
              </thead>
              <tbody>
                {consumption.map((fuel) => (
                  <tr
                    key={fuel.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-3 font-bold">{fuel.plate}</td>
                    <td className="p-3 text-sm">
                      {fuel.brand} {fuel.model}
                    </td>
                    <td className="p-3 text-right font-medium">
                      {fuel.avgConsumption.toFixed(1)} L/100km
                    </td>
                    <td className="p-3 text-right">
                      {fuel.totalLiters.toLocaleString(locale)} L
                    </td>
                    <td className="p-3 text-right">
                      CHF {fuel.totalCost.toLocaleString(locale)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(fuel.trend)}
                        <span
                          className={`text-sm ${
                            fuel.trend === "up"
                              ? "text-red-500"
                              : fuel.trend === "down"
                                ? "text-green-500"
                                : "text-gray-500"
                          }`}
                        >
                          {fuel.trendPercent > 0 ? "+" : ""}
                          {fuel.trendPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      {getStatusBadge(fuel.efficient)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* LineChart Trends */}
      <Card>
        <CardHeader>
          <CardTitle>{t.fuel.chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis
                label={{ value: "L/100km", angle: -90, position: "insideLeft" }}
              />

              <Tooltip />

              <Legend />

              {consumption.map((c, index) => (
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
    </div>
  );
}
