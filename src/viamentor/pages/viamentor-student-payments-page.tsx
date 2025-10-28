/**
 * VIAMENTOR - Student Payments Page
 * Page Mes Paiements élève avec historique paiements, méthodes de paiement
 *
 * @module pages/viamentor-student-payments-page
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCardIcon,
  DownloadIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  WalletIcon,
  FileTextIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentPaymentsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Payment {
  id: string;
  date: Date;
  amount: number;
  method: "card" | "bank_transfer" | "cash" | "twint";
  status: "completed" | "pending" | "failed";
  invoiceId: string;
  description: string;
  reference?: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank_account";
  last4: string;
  brand?: string;
  isDefault: boolean;
  expiryDate?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockPayments: Payment[] = [
  {
    id: "1",
    date: new Date("2024-10-15"),
    amount: 450.0,
    method: "card",
    status: "completed",
    invoiceId: "INV-2024-001",
    description: "Forfait 10 leçons pratiques",
    reference: "PAY-001",
  },
  {
    id: "2",
    date: new Date("2024-09-20"),
    amount: 150.0,
    method: "bank_transfer",
    status: "completed",
    invoiceId: "INV-2024-002",
    description: "Cours théoriques",
    reference: "PAY-002",
  },
  {
    id: "3",
    date: new Date("2024-10-25"),
    amount: 200.0,
    method: "twint",
    status: "pending",
    invoiceId: "INV-2024-003",
    description: "Leçons supplémentaires",
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    isDefault: true,
    expiryDate: "12/25",
  },
  {
    id: "2",
    type: "bank_account",
    last4: "1234",
    isDefault: false,
  },
];

const translations = {
  fr: {
    title: "Mes Paiements",
    description: "Historique de mes paiements et méthodes de paiement",
    tabs: {
      history: "Historique",
      methods: "Méthodes de paiement",
      invoices: "Factures",
    },
    status: {
      completed: "Payé",
      pending: "En attente",
      failed: "Échoué",
    },
    methods: {
      card: "Carte bancaire",
      bank_transfer: "Virement bancaire",
      cash: "Espèces",
      twint: "TWINT",
    },
    fields: {
      date: "Date",
      amount: "Montant",
      method: "Méthode",
      status: "Statut",
      invoice: "Facture",
      reference: "Référence",
      description: "Description",
    },
    actions: {
      download: "Télécharger",
      viewInvoice: "Voir la facture",
      addMethod: "Ajouter une méthode",
      setDefault: "Définir par défaut",
      remove: "Supprimer",
    },
    stats: {
      totalPaid: "Total payé",
      pending: "En attente",
      thisMonth: "Ce mois-ci",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentPaymentsPage({
  locale = "fr",
}: StudentPaymentsPageProps) {
  const t = translations[locale];
  const [activeTab, setActiveTab] = useState("history");

  const totalPaid = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = mockPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const thisMonthAmount = mockPayments
    .filter(
      (p) =>
        p.status === "completed" &&
        new Date(p.date).getMonth() === new Date().getMonth()
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: Payment["status"]) => {
    const variants: Record<
      Payment["status"],
      "default" | "secondary" | "destructive"
    > = {
      completed: "secondary",
      pending: "default",
      failed: "destructive",
    };

    return (
      <Badge variant={variants[status]}>
        {t.status[status as keyof typeof t.status]}
      </Badge>
    );
  };

  const getStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2Icon className="h-5 w-5 text-green-600" />;

      case "pending":
        return <ClockIcon className="h-5 w-5 text-orange-600" />;

      case "failed":
        return <AlertCircleIcon className="h-5 w-5 text-red-600" />;
    }
  };

  const getMethodIcon = (method: Payment["method"]) => {
    switch (method) {
      case "card":
        return <CreditCardIcon className="h-5 w-5" />;

      case "bank_transfer":
        return <WalletIcon className="h-5 w-5" />;

      default:
        return <WalletIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle2Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.stats.totalPaid}
              </p>
              <p className="text-2xl font-bold text-foreground">
                CHF {totalPaid.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.stats.pending}</p>
              <p className="text-2xl font-bold text-foreground">
                CHF {pendingAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <WalletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.stats.thisMonth}
              </p>
              <p className="text-2xl font-bold text-foreground">
                CHF {thisMonthAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="history">{t.tabs.history}</TabsTrigger>
          <TabsTrigger value="methods">{t.tabs.methods}</TabsTrigger>
          <TabsTrigger value="invoices">{t.tabs.invoices}</TabsTrigger>
        </TabsList>

        {/* Payment History */}
        <TabsContent value="history" className="space-y-4">
          {mockPayments.map((payment) => (
            <Card key={payment.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getStatusIcon(payment.status)}
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {payment.description}
                        </h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString(locale)} •{" "}
                        {t.methods[payment.method as keyof typeof t.methods]}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          {t.fields.amount}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          CHF {payment.amount.toFixed(2)}
                        </p>
                      </div>
                      {payment.reference && (
                        <div>
                          <p className="text-muted-foreground">
                            {t.fields.reference}
                          </p>
                          <p className="font-medium text-foreground">
                            {payment.reference}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileTextIcon className="h-4 w-4 mr-2" />

                    {t.actions.viewInvoice}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="methods" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button>
              <CreditCardIcon className="h-4 w-4 mr-2" />

              {t.actions.addMethod}
            </Button>
          </div>

          {mockPaymentMethods.map((method) => (
            <Card key={method.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <CreditCardIcon className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {method.type === "card"
                          ? `${method.brand} •••• ${method.last4}`
                          : `Compte bancaire •••• ${method.last4}`}
                      </h3>
                      {method.isDefault && (
                        <Badge variant="secondary">Par défaut</Badge>
                      )}
                    </div>
                    {method.expiryDate && (
                      <p className="text-sm text-muted-foreground">
                        Expire le {method.expiryDate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      {t.actions.setDefault}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    {t.actions.remove}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <FileTextIcon className="h-12 w-12 text-muted-foreground" />

              <div>
                <p className="font-semibold text-foreground">
                  Voir toutes mes factures
                </p>
                <p className="text-sm text-muted-foreground">
                  Accédez à l'historique complet de vos factures
                </p>
              </div>
              <Button>Aller à la facturation</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
