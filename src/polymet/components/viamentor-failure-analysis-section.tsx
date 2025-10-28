/**
 * VIAMENTOR - Failure Analysis Section
 * Analyse échecs avec motifs et élèves difficulté
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  AlertTriangleIcon,
  FileTextIcon,
  TargetIcon,
  UserIcon,
  HeartIcon,
} from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import type {
  FailureAnalysis,
  MultipleFailureStudent,
} from "@/polymet/data/viamentor-exams-analytics-data";
import type { ExamsLocale } from "@/polymet/data/viamentor-exams-analytics-i18n";
import {
  getExamsTranslations,
  getFailureReasonLabel,
} from "@/polymet/data/viamentor-exams-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FailureAnalysisSectionProps {
  failureReasons: FailureAnalysis[];
  multipleFailureStudents: MultipleFailureStudent[];
  locale?: ExamsLocale;
  onAttestation?: (studentId: string) => void;
  onTargetedLessons?: (studentId: string) => void;
  onChangeInstructor?: (studentId: string) => void;
  onSupport?: (studentId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FailureAnalysisSection({
  failureReasons,
  multipleFailureStudents,
  locale = "fr",
  onAttestation,
  onTargetedLessons,
  onChangeInstructor,
  onSupport,
}: FailureAnalysisSectionProps) {
  const t = getExamsTranslations(locale);

  const urgentStudents = multipleFailureStudents.filter((s) => s.attempts >= 3);

  // Préparer données PieChart
  const pieData = failureReasons.map((reason) => ({
    name: getFailureReasonLabel(reason.reason, locale),
    value: reason.percentage,
    count: reason.count,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="space-y-6">
      {/* Alert Urgent */}
      {urgentStudents.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>
            <strong>{urgentStudents.length}</strong>{" "}
            {t.failures.multipleFailures.alert}
          </AlertDescription>
        </Alert>
      )}

      {/* PieChart Motifs */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {t.failures.reasons.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.failures.reasons.subtitle}
        </p>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
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
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-popover p-3 rounded-lg border border-border">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.count} échecs ({data.value.toFixed(1)}%)
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>

      {/* Table Élèves Difficulté */}
      <Card className="p-6 bg-card">
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {t.failures.multipleFailures.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t.failures.multipleFailures.subtitle}
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {t.failures.multipleFailures.table.student}
                </TableHead>
                <TableHead>
                  {t.failures.multipleFailures.table.category}
                </TableHead>
                <TableHead>
                  {t.failures.multipleFailures.table.attempts}
                </TableHead>
                <TableHead>
                  {t.failures.multipleFailures.table.lastExam}
                </TableHead>
                <TableHead>
                  {t.failures.multipleFailures.table.instructor}
                </TableHead>
                <TableHead>
                  {t.failures.multipleFailures.table.progression}
                </TableHead>
                <TableHead>
                  {t.failures.multipleFailures.table.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {multipleFailureStudents.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">
                    {student.studentName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.attempts >= 3 ? "destructive" : "secondary"
                      }
                    >
                      {student.attempts}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(student.lastExamDate).toLocaleDateString(locale)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {student.instructorName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            student.progression >= 75
                              ? "bg-green-500"
                              : student.progression >= 50
                                ? "bg-orange-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${student.progression}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {student.progression}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onAttestation?.(student.studentId)}
                        title={
                          t.failures.multipleFailures.actionButtons.attestation
                        }
                      >
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onTargetedLessons?.(student.studentId)}
                        title={
                          t.failures.multipleFailures.actionButtons
                            .targetedLessons
                        }
                      >
                        <TargetIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onChangeInstructor?.(student.studentId)}
                        title={
                          t.failures.multipleFailures.actionButtons
                            .changeInstructor
                        }
                      >
                        <UserIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onSupport?.(student.studentId)}
                        title={
                          t.failures.multipleFailures.actionButtons.support
                        }
                      >
                        <HeartIcon className="h-4 w-4" />
                      </Button>
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
