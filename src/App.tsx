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
import { ViamentorSystemDemo } from "@/polymet/pages/viamentor-system-demo";
import { ViamentorLoginPage } from "@/polymet/pages/viamentor-login-page";
import { ViamentorCompleteDemo } from "@/polymet/pages/viamentor-complete-demo";
import { ViamentorReportPage } from "@/polymet/pages/viamentor-report-page";
import { ViamentorTenantsPage } from "@/polymet/pages/viamentor-tenants-page";
import { ViamentorTenantDetailPage } from "@/polymet/pages/viamentor-tenant-detail-page";
import { ViamentorGDPRCompliancePage } from "@/polymet/pages/viamentor-gdpr-compliance-page";
import { ViamentorFinancePage } from "@/polymet/pages/viamentor-finance-page";
import { FinanceDashboardPage } from "@/polymet/pages/viamentor-finance-dashboard-page";
import { VATReportsPage } from "@/polymet/pages/viamentor-vat-reports-page";
import { ViamentorInvoicesPage } from "@/polymet/pages/viamentor-invoices-page";
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
import { ViamentorInstructorsPage } from "@/polymet/pages/viamentor-instructors-page";
import { InstructorsNewPage } from "@/polymet/pages/viamentor-instructors-new-page";
import { ViamentorInstructorDetailPage } from "@/polymet/pages/viamentor-instructor-detail-page";
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
import { ViamentorSupabaseDemoPage } from "@/polymet/pages/viamentor-supabase-demo-page";
import { ViamentorCredentialsPage } from "@/polymet/pages/viamentor-credentials-page";
import { ViamentorNoAuthInfoPage } from "@/polymet/pages/viamentor-no-auth-info-page";
import { NavigationDemoPage } from "@/polymet/pages/viamentor-navigation-demo-page";
import { ViamentorQuickActionsDemoPage } from "@/polymet/pages/viamentor-quick-actions-demo-page";
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
import { ViamentorRBACAdminPage } from "@/polymet/pages/viamentor-rbac-admin-page";
import { AdminRolesPage } from "@/polymet/pages/viamentor-admin-roles-page";
import { AdminDbHealthPage } from "@/polymet/pages/viamentor-admin-db-health-page";
import { SecurityBreachesPage } from "@/polymet/pages/viamentor-security-breaches-page";
import { SuperAdminPage } from "@/polymet/pages/viamentor-super-admin-page";
import { ViamentorPlatformAdminPage } from "@/polymet/pages/viamentor-platform-admin-page";
import { ViamentorSchoolAdminPage } from "@/polymet/pages/viamentor-school-admin-page";
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
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";
import { SmartHomeRedirect } from "@/polymet/components/viamentor-smart-home-redirect";
import { StudentTemporaryAccessPage } from "@/polymet/pages/viamentor-student-temporary-access-page";
import { InstructorTemporaryStudentsPage } from "@/polymet/pages/viamentor-instructor-temporary-students-page";
import { StudentAssignmentHistoryPage } from "@/polymet/pages/viamentor-student-assignment-history-page";
import { BusinessHoursSettingsPage } from "@/polymet/pages/viamentor-business-hours-settings-page";
import { CoursesCategoriesPage } from "@/polymet/pages/viamentor-courses-categories-page";
import { CoursesTypesPage } from "@/polymet/pages/viamentor-courses-types-page";
import { CoursesCalendarPage } from "@/polymet/pages/viamentor-courses-calendar-page";
import { CoursesSessionsPage } from "@/polymet/pages/viamentor-courses-sessions-page";

