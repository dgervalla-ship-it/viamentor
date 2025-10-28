/**
 * VIAMENTOR - Prospect Documents Tab
 * Tab Documents avec upload dropzone, liste fichiers et actions
 */

"use client";

import * as React from "react";
import {
  Upload,
  FileText,
  Download,
  Mail,
  Eye,
  Trash2,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type Prospect,
  type TeamMember,
  type ProspectDocument,
  mockDocuments,
} from "@/viamentor/data/viamentor-prospects-data";
import {
  type ProspectsLocale,
  getProspectsTranslations,
} from "@/viamentor/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectDocumentsTabProps {
  prospect: Prospect;
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectDocumentsTab({
  prospect,
  teamMembers,
  locale = "fr",
}: ProspectDocumentsTabProps) {
  const t = getProspectsTranslations(locale);
  const [selectedDocs, setSelectedDocs] = React.useState<string[]>([]);

  const documents = mockDocuments.filter((d) => d.prospectId === prospect.id);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;

    if (type.includes("image"))
      return <File className="h-5 w-5 text-blue-500" />;

    return <File className="h-5 w-5 text-gray-500" />;
  };

  const toggleDoc = (docId: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">{t.detail.documents.upload}</h4>
              <p className="text-sm text-muted-foreground">
                {t.detail.documents.dragDrop}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.detail.communications.maxSize}
              </p>
            </div>
            <Button>
              <Upload className="h-4 w-4 mr-2" />

              {t.detail.documents.upload}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedDocs.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedDocs.length} {t.bulk.selected}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />

                  {t.detail.documents.sendSelected}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />

                  {t.detail.documents.delete}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents List */}
      <div className="space-y-2">
        {documents.map((doc) => {
          const uploader = teamMembers.find((m) => m.id === doc.uploadedBy);

          return (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <Checkbox
                    checked={selectedDocs.includes(doc.id)}
                    onCheckedChange={() => toggleDoc(doc.id)}
                  />

                  {/* Icon */}
                  <div>{getFileIcon(doc.type)}</div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>
                        {new Date(doc.uploadDate).toLocaleDateString(locale)}
                      </span>
                      {uploader && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarFallback className="text-[10px]">
                                {uploader.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{uploader.name}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Visibility */}
                  <Select defaultValue={doc.visibility}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">
                        {t.detail.documents.visibilityOptions.internal}
                      </SelectItem>
                      <SelectItem value="shared">
                        {t.detail.documents.visibilityOptions.shared}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />

                        {t.detail.documents.download}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />

                        {t.detail.documents.sendByEmail}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />

                        {t.detail.documents.preview}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />

                        {t.detail.documents.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
