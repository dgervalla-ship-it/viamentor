/**
 * VIAMENTOR - Notifications Center Page
 * Page principale avec layout 2 colonnes (liste 40% + détail 60%)
 */

"use client";

import { useState, useMemo } from "react";
import { NotificationsList } from "@/polymet/components/viamentor-notifications-list";
import { NotificationDetail } from "@/polymet/components/viamentor-notification-detail";
import { NotificationsFilters } from "@/polymet/components/viamentor-notifications-filters";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  FilterIcon,
  DownloadIcon,
  ArchiveIcon,
  TrashIcon,
  CheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  Notification,
  NotificationFilters,
  NotificationsLocale,
} from "@/polymet/data/viamentor-notifications-center-data";
import {
  mockNotifications,
  getNotificationsCenterTranslations,
} from "@/polymet/data/viamentor-notifications-center-data";

// ============================================================================
// TYPES
// ============================================================================

interface NotificationsCenterPageProps {
  locale?: NotificationsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationsCenterPage({
  locale = "fr",
}: NotificationsCenterPageProps) {
  const t = getNotificationsCenterTranslations(locale);

  // State
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [filters, setFilters] = useState<NotificationFilters>({
    types: [],
    categories: [],
    priority: undefined,
    sender: undefined,
    hasAttachment: undefined,
    status: undefined,
  });

  // Active notification
  const activeNotification = useMemo(() => {
    return notifications.find((n) => n.id === activeId) || null;
  }, [notifications, activeId]);

  // Handlers
  const handleSelect = (id: string, selected: boolean) => {
    setSelectedIds((prev) =>
      selected ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    setActiveId(notification.id);
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" as const } : n))
    );
  };

  const handleMarkUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "unread" as const } : n))
    );
  };

  const handleArchive = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "archived" as const } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) {
      setActiveId(null);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, status: "read" as const }))
    );
  };

  const handleBulkMarkRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selectedIds.includes(n.id) ? { ...n, status: "read" as const } : n
      )
    );
    setSelectedIds([]);
  };

  const handleBulkArchive = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        selectedIds.includes(n.id) ? { ...n, status: "archived" as const } : n
      )
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
    setShowDeleteDialog(false);
    if (activeId && selectedIds.includes(activeId)) {
      setActiveId(null);
    }
  };

  const handleExportCSV = () => {
    console.log("Export CSV:", selectedIds);
    // In real app, would generate CSV
  };

  const handleResetFilters = () => {
    setFilters({
      types: [],
      categories: [],
      priority: undefined,
      sender: undefined,
      hasAttachment: undefined,
      status: undefined,
    });
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Breadcrumb */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Notifications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden w-80 border-r border-border lg:block">
          <NotificationsFilters
            filters={filters}
            locale={locale}
            onFiltersChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Notifications List (40%) */}
        <div
          className={cn(
            "w-full border-r border-border md:w-2/5",
            activeId && "hidden md:block"
          )}
        >
          <NotificationsList
            notifications={notifications}
            locale={locale}
            selectedIds={selectedIds}
            activeId={activeId}
            onSelect={handleSelect}
            onNotificationClick={handleNotificationClick}
            onMarkRead={handleMarkRead}
            onMarkUnread={handleMarkUnread}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onMarkAllRead={handleMarkAllRead}
            onSettingsClick={() => console.log("Settings")}
          />
        </div>

        {/* Notification Detail (60%) */}
        <div className={cn("w-full md:w-3/5", !activeId && "hidden md:block")}>
          <NotificationDetail
            notification={activeNotification}
            locale={locale}
            onBack={() => setActiveId(null)}
            onActionClick={(actionId, url) => {
              console.log("Action:", actionId, url);
              if (url) {
                // In real app, would navigate
                console.log("Navigate to:", url);
              }
            }}
          />
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.length === notifications.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedIds(notifications.map((n) => n.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />

              <span className="text-sm font-medium text-foreground">
                {selectedIds.length} {t.bulk.selected}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkMarkRead}>
                <CheckIcon className="mr-2 h-4 w-4" />

                {t.bulk.markRead}
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkArchive}>
                <ArchiveIcon className="mr-2 h-4 w-4" />

                {t.bulk.archive}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <DownloadIcon className="mr-2 h-4 w-4" />

                {t.actions.exportCSV}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />

                {t.bulk.delete}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filters Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-20 right-4 z-40 lg:hidden"
          >
            <FilterIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="border-b border-border p-4">
            <SheetTitle>{t.filters.title}</SheetTitle>
          </SheetHeader>
          <NotificationsFilters
            filters={filters}
            locale={locale}
            onFiltersChange={setFilters}
            onReset={handleResetFilters}
          />
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.bulk.delete}</DialogTitle>
            <DialogDescription>{t.bulk.confirmDelete}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
