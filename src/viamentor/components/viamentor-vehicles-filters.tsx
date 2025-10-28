/**
 * VIAMENTOR - Vehicles Filters
 * Filtres avancés panel avec presets sauvegardés
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
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
import { ChevronDownIcon, FilterIcon, SaveIcon, XIcon } from "lucide-react";
import {
  VEHICLES_I18N,
  type VehiclesLocale,
} from "@/viamentor/data/viamentor-vehicles-i18n";
import type {
  VehicleCategory,
  VehicleStatus,
  ComplianceStatus,
} from "@/viamentor/data/viamentor-vehicles-data";

export interface FiltersState {
  categories: VehicleCategory[];
  brands: string[];
  status: VehicleStatus | "all";
  compliance: ComplianceStatus[];
  mileageRange: [number, number];
  insuranceExpired: boolean;
  expertiseExpired: boolean;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: FiltersState;
}

export interface VehiclesFiltersProps {
  brands: string[];
  presets?: FilterPreset[];
  locale?: VehiclesLocale;
  onApply?: (filters: FiltersState) => void;
  onReset?: () => void;
  onSavePreset?: (name: string, filters: FiltersState) => void;
  onLoadPreset?: (preset: FilterPreset) => void;
}

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  brands: [],
  status: "all",
  compliance: [],
  mileageRange: [0, 300000],
  insuranceExpired: false,
  expertiseExpired: false,
};

export function VehiclesFilters({
  brands,
  presets = [],
  locale = "fr",
  onApply,
  onReset,
  onSavePreset,
  onLoadPreset,
}: VehiclesFiltersProps) {
  const t = VEHICLES_I18N[locale].filters;
  const tStatus = VEHICLES_I18N[locale].status;
  const tCompliance = VEHICLES_I18N[locale].compliance;

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  const categories: VehicleCategory[] = ["B", "A", "BE", "A1", "BPT"];
  const complianceOptions: ComplianceStatus[] = [
    "compliant",
    "warning",
    "non_compliant",
  ];

  const handleCategoryToggle = (category: VehicleCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleComplianceToggle = (compliance: ComplianceStatus) => {
    setFilters((prev) => ({
      ...prev,
      compliance: prev.compliance.includes(compliance)
        ? prev.compliance.filter((c) => c !== compliance)
        : [...prev.compliance, compliance],
    }));
  };

  const handleApply = () => {
    onApply?.(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    onReset?.();
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.status !== "all" ? 1 : 0) +
    filters.compliance.length +
    (filters.insuranceExpired ? 1 : 0) +
    (filters.expertiseExpired ? 1 : 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="relative">
          <FilterIcon className="mr-2 h-4 w-4" />

          {t.title}
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDownIcon
            className={`ml-2 h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4">
        <div className="p-6 border border-border rounded-lg bg-card space-y-6">
          {/* Presets */}
          {presets.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Filtres sauvegardés</Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters(preset.filters);
                      onLoadPreset?.(preset);
                    }}
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
              <Label className="text-sm font-medium">{t.category}</Label>
              <div className="space-y-2">
                {categories.map((category) => (
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

            {/* Brands */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t.brand}</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />

                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t.statusLabel}</Label>
              <RadioGroup
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status: value as VehicleStatus | "all",
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="status-all" />

                  <Label
                    htmlFor="status-all"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {t.all}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="status-available" />

                  <Label
                    htmlFor="status-available"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tStatus.available}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in_lesson" id="status-in-lesson" />

                  <Label
                    htmlFor="status-in-lesson"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tStatus.in_lesson}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="status-maintenance" />

                  <Label
                    htmlFor="status-maintenance"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tStatus.maintenance}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="out_of_service" id="status-out" />

                  <Label
                    htmlFor="status-out"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tStatus.out_of_service}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Compliance */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">{t.complianceLabel}</Label>
            <div className="flex flex-wrap gap-4">
              {complianceOptions.map((compliance) => (
                <div key={compliance} className="flex items-center space-x-2">
                  <Checkbox
                    id={`compliance-${compliance}`}
                    checked={filters.compliance.includes(compliance)}
                    onCheckedChange={() => handleComplianceToggle(compliance)}
                  />

                  <Label
                    htmlFor={`compliance-${compliance}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tCompliance[compliance]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Mileage Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              {t.mileageRange}: {filters.mileageRange[0].toLocaleString()} -{" "}
              {filters.mileageRange[1].toLocaleString()} km
            </Label>
            <Slider
              min={0}
              max={300000}
              step={10000}
              value={filters.mileageRange}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  mileageRange: value as [number, number],
                }))
              }
              className="w-full"
            />
          </div>

          {/* Critical Filters */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="insurance-expired"
                checked={filters.insuranceExpired}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({ ...prev, insuranceExpired: checked }))
                }
              />

              <Label
                htmlFor="insurance-expired"
                className="text-sm cursor-pointer"
              >
                {t.insuranceExpired}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="expertise-expired"
                checked={filters.expertiseExpired}
                onCheckedChange={(checked) =>
                  setFilters((prev) => ({ ...prev, expertiseExpired: checked }))
                }
              />

              <Label
                htmlFor="expertise-expired"
                className="text-sm cursor-pointer"
              >
                {t.expertiseExpired}
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" onClick={handleReset}>
              <XIcon className="mr-2 h-4 w-4" />

              {t.reset}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const name = prompt("Nom du filtre:");
                  if (name) onSavePreset?.(name, filters);
                }}
              >
                <SaveIcon className="mr-2 h-4 w-4" />

                {t.savePreset}
              </Button>
              <Button onClick={handleApply}>{t.apply}</Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
