/**
 * VIAMENTOR Tenants Management Page
 *
 * Page de gestion des auto-écoles pour Platform Admin
 * Clean Code: 230 lignes
 *
 * @module pages/viamentor-tenants-page
 * @version 1.0.0
 */

import { useState, useMemo } from "react";
import {
  MOCK_TENANTS,
  SWISS_CANTONS,
  calculateTenantStats,
} from "@/polymet/data/viamentor-tenants-data";
import { useTenantsFilters } from "@/polymet/data/viamentor-tenants-filters-hook";
import { TenantsGridView } from "@/polymet/components/viamentor-tenants-grid-view";
import { TenantsTableView } from "@/polymet/components/viamentor-tenants-table-view";
import { CreateTenantWizard } from "@/polymet/components/viamentor-create-tenant-wizard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusIcon,
  LayoutGridIcon,
  ListIcon,
  FilterXIcon,
  SaveIcon,
  FolderIcon,
  TrashIcon,
} from "lucide-react";

type ViewMode = "grid" | "list";

/**
 * Page de gestion des tenants
 */
export function ViamentorTenantsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [presetName, setPresetName] = useState("");
  const [showPresetDialog, setShowPresetDialog] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const {
    filters,
    updateFilter,
    resetFilters,
    filteredTenants,
    hasActiveFilters,
    presets,
    savePreset,
    loadPreset,
    deletePreset,
  } = useTenantsFilters(MOCK_TENANTS);

  const stats = useMemo(
    () => calculateTenantStats(filteredTenants),
    [filteredTenants]
  );

  const handleSavePreset = () => {
    if (presetName.trim()) {
      savePreset(presetName.trim());
      setPresetName("");
      setShowPresetDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-[1600px] mx-auto p-6 space-y-4">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Gestion auto-écoles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestion auto-écoles</h1>
              <p className="text-muted-foreground mt-1">
                Gérez les auto-écoles de la plateforme VIAMENTOR
              </p>
            </div>
            <Button size="lg" onClick={() => setShowWizard(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Créer auto-école
            </Button>
          </div>

          {/* Stats KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{stats.active}</span>
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Trial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{stats.trial}</span>
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    Trial
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Suspended
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{stats.suspended}</span>
                  <Badge variant="destructive">Suspended</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total MRR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold">
                  CHF {stats.totalMrr.toLocaleString("fr-CH")}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="max-w-[1600px] mx-auto p-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom ou email..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select
              value={filters.plan}
              onValueChange={(value) => updateFilter("plan", value as any)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tous les plans</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) => updateFilter("status", value as any)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tous les status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Trial">Trial</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.canton}
              onValueChange={(value) => updateFilter("canton", value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Canton" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tous les cantons</SelectItem>
                {SWISS_CANTONS.map((canton) => (
                  <SelectItem key={canton.code} value={canton.code}>
                    {canton.code} - {canton.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                <FilterXIcon className="h-4 w-4 mr-2" />
                Reset filtres
              </Button>
            )}

            <Dialog open={showPresetDialog} onOpenChange={setShowPresetDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sauvegarder les filtres</DialogTitle>
                  <DialogDescription>
                    Donnez un nom à cette configuration de filtres
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder="Nom du preset..."
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                />

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowPresetDialog(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleSavePreset}>Sauvegarder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {presets.length > 0 && (
              <Select
                onValueChange={(id) => {
                  const preset = presets.find((p) => p.id === id);
                  if (preset) loadPreset(preset);
                }}
              >
                <SelectTrigger className="w-40">
                  <FolderIcon className="h-4 w-4 mr-2" />

                  <SelectValue placeholder="Presets" />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{preset.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePreset(preset.id);
                          }}
                        >
                          <TrashIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <div className="flex border border-border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredTenants.length} auto-école
            {filteredTenants.length > 1 ? "s" : ""} trouvée
            {filteredTenants.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* View */}
        {viewMode === "grid" ? (
          <TenantsGridView
            tenants={filteredTenants}
            onView={(tenant) => console.log("View:", tenant)}
            onEdit={(tenant) => console.log("Edit:", tenant)}
            onSettings={(tenant) => console.log("Settings:", tenant)}
            onImpersonate={(tenant) => console.log("Impersonate:", tenant)}
            onBilling={(tenant) => console.log("Billing:", tenant)}
          />
        ) : (
          <TenantsTableView
            tenants={filteredTenants}
            onView={(tenant) => console.log("View:", tenant)}
            onEdit={(tenant) => console.log("Edit:", tenant)}
            onDelete={(tenant) => console.log("Delete:", tenant)}
          />
        )}
      </div>

      {/* Create Tenant Wizard */}
      <CreateTenantWizard
        open={showWizard}
        onOpenChange={setShowWizard}
        onSuccess={(tenantId) => {
          console.log("Tenant created:", tenantId);
          // TODO: Refresh tenants list
          // TODO: Show success toast
        }}
      />
    </div>
  );
}
