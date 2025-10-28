/**
 * VIAMENTOR Calendar Drop Zone Component
 *
 * Drop zone calendrier avec validation conflits temps réel,
 * animations feedback, tooltips erreurs, suggestions alternatives
 */

"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  calendarTranslations,
  type CalendarLocale,
} from "@/viamentor/data/viamentor-calendar-i18n";
import {
  validateLessonSlot,
  type TimeSlot,
  type GroupLesson,
  type Room,
  type Instructor,
  type ConflictResult,
} from "@/viamentor/data/viamentor-calendar-conflicts";

/**
 * Props
 */
export interface CalendarDropZoneProps {
  date: Date;
  startTime: string;
  duration: number;
  courseTypeId: string;
  roomId?: string;
  instructorId?: string;
  maxCapacity: number;
  existingLessons: GroupLesson[];
  rooms: Room[];
  instructors: Instructor[];
  locale?: CalendarLocale;
  onDrop?: (data: {
    date: Date;
    startTime: string;
    duration: number;
    courseTypeId: string;
    roomId?: string;
    instructorId?: string;
  }) => void;
  className?: string;
}

/**
 * Calendar Drop Zone Component
 */
export function CalendarDropZone({
  date,
  startTime,
  duration,
  courseTypeId,
  roomId,
  instructorId,
  maxCapacity,
  existingLessons,
  rooms,
  instructors,
  locale = "fr",
  onDrop,
  className,
}: CalendarDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ConflictResult | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const t = calendarTranslations[locale];

  /**
   * Validate drop on drag over
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDragOver) {
      setIsDragOver(true);

      // Validate slot
      const slot: TimeSlot = {
        date,
        startTime,
        endTime: "", // Will be calculated in validation
      };

      const result = validateLessonSlot(
        slot,
        duration,
        roomId,
        instructorId,
        [],
        maxCapacity,
        existingLessons,
        rooms,
        instructors
      );

      setValidationResult(result);
    }
  };

  /**
   * Handle drag leave
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if we're leaving the drop zone (not just a child element)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
      setValidationResult(null);
    }
  };

  /**
   * Handle drop
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragOver(false);

    // Final validation
    const slot: TimeSlot = {
      date,
      startTime,
      endTime: "",
    };

    const result = validateLessonSlot(
      slot,
      duration,
      roomId,
      instructorId,
      [],
      maxCapacity,
      existingLessons,
      rooms,
      instructors
    );

    if (result.hasConflict) {
      // Show shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
      return;
    }

    // Valid drop - call callback
    onDrop?.({
      date,
      startTime,
      duration,
      courseTypeId,
      roomId,
      instructorId,
    });

    setValidationResult(null);
  };

  const hasConflict = validationResult?.hasConflict ?? false;
  const isValid = isDragOver && !hasConflict;
  const isInvalid = isDragOver && hasConflict;

  return (
    <TooltipProvider>
      <Tooltip open={isDragOver && validationResult !== null}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative min-h-[60px] rounded-md transition-all duration-150",
              "border-2 border-dashed",
              !isDragOver && "border-transparent bg-transparent",
              isValid && "border-primary bg-primary/12 animate-pulse",
              isInvalid && "border-destructive bg-destructive/15",
              isShaking && "animate-shake",
              className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              animation: isShaking ? "shake 0.3s" : undefined,
            }}
          >
            {/* Drop indicator */}
            {isDragOver && (
              <div className="absolute inset-0 flex items-center justify-center">
                {isValid ? (
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5" />

                    <span className="text-sm font-medium">
                      {t.dropZone.validSlot}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" />

                    <span className="text-sm font-medium">
                      {t.dropZone.invalidSlot}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </TooltipTrigger>

        {validationResult && validationResult.conflicts.length > 0 && (
          <TooltipContent
            side="top"
            className="max-w-sm bg-popover text-popover-foreground border border-border shadow-lg"
          >
            <div className="space-y-2">
              {/* Conflicts */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-destructive" />

                  <span className="font-semibold text-sm">
                    {hasConflict ? "Conflits détectés" : "Avertissements"}
                  </span>
                </div>
                <ul className="space-y-1 text-xs">
                  {validationResult.conflicts.map((conflict, idx) => (
                    <li
                      key={idx}
                      className={cn(
                        "flex items-start gap-1",
                        conflict.severity === "error"
                          ? "text-destructive"
                          : "text-orange-500"
                      )}
                    >
                      <span>•</span>
                      <span>{conflict.message}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              {validationResult.suggestions &&
                validationResult.suggestions.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <div className="font-semibold text-xs mb-1">
                      Suggestions:
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {validationResult.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span>→</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Shake animation keyframes (add to global CSS)
 */
const shakeKeyframes = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}
`;
