/**
 * VIAMENTOR - Courses Palette
 * Sidebar palette types cours draggables par catégorie
 */

"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";
import { DraggableTypeCard } from "@/viamentor/components/viamentor-draggable-type-card";
import { CourseType } from "@/viamentor/data/viamentor-courses-types-data";
import { CourseCategory } from "@/viamentor/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CoursesPaletteProps {
  categories: CourseCategory[];
  types: CourseType[];
  locale?: "fr" | "de" | "it" | "en";
  onDragStart?: (type: CourseType) => void;
  onDragEnd?: () => void;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Types disponibles",
    dragInfo: "Glissez un type sur une date du calendrier pour créer un cours",
    noTypes: "Aucun type disponible",
    activeTypes: "types actifs",
  },
  de: {
    title: "Verfügbare Typen",
    dragInfo:
      "Ziehen Sie einen Typ auf ein Kalenderdatum, um einen Kurs zu erstellen",
    noTypes: "Keine Typen verfügbar",
    activeTypes: "aktive Typen",
  },
  it: {
    title: "Tipi disponibili",
    dragInfo: "Trascina un tipo su una data del calendario per creare un corso",
    noTypes: "Nessun tipo disponibile",
    activeTypes: "tipi attivi",
  },
  en: {
    title: "Available types",
    dragInfo: "Drag a type onto a calendar date to create a course",
    noTypes: "No types available",
    activeTypes: "active types",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function CoursesPalette({
  categories,
  types,
  locale = "fr",
  onDragStart,
  onDragEnd,
}: CoursesPaletteProps) {
  const t = translations[locale];

  // Grouper types par catégorie
  const typesByCategory = React.useMemo(() => {
    const grouped: Record<string, CourseType[]> = {};

    categories.forEach((category) => {
      grouped[category.id] = types.filter(
        (type) => type.categoryId === category.id && type.isActive
      );
    });

    return grouped;
  }, [categories, types]);

  // Catégories avec types
  const categoriesWithTypes = categories.filter(
    (cat) => typesByCategory[cat.id]?.length > 0
  );

  return (
    <Card className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h4 className="text-sm font-semibold mb-1">{t.title}</h4>
        <p className="text-xs text-muted-foreground">
          {types.filter((t) => t.isActive).length} {t.activeTypes}
        </p>
      </div>

      {/* Info Alert */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription className="text-xs">{t.dragInfo}</AlertDescription>
      </Alert>

      {/* Categories Accordion */}
      {categoriesWithTypes.length > 0 ? (
        <Accordion
          type="multiple"
          defaultValue={categoriesWithTypes.map((c) => c.id)}
          className="space-y-2"
        >
          {categoriesWithTypes.map((category) => {
            const categoryTypes = typesByCategory[category.id] || [];

            return (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-3 py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Badge
                      style={{
                        backgroundColor: category.color,
                        color: "#fff",
                      }}
                      className="text-xs font-medium"
                    >
                      {category.code}
                    </Badge>
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto mr-2">
                      ({categoryTypes.length})
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-3 pb-3 pt-1">
                  <div className="space-y-2">
                    {categoryTypes.map((type) => (
                      <DraggableTypeCard
                        key={type.id}
                        type={type}
                        locale={locale}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          {t.noTypes}
        </div>
      )}
    </Card>
  );
}
