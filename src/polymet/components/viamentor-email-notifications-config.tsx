/**
 * VIAMENTOR - Email Notifications Config
 *
 * Configuration notifications email avec toggles et recipients
 */

"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, XIcon, MailIcon, BellIcon, CheckIcon } from "lucide-react";
import {
  type NotificationSettings,
  type PixelsMonitoringLocale,
  type NotificationFrequency,
} from "@/polymet/data/viamentor-pixels-monitoring-data";
import { pixelsMonitoringTranslations } from "@/polymet/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface EmailNotificationsConfigProps {
  settings: NotificationSettings;
  locale?: PixelsMonitoringLocale;
  onSave?: (settings: NotificationSettings) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function EmailNotificationsConfig({
  settings: initialSettings,
  locale = "fr",
  onSave,
}: EmailNotificationsConfigProps) {
  const t = pixelsMonitoringTranslations[locale];
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);
  const [newRecipient, setNewRecipient] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddRecipient = () => {
    if (!newRecipient || !newRecipient.includes("@")) return;

    if (!settings.recipients.includes(newRecipient)) {
      setSettings((prev) => ({
        ...prev,
        recipients: [...prev.recipients, newRecipient],
      }));
      setNewRecipient("");
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setSettings((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((r) => r !== email),
    }));
  };

  const handleToggleType = (type: keyof NotificationSettings["types"]) => {
    setSettings((prev) => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: !prev.types[type],
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    onSave?.(settings);
    setIsSaving(false);
  };

  const getFrequencyLabel = (freq: NotificationFrequency) => {
    return t.notifications.frequencies[freq];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellIcon className="w-5 h-5" />

          <CardTitle>{t.notifications.title}</CardTitle>
        </div>
        <CardDescription>
          Configurez les alertes email pour rester informé des problèmes pixels
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Enable Alerts Toggle */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="enable-alerts" className="text-base font-medium">
              {t.notifications.enableAlerts}
            </Label>
            <p className="text-sm text-muted-foreground">
              Recevoir des notifications par email
            </p>
          </div>
          <Switch
            id="enable-alerts"
            checked={settings.enabled}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, enabled: checked }))
            }
          />
        </div>

        {settings.enabled && (
          <>
            {/* Recipients */}
            <div className="space-y-3">
              <Label>{t.notifications.recipients}</Label>

              {/* Recipients List */}
              <div className="flex flex-wrap gap-2">
                {settings.recipients.map((email) => (
                  <Badge
                    key={email}
                    variant="secondary"
                    className="pl-3 pr-1 py-1.5"
                  >
                    <MailIcon className="w-3 h-3 mr-1.5" />

                    {email}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0.5 ml-1.5 hover:bg-transparent"
                      onClick={() => handleRemoveRecipient(email)}
                    >
                      <XIcon className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>

              {/* Add Recipient */}
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRecipient();
                    }
                  }}
                />

                <Button
                  variant="outline"
                  onClick={handleAddRecipient}
                  disabled={!newRecipient || !newRecipient.includes("@")}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />

                  {t.notifications.addRecipient}
                </Button>
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-3">
              <Label>{t.notifications.frequency}</Label>
              <Select
                value={settings.frequency}
                onValueChange={(value) =>
                  setSettings((prev) => ({
                    ...prev,
                    frequency: value as NotificationFrequency,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">
                    {getFrequencyLabel("realtime")}
                  </SelectItem>
                  <SelectItem value="hourly">
                    {getFrequencyLabel("hourly")}
                  </SelectItem>
                  <SelectItem value="daily">
                    {getFrequencyLabel("daily")}
                  </SelectItem>
                  <SelectItem value="weekly">
                    {getFrequencyLabel("weekly")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {settings.frequency === "realtime" &&
                  "Notifications envoyées immédiatement"}
                {settings.frequency === "hourly" && "Résumé toutes les heures"}
                {settings.frequency === "daily" && "Résumé quotidien à 9h00"}
                {settings.frequency === "weekly" &&
                  "Résumé hebdomadaire le lundi"}
              </p>
            </div>

            {/* Notification Types */}
            <div className="space-y-3">
              <Label>Types de notifications</Label>
              <div className="space-y-3">
                {/* Pixel Offline */}
                <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <Checkbox
                    id="type-offline"
                    checked={settings.types.pixelOffline}
                    onCheckedChange={() => handleToggleType("pixelOffline")}
                  />

                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="type-offline"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.notifications.types.pixelOffline}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Alerte critique - Action immédiate requise
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Critique
                  </Badge>
                </div>

                {/* High Error Rate */}
                <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <Checkbox
                    id="type-errors"
                    checked={settings.types.highErrorRate}
                    onCheckedChange={() => handleToggleType("highErrorRate")}
                  />

                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="type-errors"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.notifications.types.highErrorRate}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Avertissement - Investigation recommandée
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Avertissement
                  </Badge>
                </div>

                {/* Budget Exhausted */}
                <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <Checkbox
                    id="type-budget"
                    checked={settings.types.budgetExhausted}
                    onCheckedChange={() => handleToggleType("budgetExhausted")}
                  />

                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="type-budget"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.notifications.types.budgetExhausted}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Information - Recharge nécessaire
                    </p>
                  </div>
                  <Badge variant="default" className="text-xs">
                    Info
                  </Badge>
                </div>

                {/* New Conversion */}
                <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                  <Checkbox
                    id="type-conversion"
                    checked={settings.types.newConversion}
                    onCheckedChange={() => handleToggleType("newConversion")}
                  />

                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="type-conversion"
                      className="text-sm font-medium cursor-pointer"
                    >
                      {t.notifications.types.newConversion}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Célébration - Nouvelle conversion reçue
                    </p>
                  </div>
                  <Badge variant="default" className="bg-green-600 text-xs">
                    Positif
                  </Badge>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={isSaving || settings.recipients.length === 0}
              className="w-full"
            >
              {isSaving ? (
                <>Enregistrement...</>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />

                  {t.notifications.save}
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
