/**
 * VIAMENTOR Contextual Navigation Bar
 *
 * Barre de navigation contextuelle pour naviguer entre entités
 * Affiche: Précédent | Position | Suivant + Retour liste + Élèves similaires
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  UsersIcon,
  InfoIcon,
} from "lucide-react";
import type { ContextualNavigationResult } from "@/viamentor/data/viamentor-contextual-navigation";
import type { ContextualNavigationLocale } from "@/viamentor/data/viamentor-contextual-navigation";
import { CONTEXTUAL_NAVIGATION_I18N } from "@/viamentor/data/viamentor-contextual-navigation";

// ============================================================================
// TYPES
// ============================================================================

interface ContextualNavigationBarProps {
  navigation: ContextualNavigationResult;
  locale?: ContextualNavigationLocale;
  entityName?: string;
  contextLabel?: string;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ContextualNavigationBar({
  navigation,
  locale = "fr",
  entityName,
  contextLabel,
  className = "",
}: ContextualNavigationBarProps) {
  const t = CONTEXTUAL_NAVIGATION_I18N[locale];

  const positionText = t.position
    .replace("{{current}}", String(navigation.currentIndex + 1))
    .replace("{{total}}", String(navigation.totalCount));

  return (
    <div className={`bg-muted/50 border-b border-border ${className}`}>
      <div className="max-w-[1600px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back to List */}
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={navigation.backToList}
                    className="gap-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />

                    <span className="hidden sm:inline">{t.backToList}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.backToList}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {contextLabel && (
              <>
                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <InfoIcon className="h-4 w-4" />

                  <span className="hidden md:inline">{contextLabel}</span>
                </div>
              </>
            )}
          </div>

          {/* Center: Navigation Controls */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={navigation.goToPrevious}
                    disabled={!navigation.hasPrevious}
                    className="gap-2"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />

                    <span className="hidden sm:inline">{t.previous}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.previous}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="px-4 py-2 bg-background rounded-md border border-border min-w-[120px] text-center">
              <div className="text-xs text-muted-foreground">
                {positionText}
              </div>
              {entityName && (
                <div className="text-sm font-medium truncate max-w-[200px]">
                  {entityName}
                </div>
              )}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={navigation.goToNext}
                    disabled={!navigation.hasNext}
                    className="gap-2"
                  >
                    <span className="hidden sm:inline">{t.next}</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.next}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Right: Similar Items */}
          <div>
            {navigation.similarItems.length > 0 ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <UsersIcon className="h-4 w-4" />

                    <span className="hidden md:inline">{t.similarItems}</span>
                    <Badge variant="secondary" className="ml-1">
                      {navigation.similarItems.length}
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />

                      <h4 className="font-medium">{t.similarItems}</h4>
                    </div>
                    <Separator />

                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {navigation.similarItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => navigation.goToSimilar(item.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left"
                        >
                          {item.avatar && (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {item.name}
                            </div>
                            {item.category && (
                              <div className="text-sm text-muted-foreground">
                                Catégorie {item.category}
                              </div>
                            )}
                          </div>
                          {item.status && (
                            <Badge
                              variant={
                                item.status === "active"
                                  ? "default"
                                  : item.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="shrink-0"
                            >
                              {item.status}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="gap-2"
                    >
                      <UsersIcon className="h-4 w-4" />

                      <span className="hidden md:inline">{t.similarItems}</span>
                      <Badge variant="secondary" className="ml-1">
                        0
                      </Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.noSimilar}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPACT VERSION
// ============================================================================

interface CompactNavigationBarProps {
  navigation: ContextualNavigationResult;
  locale?: ContextualNavigationLocale;
  className?: string;
}

/**
 * Version compacte pour mobile ou espaces réduits
 */
export function CompactNavigationBar({
  navigation,
  locale = "fr",
  className = "",
}: CompactNavigationBarProps) {
  const t = CONTEXTUAL_NAVIGATION_I18N[locale];

  const positionText = t.position
    .replace("{{current}}", String(navigation.currentIndex + 1))
    .replace("{{total}}", String(navigation.totalCount));

  return (
    <div
      className={`flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-lg ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={navigation.goToPrevious}
        disabled={!navigation.hasPrevious}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <div className="text-xs text-muted-foreground">{positionText}</div>

      <Button
        variant="ghost"
        size="icon"
        onClick={navigation.goToNext}
        disabled={!navigation.hasNext}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
