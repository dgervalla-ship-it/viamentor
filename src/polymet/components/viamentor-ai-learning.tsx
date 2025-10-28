/**
 * VIAMENTOR - AI Learning
 * Composant apprentissage continu IA avec feedback et amélioration
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  BrainIcon,
  TrendingUpIcon,
  RefreshCwIcon,
  CheckIcon,
  AlertCircleIcon,
  BarChart3Icon,
  CalendarIcon,
  UserIcon,
  FileTextIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react";
import { aiResponsesTranslations } from "@/polymet/data/viamentor-ai-responses-i18n";
import type { AIResponsesLocale } from "@/polymet/data/viamentor-ai-responses-i18n";
import type {
  AILearningData,
  AIMetrics,
} from "@/polymet/data/viamentor-ai-responses-data";

// ============================================================================
// TYPES
// ============================================================================

interface AILearningProps {
  learningData: AILearningData[];
  metrics: AIMetrics;
  locale?: AIResponsesLocale;
  onRetrain?: () => void;
  onExportData?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AILearning({
  learningData,
  metrics,
  locale = "fr",
  onRetrain,
  onExportData,
}: AILearningProps) {
  const t = aiResponsesTranslations[locale];
  const [isRetrainDialogOpen, setIsRetrainDialogOpen] = useState(false);
  const [isRetraining, setIsRetraining] = useState(false);
  const [selectedComparison, setSelectedComparison] =
    useState<AILearningData | null>(null);

  const handleRetrain = async () => {
    setIsRetraining(true);

    // Simulation du réentraînement
    await new Promise((resolve) => setTimeout(resolve, 3000));

    onRetrain?.();
    setIsRetraining(false);
    setIsRetrainDialogOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const calculateImprovementScore = (original: string, corrected: string) => {
    // Simulation simple du calcul d'amélioration
    const lengthDiff = Math.abs(corrected.length - original.length);
    const wordsDiff = Math.abs(
      corrected.split(" ").length - original.split(" ").length
    );
    return Math.min(100, Math.max(10, 100 - lengthDiff / 10 - wordsDiff * 2));
  };

  const canRetrain = learningData.length >= 5; // Minimum 5 corrections pour réentraîner

  return (
    <div className="space-y-6">
      {/* Header avec métriques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BarChart3Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{learningData.length}</div>
                <div className="text-sm text-muted-foreground">
                  {t.learning.metrics.totalCorrections}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUpIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metrics.averageQualityScore.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.learning.metrics.averageImprovement}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {metrics.lastModelUpdate
                    ? formatDate(metrics.lastModelUpdate).split(" ")[0]
                    : "Jamais"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t.learning.metrics.lastUpdate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section principale */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BrainIcon className="h-5 w-5" />

                {t.learning.title}
              </CardTitle>
              <CardDescription>{t.learning.subtitle}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onExportData}>
                <FileTextIcon className="h-4 w-4 mr-2" />
                Exporter données
              </Button>
              <Button
                onClick={() => setIsRetrainDialogOpen(true)}
                disabled={!canRetrain}
              >
                <SparklesIcon className="h-4 w-4 mr-2" />

                {t.learning.retrain}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Alert statut */}
          {!canRetrain && (
            <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
              <AlertCircleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />

              <AlertDescription className="text-orange-900 dark:text-orange-100">
                {5 - learningData.length} correction(s) supplémentaire(s)
                nécessaire(s) pour réentraîner le modèle.
              </AlertDescription>
            </Alert>
          )}

          {canRetrain && (
            <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
              <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

              <AlertDescription className="text-green-900 dark:text-green-100">
                {t.learning.retrainDescription} ({learningData.length}{" "}
                corrections disponibles)
              </AlertDescription>
            </Alert>
          )}

          {/* Table des corrections */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.learning.table.date}</TableHead>
                  <TableHead>Correcteur</TableHead>
                  <TableHead>Comparaison</TableHead>
                  <TableHead>Amélioration</TableHead>
                  <TableHead>Pattern identifié</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {learningData.map((item) => {
                  const improvementScore = calculateImprovementScore(
                    item.originalAIResponse,
                    item.humanFinalResponse
                  );

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(item.correctionDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />

                          <span className="text-sm">
                            {item.correctedBy.split("@")[0]}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedComparison(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Voir différences
                          <ArrowRightIcon className="h-3 w-3 ml-1" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={improvementScore}
                            className="w-16 h-2"
                          />

                          <span className="text-sm font-medium">
                            {improvementScore.toFixed(0)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.patternIdentified && (
                          <Badge variant="outline" className="text-xs">
                            {item.patternIdentified}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* État vide */}
          {learningData.length === 0 && (
            <div className="text-center py-12">
              <BrainIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />

              <h3 className="text-lg font-medium mb-2">
                Aucune correction disponible
              </h3>
              <p className="text-muted-foreground">
                Les corrections apportées aux réponses IA apparaîtront ici pour
                améliorer le modèle.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de comparaison */}
      <Dialog
        open={!!selectedComparison}
        onOpenChange={() => setSelectedComparison(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comparaison des réponses</DialogTitle>
            <DialogDescription>
              Analyse des différences entre la réponse IA originale et la
              correction humaine.
            </DialogDescription>
          </DialogHeader>

          {selectedComparison && (
            <div className="space-y-6 py-4">
              {/* Métadonnées */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(selectedComparison.correctionDate)}
                </div>
                <div>
                  <span className="font-medium">Correcteur:</span>{" "}
                  {selectedComparison.correctedBy}
                </div>
              </div>

              <Separator />

              {/* Comparaison côte à côte */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600 dark:text-red-400">
                    Réponse IA originale
                  </h4>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-900">
                    <p className="text-sm">
                      {selectedComparison.originalAIResponse}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedComparison.originalAIResponse.split(" ").length}{" "}
                    mots
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-green-600 dark:text-green-400">
                    Réponse humaine finale
                  </h4>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-900">
                    <p className="text-sm">
                      {selectedComparison.humanFinalResponse}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedComparison.humanFinalResponse.split(" ").length}{" "}
                    mots
                  </div>
                </div>
              </div>

              {/* Notes d'amélioration */}
              <div className="space-y-2">
                <h4 className="font-medium">Notes d'amélioration</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    {selectedComparison.improvementNotes}
                  </p>
                </div>
              </div>

              {/* Pattern identifié */}
              {selectedComparison.patternIdentified && (
                <div className="space-y-2">
                  <h4 className="font-medium">Pattern identifié</h4>
                  <Badge variant="outline" className="text-sm">
                    {selectedComparison.patternIdentified}
                  </Badge>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedComparison(null)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de réentraînement */}
      <Dialog open={isRetrainDialogOpen} onOpenChange={setIsRetrainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.learning.retrain}</DialogTitle>
            <DialogDescription>
              {t.learning.retrainDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert>
              <SparklesIcon className="h-4 w-4" />

              <AlertDescription>
                Le réentraînement utilisera {learningData.length} corrections
                pour améliorer la qualité des réponses futures. Cette opération
                prend environ 2-3 minutes.
              </AlertDescription>
            </Alert>

            {isRetraining && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <RefreshCwIcon className="h-4 w-4 animate-spin" />

                  <span className="text-sm font-medium">
                    Réentraînement en cours...
                  </span>
                </div>
                <Progress value={66} className="w-full" />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRetrainDialogOpen(false)}
              disabled={isRetraining}
            >
              Annuler
            </Button>
            <Button onClick={handleRetrain} disabled={isRetraining}>
              {isRetraining ? "Réentraînement..." : "Démarrer réentraînement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
