/**
 * VIAMENTOR - Lesson Event Card
 * Card compact pour affichage leçon dans calendar
 */

"use client";

import { Car, Bike, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  Lesson,
  LessonStatus,
} from "@/viamentor/data/viamentor-lessons-data";
import type { LessonsLocale } from "@/viamentor/data/viamentor-lessons-i18n";
import { getLessonsTranslations } from "@/viamentor/data/viamentor-lessons-i18n";

interface LessonEventCardProps {
  lesson: Lesson;
  locale?: LessonsLocale;
  onClick?: () => void;
  className?: string;
}

/**
 * Get category icon
 */
function getCategoryIcon(category: string) {
  if (category === "A" || category === "A1") {
    return <Bike className="w-4 h-4" />;
  }
  return <Car className="w-4 h-4" />;
}

/**
 * Get category color
 */
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    A: "text-orange-600 dark:text-orange-400",
    A1: "text-orange-500 dark:text-orange-300",
    B: "text-blue-600 dark:text-blue-400",
    C: "text-green-600 dark:text-green-400",
    D: "text-purple-600 dark:text-purple-400",
  };
  return colors[category] || "text-gray-600 dark:text-gray-400";
}

/**
 * Get status badge config
 */
function getStatusBadge(
  status: LessonStatus,
  t: ReturnType<typeof getLessonsTranslations>
) {
  const configs = {
    scheduled: {
      label: t.status.scheduled,
      variant: "outline" as const,
      className:
        "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700",
      icon: null,
    },
    in_progress: {
      label: t.status.in_progress,
      variant: "secondary" as const,
      className:
        "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 animate-pulse",
      icon: null,
    },
    completed: {
      label: t.status.completed,
      variant: "default" as const,
      className:
        "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
      icon: <Check className="w-3 h-3" />,
    },
    canceled: {
      label: t.status.canceled,
      variant: "destructive" as const,
      className:
        "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 line-through",
      icon: <X className="w-3 h-3" />,
    },
  };
  return configs[status];
}

/**
 * Get background color by status
 */
function getBackgroundColor(status: LessonStatus): string {
  const colors = {
    scheduled: "bg-gray-50/50 dark:bg-gray-900/50",
    in_progress: "bg-blue-50/50 dark:bg-blue-950/50",
    completed: "bg-green-50/50 dark:bg-green-950/50",
    canceled: "bg-red-50/50 dark:bg-red-950/50",
  };
  return colors[status];
}

/**
 * Get border color by status
 */
function getBorderColor(status: LessonStatus): string {
  const colors = {
    scheduled: "border-l-gray-400 dark:border-l-gray-600",
    in_progress: "border-l-blue-500 dark:border-l-blue-400",
    completed: "border-l-green-500 dark:border-l-green-400",
    canceled: "border-l-red-500 dark:border-l-red-400",
  };
  return colors[status];
}

/**
 * Format time
 */
function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LessonEventCard({
  lesson,
  locale = "fr",
  onClick,
  className,
}: LessonEventCardProps) {
  const t = getLessonsTranslations(locale);
  const statusBadge = getStatusBadge(lesson.status, t);

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-3 rounded-lg border border-border border-l-4 transition-all cursor-pointer",
        "hover:shadow-md hover:scale-[1.02]",
        getBackgroundColor(lesson.status),
        getBorderColor(lesson.status),
        className
      )}
    >
      {/* Header: Category Icon */}
      <div className="flex items-center justify-between mb-2">
        <div
          className={cn(
            "flex items-center gap-1",
            getCategoryColor(lesson.category)
          )}
        >
          {getCategoryIcon(lesson.category)}
          <span className="text-xs font-semibold">{lesson.category}</span>
        </div>
        <Badge
          variant={statusBadge.variant}
          className={cn("text-xs h-5 gap-1", statusBadge.className)}
        >
          {statusBadge.icon}
          <span className="hidden sm:inline">{statusBadge.label}</span>
        </Badge>
      </div>

      {/* Row 1: Student */}
      <div className="flex items-center gap-2 mb-1.5">
        <Avatar className="w-8 h-8 border-2 border-background">
          <AvatarImage src={lesson.studentAvatar} alt={lesson.studentName} />

          <AvatarFallback className="text-xs">
            {lesson.studentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span
          className="font-semibold text-sm text-foreground truncate"
          title={lesson.studentName}
        >
          {lesson.studentName}
        </span>
      </div>

      {/* Row 2: Time + Duration */}
      <div className="flex items-center gap-2 mb-1.5 text-sm">
        <span className="text-foreground font-medium">
          {formatTime(lesson.startDate)} - {formatTime(lesson.endDate)}
        </span>
        <Badge variant="secondary" className="text-xs h-5 px-1.5">
          {lesson.duration} {t.eventCard.minutes}
        </Badge>
      </div>

      {/* Row 3: Instructor + Vehicle */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="truncate" title={lesson.instructorName}>
          {lesson.instructorName}
        </span>
        <Badge variant="outline" className="text-xs h-5 px-1.5 ml-2">
          {lesson.vehiclePlate}
        </Badge>
      </div>

      {/* Notes indicator */}
      {lesson.notes && (
        <div
          className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
          title={lesson.notes}
        />
      )}
    </div>
  );
}
