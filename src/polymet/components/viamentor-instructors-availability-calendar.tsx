/**
 * VIAMENTOR - Instructors Availability Calendar
 * Widget calendrier disponibilités semaine avec time slots et booking
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  FilterIcon,
} from "lucide-react";
import {
  generateTimeSlots,
  getWeekDates,
  getStatusColor,
  TimeSlot,
  TimeSlotStatus,
} from "@/polymet/data/viamentor-instructors-availability-data";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

interface AvailabilityCalendarProps {
  instructors: Instructor[];
  slots: TimeSlot[];
  locale?: "fr" | "de" | "it" | "en";
  onSlotClick?: (slot: {
    instructorId: string;
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}

const DAY_NAMES: Record<string, string[]> = {
  fr: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  it: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

export function ViamentorInstructorsAvailabilityCalendar({
  instructors,
  slots,
  locale = "fr",
  onSlotClick,
}: AvailabilityCalendarProps) {
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Monday
    return new Date(today.setDate(diff));
  });

  const [selectedInstructors, setSelectedInstructors] = useState<string[]>(
    instructors.map((i) => i.id)
  );

  const weekDates = getWeekDates(weekStart);
  const timeSlots = generateTimeSlots();
  const dayNames = DAY_NAMES[locale];

  const goToPreviousWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() - 7);
    setWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(newDate.getDate() + 7);
    setWeekStart(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    setWeekStart(new Date(today.setDate(diff)));
  };

  const toggleInstructor = (instructorId: string) => {
    setSelectedInstructors((prev) =>
      prev.includes(instructorId)
        ? prev.filter((id) => id !== instructorId)
        : [...prev, instructorId]
    );
  };

  const getSlotForCell = (
    date: Date,
    timeSlot: string,
    instructorId: string
  ): TimeSlot | undefined => {
    const dateStr = date.toISOString().split("T")[0];
    return slots.find(
      (s) =>
        s.instructorId === instructorId &&
        s.date === dateStr &&
        s.startTime === timeSlot
    );
  };

  const handleCellClick = (date: Date, timeSlot: string) => {
    if (selectedInstructors.length === 0) return;

    const dateStr = date.toISOString().split("T")[0];
    const [hours, minutes] = timeSlot.split(":");
    const endHours =
      minutes === "30"
        ? (parseInt(hours) + 1).toString().padStart(2, "0")
        : hours;
    const endMinutes = minutes === "30" ? "00" : "30";
    const endTime = `${endHours}:${endMinutes}`;

    onSlotClick?.({
      instructorId: selectedInstructors[0],
      date: dateStr,
      startTime: timeSlot,
      endTime,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Disponibilités semaine
            </CardTitle>
            <CardDescription>
              {weekDates[0].toLocaleDateString(locale)} -{" "}
              {weekDates[6].toLocaleDateString(locale)}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Moniteurs ({selectedInstructors.length})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Filtrer par moniteur</p>
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.id}
                      className="flex items-center gap-3"
                    >
                      <Checkbox
                        checked={selectedInstructors.includes(instructor.id)}
                        onCheckedChange={() => toggleInstructor(instructor.id)}
                      />

                      <Avatar className="h-8 w-8">
                        <AvatarImage src={instructor.avatar} />

                        <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{instructor.name}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Aujourd'hui
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousWeek}
              className="h-8 w-8"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextWeek}
              className="h-8 w-8"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header days */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-xs font-medium text-muted-foreground p-2">
                Heure
              </div>
              {weekDates.map((date, idx) => (
                <div key={idx} className="text-center p-2 bg-muted rounded-md">
                  <p className="text-xs font-medium">{dayNames[idx]}</p>
                  <p className="text-xs text-muted-foreground">
                    {date.getDate()}
                  </p>
                </div>
              ))}
            </div>

            {/* Time slots grid */}
            <div className="space-y-1">
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="grid grid-cols-8 gap-1">
                  <div className="text-xs text-muted-foreground p-2 flex items-center">
                    {timeSlot}
                  </div>
                  {weekDates.map((date, dayIdx) => {
                    // Aggregate slots for all selected instructors
                    const instructorSlots = selectedInstructors
                      .map((instructorId) =>
                        getSlotForCell(date, timeSlot, instructorId)
                      )
                      .filter(Boolean) as TimeSlot[];

                    const hasAvailable = instructorSlots.some(
                      (s) => s.status === "available"
                    );
                    const hasBusy = instructorSlots.some(
                      (s) => s.status === "busy"
                    );
                    const hasBlocked = instructorSlots.some(
                      (s) => s.status === "blocked"
                    );

                    let cellStatus: TimeSlotStatus = "available";
                    if (hasBlocked) cellStatus = "blocked";
                    else if (hasBusy) cellStatus = "busy";

                    const cellColor =
                      instructorSlots.length > 0
                        ? getStatusColor(cellStatus)
                        : "bg-background border border-border";

                    return (
                      <button
                        key={dayIdx}
                        onClick={() => handleCellClick(date, timeSlot)}
                        className={`p-2 rounded-md text-xs transition-all hover:opacity-80 ${cellColor} ${
                          instructorSlots.length > 0
                            ? "cursor-pointer"
                            : "cursor-default"
                        }`}
                        title={
                          instructorSlots.length > 0
                            ? instructorSlots
                                .map(
                                  (s) =>
                                    `${s.status}${s.studentName ? ` - ${s.studentName}` : ""}`
                                )
                                .join(", ")
                            : undefined
                        }
                      >
                        {instructorSlots.length > 0 && (
                          <span className="font-medium">
                            {instructorSlots.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground">
                Légende:
              </p>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700" />

                <span className="text-xs">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700" />

                <span className="text-xs">En leçon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700" />

                <span className="text-xs">Bloqué</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
