/**
 * VIAMENTOR - Exams Analytics Page
 * Page principale analytics examens avec Tabs
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  CalendarIcon,
  TrendingUpIcon,
  UserIcon,
  AlertTriangleIcon,
  ClockIcon,
  BarChart3Icon,
  LightbulbIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
import { ExamsAnalyticsHeader } from "@/viamentor/components/viamentor-exams-analytics-header";
import { SuccessRatesAnalysisSection } from "@/viamentor/components/viamentor-success-rates-analysis-section";
import { InstructorExamPerformanceSection } from "@/viamentor/components/viamentor-instructor-exam-performance-section";
import { FailureAnalysisSection } from "@/viamentor/components/viamentor-failure-analysis-section";
import {
  PreparationAnalysisSection,
  ExamsBenchmarkingSection,
  ExamsRecommendationsSection,
} from "@/viamentor/components/viamentor-preparation-benchmarking-recommendations-sections";
import {
  mockExamStats,
  mockCategorySuccessRates,
  mockMonthlySuccessRates,
  mockInstructorPerformance,
  mockFailureReasons,
  mockMultipleFailureStudents,
  mockLessonsDistribution,
  mockTimingBuckets,
  mockBenchmarks,
} from "@/viamentor/data/viamentor-exams-analytics-data";
import { mockRecommendations } from "@/viamentor/data/viamentor-exams-recommendations-engine";
import type { ExamsLocale } from "@/viamentor/data/viamentor-exams-analytics-i18n";
import { getExamsTranslations } from "@/viamentor/data/viamentor-exams-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsAnalyticsPageProps {
  locale?: ExamsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ExamsAnalyticsPage({ locale = "fr" }: ExamsAnalyticsPageProps) {
  const t = getExamsTranslations(locale);

  // Header Actions
  const headerActions = (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline">
        <CalendarIcon className="h-4 w-4 mr-2" />
        Période
      </Button>
      <Button variant="outline">
        <DownloadIcon className="h-4 w-4 mr-2" />

        {t.common.export}
      </Button>
    </div>
  );

  // Header Stats
  const headerStats = (
    <ExamsAnalyticsHeader stats={mockExamStats} locale={locale} />
  );

  return (
    <ResponsivePageWrapper
      title={t.title}
      description={t.subtitle}
      actions={headerActions}
      alerts={headerStats}
      sections={[
        {
          id: "success-rates",
          label: t.tabs.successRates,
          icon: <TrendingUpIcon className="h-4 w-4" />,

          content: (
            <SuccessRatesAnalysisSection
              categoryRates={mockCategorySuccessRates}
              monthlyRates={mockMonthlySuccessRates}
              globalRate={mockExamStats.successRate}
              globalTrend={mockExamStats.successRateTrend}
              nationalAverage={72.5}
              locale={locale}
            />
          ),
        },
        {
          id: "by-instructor",
          label: t.tabs.byInstructor,
          icon: <UserIcon className="h-4 w-4" />,

          content: (
            <InstructorExamPerformanceSection
              instructors={mockInstructorPerformance}
              locale={locale}
            />
          ),
        },
        {
          id: "failures",
          label: t.tabs.failures,
          icon: <AlertTriangleIcon className="h-4 w-4" />,

          content: (
            <FailureAnalysisSection
              failureReasons={mockFailureReasons}
              multipleFailureStudents={mockMultipleFailureStudents}
              locale={locale}
              onAttestation={(id) => console.log("Attestation", id)}
              onTargetedLessons={(id) => console.log("Targeted lessons", id)}
              onChangeInstructor={(id) => console.log("Change instructor", id)}
              onSupport={(id) => console.log("Support", id)}
            />
          ),
        },
        {
          id: "preparation",
          label: t.tabs.preparation,
          icon: <ClockIcon className="h-4 w-4" />,

          content: (
            <PreparationAnalysisSection
              lessonsDistribution={mockLessonsDistribution}
              timingBuckets={mockTimingBuckets}
              locale={locale}
            />
          ),
        },
        {
          id: "benchmarking",
          label: t.tabs.benchmarking,
          icon: <BarChart3Icon className="h-4 w-4" />,

          content: (
            <ExamsBenchmarkingSection
              benchmarks={mockBenchmarks}
              targetRate={85}
              currentRate={mockExamStats.successRate}
              locale={locale}
            />
          ),
        },
        {
          id: "recommendations",
          label: t.tabs.recommendations,
          icon: <LightbulbIcon className="h-4 w-4" />,

          content: (
            <ExamsRecommendationsSection
              recommendations={mockRecommendations}
              locale={locale}
              onImplement={(id) => console.log("Implement recommendation", id)}
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
