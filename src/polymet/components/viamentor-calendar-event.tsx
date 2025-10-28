/**
 * VIAMENTOR - Calendar Event Component
 * Card événement calendrier avec couleur catégorie, avatar moniteur et capacité
 */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";
import {
  type CalendarEvent,
  type CalendarLocale,
  calendarI18n,
  isEventFull,
  getAvailableSeats,
  getEventEndTime,
} from "@/polymet/data/viamentor-courses-calendar-data";

// ============================================================================
// TYPES
// ============================================================================

interface CalendarEventCardProps {
  event: CalendarEvent;
  locale?: CalendarLocale;
  onClick?: (event: CalendarEvent) => void;
  compact?: boolean;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CalendarEventCard({
  event,
  locale = "fr",
  onClick,
  compact = false,
}: CalendarEventCardProps) {
  const t = calendarI18n[locale];
  const isFull = isEventFull(event);
  const availableSeats = getAvailableSeats(event);
  const endTime = getEventEndTime(event.startTime, event.duration);

  const handleClick = () => {
    onClick?.(event);
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className="group relative cursor-pointer rounded-md p-2 transition-all hover:shadow-md"
        style={{
          backgroundColor: `${event.categoryColor}15`,
          borderLeft: `3px solid ${event.categoryColor}`,
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{event.title}</div>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />

              <span>{event.startTime}</span>
              {isFull && (
                <Badge variant="destructive" className="text-xs px-1 py-0">
                  {t.event.full}
                </Badge>
              )}
            </div>
          </div>
          {event.instructorAvatar && (
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={event.instructorAvatar}
                alt={event.instructorName}
              />

              <AvatarFallback className="text-xs">
                {event.instructorName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer rounded-lg border border-border bg-card p-3 transition-all hover:shadow-lg hover:scale-[1.02]"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: event.categoryColor,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{event.title}</div>
          {event.description && (
            <div className="text-xs text-muted-foreground truncate mt-0.5">
              {event.description}
            </div>
          )}
        </div>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0"
          style={{ backgroundColor: event.categoryColor }}
        />
      </div>

      {/* Time & Duration */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Clock className="w-3.5 h-3.5" />

        <span>
          {event.startTime} - {endTime}
        </span>
        <span className="text-muted-foreground/60">
          ({t.event.duration.replace("{{duration}}", String(event.duration))})
        </span>
      </div>

      {/* Location */}
      {event.location && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <MapPin className="w-3.5 h-3.5" />

          <span>{event.location}</span>
        </div>
      )}

      {/* Capacity */}
      <div className="flex items-center gap-2 text-xs mb-2">
        <Users className="w-3.5 h-3.5 text-muted-foreground" />

        <span
          className={
            isFull ? "text-destructive font-medium" : "text-muted-foreground"
          }
        >
          {t.event.capacity
            .replace("{{enrolled}}", String(event.enrolled))
            .replace("{{capacity}}", String(event.capacity))}
        </span>
        {isFull ? (
          <Badge variant="destructive" className="text-xs px-1.5 py-0">
            {t.event.full}
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-xs px-1.5 py-0">
            {t.event.available.replace("{{available}}", String(availableSeats))}
          </Badge>
        )}
      </div>

      {/* Instructor */}
      {event.instructorName && (
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          {event.instructorAvatar && (
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={event.instructorAvatar}
                alt={event.instructorName}
              />

              <AvatarFallback className="text-xs">
                {event.instructorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="text-xs text-muted-foreground">
            {event.instructorName}
          </span>
        </div>
      )}
    </div>
  );
}
