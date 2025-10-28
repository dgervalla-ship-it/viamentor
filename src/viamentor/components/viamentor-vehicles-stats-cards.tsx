/**
 * VIAMENTOR - Vehicles Stats Cards
 * Stats Cards KPIs header pour page Vehicles
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  CarIcon,
  CheckCircleIcon,
  BookOpenIcon,
  WrenchIcon,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/viamentor/data/viamentor-vehicles-i18n";
import type { VehicleStats } from "@/viamentor/data/viamentor-vehicles-data";

export interface VehiclesStatsCardsProps {
  stats: VehicleStats;
  locale?: VehiclesLocale;
}

export function VehiclesStatsCards({
  stats,
  locale = "fr",
}: VehiclesStatsCardsProps) {
  const t = VEHICLES_I18N[locale].stats;

  const cards = [
    {
      label: t.total,
      value: stats.total,
      icon: CarIcon,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: t.available,
      value: stats.available,
      icon: CheckCircleIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
      badge: true,
      badgeVariant: "default" as const,
      badgeColor: "bg-green-500",
    },
    {
      label: t.inLesson,
      value: stats.inLesson,
      icon: BookOpenIcon,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
      badge: true,
      badgeVariant: "default" as const,
      badgeColor: "bg-blue-500",
    },
    {
      label: t.maintenance,
      value: stats.maintenance,
      icon: WrenchIcon,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
      badge: true,
      badgeVariant: "default" as const,
      badgeColor: "bg-orange-500",
    },
    {
      label: t.outOfService,
      value: stats.outOfService,
      icon: XCircleIcon,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-950",
    },
    {
      label: t.complianceRate,
      value: `${stats.complianceRate}%`,
      icon: CheckCircleIcon,
      color:
        stats.complianceRate >= 80
          ? "text-green-600 dark:text-green-400"
          : "text-orange-600 dark:text-orange-400",
      bgColor:
        stats.complianceRate >= 80
          ? "bg-green-100 dark:bg-green-950"
          : "bg-orange-100 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{card.value}</p>
                  {card.badge && (
                    <div
                      className={`h-2 w-2 rounded-full ${card.badgeColor} animate-pulse`}
                    />
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
