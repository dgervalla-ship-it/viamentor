/**
 * VIAMENTOR Instructors Table
 *
 * DataTable avec colonnes triables, checkboxes, pagination et actions
 */

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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  CalendarIcon,
  PauseIcon,
  TrashIcon,
  CarIcon,
  BikeIcon,
  StarIcon,
  ArrowUpDownIcon,
} from "lucide-react";
import {
  Instructor,
  getStatusColor,
  getOMCoStatusColor,
  getCategoryColor,
  getCategoryIcon,
} from "@/viamentor/data/viamentor-instructors-data";
import {
  InstructorsLocale,
  useInstructorsTranslations,
} from "@/viamentor/data/viamentor-instructors-i18n";

interface InstructorsTableProps {
  instructors: Instructor[];
  selectedIds: string[];
  locale?: InstructorsLocale;
  onSelectAll?: (selected: boolean) => void;
  onSelectOne?: (id: string, selected: boolean) => void;
  onSort?: (column: string) => void;
  onView?: (instructor: Instructor) => void;
  onEdit?: (instructor: Instructor) => void;
  onPlanning?: (instructor: Instructor) => void;
  onSuspend?: (instructor: Instructor) => void;
  onDelete?: (instructor: Instructor) => void;
}

export function InstructorsTable({
  instructors,
  selectedIds,
  locale = "fr",
  onSelectAll,
  onSelectOne,
  onSort,
  onView,
  onEdit,
  onPlanning,
  onSuspend,
  onDelete,
}: InstructorsTableProps) {
  const t = useInstructorsTranslations(locale);
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const allSelected =
    instructors.length > 0 && selectedIds.length === instructors.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < instructors.length;

  const handleSort = (column: string) => {
    setSortColumn(column);
    onSort?.(column);
  };

  const getCategoryIconComponent = (category: string) => {
    const iconType = getCategoryIcon(category as any);
    return iconType === "Bike" ? BikeIcon : CarIcon;
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  aria-label="Select all"
                  className={someSelected ? "opacity-50" : ""}
                />
              </TableHead>
              <TableHead className="w-20">{t.colPhoto}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("name")}
                  className="h-8 px-2"
                >
                  {t.colName}
                  <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>{t.colCategories}</TableHead>
              <TableHead className="text-center">{t.colLessonsToday}</TableHead>
              <TableHead>{t.colMonthStats}</TableHead>
              <TableHead>{t.colOMCoStatus}</TableHead>
              <TableHead className="w-12">{t.colActions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  {t.noInstructors}
                </TableCell>
              </TableRow>
            ) : (
              instructors.map((instructor) => {
                const isSelected = selectedIds.includes(instructor.id);
                const IconComponent = getCategoryIconComponent(
                  instructor.categories[0]
                );

                return (
                  <TableRow
                    key={instructor.id}
                    className={isSelected ? "bg-muted/50" : ""}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          onSelectOne?.(instructor.id, checked as boolean)
                        }
                        aria-label={`Select ${instructor.firstName} ${instructor.lastName}`}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          {instructor.avatar && (
                            <AvatarImage src={instructor.avatar} />
                          )}
                          <AvatarFallback>
                            {instructor.firstName[0]}
                            {instructor.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(instructor.status)}`}
                          title={instructor.status}
                        />
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <Link
                          to={`/instructors/${instructor.id}`}
                          className="font-semibold hover:underline text-left"
                        >
                          {instructor.firstName} {instructor.lastName}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {instructor.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 flex-wrap">
                        {instructor.categories.map((cat) => {
                          const Icon = getCategoryIconComponent(cat);
                          return (
                            <Badge
                              key={cat}
                              variant="outline"
                              style={{
                                borderColor: getCategoryColor(cat),
                                color: getCategoryColor(cat),
                              }}
                              className="gap-1"
                            >
                              <Icon className="h-3 w-3" />

                              {cat}
                            </Badge>
                          );
                        })}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge variant="secondary" className="gap-1">
                        <CalendarIcon className="h-3 w-3" />

                        {instructor.lessonsToday}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {t.lessonsCount}:
                          </span>
                          <span className="font-medium">
                            {instructor.monthStats.lessonsCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {t.totalHours}:
                          </span>
                          <span className="font-medium">
                            {instructor.monthStats.totalHours}h
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3 fill-yellow-500 text-yellow-500" />

                          <span className="font-medium">
                            {instructor.monthStats.rating}/5
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={getOMCoStatusColor(instructor.omcoStatus)}
                      >
                        {instructor.omcoStatus}
                      </Badge>
                      {instructor.trainingDue && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          Formation
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontalIcon className="h-4 w-4" />

                            <span className="sr-only">{t.colActions}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onView?.(instructor)}
                          >
                            <EyeIcon className="mr-2 h-4 w-4" />

                            {t.actionView}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEdit?.(instructor)}
                          >
                            <EditIcon className="mr-2 h-4 w-4" />

                            {t.actionEdit}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onPlanning?.(instructor)}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />

                            {t.actionPlanning}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onSuspend?.(instructor)}
                          >
                            <PauseIcon className="mr-2 h-4 w-4" />

                            {t.actionSuspend}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete?.(instructor)}
                            className="text-destructive"
                          >
                            <TrashIcon className="mr-2 h-4 w-4" />

                            {t.actionDelete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
