/**
 * VIAMENTOR - Instructor Makeups Stats
 * Stats Cards KPIs header
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
} from "lucide-react";
import type { InstructorMakeupsGlobalStats } from "@/viamentor/data/viamentor-instructor-makeups-data";
import type { InstructorMakeupsLocale } from "@/viamentor/data/viamentor-instructor-makeups-i18n";
import { instructorMakeupsTranslations } from "@/viamentor/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorMakeupsStatsProps {
  stats: InstructorMakeupsGlobalStats;
  locale?: InstructorMakeupsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorMakeupsStats({
  stats,
  locale = "fr",
}: InstructorMakeupsStatsProps) {
  const t = instructorMakeupsTranslations[locale].stats;

  // Déterminer le niveau de performance
  const getUsageRateLevel = (rate: number) => {
    if (rate >= 80) return { level: "optimal", color: "text-green-600" };
    if (rate >= 60) return { level: "acceptable", color: "text-orange-600" };
    return { level: "critical", color: "text-red-600" };
  };

  const usageRateLevel = getUsageRateLevel(stats.usageRate);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Disponibles */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {t.available.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">
                {stats.available}
              </p>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              >
                <CheckCircle2Icon className="w-3 h-3 mr-1" />
                Actifs
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.available.description}
            </p>
          </div>
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <ClockIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
          </div>
        </div>
      </Card>

      {/* Expirés ce mois */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {t.expired.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">
                {stats.expiredThisMonth}
              </p>
              {stats.expiredThisMonth > 0 && (
                <Badge variant="destructive">
                  <AlertTriangleIcon className="w-3 h-3 mr-1" />
                  Waste
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {t.expired.description}
            </p>
          </div>
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-300" />
          </div>
        </div>
        {stats.expiredThisMonth > 3 && (
          <Alert variant="destructive" className="mt-3">
            <AlertTriangleIcon className="w-4 h-4" />

            <AlertDescription className="text-xs">
              {t.expired.alert}
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Utilisés */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {t.used.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{stats.used}</p>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              >
                <CheckCircle2Icon className="w-3 h-3 mr-1" />
                Success
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.used.description}
            </p>
          </div>
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <CheckCircle2Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
      </Card>

      {/* Taux d'utilisation */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {t.usageRate.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${usageRateLevel.color}`}>
                {stats.usageRate.toFixed(1)}%
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.usageRate.description}
            </p>
          </div>
          <div className="relative w-16 h-16">
            {/* Circular gauge */}
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-muted"
              />

              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(stats.usageRate / 100) * 175.93} 175.93`}
                className={usageRateLevel.color}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUpIcon className={`w-5 h-5 ${usageRateLevel.color}`} />
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500" />

            <span className="text-muted-foreground">{t.usageRate.optimal}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-orange-500" />

            <span className="text-muted-foreground">
              {t.usageRate.acceptable}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500" />

            <span className="text-muted-foreground">
              {t.usageRate.critical}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
