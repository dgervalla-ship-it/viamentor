/**
 * VIAMENTOR - Rating Distribution
 * Distribution notes avec BarChart horizontal et filtrage
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { RatingDistribution } from "@/viamentor/data/viamentor-reviews-analytics-data";
import type { ReviewsAnalyticsLocale } from "@/viamentor/data/viamentor-reviews-analytics-i18n";
import { reviewsAnalyticsTranslations } from "@/viamentor/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RatingDistributionProps {
  distribution: RatingDistribution[];
  locale?: ReviewsAnalyticsLocale;
  onRatingClick?: (rating: number) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RatingDistributionChart({
  distribution,
  locale = "fr",
  onRatingClick,
}: RatingDistributionProps) {
  const t = reviewsAnalyticsTranslations[locale];

  // Couleurs par rating
  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 5:
        return "hsl(142, 76%, 36%)"; // Vert
      case 4:
        return "hsl(142, 76%, 46%)"; // Vert clair
      case 3:
        return "hsl(45, 93%, 47%)"; // Jaune
      case 2:
        return "hsl(25, 95%, 53%)"; // Orange
      case 1:
        return "hsl(0, 84%, 60%)"; // Rouge
      default:
        return "hsl(var(--muted))";
    }
  };

  // Préparer données pour chart
  const chartData = [...distribution]
    .sort((a, b) => b.rating - a.rating)
    .map((item) => ({
      rating: item.rating,
      count: item.count,
      percentage: item.percentage,
      label: `${item.rating} ${t.distribution.stars}`,
      color: getRatingColor(item.rating),
    }));

  // Stats highlights
  const fiveStarPercentage =
    distribution.find((d) => d.rating === 5)?.percentage || 0;
  const fourStarPercentage =
    distribution.find((d) => d.rating === 4)?.percentage || 0;
  const lowRatingsPercentage =
    distribution
      .filter((d) => d.rating <= 3)
      .reduce((sum, d) => sum + d.percentage, 0) || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.distribution.title}</CardTitle>
          <Badge variant="outline" className="text-muted-foreground">
            {t.distribution.clickToFilter}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

              <XAxis type="number" />

              <YAxis dataKey="label" type="category" width={80} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(data.rating)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className="h-4 w-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                        <p className="font-semibold">
                          {data.count} {t.distribution.reviews}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.percentage.toFixed(1)}%{" "}
                          {t.distribution.percentage}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar
                dataKey="count"
                radius={[0, 8, 8, 0]}
                cursor={onRatingClick ? "pointer" : "default"}
                onClick={(data) => {
                  if (onRatingClick) {
                    onRatingClick(data.rating);
                  }
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Stats inline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className={
                    fiveStarPercentage >= 70
                      ? "text-green-600"
                      : "text-orange-600"
                  }
                >
                  {fiveStarPercentage.toFixed(1)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {fiveStarPercentage >= 70 ? "Excellent" : "Objectif: >70%"}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <Badge variant="outline" className="text-blue-600">
                  {fourStarPercentage.toFixed(1)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Positif</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-4 w-4 text-orange-500 fill-orange-500"
                    />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className={
                    lowRatingsPercentage <= 10
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {lowRatingsPercentage.toFixed(1)}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {lowRatingsPercentage <= 10 ? "Minimal" : "À améliorer"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
