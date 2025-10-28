import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViamentorInstructorDetailHeader } from "@/polymet/components/viamentor-instructor-detail-header";
import { ViamentorInstructorInformationsTab } from "@/polymet/components/viamentor-instructor-informations-tab";
import { ViamentorInstructorPlanningTab } from "@/polymet/components/viamentor-instructor-planning-tab";
import { ViamentorInstructorStudentsTab } from "@/polymet/components/viamentor-instructor-students-tab";
import { ViamentorInstructorPerformanceTab } from "@/polymet/components/viamentor-instructor-performance-tab";
import {
  MOCK_INSTRUCTOR_DETAIL,
  MOCK_INSTRUCTOR_LESSONS,
  MOCK_ASSIGNED_STUDENTS,
  MOCK_INSTRUCTOR_PERFORMANCE,
  MOCK_INSTRUCTOR_REVIEWS,
  MOCK_INSTRUCTOR_RANKING,
} from "@/polymet/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/polymet/data/viamentor-instructor-detail-i18n";
import { INSTRUCTOR_DETAIL_I18N } from "@/polymet/data/viamentor-instructor-detail-i18n";

interface InstructorDetailPageProps {
  locale?: InstructorDetailLocale;
}

export function ViamentorInstructorDetailPage({
  locale = "fr",
}: InstructorDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("informations");
  const t = INSTRUCTOR_DETAIL_I18N[locale];

  // Mock: En production, charger les données depuis l'API avec l'id
  const instructor = MOCK_INSTRUCTOR_DETAIL;
  const lessons = MOCK_INSTRUCTOR_LESSONS;
  const students = MOCK_ASSIGNED_STUDENTS;
  const performance = MOCK_INSTRUCTOR_PERFORMANCE;
  const reviews = MOCK_INSTRUCTOR_REVIEWS;
  const ranking = MOCK_INSTRUCTOR_RANKING;

  const studentsStats = {
    total: instructor.stats.totalStudents,
    active: instructor.stats.activeStudents,
    lessonsLast7Days: instructor.stats.lessonsLast7Days,
    successRate: instructor.stats.successRate,
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
