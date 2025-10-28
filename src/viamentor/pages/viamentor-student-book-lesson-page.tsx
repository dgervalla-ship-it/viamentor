/**
 * VIAMENTOR - Student Book Lesson Page
 * Page principale réservation leçon élève avec wizard
 */

"use client";

import { useState } from "react";
import {
  AlertCircleIcon,
  BookOpenIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { mockStudentBalance } from "@/viamentor/data/viamentor-student-booking-data";
import {
  bookingTranslations,
  type BookingLocale,
} from "@/viamentor/data/viamentor-student-booking-i18n";

export interface StudentBookLessonPageProps {
  locale?: BookingLocale;
}

export function StudentBookLessonPage({
  locale = "fr",
}: StudentBookLessonPageProps) {
  const t = bookingTranslations[locale];
  const [wizardOpen, setWizardOpen] = useState(false);
  const balance = mockStudentBalance;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t.myLessons.title}</span>
            <span>/</span>
            <span className="text-foreground">{t.pageTitle}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{t.pageTitle}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Info Alert */}
        <Alert className="mb-6">
          <AlertCircleIcon className="h-4 w-4" />

          <AlertDescription>{t.infoAlert}</AlertDescription>
        </Alert>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {/* Balance */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpenIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.balance.label}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {balance.remainingLessons}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {t.balance.lessons}
                  </span>
                </p>
              </div>
            </div>
          </Card>

          {/* Next Lesson */}
          {balance.nextLesson && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                  <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.nextLesson.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {balance.nextLesson.date} {t.common.at}{" "}
                    {balance.nextLesson.time}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Preferred Instructor */}
          {balance.preferredInstructor && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <img
                  src={balance.preferredInstructor.avatar}
                  alt={balance.preferredInstructor.name}
                  className="h-12 w-12 rounded-full"
                />

                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.nextLesson.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {balance.preferredInstructor.name}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => setWizardOpen(true)}
            className="text-lg"
          >
            <CalendarIcon className="mr-2 h-5 w-5" />

            {t.pageTitle}
          </Button>
        </div>

        {/* Booking Wizard Dialog */}
        <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
          <DialogContent className="max-w-4xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t.pageTitle}
              </h2>
              <p className="text-muted-foreground">
                Wizard en cours de développement...
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
