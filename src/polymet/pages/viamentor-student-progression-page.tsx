/**
 * VIAMENTOR - Student Progression Page
 * Page principale suivi progression élève avec thèmes L-drive et évaluations
 */

"use client";

import { useState } from "react";
import {
  mockStudentProgression,
  calculateReadiness,
} from "@/polymet/data/viamentor-student-progression-data";
import {
  getProgressionTranslation,
  type ProgressionLocale,
} from "@/polymet/data/viamentor-student-progression-i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUpIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  BookOpenIcon,
  TargetIcon,
  AwardIcon,
  DownloadIcon,
  CalendarIcon,
  TrophyIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentProgressionPageProps {
  locale?: ProgressionLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentProgressionPage({
  locale = "fr",
}: StudentProgressionPageProps) {
  const t = getProgressionTranslation(locale);
  const [activeTab, setActiveTab] = useState("overview");
  const progression = mockStudentProgression;
  const readiness = calculateReadiness(progression);

  // Calculate stats
  const lessonsProgress =
    (progression.stats.lessonsCompleted /
      progression.stats.lessonsRecommended) *
    100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                {t.page.breadcrumb}
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {t.page.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {t.page.subtitle}
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <DownloadIcon className="h-4 w-4" />

              {t.objectives.downloadBooklet}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Global Progress */}
          <Card className="p-6 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="text-sm text-muted-foreground mb-2">
              {t.stats.globalProgress}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />

                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progression.stats.globalProgress / 100)}`}
                    className="text-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {progression.stats.globalProgress}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Mastered Themes */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                <CheckCircle2Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.masteredThemes}
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {progression.stats.masteredThemes}
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Themes */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <ClockIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.learningThemes}
                </div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {progression.stats.learningThemes}
                </div>
              </div>
            </div>
          </Card>

          {/* To Work Themes */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                <AlertCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {t.stats.toWorkThemes}
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {progression.stats.toWorkThemes}
                </div>
              </div>
            </div>
          </Card>

          {/* Lessons Progress */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <BookOpenIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  {t.stats.lessonsProgress}
                </div>
                <div className="text-lg font-bold text-foreground">
                  {progression.stats.lessonsCompleted}/
                  {progression.stats.lessonsRecommended}
                </div>
                <Progress value={lessonsProgress} className="h-2 mt-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUpIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.overview.title}</span>
            </TabsTrigger>
            <TabsTrigger value="themes" className="gap-2">
              <BookOpenIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.themes.title}</span>
            </TabsTrigger>
            <TabsTrigger value="path" className="gap-2">
              <CalendarIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.learningPath.title}</span>
            </TabsTrigger>
            <TabsTrigger value="objectives" className="gap-2">
              <TargetIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.objectives.title}</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <AwardIcon className="h-4 w-4" />

              <span className="hidden sm:inline">{t.certificates.title}</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart Placeholder */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t.overview.radarTitle}
                </h3>
                <div className="aspect-square flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <TrophyIcon className="h-16 w-16 mx-auto mb-2" />

                    <p>Radar Chart Visualization</p>
                  </div>
                </div>
              </Card>

              {/* Themes List */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t.overview.themesTitle}
                </h3>
                <div className="space-y-3">
                  {progression.themes.slice(0, 6).map((theme) => (
                    <div
                      key={theme.id}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {t.themes[theme.nameKey as keyof typeof t.themes] ||
                            theme.nameKey}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {theme.lastPracticeDate &&
                            `${t.overview.lastPractice} ${Math.floor((Date.now() - theme.lastPracticeDate.getTime()) / (1000 * 60 * 60 * 24))} ${t.overview.days}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">
                          {theme.score}%
                        </div>
                        <Progress value={theme.score} className="h-2 w-24" />
                      </div>
                      <Button variant="ghost" size="sm">
                        {t.overview.detailsButton}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t.recommendations.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {progression.recommendations
                  .filter((r) => !r.dismissed)
                  .map((rec) => (
                    <div
                      key={rec.id}
                      className={`p-4 border rounded-lg ${
                        rec.type === "continue"
                          ? "border-green-200 bg-green-50 dark:bg-green-900/10"
                          : rec.type === "focus"
                            ? "border-orange-200 bg-orange-50 dark:bg-orange-900/10"
                            : rec.type === "review"
                              ? "border-red-200 bg-red-50 dark:bg-red-900/10"
                              : "border-blue-200 bg-blue-50 dark:bg-blue-900/10"
                      }`}
                    >
                      <div
                        className={`font-medium mb-2 ${
                          rec.type === "continue"
                            ? "text-green-800 dark:text-green-400"
                            : rec.type === "focus"
                              ? "text-orange-800 dark:text-orange-400"
                              : rec.type === "review"
                                ? "text-red-800 dark:text-red-400"
                                : "text-blue-800 dark:text-blue-400"
                        }`}
                      >
                        {t.recommendations[
                          rec.titleKey as keyof typeof t.recommendations
                        ] || rec.titleKey}
                      </div>
                      <div
                        className={`text-sm mb-3 ${
                          rec.type === "continue"
                            ? "text-green-700 dark:text-green-300"
                            : rec.type === "focus"
                              ? "text-orange-700 dark:text-orange-300"
                              : rec.type === "review"
                                ? "text-red-700 dark:text-red-300"
                                : "text-blue-700 dark:text-blue-300"
                        }`}
                      >
                        {t.recommendations[
                          rec.descriptionKey as keyof typeof t.recommendations
                        ] || rec.descriptionKey}
                      </div>
                      {rec.actionType !== "none" && (
                        <Button size="sm" variant="outline" className="w-full">
                          {rec.actionType === "book_lesson"
                            ? t.recommendations.bookLesson
                            : t.recommendations.contactInstructor}
                        </Button>
                      )}
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>

          {/* Other tabs content would go here */}
          <TabsContent value="themes">
            <Card className="p-6">
              <p className="text-muted-foreground">
                Themes breakdown content...
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="path">
            <Card className="p-6">
              <p className="text-muted-foreground">
                Learning path timeline content...
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="objectives">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t.objectives.title}
              </h3>
              <div className="space-y-4">
                {progression.objectives.map((obj) => (
                  <div
                    key={obj.id}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-full ${
                        obj.status === "completed"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : obj.status === "in_progress"
                            ? "bg-orange-100 dark:bg-orange-900/20"
                            : "bg-gray-100 dark:bg-gray-900/20"
                      }`}
                    >
                      {obj.status === "completed" ? (
                        <CheckCircle2Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : obj.status === "in_progress" ? (
                        <ClockIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      ) : (
                        <AlertCircleIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {t.objectives[obj.type as keyof typeof t.objectives] ||
                          obj.type}
                      </div>
                      {obj.status === "in_progress" &&
                        obj.progress !== undefined && (
                          <Progress value={obj.progress} className="h-2 mt-2" />
                        )}
                    </div>
                    <Badge
                      variant={
                        obj.status === "completed" ? "default" : "secondary"
                      }
                    >
                      {t.objectives[obj.status as keyof typeof t.objectives] ||
                        obj.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card className="p-6">
              <p className="text-muted-foreground">Certificates content...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default StudentProgressionPage;
