/**
 * VIAMENTOR - Maintenance Calendar Component
 * Calendrier visuel de maintenance avec vue mensuelle, tâches planifiées et alertes
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  AlertTriangleIcon,
  WrenchIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  MaintenanceTask,
  MaintenanceLocale,
} from "@/viamentor/data/viamentor-maintenance-data";
import type { MaintenanceTranslations } from "@/viamentor/data/viamentor-maintenance-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MaintenanceCalendarProps {
  tasks: MaintenanceTask[];
  locale?: MaintenanceTranslations;
  onTaskClick?: (task: MaintenanceTask) => void;
  onDateClick?: (date: Date) => void;
  className?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: MaintenanceTask[];
}

// ============================================================================
// HELPERS
// ============================================================================

const getDaysInMonth = (year: number, month: number): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: CalendarDay[] = [];

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
      isToday: false,
      tasks: [],
    });
  }

  // Current month days
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime(),
      tasks: [],
    });
  }

  // Next month days
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isToday: false,
      tasks: [],
    });
  }

  return days;
};

const getTasksForDate = (
  tasks: MaintenanceTask[],
  date: Date
): MaintenanceTask[] => {
  const dateStr = date.toISOString().split("T")[0];
  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const taskDateStr = taskDate.toISOString().split("T")[0];
    return taskDateStr === dateStr;
  });
};

const getTaskIcon = (type: string) => {
  switch (type) {
    case "preventive":
      return WrenchIcon;
    case "corrective":
      return AlertTriangleIcon;
    case "inspection":
      return ClipboardCheckIcon;
    default:
      return WrenchIcon;
  }
};

const getTaskColor = (priority: string, status: string) => {
  if (status === "completed")
    return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
  if (status === "overdue")
    return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";

  switch (priority) {
    case "critical":
      return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
    case "high":
      return "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400";
    case "medium":
      return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
    case "low":
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
  }
};

// ============================================================================
// COMPONENT
// ============================================================================

export function MaintenanceCalendar({
  tasks,
  locale,
  onTaskClick,
  onDateClick,
  className,
}: MaintenanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = getDaysInMonth(year, month);

  // Assign tasks to days
  const daysWithTasks = days.map((day) => ({
    ...day,
    tasks: getTasksForDate(tasks, day.date),
  }));

  const monthNames = [
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
  ];

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Calendrier de Maintenance
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleToday}>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Aujourd'hui
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="min-w-[180px] text-center font-semibold">
                {monthNames[month]} {year}
              </div>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day names header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {daysWithTasks.map((day, index) => {
            const hasOverdue = day.tasks.some((t) => t.status === "overdue");
            const hasCritical = day.tasks.some(
              (t) => t.priority === "critical"
            );

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] border rounded-lg p-2 cursor-pointer transition-colors",
                  "hover:bg-accent/50",
                  day.isCurrentMonth ? "bg-background" : "bg-muted/30",
                  day.isToday && "ring-2 ring-primary"
                )}
                onClick={() => onDateClick?.(day.date)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      !day.isCurrentMonth && "text-muted-foreground",
                      day.isToday && "text-primary font-bold"
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                  {(hasOverdue || hasCritical) && (
                    <AlertTriangleIcon className="h-3 w-3 text-red-500" />
                  )}
                </div>

                {/* Tasks */}
                <div className="space-y-1">
                  {day.tasks.slice(0, 3).map((task) => {
                    const Icon = getTaskIcon(task.type);
                    return (
                      <TooltipProvider key={task.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded flex items-center gap-1 truncate",
                                getTaskColor(task.priority, task.status)
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                onTaskClick?.(task);
                              }}
                            >
                              <Icon className="h-3 w-3 flex-shrink-0" />

                              <span className="truncate">{task.vehicle}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-semibold">{task.title}</p>
                              <p className="text-xs">{task.vehicle}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.type} - {task.priority}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                  {day.tasks.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{day.tasks.length - 3} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/20" />

            <span>Critique/En retard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-100 dark:bg-orange-900/20" />

            <span>Haute priorité</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-100 dark:bg-blue-900/20" />

            <span>Moyenne priorité</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/20" />

            <span>Terminé</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
