/**
 * VIAMENTOR - Vehicle Documents Tab
 * File manager avec upload, preview, expiration alerts
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileTextIcon,
  UploadIcon,
  DownloadIcon,
  EyeIcon,
  TrashIcon,
  MoreVerticalIcon,
  AlertTriangleIcon,
  CalendarIcon,
  SearchIcon,
  FolderIcon,
  FileIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface VehicleDocument {
  id: string;
  name: string;
  type: "registration" | "insurance" | "inspection" | "invoice" | "other";
  category: string;
  uploadDate: string;
  expirationDate?: string;
  size: number;
  format: string;
  url: string;
  status: "valid" | "expiring_soon" | "expired";
}

interface VehicleDocumentsTabProps {
  vehicleId: string;
  documents: VehicleDocument[];
  locale?: VehicleDetailLocale;
  onUpload?: (file: File, type: string) => void;
  onDownload?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
  onPreview?: (documentId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function VehicleDocumentsTab({
  vehicleId,
  documents,
  locale = "fr",
  onUpload,
  onDownload,
  onDelete,
  onPreview,
}: VehicleDocumentsTabProps) {
  const t = getVehicleDetailI18n(locale).documents;

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [previewDoc, setPreviewDoc] = useState<VehicleDocument | null>(null);

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Group by category
  const documentsByCategory = filteredDocuments.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = [];
      }
      acc[doc.category].push(doc);
      return acc;
    },
    {} as Record<string, VehicleDocument[]>
  );

  // Stats
  const stats = {
    total: documents.length,
    valid: documents.filter((d) => d.status === "valid").length,
    expiringSoon: documents.filter((d) => d.status === "expiring_soon").length,
    expired: documents.filter((d) => d.status === "expired").length,
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(dateString)
    );
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: any; label: string }> = {
      valid: { variant: "default", label: t.statusValid },
      expiring_soon: { variant: "outline", label: t.statusExpiringSoon },
      expired: { variant: "destructive", label: t.statusExpired },
    };
    return config[status] || config.valid;
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file, selectedType);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalDocs}</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileTextIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.valid}</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.valid}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.expiringSoon}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.expiringSoon}
                </p>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.expired}</p>
                <p className="text-2xl font-bold text-destructive">
                  {stats.expired}
                </p>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expiration Alerts */}
      {(stats.expiringSoon > 0 || stats.expired > 0) && (
        <Card className="border-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />

              <div className="flex-1">
                <p className="font-semibold text-orange-600">
                  {t.expirationAlert}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stats.expired > 0 ? t.expiredMessage : t.expiringSoonMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Toolbar */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>{t.title}</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-[250px]"
                />
              </div>
              <label htmlFor="file-upload">
                <Button asChild>
                  <span className="cursor-pointer">
                    <UploadIcon className="h-4 w-4 mr-2" />

                    {t.upload}
                  </span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Documents by Category */}
          <div className="space-y-6">
            {Object.entries(documentsByCategory).map(([category, docs]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <FolderIcon className="h-5 w-5 text-muted-foreground" />

                  <h3 className="font-semibold">{category}</h3>
                  <Badge variant="secondary">{docs.length}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {docs.map((doc) => {
                    const statusConfig = getStatusBadge(doc.status);
                    return (
                      <Card
                        key={doc.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <FileIcon className="h-8 w-8 text-muted-foreground flex-shrink-0" />

                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {doc.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.format.toUpperCase()} •{" "}
                                  {formatFileSize(doc.size)}
                                </p>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="flex-shrink-0"
                                >
                                  <MoreVerticalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setPreviewDoc(doc);
                                    onPreview?.(doc.id);
                                  }}
                                >
                                  <EyeIcon className="h-4 w-4 mr-2" />

                                  {t.preview}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => onDownload?.(doc.id)}
                                >
                                  <DownloadIcon className="h-4 w-4 mr-2" />

                                  {t.download}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => onDelete?.(doc.id)}
                                  className="text-destructive"
                                >
                                  <TrashIcon className="h-4 w-4 mr-2" />

                                  {t.delete}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CalendarIcon className="h-3 w-3" />
                              {t.uploaded}: {formatDate(doc.uploadDate)}
                            </div>

                            {doc.expirationDate && (
                              <div className="flex items-center gap-2 text-xs">
                                <CalendarIcon className="h-3 w-3" />
                                {t.expires}: {formatDate(doc.expirationDate)}
                              </div>
                            )}

                            <Badge variant={statusConfig.variant}>
                              {statusConfig.label}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                <p className="text-muted-foreground">{t.noDocuments}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{previewDoc?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-[600px] bg-muted rounded-lg">
            <p className="text-muted-foreground">{t.previewNotAvailable}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
