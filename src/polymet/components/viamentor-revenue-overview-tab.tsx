/**
 * Component - Revenue Overview Tab
 *
 * Tab Overview avec KPIs période, charts MRR/revenue split/churn
 * Recharts BarChart stacked, PieChart, LineChart dual y-axis
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  DollarSignIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Brush,
} from "recharts";
import {
  RevenueKPIs,
  MRRByPlan,
  RevenueSplit,
  ChurnDataPoint,
} from "@/polymet/data/viamentor-analytics-data";
import {
  AnalyticsLocale,
  useAnalyticsTranslations,
  formatCurrency,
  formatPercentage,
} from "@/polymet/data/viamentor-analytics-i18n";

export interface RevenueOverviewTabProps {
  kpis: RevenueKPIs;
  mrrByPlan: MRRByPlan[];
  revenueSplit: RevenueSplit[];
  churnData: ChurnDataPoint[];
  locale?: AnalyticsLocale;
}

export function RevenueOverviewTab({
  kpis,
  mrrByPlan,
  revenueSplit,
  churnData,
  locale = "fr",
}: RevenueOverviewTabProps) {
  const t = useAnalyticsTranslations(locale);

  const totalRevenueSplit = revenueSplit.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <div className="space-y-6">
      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.totalRevenue}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />

              <p className="text-2xl font-bold">
                {formatCurrency(kpis.totalRevenue, locale)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.averageMRR}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />

              <p className="text-2xl font-bold">
                {formatCurrency(kpis.averageMRR, locale)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.growthRate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">
                {formatPercentage(kpis.growthRate, locale)}
              </p>
              <Badge
                variant={kpis.growthRate > 0 ? "default" : "destructive"}
                className={kpis.growthRate > 0 ? "bg-green-600" : ""}
              >
                {kpis.growthRate > 0 ? (
                  <TrendingUpIcon className="h-3 w-3" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3" />
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.customerCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />

              <p className="text-2xl font-bold">{kpis.customerCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">{t.arpu}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />

              <p className="text-2xl font-bold">
                {formatCurrency(kpis.arpu, locale)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR by Plan - Stacked Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.mrrByPlan}</CardTitle>
            <CardDescription>
              Évolution MRR par plan (7 derniers mois)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mrrByPlan}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="month" className="text-xs" />

                <YAxis
                  className="text-xs"
                  tickFormatter={(value) => formatCurrency(value, locale)}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => formatCurrency(value, locale)}
                />

                <Legend />

                <Bar
                  dataKey="Free"
                  stackId="a"
                  fill="hsl(var(--muted))"
                  name={t.planFree}
                  radius={[0, 0, 0, 0]}
                />

                <Bar
                  dataKey="Pro"
                  stackId="a"
                  fill="hsl(var(--chart-1))"
                  name={t.planPro}
                  radius={[0, 0, 0, 0]}
                />

                <Bar
                  dataKey="Enterprise"
                  stackId="a"
                  fill="hsl(var(--chart-2))"
                  name={t.planEnterprise}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Split - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.revenueSplit}</CardTitle>
            <CardDescription>Répartition revenus par plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueSplit.filter((s) => s.revenue > 0)}
                  dataKey="revenue"
                  nameKey="plan"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percentage, revenue }) =>
                    `${percentage.toFixed(1)}% (${formatCurrency(revenue, locale)})`
                  }
                  labelLine={true}
                >
                  {revenueSplit
                    .filter((s) => s.revenue > 0)
                    .map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => formatCurrency(value, locale)}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalRevenueSplit, locale)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Churn Rate Trend - Dual Y-Axis Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.churnRateTrend}</CardTitle>
          <CardDescription>
            MRR et taux de churn sur 12 mois (seuil acceptable: 5%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={churnData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

              <XAxis dataKey="month" className="text-xs" />

              <YAxis
                yAxisId="left"
                className="text-xs"
                tickFormatter={(value) => formatCurrency(value, locale)}
                label={{
                  value: "MRR",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12 },
                }}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
                className="text-xs"
                tickFormatter={(value) => `${value}%`}
                label={{
                  value: "Churn %",
                  angle: 90,
                  position: "insideRight",
                  style: { fontSize: 12 },
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "MRR") return formatCurrency(value, locale);
                  return `${value.toFixed(1)}%`;
                }}
              />

              <Legend />

              <ReferenceLine
                yAxisId="right"
                y={5}
                stroke="hsl(var(--destructive))"
                strokeDasharray="3 3"
                label="Seuil 5%"
              />

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="mrr"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="MRR"
                dot={{ r: 4 }}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="churnRate"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                name={t.churnRate}
                dot={{ r: 4 }}
              />

              <Brush dataKey="month" height={30} stroke="hsl(var(--primary))" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
