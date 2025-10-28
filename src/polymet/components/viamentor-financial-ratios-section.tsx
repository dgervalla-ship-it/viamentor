/**
 * VIAMENTOR - Financial Ratios Section
 * Ratios financiers clés avec RadarChart et benchmarks
 */

"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
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
import { CheckCircle2Icon, AlertTriangleIcon, XCircleIcon } from "lucide-react";
import type {
  FinancialRatio,
  FinancialLocale,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FinancialRatiosSectionProps {
  ratios: FinancialRatio[];
  locale?: FinancialLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FinancialRatiosSection({
  ratios,
  locale = "fr",
}: FinancialRatiosSectionProps) {
  const t = getFinancialTranslations(locale);

  const formatValue = (value: number, unit: string) => {
    if (unit === "CHF") {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "CHF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return `${value.toFixed(2)} ${unit}`;
  };

  const getStatus = (ratio: FinancialRatio): "good" | "warning" | "poor" => {
    const diff = ratio.value - ratio.benchmark;
    if (ratio.name === "DSO" || ratio.name === "DPO") {
      // Lower is better for DSO, higher is better for DPO
      if (ratio.name === "DSO") {
        return diff <= 0 ? "good" : diff <= 10 ? "warning" : "poor";
      } else {
        return diff >= 0 ? "good" : diff >= -5 ? "warning" : "poor";
      }
    } else {
      // Higher is better for other ratios
      return diff >= 0 ? "good" : diff >= -0.2 ? "warning" : "poor";
    }
  };

  const getStatusIcon = (status: "good" | "warning" | "poor") => {
    switch (status) {
      case "good":
        return (
          <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
        );

      case "warning":
        return (
          <AlertTriangleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        );

      case "poor":
        return (
          <XCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
        );
    }
  };

  const getStatusBadge = (status: "good" | "warning" | "poor") => {
    const variant =
      status === "good"
        ? "default"
        : status === "warning"
          ? "secondary"
          : "destructive";
    return <Badge variant={variant}>{t.ratios[status]}</Badge>;
  };

  // Prepare radar chart data (normalize to 0-100 scale)
  const radarData = ratios.map((ratio) => {
    const normalizeValue = (val: number, benchmark: number) => {
      if (ratio.unit === "CHF") {
        return Math.min(100, (val / benchmark) * 50);
      }
      if (ratio.name === "DSO") {
        return Math.max(0, 100 - (val / benchmark) * 100);
      }
      return Math.min(100, (val / benchmark) * 100);
    };

    return {
      metric:
        t.ratios.metrics[
          ratio.name
            .toLowerCase()
            .replace(/[^a-z]/g, "") as keyof typeof t.ratios.metrics
        ] || ratio.name,
      value: normalizeValue(ratio.value, ratio.benchmark),
      benchmark: 100,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.ratios.radar}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />

                <PolarAngleAxis
                  dataKey="metric"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />

                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />

                <Radar
                  name={t.ratios.value}
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />

                <Radar
                  name={t.ratios.benchmark}
                  dataKey="benchmark"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.3}
                />

                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ratios Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t.ratios.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.ratios.name}</TableHead>
                  <TableHead className="text-right">{t.ratios.value}</TableHead>
                  <TableHead className="text-right">
                    {t.ratios.benchmark}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.ratios.status}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ratios.map((ratio) => {
                  const status = getStatus(ratio);
                  return (
                    <TableRow key={ratio.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          {t.ratios.metrics[
                            ratio.name
                              .toLowerCase()
                              .replace(
                                /[^a-z]/g,
                                ""
                              ) as keyof typeof t.ratios.metrics
                          ] || ratio.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatValue(ratio.value, ratio.unit)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatValue(ratio.benchmark, ratio.unit)}
                      </TableCell>
                      <TableCell className="text-right">
                        {getStatusBadge(status)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FinancialRatiosSection;
