/**
 * VIAMENTOR - HelpTooltip Component
 * Composant réutilisable pour aide contextuelle avec best practices
 */

import { HelpCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface HelpTooltipProps {
  /** Contenu du tooltip */
  content: string;

  /** Exemple d'utilisation (optionnel) */
  example?: string;

  /** Lien "En savoir plus" (optionnel) */
  learnMoreUrl?: string;

  /** Placement du tooltip */
  placement?: "top" | "right" | "bottom" | "left";

  /** Largeur maximale du tooltip */
  maxWidth?: number;

  /** Afficher "Ne plus afficher" (optionnel) */
  showDontShowAgain?: boolean;

  /** Clé de stockage localStorage pour "Ne plus afficher" */
  storageKey?: string;

  /** Taille de l'icône */
  size?: "sm" | "md" | "lg";

  /** Classe CSS personnalisée */
  className?: string;

  /** Callback quand tooltip est fermé */
  onDismiss?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function HelpTooltip({
  content,
  example,
  learnMoreUrl,
  placement = "top",
  maxWidth = 320,
  showDontShowAgain = false,
  storageKey,
  size = "sm",
  className,
  onDismiss,
}: HelpTooltipProps) {
  // Vérifier si tooltip a été masqué
  const isDismissed = storageKey
    ? typeof window !== "undefined" &&
      localStorage.getItem(`tooltip-dismissed-${storageKey}`) === "true"
    : false;

  // Ne pas afficher si masqué
  if (isDismissed) return null;

  // Handler pour "Ne plus afficher"
  const handleDontShowAgain = () => {
    if (storageKey) {
      localStorage.setItem(`tooltip-dismissed-${storageKey}`, "true");
    }
    onDismiss?.();
  };

  // Tailles d'icône
  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "hover:bg-muted transition-colors duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              size === "sm" && "w-4 h-4",
              size === "md" && "w-5 h-5",
              size === "lg" && "w-6 h-6",
              className
            )}
            aria-label="Aide"
          >
            <HelpCircleIcon
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                iconSizes[size]
              )}
            />
          </button>
        </TooltipTrigger>

        <TooltipContent
          side={placement}
          className="max-w-xs p-4 space-y-3"
          style={{ maxWidth: `${maxWidth}px` }}
        >
          {/* Contenu principal */}
          <p className="text-sm leading-relaxed">{content}</p>

          {/* Exemple (optionnel) */}
          {example && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Exemple :
              </p>
              <p className="text-xs text-muted-foreground italic">{example}</p>
            </div>
          )}

          {/* Actions */}
          {(learnMoreUrl || showDontShowAgain) && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              {/* Lien "En savoir plus" */}
              {learnMoreUrl && (
                <a
                  href={learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  En savoir plus →
                </a>
              )}

              {/* Bouton "Ne plus afficher" */}
              {showDontShowAgain && storageKey && (
                <button
                  type="button"
                  onClick={handleDontShowAgain}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ne plus afficher
                </button>
              )}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Exemple 1: Tooltip simple
 *
 * <Label>
 *   Catégorie permis
 *   <HelpTooltip content="Catégorie B = voiture, A = moto, C = camion" />
 * </Label>
 */

/**
 * Exemple 2: Tooltip avec exemple
 *
 * <Label>
 *   Email
 *   <HelpTooltip
 *     content="Adresse email professionnelle ou personnelle"
 *     example="jean.dupont@example.com"
 *   />
 * </Label>
 */

/**
 * Exemple 3: Tooltip avec lien "En savoir plus"
 *
 * <Label>
 *   Numéro OAC
 *   <HelpTooltip
 *     content="Numéro d'autorisation de conduire délivré par l'OAC"
 *     learnMoreUrl="https://www.oac.ch/autorisation"
 *   />
 * </Label>
 */

/**
 * Exemple 4: Tooltip avec "Ne plus afficher"
 *
 * <HelpTooltip
 *   content="Cliquez sur une date pour créer une nouvelle leçon"
 *   storageKey="planning-calendar-help"
 *   showDontShowAgain
 * />
 */

/**
 * Exemple 5: Tooltip personnalisé
 *
 * <HelpTooltip
 *   content="Cette action est irréversible"
 *   placement="bottom"
 *   size="lg"
 *   maxWidth={400}
 *   className="ml-2"
 * />
 */
