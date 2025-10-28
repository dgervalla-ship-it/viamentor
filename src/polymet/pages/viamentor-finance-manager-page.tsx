/**
 * VIAMENTOR - Finance Manager Page
 * Dashboard complet Finance Manager
 *
 * FEATURES:
 * - KPIs financiers (revenus, créances, trésorerie)
 * - Transactions récentes
 * - Analytics revenus et paiements
 * - Actions rapides
 * - Alertes financières
 */

import { useState } from "react";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  FileTextIcon,
  CreditCardIcon,
  BarChart3Icon,
  AlertTriangleIcon,
  PlusIcon,
  DownloadIcon,
  SettingsIcon,
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  WalletIcon,
  PercentIcon,
  LayoutDashboardIcon,
  ActivityIcon,
  PieChartIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  FINANCE_MANAGER_I18N,
  type FinanceManagerLocale,
} from "@/polymet/data/viamentor-finance-manager-i18n";
import {
  MOCK_FINANCE_MANAGER_DATA,
  formatCurrency,
  formatPercentage,
  getTransactionStatusColor,
  getAlertSeverityColor,
  type FinanceKPI,
  type Transaction,
} from "@/polymet/data/viamentor-finance-manager-data";

// ============================================================================
// TYPES
// ============================================================================

interface FinanceManagerPageProps {
  locale?: FinanceManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FinanceManagerPage({ locale = "fr" }: FinanceManagerPageProps) {
  const t = FINANCE_MANAGER_I18N[locale];
  const data = MOCK_FINANCE_MANAGER_DATA;
  const [period, setPeriod] = useState<"week" | "month" | "quarter" | "year">(
    "month"
  );

  // Chart colors
  const CHART_COLORS = {
    primary: "hsl(var(--chart-1))",
    secondary: "hsl(var(--chart-2))",
    tertiary: "hsl(var(--chart-3))",
    quaternary: "hsl(var(--chart-4))",
    quinary: "hsl(var(--chart-5))",
  };

  const PIE_COLORS = [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.tertiary,
    CHART_COLORS.quaternary,
    CHART_COLORS.quinary,
  ];

  // KPI Icon mapping
  const getKPIIcon = (kpiId: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      monthly_revenue: TrendingUpIcon,
      outstanding_invoices: FileTextIcon,
      cash_flow: WalletIcon,
      payment_rate: PercentIcon,
      avg_invoice_value: DollarSignIcon,
      overdue_amount: AlertTriangleIcon,
    };
    return icons[kpiId] || DollarSignIcon;
  };

  const getTrendIcon = (trend: FinanceKPI["trend"]) => {
    if (trend === "up") return TrendingUpIcon;
    if (trend === "down") return TrendingDownIcon;
    return MinusIcon;
  };

  // Header actions
  const headerActions = (
    <div className="flex items-center gap-2 sm:gap-3">
      <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
        <SelectTrigger className="w-[140px] sm:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">{t.analytics.period.week}</SelectItem>
          <SelectItem value="month">{t.analytics.period.month}</SelectItem>
          <SelectItem value="quarter">{t.analytics.period.quarter}</SelectItem>
          <SelectItem value="year">{t.analytics.period.year}</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" className="hidden sm:flex">
        <DownloadIcon className="h-4 w-4 mr-2" />

        {t.actions.exportReport}
      </Button>
      <Button variant="outline" size="sm" className="sm:hidden">
        <DownloadIcon className="h-4 w-4" />
      </Button>
    </div>
  );

