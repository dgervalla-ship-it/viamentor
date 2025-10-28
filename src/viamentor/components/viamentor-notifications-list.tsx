/**
 * VIAMENTOR - Notifications List
 * Liste virtualisée avec header, tabs, filtres et actions
 */

"use client";

import { useState, useMemo } from "react";
import { NotificationCard } from "@/viamentor/components/viamentor-notification-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, SettingsIcon, SearchIcon, BellIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  Notification,
  NotificationsLocale,
} from "@/viamentor/data/viamentor-notifications-center-data";
import { getNotificationsCenterTranslations } from "@/viamentor/data/viamentor-notifications-center-data";

// ============================================================================
// TYPES
// ============================================================================

interface NotificationsListProps {
  notifications: Notification[];
  locale?: NotificationsLocale;
  selectedIds: string[];
  activeId: string | null;
  onSelect: (id: string, selected: boolean) => void;
  onNotificationClick: (notification: Notification) => void;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAllRead: () => void;
  onSettingsClick: () => void;
  className?: string;
}

type TabFilter = "all" | "unread" | "mentions" | "important" | "archived";
type PeriodFilter = "today" | "week" | "month" | "all";

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationsList({
  notifications,
  locale = "fr",
  selectedIds,
  activeId,
  onSelect,
  onNotificationClick,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onDelete,
  onMarkAllRead,
  onSettingsClick,
  className,
}: NotificationsListProps) {
  const t = getNotificationsCenterTranslations(locale);

  // State
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Tab filter
    if (activeTab === "unread") {
      filtered = filtered.filter((n) => n.status === "unread");
    } else if (activeTab === "archived") {
      filtered = filtered.filter((n) => n.status === "archived");
    } else if (activeTab === "important") {
      filtered = filtered.filter((n) => n.priority === "high");
    }

    // Period filter
    const now = new Date();
    if (period === "today") {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filtered = filtered.filter((n) => n.timestamp >= today);
    } else if (period === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((n) => n.timestamp >= weekAgo);
    } else if (period === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((n) => n.timestamp >= monthAgo);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query) ||
          n.from?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [notifications, activeTab, period, searchQuery]);

  // Unread count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.status === "unread").length;
  }, [notifications]);

  return (
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BellIcon className="h-6 w-6 text-primary" />

            <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount} {t.newCount}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              title={t.actions.settings}
            >
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder={t.actions.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabFilter)}
        >
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              {t.tabs.all}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              {t.tabs.unread}
            </TabsTrigger>
            <TabsTrigger value="important" className="flex-1">
              {t.tabs.important}
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex-1">
              {t.tabs.archived}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Actions Bar */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            disabled={unreadCount === 0}
          >
            <CheckIcon className="mr-2 h-4 w-4" />

            {t.actions.markAllRead}
          </Button>

          <Select
            value={period}
            onValueChange={(v) => setPeriod(v as PeriodFilter)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">{t.periods.today}</SelectItem>
              <SelectItem value="week">{t.periods.week}</SelectItem>
              <SelectItem value="month">{t.periods.month}</SelectItem>
              <SelectItem value="all">{t.periods.all}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <BellIcon className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {t.empty.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.empty.description}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                locale={locale}
                isSelected={selectedIds.includes(notification.id)}
                isActive={activeId === notification.id}
                onSelect={(selected) => onSelect(notification.id, selected)}
                onClick={() => onNotificationClick(notification)}
                onMarkRead={() => onMarkRead(notification.id)}
                onMarkUnread={() => onMarkUnread(notification.id)}
                onArchive={() => onArchive(notification.id)}
                onDelete={() => onDelete(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
