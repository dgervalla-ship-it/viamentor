/**
 * VIAMENTOR - Upcoming Items List Component
 * Composant générique réutilisable pour afficher des listes d'items à venir
 *
 * FEATURES:
 * - Design cohérent pour leçons, événements, tâches
 * - Support avatar/icône
 * - Badges de statut/type
 * - Actions personnalisables
 * - Responsive et accessible
 * - Support groupement par date
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShapesIcon as LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface UpcomingItem {
  id: string;
  title: string;
  subtitle?: string;
  time?: string;
  date?: string;
  location?: string;
  avatar?: string;
  avatarFallback?: string;
  icon?: LucideIcon;
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  }>;
  status?: "upcoming" | "in-progress" | "completed" | "cancelled";
  metadata?: Array<{
    icon?: LucideIcon;
    label: string;
  }>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost" | "destructive";
    icon?: LucideIcon;
  }>;
}

export interface UpcomingItemsListProps {
  title: string;
  description?: string;
  items: UpcomingItem[];
  emptyMessage?: string;
  headerAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  footerAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
  compact?: boolean;
  showTime?: boolean;
  showLocation?: boolean;
  groupByDate?: boolean;
}

// ============================================================================
// STATUS STYLES
// ============================================================================

const STATUS_STYLES = {
  upcoming: "border-primary/20 hover:bg-primary/5",
  "in-progress": "border-orange-500/20 hover:bg-orange-500/5",
  completed: "border-green-500/20 hover:bg-green-500/5 opacity-75",
  cancelled: "border-destructive/20 hover:bg-destructive/5 opacity-50",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function UpcomingItemsList({
  title,
  description,
  items,
  emptyMessage = "Aucun élément à afficher",
  headerAction,
  footerAction,
  className = "",
  compact = false,
  showTime = true,
  showLocation = true,
  groupByDate = false,
}: UpcomingItemsListProps) {
  // Group items by date if needed
  const groupedItems = groupByDate
    ? items.reduce(
        (acc, item) => {
          const date = item.date || "Sans date";
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        },
        {} as Record<string, UpcomingItem[]>
      )
    : { all: items };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && (
            <Button variant="outline" size="sm" onClick={headerAction.onClick}>
              {headerAction.label}
              {headerAction.icon && (
                <headerAction.icon className="ml-2 h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedItems).map(([date, dateItems]) => (
              <div key={date}>
                {groupByDate && date !== "all" && (
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                    {date}
                  </h4>
                )}
                <div className={compact ? "space-y-2" : "space-y-4"}>
                  {dateItems.map((item) => {
                    const ItemIcon = item.icon;
                    const statusStyle = item.status
                      ? STATUS_STYLES[item.status]
                      : STATUS_STYLES.upcoming;

                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-4 rounded-lg border p-${
                          compact ? "3" : "4"
                        } transition-colors ${statusStyle}`}
                      >
                        {/* Time/Icon Column */}
                        {showTime && item.time && (
                          <div className="flex flex-col items-center gap-1 min-w-[80px]">
                            {ItemIcon && (
                              <ItemIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-medium">
                              {item.time}
                            </span>
                          </div>
                        )}

                        {/* Avatar/Icon */}
                        {(item.avatar || ItemIcon) && !showTime && (
                          <div className="flex-shrink-0">
                            {item.avatar ? (
                              <Avatar
                                className={compact ? "h-8 w-8" : "h-10 w-10"}
                              >
                                <AvatarImage src={item.avatar} />

                                <AvatarFallback>
                                  {item.avatarFallback || item.title[0]}
                                </AvatarFallback>
                              </Avatar>
                            ) : ItemIcon ? (
                              <div className="rounded-full bg-primary/10 p-2">
                                <ItemIcon className="h-5 w-5 text-primary" />
                              </div>
                            ) : null}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-2">
                            {item.avatar && showTime && (
                              <Avatar
                                className={compact ? "h-8 w-8" : "h-10 w-10"}
                              >
                                <AvatarImage src={item.avatar} />

                                <AvatarFallback>
                                  {item.avatarFallback || item.title[0]}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex-1">
                              <p
                                className={`font-medium ${compact ? "text-sm" : ""}`}
                              >
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="text-xs text-muted-foreground">
                                  {item.subtitle}
                                </p>
                              )}
                              {item.badges && item.badges.length > 0 && (
                                <div className="flex items-center gap-2 mt-1">
                                  {item.badges.map((badge, idx) => (
                                    <Badge
                                      key={idx}
                                      variant={badge.variant || "outline"}
                                      className="text-xs"
                                    >
                                      {badge.label}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Metadata */}
                          {item.metadata && item.metadata.length > 0 && (
                            <div className="space-y-1">
                              {item.metadata.map((meta, idx) => {
                                const MetaIcon = meta.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                  >
                                    {MetaIcon && (
                                      <MetaIcon className="h-4 w-4" />
                                    )}
                                    {meta.label}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Location */}
                          {showLocation && item.location && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.location}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        {item.actions && item.actions.length > 0 && (
                          <div className="flex flex-col gap-2">
                            {item.actions.map((action, idx) => {
                              const ActionIcon = action.icon;
                              return (
                                <Button
                                  key={idx}
                                  size="sm"
                                  variant={action.variant || "outline"}
                                  onClick={action.onClick}
                                >
                                  {ActionIcon && (
                                    <ActionIcon className="h-4 w-4 mr-2" />
                                  )}
                                  {action.label}
                                </Button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {footerAction && items.length > 0 && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={footerAction.onClick}
          >
            {footerAction.label}
            {footerAction.icon && (
              <footerAction.icon className="ml-2 h-4 w-4" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default UpcomingItemsList;
