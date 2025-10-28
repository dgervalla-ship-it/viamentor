/**
 * VIAMENTOR Student Detail Page
 *
 * Page principale détail élève avec header Hero UI, tabs navigation et quick actions sidebar
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContextualNavigation } from "@/viamentor/data/viamentor-contextual-navigation";
import { ContextualNavigationBar } from "@/viamentor/components/viamentor-contextual-navigation-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StudentDetailHeader } from "@/viamentor/components/viamentor-student-detail-header";
import { StudentInformationsTab } from "@/viamentor/components/viamentor-student-informations-tab";
import { StudentProgressionTab } from "@/viamentor/components/viamentor-student-progression-tab";
import { StudentDocumentsTab } from "@/viamentor/components/viamentor-student-documents-tab";
import { StudentInvoicesTab } from "@/viamentor/components/viamentor-student-invoices-tab";
import { StudentPlanningTab } from "@/viamentor/components/viamentor-student-planning-tab";
import { StudentHistoryTab } from "@/viamentor/components/viamentor-student-history-tab";
import { QuickActionsSidebar } from "@/viamentor/components/viamentor-student-quick-actions";
import {
  MOCK_STUDENT_DETAIL,
  MOCK_LESSONS,
  MOCK_PROGRESS_THEMES,
  MOCK_EXAM_RECORDS,
  MOCK_DOCUMENTS,
  MOCK_STUDENT_INVOICES,
  MOCK_CALENDAR_EVENTS,
  MOCK_AUDIT_LOG,
} from "@/viamentor/data/viamentor-student-detail-data";
import { useStudentDetailTranslations } from "@/viamentor/data/viamentor-student-detail-i18n";
import type { StudentDetailLocale } from "@/viamentor/data/viamentor-student-detail-data";
import { MOCK_STUDENTS } from "@/viamentor/data/viamentor-students-data";

export function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [locale] = useState<StudentDetailLocale>("fr");
  const [activeTab, setActiveTab] = useState("informations");
  const t = useStudentDetailTranslations(locale);

  // In real app, fetch student data based on id
  const student = MOCK_STUDENT_DETAIL;

  // Contextual navigation
  const navigation = useContextualNavigation({
    entityType: "students",
    currentId: id || "1",
    items: MOCK_STUDENTS,
    getItemId: (s) => s.id,
    getItemName: (s) => s.fullName,
    getItemAvatar: (s) => s.avatar,
    getItemStatus: (s) => s.status,
    getItemCategory: (s) => s.category,
    listPath: "/students",
    similarItemsCount: 5,
  });

  // Build context label from URL params
  const getContextLabel = () => {
    // In real app, parse from searchParams
    return "Élèves actifs • Catégorie B";
  };

  // Count badges for tabs
  const documentsCount = MOCK_DOCUMENTS.length;
  const invoicesCount = MOCK_STUDENT_INVOICES.filter(
    (inv) => inv.status !== "paid"
  ).length;
  const upcomingLessonsCount = MOCK_CALENDAR_EVENTS.filter(
    (e) => e.status === "scheduled" || e.status === "today"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Contextual Navigation Bar */}
      <ContextualNavigationBar
        navigation={navigation}
        locale={locale}
        entityName={student.fullName}
        contextLabel={getContextLabel()}
      />

      {/* Header */}
      <StudentDetailHeader
        student={student}
        locale={locale}
        onEdit={() => console.log("Edit student")}
        onBookLesson={() => console.log("Book lesson")}
        onCreateInvoice={() => console.log("Create invoice")}
        onDelete={() => console.log("Delete student")}
        onPrint={() => console.log("Print file")}
        onShare={() => console.log("Share link")}
        onStatusChange={(status) => console.log("Status change:", status)}
        onAvatarChange={(file) => console.log("Avatar change:", file.name)}
      />

      {/* Main Content with Sidebar */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          {/* Tabs Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="informations">
                  {t.tabInformations}
                </TabsTrigger>
                <TabsTrigger value="progression">
                  {t.tabProgression}
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <span className="flex items-center gap-2">
                    {t.tabDocuments}
                    {documentsCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {documentsCount}
                      </Badge>
                    )}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="invoices">
                  <span className="flex items-center gap-2">
                    {t.tabInvoices}
                    {invoicesCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {invoicesCount}
                      </Badge>
                    )}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="planning">
                  <span className="flex items-center gap-2">
                    {t.tabPlanning}
                    {upcomingLessonsCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {upcomingLessonsCount}
                      </Badge>
                    )}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="history">{t.tabHistory}</TabsTrigger>
              </TabsList>

              <TabsContent value="informations" className="mt-0">
                <StudentInformationsTab
                  student={student}
                  locale={locale}
                  onUpdate={async (field, value) => {
                    console.log("Update:", field, value);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                  }}
                  onAddCategory={() => console.log("Add category")}
                  onAddLessons={() => console.log("Add lessons")}
                  onCollectPayment={() => console.log("Collect payment")}
                />
              </TabsContent>

              <TabsContent value="progression" className="mt-0">
                <StudentProgressionTab
                  lessons={MOCK_LESSONS}
                  themes={MOCK_PROGRESS_THEMES}
                  exams={MOCK_EXAM_RECORDS}
                  locale={locale}
                  onEvaluateTheme={(themeId, rating, comment) =>
                    console.log("Evaluate:", themeId, rating, comment)
                  }
                  onRecordExamResult={(examType, result) =>
                    console.log("Record exam:", examType, result)
                  }
                  onGenerateAttestation={() =>
                    console.log("Generate attestation")
                  }
                  onPlanTargetedLessons={(themeIds) =>
                    console.log("Plan lessons:", themeIds)
                  }
                />
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <StudentDocumentsTab
                  documents={MOCK_DOCUMENTS}
                  locale={locale}
                  onUpload={(files) => console.log("Upload:", files)}
                  onDownload={(doc) => console.log("Download:", doc)}
                  onPreview={(doc) => console.log("Preview:", doc)}
                  onRename={(doc) => console.log("Rename:", doc)}
                  onDelete={(doc) => console.log("Delete:", doc)}
                  onRequestDocuments={() => console.log("Request documents")}
                />
              </TabsContent>

              <TabsContent value="invoices" className="mt-0">
                <StudentInvoicesTab
                  invoices={MOCK_STUDENT_INVOICES}
                  locale={locale}
                  onNewInvoice={() => console.log("New invoice")}
                  onViewInvoice={(inv) => console.log("View:", inv)}
                  onSendEmail={(inv) => console.log("Send email:", inv)}
                  onMarkAsPaid={(inv) => console.log("Mark paid:", inv)}
                  onCollectPayment={() => console.log("Collect payment")}
                />
              </TabsContent>

              <TabsContent value="planning" className="mt-0">
                <StudentPlanningTab
                  events={MOCK_CALENDAR_EVENTS}
                  locale={locale}
                  onBookLesson={() => console.log("Book lesson")}
                  onModifyEvent={(event) => console.log("Modify:", event)}
                  onCancelEvent={(event) => console.log("Cancel:", event)}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <StudentHistoryTab
                  logs={MOCK_AUDIT_LOG}
                  locale={locale}
                  onExport={() => console.log("Export CSV")}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions Sidebar */}
          <QuickActionsSidebar
            student={student}
            locale={locale}
            onBookLesson={() => {
              setActiveTab("planning");
              console.log("Book lesson");
            }}
            onCreateInvoice={() => {
              setActiveTab("invoices");
              console.log("Create invoice");
            }}
            onSendEmail={() => console.log("Send email")}
            onCall={() => console.log("Call")}
            onSendSMS={() => console.log("Send SMS")}
            onAddNote={() => console.log("Add note")}
            onViewDocuments={() => setActiveTab("documents")}
            onViewProgress={() => setActiveTab("progression")}
          />
        </div>
      </div>
    </div>
  );
}
