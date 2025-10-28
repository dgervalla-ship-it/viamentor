/**
 * VIAMENTOR - Instructors Analytics Header
 * Header avec stats cards KPIs performance moniteurs
 */

import { Users2Icon, BookOpenIcon, ClockIcon, StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type {
  InstructorPerformanceStats,
  PerformanceLocale,
} from "@/polymet/data/viamentor-instructors-performance-data";
import { performanceTranslations } from "@/polymet/data/viamentor-instructors-performance-i18n";

interface InstructorsAnalyticsHeaderProps {
  stats: InstructorPerformanceStats;
  locale?: PerformanceLocale;
}

export function InstructorsAnalyticsHeader({
  stats,
  locale = "fr",
}: InstructorsAnalyticsHeaderProps) {
  const t = performanceTranslations[locale].header;

  const statsCards = [
    {
      label: t.totalInstructors,
      value: stats.totalInstructors,
      icon: Users2Icon,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: t.totalLessons,
      value: stats.totalLessons.toLocaleString(locale),
      icon: BookOpenIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      label: t.totalHours,
      value: stats.totalHours.toLocaleString(locale),
      icon: ClockIcon,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      label: t.averageRating,
      value: `${stats.averageRating.toFixed(1)}/5`,
      icon: StarIcon,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{t.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
