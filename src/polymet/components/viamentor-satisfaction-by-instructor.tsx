/**
 * VIAMENTOR - Satisfaction By Instructor
 * Satisfaction élèves par moniteur
 */

import { StarIcon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import type {
  SatisfactionData,
  PerformanceLocale,
} from "@/polymet/data/viamentor-instructors-performance-data";
import { performanceTranslations } from "@/polymet/data/viamentor-instructors-performance-i18n";

interface SatisfactionByInstructorProps {
  satisfactionData: SatisfactionData;
  locale?: PerformanceLocale;
  onTraining?: (instructorId: string) => void;
  onFeedback?: (instructorId: string) => void;
  onReassign?: (instructorId: string) => void;
}

export function SatisfactionByInstructor({
  satisfactionData,
  locale = "fr",
  onTraining,
  onFeedback,
  onReassign,
}: SatisfactionByInstructorProps) {
  const t = performanceTranslations[locale].satisfaction;

  // Prepare distribution chart data (simplified BoxPlot as BarChart)
  const distributionChartData = satisfactionData.distributionData.map((d) => ({
    name: d.instructorName,
    min: d.min,
    q1: d.q1,
    median: d.median,
    q3: d.q3,
    max: d.max,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-green-600" />

              {t.topRated.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satisfactionData.topRated.map((instructor) => (
                <div
                  key={instructor.id}
                  className="p-4 rounded-lg border border-border bg-green-50 dark:bg-green-950/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.name}
                        />

                        <AvatarFallback>
                          {instructor.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{instructor.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(instructor.rating)
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {instructor.rating.toFixed(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({instructor.reviewsCount} {t.topRated.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <blockquote className="mt-3 text-sm italic text-muted-foreground border-l-2 border-green-600 pl-3">
                    "{instructor.bestComment}"
                  </blockquote>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Needs Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-amber-600" />

              {t.needsImprovement.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {satisfactionData.needsImprovement.map((instructor) => (
                <div
                  key={instructor.id}
                  className="p-4 rounded-lg border border-border bg-amber-50 dark:bg-amber-950/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.name}
                        />

                        <AvatarFallback>
                          {instructor.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{instructor.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(instructor.rating)
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {instructor.rating.toFixed(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({instructor.reviewsCount} {t.topRated.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t.needsImprovement.issues}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.recurringIssues.map((issue, index) => (
                        <Badge key={index} variant="secondary">
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onTraining?.(instructor.id)}
                    >
                      {t.needsImprovement.actions.training}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onFeedback?.(instructor.id)}
                    >
                      {t.needsImprovement.actions.feedback}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReassign?.(instructor.id)}
                    >
                      {t.needsImprovement.actions.reassign}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.distribution.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="name" className="text-xs" />

                <YAxis domain={[0, 5]} className="text-xs" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold mb-2">{data.name}</p>
                          <div className="space-y-1 text-sm">
                            <p>Min: {data.min.toFixed(1)}</p>
                            <p>Q1: {data.q1.toFixed(1)}</p>
                            <p className="font-semibold">
                              Médiane: {data.median.toFixed(1)}
                            </p>
                            <p>Q3: {data.q3.toFixed(1)}</p>
                            <p>Max: {data.max.toFixed(1)}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar dataKey="median" radius={[4, 4, 0, 0]}>
                  {distributionChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.median >= 4.5
                          ? "hsl(var(--chart-2))"
                          : "hsl(var(--chart-4))"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Distribution des notes médianes par moniteur (hover pour détails
            quartiles)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
