/**
 * VIAMENTOR - Assignment Timeline
 * Timeline historique attributions élève
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserPlusIcon,
  RefreshCwIcon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import type {
  AssignmentHistoryEvent,
  AssignmentLocale,
} from "@/polymet/data/viamentor-assignments-data";
import { ASSIGNMENTS_TRANSLATIONS } from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface AssignmentTimelineProps {
  events: AssignmentHistoryEvent[];
  locale?: AssignmentLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AssignmentTimeline({
  events,
  locale = "fr",
  className,
}: AssignmentTimelineProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];

  const getEventIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <UserPlusIcon className="w-5 h-5" />;

      case "reassignment":
        return <RefreshCwIcon className="w-5 h-5" />;

      case "temporary_access":
        return <ClockIcon className="w-5 h-5" />;

      case "revocation":
        return <XCircleIcon className="w-5 h-5" />;

      default:
        return <UserPlusIcon className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-green-600 dark:bg-green-400";
      case "reassignment":
        return "bg-blue-600 dark:bg-blue-400";
      case "temporary_access":
        return "bg-orange-600 dark:bg-orange-400";
      case "revocation":
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  const getEventTitle = (event: AssignmentHistoryEvent) => {
    switch (event.type) {
      case "assignment":
        return t.assignmentHistory.assignedTo.replace(
          "{instructor}",
          event.newInstructorName || ""
        );
      case "reassignment":
        return t.assignmentHistory.reassignedTo.replace(
          "{instructor}",
          event.newInstructorName || ""
        );
      case "temporary_access":
        return t.assignmentHistory.temporaryAccessGranted.replace(
          "{instructor}",
          event.newInstructorName || ""
        );
      case "revocation":
        return t.assignmentHistory.accessRevoked;
      default:
        return event.type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Sort events by timestamp descending (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className={className}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {/* Events */}
        <div className="space-y-6">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative pl-16">
              {/* Icon */}
              <div
                className={`absolute left-0 w-12 h-12 rounded-full ${getEventColor(event.type)} text-white flex items-center justify-center z-10`}
              >
                {getEventIcon(event.type)}
              </div>

              {/* Event Card */}
              <Card className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {getEventTitle(event)}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(event.timestamp)}
                      </p>
                    </div>
                    {event.status && (
                      <Badge variant="secondary">{event.status}</Badge>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground italic">
                    {event.reason}
                  </p>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t">
                    {/* Performed By */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {t.assignmentHistory.performedBy}
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {event.performedByName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {event.performedByName}
                        </span>
                      </div>
                    </div>

                    {/* Previous Instructor */}
                    {event.previousInstructorName && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.assignmentHistory.previousInstructor}
                        </p>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {event.previousInstructorName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {event.previousInstructorName}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* New Instructor */}
                    {event.newInstructorName && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.assignmentHistory.newInstructor}
                        </p>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {event.newInstructorName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {event.newInstructorName}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Duration */}
                    {event.duration && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.assignmentHistory.duration}
                        </p>
                        <p className="text-sm font-medium">
                          {event.duration} {t.assignmentHistory.days}
                        </p>
                      </div>
                    )}

                    {/* Instructor Workload */}
                    {event.metadata.instructorStudentCount !== undefined && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.assignmentHistory.instructorWorkload}
                        </p>
                        <p className="text-sm font-medium">
                          {event.metadata.instructorStudentCount}{" "}
                          {t.assignmentHistory.students}
                          {event.metadata.instructorWeeklyHours && (
                            <span className="text-muted-foreground">
                              {" "}
                              • {event.metadata.instructorWeeklyHours}h
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
