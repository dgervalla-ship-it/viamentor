/**
 * VIAMENTOR - Activity History Page
 * Page historique d'activité utilisateur
 *
 * Features:
 * - Timeline des actions utilisateur
 * - Filtres par type d'action
 * - Filtres par date
 * - Export historique
 * - Détails actions
 */

import { useState } from "react";
import {
  HistoryIcon,
  FilterIcon,
  DownloadIcon,
  ClockIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  CheckIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

// ============================================================================
// TYPES
// ============================================================================

interface ActivityItem {
  id: string;
  type: "create" | "update" | "delete" | "view" | "export" | "login";
  action: string;
  description: string;
  timestamp: Date;
  entity?: {
    type: string;
    name: string;
    href?: string;
  };
  metadata?: string;
}

interface ActivityHistoryPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "create",
    action: "Création élève",
    description: "Nouvel élève ajouté",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    entity: {
      type: "Élève",
      name: "Sophie Martin",
      href: "/students/1",
    },
  },
  {
    id: "2",
    type: "update",
    action: "Modification planning",
    description: "Leçon déplacée",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    entity: {
      type: "Leçon",
      name: "Leçon pratique #123",
      href: "/planning",
    },
    metadata: "15 mars 14:00 → 16 mars 10:00",
  },
  {
    id: "3",
    type: "view",
    action: "Consultation facture",
    description: "Facture consultée",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    entity: {
      type: "Facture",
      name: "Facture #2024-001",
      href: "/invoices",
    },
  },
  {
    id: "4",
    type: "export",
    action: "Export données",
    description: "Liste élèves exportée",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    metadata: "Format: Excel • 45 lignes",
  },
  {
    id: "5",
    type: "delete",
    action: "Suppression véhicule",
    description: "Véhicule retiré",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    entity: {
      type: "Véhicule",
      name: "VW Golf - GE-123456",
    },
  },
  {
    id: "6",
    type: "login",
    action: "Connexion",
    description: "Connexion réussie",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    metadata: "IP: 192.168.1.1 • Chrome",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ActivityHistoryPage({
  locale = "fr",
}: ActivityHistoryPageProps) {
  const [activities] = useState<ActivityItem[]>(MOCK_ACTIVITIES);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">(
    "excel"
  );
  const [exportOptions, setExportOptions] = useState({
    includeMetadata: true,
    includeTimestamps: true,
    includeEntityLinks: true,
  });
  const [isExporting, setIsExporting] = useState(false);

  const getTypeIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "create":
        return "➕";
      case "update":
        return "✏️";
      case "delete":
        return "🗑️";
      case "view":
        return "👁️";
      case "export":
        return "📥";
      case "login":
        return "🔐";
      default:
        return "📋";
    }
  };

  const getTypeBadge = (type: ActivityItem["type"]) => {
    const config = {
      create: { label: "Création", variant: "default" as const },
      update: { label: "Modification", variant: "secondary" as const },
      delete: { label: "Suppression", variant: "destructive" as const },
      view: { label: "Consultation", variant: "outline" as const },
      export: { label: "Export", variant: "secondary" as const },
      login: { label: "Connexion", variant: "outline" as const },
    };
    return config[type];
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "À l'instant";
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  const filteredActivities =
    selectedType === "all"
      ? activities
      : activities.filter((a) => a.type === selectedType);

  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate export data
    const exportData = filteredActivities.map((activity) => ({
      Type: getTypeBadge(activity.type).label,
      Action: activity.action,
      Description: activity.description,
      ...(exportOptions.includeEntityLinks && activity.entity
        ? {
            Entité: `${activity.entity.type}: ${activity.entity.name}`,
          }
        : {}),
      ...(exportOptions.includeMetadata && activity.metadata
        ? {
            Détails: activity.metadata,
          }
        : {}),
      ...(exportOptions.includeTimestamps
        ? {
            Date: activity.timestamp.toLocaleString("fr-FR"),
            "Il y a": getTimeAgo(activity.timestamp),
          }
        : {}),
    }));

    // Create download based on format
    let content = "";
    let filename = "";
    let mimeType = "";

    if (exportFormat === "csv") {
      // CSV format
      const headers = Object.keys(exportData[0] || {});
      const csvRows = [
        headers.join(","),
        ...exportData.map((row) =>
          headers.map((header) => `"${row[header] || ""}"`).join(",")
        ),
      ];

      content = csvRows.join("\n");
      filename = `historique-activite-${new Date().toISOString().split("T")[0]}.csv`;
      mimeType = "text/csv";
    } else if (exportFormat === "excel") {
      // Excel format (simplified as CSV with .xlsx extension)
      const headers = Object.keys(exportData[0] || {});
      const csvRows = [
        headers.join("\t"),
        ...exportData.map((row) =>
          headers.map((header) => row[header] || "").join("\t")
        ),
      ];

      content = csvRows.join("\n");
      filename = `historique-activite-${new Date().toISOString().split("T")[0]}.xlsx`;
      mimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else {
      // PDF format (simplified as text)
      content = `HISTORIQUE D'ACTIVITÉ\n\nDate d'export: ${new Date().toLocaleString("fr-FR")}\n\nNombre d'activités: ${filteredActivities.length}\n\n${"-".repeat(80)}\n\n`;
      exportData.forEach((row, index) => {
        content += `${index + 1}. ${Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(" | ")}\n\n`;
      });
      filename = `historique-activite-${new Date().toISOString().split("T")[0]}.pdf`;
      mimeType = "application/pdf";
    }

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setIsExporting(false);
    setExportDialogOpen(false);

    // Show success message (you can replace with toast notification)
    alert(`Export réussi! Fichier téléchargé: ${filename}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Historique d'Activité</h1>
          <p className="text-muted-foreground">
            Toutes vos actions dans ViaMenutor
          </p>
        </div>
        <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="create">Créations</TabsTrigger>
            <TabsTrigger value="update">Modifications</TabsTrigger>
            <TabsTrigger value="delete">Suppressions</TabsTrigger>
            <TabsTrigger value="view">Consultations</TabsTrigger>
            <TabsTrigger value="export">Exports</TabsTrigger>
            <TabsTrigger value="login">Connexions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activities.length}</div>
            <div className="text-sm text-muted-foreground">Actions totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {activities.filter((a) => a.type === "create").length}
            </div>
            <div className="text-sm text-muted-foreground">Créations</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {activities.filter((a) => a.type === "update").length}
            </div>
            <div className="text-sm text-muted-foreground">Modifications</div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      {filteredActivities.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            {filteredActivities.length} activité
            {filteredActivities.length > 1 ? "s" : ""}
          </div>
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {/* Timeline Line */}
              {index < filteredActivities.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
              )}

              <Card className="hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0">
                      {getTypeIcon(activity.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{activity.action}</h3>
                        <Badge
                          variant={getTypeBadge(activity.type).variant}
                          className="shrink-0"
                        >
                          {getTypeBadge(activity.type).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.description}
                      </p>

                      {/* Entity Link */}
                      {activity.entity && (
                        <div className="mb-2">
                          {activity.entity.href ? (
                            <Link
                              to={activity.entity.href}
                              className="text-sm text-primary hover:underline"
                            >
                              {activity.entity.type}: {activity.entity.name}
                            </Link>
                          ) : (
                            <span className="text-sm">
                              {activity.entity.type}: {activity.entity.name}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Metadata */}
                      {activity.metadata && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {activity.metadata}
                        </p>
                      )}

                      {/* Timestamp */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="h-3 w-3" />

                        <span>{getTimeAgo(activity.timestamp)}</span>
                        <span>•</span>
                        <span>
                          {activity.timestamp.toLocaleString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <HistoryIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

            <h3 className="text-lg font-semibold mb-2">Aucune activité</h3>
            <p className="text-muted-foreground">
              Aucune activité trouvée pour ce filtre
            </p>
          </CardContent>
        </Card>
      )}

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Exporter l'historique</DialogTitle>
            <DialogDescription>
              Exportez vos activités dans le format de votre choix
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Format Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Format d'export</Label>
              <RadioGroup
                value={exportFormat}
                onValueChange={(value: any) => setExportFormat(value)}
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value="excel" id="excel" />

                  <Label
                    htmlFor="excel"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <FileSpreadsheetIcon className="h-5 w-5 text-green-600" />

                    <div>
                      <div className="font-medium">Excel (XLSX)</div>
                      <div className="text-xs text-muted-foreground">
                        Recommandé pour l'analyse de données
                      </div>
                    </div>
                  </Label>
                  {exportFormat === "excel" && (
                    <CheckIcon className="h-4 w-4 text-primary" />
                  )}
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value="csv" id="csv" />

                  <Label
                    htmlFor="csv"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <FileTextIcon className="h-5 w-5 text-blue-600" />

                    <div>
                      <div className="font-medium">CSV</div>
                      <div className="text-xs text-muted-foreground">
                        Compatible avec tous les tableurs
                      </div>
                    </div>
                  </Label>
                  {exportFormat === "csv" && (
                    <CheckIcon className="h-4 w-4 text-primary" />
                  )}
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value="pdf" id="pdf" />

                  <Label
                    htmlFor="pdf"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <FileTextIcon className="h-5 w-5 text-red-600" />

                    <div>
                      <div className="font-medium">PDF</div>
                      <div className="text-xs text-muted-foreground">
                        Pour archivage et impression
                      </div>
                    </div>
                  </Label>
                  {exportFormat === "pdf" && (
                    <CheckIcon className="h-4 w-4 text-primary" />
                  )}
                </div>
              </RadioGroup>
            </div>

            {/* Export Options */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Options d'export
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="metadata"
                    checked={exportOptions.includeMetadata}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeMetadata: checked as boolean,
                      }))
                    }
                  />

                  <Label htmlFor="metadata" className="text-sm cursor-pointer">
                    Inclure les métadonnées (détails supplémentaires)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="timestamps"
                    checked={exportOptions.includeTimestamps}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeTimestamps: checked as boolean,
                      }))
                    }
                  />

                  <Label
                    htmlFor="timestamps"
                    className="text-sm cursor-pointer"
                  >
                    Inclure les horodatages complets
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="entityLinks"
                    checked={exportOptions.includeEntityLinks}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({
                        ...prev,
                        includeEntityLinks: checked as boolean,
                      }))
                    }
                  />

                  <Label
                    htmlFor="entityLinks"
                    className="text-sm cursor-pointer"
                  >
                    Inclure les références aux entités
                  </Label>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm">
                <div className="font-medium mb-1">Résumé de l'export</div>
                <div className="text-muted-foreground space-y-1">
                  <div>
                    • {filteredActivities.length} activité
                    {filteredActivities.length > 1 ? "s" : ""} à exporter
                  </div>
                  <div>• Format: {exportFormat.toUpperCase()}</div>
                  <div>
                    • Filtre actif:{" "}
                    {selectedType === "all"
                      ? "Toutes les activités"
                      : getTypeBadge(selectedType as any).label}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExportDialogOpen(false)}
              disabled={isExporting}
            >
              Annuler
            </Button>
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Export en cours...
                </>
              ) : (
                <>
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Exporter
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
