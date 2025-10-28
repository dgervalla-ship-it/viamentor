/**
 * VIAMENTOR - Maintenance Timeline Component
 * Timeline historique de maintenance par véhicule avec événements chronologiques
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  WrenchIcon,
  AlertTriangleIcon,
  ClipboardCheckIcon,
  CheckCircle2Icon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  CalendarIcon,
  EuroIcon,
  FileTextIcon,
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

interface MaintenanceTimelineProps {
  vehicleId?: string;
  vehicleName?: string;
  tasks: MaintenanceTask[];
  locale?: MaintenanceTranslations;
  onTaskClick?: (task: MaintenanceTask) => void;
  className?: string;
}

interface TimelineEvent {
  task: MaintenanceTask;
  date: Date;
  formattedDate: string;
  isUpcoming: boolean;
}

// ============================================================================
// HELPERS
// ============================================================================

const getTaskIcon = (type: string) => {
  switch (type) {
    case "preventive":
      return WrenchIcon;
    case "corrective":
      return AlertTriangleIcon;
    case "inspection":
      return ClipboardCheckIcon;
    case "repair":
      return WrenchIcon;
    default:
      return WrenchIcon;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle2Icon;
    case "in_progress":
      return ClockIcon;
    case "scheduled":
      return CalendarIcon;
    case "overdue":
      return AlertTriangleIcon;
    default:
      return ClockIcon;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600 dark:text-green-400";
    case "in_progress":
      return "text-blue-600 dark:text-blue-400";
    case "scheduled":
      return "text-gray-600 dark:text-gray-400";
    case "overdue":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "destructive";
    case "high":
      return "default";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
    default:
      return "outline";
  }
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("fr-CH", {
    style: "currency",
    currency: "CHF",
  }).format(amount);
};

// ============================================================================
// COMPONENT
// ============================================================================

export function MaintenanceTimeline({
  vehicleId,
  vehicleName,
  tasks,
  locale,
  onTaskClick,
  className,
}: MaintenanceTimelineProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (vehicleId && task.vehicleId !== vehicleId) return false;
      if (filterStatus !== "all" && task.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.vehicle.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

  // Group by year and month
  const groupedEvents = filteredTasks.reduce(
    (acc, task) => {
      const date = new Date(task.dueDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          monthName: new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
            date
          ),
          tasks: [],
        };
      }

      acc[key].tasks.push(task);
      return acc;
    },
    {} as Record<
      string,
      {
        year: number;
        month: number;
        monthName: string;
        tasks: MaintenanceTask[];
      }
    >
  );

  const sortedGroups = Object.values(groupedEvents).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const totalCost = filteredTasks
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.cost, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Historique de Maintenance
            </CardTitle>
            {vehicleName && (
              <p className="text-sm text-muted-foreground mt-1">
                {vehicleName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <FileTextIcon className="h-3 w-3" />
              {filteredTasks.length} tâches
            </Badge>
            <Badge variant="outline" className="gap-1">
              <EuroIcon className="h-3 w-3" />

              {formatCurrency(totalCost)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Rechercher une tâche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              Tous
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("completed")}
            >
              Terminés
            </Button>
            <Button
              variant={filterStatus === "scheduled" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("scheduled")}
            >
              Planifiés
            </Button>
            <Button
              variant={filterStatus === "overdue" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("overdue")}
            >
              En retard
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <ScrollArea className="h-[600px] pr-4">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />

            {sortedGroups.map((group, groupIndex) => (
              <div key={`${group.year}-${group.month}`} className="mb-8">
                {/* Month header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative z-10 bg-background px-3 py-1 rounded-full border-2 border-primary">
                    <span className="text-sm font-semibold text-primary">
                      {group.monthName} {group.year}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Tasks */}
                <div className="space-y-4 ml-12">
                  {group.tasks.map((task, taskIndex) => {
                    const TaskIcon = getTaskIcon(task.type);
                    const StatusIcon = getStatusIcon(task.status);

                    return (
                      <div
                        key={task.id}
                        className="relative group cursor-pointer"
                        onClick={() => onTaskClick?.(task)}
                      >
                        {/* Timeline dot */}
                        <div
                          className={cn(
                            "absolute -left-[49px] top-3 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background transition-colors",
                            task.status === "completed" &&
                              "border-green-500 text-green-500",
                            task.status === "in_progress" &&
                              "border-blue-500 text-blue-500",
                            task.status === "scheduled" &&
                              "border-gray-400 text-gray-400",
                            task.status === "overdue" &&
                              "border-red-500 text-red-500",
                            "group-hover:scale-110"
                          )}
                        >
                          <StatusIcon className="h-4 w-4" />
                        </div>

                        {/* Task card */}
                        <Card className="transition-all group-hover:shadow-md group-hover:border-primary/50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <TaskIcon className="h-4 w-4 text-muted-foreground" />

                                  <h4 className="font-semibold">
                                    {task.title}
                                  </h4>
                                  <Badge
                                    variant={getPriorityColor(task.priority)}
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>

                                {task.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {task.description}
                                  </p>
                                )}

                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <CalendarIcon className="h-3 w-3" />

                                    {formatDate(task.dueDate)}
                                  </div>
                                  {!vehicleName && (
                                    <div className="flex items-center gap-1">
                                      <WrenchIcon className="h-3 w-3" />

                                      {task.vehicle}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <EuroIcon className="h-3 w-3" />

                                    {formatCurrency(task.cost)}
                                  </div>
                                </div>

                                {task.parts && task.parts.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {task.parts.map((part, i) => (
                                      <Badge
                                        key={i}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {part.name}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <Badge
                                variant="outline"
                                className={cn(
                                  "whitespace-nowrap",
                                  getStatusColor(task.status)
                                )}
                              >
                                {task.status === "completed" && "Terminé"}
                                {task.status === "in_progress" && "En cours"}
                                {task.status === "scheduled" && "Planifié"}
                                {task.status === "overdue" && "En retard"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileTextIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />

                <p>Aucune tâche de maintenance trouvée</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
