/**
 * VIAMENTOR - Prospects Filters
 * Filtres avancés collapse avec search, multi-select, date range, slider score
 */

"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
import { SearchIcon, ChevronDownIcon, XIcon } from "lucide-react";
import type {
  ProspectsFilters,
  ProspectSource,
  LicenseCategory,
  TeamMember,
} from "@/viamentor/data/viamentor-prospects-data";
import type { ProspectsLocale } from "@/viamentor/data/viamentor-prospects-i18n";
import { getProspectsTranslations } from "@/viamentor/data/viamentor-prospects-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ProspectsFiltersProps {
  teamMembers: TeamMember[];
  locale?: ProspectsLocale;
  onApply?: (filters: ProspectsFilters) => void;
  onReset?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ProspectsFiltersComponent({
  teamMembers,
  locale = "fr",
  onApply,
  onReset,
}: ProspectsFiltersProps) {
  const t = getProspectsTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filters, setFilters] = useState<ProspectsFilters>({
    search: "",
    sources: [],
    categories: [],
    assignedTo: null,
    dateRange: { from: null, to: null },
    leadScoreRange: [0, 100],
    notContactedOver24h: false,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setFilters((prev) => ({ ...prev, search: searchQuery }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const sources: ProspectSource[] = [
    "google",
    "facebook",
    "instagram",
    "tiktok",
    "referral",
    "direct",
    "other",
  ];

  const categories: LicenseCategory[] = [
    "B",
    "A",
    "BE",
    "A1",
    "BPT",
    "sensibilisation",
    "premiers_secours",
    "autre",
  ];

  const handleSourceToggle = (source: ProspectSource) => {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source],
    }));
  };

  const handleCategoryToggle = (category: LicenseCategory) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilters({
      search: "",
      sources: [],
      categories: [],
      assignedTo: null,
      dateRange: { from: null, to: null },
      leadScoreRange: [0, 100],
      notContactedOver24h: false,
    });
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(filters);
  };

  const activeFiltersCount =
    (filters.sources.length > 0 ? 1 : 0) +
    (filters.categories.length > 0 ? 1 : 0) +
    (filters.assignedTo !== null ? 1 : 0) +
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0) +
    (filters.leadScoreRange[0] !== 0 || filters.leadScoreRange[1] !== 100
      ? 1
      : 0) +
    (filters.notContactedOver24h ? 1 : 0);

  return (
    <Card className="p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder={t.filters.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />

        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchQuery("")}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Advanced Filters Collapsible */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              {t.filters.title}
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              {t.filters.reset}
            </Button>
          )}
        </div>

        <CollapsibleContent className="space-y-4 pt-4">
          {/* Sources */}
          <div className="space-y-2">
            <Label>{t.filters.sources}</Label>
            <div className="grid grid-cols-2 gap-2">
              {sources.map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox
                    id={`source-${source}`}
                    checked={filters.sources.includes(source)}
                    onCheckedChange={() => handleSourceToggle(source)}
                  />

                  <label
                    htmlFor={`source-${source}`}
                    className="text-sm cursor-pointer"
                  >
                    {t.sources[source]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>{t.filters.categories}</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />

                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned To */}
          <div className="space-y-2">
            <Label>{t.filters.assignedTo}</Label>
            <Select
              value={filters.assignedTo || "all"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  assignedTo: value === "all" ? null : value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="unassigned">
                  {t.filters.unassigned}
                </SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lead Score Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t.filters.leadScore}</Label>
              <span className="text-sm text-muted-foreground">
                {filters.leadScoreRange[0]} - {filters.leadScoreRange[1]}
              </span>
            </div>
            <Slider
              min={0}
              max={100}
              step={5}
              value={filters.leadScoreRange}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  leadScoreRange: value as [number, number],
                }))
              }
              className="py-4"
            />
          </div>

          {/* Not Contacted Over 24h */}
          <div className="flex items-center justify-between">
            <Label htmlFor="not-contacted" className="cursor-pointer">
              {t.filters.notContactedOver24h}
            </Label>
            <Switch
              id="not-contacted"
              checked={filters.notContactedOver24h}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({
                  ...prev,
                  notContactedOver24h: checked,
                }))
              }
            />
          </div>

          {/* Apply Button */}
          <Button onClick={handleApply} className="w-full">
            Appliquer les filtres
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
