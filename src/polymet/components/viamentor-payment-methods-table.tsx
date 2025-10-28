/**
 * VIAMENTOR Payment Methods Table
 *
 * Table payment methods tenants avec:
 * - Types: Card (Visa/MC/Amex), SEPA, Invoice manual
 * - Details: last4, expiry, IBAN masked
 * - Default method toggle
 * - Status badges (Active/Expired/Failed)
 * - Actions: Set as default, Remove, Update
 */

import { useState } from "react";
import {
  PaymentMethod,
  PaymentMethodType,
  PaymentMethodStatus,
} from "@/polymet/data/viamentor-invoices-data";
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
  Card as CardWrapper,
  CardContent as CardContentWrapper,
} from "@/components/ui/card";
import {
  useInvoiceTranslations,
  InvoiceLocale,
} from "@/polymet/data/viamentor-invoices-i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCardIcon,
  BanknoteIcon,
  FileTextIcon,
  MoreVerticalIcon,
  CheckCircle2Icon,
  TrashIcon,
  PencilIcon,
} from "lucide-react";

interface PaymentMethodsTableProps {
  paymentMethods: PaymentMethod[];
  locale?: InvoiceLocale;
  onSetDefault?: (methodId: string) => void;
  onRemove?: (method: PaymentMethod) => void;
  onUpdate?: (method: PaymentMethod) => void;
  onAddNew?: () => void;
}

