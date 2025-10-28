/**
 * ============================================================================
 * VIAMENTOR - Mock Exams Page
 * Page gestion examens blancs avec stats et historique
 * ============================================================================
 */

import { useState } from "react";
import {
  PlusIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  ClockIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  BarChart3Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockMockExams,
  type MockExam,
} from "@/polymet/data/viamentor-exams-data";
import {
  examsLocales,
  type ExamsLocale,
} from "@/polymet/data/viamentor-exams-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsMockPageProps {
  locale?: ExamsLocale;
}

// ============================================================================
// STATS CARDS
// ============================================================================

function StatsCards({ locale }: { locale: ExamsLocale }) {
  const completed = mockMockExams.filter(
    (e) => e.status === "completed"
  ).length;
  const avgScore =
    mockMockExams
      .filter((e) => e.result)
      .reduce((sum, e) => sum + (e.result?.score || 0), 0) / completed || 0;

  const passed = mockMockExams.filter(
    (e) => e.result && e.result.passed
  ).length;

  const stats = [
    {
      label: "Total examens blancs",
      value: mockMockExams.length,
      icon: TargetIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Terminés",
      value: completed,
      icon: CheckCircle2Icon,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Score moyen",
      value: `${avgScore.toFixed(0)}%`,
      icon: BarChart3Icon,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      label: "Niveau atteint",
      value: passed,
      icon: TrendingUpIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// HISTORY TAB
// ============================================================================

function HistoryTab({ locale }: { locale: ExamsLocale }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale.mock.history}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{locale.detail.student}</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>{locale.result.score}</TableHead>
              <TableHead>Résultat</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMockExams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>
                  <div className="font-medium">{exam.studentName}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {locale.types[exam.type as keyof typeof locale.types]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-3 w-3 text-muted-foreground" />

                    {exam.scheduledDate.toLocaleDateString("fr-CH")}
                  </div>
                </TableCell>
                <TableCell>
                  {exam.result ? (
                    <div className="flex items-center gap-2">
                      <Progress
                        value={exam.result.score}
                        className="h-2 w-20"
                      />

                      <span className="text-sm font-medium">
                        {exam.result.score}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {exam.result ? (
                    exam.result.passed ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2Icon className="h-3 w-3 mr-1" />
                        Niveau atteint
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        <AlertCircleIcon className="h-3 w-3 mr-1" />À améliorer
                      </Badge>
                    )
                  ) : (
                    <Badge variant="secondary">En attente</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    {locale.mock.viewResults}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// STATISTICS TAB
// ============================================================================

function StatisticsTab({ locale }: { locale: ExamsLocale }) {
  const examsWithResults = mockMockExams.filter((e) => e.result);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Progression */}
      <Card>
        <CardHeader>
          <CardTitle>Progression des scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {examsWithResults.map((exam, index) => (
            <div key={exam.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Tentative #{index + 1}
                </span>
                <span className="font-medium">{exam.result?.score}%</span>
              </div>
              <Progress value={exam.result?.score} className="h-2" />

              {index > 0 && examsWithResults[index - 1].result && (
                <div className="flex items-center gap-1 text-xs">
                  {exam.result!.score >
                  examsWithResults[index - 1].result!.score ? (
                    <>
                      <TrendingUpIcon className="h-3 w-3 text-green-600" />

                      <span className="text-green-600">
                        +
                        {(
                          exam.result!.score -
                          examsWithResults[index - 1].result!.score
                        ).toFixed(0)}
                        %
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDownIcon className="h-3 w-3 text-red-600" />

                      <span className="text-red-600">
                        {(
                          exam.result!.score -
                          examsWithResults[index - 1].result!.score
                        ).toFixed(0)}
                        %
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Points faibles récurrents */}
      <Card>
        <CardHeader>
          <CardTitle>Points à améliorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examsWithResults
              .filter((e) => e.result?.weakPoints)
              .flatMap((e) => e.result!.weakPoints!)
              .reduce((acc: { point: string; count: number }[], point) => {
                const existing = acc.find((p) => p.point === point);
                if (existing) {
                  existing.count++;
                } else {
                  acc.push({ point, count: 1 });
                }
                return acc;
              }, [])
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.point}</span>
                    <Badge variant="secondary">{item.count}x</Badge>
                  </div>
                  <Progress
                    value={(item.count / examsWithResults.length) * 100}
                    className="h-2"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Résultats par thème */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Résultats par thème</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examsWithResults[0]?.result?.themeResults?.map((theme) => {
              const avgScore =
                examsWithResults
                  .filter((e) => e.result?.themeResults)
                  .reduce((sum, e) => {
                    const themeResult = e.result!.themeResults!.find(
                      (t) => t.themeId === theme.themeId
                    );
                    return sum + (themeResult?.score || 0);
                  }, 0) / examsWithResults.length;

              return (
                <div key={theme.themeId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{theme.themeName}</span>
                    <span className="text-sm text-muted-foreground">
                      Moyenne: {avgScore.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={avgScore} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// RECOMMENDATIONS TAB
// ============================================================================

function RecommendationsTab({ locale }: { locale: ExamsLocale }) {
  const lastExam = mockMockExams.filter((e) => e.result).pop();
  const isReady = lastExam?.result?.passed || false;

  return (
    <div className="space-y-6">
      {/* État de préparation */}
      <Card>
        <CardHeader>
          <CardTitle>État de préparation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-full ${
                isReady
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-orange-100 dark:bg-orange-900/30"
              }`}
            >
              {isReady ? (
                <CheckCircle2Icon className="h-8 w-8 text-green-600" />
              ) : (
                <AlertCircleIcon className="h-8 w-8 text-orange-600" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {isReady
                  ? "Prêt pour l'examen officiel"
                  : "Préparation en cours"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isReady
                  ? "Votre dernier examen blanc montre que vous êtes prêt. Vous pouvez réserver l'examen officiel."
                  : "Continuez à vous entraîner pour améliorer vos résultats avant l'examen officiel."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommandations */}
      <Card>
        <CardHeader>
          <CardTitle>{locale.mock.recommendations}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isReady && (
              <>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <AlertCircleIcon className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />

                  <div>
                    <div className="font-medium">Réviser les priorités</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Ce thème nécessite plus d'attention. Révisez les règles de
                      priorité aux intersections.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <AlertCircleIcon className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />

                  <div>
                    <div className="font-medium">
                      Pratiquer les distances de sécurité
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Améliorez votre compréhension des distances de sécurité en
                      fonction de la vitesse.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />

                  <div>
                    <div className="font-medium">
                      Planifier un nouvel examen blanc
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Après avoir révisé ces points, planifiez un nouvel examen
                      blanc pour évaluer vos progrès.
                    </div>
                  </div>
                </div>
              </>
            )}

            {isReady && (
              <>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                  <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />

                  <div>
                    <div className="font-medium">
                      Réserver l'examen officiel
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Vous avez atteint le niveau requis. Vous pouvez maintenant
                      réserver votre examen théorique officiel.
                    </div>
                    <Button size="sm" className="mt-3">
                      Réserver l'examen
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />

                  <div>
                    <div className="font-medium">Maintenir le niveau</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Continuez à réviser régulièrement pour maintenir votre
                      niveau jusqu'à l'examen.
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ExamsMockPage({
  locale = examsLocales.fr,
}: ExamsMockPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {locale.mock.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {locale.mock.description}
            </p>
          </div>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />

            {locale.mock.createMock}
          </Button>
        </div>

        {/* Stats */}
        <StatsCards locale={locale} />

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">{locale.mock.history}</TabsTrigger>
            <TabsTrigger value="statistics">
              {locale.mock.statistics}
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              {locale.mock.recommendations}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <HistoryTab locale={locale} />
          </TabsContent>

          <TabsContent value="statistics">
            <StatisticsTab locale={locale} />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsTab locale={locale} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
