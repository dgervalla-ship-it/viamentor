/**
 * VIAMENTOR - Vehicle Planning Tab
 * Calendar view avec leçons assignées, disponibilités, conflits horaires
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
} from "lucide-react";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface VehicleLesson {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  studentName: string;
  instructorName: string;
  type: "practical" | "exam";
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  hasConflict?: boolean;
}

interface VehiclePlanningTabProps {
  vehicleId: string;
  lessons: VehicleLesson[];
  locale?: VehicleDetailLocale;
  onViewLesson?: (lessonId: string) => void;
  onBookLesson?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function VehiclePlanningTab({
  vehicleId,
  lessons,
  locale = "fr",
  onViewLesson,
  onBookLesson,
}: VehiclePlanningTabProps) {
  const t = getVehicleDetailI18n(locale).planning;

  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Get week dates
  const getWeekDates = (date: Date) => {
    const week = [];
    const first = date.getDate() - date.getDay() + 1; // Monday
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(first + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    if (filterStatus !== "all" && lesson.status !== filterStatus) return false;
    return true;
  });

  // Get lessons for a specific date
  const getLessonsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return filteredLessons.filter((lesson) => lesson.date === dateStr);
  };

  // Navigation
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      scheduled: "outline",
      in_progress: "default",
      completed: "secondary",
      cancelled: "destructive",
    };
    return variants[status] || "outline";
  };

  // Stats
  const stats = {
    total: filteredLessons.length,
    scheduled: filteredLessons.filter((l) => l.status === "scheduled").length,
    conflicts: filteredLessons.filter((l) => l.hasConflict).length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.totalLessons}
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.scheduled}</p>
                <p className="text-2xl font-bold">{stats.scheduled}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.conflicts}</p>
                <p className="text-2xl font-bold text-destructive">
                  {stats.conflicts}
                </p>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>
                {t.today}
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <CardTitle className="ml-4">
                {formatMonthYear(currentDate)}
              </CardTitle>
            </div>

            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <FilterIcon className="h-4 w-4 mr-2" />

                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allStatus}</SelectItem>
                  <SelectItem value="scheduled">{t.statusScheduled}</SelectItem>
                  <SelectItem value="in_progress">
                    {t.statusInProgress}
                  </SelectItem>
                  <SelectItem value="completed">{t.statusCompleted}</SelectItem>
                  <SelectItem value="cancelled">{t.statusCancelled}</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={onBookLesson}>{t.bookLesson}</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Week View */}
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, index) => {
              const dayLessons = getLessonsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`min-h-[200px] border rounded-lg p-2 ${
                    isToday ? "bg-accent/50 border-primary" : "bg-card"
                  }`}
                >
                  {/* Day Header */}
                  <div className="text-center mb-2 pb-2 border-b">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(date).split(" ")[0]}
                    </p>
                    <p
                      className={`text-lg font-semibold ${
                        isToday ? "text-primary" : ""
                      }`}
                    >
                      {date.getDate()}
                    </p>
                  </div>

                  {/* Lessons */}
                  <div className="space-y-1">
                    {dayLessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => onViewLesson?.(lesson.id)}
                        className={`w-full text-left p-2 rounded text-xs hover:bg-accent transition-colors ${
                          lesson.hasConflict
                            ? "bg-destructive/10 border border-destructive"
                            : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <ClockIcon className="h-3 w-3" />

                          <span className="font-medium">
                            {lesson.startTime}
                          </span>
                        </div>
                        <p className="truncate font-medium">
                          {lesson.studentName}
                        </p>
                        <p className="truncate text-muted-foreground">
                          {lesson.instructorName}
                        </p>
                        {lesson.hasConflict && (
                          <Badge
                            variant="destructive"
                            className="mt-1 text-[10px] h-4"
                          >
                            {t.conflict}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conflicts Alert */}
      {stats.conflicts > 0 && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />

              <div>
                <p className="font-semibold text-destructive">
                  {t.conflictsDetected}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.conflictsMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