export function PaymentMethodsTable({
  paymentMethods,
  locale = "fr",
  onSetDefault,
  onRemove,
  onUpdate,
  onAddNew,
}: PaymentMethodsTableProps) {
  const t = useInvoiceTranslations(locale);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(paymentMethods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMethods = paymentMethods.slice(startIndex, endIndex);

  const getMethodIcon = (type: PaymentMethodType) => {
    switch (type) {
      case "Card":
        return <CreditCardIcon className="h-5 w-5" />;

      case "SEPA":
        return <BanknoteIcon className="h-5 w-5" />;

      case "Bank Transfer":
        return <BanknoteIcon className="h-5 w-5" />;

      case "Invoice":
        return <FileTextIcon className="h-5 w-5" />;

      default:
        return <CreditCardIcon className="h-5 w-5" />;
    }
  };

  const getCardBrandLogo = (brand?: "Visa" | "Mastercard" | "Amex") => {
    if (!brand) return null;

    const colors = {
      Visa: "text-blue-600",
      Mastercard: "text-orange-600",
      Amex: "text-blue-700",
    };

    return (
      <span className={`text-xs font-bold ${colors[brand]}`}>{brand}</span>
    );
  };

  const getStatusBadge = (status: PaymentMethodStatus) => {
    const variants = {
      Active: "default" as const,
      Expired: "secondary" as const,
      Failed: "destructive" as const,
    };

    const labels = {
      Active: "Actif",
      Expired: "Expiré",
      Failed: "Échec",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const formatMethodDetails = (method: PaymentMethod) => {
    switch (method.type) {
      case "Card":
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono">•••• {method.details.last4}</span>
            {getCardBrandLogo(method.details.brand)}
            <span className="text-xs text-muted-foreground">
              Exp: {method.details.expiry}
            </span>
          </div>
        );

      case "SEPA":
        return <div className="font-mono text-sm">{method.details.iban}</div>;

      case "Invoice":
        return (
          <div className="text-sm text-muted-foreground">
            Facturation manuelle
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Modes de paiement</CardTitle>
            <CardDescription>
              {paymentMethods.length}{" "}
              {paymentMethods.length === 1 ? "méthode" : "méthodes"} enregistrée
              {paymentMethods.length > 1 ? "s" : ""}
            </CardDescription>
          </div>
          <Button onClick={onAddNew}>
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Ajouter une méthode
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Desktop Table */}
        <div className="hidden md:block border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left text-sm font-medium">École</th>
                <th className="p-3 text-left text-sm font-medium">Type</th>
                <th className="p-3 text-left text-sm font-medium">Détails</th>
                <th className="p-3 text-left text-sm font-medium">
                  Par défaut
                </th>
                <th className="p-3 text-left text-sm font-medium">Statut</th>
                <th className="p-3 text-left text-sm font-medium">
                  Abonnements
                </th>
                <th className="p-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMethods.map((method) => (
                <tr
                  key={method.id}
                  className="border-t border-border hover:bg-muted/50"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        {method.tenantLogo && (
                          <AvatarImage src={method.tenantLogo} />
                        )}
                        <AvatarFallback>{method.tenantName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {method.tenantName}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(method.type)}
                      <Badge variant="outline">{method.type}</Badge>
                    </div>
                  </td>
                  <td className="p-3">
                    {formatMethodDetails(method)}
                    {method.type === "Card" &&
                      method.details.cardholderName && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {method.details.cardholderName}
                        </p>
                      )}
                    {method.type === "SEPA" && method.details.accountHolder && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {method.details.accountHolder}
                      </p>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={method.isDefault}
                        onCheckedChange={() => onSetDefault?.(method.id)}
                        disabled={
                          method.isDefault || method.status !== "Active"
                        }
                      />

                      {method.isDefault && (
                        <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </td>
                  <td className="p-3">{getStatusBadge(method.status)}</td>
                  <td className="p-3">
                    <Badge variant="secondary">
                      {method.activeSubscriptions}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!method.isDefault && method.status === "Active" && (
                          <DropdownMenuItem
                            onClick={() => onSetDefault?.(method.id)}
                          >
                            <CheckCircle2Icon className="h-4 w-4 mr-2" />
                            Définir par défaut
                          </DropdownMenuItem>
                        )}
                        {method.type === "Card" &&
                          method.status === "Expired" && (
                            <DropdownMenuItem
                              onClick={() => onUpdate?.(method)}
                            >
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Mettre à jour
                            </DropdownMenuItem>
                          )}
                        <DropdownMenuItem
                          onClick={() => onRemove?.(method)}
                          className="text-destructive"
                          disabled={
                            method.isDefault && method.activeSubscriptions > 0
                          }
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="md:hidden space-y-4">
          {paginatedMethods.map((method) => (
            <CardWrapper key={method.id}>
              <CardContentWrapper className="p-4 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      {method.tenantLogo && (
                        <AvatarImage src={method.tenantLogo} />
                      )}
                      <AvatarFallback>{method.tenantName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{method.tenantName}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getMethodIcon(method.type)}
                        <Badge variant="outline">{method.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!method.isDefault && method.status === "Active" && (
                        <DropdownMenuItem
                          onClick={() => onSetDefault?.(method.id)}
                        >
                          <CheckCircle2Icon className="h-4 w-4 mr-2" />
                          Définir par défaut
                        </DropdownMenuItem>
                      )}
                      {method.type === "Card" &&
                        method.status === "Expired" && (
                          <DropdownMenuItem onClick={() => onUpdate?.(method)}>
                            <PencilIcon className="h-4 w-4 mr-2" />
                            Mettre à jour
                          </DropdownMenuItem>
                        )}
                      <DropdownMenuItem
                        onClick={() => onRemove?.(method)}
                        className="text-destructive"
                        disabled={
                          method.isDefault && method.activeSubscriptions > 0
                        }
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  {formatMethodDetails(method)}
                  {method.type === "Card" && method.details.cardholderName && (
                    <p className="text-xs text-muted-foreground">
                      {method.details.cardholderName}
                    </p>
                  )}
                  {method.type === "SEPA" && method.details.accountHolder && (
                    <p className="text-xs text-muted-foreground">
                      {method.details.accountHolder}
                    </p>
                  )}
                </div>

                {/* Status and Default */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Statut</p>
                    {getStatusBadge(method.status)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Par défaut
                    </p>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={method.isDefault}
                        onCheckedChange={() => onSetDefault?.(method.id)}
                        disabled={
                          method.isDefault || method.status !== "Active"
                        }
                      />

                      {method.isDefault && (
                        <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Subscriptions */}
                <div className="p-2 bg-muted rounded text-center">
                  <p className="text-xs text-muted-foreground">
                    Abonnements actifs
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {method.activeSubscriptions}
                  </Badge>
                </div>
              </CardContentWrapper>
            </CardWrapper>
          ))}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
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
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}
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

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <CreditCardIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

            <p className="text-muted-foreground">
              Aucune méthode de paiement enregistrée
            </p>
            <Button variant="outline" className="mt-4" onClick={onAddNew}>
              Ajouter une méthode
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
