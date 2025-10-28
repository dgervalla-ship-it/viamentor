/**
 * VIAMENTOR - Cash Flow Forecast Section
 * Prévisions trésorerie avec ML, AreaChart, scenarios
 */

"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import type {
  ForecastDataPoint,
  ScenarioType,
  FinancialLocale,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";
import {
  applyScenario,
  detectCashFlowAlerts,
} from "@/polymet/data/viamentor-revenue-forecast-ml";

// ============================================================================
// TYPES
// ============================================================================

interface CashFlowForecastSectionProps {
  forecastData: ForecastDataPoint[];
  locale?: FinancialLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CashFlowForecastSection({
  forecastData,
  locale = "fr",
}: CashFlowForecastSectionProps) {
  const t = getFinancialTranslations(locale);
  const [scenario, setScenario] = useState<ScenarioType>("realistic");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Apply selected scenario
  const adjustedForecast =
    scenario === "realistic"
      ? forecastData
      : applyScenario(forecastData, scenario);
  const alerts = detectCashFlowAlerts(adjustedForecast);

  // Pagination logic
  const totalPages = Math.ceil(adjustedForecast.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return adjustedForecast.slice(startIndex, startIndex + itemsPerPage);
  }, [adjustedForecast, currentPage]);

  // Reset to page 1 when scenario changes
  const handleScenarioChange = (newScenario: ScenarioType) => {
    setScenario(newScenario);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* ML Enabled Badge */}
      <div className="flex items-center gap-2">
        <Badge variant="default" className="bg-blue-500">
          <CheckCircle2Icon className="h-3 w-3 mr-1" />

          {t.forecast.mlEnabled}
        </Badge>
        <Select
          value={scenario}
          onValueChange={(v) => handleScenarioChange(v as ScenarioType)}
        >
          <SelectTrigger className="w-full max-w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="optimistic">
              {t.forecast.scenarios.optimistic}
            </SelectItem>
            <SelectItem value="realistic">
              {t.forecast.scenarios.realistic}
            </SelectItem>
            <SelectItem value="pessimistic">
              {t.forecast.scenarios.pessimistic}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>
            {t.forecast.alert}: {alerts.map((a) => a.month).join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.forecast.chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={adjustedForecast} margin={{ bottom: 8 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="colorConfidence"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--muted))"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="hsl(var(--muted))"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
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

              {/* Confidence interval */}
              <Area
                type="monotone"
                dataKey="confidenceMax"
                stroke="none"
                fill="url(#colorConfidence)"
                fillOpacity={0.3}
                name={t.forecast.chart.confidence}
              />

              <Area
                type="monotone"
                dataKey="confidenceMin"
                stroke="none"
                fill="white"
                fillOpacity={1}
              />

              {/* Revenue and Expenses */}
              <Area
                type="monotone"
                dataKey="revenueExpected"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name={t.forecast.chart.revenueExpected}
              />

              <Area
                type="monotone"
                dataKey="expensesExpected"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorExpenses)"
                name={t.forecast.chart.expensesExpected}
              />

              {/* Event markers */}
              {adjustedForecast.map((point, index) =>
                point.events?.map((event, eventIndex) => (
                  <ReferenceDot
                    key={`${index}-${eventIndex}`}
                    x={point.month}
                    y={point.revenueExpected}
                    r={6}
                    fill={
                      event.type === "promotion"
                        ? "hsl(var(--chart-1))"
                        : "hsl(var(--chart-2))"
                    }
                    stroke="white"
                    strokeWidth={2}
                  />
                ))
              )}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Forecast Table/Cards */}
      <Card>
        <CardHeader>
          <CardTitle>{t.forecast.nextMonths.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View (hidden on mobile/tablet) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.forecast.nextMonths.month}</TableHead>
                  <TableHead className="text-right">
                    {t.forecast.nextMonths.revenue}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.forecast.nextMonths.expenses}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.forecast.nextMonths.balance}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.forecast.nextMonths.confidencePercent}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((forecast) => (
                  <TableRow key={forecast.month}>
                    <TableCell className="font-medium">
                      {forecast.month}
                    </TableCell>
                    <TableCell className="text-right text-green-600 dark:text-green-400">
                      {formatCurrency(forecast.revenueExpected)}
                    </TableCell>
                    <TableCell className="text-right text-red-600 dark:text-red-400">
                      {formatCurrency(forecast.expensesExpected)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          forecast.cashFlow >= 0 ? "default" : "destructive"
                        }
                      >
                        {formatCurrency(forecast.cashFlow)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          forecast.confidence >= 80 ? "default" : "secondary"
                        }
                      >
                        {forecast.confidence}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Cards View */}
          <div className="md:hidden space-y-3">
            {paginatedData.map((forecast) => (
              <Card key={forecast.month} className="border border-border">
                <CardContent className="p-4 space-y-3">
                  {/* Header: Month + Confidence Badge */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base">
                      {forecast.month}
                    </h3>
                    <Badge
                      variant={
                        forecast.confidence >= 80 ? "default" : "secondary"
                      }
                    >
                      {forecast.confidence}%{" "}
                      {t.forecast.nextMonths.confidencePercent}
                    </Badge>
                  </div>

                  {/* Revenue */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground shrink-0">
                      {t.forecast.nextMonths.revenue}
                    </span>
                    <span className="text-base font-medium text-green-600 dark:text-green-400 min-w-0 truncate text-right max-w-[55%] xs:max-w-none">
                      {formatCurrency(forecast.revenueExpected)}
                    </span>
                  </div>

                  {/* Expenses */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground shrink-0">
                      {t.forecast.nextMonths.expenses}
                    </span>
                    <span className="text-base font-medium text-red-600 dark:text-red-400 min-w-0 truncate text-right max-w-[55%] xs:max-w-none">
                      {formatCurrency(forecast.expensesExpected)}
                    </span>
                  </div>

                  {/* Balance */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm font-medium">
                      {t.forecast.nextMonths.balance}
                    </span>
                    <Badge
                      variant={
                        forecast.cashFlow >= 0 ? "default" : "destructive"
                      }
                      className="text-sm"
                    >
                      {formatCurrency(forecast.cashFlow)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {locale === "fr" &&
                  `Affichage ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, adjustedForecast.length)} sur ${adjustedForecast.length}`}
                {locale === "de" &&
                  `Anzeige ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, adjustedForecast.length)} von ${adjustedForecast.length}`}
                {locale === "it" &&
                  `Visualizzazione ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, adjustedForecast.length)} di ${adjustedForecast.length}`}
                {locale === "en" &&
                  `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, adjustedForecast.length)} of ${adjustedForecast.length}`}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="shrink-0"
                >
                  <ChevronLeftIcon className="h-4 w-4" />

                  <span className="hidden sm:inline ml-1">
                    {locale === "fr" && "Précédent"}
                    {locale === "de" && "Zurück"}
                    {locale === "it" && "Precedente"}
                    {locale === "en" && "Previous"}
                  </span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 overflow-x-auto max-w-[35vw] scrollbar-hide">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      // Show first, last, current, and adjacent pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="min-w-[36px]"
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span
                            key={page}
                            className="px-1 text-muted-foreground"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="shrink-0"
                >
                  <span className="hidden sm:inline mr-1">
                    {locale === "fr" && "Suivant"}
                    {locale === "de" && "Weiter"}
                    {locale === "it" && "Successivo"}
                    {locale === "en" && "Next"}
                  </span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CashFlowForecastSection;
