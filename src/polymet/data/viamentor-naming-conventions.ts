/**
 * VIAMENTOR - Conventions de Nommage
 * Documentation complète des standards de nommage du projet
 *
 * @version 2.1.0
 * @lastUpdated 2025-01-20
 */

// ============================================================================
// 1. CONVENTIONS GÉNÉRALES
// ============================================================================

/**
 * Préfixe Global
 * - Tous les fichiers Viamentor utilisent le préfixe "viamentor-"
 * - Format: viamentor-{type}-{nom}
 * - Exemple: viamentor-students-page, viamentor-user-store
 */

/**
 * Casse (Case Style)
 * - Fichiers: kebab-case (viamentor-student-detail-page)
 * - Composants React: PascalCase (StudentDetailPage)
 * - Variables/fonctions: camelCase (studentData, fetchStudents)
 * - Constantes: UPPER_SNAKE_CASE (MAX_STUDENTS, API_ENDPOINT)
 * - Types/Interfaces: PascalCase (StudentData, UserRole)
 */

// ============================================================================
// 2. CONVENTIONS PAR TYPE DE FICHIER
// ============================================================================

/**
 * 2.1 PAGES
 * Format: viamentor-{nom}-page
 * Exemples:
 * - viamentor-students-page
 * - viamentor-student-detail-page
 * - viamentor-dashboard-school-page
 * - viamentor-instructor-planning-page
 *
 * Règles:
 * - Toujours suffixe "-page"
 * - Nom descriptif de la page
 * - Utiliser le singulier pour les détails (student-detail)
 * - Utiliser le pluriel pour les listes (students-page)
 */

/**
 * 2.2 COMPONENTS
 * Format: viamentor-{nom}-{type}
 * Exemples:
 * - viamentor-student-card
 * - viamentor-students-table
 * - viamentor-create-student-wizard
 * - viamentor-student-detail-header
 * - viamentor-invoice-preview-dialog
 *
 * Types de suffixes:
 * - -card: Composant carte (viamentor-student-card)
 * - -table: Composant table (viamentor-students-table)
 * - -wizard: Composant wizard multi-steps (viamentor-create-student-wizard)
 * - -dialog: Composant dialog/modal (viamentor-invoice-preview-dialog)
 * - -sheet: Composant sheet/drawer (viamentor-student-detail-sheet)
 * - -header: Composant header (viamentor-student-detail-header)
 * - -section: Composant section (viamentor-revenue-analysis-section)
 * - -tab: Composant tab content (viamentor-student-informations-tab)
 * - -form: Composant formulaire (viamentor-student-form)
 * - -filters: Composant filtres (viamentor-students-filters)
 * - -stats: Composant statistiques (viamentor-students-stats-cards)
 *
 * Règles:
 * - Toujours un suffixe descriptif du type
 * - Nom descriptif de la fonctionnalité
 * - Pas de suffixe "-component"
 */

/**
 * 2.3 LAYOUTS
 * Format: viamentor-{nom}-layout
 * Exemples:
 * - viamentor-main-layout
 * - viamentor-auth-layout
 * - viamentor-public-layout
 *
 * Règles:
 * - Toujours suffixe "-layout"
 * - Nom descriptif du layout
 * - Un seul layout principal par type
 */

/**
 * 2.4 DATA FILES
 * Format: viamentor-{nom}-{type}
 * Exemples:
 * - viamentor-students-data
 * - viamentor-students-i18n
 * - viamentor-student-wizard-schemas
 * - viamentor-user-store
 * - viamentor-use-students-query
 *
 * Types de suffixes:
 * - -data: Mock data (viamentor-students-data)
 * - -i18n: Traductions (viamentor-students-i18n)
 * - -schemas: Schémas Zod (viamentor-student-wizard-schemas)
 * - -store: Store Zustand (viamentor-user-store)
 * - -hook: Hook React (viamentor-use-students-query)
 * - -service: Service API (viamentor-booking-availability-service)
 * - -utils: Utilitaires (viamentor-responsive-utils)
 * - -config: Configuration (viamentor-theme-config)
 * - -types: Types TypeScript (viamentor-roles-types)
 *
 * Règles:
 * - Toujours un suffixe descriptif du type
 * - Hooks commencent par "use-" (viamentor-use-students-query)
 * - Stores finissent par "-store" (viamentor-user-store)
 */