  // Alerts section
  const alertsSection =
    data.alerts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {data.alerts.map((alert) => (
          <Card
            key={alert.id}
            className={getAlertSeverityColor(alert.severity)}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />

                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {t.alerts[alert.title as keyof typeof t.alerts]}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm">
                    {alert.count}{" "}
                    {t.alerts[alert.description as keyof typeof t.alerts]}
                  </p>
                  {alert.amount && (
                    <p className="text-base sm:text-lg font-bold mt-1 sm:mt-2">
                      {formatCurrency(alert.amount, locale)}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <span className="hidden sm:inline">
                    {t.alerts.viewDetails}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 sm:ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : null;

  // Overview section
  const overviewSection = (
    <div className="space-y-4 sm:space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {data.kpis.map((kpi) => {
          const Icon = getKPIIcon(kpi.id);
          const TrendIcon = getTrendIcon(kpi.trend);
          const isPositive = kpi.changeType === "increase";

          return (
            <Card key={kpi.id}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant={isPositive ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <TrendIcon className="h-3 w-3" />
                    {Math.abs(kpi.change)}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {t.kpis[kpi.label as keyof typeof t.kpis]}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {kpi.format === "currency"
                      ? formatCurrency(kpi.value, locale)
                      : kpi.format === "percentage"
                        ? formatPercentage(kpi.value, locale)
                        : kpi.value.toLocaleString(locale)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.kpis[`${kpi.label}Desc` as keyof typeof t.kpis]}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Transactions section
  const transactionsSection = (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.sections.recentTransactions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentTransactions.slice(0, 6).map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-2 sm:p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-muted rounded">
                      {txn.type === "payment" && (
                        <CreditCardIcon className="h-4 w-4" />
                      )}
                      {txn.type === "invoice" && (
                        <FileTextIcon className="h-4 w-4" />
                      )}
                      {txn.type === "refund" && (
                        <TrendingDownIcon className="h-4 w-4" />
                      )}
                      {txn.type === "credit" && (
                        <TrendingUpIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">
                        {txn.studentName}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">
                        {txn.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                    <p className="font-semibold text-sm sm:text-base">
                      {formatCurrency(txn.amount, locale)}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] sm:text-xs ${getTransactionStatusColor(txn.status)}`}
                    >
                      {t.transactions.statuses[txn.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              {t.transactions.viewAll}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t.sections.quickActions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 sm:space-y-2">
            <Button className="w-full justify-start text-sm" variant="default">
              <PlusIcon className="h-4 w-4 mr-2" />

              {t.actions.createInvoice}
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline">
              <CreditCardIcon className="h-4 w-4 mr-2" />

              {t.actions.recordPayment}
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline">
              <FileTextIcon className="h-4 w-4 mr-2" />

              {t.actions.viewInvoices}
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline">
              <WalletIcon className="h-4 w-4 mr-2" />

              {t.actions.viewPayments}
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />

              {t.actions.manageReminders}
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline">
              <BarChart3Icon className="h-4 w-4 mr-2" />

              {t.actions.viewAnalytics}
            </Button>
            <Button className="w-full justify-start text-sm" variant="outline">
              <SettingsIcon className="h-4 w-4 mr-2" />

              {t.actions.configurePricing}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Analytics section
  const analyticsSection = (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Revenue Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>{t.analytics.revenueEvolution}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="h-[200px] sm:h-[250px] lg:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueEvolution}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />

                  <XAxis dataKey="date" className="text-xs" />

                  <YAxis className="text-xs" />

                  <ChartTooltip content={<ChartTooltipContent />} />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={CHART_COLORS.primary}
                    strokeWidth={2}
                    name={t.revenue.total}
                    radius={4}
                  />

                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke={CHART_COLORS.secondary}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                    radius={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>{t.sections.revenueBreakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ChartContainer config={{}} className="h-[180px] sm:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.revenueBreakdown}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {data.revenueBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="space-y-3">
                {data.revenueBreakdown.map((item, index) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              PIE_COLORS[index % PIE_COLORS.length],
                          }}
                        />

                        <span>{t.revenue[item.category]}</span>
                      </div>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-5">
                      {formatCurrency(item.amount, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.analytics.paymentMethodsDistribution}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{}}
              className="h-[200px] sm:h-[250px] lg:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.paymentMethods}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />

                  <XAxis
                    dataKey="method"
                    className="text-xs"
                    tickFormatter={(value) =>
                      t.paymentMethods[value as keyof typeof t.paymentMethods]
                    }
                  />

                  <YAxis className="text-xs" />

                  <ChartTooltip content={<ChartTooltipContent />} />

                  <Bar
                    dataKey="amount"
                    fill={CHART_COLORS.primary}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <ResponsivePageWrapper
      title={t.page.title}
      description={t.page.subtitle}
      actions={headerActions}
      alerts={alertsSection}
      sections={[
        {
          id: "overview",
          title: t.sections.overview || "Vue d'ensemble",
          icon: LayoutDashboardIcon,
          content: overviewSection,
        },
        {
          id: "transactions",
          title: t.sections.recentTransactions,
          icon: ActivityIcon,
          content: transactionsSection,
        },
        {
          id: "analytics",
          title: "Analytics",
          icon: PieChartIcon,
          content: analyticsSection,
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
      spacing="normal"
    />
  );
}
