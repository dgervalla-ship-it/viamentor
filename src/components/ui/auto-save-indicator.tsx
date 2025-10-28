import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
  className?: string;
}

export function AutoSaveIndicator({ 
  isSaving, 
  lastSaved,
  className 
}: AutoSaveIndicatorProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 10) return "à l'instant";
    if (diff < 60) return `il y a ${diff}s`;
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)}min`;
    return date.toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex items-center gap-2 text-xs text-muted-foreground",
      className
    )}>
      {isSaving ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
          <span className="text-blue-600">Sauvegarde...</span>
        </>
      ) : lastSaved ? (
        <>
          <Check className="h-3 w-3 text-green-500" />
          <span className="text-green-600">
            Sauvegardé {formatTime(lastSaved)}
          </span>
        </>
      ) : (
        <span className="text-muted-foreground">Pas encore sauvegardé</span>
      )}
    </div>
  );
}

// Hook personnalisé pour gérer l'auto-save
export function useAutoSave<T>(
  data: T,
  onSave: (data: T) => Promise<void>,
  delay: number = 2000
) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState<Date | undefined>();
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
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
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay]);

  return { isSaving, lastSaved };
}

