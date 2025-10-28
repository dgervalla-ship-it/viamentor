/**
 * VIAMENTOR - Super Admin Page
 * Dashboard complet Super Administrateur
 *
 * FEATURES:
 * - Stats système globales
 * - Monitoring tenants en temps réel
 * - Activité plateforme
 * - Alertes sécurité
 * - Logs système
 * - Métriques revenus et usage
 * - Accès RBAC complet
 */

"use client";

import { useState, lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ServerIcon,
  UsersIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { BarChart3Icon, ActivityIcon, FileTextIcon } from "lucide-react";
import {
  getSuperAdminQuickActions,
  getSectionTitles,
} from "@/polymet/data/viamentor-super-admin-quick-actions";
import {
  mockSystemStats,
  mockTenantOverviews,
  mockPlatformActivities,
  mockSecurityAlerts,
  mockSystemLogs,
  type TenantOverview,
} from "@/polymet/data/viamentor-super-admin-data";
import {
  superAdminI18n,
  type SuperAdminLocale,
} from "@/polymet/data/viamentor-super-admin-i18n";

// ============================================================================
// LAZY LOADED COMPONENTS (Code Splitting)
// ============================================================================

// Heavy components loaded only when needed
const RevenueUsageMetrics = lazy(
  () => import("@/polymet/components/viamentor-revenue-usage-metrics")
);
const TenantActionsDialog = lazy(
  () => import("@/polymet/components/viamentor-tenant-actions-dialog")
);
const CriticalAlertsNotifications = lazy(
  () => import("@/polymet/components/viamentor-critical-alerts-notifications")
);
const SuperAdminWelcomeBanner = lazy(
  () => import("@/polymet/components/viamentor-super-admin-welcome-banner")
);
const QuickActionsGrid = lazy(
  () => import("@/polymet/components/viamentor-quick-actions-grid")
);

// ============================================================================
// LOADING SKELETONS
// ============================================================================

const ChartSkeleton = () => (
  <Card className="p-6">
    <Skeleton className="h-8 w-48 mb-4 bg-muted" />

    <Skeleton className="h-64 w-full bg-muted" />
  </Card>
);

const GridSkeleton = () => (
  <Card className="p-6">
    <Skeleton className="h-6 w-32 mb-4 bg-muted" />

    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-24 w-full bg-muted" />

      <Skeleton className="h-24 w-full bg-muted" />

      <Skeleton className="h-24 w-full bg-muted" />

      <Skeleton className="h-24 w-full bg-muted" />
    </div>
  </Card>
);

const BannerSkeleton = () => (
  <Card className="p-6">
    <Skeleton className="h-20 w-full bg-muted" />
  </Card>
);

// ============================================================================
// TYPES
// ============================================================================

interface SuperAdminPageProps {
  locale?: SuperAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SuperAdminPage({ locale = "fr" }: SuperAdminPageProps) {
  const t = superAdminI18n[locale];
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<TenantOverview | null>(
    null
  );
  const [tenantAction, setTenantAction] = useState<
    "suspend" | "activate" | null
  >(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  // Quick actions
  const quickActions = getSuperAdminQuickActions(locale);
  const sectionTitles = getSectionTitles(locale);

  // ============================================================================
  // STATS CARDS
  // ============================================================================

  const renderStatsCards = () => {
    const stats = mockSystemStats;

    const cards = [
      {
        label: t.stats.totalTenants,
        value: stats.totalTenants.toString(),
        subValue: `${stats.activeTenants} ${t.tenants.status.toLowerCase()}`,
        icon: BuildingOffice2Icon,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950",
      },
      {
        label: t.stats.totalUsers,
        value: stats.totalUsers.toLocaleString(),
        subValue: `${stats.activeUsers.toLocaleString()} ${t.stats.activeUsers.toLowerCase()}`,
        icon: UsersIcon,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950",
      },
      {
        label: t.stats.monthlyRevenue,
        value: `CHF ${(stats.monthlyRevenue / 1000).toFixed(0)}K`,
        subValue: `CHF ${(stats.totalRevenue / 1000).toFixed(0)}K ${t.stats.totalRevenue.toLowerCase()}`,
        icon: CurrencyDollarIcon,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950",
      },
      {
        label: t.stats.systemHealth,
        value: t.health[stats.systemHealth],
        subValue: `${stats.uptime}% ${t.stats.uptime.toLowerCase()}`,
        icon:
          stats.systemHealth === "healthy"
            ? CheckCircleIcon
            : ExclamationTriangleIcon,
        color:
          stats.systemHealth === "healthy"
            ? "text-green-600 dark:text-green-400"
            : stats.systemHealth === "warning"
              ? "text-orange-600 dark:text-orange-400"
              : "text-red-600 dark:text-red-400",
        bgColor:
          stats.systemHealth === "healthy"
            ? "bg-green-50 dark:bg-green-950"
            : stats.systemHealth === "warning"
              ? "bg-orange-50 dark:bg-orange-950"
              : "bg-red-50 dark:bg-red-950",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.subValue}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // ============================================================================
  // TENANTS TABLE
  // ============================================================================

  const renderTenantsTable = () => {
    const filteredTenants = mockTenantOverviews.filter((tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">{t.tenants.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredTenants.length} tenants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.actions.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <FunnelIcon className="h-4 w-4 mr-2" />

              {t.actions.filter}
            </Button>
            <Button variant="outline" size="sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />

              {t.actions.export}
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.tenants.name}</TableHead>
                <TableHead>{t.tenants.plan}</TableHead>
                <TableHead>{t.tenants.status}</TableHead>
                <TableHead className="text-right">{t.tenants.users}</TableHead>
                <TableHead className="text-right">
                  {t.tenants.students}
                </TableHead>
                <TableHead className="text-right">
                  {t.tenants.revenue}
                </TableHead>
                <TableHead>{t.tenants.health}</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tenant.plan === "enterprise"
                          ? "default"
                          : tenant.plan === "professional"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {t.plans[tenant.plan]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tenant.status === "active"
                          ? "default"
                          : tenant.status === "trial"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {t.tenantStatus[tenant.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{tenant.users}</TableCell>
                  <TableCell className="text-right">
                    {tenant.students}
                  </TableCell>
                  <TableCell className="text-right">
                    CHF {tenant.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          tenant.health === "healthy"
                            ? "bg-green-500"
                            : tenant.health === "warning"
                              ? "bg-orange-500"
                              : "bg-red-500"
                        }`}
                      />

                      <span className="text-sm">{t.health[tenant.health]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <EllipsisVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          {t.tenants.viewDetails}
                        </DropdownMenuItem>
                        {tenant.status === "active" ? (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedTenant(tenant);
                              setTenantAction("suspend");
                              setActionDialogOpen(true);
                            }}
                          >
                            {t.tenants.suspend}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTenant(tenant);
                              setTenantAction("activate");
                              setActionDialogOpen(true);
                            }}
                          >
                            {t.tenants.activate}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  };

  // ============================================================================
  // ACTIVITY FEED
  // ============================================================================

  const renderActivityFeed = () => {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{t.activity.recentActivity}</h2>
          <Button variant="outline" size="sm">
            {t.activity.viewAll}
          </Button>
        </div>

        <div className="space-y-4">
          {mockPlatformActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${
                  activity.severity === "critical"
                    ? "bg-red-50 dark:bg-red-950"
                    : activity.severity === "error"
                      ? "bg-orange-50 dark:bg-orange-950"
                      : activity.severity === "warning"
                        ? "bg-yellow-50 dark:bg-yellow-950"
                        : "bg-blue-50 dark:bg-blue-950"
                }`}
              >
                {activity.type === "tenant_created" ? (
                  <BuildingOffice2Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                ) : activity.type === "payment_received" ? (
                  <CurrencyDollarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : activity.type === "security_event" ? (
                  <ShieldCheckIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                ) : activity.type === "system_alert" ? (
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{activity.description}</p>
                    {activity.tenantName && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.tenantName}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      activity.severity === "critical" ||
                      activity.severity === "error"
                        ? "destructive"
                        : activity.severity === "warning"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {t.severity[activity.severity]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(activity.timestamp).toLocaleString(locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // ============================================================================
  // SECURITY ALERTS
  // ============================================================================

  const renderSecurityAlerts = () => {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5" />

            <h2 className="text-xl font-semibold">{t.security.alerts}</h2>
          </div>
          <Button variant="outline" size="sm">
            {t.activity.viewAll}
          </Button>
        </div>

        <div className="space-y-3">
          {mockSecurityAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 border rounded-lg"
            >
              <div
                className={`p-2 rounded-lg ${
                  alert.severity === "critical"
                    ? "bg-red-50 dark:bg-red-950"
                    : alert.severity === "high"
                      ? "bg-orange-50 dark:bg-orange-950"
                      : alert.severity === "medium"
                        ? "bg-yellow-50 dark:bg-yellow-950"
                        : "bg-blue-50 dark:bg-blue-950"
                }`}
              >
                <ExclamationTriangleIcon
                  className={`h-5 w-5 ${
                    alert.severity === "critical"
                      ? "text-red-600 dark:text-red-400"
                      : alert.severity === "high"
                        ? "text-orange-600 dark:text-orange-400"
                        : alert.severity === "medium"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-blue-600 dark:text-blue-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{alert.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.securityTypes[alert.type]}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.status === "resolved"
                        ? "default"
                        : alert.status === "investigating"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {t.securityStatus[alert.status]}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString(locale)}
                  </p>
                  {alert.status === "open" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t.security.investigate}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.security.resolve}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // ============================================================================
  // SYSTEM LOGS
  // ============================================================================

  const renderSystemLogs = () => {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{t.logs.systemLogs}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ArrowPathIcon className="h-4 w-4 mr-2" />

              {t.actions.refresh}
            </Button>
            <Button variant="outline" size="sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />

              {t.logs.export}
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.logs.level}</TableHead>
                <TableHead>{t.logs.service}</TableHead>
                <TableHead>{t.logs.message}</TableHead>
                <TableHead>{t.logs.timestamp}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSystemLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge
                      variant={
                        log.level === "error" || log.level === "fatal"
                          ? "destructive"
                          : log.level === "warn"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {t.logLevels[log.level]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.service}
                  </TableCell>
                  <TableCell className="max-w-md truncate">
                    {log.message}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString(locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  // Header actions with lazy loading
  const headerActions = (
    <div className="flex gap-2">
      <Suspense fallback={<Skeleton className="h-9 w-9 bg-muted" />}>
        <CriticalAlertsNotifications
          locale={locale}
          onNotificationClick={(notification) => {
            console.log("Notification clicked:", notification);
          }}
        />
      </Suspense>

      <Button variant="outline" size="sm">
        <ArrowPathIcon className="h-4 w-4 mr-2" />

        {t.actions.refresh}
      </Button>
      <Button variant="outline" size="sm">
        <ServerIcon className="h-4 w-4 mr-2" />

        {t.actions.configure}
      </Button>
    </div>
  );

  // Alerts section with lazy loading
  const alertsSection = showWelcomeBanner && (
    <Suspense fallback={<BannerSkeleton />}>
      <SuperAdminWelcomeBanner
        locale={locale}
        onDismiss={() => setShowWelcomeBanner(false)}
      />
    </Suspense>
  );

  return (
    <>
      <ResponsivePageWrapper
        title={t.page.title}
        description={t.page.description}
        actions={headerActions}
        alerts={alertsSection}
        sections={[
          {
            id: "stats",
            label: t.tabs.overview,
            icon: <BarChart3Icon className="h-4 w-4" />,

            badge: "4",
            content: (
              <div className="space-y-6">
                {renderStatsCards()}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Suspense fallback={<GridSkeleton />}>
                    <QuickActionsGrid
                      title={sectionTitles.critical}
                      actions={quickActions.critical}
                      columns={2}
                    />
                  </Suspense>

                  <Suspense fallback={<GridSkeleton />}>
                    <QuickActionsGrid
                      title={sectionTitles.management}
                      actions={quickActions.management}
                      columns={2}
                    />
                  </Suspense>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Suspense fallback={<GridSkeleton />}>
                    <QuickActionsGrid
                      title={sectionTitles.monitoring}
                      actions={quickActions.monitoring}
                      columns={2}
                    />
                  </Suspense>

                  <Suspense fallback={<GridSkeleton />}>
                    <QuickActionsGrid
                      title={sectionTitles.configuration}
                      actions={quickActions.configuration}
                      columns={2}
                    />
                  </Suspense>
                </div>
                <Suspense fallback={<ChartSkeleton />}>
                  <RevenueUsageMetrics locale={locale} />
                </Suspense>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {renderActivityFeed()}
                  {renderSecurityAlerts()}
                </div>
              </div>
            ),
          },
          {
            id: "tenants",
            label: t.tabs.tenants,
            icon: <BuildingOffice2Icon className="h-4 w-4" />,

            badge: mockTenantOverviews.length.toString(),
            content: renderTenantsTable(),
          },
          {
            id: "activity",
            label: t.tabs.activity,
            icon: <ActivityIcon className="h-4 w-4" />,

            badge: mockPlatformActivities.length.toString(),
            content: renderActivityFeed(),
          },
          {
            id: "security",
            label: t.tabs.security,
            icon: <ShieldCheckIcon className="h-4 w-4" />,

            badge: mockSecurityAlerts
              .filter((a) => a.status === "open")
              .length.toString(),
            content: renderSecurityAlerts(),
          },
          {
            id: "logs",
            label: t.tabs.logs,
            icon: <FileTextIcon className="h-4 w-4" />,

            content: renderSystemLogs(),
          },
        ]}
        mobileTabsEnabled={true}
        mobileTabsBreakpoint="lg"
        swipeEnabled={true}
        layout="stacked"
        spacing="normal"
      />

      <Suspense fallback={null}>
        <TenantActionsDialog
          tenant={selectedTenant}
          action={tenantAction}
          open={actionDialogOpen}
          onOpenChange={setActionDialogOpen}
          onConfirm={(tenantId, action, data) => {
            console.log("Tenant action confirmed:", { tenantId, action, data });
            alert(
              `Tenant ${action === "suspend" ? "suspendu" : "activé"} avec succès`
            );
          }}
          locale={locale}
        />
      </Suspense>
    </>
  );
}

export default SuperAdminPage;
