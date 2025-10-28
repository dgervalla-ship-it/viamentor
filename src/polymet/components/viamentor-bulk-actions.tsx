/**
 * VIAMENTOR - BulkActions Component
 */

import { DownloadIcon, TrashIcon, MailIcon, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BulkAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "destructive" | "secondary";
  onClick: () => void;
}

interface BulkActionsProps {
  selectedIds: string[];
  actions: BulkAction[];
  onClear?: () => void;
  className?: string;
}

export function BulkActions({
  selectedIds,
  actions,
  onClear,
  className,
}: BulkActionsProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        "bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg",
        "flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-normal",
        className
      )}
    >
      <span className="font-medium">{selectedIds.length} sélectionné(s)</span>

      <div className="flex gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            size="sm"
            variant={action.variant || "secondary"}
            onClick={action.onClick}
            className="gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>

      {onClear && (
        <Button size="sm" variant="ghost" onClick={onClear}>
          Annuler
        </Button>
      )}
    </div>
  );
}

// Usage example
export const BULK_ACTIONS_EXAMPLE: BulkAction[] = [
  {
    id: "export",
    label: "Exporter",
    icon: <DownloadIcon className="h-4 w-4" />,

    onClick: () => console.log("Export"),
  },
  {
    id: "email",
    label: "Envoyer email",
    icon: <MailIcon className="h-4 w-4" />,

    onClick: () => console.log("Email"),
  },
  {
    id: "tag",
    label: "Ajouter tag",
    icon: <TagIcon className="h-4 w-4" />,

    onClick: () => console.log("Tag"),
  },
  {
    id: "delete",
    label: "Supprimer",
    icon: <TrashIcon className="h-4 w-4" />,

    variant: "destructive",
    onClick: () => console.log("Delete"),
  },
];
