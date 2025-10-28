/**
 * VIAMENTOR - School Admin Events Section
 * Section Événements à venir pour dashboard School Admin
 *
 * FEATURES:
 * - Liste événements à venir
 * - Badges type et status
 * - Date et heure formatées
 * - Localisation
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import {
  mockUpcomingEvents,
  type UpcomingEvent,
  type SchoolAdminLocale,
} from "@/polymet/data/viamentor-school-admin-data";
import { schoolAdminTranslations } from "@/polymet/data/viamentor-school-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminEventsSectionProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminEventsSection({
  locale = "fr",
}: SchoolAdminEventsSectionProps) {
  const t = schoolAdminTranslations[locale];

  // Render event type badge
  const renderEventTypeBadge = (type: UpcomingEvent["type"]) => {
    const colorMap: Record<UpcomingEvent["type"], string> = {
      lesson: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      exam: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      theory_course:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      maintenance:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      meeting: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };

    return (
      <Badge variant="secondary" className={colorMap[type]}>
        {t.eventTypes[type]}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t.sections.upcomingEvents}</CardTitle>
          <CardDescription>
            {mockUpcomingEvents.length} {t.common.thisWeek}
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          {t.actions.viewAll}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockUpcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <span className="text-2xl font-bold text-foreground">
                  {new Date(event.date).getDate()}
                </span>
                <span className="text-xs text-muted-foreground uppercase">
                  {new Date(event.date).toLocaleDateString(locale, {
                    month: "short",
                  })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {renderEventTypeBadge(event.type)}
                  <Badge
                    variant={
                      event.status === "confirmed" ? "default" : "secondary"
                    }
                  >
                    {t.eventStatus[event.status]}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {event.title}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />

                    {event.time}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />

                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ViamentorSchoolAdminEventsSection;
