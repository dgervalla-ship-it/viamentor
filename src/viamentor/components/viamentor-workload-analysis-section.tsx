/**
 * VIAMENTOR - Workload Analysis Section
 * Analyse charge de travail moniteurs
 */

import {
  AlertTriangleIcon,
  AlertCircleIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  WorkloadData,
  PerformanceLocale,
} from "@/viamentor/data/viamentor-instructors-performance-data";
import { performanceTranslations } from "@/viamentor/data/viamentor-instructors-performance-i18n";

interface WorkloadAnalysisSectionProps {
  workloadData: WorkloadData[];
  locale?: PerformanceLocale;
  onAdjustAvailability?: (instructorId: string) => void;
  onReassignStudents?: (instructorId: string) => void;
}

export function WorkloadAnalysisSection({
  workloadData,
  locale = "fr",
  onAdjustAvailability,
  onReassignStudents,
}: WorkloadAnalysisSectionProps) {
  const t = performanceTranslations[locale].workload;

  const getStatusBadge = (status: WorkloadData["status"]) => {
    const variants = {
      underutilized: {
        label: t.status.underutilized,
        variant: "secondary" as const,
        color: "text-slate-600",
      },
      optimal: {
        label: t.status.optimal,
        variant: "default" as const,
        color: "text-green-600",
      },
      overloaded: {
        label: t.status.overloaded,
        variant: "destructive" as const,
        color: "text-red-600",
      },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getWorkloadColor = (hours: number) => {
    if (hours < 30) return "hsl(var(--chart-1))";
    if (hours <= 40) return "hsl(var(--chart-2))";
    if (hours <= 45) return "hsl(var(--chart-4))";
    return "hsl(var(--destructive))";
  };

  // Prepare chart data
  const chartData = workloadData.map((w) => ({
    name: w.instructorName,
    hours: w.weeklyHours,
    hoursB: w.hoursByCategory.B,
    hoursA: w.hoursByCategory.A,
    hoursBE: w.hoursByCategory.BE,
  }));

  // Alerts
  const overloadedInstructors = workloadData.filter((w) => w.weeklyHours > 45);
  const criticalOverload = workloadData.filter((w) => w.weeklyHours > 50);

  // Heatmap data
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          {/* Alerts */}
          {criticalOverload.length > 0 && (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />

              <AlertDescription>
                {t.alerts.danger}:{" "}
                {criticalOverload.map((i) => i.instructorName).join(", ")}
              </AlertDescription>
            </Alert>
          )}
          {overloadedInstructors.length > 0 &&
            criticalOverload.length === 0 && (
              <Alert>
                <AlertTriangleIcon className="h-4 w-4" />

                <AlertDescription>
                  {t.alerts.warning}:{" "}
                  {overloadedInstructors
                    .map((i) => i.instructorName)
                    .join(", ")}
                </AlertDescription>
              </Alert>
            )}

          {/* Comparison Chart */}
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold mb-4">{t.chart.title}</h3>
            <div className="-mx-4 sm:mx-0">
              <ChartContainer config={{}} className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ left: 0, right: 10, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />

                    <XAxis
                      type="number"
                      className="text-xs"
                      tick={{ fontSize: 10 }}
                    />

                    <YAxis
                      dataKey="name"
                      type="category"
                      width={80}
                      className="text-xs"
                      tick={{ fontSize: 10 }}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />

                    <Legend wrapperStyle={{ fontSize: "12px" }} />

                    <ReferenceLine
                      x={35}
                      stroke="hsl(var(--chart-2))"
                      strokeDasharray="3 3"
                      label={{ value: "35h", position: "top" }}
                    />

                    <ReferenceLine
                      x={40}
                      stroke="hsl(var(--chart-2))"
                      strokeDasharray="3 3"
                      label={{ value: "40h", position: "top" }}
                    />

                    <Bar
                      dataKey="hoursB"
                      stackId="a"
                      fill="hsl(var(--chart-1))"
                      name="Cat. B"
                    />

                    <Bar
                      dataKey="hoursA"
                      stackId="a"
                      fill="hsl(var(--chart-2))"
                      name="Cat. A"
                    />

                    <Bar
                      dataKey="hoursBE"
                      stackId="a"
                      fill="hsl(var(--chart-3))"
                      name="Cat. BE"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Detail Table - Desktop */}
          <div className="hidden lg:block rounded-md border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.table.instructor}</TableHead>
                    <TableHead className="text-right">
                      {t.table.weeklyHours}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.lessons}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.daysWorked}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.hoursPerDay}
                    </TableHead>
                    <TableHead className="text-right">
                      {t.table.availabilityRemaining}
                    </TableHead>
                    <TableHead>{t.table.status}</TableHead>
                    <TableHead className="text-right">
                      {t.table.actions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workloadData.map((instructor) => (
                    <TableRow key={instructor.instructorId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={instructor.avatar}
                              alt={instructor.instructorName}
                            />

                            <AvatarFallback>
                              {instructor.instructorName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {instructor.instructorName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            instructor.weeklyHours > 45
                              ? "font-bold text-red-600"
                              : ""
                          }
                        >
                          {instructor.weeklyHours}h
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {instructor.lessonsCount}
                      </TableCell>
                      <TableCell className="text-right">
                        {instructor.daysWorked}
                      </TableCell>
                      <TableCell className="text-right">
                        {instructor.hoursPerDay.toFixed(1)}h
                      </TableCell>
                      <TableCell className="text-right">
                        {instructor.availabilityRemaining}%
                      </TableCell>
                      <TableCell>{getStatusBadge(instructor.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onAdjustAvailability?.(instructor.instructorId)
                            }
                          >
                            <SettingsIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onReassignStudents?.(instructor.instructorId)
                            }
                          >
                            <UsersIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Detail Cards - Mobile & Tablet */}
          <div className="lg:hidden space-y-3 -mx-4 sm:mx-0">
            {workloadData.map((instructor) => (
              <Card key={instructor.instructorId} className="overflow-hidden">
                <CardContent className="p-4">
                  {/* Header with Avatar and Name */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.instructorName}
                        />

                        <AvatarFallback>
                          {instructor.instructorName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm">
                          {instructor.instructorName}
                        </div>
                        <div className="mt-1">
                          {getStatusBadge(instructor.status)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        instructor.weeklyHours > 45
                          ? "text-2xl font-bold text-red-600"
                          : "text-2xl font-bold text-foreground"
                      }
                    >
                      {instructor.weeklyHours}h
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {t.table.lessons}
                      </div>
                      <div className="text-lg font-semibold">
                        {instructor.lessonsCount}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {t.table.daysWorked}
                      </div>
                      <div className="text-lg font-semibold">
                        {instructor.daysWorked}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {t.table.hoursPerDay}
                      </div>
                      <div className="text-lg font-semibold">
                        {instructor.hoursPerDay.toFixed(1)}h
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {t.table.availabilityRemaining}
                      </div>
                      <div className="text-lg font-semibold">
                        {instructor.availabilityRemaining}%
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        onAdjustAvailability?.(instructor.instructorId)
                      }
                    >
                      <SettingsIcon className="h-4 w-4 mr-2" />

                      <span className="text-xs">Disponibilité</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        onReassignStudents?.(instructor.instructorId)
                      }
                    >
                      <UsersIcon className="h-4 w-4 mr-2" />

                      <span className="text-xs">Réassigner</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Heatmap */}
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold mb-4">
              Répartition Hebdomadaire
            </h3>
            <div className="space-y-2 -mx-4 sm:mx-0">
              {workloadData.map((instructor) => (
                <div
                  key={instructor.instructorId}
                  className="flex items-center gap-2 sm:gap-4 px-4 sm:px-0"
                >
                  <div className="w-20 sm:w-32 text-xs sm:text-sm font-medium truncate flex-shrink-0">
                    {instructor.instructorName}
                  </div>
                  <div className="flex-1 grid grid-cols-7 gap-0.5 sm:gap-1 min-w-0">
                    {daysOfWeek.map((day, index) => {
                      const dateKey = `2025-01-${6 + index}`;
                      const hours = instructor.dailyHours[dateKey] || 0;
                      const opacity = hours / 10;
                      return (
                        <div
                          key={day}
                          className="h-8 sm:h-10 rounded flex items-center justify-center text-[10px] sm:text-xs font-medium min-w-0"
                          style={{
                            backgroundColor: `hsl(var(--chart-2) / ${opacity})`,
                            color:
                              opacity > 0.5
                                ? "white"
                                : "hsl(var(--foreground))",
                          }}
                          title={`${day}: ${hours}h`}
                        >
                          <span className="truncate px-0.5">
                            {hours > 0 ? `${hours}h` : "-"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
