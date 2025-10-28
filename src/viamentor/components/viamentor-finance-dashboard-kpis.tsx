/**
 * VIAMENTOR Finance Dashboard KPIs
 *
 * Cards KPIs revenus avec sparklines et chart MRR principal
 *
 * @module components/viamentor-finance-dashboard-kpis
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  AlertCircleIcon,
  TargetIcon,
} from "lucide-react";
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
  FinanceKPIs,
  formatCurrency,
} from "@/viamentor/data/viamentor-finance-data";

interface FinanceDashboardKPIsProps {
  kpis: FinanceKPIs;
  locale?: "fr" | "de" | "it" | "en";
  onManageOutstanding?: () => void;
}

export function FinanceDashboardKPIs({
  kpis,
  locale = "fr",
  onManageOutstanding,
}: FinanceDashboardKPIsProps) {
  const collectedPercentage =
    (kpis.collectedYTD.amount / kpis.collectedYTD.target) * 100;

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* MRR Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              MRR
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {formatCurrency(kpis.mrr, locale)}
              </div>
              <Badge
                variant={kpis.mrrTrend > 0 ? "default" : "destructive"}
                className="text-xs"
              >
                {kpis.mrrTrend > 0 ? (
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 mr-1" />
                )}
                {kpis.mrrTrend > 0 ? "+" : ""}
                {kpis.mrrTrend}%
              </Badge>
              <div className="h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpis.mrrHistory.slice(-6)}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ARR Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ARR
            </CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {formatCurrency(kpis.arr, locale)}
              </div>
              <p className="text-xs text-muted-foreground">
                MRR × 12 = {formatCurrency(kpis.mrr * 12, locale)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* New MRR Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New MRR
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(kpis.newMrr, locale)}
              </div>
              <Badge variant="secondary" className="text-xs">
                Ce mois
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Churn MRR Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Churn MRR
            </CardTitle>
            <TrendingDownIcon className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(kpis.churnMrr, locale)}
              </div>
              <Badge variant="destructive" className="text-xs">
                Revenus perdus
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Invoices Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Factures impayées
            </CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-destructive">
                {formatCurrency(kpis.outstandingInvoices.amount, locale)}
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-xs">
                  {kpis.outstandingInvoices.count} factures
                </Badge>
                <Button
                  size="sm"
                  variant="link"
                  className="h-auto p-0 text-xs"
                  onClick={onManageOutstanding}
                >
                  Gérer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collected YTD Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Encaissé YTD
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {formatCurrency(kpis.collectedYTD.amount, locale)}
              </div>
              <div className="space-y-1">
                <Progress value={collectedPercentage} className="h-2" />

                <p className="text-xs text-muted-foreground">
                  Target: {formatCurrency(kpis.collectedYTD.target, locale)} (
                  {collectedPercentage.toFixed(1)}%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main MRR Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution MRR (12 derniers mois)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpis.mrrHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />

                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: number) => [
                    formatCurrency(value, locale),
                    "MRR",
                  ]}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="value"
                  name="MRR"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
