/**
 * Student Next Steps Page - Mes Prochaines Étapes
 *
 * Page complète des prochaines étapes recommandées pour l'élève avec:
 * - Recommandations personnalisées basées sur la progression
 * - Actions prioritaires à entreprendre
 * - Planification des leçons
 * - Préparation aux examens
 * - Objectifs à court et moyen terme
 *
 * @module pages/viamentor-student-next-steps-page
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  CalendarIcon,
  BookOpenIcon,
  CarIcon,
  FileTextIcon,
  TargetIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  StarIcon,
  MapPinIcon,
  UsersIcon,
  BrainIcon,
  ZapIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentNextStepsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Prochaines Étapes",
    subtitle:
      "Recommandations personnalisées pour progresser vers votre permis",
    urgentActions: "Actions Urgentes",
    recommendedActions: "Actions Recommandées",
    optionalActions: "Actions Optionnelles",
    upcomingDeadlines: "Échéances Importantes",
    learningPath: "Parcours d'Apprentissage",
    schedule: "Planifier",
    start: "Commencer",
    viewDetails: "Voir Détails",
    bookNow: "Réserver Maintenant",
    priority: {
      high: "Priorité Haute",
      medium: "Priorité Moyenne",
      low: "Priorité Basse",
    },
    status: {
      todo: "À faire",
      inProgress: "En cours",
      completed: "Terminé",
    },
    categories: {
      theory: "Théorie",
      practice: "Pratique",
      exam: "Examen",
      administrative: "Administratif",
    },
    estimatedTime: "Temps estimé",
    dueDate: "Date limite",
    prerequisites: "Prérequis",
    benefits: "Bénéfices",
    tips: "Conseils",
    noPrerequisites: "Aucun prérequis",
    allPrerequisitesMet: "Tous les prérequis sont remplis",
    missingPrerequisites: "Prérequis manquants",
    readyToStart: "Prêt à commencer",
    notReady: "Pas encore prêt",
  },
  de: {
    title: "Meine Nächsten Schritte",
    subtitle: "Personalisierte Empfehlungen für Ihren Weg zum Führerschein",
    urgentActions: "Dringende Aktionen",
    recommendedActions: "Empfohlene Aktionen",
    optionalActions: "Optionale Aktionen",
    upcomingDeadlines: "Wichtige Fristen",
    learningPath: "Lernpfad",
    schedule: "Planen",
    start: "Starten",
    viewDetails: "Details ansehen",
    bookNow: "Jetzt buchen",
    priority: {
      high: "Hohe Priorität",
      medium: "Mittlere Priorität",
      low: "Niedrige Priorität",
    },
    status: {
      todo: "Zu erledigen",
      inProgress: "In Bearbeitung",
      completed: "Abgeschlossen",
    },
    categories: {
      theory: "Theorie",
      practice: "Praxis",
      exam: "Prüfung",
      administrative: "Verwaltung",
    },
    estimatedTime: "Geschätzte Zeit",
    dueDate: "Fälligkeitsdatum",
    prerequisites: "Voraussetzungen",
    benefits: "Vorteile",
    tips: "Tipps",
    noPrerequisites: "Keine Voraussetzungen",
    allPrerequisitesMet: "Alle Voraussetzungen erfüllt",
    missingPrerequisites: "Fehlende Voraussetzungen",
    readyToStart: "Bereit zu starten",
    notReady: "Noch nicht bereit",
  },
  it: {
    title: "I Miei Prossimi Passi",
    subtitle:
      "Raccomandazioni personalizzate per il tuo percorso verso la patente",
    urgentActions: "Azioni Urgenti",
    recommendedActions: "Azioni Raccomandate",
    optionalActions: "Azioni Opzionali",
    upcomingDeadlines: "Scadenze Importanti",
    learningPath: "Percorso di Apprendimento",
    schedule: "Pianifica",
    start: "Inizia",
    viewDetails: "Vedi Dettagli",
    bookNow: "Prenota Ora",
    priority: {
      high: "Priorità Alta",
      medium: "Priorità Media",
      low: "Priorità Bassa",
    },
    status: {
      todo: "Da fare",
      inProgress: "In corso",
      completed: "Completato",
    },
    categories: {
      theory: "Teoria",
      practice: "Pratica",
      exam: "Esame",
      administrative: "Amministrativo",
    },
    estimatedTime: "Tempo stimato",
    dueDate: "Data di scadenza",
    prerequisites: "Prerequisiti",
    benefits: "Benefici",
    tips: "Consigli",
    noPrerequisites: "Nessun prerequisito",
    allPrerequisitesMet: "Tutti i prerequisiti soddisfatti",
    missingPrerequisites: "Prerequisiti mancanti",
    readyToStart: "Pronto per iniziare",
    notReady: "Non ancora pronto",
  },
  en: {
    title: "My Next Steps",
    subtitle: "Personalized recommendations for your path to your license",
    urgentActions: "Urgent Actions",
    recommendedActions: "Recommended Actions",
    optionalActions: "Optional Actions",
    upcomingDeadlines: "Important Deadlines",
    learningPath: "Learning Path",
    schedule: "Schedule",
    start: "Start",
    viewDetails: "View Details",
    bookNow: "Book Now",
    priority: {
      high: "High Priority",
      medium: "Medium Priority",
      low: "Low Priority",
    },
    status: {
      todo: "To Do",
      inProgress: "In Progress",
      completed: "Completed",
    },
    categories: {
      theory: "Theory",
      practice: "Practice",
      exam: "Exam",
      administrative: "Administrative",
    },
    estimatedTime: "Estimated time",
    dueDate: "Due date",
    prerequisites: "Prerequisites",
    benefits: "Benefits",
    tips: "Tips",
    noPrerequisites: "No prerequisites",
    allPrerequisitesMet: "All prerequisites met",
    missingPrerequisites: "Missing prerequisites",
    readyToStart: "Ready to start",
    notReady: "Not ready yet",
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockNextStepsData = {
  urgentActions: [
    {
      id: "book-highway-lesson",
      title: "Réserver leçon autoroute",
      description:
        "Vous devez compléter au moins 2 leçons d'autoroute avant l'examen",
      category: "practice" as const,
      priority: "high" as const,
      estimatedTime: "4 heures",
      dueDate: "2024-04-15",
      icon: CarIcon,
      prerequisites: [],
      ready: true,
      benefits: [
        "Obligatoire pour l'examen pratique",
        "Améliore la confiance sur autoroute",
      ],
    },
    {
      id: "schedule-practice-exam",
      title: "Planifier examen pratique",
      description: "Votre moniteur vous a validé pour l'examen",
      category: "exam" as const,
      priority: "high" as const,
      estimatedTime: "1 heure",
      dueDate: "2024-04-10",
      icon: FileTextIcon,
      prerequisites: ["40 heures de conduite", "Validation moniteur"],
      ready: true,
      benefits: ["Obtenir votre permis", "Dates disponibles limitées"],
    },
  ],

  recommendedActions: [
    {
      id: "practice-parking",
      title: "Perfectionner le stationnement",
      description: "3 leçons recommandées pour maîtriser tous les types",
      category: "practice" as const,
      priority: "medium" as const,
      estimatedTime: "6 heures",
      icon: CarIcon,
      prerequisites: [],
      ready: true,
      tips: [
        "Focus sur le stationnement en bataille",
        "Pratiquer en conditions réelles",
      ],
    },
    {
      id: "night-driving",
      title: "Conduite de nuit",
      description: "1 leçon recommandée pour l'expérience",
      category: "practice" as const,
      priority: "medium" as const,
      estimatedTime: "2 heures",
      icon: CarIcon,
      prerequisites: ["20 heures de conduite"],
      ready: true,
      tips: ["Améliore la perception nocturne", "Utile pour l'autonomie"],
    },
    {
      id: "review-theory",
      title: "Réviser la théorie",
      description: "Maintenir vos connaissances à jour",
      category: "theory" as const,
      priority: "medium" as const,
      estimatedTime: "2 heures",
      icon: BookOpenIcon,
      prerequisites: [],
      ready: true,
      tips: ["15 minutes par jour suffisent", "Focus sur les panneaux"],
    },
  ],

  optionalActions: [
    {
      id: "eco-driving",
      title: "Formation éco-conduite",
      description: "Apprendre à conduire de manière économique et écologique",
      category: "practice" as const,
      priority: "low" as const,
      estimatedTime: "4 heures",
      icon: ZapIcon,
      prerequisites: ["30 heures de conduite"],
      ready: true,
      benefits: [
        "Économie de carburant",
        "Réduction des émissions",
        "Conduite plus sûre",
      ],
    },
    {
      id: "advanced-maneuvers",
      title: "Manœuvres avancées",
      description: "Perfectionnement des techniques de conduite",
      category: "practice" as const,
      priority: "low" as const,
      estimatedTime: "4 heures",
      icon: TargetIcon,
      prerequisites: ["Examen pratique réussi"],
      ready: false,
      benefits: ["Confiance accrue", "Meilleure maîtrise du véhicule"],
    },
  ],

  upcomingDeadlines: [
    {
      id: "theory-validity",
      title: "Validité examen théorique",
      description: "Votre examen théorique expire dans 18 mois",
      date: "2025-08-15",
      daysRemaining: 540,
      type: "warning" as const,
    },
    {
      id: "learner-permit",
      title: "Permis d'élève conducteur",
      description: "Votre permis d'élève expire dans 2 ans",
      date: "2026-01-15",
      daysRemaining: 690,
      type: "info" as const,
    },
  ],
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentNextStepsPage({
  locale = "fr",
}: StudentNextStepsPageProps) {
  const t = translations[locale];

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

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: "bg-red-600",
      medium: "bg-orange-600",
      low: "bg-blue-600",
    };
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {t.priority[priority as keyof typeof t.priority]}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "theory":
        return BookOpenIcon;
      case "practice":
        return CarIcon;
      case "exam":
        return FileTextIcon;
      default:
        return FileTextIcon;
    }
  };

  const renderActionCard = (action: any, showDueDate = false) => {
    const Icon = action.icon || getCategoryIcon(action.category);

    return (
      <Card
        key={action.id}
        className={`p-6 border-2 ${getPriorityColor(action.priority)}`}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </div>
            {getPriorityBadge(action.priority)}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClockIcon className="w-4 h-4" />

              {action.estimatedTime}
            </div>
            {showDueDate && action.dueDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />

                {new Date(action.dueDate).toLocaleDateString(locale)}
              </div>
            )}
            <Badge variant="outline">
              {t.categories[action.category as keyof typeof t.categories]}
            </Badge>
          </div>

          {/* Prerequisites */}
          {action.prerequisites && action.prerequisites.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2Icon className="w-4 h-4" />

                {t.prerequisites}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                {action.prerequisites.map((prereq: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />

                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {action.benefits && action.benefits.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <StarIcon className="w-4 h-4" />

                {t.benefits}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                {action.benefits.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />

                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {action.tips && action.tips.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <BrainIcon className="w-4 h-4" />

                {t.tips}
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                {action.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />

                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" disabled={!action.ready}>
              {action.category === "practice" ? t.bookNow : t.start}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline">{t.viewDetails}</Button>
          </div>

          {!action.ready && (
            <Alert>
              <AlertCircleIcon className="h-4 w-4" />

              <AlertDescription className="text-sm">
                {t.missingPrerequisites}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </div>

      {/* Upcoming Deadlines Alert */}
      {mockNextStepsData.upcomingDeadlines.length > 0 && (
        <Card className="p-6 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircleIcon className="w-5 h-5 text-orange-600" />

            {t.upcomingDeadlines}
          </h2>
          <div className="space-y-3">
            {mockNextStepsData.upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-start justify-between p-4 bg-background rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{deadline.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {deadline.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-semibold text-orange-600">
                    {deadline.daysRemaining} jours
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(deadline.date).toLocaleDateString(locale)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Urgent Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircleIcon className="w-5 h-5 text-red-600" />

          <h2 className="text-xl font-semibold">{t.urgentActions}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockNextStepsData.urgentActions.map((action) =>
            renderActionCard(action, true)
          )}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUpIcon className="w-5 h-5 text-orange-600" />

          <h2 className="text-xl font-semibold">{t.recommendedActions}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockNextStepsData.recommendedActions.map((action) =>
            renderActionCard(action)
          )}
        </div>
      </div>

      {/* Optional Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-blue-600" />

          <h2 className="text-xl font-semibold">{t.optionalActions}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockNextStepsData.optionalActions.map((action) =>
            renderActionCard(action)
          )}
        </div>
      </div>
    </div>
  );
}
