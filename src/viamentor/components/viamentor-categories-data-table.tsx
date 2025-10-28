/**
 * VIAMENTOR - Categories DataTable
 * DataTable catégories avec actions CRUD, drag & drop et filtres
 */

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  MoreVerticalIcon,
  PencilIcon,
  EyeIcon,
  CopyIcon,
  ArchiveIcon,
  TrashIcon,
  GripVerticalIcon,
  BookOpenIcon,
} from "lucide-react";
import type {
  CourseCategory,
  CourseCategoryLocale,
} from "@/viamentor/data/viamentor-courses-categories-data";
import { coursesCategoriesI18n } from "@/viamentor/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CategoriesDataTableProps {
  categories: CourseCategory[];
  locale?: CourseCategoryLocale;
  onEdit: (category: CourseCategory) => void;
  onDuplicate: (category: CourseCategory) => void;
  onArchive: (category: CourseCategory) => void;
  onDelete: (category: CourseCategory) => void;
  onToggleActive: (categoryId: string, active: boolean) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CategoriesDataTable({
  categories,
  locale = "fr",
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  onToggleActive,
}: CategoriesDataTableProps) {
  const t = coursesCategoriesI18n[locale];

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    category: CourseCategory | null;
  }>({ open: false, category: null });

  const [archiveDialog, setArchiveDialog] = useState<{
    open: boolean;
    category: CourseCategory | null;
  }>({ open: false, category: null });

  // Handle delete confirm
  const handleDeleteConfirm = () => {
    if (deleteDialog.category) {
      onDelete(deleteDialog.category);
      setDeleteDialog({ open: false, category: null });
    }
  };

  // Handle archive confirm
  const handleArchiveConfirm = () => {
    if (archiveDialog.category) {
      onArchive(archiveDialog.category);
      setArchiveDialog({ open: false, category: null });
    }
  };

  // Empty state
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-border rounded-lg bg-muted/50">
        <BookOpenIcon className="w-16 h-16 text-muted-foreground mb-4" />

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t.empty.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {t.empty.description}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="font-semibold text-foreground">
                {t.table.name}
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                {t.table.code}
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                {t.table.color}
              </TableHead>
              <TableHead className="font-semibold text-foreground text-right">
                {t.table.duration}
              </TableHead>
              <TableHead className="font-semibold text-foreground text-right">
                {t.table.price}
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                {t.table.types}
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                {t.table.active}
              </TableHead>
              <TableHead className="font-semibold text-foreground text-center">
                {t.table.order}
              </TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} className="hover:bg-muted/50">
                {/* Drag Handle */}
                <TableCell>
                  <GripVerticalIcon className="w-5 h-5 text-muted-foreground cursor-move" />
                </TableCell>

                {/* Name */}
                <TableCell>
                  <button
                    onClick={() => onEdit(category)}
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </button>
                </TableCell>

                {/* Code */}
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {category.code}
                  </Badge>
                </TableCell>

                {/* Color */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: category.color }}
                    />

                    <span className="text-sm text-muted-foreground font-mono">
                      {category.color}
                    </span>
                  </div>
                </TableCell>

                {/* Duration */}
                <TableCell className="text-right">
                  <span className="text-sm text-foreground">
                    {category.totalDuration}
                    {t.table.hours}
                  </span>
                </TableCell>

                {/* Price */}
                <TableCell className="text-right">
                  <span className="text-sm text-foreground">
                    {category.defaultPrice} {t.table.chf}
                  </span>
                </TableCell>

                {/* Types Count */}
                <TableCell className="text-center">
                  <Link
                    to={`/school/courses/categories/${category.id}/types`}
                    className="text-sm text-primary hover:underline"
                  >
                    {t.table.typesCount.replace(
                      "{count}",
                      category.typesCount.toString()
                    )}
                  </Link>
                </TableCell>

                {/* Active Toggle */}
                <TableCell className="text-center">
                  <Switch
                    checked={category.active}
                    onCheckedChange={(checked) =>
                      onToggleActive(category.id, checked)
                    }
                  />
                </TableCell>

                {/* Order */}
                <TableCell className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {category.order}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onEdit(category)}>
                        <PencilIcon className="w-4 h-4 mr-2" />

                        {t.actions.edit}
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/school/courses/categories/${category.id}/types`}
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />

                          {t.actions.viewTypes}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(category)}>
                        <CopyIcon className="w-4 h-4 mr-2" />

                        {t.actions.duplicate}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() =>
                          setArchiveDialog({ open: true, category })
                        }
                      >
                        <ArchiveIcon className="w-4 h-4 mr-2" />

                        {t.actions.archive}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setDeleteDialog({ open: true, category })
                        }
                        className="text-destructive focus:text-destructive"
                      >
                        <TrashIcon className="w-4 h-4 mr-2" />

                        {t.actions.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !open && setDeleteDialog({ open: false, category: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirm.delete.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.confirm.delete.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.confirm.delete.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.confirm.delete.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Confirmation Dialog */}
      <AlertDialog
        open={archiveDialog.open}
        onOpenChange={(open) =>
          !open && setArchiveDialog({ open: false, category: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.confirm.archive.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.confirm.archive.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.confirm.archive.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchiveConfirm}>
              {t.confirm.archive.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
