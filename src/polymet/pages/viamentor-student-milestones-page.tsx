/**
 * Student Milestones Page - Mes Étapes Franchies
 *
 * Page complète des étapes franchies et accomplissements de l'élève avec:
 * - Timeline complète des jalons atteints
 * - Badges et récompenses obtenus
 * - Statistiques de progression
 * - Certificats et attestations
 * - Historique détaillé des accomplissements
 *
 * @module pages/viamentor-student-milestones-page
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2Icon,
  TrophyIcon,
  StarIcon,
  CalendarIcon,
  DownloadIcon,
  ShareIcon,
  AwardIcon,
  MedalIcon,
  TargetIcon,
  BookOpenIcon,
  CarIcon,
  FileTextIcon,
  ClockIcon,
  TrendingUpIcon,
  SparklesIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentMilestonesPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Étapes Franchies",
    subtitle: "Célébrez vos accomplissements et suivez votre progression",
    allMilestones: "Toutes les Étapes",
    badges: "Badges",
    certificates: "Certificats",
    statistics: "Statistiques",
    timeline: "Timeline",
    achievements: "Réalisations",
    earned: "Obtenu",
    download: "Télécharger",
    share: "Partager",
    viewCertificate: "Voir Certificat",
    totalMilestones: "Étapes Franchies",
    totalBadges: "Badges Obtenus",
    totalHours: "Heures de Formation",
    successRate: "Taux de Réussite",
    categories: {
      theory: "Théorie",
      practice: "Pratique",
      exam: "Examens",
      special: "Spécial",
    },
    milestoneTypes: {
      registration: "Inscription",
      firstLesson: "Première Leçon",
      theoryPassed: "Théorie Réussie",
      hours10: "10 Heures",
      hours20: "20 Heures",
      hours30: "30 Heures",
      hours40: "40 Heures",
      firstAid: "Premiers Secours",
      sensibilization: "Sensibilisation",
      nightDriving: "Conduite Nuit",
      highway: "Autoroute",
      practiceReady: "Prêt Examen",
      practicePassed: "Examen Réussi",
      licenseObtained: "Permis Obtenu",
    },
    badgeDescriptions: {
      earlyBird: "Toujours à l'heure pour les leçons",
      perfectAttendance: "Présence parfaite",
      quickLearner: "Progression rapide",
      safeDriver: "Conduite sécuritaire",
      theoryMaster: "Maîtrise théorique",
      parkingPro: "Expert stationnement",
      highwayHero: "As de l'autoroute",
      nightOwl: "Conduite nocturne",
      ecoDriver: "Éco-conducteur",
      firstTry: "Réussi du premier coup",
    },
    certificateTypes: {
      firstAid: "Certificat Premiers Secours",
      theory: "Attestation Examen Théorique",
      sensibilization: "Certificat Sensibilisation",
      practice: "Attestation Examen Pratique",
      license: "Permis de Conduire",
    },
    shareMessage: "J'ai franchi une nouvelle étape dans ma formation !",
    congratulations: "Félicitations !",
    keepGoing: "Continuez comme ça !",
  },
  de: {
    title: "Meine Erreichten Meilensteine",
    subtitle: "Feiern Sie Ihre Erfolge und verfolgen Sie Ihren Fortschritt",
    allMilestones: "Alle Meilensteine",
    badges: "Abzeichen",
    certificates: "Zertifikate",
    statistics: "Statistiken",
    timeline: "Zeitstrahl",
    achievements: "Erfolge",
    earned: "Erhalten",
    download: "Herunterladen",
    share: "Teilen",
    viewCertificate: "Zertifikat ansehen",
    totalMilestones: "Erreichte Meilensteine",
    totalBadges: "Erhaltene Abzeichen",
    totalHours: "Ausbildungsstunden",
    successRate: "Erfolgsquote",
    categories: {
      theory: "Theorie",
      practice: "Praxis",
      exam: "Prüfungen",
      special: "Spezial",
    },
    milestoneTypes: {
      registration: "Anmeldung",
      firstLesson: "Erste Lektion",
      theoryPassed: "Theorie bestanden",
      hours10: "10 Stunden",
      hours20: "20 Stunden",
      hours30: "30 Stunden",
      hours40: "40 Stunden",
      firstAid: "Erste Hilfe",
      sensibilization: "Verkehrskunde",
      nightDriving: "Nachtfahrt",
      highway: "Autobahn",
      practiceReady: "Prüfungsbereit",
      practicePassed: "Prüfung bestanden",
      licenseObtained: "Führerschein erhalten",
    },
    badgeDescriptions: {
      earlyBird: "Immer pünktlich",
      perfectAttendance: "Perfekte Anwesenheit",
      quickLearner: "Schneller Lerner",
      safeDriver: "Sicherer Fahrer",
      theoryMaster: "Theorie-Meister",
      parkingPro: "Parkprofi",
      highwayHero: "Autobahn-Held",
      nightOwl: "Nachtfahrer",
      ecoDriver: "Öko-Fahrer",
      firstTry: "Beim ersten Versuch",
    },
    certificateTypes: {
      firstAid: "Erste-Hilfe-Zertifikat",
      theory: "Theorieprüfung Bescheinigung",
      sensibilization: "Verkehrskunde Zertifikat",
      practice: "Praktische Prüfung Bescheinigung",
      license: "Führerschein",
    },
    shareMessage: "Ich habe einen neuen Meilenstein erreicht!",
    congratulations: "Herzlichen Glückwunsch!",
    keepGoing: "Weiter so!",
  },
  it: {
    title: "Le Mie Tappe Raggiunte",
    subtitle: "Celebra i tuoi successi e segui i tuoi progressi",
    allMilestones: "Tutte le Tappe",
    badges: "Badge",
    certificates: "Certificati",
    statistics: "Statistiche",
    timeline: "Timeline",
    achievements: "Risultati",
    earned: "Ottenuto",
    download: "Scarica",
    share: "Condividi",
    viewCertificate: "Vedi Certificato",
    totalMilestones: "Tappe Raggiunte",
    totalBadges: "Badge Ottenuti",
    totalHours: "Ore di Formazione",
    successRate: "Tasso di Successo",
    categories: {
      theory: "Teoria",
      practice: "Pratica",
      exam: "Esami",
      special: "Speciale",
    },
    milestoneTypes: {
      registration: "Iscrizione",
      firstLesson: "Prima Lezione",
      theoryPassed: "Teoria Superata",
      hours10: "10 Ore",
      hours20: "20 Ore",
      hours30: "30 Ore",
      hours40: "40 Ore",
      firstAid: "Primo Soccorso",
      sensibilization: "Sensibilizzazione",
      nightDriving: "Guida Notturna",
      highway: "Autostrada",
      practiceReady: "Pronto Esame",
      practicePassed: "Esame Superato",
      licenseObtained: "Patente Ottenuta",
    },
    badgeDescriptions: {
      earlyBird: "Sempre puntuale",
      perfectAttendance: "Presenza perfetta",
      quickLearner: "Apprendimento rapido",
      safeDriver: "Guida sicura",
      theoryMaster: "Maestro teoria",
      parkingPro: "Esperto parcheggio",
      highwayHero: "Eroe autostrada",
      nightOwl: "Guida notturna",
      ecoDriver: "Eco-conducente",
      firstTry: "Al primo tentativo",
    },
    certificateTypes: {
      firstAid: "Certificato Primo Soccorso",
      theory: "Attestato Esame Teorico",
      sensibilization: "Certificato Sensibilizzazione",
      practice: "Attestato Esame Pratico",
      license: "Patente di Guida",
    },
    shareMessage: "Ho raggiunto una nuova tappa!",
    congratulations: "Congratulazioni!",
    keepGoing: "Continua così!",
  },
  en: {
    title: "My Milestones Achieved",
    subtitle: "Celebrate your accomplishments and track your progress",
    allMilestones: "All Milestones",
    badges: "Badges",
    certificates: "Certificates",
    statistics: "Statistics",
    timeline: "Timeline",
    achievements: "Achievements",
    earned: "Earned",
    download: "Download",
    share: "Share",
    viewCertificate: "View Certificate",
    totalMilestones: "Milestones Achieved",
    totalBadges: "Badges Earned",
    totalHours: "Training Hours",
    successRate: "Success Rate",
    categories: {
      theory: "Theory",
      practice: "Practice",
      exam: "Exams",
      special: "Special",
    },
    milestoneTypes: {
      registration: "Registration",
      firstLesson: "First Lesson",
      theoryPassed: "Theory Passed",
      hours10: "10 Hours",
      hours20: "20 Hours",
      hours30: "30 Hours",
      hours40: "40 Hours",
      firstAid: "First Aid",
      sensibilization: "Awareness",
      nightDriving: "Night Driving",
      highway: "Highway",
      practiceReady: "Exam Ready",
      practicePassed: "Exam Passed",
      licenseObtained: "License Obtained",
    },
    badgeDescriptions: {
      earlyBird: "Always on time",
      perfectAttendance: "Perfect attendance",
      quickLearner: "Quick learner",
      safeDriver: "Safe driver",
      theoryMaster: "Theory master",
      parkingPro: "Parking pro",
      highwayHero: "Highway hero",
      nightOwl: "Night owl",
      ecoDriver: "Eco driver",
      firstTry: "First try success",
    },
    certificateTypes: {
      firstAid: "First Aid Certificate",
      theory: "Theory Exam Certificate",
      sensibilization: "Awareness Certificate",
      practice: "Practical Exam Certificate",
      license: "Driver's License",
    },
    shareMessage: "I've reached a new milestone!",
    congratulations: "Congratulations!",
    keepGoing: "Keep it up!",
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockMilestonesData = {
  statistics: {
    totalMilestones: 12,
    totalBadges: 8,
    totalHours: 28,
    successRate: 95,
  },
  milestones: [
    {
      id: "license-obtained",
      type: "licenseObtained",
      category: "exam",
      date: "2024-03-20",
      icon: TrophyIcon,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      id: "practice-passed",
      type: "practicePassed",
      category: "exam",
      date: "2024-03-15",
      icon: CheckCircle2Icon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      score: "Réussi",
    },
    {
      id: "hours-40",
      type: "hours40",
      category: "practice",
      date: "2024-03-10",
      icon: CarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      id: "highway",
      type: "highway",
      category: "practice",
      date: "2024-03-05",
      icon: CarIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      id: "hours-30",
      type: "hours30",
      category: "practice",
      date: "2024-02-28",
      icon: CarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      id: "night-driving",
      type: "nightDriving",
      category: "practice",
      date: "2024-02-25",
      icon: CarIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
    },
    {
      id: "sensibilization",
      type: "sensibilization",
      category: "theory",
      date: "2024-02-20",
      icon: BookOpenIcon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      id: "hours-20",
      type: "hours20",
      category: "practice",
      date: "2024-02-18",
      icon: CarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      id: "theory-passed",
      type: "theoryPassed",
      category: "exam",
      date: "2024-02-15",
      icon: CheckCircle2Icon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      score: "48/50",
    },
    {
      id: "hours-10",
      type: "hours10",
      category: "practice",
      date: "2024-02-05",
      icon: CarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      id: "first-aid",
      type: "firstAid",
      category: "theory",
      date: "2024-01-22",
      icon: BookOpenIcon,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      id: "registration",
      type: "registration",
      category: "special",
      date: "2024-01-15",
      icon: FileTextIcon,
      color: "text-gray-600",
      bgColor: "bg-gray-100 dark:bg-gray-900/20",
    },
  ],

  badges: [
    {
      id: "first-try",
      type: "firstTry",
      earned: true,
      date: "2024-03-15",
      icon: TrophyIcon,
      color: "text-yellow-600",
      rarity: "legendary",
    },
    {
      id: "theory-master",
      type: "theoryMaster",
      earned: true,
      date: "2024-02-15",
      icon: StarIcon,
      color: "text-purple-600",
      rarity: "epic",
    },
    {
      id: "highway-hero",
      type: "highwayHero",
      earned: true,
      date: "2024-03-05",
      icon: AwardIcon,
      color: "text-blue-600",
      rarity: "rare",
    },
    {
      id: "night-owl",
      type: "nightOwl",
      earned: true,
      date: "2024-02-25",
      icon: MedalIcon,
      color: "text-indigo-600",
      rarity: "rare",
    },
    {
      id: "safe-driver",
      type: "safeDriver",
      earned: true,
      date: "2024-03-10",
      icon: StarIcon,
      color: "text-green-600",
      rarity: "common",
    },
    {
      id: "early-bird",
      type: "earlyBird",
      earned: true,
      date: "2024-02-01",
      icon: ClockIcon,
      color: "text-orange-600",
      rarity: "common",
    },
    {
      id: "perfect-attendance",
      type: "perfectAttendance",
      earned: true,
      date: "2024-03-01",
      icon: CheckCircle2Icon,
      color: "text-green-600",
      rarity: "uncommon",
    },
    {
      id: "quick-learner",
      type: "quickLearner",
      earned: true,
      date: "2024-02-10",
      icon: TrendingUpIcon,
      color: "text-blue-600",
      rarity: "uncommon",
    },
  ],

  certificates: [
    {
      id: "license",
      type: "license",
      date: "2024-03-20",
      number: "CH-GE-2024-12345",
      icon: TrophyIcon,
    },
    {
      id: "practice",
      type: "practice",
      date: "2024-03-15",
      number: "PRACT-2024-5678",
      icon: FileTextIcon,
    },
    {
      id: "sensibilization",
      type: "sensibilization",
      date: "2024-02-20",
      number: "SENS-2024-9012",
      icon: BookOpenIcon,
    },
    {
      id: "theory",
      type: "theory",
      date: "2024-02-15",
      number: "THEO-2024-3456",
      icon: FileTextIcon,
    },
    {
      id: "first-aid",
      type: "firstAid",
      date: "2024-01-22",
      number: "FA-2024-7890",
      icon: BookOpenIcon,
    },
  ],
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentMilestonesPage({
  locale = "fr",
}: StudentMilestonesPageProps) {
  const t = translations[locale];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20";
      case "epic":
        return "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20";
      case "rare":
        return "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20";
      case "uncommon":
        return "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20";
      default:
        return "border-gray-300 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground mt-2">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.totalMilestones}
              </p>
              <p className="text-3xl font-bold text-primary mt-1">
                {mockMilestonesData.statistics.totalMilestones}
              </p>
            </div>
            <TrophyIcon className="w-10 h-10 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.totalBadges}</p>
              <p className="text-3xl font-bold text-primary mt-1">
                {mockMilestonesData.statistics.totalBadges}
              </p>
            </div>
            <StarIcon className="w-10 h-10 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.totalHours}</p>
              <p className="text-3xl font-bold text-primary mt-1">
                {mockMilestonesData.statistics.totalHours}
              </p>
            </div>
            <ClockIcon className="w-10 h-10 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.successRate}</p>
              <p className="text-3xl font-bold text-primary mt-1">
                {mockMilestonesData.statistics.successRate}%
              </p>
            </div>
            <TrendingUpIcon className="w-10 h-10 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">{t.timeline}</TabsTrigger>
          <TabsTrigger value="badges">{t.badges}</TabsTrigger>
          <TabsTrigger value="certificates">{t.certificates}</TabsTrigger>
          <TabsTrigger value="statistics">{t.statistics}</TabsTrigger>
        </TabsList>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{t.allMilestones}</h2>
            <div className="space-y-6">
              {mockMilestonesData.milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isLast =
                  index === mockMilestonesData.milestones.length - 1;

                return (
                  <div key={milestone.id} className="relative">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${milestone.bgColor}`}
                      >
                        <Icon className={`w-7 h-7 ${milestone.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {
                              t.milestoneTypes[
                                milestone.type as keyof typeof t.milestoneTypes
                              ]
                            }
                          </h3>
                          <Badge
                            variant="outline"
                            className={milestone.bgColor}
                          >
                            {
                              t.categories[
                                milestone.category as keyof typeof t.categories
                              ]
                            }
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />

                            {new Date(milestone.date).toLocaleDateString(
                              locale,
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>
                          {milestone.score && (
                            <Badge variant="secondary">{milestone.score}</Badge>
                          )}
                        </div>

                        {index === 0 && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">
                              <ShareIcon className="w-4 h-4 mr-2" />

                              {t.share}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isLast && (
                      <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-border -mb-6" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{t.badges}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockMilestonesData.badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <Card
                    key={badge.id}
                    className={`p-6 border-2 ${getRarityColor(badge.rarity)}`}
                  >
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
                          <Icon className={`w-8 h-8 ${badge.color}`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">
                          {
                            t.badgeDescriptions[
                              badge.type as keyof typeof t.badgeDescriptions
                            ]
                          }
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {t.earned}:{" "}
                          {new Date(badge.date).toLocaleDateString(locale)}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{t.certificates}</h2>
            <div className="space-y-4">
              {mockMilestonesData.certificates.map((cert) => {
                const Icon = cert.icon;
                return (
                  <Card key={cert.id} className="p-6 border-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {
                              t.certificateTypes[
                                cert.type as keyof typeof t.certificateTypes
                              ]
                            }
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            N° {cert.number}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(cert.date).toLocaleDateString(locale, {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <DownloadIcon className="w-4 h-4 mr-2" />

                          {t.download}
                        </Button>
                        <Button size="sm" variant="outline">
                          {t.viewCertificate}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Progression par Catégorie
              </h2>
              <div className="space-y-4">
                {Object.entries(t.categories).map(([key, label]) => {
                  const count = mockMilestonesData.milestones.filter(
                    (m) => m.category === key
                  ).length;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{label}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} étapes
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${
                              (count /
                                mockMilestonesData.statistics.totalMilestones) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="text-center space-y-4">
                <SparklesIcon className="w-12 h-12 text-primary mx-auto" />

                <h2 className="text-2xl font-bold">{t.congratulations}</h2>
                <p className="text-muted-foreground">{t.keepGoing}</p>
                <div className="pt-4">
                  <Button size="lg">
                    <TargetIcon className="w-5 h-5 mr-2" />
                    Voir Prochaines Étapes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
