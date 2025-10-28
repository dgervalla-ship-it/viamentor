/**
 * VIAMENTOR - Billing Invoices Preview List
 * Liste compacte dernières factures avec status badges et quick actions
 *
 * ACTIONS DISPONIBLES:
 * - Voir facture (fhygmw): Ouvre le rendu de la facture dans un Dialog avec InvoicePreview
 * - Télécharger (e9jgbl): Télécharge la facture PDF sur le support local
 * - Envoyer (t0g8xy): Ouvre la boîte de dialogue pour choisir comment envoyer la facture
 * - Éditer (draft uniquement): Ouvre le formulaire d'édition de la facture
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  EyeIcon,
  EditIcon,
  SendIcon,
  DownloadIcon,
  ArrowRightIcon,
  MailIcon,
  MessageSquareIcon,
  PrinterIcon,
} from "lucide-react";
import { useState } from "react";
import { InvoicePreview as InvoicePreviewComponent } from "@/polymet/components/viamentor-invoice-preview";
import {
  type BillingLocale,
  billingTranslations,
} from "@/polymet/data/viamentor-billing-i18n";
import {
  type InvoicePreview,
  type InvoiceStatus,
} from "@/polymet/data/viamentor-billing-data";

interface BillingInvoicesPreviewProps {
  locale?: BillingLocale;
  invoices: InvoicePreview[];
  onView?: (invoice: InvoicePreview) => void;
  onEdit?: (invoice: InvoicePreview) => void;
  onSend?: (invoice: InvoicePreview) => void;
  onDownload?: (invoice: InvoicePreview) => void;
  onViewAll?: () => void;
}

export function BillingInvoicesPreview({
  locale = "fr",
  invoices,
  onView,
  onEdit,
  onSend,
  onDownload,
  onViewAll,
}: BillingInvoicesPreviewProps) {
  const t = billingTranslations[locale];

  // État pour les dialogs
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoicePreview | null>(
    null
  );
  const [sendMethod, setSendMethod] = useState<"email" | "sms" | "print">(
    "email"
  );
  const [sendMessage, setSendMessage] = useState("");

  // Handler pour ouvrir le rendu de la facture
  const handleViewInvoice = (invoice: InvoicePreview) => {
    setSelectedInvoice(invoice);
    setPreviewDialogOpen(true);
  };

  // Handler pour ouvrir le dialog d'envoi
  const handleSendInvoice = (invoice: InvoicePreview) => {
    setSelectedInvoice(invoice);
    setSendMethod("email");
    setSendMessage("");
    setSendDialogOpen(true);
  };

  // Handler pour télécharger la facture
  const handleDownloadInvoice = (invoice: InvoicePreview) => {
    // Télécharge le PDF sur le support local
    if (onDownload) {
      onDownload(invoice);
    }
    // Simulation du téléchargement
    console.log(`Téléchargement de la facture ${invoice.number}`);
  };

  // Handler pour confirmer l'envoi
  const handleConfirmSend = () => {
    if (selectedInvoice && onSend) {
      onSend(selectedInvoice);
    }
    console.log(`Envoi de ${selectedInvoice?.number} par ${sendMethod}`);
    if (sendMessage) {
      console.log(`Message: ${sendMessage}`);
    }
    setSendDialogOpen(false);
  };

  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat(
      locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : locale === "en"
            ? "en-CH"
            : "fr-CH",
      {
        style: "currency",
        currency: "CHF",
        minimumFractionDigits: 2,
      }
    ).format(amount);
    return locale === "fr" ? formatted.replace(/\s/g, "'") : formatted;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Format based on locale
    if (locale === "en") {
      return `${month}/${day}/${year}`;
    }
    // DE, IT, FR all use DD.MM.YYYY or DD/MM/YYYY
    return `${day}.${month}.${year}`;
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    const variants: Record<
      InvoiceStatus,
      {
        variant: "default" | "secondary" | "outline" | "destructive";
        className: string;
      }
    > = {
      draft: {
        variant: "secondary",
        className:
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      },
      sent: {
        variant: "outline",
        className: "border-blue-500 text-blue-700 dark:text-blue-400",
      },
      paid: {
        variant: "default",
        className:
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
      },
      overdue: { variant: "destructive", className: "" },
      void: { variant: "outline", className: "border-gray-400 text-gray-500" },
    };

    return (
      <Badge
        variant={variants[status].variant}
        className={variants[status].className}
      >
        {t.status[status]}
      </Badge>
    );
  };

  const getOverdueBadge = (daysOverdue?: number) => {
    if (!daysOverdue) return null;
    return (
      <Badge variant="destructive" className="text-xs">
        {daysOverdue} {t.overview.daysOverdue}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold">
          {t.invoicesPreview.title}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="text-sm font-medium"
        >
          {t.invoicesPreview.viewAll}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-5">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-200"
            >
              {/* Student Avatar */}
              <Avatar className="h-14 w-14 flex-shrink-0">
                <AvatarImage
                  src={invoice.student.avatar}
                  alt={invoice.student.name}
                />

                <AvatarFallback className="text-base font-semibold">
                  {invoice.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Invoice Details - 3 lignes distinctes */}
              <div className="flex-1 min-w-0 space-y-2.5">
                {/* LIGNE 1: Invoice Number + Badges + Amount */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 xs:gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      {invoice.number}
                    </h3>
                    {getStatusBadge(invoice.status)}
                    {getOverdueBadge(invoice.daysOverdue)}
                  </div>
                  <p className="text-lg font-bold text-foreground text-right leading-tight min-w-0 truncate max-w-[40%] xs:max-w-none">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>

                {/* LIGNE 2: Student Name + Date + Due Date */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <span className="font-medium truncate min-w-0">
                    {invoice.student.name}
                  </span>
                  <span>•</span>
                  <span className="whitespace-nowrap">
                    {formatDate(invoice.date)}
                  </span>
                  {invoice.dueDate && (
                    <>
                      <span>•</span>
                      <span className="whitespace-nowrap">
                        {t.invoicesPreview.dueDate}:{" "}
                        {formatDate(invoice.dueDate)}
                      </span>
                    </>
                  )}
                </div>

                {/* LIGNE 3: Quick Actions Buttons */}
                <div className="flex items-center gap-2">
                  {/* Ouvre le rendu de la facture dans un Dialog */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3"
                    onClick={() => handleViewInvoice(invoice)}
                  >
                    <EyeIcon className="h-4 w-4" />

                    <span className="hidden sm:inline ml-2">
                      {t.overview.viewInvoice}
                    </span>
                  </Button>
                  {invoice.status === "draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3"
                      onClick={() => onEdit?.(invoice)}
                    >
                      <EditIcon className="h-4 w-4" />

                      <span className="sr-only">
                        {t.overview.editInvoice || "Éditer"}
                      </span>
                    </Button>
                  )}
                  {/* Ouvre la boîte de dialogue pour choisir comment envoyer */}
                  {(invoice.status === "sent" ||
                    invoice.status === "overdue") && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3"
                      onClick={() => handleSendInvoice(invoice)}
                    >
                      <SendIcon className="h-4 w-4" />

                      <span className="sr-only">Envoyer</span>
                    </Button>
                  )}
                  {/* Télécharge la facture PDF sur le support local */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3"
                    onClick={() => handleDownloadInvoice(invoice)}
                  >
                    <DownloadIcon className="h-4 w-4" />

                    <span className="sr-only">Télécharger</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {invoices.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Aucune facture récente</p>
          </div>
        )}
      </CardContent>

      {/* Dialog Preview Facture */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-2 sm:p-6">
          <DialogHeader>
            <DialogTitle>
              {selectedInvoice?.number} - {selectedInvoice?.student.name}
            </DialogTitle>
            <DialogDescription>Aperçu de la facture</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="flex-1 overflow-hidden">
              <InvoicePreviewComponent
                invoice={
                  {
                    id: selectedInvoice.id,
                    invoiceNumber: selectedInvoice.number,
                    issueDate: selectedInvoice.date,
                    dueDate: selectedInvoice.dueDate || selectedInvoice.date,
                    status: selectedInvoice.status,
                    total: selectedInvoice.amount,
                    subtotal: selectedInvoice.amount / 1.077,
                    vatAmount:
                      selectedInvoice.amount - selectedInvoice.amount / 1.077,
                    currency: "CHF",
                    tenantName: "Auto-École Viamentor",
                    tenantLogo: "https://github.com/polymet-ai.png",
                    tenantAddress: {
                      street: "Rue de la Gare 12",
                      zip: "1003",
                      city: "Lausanne",
                      country: "Suisse",
                    },
                    tenantEmail: "contact@viamentor.ch",
                    tenantPhone: "+41 21 123 45 67",
                    items: [
                      {
                        id: "1",
                        description: "Leçon de conduite catégorie B",
                        quantity: 10,
                        unitPrice: selectedInvoice.amount / 10.77,
                        total: selectedInvoice.amount / 1.077,
                        vatRate: 7.7,
                      },
                    ],
                  } as any
                }
                locale={locale}
                onDownload={() => handleDownloadInvoice(selectedInvoice)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Envoi Facture */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Envoyer la facture {selectedInvoice?.number}
            </DialogTitle>
            <DialogDescription>
              Choisissez comment envoyer la facture à{" "}
              {selectedInvoice?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Méthode d'envoi</Label>
              <RadioGroup
                value={sendMethod}
                onValueChange={(v) => setSendMethod(v as any)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />

                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <MailIcon className="h-4 w-4" />
                    Email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />

                  <Label
                    htmlFor="sms"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquareIcon className="h-4 w-4" />
                    SMS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="print" id="print" />

                  <Label
                    htmlFor="print"
                    className="flex items-start gap-2 cursor-pointer text-left max-w-full"
                  >
                    <PrinterIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />

                    <span className="truncate">Imprimer</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message personnalisé (optionnel)</Label>
              <Textarea
                id="message"
                placeholder="Ajoutez un message personnalisé..."
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirmSend}>
              <SendIcon className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
