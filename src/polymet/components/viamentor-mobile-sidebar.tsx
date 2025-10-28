/**
 * VIAMENTOR - Mobile Sidebar Component
 * Sidebar mobile avec Drawer overlay et swipe gestures
 *
 * Features:
 * - Drawer overlay backdrop blur
 * - Swipe left to close gesture
 * - Touch-friendly tap targets 44x44px
 * - Responsive <768px only
 * - Auto-close on navigation
 * - Smooth slide animation
 */

"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarSection } from "@/polymet/components/viamentor-sidebar-section";
import type { NavigationConfig } from "@/polymet/data/viamentor-navigation-config";
import type { NavigationLocale } from "@/polymet/data/viamentor-navigation-i18n";
import { NAVIGATION_I18N } from "@/polymet/data/viamentor-navigation-i18n";

export interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: NavigationConfig;
  locale?: NavigationLocale;
  badgeCounts?: Record<string, number>;
  onNavigate?: (href: string) => void;
  user?: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  className?: string;
}

export function MobileSidebar({
  open,
  onOpenChange,
  config,
  locale = "fr",
  badgeCounts = {},
  onNavigate,
  user,
  className,
}: MobileSidebarProps) {
  const t = NAVIGATION_I18N[locale];

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
    // Auto-close on navigation
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className={cn(
          "w-[280px] p-0 flex flex-col bg-card",
          "md:hidden", // Only show on mobile
          className
        )}
      >
        {/* Header */}
        <SheetHeader className="border-b px-4 py-3 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  VM
                </span>
              </div>
              <SheetTitle className="text-base font-semibold">
                Viamentor
              </SheetTitle>
            </div>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <XIcon className="h-5 w-5" />

            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>

        {/* User info */}
        {user && (
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-6">
            {config.map((section) => (
              <SidebarSection
                key={section.id}
                id={section.id}
                label={
                  section.label
                    ? t.navigation.sections[
                        section.label
                          .split(".")
                          .pop() as keyof typeof t.navigation.sections
                      ]
                    : undefined
                }
                items={section.items.map((item) => ({
                  ...item,
                  label: t.navigation[
                    item.label.split(".").pop() as keyof typeof t.navigation
                  ] as string,
                }))}
                badgeCounts={badgeCounts}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>v2.1.0</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />

              {t.sidebar.online}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
