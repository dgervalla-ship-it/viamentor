/**
 * VIAMENTOR - Payments Stats Cards
 * Stats KPIs header pour page Payments
 */

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Receipt, Clock, DollarSign } from "lucide-react";
import { type PaymentStats } from "@/polymet/data/viamentor-payments-data";
import { type PaymentsTranslations } from "@/polymet/data/viamentor-payments-i18n";

interface PaymentsStatsCardsProps {
  stats: PaymentStats;
  locale?: PaymentsTranslations;
}

export function PaymentsStatsCards({ stats, locale }: PaymentsStatsCardsProps) {
  const cards = [
    {
      title: locale?.stats.totalCollected || "Total encaissé ce mois",
      value: `${stats.totalCollectedMonth.toFixed(2)} CHF`,
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: locale?.stats.paymentsCount || "Paiements",
      value: stats.paymentsCount.toString(),
      icon: Receipt,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: locale?.stats.pendingValidation || "En attente validation",
      value: stats.pendingValidation.toString(),
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      title: locale?.stats.averageAmount || "Montant moyen",
      value: `${stats.averageAmount.toFixed(2)} CHF`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
