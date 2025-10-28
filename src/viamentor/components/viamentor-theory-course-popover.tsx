/**
 * VIAMENTOR - Theory Course Popover
 * Popover détails complet cours théoriques avec toutes les sections
 */

import { useState } from "react";
import {
  XIcon,
  CalendarIcon,
  ClockIcon,
  DoorOpenIcon,
  UserIcon,
  MapPinIcon,
  UsersIcon,
  PlayIcon,
  CheckCircleIcon,
  CopyIcon,
  PrinterIcon,
  ListIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { TheoryCourse } from "@/viamentor/data/viamentor-theory-courses-data";
import {
  getEnrollmentPercentage,
  getProgressColor,
  formatCourseDate,
  formatTimeRange,
  getParticipantsByCourse,
  getWaitingListByCourse,
} from "@/viamentor/data/viamentor-theory-courses-data";
import {
  getTheoryCoursesTranslation,
  type TheoryCoursesLocale,
} from "@/viamentor/data/viamentor-theory-courses-i18n";
import { ParticipantsManagement } from "@/viamentor/components/viamentor-participants-management";
import { AttendanceTracking } from "@/viamentor/components/viamentor-attendance-tracking";

interface TheoryCoursePopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: TheoryCourse | null;
  locale?: TheoryCoursesLocale;
  onEdit?: (course: TheoryCourse) => void;
  onCancel?: (course: TheoryCourse) => void;
  onMarkStarted?: (course: TheoryCourse) => void;
  onMarkCompleted?: (course: TheoryCourse) => void;
  onDuplicate?: (course: TheoryCourse) => void;
  onPrintConvocations?: (course: TheoryCourse) => void;
  onEnrollStudent?: (course: TheoryCourse) => void;
  onManageWaitingList?: (course: TheoryCourse) => void;
}

