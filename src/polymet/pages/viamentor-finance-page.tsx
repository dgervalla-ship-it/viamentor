/**
 * VIAMENTOR Finance Page
 *
 * Page principale Finance Admin avec KPIs et subscriptions
 *
 * @module pages/viamentor-finance-page
 */

import { useState } from "react";
import { FinanceDashboardKPIs } from "@/polymet/components/viamentor-finance-dashboard-kpis";
import { FinanceSubscriptionsTable } from "@/polymet/components/viamentor-finance-subscriptions-table";
import { ChangePlanModal } from "@/polymet/components/viamentor-finance-change-plan-modal";
import { CancelSubscriptionDialog } from "@/polymet/components/viamentor-finance-cancel-subscription-dialog";
import {
  MOCK_FINANCE_KPIS,
  MOCK_SUBSCRIPTIONS,
  TenantSubscription,
  SubscriptionStatus,
} from "@/polymet/data/viamentor-finance-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function ViamentorFinancePage() {
  const [subscriptions, setSubscriptions] = useState(MOCK_SUBSCRIPTIONS);
  const [selectedSubscription, setSelectedSubscription] =
    useState<TenantSubscription | null>(null);
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleChangePlan = (subscription: TenantSubscription) => {
    setSelectedSubscription(subscription);
    setChangePlanOpen(true);
  };

  const handleCancelSubscription = (subscription: TenantSubscription) => {
    setSelectedSubscription(subscription);
    setCancelDialogOpen(true);
  };

  const handleReactivate = (subscription: TenantSubscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscription.id
          ? { ...sub, status: "Active" as SubscriptionStatus }
          : sub
      )
    );
    toast({
      title: "Abonnement réactivé",
      description: `L'abonnement de ${subscription.tenantName} a été réactivé avec succès.`,
    });
  };

  const handleStatusChange = (id: string, status: SubscriptionStatus) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status } : sub))
    );
    toast({
      title: "Statut mis à jour",
      description: `Le statut a été changé en ${status}.`,
    });
  };

  const handleAutoRenewalToggle = (id: string, enabled: boolean) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, autoRenewal: enabled } : sub
      )
    );
    toast({
      title: "Renouvellement automatique",
      description: enabled ? "Activé" : "Désactivé",
    });
  };

  const handleChangePlanConfirm = (data: any) => {
    if (!selectedSubscription) return;

    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === selectedSubscription.id
          ? {
              ...sub,
              plan: data.newPlan,
              price:
                data.newPlan === "Free" ? 0 : data.newPlan === "Pro" ? 99 : 299,
            }
          : sub
      )
    );

    toast({
      title: "Plan changé avec succès",
      description: `Le plan de ${selectedSubscription.tenantName} a été changé en ${data.newPlan}.`,
    });
  };

  const handleCancelConfirm = (data: any) => {
    if (!selectedSubscription) return;

    if (data.offerDiscount) {
      toast({
        title: "Offre de rétention envoyée",
        description: `Une réduction de ${data.discountAmount}% a été proposée à ${selectedSubscription.tenantName}.`,
      });
    } else {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === selectedSubscription.id
            ? {
                ...sub,
                status: "Canceled" as SubscriptionStatus,
                autoRenewal: false,
              }
            : sub
        )
      );
      toast({
        title: "Abonnement annulé",
        description: `L'abonnement de ${selectedSubscription.tenantName} sera annulé à la fin du cycle.`,
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Le fichier Excel sera téléchargé dans quelques instants.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">Finance Admin</h1>
            <p className="text-muted-foreground mt-1">
              Gestion des revenus et abonnements
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="subscriptions">
              Abonnements ({subscriptions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <FinanceDashboardKPIs
              kpis={MOCK_FINANCE_KPIS}
              locale="fr"
              onManageOutstanding={() =>
                toast({
                  title: "Factures impayées",
                  description: "Redirection vers la gestion des factures...",
                })
              }
            />
          </TabsContent>

          <TabsContent value="subscriptions">
            <FinanceSubscriptionsTable
              subscriptions={subscriptions}
              locale="fr"
              onChangePlan={handleChangePlan}
              onCancelSubscription={handleCancelSubscription}
              onReactivate={handleReactivate}
              onStatusChange={handleStatusChange}
              onAutoRenewalToggle={handleAutoRenewalToggle}
              onExport={handleExport}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ChangePlanModal
        open={changePlanOpen}
        onOpenChange={setChangePlanOpen}
        subscription={selectedSubscription}
        locale="fr"
        onConfirm={handleChangePlanConfirm}
      />

      <CancelSubscriptionDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        subscription={selectedSubscription}
        locale="fr"
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}
