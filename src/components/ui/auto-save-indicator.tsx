import * as React from "react";
import { cn } from "../../lib/utils";
import { Check, Loader2 } from "lucide-react";

export interface AutoSaveIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  isSaving: boolean;
  lastSaved?: Date;
}

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 10) return "à l'instant";
  if (diff < 60) return `il y a ${diff}s`;
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)}min`;
  return date.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' });
};

const AutoSaveIndicator = React.memo(React.forwardRef<HTMLDivElement, AutoSaveIndicatorProps>(
  ({ isSaving, lastSaved, className, ...props }, ref) => {
    // Mémoïser le texte formaté pour éviter recalcul à chaque render
    const formattedTime = React.useMemo(() => 
      lastSaved ? formatTime(lastSaved) : null,
      [lastSaved]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground",
          className
        )}
        {...props}
      >
        {isSaving ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
            <span className="text-blue-600">Sauvegarde...</span>
          </>
        ) : formattedTime ? (
          <>
            <Check className="h-3 w-3 text-green-500" />
            <span className="text-green-600">
              Sauvegardé {formattedTime}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Pas encore sauvegardé</span>
        )}
      </div>
    );
  }
));
AutoSaveIndicator.displayName = "AutoSaveIndicator";

export { AutoSaveIndicator };

// Hook personnalisé pour gérer l'auto-save (optimisé)
export function useAutoSave<T>(
  data: T,
  onSave: (data: T) => Promise<void>,
  delay: number = 2000
) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState<Date | undefined>();
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  // Mémoïser la fonction de sauvegarde pour éviter re-créations
  const handleSave = React.useCallback(async () => {
    if (data) {
      setIsSaving(true);
      try {
        await onSave(data);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    }
  }, [data, onSave]);

  React.useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(handleSave, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleSave, delay]);

  return { isSaving, lastSaved };
}

