/**
 * VIAMENTOR - Reminders Stats Cards
 * Stats cards pour module rappels facturation
 */

"use client";

import { Bell, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReminderStats } from "@/viamentor/data/viamentor-billing-reminders-data";
import type { BillingRemindersTranslations } from "@/viamentor/data/viamentor-billing-reminders-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RemindersStatsCardsProps {
  stats: ReminderStats;
  translations: BillingRemindersTranslations;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RemindersStatsCards({
  stats,
  translations: t,
}: RemindersStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            {t.stats.pending}
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-500">
            {stats.pending}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{t.stats.sent}</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{stats.sent}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            {t.stats.failed}
          </CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{t.stats.total}</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
    </div>
  );
}
