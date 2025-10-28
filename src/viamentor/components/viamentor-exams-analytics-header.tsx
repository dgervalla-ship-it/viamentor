/**
 * VIAMENTOR - Exams Analytics Header
 * Header stats cards KPIs
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCheckIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  XCircleIcon,
  RepeatIcon,
} from "lucide-react";
import type { ExamStats } from "@/viamentor/data/viamentor-exams-analytics-data";
import type { ExamsLocale } from "@/viamentor/data/viamentor-exams-analytics-i18n";
import { getExamsTranslations } from "@/viamentor/data/viamentor-exams-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsAnalyticsHeaderProps {
  stats: ExamStats;
  locale?: ExamsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ExamsAnalyticsHeader({
  stats,
  locale = "fr",
}: ExamsAnalyticsHeaderProps) {
  const t = getExamsTranslations(locale);

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-500";
    if (rate >= 70) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Examens */}
      <Card className="p-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t.stats.totalExams}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {stats.totalExams}
            </p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <ClipboardCheckIcon className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </Card>

      {/* Taux Réussite */}
      <Card className="p-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t.stats.successRate}
            </p>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-3xl font-bold ${getSuccessRateColor(stats.successRate)}`}
              >
                {stats.successRate.toFixed(1)}%
              </p>
              {stats.successRateTrend !== 0 && (
                <Badge
                  variant={
                    stats.successRateTrend > 0 ? "default" : "destructive"
                  }
                  className="flex items-center gap-1"
                >
                  {stats.successRateTrend > 0 ? (
                    <TrendingUpIcon className="h-3 w-3" />
                  ) : (
                    <TrendingDownIcon className="h-3 w-3" />
                  )}
                  {Math.abs(stats.successRateTrend).toFixed(1)}%
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{t.stats.trend}</p>
          </div>
          <div
            className={`p-3 rounded-lg ${
              stats.successRate >= 80
                ? "bg-green-500/10"
                : stats.successRate >= 70
                  ? "bg-orange-500/10"
                  : "bg-red-500/10"
            }`}
          >
            <TrendingUpIcon
              className={`h-6 w-6 ${getSuccessRateColor(stats.successRate)}`}
            />
          </div>
        </div>
      </Card>

      {/* Échecs */}
      <Card className="p-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.stats.failures}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">
                {stats.failures}
              </p>
              <Badge
                variant="secondary"
                className="bg-orange-500/10 text-orange-500"
              >
                {((stats.failures / stats.totalExams) * 100).toFixed(1)}%
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <XCircleIcon className="h-6 w-6 text-orange-500" />
          </div>
        </div>
      </Card>

      {/* Tentatives Moyennes */}
      <Card className="p-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t.stats.averageAttempts}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {stats.averageAttempts.toFixed(1)}
            </p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <RepeatIcon className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </Card>
    </div>
  );
}
