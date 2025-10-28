/**
 * VIAMENTOR - Maintenance Notifications Config
 * Configuration notifications automatiques maintenance
 */

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BellIcon,
  MailIcon,
  SmartphoneIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  mockNotificationConfigs,
  mockNotificationLogs,
  notificationI18n,
  type NotificationConfig,
  type NotificationRecipient,
  type NotificationTiming,
  type NotificationChannel,
} from "@/polymet/data/viamentor-maintenance-notifications";

// ============================================================================
// TYPES
// ============================================================================

interface MaintenanceNotificationsConfigProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MaintenanceNotificationsConfig({
  locale = "fr",
}: MaintenanceNotificationsConfigProps) {
  const [configs, setConfigs] = useState<NotificationConfig[]>(
    mockNotificationConfigs
  );
  const [selectedConfig, setSelectedConfig] =
    useState<NotificationConfig | null>(null);
  const [isAddRecipientOpen, setIsAddRecipientOpen] = useState(false);

  const t = notificationI18n[locale];

  const handleToggleConfig = (configId: string) => {
    setConfigs((prev) =>
      prev.map((c) => (c.id === configId ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleToggleTiming = (configId: string, timing: NotificationTiming) => {
    setConfigs((prev) =>
      prev.map((c) => {
        if (c.id !== configId) return c;
        const timings = c.timings.includes(timing)
          ? c.timings.filter((t) => t !== timing)
          : [...c.timings, timing];
        return { ...c, timings };
      })
    );
  };

  const handleToggleChannel = (configId: string, channel: "email" | "sms") => {
    setConfigs((prev) =>
      prev.map((c) => {
        if (c.id !== configId) return c;
        const channels = c.channels.includes(channel)
          ? c.channels.filter((ch) => ch !== channel)
          : [...c.channels, channel];
        return { ...c, channels: channels as NotificationChannel[] };
      })
    );
  };

  const recentLogs = mockNotificationLogs.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Notifications Automatiques</h3>
          <p className="text-sm text-muted-foreground">
            Configuration des rappels emails/SMS pour les échéances de
            maintenance
          </p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouvelle configuration
        </Button>
      </div>

      {/* Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {configs.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Maintenance {config.maintenanceType}
                </CardTitle>
                <Switch
                  checked={config.enabled}
                  onCheckedChange={() => handleToggleConfig(config.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Canaux */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Canaux de notification
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={
                      config.channels.includes("email") ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleToggleChannel(config.id, "email")}
                  >
                    <MailIcon className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant={
                      config.channels.includes("sms") ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleToggleChannel(config.id, "sms")}
                  >
                    <SmartphoneIcon className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                </div>
              </div>

              {/* Délais */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Délais de rappel
                </Label>
                <div className="space-y-2">
                  {(
                    [
                      "7_days",
                      "3_days",
                      "1_day",
                      "same_day",
                    ] as NotificationTiming[]
                  ).map((timing) => (
                    <div key={timing} className="flex items-center gap-2">
                      <Checkbox
                        checked={config.timings.includes(timing)}
                        onCheckedChange={() =>
                          handleToggleTiming(config.id, timing)
                        }
                      />

                      <Label className="text-sm cursor-pointer">
                        {t.timings[timing]}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destinataires */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">
                    Destinataires ({config.recipients.length})
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedConfig(config);
                      setIsAddRecipientOpen(true);
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {config.recipients.map((recipient) => (
                    <div
                      key={recipient.id}
                      className="flex items-center justify-between text-sm bg-muted/50 rounded px-2 py-1"
                    >
                      <div>
                        <div className="font-medium">{recipient.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {recipient.email}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {recipient.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">
                    {new Date(log.sentAt).toLocaleString("fr-CH")}
                  </TableCell>
                  <TableCell className="text-sm">{log.recipient}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {log.channel === "email" ? (
                        <MailIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <SmartphoneIcon className="h-3 w-3 mr-1" />
                      )}
                      {log.channel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === "sent" ? "default" : "destructive"
                      }
                    >
                      {log.status === "sent" ? (
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                      ) : null}
                      {t.status[log.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Recipient Dialog */}
      <Dialog open={isAddRecipientOpen} onOpenChange={setIsAddRecipientOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un destinataire</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nom</Label>
              <Input placeholder="Jean Dupont" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="jean.dupont@viamentor.ch" />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input placeholder="+41 79 123 45 67" />
            </div>
            <div>
              <Label>Rôle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="mechanic">Mécanicien</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddRecipientOpen(false)}
              >
                Annuler
              </Button>
              <Button onClick={() => setIsAddRecipientOpen(false)}>
                Ajouter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
