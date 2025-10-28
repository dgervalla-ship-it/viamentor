/**
 * VIAMENTOR Tenants Table View
 *
 * Vue en liste/table avec tri, pagination et actions bulk
 *
 * @module components/viamentor-tenants-table-view
 * @version 1.0.0
 */

import { useState, useMemo } from "react";
import {
  Tenant,
  generateColorFromName,
  generateInitials,
} from "@/viamentor/data/viamentor-tenants-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontalIcon,
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface TenantsTableViewProps {
  tenants: Tenant[];
  onView?: (tenant: Tenant) => void;
  onEdit?: (tenant: Tenant) => void;
  onDelete?: (tenant: Tenant) => void;
}

type SortField = "name" | "mrr" | "createdAt";
type SortOrder = "asc" | "desc";

/**
 * Composant Table View pour tenants
 */
export function TenantsTableView({
  tenants,
  onView,
  onEdit,
  onDelete,
}: TenantsTableViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Tri des tenants
  const sortedTenants = useMemo(() => {
    const sorted = [...tenants].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [tenants, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedTenants.length / rowsPerPage);
  const paginatedTenants = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedTenants.slice(start, start + rowsPerPage);
  }, [sortedTenants, currentPage, rowsPerPage]);

  // Toggle sort
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedTenants.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedTenants.map((t) => t.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (newSelected.size >= 10) {
        alert("Maximum 10 sélections");
        return;
      }
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  if (tenants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 border border-border rounded-lg">
        <BuildingIcon className="h-16 w-16 text-muted-foreground/50" />

        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Aucune auto-école trouvée</h3>
          <p className="text-sm text-muted-foreground">
            Essayez de modifier vos filtres ou créez une nouvelle auto-école
          </p>
        </div>
        <Button>Créer première auto-école</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-primary text-primary-foreground p-4 rounded-lg flex items-center justify-between animate-slide-from-left">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selectedIds.size} sélectionnés</Badge>
            <Button variant="secondary" size="sm">
              Suspendre
            </Button>
            <Button variant="secondary" size="sm">
              Activer
            </Button>
            <Button variant="secondary" size="sm">
              Changer plan
            </Button>
            <Button variant="secondary" size="sm">
              Envoyer email
            </Button>
            <Button variant="secondary" size="sm">
              Exporter CSV
            </Button>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedIds(new Set())}
          >
            Annuler
          </Button>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.size === paginatedTenants.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-12">Logo</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1"
                >
                  Nom
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSort("createdAt")}
                  className="flex items-center gap-1"
                >
                  Créé
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Students</TableHead>
              <TableHead className="text-center">Instructors</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSort("mrr")}
                  className="flex items-center gap-1"
                >
                  MRR
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dernière activité</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTenants.map((tenant) => (
              <TableRow
                key={tenant.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onView?.(tenant)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.has(tenant.id)}
                    onCheckedChange={() => toggleSelect(tenant.id)}
                  />
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    {tenant.logo && <AvatarImage src={tenant.logo} />}
                    <AvatarFallback
                      style={{
                        backgroundColor: generateColorFromName(tenant.name),
                        color: "white",
                      }}
                      className="text-xs"
                    >
                      {generateInitials(tenant.name)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold">{tenant.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tenant.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      {tenant.address.canton} • {tenant.address.city}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tenant.plan === "Enterprise"
                        ? "default"
                        : tenant.plan === "Pro"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {tenant.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(tenant.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {tenant.studentsCount}
                </TableCell>
                <TableCell className="text-center">
                  {tenant.instructorsCount}
                </TableCell>
                <TableCell className="text-right font-medium">
                  CHF {tenant.mrr.toLocaleString("fr-CH")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tenant.status === "Active"
                        ? "default"
                        : tenant.status === "Trial"
                          ? "secondary"
                          : "destructive"
                    }
                    className="relative"
                  >
                    {tenant.status === "Active" && (
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                    {tenant.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(tenant.lastActivity), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(tenant)}>
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(tenant)}>
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>Paramètres</DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>Impersonate</DropdownMenuItem>
                      <DropdownMenuItem>Facturation</DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => onDelete?.(tenant)}
                        className="text-destructive"
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="md:hidden space-y-4">
        {paginatedTenants.map((tenant) => (
          <div
            key={tenant.id}
            className="border border-border rounded-lg p-4 space-y-4 cursor-pointer hover:bg-muted/50"
            onClick={() => onView?.(tenant)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  {tenant.logo && <AvatarImage src={tenant.logo} />}
                  <AvatarFallback
                    style={{
                      backgroundColor: generateColorFromName(tenant.name),
                      color: "white",
                    }}
                  >
                    {generateInitials(tenant.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{tenant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tenant.email}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView?.(tenant)}>
                    Voir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(tenant)}>
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>Paramètres</DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>Impersonate</DropdownMenuItem>
                  <DropdownMenuItem>Facturation</DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => onDelete?.(tenant)}
                    className="text-destructive"
                  >
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">
                  {tenant.address.canton} • {tenant.address.city}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Plan:</span>
                <div className="mt-1">
                  <Badge
                    variant={
                      tenant.plan === "Enterprise"
                        ? "default"
                        : tenant.plan === "Pro"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {tenant.plan}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Students:</span>
                <p className="font-medium">{tenant.studentsCount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Instructors:</span>
                <p className="font-medium">{tenant.instructorsCount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">MRR:</span>
                <p className="font-medium">
                  CHF {tenant.mrr.toLocaleString("fr-CH")}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="mt-1">
                  <Badge
                    variant={
                      tenant.status === "Active"
                        ? "default"
                        : tenant.status === "Trial"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
              <span>
                Créé{" "}
                {formatDistanceToNow(new Date(tenant.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
              <span>
                Actif{" "}
                {formatDistanceToNow(new Date(tenant.lastActivity), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Lignes par page:
          </span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {sortedTenants.length} tenants au total
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
