/**
 * VIAMENTOR - Sidebar Navigation
 * Tree collapsible avec Accordion
 */

"use client";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRightIcon } from "lucide-react";
import {
  type NavigationConfig,
  type NavigationItem,
  SIDEBAR_I18N,
} from "@/polymet/data/viamentor-sidebar-navigation-data";

export interface SidebarNavigationProps {
  config: NavigationConfig;
  locale?: "fr" | "de" | "it" | "en";
  isCollapsed?: boolean;
  badgeCounts?: Record<string, number>;
  onNavigate?: (href: string) => void;
}

export function SidebarNavigation({
  config,
  locale = "fr",
  isCollapsed = false,
  badgeCounts = {},
  onNavigate,
}: SidebarNavigationProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [openItems, setOpenItems] = useState<string[]>([]);
  const t = SIDEBAR_I18N[locale];

  const getTranslation = (key: string): string => {
    const keys = key.split(".");
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getBadgeValue = (item: NavigationItem): string | number | undefined => {
    if (item.badge?.value) return item.badge.value;
    if (item.badge?.type === "count") {
      return badgeCounts[item.id] || 0;
    }
    return undefined;
  };

  const isActive = (href?: string) => {
    if (!href || !pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const renderNavItem = (item: NavigationItem) => {
    const Icon = item.icon;
    const label = getTranslation(item.label);
    const badgeValue = getBadgeValue(item);
    const active = isActive(item.href);

    if (isCollapsed) {
      return (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => item.href && onNavigate?.(item.href)}
                className={cn(
                  "w-full p-2.5 flex items-center justify-center rounded-lg transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-foreground">{label}</p>
              {badgeValue !== undefined && (
                <Badge variant="secondary" className="ml-2">
                  {badgeValue}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (item.type === "collapsible" && item.children) {
      return (
        <AccordionItem key={item.id} value={item.id} className="border-none">
          <AccordionTrigger className="py-2 px-3 hover:bg-accent hover:text-accent-foreground rounded-lg hover:no-underline">
            <div className="flex items-center gap-3 flex-1">
              <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />

              <span className="text-sm font-medium flex-1 text-left text-foreground">
                {label}
              </span>
              {badgeValue !== undefined && (
                <Badge
                  variant={
                    item.badge?.variant === "primary"
                      ? "default"
                      : item.badge?.variant === "warning"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-xs"
                >
                  {badgeValue}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-1">
            <div className="ml-8 space-y-0.5">
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                const childLabel = getTranslation(child.label);
                const childActive = isActive(child.href);

                return (
                  <button
                    key={child.id}
                    onClick={() => child.href && onNavigate?.(child.href)}
                    className={cn(
                      "w-full py-2 px-3 flex items-center gap-3 rounded-lg text-sm transition-colors",
                      childActive
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <ChildIcon className="h-4 w-4 flex-shrink-0" />

                    <span className="flex-1 text-left">{childLabel}</span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => item.href && onNavigate?.(item.href)}
        className={cn(
          "w-full py-2.5 px-3 flex items-center gap-3 rounded-lg text-sm transition-colors",
          active
            ? "bg-primary text-primary-foreground font-medium"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />

        <span className="flex-1 text-left">{label}</span>
        {badgeValue !== undefined && (
          <Badge
            variant={
              item.badge?.variant === "success"
                ? "default"
                : item.badge?.variant === "warning"
                  ? "secondary"
                  : "outline"
            }
            className="text-xs"
          >
            {badgeValue}
          </Badge>
        )}
      </button>
    );
  };

  return (
    <nav className="space-y-4 px-3">
      {config.map((section) => (
        <div key={section.id} className="space-y-0.5">
          {section.label && !isCollapsed && (
            <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {getTranslation(section.label)}
            </p>
          )}
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="space-y-0.5"
          >
            {section.items.map((item) => renderNavItem(item))}
          </Accordion>
        </div>
      ))}
    </nav>
  );
}
