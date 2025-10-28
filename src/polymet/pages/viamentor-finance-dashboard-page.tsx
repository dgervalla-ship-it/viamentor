/**
 * VIAMENTOR - Finance Dashboard Page
 * Page dashboard finance avec KPIs, analytics, forecasting ML
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  RefreshCwIcon,
  DownloadIcon,
  DollarSignIcon,
  CreditCardIcon,
  AlertCircleIcon,
  PercentIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import {
  getFinanceDashboardTranslations,
  type FinanceDashboardLocale,
} from "@/polymet/data/viamentor-finance-dashboard-i18n";
import {
  mockFinanceStats,
  mockRevenueData,
  mockRevenueSources,
  mockPaymentMethods,
  mockCashFlowData,
  mockForecastScenarios,
  mockForecastMetrics,
  formatCurrency,
  formatPercentage,
} from "@/polymet/data/viamentor-finance-dashboard-data";

// ============================================================================
// TYPES
// ============================================================================

interface FinanceDashboardPageProps {
  locale?: FinanceDashboardLocale;
}

type ForecastHorizon = "1m" | "3m" | "6m" | "1y";

// ============================================================================
// COMPONENT
// ============================================================================

export function FinanceDashboardPage({
  locale = "fr",
}: FinanceDashboardPageProps) {
  const t = getFinanceDashboardTranslations(locale);
  const [forecastHorizon, setForecastHorizon] = useState<ForecastHorizon>("3m");
  const [selectedScenario, setSelectedScenario] = useState<string>("realistic");

  // Stats Cards
  const statsCards = [
    {
      title: t.stats.revenue,
      value: formatCurrency(mockFinanceStats.revenue),
      trend: mockFinanceStats.trends.revenue,
      icon: DollarSignIcon,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: t.stats.mrr,
      value: formatCurrency(mockFinanceStats.mrr),
      trend: mockFinanceStats.trends.mrr,
      icon: TrendingUpIcon,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: t.stats.arr,
      value: formatCurrency(mockFinanceStats.arr),
      trend: mockFinanceStats.trends.arr,
      icon: TrendingUpIcon,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: t.stats.outstanding,
      value: formatCurrency(mockFinanceStats.outstanding),
      trend: mockFinanceStats.trends.outstanding,
      icon: AlertCircleIcon,
      color: "text-orange-600 dark:text-orange-400",
      alert: mockFinanceStats.outstanding > 10000,
    },
    {
      title: t.stats.paymentRate,
      value: formatPercentage(mockFinanceStats.paymentRate),
      trend: mockFinanceStats.trends.paymentRate,
      icon: PercentIcon,
      color: "text-teal-600 dark:text-teal-400",
    },
    {
      title: t.stats.netMargin,
      value: formatPercentage(mockFinanceStats.netMargin),
      trend: mockFinanceStats.trends.netMargin,
      icon: CreditCardIcon,
      color: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.page.title}</h1>
          <p className="text-sm text-muted-foreground">{t.page.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="mr-2 h-4 w-4" />

            {t.actions.refresh}
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />

            {t.actions.export}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend > 0;
          const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendIcon
                    className={`h-3 w-3 ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  />

                  <span
                    className={isPositive ? "text-green-600" : "text-red-600"}
                  >
                    {Math.abs(stat.trend)}%
                  </span>
                  <span>vs mois dernier</span>
                </div>
                {stat.alert && (
                  <Badge variant="destructive" className="mt-2">
                    Action requise
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          {t.analytics.title}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t.analytics.revenueChart.title}</CardTitle>
              <CardDescription>
                {t.analytics.revenueChart.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockRevenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />

                    <XAxis dataKey="month" className="text-xs" />

                    <YAxis className="text-xs" />

                    <ChartTooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      name="2025"
                      radius={4}
                    />

                    <Line
                      type="monotone"
                      dataKey="previousYear"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="2024"
                      radius={4}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Revenue Sources */}
          <Card>
            <CardHeader>
              <CardTitle>{t.analytics.sourceChart.title}</CardTitle>
              <CardDescription>
                {t.analytics.sourceChart.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockRevenueSources}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />

                    <XAxis dataKey="name" className="text-xs" />

                    <YAxis className="text-xs" />

                    <ChartTooltip />

                    <Bar dataKey="value" radius={4}>
                      {mockRevenueSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>{t.analytics.paymentMethodsChart.title}</CardTitle>
              <CardDescription>
                {t.analytics.paymentMethodsChart.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockPaymentMethods}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {mockPaymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Cash Flow */}
          <Card>
            <CardHeader>
              <CardTitle>{t.analytics.cashFlowChart.title}</CardTitle>
              <CardDescription>
                {t.analytics.cashFlowChart.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockCashFlowData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />

                    <XAxis dataKey="month" className="text-xs" />

                    <YAxis className="text-xs" />

                    <ChartTooltip />

                    <Legend />

                    <Area
                      type="monotone"
                      dataKey="inflow"
                      stackId="1"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      name={t.analytics.cashFlowChart.inflow}
                      radius={4}
                    />

                    <Area
                      type="monotone"
                      dataKey="outflow"
                      stackId="2"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      name={t.analytics.cashFlowChart.outflow}
                      radius={4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forecasting Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.forecasting.title}</CardTitle>
              <CardDescription>{t.forecasting.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={forecastHorizon}
                onValueChange={(v) => setForecastHorizon(v as ForecastHorizon)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">
                    {t.forecasting.horizon.oneMonth}
                  </SelectItem>
                  <SelectItem value="3m">
                    {t.forecasting.horizon.threeMonths}
                  </SelectItem>
                  <SelectItem value="6m">
                    {t.forecasting.horizon.sixMonths}
                  </SelectItem>
                  <SelectItem value="1y">
                    {t.forecasting.horizon.oneYear}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ChartContainer className="h-[400px]" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />

                <XAxis dataKey="date" className="text-xs" />

                <YAxis className="text-xs" />

                <ChartTooltip />

                <Legend />

                {mockForecastScenarios.map((scenario) => (
                  <Line
                    key={scenario.name}
                    data={scenario.data}
                    type="monotone"
                    dataKey="forecast"
                    stroke={scenario.color}
                    strokeWidth={2}
                    name={scenario.name}
                    radius={4}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {t.forecasting.metrics.mae}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(mockForecastMetrics.mae)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {t.forecasting.metrics.confidence}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {formatPercentage(mockForecastMetrics.confidence)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
