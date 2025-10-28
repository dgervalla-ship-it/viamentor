/**
 * VIAMENTOR - Theory Course Card
 * Card calendar event pour cours théoriques 1vsN
 */

import { UsersIcon, DoorOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { TheoryCourse } from "@/polymet/data/viamentor-theory-courses-data";
import {
  getEnrollmentPercentage,
  getProgressColor,
  formatCourseDate,
  formatTimeRange,
} from "@/polymet/data/viamentor-theory-courses-data";
import {
  getTheoryCoursesTranslation,
  type TheoryCoursesLocale,
} from "@/polymet/data/viamentor-theory-courses-i18n";

interface TheoryCourseCardProps {
  course: TheoryCourse;
  locale?: TheoryCoursesLocale;
  onClick?: () => void;
  className?: string;
}

export function TheoryCourseCard({
  course,
  locale = "fr",
  onClick,
  className,
}: TheoryCourseCardProps) {
  const t = getTheoryCoursesTranslation(locale);
  const percentage = getEnrollmentPercentage(course.enrolled, course.capacity);
  const progressColor = getProgressColor(percentage);
  const isFull = course.enrolled >= course.capacity;

  // Status background alpha
  const statusBg = {
    scheduled: "bg-blue-500/10 hover:bg-blue-500/20",
    in_progress: "bg-green-500/10 hover:bg-green-500/20",
    completed: "bg-muted hover:bg-muted/80",
    canceled: "bg-destructive/10 hover:bg-destructive/20",
  };

  // Status badge variant
  const statusVariant = {
    scheduled: "default",
    in_progress: "default",
    completed: "secondary",
    canceled: "destructive",
  } as const;

  // Progress bar color
  const progressBarColor = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    destructive: "bg-destructive",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative border-l-4 border-secondary rounded-lg p-3 space-y-2 cursor-pointer transition-shadow",
        statusBg[course.status],
        "hover:shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <UsersIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{course.topic}</h4>
          <Badge variant="secondary" className="text-xs mt-1">
            {t.courseTypes[course.type]}
          </Badge>
        </div>
      </div>

      {/* Row 1: Date & Time */}
      <div className="text-xs text-muted-foreground">
        <span className="font-medium">
          {formatCourseDate(course.startDate, course.endDate, locale)}
        </span>
        {" • "}
        <span>{formatTimeRange(course.startTime, course.endTime)}</span>
      </div>

      {/* Row 2: Instructor & Room */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-muted-foreground truncate">
          {course.instructor.firstName} {course.instructor.lastName}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <DoorOpenIcon className="h-3 w-3" />

          <Badge variant="outline" className="text-xs">
            {course.room.number}
          </Badge>
        </div>
      </div>

      {/* Row 3: Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {course.enrolled}/{course.capacity} {t.card.enrolled}
          </span>
          <span
            className={cn(
              "font-medium",
              progressColor === "destructive" && "text-destructive",
              progressColor === "orange" && "text-orange-600",
              progressColor === "green" && "text-green-600"
            )}
          >
            {percentage}%
          </span>
        </div>
        <Progress
          value={percentage}
          className="h-1.5"
          indicatorClassName={progressBarColor[progressColor]}
        />
      </div>

      {/* Footer: Status badge */}
      <div className="flex items-center justify-between pt-1">
        <Badge variant={statusVariant[course.status]} className="text-xs">
          {t.status[course.status]}
        </Badge>
        {isFull && (
          <Badge variant="destructive" className="text-xs">
            {t.card.full}
          </Badge>
        )}
      </div>
    </div>
  );
}
