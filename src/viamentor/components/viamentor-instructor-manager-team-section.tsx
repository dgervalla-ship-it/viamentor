/**
 * VIAMENTOR - Instructor Manager Team Section
 * Section vue d'ensemble équipe moniteurs
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  INSTRUCTOR_MANAGER_I18N,
  type InstructorManagerLocale,
} from "@/viamentor/data/viamentor-instructor-manager-i18n";
import {
  MOCK_TEAM_MEMBERS,
  type InstructorStatus,
} from "@/viamentor/data/viamentor-instructor-manager-data";

interface InstructorManagerTeamSectionProps {
  locale?: InstructorManagerLocale;
}

export function InstructorManagerTeamSection({
  locale = "fr",
}: InstructorManagerTeamSectionProps) {
  const t = INSTRUCTOR_MANAGER_I18N[locale];

  const getStatusVariant = (
    status: InstructorStatus
  ): "default" | "success" | "warning" | "destructive" => {
    switch (status) {
      case "available":
        return "success";
      case "busy":
        return "warning";
      case "on_leave":
        return "default";
      case "off_duty":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.team.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.team.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />

                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{member.categories.join(", ")}</span>
                    <span>•</span>
                    <span>{member.availability}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {member.lessonsToday} {t.kpis.lessonsToday.toLowerCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.studentsAssigned} élèves
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    ⭐ {member.satisfaction}
                  </p>
                  <Badge variant={getStatusVariant(member.status)}>
                    {t.team.status[member.status]}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {t.team.viewSchedule}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t.team.assignStudents}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
