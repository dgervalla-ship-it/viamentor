/**
 * VIAMENTOR - Sidebar Section Component
 * Section navigation collapsible avec accordion behavior
 *
 * Features:
 * - Collapsible accordion smooth transition 200ms
 * - ChevronDown icon rotate animation
 * - Section label optional (uppercase small)
 * - Nested items indent hierarchy
 * - Expanded/collapsed state management
 * - Keyboard navigation support
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, type ShapesIcon as LucideIcon } from "lucide-react";
import { SidebarLink } from "@/polymet/components/viamentor-sidebar-link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface NavigationItem {
  id: string;
  type: "link" | "collapsible";
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: {
    type: "count" | "status" | "new";
    value?: string | number;
    variant?: "default" | "primary" | "success" | "warning" | "danger";
  };
  children?: NavigationItem[];
}

export interface SidebarSectionProps {
  id: string;
  label?: string;
  items: NavigationItem[];
  isCollapsed?: boolean;
  defaultExpanded?: boolean;
  badgeCounts?: Record<string, number>;
  onNavigate?: (href: string) => void;
  className?: string;
}

export function SidebarSection({
  id,
  label,
  items,
  isCollapsed = false,
  defaultExpanded = true,
  badgeCounts = {},
  onNavigate,
  className,
}: SidebarSectionProps) {
  return (
    <div className={cn("space-y-1", className)} data-section-id={id}>
      {/* Section Label */}
      {!isCollapsed && label && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </h3>
        </div>
      )}

      {/* Navigation Items */}
      <div className="space-y-0.5">
        {items.map((item) => (
          <NavigationItemRenderer
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            defaultExpanded={defaultExpanded}
            badgeCounts={badgeCounts}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

interface NavigationItemRendererProps {
  item: NavigationItem;
  isCollapsed: boolean;
  defaultExpanded: boolean;
  badgeCounts: Record<string, number>;
  onNavigate?: (href: string) => void;
}

function NavigationItemRenderer({
  item,
  isCollapsed,
  defaultExpanded,
  badgeCounts,
  onNavigate,
}: NavigationItemRendererProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  // Inject badge count from badgeCounts if available
  const itemWithBadge = {
    ...item,
    badge:
      item.badge ||
      (badgeCounts[item.id]
        ? { type: "count" as const, value: badgeCounts[item.id] }
        : undefined),
  };

  // Simple link
  if (item.type === "link" && item.href) {
    return (
      <SidebarLink
        id={item.id}
        label={item.label}
        icon={item.icon}
        href={item.href}
        badge={itemWithBadge.badge}
        isCollapsed={isCollapsed}
        onClick={onNavigate}
      />
    );
  }

  // Collapsible with children
  if (item.type === "collapsible" && item.children) {
    // In collapsed mode, show only icon with tooltip
    if (isCollapsed) {
      return (
        <SidebarLink
          id={item.id}
          label={item.label}
          icon={item.icon}
          href={item.children[0]?.href || "#"}
          badge={itemWithBadge.badge}
          isCollapsed={isCollapsed}
          onClick={onNavigate}
        />
      );
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150",
            "hover:bg-accent/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {/* Icon */}
          <item.icon className="shrink-0 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />

          {/* Label */}
          <span className="flex-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-left truncate">
            {item.label}
          </span>

          {/* Badge */}
          {itemWithBadge.badge && (
            <span
              className={cn(
                "shrink-0 h-5 min-w-[20px] px-1.5 rounded-full text-xs font-semibold flex items-center justify-center",
                itemWithBadge.badge.variant === "primary" &&
                  "bg-primary text-primary-foreground",
                itemWithBadge.badge.variant === "warning" &&
                  "bg-orange-500 text-white",
                itemWithBadge.badge.variant === "success" &&
                  "bg-green-500 text-white",
                itemWithBadge.badge.variant === "danger" &&
                  "bg-destructive text-destructive-foreground",
                !itemWithBadge.badge.variant &&
                  "bg-secondary text-secondary-foreground"
              )}
            >
              {itemWithBadge.badge.value}
            </span>
          )}

          {/* Chevron */}
          <ChevronDownIcon
            className={cn(
              "shrink-0 w-4 h-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-0.5 pt-0.5">
          {item.children.map((child) => (
            <SidebarLink
              key={child.id}
              id={child.id}
              label={child.label}
              icon={child.icon}
              href={child.href || "#"}
              badge={
                child.badge ||
                (badgeCounts[child.id]
                  ? { type: "count" as const, value: badgeCounts[child.id] }
                  : undefined)
              }
              isNested
              onClick={onNavigate}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return null;
}
