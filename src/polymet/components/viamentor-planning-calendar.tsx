/**
 * Planning Calendar Component
 * Calendar view avec intégration cours théoriques et leçons pratiques
 * Support views Month/Week/Day, drag & drop, filtres actifs
 */

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  UsersIcon,
  CarIcon,
  ClockIcon,
} from "lucide-react";
import { TheoryCoursePopover } from "@/polymet/components/viamentor-theory-course-popover";
import {
  mockTheoryCourses,
  type TheoryCourse,
} from "@/polymet/data/viamentor-theory-courses-data";
import {
  MOCK_LESSONS,
  type Lesson,
} from "@/polymet/data/viamentor-lessons-data";
import {
  planningTranslations,
  type PlanningLocale,
} from "@/polymet/data/viamentor-planning-i18n";

export interface PlanningFilters {
  type: "all" | "theory" | "practical" | "exams";
  status: "all" | "scheduled" | "in_progress" | "completed" | "canceled";
  category: string;
  instructor: string;
}

interface PlanningCalendarProps {
  locale?: PlanningLocale;
  view?: "month" | "week" | "day";
  filters?: PlanningFilters;
  onNewTheoryCourse?: () => void;
  onNewPracticalLesson?: () => void;
  onEventClick?: (event: TheoryCourse | Lesson) => void;
  onEventDrop?: (eventId: string, newDate: Date, newTime: string) => void;
}