/**
 * 2.5 PROTOTYPES
 * Format: viamentor-{nom}-prototype
 * Exemples:
 * - viamentor-system-prototype
 * - viamentor-public-prototype
 *
 * Règles:
 * - Toujours suffixe "-prototype"
 * - Un prototype par application
 * - Nom descriptif de l'application
 */

// ============================================================================
// 3. CONVENTIONS DE NOMMAGE PAR DOMAINE
// ============================================================================

/**
 * 3.1 GESTION ÉLÈVES (STUDENTS)
 * Pages:
 * - viamentor-students-page (liste)
 * - viamentor-student-detail-page (détail)
 * - viamentor-student-profile-page (profil élève)
 * - viamentor-student-progression-page (progression)
 * - viamentor-student-billing-page (facturation)
 *
 * Components:
 * - viamentor-students-table
 * - viamentor-students-filters
 * - viamentor-students-stats-cards
 * - viamentor-create-student-wizard
 * - viamentor-student-detail-header
 * - viamentor-student-informations-tab
 *
 * Data:
 * - viamentor-students-data
 * - viamentor-students-i18n
 * - viamentor-student-wizard-schemas
 * - viamentor-student-detail-data
 */

/**
 * 3.2 GESTION MONITEURS (INSTRUCTORS)
 * Pages:
 * - viamentor-instructors-page (liste)
 * - viamentor-instructor-detail-page (détail)
 * - viamentor-instructor-planning-page (planning)
 * - viamentor-instructor-profile-page (profil moniteur)
 *
 * Components:
 * - viamentor-instructors-table
 * - viamentor-instructors-filters
 * - viamentor-create-instructor-wizard
 * - viamentor-instructor-detail-header
 *
 * Data:
 * - viamentor-instructors-data
 * - viamentor-instructors-i18n
 * - viamentor-instructor-wizard-schemas
 */

/**
 * 3.3 GESTION LEÇONS (LESSONS)
 * Pages:
 * - viamentor-lessons-list-page (liste)
 * - viamentor-lesson-detail-page (détail)
 * - viamentor-lessons-calendar-page (calendrier)
 * - viamentor-lessons-book-page (réservation)
 * - viamentor-planning-page (planning global)
 *
 * Components:
 * - viamentor-lesson-event-card
 * - viamentor-lesson-popover
 * - viamentor-lesson-actions
 * - viamentor-book-lesson-wizard
 * - viamentor-planning-calendar
 *
 * Data:
 * - viamentor-lessons-data
 * - viamentor-lessons-i18n
 * - viamentor-booking-schemas
 * - viamentor-planning-i18n
 *
 * Note: "Lessons" est le terme standard (pas "Courses")
 */

/**
 * 3.4 COURS THÉORIQUES (THEORY COURSES)
 * Pages:
 * - viamentor-theory-courses-list-page (liste)
 * - viamentor-theory-course-detail-page (détail)
 * - viamentor-theory-course-book-page (inscription)
 *
 * Components:
 * - viamentor-theory-course-card
 * - viamentor-theory-course-popover
 * - viamentor-participants-management
 * - viamentor-attendance-tracking
 * - viamentor-create-theory-course-wizard
 *
 * Data:
 * - viamentor-theory-courses-data
 * - viamentor-theory-courses-i18n
 *
 * Note: Toujours "theory-courses" (pas "theoretical-courses")
 */

/**
 * 3.5 EXAMENS (EXAMS)
 * Pages:
 * - viamentor-exams-list-page (liste)
 * - viamentor-exam-detail-page (détail)
 * - viamentor-exams-book-page (réservation)
 * - viamentor-exams-results-page (résultats)
 * - viamentor-exams-calendar-page (calendrier)
 * - viamentor-exams-analytics-page (analytics)
 *
 * Components:
 * - viamentor-exams-analytics-header
 * - viamentor-success-rates-analysis-section
 * - viamentor-failure-analysis-section
 *
 * Data:
 * - viamentor-exams-data
 * - viamentor-exams-i18n
 * - viamentor-exams-analytics-data
 * - viamentor-exams-analytics-i18n
 */

