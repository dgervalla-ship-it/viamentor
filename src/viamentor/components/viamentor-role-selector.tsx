/**
 * VIAMENTOR Role Selector Component
 *
 * Composant de sélection de rôle RBAC avec permissions
 * Respecte le standard Clean Code : < 200 lignes
 *
 * @module components/viamentor-role-selector
 * @version 1.0.0
 */

import { useState } from "react";
import {
  UserRole,
  ROLE_MATRIX,
  RoleUtils,
} from "@/viamentor/data/viamentor-roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldIcon, CheckCircle2Icon } from "lucide-react";

/**
 * Composant de sélection de rôle
 *
 * @example
 * ```tsx
 * <RoleSelector />
 * ```
 */
export function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    UserRole.SCHOOL_ADMIN
  );
  const roleData = ROLE_MATRIX[selectedRole];

  const rolesByLevel = [
    { level: 0, roles: RoleUtils.getRolesByLevel(0) },
    { level: 1, roles: RoleUtils.getRolesByLevel(1) },
    { level: 2, roles: RoleUtils.getRolesByLevel(2) },
    { level: 3, roles: RoleUtils.getRolesByLevel(3) },
    { level: 4, roles: RoleUtils.getRolesByLevel(4) },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldIcon className="h-5 w-5 text-primary" />

          <CardTitle>Système RBAC</CardTitle>
        </div>
        <CardDescription>15 rôles hiérarchiques</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {rolesByLevel.map(({ level, roles }) => (
            <div key={level} className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Niveau {level}
              </Badge>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Button
                    key={role}
                    size="sm"
                    variant={selectedRole === role ? "default" : "outline"}
                    onClick={() => setSelectedRole(role)}
                    className="text-xs"
                  >
                    {role.replace(/_/g, " ")}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-muted rounded-lg space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">{selectedRole.replace(/_/g, " ")}</p>
              <p className="text-sm text-muted-foreground">
                {roleData.description}
              </p>
            </div>
            {roleData.tenantScoped && (
              <Badge variant="secondary" className="text-xs">
                Tenant
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Permissions ({roleData.permissions.length})
            </p>
            <div className="space-y-1">
              {roleData.permissions.slice(0, 5).map((perm, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <CheckCircle2Icon className="h-3 w-3 text-green-600" />

                  <span className="text-xs">
                    {perm.action} {perm.category}
                  </span>
                </div>
              ))}
              {roleData.permissions.length > 5 && (
                <p className="text-xs text-muted-foreground pl-5">
                  +{roleData.permissions.length - 5} more...
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
