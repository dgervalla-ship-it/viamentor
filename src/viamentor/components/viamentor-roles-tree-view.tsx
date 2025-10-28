/**
 * VIAMENTOR - Roles TreeView Component
 * TreeView vertical hiérarchique 15 niveaux avec cards, badges gradient, stats
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShieldIcon,
  UsersIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  SettingsIcon,
  MoreVerticalIcon,
  EditIcon,
  EyeIcon,
  CopyIcon,
  PowerIcon,
  PowerOffIcon,
  TrashIcon,
} from "lucide-react";
import { type Role } from "@/viamentor/data/viamentor-admin-roles-data";
import {
  adminRolesTranslations,
  type AdminRolesLocale,
} from "@/viamentor/data/viamentor-admin-roles-i18n";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface RolesTreeViewProps {
  roles: Role[];
  locale?: AdminRolesLocale;
  onEdit?: (role: Role) => void;
  onViewPermissions?: (role: Role) => void;
  onViewUsers?: (role: Role) => void;
  onDuplicate?: (role: Role) => void;
  onToggleActive?: (role: Role) => void;
  onDelete?: (role: Role) => void;
  className?: string;
}

// ============================================================================
// ICON MAP
// ============================================================================

const iconMap = {
  Shield: ShieldIcon,
  Users: UsersIcon,
  GraduationCap: GraduationCapIcon,
  Briefcase: BriefcaseIcon,
  Settings: SettingsIcon,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getLevelGradient(level: number): string {
  if (level >= 90) return "from-purple-500 to-purple-700";
  if (level >= 80) return "from-blue-500 to-blue-700";
  if (level >= 70) return "from-indigo-500 to-indigo-700";
  if (level >= 60) return "from-cyan-500 to-cyan-700";
  if (level >= 50) return "from-teal-500 to-teal-700";
  if (level >= 40) return "from-green-500 to-green-700";
  if (level >= 30) return "from-yellow-500 to-yellow-700";
  return "from-gray-500 to-gray-700";
}

function buildRoleTree(roles: Role[]): Role[] {
  const roleMap = new Map<string, Role & { children: Role[] }>();
  const rootRoles: (Role & { children: Role[] })[] = [];

  // Initialize all roles with children array
  roles.forEach((role) => {
    roleMap.set(role.id, { ...role, children: [] });
  });

  // Build tree structure
  roles.forEach((role) => {
    const roleWithChildren = roleMap.get(role.id)!;
    if (role.parentId) {
      const parent = roleMap.get(role.parentId);
      if (parent) {
        parent.children.push(roleWithChildren);
      } else {
        rootRoles.push(roleWithChildren);
      }
    } else {
      rootRoles.push(roleWithChildren);
    }
  });

  // Sort by level (highest first)
  const sortByLevel = (a: Role, b: Role) => b.level - a.level;
  rootRoles.sort(sortByLevel);
  rootRoles.forEach((role) => role.children.sort(sortByLevel));

  return rootRoles;
}

// ============================================================================
// ROLE CARD COMPONENT
// ============================================================================

interface RoleCardProps {
  role: Role & { children?: Role[] };
  locale: AdminRolesLocale;
  depth: number;
  onEdit?: (role: Role) => void;
  onViewPermissions?: (role: Role) => void;
  onViewUsers?: (role: Role) => void;
  onDuplicate?: (role: Role) => void;
  onToggleActive?: (role: Role) => void;
  onDelete?: (role: Role) => void;
}

function RoleCard({
  role,
  locale,
  depth,
  onEdit,
  onViewPermissions,
  onViewUsers,
  onDuplicate,
  onToggleActive,
  onDelete,
}: RoleCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const t = adminRolesTranslations[locale].roles;
  const Icon = iconMap[role.icon];
  const hasChildren = role.children && role.children.length > 0;

  return (
    <div
      className={cn(
        "space-y-2",
        depth > 0 && "ml-8 border-l-2 border-border pl-4"
      )}
    >
      <Card
        className={cn(
          "w-full transition-all hover:shadow-md",
          !role.isActive && "opacity-60"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            {/* Left: Icon + Info */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-1">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                {/* Title + Level Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{role.name}</h3>
                  <Badge
                    className={cn(
                      "bg-gradient-to-r text-white",
                      getLevelGradient(role.level)
                    )}
                  >
                    {role.level}
                  </Badge>
                  {!role.isSystem && (
                    <Badge variant="outline" className="text-xs">
                      Custom
                    </Badge>
                  )}
                  {!role.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      {t.actions.disable}
                    </Badge>
                  )}
                </div>

                {/* Slug */}
                <code className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                  {role.slug}
                </code>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {role.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button
                    onClick={() => onViewUsers?.(role)}
                    className="hover:text-foreground transition-colors"
                  >
                    <span className="font-medium text-foreground">
                      {role.usersCount}
                    </span>{" "}
                    {t.card.users}
                  </button>
                  <button
                    onClick={() => onViewPermissions?.(role)}
                    className="hover:text-foreground transition-colors"
                  >
                    <span className="font-medium text-foreground">
                      {role.permissionsCount}
                    </span>{" "}
                    {t.card.permissions}
                    {role.inheritedPermissionsCount > 0 && (
                      <span className="text-xs ml-1">
                        (+{role.inheritedPermissionsCount} {t.card.inherited})
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(role)}>
                  <EditIcon className="h-4 w-4 mr-2" />

                  {t.actions.edit}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewPermissions?.(role)}>
                  <EyeIcon className="h-4 w-4 mr-2" />

                  {t.actions.viewPermissions}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewUsers?.(role)}>
                  <UsersIcon className="h-4 w-4 mr-2" />

                  {t.actions.viewUsers}
                </DropdownMenuItem>
                {!role.isSystem && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => onDuplicate?.(role)}>
                      <CopyIcon className="h-4 w-4 mr-2" />

                      {t.actions.duplicate}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleActive?.(role)}>
                      {role.isActive ? (
                        <>
                          <PowerOffIcon className="h-4 w-4 mr-2" />

                          {t.actions.disable}
                        </>
                      ) : (
                        <>
                          <PowerIcon className="h-4 w-4 mr-2" />

                          {t.actions.enable}
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => onDelete?.(role)}
                      className="text-destructive focus:text-destructive"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />

                      {t.actions.delete}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Expand/Collapse for children */}
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs"
            >
              {isExpanded ? "Masquer" : "Afficher"} {role.children!.length}{" "}
              sous-rôles
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="space-y-2">
          {role.children!.map((child) => (
            <RoleCard
              key={child.id}
              role={child}
              locale={locale}
              depth={depth + 1}
              onEdit={onEdit}
              onViewPermissions={onViewPermissions}
              onViewUsers={onViewUsers}
              onDuplicate={onDuplicate}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function RolesTreeView({
  roles,
  locale = "fr",
  onEdit,
  onViewPermissions,
  onViewUsers,
  onDuplicate,
  onToggleActive,
  onDelete,
  className,
}: RolesTreeViewProps) {
  const roleTree = buildRoleTree(roles);

  return (
    <div className={cn("space-y-4", className)}>
      {roleTree.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          locale={locale}
          depth={0}
          onEdit={onEdit}
          onViewPermissions={onViewPermissions}
          onViewUsers={onViewUsers}
          onDuplicate={onDuplicate}
          onToggleActive={onToggleActive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
