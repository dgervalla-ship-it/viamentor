/**
 * Page Ma Journée Moniteur
 * Vue d'ensemble complète de la journée du moniteur avec leçons, élèves, tâches et statistiques
 *
 * @module pages/viamentor-instructor-today-page
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CarIcon,
  MapPinIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  PhoneIcon,
  MessageSquareIcon,
  NavigationIcon,
  FileTextIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorTodayPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Ma Journée",
    subtitle: "Vue d'ensemble de votre journée",
    overview: "Vue d'ensemble",
    lessons: "Mes Leçons",
    students: "Mes Élèves",
    tasks: "Mes Tâches",
    stats: {
      lessonsToday: "Leçons aujourd'hui",
      hoursPlanned: "Heures planifiées",
      studentsToday: "Élèves différents",
      tasksCompleted: "Tâches complétées",
    },
    nextLesson: "Prochaine leçon",
    upcomingLessons: "Leçons à venir",
    completedLessons: "Leçons terminées",
    noLessons: "Aucune leçon prévue",
    startIn: "Commence dans",
    duration: "Durée",
    student: "Élève",
    vehicle: "Véhicule",
    location: "Lieu",
    type: "Type",
    status: {
      upcoming: "À venir",
      inProgress: "En cours",
      completed: "Terminée",
      cancelled: "Annulée",
    },
    actions: {
      startLesson: "Démarrer",
      viewDetails: "Voir détails",
      evaluate: "Évaluer",
      contact: "Contacter",
      navigate: "Itinéraire",
      viewStudent: "Voir profil",
    },
    studentInfo: {
      lessonsCompleted: "leçons effectuées",
      nextLesson: "Prochaine leçon",
      progress: "Progression",
      phone: "Téléphone",
      notes: "Notes",
    },
    taskTypes: {
      evaluation: "Évaluation",
      administrative: "Administratif",
      preparation: "Préparation",
      followUp: "Suivi",
    },
    priority: {
      high: "Haute",
      medium: "Moyenne",
      low: "Basse",
    },
    weather: {
      title: "Météo",
      temperature: "Température",
      conditions: "Conditions",
    },
    tips: {
      title: "Conseil du jour",
      content:
        "Pensez à vérifier l'état du véhicule avant chaque leçon et à adapter votre enseignement aux conditions météo.",
    },
  },
  de: {
    title: "Mein Tag",
    subtitle: "Übersicht über Ihren Tag",
    overview: "Übersicht",
    lessons: "Meine Lektionen",
    students: "Meine Schüler",
    tasks: "Meine Aufgaben",
    stats: {
      lessonsToday: "Lektionen heute",
      hoursPlanned: "Geplante Stunden",
      studentsToday: "Verschiedene Schüler",
      tasksCompleted: "Erledigte Aufgaben",
    },
    nextLesson: "Nächste Lektion",
    upcomingLessons: "Kommende Lektionen",
    completedLessons: "Abgeschlossene Lektionen",
    noLessons: "Keine Lektionen geplant",
    startIn: "Beginnt in",
    duration: "Dauer",
    student: "Schüler",
    vehicle: "Fahrzeug",
    location: "Ort",
    type: "Typ",
    status: {
      upcoming: "Bevorstehend",
      inProgress: "Laufend",
      completed: "Abgeschlossen",
      cancelled: "Abgesagt",
    },
    actions: {
      startLesson: "Starten",
      viewDetails: "Details anzeigen",
      evaluate: "Bewerten",
      contact: "Kontaktieren",
      navigate: "Route",
      viewStudent: "Profil anzeigen",
    },
    studentInfo: {
      lessonsCompleted: "Lektionen absolviert",
      nextLesson: "Nächste Lektion",
      progress: "Fortschritt",
      phone: "Telefon",
      notes: "Notizen",
    },
    taskTypes: {
      evaluation: "Bewertung",
      administrative: "Verwaltung",
      preparation: "Vorbereitung",
      followUp: "Nachverfolgung",
    },
    priority: {
      high: "Hoch",
      medium: "Mittel",
      low: "Niedrig",
    },
    weather: {
      title: "Wetter",
      temperature: "Temperatur",
      conditions: "Bedingungen",
    },
    tips: {
      title: "Tipp des Tages",
      content:
        "Denken Sie daran, den Zustand des Fahrzeugs vor jeder Lektion zu überprüfen und Ihren Unterricht an die Wetterbedingungen anzupassen.",
    },
  },
  it: {
    title: "La Mia Giornata",
    subtitle: "Panoramica della tua giornata",
    overview: "Panoramica",
    lessons: "Le Mie Lezioni",
    students: "I Miei Allievi",
    tasks: "I Miei Compiti",
    stats: {
      lessonsToday: "Lezioni oggi",
      hoursPlanned: "Ore pianificate",
      studentsToday: "Allievi diversi",
      tasksCompleted: "Compiti completati",
    },
    nextLesson: "Prossima lezione",
    upcomingLessons: "Lezioni in arrivo",
    completedLessons: "Lezioni completate",
    noLessons: "Nessuna lezione prevista",
    startIn: "Inizia tra",
    duration: "Durata",
    student: "Allievo",
    vehicle: "Veicolo",
    location: "Luogo",
    type: "Tipo",
    status: {
      upcoming: "In arrivo",
      inProgress: "In corso",
      completed: "Completata",
      cancelled: "Annullata",
    },
    actions: {
      startLesson: "Inizia",
      viewDetails: "Vedi dettagli",
      evaluate: "Valuta",
      contact: "Contatta",
      navigate: "Itinerario",
      viewStudent: "Vedi profilo",
    },
    studentInfo: {
      lessonsCompleted: "lezioni effettuate",
      nextLesson: "Prossima lezione",
      progress: "Progresso",
      phone: "Telefono",
      notes: "Note",
    },
    taskTypes: {
      evaluation: "Valutazione",
      administrative: "Amministrativo",
      preparation: "Preparazione",
      followUp: "Seguito",
    },
    priority: {
      high: "Alta",
      medium: "Media",
      low: "Bassa",
    },
    weather: {
      title: "Meteo",
      temperature: "Temperatura",
      conditions: "Condizioni",
    },
    tips: {
      title: "Consiglio del giorno",
      content:
        "Ricorda di controllare lo stato del veicolo prima di ogni lezione e di adattare il tuo insegnamento alle condizioni meteorologiche.",
    },
  },
  en: {
    title: "My Day",
    subtitle: "Overview of your day",
    overview: "Overview",
    lessons: "My Lessons",
    students: "My Students",
    tasks: "My Tasks",
    stats: {
      lessonsToday: "Lessons today",
      hoursPlanned: "Hours planned",
      studentsToday: "Different students",
      tasksCompleted: "Tasks completed",
    },
    nextLesson: "Next lesson",
    upcomingLessons: "Upcoming lessons",
    completedLessons: "Completed lessons",
    noLessons: "No lessons scheduled",
    startIn: "Starts in",
    duration: "Duration",
    student: "Student",
    vehicle: "Vehicle",
    location: "Location",
    type: "Type",
    status: {
      upcoming: "Upcoming",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    actions: {
      startLesson: "Start",
      viewDetails: "View details",
      evaluate: "Evaluate",
      contact: "Contact",
      navigate: "Navigate",
      viewStudent: "View profile",
    },
    studentInfo: {
      lessonsCompleted: "lessons completed",
      nextLesson: "Next lesson",
      progress: "Progress",
      phone: "Phone",
      notes: "Notes",
    },
    taskTypes: {
      evaluation: "Evaluation",
      administrative: "Administrative",
      preparation: "Preparation",
      followUp: "Follow-up",
    },
    priority: {
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    weather: {
      title: "Weather",
      temperature: "Temperature",
      conditions: "Conditions",
    },
    tips: {
      title: "Tip of the day",
      content:
        "Remember to check the vehicle condition before each lesson and adapt your teaching to weather conditions.",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
  stats: {
    lessonsToday: 6,
    hoursPlanned: 9,
    studentsToday: 5,
    tasksCompleted: 4,
    tasksTotal: 6,
  },
  nextLesson: {
    id: "L001",
    studentName: "Sophie Martin",
    studentAvatar: "https://github.com/yahyabedirhan.png",
    startTime: "14:00",
    endTime: "15:30",
    duration: "1h30",
    startsIn: "45 min",
    vehicle: "VW Golf - GE 12345",
    location: "Place de Neuve, Genève",
    type: "Circulation",
    category: "B",
    status: "upcoming" as const,
    studentPhone: "+41 79 123 45 67",
    studentProgress: 65,
    studentLessons: 18,
  },
  upcomingLessons: [
    {
      id: "L002",
      studentName: "Marc Dubois",
      studentAvatar: "https://github.com/kdrnp.png",
      startTime: "16:00",
      endTime: "17:00",
      duration: "1h",
      vehicle: "Audi A3 - GE 67890",
      location: "Gare Cornavin",
      type: "Manœuvres",
      category: "B",
      status: "upcoming" as const,
    },
    {
      id: "L003",
      studentName: "Julie Roux",
      studentAvatar: "https://github.com/denizbuyuktas.png",
      startTime: "17:30",
      endTime: "19:00",
      duration: "1h30",
      vehicle: "VW Golf - GE 12345",
      location: "Carouge",
      type: "Autoroute",
      category: "B",
      status: "upcoming" as const,
    },
  ],

  completedLessons: [
    {
      id: "L004",
      studentName: "Pierre Favre",
      studentAvatar: "https://github.com/yusufhilmi.png",
      startTime: "08:00",
      endTime: "09:30",
      duration: "1h30",
      vehicle: "VW Golf - GE 12345",
      location: "Plainpalais",
      type: "Circulation",
      category: "B",
      status: "completed" as const,
      evaluated: true,
    },
    {
      id: "L005",
      studentName: "Emma Blanc",
      studentAvatar: "https://github.com/shoaibux1.png",
      startTime: "10:00",
      endTime: "11:30",
      duration: "1h30",
      vehicle: "Audi A3 - GE 67890",
      location: "Eaux-Vives",
      type: "Manœuvres",
      category: "B",
      status: "completed" as const,
      evaluated: false,
    },
  ],

  students: [
    {
      id: "S001",
      name: "Sophie Martin",
      avatar: "https://github.com/yahyabedirhan.png",
      lessonsCompleted: 18,
      nextLesson: "Aujourd'hui 14:00",
      progress: 65,
      phone: "+41 79 123 45 67",
      notes: "Bonne progression, à l'aise en circulation",
    },
    {
      id: "S002",
      name: "Marc Dubois",
      avatar: "https://github.com/kdrnp.png",
      lessonsCompleted: 12,
      nextLesson: "Aujourd'hui 16:00",
      progress: 45,
      phone: "+41 79 234 56 78",
      notes: "Travail sur les manœuvres nécessaire",
    },
    {
      id: "S003",
      name: "Julie Roux",
      avatar: "https://github.com/denizbuyuktas.png",
      lessonsCompleted: 25,
      nextLesson: "Aujourd'hui 17:30",
      progress: 85,
      phone: "+41 79 345 67 89",
      notes: "Prête pour l'examen pratique",
    },
  ],

  tasks: [
    {
      id: "T001",
      title: "Évaluer leçon Emma Blanc",
      type: "evaluation",
      priority: "high",
      completed: false,
      dueTime: "12:00",
    },
    {
      id: "T002",
      title: "Préparer parcours autoroute Julie",
      type: "preparation",
      priority: "medium",
      completed: false,
      dueTime: "17:00",
    },
    {
      id: "T003",
      title: "Vérifier documents Pierre",
      type: "administrative",
      priority: "low",
      completed: true,
      dueTime: "10:00",
    },
    {
      id: "T004",
      title: "Appeler parent Sophie",
      type: "followUp",
      priority: "medium",
      completed: true,
      dueTime: "11:00",
    },
  ],

  weather: {
    temperature: "18°C",
    conditions: "Ensoleillé",
    icon: "☀️",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorTodayPage({
  locale = "fr",
}: InstructorTodayPageProps) {
  const t = translations[locale];
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "inProgress":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "completed":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      case "cancelled":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "low":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <TrendingUpIcon className="h-3 w-3" />;

      case "medium":
        return <MinusIcon className="h-3 w-3" />;

      case "low":
        return <TrendingDownIcon className="h-3 w-3" />;

      default:
        return <MinusIcon className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />

            <span className="text-sm font-medium">
              {new Date().toLocaleDateString(locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.lessonsToday}
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.stats.lessonsToday}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.hoursPlanned}
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.stats.hoursPlanned}h
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.studentsToday}
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.stats.studentsToday}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.tasksCompleted}
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.stats.tasksCompleted}/{mockData.stats.tasksTotal}
            </div>
            <Progress
              value={
                (mockData.stats.tasksCompleted / mockData.stats.tasksTotal) *
                100
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="lessons">{t.lessons}</TabsTrigger>
          <TabsTrigger value="students">{t.students}</TabsTrigger>
          <TabsTrigger value="tasks">{t.tasks}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Next Lesson Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircleIcon className="h-5 w-5 text-orange-500" />

                  {t.nextLesson}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mockData.nextLesson.studentAvatar} />

                      <AvatarFallback>
                        {mockData.nextLesson.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {mockData.nextLesson.studentName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="h-4 w-4" />

                        <span>
                          {mockData.nextLesson.startTime} -{" "}
                          {mockData.nextLesson.endTime}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {mockData.nextLesson.startsIn}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(mockData.nextLesson.status)}>
                    {t.status[mockData.nextLesson.status]}
                  </Badge>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CarIcon className="h-4 w-4 text-muted-foreground" />

                    <span>{mockData.nextLesson.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                    <span>{mockData.nextLesson.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />

                    <span>{mockData.nextLesson.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />

                    <span>{mockData.nextLesson.duration}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm">
                    <CheckCircle2Icon className="mr-2 h-4 w-4" />

                    {t.actions.startLesson}
                  </Button>
                  <Button size="sm" variant="outline">
                    <PhoneIcon className="mr-2 h-4 w-4" />

                    {t.actions.contact}
                  </Button>
                  <Button size="sm" variant="outline">
                    <NavigationIcon className="mr-2 h-4 w-4" />

                    {t.actions.navigate}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weather & Tips */}
            <Card>
              <CardHeader>
                <CardTitle>{t.weather.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{mockData.weather.icon}</div>
                  <div>
                    <div className="text-2xl font-bold">
                      {mockData.weather.temperature}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {mockData.weather.conditions}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.tips.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.tips.content}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4">
          {/* Upcoming Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>{t.upcomingLessons}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.upcomingLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={lesson.studentAvatar} />

                      <AvatarFallback>
                        {lesson.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{lesson.studentName}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />

                        <span>
                          {lesson.startTime} - {lesson.endTime}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{lesson.type}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {t.actions.viewDetails}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Completed Lessons */}
          <Card>
            <CardHeader>
              <CardTitle>{t.completedLessons}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.completedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={lesson.studentAvatar} />

                      <AvatarFallback>
                        {lesson.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{lesson.studentName}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />

                        <span>
                          {lesson.startTime} - {lesson.endTime}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{lesson.type}</span>
                      </div>
                    </div>
                  </div>
                  {!lesson.evaluated && (
                    <Button size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />

                      {t.actions.evaluate}
                    </Button>
                  )}
                  {lesson.evaluated && (
                    <Badge variant="outline" className="bg-green-500/10">
                      <CheckCircle2Icon className="mr-1 h-3 w-3" />
                      Évaluée
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockData.students.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} />

                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {student.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {student.lessonsCompleted}{" "}
                        {t.studentInfo.lessonsCompleted}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.studentInfo.progress}
                      </span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="text-muted-foreground">
                        {t.studentInfo.nextLesson}:
                      </span>
                      <span className="font-medium">{student.nextLesson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="font-medium">{student.phone}</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">
                      {student.notes}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquareIcon className="mr-2 h-4 w-4" />

                      {t.actions.contact}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      {t.actions.viewStudent}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.tasks}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    task.completed ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                        task.completed
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {task.completed && (
                        <CheckCircle2Icon className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`font-medium ${
                          task.completed ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />

                        <span>{task.dueTime}</span>
                        <span className="mx-1">•</span>
                        <span>{t.taskTypes[task.type]}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getPriorityColor(task.priority)} flex items-center gap-1`}
                  >
                    {getPriorityIcon(task.priority)}
                    {t.priority[task.priority]}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
