/**
 * Page Mes Priorités Moniteur
 * Vue d'ensemble des priorités avec tâches urgentes, élèves nécessitant attention et actions importantes
 *
 * @module pages/viamentor-instructor-priorities-page
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangleIcon,
  ClockIcon,
  UserIcon,
  FileTextIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  CalendarIcon,
  PhoneIcon,
  MessageSquareIcon,
  TargetIcon,
  FlagIcon,
  BellIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorPrioritiesPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Priorités",
    subtitle: "Actions urgentes et élèves nécessitant attention",
    overview: "Vue d'ensemble",
    urgentTasks: "Tâches urgentes",
    priorityStudents: "Élèves prioritaires",
    upcomingDeadlines: "Échéances",
    stats: {
      urgentTasks: "Tâches urgentes",
      priorityStudents: "Élèves prioritaires",
      pendingEvaluations: "Évaluations en attente",
      upcomingExams: "Examens à venir",
    },
    taskTypes: {
      evaluation: "Évaluation",
      administrative: "Administratif",
      followUp: "Suivi",
      preparation: "Préparation",
      urgent: "Urgent",
    },
    priority: {
      critical: "Critique",
      high: "Haute",
      medium: "Moyenne",
      low: "Basse",
    },
    status: {
      pending: "En attente",
      inProgress: "En cours",
      completed: "Terminée",
      overdue: "En retard",
    },
    actions: {
      complete: "Terminer",
      viewDetails: "Voir détails",
      contact: "Contacter",
      schedule: "Planifier",
      evaluate: "Évaluer",
      markDone: "Marquer fait",
    },
    studentIssues: {
      lowProgress: "Progression faible",
      missedLessons: "Leçons manquées",
      examSoon: "Examen proche",
      needsAttention: "Nécessite attention",
      documentsMissing: "Documents manquants",
    },
    deadline: {
      today: "Aujourd'hui",
      tomorrow: "Demain",
      thisWeek: "Cette semaine",
      overdue: "En retard",
    },
    noTasks: "Aucune tâche urgente",
    noPriorityStudents: "Aucun élève prioritaire",
    noDeadlines: "Aucune échéance proche",
    lessonsCompleted: "leçons effectuées",
    progress: "Progression",
    lastLesson: "Dernière leçon",
    nextLesson: "Prochaine leçon",
    examDate: "Date examen",
    daysUntilExam: "jours avant examen",
  },
  de: {
    title: "Meine Prioritäten",
    subtitle: "Dringende Aufgaben und Schüler, die Aufmerksamkeit benötigen",
    overview: "Übersicht",
    urgentTasks: "Dringende Aufgaben",
    priorityStudents: "Prioritätsschüler",
    upcomingDeadlines: "Fristen",
    stats: {
      urgentTasks: "Dringende Aufgaben",
      priorityStudents: "Prioritätsschüler",
      pendingEvaluations: "Ausstehende Bewertungen",
      upcomingExams: "Bevorstehende Prüfungen",
    },
    taskTypes: {
      evaluation: "Bewertung",
      administrative: "Verwaltung",
      followUp: "Nachverfolgung",
      preparation: "Vorbereitung",
      urgent: "Dringend",
    },
    priority: {
      critical: "Kritisch",
      high: "Hoch",
      medium: "Mittel",
      low: "Niedrig",
    },
    status: {
      pending: "Ausstehend",
      inProgress: "In Bearbeitung",
      completed: "Abgeschlossen",
      overdue: "Überfällig",
    },
    actions: {
      complete: "Abschließen",
      viewDetails: "Details anzeigen",
      contact: "Kontaktieren",
      schedule: "Planen",
      evaluate: "Bewerten",
      markDone: "Als erledigt markieren",
    },
    studentIssues: {
      lowProgress: "Geringer Fortschritt",
      missedLessons: "Verpasste Lektionen",
      examSoon: "Prüfung bald",
      needsAttention: "Benötigt Aufmerksamkeit",
      documentsMissing: "Dokumente fehlen",
    },
    deadline: {
      today: "Heute",
      tomorrow: "Morgen",
      thisWeek: "Diese Woche",
      overdue: "Überfällig",
    },
    noTasks: "Keine dringenden Aufgaben",
    noPriorityStudents: "Keine Prioritätsschüler",
    noDeadlines: "Keine bevorstehenden Fristen",
    lessonsCompleted: "Lektionen absolviert",
    progress: "Fortschritt",
    lastLesson: "Letzte Lektion",
    nextLesson: "Nächste Lektion",
    examDate: "Prüfungsdatum",
    daysUntilExam: "Tage bis zur Prüfung",
  },
  it: {
    title: "Le Mie Priorità",
    subtitle: "Compiti urgenti e allievi che necessitano attenzione",
    overview: "Panoramica",
    urgentTasks: "Compiti urgenti",
    priorityStudents: "Allievi prioritari",
    upcomingDeadlines: "Scadenze",
    stats: {
      urgentTasks: "Compiti urgenti",
      priorityStudents: "Allievi prioritari",
      pendingEvaluations: "Valutazioni in sospeso",
      upcomingExams: "Esami in arrivo",
    },
    taskTypes: {
      evaluation: "Valutazione",
      administrative: "Amministrativo",
      followUp: "Seguito",
      preparation: "Preparazione",
      urgent: "Urgente",
    },
    priority: {
      critical: "Critico",
      high: "Alta",
      medium: "Media",
      low: "Bassa",
    },
    status: {
      pending: "In attesa",
      inProgress: "In corso",
      completed: "Completato",
      overdue: "In ritardo",
    },
    actions: {
      complete: "Completa",
      viewDetails: "Vedi dettagli",
      contact: "Contatta",
      schedule: "Pianifica",
      evaluate: "Valuta",
      markDone: "Segna fatto",
    },
    studentIssues: {
      lowProgress: "Progresso basso",
      missedLessons: "Lezioni perse",
      examSoon: "Esame vicino",
      needsAttention: "Necessita attenzione",
      documentsMissing: "Documenti mancanti",
    },
    deadline: {
      today: "Oggi",
      tomorrow: "Domani",
      thisWeek: "Questa settimana",
      overdue: "In ritardo",
    },
    noTasks: "Nessun compito urgente",
    noPriorityStudents: "Nessun allievo prioritario",
    noDeadlines: "Nessuna scadenza vicina",
    lessonsCompleted: "lezioni effettuate",
    progress: "Progresso",
    lastLesson: "Ultima lezione",
    nextLesson: "Prossima lezione",
    examDate: "Data esame",
    daysUntilExam: "giorni prima dell'esame",
  },
  en: {
    title: "My Priorities",
    subtitle: "Urgent tasks and students requiring attention",
    overview: "Overview",
    urgentTasks: "Urgent tasks",
    priorityStudents: "Priority students",
    upcomingDeadlines: "Deadlines",
    stats: {
      urgentTasks: "Urgent tasks",
      priorityStudents: "Priority students",
      pendingEvaluations: "Pending evaluations",
      upcomingExams: "Upcoming exams",
    },
    taskTypes: {
      evaluation: "Evaluation",
      administrative: "Administrative",
      followUp: "Follow-up",
      preparation: "Preparation",
      urgent: "Urgent",
    },
    priority: {
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    status: {
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      overdue: "Overdue",
    },
    actions: {
      complete: "Complete",
      viewDetails: "View details",
      contact: "Contact",
      schedule: "Schedule",
      evaluate: "Evaluate",
      markDone: "Mark done",
    },
    studentIssues: {
      lowProgress: "Low progress",
      missedLessons: "Missed lessons",
      examSoon: "Exam soon",
      needsAttention: "Needs attention",
      documentsMissing: "Documents missing",
    },
    deadline: {
      today: "Today",
      tomorrow: "Tomorrow",
      thisWeek: "This week",
      overdue: "Overdue",
    },
    noTasks: "No urgent tasks",
    noPriorityStudents: "No priority students",
    noDeadlines: "No upcoming deadlines",
    lessonsCompleted: "lessons completed",
    progress: "Progress",
    lastLesson: "Last lesson",
    nextLesson: "Next lesson",
    examDate: "Exam date",
    daysUntilExam: "days until exam",
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
  stats: {
    urgentTasks: 5,
    priorityStudents: 3,
    pendingEvaluations: 4,
    upcomingExams: 2,
  },
  urgentTasks: [
    {
      id: "T001",
      title: "Évaluer leçon Emma Blanc - Manœuvres",
      type: "evaluation",
      priority: "critical",
      status: "overdue",
      dueDate: "Hier",
      dueTime: "17:00",
      studentName: "Emma Blanc",
      studentAvatar: "https://github.com/shoaibux1.png",
    },
    {
      id: "T002",
      title: "Compléter rapport examen Pierre Favre",
      type: "administrative",
      priority: "high",
      status: "pending",
      dueDate: "Aujourd'hui",
      dueTime: "18:00",
      studentName: "Pierre Favre",
      studentAvatar: "https://github.com/yusufhilmi.png",
    },
    {
      id: "T003",
      title: "Appeler parent Sophie Martin - Progression",
      type: "followUp",
      priority: "high",
      status: "pending",
      dueDate: "Aujourd'hui",
      dueTime: "16:00",
      studentName: "Sophie Martin",
      studentAvatar: "https://github.com/yahyabedirhan.png",
    },
    {
      id: "T004",
      title: "Préparer parcours examen Julie Roux",
      type: "preparation",
      priority: "medium",
      status: "pending",
      dueDate: "Demain",
      dueTime: "10:00",
      studentName: "Julie Roux",
      studentAvatar: "https://github.com/denizbuyuktas.png",
    },
    {
      id: "T005",
      title: "Vérifier documents permis Marc Dubois",
      type: "administrative",
      priority: "medium",
      status: "pending",
      dueDate: "Cette semaine",
      dueTime: "Vendredi",
      studentName: "Marc Dubois",
      studentAvatar: "https://github.com/kdrnp.png",
    },
  ],

  priorityStudents: [
    {
      id: "S001",
      name: "Emma Blanc",
      avatar: "https://github.com/shoaibux1.png",
      issue: "lowProgress",
      priority: "critical",
      lessonsCompleted: 12,
      progress: 28,
      lastLesson: "Il y a 3 jours",
      nextLesson: "Demain 10:00",
      notes:
        "Difficultés persistantes en manœuvres, besoin de séances supplémentaires",
      phone: "+41 79 123 45 67",
    },
    {
      id: "S002",
      name: "Julie Roux",
      avatar: "https://github.com/denizbuyuktas.png",
      issue: "examSoon",
      priority: "high",
      lessonsCompleted: 25,
      progress: 85,
      examDate: "Dans 5 jours",
      nextLesson: "Aujourd'hui 17:30",
      notes: "Examen pratique prévu, dernières révisions nécessaires",
      phone: "+41 79 234 56 78",
    },
    {
      id: "S003",
      name: "Marc Dubois",
      avatar: "https://github.com/kdrnp.png",
      issue: "documentsMissing",
      priority: "medium",
      lessonsCompleted: 12,
      progress: 45,
      lastLesson: "Hier",
      nextLesson: "Aujourd'hui 16:00",
      notes: "Permis d'élève à renouveler, documents à fournir",
      phone: "+41 79 345 67 89",
    },
  ],

  upcomingDeadlines: [
    {
      id: "D001",
      title: "Examen pratique Julie Roux",
      type: "exam",
      date: "25 Nov 2024",
      daysUntil: 5,
      priority: "high",
      studentName: "Julie Roux",
      studentAvatar: "https://github.com/denizbuyuktas.png",
    },
    {
      id: "D002",
      title: "Renouvellement permis élève Marc Dubois",
      type: "administrative",
      date: "28 Nov 2024",
      daysUntil: 8,
      priority: "medium",
      studentName: "Marc Dubois",
      studentAvatar: "https://github.com/kdrnp.png",
    },
    {
      id: "D003",
      title: "Évaluation mi-parcours Sophie Martin",
      type: "evaluation",
      date: "30 Nov 2024",
      daysUntil: 10,
      priority: "medium",
      studentName: "Sophie Martin",
      studentAvatar: "https://github.com/yahyabedirhan.png",
    },
  ],
};

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorPrioritiesPage({
  locale = "fr",
}: InstructorPrioritiesPageProps) {
  const t = translations[locale];
  const [selectedTab, setSelectedTab] = useState("overview");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      case "high":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "pending":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400";
      case "inProgress":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getIssueIcon = (issue: string) => {
    switch (issue) {
      case "lowProgress":
        return <TrendingDownIcon className="h-4 w-4" />;

      case "missedLessons":
        return <AlertCircleIcon className="h-4 w-4" />;

      case "examSoon":
        return <AlertTriangleIcon className="h-4 w-4" />;

      case "needsAttention":
        return <BellIcon className="h-4 w-4" />;

      case "documentsMissing":
        return <FileTextIcon className="h-4 w-4" />;

      default:
        return <AlertCircleIcon className="h-4 w-4" />;
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
            <FlagIcon className="h-5 w-5 text-muted-foreground" />

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
              {t.stats.urgentTasks}
            </CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockData.stats.urgentTasks}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.priorityStudents}
            </CardTitle>
            <UserIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockData.stats.priorityStudents}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.pendingEvaluations}
            </CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.stats.pendingEvaluations}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.upcomingExams}
            </CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.stats.upcomingExams}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="tasks">{t.urgentTasks}</TabsTrigger>
          <TabsTrigger value="students">{t.priorityStudents}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Critical Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangleIcon className="h-5 w-5" />

                  {t.urgentTasks}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockData.urgentTasks
                  .filter(
                    (task) =>
                      task.priority === "critical" || task.priority === "high"
                  )
                  .slice(0, 3)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{task.title}</h4>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <ClockIcon className="h-3 w-3" />

                          <span>{task.dueDate}</span>
                          <Badge
                            variant="outline"
                            className={getStatusColor(task.status)}
                          >
                            {t.status[task.status]}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {t.actions.complete}
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Priority Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <UserIcon className="h-5 w-5" />

                  {t.priorityStudents}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockData.priorityStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />

                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-semibold">
                          {student.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs">
                          <Badge
                            variant="outline"
                            className={`${getPriorityColor(student.priority)} flex items-center gap-1`}
                          >
                            {getIssueIcon(student.issue)}
                            {t.studentIssues[student.issue]}
                          </Badge>
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
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />

                {t.upcomingDeadlines}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={deadline.studentAvatar} />

                      <AvatarFallback>
                        {deadline.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{deadline.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />

                        <span>{deadline.date}</span>
                        <Badge variant="outline">
                          {deadline.daysUntil} {t.daysUntilExam}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(deadline.priority)}
                  >
                    {t.priority[deadline.priority]}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.urgentTasks}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.urgentTasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg border p-4 ${
                    task.status === "overdue"
                      ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{task.title}</h4>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(task.priority)}
                        >
                          {t.priority[task.priority]}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />

                          <span>
                            {task.dueDate} - {task.dueTime}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={getStatusColor(task.status)}
                        >
                          {t.status[task.status]}
                        </Badge>
                        <span className="text-xs">
                          {t.taskTypes[task.type]}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.studentAvatar} />

                          <AvatarFallback>
                            {task.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.studentName}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <CheckCircle2Icon className="mr-2 h-4 w-4" />

                        {t.actions.complete}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mockData.priorityStudents.map((student) => (
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
                      <Badge
                        variant="outline"
                        className={`${getPriorityColor(student.priority)} mt-1 flex w-fit items-center gap-1`}
                      >
                        {getIssueIcon(student.issue)}
                        {t.studentIssues[student.issue]}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.progress}
                      </span>
                      <span className="font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {t.lessonsCompleted}
                      </span>
                      <span className="font-medium">
                        {student.lessonsCompleted}
                      </span>
                    </div>
                    {student.lastLesson && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.lastLesson}
                        </span>
                        <span className="font-medium">
                          {student.lastLesson}
                        </span>
                      </div>
                    )}
                    {student.nextLesson && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.nextLesson}
                        </span>
                        <span className="font-medium">
                          {student.nextLesson}
                        </span>
                      </div>
                    )}
                    {student.examDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {t.examDate}
                        </span>
                        <Badge variant="outline" className="bg-orange-500/10">
                          {student.examDate}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">
                      {student.notes}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        window.open(`tel:${student.phone}`, "_self")
                      }
                    >
                      <PhoneIcon className="mr-2 h-4 w-4" />

                      {t.actions.contact}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        console.log("Ouvrir messagerie pour", student.name)
                      }
                    >
                      <MessageSquareIcon className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
