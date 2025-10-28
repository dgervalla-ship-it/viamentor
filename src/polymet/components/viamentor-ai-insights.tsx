/**
 * VIAMENTOR - AI Insights
 * Insights IA avec catégorisation SWOT et actions
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUpIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  ShieldAlertIcon,
  PlusIcon,
} from "lucide-react";
import type { AIInsight } from "@/polymet/data/viamentor-reviews-analytics-data";
import type { ReviewsAnalyticsLocale } from "@/polymet/data/viamentor-reviews-analytics-i18n";
import { reviewsAnalyticsTranslations } from "@/polymet/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface AIInsightsProps {
  insights: AIInsight[];
  locale?: ReviewsAnalyticsLocale;
  onCreateTask?: (insightId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AIInsightsPanel({
  insights,
  locale = "fr",
  onCreateTask,
}: AIInsightsProps) {
  const t = reviewsAnalyticsTranslations[locale];

  // Icon par catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "strength":
        return <TrendingUpIcon className="h-5 w-5 text-green-600" />;

      case "weakness":
        return <AlertTriangleIcon className="h-5 w-5 text-orange-600" />;

      case "opportunity":
        return <LightbulbIcon className="h-5 w-5 text-blue-600" />;

      case "threat":
        return <ShieldAlertIcon className="h-5 w-5 text-red-600" />;

      default:
        return null;
    }
  };

  // Grouper par catégorie
  const groupedInsights = insights.reduce(
    (acc, insight) => {
      if (!acc[insight.category]) {
        acc[insight.category] = [];
      }
      acc[insight.category].push(insight);
      return acc;
    },
    {} as Record<string, AIInsight[]>
  );

  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>{t.insights.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.insights.subtitle}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {(["strength", "weakness", "opportunity", "threat"] as const).map(
            (category) => {
              const categoryInsights = groupedInsights[category] || [];
              if (categoryInsights.length === 0) return null;

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <h4 className="font-semibold">
                      {t.insights.categories[category]}
                    </h4>
                    <Badge variant="outline">{categoryInsights.length}</Badge>
                  </div>

                  <div className="space-y-3 pl-7">
                    {categoryInsights.map((insight) => (
                      <Card
                        key={insight.id}
                        className="border-l-4"
                        style={{
                          borderLeftColor:
                            category === "strength"
                              ? "hsl(142, 76%, 36%)"
                              : category === "weakness"
                                ? "hsl(25, 95%, 53%)"
                                : category === "opportunity"
                                  ? "hsl(221, 83%, 53%)"
                                  : "hsl(0, 84%, 60%)",
                        }}
                      >
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h5 className="font-semibold">
                                  {insight.title}
                                </h5>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {insight.description}
                                </p>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  insight.priority === "high"
                                    ? "text-red-600"
                                    : insight.priority === "medium"
                                      ? "text-orange-600"
                                      : "text-blue-600"
                                }
                              >
                                {t.insights.priority[insight.priority]}
                              </Badge>
                            </div>

                            {/* Evidence */}
                            {insight.evidence.length > 0 && (
                              <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                  {t.insights.evidence}:
                                </p>
                                <ul className="space-y-1">
                                  {insight.evidence.map((evidence, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs text-muted-foreground flex items-start gap-2"
                                    >
                                      <span className="text-primary mt-0.5">
                                        •
                                      </span>
                                      <span>{evidence}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Action */}
                            {insight.actionable && onCreateTask && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onCreateTask(insight.id)}
                                className="w-full"
                              >
                                <PlusIcon className="h-4 w-4 mr-2" />

                                {t.insights.createTask}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }
          )}

          {insights.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <LightbulbIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />

              <p>{t.insights.noInsights}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
