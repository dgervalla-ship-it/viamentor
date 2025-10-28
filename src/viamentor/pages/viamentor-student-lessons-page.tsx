/**
 * VIAMENTOR - Student Lessons Page
 * Page liste leçons élève avec tabs, filtres et actions
 */

"use client";

import { useState } from "react";
import { CalendarIcon, DownloadIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockStudentLessons,
  type LessonStatus,
} from "@/viamentor/data/viamentor-student-booking-data";
import {
  bookingTranslations,
  type BookingLocale,
} from "@/viamentor/data/viamentor-student-booking-i18n";

export interface StudentLessonsPageProps {
  locale?: BookingLocale;
}

export function StudentLessonsPage({ locale = "fr" }: StudentLessonsPageProps) {
  const t = bookingTranslations[locale];
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">(
    "upcoming"
  );

  // Filter lessons by status
  const upcomingLessons = mockStudentLessons.filter(
    (l) => l.status === "upcoming"
  );
  const pastLessons = mockStudentLessons.filter(
    (l) => l.status === "completed"
  );
  const canceledLessons = mockStudentLessons.filter(
    (l) => l.status === "canceled"
  );

  const getStatusBadge = (status: LessonStatus) => {
    const variants: Record<LessonStatus, { label: string; className: string }> =
      {
        upcoming: {
          label: "À venir",
          className:
            "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        },
        completed: {
          label: "Terminée",
          className:
            "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        },
        canceled: {
          label: "Annulée",
          className:
            "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
        },
        no_show: {
          label: "Absent",
          className:
            "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        },
        rescheduled: {
          label: "Reportée",
          className:
            "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        },
      };

    const variant = variants[status];
    return (
      <Badge className={variant.className} variant="secondary">
        {variant.label}
      </Badge>
    );
  };

  const renderLessonCard = (lesson: (typeof mockStudentLessons)[0]) => (
    <Card key={lesson.id} className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <img
            src={lesson.instructor.avatar}
            alt={lesson.instructor.name}
            className="h-12 w-12 rounded-full"
          />

          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {lesson.date} {t.common.at} {lesson.time}
              </h3>
              {getStatusBadge(lesson.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {lesson.instructor.name} • {lesson.duration} {t.common.minutes}
            </p>
            <p className="text-sm text-muted-foreground">
              {lesson.vehicle.brand} {lesson.vehicle.model} (
              {lesson.vehicle.plate})
            </p>
            {lesson.objectives && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Objectifs:</span>{" "}
                {lesson.objectives}
              </p>
            )}
            {lesson.evaluation && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  ⭐ {lesson.evaluation.rating}/5
                </span>
                <span className="text-sm text-muted-foreground">
                  {lesson.evaluation.comment}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {lesson.status === "upcoming" && (
            <>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
              <Button variant="outline" size="sm">
                Annuler
              </Button>
            </>
          )}
          {lesson.status === "completed" && (
            <Button variant="outline" size="sm">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Attestation
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <CalendarIcon className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {t.myLessons.empty.title}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {t.myLessons.empty.description}
      </p>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />

        {t.myLessons.empty.action}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t.myLessons.title}
          </h1>
          <p className="text-muted-foreground">
            {mockStudentLessons.length} leçon(s) au total
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />

            {t.pageTitle}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList>
          <TabsTrigger value="upcoming">
            {t.myLessons.tabs.upcoming}
            {upcomingLessons.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {upcomingLessons.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past">
            {t.myLessons.tabs.past}
            {pastLessons.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {pastLessons.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="canceled">
            {t.myLessons.tabs.canceled}
            {canceledLessons.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {canceledLessons.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingLessons.length > 0
            ? upcomingLessons.map(renderLessonCard)
            : renderEmptyState()}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastLessons.length > 0
            ? pastLessons.map(renderLessonCard)
            : renderEmptyState()}
        </TabsContent>

        <TabsContent value="canceled" className="space-y-4">
          {canceledLessons.length > 0
            ? canceledLessons.map(renderLessonCard)
            : renderEmptyState()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
