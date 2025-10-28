/**
 * VIAMENTOR - Profitability Section
 * Rentabilité avec revenus vs dépenses, waterfall, table
 */

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import type {
  ExpenseData,
  FinancialLocale,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProfitabilitySectionProps {
  totalRevenue: number;
  expenses: ExpenseData[];
  locale?: FinancialLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProfitabilitySection({
  totalRevenue,
  expenses,
  locale = "fr",
}: ProfitabilitySectionProps) {
  const t = getFinancialTranslations(locale);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const marginPercent = (netProfit / totalRevenue) * 100;
  const expenseRatio = (totalExpenses / totalRevenue) * 100;

  // Prepare waterfall data (simulated)
  const waterfallData = [
    {
      name: t.profitability.totalRevenue,
      value: totalRevenue,
      fill: "hsl(var(--chart-2))",
    },
    ...expenses.map((exp) => ({
      name: t.profitability.expenses[exp.category] || exp.category,
      value: -exp.amount,
      fill: "hsl(var(--chart-1))",
    })),
    {
      name: t.profitability.netProfit,
      value: netProfit,
      fill: netProfit >= 0 ? "hsl(var(--chart-2))" : "hsl(var(--destructive))",
    },
  ];

  const getCategoryLabel = (category: string) => {
    return (
      t.profitability.expenses[
        category as keyof typeof t.profitability.expenses
      ] || category
    );
  };

  return (
    <div className="space-y-6">
      {/* Alert if high expense ratio */}
      {expenseRatio > 80 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>{t.profitability.alert}</AlertDescription>
        </Alert>
      )}

      {/* Revenue vs Expenses Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="text-sm text-green-700 dark:text-green-300 mb-1">
              {t.profitability.totalRevenue}
            </div>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {formatCurrency(totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="text-sm text-red-700 dark:text-red-300 mb-1">
              {t.profitability.totalExpenses}
            </div>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br ${
            netProfit >= 0
              ? "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800"
              : "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800"
          }`}
        >
          <CardContent className="p-6">
            <div
              className={`text-sm mb-1 ${
                netProfit >= 0
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-red-700 dark:text-red-300"
              }`}
            >
              {t.profitability.netProfit}
            </div>
            <div
              className={`text-2xl font-bold ${
                netProfit >= 0
                  ? "text-blue-900 dark:text-blue-100"
                  : "text-red-900 dark:text-red-100"
              }`}
            >
              {formatCurrency(netProfit)}
            </div>
            <div className="text-xs mt-1">
              <Badge variant={netProfit >= 0 ? "default" : "destructive"}>
                {t.profitability.marginPercent}: {marginPercent.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.profitability.waterfall}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={100}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => formatCurrency(Math.abs(value))}
              />

              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.profitability.expenses.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.profitability.expenses.category}</TableHead>
                <TableHead className="text-right">
                  {t.profitability.expenses.amount}
                </TableHead>
                <TableHead className="text-right">
                  {t.profitability.expenses.percentage}
                </TableHead>
                <TableHead className="text-right">
                  {t.profitability.expenses.trend}
                </TableHead>
                <TableHead className="text-right">
                  {t.profitability.expenses.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((exp) => (
                <TableRow key={exp.category}>
                  <TableCell className="font-medium">
                    {getCategoryLabel(exp.category)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(exp.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">
                      {exp.percentage.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {exp.trend >= 0 ? (
                        <TrendingUpIcon className="h-3 w-3 text-red-600 dark:text-red-400" />
                      ) : (
                        <TrendingDownIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                      )}
                      <span
                        className={
                          exp.trend >= 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }
                      >
                        {exp.trend > 0 ? "+" : ""}
                        {exp.trend.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        {t.profitability.expenses.optimize}
                      </Button>
                      <Button variant="ghost" size="sm">
                        {t.profitability.expenses.setBudget}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfitabilitySection;
