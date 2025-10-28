/**
 * VIAMENTOR - Instructor Students Page
 * Page principale gestion élèves moniteur
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  SearchIcon,
  FilterIcon,
  LayoutGridIcon,
  TableIcon,
  DownloadIcon,
  PhoneIcon,
  MailIcon,
  MessageSquareIcon,
  CalendarIcon,
  UserIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  StarIcon,
} from "lucide-react";
import {
  mockInstructorStudents,
  mockStudentStats,
  mockProgressThemes,
  mockLessonRecords,
  mockStudentEvaluations,
  mockStudentNotes,
  mockCommunicationHistory,
  getStudentFullName,
  getStudentAge,
  getDaysUntilExam,
  getRelativeDate,
  getStatusColor,
  getProgressionColor,
  getThemesByStatus,
  type InstructorStudent,
} from "@/polymet/data/viamentor-instructor-students-data";
import {
  useInstructorStudentsTranslations,
  type InstructorStudentsLocale,
} from "@/polymet/data/viamentor-instructor-students-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorStudentsPageProps {
  locale?: InstructorStudentsLocale;
}

type ViewMode = "cards" | "table";

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorStudentsPage({
  locale = "fr",
}: InstructorStudentsPageProps) {
  const t = useInstructorStudentsTranslations(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [progressionFilter, setProgressionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [selectedStudent, setSelectedStudent] =
    useState<InstructorStudent | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  // Filter students
  const filteredStudents = mockInstructorStudents.filter((student) => {
    const matchesSearch =
      getStudentFullName(student)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || student.category === categoryFilter;
    const matchesProgression =
      progressionFilter === "all" ||
      (progressionFilter === "low" && student.progression < 30) ||
      (progressionFilter === "medium" &&
        student.progression >= 30 &&
        student.progression <= 70) ||
      (progressionFilter === "high" && student.progression > 70);
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;

    return (
      matchesSearch && matchesCategory && matchesProgression && matchesStatus
    );
  });

  const handleViewStudent = (student: InstructorStudent) => {
    setSelectedStudent(student);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.breadcrumb}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {mockStudentStats.totalStudents}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.stats.totalStudents}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {mockStudentStats.activeThisMonth}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.stats.activeThisMonth}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <TrendingUpIcon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {mockStudentStats.averageProgression}%
              </div>
              <div className="text-sm text-muted-foreground">
                {t.stats.averageProgression}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <AlertCircleIcon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {mockStudentStats.upcomingExams}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.stats.upcomingExams}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                placeholder={t.toolbar.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.toolbar.filterCategory} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.allCategories}</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="BE">BE</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={progressionFilter}
            onValueChange={setProgressionFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.toolbar.filterProgression} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.allCategories}</SelectItem>
              <SelectItem value="low">{t.filters.progressionLow}</SelectItem>
              <SelectItem value="medium">
                {t.filters.progressionMedium}
              </SelectItem>
              <SelectItem value="high">{t.filters.progressionHigh}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.toolbar.filterStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.allCategories}</SelectItem>
              <SelectItem value="active">{t.filters.statusActive}</SelectItem>
              <SelectItem value="inactive">
                {t.filters.statusInactive}
              </SelectItem>
              <SelectItem value="exam_ready">
                {t.filters.statusExamReady}
              </SelectItem>
              <SelectItem value="abandoned">
                {t.filters.statusAbandoned}
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("cards")}
            >
              <LayoutGridIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline">
            <DownloadIcon className="w-4 h-4 mr-2" />

            {t.toolbar.export}
          </Button>
        </div>
      </Card>

      {/* Students List - Cards View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleViewStudent(student)}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={student.avatar}
                  alt={getStudentFullName(student)}
                  className="w-16 h-16 rounded-full"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {getStudentFullName(student)}
                  </h3>
                  <Badge variant="secondary">{student.category}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      {t.student.progression}
                    </span>
                    <span
                      className={`font-semibold ${getProgressionColor(student.progression)}`}
                    >
                      {student.progression}%
                    </span>
                  </div>
                  <Progress value={student.progression} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">
                      {t.student.lessonsCompleted}
                    </div>
                    <div className="font-semibold text-foreground">
                      {student.lessonsCompleted}
                    </div>
                  </div>
                  {student.averageRating && (
                    <div>
                      <div className="text-muted-foreground">
                        {t.student.averageRating}
                      </div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {student.averageRating}/5
                      </div>
                    </div>
                  )}
                </div>

                {student.lastLessonDate && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      {t.student.lastLesson}:{" "}
                    </span>
                    <span className="text-foreground">
                      {getRelativeDate(student.lastLessonDate)}
                    </span>
                  </div>
                )}

                {student.nextLessonDate && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      {t.student.nextLesson}:{" "}
                    </span>
                    <span className="text-foreground">
                      {new Date(student.nextLessonDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${student.phone}`, "_self");
                    }}
                    title={t.actions.call}
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`mailto:${student.email}`, "_self");
                    }}
                    title={t.actions.email}
                  >
                    <MailIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        "Planifier leçon pour",
                        getStudentFullName(student)
                      );
                    }}
                    title={t.actions.schedule}
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <Card className="p-12 text-center">
          <UserIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />

          <h3 className="text-xl font-semibold text-foreground mb-2">
            {t.emptyState.title}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t.emptyState.description}
          </p>
          <Button>{t.emptyState.contactAdmin}</Button>
        </Card>
      )}

      {/* Student Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedStudent && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedStudent.avatar}
                    alt={getStudentFullName(selectedStudent)}
                    className="w-20 h-20 rounded-full"
                  />

                  <div>
                    <SheetTitle className="text-2xl">
                      {getStudentFullName(selectedStudent)}
                    </SheetTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">
                        {selectedStudent.category}
                      </Badge>
                      <Badge className={getStatusColor(selectedStudent.status)}>
                        {t.statusLabels[selectedStudent.status]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mt-6"
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="summary">{t.tabs.summary}</TabsTrigger>
                  <TabsTrigger value="progression">
                    {t.tabs.progression}
                  </TabsTrigger>
                  <TabsTrigger value="lessons">{t.tabs.lessons}</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4 mt-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">
                      {t.summary.information}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.summary.age}
                        </span>
                        <span className="text-foreground">
                          {getStudentAge(selectedStudent.birthDate)} ans
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.summary.registrationDate}
                        </span>
                        <span className="text-foreground">
                          {new Date(
                            selectedStudent.registrationDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.summary.phone}
                        </span>
                        <span className="text-foreground">
                          {selectedStudent.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {t.summary.email}
                        </span>
                        <span className="text-foreground">
                          {selectedStudent.email}
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">
                      {t.summary.statistics}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {selectedStudent.lessonsCompleted}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t.summary.totalLessons}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {selectedStudent.totalHours}h
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t.summary.drivingHours}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-500">
                          {selectedStudent.progression}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t.summary.globalProgression}
                        </div>
                      </div>
                      {selectedStudent.averageRating && (
                        <div>
                          <div className="text-2xl font-bold text-foreground">
                            {selectedStudent.averageRating}/5
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t.student.averageRating}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {selectedStudent.targetExamDate && (
                    <Card className="p-4 border-orange-500">
                      <h3 className="font-semibold text-foreground mb-2">
                        {t.summary.trainingGoal}
                      </h3>
                      <div className="text-2xl font-bold text-orange-500">
                        {t.summary.examIn}{" "}
                        {getDaysUntilExam(selectedStudent.targetExamDate)}{" "}
                        {t.summary.days}
                      </div>
                    </Card>
                  )}

                  {selectedStudent.balance < 5 && (
                    <Card className="p-4 border-red-500 bg-red-500/5">
                      <div className="flex items-center gap-2">
                        <AlertCircleIcon className="w-5 h-5 text-red-500" />

                        <div>
                          <div className="font-semibold text-foreground">
                            {t.summary.lowBalanceWarning}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {selectedStudent.balance}{" "}
                            {t.student.lessonsRemaining}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="progression" className="space-y-4 mt-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-foreground mb-3">
                      {t.progression.byTheme}
                    </h3>
                    <div className="space-y-3">
                      {mockProgressThemes.slice(0, 5).map((theme) => (
                        <div key={theme.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground">
                              {theme.name}
                            </span>
                            <span
                              className={`font-semibold ${getProgressionColor(theme.progress)}`}
                            >
                              {theme.progress}%
                            </span>
                          </div>
                          <Progress value={theme.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-lg font-bold text-green-500">
                        {
                          getThemesByStatus(mockProgressThemes, "mastered")
                            .length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.progression.mastered}
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-lg font-bold text-orange-500">
                        {
                          getThemesByStatus(mockProgressThemes, "in_progress")
                            .length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.progression.inProgress}
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-lg font-bold text-red-500">
                        {
                          getThemesByStatus(mockProgressThemes, "to_work")
                            .length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.progression.toWork}
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="lessons" className="space-y-4 mt-4">
                  {mockLessonRecords
                    .filter((l) => l.studentId === selectedStudent.id)
                    .map((lesson) => (
                      <Card key={lesson.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-foreground">
                              {new Date(lesson.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {lesson.duration} min • {lesson.vehicle}
                            </div>
                          </div>
                          {lesson.rating && (
                            <div className="flex items-center gap-1">
                              <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500" />

                              <span className="font-semibold text-foreground">
                                {lesson.rating}/5
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {t.lessons.themes}: {lesson.themes.join(", ")}
                        </div>
                        {lesson.comment && (
                          <div className="text-sm text-foreground">
                            {lesson.comment}
                          </div>
                        )}
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
