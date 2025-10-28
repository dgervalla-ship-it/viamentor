/**
 * VIAMENTOR - Course Calendar View Component
 * Vue calendrier principal avec navigation mois, sélecteur vue et grille événements
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
} from "lucide-react";
import { CalendarEventCard } from "@/viamentor/components/viamentor-calendar-event";
import {
  type CalendarEvent,
  type CalendarView,
  type CalendarLocale,
  calendarI18n,
} from "@/viamentor/data/viamentor-courses-calendar-data";
import { mockCourseCategories } from "@/viamentor/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CourseCalendarViewProps {
  events: CalendarEvent[];
  view?: CalendarView;
  locale?: CalendarLocale;
  onViewChange?: (view: CalendarView) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onNewCourse?: () => void;
  onDrop?: (date: Date) => void;
  isDragging?: boolean;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getMonthName(date: Date, locale: CalendarLocale): string {
  const monthNames = {
    fr: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],

    de: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],

    it: [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],

    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  return monthNames[locale][date.getMonth()];
}

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Add days from previous month to fill the first week
  const firstDayOfWeek = firstDay.getDay();
  const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  for (let i = daysFromPrevMonth; i > 0; i--) {
    days.push(new Date(year, month, 1 - i));
  }

  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add days from next month to fill the last week
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

function getEventsForDate(
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] {
  const dateStr = date.toISOString().split("T")[0];
  return events.filter((event) => event.startDate === dateStr);
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CourseCalendarView({
  events,
  view = "month",
  locale = "fr",
  onViewChange,
  onEventClick,
  onNewCourse,
  onDrop,
  isDragging = false,
}: CourseCalendarViewProps) {
  const t = calendarI18n[locale];
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const weekDays =
    locale === "fr"
      ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
      : locale === "de"
        ? ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        : locale === "it"
          ? ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
          : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const isCurrentMonth = (date: Date) =>
    date.getMonth() === currentDate.getMonth();
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-card rounded-lg border border-border">
        <CalendarIcon className="w-16 h-16 text-muted-foreground mb-4" />

        <h3 className="text-xl font-semibold mb-2">{t.empty.title}</h3>
        <p className="text-muted-foreground mb-6">{t.empty.description}</p>
        {onNewCourse && (
          <Button onClick={onNewCourse}>
            <Plus className="w-4 h-4 mr-2" />

            {t.empty.action}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold min-w-[200px] text-center">
            {getMonthName(currentDate, locale)} {currentDate.getFullYear()}
          </h2>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleToday}>
            {t.navigation.today}
          </Button>
        </div>

        {/* View Selector */}
        <Select
          value={view}
          onValueChange={(v) => onViewChange?.(v as CalendarView)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">{t.views.month}</SelectItem>
            <SelectItem value="week">{t.views.week}</SelectItem>
            <SelectItem value="day">{t.views.day}</SelectItem>
            <SelectItem value="agenda">{t.views.agenda}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(events, date);
            const isOtherMonth = !isCurrentMonth(date);
            const isTodayDate = isToday(date);

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b border-border p-2 transition-colors ${
                  isOtherMonth ? "bg-muted/30" : "bg-card"
                } ${isTodayDate ? "bg-primary/5" : ""} ${
                  isDragging && !isOtherMonth
                    ? "hover:bg-blue-50 hover:border-blue-300 hover:border-dashed cursor-copy"
                    : ""
                }`}
                onDragOver={(e) => {
                  if (isDragging && !isOtherMonth) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "copy";
                  }
                }}
                onDrop={(e) => {
                  if (isDragging && !isOtherMonth && onDrop) {
                    e.preventDefault();
                    onDrop(date);
                  }
                }}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-sm font-medium ${
                      isOtherMonth
                        ? "text-muted-foreground/50"
                        : isTodayDate
                          ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center"
                          : "text-foreground"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <CalendarEventCard
                      key={event.id}
                      event={event}
                      locale={locale}
                      compact
                      onClick={onEventClick}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{dayEvents.length - 3} plus
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap p-4 bg-card rounded-lg border border-border">
        <span className="text-sm font-medium text-muted-foreground">
          {t.legend.title}:
        </span>
        {mockCourseCategories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: category.color }}
            />

            <Badge
              variant="outline"
              className="text-xs"
              style={{
                backgroundColor: `${category.color}15`,
                borderColor: category.color,
                color: category.color,
              }}
            >
              {category.code}
            </Badge>
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
