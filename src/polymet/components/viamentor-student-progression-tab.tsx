/**
 * VIAMENTOR Student Progression Tab
 *
 * Tab progression pédagogique avec thèmes, examens, recommandations
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  StarIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  FileTextIcon,
  DownloadIcon,
} from "lucide-react";
import type {
  Lesson,
  ProgressTheme,
  ExamRecord,
} from "@/polymet/data/viamentor-student-detail-data";
import {
  getMasteryColor,
  getMasteryBgColor,
  getLessonStatusColor,
} from "@/polymet/data/viamentor-student-detail-data";
import type { StudentDetailLocale } from "@/polymet/data/viamentor-student-detail-i18n";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";

export interface StudentProgressionTabProps {
  lessons: Lesson[];
  themes: ProgressTheme[];
  exams: ExamRecord[];
  locale?: StudentDetailLocale;
  onEvaluateTheme?: (themeId: string, rating: number, comment: string) => void;
  onRecordExamResult?: (examType: string, result: any) => void;
  onGenerateAttestation?: () => void;
  onPlanTargetedLessons?: (themeIds: string[]) => void;
}

export function StudentProgressionTab({
  lessons,
  themes,
  exams,
  locale = "fr",
  onEvaluateTheme,
  onRecordExamResult,
  onGenerateAttestation,
  onPlanTargetedLessons,
}: StudentProgressionTabProps) {
  const t = useStudentDetailTranslations(locale);
  const [evaluateDialogOpen, setEvaluateDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ProgressTheme | null>(
    null
  );
  const [themeRating, setThemeRating] = useState(0);
  const [themeComment, setThemeComment] = useState("");

  const totalHours =
    lessons.reduce((sum, lesson) => sum + lesson.duration, 0) / 60;
  const avgRating =
    lessons.reduce((sum, lesson) => sum + lesson.rating, 0) / lessons.length;
  const nextLesson = lessons.find((l) => l.status === "Planifiée");

  const openEvaluateDialog = (theme: ProgressTheme) => {
    setSelectedTheme(theme);
    setThemeRating(theme.mastery);
    setThemeComment("");
    setEvaluateDialogOpen(true);
  };

  const handleEvaluate = () => {
    if (selectedTheme && onEvaluateTheme) {
      onEvaluateTheme(selectedTheme.id, themeRating, themeComment);
    }
    setEvaluateDialogOpen(false);
  };

  const needsArticle23 = exams.some((exam) => exam.needsArticle23);

  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t.lessonsCompleted}
                </p>
                <p className="text-3xl font-bold">{lessons.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{t.totalHours}</p>
                <p className="text-3xl font-bold">{totalHours.toFixed(1)}h</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t.averageRating}
                </p>
                <p className="text-3xl font-bold flex items-center justify-center gap-1">
                  {avgRating.toFixed(1)}
                  <StarIcon className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{t.nextLesson}</p>
                {nextLesson ? (
                  <p className="text-sm font-medium mt-1">
                    {new Date(nextLesson.date).toLocaleDateString(
                      locale === "en" ? "en-CH" : `${locale}-CH`
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">-</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leçons historique */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.lessonsCompleted}</CardTitle>
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Moniteur</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Thèmes</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lessons.slice(0, 5).map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>
                      {new Date(lesson.date).toLocaleDateString(
                        locale === "en" ? "en-CH" : `${locale}-CH`
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          {lesson.instructor.avatar && (
                            <AvatarImage src={lesson.instructor.avatar} />
                          )}
                          <AvatarFallback>
                            {lesson.instructor.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {lesson.instructor.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{lesson.duration} min</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lesson.themes.map((theme) => (
                          <Badge
                            key={theme}
                            variant="outline"
                            className="text-xs"
                          >
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {lesson.rating}
                        <StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {lesson.comment}
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: getLessonStatusColor(lesson.status),
                        }}
                      >
                        {lesson.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Progression thématique */}
        <Card>
          <CardHeader>
            <CardTitle>{t.progressionThemes}</CardTitle>
            <CardDescription>
              Progression par thème d'apprentissage L-drive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map((theme) => (
                <Card key={theme.id}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{theme.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {t.lastPractice}:{" "}
                          {theme.lastPractice
                            ? new Date(theme.lastPractice).toLocaleDateString(
                                locale === "en" ? "en-CH" : `${locale}-CH`
                              )
                            : "Jamais"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-2xl font-bold ${getMasteryColor(theme.mastery)}`}
                        >
                          {theme.mastery}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {theme.masteryLevel}
                        </p>
                      </div>
                    </div>

                    <Progress
                      value={theme.mastery}
                      className="h-2"
                      style={{
                        backgroundColor: "hsl(var(--muted))",
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground font-medium">
                          {t.strengths}:
                        </p>
                        <p>{theme.strengths}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium">
                          {t.weaknesses}:
                        </p>
                        <p>{theme.weaknesses}</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => openEvaluateDialog(theme)}
                    >
                      {t.evaluate}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objectifs examens */}
        <Card>
          <CardHeader>
            <CardTitle>{t.examObjectives}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exams.map((exam, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        {exam.type === "Théorique"
                          ? t.theoryExam
                          : t.practicalExam}{" "}
                        - {exam.category}
                      </h4>
                      <Badge
                        variant={
                          exam.status === "Réussi"
                            ? "default"
                            : exam.status === "Échoué"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>

                    {exam.attempts.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {t.attempts}: {exam.attempts.length}
                        </p>
                        {exam.attempts.map((attempt) => (
                          <div
                            key={attempt.id}
                            className="p-2 bg-muted rounded text-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span>
                                {new Date(attempt.date).toLocaleDateString(
                                  locale === "en" ? "en-CH" : `${locale}-CH`
                                )}
                              </span>
                              <Badge
                                variant={
                                  attempt.result === "Réussi"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {attempt.result}
                                {attempt.score && ` - ${attempt.score}/50`}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {attempt.notes}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {exam.needsArticle23 && (
                      <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded">
                        <AlertTriangleIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />

                        <div className="flex-1">
                          <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                            {t.needsArticle23}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={onGenerateAttestation}
                          >
                            <FileTextIcon className="h-4 w-4 mr-2" />

                            {t.generateAttestation}
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onRecordExamResult?.(exam.type, {
                          category: exam.category,
                        })
                      }
                    >
                      {t.recordResult}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommandations */}
        <Card>
          <CardHeader>
            <CardTitle>{t.recommendations}</CardTitle>
            <CardDescription>
              Suggestions basées sur la progression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {themes
                .filter((t) => t.mastery < 75)
                .sort((a, b) => a.mastery - b.mastery)
                .slice(0, 3)
                .map((theme) => (
                  <div
                    key={theme.id}
                    className="flex items-start gap-3 p-3 bg-muted rounded"
                  >
                    <TrendingUpIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />

                    <div className="flex-1">
                      <p className="font-medium">{theme.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Maîtrise actuelle: {theme.mastery}% - Recommandé de
                        pratiquer davantage
                      </p>
                    </div>
                  </div>
                ))}
              <Button
                className="w-full"
                onClick={() =>
                  onPlanTargetedLessons?.(
                    themes.filter((t) => t.mastery < 75).map((t) => t.id)
                  )
                }
              >
                {t.planTargetedLessons}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evaluate Theme Dialog */}
      <Dialog open={evaluateDialogOpen} onOpenChange={setEvaluateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t.evaluate} - {selectedTheme?.name}
            </DialogTitle>
            <DialogDescription>
              Évaluer la maîtrise du thème par l'élève
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t.themeMastery} (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={themeRating}
                onChange={(e) => setThemeRating(Number(e.target.value))}
              />

              <Progress value={themeRating} className="h-2" />
            </div>
            <div className="space-y-2">
              <Label>Commentaire</Label>
              <Textarea
                value={themeComment}
                onChange={(e) => setThemeComment(e.target.value)}
                rows={3}
                placeholder="Observations sur la maîtrise du thème..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEvaluateDialogOpen(false)}
            >
              {t.cancel}
            </Button>
            <Button onClick={handleEvaluate}>{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
