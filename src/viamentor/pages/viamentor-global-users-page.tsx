/**
 * VIAMENTOR - Global Users Management Page
 * Page gestion utilisateurs globaux tous tenants (Super Admin)
 *
 * FEATURES:
 * - Liste utilisateurs tous tenants
 * - Filtres avancés (tenant, rôle, statut)
 * - Actions bulk (suspend, activate, delete)
 * - Export CSV/Excel
 *
 * @module pages/viamentor-global-users-page
 */

import { useState } from "react";
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  PlusIcon,
  MoreVerticalIcon,
  ShieldIcon,
  Building2Icon,
  MailIcon,
  CalendarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ============================================================================
// TYPES
// ============================================================================

interface GlobalUser {
  id: string;
  name: string;
  email: string;
  role: string;
  tenant: string;
  tenantName: string;
  status: "active" | "suspended" | "pending";
  lastLogin: string;
  createdAt: string;
}

interface GlobalUsersPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_USERS: GlobalUser[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@autoecole-geneve.ch",
    role: "school_admin",
    tenant: "tenant-1",
    tenantName: "Auto-École Genève",
    status: "active",
    lastLogin: "2025-01-17 14:30",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@autoecole-lausanne.ch",
    role: "instructor",
    tenant: "tenant-2",
    tenantName: "Auto-École Lausanne",
    status: "active",
    lastLogin: "2025-01-17 09:15",
    createdAt: "2024-03-20",
  },
  {
    id: "3",
    name: "Pierre Bernard",
    email: "pierre.bernard@autoecole-geneve.ch",
    role: "student",
    tenant: "tenant-1",
    tenantName: "Auto-École Genève",
    status: "pending",
    lastLogin: "Jamais",
    createdAt: "2025-01-16",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function GlobalUsersPage({ locale = "fr" }: GlobalUsersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusBadge = (status: GlobalUser["status"]) => {
    const variants = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };

    const labels = {
      active: "Actif",
      suspended: "Suspendu",
      pending: "En attente",
    };

    return (
      <Badge className={variants[status]} variant="secondary">
        {labels[status]}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const labels: Record<string, string> = {
      super_admin: "Super Admin",
      platform_admin: "Platform Admin",
      school_admin: "School Admin",
      instructor: "Moniteur",
      student: "Élève",
      secretary: "Secrétaire",
    };

    return (
      <Badge variant="outline" className="font-normal">
        {labels[role] || role}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Utilisateurs Globaux
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestion centralisée de tous les utilisateurs de la plateforme
          </p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Utilisateurs
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <ShieldIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,654</div>
            <p className="text-xs text-muted-foreground">95.1% du total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspendus</CardTitle>
            <ShieldIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">4.1% du total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <CalendarIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">0.8% du total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Rechercher par nom, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tous les rôles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="school_admin">School Admin</SelectItem>
                <SelectItem value="instructor">Moniteur</SelectItem>
                <SelectItem value="student">Élève</SelectItem>
                <SelectItem value="secretary">Secrétaire</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="suspended">Suspendu</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtres
            </Button>

            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_USERS.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MailIcon className="h-3 w-3" />

                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2Icon className="h-4 w-4 text-muted-foreground" />

                      <span className="text-sm">{user.tenantName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir détails</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Suspendre</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default GlobalUsersPage;
