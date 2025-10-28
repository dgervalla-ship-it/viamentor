/**
 * VIAMENTOR Student Documents Tab
 *
 * Tab documents avec upload, preview, folders
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UploadIcon,
  DownloadIcon,
  EyeIcon,
  Edit2Icon,
  Trash2Icon,
  MoreVerticalIcon,
  FileTextIcon,
  MailIcon,
} from "lucide-react";
import type { StudentDocument } from "@/polymet/data/viamentor-student-detail-data";
import { formatFileSize } from "@/polymet/data/viamentor-student-detail-data";
import type { StudentDetailLocale } from "@/polymet/data/viamentor-student-detail-i18n";
import { useStudentDetailTranslations } from "@/polymet/data/viamentor-student-detail-i18n";

export interface StudentDocumentsTabProps {
  documents: StudentDocument[];
  locale?: StudentDetailLocale;
  onUpload?: (files: File[]) => void;
  onDownload?: (doc: StudentDocument) => void;
  onPreview?: (doc: StudentDocument) => void;
  onRename?: (doc: StudentDocument) => void;
  onDelete?: (doc: StudentDocument) => void;
  onRequestDocuments?: () => void;
}

export function StudentDocumentsTab({
  documents,
  locale = "fr",
  onUpload,
  onDownload,
  onPreview,
  onRename,
  onDelete,
  onRequestDocuments,
}: StudentDocumentsTabProps) {
  const t = useStudentDetailTranslations(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const folders = [
    t.folderPermit,
    t.folderCourses,
    t.folderAttestations,
    t.folderInvoices,
    t.folderPhotos,
    t.folderOther,
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (onUpload) {
      onUpload(files);
    }
  };

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (onUpload) {
        onUpload(files);
      }
    };
    input.click();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Permis":
        return "bg-blue-600";
      case "Attestation":
        return "bg-green-600";
      case "Facture":
        return "bg-purple-600";
      case "Photo":
        return "bg-pink-600";
      case "Cours":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.uploadZone}</CardTitle>
            <Button onClick={onRequestDocuments} variant="outline" size="sm">
              <MailIcon className="h-4 w-4 mr-2" />

              {t.requestDocuments}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

            <p className="text-lg font-medium mb-2">{t.dragDropFiles}</p>
            <p className="text-sm text-muted-foreground mb-4">
              ou cliquez pour sélectionner (max 10MB par fichier)
            </p>
            <Button onClick={handleFileSelect}>
              <UploadIcon className="h-4 w-4 mr-2" />
              Sélectionner fichiers
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder={`${t.search}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFolder === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFolder(null)}
              >
                Tous
              </Button>
              {folders.map((folder) => (
                <Button
                  key={folder}
                  variant={selectedFolder === folder ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFolder(folder)}
                >
                  {folder}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Documents ({filteredDocuments.length}/{documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.fileName}</TableHead>
                <TableHead>{t.fileType}</TableHead>
                <TableHead>{t.fileSize}</TableHead>
                <TableHead>{t.uploadDate}</TableHead>
                <TableHead>{t.uploadedBy}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatFileSize(doc.size)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(doc.uploadDate).toLocaleDateString(
                      locale === "en" ? "en-CH" : `${locale}-CH`
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {doc.uploadedBy.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onPreview?.(doc)}>
                          <EyeIcon className="h-4 w-4 mr-2" />

                          {t.preview}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDownload?.(doc)}>
                          <DownloadIcon className="h-4 w-4 mr-2" />

                          {t.download}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRename?.(doc)}>
                          <Edit2Icon className="h-4 w-4 mr-2" />

                          {t.rename}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(doc)}
                          className="text-destructive"
                        >
                          <Trash2Icon className="h-4 w-4 mr-2" />

                          {t.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
