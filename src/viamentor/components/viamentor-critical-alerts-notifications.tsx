/**
 * VIAMENTOR - Critical Alerts Notifications
 * Système notifications push pour événements critiques
 *
 * FEATURES:
 * - Real-time notifications
 * - Toast notifications
 * - Sound alerts
 * - Priority levels
 * - Action buttons
 * - Notification center
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BellIcon,
  BellAlertIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ServerIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import type { SuperAdminLocale } from "@/viamentor/data/viamentor-super-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface CriticalAlertsNotificationsProps {
  locale?: SuperAdminLocale;
  onNotificationClick?: (notification: Notification) => void;
  className?: string;
}

interface Notification {
  id: string;
  type: "security" | "system" | "payment" | "tenant";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable: boolean;
  actions?: NotificationAction[];
  tenantName?: string;
}

interface NotificationAction {
  label: string;
  variant: "default" | "destructive" | "outline";
  onClick: () => void;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "security",
    severity: "critical",
    title: "Tentative d'accès non autorisé détectée",
    message: "Plusieurs tentatives de connexion échouées depuis IP suspecte",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    read: false,
    actionable: true,
    tenantName: "Auto-École Genève Centre",
  },
  {
    id: "2",
    type: "system",
    severity: "high",
    title: "Utilisation CPU élevée sur serveur DB-02",
    message: "CPU à 92% depuis 15 minutes",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    read: false,
    actionable: true,
  },
  {
    id: "3",
    type: "payment",
    severity: "high",
    title: "Paiement échoué - Tenant suspendu",
    message: "Fahrschule Basel - Paiement en retard de 45 jours",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    read: false,
    actionable: true,
    tenantName: "Fahrschule Basel",
  },
  {
    id: "4",
    type: "tenant",
    severity: "medium",
    title: "Nouveau tenant créé",
    message: "Auto-Scuola Lugano - Plan Professional",
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    read: true,
    actionable: false,
    tenantName: "Auto-Scuola Lugano",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function CriticalAlertsNotifications({
  locale = "fr",
  onNotificationClick,
  className,
}: CriticalAlertsNotificationsProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [latestNotification, setLatestNotification] =
    useState<Notification | null>(null);

  const t = {
    fr: {
      title: "Notifications Critiques",
      description: "Alertes système en temps réel",
      markAllRead: "Tout marquer comme lu",
      clearAll: "Tout effacer",
      noNotifications: "Aucune notification",
      viewDetails: "Voir détails",
      investigate: "Enquêter",
      resolve: "Résoudre",
      dismiss: "Ignorer",
      unreadCount: "non lues",
      types: {
        security: "Sécurité",
        system: "Système",
        payment: "Paiement",
        tenant: "Tenant",
      },
      severity: {
        critical: "Critique",
        high: "Élevé",
        medium: "Moyen",
        low: "Faible",
      },
    },
    de: {
      title: "Kritische Benachrichtigungen",
      description: "Echtzeit-Systemwarnungen",
      markAllRead: "Alle als gelesen markieren",
      clearAll: "Alle löschen",
      noNotifications: "Keine Benachrichtigungen",
      viewDetails: "Details anzeigen",
      investigate: "Untersuchen",
      resolve: "Lösen",
      dismiss: "Verwerfen",
      unreadCount: "ungelesen",
      types: {
        security: "Sicherheit",
        system: "System",
        payment: "Zahlung",
        tenant: "Mandant",
      },
      severity: {
        critical: "Kritisch",
        high: "Hoch",
        medium: "Mittel",
        low: "Niedrig",
      },
    },
    it: {
      title: "Notifiche Critiche",
      description: "Avvisi sistema in tempo reale",
      markAllRead: "Segna tutto come letto",
      clearAll: "Cancella tutto",
      noNotifications: "Nessuna notifica",
      viewDetails: "Vedi dettagli",
      investigate: "Indaga",
      resolve: "Risolvi",
      dismiss: "Ignora",
      unreadCount: "non lette",
      types: {
        security: "Sicurezza",
        system: "Sistema",
        payment: "Pagamento",
        tenant: "Tenant",
      },
      severity: {
        critical: "Critico",
        high: "Alto",
        medium: "Medio",
        low: "Basso",
      },
    },
    en: {
      title: "Critical Notifications",
      description: "Real-time system alerts",
      markAllRead: "Mark all as read",
      clearAll: "Clear all",
      noNotifications: "No notifications",
      viewDetails: "View details",
      investigate: "Investigate",
      resolve: "Resolve",
      dismiss: "Dismiss",
      unreadCount: "unread",
      types: {
        security: "Security",
        system: "System",
        payment: "Payment",
        tenant: "Tenant",
      },
      severity: {
        critical: "Critical",
        high: "High",
        medium: "Medium",
        low: "Low",
      },
    },
  };

  const translations = t[locale];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notification every 30 seconds
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ["security", "system", "payment", "tenant"][
          Math.floor(Math.random() * 4)
        ] as any,
        severity: ["critical", "high", "medium"][
          Math.floor(Math.random() * 3)
        ] as any,
        title: "Nouvelle alerte système",
        message: "Une nouvelle alerte a été détectée",
        timestamp: new Date().toISOString(),
        read: false,
        actionable: true,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setLatestNotification(newNotification);
      setShowToast(true);

      // Play sound for critical alerts
      if (newNotification.severity === "critical") {
        playNotificationSound();
      }

      // Auto-hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const playNotificationSound = () => {
    // In production, play actual sound
    console.log("🔔 Playing notification sound");
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    onNotificationClick?.(notification);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "security":
        return ShieldExclamationIcon;
      case "system":
        return ServerIcon;
      case "payment":
        return CurrencyDollarIcon;
      case "tenant":
        return BellIcon;
      default:
        return BellIcon;
    }
  };

  const getSeverityColor = (severity: Notification["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950";
      case "high":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950";
      case "low":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950";
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && latestNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
          <Card className="p-4 w-96 shadow-lg border-2 border-red-500">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${getSeverityColor(latestNotification.severity)}`}
              >
                <BellAlertIcon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      {latestNotification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {latestNotification.message}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowToast(false)}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => {
                      handleNotificationClick(latestNotification);
                      setShowToast(false);
                      setIsOpen(true);
                    }}
                  >
                    {translations.viewDetails}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowToast(false)}
                  >
                    {translations.dismiss}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notification Center */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className={className}>
            <div className="relative">
              <BellIcon className="h-5 w-5" />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <BellAlertIcon className="h-5 w-5" />

              {translations.title}
            </SheetTitle>
            <SheetDescription>{translations.description}</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Actions */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {unreadCount} {translations.unreadCount}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckIcon className="h-4 w-4 mr-2" />

                  {translations.markAllRead}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  disabled={notifications.length === 0}
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />

                  {translations.clearAll}
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="h-[calc(100vh-250px)]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <BellIcon className="h-12 w-12 text-muted-foreground mb-4" />

                  <p className="text-muted-foreground">
                    {translations.noNotifications}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <Card
                        key={notification.id}
                        className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                          !notification.read
                            ? "border-l-4 border-l-red-500"
                            : ""
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${getSeverityColor(notification.severity)}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                {notification.tenantName && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.tenantName}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <Badge
                                  variant={
                                    notification.severity === "critical" ||
                                    notification.severity === "high"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {translations.severity[notification.severity]}
                                </Badge>
                                {!notification.read && (
                                  <div className="h-2 w-2 rounded-full bg-red-500" />
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(notification.timestamp).toLocaleString(
                                locale
                              )}
                            </p>
                            {notification.actionable && (
                              <div className="flex gap-2 mt-3">
                                <Button size="sm" variant="outline">
                                  {translations.investigate}
                                </Button>
                                <Button size="sm" variant="outline">
                                  {translations.resolve}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default CriticalAlertsNotifications;
