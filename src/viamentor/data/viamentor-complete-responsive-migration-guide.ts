/**
 * ============================================================================
 * VIAMENTOR - Guide Complet Migration Responsive
 * ============================================================================
 *
 * Guide de migration pour rendre TOUS les composants responsive selon les règles:
 * - ❌ Dashboards non optimisés mobile → Tabs mobile + charts simplifiés
 * - ❌ Forms complexes difficiles → Swipe navigation + validation inline
 * - ❌ Pas de touch gestures → Swipe actions partout
 * - ✅ Tables → Cards mobile automatique
 * - ✅ Grid responsive adaptatif
 *
 * TOTAL: 42 fichiers à corriger
 */

// ============================================================================
// INFRASTRUCTURE (TERMINÉ ✅)
// ============================================================================

/**
 * Composants utilitaires créés:
 * - @/viamentor/components/viamentor-responsive-page-wrapper
 * - @/viamentor/data/viamentor-responsive-utils (+ useMediaQuery)
 * - @/viamentor/data/viamentor-touch-gestures (swipe, long press, pinch)
 * - @/viamentor/components/viamentor-responsive-dashboard (template)
 * - @/viamentor/components/viamentor-mobile-wizard (template)
 * - @/viamentor/components/viamentor-swipeable-card (template)
 */

// ============================================================================
// PHASE 1: DASHBOARDS (11 pages)
// ============================================================================

/**
 * Pattern Dashboard Responsive
 *
 * AVANT:
 * ```tsx
 * <div className="space-y-6">
 *   <h1>Dashboard</h1>
 *   <div className="grid grid-cols-4 gap-4">
 *     <Card>KPI 1</Card>
 *     <Card>KPI 2</Card>
 *     <Card>KPI 3</Card>
 *     <Card>KPI 4</Card>
 *   </div>
 *   <div className="grid grid-cols-2 gap-6">
 *     <Card>Chart 1</Card>
 *     <Card>Chart 2</Card>
 *   </div>
 * </div>
 * ```
 *
 * APRÈS:
 * ```tsx
 * import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
 *
 * <ResponsivePageWrapper
 *   title="Dashboard École"
 *   description="Bienvenue"
 *   sections={[
 *     {
 *       id: "stats",
 *       label: "Statistiques",
 *       icon: <BarChart3Icon className="h-4 w-4" />,
 *       badge: "4",
 *       content: (
 *         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 *           <Card>KPI 1</Card>
 *           <Card>KPI 2</Card>
 *           <Card>KPI 3</Card>
 *           <Card>KPI 4</Card>
 *         </div>
 *       )
 *     },
 *     {
 *       id: "charts",
 *       label: "Graphiques",
 *       icon: <LineChartIcon className="h-4 w-4" />,
 *       content: (
 *         <div className="space-y-4">
 *           <Card>
 *             <ChartContainer className="h-[200px] sm:h-[300px]">
 *               <LineChart data={data} />
 *             </ChartContainer>
 *           </Card>
 *         </div>
 *       )
 *     }
 *   ]}
 *   mobileTabsEnabled={true}
 *   swipeEnabled={true}
 * />
 * ```
 */

