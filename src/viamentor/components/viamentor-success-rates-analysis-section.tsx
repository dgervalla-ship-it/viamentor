/**
 * VIAMENTOR - Success Rates Analysis Section
 * Analyse taux réussite avec charts
 */

import { useState } from "react";
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
import { TrendingUpIcon, TrendingDownIcon, DownloadIcon } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import type {
  CategorySuccessRate,
  MonthlySuccessRate,
  ExamCategory,
  ExamType,
} from "@/viamentor/data/viamentor-exams-analytics-data";
import type { ExamsLocale } from "@/viamentor/data/viamentor-exams-analytics-i18n";
import { getExamsTranslations } from "@/viamentor/data/viamentor-exams-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SuccessRatesAnalysisSectionProps {
  categoryRates: CategorySuccessRate[];
  monthlyRates: MonthlySuccessRate[];
  globalRate: number;
  globalTrend: number;
  nationalAverage?: number;
  locale?: ExamsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SuccessRatesAnalysisSection({
  categoryRates,
  monthlyRates,
  globalRate,
  globalTrend,
  nationalAverage,
  locale = "fr",
}: SuccessRatesAnalysisSectionProps) {
  const t = getExamsTranslations(locale);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Préparer données pour BarChart
  const barChartData = categoryRates.map((cat) => ({
    category: cat.category,
    [t.examTypes.theory]: cat.theoryExams.rate,
    [t.examTypes.practical]: cat.practicalExams.rate,
  }));

  const COLORS = {
    theory: "hsl(var(--chart-1))",
    practical: "hsl(var(--chart-2))",
  };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <Card className="p-4 bg-card">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-muted-foreground mb-2 block">
              {t.successRates.filters.category}
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t.successRates.filters.allCategories}
                </SelectItem>
                {categoryRates.map((cat) => (
                  <SelectItem key={cat.category} value={cat.category}>
                    {cat.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-muted-foreground mb-2 block">
              {t.successRates.filters.examType}
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t.successRates.filters.allTypes}
                </SelectItem>
                <SelectItem value="theory">{t.examTypes.theory}</SelectItem>
                <SelectItem value="practical">
                  {t.examTypes.practical}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="mt-6">
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.common.export}
          </Button>
        </div>
      </Card>

      {/* Taux Global */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.successRates.global.title}
        </h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p
              className={`text-5xl font-bold ${
                globalRate >= 80
                  ? "text-green-500"
                  : globalRate >= 70
                    ? "text-orange-500"
                    : "text-red-500"
              }`}
            >
              {globalRate.toFixed(1)}%
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {globalTrend > 0 ? (
                <TrendingUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-muted-foreground">
                {globalTrend > 0 ? "+" : ""}
                {globalTrend.toFixed(1)}% {t.successRates.global.vsPrevious}
              </span>
            </div>
          </div>

          {nationalAverage && (
            <div className="border-l border-border pl-6">
              <p className="text-sm text-muted-foreground mb-1">
                {t.successRates.global.vsNational}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {nationalAverage.toFixed(1)}%
                </span>
                <Badge
                  variant={
                    globalRate > nationalAverage ? "default" : "secondary"
                  }
                >
                  {globalRate > nationalAverage ? "+" : ""}
                  {(globalRate - nationalAverage).toFixed(1)}%
                </Badge>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* BarChart par Catégorie */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.successRates.byCategory.title}
        </h3>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />

              <YAxis stroke="hsl(var(--muted-foreground))" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Legend />

              <Bar
                dataKey={t.examTypes.theory}
                fill={COLORS.theory}
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey={t.examTypes.practical}
                fill={COLORS.practical}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Table Détails */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.successRates.details.title}
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.successRates.details.category}</TableHead>
                <TableHead colSpan={3} className="text-center">
                  {t.successRates.details.theory}
                </TableHead>
                <TableHead colSpan={3} className="text-center">
                  {t.successRates.details.practical}
                </TableHead>
                <TableHead>{t.successRates.details.avgAttempts}</TableHead>
                <TableHead>{t.successRates.details.avgLessons}</TableHead>
              </TableRow>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>{t.successRates.details.total}</TableHead>
                <TableHead>{t.successRates.details.passed}</TableHead>
                <TableHead>{t.successRates.details.rate}</TableHead>
                <TableHead>{t.successRates.details.total}</TableHead>
                <TableHead>{t.successRates.details.passed}</TableHead>
                <TableHead>{t.successRates.details.rate}</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryRates.map((cat) => (
                <TableRow key={cat.category}>
                  <TableCell className="font-medium">{cat.category}</TableCell>
                  <TableCell>{cat.theoryExams.total}</TableCell>
                  <TableCell>{cat.theoryExams.passed}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cat.theoryExams.rate >= 80 ? "default" : "secondary"
                      }
                    >
                      {cat.theoryExams.rate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{cat.practicalExams.total}</TableCell>
                  <TableCell>{cat.practicalExams.passed}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cat.practicalExams.rate >= 80 ? "default" : "secondary"
                      }
                    >
                      {cat.practicalExams.rate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{cat.averageAttempts.toFixed(1)}</TableCell>
                  <TableCell>{cat.averageLessons.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* LineChart Évolution */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.successRates.evolution.title}
        </h3>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyRates}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />

              <YAxis stroke="hsl(var(--muted-foreground))" />

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
                dataKey="theoryRate"
                name={t.successRates.evolution.theory}
                stroke={COLORS.theory}
                strokeWidth={2}
                dot={{ fill: COLORS.theory, r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="practicalRate"
                name={t.successRates.evolution.practical}
                stroke={COLORS.practical}
                strokeWidth={2}
                dot={{ fill: COLORS.practical, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  );
}
