/**
 * VIAMENTOR Tenants Grid View
 *
 * Vue en grille avec cards responsive pour affichage des tenants
 *
 * @module components/viamentor-tenants-grid-view
 * @version 1.0.0
 */

import {
  Tenant,
  generateColorFromName,
  generateInitials,
} from "@/viamentor/data/viamentor-tenants-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  EyeIcon,
  PencilIcon,
  SettingsIcon,
  UserCheckIcon,
  CreditCardIcon,
  UsersIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  BuildingIcon,
} from "lucide-react";

interface TenantsGridViewProps {
  tenants: Tenant[];
  onView?: (tenant: Tenant) => void;
  onEdit?: (tenant: Tenant) => void;
  onSettings?: (tenant: Tenant) => void;
  onImpersonate?: (tenant: Tenant) => void;
  onBilling?: (tenant: Tenant) => void;
}

/**
 * Composant Grid View pour tenants
 */
export function TenantsGridView({
  tenants,
  onView,
  onEdit,
  onSettings,
  onImpersonate,
  onBilling,
}: TenantsGridViewProps) {
  if (tenants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tenants.map((tenant) => (
        <Card
          key={tenant.id}
          className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          onClick={() => onView?.(tenant)}
        >
          <CardHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-16 w-16">
                {tenant.logo && (
                  <AvatarImage src={tenant.logo} alt={tenant.name} />
                )}
                <AvatarFallback
                  style={{
                    backgroundColor: generateColorFromName(tenant.name),
                    color: "white",
                  }}
                  className="text-lg font-semibold"
                >
                  {generateInitials(tenant.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base truncate">
                  {tenant.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {tenant.address.canton}
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {tenant.address.city}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex gap-2">
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
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <UsersIcon className="h-3 w-3" />

                  <span className="text-xs">Students</span>
                </div>
                <p className="text-sm font-semibold">{tenant.studentsCount}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GraduationCapIcon className="h-3 w-3" />

                  <span className="text-xs">Instructors</span>
                </div>
                <p className="text-sm font-semibold">
                  {tenant.instructorsCount}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUpIcon className="h-3 w-3" />

                  <span className="text-xs">MRR</span>
                </div>
                <p className="text-sm font-semibold">
                  CHF {tenant.mrr.toLocaleString("fr-CH")}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-3 border-t border-border">
            <TooltipProvider>
              <div className="flex items-center gap-1 w-full justify-between">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onView?.(tenant);
                      }}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Voir</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(tenant);
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Modifier</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSettings?.(tenant);
                      }}
                    >
                      <SettingsIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Paramètres</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onImpersonate?.(tenant);
                      }}
                    >
                      <UserCheckIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Impersonate</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBilling?.(tenant);
                      }}
                    >
                      <CreditCardIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Facturation</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
