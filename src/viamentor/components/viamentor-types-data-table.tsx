/**
 * VIAMENTOR - Types Data Table
 * DataTable types de cours avec hierarchy et actions
 */

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  GripVerticalIcon,
  MoreVerticalIcon,
  PencilIcon,
  CopyIcon,
  TrashIcon,
} from "lucide-react";
import {
  CourseType,
  CourseTypeLocale,
  courseTypesI18n,
} from "@/viamentor/data/viamentor-courses-types-data";

// ============================================================================
// TYPES
// ============================================================================

interface TypesDataTableProps {
  types: CourseType[];
  locale?: CourseTypeLocale;
  onEdit: (type: CourseType) => void;
  onDuplicate: (type: CourseType) => void;
  onDelete: (type: CourseType) => void;
  onToggleActive: (typeId: string, active: boolean) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TypesDataTable({
  types,
  locale = "fr",
  onEdit,
  onDuplicate,
  onDelete,
  onToggleActive,
}: TypesDataTableProps) {
  const t = courseTypesI18n[locale];
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState<CourseType | null>(null);

  // Format display helpers
  const getFormatDisplay = (type: CourseType): string => {
    const totalDuration = type.sessions.reduce((sum, s) => sum + s.duration, 0);
    const avgDuration = totalDuration / type.sessions.length;
    return t.formatDisplay
      .replace("{count}", type.sessions.length.toString())
      .replace("{duration}", avgDuration.toFixed(1));
  };

  const getUniqueDays = (type: CourseType): string[] => {
    const uniqueDays = new Set(type.sessions.map((s) => s.dayOfWeek));
    return Array.from(uniqueDays).map(
      (day) => t[day as keyof typeof t] as string
    );
  };

  const getScheduleDisplay = (type: CourseType): string => {
    const times = type.sessions.map((s) => s.startTime);
    const uniqueTimes = Array.from(new Set(times));
    if (uniqueTimes.length === 1) {
      return uniqueTimes[0];
    }
    return `${Math.min(...times.map((t) => t.split(":")[0] as any))}:00-${Math.max(...times.map((t) => t.split(":")[0] as any))}:00`;
  };

  const handleDeleteClick = (type: CourseType) => {
    setTypeToDelete(type);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (typeToDelete) {
      onDelete(typeToDelete);
      setDeleteDialogOpen(false);
      setTypeToDelete(null);
    }
  };

  if (types.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-lg">
        <p className="text-muted-foreground">Aucun type de cours défini</p>
      </div>
    );
  }

  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.format}</TableHead>
              <TableHead>{t.days}</TableHead>
              <TableHead>{t.schedule}</TableHead>
              <TableHead>{t.price}</TableHead>
              <TableHead>{t.sessions}</TableHead>
              <TableHead>{t.active}</TableHead>
              <TableHead className="w-12">{t.order}</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell>
                  <button className="cursor-grab hover:bg-muted p-1 rounded">
                    <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="font-semibold">{type.name}</div>
                    {type.description && (
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {type.description}
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm font-medium">
                    {getFormatDisplay(type)}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {getUniqueDays(type).map((day, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{getScheduleDisplay(type)}</span>
                </TableCell>

                <TableCell>
                  <span className="font-medium">
                    {type.price ? (
                      `${type.price} CHF`
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        Hérité
                      </span>
                    )}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {t.sessionsCount.replace(
                      "{count}",
                      type.sessions.length.toString()
                    )}
                  </span>
                </TableCell>

                <TableCell>
                  <Switch
                    checked={type.active}
                    onCheckedChange={(checked) =>
                      onToggleActive(type.id, checked)
                    }
                  />
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {type.order}
                  </span>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(type)}>
                        <PencilIcon className="h-4 w-4 mr-2" />

                        {t.editType}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(type)}>
                        <CopyIcon className="h-4 w-4 mr-2" />

                        {t.duplicateType}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(type)}
                        className="text-destructive"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />

                        {t.deleteType}
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.deleteType}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.deleteConfirm}
              <br />

              <span className="font-semibold">{typeToDelete?.name}</span>
              <br />

              <br />

              {t.deleteWarning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
