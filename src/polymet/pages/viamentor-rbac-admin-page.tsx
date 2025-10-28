import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShieldCheckIcon,
  UsersIcon,
  KeyIcon,
  SearchIcon,
  PlusIcon,
  SettingsIcon,
  AlertTriangleIcon,
  InfoIcon,
  DownloadIcon,
  UploadIcon,
  RefreshCwIcon,
} from "lucide-react";
import { RolesPermissionsManager } from "@/polymet/components/viamentor-roles-permissions-manager";
import { rbacI18n } from "@/polymet/data/viamentor-rbac-permissions-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RBACAdminPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface RBACStats {
  totalRoles: number;
  totalPermissions: number;
  totalUsers: number;
  activeAssignments: number;
  lastSync: string;
  systemHealth: "healthy" | "warning" | "error";
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  target: string;
  details: string;
  severity: "info" | "warning" | "error";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStats: RBACStats = {
  totalRoles: 15,
  totalPermissions: 150,
  totalUsers: 1247,
  activeAssignments: 3891,
  lastSync: "2024-01-15T10:30:00Z",
  systemHealth: "healthy",
};

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-15T10:25:00Z",
    action: "ROLE_CREATED",
    user: "admin@viamentor.ch",
    target: "Custom_Instructor",
    details: "Nouveau rôle moniteur personnalisé créé",
    severity: "info",
  },
  {
    id: "2",
    timestamp: "2024-01-15T09:45:00Z",
    action: "PERMISSION_GRANTED",
    user: "platform@viamentor.ch",
    target: "students.delete",
    details: "Permission accordée au rôle School_Admin",
    severity: "warning",
  },
  {
    id: "3",
    timestamp: "2024-01-15T08:30:00Z",
    action: "USER_ROLE_ASSIGNED",
    user: "admin@viamentor.ch",
    target: "user_123",
    details: "Rôle Instructor assigné à Jean Dupont",
    severity: "info",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ViaMenutorRBACAdminPage({ locale = "fr" }: RBACAdminPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);

  const t = rbacI18n[locale];

  const handleExportConfig = () => {
    setIsLoading(true);
    // Simulation export
    setTimeout(() => {
      setIsLoading(false);
      // Télécharger fichier JSON config
    }, 2000);
  };

  const handleImportConfig = () => {
    // Ouvrir file picker
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Traiter import
        console.log("Import config:", file.name);
      }
    };
    input.click();
  };

  const handleSyncRoles = () => {
    setIsLoading(true);
    // Simulation sync
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case "healthy":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertTriangleIcon className="h-4 w-4 text-destructive" />;

      case "warning":
        return <AlertTriangleIcon className="h-4 w-4 text-orange-500" />;

      default:
        return <InfoIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheckIcon className="h-8 w-8 text-primary" />

            {t.page.title}
          </h1>
          <p className="text-muted-foreground mt-1">{t.page.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportConfig}
            disabled={isLoading}
          >
            <UploadIcon className="h-4 w-4 mr-2" />

            {t.actions.import}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportConfig}
            disabled={isLoading}
          >
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.actions.export}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncRoles}
            disabled={isLoading}
          >
            <RefreshCwIcon
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />

            {t.actions.sync}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalRoles}
            </CardTitle>
            <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalRoles}</div>
            <p className="text-xs text-muted-foreground">
              {t.stats.hierarchical}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalPermissions}
            </CardTitle>
            <KeyIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalPermissions}
            </div>
            <p className="text-xs text-muted-foreground">{t.stats.granular}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalUsers}
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {t.stats.activeUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.systemHealth}
            </CardTitle>
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={getHealthBadgeVariant(mockStats.systemHealth)}>
                {t.health[mockStats.systemHealth]}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.stats.lastSync}:{" "}
              {new Date(mockStats.lastSync).toLocaleString(locale)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Status Alert */}
      {mockStats.systemHealth !== "healthy" && (
        <Alert>
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>{t.alerts.systemWarning}</AlertDescription>
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="management">{t.tabs.management}</TabsTrigger>
          <TabsTrigger value="audit">{t.tabs.audit}</TabsTrigger>
          <TabsTrigger value="settings">{t.tabs.settings}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Roles Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5" />

                  {t.overview.rolesHierarchy}
                </CardTitle>
                <CardDescription>{t.overview.rolesDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    name: "Super Admin",
                    level: 100,
                    users: 2,
                    color: "bg-red-500",
                  },
                  {
                    name: "Platform Admin",
                    level: 90,
                    users: 5,
                    color: "bg-orange-500",
                  },
                  {
                    name: "School Admin",
                    level: 80,
                    users: 45,
                    color: "bg-blue-500",
                  },
                  {
                    name: "Instructor",
                    level: 60,
                    users: 340,
                    color: "bg-green-500",
                  },
                  {
                    name: "Student",
                    level: 30,
                    users: 850,
                    color: "bg-purple-500",
                  },
                ].map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${role.color}`} />

                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {t.overview.level} {role.level}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {role.users} {t.overview.users}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Permissions Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyIcon className="h-5 w-5" />

                  {t.overview.permissionsSummary}
                </CardTitle>
                <CardDescription>
                  {t.overview.permissionsDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    resource: "students",
                    permissions: 10,
                    color: "bg-blue-500",
                  },
                  {
                    resource: "instructors",
                    permissions: 10,
                    color: "bg-green-500",
                  },
                  {
                    resource: "vehicles",
                    permissions: 8,
                    color: "bg-orange-500",
                  },
                  {
                    resource: "lessons",
                    permissions: 12,
                    color: "bg-purple-500",
                  },
                  {
                    resource: "invoices",
                    permissions: 15,
                    color: "bg-red-500",
                  },
                  {
                    resource: "settings",
                    permissions: 20,
                    color: "bg-gray-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />

                      <div className="font-medium capitalize">
                        {item.resource}
                      </div>
                    </div>
                    <Badge variant="outline">
                      {item.permissions} {t.overview.permissions}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Management Tab */}
        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.management.title}</CardTitle>
              <CardDescription>{t.management.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <RolesPermissionsManager locale={locale} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>{t.audit.title}</CardTitle>
                  <CardDescription>{t.audit.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <Input
                      placeholder={t.audit.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" />

                    {t.audit.export}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-4 border rounded-lg"
                  >
                    {getSeverityIcon(log.severity)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.action}</span>
                        <Badge variant="outline" className="text-xs">
                          {log.target}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {log.details}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{log.user}</span>
                        <span>
                          {new Date(log.timestamp).toLocaleString(locale)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.systemConfig}</CardTitle>
                <CardDescription>
                  {t.settings.systemConfigDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    {t.settings.sessionTimeout}
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="30"
                    className="w-32"
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.settings.sessionTimeoutDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-roles">
                    {t.settings.maxRolesPerUser}
                  </Label>
                  <Input
                    id="max-roles"
                    type="number"
                    defaultValue="3"
                    className="w-32"
                  />

                  <p className="text-xs text-muted-foreground">
                    {t.settings.maxRolesDescription}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.settings.auditLogging}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t.settings.auditLoggingDescription}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t.settings.enabled}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Policies */}
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.securityPolicies}</CardTitle>
                <CardDescription>
                  {t.settings.securityPoliciesDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.settings.enforceRLS}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t.settings.enforceRLSDescription}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t.settings.enabled}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.settings.requireMFA}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t.settings.requireMFADescription}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t.settings.adminOnly}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t.settings.passwordPolicy}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t.settings.passwordPolicyDescription}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t.settings.configure}
                  </Button>
                </div>

                <Separator />

                <Alert>
                  <InfoIcon className="h-4 w-4" />

                  <AlertDescription>{t.settings.securityNote}</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ViaMenutorRBACAdminPage;
