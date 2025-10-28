/**
 * Page - Revenue Analytics
 *
 * Page principale analytics revenus Finance Admin
 * Tabs navigation, DatePicker période, export/schedule reports
 */

import { useState, lazy, Suspense, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  DownloadIcon,
  ClockIcon,
  ChevronDownIcon,
  TrendingUpIcon,
  UsersIcon,
  LineChartIcon,
  AlertTriangleIcon,
  FileTextIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
// ============================================================================
// LAZY LOADING - Tabs chargés à la demande
// ============================================================================

const RevenueOverviewTab = lazy(() =>
  import("@/viamentor/components/viamentor-revenue-overview-tab").then(
    (module) => ({ default: module.RevenueOverviewTab })
  )
);
const CohortsAnalysisTab = lazy(() =>
  import("@/viamentor/components/viamentor-cohorts-analysis-tab").then(
    (module) => ({ default: module.CohortsAnalysisTab })
  )
);
const ForecastingTab = lazy(() =>
  import("@/viamentor/components/viamentor-forecasting-tab").then((module) => ({
    default: module.ForecastingTab,
  }))
);
const ChurnAnalysisTab = lazy(() =>
  import("@/viamentor/components/viamentor-churn-analysis-tab").then(
    (module) => ({ default: module.ChurnAnalysisTab })
  )
);
const FinancialReports = lazy(() =>
  import("@/viamentor/components/viamentor-financial-reports").then((module) => ({
    default: module.FinancialReports,
  }))
);

// ============================================================================
// LOADING SKELETON
// ============================================================================

const TabLoadingSkeleton = memo(() => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-4 w-24 mb-2 bg-muted" />

          <Skeleton className="h-8 w-32 bg-muted" />
        </Card>
      ))}
    </div>
    <Card className="p-6">
      <Skeleton className="h-[400px] w-full bg-muted" />
    </Card>
  </div>
));

TabLoadingSkeleton.displayName = "TabLoadingSkeleton";
import {
  MOCK_REVENUE_KPIS,
  MOCK_MRR_BY_PLAN,
  MOCK_REVENUE_SPLIT,
  MOCK_CHURN_DATA,
  MOCK_COHORTS,
  MOCK_FORECAST_DATA,
  MOCK_CHURNED_TENANTS,
  MOCK_WINBACK_CAMPAIGNS,
  MOCK_REPORT_TEMPLATES,
  MOCK_SCHEDULED_REPORTS,
  MOCK_HISTORICAL_REPORTS,
} from "@/viamentor/data/viamentor-analytics-data";
import {
  AnalyticsLocale,
  useAnalyticsTranslations,
} from "@/viamentor/data/viamentor-analytics-i18n";

export interface RevenueAnalyticsPageProps {
  locale?: AnalyticsLocale;
}

export function RevenueAnalyticsPage({
  locale = "fr",
}: RevenueAnalyticsPageProps) {
  const t = useAnalyticsTranslations(locale);
  const [period, setPeriod] = useState("this-month");

  // Header Actions
  const headerActions = (
    <div className="flex flex-wrap items-center gap-2">
      {/* Period Selector */}
      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className="w-[200px]">
          <CalendarIcon className="h-4 w-4 mr-2" />

          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this-month">{t.thisMonth}</SelectItem>
          <SelectItem value="this-quarter">{t.thisQuarter}</SelectItem>
          <SelectItem value="this-year">{t.thisYear}</SelectItem>
          <SelectItem value="all-time">{t.allTime}</SelectItem>
          <SelectItem value="custom">{t.customPeriod}</SelectItem>
        </SelectContent>
      </Select>

      {/* Export Report Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.exportReport}
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.downloadPDF}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.downloadExcel}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.downloadCSV}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Schedule Report Button */}
      <Button>
        <ClockIcon className="h-4 w-4 mr-2" />

        {t.scheduleReport}
      </Button>
    </div>
  );

  return (
    <ResponsivePageWrapper
      title={t.pageTitle}
      description="Analyse revenus, cohortes, prévisions et churn"
      actions={headerActions}
      sections={[
        {
          id: "overview",
          label: t.tabOverview,
          icon: <TrendingUpIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<TabLoadingSkeleton />}>
              <RevenueOverviewTab
                kpis={MOCK_REVENUE_KPIS}
                mrrByPlan={MOCK_MRR_BY_PLAN}
                revenueSplit={MOCK_REVENUE_SPLIT}
                churnData={MOCK_CHURN_DATA}
                locale={locale}
              />
            </Suspense>
          ),
        },
        {
          id: "cohorts",
          label: t.tabCohorts,
          icon: <UsersIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<TabLoadingSkeleton />}>
              <CohortsAnalysisTab
                cohorts={MOCK_COHORTS}
                locale={locale}
                onExportCSV={() => console.log("Export cohorts CSV")}
              />
            </Suspense>
          ),
        },
        {
          id: "forecasting",
          label: t.tabForecasting,
          icon: <LineChartIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<TabLoadingSkeleton />}>
              <ForecastingTab
                forecastData={MOCK_FORECAST_DATA}
                locale={locale}
                onRecalculate={(seasonality, growth) => {
                  console.log("Recalculate forecast:", { seasonality, growth });
                }}
              />
            </Suspense>
          ),
        },
        {
          id: "churn",
          label: t.tabChurn,
          icon: <AlertTriangleIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<TabLoadingSkeleton />}>
              <ChurnAnalysisTab
                churnedTenants={MOCK_CHURNED_TENANTS}
                winBackCampaigns={MOCK_WINBACK_CAMPAIGNS}
                locale={locale}
                onContactToggle={(id, attempted) =>
                  console.log("Contact toggle:", id, attempted)
                }
                onWinBackOffer={(id, offer) =>
                  console.log("Win-back offer:", id, offer)
                }
                onNotesUpdate={(id, notes) =>
                  console.log("Notes update:", id, notes)
                }
                onNewCampaign={(campaign) =>
                  console.log("New campaign:", campaign)
                }
              />
            </Suspense>
          ),
        },
        {
          id: "reports",
          label: t.financialReports,
          icon: <FileTextIcon className="h-4 w-4" />,

          content: (
            <Suspense fallback={<TabLoadingSkeleton />}>
              <FinancialReports
                templates={MOCK_REPORT_TEMPLATES}
                scheduledReports={MOCK_SCHEDULED_REPORTS}
                historicalReports={MOCK_HISTORICAL_REPORTS}
                locale={locale}
                onGenerateReport={(id) => console.log("Generate report:", id)}
                onScheduleReport={() => console.log("Schedule new report")}
                onToggleSchedule={(id, active) =>
                  console.log("Toggle schedule:", id, active)
                }
                onRunNow={(id) => console.log("Run now:", id)}
                onEditSchedule={(id) => console.log("Edit schedule:", id)}
                onDeleteSchedule={(id) => console.log("Delete schedule:", id)}
                onDownloadReport={(id) => console.log("Download report:", id)}
                onEmailReport={(id) => console.log("Email report:", id)}
                onDeleteReport={(id) => console.log("Delete report:", id)}
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
