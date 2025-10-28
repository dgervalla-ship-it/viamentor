/**
 * VIAMENTOR Instructors Filters
 *
 * Filtres basiques Collapse panel avec habilitations, disponibilité, statut OMCo
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  LicenseCategory,
  OMCoStatus,
  FiltersState,
} from "@/polymet/data/viamentor-instructors-data";
import {
  InstructorsLocale,
  useInstructorsTranslations,
} from "@/polymet/data/viamentor-instructors-i18n";

interface InstructorsFiltersProps {
  locale?: InstructorsLocale;
  onApply?: (filters: FiltersState) => void;
  onReset?: () => void;
}

const CATEGORIES: LicenseCategory[] = ["B", "A", "BE", "A1", "C", "D"];
const OMCO_STATUSES: OMCoStatus[] = ["Conforme", "Attention", "Non conforme"];

export function InstructorsFilters({
  locale = "fr",
  onApply,
  onReset,
}: InstructorsFiltersProps) {
  const t = useInstructorsTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    categories: [],
    availability: "all",
    omcoStatus: [],
    trainingDue: false,
  });

  const handleCategoryToggle = (category: LicenseCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleOMCoToggle = (status: OMCoStatus) => {
    setFilters((prev) => ({
      ...prev,
      omcoStatus: prev.omcoStatus.includes(status)
        ? prev.omcoStatus.filter((s) => s !== status)
        : [...prev.omcoStatus, status],
    }));
  };

  const handleApply = () => {
    onApply?.(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters: FiltersState = {
      search: "",
      categories: [],
      availability: "all",
      omcoStatus: [],
      trainingDue: false,
    };
    setFilters(resetFilters);
    onReset?.();
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          {t.filtersButton}
          {isOpen ? (
            <ChevronUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4">
        <div className="p-6 border border-border rounded-lg bg-card space-y-6">
          <h3 className="text-lg font-semibold">{t.filtersTitle}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Habilitations */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                {t.filterCategories}
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />

                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                {t.filterAvailability}
              </Label>
              <RadioGroup
                value={filters.availability}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    availability: value as any,
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="avail-all" />

                  <Label
                    htmlFor="avail-all"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t.filterAvailabilityAll}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="avail-available" />

                  <Label
                    htmlFor="avail-available"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t.filterAvailabilityAvailable}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in_lesson" id="avail-lesson" />

                  <Label
                    htmlFor="avail-lesson"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t.filterAvailabilityInLesson}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absent" id="avail-absent" />

                  <Label
                    htmlFor="avail-absent"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t.filterAvailabilityAbsent}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Statut OMCo */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                {t.filterOMCoStatus}
              </Label>
              <div className="space-y-2">
                {OMCO_STATUSES.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`omco-${status}`}
                      checked={filters.omcoStatus.includes(status)}
                      onCheckedChange={() => handleOMCoToggle(status)}
                    />

                    <Label
                      htmlFor={`omco-${status}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfectionnement dû */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                {t.filterTrainingDue}
              </Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="training-due"
                  checked={filters.trainingDue}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      trainingDue: checked as boolean,
                    }))
                  }
                />

                <Label
                  htmlFor="training-due"
                  className="text-sm font-normal cursor-pointer"
                >
                  {t.filterTrainingDue}
                </Label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button onClick={handleApply} className="flex-1">
              {t.applyFilters}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              {t.resetFilters}
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