/**
 * 3.6 VÉHICULES (VEHICLES)
 * Pages:
 * - viamentor-vehicles-page (liste)
 * - viamentor-vehicle-detail-page (détail)
 * - viamentor-vehicles-analytics-page (analytics)
 *
 * Components:
 * - viamentor-vehicles-table
 * - viamentor-vehicles-filters
 * - viamentor-create-vehicle-wizard
 * - viamentor-vehicle-detail-header
 *
 * Data:
 * - viamentor-vehicles-data
 * - viamentor-vehicles-i18n
 * - viamentor-vehicles-analytics-data
 */

/**
 * 3.7 FINANCES
 * Pages:
 * - viamentor-billing-dashboard-page (facturation)
 * - viamentor-invoices-list-page (factures)
 * - viamentor-invoices-page (gestion factures)
 * - viamentor-payments-page (paiements)
 * - viamentor-financial-analytics-page (analytics)
 *
 * Components:
 * - viamentor-billing-kpis-cards
 * - viamentor-invoices-list-table
 * - viamentor-invoice-detail-modal
 * - viamentor-record-payment-modal
 *
 * Data:
 * - viamentor-billing-data
 * - viamentor-billing-i18n
 * - viamentor-invoices-data
 * - viamentor-invoices-i18n
 * - viamentor-payments-data
 * - viamentor-payments-i18n
 */

/**
 * 3.8 ANALYTICS
 * Pages:
 * - viamentor-analytics-central-page (hub central)
 * - viamentor-revenue-analytics-page (revenus)
 * - viamentor-instructors-analytics-page (moniteurs)
 * - viamentor-vehicles-analytics-page (véhicules)
 * - viamentor-exams-analytics-page (examens)
 * - viamentor-financial-analytics-page (financier)
 *
 * Components:
 * - viamentor-{domain}-analytics-header
 * - viamentor-{metric}-analysis-section
 * - viamentor-{chart}-chart
 *
 * Data:
 * - viamentor-{domain}-analytics-data
 * - viamentor-{domain}-analytics-i18n
 */

// ============================================================================
// 4. CONVENTIONS DE NOMMAGE DES ROUTES
// ============================================================================

/**
 * 4.1 ROUTES PRINCIPALES
 * Format: /{domaine}
 * Exemples:
 * - /students (liste élèves)
 * - /instructors (liste moniteurs)
 * - /vehicles (liste véhicules)
 * - /lessons (liste leçons)
 * - /theory-courses (liste cours théoriques)
 * - /exams (liste examens)
 *
 * Règles:
 * - Toujours au pluriel pour les listes
 * - Pas de préfixe "/list"
 * - Utiliser le nom du domaine
 */

/**
 * 4.2 ROUTES DÉTAILS
 * Format: /{domaine}/{id}
 * Exemples:
 * - /students/:id
 * - /instructors/:id
 * - /vehicles/:id
 * - /lessons/:id
 * - /theory-courses/:id
 * - /exams/:id
 *
 * Règles:
 * - Paramètre dynamique :id
 * - Pas de suffixe "/detail"
 * - Utiliser le pluriel du domaine
 */

/**
 * 4.3 ROUTES ACTIONS
 * Format: /{domaine}/{action}
 * Exemples:
 * - /students/new (création)
 * - /lessons/book (réservation)
 * - /theory-courses/book (inscription)
 * - /exams/book (réservation)
 * - /lessons/calendar (calendrier)
 * - /exams/results (résultats)
 *
 * Règles:
 * - Action en anglais
 * - Verbe infinitif (book, create, edit)
 * - Pas de préfixe "create-" ou "new-"
 */

