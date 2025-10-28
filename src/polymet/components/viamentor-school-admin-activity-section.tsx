/**
 * VIAMENTOR - School Admin Activity Section
 * Section Activité récente pour dashboard School Admin
 *
 * FEATURES:
 * - Timeline activités récentes
 * - Icons par type d'activité
 * - Avatars acteurs
 * - Timestamps formatés
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserPlus,
  BookOpen,
  Award,
  DollarSign,
  Car,
  UserCheck,
} from "lucide-react";
import {
  mockRecentActivities,
  type RecentActivity,
  type SchoolAdminLocale,
} from "@/polymet/data/viamentor-school-admin-data";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminActivitySectionProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminActivitySection({
  locale = "fr",
}: SchoolAdminActivitySectionProps) {
  // Render activity icon
  const renderActivityIcon = (type: RecentActivity["type"]) => {
    const iconMap: Record<RecentActivity["type"], React.ReactNode> = {
      student_registered: <UserPlus className="h-4 w-4" />,

      lesson_completed: <BookOpen className="h-4 w-4" />,

      exam_passed: <Award className="h-4 w-4" />,

      payment_received: <DollarSign className="h-4 w-4" />,

      vehicle_maintenance: <Car className="h-4 w-4" />,

      instructor_added: <UserCheck className="h-4 w-4" />,
    };
    return iconMap[type];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            {mockRecentActivities.length} cette semaine
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRecentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="p-2 rounded-lg bg-muted">
                {renderActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {activity.actor && (
                    <>
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={activity.actor.avatar} />

                        <AvatarFallback>
                          {activity.actor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {activity.actor.name}
                      </span>
                    </>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString(locale)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ViamentorSchoolAdminActivitySection;
