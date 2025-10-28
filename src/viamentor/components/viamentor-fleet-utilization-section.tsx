/**
 * VIAMENTOR - Fleet Utilization Section
 * Utilisation flotte avec table, charts et heatmap
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EyeIcon, CalendarIcon, AlertTriangleIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type {
  VehicleUtilization,
  VehiclesAnalyticsLocale,
} from "@/viamentor/data/viamentor-vehicles-analytics-data";
import { getVehiclesAnalyticsTranslations } from "@/viamentor/data/viamentor-vehicles-analytics-i18n";

interface FleetUtilizationSectionProps {
  vehicles: VehicleUtilization[];
  locale?: VehiclesAnalyticsLocale;
  onViewDetail?: (vehicle: VehicleUtilization) => void;
  onViewPlanning?: (vehicle: VehicleUtilization) => void;
}

export function FleetUtilizationSection({
  vehicles,
  locale = "fr",
  onViewDetail,
  onViewPlanning,
}: FleetUtilizationSectionProps) {
  const t = getVehiclesAnalyticsTranslations(locale);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const avgOccupancy =
    vehicles.reduce((acc, v) => acc + v.occupancyRate, 0) / vehicles.length;

  const chartData = vehicles.map((v) => ({
    name: v.plate,
    hours: v.hoursUsed,
  }));

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn as keyof VehicleUtilization];
    const bVal = b[sortColumn as keyof VehicleUtilization];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* DataTable */}
      <Card>
        <CardHeader>
          <CardTitle>{t.utilization.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer"
                    onClick={() => handleSort("plate")}
                  >
                    {t.utilization.table.plate}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.utilization.table.vehicle}
                  </th>
                  <th className="text-left p-3 text-sm font-medium">
                    {t.utilization.table.category}
                  </th>
                  <th
                    className="text-right p-3 text-sm font-medium cursor-pointer"
                    onClick={() => handleSort("lessonsCount")}
                  >
                    {t.utilization.table.lessons}
                  </th>
                  <th
                    className="text-right p-3 text-sm font-medium cursor-pointer"
                    onClick={() => handleSort("hoursUsed")}
                  >
                    {t.utilization.table.hours}
                  </th>
                  <th
                    className="text-right p-3 text-sm font-medium cursor-pointer"
                    onClick={() => handleSort("kmDriven")}
                  >
                    {t.utilization.table.km}
                  </th>
                  <th
                    className="text-left p-3 text-sm font-medium cursor-pointer"
                    onClick={() => handleSort("occupancyRate")}
                  >
                    {t.utilization.table.occupancy}
                  </th>
                  <th className="text-center p-3 text-sm font-medium">
                    {t.utilization.table.inactive}
                  </th>
                  <th className="text-right p-3 text-sm font-medium">
                    {t.utilization.table.revenue}
                  </th>
                  <th className="text-center p-3 text-sm font-medium">
                    {t.utilization.table.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="p-3">
                      <span className="font-bold">{vehicle.plate}</span>
                    </td>
                    <td className="p-3 text-sm">
                      {vehicle.brand} {vehicle.model}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{vehicle.category}</Badge>
                    </td>
                    <td className="p-3 text-right">{vehicle.lessonsCount}</td>
                    <td className="p-3 text-right">{vehicle.hoursUsed}h</td>
                    <td className="p-3 text-right">
                      {vehicle.kmDriven.toLocaleString(locale)}
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>{vehicle.occupancyRate}%</span>
                          <span className="text-muted-foreground">70%</span>
                        </div>
                        <Progress
                          value={vehicle.occupancyRate}
                          className="h-2"
                        />
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      {vehicle.inactiveDays > 7 ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangleIcon className="h-3 w-3" />
                          {vehicle.inactiveDays}j
                        </Badge>
                      ) : (
                        <span className="text-sm">{vehicle.inactiveDays}j</span>
                      )}
                    </td>
                    <td className="p-3 text-right font-medium">
                      CHF {vehicle.revenueGenerated.toLocaleString(locale)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewDetail?.(vehicle)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewPlanning?.(vehicle)}
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* BarChart Horizontal */}
      <Card>
        <CardHeader>
          <CardTitle>{t.utilization.chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis dataKey="name" type="category" width={100} />

              <Tooltip />

              <ReferenceLine
                x={avgOccupancy}
                stroke="hsl(var(--destructive))"
                strokeDasharray="3 3"
                label={t.utilization.chart.avgLine}
              />

              <Bar dataKey="hours" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>{t.utilization.heatmap.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left text-sm font-medium">
                    {t.utilization.table.plate}
                  </th>
                  {t.utilization.heatmap.days.map((day, i) => (
                    <th key={i} className="p-2 text-center text-sm font-medium">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="p-2 text-sm font-medium">{vehicle.plate}</td>
                    {vehicle.dailyUsage.map((hours, i) => {
                      const opacity = Math.min(hours / 10, 1);
                      return (
                        <td key={i} className="p-2">
                          <div
                            className="h-10 w-full rounded flex items-center justify-center text-xs font-medium"
                            style={{
                              backgroundColor: `hsl(var(--chart-1) / ${opacity})`,
                              color: opacity > 0.5 ? "white" : "inherit",
                            }}
                          >
                            {hours}h
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
