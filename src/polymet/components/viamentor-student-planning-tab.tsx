/**
 * VIAMENTOR Student Planning Tab
 *
 * Calendrier élève avec Month/Week/Day views, leçons passées/futures, réservation rapide
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
  CarIcon,
  PlusIcon,
  MapPinIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";
import type {
  CalendarEvent,
  StudentDetailLocale,
} from "@/polymet/data/viamentor-student-detail-data";

interface StudentPlanningTabProps {
  events: CalendarEvent[];
  locale?: StudentDetailLocale;
  onBookLesson?: () => void;
  onModifyEvent?: (event: CalendarEvent) => void;
  onCancelEvent?: (event: CalendarEvent) => void;
}

type CalendarView = "month" | "week" | "day";

export function StudentPlanningTab({
  events,
  locale = "fr",
  onBookLesson,
  onModifyEvent,
  onCancelEvent,
}: StudentPlanningTabProps) {
  const t = useStudentDetailTranslations(locale);
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getEventColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-muted text-muted-foreground";
      case "scheduled":
        return "bg-blue-500 dark:bg-blue-600 text-white";
      case "today":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "cancelled":
        return "bg-red-500 dark:bg-red-600 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    if (view === "day") {
      options.day = "numeric";
    }
    return currentDate.toLocaleDateString(locale, options);
  };

  const upcomingEvents = events
    .filter((e) => e.status === "scheduled" || e.status === "today")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate("prev")}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold min-w-[200px] text-center">
            {formatDateHeader()}
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate("next")}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            {t.today}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={view} onValueChange={(v) => setView(v as CalendarView)}>
            <TabsList>
              <TabsTrigger value="month">{t.month}</TabsTrigger>
              <TabsTrigger value="week">{t.week}</TabsTrigger>
              <TabsTrigger value="day">{t.day}</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={onBookLesson}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.bookLesson}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            {view === "month" && (
              <div className="space-y-4">
                {/* Month Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-muted-foreground p-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayEvents = events.filter((e) => {
                      const eventDate = new Date(e.start);
                      return (
                        eventDate.getDate() === i + 1 &&
                        eventDate.getMonth() === currentDate.getMonth()
                      );
                    });

                    return (
                      <div
                        key={i}
                        className="min-h-[80px] border border-border rounded-md p-2 hover:bg-muted/50 transition-colors"
                      >
                        <div className="text-sm font-medium mb-1">{i + 1}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <Popover key={event.id}>
                              <PopoverTrigger asChild>
                                <div
                                  className={`text-xs p-1 rounded cursor-pointer ${getEventColor(event.status)}`}
                                >
                                  {new Date(event.start).toLocaleTimeString(
                                    locale,
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <EventPopover
                                  event={event}
                                  locale={locale}
                                  onModify={onModifyEvent}
                                  onCancel={onCancelEvent}
                                />
                              </PopoverContent>
                            </Popover>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayEvents.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {view === "week" && (
              <div className="space-y-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date(currentDate);
                  date.setDate(date.getDate() - date.getDay() + i + 1);
                  const dayEvents = events.filter((e) => {
                    const eventDate = new Date(e.start);
                    return eventDate.toDateString() === date.toDateString();
                  });

                  return (
                    <div
                      key={i}
                      className="border border-border rounded-lg p-4"
                    >
                      <div className="font-medium mb-3">
                        {date.toLocaleDateString(locale, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </div>
                      <div className="space-y-2">
                        {dayEvents.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            {t.noLessons}
                          </p>
                        ) : (
                          dayEvents.map((event) => (
                            <Popover key={event.id}>
                              <PopoverTrigger asChild>
                                <div
                                  className={`p-3 rounded-lg cursor-pointer ${getEventColor(event.status)}`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <ClockIcon className="h-4 w-4" />

                                      <span className="font-medium">
                                        {new Date(
                                          event.start
                                        ).toLocaleTimeString(locale, {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}{" "}
                                        -{" "}
                                        {new Date(event.end).toLocaleTimeString(
                                          locale,
                                          {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          }
                                        )}
                                      </span>
                                    </div>
                                    <Badge variant="outline">
                                      {event.type}
                                    </Badge>
                                  </div>
                                  <div className="mt-2 text-sm">
                                    {event.instructor.name}
                                  </div>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <EventPopover
                                  event={event}
                                  locale={locale}
                                  onModify={onModifyEvent}
                                  onCancel={onCancelEvent}
                                />
                              </PopoverContent>
                            </Popover>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {view === "day" && (
              <div className="space-y-3">
                {events
                  .filter((e) => {
                    const eventDate = new Date(e.start);
                    return (
                      eventDate.toDateString() === currentDate.toDateString()
                    );
                  })
                  .map((event) => (
                    <Popover key={event.id}>
                      <PopoverTrigger asChild>
                        <div
                          className={`p-4 rounded-lg cursor-pointer ${getEventColor(event.status)}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <ClockIcon className="h-5 w-5" />

                              <span className="font-semibold text-lg">
                                {new Date(event.start).toLocaleTimeString(
                                  locale,
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}{" "}
                                -{" "}
                                {new Date(event.end).toLocaleTimeString(
                                  locale,
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-4 w-4" />

                              {event.instructor.name}
                            </div>
                            {event.vehicle && (
                              <div className="flex items-center gap-2">
                                <CarIcon className="h-4 w-4" />

                                {event.vehicle}
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2 col-span-2">
                                <MapPinIcon className="h-4 w-4" />

                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <EventPopover
                          event={event}
                          locale={locale}
                          onModify={onModifyEvent}
                          onCancel={onCancelEvent}
                        />
                      </PopoverContent>
                    </Popover>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Lessons Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.upcomingLessons}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t.noUpcomingLessons}
              </p>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-muted rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      className={getEventColor(event.status)}
                      variant="outline"
                    >
                      {event.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.start).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    {new Date(event.start).toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.end).toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.instructor.name}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EventPopover({
  event,
  locale,
  onModify,
  onCancel,
}: {
  event: CalendarEvent;
  locale: StudentDetailLocale;
  onModify?: (event: CalendarEvent) => void;
  onCancel?: (event: CalendarEvent) => void;
}) {
  const t = useStudentDetailTranslations(locale);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">{event.type}</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />

            <span>
              {new Date(event.start).toLocaleDateString(locale, {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />

            <span>
              {new Date(event.start).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(event.end).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />

            <span>{event.instructor.name}</span>
          </div>
          {event.vehicle && (
            <div className="flex items-center gap-2">
              <CarIcon className="h-4 w-4 text-muted-foreground" />

              <span>{event.vehicle}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />

              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>

      {event.status !== "completed" && event.status !== "cancelled" && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onModify?.(event)}
          >
            {t.modify}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onCancel?.(event)}
          >
            {t.cancel}
          </Button>
        </div>
      )}
    </div>
  );
}
