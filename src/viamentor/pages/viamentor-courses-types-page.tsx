/**
 * VIAMENTOR - Course Types Page
 * Page principale gestion types de cours théoriques
 */

"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRightIcon, PlusIcon, InfoIcon } from "lucide-react";
import { TypesDataTable } from "@/viamentor/components/viamentor-types-data-table";
import { TypeFormModal } from "@/viamentor/components/viamentor-type-form-modal";
import {
  CourseType,
  CourseTypeFormData,
  CourseTypeLocale,
  courseTypesI18n,
  mockCourseTypes,
} from "@/viamentor/data/viamentor-courses-types-data";
import { mockCourseCategories } from "@/viamentor/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CoursesTypesPageProps {
  locale?: CourseTypeLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CoursesTypesPage({ locale = "fr" }: CoursesTypesPageProps) {
  const t = courseTypesI18n[locale];
  const { categoryId } = useParams<{ categoryId: string }>();
  const { toast } = useToast();

  // Find category
  const category = mockCourseCategories.find((c) => c.id === categoryId);

  // State
  const [types, setTypes] = useState<CourseType[]>(
    mockCourseTypes.filter((t) => t.categoryId === categoryId)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<CourseType | null>(null);

  if (!category) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>Catégorie non trouvée</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Handlers
  const handleCreate = () => {
    setSelectedType(null);
    setModalOpen(true);
  };

  const handleEdit = (type: CourseType) => {
    setSelectedType(type);
    setModalOpen(true);
  };

  const handleDuplicate = (type: CourseType) => {
    const newType: CourseType = {
      ...type,
      id: `type-${Date.now()}`,
      name: `${type.name} (Copie)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTypes((prev) => [...prev, newType]);
    toast({
      title: "✓ Type dupliqué",
      description: t.duplicateSuccess,
    });
  };

  const handleDelete = (type: CourseType) => {
    setTypes((prev) => prev.filter((t) => t.id !== type.id));
    toast({
      title: "✓ Type supprimé",
      description: t.deleteSuccess,
    });
  };

  const handleToggleActive = (typeId: string, active: boolean) => {
    setTypes((prev) =>
      prev.map((t) => (t.id === typeId ? { ...t, active } : t))
    );
  };

  const handleSubmit = (data: CourseTypeFormData) => {
    if (selectedType) {
      // Update existing
      setTypes((prev) =>
        prev.map((t) =>
          t.id === selectedType.id
            ? {
                ...t,
                ...data,
                sessions: data.sessions.map((s, i) => ({
                  ...s,
                  id: `session-${Date.now()}-${i}`,
                })),
                updatedAt: new Date(),
              }
            : t
        )
      );
      toast({
        title: "✓ Type modifié",
        description: t.saveSuccess,
      });
    } else {
      // Create new
      const newType: CourseType = {
        id: `type-${Date.now()}`,
        categoryId: categoryId!,
        ...data,
        sessions: data.sessions.map((s, i) => ({
          ...s,
          id: `session-${Date.now()}-${i}`,
        })),
        order: types.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTypes((prev) => [...prev, newType]);
      toast({
        title: "✓ Type créé",
        description: t.saveSuccess,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>École</span>
            <ChevronRightIcon className="h-4 w-4" />

            <span>Cours théoriques</span>
            <ChevronRightIcon className="h-4 w-4" />

            <span>Catégories</span>
            <ChevronRightIcon className="h-4 w-4" />

            <span className="text-foreground font-medium">{t.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Badge
              className="text-sm px-3 py-1"
              style={{
                backgroundColor: category.color,
                color: "#000",
              }}
            >
              {category.code}
            </Badge>
            <h1 className="text-3xl font-bold">{category.name}</h1>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-muted-foreground">{t.title}</h3>
            <Button onClick={handleCreate}>
              <PlusIcon className="h-4 w-4 mr-2" />

              {t.newType}
            </Button>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />

          <AlertDescription>{t.subtitle}</AlertDescription>
        </Alert>

        {/* Types Table */}
        <TypesDataTable
          types={types}
          locale={locale}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />

        {/* Form Modal */}
        <TypeFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          type={selectedType}
          categoryName={category.name}
          categoryPrice={category.defaultPrice}
          locale={locale}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
