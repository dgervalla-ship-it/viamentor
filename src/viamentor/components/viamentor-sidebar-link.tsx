/**
 * VIAMENTOR - Sidebar Link Component
 * Lien navigation individuel avec icon, badge, active state, hover
 *
 * Features:
 * - Icon Lucide 20x20 consistent
 * - Badge count/status dynamic
 * - Active state highlight border-left 3px
 * - Hover smooth transition
 * - Keyboard shortcuts support
 * - Tooltip full label hover
 * - Nested indent 12px
 */

"use client";

import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ShapesIcon as LucideIcon } from "lucide-react";

export interface SidebarLinkProps {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: {
    type: "count" | "status" | "new";
    value?: string | number;
    variant?: "default" | "primary" | "success" | "warning" | "danger";
  };
  isNested?: boolean;
  isCollapsed?: boolean;
  onClick?: (href: string) => void;
  className?: string;
}

export const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  (
    {
      id,
      label,
      icon: Icon,
      href,
      badge,
      isNested = false,
      isCollapsed = false,
      onClick,
      className,
    },
    ref
  ) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        e.preventDefault();
        onClick(href);
      }
    };

    const linkContent = (
      <Link
        ref={ref}
        to={href}
        onClick={handleClick}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150",
          "hover:bg-accent/50",
          isActive && [
            "bg-primary/10 border-l-3 border-primary",
            "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r",
          ],

          isNested && "ml-3 pl-6",
          isCollapsed && "justify-center px-2",
          className
        )}
        data-active={isActive}
        data-link-id={id}
      >
        {/* Icon */}
        <Icon
          className={cn(
            "shrink-0 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground",
            "group-hover:text-foreground",
            isCollapsed ? "w-5 h-5" : "w-5 h-5"
          )}
        />

        {/* Label */}
        {!isCollapsed && (
          <span
            className={cn(
              "flex-1 text-sm font-medium truncate transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground",
              "group-hover:text-foreground"
            )}
          >
            {label}
          </span>
        )}

        {/* Badge */}
        {!isCollapsed && badge && (
          <Badge
            variant={
              badge.variant === "primary"
                ? "default"
                : badge.variant === "danger"
                  ? "destructive"
                  : "secondary"
            }
            className={cn(
              "shrink-0 h-5 min-w-[20px] px-1.5 text-xs font-semibold",
              badge.type === "status" && "rounded-full",
              badge.variant === "warning" && "bg-orange-500 text-white",
              badge.variant === "success" && "bg-green-500 text-white"
            )}
          >
            {badge.value}
          </Badge>
        )}

        {/* Collapsed badge indicator */}
        {isCollapsed && badge && badge.type === "count" && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {badge.value}
          </span>
        )}
      </Link>
    );

    // Wrap with tooltip when collapsed
    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              <span>{label}</span>
              {badge && (
                <Badge
                  variant="secondary"
                  className="h-5 min-w-[20px] px-1.5 text-xs"
                >
                  {badge.value}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return linkContent;
  }
);

SidebarLink.displayName = "SidebarLink";
