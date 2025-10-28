/**
 * VIAMENTOR - Instructor Planning Page
 * Page principale planning moniteur avec calendar, disponibilités, sync externe
 */

"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  PrinterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  mockInstructorPlanning,
  type PlanningLocale,
  type ViewType,
  type CalendarEvent,
} from "@/viamentor/data/viamentor-instructor-planning-data";
import { getPlanningTranslations } from "@/viamentor/data/viamentor-instructor-planning-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorPlanningPageProps {
  locale?: PlanningLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorPlanningPage({
  locale = "fr",
}: InstructorPlanningPageProps) {
  const t = getPlanningTranslations(locale);
  const [planning] = useState(mockInstructorPlanning);
  const [currentView, setCurrentView] = useState<ViewType>("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  // Navigation handlers
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportICal = () => {
    console.log("Export iCal");
  };

  const handleExportGoogle = () => {
    console.log("Export Google Calendar");
  };

  // Get events for current view
  const getEventsForView = () => {
    // Filter events based on current date and view
    return planning.events.filter((event) => {
      const eventDate = new Date(event.start);
      if (currentView === "day") {
        return eventDate.toDateString() === currentDate.toDateString();
      } else if (currentView === "week") {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return eventDate >= weekStart && eventDate <= weekEnd;
      }
      return true;
    });
  };

  const eventsToDisplay = getEventsForView();

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t.header.title}
          </h1>
          <p className="text-muted-foreground">{planning.instructorName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {eventsToDisplay.length} {t.calendar.eventsCount}
          </Badge>
        </div>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* View selector */}
            <div className="flex items-center gap-2">
              <Select
                value={currentView}
                onValueChange={(value) => setCurrentView(value as ViewType)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t.toolbar.viewMonth} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">{t.toolbar.viewMonth}</SelectItem>
                  <SelectItem value="week">{t.toolbar.viewWeek}</SelectItem>
                  <SelectItem value="day">{t.toolbar.viewDay}</SelectItem>
                  <SelectItem value="agenda">{t.toolbar.viewAgenda}</SelectItem>
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-8" />

              {/* Date navigation */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={handleToday}>
                  {t.toolbar.today}
                </Button>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              <div className="text-sm font-medium">
                {currentDate.toLocaleDateString(locale, {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setAvailabilityDialogOpen(true)}
              >
                <ClockIcon className="w-4 h-4 mr-2" />

                {t.toolbar.availability}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <DownloadIcon className="w-4 h-4 mr-2" />

                    {t.toolbar.export}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleExportICal}>
                    {t.toolbar.exportICal}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportGoogle}>
                    {t.toolbar.exportGoogle}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" onClick={handlePrint}>
                <PrinterIcon className="w-4 h-4 mr-2" />

                {t.toolbar.print}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardContent className="p-6">
          {currentView === "agenda" ? (
            // Agenda List View
            <div className="space-y-2">
              {eventsToDisplay.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {t.calendar.noEvents}
                </div>
              ) : (
                eventsToDisplay.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div
                      className="w-1 h-12 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {event.title}
                        </p>
                        {event.status && (
                          <Badge variant="secondary">
                            {t.status[event.status]}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.start.toLocaleString(locale, {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {event.category && (
                      <Badge
                        style={{
                          backgroundColor: event.color,
                          color: "white",
                        }}
                      >
                        {event.category}
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            // Calendar Grid View (simplified)
            <div className="space-y-4">
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
              </div>
              <div className="text-center text-muted-foreground py-8">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />

                <p>
                  Vue calendrier complète disponible avec React Big Calendar
                </p>
                <p className="text-sm mt-2">
                  {eventsToDisplay.length} événements pour cette période
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Availability Dialog */}
      <Dialog
        open={availabilityDialogOpen}
        onOpenChange={setAvailabilityDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.availability.title}</DialogTitle>
            <DialogDescription>{t.availability.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                {t.availability.infoMessage}
              </p>
            </div>

            {/* Weekly Template Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {t.availability.weeklyTemplate}
              </h3>
              <div className="space-y-2">
                {planning.weeklyTemplate.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <span className="font-medium capitalize">{day.day}</span>
                    {day.isAvailable ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {day.morningSlot && (
                          <span>
                            {day.morningSlot.start} - {day.morningSlot.end}
                          </span>
                        )}
                        {day.afternoonSlot && (
                          <span>
                            {day.afternoonSlot.start} - {day.afternoonSlot.end}
                          </span>
                        )}
                      </div>
                    ) : (
                      <Badge variant="secondary">
                        {t.calendar.unavailable}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Date Overrides Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {t.availability.specificDates}
              </h3>
              <div className="space-y-2">
                {planning.dateOverrides.map((override) => (
                  <div
                    key={override.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{override.date}</p>
                      {override.reason && (
                        <p className="text-sm text-muted-foreground">
                          {override.reason}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        override.isUnavailable ? "destructive" : "secondary"
                      }
                    >
                      {override.isUnavailable
                        ? t.calendar.unavailable
                        : t.calendar.available}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setAvailabilityDialogOpen(false)}
              >
                {t.availability.cancel}
              </Button>
              <Button onClick={() => setAvailabilityDialogOpen(false)}>
                {t.availability.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.eventDetails.student}
                  </p>
                  <p className="font-medium">
                    {selectedEvent.studentName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.eventDetails.category}
                  </p>
                  <p className="font-medium">{selectedEvent.category || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.eventDetails.vehicle}
                  </p>
                  <p className="font-medium">
                    {selectedEvent.vehicleName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.eventDetails.status}
                  </p>
                  <p className="font-medium">
                    {selectedEvent.status
                      ? t.status[selectedEvent.status]
                      : "-"}
                  </p>
                </div>
              </div>
              {selectedEvent.meetingAddress && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.eventDetails.meeting}
                  </p>
                  <p className="font-medium">{selectedEvent.meetingAddress}</p>
                </div>
              )}
              {selectedEvent.objectives &&
                selectedEvent.objectives.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t.eventDetails.objectives}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.objectives.map((obj, idx) => (
                        <Badge key={idx} variant="secondary">
                          {obj}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedEvent(null)}
                >
                  Fermer
                </Button>
                <Button>{t.eventDetails.viewDetails}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
