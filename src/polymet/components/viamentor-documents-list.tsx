/**
 * VIAMENTOR - Documents List Component
 * Composant générique réutilisable pour afficher des listes de documents
 *
 * FEATURES:
 * - Design cohérent pour tous types de documents
 * - Support icônes par type de fichier
 * - Actions de téléchargement/visualisation
 * - Badges de statut
 * - Responsive et accessible
 * - Support groupement par catégorie
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  DownloadIcon,
  EyeIcon,
  FileIcon,
  ImageIcon,
  FileSpreadsheetIcon,
  ShapesIcon as LucideIcon,
  ArrowRightIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export interface Document {
  id: string;
  name: string;
  type: "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "JPG" | "PNG" | "OTHER";
  date: string;
  size: string;
  category?: string;
  status?: "valid" | "pending" | "expired" | "rejected";
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  };
  url?: string;
  onDownload?: () => void;
  onView?: () => void;
}

export interface DocumentsListProps {
  title: string;
  description?: string;
  documents: Document[];
  emptyMessage?: string;
  headerAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  footerAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
  compact?: boolean;
  showActions?: boolean;
  groupByCategory?: boolean;
}

// ============================================================================
// FILE TYPE ICONS
// ============================================================================

const FILE_TYPE_ICONS: Record<string, LucideIcon> = {
  PDF: FileTextIcon,
  DOC: FileTextIcon,
  DOCX: FileTextIcon,
  XLS: FileSpreadsheetIcon,
  XLSX: FileSpreadsheetIcon,
  JPG: ImageIcon,
  PNG: ImageIcon,
  OTHER: FileIcon,
};

const FILE_TYPE_COLORS: Record<string, string> = {
  PDF: "text-red-600 dark:text-red-500",
  DOC: "text-blue-600 dark:text-blue-500",
  DOCX: "text-blue-600 dark:text-blue-500",
  XLS: "text-green-600 dark:text-green-500",
  XLSX: "text-green-600 dark:text-green-500",
  JPG: "text-purple-600 dark:text-purple-500",
  PNG: "text-purple-600 dark:text-purple-500",
  OTHER: "text-muted-foreground",
};

// ============================================================================
// STATUS STYLES
// ============================================================================

const STATUS_STYLES = {
  valid: {
    badge: { label: "Valide", variant: "default" as const },
    border: "border-green-500/20",
  },
  pending: {
    badge: { label: "En attente", variant: "secondary" as const },
    border: "border-orange-500/20",
  },
  expired: {
    badge: { label: "Expiré", variant: "destructive" as const },
    border: "border-destructive/20",
  },
  rejected: {
    badge: { label: "Rejeté", variant: "destructive" as const },
    border: "border-destructive/20",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function DocumentsList({
  title,
  description,
  documents,
  emptyMessage = "Aucun document disponible",
  headerAction,
  footerAction,
  className = "",
  compact = false,
  showActions = true,
  groupByCategory = false,
}: DocumentsListProps) {
  // Group documents by category if needed
  const groupedDocuments = groupByCategory
    ? documents.reduce(
        (acc, doc) => {
          const category = doc.category || "Autres";
          if (!acc[category]) acc[category] = [];
          acc[category].push(doc);
          return acc;
        },
        {} as Record<string, Document[]>
      )
    : { all: documents };

  const handleDownload = (doc: Document) => {
    if (doc.onDownload) {
      doc.onDownload();
    } else if (doc.url) {
      window.open(doc.url, "_blank");
    }
  };

  const handleView = (doc: Document) => {
    if (doc.onView) {
      doc.onView();
    } else if (doc.url) {
      window.open(doc.url, "_blank");
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && (
            <Button variant="outline" size="sm" onClick={headerAction.onClick}>
              {headerAction.label}
              {headerAction.icon && (
                <headerAction.icon className="ml-2 h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedDocuments).map(
              ([category, categoryDocs]) => (
                <div key={category}>
                  {groupByCategory && category !== "all" && (
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                      {category}
                    </h4>
                  )}
                  <div className={compact ? "space-y-2" : "space-y-3"}>
                    {categoryDocs.map((doc) => {
                      const FileIcon =
                        FILE_TYPE_ICONS[doc.type] || FileTextIcon;
                      const iconColor =
                        FILE_TYPE_COLORS[doc.type] || FILE_TYPE_COLORS.OTHER;
                      const statusStyle = doc.status
                        ? STATUS_STYLES[doc.status]
                        : null;

                      return (
                        <div
                          key={doc.id}
                          className={`flex items-center justify-between rounded-lg border p-${
                            compact ? "2" : "3"
                          } hover:bg-accent transition-colors ${
                            statusStyle ? statusStyle.border : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <FileIcon
                              className={`h-${compact ? "6" : "8"} w-${
                                compact ? "6" : "8"
                              } flex-shrink-0 ${iconColor}`}
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p
                                  className={`${
                                    compact ? "text-sm" : "text-base"
                                  } font-medium truncate`}
                                >
                                  {doc.name}
                                </p>
                                {doc.badge && (
                                  <Badge
                                    variant={doc.badge.variant || "outline"}
                                    className="text-xs flex-shrink-0"
                                  >
                                    {doc.badge.label}
                                  </Badge>
                                )}
                                {statusStyle && !doc.badge && (
                                  <Badge
                                    variant={statusStyle.badge.variant}
                                    className="text-xs flex-shrink-0"
                                  >
                                    {statusStyle.badge.label}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {doc.date} • {doc.size}
                              </p>
                            </div>
                          </div>
                          {showActions && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleView(doc)}
                                title="Visualiser"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownload(doc)}
                                title="Télécharger"
                              >
                                <DownloadIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {footerAction && documents.length > 0 && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={footerAction.onClick}
          >
            {footerAction.label}
            {footerAction.icon && (
              <footerAction.icon className="ml-2 h-4 w-4" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default DocumentsList;
