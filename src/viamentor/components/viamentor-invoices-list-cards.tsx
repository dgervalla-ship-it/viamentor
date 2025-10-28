/**
 * VIAMENTOR - Invoices List Cards View
 * Cards view responsive alternative avec actions inline
 */

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EyeIcon,
  EditIcon,
  MailIcon,
  DownloadIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
import type { InvoiceListItem } from "@/viamentor/data/viamentor-invoices-list-data";
import type { InvoiceStatus } from "@/viamentor/data/viamentor-invoices-data";
import type { InvoiceLocale } from "@/viamentor/data/viamentor-invoices-i18n";
import { INVOICE_TRANSLATIONS } from "@/viamentor/data/viamentor-invoices-i18n";

export interface InvoicesListCardsProps {
  invoices: InvoiceListItem[];
  locale?: InvoiceLocale;
  onView?: (invoice: InvoiceListItem) => void;
  onEdit?: (invoice: InvoiceListItem) => void;
  onSend?: (invoice: InvoiceListItem) => void;
  onDownload?: (invoice: InvoiceListItem) => void;
}

export function InvoicesListCards({
  invoices,
  locale = "fr",
  onView,
  onEdit,
  onSend,
  onDownload,
}: InvoicesListCardsProps) {
  const t = INVOICE_TRANSLATIONS[locale];

  const formatCurrency = (amount: number) => {
    const separators = {
      fr: { thousands: "'", decimal: "." },
      de: { thousands: ".", decimal: "," },
      it: { thousands: ".", decimal: "," },
      en: { thousands: ",", decimal: "." },
    };

    const sep = separators[locale];
    const parts = amount.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep.thousands);
    return `${parts.join(sep.decimal)} CHF`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    if (locale === "en") return `${month}/${day}/${year}`;
    return `${day}.${month}.${year}`;
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    const variants = {
      Draft: "secondary",
      Sent: "outline",
      Paid: "default",
      Overdue: "destructive",
      Void: "secondary",
    } as const;

    const labels = {
      Draft: t.statusDraft,
      Sent: t.statusSent,
      Paid: t.statusPaid,
      Overdue: t.statusOverdue,
      Void: t.statusVoid,
    };

    return (
      <Badge
        variant={variants[status]}
        className={status === "Paid" ? "bg-green-500 dark:bg-green-600" : ""}
      >
        {labels[status]}
      </Badge>
    );
  };

  const getDueBadge = (invoice: InvoiceListItem) => {
    if (invoice.status === "Paid" || invoice.status === "Void") return null;

    if (invoice.daysOverdue && invoice.daysOverdue > 0) {
      return (
        <Badge variant="destructive" className="text-xs">
          +{invoice.daysOverdue}j
        </Badge>
      );
    }

    if (invoice.daysUntilDue && invoice.daysUntilDue <= 7) {
      return (
        <Badge
          variant="outline"
          className="text-xs bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
        >
          J-{invoice.daysUntilDue}
        </Badge>
      );
    }

    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {invoices.map((invoice) => (
        <Card
          key={invoice.id}
          className="hover:shadow-lg transition-shadow cursor-pointer border border-border bg-card"
          onClick={() => onView?.(invoice)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-primary">
                  {invoice.invoiceNumber}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(invoice.issueDate)}
                </p>
              </div>
              {getStatusBadge(invoice.status)}
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pb-3">
            {/* Student */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={invoice.student.avatar}
                  alt={invoice.student.firstName}
                />

                <AvatarFallback>
                  {invoice.student.firstName[0]}
                  {invoice.student.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {invoice.student.firstName} {invoice.student.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {invoice.student.email}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Montant total
                </span>
                <span className="text-xl font-bold text-foreground">
                  {formatCurrency(invoice.total)}
                </span>
              </div>
              {invoice.remainingBalance > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Solde restant
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                  >
                    {formatCurrency(invoice.remainingBalance)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />

                <span>Échéance: {formatDate(invoice.dueDate)}</span>
              </div>
              {getDueBadge(invoice)}
            </div>
          </CardContent>

          <CardFooter className="pt-3 border-t border-border">
            <div className="flex items-center gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onView?.(invoice);
                }}
                className="flex-1 gap-2"
              >
                <EyeIcon className="h-4 w-4" />
                Voir
              </Button>
              {invoice.status === "Draft" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(invoice);
                  }}
                  className="flex-1 gap-2"
                >
                  <EditIcon className="h-4 w-4" />
                  Modifier
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSend?.(invoice);
                }}
                className="flex-1 gap-2"
              >
                <MailIcon className="h-4 w-4" />
                Envoyer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload?.(invoice);
                }}
                className="gap-2"
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
