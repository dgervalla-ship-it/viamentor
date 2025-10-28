/**
 * VIAMENTOR - Pricing Analytics Dashboard
 * Dashboard analytics impact promotions sur revenus
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  PercentIcon,
  DollarSignIcon,
  UsersIcon,
  TargetIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  formatCurrency,
  getPricingTranslation,
  type PricingLocale,
} from "@/viamentor/data/viamentor-pricing-i18n";
import { mockPromotionAnalytics } from "@/viamentor/data/viamentor-pricing-data";

// ============================================================================
// TYPES
// ============================================================================

interface PricingAnalyticsDashboardProps {
  locale?: PricingLocale;
  dateRange?: { start: string; end: string };
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PricingAnalyticsDashboard({
  locale = "fr",
  dateRange,
}: PricingAnalyticsDashboardProps) {
  const t = getPricingTranslation(locale);

  // Calculate KPIs
  const totalRevenue = mockPromotionAnalytics.reduce(
    (sum, p) => sum + p.totalRevenue,
    0
  );
  const totalRevenueWithoutPromo = mockPromotionAnalytics.reduce(
    (sum, p) => sum + p.revenueWithoutPromo,
    0
  );
  const totalDiscountGiven = mockPromotionAnalytics.reduce(
    (sum, p) => sum + p.discountGiven,
    0
  );
  const totalUsages = mockPromotionAnalytics.reduce(
    (sum, p) => sum + p.usageCount,
    0
  );
  const averageROI =
    mockPromotionAnalytics.reduce((sum, p) => sum + p.roi, 0) /
    mockPromotionAnalytics.length;
  const conversionRate = (totalUsages / (totalUsages + 150)) * 100; // Mock conversion

  // Chart data
  const revenueComparisonData = [
    {
      name: "Revenus avec promos",
      value: totalRevenue,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Revenus sans promos",
      value: totalRevenueWithoutPromo,
      fill: "hsl(var(--chart-2))",
    },
  ];

  const promotionPerformanceData = mockPromotionAnalytics.map((p) => ({
    name: p.promotionCode,
    revenue: p.totalRevenue,
    discount: p.discountGiven,
    roi: p.roi,
  }));

  const categoryBreakdownData = mockPromotionAnalytics
    .flatMap((p) =>
      p.topCategories.map((cat) => ({
        category: cat.category,
        revenue: cat.revenue,
        count: cat.count,
      }))
    )
    .reduce(
      (acc, item) => {
        const existing = acc.find((a) => a.category === item.category);
        if (existing) {
          existing.revenue += item.revenue;
          existing.count += item.count;
        } else {
          acc.push({ ...item });
        }
        return acc;
      },
      [] as { category: string; revenue: number; count: number }[]
    );

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenus totaux</p>
              <p className="text-2xl font-bold mt-1">
                {formatCurrency(totalRevenue, locale)}
              </p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUpIcon className="h-4 w-4" />

                <span>
                  +
                  {Math.round(
                    ((totalRevenue - totalRevenueWithoutPromo) /
                      totalRevenueWithoutPromo) *
                      100 *
                      -1
                  )}
                  % vs sans promo
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSignIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Remises accordées</p>
              <p className="text-2xl font-bold mt-1">
                {formatCurrency(totalDiscountGiven, locale)}
              </p>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <PercentIcon className="h-4 w-4" />

                <span>
                  {Math.round(
                    (totalDiscountGiven / totalRevenueWithoutPromo) * 100
                  )}
                  % du CA potentiel
                </span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <TrendingDownIcon className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Utilisations</p>
              <p className="text-2xl font-bold mt-1">{totalUsages}</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                <UsersIcon className="h-4 w-4" />

                <span>Taux conversion {conversionRate.toFixed(1)}%</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ROI moyen</p>
              <p className="text-2xl font-bold mt-1">
                {averageROI.toFixed(1)}x
              </p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUpIcon className="h-4 w-4" />

                <span>Excellent retour</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <TargetIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Comparison */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Comparaison revenus</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueComparisonData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

              <XAxis dataKey="name" className="text-xs" />

              <YAxis className="text-xs" />

              <Tooltip
                formatter={(value: number) => formatCurrency(value, locale)}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                }}
              />

              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Répartition par catégorie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdownData}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) =>
                  `${entry.category}: ${formatCurrency(entry.revenue, locale)}`
                }
              >
                {categoryBreakdownData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value, locale)}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Promotion Performance Table */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Performance des promotions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-semibold">Code promo</th>
                <th className="text-right py-3 font-semibold">Utilisations</th>
                <th className="text-right py-3 font-semibold">
                  Revenus générés
                </th>
                <th className="text-right py-3 font-semibold">Remises</th>
                <th className="text-right py-3 font-semibold">ROI</th>
                <th className="text-right py-3 font-semibold">Panier moyen</th>
              </tr>
            </thead>
            <tbody>
              {mockPromotionAnalytics.map((promo) => (
                <tr key={promo.promotionId} className="border-b">
                  <td className="py-3">
                    <Badge variant="secondary" className="font-mono">
                      {promo.promotionCode}
                    </Badge>
                  </td>
                  <td className="text-right py-3">{promo.usageCount}</td>
                  <td className="text-right py-3 font-medium">
                    {formatCurrency(promo.totalRevenue, locale)}
                  </td>
                  <td className="text-right py-3 text-destructive">
                    -{formatCurrency(promo.discountGiven, locale)}
                  </td>
                  <td className="text-right py-3">
                    <Badge variant={promo.roi > 10 ? "default" : "secondary"}>
                      {promo.roi.toFixed(1)}x
                    </Badge>
                  </td>
                  <td className="text-right py-3">
                    {formatCurrency(promo.averageOrderValue, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Promotion Performance Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">ROI par promotion</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={promotionPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

            <XAxis dataKey="name" className="text-xs" />

            <YAxis className="text-xs" />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="roi"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name="ROI"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
