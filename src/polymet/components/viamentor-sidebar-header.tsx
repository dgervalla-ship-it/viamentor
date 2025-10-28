/**
 * VIAMENTOR - Sidebar Header
 * Logo + User Card avec dropdown
 */

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDownIcon,
  UserIcon,
  SettingsIcon,
  PaletteIcon,
  LogOutIcon,
  HeartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SIDEBAR_I18N,
  type UserStatus,
} from "@/polymet/data/viamentor-sidebar-navigation-data";

export interface SidebarHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: UserStatus;
    tenant: {
      id: string;
      name: string;
      logo: string;
    };
  };
  locale?: "fr" | "de" | "it" | "en";
  isCollapsed?: boolean;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onPreferencesClick?: () => void;
  onThemeClick?: () => void;
  onLogoutClick?: () => void;
}

export function SidebarHeader({
  user,
  locale = "fr",
  isCollapsed = false,
  onProfileClick,
  onSettingsClick,
  onPreferencesClick,
  onThemeClick,
  onLogoutClick,
}: SidebarHeaderProps) {
  const t = SIDEBAR_I18N[locale].sidebar;

  const statusColors = {
    online: "bg-green-500 dark:bg-green-400",
    away: "bg-orange-500 dark:bg-orange-400",
    offline: "bg-muted-foreground",
  };

  if (isCollapsed) {
    return (
      <div className="p-3 border-b border-border bg-card">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative mx-auto w-fit">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src={user.avatar} />

                  <AvatarFallback className="bg-primary text-primary-foreground rounded-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                    statusColors[user.status]
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // User card removed - now only in header to avoid duplication
  return null;
}