export function TheoryCoursePopover({
  open,
  onOpenChange,
  course,
  locale = "fr",
  onEdit,
  onCancel,
  onMarkStarted,
  onMarkCompleted,
  onDuplicate,
  onPrintConvocations,
  onEnrollStudent,
  onManageWaitingList,
}: TheoryCoursePopoverProps) {
  const t = getTheoryCoursesTranslation(locale);
  const [activeTab, setActiveTab] = useState("details");
  const [manageSheet, setManageSheet] = useState(false);

  if (!course) return null;

  const participants = getParticipantsByCourse(course.id);
  const waitingList = getWaitingListByCourse(course.id);
  const percentage = getEnrollmentPercentage(course.enrolled, course.capacity);
  const progressColor = getProgressColor(percentage);
  const isFull = course.enrolled >= course.capacity;
  const availablePlaces = course.capacity - course.enrolled;

  // Progress color class
  const progressColorClass = {
    green: "text-green-600",
    orange: "text-orange-600",
    destructive: "text-destructive",
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl">{course.topic}</DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    {t.courseTypes[course.type]}
                  </Badge>
                  <Badge
                    variant={
                      course.status === "canceled" ? "destructive" : "default"
                    }
                  >
                    {t.status[course.status]}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1"
          >
            <div className="px-6">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="details">{t.sections.details}</TabsTrigger>
                <TabsTrigger value="participants">
                  {t.sections.participants} ({participants.length})
                </TabsTrigger>
                <TabsTrigger value="actions">{t.sections.actions}</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[500px] px-6 py-4">
              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6 mt-0">
                {/* Date & Time */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

                    <div>
                      <p className="text-sm font-medium">{t.details.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCourseDate(
                          course.startDate,
                          course.endDate,
                          locale
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

                    <div>
                      <p className="text-sm font-medium">
                        {t.details.schedule}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeRange(course.startTime, course.endTime)} (
                        {course.totalHours} {t.details.hours})
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Room */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DoorOpenIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

                    <div className="flex-1">
                      <p className="text-sm font-medium">{t.details.room}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.room.number} • {course.room.capacity}{" "}
                        {t.details.places}
                      </p>
                      {course.room.building && (
                        <p className="text-sm text-muted-foreground">
                          {course.room.building}
                        </p>
                      )}
                      {course.room.address && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPinIcon className="h-3 w-3" />

                          {course.room.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Instructor */}
                <div className="flex items-start gap-3">
                  <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">
                      {t.details.instructor}
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={course.instructor.avatar} />

                        <AvatarFallback>
                          {course.instructor.firstName[0]}
                          {course.instructor.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {course.instructor.firstName}{" "}
                        {course.instructor.lastName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                {course.categories && course.categories.length > 0 && (
                  <>
                    <Separator />

                    <div>
                      <p className="text-sm font-medium mb-2">
                        {t.details.categories}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {course.categories.map((cat) => (
                          <Badge key={cat} variant="outline">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Description */}
                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">
                    {t.details.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </div>

                {/* Price & Places */}
                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  {course.price && (
                    <div>
                      <p className="text-sm font-medium">{t.details.price}</p>
                      <p className="text-lg font-bold">
                        CHF {course.price.toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {t.details.availablePlaces}
                    </p>
                    <p
                      className={cn(
                        "text-lg font-bold",
                        progressColorClass[progressColor]
                      )}
                    >
                      {availablePlaces}/{course.capacity}
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Participants Tab */}
              <TabsContent value="participants" className="mt-0">
                {course.status === "in_progress" ||
                course.status === "completed" ? (
                  <AttendanceTracking
                    participants={participants}
                    locale={locale}
                    onAttendanceChange={(id, status) =>
                      console.log("Attendance:", id, status)
                    }
                    onSave={(attendance) => console.log("Save:", attendance)}
                    onGenerateSheet={() => console.log("Generate sheet")}
                  />
                ) : (
                  <ParticipantsManagement
                    participants={participants}
                    locale={locale}
                    showAttendance={false}
                    onContact={(p) => console.log("Contact:", p)}
                    onViewProfile={(p) => console.log("View:", p)}
                    onUnenroll={(p, reason, notify, credit) =>
                      console.log("Unenroll:", p, reason)
                    }
                    onExport={() => console.log("Export")}
                  />
                )}
              </TabsContent>

              {/* Actions Tab */}
              <TabsContent value="actions" className="space-y-3 mt-0">
                <div className="grid gap-2">
                  {/* Manage participants */}
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setManageSheet(true)}
                  >
                    <UsersIcon className="h-4 w-4 mr-2" />

                    {t.actions.manageParticipants}
                  </Button>

                  {/* Enroll student */}
                  {!isFull &&
                    course.status === "scheduled" &&
                    onEnrollStudent && (
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => onEnrollStudent(course)}
                      >
                        <UserIcon className="h-4 w-4 mr-2" />

                        {t.actions.enrollStudent}
                      </Button>
                    )}

                  {/* Waiting list */}
                  {isFull && onManageWaitingList && (
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onManageWaitingList(course)}
                    >
                      <ListIcon className="h-4 w-4 mr-2" />
                      {t.actions.waitingList} ({waitingList.length})
                    </Button>
                  )}

                  <Separator />

                  {/* Edit course */}
                  {onEdit &&
                    course.status !== "completed" &&
                    course.status !== "canceled" && (
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => onEdit(course)}
                      >
                        {t.actions.editCourse}
                      </Button>
                    )}

                  {/* Mark started */}
                  {course.status === "scheduled" && onMarkStarted && (
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onMarkStarted(course)}
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />

                      {t.actions.markStarted}
                    </Button>
                  )}

                  {/* Mark completed */}
                  {course.status === "in_progress" && onMarkCompleted && (
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onMarkCompleted(course)}
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-2" />

                      {t.actions.markCompleted}
                    </Button>
                  )}

                  {/* Duplicate */}
                  {onDuplicate && (
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onDuplicate(course)}
                    >
                      <CopyIcon className="h-4 w-4 mr-2" />

                      {t.actions.duplicate}
                    </Button>
                  )}

                  {/* Print convocations */}
                  {onPrintConvocations && participants.length > 0 && (
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => onPrintConvocations(course)}
                    >
                      <PrinterIcon className="h-4 w-4 mr-2" />

                      {t.actions.printConvocations}
                    </Button>
                  )}

                  <Separator />

                  {/* Cancel course */}
                  {onCancel &&
                    course.status !== "completed" &&
                    course.status !== "canceled" && (
                      <Button
                        variant="destructive"
                        className="justify-start"
                        onClick={() => onCancel(course)}
                      >
                        {t.actions.cancelCourse}
                      </Button>
                    )}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Manage Participants Sheet */}
      <Sheet open={manageSheet} onOpenChange={setManageSheet}>
        <SheetContent side="right" className="w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{t.manage.title}</SheetTitle>
            <SheetDescription>{course.topic}</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ParticipantsManagement
              participants={participants}
              locale={locale}
              showAttendance={
                course.status === "in_progress" || course.status === "completed"
              }
              onContact={(p) => console.log("Contact:", p)}
              onViewProfile={(p) => console.log("View:", p)}
              onUnenroll={(p, reason, notify, credit) =>
                console.log("Unenroll:", p)
              }
              onExport={() => console.log("Export")}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
