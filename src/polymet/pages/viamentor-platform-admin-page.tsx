/**
 * VIAMENTOR - Platform Admin Page
 * Dashboard complet Platform Admin
 *
 * FEATURES:
 * - Vue d'ensemble système multi-tenant
 * - Gestion tenants avancée
 * - Monitoring infrastructure temps réel
 * - Gestion incidents
 * - Audit logs système
 * - Configuration plateforme
 * - Responsive mobile avec tabs
 * - Stats KPIs
 * - Actions admin
 *
 * RESPONSIVE:
 * - Tabs mobile pour navigation sections
 * - Cards adaptatives mobile
 * - Table → Cards sur mobile
 * - Touch-friendly actions
 */

import React, { useState } from "react";
import { ViamentorResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { ViamentorPlatformAdminOverviewSection } from "@/polymet/components/viamentor-platform-admin-overview-section";
import { ViamentorPlatformAdminTenantsSection } from "@/polymet/components/viamentor-platform-admin-tenants-section";
import { ViamentorPlatformAdminMonitoringSection } from "@/polymet/components/viamentor-platform-admin-monitoring-section";
import { ViamentorPlatformAdminIncidentsSection } from "@/polymet/components/viamentor-platform-admin-incidents-section";
import { ViamentorPlatformAdminAuditSection } from "@/polymet/components/viamentor-platform-admin-audit-section";
import { ViamentorPlatformAdminConfigurationSection } from "@/polymet/components/viamentor-platform-admin-configuration-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LayoutDashboardIcon,
  BuildingIcon,
  ActivityIcon,
  AlertTriangleIcon,
  FileTextIcon,
  SettingsIcon,
  RefreshCwIcon,
  DownloadIcon,
  SearchIcon,
  EyeIcon,
  UserIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  DollarSignIcon,
  ServerIcon,
  DatabaseIcon,
  CloudIcon,
  HardDriveIcon,
  ZapIcon,
  NetworkIcon,
  GlobeIcon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
  ClockIcon,
} from "lucide-react";
import {
  mockSystemStats,
  mockPlatformTenants,
  mockSystemComponents,
  mockSystemIncidents,
  mockAuditLogs,
  mockPlatformConfiguration,
  getTenantStatusColor,
  getHealthStatusColor,
  getIncidentSeverityColor,
  formatUptime,
  formatResponseTime,
  calculateUsagePercentage,
  type PlatformAdminLocale,
  type PlatformTenant,
  type SystemIncident,
  type TenantStatus,
} from "@/polymet/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/polymet/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminPageProps {
  locale?: PlatformAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorPlatformAdminPage({
  locale = "fr",
}: PlatformAdminPageProps) {
  const t = getPlatformAdminTranslations(locale);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TenantStatus | "all">("all");
  const [selectedTenant, setSelectedTenant] = useState<PlatformTenant | null>(
    null
  );
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: "suspend" | "activate" | "delete" | null;
    tenant: PlatformTenant | null;
  }>({ open: false, action: null, tenant: null });

  // Filter tenants
  const filteredTenants = mockPlatformTenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ============================================================================
  // SECTIONS CALLBACKS
  // ============================================================================

  const handleViewAllIncidents = () => {
    setActiveTab("incidents");
  };

  const handleViewTenant = (tenant: PlatformTenant) => {
    setSelectedTenant(tenant);
  };

  const handleImpersonate = (tenant: PlatformTenant) => {
    console.log("Impersonate tenant:", tenant.id);
  };

  const handleSuspend = (tenant: PlatformTenant) => {
    setActionDialog({ open: true, action: "suspend", tenant });
  };

  const handleActivate = (tenant: PlatformTenant) => {
    setActionDialog({ open: true, action: "activate", tenant });
  };

  // ============================================================================
  // OVERVIEW TAB
  // ============================================================================

  const OverviewTab = () => (
    <ViamentorPlatformAdminOverviewSection
      locale={locale}
      onViewAllIncidents={handleViewAllIncidents}
    />
  );

  // ============================================================================
  // TENANTS TAB - NOW USING RESPONSIVE SECTION
  // ============================================================================

  const TenantsTab = () => (
    <ViamentorPlatformAdminTenantsSection
      locale={locale}
      onViewTenant={handleViewTenant}
      onImpersonate={handleImpersonate}
      onSuspend={handleSuspend}
      onActivate={handleActivate}
    />
  );

  // ============================================================================
  // MONITORING TAB
  // ============================================================================

  const MonitoringTab = () => (
    <ViamentorPlatformAdminMonitoringSection locale={locale} />
  );

  // ============================================================================
  // INCIDENTS TAB
  // ============================================================================

  const IncidentsTab = () => (
    <ViamentorPlatformAdminIncidentsSection
      locale={locale}
      onCreateIncident={() => console.log("Create incident")}
    />
  );

  // ============================================================================
  // AUDIT TAB
  // ============================================================================

  const AuditTab = () => (
    <ViamentorPlatformAdminAuditSection locale={locale} />
  );

  // ============================================================================
  // CONFIGURATION TAB
  // ============================================================================

  const ConfigurationTab = () => (
    <ViamentorPlatformAdminConfigurationSection
      locale={locale}
      onSave={(config) => console.log("Save config:", config)}
      onCancel={() => console.log("Cancel")}
    />
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCwIcon className="h-4 w-4 mr-2" />

          {t.actions.refresh}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            <LayoutDashboardIcon className="h-4 w-4 mr-2" />

            {t.tabs.overview}
          </TabsTrigger>
          <TabsTrigger value="tenants">
            <BuildingIcon className="h-4 w-4 mr-2" />

            {t.tabs.tenants}
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            <ActivityIcon className="h-4 w-4 mr-2" />

            {t.tabs.monitoring}
          </TabsTrigger>
          <TabsTrigger value="incidents">
            <AlertTriangleIcon className="h-4 w-4 mr-2" />

            {t.tabs.incidents}
          </TabsTrigger>
          <TabsTrigger value="audit">
            <FileTextIcon className="h-4 w-4 mr-2" />

            {t.tabs.audit}
          </TabsTrigger>
          <TabsTrigger value="configuration">
            <SettingsIcon className="h-4 w-4 mr-2" />

            {t.tabs.configuration}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="tenants">
          <TenantsTab />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringTab />
        </TabsContent>

        <TabsContent value="incidents">
          <IncidentsTab />
        </TabsContent>

        <TabsContent value="audit">
          <AuditTab />
        </TabsContent>

        <TabsContent value="configuration">
          <ConfigurationTab />
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action === "suspend" && t.messages.confirmSuspend}
              {actionDialog.action === "activate" && t.messages.confirmActivate}
              {actionDialog.action === "delete" && t.messages.confirmDelete}
            </DialogTitle>
            <DialogDescription>{actionDialog.tenant?.name}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setActionDialog({ open: false, action: null, tenant: null })
              }
            >
              {t.actions.cancel}
            </Button>
            <Button
              variant={
                actionDialog.action === "delete" ? "destructive" : "default"
              }
              onClick={() => {
                console.log(actionDialog.action, actionDialog.tenant?.id);
                setActionDialog({ open: false, action: null, tenant: null });
              }}
            >
              {t.actions.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViamentorPlatformAdminPage;
