/**
 * VIAMENTOR - Makeups Analytics Dashboard
 * Dashboard analytics rattrapages
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  HourglassIcon,
} from "lucide-react";
import type { MakeupsLocale } from "@/viamentor/data/viamentor-makeups-i18n";
import { makeupsTranslations } from "@/viamentor/data/viamentor-makeups-i18n";
import type { MakeupAnalytics } from "@/viamentor/data/viamentor-makeups-data";

/**
 * Props
 */
interface MakeupsAnalyticsDashboardProps {
  analytics: MakeupAnalytics;
  locale?: MakeupsLocale;
  onPeriodChange?: (period: string) => void;
}

/**
 * Composant principal
 */
export function MakeupsAnalyticsDashboard({
  analytics,
  locale = "fr",
  onPeriodChange,
}: MakeupsAnalyticsDashboardProps) {
  const t = makeupsTranslations[locale];
  const [period, setPeriod] = useState("last6months");

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onPeriodChange?.(value);
  };

  /**
   * Colors
   */
  const COLORS = {
    created: "hsl(var(--chart-1))",
    used: "hsl(var(--chart-2))",
    expired: "hsl(var(--chart-3))",
    pending: "hsl(var(--chart-4))",
  };

  const PIE_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--primary))",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{t.analytics.title}</h3>
          <p className="text-sm text-muted-foreground">
            {analytics.period.start} - {analytics.period.end}
          </p>
        </div>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last30">{t.analytics.period.last30}</SelectItem>
            <SelectItem value="last90">{t.analytics.period.last90}</SelectItem>
            <SelectItem value="last6months">
              {t.analytics.period.last6months}
            </SelectItem>
            <SelectItem value="custom">{t.analytics.period.custom}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Crédits créés */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.analytics.stats.created.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {analytics.stats.creditsCreated}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.analytics.stats.created.description}
                </p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>

        {/* Crédits utilisés */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.analytics.stats.used.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {analytics.stats.creditsUsed}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {analytics.stats.usageRate.toFixed(1)}%
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.analytics.stats.used.description}
                </p>
              </div>
              <CheckCircle2Icon className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        {/* Crédits expirés */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.analytics.stats.expired.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {analytics.stats.creditsExpired}
                </p>
                <Badge
                  variant={
                    analytics.stats.expiryRate > 20
                      ? "destructive"
                      : "secondary"
                  }
                  className="mt-1"
                >
                  {analytics.stats.expiryRate.toFixed(1)}%
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.analytics.stats.expired.description}
                </p>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>

        {/* En attente */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.analytics.stats.pending.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {analytics.stats.creditsPending}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.analytics.stats.pending.description}
                </p>
              </div>
              <HourglassIcon className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        {/* Délai moyen */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.analytics.stats.avgDays.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {analytics.stats.avgDaysToUse.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.analytics.stats.avgDays.description}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.analytics.charts.trend.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.trend}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="created"
                  stroke={COLORS.created}
                  name={t.analytics.charts.trend.created}
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="used"
                  stroke={COLORS.used}
                  name={t.analytics.charts.trend.used}
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="expired"
                  stroke={COLORS.expired}
                  name={t.analytics.charts.trend.expired}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* By Reason Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.analytics.charts.byReason.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.byReason}
                  dataKey="count"
                  nameKey="reason"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.percentage.toFixed(1)}%`}
                >
                  {analytics.byReason.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* By Category Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.analytics.charts.byCategory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.byCategory}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="category" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="created"
                  fill={COLORS.created}
                  name={t.analytics.charts.trend.created}
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="used"
                  fill={COLORS.used}
                  name={t.analytics.charts.trend.used}
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="expired"
                  fill={COLORS.expired}
                  name={t.analytics.charts.trend.expired}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
