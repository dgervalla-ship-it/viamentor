/**
 * VIAMENTOR - Reviews KPI Cards
 * Cards KPIs dashboard avis avec gauges et trends
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  StarIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import type { ReviewsKPIs } from "@/polymet/data/viamentor-reviews-analytics-data";
import type { ReviewsAnalyticsLocale } from "@/polymet/data/viamentor-reviews-analytics-i18n";
import { reviewsAnalyticsTranslations } from "@/polymet/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ReviewsKPICardsProps {
  kpis: ReviewsKPIs;
  locale?: ReviewsAnalyticsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ReviewsKPICards({ kpis, locale = "fr" }: ReviewsKPICardsProps) {
  const t = reviewsAnalyticsTranslations[locale];

  // Déterminer couleur gauge note moyenne
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-orange-600";
    return "text-red-600";
  };

  // Déterminer couleur taux réponse
  const getResponseRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Note moyenne */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t.kpis.averageRating}
              </span>
              <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <p
                  className={`text-3xl font-bold ${getRatingColor(kpis.averageRating)}`}
                >
                  {kpis.averageRating.toFixed(1)}
                </p>
                <span className="text-muted-foreground">/5</span>
              </div>

              <div className="flex items-center gap-2">
                <Progress
                  value={(kpis.averageRating / 5) * 100}
                  className="h-2"
                />

                <span className="text-xs text-muted-foreground">
                  {((kpis.averageRating / 5) * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {kpis.trends.averageRating !== 0 && (
              <div className="flex items-center gap-1 text-sm">
                {kpis.trends.averageRating > 0 ? (
                  <>
                    <TrendingUpIcon className="h-4 w-4 text-green-600" />

                    <span className="text-green-600">
                      +{kpis.trends.averageRating.toFixed(1)}
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDownIcon className="h-4 w-4 text-red-600" />

                    <span className="text-red-600">
                      {kpis.trends.averageRating.toFixed(1)}
                    </span>
                  </>
                )}
                <span className="text-muted-foreground text-xs">
                  {t.kpis.trend}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Total avis */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t.kpis.totalReviews}
              </span>
              <MessageSquareIcon className="h-5 w-5 text-blue-600" />
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold">{kpis.totalReviews}</p>

              <Badge variant="outline" className="text-blue-600">
                Social proof
              </Badge>
            </div>

            {kpis.trends.totalReviews > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <TrendingUpIcon className="h-4 w-4 text-green-600" />

                <span className="text-green-600">
                  +{kpis.trends.totalReviews}
                </span>
                <span className="text-muted-foreground text-xs">ce mois</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Taux de réponse */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t.kpis.responseRate}
              </span>
              <CheckCircle2Icon className="h-5 w-5 text-purple-600" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <p
                  className={`text-3xl font-bold ${getResponseRateColor(kpis.responseRate)}`}
                >
                  {kpis.responseRate.toFixed(1)}
                </p>
                <span className="text-muted-foreground">%</span>
              </div>

              <div className="flex items-center gap-2">
                <Progress value={kpis.responseRate} className="h-2" />

                <span className="text-xs text-muted-foreground">
                  {t.kpis.target}: 90%
                </span>
              </div>
            </div>

            {kpis.trends.responseRate !== 0 && (
              <div className="flex items-center gap-1 text-sm">
                {kpis.trends.responseRate > 0 ? (
                  <>
                    <TrendingUpIcon className="h-4 w-4 text-green-600" />

                    <span className="text-green-600">
                      +{kpis.trends.responseRate.toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDownIcon className="h-4 w-4 text-red-600" />

                    <span className="text-red-600">
                      {kpis.trends.responseRate.toFixed(1)}%
                    </span>
                  </>
                )}
                <span className="text-muted-foreground text-xs">
                  {t.kpis.trend}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* NPS */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t.kpis.nps}
              </span>
              <Badge
                variant="outline"
                className={
                  kpis.nps >= 50
                    ? "text-green-600"
                    : kpis.nps >= 0
                      ? "text-orange-600"
                      : "text-red-600"
                }
              >
                {kpis.nps >= 50
                  ? "Excellent"
                  : kpis.nps >= 0
                    ? "Bon"
                    : "Faible"}
              </Badge>
            </div>

            <div className="space-y-2">
              <p
                className={`text-3xl font-bold ${
                  kpis.nps >= 50
                    ? "text-green-600"
                    : kpis.nps >= 0
                      ? "text-orange-600"
                      : "text-red-600"
                }`}
              >
                {kpis.nps}
              </p>

              <p className="text-xs text-muted-foreground">
                Net Promoter Score
              </p>
            </div>

            {kpis.trends.nps !== 0 && (
              <div className="flex items-center gap-1 text-sm">
                {kpis.trends.nps > 0 ? (
                  <>
                    <TrendingUpIcon className="h-4 w-4 text-green-600" />

                    <span className="text-green-600">+{kpis.trends.nps}</span>
                  </>
                ) : (
                  <>
                    <TrendingDownIcon className="h-4 w-4 text-red-600" />

                    <span className="text-red-600">{kpis.trends.nps}</span>
                  </>
                )}
                <span className="text-muted-foreground text-xs">
                  {t.kpis.trend}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
