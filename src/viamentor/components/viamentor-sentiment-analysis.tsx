/**
 * VIAMENTOR - Sentiment Analysis
 * Analyse sentiments avec PieChart et WordCloud
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { SentimentAnalysis } from "@/viamentor/data/viamentor-reviews-analytics-data";
import type { ReviewsAnalyticsLocale } from "@/viamentor/data/viamentor-reviews-analytics-i18n";
import { reviewsAnalyticsTranslations } from "@/viamentor/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SentimentAnalysisProps {
  analysis: SentimentAnalysis;
  locale?: ReviewsAnalyticsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SentimentAnalysisChart({
  analysis,
  locale = "fr",
}: SentimentAnalysisProps) {
  const t = reviewsAnalyticsTranslations[locale];

  // Données PieChart
  const pieData = [
    {
      name: t.sentiment.positive,
      value: analysis.positive,
      color: "hsl(142, 76%, 36%)",
    },
    {
      name: t.sentiment.neutral,
      value: analysis.neutral,
      color: "hsl(45, 93%, 47%)",
    },
    {
      name: t.sentiment.negative,
      value: analysis.negative,
      color: "hsl(0, 84%, 60%)",
    },
  ];

  // Top 10 mots
  const topWords = analysis.wordCloud.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.sentiment.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PieChart */}
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.value?.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Légende */}
            <div className="flex justify-center gap-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WordCloud (liste) */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t.sentiment.topWords}</h4>
            <div className="space-y-2">
              {topWords.map((word, index) => (
                <div
                  key={word.text}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{word.text}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        word.sentiment === "positive"
                          ? "text-green-600"
                          : word.sentiment === "negative"
                            ? "text-red-600"
                            : "text-orange-600"
                      }
                    >
                      {word.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