export const DASHBOARD_MIGRATIONS = [
  {
    file: "@/viamentor/pages/viamentor-dashboard-school-page",
    priority: "HIGH",
    sections: [
      {
        id: "stats",
        label: "Statistiques",
        icon: "BarChart3Icon",
        content: "4 KPI cards",
      },
      {
        id: "activity",
        label: "Activité",
        icon: "ActivityIcon",
        content: "Recent activities list",
      },
      {
        id: "exams",
        label: "Examens",
        icon: "GraduationCapIcon",
        content: "Upcoming exams",
      },
      {
        id: "actions",
        label: "Actions",
        icon: "ZapIcon",
        content: "Quick actions grid",
      },
    ],

    notes: "Dashboard principal école - 4 sections à séparer en tabs mobile",
  },
  {
    file: "@/viamentor/pages/viamentor-dashboard-instructor-page",
    priority: "HIGH",
    sections: [
      { id: "today", label: "Aujourd'hui", icon: "CalendarIcon" },
      { id: "students", label: "Mes élèves", icon: "UsersIcon" },
      { id: "stats", label: "Performance", icon: "TrendingUpIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-dashboard-student-page",
    priority: "HIGH",
    sections: [
      { id: "progression", label: "Ma progression", icon: "TrendingUpIcon" },
      { id: "lessons", label: "Mes leçons", icon: "CalendarIcon" },
      { id: "documents", label: "Documents", icon: "FileTextIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-super-admin-page",
    priority: "MEDIUM",
    sections: [
      { id: "overview", label: "Vue d'ensemble", icon: "LayoutDashboardIcon" },
      { id: "tenants", label: "Tenants", icon: "BuildingIcon" },
      { id: "revenue", label: "Revenus", icon: "DollarSignIcon" },
      { id: "alerts", label: "Alertes", icon: "AlertTriangleIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-platform-admin-page",
    priority: "MEDIUM",
    sections: [
      { id: "system", label: "Système", icon: "ServerIcon" },
      { id: "tenants", label: "Tenants", icon: "BuildingIcon" },
      { id: "monitoring", label: "Monitoring", icon: "ActivityIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-school-admin-page",
    priority: "MEDIUM",
    sections: [
      { id: "overview", label: "Vue d'ensemble", icon: "LayoutDashboardIcon" },
      { id: "users", label: "Utilisateurs", icon: "UsersIcon" },
      { id: "config", label: "Configuration", icon: "SettingsIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-secretary-dashboard-page",
    priority: "HIGH",
    sections: [
      { id: "today", label: "Aujourd'hui", icon: "CalendarIcon" },
      { id: "registrations", label: "Inscriptions", icon: "UserPlusIcon" },
      { id: "tasks", label: "Tâches", icon: "CheckSquareIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-finance-manager-page",
    priority: "HIGH",
    sections: [
      { id: "kpis", label: "KPIs", icon: "DollarSignIcon" },
      { id: "transactions", label: "Transactions", icon: "ArrowRightLeftIcon" },
      { id: "analytics", label: "Analytics", icon: "LineChartIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-instructor-manager-page",
    priority: "MEDIUM",
    sections: [
      { id: "team", label: "Équipe", icon: "UsersIcon" },
      { id: "planning", label: "Planning", icon: "CalendarIcon" },
      { id: "performance", label: "Performance", icon: "TrendingUpIcon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-marketing-manager-page",
    priority: "MEDIUM",
    sections: [
      { id: "campaigns", label: "Campagnes", icon: "MegaphoneIcon" },
      { id: "leads", label: "Prospects", icon: "UserPlusIcon" },
      { id: "analytics", label: "Analytics", icon: "BarChart3Icon" },
    ],
  },
  {
    file: "@/viamentor/pages/viamentor-accountant-page",
    priority: "MEDIUM",
    sections: [
      { id: "overview", label: "Vue d'ensemble", icon: "LayoutDashboardIcon" },
      { id: "reports", label: "Rapports", icon: "FileTextIcon" },
      {
        id: "reconciliation",
        label: "Réconciliation",
        icon: "CheckCircleIcon",
      },
    ],
  },
];

// ============================================================================
// PHASE 2: ANALYTICS PAGES (6 pages)
// ============================================================================

/**
 * Pattern Analytics Responsive
 *
 * AVANT:
 * ```tsx
 * <Tabs>
 *   <TabsList>
 *     <TabsTrigger value="revenue">Revenus</TabsTrigger>
 *     <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="revenue">
 *     <div className="grid grid-cols-2 gap-6">
 *       <Card><LineChart /></Card>
 *       <Card><BarChart /></Card>
 *     </div>
 *   </TabsContent>
 * </Tabs>
 * ```
 *
 * APRÈS:
 * ```tsx
 * <ResponsivePageWrapper
 *   sections={[
 *     {
 *       id: "revenue",
 *       label: "Revenus",
 *       content: (
 *         <div className="space-y-4">
 *           <Card>
 *             <ChartContainer className="h-[250px] sm:h-[350px]">
 *               <LineChart />
 *             </ChartContainer>
 *           </Card>
 *         </div>
 *       )
 *     }
 *   ]}
 *   mobileTabsEnabled={true}
 *   layout="stacked" // Pas de grid sur mobile
 * />
 * ```
 */

export const ANALYTICS_MIGRATIONS = [
  {
    file: "@/viamentor/pages/viamentor-revenue-analytics-page",
    priority: "HIGH",
    charts: ["MRR Evolution", "Cohorts Analysis", "Forecasting", "Churn Rate"],
    notes: "4 tabs avec charts complexes - Séparer en sections mobile",
  },
  {
    file: "@/viamentor/pages/viamentor-instructors-analytics-page",
    priority: "HIGH",
    charts: ["Performance Ranking", "Workload", "Categories", "Satisfaction"],
    notes: "Tables + charts - Convertir tables en cards mobile",
  },
  {
    file: "@/viamentor/pages/viamentor-vehicles-analytics-page",
    priority: "HIGH",
    charts: [
      "Fleet Utilization",
      "Costs Analysis",
      "Fuel Consumption",
      "Maintenance",
    ],

    notes: "4 sections avec charts - Tabs mobile obligatoires",
  },
  {
    file: "@/viamentor/pages/viamentor-financial-analytics-page",
    priority: "HIGH",
    charts: [
      "Revenue Analysis",
      "Profitability",
      "Cash Flow",
      "Financial Ratios",
    ],

    notes: "8 sections - Regrouper en 4 tabs mobile",
  },
  {
    file: "@/viamentor/pages/viamentor-exams-analytics-page",
    priority: "MEDIUM",
    charts: [
      "Success Rates",
      "Failure Analysis",
      "Instructor Performance",
      "Preparation",
    ],

    notes: "5 sections - Tabs mobile avec swipe",
  },
  {
    file: "@/viamentor/pages/viamentor-reviews-dashboard-page",
    priority: "MEDIUM",
    charts: [
      "Rating Distribution",
      "Sentiment Analysis",
      "Temporal Trends",
      "AI Insights",
    ],

    notes: "6 KPIs + 4 charts - Séparer en 2 tabs mobile",
  },
];

// ============================================================================
// PHASE 3: WIZARDS (9 composants)
// ============================================================================

/**
 * Pattern Wizard Responsive
 *
 * AVANT:
 * ```tsx
 * <Dialog>
 *   <div className="space-y-6">
 *     <div className="flex items-center justify-between">
 *       <div>Step {currentStep} / {totalSteps}</div>
 *       <Button onClick={handleNext}>Suivant</Button>
 *     </div>
 *     {currentStep === 1 && <Step1Form />}
 *     {currentStep === 2 && <Step2Form />}
 *   </div>
 * </Dialog>
 * ```
 *
 * APRÈS:
 * ```tsx
 * import { MobileWizard } from "@/viamentor/components/viamentor-mobile-wizard";
 *
 * <Dialog>
 *   <MobileWizard
 *     steps={[
 *       { id: "identity", label: "Identité", content: <Step1Form /> },
 *       { id: "training", label: "Formation", content: <Step2Form /> },
 *     ]}
 *     allowSwipe={true}
 *     showProgress={true}
 *     onComplete={handleSubmit}
 *   />
 * </Dialog>
 * ```
 */

export const WIZARD_MIGRATIONS = [
  {
    file: "@/viamentor/components/viamentor-create-student-wizard",
    priority: "HIGH",
    steps: 4,
    notes: "Wizard 4 steps - Ajouter swipe navigation + validation inline",
  },
  {
    file: "@/viamentor/components/viamentor-create-instructor-wizard",
    priority: "HIGH",
    steps: 3,
    notes: "Wizard 3 steps - Swipe + progress indicator mobile",
  },
  {
    file: "@/viamentor/components/viamentor-create-vehicle-wizard",
    priority: "MEDIUM",
    steps: 4,
    notes: "Wizard 4 steps - Touch-friendly form inputs",
  },
  {
    file: "@/viamentor/components/viamentor-create-tenant-wizard",
    priority: "MEDIUM",
    steps: 5,
    notes: "Wizard 5 steps - Swipe + compact mobile layout",
  },
  {
    file: "@/viamentor/components/viamentor-book-lesson-wizard",
    priority: "HIGH",
    steps: 4,
    notes: "Wizard réservation - Calendar picker mobile optimisé",
  },
  {
    file: "@/viamentor/components/viamentor-onboarding-wizard",
    priority: "HIGH",
    steps: 5,
    notes: "Onboarding initial - Swipe + animations smooth",
  },
  {
    file: "@/viamentor/components/viamentor-create-promotion-wizard",
    priority: "LOW",
    steps: 3,
    notes: "Wizard promotion - Forms adaptatifs",
  },
  {
    file: "@/viamentor/components/viamentor-create-package-wizard",
    priority: "LOW",
    steps: 3,
    notes: "Wizard package - Touch gestures",
  },
  {
    file: "@/viamentor/components/viamentor-create-theory-course-wizard",
    priority: "MEDIUM",
    steps: 3,
    notes: "Wizard cours théorique - Mobile optimized",
  },
];

// ============================================================================
// PHASE 4: TABLES (8 composants)
// ============================================================================

/**
 * Pattern Table → Cards Mobile
 *
 * AVANT:
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Nom</TableHead>
 *       <TableHead>Email</TableHead>
 *       <TableHead>Actions</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     {data.map(item => (
 *       <TableRow key={item.id}>
 *         <TableCell>{item.name}</TableCell>
 *         <TableCell>{item.email}</TableCell>
 *         <TableCell><Button>Voir</Button></TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 *
 * APRÈS:
 * ```tsx
 * import { useMediaQuery } from "@/viamentor/data/viamentor-responsive-utils";
 * import { SwipeableCard } from "@/viamentor/components/viamentor-swipeable-card";
 *
 * const isMobile = useMediaQuery("(max-width: 768px)");
 *
 * {isMobile ? (
 *   <div className="space-y-3">
 *     {data.map(item => (
 *       <SwipeableCard
 *         key={item.id}
 *         onSwipeLeft={() => handleDelete(item.id)}
 *         onSwipeRight={() => handleEdit(item.id)}
 *       >
 *         <div className="p-4">
 *           <p className="font-medium">{item.name}</p>
 *           <p className="text-sm text-muted-foreground">{item.email}</p>
 *           <div className="mt-2 flex gap-2">
 *             <Button size="sm">Voir</Button>
 *             <Button size="sm" variant="outline">Modifier</Button>
 *           </div>
 *         </div>
 *       </SwipeableCard>
 *     ))}
 *   </div>
 * ) : (
 *   <Table>...</Table>
 * )}
 * ```
 */

export const TABLE_MIGRATIONS = [
  {
    file: "@/viamentor/components/viamentor-students-table",
    priority: "HIGH",
    notes: "Table élèves - Convertir en cards mobile avec swipe actions",
  },
  {
    file: "@/viamentor/components/viamentor-instructors-table",
    priority: "HIGH",
    notes: "Table moniteurs - Cards mobile + swipe",
  },
  {
    file: "@/viamentor/components/viamentor-vehicles-table",
    priority: "MEDIUM",
    notes: "Table véhicules - Cards mobile + swipe",
  },
  {
    file: "@/viamentor/components/viamentor-invoices-table",
    priority: "HIGH",
    notes: "Table factures - Cards mobile + swipe",
  },
  {
    file: "@/viamentor/components/viamentor-invoices-list-table",
    priority: "HIGH",
    notes: "Liste factures - Cards mobile + filtres adaptatifs",
  },
  {
    file: "@/viamentor/components/viamentor-tenants-table-view",
    priority: "MEDIUM",
    notes: "Table tenants - Cards mobile + swipe",
  },
  {
    file: "@/viamentor/components/viamentor-payments-stats-cards",
    priority: "MEDIUM",
    notes: "Stats paiements - Grid responsive 1/2/4 colonnes",
  },
];

// ============================================================================
// PHASE 5: GRIDS (4 composants)
// ============================================================================

/**
 * Pattern Grid Responsive
 *
 * AVANT:
 * ```tsx
 * <div className="grid grid-cols-3 gap-4">
 *   {items.map(item => <Card key={item.id}>...</Card>)}
 * </div>
 * ```
 *
 * APRÈS:
 * ```tsx
 * <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 *   {items.map(item => (
 *     <SwipeableCard
 *       key={item.id}
 *       onSwipeLeft={() => handleDelete(item.id)}
 *       onSwipeRight={() => handleEdit(item.id)}
 *     >
 *       <Card>...</Card>
 *     </SwipeableCard>
 *   ))}
 * </div>
 * ```
 */

export const GRID_MIGRATIONS = [
  {
    file: "@/viamentor/components/viamentor-students-grid-view",
    priority: "HIGH",
    notes: "Grid élèves - 1/2/3 colonnes + swipe actions",
  },
  {
    file: "@/viamentor/components/viamentor-instructors-grid-view",
    priority: "HIGH",
    notes: "Grid moniteurs - 1/2/3 colonnes + swipe",
  },
  {
    file: "@/viamentor/components/viamentor-vehicles-grid-view",
    priority: "MEDIUM",
    notes: "Grid véhicules - 1/2/3 colonnes + swipe",
  },
  {
    file: "@/viamentor/components/viamentor-tenants-grid-view",
    priority: "MEDIUM",
    notes: "Grid tenants - 1/2/3 colonnes + swipe",
  },
];

// ============================================================================
// PHASE 6: DETAIL PAGES (4 pages)
// ============================================================================

/**
 * Pattern Detail Page Responsive
 *
 * AVANT:
 * ```tsx
 * <div className="space-y-6">
 *   <Header />
 *   <Tabs>
 *     <TabsList>
 *       <TabsTrigger value="info">Informations</TabsTrigger>
 *       <TabsTrigger value="planning">Planning</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="info">...</TabsContent>
 *   </Tabs>
 * </div>
 * ```
 *
 * APRÈS:
 * ```tsx
 * <ResponsivePageWrapper
 *   title={student.name}
 *   sections={[
 *     { id: "info", label: "Informations", content: <InfoTab /> },
 *     { id: "planning", label: "Planning", content: <PlanningTab /> },
 *   ]}
 *   mobileTabsEnabled={true}
 *   swipeEnabled={true}
 * />
 * ```
 */

export const DETAIL_PAGE_MIGRATIONS = [
  {
    file: "@/viamentor/pages/viamentor-student-detail-page",
    priority: "HIGH",
    tabs: 6,
    notes: "6 tabs - Tabs scrollables mobile + swipe navigation",
  },
  {
    file: "@/viamentor/pages/viamentor-instructor-detail-page",
    priority: "HIGH",
    tabs: 4,
    notes: "4 tabs - Mobile optimized + swipe",
  },
  {
    file: "@/viamentor/pages/viamentor-vehicle-detail-page",
    priority: "MEDIUM",
    tabs: 5,
    notes: "5 tabs - Tabs mobile + swipe",
  },
  {
    file: "@/viamentor/pages/viamentor-tenant-detail-page",
    priority: "MEDIUM",
    tabs: 6,
    notes: "6 tabs - Tabs scrollables + swipe",
  },
];

// ============================================================================
// RÉCAPITULATIF
// ============================================================================

export const MIGRATION_SUMMARY = {
  total: 42,
  byPhase: {
    dashboards: 11,
    analytics: 6,
    wizards: 9,
    tables: 8,
    grids: 4,
    detailPages: 4,
  },
  byPriority: {
    HIGH: 24,
    MEDIUM: 14,
    LOW: 4,
  },
  estimatedTime: {
    dashboards: "4-5 heures",
    analytics: "3-4 heures",
    wizards: "3-4 heures",
    tables: "2-3 heures",
    grids: "1-2 heures",
    detailPages: "2-3 heures",
    total: "15-21 heures",
  },
};

// ============================================================================
// CHECKLIST VALIDATION
// ============================================================================

export const VALIDATION_CHECKLIST = {
  mobile: [
    "✅ Tabs horizontales scrollables",
    "✅ Swipe left/right pour naviguer",
    "✅ Touch-friendly buttons (min 44x44px)",
    "✅ Forms avec validation inline",
    "✅ Charts hauteur adaptative (200px mobile, 300px+ desktop)",
    "✅ Tables converties en cards",
    "✅ Grid 1 colonne sur mobile",
    "✅ Spacing réduit (space-y-3 au lieu de space-y-6)",
  ],

  tablet: [
    "✅ Grid 2 colonnes",
    "✅ Tabs visibles (pas de scroll)",
    "✅ Charts hauteur intermédiaire",
    "✅ Spacing normal",
  ],

  desktop: [
    "✅ Grid 3-4 colonnes",
    "✅ Sections stacked ou grid selon layout",
    "✅ Charts pleine hauteur",
    "✅ Spacing relaxed",
  ],

  gestures: [
    "✅ Swipe left/right pour navigation",
    "✅ Swipe left pour delete",
    "✅ Swipe right pour edit",
    "✅ Long press pour détails",
    "✅ Pinch zoom sur images/charts",
  ],
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
  DASHBOARD_MIGRATIONS,
  ANALYTICS_MIGRATIONS,
  WIZARD_MIGRATIONS,
  TABLE_MIGRATIONS,
  GRID_MIGRATIONS,
  DETAIL_PAGE_MIGRATIONS,
  MIGRATION_SUMMARY,
  VALIDATION_CHECKLIST,
};
