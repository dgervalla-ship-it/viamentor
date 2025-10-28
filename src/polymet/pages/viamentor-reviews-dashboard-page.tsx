/**
 * VIAMENTOR - Reviews Dashboard Page
 * Page principale analytics avis Google avec insights IA
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DownloadIcon,
  CalendarIcon,
  RefreshCwIcon,
  LineChartIcon,
  BarChart3Icon,
  SmileIcon,
  UsersIcon,
  TrendingUpIcon,
  SparklesIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { ReviewsKPICards } from "@/polymet/components/viamentor-reviews-kpi-cards";
import { RatingDistributionChart } from "@/polymet/components/viamentor-rating-distribution";
import { SentimentAnalysisChart } from "@/polymet/components/viamentor-sentiment-analysis";
import { TopReviewersTable } from "@/polymet/components/viamentor-top-reviewers";
import { AIInsightsPanel } from "@/polymet/components/viamentor-ai-insights";
import { TemporalTrendsChart } from "@/polymet/components/viamentor-temporal-trends";
import {
  mockReviewsKPIs,
  mockRatingDistribution,
  mockSentimentAnalysis,
  mockTopReviewers,
  mockAIInsights,
  mockTemporalTrends,
} from "@/polymet/data/viamentor-reviews-analytics-data";
import { reviewsAnalyticsTranslations } from "@/polymet/data/viamentor-reviews-analytics-i18n";
import type { ReviewsAnalyticsLocale } from "@/polymet/data/viamentor-reviews-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ReviewsDashboardPageProps {
  locale?: ReviewsAnalyticsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ReviewsDashboardPage({
  locale = "fr",
}: ReviewsDashboardPageProps) {
  const t = reviewsAnalyticsTranslations[locale];
  const [period, setPeriod] = useState("last12months");

  // Header Actions
  const headerActions = (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className="w-[200px]">
          <CalendarIcon className="h-4 w-4 mr-2" />

          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last7days">{t.period.last7days}</SelectItem>
          <SelectItem value="last30days">{t.period.last30days}</SelectItem>
          <SelectItem value="last90days">{t.period.last90days}</SelectItem>
          <SelectItem value="last12months">{t.period.last12months}</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon">
        <RefreshCwIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline">
        <DownloadIcon className="h-4 w-4 mr-2" />

        {t.actions.export}
      </Button>
      <Button>
        <LineChartIcon className="h-4 w-4 mr-2" />

        {t.actions.schedule}
      </Button>
    </div>
  );

  // Header Stats
  const headerStats = (
    <ReviewsKPICards kpis={mockReviewsKPIs} locale={locale} />
  );

  return (
    <ResponsivePageWrapper
      title={t.page.title}
      description={t.page.breadcrumb}
      actions={headerActions}
      alerts={headerStats}
      sections={[
        {
          id: "distribution",
          label: "Distribution",
          icon: <BarChart3Icon className="h-4 w-4" />,

          content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RatingDistributionChart
                distribution={mockRatingDistribution}
                locale={locale}
                onRatingClick={(rating) =>
                  console.log("Filter by rating:", rating)
                }
              />

              <TemporalTrendsChart
                data={mockTemporalTrends}
                locale={locale}
                showFilters={true}
                showDrillDown={true}
                onDrillDown={(month, filters) => {
                  console.log(
                    "Drill down to month:",
                    month,
                    "with filters:",
                    filters
                  );
                }}
                onExport={(data, filters) => {
                  console.log(
                    "Export data:",
                    data.length,
                    "points with filters:",
                    filters
                  );
                }}
              />
            </div>
          ),
        },
        {
          id: "sentiment",
          label: "Sentiment",
          icon: <SmileIcon className="h-4 w-4" />,

          content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SentimentAnalysisChart
                analysis={mockSentimentAnalysis}
                locale={locale}
              />

              <TopReviewersTable reviewers={mockTopReviewers} locale={locale} />
            </div>
          ),
        },
        {
          id: "insights",
          label: "AI Insights",
          icon: <SparklesIcon className="h-4 w-4" />,

          content: (
            <AIInsightsPanel
              insights={mockAIInsights}
              locale={locale}
              onCreateTask={(id) => console.log("Create task for insight:", id)}
            />
          ),
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
    />
  );
}
