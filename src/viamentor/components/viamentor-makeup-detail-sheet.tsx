/**
 * VIAMENTOR - Makeup Detail Sheet
 * Sheet détail historique rattrapages
 */

"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
import type { StudentMakeupsStats } from "@/viamentor/data/viamentor-instructor-makeups-data";
import type { MakeupStatus } from "@/viamentor/data/viamentor-makeups-data";
import type { InstructorMakeupsLocale } from "@/viamentor/data/viamentor-instructor-makeups-i18n";
import { instructorMakeupsTranslations } from "@/viamentor/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MakeupDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentMakeupsStats | null;
  locale?: InstructorMakeupsLocale;
  onExtend?: (studentId: string, makeupId: string) => void;
  onCancel?: (studentId: string, makeupId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MakeupDetailSheet({
  open,
  onOpenChange,
  student,
  locale = "fr",
  onExtend,
  onCancel,
}: MakeupDetailSheetProps) {
  const t = instructorMakeupsTranslations[locale].detail;
  const statusT = instructorMakeupsTranslations[locale].status;
  const reasonsT = instructorMakeupsTranslations[locale].reasons;

  if (!student) return null;

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const getStatusBadge = (status: MakeupStatus) => {
    const variants: Record<MakeupStatus, { variant: any; icon: any }> = {
      available: {
        variant: "secondary",
        icon: ClockIcon,
      },
      booked: {
        variant: "secondary",
        icon: CalendarIcon,
      },
      pending: {
        variant: "secondary",
        icon: AlertCircleIcon,
      },
      used: {
        variant: "secondary",
        icon: CheckCircle2Icon,
      },
      expired: {
        variant: "destructive",
        icon: XCircleIcon,
      },
      cancelled: {
        variant: "destructive",
        icon: XCircleIcon,
      },
    };

    const { variant, icon: Icon } = variants[status];

    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="w-3 h-3" />

        {statusT[status]}
      </Badge>
    );
  };

  // Calculer stats
  const totalCreated = student.makeups.length;
  const totalUsed = student.makeups.filter((m) => m.status === "used").length;
  const totalExpired = student.makeups.filter(
    (m) => m.status === "expired"
  ).length;

  // Calculer délai moyen d'utilisation
  const usedMakeups = student.makeups.filter(
    (m) => m.status === "used" && m.usedAt
  );
  const avgDays =
    usedMakeups.length > 0
      ? usedMakeups.reduce((sum, m) => {
          const created = new Date(m.createdAt);
          const used = new Date(m.usedAt!);
          const days = Math.floor(
            (used.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
          );
          return sum + days;
        }, 0) / usedMakeups.length
      : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <img
              src={student.studentAvatar}
              alt={student.studentName}
              className="w-12 h-12 rounded-full"
            />

            <div>
              <div>{student.studentName}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {t.title}
              </div>
            </div>
          </SheetTitle>
          <SheetDescription>{student.studentEmail}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t.timeline.title}
            </h3>
            <div className="space-y-4">
              {student.makeups.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Aucun historique
                </p>
              ) : (
                student.makeups.map((makeup, index) => (
                  <Card key={makeup.id} className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(makeup.status)}
                            <span className="text-xs text-muted-foreground">
                              {formatDate(makeup.createdAt)}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-foreground">
                            {reasonsT[makeup.reason]}
                          </div>
                        </div>
                        {makeup.status === "available" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                onExtend?.(student.studentId, makeup.id)
                              }
                            >
                              <ClockIcon className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                onCancel?.(student.studentId, makeup.id)
                              }
                            >
                              <XCircleIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />

                          <span>
                            {t.makeup.originalLesson}:{" "}
                            {formatDate(makeup.originalDate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ClockIcon className="w-4 h-4" />

                          <span>
                            {t.makeup.expiration}:{" "}
                            {formatDate(makeup.expiresAt)}
                          </span>
                        </div>

                        {makeup.status === "used" && makeup.usedAt && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2Icon className="w-4 h-4" />

                            <span>
                              {t.makeup.usedOn}: {formatDate(makeup.usedAt)}
                            </span>
                          </div>
                        )}

                        {makeup.reasonDetails && (
                          <div className="p-2 bg-muted rounded text-xs">
                            {makeup.reasonDetails}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <Separator />

          {/* Stats footer */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t.stats.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {totalCreated}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.stats.totalCreated}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {totalUsed}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.stats.used} ({student.usageRate.toFixed(0)}%)
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {totalExpired}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.stats.expired}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {avgDays.toFixed(1)}j
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.stats.avgDays}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
