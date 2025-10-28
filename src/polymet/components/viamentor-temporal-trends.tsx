/**
 * VIAMENTOR - Temporal Trends Chart
 * LineChart standalone réutilisable avec drill-down et filtres avancés
 */

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  FilterIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ZoomInIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";
import type { ReviewsAnalyticsLocale } from "@/polymet/data/viamentor-reviews-analytics-i18n";
import { reviewsAnalyticsTranslations } from "@/polymet/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Data point tendance temporelle
 */
export interface TemporalDataPoint {
  month: string;
  averageRating: number;
  reviewsCount: number;
  positiveCount?: number;
  neutralCount?: number;
  negativeCount?: number;
  rating5Count?: number;
  rating4Count?: number;
  rating3Count?: number;
  rating2Count?: number;
  rating1Count?: number;
  verifiedCount?: number;
}

/**
 * Filtres avancés
 */
export interface TemporalFilters {
  ratings: number[];
  sentiments: ("positive" | "neutral" | "negative")[];
  verifiedOnly: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * Props du composant
 */
export interface TemporalTrendsChartProps {
  data: TemporalDataPoint[];
  locale?: ReviewsAnalyticsLocale;
  title?: string;
  showFilters?: boolean;
  showDrillDown?: boolean;
  onDrillDown?: (month: string, filters: TemporalFilters) => void;
  onExport?: (data: TemporalDataPoint[], filters: TemporalFilters) => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TemporalTrendsChart({
  data,
  locale = "fr",
  title,
  showFilters = true,
  showDrillDown = true,
  onDrillDown,
  onExport,
  className,
}: TemporalTrendsChartProps) {
  const t = reviewsAnalyticsTranslations[locale];

  // State
  const [filters, setFilters] = useState<TemporalFilters>({
    ratings: [1, 2, 3, 4, 5],
    sentiments: ["positive", "neutral", "negative"],
    verifiedOnly: false,
  });
  const [viewMode, setViewMode] = useState<"combined" | "rating" | "sentiment">(
    "combined"
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filtrer les données
  const filteredData = useMemo(() => {
    return data.map((point) => {
      let reviewsCount = 0;
      let ratingSum = 0;
      let ratingCount = 0;

      // Filtrer par ratings
      filters.ratings.forEach((rating) => {
        const key = `rating${rating}Count` as keyof TemporalDataPoint;
        const count = (point[key] as number) || 0;
        reviewsCount += count;
        ratingSum += rating * count;
        ratingCount += count;
      });

      // Filtrer par sentiments
      if (filters.sentiments.includes("positive")) {
        reviewsCount += point.positiveCount || 0;
      }
      if (filters.sentiments.includes("neutral")) {
        reviewsCount += point.neutralCount || 0;
      }
      if (filters.sentiments.includes("negative")) {
        reviewsCount += point.negativeCount || 0;
      }

      // Filtrer verified only
      if (filters.verifiedOnly) {
        reviewsCount = point.verifiedCount || reviewsCount;
      }

      const averageRating = ratingCount > 0 ? ratingSum / ratingCount : 0;

      return {
        ...point,
        reviewsCount,
        averageRating,
      };
    });
  }, [data, filters]);

  // Calculer statistiques
  const stats = useMemo(() => {
    const totalReviews = filteredData.reduce(
      (sum, point) => sum + point.reviewsCount,
      0
    );
    const avgRating =
      filteredData.reduce((sum, point) => sum + point.averageRating, 0) /
      filteredData.length;
    const trend =
      filteredData.length > 1
        ? filteredData[filteredData.length - 1].averageRating -
          filteredData[0].averageRating
        : 0;

    return { totalReviews, avgRating, trend };
  }, [filteredData]);

  // Handlers
  const handleRatingToggle = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      ratings: prev.ratings.includes(rating)
        ? prev.ratings.filter((r) => r !== rating)
        : [...prev.ratings, rating].sort(),
    }));
  };

  const handleSentimentToggle = (
    sentiment: "positive" | "neutral" | "negative"
  ) => {
    setFilters((prev) => ({
      ...prev,
      sentiments: prev.sentiments.includes(sentiment)
        ? prev.sentiments.filter((s) => s !== sentiment)
        : [...prev.sentiments, sentiment],
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      ratings: [1, 2, 3, 4, 5],
      sentiments: ["positive", "neutral", "negative"],
      verifiedOnly: false,
    });
  };

  const handleExport = () => {
    if (onExport) {
      onExport(filteredData, filters);
    }
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.ratings.length < 5) count++;
    if (filters.sentiments.length < 3) count++;
    if (filters.verifiedOnly) count++;
    return count;
  }, [filters]);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{title || t.trends.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                {stats.totalReviews} {t.trends.reviewsCount.toLowerCase()}
              </span>
              <span>•</span>
              <span>
                {t.trends.averageRating}: {stats.avgRating.toFixed(1)}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                {stats.trend > 0 ? (
                  <TrendingUpIcon className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stats.trend > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {stats.trend > 0 ? "+" : ""}
                  {stats.trend.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode */}
            <Select value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="combined">
                  {t.trends.viewCombined}
                </SelectItem>
                <SelectItem value="rating">{t.trends.viewRating}</SelectItem>
                <SelectItem value="sentiment">
                  {t.trends.viewSentiment}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Filters */}
            {showFilters && (
              <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <FilterIcon className="h-4 w-4" />

                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{t.filters.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetFilters}
                      >
                        {t.filters.reset}
                      </Button>
                    </div>

                    {/* Ratings Filter */}
                    <div className="space-y-2">
                      <Label>{t.filters.byRating}</Label>
                      <div className="flex flex-wrap gap-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <Badge
                            key={rating}
                            variant={
                              filters.ratings.includes(rating)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer"
                            onClick={() => handleRatingToggle(rating)}
                          >
                            {rating} ⭐
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sentiments Filter */}
                    <div className="space-y-2">
                      <Label>{t.filters.bySentiment}</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="positive"
                            checked={filters.sentiments.includes("positive")}
                            onCheckedChange={() =>
                              handleSentimentToggle("positive")
                            }
                          />

                          <Label htmlFor="positive" className="cursor-pointer">
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 text-green-700 dark:text-green-400"
                            >
                              {t.sentiment.positive}
                            </Badge>
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="neutral"
                            checked={filters.sentiments.includes("neutral")}
                            onCheckedChange={() =>
                              handleSentimentToggle("neutral")
                            }
                          />

                          <Label htmlFor="neutral" className="cursor-pointer">
                            <Badge
                              variant="outline"
                              className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                            >
                              {t.sentiment.neutral}
                            </Badge>
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="negative"
                            checked={filters.sentiments.includes("negative")}
                            onCheckedChange={() =>
                              handleSentimentToggle("negative")
                            }
                          />

                          <Label htmlFor="negative" className="cursor-pointer">
                            <Badge
                              variant="outline"
                              className="bg-red-500/10 text-red-700 dark:text-red-400"
                            >
                              {t.sentiment.negative}
                            </Badge>
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Verified Only */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="verified"
                        checked={filters.verifiedOnly}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            verifiedOnly: checked as boolean,
                          }))
                        }
                      />

                      <Label htmlFor="verified" className="cursor-pointer">
                        {t.filters.verifiedOnly}
                      </Label>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Export */}
            <Button variant="outline" size="icon" onClick={handleExport}>
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.ratings.length < 5 && (
              <Badge variant="secondary" className="gap-1">
                {t.filters.byRating}: {filters.ratings.join(", ")}⭐
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      ratings: [1, 2, 3, 4, 5],
                    }))
                  }
                />
              </Badge>
            )}
            {filters.sentiments.length < 3 && (
              <Badge variant="secondary" className="gap-1">
                {t.filters.bySentiment}:{" "}
                {filters.sentiments.map((s) => t.sentiment[s]).join(", ")}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      sentiments: ["positive", "neutral", "negative"],
                    }))
                  }
                />
              </Badge>
            )}
            {filters.verifiedOnly && (
              <Badge variant="secondary" className="gap-1">
                {t.filters.verifiedOnly}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, verifiedOnly: false }))
                  }
                />
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {viewMode === "combined" ? (
            <LineChart
              data={filteredData}
              onClick={(data) => {
                if (showDrillDown && data && data.activeLabel && onDrillDown) {
                  onDrillDown(data.activeLabel, filters);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
              />

              <YAxis yAxisId="left" domain={[0, 5]} />

              <YAxis yAxisId="right" orientation="right" />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold mb-2">
                          {payload[0].payload.month}
                        </p>
                        <p className="text-sm">
                          {t.trends.averageRating}:{" "}
                          {payload[0].value?.toFixed(1)}
                        </p>
                        <p className="text-sm">
                          {t.trends.reviewsCount}: {payload[1].value}
                        </p>
                        {showDrillDown && (
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <ZoomInIcon className="h-3 w-3" />

                            {t.trends.clickToDrillDown}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend />

              <ReferenceLine
                yAxisId="left"
                y={4.5}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
                label={{ value: "Target", position: "right", fontSize: 12 }}
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="averageRating"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name={t.trends.averageRating}
                dot={{ r: 4, cursor: showDrillDown ? "pointer" : "default" }}
                activeDot={{ r: 6 }}
              />

              <Bar
                yAxisId="right"
                dataKey="reviewsCount"
                fill="hsl(var(--muted))"
                opacity={0.5}
                name={t.trends.reviewsCount}
              />
            </LineChart>
          ) : viewMode === "rating" ? (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="rating5Count"
                stackId="a"
                fill="hsl(142, 76%, 36%)"
                name="5⭐"
              />

              <Bar
                dataKey="rating4Count"
                stackId="a"
                fill="hsl(47, 96%, 53%)"
                name="4⭐"
              />

              <Bar
                dataKey="rating3Count"
                stackId="a"
                fill="hsl(38, 92%, 50%)"
                name="3⭐"
              />

              <Bar
                dataKey="rating2Count"
                stackId="a"
                fill="hsl(25, 95%, 53%)"
                name="2⭐"
              />

              <Bar
                dataKey="rating1Count"
                stackId="a"
                fill="hsl(0, 84%, 60%)"
                name="1⭐"
              />
            </BarChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="positiveCount"
                stackId="a"
                fill="hsl(142, 76%, 36%)"
                name={t.sentiment.positive}
              />

              <Bar
                dataKey="neutralCount"
                stackId="a"
                fill="hsl(47, 96%, 53%)"
                name={t.sentiment.neutral}
              />

              <Bar
                dataKey="negativeCount"
                stackId="a"
                fill="hsl(0, 84%, 60%)"
                name={t.sentiment.negative}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
