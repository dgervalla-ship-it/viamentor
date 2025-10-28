/**
 * VIAMENTOR - Dashboard Moniteur
 * Dashboard pour Instructors avec planning, élèves et stats
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
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  TrendingUpIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BarChart3Icon,
  ActivityIcon,
  MessageSquareIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";

export interface DashboardInstructorPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const MOCK_STATS = {
  lessonsToday: 6,
  lessonsWeek: 28,
  studentsActive: 12,
  rating: 4.8,
};

const MOCK_TODAY_LESSONS = [
  {
    id: "1",
    time: "08:00 - 09:30",
    student: "Marie Dubois",
    avatar: "https://github.com/kdrnp.png",
    category: "B",
    type: "Circulation",
    location: "Départ: Rue du Rhône 45",
    status: "upcoming",
  },
  {
    id: "2",
    time: "10:00 - 11:30",
    student: "Jean Martin",
    avatar: "https://github.com/yusufhilmi.png",
    category: "B",
    type: "Manœuvres",
    location: "Départ: Place de la Gare",
    status: "upcoming",
  },
  {
    id: "3",
    time: "14:00 - 15:30",
    student: "Sophie Laurent",
    avatar: "https://github.com/yahyabedirhan.png",
    category: "B",
    type: "Autoroute",
    location: "Départ: Avenue de France 12",
    status: "upcoming",
  },
];

const MOCK_STUDENTS = [
  {
    id: "1",
    name: "Marie Dubois",
    avatar: "https://github.com/kdrnp.png",
    category: "B",
    progress: 75,
    lessonsCompleted: 18,
    nextLesson: "Aujourd'hui 08:00",
  },
  {
    id: "2",
    name: "Jean Martin",
    avatar: "https://github.com/yusufhilmi.png",
    category: "B",
    progress: 45,
    lessonsCompleted: 12,
    nextLesson: "Aujourd'hui 10:00",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    avatar: "https://github.com/yahyabedirhan.png",
    category: "B",
    progress: 90,
    lessonsCompleted: 24,
    nextLesson: "Aujourd'hui 14:00",
  },
  {
    id: "4",
    name: "Pierre Rossi",
    avatar: "https://github.com/denizbuyuktas.png",
    category: "A1",
    progress: 60,
    lessonsCompleted: 8,
    nextLesson: "Demain 09:00",
  },
];

const MOCK_RECENT_FEEDBACK = [
  {
    id: "1",
    student: "Alice Bernard",
    rating: 5,
    comment: "Excellent moniteur, très pédagogue et patient !",
    date: "Il y a 2 jours",
  },
  {
    id: "2",
    student: "Thomas Dubois",
    rating: 5,
    comment: "Explications claires, je me sens en confiance.",
    date: "Il y a 5 jours",
  },
];

export function DashboardInstructorPage({
  locale = "fr",
}: DashboardInstructorPageProps) {
  return (
    <ResponsivePageWrapper
      title="Mon Dashboard"
      description="Bienvenue Marc Müller - Moniteur B/A/BE"
      sections={[
        {
          id: "stats",
          label: "Statistiques",
          icon: <BarChart3Icon className="h-4 w-4" />,

          badge: "4",
          content: (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Leçons aujourd'hui
                  </CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {MOCK_STATS.lessonsToday}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {MOCK_STATS.lessonsWeek} cette semaine
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Élèves actifs
                  </CardTitle>
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {MOCK_STATS.studentsActive}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Élèves assignés
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Note moyenne
                  </CardTitle>
                  <StarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-1">
                    {MOCK_STATS.rating}
                    <StarIcon className="h-5 w-5 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Basé sur 47 avis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taux de réussite
                  </CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                    92%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Examens pratiques
                  </p>
                </CardContent>
              </Card>
            </div>
          ),
        },
        {
          id: "planning",
          label: "Planning",
          icon: <ActivityIcon className="h-4 w-4" />,

          badge: MOCK_TODAY_LESSONS.length.toString(),
          content: (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Planning d'aujourd'hui</CardTitle>
                    <CardDescription>Vos leçons du jour</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/planning">
                      Voir tout le planning
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_TODAY_LESSONS.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />

                        <span className="text-sm font-medium">
                          {lesson.time}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={lesson.avatar} />

                            <AvatarFallback>{lesson.student[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{lesson.student}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Catégorie {lesson.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {lesson.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPinIcon className="h-4 w-4" />

                          {lesson.location}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          Appeler
                        </Button>
                        <Button size="sm">Démarrer</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ),
        },
        {
          id: "students",
          label: "Mes élèves",
          icon: <UsersIcon className="h-4 w-4" />,

          badge: MOCK_STUDENTS.length.toString(),
          content: (
            <Card>
              <CardHeader>
                <CardTitle>Mes élèves</CardTitle>
                <CardDescription>Élèves qui vous sont assignés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_STUDENTS.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} />

                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {student.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {student.lessonsCompleted} leçons
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {student.progress}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {student.nextLesson}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/students">
                    Voir tous mes élèves
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ),
        },
        {
          id: "feedback",
          label: "Avis",
          icon: <MessageSquareIcon className="h-4 w-4" />,

          badge: MOCK_RECENT_FEEDBACK.length.toString(),
          content: (
            <Card>
              <CardHeader>
                <CardTitle>Avis récents</CardTitle>
                <CardDescription>Retours de vos élèves</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_RECENT_FEEDBACK.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="border-b border-border pb-3 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">
                          {feedback.student}
                        </p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: feedback.rating }).map(
                            (_, i) => (
                              <StarIcon
                                key={i}
                                className="h-3 w-3 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        "{feedback.comment}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {feedback.date}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/feedback">
                    Voir tous les avis
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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

export default DashboardInstructorPage;
