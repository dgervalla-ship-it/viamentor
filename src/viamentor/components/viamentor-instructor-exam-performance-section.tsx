/**
 * VIAMENTOR - Instructor Exam Performance Section
 * Performance moniteurs avec ScatterPlot
 */

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
} from "recharts";
import { TrophyIcon } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import type { InstructorExamPerformance } from "@/viamentor/data/viamentor-exams-analytics-data";
import type { ExamsLocale } from "@/viamentor/data/viamentor-exams-analytics-i18n";
import { getExamsTranslations } from "@/viamentor/data/viamentor-exams-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorExamPerformanceSectionProps {
  instructors: InstructorExamPerformance[];
  locale?: ExamsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorExamPerformanceSection({
  instructors,
  locale = "fr",
}: InstructorExamPerformanceSectionProps) {
  const t = getExamsTranslations(locale);

  // Trier par taux réussite
  const sortedInstructors = [...instructors].sort(
    (a, b) => b.successRate - a.successRate
  );
  const topInstructors = sortedInstructors.slice(0, 3);

  // Préparer données ScatterPlot
  const scatterData = instructors.map((inst) => ({
    x: inst.averageLessons,
    y: inst.successRate,
    z: inst.studentsPresented,
    name: inst.instructorName,
  }));

  const avgLessons =
    instructors.reduce((sum, i) => sum + i.averageLessons, 0) /
    instructors.length;
  const avgSuccessRate =
    instructors.reduce((sum, i) => sum + i.successRate, 0) / instructors.length;

  return (
    <div className="space-y-6">
      {/* DataTable */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.instructorPerf.title}
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.instructorPerf.table.instructor}</TableHead>
                <TableHead>{t.instructorPerf.table.presented}</TableHead>
                <TableHead>{t.instructorPerf.table.passed}</TableHead>
                <TableHead>{t.instructorPerf.table.rate}</TableHead>
                <TableHead>{t.instructorPerf.table.avgAttempts}</TableHead>
                <TableHead>{t.instructorPerf.table.avgLessons}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedInstructors.map((inst, index) => (
                <TableRow key={inst.instructorId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {index < 3 && (
                        <TrophyIcon
                          className={`h-4 w-4 ${
                            index === 0
                              ? "text-yellow-500"
                              : index === 1
                                ? "text-gray-400"
                                : "text-orange-600"
                          }`}
                        />
                      )}
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={inst.avatar} />

                        <AvatarFallback>
                          {inst.instructorName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{inst.instructorName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{inst.studentsPresented}</TableCell>
                  <TableCell>{inst.studentsPassed}</TableCell>
                  <TableCell>
                    <Badge
                      variant={inst.successRate >= 80 ? "default" : "secondary"}
                    >
                      {inst.successRate.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{inst.averageAttempts.toFixed(1)}</TableCell>
                  <TableCell>{inst.averageLessons.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* ScatterPlot */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.instructorPerf.scatter.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.instructorPerf.scatter.efficient} (↖) vs{" "}
          {t.instructorPerf.scatter.inefficient} (↘)
        </p>
        <ChartContainer config={{}} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                type="number"
                dataKey="x"
                name={t.instructorPerf.scatter.xAxis}
                stroke="hsl(var(--muted-foreground))"
              />

              <YAxis
                type="number"
                dataKey="y"
                name={t.instructorPerf.scatter.yAxis}
                stroke="hsl(var(--muted-foreground))"
              />

              <ZAxis type="number" dataKey="z" range={[100, 400]} />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover p-3 rounded-lg border border-border">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.instructorPerf.scatter.xAxis}: {data.x.toFixed(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.instructorPerf.scatter.yAxis}: {data.y.toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.instructorPerf.table.presented}: {data.z}
                      </p>
                    </div>
                  );
                }}
              />

              <ReferenceLine
                x={avgLessons}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
              />

              <ReferenceLine
                y={avgSuccessRate}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
              />

              <Scatter data={scatterData} fill="hsl(var(--chart-1))" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Top Moniteurs Podium */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t.instructorPerf.topInstructors.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {t.instructorPerf.topInstructors.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topInstructors.map((inst, index) => (
            <Card
              key={inst.instructorId}
              className={`p-6 text-center ${
                index === 0
                  ? "bg-yellow-500/10 border-yellow-500"
                  : index === 1
                    ? "bg-gray-400/10 border-gray-400"
                    : "bg-orange-600/10 border-orange-600"
              }`}
            >
              <TrophyIcon
                className={`h-12 w-12 mx-auto mb-4 ${
                  index === 0
                    ? "text-yellow-500"
                    : index === 1
                      ? "text-gray-400"
                      : "text-orange-600"
                }`}
              />

              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={inst.avatar} />

                <AvatarFallback>
                  {inst.instructorName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-foreground mb-2">
                {inst.instructorName}
              </p>
              <p className="text-3xl font-bold text-green-500 mb-2">
                {inst.successRate.toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">
                {inst.studentsPassed}/{inst.studentsPresented}{" "}
                {t.instructorPerf.table.passed}
              </p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