export function PlanningCalendar({
  locale = "fr",
  view: externalView,
  filters,
  onNewTheoryCourse,
  onNewPracticalLesson,
  onEventClick,
  onEventDrop,
}: PlanningCalendarProps) {
  const t = planningTranslations[locale];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [internalView, setInternalView] = useState<"month" | "week" | "day">(
    "month"
  );
  const view = externalView || internalView;
  const [selectedEvent, setSelectedEvent] = useState<
    TheoryCourse | Lesson | null
  >(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);

  // Filter events based on filters
  const filteredEvents = useMemo(() => {
    let theoryCourses = [...mockTheoryCourses];
    let lessons = [...MOCK_LESSONS];

    if (filters) {
      // Filter by type
      if (filters.type === "theory") {
        lessons = [];
      } else if (filters.type === "practical") {
        theoryCourses = [];
      }

      // Filter by status
      if (filters.status !== "all") {
        theoryCourses = theoryCourses.filter(
          (c) => c.status === filters.status
        );
        lessons = lessons.filter((l) => l.status === filters.status);
      }

      // Filter by category
      if (filters.category !== "all") {
        lessons = lessons.filter((l) => l.category === filters.category);
      }

      // Filter by instructor
      if (filters.instructor !== "all") {
        theoryCourses = theoryCourses.filter(
          (c) => c.instructorId === filters.instructor
        );
        lessons = lessons.filter((l) => l.instructorId === filters.instructor);
      }
    }

    return { theoryCourses, lessons };
  }, [filters]);

  // Get month info
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Generate calendar days for month view
  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // Generate week days for week view
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date | null) => {
    if (!date) return [];

    const theoryCourses = filteredEvents.theoryCourses.filter((course) => {
      const courseDate = new Date(course.startDate);
      return (
        courseDate.getDate() === date.getDate() &&
        courseDate.getMonth() === date.getMonth() &&
        courseDate.getFullYear() === date.getFullYear()
      );
    });

    const lessons = filteredEvents.lessons.filter((lesson) => {
      const lessonDate = new Date(lesson.startDate);
      return (
        lessonDate.getDate() === date.getDate() &&
        lessonDate.getMonth() === date.getMonth() &&
        lessonDate.getFullYear() === date.getFullYear()
      );
    });

    return [...theoryCourses, ...lessons];
  };

  // Navigation
  const goToPrevious = () => {
    if (view === "month") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };

  const goToNext = () => {
    if (view === "month") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format month/year
  const monthNames =
    locale === "fr"
      ? [
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
        ]
      : locale === "de"
        ? [
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
          ]
        : locale === "it"
          ? [
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
            ]
          : [
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
            ];

  const dayNames =
    locale === "fr"
      ? ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
      : locale === "de"
        ? ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
        : locale === "it"
          ? ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
          : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleEventClick = (event: TheoryCourse | Lesson) => {
    setSelectedEvent(event);
    setPopoverOpen(true);
    onEventClick?.(event);
  };

  // Drag & Drop handlers
  const handleDragStart = (eventId: string) => {
    setDraggedEvent(eventId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (date: Date, time?: string) => {
    if (draggedEvent) {
      onEventDrop?.(draggedEvent, date, time || "09:00");
      setDraggedEvent(null);
    }
  };

  // Helper to check if event is a lesson
  const isLesson = (event: any): event is Lesson => {
    return "studentId" in event;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format date for display
  const formatDateDisplay = () => {
    if (view === "month") {
      return `${monthNames[month]} ${year}`;
    } else if (view === "week") {
      const weekDays = getWeekDays();
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${year}`;
    } else {
      return `${currentDate.getDate()} ${monthNames[month]} ${year}`;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">
            {formatDateDisplay()}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              {t.calendar.today}
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!externalView && (
          <div className="flex items-center gap-2">
            <Button
              variant={view === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setInternalView("month")}
            >
              {t.views.month}
            </Button>
            <Button
              variant={view === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setInternalView("week")}
            >
              {t.views.week}
            </Button>
            <Button
              variant={view === "day" ? "default" : "outline"}
              size="sm"
              onClick={() => setInternalView("day")}
            >
              {t.views.day}
            </Button>
          </div>
        )}
      </div>

      {/* Calendar Grid */}
      {view === "month" && (
        <Card className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((date, index) => {
              const events = getEventsForDay(date);
              const isTodayDate = isToday(date);

              return (
                <div
                  key={index}
                  className={`min-h-[120px] border border-border rounded-lg p-2 ${
                    date
                      ? "bg-card hover:bg-accent/50 cursor-pointer"
                      : "bg-muted/20"
                  } ${isTodayDate ? "ring-2 ring-primary" : ""}`}
                >
                  {date && (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium ${
                            isTodayDate
                              ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                              : "text-foreground"
                          }`}
                        >
                          {date.getDate()}
                        </span>
                        {events.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {events.length}
                          </Badge>
                        )}
                      </div>

                      {/* Events */}
                      <div className="space-y-1">
                        {events.slice(0, 3).map((event) => {
                          const isLessonEvent = isLesson(event);
                          const Icon = isLessonEvent ? CarIcon : UsersIcon;
                          const title = isLessonEvent
                            ? event.studentName
                            : (event as TheoryCourse).topic;
                          const time = isLessonEvent
                            ? new Date(event.startDate).toLocaleTimeString(
                                locale,
                                { hour: "2-digit", minute: "2-digit" }
                              )
                            : `${(event as TheoryCourse).startTime} - ${(event as TheoryCourse).endTime}`;

                          return (
                            <button
                              key={event.id}
                              onClick={() => handleEventClick(event)}
                              draggable
                              onDragStart={() => handleDragStart(event.id)}
                              className="w-full text-left cursor-move"
                            >
                              <div
                                className={`text-xs p-1.5 rounded border-l-4 ${
                                  event.status === "scheduled"
                                    ? isLessonEvent
                                      ? "bg-orange-500/10 border-orange-500 text-orange-700 dark:text-orange-300"
                                      : "bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300"
                                    : event.status === "in_progress"
                                      ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-300"
                                      : event.status === "completed"
                                        ? "bg-gray-500/10 border-gray-500 text-gray-700 dark:text-gray-300"
                                        : "bg-red-500/10 border-red-500 text-red-700 dark:text-red-300"
                                }`}
                              >
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Icon className="h-3 w-3" />

                                  <span className="font-medium truncate">
                                    {title}
                                  </span>
                                </div>
                                <div className="text-[10px] opacity-80">
                                  {time}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                        {events.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center py-1">
                            +{events.length - 3}{" "}
                            {locale === "fr"
                              ? "autres"
                              : locale === "de"
                                ? "weitere"
                                : locale === "it"
                                  ? "altri"
                                  : "more"}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Week View */}
      {view === "week" && (
        <Card className="p-4">
          <div className="space-y-2">
            {/* Time slots */}
            {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => (
              <div key={hour} className="grid grid-cols-8 gap-2">
                <div className="text-sm font-medium text-muted-foreground text-right pr-2">
                  {hour}:00
                </div>
                {getWeekDays().map((day, dayIndex) => {
                  const events = getEventsForDay(day).filter((event) => {
                    const eventDate = new Date(
                      isLesson(event)
                        ? event.startDate
                        : (event as TheoryCourse).startDate
                    );
                    return eventDate.getHours() === hour;
                  });

                  return (
                    <div
                      key={dayIndex}
                      className="min-h-[60px] border border-border rounded p-1 bg-card hover:bg-accent/50"
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(day, `${hour}:00`)}
                    >
                      {events.map((event) => {
                        const isLessonEvent = isLesson(event);
                        const Icon = isLessonEvent ? CarIcon : UsersIcon;
                        const title = isLessonEvent
                          ? event.studentName
                          : (event as TheoryCourse).topic;

                        return (
                          <button
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            draggable
                            onDragStart={() => handleDragStart(event.id)}
                            className="w-full text-left mb-1 cursor-move"
                          >
                            <div
                              className={`text-xs p-1 rounded border-l-2 ${
                                event.status === "scheduled"
                                  ? isLessonEvent
                                    ? "bg-orange-500/10 border-orange-500 text-orange-700 dark:text-orange-300"
                                    : "bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300"
                                  : event.status === "in_progress"
                                    ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-300"
                                    : "bg-gray-500/10 border-gray-500 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                <Icon className="h-3 w-3" />

                                <span className="font-medium truncate text-[10px]">
                                  {title}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Day View */}
      {view === "day" && (
        <Card className="p-4">
          <div className="space-y-2">
            {Array.from({ length: 13 }, (_, i) => i + 7).map((hour) => {
              const events = getEventsForDay(currentDate).filter((event) => {
                const eventDate = new Date(
                  isLesson(event)
                    ? event.startDate
                    : (event as TheoryCourse).startDate
                );
                return eventDate.getHours() === hour;
              });

              return (
                <div key={hour} className="flex gap-4">
                  <div className="w-20 text-sm font-medium text-muted-foreground text-right">
                    {hour}:00
                  </div>
                  <div
                    className="flex-1 min-h-[80px] border border-border rounded p-2 bg-card hover:bg-accent/50"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(currentDate, `${hour}:00`)}
                  >
                    <div className="space-y-2">
                      {events.map((event) => {
                        const isLessonEvent = isLesson(event);
                        const Icon = isLessonEvent ? CarIcon : UsersIcon;
                        const title = isLessonEvent
                          ? event.studentName
                          : (event as TheoryCourse).topic;
                        const subtitle = isLessonEvent
                          ? `${event.instructorName} • ${event.vehiclePlate}`
                          : `${(event as TheoryCourse).instructor} • ${(event as TheoryCourse).location}`;
                        const time = isLessonEvent
                          ? `${new Date(event.startDate).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })} - ${new Date(event.endDate).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}`
                          : `${(event as TheoryCourse).startTime} - ${(event as TheoryCourse).endTime}`;

                        return (
                          <button
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            draggable
                            onDragStart={() => handleDragStart(event.id)}
                            className="w-full text-left cursor-move"
                          >
                            <div
                              className={`p-3 rounded border-l-4 ${
                                event.status === "scheduled"
                                  ? isLessonEvent
                                    ? "bg-orange-500/10 border-orange-500 text-orange-700 dark:text-orange-300"
                                    : "bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-300"
                                  : event.status === "in_progress"
                                    ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-300"
                                    : event.status === "completed"
                                      ? "bg-gray-500/10 border-gray-500 text-gray-700 dark:text-gray-300"
                                      : "bg-red-500/10 border-red-500 text-red-700 dark:text-red-300"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />

                                  <span className="font-semibold">{title}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {event.status}
                                </Badge>
                              </div>
                              <div className="text-sm opacity-80 mb-1">
                                {subtitle}
                              </div>
                              <div className="flex items-center gap-1 text-xs opacity-70">
                                <ClockIcon className="h-3 w-3" />

                                {time}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Event Popover */}
      {selectedEvent && !isLesson(selectedEvent) && (
        <TheoryCoursePopover
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          course={selectedEvent as TheoryCourse}
          locale={locale}
        />
      )}
    </div>
  );
}
