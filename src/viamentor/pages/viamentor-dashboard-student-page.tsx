/**
 * VIAMENTOR - Dashboard Élève
 * Dashboard pour Students avec progression, leçons et documents
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
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  CreditCardIcon,
  TrendingUpIcon,
  MapPinIcon,
  GraduationCapIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  DownloadIcon,
  BarChart3Icon,
  ActivityIcon,
  FolderIcon,
  WalletIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";

export interface DashboardStudentPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const MOCK_STUDENT = {
  name: "Marie Dubois",
  avatar: "https://github.com/kdrnp.png",
  category: "B",
  progress: 75,
  lessonsCompleted: 18,
  lessonsTotal: 24,
  theoryPassed: true,
  practiceExamDate: "2024-02-15",
};

const MOCK_UPCOMING_LESSONS = [
  {
    id: "1",
    date: "Lundi 15 Jan",
    time: "08:00 - 09:30",
    instructor: "Marc Müller",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    type: "Circulation",
    location: "Départ: Rue du Rhône 45",
  },
  {
    id: "2",
    date: "Mercredi 17 Jan",
    time: "14:00 - 15:30",
    instructor: "Marc Müller",
    instructorAvatar: "https://github.com/yusufhilmi.png",
    type: "Autoroute",
    location: "Départ: Place de la Gare",
  },
];

const MOCK_DOCUMENTS = [
  {
    id: "1",
    name: "Attestation de cours",
    type: "PDF",
    date: "12 Jan 2024",
    size: "245 KB",
  },
  {
    id: "2",
    name: "Permis d'élève conducteur",
    type: "PDF",
    date: "05 Jan 2024",
    size: "189 KB",
  },
  {
    id: "3",
    name: "Certificat cours sensibilisation",
    type: "PDF",
    date: "20 Déc 2023",
    size: "312 KB",
  },
];

const MOCK_PAYMENTS = {
  balance: -450,
  lastPayment: {
    amount: 600,
    date: "10 Jan 2024",
  },
  nextInvoice: {
    amount: 450,
    dueDate: "31 Jan 2024",
  },
};

const MOCK_PROGRESS_THEMES = [
  { name: "Démarrage et arrêt", progress: 100, status: "completed" },
  { name: "Circulation en ville", progress: 90, status: "good" },
  { name: "Autoroute", progress: 75, status: "good" },
  { name: "Stationnement", progress: 60, status: "progress" },
  { name: "Conduite de nuit", progress: 30, status: "progress" },
  { name: "Conduite par mauvais temps", progress: 0, status: "pending" },
];

export function DashboardStudentPage({
  locale = "fr",
}: DashboardStudentPageProps) {
  return (
    <ResponsivePageWrapper
      title="Mon Dashboard"
      description={`Bienvenue ${MOCK_STUDENT.name} - Formation Catégorie ${MOCK_STUDENT.category}`}
      sections={[
        {
          id: "progress",
          label: "Progression",
          icon: <BarChart3Icon className="h-4 w-4" />,

          badge: `${MOCK_STUDENT.progress}%`,
          content: (
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle>Ma progression</CardTitle>
                <CardDescription>Avancement de votre formation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Progression globale
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {MOCK_STUDENT.progress}%
                    </span>
                  </div>
                  <Progress value={MOCK_STUDENT.progress} className="h-3" />

                  <p className="text-sm text-muted-foreground mt-2">
                    {MOCK_STUDENT.lessonsCompleted} /{" "}
                    {MOCK_STUDENT.lessonsTotal} leçons complétées
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    {MOCK_STUDENT.theoryPassed ? (
                      <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-500" />
                    ) : (
                      <AlertCircleIcon className="h-8 w-8 text-orange-600 dark:text-orange-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium">Examen théorique</p>
                      <Badge
                        variant={
                          MOCK_STUDENT.theoryPassed ? "default" : "secondary"
                        }
                      >
                        {MOCK_STUDENT.theoryPassed ? "Réussi" : "À passer"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCapIcon className="h-8 w-8 text-primary" />

                    <div>
                      <p className="text-sm font-medium">Examen pratique</p>
                      <p className="text-xs text-muted-foreground">
                        {MOCK_STUDENT.practiceExamDate}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ),
        },
        {
          id: "lessons",
          label: "Leçons",
          icon: <ActivityIcon className="h-4 w-4" />,

          badge: MOCK_UPCOMING_LESSONS.length.toString(),
          content: (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prochaines leçons</CardTitle>
                  <CardDescription>Vos leçons planifiées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_UPCOMING_LESSONS.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="rounded-lg border border-border p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                            <span className="font-medium">{lesson.date}</span>
                          </div>
                          <Badge variant="outline">{lesson.type}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ClockIcon className="h-4 w-4" />

                          {lesson.time}
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={lesson.instructorAvatar} />

                            <AvatarFallback>
                              {lesson.instructor[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {lesson.instructor}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Moniteur
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPinIcon className="h-4 w-4" />

                          {lesson.location}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/planning">
                      Voir tout mon planning
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Progression par thème</CardTitle>
                  <CardDescription>Détail de vos compétences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_PROGRESS_THEMES.map((theme, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {theme.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {theme.progress}%
                          </span>
                        </div>
                        <Progress value={theme.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ),
        },
        {
          id: "documents",
          label: "Documents",
          icon: <FolderIcon className="h-4 w-4" />,

          badge: MOCK_DOCUMENTS.length.toString(),
          content: (
            <Card>
              <CardHeader>
                <CardTitle>Mes documents</CardTitle>
                <CardDescription>Documents et attestations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_DOCUMENTS.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="h-8 w-8 text-primary" />

                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/documents">
                    Voir tous mes documents
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ),
        },
        {
          id: "payments",
          label: "Paiements",
          icon: <WalletIcon className="h-4 w-4" />,

          badge: MOCK_PAYMENTS.balance < 0 ? "À payer" : "OK",
          content: (
            <Card>
              <CardHeader>
                <CardTitle>Paiements</CardTitle>
                <CardDescription>Solde et factures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-border p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Solde actuel
                  </p>
                  <p
                    className={`text-3xl font-bold ${
                      MOCK_PAYMENTS.balance < 0
                        ? "text-destructive"
                        : "text-green-600 dark:text-green-500"
                    }`}
                  >
                    CHF{" "}
                    {Math.abs(MOCK_PAYMENTS.balance).toLocaleString("fr-CH")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {MOCK_PAYMENTS.balance < 0 ? "À payer" : "Crédit"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div>
                      <p className="text-sm font-medium">Dernier paiement</p>
                      <p className="text-xs text-muted-foreground">
                        {MOCK_PAYMENTS.lastPayment.date}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-500">
                      +CHF {MOCK_PAYMENTS.lastPayment.amount}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Prochaine facture</p>
                      <p className="text-xs text-muted-foreground">
                        Échéance: {MOCK_PAYMENTS.nextInvoice.dueDate}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-destructive">
                      CHF {MOCK_PAYMENTS.nextInvoice.amount}
                    </p>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to="/payments">
                    <CreditCardIcon className="mr-2 h-4 w-4" />
                    Effectuer un paiement
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

export default DashboardStudentPage;
