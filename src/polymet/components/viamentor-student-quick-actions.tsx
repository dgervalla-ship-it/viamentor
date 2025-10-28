/**
 * VIAMENTOR Student Quick Actions Sidebar
 *
 * Sidebar sticky right >1400px avec raccourcis actions fréquentes
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";
import type {
  StudentDetail,
  StudentDetailLocale,
} from "@/polymet/data/viamentor-student-detail-data";

interface QuickActionsSidebarProps {
  student: StudentDetail;
  locale?: StudentDetailLocale;
  onBookLesson?: () => void;
  onCreateInvoice?: () => void;
  onSendEmail?: () => void;
  onCall?: () => void;
  onSendSMS?: () => void;
  onAddNote?: () => void;
  onViewDocuments?: () => void;
  onViewProgress?: () => void;
}

export function QuickActionsSidebar({
  student,
  locale = "fr",
  onBookLesson,
  onCreateInvoice,
  onSendEmail,
  onCall,
  onSendSMS,
  onAddNote,
  onViewDocuments,
  onViewProgress,
}: QuickActionsSidebarProps) {
  const t = useStudentDetailTranslations(locale);

  const hasUpcomingLesson = student.nextLesson !== null;
  const hasOutstandingBalance = student.financialBalance < 0;
  const hasLowLessonBalance = student.lessonsBalance < 3;

  return (
    <div className="hidden xl:block w-80 space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.quickActions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="default"
            className="w-full justify-start"
            onClick={onBookLesson}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />

            {t.bookLesson}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onCreateInvoice}
          >
            <CreditCardIcon className="h-4 w-4 mr-2" />

            {t.createInvoice}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onViewDocuments}
          >
            <FileTextIcon className="h-4 w-4 mr-2" />

            {t.viewDocuments}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onViewProgress}
          >
            <TrendingUpIcon className="h-4 w-4 mr-2" />

            {t.viewProgress}
          </Button>
        </CardContent>
      </Card>

      {/* Contact Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.contact}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onSendEmail}
          >
            <MailIcon className="h-4 w-4 mr-2" />

            {t.sendEmail}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onCall}
          >
            <PhoneIcon className="h-4 w-4 mr-2" />

            {t.call}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onSendSMS}
          >
            <MessageSquareIcon className="h-4 w-4 mr-2" />

            {t.sendSMS}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onAddNote}
          >
            <FileTextIcon className="h-4 w-4 mr-2" />

            {t.addNote}
          </Button>
        </CardContent>
      </Card>

      {/* Alerts & Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.alertsReminders}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {hasUpcomingLesson && student.nextLesson && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <ClockIcon className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {t.nextLesson}
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    {new Date(student.nextLesson.date).toLocaleDateString(
                      locale,
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      }
                    )}{" "}
                    à {student.nextLesson.time}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {student.nextLesson.instructor}
                  </p>
                </div>
              </div>
            </div>
          )}

          {hasOutstandingBalance && (
            <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">
                    {t.outstandingBalance}
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    CHF {Math.abs(student.financialBalance)}
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-red-600 dark:text-red-400 mt-1"
                    onClick={onCreateInvoice}
                  >
                    {t.sendReminder}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {hasLowLessonBalance && (
            <div className="p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    {t.lowLessonBalance}
                  </p>
                  <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                    {student.lessonsBalance} {t.lessonsRemaining}
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-orange-600 dark:text-orange-400 mt-1"
                    onClick={onCreateInvoice}
                  >
                    {t.proposePurchase}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!hasUpcomingLesson &&
            !hasOutstandingBalance &&
            !hasLowLessonBalance && (
              <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                      {t.allGood}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      {t.noAlertsAtThisTime}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t.quickStats}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t.totalLessons}
            </span>
            <Badge variant="secondary">
              {student.categories.reduce(
                (sum, cat) => sum + cat.lessonsCompleted,
                0
              )}
            </Badge>
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t.avgProgress}
            </span>
            <Badge variant="secondary">
              {Math.round(
                student.categories.reduce((sum, cat) => sum + cat.progress, 0) /
                  student.categories.length
              )}
              %
            </Badge>
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t.memberSince}
            </span>
            <span className="text-sm font-medium">
              {new Date(student.registrationDate).toLocaleDateString(locale, {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t.categories}
            </span>
            <Badge variant="secondary">{student.categories.length}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
