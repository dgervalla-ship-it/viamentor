/**
 * VIAMENTOR - Admin Roles Page
 * Page gestion rôles hiérarchiques avec TreeView, stats et création
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangleIcon,
  PlusIcon,
  ShieldIcon,
  UsersIcon,
  KeyIcon,
  LayersIcon,
} from "lucide-react";
import { RolesTreeView } from "@/viamentor/components/viamentor-roles-tree-view";
import {
  mockRoles,
  type Role,
} from "@/viamentor/data/viamentor-admin-roles-data";
import {
  adminRolesTranslations,
  type AdminRolesLocale,
} from "@/viamentor/data/viamentor-admin-roles-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface AdminRolesPageProps {
  locale?: AdminRolesLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AdminRolesPage({ locale = "fr" }: AdminRolesPageProps) {
  const t = adminRolesTranslations[locale];
  const [roles] = useState<Role[]>(mockRoles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    slug: "",
    description: "",
    level: 50,
    parentId: "",
    active: true,
  });

  // Stats calculations
  const stats = {
    totalRoles: roles.length,
    assignedUsers: roles.reduce((sum, r) => sum + r.usersCount, 0),
    uniquePermissions: new Set(
      roles.flatMap((r) => Array(r.permissionsCount).fill(r.id))
    ).size,
    customRoles: roles.filter((r) => !r.isSystem).length,
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setNewRole({
      ...newRole,
      name,
      slug: name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, ""),
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <span>{t.breadcrumb.admin}</span>
        <span>/</span>
        <span className="text-foreground font-medium">
          {t.breadcrumb.roles}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t.roles.title}
          </h1>
          <h3 className="text-lg text-muted-foreground">{t.roles.subtitle}</h3>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-1 sm:mr-2" />

              {t.roles.create.title}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t.roles.create.title}</DialogTitle>
              <DialogDescription>{t.roles.create.parentHelp}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.roles.create.name}</Label>
                  <Input
                    id="name"
                    value={newRole.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder={t.roles.create.namePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">{t.roles.create.slug}</Label>
                  <Input
                    id="slug"
                    value={newRole.slug}
                    onChange={(e) =>
                      setNewRole({ ...newRole, slug: e.target.value })
                    }
                    placeholder={t.roles.create.slugPlaceholder}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  {t.roles.create.description}
                </Label>
                <Textarea
                  id="description"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  placeholder={t.roles.create.descriptionPlaceholder}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">
                  {t.roles.create.level} ({newRole.level})
                </Label>
                <div className="px-1">
                  <Slider
                    id="level"
                    value={[newRole.level]}
                    onValueChange={([value]) =>
                      setNewRole({ ...newRole, level: value })
                    }
                    min={1}
                    max={100}
                    step={1}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  {t.roles.create.levelHelp}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent" className="text-xs sm:text-sm">
                  {t.roles.create.parent}
                </Label>
                <Select
                  value={newRole.parentId}
                  onValueChange={(value) =>
                    setNewRole({ ...newRole, parentId: value })
                  }
                >
                  <SelectTrigger id="parent">
                    <SelectValue
                      placeholder={t.roles.create.parentPlaceholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {roles
                      .filter((r) => r.level > newRole.level)
                      .map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name} (Level {role.level})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={newRole.active}
                  onCheckedChange={(checked) =>
                    setNewRole({ ...newRole, active: checked as boolean })
                  }
                />

                <Label htmlFor="active" className="cursor-pointer">
                  {t.roles.create.active}
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                {t.roles.create.cancel}
              </Button>
              <Button
                onClick={() => {
                  console.log("Create role:", newRole);
                  setIsCreateDialogOpen(false);
                }}
              >
                {t.roles.create.submit}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Warning Alert */}
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />

        <AlertTitle>{t.roles.warningTitle}</AlertTitle>
        <div className="overflow-hidden">
          <AlertDescription className="break-words text-xs sm:text-sm">
            {t.roles.warningMessage}
          </AlertDescription>
        </div>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.roles.stats.totalRoles}
            </CardTitle>
            <LayersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalRoles}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.roles.stats.assignedUsers}
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.assignedUsers}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.roles.stats.uniquePermissions}
            </CardTitle>
            <KeyIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.uniquePermissions}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.roles.stats.customRoles}
            </CardTitle>
            <ShieldIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.customRoles}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles TreeView */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <RolesTreeView
          roles={roles}
          locale={locale}
          onEdit={(role) => console.log("Edit:", role)}
          onViewPermissions={(role) => console.log("Permissions:", role)}
          onViewUsers={(role) => console.log("Users:", role)}
          onDuplicate={(role) => console.log("Duplicate:", role)}
          onToggleActive={(role) => console.log("Toggle:", role)}
          onDelete={(role) => console.log("Delete:", role)}
        />
      </div>
    </div>
  );
}
