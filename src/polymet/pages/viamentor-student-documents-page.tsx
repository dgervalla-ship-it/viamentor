/**
 * VIAMENTOR - Student Documents Page
 * Page Mes Documents élève avec gestion documents administratifs
 *
 * @module pages/viamentor-student-documents-page
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  UploadIcon,
  DownloadIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentDocumentsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Document {
  id: string;
  name: string;
  type: string;
  category: "identity" | "medical" | "administrative" | "training";
  uploadDate: Date;
  status: "approved" | "pending" | "rejected" | "missing";
  size: string;
  expiryDate?: Date;
  notes?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Carte d'identité",
    type: "PDF",
    category: "identity",
    uploadDate: new Date("2024-09-15"),
    status: "approved",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Certificat médical",
    type: "PDF",
    category: "medical",
    uploadDate: new Date("2024-09-20"),
    status: "approved",
    size: "1.8 MB",
    expiryDate: new Date("2025-09-20"),
  },
  {
    id: "3",
    name: "Photo d'identité",
    type: "JPG",
    category: "identity",
    uploadDate: new Date("2024-09-15"),
    status: "pending",
    size: "450 KB",
    notes: "En cours de validation",
  },
  {
    id: "4",
    name: "Attestation cours sensibilisation",
    type: "PDF",
    category: "training",
    uploadDate: new Date(),
    status: "missing",
    size: "-",
  },
];

const translations = {
  fr: {
    title: "Mes Documents",
    description: "Gestion de mes documents administratifs",
    categories: {
      identity: "Identité",
      medical: "Médical",
      administrative: "Administratif",
      training: "Formation",
    },
    status: {
      approved: "Approuvé",
      pending: "En attente",
      rejected: "Refusé",
      missing: "Manquant",
    },
    fields: {
      name: "Nom",
      type: "Type",
      uploadDate: "Date d'upload",
      status: "Statut",
      size: "Taille",
      expiryDate: "Date d'expiration",
      notes: "Notes",
    },
    actions: {
      upload: "Téléverser",
      download: "Télécharger",
      view: "Voir",
      delete: "Supprimer",
      uploadNew: "Téléverser un document",
    },
    stats: {
      total: "Total documents",
      approved: "Approuvés",
      pending: "En attente",
      missing: "Manquants",
    },
    messages: {
      noDocuments: "Aucun document dans cette catégorie",
      uploadPrompt: "Téléversez vos documents requis",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentDocumentsPage({
  locale = "fr",
}: StudentDocumentsPageProps) {
  const t = translations[locale];
  const [selectedCategory, setSelectedCategory] = useState<
    Document["category"] | "all"
  >("all");

  const filteredDocuments =
    selectedCategory === "all"
      ? mockDocuments
      : mockDocuments.filter((doc) => doc.category === selectedCategory);

  const stats = {
    total: mockDocuments.length,
    approved: mockDocuments.filter((d) => d.status === "approved").length,
    pending: mockDocuments.filter((d) => d.status === "pending").length,
    missing: mockDocuments.filter((d) => d.status === "missing").length,
  };

  const getStatusBadge = (status: Document["status"]) => {
    const variants: Record<
      Document["status"],
      "default" | "secondary" | "destructive" | "outline"
    > = {
      approved: "secondary",
      pending: "default",
      rejected: "destructive",
      missing: "outline",
    };

    return (
      <Badge variant={variants[status]}>
        {t.status[status as keyof typeof t.status]}
      </Badge>
    );
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle2Icon className="h-5 w-5 text-green-600" />;

      case "pending":
        return <ClockIcon className="h-5 w-5 text-orange-600" />;

      case "rejected":
        return <AlertCircleIcon className="h-5 w-5 text-red-600" />;

      case "missing":
        return <AlertCircleIcon className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <Button>
          <UploadIcon className="h-4 w-4 mr-2" />

          {t.actions.uploadNew}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.stats.total}</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.total}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle2Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.stats.approved}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stats.approved}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.stats.pending}</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.pending}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.stats.missing}</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.missing}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          Tous
        </Button>
        {(Object.keys(t.categories) as Array<keyof typeof t.categories>).map(
          (cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat as Document["category"])}
            >
              {t.categories[cat]}
            </Button>
          )
        )}
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <FileTextIcon className="h-12 w-12 text-muted-foreground" />

              <div>
                <p className="font-semibold text-foreground">
                  {t.messages.noDocuments}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.messages.uploadPrompt}
                </p>
              </div>
              <Button>
                <UploadIcon className="h-4 w-4 mr-2" />

                {t.actions.uploadNew}
              </Button>
            </div>
          </Card>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getStatusIcon(doc.status)}
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {doc.name}
                        </h3>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t.categories[doc.category]} • {doc.type} • {doc.size}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {doc.status !== "missing" && (
                        <div>
                          <p className="text-muted-foreground">
                            {t.fields.uploadDate}
                          </p>
                          <p className="font-medium text-foreground">
                            {new Date(doc.uploadDate).toLocaleDateString(
                              locale
                            )}
                          </p>
                        </div>
                      )}
                      {doc.expiryDate && (
                        <div>
                          <p className="text-muted-foreground">
                            {t.fields.expiryDate}
                          </p>
                          <p className="font-medium text-foreground">
                            {new Date(doc.expiryDate).toLocaleDateString(
                              locale
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    {doc.notes && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-foreground">{doc.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {doc.status === "missing" ? (
                    <Button size="sm">
                      <UploadIcon className="h-4 w-4 mr-2" />

                      {t.actions.upload}
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-4 w-4 mr-2" />

                        {t.actions.view}
                      </Button>
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