/**
 * 4.4 ROUTES DASHBOARDS
 * Format: /{role}/dashboard
 * Exemples:
 * - /school/dashboard (School Admin)
 * - /instructor/dashboard (Moniteur)
 * - /student/dashboard (Élève)
 * - /secretary/dashboard (Secrétaire)
 *
 * Règles:
 * - Préfixe rôle
 * - Suffixe "/dashboard"
 * - Redirection "/" vers dashboard approprié
 */

/**
 * 4.5 ROUTES ANALYTICS
 * Format: /{domaine}/analytics ou /analytics
 * Exemples:
 * - /analytics (hub central)
 * - /instructors/analytics
 * - /vehicles/analytics
 * - /exams/analytics
 * - /financial/analytics
 *
 * Règles:
 * - Suffixe "/analytics"
 * - Hub central: /analytics
 * - Domaine spécifique: /{domaine}/analytics
 */

/**
 * 4.6 ROUTES SETTINGS
 * Format: /settings/{section}
 * Exemples:
 * - /settings (hub central)
 * - /settings/school
 * - /settings/pricing
 * - /settings/notifications
 * - /settings/users
 *
 * Règles:
 * - Préfixe "/settings"
 * - Section descriptive
 * - Hub central: /settings
 */

// ============================================================================
// 5. CONVENTIONS I18N
// ============================================================================

/**
 * 5.1 CLÉS DE TRADUCTION
 * Format: {namespace}.{section}.{key}
 * Exemples:
 * - students.list.title
 * - students.actions.create
 * - students.filters.status
 * - common.actions.save
 * - common.status.active
 *
 * Règles:
 * - Toujours en camelCase
 * - Maximum 3 niveaux
 * - Namespace = domaine
 * - Section = contexte
 * - Key = élément spécifique
 */

/**
 * 5.2 NAMESPACES I18N
 * Namespaces standards:
 * - common: Traductions communes (actions, status, etc.)
 * - students: Gestion élèves
 * - instructors: Gestion moniteurs
 * - lessons: Gestion leçons
 * - theoryCourses: Cours théoriques
 * - exams: Examens
 * - vehicles: Véhicules
 * - billing: Facturation
 * - payments: Paiements
 * - analytics: Analytics
 * - settings: Paramètres
 * - navigation: Navigation
 *
 * Règles:
 * - Un namespace par domaine
 * - camelCase
 * - Pas de préfixe "viamentor-"
 */

/**
 * 5.3 FICHIERS I18N
 * Format: viamentor-{domaine}-i18n
 * Exemples:
 * - viamentor-students-i18n
 * - viamentor-instructors-i18n
 * - viamentor-lessons-i18n
 * - viamentor-theory-courses-i18n
 * - viamentor-exams-i18n
 *
 * Règles:
 * - Toujours suffixe "-i18n"
 * - Un fichier par domaine
 * - Export des 4 langues (FR/DE/IT/EN)
 */

// ============================================================================
// 6. CONVENTIONS TYPES TYPESCRIPT
// ============================================================================

/**
 * 6.1 INTERFACES
 * Format: {Nom}{Type}
 * Exemples:
 * - StudentData
 * - InstructorData
 * - LessonData
 * - StudentFormData
 * - InstructorWizardData
 *
 * Règles:
 * - PascalCase
 * - Suffixe descriptif (Data, Props, Config, etc.)
 * - Pas de préfixe "I"
 */

/**
 * 6.2 TYPES
 * Format: {Nom}Type
 * Exemples:
 * - UserRole
 * - StudentStatus
 * - LessonType
 * - PaymentMethod
 *
 * Règles:
 * - PascalCase
 * - Nom descriptif
 * - Pas de suffixe "Type" sauf si nécessaire
 */

/**
 * 6.3 ENUMS
 * Format: {Nom}
 * Exemples:
 * - UserRole
 * - StudentStatus
 * - LessonType
 *
 * Règles:
 * - PascalCase
 * - Valeurs en UPPER_SNAKE_CASE
 * - Préférer les unions de types aux enums
 */

// ============================================================================
// 7. CONVENTIONS PROPS COMPOSANTS
// ============================================================================

