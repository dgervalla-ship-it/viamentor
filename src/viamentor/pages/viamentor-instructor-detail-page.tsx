import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViamentorInstructorDetailHeader } from "@/viamentor/components/viamentor-instructor-detail-header";
import { ViamentorInstructorInformationsTab } from "@/viamentor/components/viamentor-instructor-informations-tab";
import { ViamentorInstructorPlanningTab } from "@/viamentor/components/viamentor-instructor-planning-tab";
import { ViamentorInstructorStudentsTab } from "@/viamentor/components/viamentor-instructor-students-tab";
import { ViamentorInstructorPerformanceTab } from "@/viamentor/components/viamentor-instructor-performance-tab";
import {
  MOCK_INSTRUCTOR_LESSONS,
  MOCK_ASSIGNED_STUDENTS,
  MOCK_INSTRUCTOR_PERFORMANCE,
  MOCK_INSTRUCTOR_REVIEWS,
  MOCK_INSTRUCTOR_RANKING,
} from "@/viamentor/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/viamentor/data/viamentor-instructor-detail-i18n";
import { INSTRUCTOR_DETAIL_I18N } from "@/viamentor/data/viamentor-instructor-detail-i18n";
import { useInstructor } from "@/lib/hooks/use-instructors";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

interface InstructorDetailPageProps {
  locale?: InstructorDetailLocale;
}

export function ViamentorInstructorDetailPage({
  locale = "fr",
}: InstructorDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("informations");
  const t = INSTRUCTOR_DETAIL_I18N[locale];

  // Fetch instructor data from API
  const { data: instructor, isLoading, error } = useInstructor(id || "");

  // Loading state
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Error state
  if (error || !instructor) {
    return <ErrorMessage error={error || new Error("Instructor not found")} fullScreen />;
  }

  // Mock data for now (TODO: create hooks for these)
  const lessons = MOCK_INSTRUCTOR_LESSONS;
  const students = MOCK_ASSIGNED_STUDENTS;
  const performance = MOCK_INSTRUCTOR_PERFORMANCE;
  const reviews = MOCK_INSTRUCTOR_REVIEWS;
  const ranking = MOCK_INSTRUCTOR_RANKING;

  const studentsStats = {
    total: instructor.stats?.totalStudents || 0,
    active: instructor.stats?.activeStudents || 0,
    lessonsLast7Days: instructor.stats?.lessonsLast7Days || 0,
    successRate: instructor.stats?.successRate || 0,
  };

  // Handlers
  const handleEdit = () => {
    console.log("Edit instructor", id);
  };

  const handlePlanning = () => {
    console.log("View planning", id);
  };

  const handleAssign = () => {
    console.log("Assign student", id);
  };

  const handleSuspend = () => {
    console.log("Suspend instructor", id);
  };

  const handleDelete = () => {
    console.log("Delete instructor", id);
  };

  const handleUpdate = async (field: string, value: any) => {
    console.log("Update field", field, value);
    // Simuler un délai API
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleNewLesson = () => {
    console.log("New lesson");
  };

  const handleModifyLesson = (lesson: any) => {
    console.log("Modify lesson", lesson);
  };

  const handleCancelLesson = (lesson: any) => {
    console.log("Cancel lesson", lesson);
  };

  const handleExport = () => {
    console.log("Export calendar");
  };

  const handleViewPlanning = (student: any) => {
    console.log("View student planning", student);
  };

  const handleUnassign = (student: any) => {
    console.log("Unassign student", student);
  };

  const handleReplyReview = (reviewId: string, reply: string) => {
    console.log("Reply to review", reviewId, reply);
  };

  const handleUpdateTarget = (target: number) => {
    console.log("Update target", target);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ViamentorInstructorDetailHeader
        instructor={instructor}
        locale={locale}
        onEdit={handleEdit}
        onPlanning={handlePlanning}
        onAssign={handleAssign}
        onSuspend={handleSuspend}
        onDelete={handleDelete}
      />

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="informations">Informations</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="students">{t.tabs.students.title}</TabsTrigger>
            <TabsTrigger value="performance">
              {t.tabs.performance.title}
            </TabsTrigger>
          </TabsList>

          {/* Tab Informations */}
          <TabsContent value="informations" className="space-y-6">
            <ViamentorInstructorInformationsTab
              instructor={instructor}
              locale={locale}
              onUpdate={handleUpdate}
            />
          </TabsContent>

          {/* Tab Planning */}
          <TabsContent value="planning" className="space-y-6">
            <ViamentorInstructorPlanningTab
              lessons={lessons}
              locale={locale}
              onNewLesson={handleNewLesson}
              onModifyLesson={handleModifyLesson}
              onCancelLesson={handleCancelLesson}
              onExport={handleExport}
            />
          </TabsContent>

          {/* Tab Students */}
          <TabsContent value="students" className="space-y-6">
            <ViamentorInstructorStudentsTab
              students={students}
              stats={studentsStats}
              locale={locale}
              onAssignStudent={handleAssign}
              onViewPlanning={handleViewPlanning}
              onUnassign={handleUnassign}
            />
          </TabsContent>

          {/* Tab Performance */}
          <TabsContent value="performance" className="space-y-6">
            <ViamentorInstructorPerformanceTab
              performance={performance}
              reviews={reviews}
              ranking={ranking}
              locale={locale}
              onReplyReview={handleReplyReview}
              onUpdateTarget={handleUpdateTarget}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
