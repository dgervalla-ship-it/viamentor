/**
 * VIAMENTOR - Platform Admin Tenants Section
 * Section gestion tenants avec table/cards responsive
 *
 * FEATURES:
 * - Filtres recherche et statut
 * - Table desktop / Cards mobile
 * - Actions tenant (view, impersonate, suspend, activate)
 * - Export données
 */

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  SearchIcon,
  DownloadIcon,
  EyeIcon,
  UserIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
import {
  mockPlatformTenants,
  getTenantStatusColor,
  getHealthStatusColor,
  formatUptime,
  type PlatformAdminLocale,
  type PlatformTenant,
  type TenantStatus,
} from "@/viamentor/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/viamentor/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminTenantsSectionProps {
  locale?: PlatformAdminLocale;
  onViewTenant?: (tenant: PlatformTenant) => void;
  onImpersonate?: (tenant: PlatformTenant) => void;
  onSuspend?: (tenant: PlatformTenant) => void;
  onActivate?: (tenant: PlatformTenant) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorPlatformAdminTenantsSection({
  locale = "fr",
  onViewTenant,
  onImpersonate,
  onSuspend,
  onActivate,
}: PlatformAdminTenantsSectionProps) {
  const t = getPlatformAdminTranslations(locale);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TenantStatus | "all">("all");

  // Filter tenants
  const filteredTenants = mockPlatformTenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters - Responsive */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder={t.tenantsTable.filters.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value: any) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t.tenantsTable.filters.all}
                </SelectItem>
                <SelectItem value="active">
                  {t.tenantsTable.filters.active}
                </SelectItem>
                <SelectItem value="trial">
                  {t.tenantsTable.filters.trial}
                </SelectItem>
                <SelectItem value="suspended">
                  {t.tenantsTable.filters.suspended}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <DownloadIcon className="h-4 w-4 mr-2" />

              {t.actions.export}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table - Hidden on mobile */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>{t.tabs.tenants}</CardTitle>
          <CardDescription>{filteredTenants.length} tenants</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.tenantsTable.name}</TableHead>
                <TableHead>{t.tenantsTable.status}</TableHead>
                <TableHead>{t.tenantsTable.plan}</TableHead>
                <TableHead>{t.tenantsTable.users}</TableHead>
                <TableHead>{t.tenantsTable.mrr}</TableHead>
                <TableHead>{t.tenantsTable.uptime}</TableHead>
                <TableHead className="text-right">
                  {t.tenantsTable.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {tenant.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tenant.contact.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTenantStatusColor(tenant.status)}>
                      {t.tenantStatus[tenant.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{t.plans[tenant.plan]}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">
                        {tenant.users.total}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tenant.users.active} actifs
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">
                      CHF {tenant.billing.mrr}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getHealthStatusColor(tenant.health.status)}
                    >
                      {formatUptime(tenant.health.uptime)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewTenant?.(tenant)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onImpersonate?.(tenant)}
                      >
                        <UserIcon className="h-4 w-4" />
                      </Button>
                      {tenant.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSuspend?.(tenant)}
                        >
                          <PauseIcon className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onActivate?.(tenant)}
                        >
                          <PlayIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards - Visible only on mobile */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-muted-foreground">
            {filteredTenants.length} tenants
          </p>
        </div>
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">
                    {tenant.name}
                  </CardTitle>
                  <CardDescription className="text-xs truncate">
                    {tenant.contact.email}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getTenantStatusColor(tenant.status)}>
                    {t.tenantStatus[tenant.status]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {t.plans[tenant.plan]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">
                    {t.tenantsTable.users}
                  </p>
                  <p className="font-medium text-foreground">
                    {tenant.users.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tenant.users.active} actifs
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">
                    {t.tenantsTable.mrr}
                  </p>
                  <p className="font-medium text-foreground">
                    CHF {tenant.billing.mrr}
                  </p>
                </div>
              </div>

              {/* Uptime */}
              <div>
                <p className="text-muted-foreground text-xs mb-1">
                  {t.tenantsTable.uptime}
                </p>
                <Badge className={getHealthStatusColor(tenant.health.status)}>
                  {formatUptime(tenant.health.uptime)}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewTenant?.(tenant)}
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Voir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onImpersonate?.(tenant)}
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Accéder
                </Button>
                {tenant.status === "active" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSuspend?.(tenant)}
                  >
                    <PauseIcon className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onActivate?.(tenant)}
                  >
                    <PlayIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ViamentorPlatformAdminTenantsSection;
