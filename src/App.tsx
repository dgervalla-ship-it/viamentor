/**
 * VIAMENTOR System Prototype
 *
 * Prototype de routing pour la démonstration du système VIAMENTOR
 * Routes : /login, /system, /complete, /report, /tenants, /compliance/gdpr, /finance, /finance/invoices, /finance/analytics, /students, /students/:id, /instructors, /instructors/:id
 *
 * @module prototypes/viamentor-system-prototype
 * @version 3.0.0
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MarketingHomepage } from "@/polymet/pages/viamentor-marketing-homepage";
import { PourAutoEcolesPage } from "@/polymet/pages/viamentor-pour-auto-ecoles-page";
import { PourMoniteursPage } from "@/polymet/pages/viamentor-pour-moniteurs-page";
import { PourElevesPage } from "@/polymet/pages/viamentor-pour-eleves-page";
import { PricingPage } from "@/polymet/pages/viamentor-pricing-page";
import { DemoPage } from "@/polymet/pages/viamentor-demo-page";
import { FAQPage } from "@/polymet/pages/viamentor-faq-page";
import { LegalTermsPage } from "@/polymet/pages/viamentor-legal-terms-page";
import { PrivacyPolicyPage } from "@/polymet/pages/viamentor-privacy-policy-page";
import { CookiesPolicyPage } from "@/polymet/pages/viamentor-cookies-policy-page";
import { AboutPage } from "@/polymet/pages/viamentor-about-page";
import { BlogPage } from "@/polymet/pages/viamentor-blog-page";
import { BlogArticlePage } from "@/polymet/pages/viamentor-blog-article-page";
import { ResourcesPage } from "@/polymet/pages/viamentor-resources-page";
import { CaseStudiesPage } from "@/polymet/pages/viamentor-case-studies-page";
import { ViaMenutorSystemDemo } from "@/polymet/pages/viamentor-system-demo";
import { ViaMenutorLoginPage } from "@/polymet/pages/viamentor-login-page";
import { ViaMenutorCompleteDemo } from "@/polymet/pages/viamentor-complete-demo";
import { ViaMenutorReportPage } from "@/polymet/pages/viamentor-report-page";
import { ViaMenutorTenantsPage } from "@/polymet/pages/viamentor-tenants-page";
import { ViaMenutorTenantDetailPage } from "@/polymet/pages/viamentor-tenant-detail-page";
import { ViaMenutorGDPRCompliancePage } from "@/polymet/pages/viamentor-gdpr-compliance-page";
import { ViaMenutorFinancePage } from "@/polymet/pages/viamentor-finance-page";
import { FinanceDashboardPage } from "@/polymet/pages/viamentor-finance-dashboard-page";
import { VATReportsPage } from "@/polymet/pages/viamentor-vat-reports-page";
import { ViaMenutorInvoicesPage } from "@/polymet/pages/viamentor-invoices-page";
import { InvoicesListPage } from "@/polymet/pages/viamentor-invoices-list-page";
import { RevenueAnalyticsPage } from "@/polymet/pages/viamentor-revenue-analytics-page";
import { AnalyticsCentralPage } from "@/polymet/pages/viamentor-analytics-central-page";
import { BillingDashboardPage } from "@/polymet/pages/viamentor-billing-dashboard-page";
import { PaymentsPage } from "@/polymet/pages/viamentor-payments-page";
import { StudentsPage } from "@/polymet/pages/viamentor-students-page";
import { StudentsNewPage } from "@/polymet/pages/viamentor-students-new-page";
import { StudentsImportPage } from "@/polymet/pages/viamentor-students-import-page";
import { StudentsArchivePage } from "@/polymet/pages/viamentor-students-archive-page";
import { StudentDetailPage } from "@/polymet/pages/viamentor-student-detail-page";
import { ViaMenutorInstructorsPage } from "@/polymet/pages/viamentor-instructors-page";
import { InstructorsNewPage } from "@/polymet/pages/viamentor-instructors-new-page";
import { ViaMenutorInstructorDetailPage } from "@/polymet/pages/viamentor-instructor-detail-page";
import { InstructorsAnalyticsPage } from "@/polymet/pages/viamentor-instructors-analytics-page";
import { VehiclesAnalyticsPage } from "@/polymet/pages/viamentor-vehicles-analytics-page";
import { VehiclesPage } from "@/polymet/pages/viamentor-vehicles-page";
import { VehicleDetailPage } from "@/polymet/pages/viamentor-vehicle-detail-page";
import { FinancialAnalyticsPage } from "@/polymet/pages/viamentor-financial-analytics-page";
import { ExamsAnalyticsPage } from "@/polymet/pages/viamentor-exams-analytics-page";
import { PlanningPage } from "@/polymet/pages/viamentor-planning-page";
import { PlanningImportPage } from "@/polymet/pages/viamentor-planning-import-page";
import { PlanningImportHistoryPage } from "@/polymet/pages/viamentor-planning-import-history-page";
import { PlanningExportPage } from "@/polymet/pages/viamentor-planning-export-page";
import { PricingSettingsPage } from "@/polymet/pages/viamentor-pricing-settings-page";
import { PricingManagementPage } from "@/polymet/pages/viamentor-pricing-management-page";
import { NotificationsSettingsPage } from "@/polymet/pages/viamentor-notifications-settings-page";
import { NotificationsCenterPage } from "@/polymet/pages/viamentor-notifications-center-page";
import { DashboardSchoolPage } from "@/polymet/pages/viamentor-dashboard-school-page";
import { DashboardInstructorPage } from "@/polymet/pages/viamentor-dashboard-instructor-page";
import { DashboardStudentPage } from "@/polymet/pages/viamentor-dashboard-student-page";
import { LayoutDemoPage } from "@/polymet/pages/viamentor-layout-demo-page";
import { ViaMenutorSupabaseDemoPage } from "@/polymet/pages/viamentor-supabase-demo-page";
import { ViaMenutorCredentialsPage } from "@/polymet/pages/viamentor-credentials-page";
import { ViaMenutorNoAuthInfoPage } from "@/polymet/pages/viamentor-no-auth-info-page";
import { NavigationDemoPage } from "@/polymet/pages/viamentor-navigation-demo-page";
import { ViaMenutorQuickActionsDemoPage } from "@/polymet/pages/viamentor-quick-actions-demo-page";
import { StudentBookLessonPage } from "@/polymet/pages/viamentor-student-book-lesson-page";
import { StudentLessonsPage } from "@/polymet/pages/viamentor-student-lessons-page";
import StudentProgressionPage from "@/polymet/pages/viamentor-student-progression-page";
import { StudentBillingPage } from "@/polymet/pages/viamentor-student-billing-page";
import { StudentProfilePage } from "@/polymet/pages/viamentor-student-profile-page";
import { StudentPlanningPage } from "@/polymet/pages/viamentor-student-planning-page";
import { InstructorPlanningPage } from "@/polymet/pages/viamentor-instructor-planning-page";
import { InstructorStudentsPage } from "@/polymet/pages/viamentor-instructor-students-page";
import { LessonEvaluationPage } from "@/polymet/pages/viamentor-lesson-evaluation-page";
import { InstructorProfilePage } from "@/polymet/pages/viamentor-instructor-profile-page";
import { SecretaryDashboardPage } from "@/polymet/pages/viamentor-secretary-dashboard-page";
import { SecretaryRegistrationsPage } from "@/polymet/pages/viamentor-secretary-registrations-page";
import { StaffPlanningPage } from "@/polymet/pages/viamentor-staff-planning-page";
import { StaffMessagesPage } from "@/polymet/pages/viamentor-staff-messages-page";
import { StaffTasksPage } from "@/polymet/pages/viamentor-staff-tasks-page";
import { RoomsManagementPage } from "@/polymet/pages/viamentor-rooms-management-page";
import { CourseTypesSettingsPage } from "@/polymet/pages/viamentor-course-types-settings-page";
import OnboardingPage from "@/polymet/pages/viamentor-onboarding-page";
import { MakeupsSettingsPage } from "@/polymet/pages/viamentor-makeups-settings-page";
import StudentMakeupsPage from "@/polymet/pages/viamentor-student-makeups-page";
import { ContactPublicPage } from "@/polymet/pages/viamentor-contact-public-page";
import { ThankYouPage } from "@/polymet/pages/viamentor-thank-you-page";
import { PixelsHealthPage } from "@/polymet/pages/viamentor-pixels-health-page";
import { StaffProspectsPage } from "@/polymet/pages/viamentor-staff-prospects-page";
import { StaffCampaignsPage } from "@/polymet/pages/viamentor-staff-campaigns-page";
import { ReviewsSettingsPage } from "@/polymet/pages/viamentor-reviews-settings-page";
import { ReviewsVerificationPage } from "@/polymet/pages/viamentor-reviews-verification-page";
import { ReviewsDashboardPage } from "@/polymet/pages/viamentor-reviews-dashboard-page";
import { ViaMenutorRBACAdminPage } from "@/polymet/pages/viamentor-rbac-admin-page";
import { AdminRolesPage } from "@/polymet/pages/viamentor-admin-roles-page";
import { AdminDbHealthPage } from "@/polymet/pages/viamentor-admin-db-health-page";
import { SecurityBreachesPage } from "@/polymet/pages/viamentor-security-breaches-page";
import { SuperAdminPage } from "@/polymet/pages/viamentor-super-admin-page";
import { ViaMenutorPlatformAdminPage } from "@/polymet/pages/viamentor-platform-admin-page";
import { ViaMenutorSchoolAdminPage } from "@/polymet/pages/viamentor-school-admin-page";
import { GlobalUsersPage } from "@/polymet/pages/viamentor-global-users-page";
import { SystemHealthPage } from "@/polymet/pages/viamentor-system-health-page";
import { SecurityAlertsPage } from "@/polymet/pages/viamentor-security-alerts-page";
import { AuditLogsPage } from "@/polymet/pages/viamentor-audit-logs-page";
import { PlaceholderPage } from "@/polymet/pages/viamentor-placeholder-page";
import { UsersManagementPage } from "@/polymet/pages/viamentor-users-management-page";
import GroupLessonsPage from "@/polymet/pages/viamentor-group-lessons-page";
import BillingRemindersPage from "@/polymet/pages/viamentor-billing-reminders-page";
import CampaignsAnalyticsPage from "@/polymet/pages/viamentor-campaigns-analytics-page";
import AvailabilityGlobalPage from "@/polymet/pages/viamentor-availability-global-page";
import InstructorAvailabilityPage from "@/polymet/pages/viamentor-instructor-availability-page";
import { PlatformAnalyticsPage } from "@/polymet/pages/viamentor-platform-analytics-page";
import { SystemConfigPage } from "@/polymet/pages/viamentor-system-config-page";
import { FeatureFlagsPage } from "@/polymet/pages/viamentor-feature-flags-page";
import { SystemIntegrationsPage } from "@/polymet/pages/viamentor-system-integrations-page";
import { DocumentationPage } from "@/polymet/pages/viamentor-documentation-page";
import { SupportTicketsPage } from "@/polymet/pages/viamentor-support-tickets-page";
import { GlobalReportsPage } from "@/polymet/pages/viamentor-global-reports-page";
import { StaffManagementPage } from "@/polymet/pages/viamentor-staff-management-page";
import { InstructorEvaluationsPage } from "@/polymet/pages/viamentor-instructor-evaluations-page";
import InstructorPerformancePage from "@/polymet/pages/viamentor-instructor-performance-page";
import InstructorEarningsPage from "@/polymet/pages/viamentor-instructor-earnings-page";
import SchoolSettingsPage from "@/polymet/pages/viamentor-school-settings-page";
import CategoriesSettingsPage from "@/polymet/pages/viamentor-categories-settings-page";
import { InstructorLessonsPage } from "@/polymet/pages/viamentor-instructor-lessons-page";
import { SecretaryLessonsPage } from "@/polymet/pages/viamentor-secretary-lessons-page";
import { LessonsListPage } from "@/polymet/pages/viamentor-lessons-list-page";
import { LessonDetailPage } from "@/polymet/pages/viamentor-lesson-detail-page";
import { LessonsCalendarPage } from "@/polymet/pages/viamentor-lessons-calendar-page";
import { LessonsBookPage } from "@/polymet/pages/viamentor-lessons-book-page";
import { LessonsConflictsPage } from "@/polymet/pages/viamentor-lessons-conflicts-page";
import { ExamsListPage } from "@/polymet/pages/viamentor-exams-list-page";
import { ExamDetailPage } from "@/polymet/pages/viamentor-exam-detail-page";
import { ExamsBookPage } from "@/polymet/pages/viamentor-exams-book-page";
import { ExamsMockPage } from "@/polymet/pages/viamentor-exams-mock-page";
import { ExamsResultsPage } from "@/polymet/pages/viamentor-exams-results-page";
import { ExamsCalendarPage } from "@/polymet/pages/viamentor-exams-calendar-page";
import { TheoryCoursesListPage } from "@/polymet/pages/viamentor-theory-courses-list-page";
import { TheoryCourseDetailPage } from "@/polymet/pages/viamentor-theory-course-detail-page";
import { TheoryCourseBookPage } from "@/polymet/pages/viamentor-theory-course-book-page";
import InstructorManagerPage from "@/polymet/pages/viamentor-instructor-manager-page";
import MarketingManagerPage from "@/polymet/pages/viamentor-marketing-manager-page";
import { FinanceManagerPage } from "@/polymet/pages/viamentor-finance-manager-page";
import { AccountantPage } from "@/polymet/pages/viamentor-accountant-page";
import { SettingsCentralPage } from "@/polymet/pages/viamentor-settings-central-page";
import { GlobalSearchPage } from "@/polymet/pages/viamentor-global-search-page";
import { RecentPagesPage } from "@/polymet/pages/viamentor-recent-pages-page";
import { FavoritesPage } from "@/polymet/pages/viamentor-favorites-page";
import { ActivityHistoryPage } from "@/polymet/pages/viamentor-activity-history-page";
import { StudentExamsPage } from "@/polymet/pages/viamentor-student-exams-page";
import { StudentPaymentsPage } from "@/polymet/pages/viamentor-student-payments-page";
import { StudentDocumentsPage } from "@/polymet/pages/viamentor-student-documents-page";
import { StudentMessagesPage } from "@/polymet/pages/viamentor-student-messages-page";
import { StudentHelpPage } from "@/polymet/pages/viamentor-student-help-page";
import { StudentJourneyPage } from "@/polymet/pages/viamentor-student-journey-page";
import { StudentNextStepsPage } from "@/polymet/pages/viamentor-student-next-steps-page";
import { StudentMilestonesPage } from "@/polymet/pages/viamentor-student-milestones-page";
import { InstructorMessagesPage } from "@/polymet/pages/viamentor-instructor-messages-page";
import { InstructorHelpPage } from "@/polymet/pages/viamentor-instructor-help-page";
import { InstructorTodayPage } from "@/polymet/pages/viamentor-instructor-today-page";
import { InstructorWeekPage } from "@/polymet/pages/viamentor-instructor-week-page";
import { InstructorPrioritiesPage } from "@/polymet/pages/viamentor-instructor-priorities-page";
import { SecretaryStudentsPage } from "@/polymet/pages/viamentor-secretary-students-page";
import { SecretaryInstructorsPage } from "@/polymet/pages/viamentor-secretary-instructors-page";
import { SecretaryCalendarPage } from "@/polymet/pages/viamentor-secretary-calendar-page";
import { QuickBookLessonPage } from "@/polymet/pages/viamentor-quick-book-lesson-page";
import { QuickNewStudentPage } from "@/polymet/pages/viamentor-quick-new-student-page";
import { QuickNewInvoicePage } from "@/polymet/pages/viamentor-quick-new-invoice-page";
import { QuickReportAbsencePage } from "@/polymet/pages/viamentor-quick-report-absence-page";
import { MyWorkspacePage } from "@/polymet/pages/viamentor-my-workspace-page";
import { MyShortcutsPage } from "@/polymet/pages/viamentor-my-shortcuts-page";
import { MyWidgetsPage } from "@/polymet/pages/viamentor-my-widgets-page";
import { NotFoundPage } from "@/polymet/pages/viamentor-not-found-page";
import { UnauthorizedPage } from "@/polymet/pages/viamentor-unauthorized-page";
import { ErrorPage } from "@/polymet/pages/viamentor-error-page";
import { MaintenancePage } from "@/polymet/pages/viamentor-maintenance-page";
import { ViaMenutorMainLayout } from "@/polymet/layouts/viamentor-main-layout";
import { SmartHomeRedirect } from "@/polymet/components/viamentor-smart-home-redirect";
import { StudentTemporaryAccessPage } from "@/polymet/pages/viamentor-student-temporary-access-page";
import { InstructorTemporaryStudentsPage } from "@/polymet/pages/viamentor-instructor-temporary-students-page";
import { StudentAssignmentHistoryPage } from "@/polymet/pages/viamentor-student-assignment-history-page";
import { BusinessHoursSettingsPage } from "@/polymet/pages/viamentor-business-hours-settings-page";
import { CoursesCategoriesPage } from "@/polymet/pages/viamentor-courses-categories-page";
import { CoursesTypesPage } from "@/polymet/pages/viamentor-courses-types-page";
import { CoursesCalendarPage } from "@/polymet/pages/viamentor-courses-calendar-page";
import { CoursesSessionsPage } from "@/polymet/pages/viamentor-courses-sessions-page";

export default function ViaMenutorSystemPrototype() {
  return (
    <Router>
      <Routes>
        {/* Marketing Homepage - Landing page publique */}
        <Route path="/" element={<MarketingHomepage initialLocale="fr" />} />

        {/* Pages Personas Marketing */}
        <Route
          path="/pour-auto-ecoles"
          element={<PourAutoEcolesPage locale="fr" />}
        />

        <Route path="/tarifs" element={<PricingPage initialLocale="fr" />} />

        <Route path="/demo" element={<DemoPage initialLocale="fr" />} />

        <Route path="/faq" element={<FAQPage initialLocale="fr" />} />

        {/* Pages Légales */}
        <Route
          path="/mentions-legales"
          element={<LegalTermsPage initialLocale="fr" />}
        />

        <Route
          path="/confidentialite"
          element={<PrivacyPolicyPage initialLocale="fr" />}
        />

        <Route
          path="/cookies"
          element={<CookiesPolicyPage initialLocale="fr" />}
        />

        <Route path="/a-propos" element={<AboutPage initialLocale="fr" />} />

        {/* Blog Pages */}
        <Route path="/blog" element={<BlogPage initialLocale="fr" />} />

        <Route
          path="/blog/:slug"
          element={<BlogArticlePage initialLocale="fr" />}
        />

        {/* Resources Page */}
        <Route
          path="/ressources"
          element={<ResourcesPage initialLocale="fr" />}
        />

        {/* Case Studies Page */}
        <Route
          path="/cas-clients"
          element={<CaseStudiesPage initialLocale="fr" />}
        />

        <Route
          path="/pour-moniteurs"
          element={<PourMoniteursPage locale="fr" />}
        />

        <Route path="/pour-eleves" element={<PourElevesPage locale="fr" />} />

        {/* Smart Home Redirect - Redirige vers le dashboard approprié selon le rôle */}
        <Route path="/app" element={<SmartHomeRedirect />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorLoginPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* ERROR PAGES */}
        {/* ============================================================ */}

        {/* 404 Not Found Page */}
        <Route
          path="/not-found"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotFoundPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* 403 Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <UnauthorizedPage locale="fr" reason="permission" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Generic Error Page */}
        <Route
          path="/error"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ErrorPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Maintenance Mode Page */}
        <Route
          path="/maintenance"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MaintenancePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Supabase Mock Demo Page */}
        <Route
          path="/supabase-demo"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorSupabaseDemoPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Credentials Info Page */}
        <Route
          path="/credentials"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorCredentialsPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Onboarding Page - Configuration initiale tenant */}
        <Route
          path="/onboarding"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <OnboardingPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* No Auth Info Page - Avec Layout pour voir la Quick Actions Bar */}
        <Route
          path="/no-auth-info"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorNoAuthInfoPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Navigation Demo Page */}
        <Route
          path="/navigation-demo"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NavigationDemoPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Quick Actions Demo Page */}
        <Route
          path="/quick-actions-demo"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorQuickActionsDemoPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* QUICK ACTIONS ROUTES */}
        {/* ============================================================ */}

        {/* Quick Book Lesson */}
        <Route
          path="/quick/book-lesson"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickBookLessonPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Quick New Student */}
        <Route
          path="/quick/new-student"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickNewStudentPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Quick New Invoice */}
        <Route
          path="/quick/new-invoice"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickNewInvoicePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Quick Report Absence */}
        <Route
          path="/quick/report-absence"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickReportAbsencePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* NAVIGATION FEEDBACK ROUTES */}
        {/* ============================================================ */}

        {/* Global Search Page */}
        <Route
          path="/search"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <GlobalSearchPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Recent Pages */}
        <Route
          path="/recent"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <RecentPagesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <FavoritesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Activity History */}
        <Route
          path="/history"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ActivityHistoryPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* PERSONALIZATION ROUTES */}
        {/* ============================================================ */}

        {/* My Workspace */}
        <Route
          path="/my-workspace"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MyWorkspacePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* My Shortcuts */}
        <Route
          path="/shortcuts"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MyShortcutsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* My Widgets */}
        <Route
          path="/widgets"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MyWidgetsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* System Demo Page */}
        <Route
          path="/system"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorSystemDemo />
            </ViaMenutorMainLayout>
          }
        />

        {/* Complete Demo Page (All Systems) */}
        <Route
          path="/complete"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorCompleteDemo />
            </ViaMenutorMainLayout>
          }
        />

        {/* Conformity Report Page */}
        <Route
          path="/report"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorReportPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Tenants Management Page */}
        <Route
          path="/tenants"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorTenantsPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Tenant Detail Page */}
        <Route
          path="/tenants/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorTenantDetailPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* GDPR Compliance Page */}
        <Route
          path="/compliance/gdpr"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorGDPRCompliancePage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Finance Admin Page */}
        <Route
          path="/finance"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorFinancePage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Finance Dashboard Page */}
        <Route
          path="/finance/dashboard"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <FinanceDashboardPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* VAT Reports Page */}
        <Route
          path="/finance/vat-reports"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <VATReportsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Billing Dashboard Page */}
        <Route
          path="/billing"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <BillingDashboardPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Payments Management Page */}
        <Route
          path="/payments"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PaymentsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Finance Invoices Management Page */}
        <Route
          path="/finance/invoices"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorInvoicesPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Invoices List Page */}
        <Route
          path="/invoices"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InvoicesListPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Analytics Central Page - Hub principal pour tous les analytics */}
        <Route
          path="/analytics"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AnalyticsCentralPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Redirect ancien chemin /finance/analytics vers /analytics?tab=revenue */}
        <Route
          path="/finance/analytics"
          element={<Navigate to="/analytics" replace />}
        />

        {/* Students Management Page */}
        <Route
          path="/students"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Students New Page - Wizard de création */}
        <Route
          path="/students/new"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsNewPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Students Import Page */}
        <Route
          path="/students/import"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsImportPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Students Archive Page */}
        <Route
          path="/students/archive"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsArchivePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Detail Page */}
        <Route
          path="/students/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentDetailPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Temporary Access Page */}
        <Route
          path="/school/students/:studentId/temporary-access"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentTemporaryAccessPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Assignment History Page */}
        <Route
          path="/school/students/:studentId/assignment-history"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentAssignmentHistoryPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Manager Dashboard */}
        <Route
          path="/instructor-manager"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorManagerPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Marketing Manager Dashboard */}
        <Route
          path="/marketing-manager"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MarketingManagerPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Finance Manager Dashboard */}
        <Route
          path="/finance-manager"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <FinanceManagerPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Accountant Dashboard */}
        <Route
          path="/accountant"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AccountantPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructors Management Page */}
        <Route
          path="/instructors"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorInstructorsPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructors New Page - Wizard de création */}
        <Route
          path="/instructors/new"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorsNewPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Detail Page */}
        <Route
          path="/instructors/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorInstructorDetailPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Redirect /instructors/analytics vers /analytics?tab=instructors */}
        <Route
          path="/instructors/analytics"
          element={<Navigate to="/analytics?tab=instructors" replace />}
        />

        {/* Vehicles Management Page */}
        <Route
          path="/vehicles"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <VehiclesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Maintenance Management Page */}
        <Route
          path="/maintenance"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MaintenancePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Vehicle Detail Page */}
        <Route
          path="/vehicles/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <VehicleDetailPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Redirect /vehicles/analytics vers /analytics?tab=vehicles */}
        <Route
          path="/vehicles/analytics"
          element={<Navigate to="/analytics?tab=vehicles" replace />}
        />

        {/* Redirect /financial/analytics vers /analytics?tab=financial */}
        <Route
          path="/financial/analytics"
          element={<Navigate to="/analytics?tab=financial" replace />}
        />

        {/* Redirect /exams/analytics vers /analytics?tab=exams */}
        <Route
          path="/exams/analytics"
          element={<Navigate to="/analytics?tab=exams" replace />}
        />

        {/* Exams Management Pages */}
        <Route
          path="/exams"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsListPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/exams/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamDetailPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/exams/book"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsBookPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/exams/mock"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsMockPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Exams Results Page */}
        <Route
          path="/exams/results"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsResultsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Exams Calendar Page */}
        <Route
          path="/exams/calendar"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsCalendarPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Theory Courses Pages */}
        <Route
          path="/theory-courses"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <TheoryCoursesListPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/theory-courses/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <TheoryCourseDetailPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/theory-courses/book"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <TheoryCourseBookPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Planning & Lessons Pages - School Admin */}
        <Route
          path="/planning"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Planning Import ICS Page */}
        <Route
          path="/planning/import"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningImportPage locale="fr" tenant="auto-ecole-geneve" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Planning Import History Page */}
        <Route
          path="/planning/import/history"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningImportHistoryPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Planning Export ICS Page */}
        <Route
          path="/planning/export"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningExportPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Lessons Management Pages */}
        <Route
          path="/lessons"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsListPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/lessons/:id"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonDetailPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/lessons/calendar"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsCalendarPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/lessons/book"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsBookPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/lessons/conflicts"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsConflictsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Planning & Lessons Pages */}
        <Route
          path="/instructor/planning"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorPlanningPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Lessons List - IMPORTANT: Route parent pour breadcrumb */}
        <Route
          path="/instructor/lessons"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorLessonsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Students Page */}
        <Route
          path="/instructor/students"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorStudentsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Temporary Students Page */}
        <Route
          path="/instructor/temporary-students"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorTemporaryStudentsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Settings Central Page - Hub principal pour tous les paramètres */}
        <Route
          path="/settings"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SettingsCentralPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Pricing Settings Page */}
        <Route
          path="/settings/pricing"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PricingSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Pricing Management Page - Complete */}
        <Route
          path="/pricing"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PricingManagementPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Notifications Center Page */}
        <Route
          path="/notifications"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotificationsCenterPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Notifications Settings Page */}
        <Route
          path="/settings/notifications"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotificationsSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Layout Demo Page */}
        <Route
          path="/layout-demo"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LayoutDemoPage />
            </ViaMenutorMainLayout>
          }
        />

        {/* Dashboard Pages with Layout - Pattern uniforme /role/dashboard */}

        {/* School Admin Dashboard */}
        <Route
          path="/school/dashboard"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorSchoolAdminPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Dashboard */}
        <Route
          path="/instructor/dashboard"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <DashboardInstructorPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <DashboardStudentPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Redirects pour compatibilité anciens liens */}
        <Route
          path="/dashboard"
          element={<Navigate to="/school/dashboard" replace />}
        />

        <Route
          path="/instructor-dashboard"
          element={<Navigate to="/instructor/dashboard" replace />}
        />

        <Route
          path="/student-dashboard"
          element={<Navigate to="/student/dashboard" replace />}
        />

        {/* Student Planning & Lessons Pages */}
        <Route
          path="/student/planning"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentPlanningPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/student/lessons"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentLessonsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/student/lessons/book"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentBookLessonPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Progression Page */}
        <Route
          path="/student/progression"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentProgressionPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Billing Page */}
        <Route
          path="/student/billing"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentBillingPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Profile Page */}
        <Route
          path="/student/profile"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentProfilePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Lesson Evaluation Page - Route enfant de /instructor/lessons */}
        <Route
          path="/instructor/lessons/:lessonId/evaluate"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonEvaluationPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Profile Page */}
        <Route
          path="/instructor/profile"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorProfilePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Secretary Dashboard Page */}
        <Route
          path="/secretary/dashboard"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryDashboardPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Secretary Registrations Page */}
        <Route
          path="/secretary/registrations"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryRegistrationsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Secretary Planning & Lessons Pages */}
        <Route
          path="/secretary/planning"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffPlanningPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        <Route
          path="/secretary/lessons"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryLessonsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Redirect ancien chemin /staff/planning vers /secretary/planning */}
        <Route
          path="/staff/planning"
          element={<Navigate to="/secretary/planning" replace />}
        />

        {/* Staff Messages Page */}
        <Route
          path="/staff/messages"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffMessagesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Staff Tasks Page */}
        <Route
          path="/staff/tasks"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffTasksPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Rooms Management Page */}
        <Route
          path="/rooms"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <RoomsManagementPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Course Types Settings Page */}
        <Route
          path="/settings/course-types"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CourseTypesSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Makeups Settings Page */}
        <Route
          path="/settings/makeups"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MakeupsSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Makeups Page */}
        <Route
          path="/student/makeups"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentMakeupsPage locale="fr" featureMakeupsEnabled={true} />
            </ViaMenutorMainLayout>
          }
        />

        {/* Public Contact Page - Accessible sans authentification */}
        <Route
          path="/contact"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ContactPublicPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Thank You Page - Après soumission formulaire */}
        <Route
          path="/merci"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ThankYouPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Pixels Health Monitoring Page */}
        <Route
          path="/marketing/pixels/health"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PixelsHealthPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Staff Prospects CRM Page */}
        <Route
          path="/staff/prospects"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffProspectsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Staff Marketing Campaigns Page */}
        <Route
          path="/staff/marketing/campaigns"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffCampaignsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Google Reviews Settings Page */}
        <Route
          path="/settings/reviews"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ReviewsSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Reviews Verification Page */}
        <Route
          path="/reviews/verification"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ReviewsVerificationPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Redirect /reviews/dashboard vers /analytics?tab=reviews */}
        <Route
          path="/reviews/dashboard"
          element={<Navigate to="/analytics?tab=reviews" replace />}
        />

        {/* RBAC Admin Page - Super Admin & Platform Admin */}
        <Route
          path="/admin/rbac"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorRBACAdminPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Admin Roles Management Page - Super Admin & Platform Admin */}
        <Route
          path="/admin/roles"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AdminRolesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Admin Database Health Page - Super Admin & Platform Admin */}
        <Route
          path="/admin/db-health"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AdminDbHealthPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Security Breaches Page - DPO & Super Admin */}
        <Route
          path="/security/breaches"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecurityBreachesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Platform Admin Dashboard - Platform Admin Only */}
        <Route
          path="/platform-admin"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorPlatformAdminPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Super Admin Dashboard - Super Admin Only */}
        <Route
          path="/super-admin"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SuperAdminPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* School Admin Dashboard - School Admin Only */}
        <Route
          path="/school-admin"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViaMenutorSchoolAdminPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* SUPER ADMIN ROUTES */}
        {/* ============================================================ */}

        {/* Global Users Management */}
        <Route
          path="/users"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <GlobalUsersPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* System Health Monitoring */}
        <Route
          path="/system/health"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <SystemHealthPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Security Alerts */}
        <Route
          path="/security/alerts"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <SecurityAlertsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Audit Logs */}
        <Route
          path="/audit"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <AuditLogsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Platform Analytics - Super Admin uniquement */}
        <Route
          path="/platform/analytics"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <PlatformAnalyticsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* System Configuration */}
        <Route
          path="/config"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <SystemConfigPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Feature Flags */}
        <Route
          path="/config/features"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <FeatureFlagsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Integrations */}
        <Route
          path="/config/integrations"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <SystemIntegrationsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Documentation */}
        <Route
          path="/docs"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <DocumentationPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* PLATFORM ADMIN ROUTES */}
        {/* ============================================================ */}

        {/* Support Tickets */}
        <Route
          path="/support"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <SupportTicketsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Global Reports */}
        <Route
          path="/reports"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="viamentor-platform">
              <GlobalReportsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* SCHOOL ADMIN ROUTES */}
        {/* ============================================================ */}

        {/* Staff Management */}
        <Route
          path="/staff"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffManagementPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructors Availability - Global (School Admin) */}
        <Route
          path="/availability"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AvailabilityGlobalPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Group Lessons */}
        <Route
          path="/group-lessons"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <GroupLessonsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Billing Reminders */}
        <Route
          path="/billing/reminders"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <BillingRemindersPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Campaigns Analytics */}
        <Route
          path="/campaigns/analytics"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CampaignsAnalyticsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* School Settings */}
        <Route
          path="/settings/school"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SchoolSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Categories Settings */}
        <Route
          path="/settings/categories"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CategoriesSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Business Hours Settings */}
        <Route
          path="/settings/hours"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <BusinessHoursSettingsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Courses Categories Management */}
        <Route
          path="/school/courses/categories"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesCategoriesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Course Types Management - Par catégorie */}
        <Route
          path="/school/courses/categories/:categoryId/types"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesTypesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Courses Calendar - Vue mensuelle */}
        <Route
          path="/school/courses/calendar"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesCalendarPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Courses Sessions - Gestion séances individuelles */}
        <Route
          path="/school/courses/sessions"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesSessionsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Integrations Settings */}
        <Route
          path="/settings/integrations"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlaceholderPage
                title="Intégrations"
                description="Configuration des intégrations tierces"
              />
            </ViaMenutorMainLayout>
          }
        />

        {/* Users Settings */}
        <Route
          path="/settings/users"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <UsersManagementPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* INSTRUCTOR ROUTES */}
        {/* ============================================================ */}

        {/* Instructor Evaluations */}
        <Route
          path="/instructor/evaluations"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorEvaluationsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Availability - Personal (Instructor) */}
        <Route
          path="/instructor/availability"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorAvailabilityPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Makeups */}
        <Route
          path="/instructor/makeups"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlaceholderPage
                title="Rattrapages Élèves"
                description="Gestion des crédits de rattrapage de mes élèves"
                backLink="/instructor-dashboard"
              />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Messages */}
        <Route
          path="/instructor/messages"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorMessagesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Help */}
        <Route
          path="/instructor/help"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorHelpPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Today - Ma Journée */}
        <Route
          path="/instructor/today"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorTodayPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Week - Ma Semaine */}
        <Route
          path="/instructor/week"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorWeekPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Priorities - Mes Priorités */}
        <Route
          path="/instructor/priorities"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorPrioritiesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Performance (Stats) */}
        <Route
          path="/instructor/performance"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorPerformancePage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Instructor Earnings */}
        <Route
          path="/instructor/earnings"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorEarningsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* STUDENT ROUTES */}
        {/* ============================================================ */}

        {/* Student Exams */}
        <Route
          path="/student/exams"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentExamsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Payments */}
        <Route
          path="/student/payments"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentPaymentsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Documents */}
        <Route
          path="/student/documents"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentDocumentsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Messages */}
        <Route
          path="/student/messages"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentMessagesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Help */}
        <Route
          path="/student/help"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentHelpPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Journey - Parcours Formation */}
        <Route
          path="/student/journey"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentJourneyPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Next Steps - Prochaines Étapes */}
        <Route
          path="/student/next-steps"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentNextStepsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Student Milestones - Étapes Franchies */}
        <Route
          path="/student/milestones"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentMilestonesPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* SECRETARY ROUTES */}
        {/* ============================================================ */}

        {/* Secretary Students Search */}
        <Route
          path="/secretary/students"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryStudentsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Secretary Instructors Search */}
        <Route
          path="/secretary/instructors"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryInstructorsPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Secretary Calendar */}
        <Route
          path="/secretary/calendar"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryCalendarPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />

        {/* Secretary Profile */}
        <Route
          path="/staff/profile"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlaceholderPage
                title="Mon Profil"
                description="Gestion de mon profil secrétaire"
                backLink="/secretary/dashboard"
              />
            </ViaMenutorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* CATCH-ALL ROUTE - 404 */}
        {/* ============================================================ */}

        {/* Catch-all route for 404 - Must be last */}
        <Route
          path="*"
          element={
            <ViaMenutorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotFoundPage locale="fr" />
            </ViaMenutorMainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
