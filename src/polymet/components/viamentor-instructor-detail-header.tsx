import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  EditIcon,
  CalendarIcon,
  UserPlusIcon,
  PauseIcon,
  TrashIcon,
  MoreVerticalIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import type { InstructorDetail } from "@/polymet/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { useInstructorDetailTranslations } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { Link } from "react-router-dom";

interface InstructorDetailHeaderProps {
  instructor: InstructorDetail;
  locale?: InstructorDetailLocale;
  onEdit?: () => void;
  onPlanning?: () => void;
  onAssign?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
}

export function ViamentorInstructorDetailHeader({
  instructor,
  locale = "fr",
  onEdit,
  onPlanning,
  onAssign,
  onSuspend,
  onDelete,
}: InstructorDetailHeaderProps) {
  const t = useInstructorDetailTranslations(locale);
  const [isSuspended, setIsSuspended] = useState(
    instructor.status === "suspended"
  );

  const handleSuspend = () => {
    setIsSuspended(!isSuspended);
    onSuspend?.();
  };

  const getStatusBadge = () => {
    const statusMap = {
      available: { variant: "default" as const, label: t.statusAvailable },
      in_lesson: { variant: "secondary" as const, label: t.statusInLesson },
      on_break: { variant: "outline" as const, label: t.statusOnBreak },
      unavailable: { variant: "outline" as const, label: t.statusUnavailable },
      suspended: { variant: "destructive" as const, label: t.statusSuspended },
    };

    const status = isSuspended ? "suspended" : instructor.status;
    const config = statusMap[status];

    return (
      <Badge variant={config.variant} className="animate-pulse">
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">{t.breadcrumbHome}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/instructors">{t.breadcrumbInstructors}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              {instructor.firstName} {instructor.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Card */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar & Basic Info */}
          <div className="flex gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={instructor.avatar} />

              <AvatarFallback className="text-2xl">
                {instructor.firstName[0]}
                {instructor.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div>
                <h1 className="text-3xl font-bold">
                  {instructor.firstName} {instructor.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(instructor.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      {instructor.rating} ({instructor.reviewsCount})
                    </span>
                  </div>
                  {getStatusBadge()}
                </div>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />

                  <span>{instructor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />

                  <span>{instructor.phone}</span>
                </div>
              </div>

              {/* Habilitations */}
              <div className="flex flex-wrap gap-1">
                {instructor.categories.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="lg:ml-auto flex flex-wrap gap-2 items-start">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <EditIcon className="h-4 w-4 mr-2" />

              {t.actionEdit}
            </Button>

            <Button variant="outline" size="sm" onClick={onPlanning}>
              <CalendarIcon className="h-4 w-4 mr-2" />

              {t.actionPlanning}
            </Button>

            <Button variant="outline" size="sm" onClick={onAssign}>
              <UserPlusIcon className="h-4 w-4 mr-2" />

              {t.actionAssign}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSuspend}>
                  <PauseIcon className="h-4 w-4 mr-2" />

                  {isSuspended ? "Réactiver" : t.actionSuspend}
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />

                  {t.actionDelete}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div>
            <p className="text-2xl font-bold">
              {instructor.stats.totalStudents}
            </p>
            <p className="text-xs text-muted-foreground">{t.studentsTotal}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {instructor.stats.totalLessons}
            </p>
            <p className="text-xs text-muted-foreground">{t.perfLessons}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{instructor.stats.totalHours}h</p>
            <p className="text-xs text-muted-foreground">{t.perfHours}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {instructor.stats.successRate}%
            </p>
            <p className="text-xs text-muted-foreground">{t.perfSuccessRate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
