/**
 * Student Journey Page - Parcours Formation Élève
 *
 * Page complète du parcours de formation de l'élève avec:
 * - Vue d'ensemble de la progression globale
 * - Timeline des étapes franchies
 * - Prochaines étapes recommandées
 * - Statistiques détaillées par thème
 * - Objectifs et jalons
 *
 * @module pages/viamentor-student-journey-page
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2Icon,
  CircleIcon,
  ClockIcon,
  TrophyIcon,
  TargetIcon,
  CalendarIcon,
  BookOpenIcon,
  CarIcon,
  FileTextIcon,
  ArrowRightIcon,
  StarIcon,
  TrendingUpIcon,
  MapIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentJourneyPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mon Parcours de Formation",
    subtitle: "Vue d'ensemble de votre progression vers le permis de conduire",
    overallProgress: "Progression Globale",
    completedSteps: "Étapes Franchies",
    nextSteps: "Prochaines Étapes",
    milestones: "Jalons Importants",
    statistics: "Statistiques Détaillées",
    timeline: "Timeline de Formation",
    viewDetails: "Voir Détails",
    startNow: "Commencer",
    continue: "Continuer",
    schedule: "Planifier",
    completed: "Terminé",
    inProgress: "En cours",
    notStarted: "Non commencé",
    locked: "Verrouillé",
    hoursCompleted: "heures effectuées",
    lessonsCompleted: "leçons terminées",
    examsPassed: "examens réussis",
    readyForExam: "Prêt pour l'examen",
    needsImprovement: "À améliorer",
    excellent: "Excellent",
    good: "Bien",
    average: "Moyen",
    phases: {
      theory: "Phase Théorique",
      practice: "Phase Pratique",
      exam: "Phase Examen",
    },
    steps: {
      registration: "Inscription",
      firstAid: "Cours Premiers Secours",
      theoryLessons: "Cours Théoriques",
      theoryExam: "Examen Théorique",
      sensibilization: "Cours Sensibilisation",
      practiceLessons: "Leçons Pratiques",
      practiceExam: "Examen Pratique",
      license: "Obtention Permis",
    },
    recommendations: {
      title: "Recommandations Personnalisées",
      bookLesson: "Réserver une leçon",
      reviewTheory: "Réviser la théorie",
      practiceManeuvers: "Pratiquer les manœuvres",
      scheduleExam: "Planifier l'examen",
    },
  },
  de: {
    title: "Mein Ausbildungsweg",
    subtitle: "Überblick über Ihren Fortschritt zum Führerschein",
    overallProgress: "Gesamtfortschritt",
    completedSteps: "Abgeschlossene Schritte",
    nextSteps: "Nächste Schritte",
    milestones: "Wichtige Meilensteine",
    statistics: "Detaillierte Statistiken",
    timeline: "Ausbildungs-Timeline",
    viewDetails: "Details ansehen",
    startNow: "Jetzt starten",
    continue: "Fortsetzen",
    schedule: "Planen",
    completed: "Abgeschlossen",
    inProgress: "In Bearbeitung",
    notStarted: "Nicht begonnen",
    locked: "Gesperrt",
    hoursCompleted: "Stunden absolviert",
    lessonsCompleted: "Lektionen abgeschlossen",
    examsPassed: "Prüfungen bestanden",
    readyForExam: "Prüfungsbereit",
    needsImprovement: "Verbesserungsbedarf",
    excellent: "Ausgezeichnet",
    good: "Gut",
    average: "Durchschnittlich",
    phases: {
      theory: "Theoriephase",
      practice: "Praxisphase",
      exam: "Prüfungsphase",
    },
    steps: {
      registration: "Anmeldung",
      firstAid: "Erste-Hilfe-Kurs",
      theoryLessons: "Theorieunterricht",
      theoryExam: "Theorieprüfung",
      sensibilization: "Verkehrskunde",
      practiceLessons: "Fahrstunden",
      practiceExam: "Praktische Prüfung",
      license: "Führerscheinerhalt",
    },
    recommendations: {
      title: "Personalisierte Empfehlungen",
      bookLesson: "Lektion buchen",
      reviewTheory: "Theorie wiederholen",
      practiceManeuvers: "Manöver üben",
      scheduleExam: "Prüfung planen",
    },
  },
  it: {
    title: "Il Mio Percorso Formativo",
    subtitle: "Panoramica dei tuoi progressi verso la patente",
    overallProgress: "Progresso Globale",
    completedSteps: "Tappe Completate",
    nextSteps: "Prossime Tappe",
    milestones: "Traguardi Importanti",
    statistics: "Statistiche Dettagliate",
    timeline: "Timeline Formazione",
    viewDetails: "Vedi Dettagli",
    startNow: "Inizia Ora",
    continue: "Continua",
    schedule: "Pianifica",
    completed: "Completato",
    inProgress: "In Corso",
    notStarted: "Non Iniziato",
    locked: "Bloccato",
    hoursCompleted: "ore completate",
    lessonsCompleted: "lezioni completate",
    examsPassed: "esami superati",
    readyForExam: "Pronto per l'esame",
    needsImprovement: "Da migliorare",
    excellent: "Eccellente",
    good: "Buono",
    average: "Medio",
    phases: {
      theory: "Fase Teorica",
      practice: "Fase Pratica",
      exam: "Fase Esame",
    },
    steps: {
      registration: "Iscrizione",
      firstAid: "Corso Primo Soccorso",
      theoryLessons: "Lezioni Teoriche",
      theoryExam: "Esame Teorico",
      sensibilization: "Corso Sensibilizzazione",
      practiceLessons: "Lezioni Pratiche",
      practiceExam: "Esame Pratico",
      license: "Ottenimento Patente",
    },
    recommendations: {
      title: "Raccomandazioni Personalizzate",
      bookLesson: "Prenota lezione",
      reviewTheory: "Rivedere teoria",
      practiceManeuvers: "Praticare manovre",
      scheduleExam: "Pianificare esame",
    },
  },
  en: {
    title: "My Training Journey",
    subtitle: "Overview of your progress towards your driver's license",
    overallProgress: "Overall Progress",
    completedSteps: "Completed Steps",
    nextSteps: "Next Steps",
    milestones: "Important Milestones",
    statistics: "Detailed Statistics",
    timeline: "Training Timeline",
    viewDetails: "View Details",
    startNow: "Start Now",
    continue: "Continue",
    schedule: "Schedule",
    completed: "Completed",
    inProgress: "In Progress",
    notStarted: "Not Started",
    locked: "Locked",
    hoursCompleted: "hours completed",
    lessonsCompleted: "lessons completed",
    examsPassed: "exams passed",
    readyForExam: "Ready for exam",
    needsImprovement: "Needs improvement",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    phases: {
      theory: "Theory Phase",
      practice: "Practice Phase",
      exam: "Exam Phase",
    },
    steps: {
      registration: "Registration",
      firstAid: "First Aid Course",
      theoryLessons: "Theory Lessons",
      theoryExam: "Theory Exam",
      sensibilization: "Awareness Course",
      practiceLessons: "Practical Lessons",
      practiceExam: "Practical Exam",
      license: "License Obtained",
    },
    recommendations: {
      title: "Personalized Recommendations",
      bookLesson: "Book a lesson",
      reviewTheory: "Review theory",
      practiceManeuvers: "Practice maneuvers",
      scheduleExam: "Schedule exam",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockJourneyData = {
  overallProgress: 65,
  currentPhase: "practice" as const,
  totalHours: 28,
  totalLessons: 32,
  examsPassed: 2,
  steps: [
    {
      id: "registration",
      status: "completed" as const,
      completedDate: "2024-01-15",
      icon: FileTextIcon,
    },
    {
      id: "firstAid",
      status: "completed" as const,
      completedDate: "2024-01-22",
      icon: BookOpenIcon,
    },
    {
      id: "theoryLessons",
      status: "completed" as const,
      completedDate: "2024-02-10",
      progress: 100,
      icon: BookOpenIcon,
    },
    {
      id: "theoryExam",
      status: "completed" as const,
      completedDate: "2024-02-15",
      score: 48,
      maxScore: 50,
      icon: FileTextIcon,
    },
    {
      id: "sensibilization",
      status: "completed" as const,
      completedDate: "2024-02-20",
      icon: BookOpenIcon,
    },
    {
      id: "practiceLessons",
      status: "inProgress" as const,
      progress: 70,
      hoursCompleted: 28,
      hoursRequired: 40,
      icon: CarIcon,
    },
    {
      id: "practiceExam",
      status: "locked" as const,
      icon: FileTextIcon,
    },
    {
      id: "license",
      status: "locked" as const,
      icon: TrophyIcon,
    },
  ],

  nextSteps: [
    {
      id: "practice-parking",
      title: "Perfectionner le stationnement",
      description: "3 leçons recommandées",
      priority: "high" as const,
      estimatedTime: "6 heures",
    },
    {
      id: "highway-driving",
      title: "Conduite sur autoroute",
      description: "2 leçons recommandées",
      priority: "medium" as const,
      estimatedTime: "4 heures",
    },
    {
      id: "night-driving",
      title: "Conduite de nuit",
      description: "1 leçon recommandée",
      priority: "low" as const,
      estimatedTime: "2 heures",
    },
  ],

  milestones: [
    {
      id: "theory-passed",
      title: "Examen théorique réussi",
      date: "2024-02-15",
      icon: TrophyIcon,
      achieved: true,
    },
    {
      id: "20-hours",
      title: "20 heures de conduite",
      date: "2024-03-10",
      icon: StarIcon,
      achieved: true,
    },
    {
      id: "ready-exam",
      title: "Prêt pour l'examen pratique",
      date: null,
      icon: TargetIcon,
      achieved: false,
    },
    {
      id: "license-obtained",
      title: "Permis obtenu",
      date: null,
      icon: TrophyIcon,
      achieved: false,
    },
  ],

  statistics: [
    {
      category: "Manœuvres",
      progress: 85,
      status: "excellent" as const,
    },
    {
      category: "Circulation",
      progress: 75,
      status: "good" as const,
    },
    {
      category: "Stationnement",
      progress: 60,
      status: "average" as const,
    },
    {
      category: "Autoroute",
      progress: 45,
      status: "needsImprovement" as const,
    },
  ],
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentJourneyPage({ locale = "fr" }: StudentJourneyPageProps) {
  const t = translations[locale];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "inProgress":
        return "text-blue-600 dark:text-blue-400";
      case "locked":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-600">
            {t.completed}
          </Badge>
        );

      case "inProgress":
        return <Badge variant="default">{t.inProgress}</Badge>;

      case "locked":
        return <Badge variant="secondary">{t.locked}</Badge>;

      default:
        return <Badge variant="outline">{t.notStarted}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20";
      case "medium":
        return "border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20";
      case "low":
        return "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20";
      default:
        return "";
    }
  };

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 dark:text-green-400";
      case "good":
        return "text-blue-600 dark:text-blue-400";
      case "average":
        return "text-orange-600 dark:text-orange-400";
      case "needsImprovement":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </div>

      {/* Overall Progress Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{t.overallProgress}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t.phases[mockJourneyData.currentPhase]}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {mockJourneyData.overallProgress}%
              </div>
            </div>
          </div>
          <Progress value={mockJourneyData.overallProgress} className="h-3" />

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {mockJourneyData.totalHours}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.hoursCompleted}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {mockJourneyData.totalLessons}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.lessonsCompleted}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {mockJourneyData.examsPassed}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.examsPassed}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Steps */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{t.timeline}</h2>
            <div className="space-y-6">
              {mockJourneyData.steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === mockJourneyData.steps.length - 1;

                return (
                  <div key={step.id} className="relative">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          step.status === "completed"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : step.status === "inProgress"
                              ? "bg-blue-100 dark:bg-blue-900/20"
                              : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${getStatusColor(step.status)}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">
                            {t.steps[step.id as keyof typeof t.steps]}
                          </h3>
                          {getStatusBadge(step.status)}
                        </div>

                        {step.status === "completed" && step.completedDate && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="w-4 h-4" />

                            {new Date(step.completedDate).toLocaleDateString(
                              locale
                            )}
                          </div>
                        )}

                        {step.status === "inProgress" && step.progress && (
                          <div className="space-y-2 mt-2">
                            <Progress value={step.progress} className="h-2" />

                            <div className="text-sm text-muted-foreground">
                              {step.hoursCompleted} / {step.hoursRequired}{" "}
                              {t.hoursCompleted}
                            </div>
                            <Button size="sm" className="mt-2">
                              {t.continue}
                              <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}

                        {step.status === "completed" &&
                          step.score &&
                          step.maxScore && (
                            <div className="text-sm text-muted-foreground mt-2">
                              Score: {step.score}/{step.maxScore}
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {!isLast && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border -mb-6" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{t.statistics}</h2>
            <div className="space-y-4">
              {mockJourneyData.statistics.map((stat) => (
                <div key={stat.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{stat.category}</span>
                    <span
                      className={`text-sm font-semibold ${getPerformanceColor(
                        stat.status
                      )}`}
                    >
                      {stat.progress}%
                    </span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Next Steps */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">{t.nextSteps}</h2>
            <div className="space-y-3">
              {mockJourneyData.nextSteps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border-2 ${getPriorityColor(
                    step.priority
                  )}`}
                >
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />

                      {step.estimatedTime}
                    </span>
                    <Button size="sm" variant="outline">
                      {t.schedule}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Milestones */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">{t.milestones}</h2>
            <div className="space-y-4">
              {mockJourneyData.milestones.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <div
                    key={milestone.id}
                    className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        milestone.achieved
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          milestone.achieved
                            ? "text-green-600 dark:text-green-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{milestone.title}</h3>
                      {milestone.date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(milestone.date).toLocaleDateString(locale)}
                        </p>
                      )}
                    </div>
                    {milestone.achieved && (
                      <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-primary" />

              {t.recommendations.title}
            </h2>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <CarIcon className="w-4 h-4 mr-2" />

                {t.recommendations.bookLesson}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpenIcon className="w-4 h-4 mr-2" />

                {t.recommendations.reviewTheory}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TargetIcon className="w-4 h-4 mr-2" />

                {t.recommendations.practiceManeuvers}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
