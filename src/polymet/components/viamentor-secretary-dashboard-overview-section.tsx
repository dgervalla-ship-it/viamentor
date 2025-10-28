/**
 * VIAMENTOR - Secretary Dashboard Overview Section
 * Section vue d'ensemble avec quick actions, activité et rendez-vous
 */

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhoneIcon, MailIcon, CalendarIcon, UserPlusIcon } from "lucide-react";
import {
  mockActivities,
  mockAppointments,
  mockSchoolInfo,
  mockAvailableInstructors,
  type Activity,
  type Appointment,
} from "@/polymet/data/viamentor-secretary-dashboard-data";
import {
  secretaryDashboardTranslations,
  type SecretaryDashboardLocale,
} from "@/polymet/data/viamentor-secretary-dashboard-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SecretaryDashboardOverviewSectionProps {
  locale?: SecretaryDashboardLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSecretaryDashboardOverviewSection({
  locale = "fr",
}: SecretaryDashboardOverviewSectionProps) {
  const t = secretaryDashboardTranslations[locale];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-card-foreground">
          {t.quickActions.title}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Button
            variant="outline"
            className="h-auto flex-col gap-2 p-4 sm:p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <UserPlusIcon className="h-6 w-6 sm:h-8 sm:w-8" />

            <div className="text-center">
              <div className="font-semibold text-xs sm:text-sm">
                {t.quickActions.newStudent.title}
              </div>
              <div className="text-xs opacity-80 hidden sm:block">
                {t.quickActions.newStudent.description}
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-2 p-4 sm:p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8" />

            <div className="text-center">
              <div className="font-semibold text-xs sm:text-sm">
                {t.quickActions.bookLesson.title}
              </div>
              <div className="text-xs opacity-80 hidden sm:block">
                {t.quickActions.bookLesson.description}
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-2 p-4 sm:p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <PhoneIcon className="h-6 w-6 sm:h-8 sm:w-8" />

            <div className="text-center">
              <div className="font-semibold text-xs sm:text-sm">
                {t.quickActions.callProspect.title}
              </div>
              <div className="text-xs opacity-80 hidden sm:block">
                {t.quickActions.callProspect.description}
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col gap-2 p-4 sm:p-6 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <MailIcon className="h-6 w-6 sm:h-8 sm:w-8" />

            <div className="text-center">
              <div className="font-semibold text-xs sm:text-sm">
                {t.quickActions.sendEmail.title}
              </div>
              <div className="text-xs opacity-80 hidden sm:block">
                {t.quickActions.sendEmail.description}
              </div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Recent Activity & Appointments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-card-foreground">
              {t.activity.title}
            </h2>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              {t.activity.viewAll}
            </Button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {mockActivities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-2 sm:gap-3"
              >
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage
                    src={activity.user.avatar}
                    alt={activity.user.name}
                  />

                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {activity.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-card-foreground">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    {t.activity.types[activity.type]}{" "}
                    {activity.relatedEntity && (
                      <span className="font-medium">
                        {activity.relatedEntity.name}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-card-foreground">
            {t.appointments.title}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {mockAppointments.map((appt) => (
              <div
                key={appt.id}
                className="flex items-start gap-2 sm:gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage
                    src={appt.person.avatar}
                    alt={appt.person.name}
                  />

                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {appt.person.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {t.appointments.types[appt.type]}
                    </Badge>
                    <Badge
                      variant={
                        appt.status === "confirmed" ? "default" : "outline"
                      }
                      className="text-xs"
                    >
                      {t.appointments.status[appt.status]}
                    </Badge>
                  </div>
                  <p className="font-medium text-xs sm:text-sm text-card-foreground">
                    {appt.person.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(appt.dateTime).toLocaleString(locale, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {appt.location && (
                    <p className="text-xs text-muted-foreground">
                      {appt.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* School Info */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-card-foreground">
          {t.schoolInfo.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage
                  src={mockSchoolInfo.logo}
                  alt={mockSchoolInfo.name}
                />
              </Avatar>
              <div>
                <div className="font-semibold text-sm sm:text-base text-card-foreground">
                  {mockSchoolInfo.name}
                </div>
                <Badge
                  variant={
                    mockSchoolInfo.currentlyOpen ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {mockSchoolInfo.currentlyOpen
                    ? t.schoolInfo.currentStatus.open
                    : t.schoolInfo.currentStatus.closed}
                </Badge>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
              <div>{mockSchoolInfo.address}</div>
              <div>{mockSchoolInfo.phone}</div>
              <div className="break-all">{mockSchoolInfo.email}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-xs sm:text-sm mb-2 text-card-foreground">
                {t.schoolInfo.availableInstructors}
              </h3>
              <div className="space-y-2">
                {mockAvailableInstructors
                  .filter((i) => i.status === "available")
                  .map((instructor) => (
                    <div
                      key={instructor.id}
                      className="flex items-center gap-2 text-xs sm:text-sm text-card-foreground"
                    >
                      <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.name}
                        />
                      </Avatar>
                      <span className="truncate">{instructor.name}</span>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {instructor.category.join(", ")}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ViamentorSecretaryDashboardOverviewSection;
