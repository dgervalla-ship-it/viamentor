/**
 * VIAMENTOR - Vehicles Analytics Header
 * Header avec stats cards KPIs
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarIcon, GaugeIcon, ClockIcon, WrenchIcon } from "lucide-react";
import type {
  VehicleAnalyticsStats,
  VehiclesAnalyticsLocale,
} from "@/polymet/data/viamentor-vehicles-analytics-data";
import { getVehiclesAnalyticsTranslations } from "@/polymet/data/viamentor-vehicles-analytics-i18n";

interface VehiclesAnalyticsHeaderProps {
  stats: VehicleAnalyticsStats;
  locale?: VehiclesAnalyticsLocale;
}

export function VehiclesAnalyticsHeader({
  stats,
  locale = "fr",
}: VehiclesAnalyticsHeaderProps) {
  const t = getVehiclesAnalyticsTranslations(locale);

  const cards = [
    {
      label: t.stats.totalVehicles,
      value: stats.totalVehicles,
      icon: CarIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: t.stats.totalKm,
      value: stats.totalKm.toLocaleString(locale),
      icon: GaugeIcon,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      label: t.stats.totalHours,
      value: stats.totalHours.toLocaleString(locale),
      icon: ClockIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      label: t.stats.maintenanceCosts,
      value: `CHF ${stats.maintenanceCosts.toLocaleString(locale)}`,
      icon: WrenchIcon,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
