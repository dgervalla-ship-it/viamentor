/**
 * VIAMENTOR - Draggable Type Card
 * Carte type cours draggable avec grip handle
 */

"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GripVerticalIcon,
  ClockIcon,
  CalendarIcon,
  CoinsIcon,
} from "lucide-react";
import { CourseType } from "@/viamentor/data/viamentor-courses-types-data";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface DraggableTypeCardProps {
  type: CourseType;
  locale?: "fr" | "de" | "it" | "en";
  onDragStart?: (type: CourseType) => void;
  onDragEnd?: () => void;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    sessions: "séances",
    duration: "durée",
    days: {
      0: "Dim",
      1: "Lun",
      2: "Mar",
      3: "Mer",
      4: "Jeu",
      5: "Ven",
      6: "Sam",
    },
  },
  de: {
    sessions: "Sitzungen",
    duration: "Dauer",
    days: {
      0: "So",
      1: "Mo",
      2: "Di",
      3: "Mi",
      4: "Do",
      5: "Fr",
      6: "Sa",
    },
  },
  it: {
    sessions: "sessioni",
    duration: "durata",
    days: {
      0: "Dom",
      1: "Lun",
      2: "Mar",
      3: "Mer",
      4: "Gio",
      5: "Ven",
      6: "Sab",
    },
  },
  en: {
    sessions: "sessions",
    duration: "duration",
    days: {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function DraggableTypeCard({
  type,
  locale = "fr",
  onDragStart,
  onDragEnd,
}: DraggableTypeCardProps) {
  const t = translations[locale];
  const [isDragging, setIsDragging] = React.useState(false);

  // Format jours
  const daysText = type.schedule.daysOfWeek
    .map((day) => t.days[day as keyof typeof t.days])
    .join("-");

  // Format durée
  const durationHours = Math.floor(type.schedule.duration / 60);
  const durationMinutes = type.schedule.duration % 60;
  const durationText =
    durationMinutes > 0
      ? `${durationHours}h${durationMinutes}`
      : `${durationHours}h`;

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(type));
    onDragStart?.(type);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "relative p-4 cursor-grab active:cursor-grabbing transition-all",
        "hover:bg-muted/50 hover:border-primary hover:shadow-sm",
        isDragging && "opacity-60 shadow-lg"
      )}
    >
      {/* Grip Handle */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <GripVerticalIcon className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="ml-6 space-y-2">
        {/* Title */}
        <h4 className="font-semibold text-sm leading-tight">{type.name}</h4>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {/* Sessions count */}
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />

            <span>
              {type.schedule.sessionsCount}×{durationText}
            </span>
          </div>

          {/* Days */}
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />

            <span>{daysText}</span>
          </div>

          {/* Default time */}
          {type.schedule.defaultStartTime && (
            <span>· {type.schedule.defaultStartTime}</span>
          )}
        </div>

        {/* Price */}
        {type.pricing && (
          <div className="flex items-center gap-1.5">
            <CoinsIcon className="h-3.5 w-3.5 text-muted-foreground" />

            <Badge variant="secondary" className="text-xs font-medium">
              {type.pricing.price} CHF
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
