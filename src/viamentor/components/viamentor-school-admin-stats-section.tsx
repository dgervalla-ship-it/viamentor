/**
 * VIAMENTOR - School Admin Stats Section
 * Section Stats Cards pour dashboard School Admin
 *
 * FEATURES:
 * - 6 KPIs principaux
 * - Tendances vs mois précédent
 * - Icons colorés
 * - Responsive grid
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  Car,
  BookOpen,
  DollarSign,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import {
  mockSchoolStats,
  formatCurrency,
  formatPercentage,
  getStatTrend,
  type SchoolAdminLocale,
} from "@/viamentor/data/viamentor-school-admin-data";
import { schoolAdminTranslations } from "@/viamentor/data/viamentor-school-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminStatsSectionProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminStatsSection({
  locale = "fr",
}: SchoolAdminStatsSectionProps) {
  const t = schoolAdminTranslations[locale];

  // Render stat card
  const renderStatCard = (
    title: string,
    value: string | number,
    subtitle: string,
    trend: number,
    icon: React.ReactNode,
    color: string
  ) => {
    const trendDirection = getStatTrend(trend);
    const TrendIcon =
      trendDirection === "up"
        ? TrendingUp
        : trendDirection === "down"
          ? TrendingDown
          : Minus;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendIcon
              className={`h-3 w-3 ${
                trendDirection === "up"
                  ? "text-green-600"
                  : trendDirection === "down"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            />

            <span
              className={`text-xs font-medium ${
                trendDirection === "up"
                  ? "text-green-600"
                  : trendDirection === "down"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {Math.abs(trend)}%
            </span>
            <span className="text-xs text-muted-foreground">
              {t.trends.vsLastMonth}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {renderStatCard(
        t.stats.students.title,
        mockSchoolStats.students.total,
        `${mockSchoolStats.students.active} ${t.stats.students.active}`,
        mockSchoolStats.students.trend,
        <Users className="h-4 w-4 text-blue-600" />,

        "bg-blue-100 dark:bg-blue-900"
      )}
      {renderStatCard(
        t.stats.instructors.title,
        mockSchoolStats.instructors.total,
        `${t.stats.instructors.avgRating} ${mockSchoolStats.instructors.avgRating}/5`,
        mockSchoolStats.instructors.trend,
        <UserCheck className="h-4 w-4 text-green-600" />,

        "bg-green-100 dark:bg-green-900"
      )}
      {renderStatCard(
        t.stats.vehicles.title,
        mockSchoolStats.vehicles.total,
        `${mockSchoolStats.vehicles.available} ${t.stats.vehicles.available}`,
        mockSchoolStats.vehicles.trend,
        <Car className="h-4 w-4 text-purple-600" />,

        "bg-purple-100 dark:bg-purple-900"
      )}
      {renderStatCard(
        t.stats.lessons.title,
        mockSchoolStats.lessons.totalThisMonth,
        `${mockSchoolStats.lessons.completed} ${t.stats.lessons.completed}`,
        mockSchoolStats.lessons.trend,
        <BookOpen className="h-4 w-4 text-orange-600" />,

        "bg-orange-100 dark:bg-orange-900"
      )}
      {renderStatCard(
        t.stats.revenue.title,
        formatCurrency(mockSchoolStats.revenue.thisMonth, locale),
        `${formatCurrency(mockSchoolStats.revenue.pending, locale)} ${
          t.stats.revenue.pending
        }`,

        mockSchoolStats.revenue.trend,
        <DollarSign className="h-4 w-4 text-emerald-600" />,

        "bg-emerald-100 dark:bg-emerald-900"
      )}
      {renderStatCard(
        t.stats.exams.title,
        mockSchoolStats.exams.scheduled,
        `${formatPercentage(mockSchoolStats.exams.passRate, locale)} ${
          t.stats.exams.passRate
        }`,

        mockSchoolStats.exams.trend,
        <Award className="h-4 w-4 text-yellow-600" />,

        "bg-yellow-100 dark:bg-yellow-900"
      )}
    </div>
  );
}

export default ViamentorSchoolAdminStatsSection;
