/**
 * VIAMENTOR - Instructors Analytics Page
 * Page principale analytics performance moniteurs
 */

import { useState } from "react";
import {
  TrendingUpIcon,
  UserIcon,
  ClockIcon,
  AwardIcon,
  StarIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { InstructorsAnalyticsHeader } from "@/polymet/components/viamentor-instructors-analytics-header";
import { PerformanceRankingTable } from "@/polymet/components/viamentor-performance-ranking-table";
import { InstructorDetailAnalytics } from "@/polymet/components/viamentor-instructor-detail-analytics";
import { WorkloadAnalysisSection } from "@/polymet/components/viamentor-workload-analysis-section";
import { CategoriesExpertiseSection } from "@/polymet/components/viamentor-categories-expertise-section";
import { SatisfactionByInstructor } from "@/polymet/components/viamentor-satisfaction-by-instructor";
import {
  mockPerformanceStats,
  mockInstructorRankings,
  mockInstructorDetail,
  mockWorkloadData,
  mockCategoryExpertise,
  mockSatisfactionData,
  type PerformanceLocale,
} from "@/polymet/data/viamentor-instructors-performance-data";

interface InstructorsAnalyticsPageProps {
  locale?: PerformanceLocale;
}

export function InstructorsAnalyticsPage({
  locale = "fr",
}: InstructorsAnalyticsPageProps) {
  const [selectedInstructorId, setSelectedInstructorId] = useState(
    mockInstructorDetail.id
  );
  const [selectedExpertiseId, setSelectedExpertiseId] = useState(
    mockCategoryExpertise[0].instructorId
  );

  // Header Stats
  const headerStats = (
    <InstructorsAnalyticsHeader stats={mockPerformanceStats} locale={locale} />
  );

  return (
    <ResponsivePageWrapper
      title="Analytics Performance Moniteurs"
      description="Analyse complète des performances, charge de travail et satisfaction"
      alerts={headerStats}
      sections={[
        {
          id: "ranking",
          label: "Classement",
          icon: <TrendingUpIcon className="h-4 w-4" />,

          content: (
            <PerformanceRankingTable
              rankings={mockInstructorRankings}
              locale={locale}
              currentUserId="inst-002"
              onViewDetail={(instructor) => {
                setSelectedInstructorId(instructor.id);
              }}
              onViewPlanning={(instructor) =>
                console.log("View planning:", instructor.name)
              }
              onExport={() => console.log("Export ranking")}
            />
          ),
        },
        {
          id: "detail",
          label: "Détail Moniteur",
          icon: <UserIcon className="h-4 w-4" />,

          content: (
            <InstructorDetailAnalytics
              instructors={[mockInstructorDetail]}
              selectedId={selectedInstructorId}
              locale={locale}
              onSelectInstructor={setSelectedInstructorId}
            />
          ),
        },
        {
          id: "workload",
          label: "Charge Travail",
          icon: <ClockIcon className="h-4 w-4" />,

          content: (
            <WorkloadAnalysisSection
              workloadData={mockWorkloadData}
              locale={locale}
              onAdjustAvailability={(id) =>
                console.log("Adjust availability:", id)
              }
              onReassignStudents={(id) => console.log("Reassign students:", id)}
            />
          ),
        },
        {
          id: "expertise",
          label: "Expertise",
          icon: <AwardIcon className="h-4 w-4" />,

          content: (
            <CategoriesExpertiseSection
              expertiseData={mockCategoryExpertise}
              selectedId={selectedExpertiseId}
              locale={locale}
              onSelectInstructor={setSelectedExpertiseId}
            />
          ),
        },
        {
          id: "satisfaction",
          label: "Satisfaction",
          icon: <StarIcon className="h-4 w-4" />,

          content: (
            <SatisfactionByInstructor
              satisfactionData={mockSatisfactionData}
              locale={locale}
              onTraining={(id) => console.log("Training:", id)}
              onFeedback={(id) => console.log("Feedback:", id)}
              onReassign={(id) => console.log("Reassign:", id)}
            />
          ),
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
    />
  );
}
