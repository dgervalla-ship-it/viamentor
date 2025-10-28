/**
 * VIAMENTOR - Users Management Page
 * Page de gestion des utilisateurs de l'école avec liste, filtres, rôles et actions
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  SearchIcon,
  PlusIcon,
  MoreVerticalIcon,
  UserIcon,
  MailIcon,
  ShieldIcon,
  EditIcon,
  TrashIcon,
  KeyIcon,
  UserCheckIcon,
  UserXIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface UsersManagementPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role:
    | "school_admin"
    | "secretary"
    | "instructor"
    | "accountant"
    | "marketing_manager";
  status: "active" | "inactive" | "pending";
  lastLogin?: Date;
  createdAt: Date;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  fr: {
    title: "Gestion des Utilisateurs",
    description: "Gérez les comptes utilisateurs de votre auto-école",
    search: "Rechercher un utilisateur...",
    addUser: "Ajouter un utilisateur",
    filters: {
      all: "Tous les rôles",
      school_admin: "Administrateur École",
      secretary: "Secrétaire",
      instructor: "Moniteur",
      accountant: "Comptable",
      marketing_manager: "Responsable Marketing",
    },
    status: {
      all: "Tous les statuts",
      active: "Actif",
      inactive: "Inactif",
      pending: "En attente",
    },
    table: {
      name: "Nom",
      email: "Email",
      role: "Rôle",
      status: "Statut",
      lastLogin: "Dernière connexion",
      actions: "Actions",
    },
    actions: {
      edit: "Modifier",
      delete: "Supprimer",
      resetPassword: "Réinitialiser mot de passe",
      activate: "Activer",
      deactivate: "Désactiver",
    },
    dialog: {
      addTitle: "Ajouter un utilisateur",
      editTitle: "Modifier l'utilisateur",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      role: "Rôle",
      cancel: "Annuler",
      save: "Enregistrer",
    },
    stats: {
      total: "Total utilisateurs",
      active: "Actifs",
      pending: "En attente",
      inactive: "Inactifs",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_USERS: User[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@auto-ecole.ch",
    role: "school_admin",
    status: "active",
    lastLogin: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@auto-ecole.ch",
    role: "secretary",
    status: "active",
    lastLogin: new Date("2024-01-15T09:15:00"),
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@auto-ecole.ch",
    role: "instructor",
    status: "active",
    lastLogin: new Date("2024-01-14T16:45:00"),
    createdAt: new Date("2023-03-20"),
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Dubois",
    email: "sophie.dubois@auto-ecole.ch",
    role: "accountant",
    status: "active",
    lastLogin: new Date("2024-01-15T08:00:00"),
    createdAt: new Date("2023-04-05"),
  },
  {
    id: "5",
    firstName: "Luc",
    lastName: "Moreau",
    email: "luc.moreau@auto-ecole.ch",
    role: "marketing_manager",
    status: "pending",
    createdAt: new Date("2024-01-10"),
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function UsersManagementPage({
  locale = "fr",
}: UsersManagementPageProps) {
  const t = TRANSLATIONS[locale];
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [users] = useState<User[]>(MOCK_USERS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    pending: users.filter((u) => u.status === "pending").length,
    inactive: users.filter((u) => u.status === "inactive").length,
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Jamais";
    return new Intl.DateTimeFormat("fr-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getRoleBadgeVariant = (role: User["role"]) => {
    switch (role) {
      case "school_admin":
        return "default";
      case "secretary":
        return "secondary";
      case "instructor":
        return "outline";
      case "accountant":
        return "secondary";
      case "marketing_manager":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "inactive":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>
        <Button onClick={handleAddUser}>
          <PlusIcon className="h-4 w-4 mr-2" />

          {t.addUser}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.active}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.pending}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.inactive}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {stats.inactive}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="school_admin">
                  {t.filters.school_admin}
                </SelectItem>
                <SelectItem value="secretary">{t.filters.secretary}</SelectItem>
                <SelectItem value="instructor">
                  {t.filters.instructor}
                </SelectItem>
                <SelectItem value="accountant">
                  {t.filters.accountant}
                </SelectItem>
                <SelectItem value="marketing_manager">
                  {t.filters.marketing_manager}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.status.all}</SelectItem>
                <SelectItem value="active">{t.status.active}</SelectItem>
                <SelectItem value="pending">{t.status.pending}</SelectItem>
                <SelectItem value="inactive">{t.status.inactive}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.name}</TableHead>
                <TableHead>{t.table.email}</TableHead>
                <TableHead>{t.table.role}</TableHead>
                <TableHead>{t.table.status}</TableHead>
                <TableHead>{t.table.lastLogin}</TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="text-sm">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {t.filters[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {t.status[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(user.lastLogin)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <EditIcon className="h-4 w-4 mr-2" />

                          {t.actions.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <KeyIcon className="h-4 w-4 mr-2" />

                          {t.actions.resetPassword}
                        </DropdownMenuItem>
                        {user.status === "active" ? (
                          <DropdownMenuItem>
                            <UserXIcon className="h-4 w-4 mr-2" />

                            {t.actions.deactivate}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <UserCheckIcon className="h-4 w-4 mr-2" />

                            {t.actions.activate}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          <TrashIcon className="h-4 w-4 mr-2" />

                          {t.actions.delete}
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

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? t.dialog.editTitle : t.dialog.addTitle}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t.dialog.firstName}</Label>
              <Input id="firstName" defaultValue={editingUser?.firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t.dialog.lastName}</Label>
              <Input id="lastName" defaultValue={editingUser?.lastName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.dialog.email}</Label>
              <Input
                id="email"
                type="email"
                defaultValue={editingUser?.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{t.dialog.role}</Label>
              <Select defaultValue={editingUser?.role}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school_admin">
                    {t.filters.school_admin}
                  </SelectItem>
                  <SelectItem value="secretary">
                    {t.filters.secretary}
                  </SelectItem>
                  <SelectItem value="instructor">
                    {t.filters.instructor}
                  </SelectItem>
                  <SelectItem value="accountant">
                    {t.filters.accountant}
                  </SelectItem>
                  <SelectItem value="marketing_manager">
                    {t.filters.marketing_manager}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t.dialog.cancel}
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {t.dialog.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UsersManagementPage;
