/**
 * VIAMENTOR - Collection Analytics Component
 * Analytics performance collecte avis avec stats et top reviewers
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DownloadIcon, StarIcon, TrophyIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CollectionAnalytics } from "@/viamentor/data/viamentor-reviews-data";
import {
  reviewsTranslations,
  type ReviewsLocale,
} from "@/viamentor/data/viamentor-reviews-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface CollectionAnalyticsProps {
  analytics: CollectionAnalytics;
  locale?: ReviewsLocale;
  onExport?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CollectionAnalytics({
  analytics,
  locale = "fr",
  onExport,
}: CollectionAnalyticsProps) {
  const t = reviewsTranslations[locale];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.analytics.stats.sent}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {analytics.stats.invitationsSent}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.analytics.stats.openRate}
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {analytics.stats.openRate.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.analytics.stats.clickRate}
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {analytics.stats.clickRate.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.analytics.stats.conversionRate}
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {analytics.stats.conversionRate.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-card-foreground">
              {t.analytics.trend}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onExport}>
              <DownloadIcon className="h-4 w-4 mr-2" />

              {t.actions.export}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.trend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground"
                />

                <YAxis className="text-xs text-muted-foreground" />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="invitations"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Invitations"
                />

                <Line
                  type="monotone"
                  dataKey="reviews"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Avis"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Reviewers */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
            <TrophyIcon className="h-5 w-5 text-yellow-500" />

            {t.analytics.topReviewers}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topReviewers.map((reviewer, index) => (
              <div
                key={reviewer.studentId}
                className="flex items-center gap-4 p-3 rounded-lg border border-border bg-background"
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold text-foreground">
                  {index + 1}
                </div>

                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={reviewer.studentAvatar}
                    alt={reviewer.studentName}
                  />

                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {reviewer.studentName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">
                      {reviewer.studentName}
                    </p>
                    {reviewer.badge && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        {t.analytics.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.analytics.lastReview}:{" "}
                    {new Date(reviewer.lastReviewDate).toLocaleDateString(
                      locale
                    )}
                  </p>
                </div>

                {/* Stats */}
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-medium text-foreground">
                      {reviewer.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {reviewer.reviewsCount} {t.analytics.reviewsCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