/**
 * 7.1 PROPS INTERFACE
 * Format: {ComponentName}Props
 * Exemples:
 * - StudentCardProps
 * - StudentsTableProps
 * - CreateStudentWizardProps
 *
 * Règles:
 * - Toujours suffixe "Props"
 * - PascalCase
 * - Nom du composant + Props
 */

/**
 * 7.2 PROPS COMMUNES
 * Props standards:
 * - locale?: Locale (i18n)
 * - className?: string (styling)
 * - children?: ReactNode (composition)
 * - onClose?: () => void (callbacks)
 * - isOpen?: boolean (state)
 * - isLoading?: boolean (loading)
 * - isDisabled?: boolean (disabled)
 *
 * Règles:
 * - camelCase
 * - Préfixe "is" pour booléens
 * - Préfixe "on" pour callbacks
 * - Optionnel par défaut (?)
 */

// ============================================================================
// 8. CONVENTIONS VARIABLES ET FONCTIONS
// ============================================================================

/**
 * 8.1 VARIABLES
 * Format: camelCase
 * Exemples:
 * - studentData
 * - instructorsList
 * - isLoading
 * - hasError
 *
 * Règles:
 * - camelCase
 * - Préfixe "is/has/can" pour booléens
 * - Nom descriptif
 */

/**
 * 8.2 FONCTIONS
 * Format: camelCase
 * Exemples:
 * - fetchStudents
 * - createStudent
 * - updateStudent
 * - deleteStudent
 * - handleSubmit
 * - handleClose
 *
 * Règles:
 * - camelCase
 * - Verbe + Nom (fetchStudents)
 * - Préfixe "handle" pour event handlers
 * - Préfixe "fetch/get" pour récupération
 * - Préfixe "create/update/delete" pour mutations
 */

/**
 * 8.3 CONSTANTES
 * Format: UPPER_SNAKE_CASE
 * Exemples:
 * - MAX_STUDENTS
 * - API_ENDPOINT
 * - DEFAULT_LOCALE
 * - SUPPORTED_LOCALES
 *
 * Règles:
 * - UPPER_SNAKE_CASE
 * - Valeurs immuables
 * - Nom descriptif
 */

/**
 * 8.4 HOOKS REACT
 * Format: use{Nom}
 * Exemples:
 * - useStudents
 * - useStudentsQuery
 * - useStudentsMutation
 * - useLocale
 * - useTheme
 *
 * Règles:
 * - Préfixe "use"
 * - camelCase
 * - Nom descriptif
 */

// ============================================================================
// 9. CONVENTIONS MOCK DATA
// ============================================================================

/**
 * 9.1 VARIABLES MOCK
 * Format: MOCK_{NOM}
 * Exemples:
 * - MOCK_STUDENTS
 * - MOCK_INSTRUCTORS
 * - MOCK_LESSONS
 * - MOCK_CURRENT_USER
 *
 * Règles:
 * - Préfixe "MOCK_"
 * - UPPER_SNAKE_CASE
 * - Nom descriptif
 */

/**
 * 9.2 FICHIERS MOCK DATA
 * Format: viamentor-{domaine}-data
 * Exemples:
 * - viamentor-students-data
 * - viamentor-instructors-data
 * - viamentor-lessons-data
 *
 * Règles:
 * - Suffixe "-data"
 * - Un fichier par domaine
 * - Export des types + mock data
 */

// ============================================================================
// 10. ANTI-PATTERNS À ÉVITER
// ============================================================================

/**
 * ❌ À ÉVITER:
 * - Préfixe "I" pour interfaces (IStudent → Student)
 * - Suffixe "Component" (StudentComponent → Student)
 * - Mélange anglais/français (studentÉlève → student)
 * - Abréviations obscures (stdnt → student)
 * - Noms trop courts (s → student)
 * - Noms trop longs (studentManagementSystemPage → students-page)
 * - Préfixe "get" pour variables (getStudent → student)
 * - Suffixe "Type" systématique (StudentType → Student)
 * - Routes avec verbes français (/créer → /create)
 * - Fichiers sans préfixe viamentor- (students-page → viamentor-students-page)
 *
 * ✅ À PRIVILÉGIER:
 * - Noms descriptifs et clairs
 * - Cohérence dans tout le projet
 * - Conventions établies
 * - Anglais pour le code, français pour l'UI
 * - Préfixe viamentor- pour tous les fichiers
 */

