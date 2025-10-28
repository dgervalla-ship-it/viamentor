/**
 * VIAMENTOR - Vehicles Utilization Stats
 * Stats utilisation avec charts Recharts
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDownIcon,
  ClockIcon,
  GaugeIcon,
  WrenchIcon,
  ActivityIcon,
} from "lucide-react";
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
import { ChartContainer } from "@/components/ui/chart";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/polymet/data/viamentor-vehicles-i18n";
import type { UtilizationData } from "@/polymet/data/viamentor-vehicles-data";

export interface UtilizationStatsProps {
  utilizationData: UtilizationData[];
  locale?: VehiclesLocale;
}

export function VehiclesUtilizationStats({
  utilizationData,
  locale = "fr",
}: UtilizationStatsProps) {
  const t = VEHICLES_I18N[locale].utilization;
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState("6months");

  // Calculate totals
  const totalHours = utilizationData.reduce((sum, v) => sum + v.totalHours, 0);
  const avgKmPerDay = Math.round(
    utilizationData.reduce((sum, v) => {
      const lastMileage =
        v.mileageEvolution[v.mileageEvolution.length - 1]?.mileage || 0;
      const firstMileage = v.mileageEvolution[0]?.mileage || 0;
      const days = v.mileageEvolution.length * 30; // Assuming monthly data
      return sum + (lastMileage - firstMileage) / days;
    }, 0) / utilizationData.length
  );

  // Prepare data for top vehicles chart
  const topVehiclesData = utilizationData
    .map((v) => ({
      name: v.licensePlate,
      hours: v.totalHours,
    }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  // Prepare data for mileage evolution (combine all vehicles)
  const mileageEvolutionData =
    utilizationData[0]?.mileageEvolution.map((point, idx) => {
      const dataPoint: any = { date: point.date };
      utilizationData.forEach((vehicle) => {
        dataPoint[vehicle.licensePlate] =
          vehicle.mileageEvolution[idx]?.mileage || 0;
      });
      return dataPoint;
    }) || [];

  // Prepare data for lesson types pie chart
  const lessonTypesData = utilizationData.reduce(
    (acc, vehicle) => {
      vehicle.lessonTypes.forEach((lt) => {
        const existing = acc.find((item) => item.name === lt.type);
        if (existing) {
          existing.value += lt.hours;
        } else {
          acc.push({ name: lt.type, value: lt.hours });
        }
      });
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <ActivityIcon className="h-4 w-4" />

            {t.title}
          </span>
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4">
        <div className="space-y-6">
          {/* Period Selector */}
          <div className="flex justify-end">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 mois</SelectItem>
                <SelectItem value="3months">3 mois</SelectItem>
                <SelectItem value="6months">6 mois</SelectItem>
                <SelectItem value="1year">1 an</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />

                  {t.totalHours}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalHours}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.hours}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <GaugeIcon className="h-4 w-4 text-muted-foreground" />

                  {t.avgKmPerDay}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{avgKmPerDay}</p>
                <p className="text-xs text-muted-foreground mt-1">km/jour</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <WrenchIcon className="h-4 w-4 text-muted-foreground" />

                  {t.maintenanceCost}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">CHF 15'200</p>
                <p className="text-xs text-muted-foreground mt-1">Total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ActivityIcon className="h-4 w-4 text-muted-foreground" />

                  {t.availabilityRate}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">87%</p>
                <p className="text-xs text-muted-foreground mt-1">Moyenne</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Vehicles Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t.topVehicles}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topVehiclesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis dataKey="name" type="category" width={100} />

                    <Tooltip />

                    <Bar
                      dataKey="hours"
                      fill="hsl(var(--chart-1))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Mileage Evolution Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t.mileageEvolution}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mileageEvolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    {utilizationData.map((vehicle, idx) => (
                      <Line
                        key={vehicle.vehicleId}
                        type="monotone"
                        dataKey={vehicle.licensePlate}
                        stroke={COLORS[idx % COLORS.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Lesson Types Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t.lessonTypes}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={lessonTypesData}
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
                      {lessonTypesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
