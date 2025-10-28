import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  PlusIcon,
  FilterIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import type { InstructorLesson } from "@/polymet/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { useInstructorDetailTranslations } from "@/polymet/data/viamentor-instructor-detail-i18n";

interface PlanningTabProps {
  lessons: InstructorLesson[];
  locale?: InstructorDetailLocale;
  onNewLesson?: () => void;
  onModifyLesson?: (lesson: InstructorLesson) => void;
  onCancelLesson?: (lesson: InstructorLesson) => void;
  onExport?: () => void;
}

type ViewMode = "month" | "week" | "day";

export function ViamentorInstructorPlanningTab({
  lessons,
  locale = "fr",
  onNewLesson,
  onModifyLesson,
  onCancelLesson,
  onExport,
}: PlanningTabProps) {
  const t = useInstructorDetailTranslations(locale);
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getLessonStatusBadge = (status: InstructorLesson["status"]) => {
    const statusMap = {
      scheduled: { variant: "outline" as const, label: t.lessonScheduled },
      completed: { variant: "secondary" as const, label: t.lessonCompleted },
      cancelled: { variant: "destructive" as const, label: t.lessonCancelled },
      in_progress: { variant: "default" as const, label: t.lessonInProgress },
    };

    const config = statusMap[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getLessonTypeBadge = (type: InstructorLesson["type"]) => {
    const typeMap = {
      theory: t.lessonTheory,
      practical: t.lessonPractical,
      exam: t.lessonExam,
      evaluation: t.lessonEvaluation,
    };

    return <Badge variant="outline">{typeMap[type]}</Badge>;
  };

  // Calculate utilization data
  const utilizationData = [
    { day: "Lun", available: 8, booked: 6 },
    { day: "Mar", available: 8, booked: 7 },
    { day: "Mer", available: 8, booked: 5 },
    { day: "Jeu", available: 8, booked: 8 },
    { day: "Ven", available: 8, booked: 6 },
  ];

  const totalAvailable = utilizationData.reduce(
    (sum, d) => sum + d.available,
    0
  );
  const totalBooked = utilizationData.reduce((sum, d) => sum + d.booked, 0);
  const utilizationPercent = Math.round((totalBooked / totalAvailable) * 100);
  const targetPercent = 80;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />

            {selectedDate.toLocaleDateString(locale)}
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={viewMode}
            onValueChange={(v) => setViewMode(v as ViewMode)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">{t.planningViewMonth}</SelectItem>
              <SelectItem value="week">{t.planningViewWeek}</SelectItem>
              <SelectItem value="day">{t.planningViewDay}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <FilterIcon className="h-4 w-4 mr-2" />

            {t.planningFilters}
          </Button>

          <Button variant="outline" size="sm" onClick={onExport}>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.planningExport}
          </Button>

          <Button size="sm" onClick={onNewLesson}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.planningNewLesson}
          </Button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`${
              lesson.status === "in_progress"
                ? "border-primary animate-pulse"
                : lesson.status === "completed"
                  ? "bg-muted/50"
                  : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={lesson.studentAvatar} />

                    <AvatarFallback>{lesson.studentName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {lesson.studentName}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <ClockIcon className="h-3 w-3" />
                      {lesson.startTime} - {lesson.endTime} ({lesson.duration}
                      min)
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getLessonStatusBadge(lesson.status)}
                  <span className="text-xs text-muted-foreground">
                    {lesson.date}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="secondary">{lesson.category}</Badge>
                {getLessonTypeBadge(lesson.type)}
                <Badge variant="outline">{lesson.vehicle}</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPinIcon className="h-3 w-3" />

                  {lesson.location}
                </div>
              </div>

              {lesson.notes && (
                <p className="text-sm text-muted-foreground mb-3">
                  {lesson.notes}
                </p>
              )}

              {lesson.status !== "completed" &&
                lesson.status !== "cancelled" && (
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => onModifyLesson?.(lesson)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-destructive"
                            onClick={() => onCancelLesson?.(lesson)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Utilization Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t.planningUtilization}</CardTitle>
          <CardDescription>
            {t.planningBooked}: {totalBooked}h / {t.planningAvailable}:{" "}
            {totalAvailable}h
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {utilizationPercent}% ({t.planningTarget}: {targetPercent}%)
              </span>
              <span
                className={
                  utilizationPercent >= targetPercent
                    ? "text-green-600"
                    : "text-orange-600"
                }
              >
                {utilizationPercent >= targetPercent
                  ? "✓ Objectif atteint"
                  : "⚠ Sous objectif"}
              </span>
            </div>
            <Progress value={utilizationPercent} className="h-2" />
          </div>

          <ChartContainer config={{}} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="available"
                  fill="hsl(var(--muted))"
                  name={t.planningAvailable}
                />

                <Bar
                  dataKey="booked"
                  fill="hsl(var(--primary))"
                  name={t.planningBooked}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
