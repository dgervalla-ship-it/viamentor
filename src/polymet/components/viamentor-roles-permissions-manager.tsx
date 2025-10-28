/**
 * VIAMENTOR - Roles & Permissions Manager
 * Interface admin gestion RBAC complète
 *
 * FEATURES:
 * - DataTable roles avec hierarchy level
 * - Permissions grid filtrable par resource/action
 * - Assign/Unassign permissions to roles
 * - Create custom roles (non-system)
 * - Inherited permissions cascade display
 * - Search & filters
 *
 * USAGE:
 * ```tsx
 * <RolesPermissionsManager locale="fr" />
 * ```
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ShieldIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  rbacI18n,
  type RBACLocale,
} from "@/polymet/data/viamentor-rbac-permissions-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface Role {
  id: string;
  name: string;
  slug: string;
  description: string;
  level: number;
  parent_role_id: string | null;
  is_system: boolean;
  permissions_count: number;
  users_count: number;
}

interface Permission {
  id: string;
  name: string;
  resource: string;
  action: "create" | "read" | "update" | "delete" | "execute";
  description: string;
  is_system: boolean;
}

interface RolesPermissionsManagerProps {
  locale?: RBACLocale;
  onRoleCreate?: (role: Partial<Role>) => void;
  onRoleUpdate?: (id: string, role: Partial<Role>) => void;
  onRoleDelete?: (id: string) => void;
  onPermissionAssign?: (roleId: string, permissionId: string) => void;
  onPermissionUnassign?: (roleId: string, permissionId: string) => void;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    slug: "super_admin",
    description: "God mode accès complet système",
    level: 100,
    parent_role_id: null,
    is_system: true,
    permissions_count: 150,
    users_count: 2,
  },
  {
    id: "2",
    name: "Platform Admin",
    slug: "platform_admin",
    description: "Gestion tenants, billing, audit",
    level: 90,
    parent_role_id: "1",
    is_system: true,
    permissions_count: 45,
    users_count: 5,
  },
  {
    id: "3",
    name: "School Admin",
    slug: "school_admin",
    description: "Gestion complète auto-école",
    level: 80,
    parent_role_id: "2",
    is_system: false,
    permissions_count: 120,
    users_count: 15,
  },
  {
    id: "4",
    name: "Instructor",
    slug: "instructor",
    description: "Enseignement, évaluations, planning",
    level: 40,
    parent_role_id: null,
    is_system: false,
    permissions_count: 25,
    users_count: 45,
  },
  {
    id: "5",
    name: "Student",
    slug: "student",
    description: "Réservation leçons, progression",
    level: 30,
    parent_role_id: null,
    is_system: false,
    permissions_count: 12,
    users_count: 320,
  },
];

const mockPermissions: Permission[] = [
  {
    id: "p1",
    name: "students.create",
    resource: "students",
    action: "create",
    description: "Créer nouveaux élèves",
    is_system: true,
  },
  {
    id: "p2",
    name: "students.read",
    resource: "students",
    action: "read",
    description: "Consulter élèves",
    is_system: true,
  },
  {
    id: "p3",
    name: "students.update",
    resource: "students",
    action: "update",
    description: "Modifier élèves",
    is_system: true,
  },
  {
    id: "p4",
    name: "students.delete",
    resource: "students",
    action: "delete",
    description: "Supprimer élèves",
    is_system: true,
  },
  {
    id: "p5",
    name: "instructors.create",
    resource: "instructors",
    action: "create",
    description: "Créer moniteurs",
    is_system: true,
  },
  {
    id: "p6",
    name: "instructors.read",
    resource: "instructors",
    action: "read",
    description: "Consulter moniteurs",
    is_system: true,
  },
  {
    id: "p7",
    name: "lessons.create",
    resource: "lessons",
    action: "create",
    description: "Créer leçons",
    is_system: true,
  },
  {
    id: "p8",
    name: "lessons.read",
    resource: "lessons",
    action: "read",
    description: "Consulter leçons",
    is_system: true,
  },
  {
    id: "p9",
    name: "invoices.create",
    resource: "invoices",
    action: "create",
    description: "Créer factures",
    is_system: true,
  },
  {
    id: "p10",
    name: "invoices.read",
    resource: "invoices",
    action: "read",
    description: "Consulter factures",
    is_system: true,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function RolesPermissionsManager({
  locale = "fr",
  onRoleCreate,
  onRoleUpdate,
  onRoleDelete,
  onPermissionAssign,
  onPermissionUnassign,
}: RolesPermissionsManagerProps) {
  const t = rbacI18n[locale];

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterResource, setFilterResource] = useState<string>("all");
  const [filterAction, setFilterAction] = useState<string>("all");
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set());

  // Filtrer permissions
  const filteredPermissions = mockPermissions.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchResource =
      filterResource === "all" || p.resource === filterResource;
    const matchAction = filterAction === "all" || p.action === filterAction;
    return matchSearch && matchResource && matchAction;
  });

  // Resources uniques pour filtre
  const uniqueResources = Array.from(
    new Set(mockPermissions.map((p) => p.resource))
  );

  // Toggle expand role
  const toggleExpand = (roleId: string) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId);
    } else {
      newExpanded.add(roleId);
    }
    setExpandedRoles(newExpanded);
  };

  // Level color
  const getLevelColor = (level: number) => {
    if (level >= 90) return "bg-purple-500";
    if (level >= 70) return "bg-blue-500";
    if (level >= 50) return "bg-green-500";
    if (level >= 30) return "bg-yellow-500";
    return "bg-gray-500";
  };

  // Action color
  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-500";
      case "read":
        return "bg-blue-500";
      case "update":
        return "bg-yellow-500";
      case "delete":
        return "bg-red-500";
      case "execute":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldIcon className="w-6 h-6" />
            {t.ui.manage_roles} & {t.ui.permissions}
          </h2>
          <p className="text-sm text-muted-foreground">
            Gestion RBAC complète avec héritage hiérarchique
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              {t.ui.role} {t.ui.custom}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer Rôle Personnalisé</DialogTitle>
              <DialogDescription>
                Les rôles système ne peuvent pas être modifiés
              </DialogDescription>
            </DialogHeader>
            {/* Form create role */}
            <div className="space-y-4 py-4">
              <Input placeholder="Nom du rôle" />

              <Input placeholder="Slug (ex: custom_role)" />

              <Input placeholder="Description" />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Rôle parent (héritage)" />
                </SelectTrigger>
                <SelectContent>
                  {mockRoles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} (Level {r.level})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="w-full">Créer Rôle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne gauche: Roles Table */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {t.ui.roles} ({mockRoles.length})
            </h3>
            <Badge variant="secondary">
              {mockRoles.filter((r) => !r.is_system).length} {t.ui.custom}
            </Badge>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>{t.ui.role}</TableHead>
                  <TableHead className="text-center">{t.ui.level}</TableHead>
                  <TableHead className="text-center">
                    {t.ui.permissions}
                  </TableHead>
                  <TableHead className="text-center">Users</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRoles.map((role) => (
                  <TableRow
                    key={role.id}
                    className={`cursor-pointer ${selectedRole?.id === role.id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(role.id);
                        }}
                      >
                        {expandedRoles.has(role.id) ? (
                          <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground flex items-center gap-2">
                          {role.name}
                          {role.is_system && (
                            <Badge variant="secondary" className="text-xs">
                              {t.ui.system}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {role.slug}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`${getLevelColor(role.level)} text-white`}
                      >
                        {role.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{role.permissions_count}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-muted-foreground">
                        {role.users_count}
                      </span>
                    </TableCell>
                    <TableCell>
                      {!role.is_system && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <EditIcon className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <TrashIcon className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Colonne droite: Permissions Grid */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {t.ui.permissions} ({filteredPermissions.length})
            </h3>
            {selectedRole && (
              <Badge variant="secondary">{selectedRole.name}</Badge>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                placeholder={t.ui.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterResource} onValueChange={setFilterResource}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t.ui.filter_by_resource} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes ressources</SelectItem>
                  {uniqueResources.map((r) => (
                    <SelectItem key={r} value={r}>
                      {t.resources[r as keyof typeof t.resources]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t.ui.filter_by_action} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes actions</SelectItem>
                  {["create", "read", "update", "delete", "execute"].map(
                    (a) => (
                      <SelectItem key={a} value={a}>
                        {t.crudActions[a as keyof typeof t.crudActions]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Permissions List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredPermissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t.ui.no_permissions}
              </div>
            ) : (
              filteredPermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedRole?.id === "3"} // Mock: School Admin has permission
                    disabled={!selectedRole || selectedRole.is_system}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onPermissionAssign?.(selectedRole!.id, permission.id);
                      } else {
                        onPermissionUnassign?.(selectedRole!.id, permission.id);
                      }
                    }}
                  />

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">
                        {permission.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`${getActionColor(permission.action)} text-white text-xs`}
                      >
                        {t.crudActions[permission.action]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Selected Role Details */}
      {selectedRole && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Détails: {selectedRole.name}
            </h3>
            <div className="flex gap-2">
              <Badge
                className={`${getLevelColor(selectedRole.level)} text-white`}
              >
                Level {selectedRole.level}
              </Badge>
              {selectedRole.is_system && (
                <Badge variant="secondary">{t.ui.system}</Badge>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                {t.ui.permissions}
              </div>
              <div className="text-2xl font-bold text-foreground">
                {selectedRole.permissions_count}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Users</div>
              <div className="text-2xl font-bold text-foreground">
                {selectedRole.users_count}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                {t.ui.hierarchy}
              </div>
              <div className="text-sm text-foreground">
                {selectedRole.parent_role_id ? (
                  <span>
                    {t.ui.inherited_from}{" "}
                    <span className="font-medium">
                      {
                        mockRoles.find(
                          (r) => r.id === selectedRole.parent_role_id
                        )?.name
                      }
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">Racine</span>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedRole.description}
          </p>
        </Card>
      )}
    </div>
  );
}

export default RolesPermissionsManager;
