/**
 * VIAMENTOR - Calendar Filters Component
 * Sidebar filtres calendrier avec multi-select catégories, moniteur, toggles et search
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw, Search } from "lucide-react";
import {
  type CalendarFilters,
  type CalendarLocale,
  type CalendarInstructor,
  calendarI18n,
} from "@/polymet/data/viamentor-courses-calendar-data";
import { mockCourseCategories } from "@/polymet/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CalendarFiltersProps {
  filters: CalendarFilters;
  instructors: CalendarInstructor[];
  locale?: CalendarLocale;
  onFiltersChange: (filters: CalendarFilters) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CalendarFiltersSidebar({
  filters,
  instructors,
  locale = "fr",
  onFiltersChange,
}: CalendarFiltersProps) {
  const t = calendarI18n[locale];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];

    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleInstructorChange = (instructorId: string) => {
    onFiltersChange({
      ...filters,
      instructorId: instructorId === "all" ? undefined : instructorId,
    });
  };

  const handleToggleChange = (
    key: "hideFullCourses" | "showPastCourses",
    value: boolean
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      searchKeyword: value,
    });
  };

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      instructorId: undefined,
      hideFullCourses: false,
      showPastCourses: false,
      searchKeyword: "",
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.instructorId ||
    filters.hideFullCourses ||
    filters.showPastCourses ||
    filters.searchKeyword;

  return (
    <Card className="p-4 space-y-6 sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.filters.title}</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 px-2 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />

            {t.filters.reset}
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label className="text-sm">{t.filters.search}</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder={t.filters.search}
            value={filters.searchKeyword}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.filters.categories}</Label>
        <div className="space-y-2">
          {mockCourseCategories.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />

              <label
                htmlFor={`category-${category.id}`}
                className="flex items-center gap-2 flex-1 cursor-pointer"
              >
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    backgroundColor: `${category.color}20`,
                    borderColor: category.color,
                    color: category.color,
                  }}
                >
                  {category.code}
                </Badge>
                <span className="text-sm">{category.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">{t.filters.instructor}</Label>
        <Select
          value={filters.instructorId || "all"}
          onValueChange={handleInstructorChange}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.allInstructors}</SelectItem>
            {instructors.map((instructor) => (
              <SelectItem key={instructor.id} value={instructor.id}>
                {instructor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Toggles */}
      <div className="space-y-4 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <Label htmlFor="hide-full" className="text-sm cursor-pointer">
            {t.filters.hideFull}
          </Label>
          <Switch
            id="hide-full"
            checked={filters.hideFullCourses}
            onCheckedChange={(checked) =>
              handleToggleChange("hideFullCourses", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-past" className="text-sm cursor-pointer">
            {t.filters.showPast}
          </Label>
          <Switch
            id="show-past"
            checked={filters.showPastCourses}
            onCheckedChange={(checked) =>
              handleToggleChange("showPastCourses", checked)
            }
          />
        </div>
      </div>

      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {filters.categories.length > 0 && (
              <div>
                {filters.categories.length}{" "}
                {filters.categories.length === 1 ? "catégorie" : "catégories"}
              </div>
            )}
            {filters.instructorId && <div>1 moniteur</div>}
            {filters.hideFullCourses && <div>Cours complets masqués</div>}
            {filters.showPastCourses && <div>Cours passés affichés</div>}
            {filters.searchKeyword && <div>Recherche active</div>}
          </div>
        </div>
      )}
    </Card>
  );
}
