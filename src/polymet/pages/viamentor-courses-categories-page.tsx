/**
 * VIAMENTOR - Courses Categories Page
 * Page principale gestion catégories cours théoriques avec CRUD complet
 */

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { InfoIcon, PlusIcon } from "lucide-react";
import { CategoriesDataTable } from "@/polymet/components/viamentor-categories-data-table";
import { CategoryFormModal } from "@/polymet/components/viamentor-category-form-modal";
import type {
  CourseCategory,
  CourseCategoryFormData,
  CourseCategoryLocale,
} from "@/polymet/data/viamentor-courses-categories-data";
import {
  mockCourseCategories,
  coursesCategoriesI18n,
} from "@/polymet/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CoursesCategoriesPageProps {
  locale?: CourseCategoryLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CoursesCategoriesPage({
  locale = "fr",
}: CoursesCategoriesPageProps) {
  const t = coursesCategoriesI18n[locale];
  const { toast } = useToast();

  // State
  const [categories, setCategories] =
    useState<CourseCategory[]>(mockCourseCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(
    null
  );

  // Get existing codes for validation
  const existingCodes = categories.map((c) => c.code);

  // Handle create
  const handleCreate = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  // Handle edit
  const handleEdit = (category: CourseCategory) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = (data: CourseCategoryFormData) => {
    if (editingCategory) {
      // Update existing
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, ...data, updatedAt: new Date() }
            : c
        )
      );
      toast({
        title: t.toast.updated,
        variant: "default",
      });
    } else {
      // Create new
      const newCategory: CourseCategory = {
        id: `cat-${Date.now()}`,
        ...data,
        typesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCategories((prev) => [...prev, newCategory]);
      toast({
        title: t.toast.created,
        variant: "default",
      });
    }
  };

  // Handle duplicate
  const handleDuplicate = (category: CourseCategory) => {
    // Find next available code
    let newCode = category.code;
    let counter = 2;
    while (existingCodes.includes(newCode)) {
      newCode = `${category.code}${counter}`;
      counter++;
    }

    const duplicated: CourseCategory = {
      ...category,
      id: `cat-${Date.now()}`,
      code: newCode,
      name: `${category.name} (copie)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCategories((prev) => [...prev, duplicated]);
    toast({
      title: t.toast.duplicated,
      variant: "default",
    });
  };

  // Handle archive
  const handleArchive = (category: CourseCategory) => {
    // In real app, would set archived flag
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
    toast({
      title: t.toast.archived,
      variant: "default",
    });
  };

  // Handle delete
  const handleDelete = (category: CourseCategory) => {
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
    toast({
      title: t.toast.deleted,
      variant: "default",
    });
  };

  // Handle toggle active
  const handleToggleActive = (categoryId: string, active: boolean) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, active, updatedAt: new Date() } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/school/dashboard">{t.breadcrumb.school}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/theory-courses">{t.breadcrumb.theoryCourses}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.categories}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-primary text-primary-foreground"
        >
          <PlusIcon className="w-4 h-4 mr-2" />

          {t.actions.create}
        </Button>
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <InfoIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />

        <AlertDescription className="text-blue-800 dark:text-blue-200">
          {t.alert.info}
        </AlertDescription>
      </Alert>

      {/* DataTable */}
      <CategoriesDataTable
        categories={categories}
        locale={locale}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />

      {/* Form Modal */}
      <CategoryFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={editingCategory}
        existingCodes={existingCodes}
        locale={locale}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
