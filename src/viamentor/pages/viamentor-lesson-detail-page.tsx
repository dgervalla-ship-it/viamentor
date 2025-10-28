/**
 * VIAMENTOR - Lesson Detail Page
 * Page détail leçon avec édition inline, historique et actions
 */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CarIcon,
  MapPinIcon,
  EditIcon,
  XCircleIcon,
  CheckCircle2Icon,
  MailIcon,
  PhoneIcon,
  PrinterIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  getLessonById,
  type Lesson,
} from "@/viamentor/data/viamentor-lessons-data";
import {
  getLessonsTranslations,
  type LessonsLocale,
} from "@/viamentor/data/viamentor-lessons-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface LessonDetailPageProps {
  locale?: LessonsLocale;
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

function LessonHeader({
  lesson,
  locale,
}: {
  lesson: Lesson;
  locale: LessonsLocale;
}) {
  const t = getLessonsTranslations(locale);

  const statusColors = {
    scheduled: "bg-blue-500",
    in_progress: "bg-orange-500",
    completed: "bg-green-500",
    canceled: "bg-red-500",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/lessons">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
              Leçon #{lesson.id.split("-")[1]}
            </h1>
            <div
              className={`w-3 h-3 rounded-full ${statusColors[lesson.status]}`}
            />

            <Badge variant="secondary" className="text-sm">
              {t.status[lesson.status]}
            </Badge>
            <Badge variant="outline">{lesson.category}</Badge>
          </div>
          <p className="text-muted-foreground">
            {new Date(lesson.startDate).toLocaleDateString(locale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          {lesson.status === "scheduled" && (
            <Button variant="destructive" size="sm">
              <XCircleIcon className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          )}
          {lesson.status === "in_progress" && (
            <Button variant="default" size="sm">
              <CheckCircle2Icon className="h-4 w-4 mr-2" />
              Terminer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INFORMATION TAB
// ============================================================================

function InformationTab({
  lesson,
  locale,
}: {
  lesson: Lesson;
  locale: LessonsLocale;
}) {
  const t = getLessonsTranslations(locale);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Student Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Élève</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={lesson.studentAvatar} />

              <AvatarFallback>{lesson.studentName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{lesson.studentName}</p>
              <p className="text-sm text-muted-foreground">
                Catégorie {lesson.category}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/students/${lesson.studentId}`}>
                  <UserIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <MailIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <PhoneIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Instructor Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Moniteur</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={lesson.instructorAvatar} />

              <AvatarFallback>{lesson.instructorName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{lesson.instructorName}</p>
              <p className="text-sm text-muted-foreground">Moniteur certifié</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/instructors/${lesson.instructorId}`}>
                  <UserIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <MailIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <PhoneIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Vehicle Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Véhicule</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CarIcon className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="font-medium">{lesson.vehicleModel}</p>
                <p className="text-sm text-muted-foreground">
                  {lesson.vehiclePlate}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to={`/vehicles/${lesson.vehicleId}`}>Voir le véhicule</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Schedule Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Horaire</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(lesson.startDate).toLocaleDateString(locale, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

              <div>
                <p className="font-medium">Horaire</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(lesson.startDate).toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {new Date(lesson.endDate).toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  ({lesson.duration} min)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-muted-foreground mt-0.5" />

              <div>
                <p className="font-medium">Point de rendez-vous</p>
                <p className="text-sm text-muted-foreground">
                  {lesson.meetingPoint.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lesson.meetingPoint.address}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Info */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Facturation</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Prix de la leçon</span>
              <span className="font-medium">{lesson.price} CHF</span>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-medium">Statut paiement</span>
              <Badge variant={lesson.isPaid ? "default" : "destructive"}>
                {lesson.isPaid ? t.details.paid : t.details.unpaid}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Notes */}
        {lesson.notes && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            <p className="text-sm text-muted-foreground">{lesson.notes}</p>
          </Card>
        )}

        {/* Completion Notes */}
        {lesson.completionNotes && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Commentaire de fin</h3>
            <p className="text-sm text-muted-foreground">
              {lesson.completionNotes}
            </p>
            {lesson.instructorRating && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Évaluation:
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < lesson.instructorRating!
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Cancel Reason */}
        {lesson.cancelReason && (
          <Card className="p-6 border-destructive">
            <h3 className="text-lg font-semibold mb-4 text-destructive">
              Raison d'annulation
            </h3>
            <p className="text-sm text-muted-foreground">
              {lesson.cancelReason}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// HISTORY TAB
// ============================================================================

function HistoryTab({
  lesson,
  locale,
}: {
  lesson: Lesson;
  locale: LessonsLocale;
}) {
  const t = getLessonsTranslations(locale);

  const actionIcons = {
    created: CalendarIcon,
    scheduled: CalendarIcon,
    confirmed: CheckCircle2Icon,
    started: ClockIcon,
    completed: CheckCircle2Icon,
    canceled: XCircleIcon,
    rescheduled: CalendarIcon,
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">
        Historique des modifications
      </h3>
      <div className="space-y-4">
        {lesson.history.map((entry, index) => {
          const Icon = actionIcons[entry.action];
          return (
            <div key={entry.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                {index < lesson.history.length - 1 && (
                  <div className="w-px h-full bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium">{t.history[entry.action]}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleString(locale)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.history.by} {entry.user.name} ({entry.user.role})
                </p>
                {entry.details && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {entry.details}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LessonDetailPage({ locale = "fr" }: LessonDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const lesson = getLessonById(id || "");

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <XCircleIcon className="h-16 w-16 text-muted-foreground" />

        <h2 className="text-2xl font-bold">Leçon introuvable</h2>
        <p className="text-muted-foreground">
          Cette leçon n'existe pas ou a été supprimée
        </p>
        <Button asChild>
          <Link to="/lessons">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Retour aux leçons
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LessonHeader lesson={lesson} locale={locale} />

      <Tabs defaultValue="information" className="space-y-6">
        <TabsList>
          <TabsTrigger value="information">Informations</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="information">
          <InformationTab lesson={lesson} locale={locale} />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab lesson={lesson} locale={locale} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