// ============================================================================
// 11. CHECKLIST CONFORMITÉ
// ============================================================================

/**
 * Avant de créer un nouveau fichier, vérifier:
 *
 * ✅ Fichier:
 * - [ ] Préfixe "viamentor-"
 * - [ ] kebab-case
 * - [ ] Suffixe approprié (-page, -data, -i18n, etc.)
 * - [ ] Nom descriptif
 *
 * ✅ Composant:
 * - [ ] PascalCase
 * - [ ] Props interface avec suffixe "Props"
 * - [ ] Export nommé
 *
 * ✅ Types:
 * - [ ] PascalCase
 * - [ ] Suffixe approprié (Data, Props, Config, etc.)
 * - [ ] Pas de préfixe "I"
 *
 * ✅ Routes:
 * - [ ] Format cohérent
 * - [ ] Pluriel pour listes
 * - [ ] Actions en anglais
 *
 * ✅ I18n:
 * - [ ] Namespace approprié
 * - [ ] Clés en camelCase
 * - [ ] 4 langues (FR/DE/IT/EN)
 *
 * ✅ Variables:
 * - [ ] camelCase
 * - [ ] Nom descriptif
 * - [ ] Préfixes appropriés (is/has/can/handle)
 */

// ============================================================================
// 12. EXEMPLES COMPLETS
// ============================================================================

/**
 * EXEMPLE 1: Module Élèves
 *
 * Fichiers:
 * - pages/viamentor-students-page
 * - pages/viamentor-student-detail-page
 * - components/viamentor-students-table
 * - components/viamentor-create-student-wizard
 * - data/viamentor-students-data
 * - data/viamentor-students-i18n
 * - data/viamentor-student-wizard-schemas
 *
 * Routes:
 * - /students (liste)
 * - /students/:id (détail)
 * - /students/new (création)
 *
 * Types:
 * - StudentData
 * - StudentStatus
 * - StudentsPageProps
 * - CreateStudentWizardProps
 *
 * I18n:
 * - students.list.title
 * - students.actions.create
 * - students.filters.status
 */

/**
 * EXEMPLE 2: Module Cours Théoriques
 *
 * Fichiers:
 * - pages/viamentor-theory-courses-list-page
 * - pages/viamentor-theory-course-detail-page
 * - pages/viamentor-theory-course-book-page
 * - components/viamentor-theory-course-card
 * - components/viamentor-create-theory-course-wizard
 * - data/viamentor-theory-courses-data
 * - data/viamentor-theory-courses-i18n
 *
 * Routes:
 * - /theory-courses (liste)
 * - /theory-courses/:id (détail)
 * - /theory-courses/book (inscription)
 *
 * Types:
 * - TheoryCourseData
 * - TheoryCourseStatus
 * - TheoryCoursesListPageProps
 *
 * I18n:
 * - theoryCourses.list.title
 * - theoryCourses.actions.book
 * - theoryCourses.filters.category
 */

/**
 * EXEMPLE 3: Module Analytics
 *
 * Fichiers:
 * - pages/viamentor-instructors-analytics-page
 * - components/viamentor-instructors-analytics-header
 * - components/viamentor-performance-ranking-table
 * - components/viamentor-workload-analysis-section
 * - data/viamentor-instructors-performance-data
 * - data/viamentor-instructors-performance-i18n
 *
 * Routes:
 * - /instructors/analytics
 * - /analytics (hub central)
 *
 * Types:
 * - InstructorPerformanceData
 * - PerformanceMetrics
 * - InstructorsAnalyticsPageProps
 *
 * I18n:
 * - analytics.instructors.title
 * - analytics.metrics.performance
 * - analytics.charts.ranking
 */

// ============================================================================
// FIN DE LA DOCUMENTATION
// ============================================================================

export const NAMING_CONVENTIONS_VERSION = "2.1.0";
export const LAST_UPDATED = "2025-01-20";
