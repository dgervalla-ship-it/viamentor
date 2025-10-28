/**
 * VIAMENTOR - Dashboard École
 * Dashboard principal pour School Admin avec KPIs et activité récente
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  CalendarIcon,
  GraduationCapIcon,
  ClipboardCheckIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  BarChart3Icon,
  ActivityIcon,
  ZapIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";

export interface DashboardSchoolPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const MOCK_STATS = {
  students: {
    total: 127,
    active: 98,
    trend: "+12%",
    trendUp: true,
  },
  lessons: {
    today: 24,
    thisWeek: 156,
    trend: "+5%",
    trendUp: true,
  },
  instructors: {
    available: 8,
    total: 12,
    trend: "→",
    trendUp: null,
  },
  exams: {
    thisWeek: 15,
    successRate: 87,
    trend: "+3",
    trendUp: true,
  },
};

const MOCK_RECENT_ACTIVITIES = [
  {
    id: "1",
    type: "student",
    icon: UsersIcon,
    title: "Nouvelle inscription",
    description: "Marie Dubois - Catégorie B",
    time: "Il y a 5 min",
    color: "text-blue-600",
  },
  {
    id: "2",
    type: "lesson",
    icon: CalendarIcon,
    title: "Leçon complétée",
    description: "Jean Martin avec Marc Müller",
    time: "Il y a 12 min",
    color: "text-green-600",
  },
  {
    id: "3",
    type: "payment",
    icon: ClipboardCheckIcon,
    title: "Facture payée",
    description: "CHF 1'200.00 - Sophie Laurent",
    time: "Il y a 25 min",
    color: "text-purple-600",
  },
  {
    id: "4",
    type: "exam",
    icon: GraduationCapIcon,
    title: "Examen réussi",
    description: "Pierre Rossi - Permis B",
    time: "Il y a 1h",
    color: "text-orange-600",
  },
];

const MOCK_UPCOMING_EXAMS = [
  {
    id: "1",
    student: "Alice Bernard",
    avatar: "https://github.com/kdrnp.png",
    type: "Théorie",
    date: "Lundi 15 Jan",
    time: "10:00",
  },
  {
    id: "2",
    student: "Thomas Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    type: "Pratique",
    date: "Mardi 16 Jan",
    time: "14:30",
  },
  {
    id: "3",
    student: "Emma Favre",
    avatar: "https://github.com/yahyabedirhan.png",
    type: "Pratique",
    date: "Mercredi 17 Jan",
    time: "09:00",
  },
];

const MOCK_ALERTS = [
  {
    id: "1",
    type: "warning",
    message: "3 élèves n'ont pas eu de leçon depuis 2 semaines",
    action: "Voir la liste",
  },
  {
    id: "2",
    type: "info",
    message: "2 moniteurs ont leur autorisation qui expire dans 30 jours",
    action: "Gérer",
  },
];

export function DashboardSchoolPage({
  locale = "fr",
}: DashboardSchoolPageProps) {
  // Alerts Section - Design System: Warning color #F59E0B (amber-500)
  const alertsSection = MOCK_ALERTS.length > 0 && (
    <div className="space-y-3">
      {MOCK_ALERTS.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/20 p-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircleIcon className="h-5 w-5 text-amber-500" />

            <p className="text-sm leading-relaxed">{alert.message}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 min-h-[44px] px-6"
          >
            {alert.action}
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <ResponsivePageWrapper
      title="Dashboard École"
      description="Bienvenue dans votre espace de gestion"
      alerts={alertsSection}
      sections={[
        {
          id: "stats",
          label: "Statistiques",
          icon: <BarChart3Icon className="h-4 w-4" />,

          badge: "4",
          content: (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium leading-relaxed">
                    Élèves actifs
                  </CardTitle>
                  <UsersIcon className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold tracking-tight">
                    {MOCK_STATS.students.total}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium mt-2">
                    <span className="text-green-500 flex items-center gap-1">
                      <TrendingUpIcon className="h-4 w-4" />

                      {MOCK_STATS.students.trend}
                    </span>
                    <span className="text-gray-500">vs mois dernier</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium leading-relaxed">
                    Leçons aujourd'hui
                  </CardTitle>
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold tracking-tight">
                    {MOCK_STATS.lessons.today}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium mt-2">
                    <span className="text-green-500 flex items-center gap-1">
                      <TrendingUpIcon className="h-4 w-4" />

                      {MOCK_STATS.lessons.trend}
                    </span>
                    <span className="text-gray-500">vs semaine dernière</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium leading-relaxed">
                    Moniteurs disponibles
                  </CardTitle>
                  <GraduationCapIcon className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold tracking-tight">
                    {MOCK_STATS.instructors.available}/
                    {MOCK_STATS.instructors.total}
                  </div>
                  <div className="text-xs font-medium text-gray-500 mt-2">
                    Actuellement disponibles
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium leading-relaxed">
                    Examens cette semaine
                  </CardTitle>
                  <ClipboardCheckIcon className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold tracking-tight">
                    {MOCK_STATS.exams.thisWeek}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium mt-2">
                    <span className="text-gray-500">Taux de réussite: </span>
                    <span className="text-green-500 font-medium">
                      {MOCK_STATS.exams.successRate}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ),
        },
        {
          id: "activity",
          label: "Activité",
          icon: <ActivityIcon className="h-4 w-4" />,

          content: (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Recent Activity */}
              <Card className="p-6 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Activité récente
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-gray-500">
                    Les dernières actions dans votre école
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_RECENT_ACTIVITIES.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0"
                        >
                          <div
                            className={`mt-1 rounded-lg p-2 bg-gray-100 dark:bg-gray-800 ${activity.color}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-relaxed">
                              {activity.title}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-500">
                              {activity.description}
                            </p>
                            <p className="text-xs font-medium text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 min-h-[44px] px-6 py-3 rounded-lg"
                    asChild
                  >
                    <Link to="/activity">
                      Voir toute l'activité
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Exams */}
              <Card className="p-6 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Examens à venir
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-gray-500">
                    Prochains examens planifiés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_UPCOMING_EXAMS.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-11 w-11">
                            <AvatarImage src={exam.avatar} />

                            <AvatarFallback>{exam.student[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-relaxed">
                              {exam.student}
                            </p>
                            <p className="text-xs font-medium text-gray-500">
                              {exam.date} à {exam.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-950/20"
                        >
                          {exam.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 min-h-[44px] px-6 py-3 rounded-lg"
                    asChild
                  >
                    <Link to="/exams">
                      Voir tous les examens
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ),
        },
        {
          id: "actions",
          label: "Actions",
          icon: <ZapIcon className="h-4 w-4" />,

          content: (
            <Card className="p-6 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Actions rapides
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-gray-500">
                  Raccourcis vers les actions fréquentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Button
                    variant="outline"
                    className="min-h-[88px] flex-col gap-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                    asChild
                  >
                    <Link
                      to="/students/new"
                      className="flex flex-col items-center gap-2"
                    >
                      <UsersIcon className="h-6 w-6" />

                      <span className="text-sm font-medium">Nouvel élève</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[88px] flex-col gap-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                    asChild
                  >
                    <Link
                      to="/lessons/new"
                      className="flex flex-col items-center gap-2"
                    >
                      <CalendarIcon className="h-6 w-6" />

                      <span className="text-sm font-medium">
                        Planifier leçon
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[88px] flex-col gap-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                    asChild
                  >
                    <Link
                      to="/invoices/new"
                      className="flex flex-col items-center gap-2"
                    >
                      <ClipboardCheckIcon className="h-6 w-6" />

                      <span className="text-sm font-medium">Créer facture</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-[88px] flex-col gap-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                    asChild
                  >
                    <Link
                      to="/exams/schedule"
                      className="flex flex-col items-center gap-2"
                    >
                      <GraduationCapIcon className="h-6 w-6" />

                      <span className="text-sm font-medium">
                        Planifier examen
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ),
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
      spacing="normal"
    />
  );
}

export default DashboardSchoolPage;
