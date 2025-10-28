/**
 * VIAMENTOR Finance Subscriptions Table
 *
 * Table optimisée subscriptions avec filtres avancés et actions
 *
 * @module components/viamentor-finance-subscriptions-table
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Switch } from "@/components/ui/switch";
import {
  MoreVerticalIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  CreditCardIcon,
  BuildingIcon,
} from "lucide-react";
import {
  TenantSubscription,
  PlanType,
  SubscriptionStatus,
  formatCurrency,
} from "@/viamentor/data/viamentor-finance-data";
import { Link } from "react-router-dom";

interface SubscriptionsTableProps {
  subscriptions: TenantSubscription[];
  locale?: "fr" | "de" | "it" | "en";
  onChangePlan?: (subscription: TenantSubscription) => void;
  onCancelSubscription?: (subscription: TenantSubscription) => void;
  onReactivate?: (subscription: TenantSubscription) => void;
  onStatusChange?: (id: string, status: SubscriptionStatus) => void;
  onAutoRenewalToggle?: (id: string, enabled: boolean) => void;
  onExport?: () => void;
}

export function FinanceSubscriptionsTable({
  subscriptions,
  locale = "fr",
  onChangePlan,
  onCancelSubscription,
  onReactivate,
  onStatusChange,
  onAutoRenewalToggle,
  onExport,
}: SubscriptionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "All">(
    "All"
  );
  const [showCanceled, setShowCanceled] = useState(false);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.tenantName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === "All" || sub.plan === planFilter;
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    const matchesCanceled = showCanceled || sub.status !== "Canceled";

    return matchesSearch && matchesPlan && matchesStatus && matchesCanceled;
  });

  const getPlanBadgeVariant = (plan: PlanType) => {
    switch (plan) {
      case "Free":
        return "secondary";
      case "Pro":
        return "default";
      case "Enterprise":
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: SubscriptionStatus) => {
    switch (status) {
      case "Active":
        return "default";
      case "Trialing":
        return "secondary";
      case "Past Due":
        return "destructive";
      case "Canceled":
        return "outline";
    }
  };

  const getPaymentMethodIcon = (type: string) => {
    return type === "Card" ? (
      <CreditCardIcon className="h-4 w-4" />
    ) : (
      <BuildingIcon className="h-4 w-4" />
    );
  };

  const getDaysUntilBilling = (date: string) => {
    const days = Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle>Abonnements ({filteredSubscriptions.length})</CardTitle>
            <Button size="sm" variant="outline" onClick={onExport}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Exporter Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Rechercher école..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={planFilter}
              onValueChange={(value) =>
                setPlanFilter(value as PlanType | "All")
              }
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tous les plans</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as SubscriptionStatus | "All")
              }
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tous les statuts</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Trialing">Trialing</SelectItem>
                <SelectItem value="Past Due">Past Due</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Switch
                checked={showCanceled}
                onCheckedChange={setShowCanceled}
              />

              <span className="text-sm">Afficher annulés</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>École</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Cycle</TableHead>
                  <TableHead>Prochaine facturation</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead className="text-right">MRR</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((sub) => {
                  const daysUntil = getDaysUntilBilling(sub.nextBillingDate);
                  return (
                    <TableRow key={sub.id}>
                      <TableCell>
                        <Link
                          to={`/tenants/${sub.tenantId}`}
                          className="flex items-center gap-3 hover:underline"
                        >
                          <Avatar className="h-8 w-8">
                            {sub.tenantLogo && (
                              <AvatarImage src={sub.tenantLogo} />
                            )}
                            <AvatarFallback>{sub.tenantName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{sub.tenantName}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPlanBadgeVariant(sub.plan)}>
                          {sub.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={sub.status}
                          onValueChange={(value) =>
                            onStatusChange?.(
                              sub.id,
                              value as SubscriptionStatus
                            )
                          }
                        >
                          <SelectTrigger className="w-32 h-8">
                            <Badge variant={getStatusBadgeVariant(sub.status)}>
                              {sub.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Trialing">Trialing</SelectItem>
                            <SelectItem value="Past Due">Past Due</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{formatCurrency(sub.price, locale)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sub.billingCycle}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">
                            {new Date(sub.nextBillingDate).toLocaleDateString(
                              `${locale}-CH`
                            )}
                          </p>
                          {daysUntil <= 7 && daysUntil > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              J-{daysUntil}
                            </Badge>
                          )}
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={sub.autoRenewal}
                              onCheckedChange={(checked) =>
                                onAutoRenewalToggle?.(sub.id, checked)
                              }
                              className="scale-75"
                            />

                            <span className="text-xs text-muted-foreground">
                              Auto
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(sub.paymentMethod.type)}
                          <span className="text-sm">
                            {sub.paymentMethod.type === "Card"
                              ? `•••• ${sub.paymentMethod.last4}`
                              : sub.paymentMethod.bankName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(sub.mrrContribution, locale)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onChangePlan?.(sub)}
                            >
                              Changer de plan
                            </DropdownMenuItem>
                            {sub.status === "Canceled" ? (
                              <DropdownMenuItem
                                onClick={() => onReactivate?.(sub)}
                              >
                                Réactiver
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => onCancelSubscription?.(sub)}
                                className="text-destructive"
                              >
                                Annuler abonnement
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Voir factures</DropdownMenuItem>
                            <DropdownMenuItem>
                              Mettre à jour paiement
                            </DropdownMenuItem>
                            <DropdownMenuItem>Contacter école</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
