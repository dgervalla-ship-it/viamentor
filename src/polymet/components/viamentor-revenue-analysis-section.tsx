/**
 * VIAMENTOR - Revenue Analysis Section
 * Analyse revenus avec ComposedChart, table catégories, PieChart
 */

"use client";

import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  ReferenceDot,
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
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import type {
  RevenueDataPoint,
  CategoryRevenue,
  FinancialLocale,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RevenueAnalysisSectionProps {
  revenueData: RevenueDataPoint[];
  categoryRevenues: CategoryRevenue[];
  locale?: FinancialLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RevenueAnalysisSection({
  revenueData,
  categoryRevenues,
  locale = "fr",
}: RevenueAnalysisSectionProps) {
  const t = getFinancialTranslations(locale);
  const [sortColumn, setSortColumn] =
    useState<keyof CategoryRevenue>("revenue");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Sort category revenues
  const sortedCategories = [...categoryRevenues].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const multiplier = sortDirection === "asc" ? 1 : -1;
    return (aValue < bValue ? -1 : 1) * multiplier;
  });

  const handleSort = (column: keyof CategoryRevenue) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Prepare pie chart data
  const pieData = categoryRevenues.map((cat) => ({
    name: `Catégorie ${cat.category}`,
    value: cat.revenue,
    percentage: cat.contribution,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Evolution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.revenue.chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />

              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />

              <YAxis
                yAxisId="right"
                orientation="right"
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
                formatter={(value: number) => formatCurrency(value)}
              />

              <Legend />

              {/* Stacked bars for revenue sources */}
              <Bar
                yAxisId="left"
                dataKey="lessons"
                stackId="revenue"
                fill="hsl(var(--chart-1))"
                name={t.revenue.chart.sources.lessons}
                radius={[0, 0, 0, 0]}
              />

              <Bar
                yAxisId="left"
                dataKey="packages"
                stackId="revenue"
                fill="hsl(var(--chart-2))"
                name={t.revenue.chart.sources.packages}
                radius={[0, 0, 0, 0]}
              />

              <Bar
                yAxisId="left"
                dataKey="theory"
                stackId="revenue"
                fill="hsl(var(--chart-3))"
                name={t.revenue.chart.sources.theory}
                radius={[0, 0, 0, 0]}
              />

              <Bar
                yAxisId="left"
                dataKey="exams"
                stackId="revenue"
                fill="hsl(var(--chart-4))"
                name={t.revenue.chart.sources.exams}
                radius={[0, 0, 0, 0]}
              />

              <Bar
                yAxisId="left"
                dataKey="other"
                stackId="revenue"
                fill="hsl(var(--chart-5))"
                name={t.revenue.chart.sources.other}
                radius={[4, 4, 0, 0]}
              />

              {/* Cumulative line */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cumulative"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name={t.revenue.chart.cumulative}
              />

              {/* Event markers */}
              {revenueData.map((point, index) =>
                point.events?.map((event, eventIndex) => (
                  <ReferenceDot
                    key={`${index}-${eventIndex}`}
                    x={point.month}
                    y={
                      point.lessons +
                      point.packages +
                      point.theory +
                      point.exams +
                      point.other
                    }
                    yAxisId="left"
                    r={6}
                    fill={
                      event.type === "promotion"
                        ? "hsl(var(--chart-1))"
                        : event.type === "rentree"
                          ? "hsl(var(--chart-2))"
                          : "hsl(var(--chart-3))"
                    }
                    stroke="white"
                    strokeWidth={2}
                  />
                ))
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Revenue Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.revenue.byCategory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("category")}
                  >
                    {t.revenue.byCategory.category}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("students")}
                  >
                    {t.revenue.byCategory.students}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("revenue")}
                  >
                    {t.revenue.byCategory.revenue}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("revenuePerStudent")}
                  >
                    {t.revenue.byCategory.revenuePerStudent}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("contribution")}
                  >
                    {t.revenue.byCategory.contribution}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.revenue.byCategory.margin}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCategories.map((cat) => (
                  <TableRow key={cat.category}>
                    <TableCell>
                      <Badge variant="outline" className="font-semibold">
                        {cat.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{cat.students}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(cat.revenue)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(cat.revenuePerStudent)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        {cat.contribution.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {cat.margin ? (
                        <div className="flex items-center justify-end gap-1">
                          {cat.margin >= 30 ? (
                            <ArrowUpIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                          )}
                          <span
                            className={
                              cat.margin >= 30
                                ? "text-green-600 dark:text-green-400"
                                : "text-orange-600 dark:text-orange-400"
                            }
                          >
                            {cat.margin.toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.revenue.byCategory.contribution}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) =>
                    `${name}: ${percentage.toFixed(1)}%`
                  }
                  outerRadius={80}
                  fill="hsl(var(--chart-1))"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RevenueAnalysisSection;
