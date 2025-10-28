/**
 * VIAMENTOR - Lesson Popover
 * Popover détails et actions pour leçon
 */

"use client";

import { useState } from "react";
import {
  MapPin,
  Edit,
  X,
  Check,
  Mail,
  User,
  Printer,
  ExternalLink,
  Calendar,
  Clock,
  Car,
  DollarSign,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CancelLessonDialog,
  CompleteLessonDialog,
} from "@/polymet/components/viamentor-lesson-actions";
import type { Lesson } from "@/polymet/data/viamentor-lessons-data";
import type { LessonsLocale } from "@/polymet/data/viamentor-lessons-i18n";
import { getLessonsTranslations } from "@/polymet/data/viamentor-lessons-i18n";

interface LessonPopoverProps {
  lesson: Lesson;
  locale?: LessonsLocale;
  children: React.ReactNode;
  onEdit?: () => void;
  onCancel?: (data: any) => Promise<void>;
  onComplete?: (data: any) => Promise<void>;
  onContactStudent?: () => void;
  onViewStudent?: () => void;
  onPrint?: () => void;
}

/**
 * Get status badge config
 */
function getStatusBadge(
  status: Lesson["status"],
  t: ReturnType<typeof getLessonsTranslations>
) {
  const configs = {
    scheduled: {
      label: t.status.scheduled,
      className:
        "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    },
    in_progress: {
      label: t.status.in_progress,
      className:
        "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    },
    completed: {
      label: t.status.completed,
      className:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    },
    canceled: {
      label: t.status.canceled,
      className: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    },
  };
  return configs[status];
}

/**
 * Format date
 */
function formatDate(date: string, locale: LessonsLocale): string {
  return new Date(date).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format time
 */
function formatTime(date: string, locale: LessonsLocale): string {
  return new Date(date).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LessonPopover({
  lesson,
  locale = "fr",
  children,
  onEdit,
  onCancel,
  onComplete,
  onContactStudent,
  onViewStudent,
  onPrint,
}: LessonPopoverProps) {
  const t = getLessonsTranslations(locale);
  const [open, setOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const statusBadge = getStatusBadge(lesson.status, t);

  const handleOpenMaps = () => {
    const { lat, lng } = lesson.meetingPoint.coordinates;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      "_blank"
    );
  };

  const handleContactStudent = () => {
    onContactStudent?.();
    console.warn(
      "Prevented assignment: `window.location.href = `mailto:student@example.com?subject=Leçon ${formatDate(lesson.startDate, locale)}``"
    ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
  };

  const handlePrint = () => {
    onPrint?.();
    window.print();
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start" side="right">
          {/* Header */}
          <div className="p-4 space-y-3 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-background">
                  <AvatarImage
                    src={lesson.studentAvatar}
                    alt={lesson.studentName}
                  />

                  <AvatarFallback>
                    {lesson.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {lesson.studentName}
                  </h3>
                  <Badge className={cn("text-xs", statusBadge.className)}>
                    {statusBadge.label}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-sm text-foreground">
              {t.details.title}
            </h4>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {/* Date */}
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.date}
                </p>
                <p className="text-foreground font-medium">
                  {formatDate(lesson.startDate, locale)}
                </p>
              </div>

              {/* Time */}
              <div>
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.time}
                </p>
                <p className="text-foreground font-medium">
                  {formatTime(lesson.startDate, locale)} -{" "}
                  {formatTime(lesson.endDate, locale)}
                </p>
              </div>

              {/* Duration */}
              <div>
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.duration}
                </p>
                <p className="text-foreground font-medium">
                  {lesson.duration} min
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.category}
                </p>
                <Badge variant="outline">{lesson.category}</Badge>
              </div>

              {/* Price */}
              <div>
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.price}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-foreground font-medium">
                    {lesson.price} CHF
                  </p>
                  <Badge
                    variant={lesson.isPaid ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {lesson.isPaid ? t.details.paid : t.details.unpaid}
                  </Badge>
                </div>
              </div>

              {/* Instructor */}
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.instructor}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={lesson.instructorAvatar}
                      alt={lesson.instructorName}
                    />

                    <AvatarFallback className="text-xs">
                      {lesson.instructorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground font-medium">
                    {lesson.instructorName}
                  </span>
                </div>
              </div>

              {/* Vehicle */}
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.vehicle}
                </p>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />

                  <span className="text-foreground font-medium">
                    {lesson.vehiclePlate} - {lesson.vehicleModel}
                  </span>
                </div>
              </div>

              {/* Meeting Point */}
              <div className="col-span-2">
                <p className="text-muted-foreground text-xs mb-1">
                  {t.details.meetingPoint}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium">
                      {lesson.meetingPoint.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.meetingPoint.address}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleOpenMaps}>
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Notes */}
              {lesson.notes && (
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs mb-1">
                    {t.details.notes}
                  </p>
                  <p className="text-sm text-foreground italic">
                    {lesson.notes}
                  </p>
                </div>
              )}

              {/* Completion Notes */}
              {lesson.completionNotes && (
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs mb-1">
                    {t.details.completionNotes}
                  </p>
                  <p className="text-sm text-foreground">
                    {lesson.completionNotes}
                  </p>
                </div>
              )}

              {/* Instructor Rating */}
              {lesson.instructorRating && (
                <div className="col-span-2">
                  <p className="text-muted-foreground text-xs mb-1">
                    {t.details.instructorRating}
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-lg",
                          i < lesson.instructorRating!
                            ? "text-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Actions Section */}
          <div className="p-4 space-y-2">
            <h4 className="font-semibold text-sm text-foreground mb-3">
              {t.actions.title}
            </h4>

            <div className="space-y-2">
              {onEdit && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onEdit}
                >
                  <Edit className="w-4 h-4 mr-2" />

                  {t.actions.edit}
                </Button>
              )}

              {lesson.status !== "canceled" &&
                lesson.status !== "completed" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => setCancelDialogOpen(true)}
                  >
                    <X className="w-4 h-4 mr-2" />

                    {t.actions.cancel}
                  </Button>
                )}

              {(lesson.status === "scheduled" ||
                lesson.status === "in_progress") && (
                <Button
                  variant="outline"
                  className="w-full justify-start text-green-600 hover:text-green-600"
                  onClick={() => setCompleteDialogOpen(true)}
                >
                  <Check className="w-4 h-4 mr-2" />

                  {t.actions.markCompleted}
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleContactStudent}
              >
                <Mail className="w-4 h-4 mr-2" />

                {t.actions.contactStudent}
              </Button>

              {onViewStudent && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onViewStudent}
                >
                  <User className="w-4 h-4 mr-2" />

                  {t.actions.viewStudent}
                </Button>
              )}

              {onPrint && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handlePrint}
                >
                  <Printer className="w-4 h-4 mr-2" />

                  {t.actions.print}
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* History Section */}
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-sm text-foreground">
              {t.history.title}
            </h4>

            <div className="space-y-3">
              {lesson.history.map((entry) => (
                <div key={entry.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />

                    <div className="w-px h-full bg-border" />
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="text-sm font-medium text-foreground">
                      {t.history[entry.action as keyof typeof t.history]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleString(locale)}{" "}
                      {t.history.by} {entry.user.name}
                    </p>
                    {entry.details && (
                      <p className="text-xs text-muted-foreground italic mt-1">
                        {entry.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Admin Notes */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground">
                {t.history.adminNotes}
              </p>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={t.history.adminNotesPlaceholder}
                rows={2}
                className="text-sm"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Action Dialogs */}
      <CancelLessonDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        lesson={lesson}
        locale={locale}
        onConfirm={onCancel}
      />

      <CompleteLessonDialog
        open={completeDialogOpen}
        onOpenChange={setCompleteDialogOpen}
        lesson={lesson}
        locale={locale}
        onConfirm={onComplete}
      />
    </>
  );
}
