/**
 * VIAMENTOR Students Filters
 * Filtres avancés panel avec presets sauvegardés
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon, SaveIcon, FilterIcon } from "lucide-react";
import {
  StudentCategory,
  StudentStatus,
  Instructor,
  FilterPreset,
} from "@/viamentor/data/viamentor-students-data";
import {
  StudentsLocale,
  useStudentsTranslations,
} from "@/viamentor/data/viamentor-students-i18n";

interface FiltersState {
  categories: StudentCategory[];
  statuses: StudentStatus[];
  instructorId: string | null;
  progressionMin: number;
  progressionMax: number;
  negativeBalanceOnly: boolean;
  permitExpired: boolean;
  upcomingExams: boolean;
  enrollmentDateFrom: string;
  enrollmentDateTo: string;
  ageMin: string;
  ageMax: string;
  gender: string;
}

interface StudentsFiltersProps {
  instructors: Instructor[];
  presets: FilterPreset[];
  locale?: StudentsLocale;
  onApply?: (filters: FiltersState) => void;
  onReset?: () => void;
  onSavePreset?: (name: string, filters: FiltersState) => void;
  onLoadPreset?: (preset: FilterPreset) => void;
}

const INITIAL_FILTERS: FiltersState = {
  categories: [],
  statuses: [],
  instructorId: null,
  progressionMin: 0,
  progressionMax: 100,
  negativeBalanceOnly: false,
  permitExpired: false,
  upcomingExams: false,
  enrollmentDateFrom: "",
  enrollmentDateTo: "",
  ageMin: "",
  ageMax: "",
  gender: "all",
};

export function StudentsFilters({
  instructors,
  presets,
  locale = "fr",
  onApply,
  onReset,
  onSavePreset,
  onLoadPreset,
}: StudentsFiltersProps) {
  const t = useStudentsTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);

  const categories: StudentCategory[] = ["B", "A", "BE", "A1", "BPT"];
  const statuses: StudentStatus[] = [
    "Actif",
    "Inactif",
    "En pause",
    "Terminé",
    "Abandonné",
    "Suspendu",
  ];

  const handleCategoryToggle = (category: StudentCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleStatusToggle = (status: StudentStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  };

  const handleApply = () => {
    onApply?.(filters);
  };

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
    onReset?.();
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />

          {t.advancedFilters}
          <ChevronDownIcon
            className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/30">
          {/* Presets */}
          {presets.length > 0 && (
            <div className="space-y-2">
              <Label>{t.savedFilters}</Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onLoadPreset?.(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div className="space-y-3">
              <Label>{t.filterCategories}</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />

                    <label
                      htmlFor={`cat-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Statuses */}
            <div className="space-y-3">
              <Label>{t.filterStatuses}</Label>
              <div className="space-y-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={filters.statuses.includes(status)}
                      onCheckedChange={() => handleStatusToggle(status)}
                    />

                    <label
                      htmlFor={`status-${status}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="space-y-3">
              <Label>{t.filterInstructor}</Label>
              <Select
                value={filters.instructorId || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    instructorId: value === "all" ? null : value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allInstructors}</SelectItem>
                  <SelectItem value="unassigned">{t.unassigned}</SelectItem>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.firstName} {instructor.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Enrollment Date */}
            <div className="space-y-3">
              <Label>{t.filterEnrollmentDate}</Label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={filters.enrollmentDateFrom}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      enrollmentDateFrom: e.target.value,
                    }))
                  }
                />

                <Input
                  type="date"
                  value={filters.enrollmentDateTo}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      enrollmentDateTo: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Age Range */}
            <div className="space-y-3">
              <Label>{t.filterAgeRange}</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.ageMin}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ageMin: e.target.value,
                    }))
                  }
                />

                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.ageMax}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ageMax: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <Label>{t.filterGender}</Label>
              <Select
                value={filters.gender}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="Homme">{t.male}</SelectItem>
                  <SelectItem value="Femme">{t.female}</SelectItem>
                  <SelectItem value="Autre">{t.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="negative-balance" className="cursor-pointer">
                {t.filterNegativeBalance}
              </Label>
              <Switch
                id="negative-balance"
                checked={filters.negativeBalanceOnly}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({
                    ...prev,
                    negativeBalanceOnly: checked,
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="permit-expired" className="cursor-pointer">
                {t.filterPermitExpired}
              </Label>
              <Switch
                id="permit-expired"
                checked={filters.permitExpired}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({ ...prev, permitExpired: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="upcoming-exams" className="cursor-pointer">
                {t.filterUpcomingExams}
              </Label>
              <Switch
                id="upcoming-exams"
                checked={filters.upcomingExams}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({ ...prev, upcomingExams: checked }))
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button onClick={handleApply}>{t.applyFilters}</Button>
            <Button variant="outline" onClick={handleReset}>
              {t.resetFilters}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const name = prompt("Nom du filtre:");
                if (name) onSavePreset?.(name, filters);
              }}
            >
              <SaveIcon className="mr-2 h-4 w-4" />

              {t.saveFilter}
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
