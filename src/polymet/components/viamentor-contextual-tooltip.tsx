/**
 * VIAMENTOR Contextual Tooltip
 *
 * Tooltip interactif contextuel avec icon "?", exemple, learn more et don't show again
 * Utilisé pour expliquer features inline avec granular control
 *
 * @module components/viamentor-contextual-tooltip
 * @version 1.0.0
 */

"use client";

import { useState, useEffect } from "react";
import { HelpCircleIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ContextualTooltipProps } from "@/polymet/data/viamentor-tours-types";

/**
 * Composant ContextualTooltip
 *
 * @example
 * ```tsx
 * <ContextualTooltip
 *   title="Planning"
 *   content="Gérez vos leçons pratiques et cours théoriques"
 *   example="Ex: Cliquez sur une date pour ajouter une leçon"
 *   learnMoreUrl="/docs/planning"
 *   showDontShowAgain
 *   storageKey="tooltip-planning"
 * />
 * ```
 */
export function ContextualTooltip({
  title,
  content,
  example,
  learnMoreUrl,
  trigger,
  placement = "top",
  showDontShowAgain = false,
  storageKey,
  className,
  maxWidth = 320,
  onDismiss,
}: ContextualTooltipProps) {
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Charger la préférence "ne plus afficher" depuis localStorage
  useEffect(() => {
    if (!storageKey) return;

    try {
      const storage = localStorage.getItem("viamentor-tooltips");
      if (!storage) return;

      const config: Record<string, boolean> = JSON.parse(storage);
      if (config[storageKey]) {
        setIsHidden(true);
      }
    } catch (error) {
      console.error("Failed to load tooltip preference:", error);
    }
  }, [storageKey]);

  // Sauvegarder la préférence "ne plus afficher"
  const handleDontShowAgainChange = (checked: boolean) => {
    setDontShowAgain(checked);

    if (!storageKey || !checked) return;

    try {
      const storage = localStorage.getItem("viamentor-tooltips");
      const config: Record<string, boolean> = storage
        ? JSON.parse(storage)
        : {};

      config[storageKey] = true;

      localStorage.setItem("viamentor-tooltips", JSON.stringify(config));
      setIsHidden(true);
      setOpen(false);

      onDismiss?.();
    } catch (error) {
      console.error("Failed to save tooltip preference:", error);
    }
  };

  // Ne pas afficher si l'utilisateur a choisi "ne plus afficher"
  if (isHidden) {
    return null;
  }

  // Trigger par défaut: icon "?"
  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="h-5 w-5 rounded-full text-muted-foreground hover:text-foreground"
      aria-label="Help"
    >
      <HelpCircleIcon className="h-4 w-4" />
    </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger || defaultTrigger}</PopoverTrigger>

      <PopoverContent
        side={placement as any}
        align="start"
        className={cn("p-0", className)}
        style={{ maxWidth }}
      >
        <div className="space-y-3 p-4">
          {/* Header avec close button */}
          <div className="flex items-start justify-between gap-2">
            {title && (
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>

          {/* Example */}
          {example && (
            <div className="rounded-md bg-muted px-3 py-2">
              <p className="text-xs text-muted-foreground italic">{example}</p>
            </div>
          )}

          {/* Learn More Link */}
          {learnMoreUrl && (
            <a
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <span>En savoir plus</span>
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          )}

          {/* Don't Show Again */}
          {showDontShowAgain && storageKey && (
            <div className="flex items-center gap-2 border-t border-border pt-3">
              <Checkbox
                id={`dont-show-${storageKey}`}
                checked={dontShowAgain}
                onCheckedChange={handleDontShowAgainChange}
              />

              <label
                htmlFor={`dont-show-${storageKey}`}
                className="text-xs text-muted-foreground cursor-pointer select-none"
              >
                Ne plus afficher ce conseil
              </label>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Helper pour reset tous les tooltips
 */
export function resetAllTooltips(): void {
  try {
    localStorage.removeItem("viamentor-tooltips");
  } catch (error) {
    console.error("Failed to reset tooltips:", error);
  }
}

/**
 * Helper pour reset un tooltip spécifique
 */
export function resetTooltip(storageKey: string): void {
  try {
    const storage = localStorage.getItem("viamentor-tooltips");
    if (!storage) return;

    const config: Record<string, boolean> = JSON.parse(storage);
    delete config[storageKey];

    localStorage.setItem("viamentor-tooltips", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to reset tooltip:", error);
  }
}

export { ContextualTooltip as default };
