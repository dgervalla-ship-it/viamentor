/**
 * VIAMENTOR Tenant Detail Header
 *
 * Header Hero UI avec breadcrumb, avatar école, badges et actions
 *
 * @module components/viamentor-tenant-detail-header
 * @version 1.0.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronRightIcon,
  EditIcon,
  UserIcon,
  RefreshCwIcon,
  TrashIcon,
} from "lucide-react";
import { TenantDetail } from "@/viamentor/data/viamentor-tenant-detail-data";

interface TenantDetailHeaderProps {
  tenant: TenantDetail;
  onEdit?: () => void;
  onImpersonate?: () => void;
  onRefresh?: () => void;
  onDelete?: () => void;
}

export function TenantDetailHeader({
  tenant,
  onEdit,
  onImpersonate,
  onRefresh,
  onDelete,
}: TenantDetailHeaderProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete?.();
  };

  return (
    <>
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-6 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/tenants"
              className="hover:text-foreground transition-colors"
            >
              Tenants
            </Link>
            <ChevronRightIcon className="h-4 w-4" />

            <span className="text-foreground font-medium">{tenant.name}</span>
          </nav>

          {/* Header Content */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left: Avatar + Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-2 border-border">
                <AvatarImage src={tenant.logo} alt={tenant.name} />

                <AvatarFallback className="text-2xl">
                  {tenant.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold">{tenant.name}</h3>
                <p className="text-muted-foreground max-w-2xl">
                  {tenant.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {tenant.plan}
                  </Badge>
                  <Badge
                    variant={
                      tenant.status === "Active"
                        ? "default"
                        : tenant.status === "Trial"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-sm"
                  >
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="gap-2 flex-shrink-0"
              >
                <EditIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Edit</span>
                <span className="sm:hidden">Éditer</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onImpersonate}
                className="gap-2 flex-shrink-0"
              >
                <UserIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Impersonate</span>
                <span className="sm:hidden">Impersonner</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2 flex-shrink-0"
              >
                <RefreshCwIcon
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />

                <span className="hidden sm:inline">Refresh</span>
                <span className="sm:hidden">Rafraîchir</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="gap-2 flex-shrink-0 text-destructive hover:text-destructive"
              >
                <TrashIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Delete</span>
                <span className="sm:hidden">Supprimer</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'auto-école ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données de l'auto-école{" "}
              <strong>{tenant.name}</strong> seront définitivement supprimées,
              incluant :
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Tous les utilisateurs ({tenant.stats.instructorsCount})</li>
                <li>Tous les étudiants ({tenant.stats.studentsCount})</li>
                <li>Toutes les leçons et l'historique</li>
                <li>Toutes les factures et données de facturation</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