export default function ViamentorSystemPrototype() {
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorLoginPage />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* ERROR PAGES */}
        {/* ============================================================ */}

        {/* 404 Not Found Page */}
        <Route
          path="/not-found"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotFoundPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* 403 Unauthorized Page */}
        <Route
          path="/unauthorized"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <UnauthorizedPage locale="fr" reason="permission" />
            </ViamentorMainLayout>
          }
        />

        {/* Generic Error Page */}
        <Route
          path="/error"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ErrorPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Maintenance Mode Page */}
        <Route
          path="/maintenance"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MaintenancePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Supabase Mock Demo Page */}
        <Route
          path="/supabase-demo"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorSupabaseDemoPage />
            </ViamentorMainLayout>
          }
        />

        {/* Credentials Info Page */}
        <Route
          path="/credentials"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorCredentialsPage />
            </ViamentorMainLayout>
          }
        />

        {/* Onboarding Page - Configuration initiale tenant */}
        <Route
          path="/onboarding"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <OnboardingPage />
            </ViamentorMainLayout>
          }
        />

        {/* No Auth Info Page - Avec Layout pour voir la Quick Actions Bar */}
        <Route
          path="/no-auth-info"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorNoAuthInfoPage />
            </ViamentorMainLayout>
          }
        />

        {/* Navigation Demo Page */}
        <Route
          path="/navigation-demo"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NavigationDemoPage />
            </ViamentorMainLayout>
          }
        />

        {/* Quick Actions Demo Page */}
        <Route
          path="/quick-actions-demo"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorQuickActionsDemoPage />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* QUICK ACTIONS ROUTES */}
        {/* ============================================================ */}

        {/* Quick Book Lesson */}
        <Route
          path="/quick/book-lesson"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickBookLessonPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Quick New Student */}
        <Route
          path="/quick/new-student"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickNewStudentPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Quick New Invoice */}
        <Route
          path="/quick/new-invoice"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickNewInvoicePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Quick Report Absence */}
        <Route
          path="/quick/report-absence"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <QuickReportAbsencePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* NAVIGATION FEEDBACK ROUTES */}
        {/* ============================================================ */}

        {/* Global Search Page */}
        <Route
          path="/search"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <GlobalSearchPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Recent Pages */}
        <Route
          path="/recent"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <RecentPagesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <FavoritesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Activity History */}
        <Route
          path="/history"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ActivityHistoryPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* PERSONALIZATION ROUTES */}
        {/* ============================================================ */}

        {/* My Workspace */}
        <Route
          path="/my-workspace"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MyWorkspacePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* My Shortcuts */}
        <Route
          path="/shortcuts"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MyShortcutsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* My Widgets */}
        <Route
          path="/widgets"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MyWidgetsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* System Demo Page */}
        <Route
          path="/system"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorSystemDemo />
            </ViamentorMainLayout>
          }
        />

        {/* Complete Demo Page (All Systems) */}
        <Route
          path="/complete"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorCompleteDemo />
            </ViamentorMainLayout>
          }
        />

        {/* Conformity Report Page */}
        <Route
          path="/report"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorReportPage />
            </ViamentorMainLayout>
          }
        />

        {/* Tenants Management Page */}
        <Route
          path="/tenants"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorTenantsPage />
            </ViamentorMainLayout>
          }
        />

        {/* Tenant Detail Page */}
        <Route
          path="/tenants/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorTenantDetailPage />
            </ViamentorMainLayout>
          }
        />

        {/* GDPR Compliance Page */}
        <Route
          path="/compliance/gdpr"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorGDPRCompliancePage />
            </ViamentorMainLayout>
          }
        />

        {/* Finance Admin Page */}
        <Route
          path="/finance"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorFinancePage />
            </ViamentorMainLayout>
          }
        />

        {/* Finance Dashboard Page */}
        <Route
          path="/finance/dashboard"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <FinanceDashboardPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* VAT Reports Page */}
        <Route
          path="/finance/vat-reports"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <VATReportsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Billing Dashboard Page */}
        <Route
          path="/billing"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <BillingDashboardPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Payments Management Page */}
        <Route
          path="/payments"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PaymentsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Finance Invoices Management Page */}
        <Route
          path="/finance/invoices"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorInvoicesPage />
            </ViamentorMainLayout>
          }
        />

        {/* Invoices List Page */}
        <Route
          path="/invoices"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InvoicesListPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Analytics Central Page - Hub principal pour tous les analytics */}
        <Route
          path="/analytics"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AnalyticsCentralPage locale="fr" />
            </ViamentorMainLayout>
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsPage />
            </ViamentorMainLayout>
          }
        />

        {/* Students New Page - Wizard de création */}
        <Route
          path="/students/new"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsNewPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Students Import Page */}
        <Route
          path="/students/import"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsImportPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Students Archive Page */}
        <Route
          path="/students/archive"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentsArchivePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Detail Page */}
        <Route
          path="/students/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentDetailPage />
            </ViamentorMainLayout>
          }
        />

        {/* Student Temporary Access Page */}
        <Route
          path="/school/students/:studentId/temporary-access"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentTemporaryAccessPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Assignment History Page */}
        <Route
          path="/school/students/:studentId/assignment-history"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentAssignmentHistoryPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Manager Dashboard */}
        <Route
          path="/instructor-manager"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorManagerPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Marketing Manager Dashboard */}
        <Route
          path="/marketing-manager"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MarketingManagerPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Finance Manager Dashboard */}
        <Route
          path="/finance-manager"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <FinanceManagerPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Accountant Dashboard */}
        <Route
          path="/accountant"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AccountantPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructors Management Page */}
        <Route
          path="/instructors"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorInstructorsPage />
            </ViamentorMainLayout>
          }
        />

        {/* Instructors New Page - Wizard de création */}
        <Route
          path="/instructors/new"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorsNewPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Detail Page */}
        <Route
          path="/instructors/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorInstructorDetailPage />
            </ViamentorMainLayout>
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <VehiclesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Maintenance Management Page */}
        <Route
          path="/maintenance"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MaintenancePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Vehicle Detail Page */}
        <Route
          path="/vehicles/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <VehicleDetailPage locale="fr" />
            </ViamentorMainLayout>
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsListPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/exams/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamDetailPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/exams/book"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsBookPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/exams/mock"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsMockPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Exams Results Page */}
        <Route
          path="/exams/results"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsResultsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Exams Calendar Page */}
        <Route
          path="/exams/calendar"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ExamsCalendarPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Theory Courses Pages */}
        <Route
          path="/theory-courses"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <TheoryCoursesListPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/theory-courses/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <TheoryCourseDetailPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/theory-courses/book"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <TheoryCourseBookPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Planning & Lessons Pages - School Admin */}
        <Route
          path="/planning"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Planning Import ICS Page */}
        <Route
          path="/planning/import"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningImportPage locale="fr" tenant="auto-ecole-geneve" />
            </ViamentorMainLayout>
          }
        />

        {/* Planning Import History Page */}
        <Route
          path="/planning/import/history"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningImportHistoryPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Planning Export ICS Page */}
        <Route
          path="/planning/export"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlanningExportPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Lessons Management Pages */}
        <Route
          path="/lessons"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsListPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/lessons/:id"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonDetailPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/lessons/calendar"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsCalendarPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/lessons/book"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsBookPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/lessons/conflicts"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonsConflictsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Planning & Lessons Pages */}
        <Route
          path="/instructor/planning"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorPlanningPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Lessons List - IMPORTANT: Route parent pour breadcrumb */}
        <Route
          path="/instructor/lessons"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorLessonsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Students Page */}
        <Route
          path="/instructor/students"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorStudentsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Temporary Students Page */}
        <Route
          path="/instructor/temporary-students"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorTemporaryStudentsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Settings Central Page - Hub principal pour tous les paramètres */}
        <Route
          path="/settings"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SettingsCentralPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Pricing Settings Page */}
        <Route
          path="/settings/pricing"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PricingSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Pricing Management Page - Complete */}
        <Route
          path="/pricing"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PricingManagementPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Notifications Center Page */}
        <Route
          path="/notifications"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotificationsCenterPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Notifications Settings Page */}
        <Route
          path="/settings/notifications"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotificationsSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Layout Demo Page */}
        <Route
          path="/layout-demo"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LayoutDemoPage />
            </ViamentorMainLayout>
          }
        />

        {/* Dashboard Pages with Layout - Pattern uniforme /role/dashboard */}

        {/* School Admin Dashboard */}
        <Route
          path="/school/dashboard"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorSchoolAdminPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Dashboard */}
        <Route
          path="/instructor/dashboard"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <DashboardInstructorPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <DashboardStudentPage locale="fr" />
            </ViamentorMainLayout>
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentPlanningPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/student/lessons"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentLessonsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/student/lessons/book"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentBookLessonPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Progression Page */}
        <Route
          path="/student/progression"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentProgressionPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Billing Page */}
        <Route
          path="/student/billing"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentBillingPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Profile Page */}
        <Route
          path="/student/profile"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentProfilePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Lesson Evaluation Page - Route enfant de /instructor/lessons */}
        <Route
          path="/instructor/lessons/:lessonId/evaluate"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <LessonEvaluationPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Profile Page */}
        <Route
          path="/instructor/profile"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorProfilePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Secretary Dashboard Page */}
        <Route
          path="/secretary/dashboard"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryDashboardPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Secretary Registrations Page */}
        <Route
          path="/secretary/registrations"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryRegistrationsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Secretary Planning & Lessons Pages */}
        <Route
          path="/secretary/planning"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffPlanningPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        <Route
          path="/secretary/lessons"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryLessonsPage locale="fr" />
            </ViamentorMainLayout>
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffMessagesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Staff Tasks Page */}
        <Route
          path="/staff/tasks"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffTasksPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Rooms Management Page */}
        <Route
          path="/rooms"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <RoomsManagementPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Course Types Settings Page */}
        <Route
          path="/settings/course-types"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CourseTypesSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Makeups Settings Page */}
        <Route
          path="/settings/makeups"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <MakeupsSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Makeups Page */}
        <Route
          path="/student/makeups"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentMakeupsPage locale="fr" featureMakeupsEnabled={true} />
            </ViamentorMainLayout>
          }
        />

        {/* Public Contact Page - Accessible sans authentification */}
        <Route
          path="/contact"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ContactPublicPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Thank You Page - Après soumission formulaire */}
        <Route
          path="/merci"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ThankYouPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Pixels Health Monitoring Page */}
        <Route
          path="/marketing/pixels/health"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PixelsHealthPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Staff Prospects CRM Page */}
        <Route
          path="/staff/prospects"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffProspectsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Staff Marketing Campaigns Page */}
        <Route
          path="/staff/marketing/campaigns"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffCampaignsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Google Reviews Settings Page */}
        <Route
          path="/settings/reviews"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ReviewsSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Reviews Verification Page */}
        <Route
          path="/reviews/verification"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ReviewsVerificationPage locale="fr" />
            </ViamentorMainLayout>
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
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorRBACAdminPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Admin Roles Management Page - Super Admin & Platform Admin */}
        <Route
          path="/admin/roles"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AdminRolesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Admin Database Health Page - Super Admin & Platform Admin */}
        <Route
          path="/admin/db-health"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AdminDbHealthPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Security Breaches Page - DPO & Super Admin */}
        <Route
          path="/security/breaches"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecurityBreachesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Platform Admin Dashboard - Platform Admin Only */}
        <Route
          path="/platform-admin"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorPlatformAdminPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Super Admin Dashboard - Super Admin Only */}
        <Route
          path="/super-admin"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SuperAdminPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* School Admin Dashboard - School Admin Only */}
        <Route
          path="/school-admin"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <ViamentorSchoolAdminPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* SUPER ADMIN ROUTES */}
        {/* ============================================================ */}

        {/* Global Users Management */}
        <Route
          path="/users"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <GlobalUsersPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* System Health Monitoring */}
        <Route
          path="/system/health"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <SystemHealthPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Security Alerts */}
        <Route
          path="/security/alerts"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <SecurityAlertsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Audit Logs */}
        <Route
          path="/audit"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <AuditLogsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Platform Analytics - Super Admin uniquement */}
        <Route
          path="/platform/analytics"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <PlatformAnalyticsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* System Configuration */}
        <Route
          path="/config"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <SystemConfigPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Feature Flags */}
        <Route
          path="/config/features"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <FeatureFlagsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Integrations */}
        <Route
          path="/config/integrations"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <SystemIntegrationsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Documentation */}
        <Route
          path="/docs"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <DocumentationPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* PLATFORM ADMIN ROUTES */}
        {/* ============================================================ */}

        {/* Support Tickets */}
        <Route
          path="/support"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <SupportTicketsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Global Reports */}
        <Route
          path="/reports"
          element={
            <ViamentorMainLayout locale="fr" tenant="viamentor-platform">
              <GlobalReportsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* SCHOOL ADMIN ROUTES */}
        {/* ============================================================ */}

        {/* Staff Management */}
        <Route
          path="/staff"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StaffManagementPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructors Availability - Global (School Admin) */}
        <Route
          path="/availability"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <AvailabilityGlobalPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Group Lessons */}
        <Route
          path="/group-lessons"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <GroupLessonsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Billing Reminders */}
        <Route
          path="/billing/reminders"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <BillingRemindersPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Campaigns Analytics */}
        <Route
          path="/campaigns/analytics"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CampaignsAnalyticsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* School Settings */}
        <Route
          path="/settings/school"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SchoolSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Categories Settings */}
        <Route
          path="/settings/categories"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CategoriesSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Business Hours Settings */}
        <Route
          path="/settings/hours"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <BusinessHoursSettingsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Courses Categories Management */}
        <Route
          path="/school/courses/categories"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesCategoriesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Course Types Management - Par catégorie */}
        <Route
          path="/school/courses/categories/:categoryId/types"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesTypesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Courses Calendar - Vue mensuelle */}
        <Route
          path="/school/courses/calendar"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesCalendarPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Courses Sessions - Gestion séances individuelles */}
        <Route
          path="/school/courses/sessions"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <CoursesSessionsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Integrations Settings */}
        <Route
          path="/settings/integrations"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlaceholderPage
                title="Intégrations"
                description="Configuration des intégrations tierces"
              />
            </ViamentorMainLayout>
          }
        />

        {/* Users Settings */}
        <Route
          path="/settings/users"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <UsersManagementPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* INSTRUCTOR ROUTES */}
        {/* ============================================================ */}

        {/* Instructor Evaluations */}
        <Route
          path="/instructor/evaluations"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorEvaluationsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Availability - Personal (Instructor) */}
        <Route
          path="/instructor/availability"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorAvailabilityPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Makeups */}
        <Route
          path="/instructor/makeups"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlaceholderPage
                title="Rattrapages Élèves"
                description="Gestion des crédits de rattrapage de mes élèves"
                backLink="/instructor-dashboard"
              />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Messages */}
        <Route
          path="/instructor/messages"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorMessagesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Help */}
        <Route
          path="/instructor/help"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorHelpPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Today - Ma Journée */}
        <Route
          path="/instructor/today"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorTodayPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Week - Ma Semaine */}
        <Route
          path="/instructor/week"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorWeekPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Priorities - Mes Priorités */}
        <Route
          path="/instructor/priorities"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorPrioritiesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Performance (Stats) */}
        <Route
          path="/instructor/performance"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorPerformancePage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Instructor Earnings */}
        <Route
          path="/instructor/earnings"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <InstructorEarningsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* STUDENT ROUTES */}
        {/* ============================================================ */}

        {/* Student Exams */}
        <Route
          path="/student/exams"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentExamsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Payments */}
        <Route
          path="/student/payments"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentPaymentsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Documents */}
        <Route
          path="/student/documents"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentDocumentsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Messages */}
        <Route
          path="/student/messages"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentMessagesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Help */}
        <Route
          path="/student/help"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentHelpPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Journey - Parcours Formation */}
        <Route
          path="/student/journey"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentJourneyPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Next Steps - Prochaines Étapes */}
        <Route
          path="/student/next-steps"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentNextStepsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Student Milestones - Étapes Franchies */}
        <Route
          path="/student/milestones"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <StudentMilestonesPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* SECRETARY ROUTES */}
        {/* ============================================================ */}

        {/* Secretary Students Search */}
        <Route
          path="/secretary/students"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryStudentsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Secretary Instructors Search */}
        <Route
          path="/secretary/instructors"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryInstructorsPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Secretary Calendar */}
        <Route
          path="/secretary/calendar"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <SecretaryCalendarPage locale="fr" />
            </ViamentorMainLayout>
          }
        />

        {/* Secretary Profile */}
        <Route
          path="/staff/profile"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <PlaceholderPage
                title="Mon Profil"
                description="Gestion de mon profil secrétaire"
                backLink="/secretary/dashboard"
              />
            </ViamentorMainLayout>
          }
        />

        {/* ============================================================ */}
        {/* CATCH-ALL ROUTE - 404 */}
        {/* ============================================================ */}

        {/* Catch-all route for 404 - Must be last */}
        <Route
          path="*"
          element={
            <ViamentorMainLayout locale="fr" tenant="auto-ecole-geneve">
              <NotFoundPage locale="fr" />
            </ViamentorMainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
