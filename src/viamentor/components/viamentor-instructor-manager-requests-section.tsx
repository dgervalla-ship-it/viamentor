/**
 * VIAMENTOR - Instructor Manager Requests Section
 * Section gestion demandes équipe (congés, modifications planning)
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClockIcon,
  CalendarIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import {
  INSTRUCTOR_MANAGER_I18N,
  type InstructorManagerLocale,
} from "@/viamentor/data/viamentor-instructor-manager-i18n";
import {
  MOCK_TEAM_REQUESTS,
  type RequestStatus,
} from "@/viamentor/data/viamentor-instructor-manager-data";

interface InstructorManagerRequestsSectionProps {
  locale?: InstructorManagerLocale;
}

export function InstructorManagerRequestsSection({
  locale = "fr",
}: InstructorManagerRequestsSectionProps) {
  const t = INSTRUCTOR_MANAGER_I18N[locale];

  const getRequestStatusVariant = (
    status: RequestStatus
  ): "default" | "success" | "destructive" => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.requests.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{t.requests.subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {MOCK_TEAM_REQUESTS.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    request.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : request.priority === "medium"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {request.type === "leave" ? (
                    <ClockIcon className="h-5 w-5" />
                  ) : request.type === "schedule_change" ? (
                    <CalendarIcon className="h-5 w-5" />
                  ) : (
                    <AlertCircleIcon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{request.instructorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.reason} • {request.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={getRequestStatusVariant(request.status)}>
                  {t.requests[request.status]}
                </Badge>
                {request.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />

                      {t.actions.approve}
                    </Button>
                    <Button size="sm" variant="outline">
                      <XCircleIcon className="h-4 w-4 mr-1" />

                      {t.actions.reject}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
