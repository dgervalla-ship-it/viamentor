/**
 * VIAMENTOR - Notification Card
 * Card 320x100 avec avatar, status, hover lift et context menu
 */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVerticalIcon,
  CheckIcon,
  XIcon,
  ArchiveIcon,
  TrashIcon,
  EyeOffIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  Notification,
  NotificationsLocale,
} from "@/viamentor/data/viamentor-notifications-center-data";
import {
  getNotificationsCenterTranslations,
  getNotificationIcon,
  getNotificationTypeColor,
  getRelativeTime,
} from "@/viamentor/data/viamentor-notifications-center-data";

// ============================================================================
// TYPES
// ============================================================================

interface NotificationCardProps {
  notification: Notification;
  locale?: NotificationsLocale;
  isSelected: boolean;
  isActive: boolean;
  onSelect: (selected: boolean) => void;
  onClick: () => void;
  onMarkRead: () => void;
  onMarkUnread: () => void;
  onArchive: () => void;
  onDelete: () => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationCard({
  notification,
  locale = "fr",
  isSelected,
  isActive,
  onSelect,
  onClick,
  onMarkRead,
  onMarkUnread,
  onArchive,
  onDelete,
  className,
}: NotificationCardProps) {
  const t = getNotificationsCenterTranslations(locale);
  const Icon = getNotificationIcon(notification.category);
  const typeColor = getNotificationTypeColor(notification.type);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn(
        "group relative flex h-[100px] cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200",
        "hover:bg-accent hover:shadow-md hover:-translate-y-0.5",
        isActive && "border-l-4 border-l-primary bg-accent/50",
        notification.status === "unread" && "bg-accent/30",
        className
      )}
      onClick={onClick}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 pt-1">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Avatar or Icon */}
      <div className="relative flex-shrink-0">
        {notification.from?.avatar ? (
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={notification.from.avatar}
              alt={notification.from.name}
            />

            <AvatarFallback>
              {getInitials(notification.from.name)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
        )}

        {/* Status Dot */}
        <div
          className={cn(
            "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-card",
            notification.status === "unread" ? "bg-blue-500" : "bg-muted"
          )}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Title */}
        <h3 className="mb-1 truncate text-base font-semibold text-foreground">
          {notification.title}
        </h3>

        {/* Description */}
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {notification.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2">
          {/* Timestamp */}
          <span className="text-xs text-muted-foreground">
            {getRelativeTime(notification.timestamp, locale)}
          </span>

          {/* Type Badge */}
          <Badge
            variant="secondary"
            className={cn("text-xs", typeColor, "text-white")}
          >
            {t.types[notification.type]}
          </Badge>

          {/* Priority Badge */}
          {notification.priority === "high" && (
            <Badge variant="destructive" className="text-xs">
              {t.priority.high}
            </Badge>
          )}
        </div>
      </div>

      {/* Context Menu */}
      <div className="flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {notification.status === "unread" ? (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkRead();
                }}
              >
                <CheckIcon className="mr-2 h-4 w-4" />

                {t.actions.markRead}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkUnread();
                }}
              >
                <XIcon className="mr-2 h-4 w-4" />

                {t.actions.markUnread}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onArchive();
              }}
            >
              <ArchiveIcon className="mr-2 h-4 w-4" />

              {t.actions.archive}
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <TrashIcon className="mr-2 h-4 w-4" />

              {t.actions.delete}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <EyeOffIcon className="mr-2 h-4 w-4" />

              {t.actions.hideSimilar}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
