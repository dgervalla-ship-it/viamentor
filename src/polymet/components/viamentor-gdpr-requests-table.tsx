/**
 * VIAMENTOR GDPR Requests Table
 *
 * Table data subject requests avec filtres et actions
 *
 * @module components/viamentor-gdpr-requests-table
 * @version 1.0.0
 */

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EyeIcon,
  DownloadIcon,
  TrashIcon,
  EditIcon,
  MoreVerticalIcon,
  AlertTriangleIcon,
} from "lucide-react";
import {
  GDPRRequest,
  RequestType,
  RequestStatus,
} from "@/polymet/data/viamentor-gdpr-data";

interface GDPRRequestsTableProps {
  requests: GDPRRequest[];
  onProcess?: (request: GDPRRequest) => void;
  onStatusChange?: (requestId: string, newStatus: RequestStatus) => void;
  onDelete?: (requestId: string) => void;
}

export function GDPRRequestsTable({
  requests,
  onProcess,
  onStatusChange,
  onDelete,
}: GDPRRequestsTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("submitted");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = requests.slice(startIndex, endIndex);

  const getTypeIcon = (type: RequestType) => {
    switch (type) {
      case "Access":
        return <EyeIcon className="h-3 w-3" />;

      case "Export":
        return <DownloadIcon className="h-3 w-3" />;

      case "Delete":
        return <TrashIcon className="h-3 w-3" />;

      case "Rectify":
        return <EditIcon className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type: RequestType) => {
    switch (type) {
      case "Access":
        return "bg-blue-500";
      case "Export":
        return "bg-green-500";
      case "Delete":
        return "bg-red-500";
      case "Rectify":
        return "bg-orange-500";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const getDaysAgo = (date: string) => {
    const days = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Soumis</TableHead>
              <TableHead>Échéance</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Assigné à</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRequests.map((request) => {
              const daysUntil = getDaysUntilDeadline(request.deadline);
              const daysAgo = getDaysAgo(request.submitted);
              const isUrgent = daysUntil <= 3;
              const isOverdue = daysUntil < 0;

              return (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-xs">
                    {request.id}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`gap-1 ${getTypeColor(request.type)} text-white border-0`}
                    >
                      {getTypeIcon(request.type)}
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={request.userAvatar} />

                        <AvatarFallback>
                          {request.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {request.userName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.userEmail}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {request.tenantLogo && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={request.tenantLogo} />
                        </Avatar>
                      )}
                      <span className="text-sm">{request.tenantName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">il y a {daysAgo}j</div>
                  </TableCell>
                  <TableCell>
                    {isOverdue ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangleIcon className="h-3 w-3" />
                        En retard
                      </Badge>
                    ) : isUrgent ? (
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-orange-500 text-white"
                      >
                        <AlertTriangleIcon className="h-3 w-3" />
                        J-{daysUntil}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {daysUntil}j
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={request.status}
                      onValueChange={(value) =>
                        onStatusChange?.(request.id, value as RequestStatus)
                      }
                    >
                      <SelectTrigger className="w-[140px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">En attente</SelectItem>
                        <SelectItem value="In Progress">En cours</SelectItem>
                        <SelectItem value="Completed">Terminé</SelectItem>
                        <SelectItem value="Rejected">Rejeté</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {request.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={request.assignedToAvatar} />

                          <AvatarFallback>
                            {request.assignedToName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {request.assignedToName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.priority === "High"
                          ? "destructive"
                          : request.priority === "Medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onProcess?.(request)}>
                          Traiter la requête
                        </DropdownMenuItem>
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedRequests.map((request) => {
          const daysUntil = getDaysUntilDeadline(request.deadline);
          const isOverdue = daysUntil < 0;

          return (
            <div
              key={request.id}
              className="p-4 border rounded-lg space-y-3 bg-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.userAvatar} />
                  </Avatar>
                  <div>
                    <p className="font-medium">{request.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.userEmail}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`gap-1 ${getTypeColor(request.type)} text-white border-0`}
                >
                  {getTypeIcon(request.type)}
                  {request.type}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Statut</span>
                <Select
                  value={request.status}
                  onValueChange={(value) =>
                    onStatusChange?.(request.id, value as RequestStatus)
                  }
                >
                  <SelectTrigger className="w-[130px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">En attente</SelectItem>
                    <SelectItem value="In Progress">En cours</SelectItem>
                    <SelectItem value="Completed">Terminé</SelectItem>
                    <SelectItem value="Rejected">Rejeté</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    request.priority === "High"
                      ? "destructive"
                      : request.priority === "Medium"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {request.priority}
                </Badge>
                {isOverdue ? (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangleIcon className="h-3 w-3" />
                    En retard
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Échéance: {daysUntil}j
                  </span>
                )}
              </div>

              <Button
                onClick={() => onProcess?.(request)}
                className="w-full"
                size="sm"
              >
                Traiter la requête
              </Button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
