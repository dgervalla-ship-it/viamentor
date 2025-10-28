/**
 * VIAMENTOR - Promotions Analytics Dashboard
 * Dashboard analytics impact promotions avec charts revenus, ROI, top promotions
 */

"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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
  Area,
  AreaChart,
  ComposedChart,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TicketIcon,
  DollarSignIcon,
  PercentIcon,
  UsersIcon,
  DownloadIcon,
  CalendarIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";

import {
  mockPromotionAnalytics,
  type PromotionAnalytics,
  type PricingLocale,
} from "@/polymet/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  formatPercentage,
} from "@/polymet/data/viamentor-pricing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PromotionsAnalyticsDashboardProps {
  locale?: PricingLocale;
  dateRange?: {
    start: string;
    end: string;
  };
  onExport?: () => void;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// Mock ROI evolution data
const generateROIEvolutionData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, "dd/MM"),
      fullDate: format(date, "yyyy-MM-dd"),
      roi: 5 + Math.random() * 10,
      revenue: 15000 + Math.random() * 10000,
      discount: 2000 + Math.random() * 3000,
      usages: Math.floor(10 + Math.random() * 30),
    });
  }
  return data;
};

// ============================================================================
// COMPONENT
// ============================================================================

export function PromotionsAnalyticsDashboard({
  locale = "fr",
  dateRange,
  onExport,
}: PromotionsAnalyticsDashboardProps) {
  const t = getPricingTranslation(locale);
  const [analytics, setAnalytics] = useState<PromotionAnalytics[]>(
    mockPromotionAnalytics
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>("30d");
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Get date-fns locale
  const dateLocale = {
    fr: fr,
    de: de,
    it: it,
    en: enUS,
  }[locale];

  // Generate ROI evolution data based on selected period
  const roiEvolutionData = useMemo(() => {
    const days =
      {
        "7d": 7,
        "30d": 30,
        "90d": 90,
        "1y": 365,
        custom: 30,
      }[selectedPeriod] || 30;
    return generateROIEvolutionData(days);
  }, [selectedPeriod]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Code",
      "Revenus",
      "Remise",
      "Utilisations",
      "Panier moyen",
      "ROI",
      "Top catégories",
    ];

    const rows = analytics.map((promo) => [
      promo.promotionCode,
      promo.totalRevenue.toFixed(2),
      promo.discountGiven.toFixed(2),
      promo.usageCount,
      promo.averageOrderValue.toFixed(2),
      promo.roi.toFixed(1),
      promo.topCategories.map((c) => `${c.category}:${c.count}`).join("; "),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `promotions-analytics-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  // Export to Excel (simplified CSV with .xlsx extension)
  const handleExportExcel = () => {
    const headers = [
      "Code",
      "Revenus (CHF)",
      "Remise (CHF)",
      "Utilisations",
      "Panier moyen (CHF)",
      "ROI",
      "Revenus sans promo (CHF)",
      "Top catégories",
    ];

    const rows = analytics.map((promo) => [
      promo.promotionCode,
      promo.totalRevenue.toFixed(2),
      promo.discountGiven.toFixed(2),
      promo.usageCount,
      promo.averageOrderValue.toFixed(2),
      promo.roi.toFixed(1),
      promo.revenueWithoutPromo.toFixed(2),
      promo.topCategories.map((c) => `${c.category} (${c.count})`).join("; "),
    ]);

    const csv = [headers, ...rows].map((row) => row.join("\t")).join("\n");
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `promotions-analytics-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
    link.click();
  };

  // Handle custom date range
  const handleCustomDateRange = () => {
    if (customDateRange.from && customDateRange.to) {
      setSelectedPeriod("custom");
      setShowCustomDatePicker(false);
      // In real app, fetch data for this date range
    }
  };

  // Calculate overall stats
  const totalStats = analytics.reduce(
    (acc, promo) => ({
      totalRevenue: acc.totalRevenue + promo.totalRevenue,
      discountGiven: acc.discountGiven + promo.discountGiven,
      usageCount: acc.usageCount + promo.usageCount,
      avgROI: acc.avgROI + promo.roi,
    }),
    { totalRevenue: 0, discountGiven: 0, usageCount: 0, avgROI: 0 }
  );

  totalStats.avgROI = totalStats.avgROI / (analytics.length || 1);

  // Chart colors
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  // Prepare chart data
  const revenueChartData = analytics.map((promo) => ({
    name: promo.promotionCode,
    revenue: promo.totalRevenue,
    discount: promo.discountGiven,
    revenueWithoutPromo: promo.revenueWithoutPromo,
  }));

  const roiChartData = analytics.map((promo) => ({
    name: promo.promotionCode,
    roi: promo.roi,
    usageCount: promo.usageCount,
  }));

  // Top categories across all promotions
  const allCategories = analytics.flatMap((promo) => promo.topCategories);
  const categoryTotals = allCategories.reduce(
    (acc, cat) => {
      const existing = acc.find((c) => c.category === cat.category);
      if (existing) {
        existing.revenue += cat.revenue;
        existing.count += cat.count;
      } else {
        acc.push({ ...cat });
      }
      return acc;
    },
    [] as { category: string; count: number; revenue: number }[]
  );

  const categoryChartData = categoryTotals.map((cat) => ({
    name: cat.category,
    value: cat.revenue,
    count: cat.count,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {t.promotionsAnalytics || "Analytics Promotions"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t.promotionsAnalyticsDescription ||
              "Analyse d'impact et ROI des codes promotionnels"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <CalendarIcon className="h-4 w-4 mr-2" />

              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{t.last7Days || "7 jours"}</SelectItem>
              <SelectItem value="30d">{t.last30Days || "30 jours"}</SelectItem>
              <SelectItem value="90d">{t.last90Days || "90 jours"}</SelectItem>
              <SelectItem value="1y">{t.lastYear || "1 an"}</SelectItem>
              <SelectItem value="custom">
                {t.customPeriod || "Période personnalisée"}
              </SelectItem>
            </SelectContent>
          </Select>

          {selectedPeriod === "custom" && (
            <Popover
              open={showCustomDatePicker}
              onOpenChange={setShowCustomDatePicker}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />

                  {customDateRange.from && customDateRange.to
                    ? `${format(customDateRange.from, "dd/MM/yyyy")} - ${format(customDateRange.to, "dd/MM/yyyy")}`
                    : t.selectDates || "Sélectionner dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-3 space-y-3">
                  <Calendar
                    mode="range"
                    selected={customDateRange}
                    onSelect={(range: any) =>
                      setCustomDateRange(
                        range || { from: undefined, to: undefined }
                      )
                    }
                    locale={dateLocale}
                    numberOfMonths={2}
                  />

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCustomDateRange({ from: undefined, to: undefined });
                        setShowCustomDatePicker(false);
                      }}
                    >
                      {t.cancel || "Annuler"}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={handleCustomDateRange}
                      disabled={!customDateRange.from || !customDateRange.to}
                    >
                      {t.apply || "Appliquer"}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <DownloadIcon className="h-4 w-4 mr-2" />

                {t.export || "Exporter"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleExportCSV}
                >
                  <FileTextIcon className="h-4 w-4 mr-2" />

                  {t.exportCSV || "Exporter CSV"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleExportExcel}
                >
                  <FileSpreadsheetIcon className="h-4 w-4 mr-2" />

                  {t.exportExcel || "Exporter Excel"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.totalRevenue || "Revenus totaux"}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalStats.totalRevenue, locale)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.withPromotions || "Avec promotions"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <DollarSignIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.discountGiven || "Remises accordées"}
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatCurrency(totalStats.discountGiven, locale)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatPercentage(
                  (totalStats.discountGiven /
                    (totalStats.totalRevenue + totalStats.discountGiven)) *
                    100,
                  locale
                )}{" "}
                {t.ofRevenue || "du CA"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <PercentIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.totalUsages || "Utilisations"}
              </p>
              <p className="text-2xl font-bold">{totalStats.usageCount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.acrossPromotions || "Toutes promotions"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <TicketIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.avgROI || "ROI moyen"}
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalStats.avgROI.toFixed(1)}x
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.returnOnInvestment || "Retour sur investissement"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* ROI Evolution Chart - Full Width */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">
              {t.roiEvolution || "Évolution du ROI"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t.roiEvolutionDescription ||
                "Performance des promotions dans le temps"}
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            {selectedPeriod === "7d" && (t.last7Days || "7 jours")}
            {selectedPeriod === "30d" && (t.last30Days || "30 jours")}
            {selectedPeriod === "90d" && (t.last90Days || "90 jours")}
            {selectedPeriod === "1y" && (t.lastYear || "1 an")}
            {selectedPeriod === "custom" && (t.customPeriod || "Personnalisé")}
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={roiEvolutionData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />

            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />

            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{
                value: t.roi || "ROI",
                angle: -90,
                position: "insideLeft",
                style: { fill: "hsl(var(--muted-foreground))" },
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{
                value: t.revenue || "Revenus",
                angle: 90,
                position: "insideRight",
                style: { fill: "hsl(var(--muted-foreground))" },
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: any, name: string) => {
                if (name === "ROI")
                  return [`${value.toFixed(1)}x`, t.roi || "ROI"];
                if (name === "Revenus")
                  return [
                    formatCurrency(value, locale),
                    t.revenue || "Revenus",
                  ];

                if (name === "Remises")
                  return [
                    formatCurrency(value, locale),
                    t.discount || "Remises",
                  ];

                if (name === "Utilisations")
                  return [value, t.usages || "Utilisations"];
                return [value, name];
              }}
            />

            <Legend />

            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              fill="url(#colorRevenue)"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              name={t.revenue || "Revenus"}
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="roi"
              stroke="hsl(var(--chart-2))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              name={t.roi || "ROI"}
            />

            <Bar
              yAxisId="right"
              dataKey="discount"
              fill="hsl(var(--chart-3))"
              opacity={0.6}
              name={t.discount || "Remises"}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Comparison Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.revenueComparison || "Comparaison Revenus"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />

              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Legend />

              <Bar
                dataKey="revenue"
                fill={COLORS[0]}
                name={t.actualRevenue || "Revenus réels"}
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="revenueWithoutPromo"
                fill={COLORS[1]}
                name={t.revenueWithoutPromo || "Sans promo"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* ROI Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.roiByPromotion || "ROI par Promotion"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />

              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="roi"
                stroke={COLORS[2]}
                strokeWidth={2}
                name={t.roi || "ROI"}
                dot={{ fill: COLORS[2], r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.revenueByCategory || "Revenus par Catégorie"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) =>
                  `${entry.name}: ${formatCurrency(entry.value, locale)}`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
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
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Promotions Table */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.topPromotions || "Top Promotions"}
          </h3>
          <div className="space-y-3">
            {analytics
              .sort((a, b) => b.roi - a.roi)
              .slice(0, 5)
              .map((promo, index) => (
                <div
                  key={promo.promotionId}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <code className="font-mono font-semibold text-sm">
                        {promo.promotionCode}
                      </code>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <UsersIcon className="h-3 w-3 mr-1" />

                          {promo.usageCount}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(promo.averageOrderValue, locale)}{" "}
                          {t.avgOrder || "moy."}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {promo.roi.toFixed(1)}x
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(promo.totalRevenue, locale)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.detailedAnalytics || "Analytics Détaillées"}
        </h3>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.promotionCode || "Code"}</TableHead>
                <TableHead className="text-right">
                  {t.revenue || "Revenus"}
                </TableHead>
                <TableHead className="text-right">
                  {t.discount || "Remise"}
                </TableHead>
                <TableHead className="text-center">
                  {t.usages || "Utilisations"}
                </TableHead>
                <TableHead className="text-right">
                  {t.avgOrderValue || "Panier moyen"}
                </TableHead>
                <TableHead className="text-center">{t.roi || "ROI"}</TableHead>
                <TableHead>{t.topCategories || "Top catégories"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.map((promo) => (
                <TableRow key={promo.promotionId}>
                  <TableCell>
                    <code className="px-2 py-1 bg-muted rounded text-sm font-mono font-semibold">
                      {promo.promotionCode}
                    </code>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(promo.totalRevenue, locale)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600 dark:text-orange-400 font-medium">
                    -{formatCurrency(promo.discountGiven, locale)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{promo.usageCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(promo.averageOrderValue, locale)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="default"
                      className={
                        promo.roi >= 10
                          ? "bg-green-600"
                          : promo.roi >= 5
                            ? "bg-blue-600"
                            : "bg-orange-600"
                      }
                    >
                      {promo.roi.toFixed(1)}x
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {promo.topCategories.slice(0, 2).map((cat) => (
                        <Badge
                          key={cat.category}
                          variant="outline"
                          className="text-xs"
                        >
                          {cat.category}: {cat.count}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
