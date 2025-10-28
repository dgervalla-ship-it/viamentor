/**
 * VIAMENTOR Students Stats Cards
 * KPIs cards header responsive grid
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  UserCheckIcon,
  GraduationCapIcon,
  CalendarIcon,
} from "lucide-react";
import { StudentStats } from "@/viamentor/data/viamentor-students-data";
import {
  StudentsLocale,
  useStudentsTranslations,
  formatDate,
} from "@/viamentor/data/viamentor-students-i18n";

interface StudentsStatsCardsProps {
  stats: StudentStats;
  locale?: StudentsLocale;
}

export function StudentsStatsCards({
  stats,
  locale = "fr",
}: StudentsStatsCardsProps) {
  const t = useStudentsTranslations(locale);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Students */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.totalStudents}</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Students */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.activeStudents}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{stats.active}</p>
                <Badge variant="default" className="bg-green-600">
                  {stats.activePercentage}%
                </Badge>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-600/10 flex items-center justify-center">
              <UserCheckIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In Training */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.inTraining}</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{stats.inTraining}</p>
                <Badge variant="default" className="bg-blue-600">
                  {locale === "fr"
                    ? "En cours"
                    : locale === "de"
                      ? "Laufend"
                      : locale === "it"
                        ? "In corso"
                        : "Ongoing"}
                </Badge>
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <GraduationCapIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Exams */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.upcomingExams}</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold">{stats.upcomingExams}</p>
                {stats.nextExamDate && (
                  <Badge variant="default" className="bg-orange-600">
                    {formatDate(stats.nextExamDate, locale)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-orange-600/10 flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
