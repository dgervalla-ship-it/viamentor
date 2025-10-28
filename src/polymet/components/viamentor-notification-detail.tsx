/**
 * VIAMENTOR - Notification Detail
 * Panneau détail avec header, content, metadata et actions
 */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  Notification,
  NotificationsLocale,
} from "@/polymet/data/viamentor-notifications-center-data";
import {
  getNotificationsCenterTranslations,
  getNotificationTypeColor,
  formatFullTimestamp,
} from "@/polymet/data/viamentor-notifications-center-data";

// ============================================================================
// TYPES
// ============================================================================

interface NotificationDetailProps {
  notification: Notification | null;
  locale?: NotificationsLocale;
  onBack: () => void;
  onActionClick: (actionId: string, url?: string) => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function NotificationDetail({
  notification,
  locale = "fr",
  onBack,
  onActionClick,
  className,
}: NotificationDetailProps) {
  const t = getNotificationsCenterTranslations(locale);

  if (!notification) {
    return (
      <div
        className={cn(
          "flex h-full items-center justify-center bg-muted/20",
          className
        )}
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Sélectionnez une notification pour voir les détails
          </p>
        </div>
      </div>
    );
  }

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
    <div className={cn("flex h-full flex-col bg-background", className)}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-4">
          {/* Back Button (Mobile) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="md:hidden"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>

          {/* Type Badge */}
          <Badge className={cn("text-sm", typeColor, "text-white")}>
            {t.types[notification.type]}
          </Badge>

          {/* Timestamp */}
          <span className="text-sm text-muted-foreground">
            {formatFullTimestamp(notification.timestamp, locale)}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground">
          {notification.title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        <div className="mb-6">
          <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
            {notification.content || notification.description}
          </p>
        </div>

        <Separator className="my-6" />

        {/* Metadata Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {/* From */}
          {notification.from && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                {t.detail.from}
              </h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {notification.from.avatar && (
                    <AvatarImage
                      src={notification.from.avatar}
                      alt={notification.from.name}
                    />
                  )}
                  <AvatarFallback>
                    {getInitials(notification.from.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {notification.from.name}
                  </p>
                  {notification.from.role && (
                    <p className="text-sm text-muted-foreground">
                      {notification.from.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* To */}
          {notification.to && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                {t.detail.to}
              </h3>
              <p className="text-foreground">{notification.to}</p>
            </div>
          )}

          {/* Category */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              {t.detail.category}
            </h3>
            <Badge variant="secondary">
              {t.categories[notification.category]}
            </Badge>
          </div>

          {/* Priority */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              {t.detail.priority}
            </h3>
            <Badge
              variant={
                notification.priority === "high" ? "destructive" : "secondary"
              }
            >
              {t.priority[notification.priority]}
            </Badge>
          </div>
        </div>

        {/* Related Entity */}
        {notification.relatedEntity && (
          <>
            <Separator className="my-6" />

            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                {t.detail.relatedEntity}
              </h3>
              <Card className="cursor-pointer transition-colors hover:bg-accent">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {notification.relatedEntity.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {
                        t.categories[
                          notification.relatedEntity
                            .type as keyof typeof t.categories
                        ]
                      }
                    </p>
                  </div>
                  <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Actions */}
        {notification.actions && notification.actions.length > 0 && (
          <>
            <Separator className="my-6" />

            <div className="flex flex-wrap gap-3">
              {notification.actions.map((action) => (
                <Button
                  key={action.id}
                  variant={
                    action.variant === "primary"
                      ? "default"
                      : action.variant === "secondary"
                        ? "outline"
                        : "ghost"
                  }
                  onClick={() => onActionClick(action.id, action.url)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
