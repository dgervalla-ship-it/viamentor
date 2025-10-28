/**
 * VIAMENTOR - Reminders Settings Tab
 * Tab paramètres pour module rappels facturation
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { BillingRemindersTranslations } from "@/polymet/data/viamentor-billing-reminders-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RemindersSettingsTabProps {
  autoReminders: boolean;
  emailNotifications: boolean;
  smsEnabled: boolean;
  onAutoRemindersChange: (value: boolean) => void;
  onEmailNotificationsChange: (value: boolean) => void;
  onSmsEnabledChange: (value: boolean) => void;
  translations: BillingRemindersTranslations;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RemindersSettingsTab({
  autoReminders,
  emailNotifications,
  smsEnabled,
  onAutoRemindersChange,
  onEmailNotificationsChange,
  onSmsEnabledChange,
  translations: t,
}: RemindersSettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.settings.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-reminders">{t.settings.autoReminders}</Label>
            <p className="text-sm text-muted-foreground">
              {t.settings.autoRemindersDesc}
            </p>
          </div>
          <Switch
            id="auto-reminders"
            checked={autoReminders}
            onCheckedChange={onAutoRemindersChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">
              {t.settings.emailNotifications}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t.settings.emailNotificationsDesc}
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={onEmailNotificationsChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-enabled">{t.settings.smsEnabled}</Label>
            <p className="text-sm text-muted-foreground">
              {t.settings.smsEnabledDesc}
            </p>
          </div>
          <Switch
            id="sms-enabled"
            checked={smsEnabled}
            onCheckedChange={onSmsEnabledChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
