/**
 * VIAMENTOR - Instructor Makeups Page
 * Page moniteur rattrapages élèves
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstructorMakeupsStats } from "@/polymet/components/viamentor-instructor-makeups-stats";
import { InstructorMakeupsTable } from "@/polymet/components/viamentor-instructor-makeups-table";
import { ExtendDeadlineDialog } from "@/polymet/components/viamentor-extend-deadline-dialog";
import { CancelCreditDialog } from "@/polymet/components/viamentor-cancel-credit-dialog";
import { MakeupDetailSheet } from "@/polymet/components/viamentor-makeup-detail-sheet";
import {
  ProposeGroupMakeupDialog,
  type GroupMakeupProposal,
} from "@/polymet/components/viamentor-propose-group-makeup-dialog";
import {
  GroupMakeupsList,
  type GroupMakeup,
} from "@/polymet/components/viamentor-group-makeups-list";
import {
  MOCK_INSTRUCTOR_STUDENTS_MAKEUPS,
  MOCK_INSTRUCTOR_MAKEUPS_GLOBAL_STATS,
  type StudentMakeupsStats,
} from "@/polymet/data/viamentor-instructor-makeups-data";
import type { InstructorMakeupsLocale } from "@/polymet/data/viamentor-instructor-makeups-i18n";
import { instructorMakeupsTranslations } from "@/polymet/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorMakeupsPageProps {
  locale?: InstructorMakeupsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function InstructorMakeupsPage({
  locale = "fr",
}: InstructorMakeupsPageProps) {
  const t = instructorMakeupsTranslations[locale];

  const [students] = useState(MOCK_INSTRUCTOR_STUDENTS_MAKEUPS);
  const [stats] = useState(MOCK_INSTRUCTOR_MAKEUPS_GLOBAL_STATS);

  // Mock group makeups data
  const [groupMakeups] = useState<GroupMakeup[]>([
    {
      id: "gm-1",
      topic: "Théorie circulation Cat. B",
      description:
        "Cours théorique complet: règles de circulation, signalisation, priorités",
      date: "2025-01-25",
      startTime: "14:00",
      endTime: "17:00",
      room: "Salle 2",
      category: "B",
      instructor: {
        id: "inst-1",
        name: "Pierre Dupont",
        avatar: "https://github.com/yusufhilmi.png",
      },
      participants: [
        {
          studentId: "student-1",
          studentName: "Sophie Martin",
          studentAvatar: "https://github.com/kdrnp.png",
          status: "accepted",
          respondedAt: "2025-01-17T10:30:00Z",
        },
        {
          studentId: "student-2",
          studentName: "Marc Dubois",
          studentAvatar: "https://github.com/yahyabedirhan.png",
          status: "pending",
        },
        {
          studentId: "student-4",
          studentName: "Lucas Bernard",
          studentAvatar: "https://github.com/shoaibux1.png",
          status: "accepted",
          respondedAt: "2025-01-17T14:20:00Z",
        },
      ],

      createdAt: "2025-01-16T16:00:00Z",
      status: "scheduled",
    },
  ]);

  const [selectedStudent, setSelectedStudent] =
    useState<StudentMakeupsStats | null>(null);
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [groupMakeupDialogOpen, setGroupMakeupDialogOpen] = useState(false);

  const handleViewDetail = (student: StudentMakeupsStats) => {
    setSelectedStudent(student);
    setDetailSheetOpen(true);
  };

  const handleExtend = (student: StudentMakeupsStats) => {
    setSelectedStudent(student);
    setExtendDialogOpen(true);
  };

  const handleCancel = (student: StudentMakeupsStats) => {
    setSelectedStudent(student);
    setCancelDialogOpen(true);
  };

  const handleExtendConfirm = async (data: {
    studentId: string;
    days: number;
    reason: string;
    notify: boolean;
  }) => {
    console.log("Extend deadline:", data);
    // API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleCancelConfirm = async (data: {
    studentId: string;
    reason: string;
  }) => {
    console.log("Cancel credit:", data);
    // API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleGroupMakeupConfirm = async (data: GroupMakeupProposal) => {
    console.log("Group makeup proposal:", data);
    // API call here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleCancelGroupMakeup = (groupMakeupId: string) => {
    console.log("Cancel group makeup:", groupMakeupId);
    // API call here
  };

  const handleRemindParticipants = (groupMakeupId: string) => {
    console.log("Remind participants:", groupMakeupId);
    // API call here
  };

  const handleViewGroupMakeupDetails = (groupMakeup: GroupMakeup) => {
    console.log("View group makeup details:", groupMakeup);
    // Could open a detail sheet/modal
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/instructor-dashboard">
              {t.breadcrumb.instructor}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.makeups}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground mt-1">{t.description}</p>
      </div>

      {/* Alert info */}
      <Alert>
        <InfoIcon className="w-4 h-4" />

        <AlertTitle>{t.alert.title}</AlertTitle>
        <AlertDescription>{t.alert.description}</AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <InstructorMakeupsStats stats={stats} locale={locale} />

      {/* Group Makeup Action */}
      <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-accent/50">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />

            {locale === "fr" && "Cours Collectif"}
            {locale === "de" && "Gruppenkurs"}
            {locale === "it" && "Corso Collettivo"}
            {locale === "en" && "Group Course"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === "fr" &&
              "Regroupez plusieurs élèves dans un cours théorique collectif pour optimiser les rattrapages"}
            {locale === "de" &&
              "Gruppieren Sie mehrere Schüler in einem theoretischen Gruppenkurs, um Nachholstunden zu optimieren"}
            {locale === "it" &&
              "Raggruppa più studenti in un corso teorico collettivo per ottimizzare i recuperi"}
            {locale === "en" &&
              "Group multiple students in a theory course to optimize makeups"}
          </p>
        </div>
        <Button
          onClick={() => setGroupMakeupDialogOpen(true)}
          disabled={students.filter((s) => s.available > 0).length < 2}
        >
          <UsersIcon className="w-4 h-4 mr-2" />

          {locale === "fr" && "Proposer un cours"}
          {locale === "de" && "Kurs vorschlagen"}
          {locale === "it" && "Proponi corso"}
          {locale === "en" && "Propose course"}
        </Button>
      </div>

      {/* Table */}
      <InstructorMakeupsTable
        students={students}
        locale={locale}
        onViewDetail={handleViewDetail}
        onExtend={handleExtend}
        onCancel={handleCancel}
      />

      {/* Group Makeups List */}
      {groupMakeups.length > 0 && (
        <GroupMakeupsList
          groupMakeups={groupMakeups}
          locale={locale}
          onCancel={handleCancelGroupMakeup}
          onRemind={handleRemindParticipants}
          onViewDetails={handleViewGroupMakeupDetails}
        />
      )}

      {/* Dialogs */}
      <ExtendDeadlineDialog
        open={extendDialogOpen}
        onOpenChange={setExtendDialogOpen}
        student={selectedStudent}
        locale={locale}
        onConfirm={handleExtendConfirm}
      />

      <CancelCreditDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        student={selectedStudent}
        locale={locale}
        onConfirm={handleCancelConfirm}
      />

      <MakeupDetailSheet
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        student={selectedStudent}
        locale={locale}
        onExtend={(studentId, makeupId) => {
          const student = students.find((s) => s.studentId === studentId);
          if (student) handleExtend(student);
        }}
        onCancel={(studentId, makeupId) => {
          const student = students.find((s) => s.studentId === studentId);
          if (student) handleCancel(student);
        }}
      />

      <ProposeGroupMakeupDialog
        open={groupMakeupDialogOpen}
        onOpenChange={setGroupMakeupDialogOpen}
        students={students}
        locale={locale}
        onConfirm={handleGroupMakeupConfirm}
      />
    </div>
  );
}
