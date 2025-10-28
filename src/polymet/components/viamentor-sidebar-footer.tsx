/**
 * VIAMENTOR - Sidebar Footer
 * Collapse button, Shortcuts, Version, API Status
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PanelLeftIcon, KeyboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SIDEBAR_I18N,
  type ApiStatus,
} from "@/polymet/data/viamentor-sidebar-navigation-data";

export interface SidebarFooterProps {
  isCollapsed?: boolean;
  locale?: "fr" | "de" | "it" | "en";
  apiStatus?: ApiStatus;
  version?: string;
  onToggleCollapse?: () => void;
}

export function SidebarFooter({
  isCollapsed = false,
  locale = "fr",
  apiStatus = "healthy",
  version = "v2.1.0",
  onToggleCollapse,
}: SidebarFooterProps) {
  const t = SIDEBAR_I18N[locale].sidebar;

  const apiStatusConfig = {
    healthy: {
      color: "bg-green-500",
      text: t.apiHealthy,
      ping: true,
    },
    degraded: {
      color: "bg-orange-500",
      text: t.apiDegraded,
      ping: false,
    },
    down: {
      color: "bg-red-500",
      text: t.apiDown,
      ping: false,
    },
  };

  const shortcuts = [
    { key: "?", description: "Afficher les raccourcis" },
    { key: "Ctrl + K", description: "Recherche rapide" },
    { key: "Ctrl + B", description: "Réduire/Étendre sidebar" },
    { key: "Ctrl + /", description: "Aide contextuelle" },
    { key: "Ctrl + N", description: "Nouveau" },
    { key: "Ctrl + S", description: "Sauvegarder" },
    { key: "Esc", description: "Fermer modal" },
  ];

  if (isCollapsed) {
    return (
      <div className="p-3 border-t border-border space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="w-full h-10 hover:bg-accent hover:text-accent-foreground"
              >
                <PanelLeftIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-foreground">{t.expand}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center py-2">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    apiStatusConfig[apiStatus].color,
                    apiStatusConfig[apiStatus].ping && "animate-pulse"
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-foreground">
                {apiStatusConfig[apiStatus].text}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="p-3 border-t border-border space-y-2">
      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
      >
        <PanelLeftIcon className="mr-2 h-4 w-4" />

        <span className="text-foreground">{t.collapse}</span>
      </Button>

      {/* Shortcuts Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
          >
            <KeyboardIcon className="mr-2 h-4 w-4" />

            <span className="text-foreground">{t.shortcuts}</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ?
            </kbd>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-foreground">{t.shortcuts}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted"
              >
                <span className="text-sm text-foreground">
                  {shortcut.description}
                </span>
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-md border border-border bg-background px-2 font-mono text-xs font-medium text-foreground">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Version & Status */}
      <div className="flex items-center justify-between text-xs px-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="text-xs cursor-help border-border"
              >
                {version}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-foreground">
                {t.version}: {version}
              </p>
              <p className="text-xs text-muted-foreground">
                Changelog disponible
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    apiStatusConfig[apiStatus].color,
                    apiStatusConfig[apiStatus].ping && "animate-pulse"
                  )}
                />

                <span className="text-xs text-muted-foreground">
                  {t.status}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-foreground">
                {apiStatusConfig[apiStatus].text}
              </p>
              <p className="text-xs text-muted-foreground">Uptime: 99.9%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
