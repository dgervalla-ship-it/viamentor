/**
 * VIAMENTOR - Preparation, Benchmarking & Recommendations Sections
 * Sections combinées pour analytics examens
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import type {
  LessonsDistribution,
  TimingBucket,
  Benchmark,
  Recommendation,
} from "@/polymet/data/viamentor-exams-analytics-data";
import type { ExamsLocale } from "@/polymet/data/viamentor-exams-analytics-i18n";
import { getExamsTranslations } from "@/polymet/data/viamentor-exams-analytics-i18n";

// ============================================================================
// PREPARATION SECTION
// ============================================================================

interface PreparationAnalysisSectionProps {
  lessonsDistribution: LessonsDistribution[];
  timingBuckets: TimingBucket[];
  locale?: ExamsLocale;
}

export function PreparationAnalysisSection({
  lessonsDistribution,
  timingBuckets,
  locale = "fr",
}: PreparationAnalysisSectionProps) {
  const t = getExamsTranslations(locale);

  return (
    <div className="space-y-6">
      {/* Histogram Distribution */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {t.preparation.distribution.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.preparation.distribution.subtitle}
        </p>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lessonsDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="range"
                stroke="hsl(var(--muted-foreground))"
                label={{
                  value: t.preparation.distribution.xAxis,
                  position: "insideBottom",
                  offset: -5,
                }}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                label={{
                  value: t.preparation.distribution.yAxis,
                  angle: -90,
                  position: "insideLeft",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Bar
                dataKey="count"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <p className="text-sm text-green-500 mt-4 font-medium">
          ✓ {t.preparation.distribution.optimal}
        </p>
      </Card>

      {/* Timing Buckets */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.timing.byTiming.title}
        </h3>
        <div className="space-y-4">
          {timingBuckets.map((bucket) => (
            <div key={bucket.range} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-foreground">
                {bucket.range}
              </div>
              <div className="flex-1">
                <Progress value={bucket.successRate} className="h-3" />
              </div>
              <div className="w-24 text-right">
                <Badge
                  variant={bucket.successRate >= 80 ? "default" : "secondary"}
                >
                  {bucket.successRate.toFixed(1)}%
                </Badge>
              </div>
              <div className="w-20 text-sm text-muted-foreground text-right">
                ({bucket.count})
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// BENCHMARKING SECTION
// ============================================================================

interface ExamsBenchmarkingSectionProps {
  benchmarks: Benchmark[];
  targetRate?: number;
  currentRate?: number;
  locale?: ExamsLocale;
}

export function ExamsBenchmarkingSection({
  benchmarks,
  targetRate,
  currentRate,
  locale = "fr",
}: ExamsBenchmarkingSectionProps) {
  const t = getExamsTranslations(locale);

  return (
    <div className="space-y-6">
      {/* vs National */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.benchmarking.vsNational.title}
        </h3>
        <div className="space-y-4">
          {benchmarks.map((benchmark) => (
            <div
              key={benchmark.metric}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {benchmark.metric}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t.benchmarking.vsNational.our}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {benchmark.ourValue.toFixed(1)}
                      {benchmark.metric.includes("Taux") ? "%" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t.benchmarking.vsNational.national}
                    </p>
                    <p className="text-lg font-bold text-muted-foreground">
                      {benchmark.nationalAverage.toFixed(1)}
                      {benchmark.metric.includes("Taux") ? "%" : ""}
                    </p>
                  </div>
                </div>
              </div>
              <Badge
                variant={benchmark.better ? "default" : "destructive"}
                className="flex items-center gap-1"
              >
                {benchmark.better ? (
                  <TrendingUpIcon className="h-3 w-3" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3" />
                )}
                {benchmark.better
                  ? t.benchmarking.vsNational.better
                  : t.benchmarking.vsNational.worse}{" "}
                ({Math.abs(benchmark.delta).toFixed(1)}
                {benchmark.metric.includes("Taux") ? "%" : ""})
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* vs Targets */}
      {targetRate && currentRate && (
        <Card className="p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            {t.benchmarking.vsTargets.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {t.benchmarking.vsTargets.target}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {targetRate.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {t.benchmarking.vsTargets.current}
              </p>
              <p className="text-3xl font-bold text-green-500">
                {currentRate.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {t.benchmarking.vsTargets.gap}
              </p>
              <p
                className={`text-3xl font-bold ${
                  currentRate >= targetRate
                    ? "text-green-500"
                    : "text-orange-500"
                }`}
              >
                {currentRate >= targetRate ? "✓" : ""}
                {(targetRate - currentRate).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// RECOMMENDATIONS SECTION
// ============================================================================

interface ExamsRecommendationsSectionProps {
  recommendations: Recommendation[];
  locale?: ExamsLocale;
  onImplement?: (recommendationId: string) => void;
}

export function ExamsRecommendationsSection({
  recommendations,
  locale = "fr",
  onImplement,
}: ExamsRecommendationsSectionProps) {
  const t = getExamsTranslations(locale);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;

      case "medium":
        return <TargetIcon className="h-5 w-5 text-orange-500" />;

      default:
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-500/5";
      case "medium":
        return "border-orange-500 bg-orange-500/5";
      default:
        return "border-blue-500 bg-blue-500/5";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">
          {t.recommendations.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t.recommendations.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className={`p-6 border-l-4 ${getPriorityColor(rec.priority)}`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">{getPriorityIcon(rec.priority)}</div>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {rec.title}
                    </h4>
                    <Badge variant="outline" className="mt-1">
                      {
                        t.recommendations.priority[
                          rec.priority as keyof typeof t.recommendations.priority
                        ]
                      }
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onImplement?.(rec.id)}
                    className="ml-4"
                  >
                    {t.recommendations.implement}
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  {rec.description}
                </p>

                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {t.recommendations.impact}:
                  </p>
                  <p className="text-sm text-green-500">{rec.impact}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    {t.recommendations.actions}:
                  </p>
                  <ul className="space-y-1">
                    {rec.actions.map((action, index) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
