/**
 * VIAMENTOR - Financial Analytics Page
 * Page principale analytics financières avec Tabs
 */

"use client";

import { useMemo, memo, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  PrinterIcon,
  RefreshCwIcon,
  TrendingUpIcon,
  PieChartIcon,
  LineChartIcon,
  DollarSignIcon,
  CreditCardIcon,
  BarChart3Icon,
  TargetIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { FinancialAnalyticsHeader } from "@/viamentor/components/viamentor-financial-analytics-header";

// ============================================================================
// LAZY LOADING - Sections lourdes chargées à la demande
// ============================================================================

const RevenueAnalysisSection = lazy(
  () => import("@/viamentor/components/viamentor-revenue-analysis-section")
);
const ProfitabilitySection = lazy(
  () => import("@/viamentor/components/viamentor-profitability-section")
);
const CashFlowForecastSection = lazy(
  () => import("@/viamentor/components/viamentor-cash-flow-forecast-section")
);
const FinancialRatiosSection = lazy(
  () => import("@/viamentor/components/viamentor-financial-ratios-section")
);
const PricingAnalysisSection = lazy(
  () => import("@/viamentor/components/viamentor-pricing-analysis-section")
);
const PaymentMethodsBreakdownSection = lazy(
  () =>
    import("@/viamentor/components/viamentor-payment-methods-breakdown-section")
);
const BudgetTrackingSection = lazy(
  () => import("@/viamentor/components/viamentor-budget-tracking-section")
);

// ============================================================================
// LOADING SKELETON
// ============================================================================

const SectionLoadingSkeleton = memo(() => (
  <Card className="p-6">
    <Skeleton className="h-8 w-48 mb-4 bg-muted" />

    <div className="space-y-4">
      <Skeleton className="h-[300px] w-full bg-muted" />

      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24 bg-muted" />

        <Skeleton className="h-24 bg-muted" />

        <Skeleton className="h-24 bg-muted" />
      </div>
    </div>
  </Card>
));

SectionLoadingSkeleton.displayName = "SectionLoadingSkeleton";
import {
  financialKPIs,
  revenueData,
  categoryRevenues,
  expensesData,
  forecastData,
  financialRatios,
  pricingData,
  competitorPricing,
  paymentMethodsData,
  budgetCategories,
  type FinancialLocale,
} from "@/viamentor/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/viamentor/data/viamentor-financial-analytics-i18n";
import { generateForecast } from "@/viamentor/data/viamentor-revenue-forecast-ml";

// ============================================================================
// TYPES
// ============================================================================

interface FinancialAnalyticsPageProps {
  locale?: FinancialLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FinancialAnalyticsPage({
  locale = "fr",
}: FinancialAnalyticsPageProps) {
  const t = getFinancialTranslations(locale);

  // ============================================================================
  // OPTIMISATION PERFORMANCE - useMemo pour calculs ML coûteux
  // ============================================================================

  // Generate ML forecast - Memoized car calcul intensif
  const mlForecast = useMemo(
    () =>
      generateForecast({
        historicalData: revenueData,
        monthsAhead: 6,
        includeSeasonality: true,
        growthRate: 5,
        confidenceLevel: 90,
      }),
    [] // Recalculé uniquement au mount
  );

  const handleExport = () => {
    console.log("Export analytics...");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    console.log("Refresh data...");
  };

  // Header Actions
  const headerActions = (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleRefresh}>
        <RefreshCwIcon className="h-4 w-4 mr-2" />

        {t.common.refresh}
      </Button>
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <PrinterIcon className="h-4 w-4 mr-2" />

        {t.common.print}
      </Button>
      <Button variant="default" size="sm" onClick={handleExport}>
        <DownloadIcon className="h-4 w-4 mr-2" />

        {t.common.export}
      </Button>
    </div>
  );

  // Header Stats
  const headerStats = (
    <FinancialAnalyticsHeader kpis={financialKPIs} locale={locale} />
  );

  return (
    <ResponsivePageWrapper
      title={t.title}
      description={t.subtitle}
      actions={headerActions}
      alerts={headerStats}
      sections={[
        {
          id: "revenue",
          label: t.tabs.revenue,
          icon: <TrendingUpIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <RevenueAnalysisSection
                revenueData={revenueData}
                categoryRevenues={categoryRevenues}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "profitability",
          label: t.tabs.profitability,
          icon: <PieChartIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <ProfitabilitySection
                totalRevenue={financialKPIs.revenue.amount}
                expenses={expensesData}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "forecast",
          label: t.tabs.forecast,
          icon: <LineChartIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <CashFlowForecastSection
                forecastData={mlForecast}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "pricing",
          label: t.tabs.pricing,
          icon: <DollarSignIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <PricingAnalysisSection
                pricingData={pricingData}
                competitorPricing={competitorPricing}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "payments",
          label: t.tabs.payments,
          icon: <CreditCardIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <PaymentMethodsBreakdownSection
                paymentMethodsData={paymentMethodsData}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "ratios",
          label: t.tabs.ratios,
          icon: <BarChart3Icon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <FinancialRatiosSection
                ratios={financialRatios}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "budget",
          label: t.tabs.budget,
          icon: <TargetIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<SectionLoadingSkeleton />}>
              <BudgetTrackingSection
                budgetCategories={budgetCategories}
                locale={locale}
              />
            </Suspense>
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

export default FinancialAnalyticsPage;
