/**
 * VIAMENTOR - Onboarding Step 3: Catégories & Véhicules
 * Configuration offre formation avec tarifs, durées et véhicules rapides
 */

import { useState } from "react";
import { Plus, Trash2, Car, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  type CategoriesVehiclesData,
  type CategoryConfig,
  type QuickVehicle,
} from "@/polymet/data/viamentor-onboarding-schemas";
import {
  type OnboardingLocale,
  ONBOARDING_I18N,
} from "@/polymet/data/viamentor-onboarding-i18n";

interface CategoriesVehiclesStepProps {
  data: Partial<CategoriesVehiclesData>;
  locale?: OnboardingLocale;
  onChange: (data: Partial<CategoriesVehiclesData>) => void;
}

// Catégories disponibles avec labels
const AVAILABLE_CATEGORIES = [
  { value: "B", label: "B - Voiture", defaultPrice: 90, defaultDuration: 45 },
  { value: "A", label: "A - Moto", defaultPrice: 100, defaultDuration: 45 },
  {
    value: "A1",
    label: "A1 - Moto légère",
    defaultPrice: 95,
    defaultDuration: 45,
  },
  {
    value: "BE",
    label: "BE - Voiture + remorque",
    defaultPrice: 110,
    defaultDuration: 90,
  },
  { value: "C", label: "C - Camion", defaultPrice: 150, defaultDuration: 90 },
  {
    value: "CE",
    label: "CE - Camion + remorque",
    defaultPrice: 170,
    defaultDuration: 90,
  },
  { value: "D", label: "D - Bus", defaultPrice: 160, defaultDuration: 90 },
] as const;

export function CategoriesVehiclesStep({
  data,
  locale = "fr",
  onChange,
}: CategoriesVehiclesStepProps) {
  const t = ONBOARDING_I18N[locale];
  const [showVehicleDialog, setShowVehicleDialog] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<QuickVehicle>>({
    transmission: "manual",
  });
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["B"]);

  // Initialize with B category by default
  const categories = data.categories || [
    {
      category: "B" as const,
      enabled: true,
      price: 90,
      duration: 45,
    },
  ];

  const quickVehicles = data.quickVehicles || [];

  /**
   * Toggle category enabled
   */
  const toggleCategory = (categoryValue: string) => {
    const exists = categories.find((c) => c.category === categoryValue);

    if (exists) {
      // Toggle enabled
      const updated = categories.map((c) =>
        c.category === categoryValue ? { ...c, enabled: !c.enabled } : c
      );
      onChange({ ...data, categories: updated });
    } else {
      // Add new category
      const categoryData = AVAILABLE_CATEGORIES.find(
        (c) => c.value === categoryValue
      );
      if (categoryData) {
        onChange({
          ...data,
          categories: [
            ...categories,
            {
              category: categoryValue as any,
              enabled: true,
              price: categoryData.defaultPrice,
              duration: categoryData.defaultDuration,
            },
          ],
        });
        setExpandedCategories([...expandedCategories, categoryValue]);
      }
    }
  };

  /**
   * Update category config
   */
  const updateCategoryConfig = (
    categoryValue: string,
    field: "price" | "duration",
    value: number
  ) => {
    const updated = categories.map((c) =>
      c.category === categoryValue ? { ...c, [field]: value } : c
    );
    onChange({ ...data, categories: updated });
  };

  /**
   * Toggle category expansion
   */
  const toggleExpanded = (categoryValue: string) => {
    if (expandedCategories.includes(categoryValue)) {
      setExpandedCategories(
        expandedCategories.filter((c) => c !== categoryValue)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryValue]);
    }
  };

  /**
   * Add quick vehicle
   */
  const addVehicle = () => {
    if (
      !newVehicle.licensePlate ||
      !newVehicle.category ||
      !newVehicle.transmission
    ) {
      return;
    }

    onChange({
      ...data,
      quickVehicles: [...quickVehicles, newVehicle as QuickVehicle],
    });

    setNewVehicle({ transmission: "manual" });
    setShowVehicleDialog(false);
  };

  /**
   * Remove vehicle
   */
  const removeVehicle = (index: number) => {
    onChange({
      ...data,
      quickVehicles: quickVehicles.filter((_, i) => i !== index),
    });
  };

  const enabledCount = categories.filter((c) => c.enabled).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{t.step3.title}</h2>
        <p className="text-muted-foreground mt-1">{t.step3.subtitle}</p>
      </div>

      {/* Categories Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">
            {t.step3.categories.label}
          </Label>
          <Badge variant="secondary">
            {enabledCount} {enabledCount > 1 ? "catégories" : "catégorie"}
          </Badge>
        </div>

        <div className="space-y-2">
          {AVAILABLE_CATEGORIES.map((cat) => {
            const categoryConfig = categories.find(
              (c) => c.category === cat.value
            );
            const isEnabled = categoryConfig?.enabled || false;
            const isExpanded = expandedCategories.includes(cat.value);
            const isB = cat.value === "B";

            return (
              <div
                key={cat.value}
                className={`border border-border rounded-lg ${
                  isEnabled ? "bg-accent/50" : "bg-background"
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 p-4">
                  <Checkbox
                    checked={isEnabled}
                    onCheckedChange={() => toggleCategory(cat.value)}
                    disabled={isB} // B is mandatory
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{cat.label}</span>
                      {isB && (
                        <Badge variant="outline" className="text-xs">
                          Obligatoire
                        </Badge>
                      )}
                    </div>
                  </div>
                  {isEnabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(cat.value)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Category Config (Expanded) */}
                {isEnabled && isExpanded && (
                  <div className="border-t border-border p-4 space-y-4 bg-background">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Price */}
                      <div className="space-y-2">
                        <Label htmlFor={`price-${cat.value}`}>
                          Tarif leçon (CHF)
                        </Label>
                        <Input
                          id={`price-${cat.value}`}
                          type="number"
                          min={50}
                          max={300}
                          value={categoryConfig?.price || cat.defaultPrice}
                          onChange={(e) =>
                            updateCategoryConfig(
                              cat.value,
                              "price",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />

                        <p className="text-xs text-muted-foreground">
                          Prix transparent pour vos élèves
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="space-y-2">
                        <Label htmlFor={`duration-${cat.value}`}>
                          Durée leçon (min)
                        </Label>
                        <Select
                          value={String(
                            categoryConfig?.duration || cat.defaultDuration
                          )}
                          onValueChange={(value) =>
                            updateCategoryConfig(
                              cat.value,
                              "duration",
                              parseInt(value)
                            )
                          }
                        >
                          <SelectTrigger id={`duration-${cat.value}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                            <SelectItem value="120">120 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Durée flexible selon vos besoins
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          {t.step3.categories.help}
        </p>
      </div>

      {/* Quick Vehicles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-semibold">
              Véhicules (optionnel)
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Ajoutez rapidement vos véhicules principaux
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVehicleDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter rapide
          </Button>
        </div>

        {/* Vehicles List */}
        {quickVehicles.length > 0 && (
          <div className="space-y-2">
            {quickVehicles.map((vehicle, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-border rounded-lg bg-accent/30"
              >
                <Car className="w-5 h-5 text-muted-foreground" />

                <div className="flex-1">
                  <div className="font-medium">{vehicle.licensePlate}</div>
                  <div className="text-sm text-muted-foreground">
                    Catégorie {vehicle.category} •{" "}
                    {vehicle.transmission === "manual"
                      ? "Manuelle"
                      : "Automatique"}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVehicle(index)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Progress Badge */}
        {quickVehicles.length > 0 && (
          <Badge variant="secondary" className="w-fit">
            {quickVehicles.length} véhicule{quickVehicles.length > 1 ? "s" : ""}{" "}
            configuré{quickVehicles.length > 1 ? "s" : ""}
          </Badge>
        )}

        {/* Add Later Checkbox */}
        <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/30">
          <Checkbox
            id="add-vehicles-later"
            checked={data.addVehiclesLater || false}
            onCheckedChange={(checked) =>
              onChange({ ...data, addVehiclesLater: checked as boolean })
            }
          />

          <div className="flex-1">
            <Label
              htmlFor="add-vehicles-later"
              className="font-medium cursor-pointer"
            >
              {t.step3.addLater.label}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {t.step3.addLater.description}
            </p>
          </div>
        </div>
      </div>

      {/* Add Vehicle Dialog */}
      <Dialog open={showVehicleDialog} onOpenChange={setShowVehicleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un véhicule</DialogTitle>
            <DialogDescription>
              Informations minimales pour configuration rapide
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* License Plate */}
            <div className="space-y-2">
              <Label htmlFor="license-plate">Plaque d'immatriculation</Label>
              <Input
                id="license-plate"
                placeholder="Ex: GE 123456"
                value={newVehicle.licensePlate || ""}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    licensePlate: e.target.value.toUpperCase(),
                  })
                }
              />

              <p className="text-xs text-muted-foreground">
                Format suisse : XX 123456
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="vehicle-category">Catégorie</Label>
              <Select
                value={newVehicle.category}
                onValueChange={(value) =>
                  setNewVehicle({ ...newVehicle, category: value as any })
                }
              >
                <SelectTrigger id="vehicle-category">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.enabled)
                    .map((c) => {
                      const catData = AVAILABLE_CATEGORIES.find(
                        (cat) => cat.value === c.category
                      );
                      return (
                        <SelectItem key={c.category} value={c.category}>
                          {catData?.label}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={newVehicle.transmission}
                onValueChange={(value) =>
                  setNewVehicle({ ...newVehicle, transmission: value as any })
                }
              >
                <SelectTrigger id="transmission">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manuelle</SelectItem>
                  <SelectItem value="automatic">Automatique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowVehicleDialog(false)}
            >
              Annuler
            </Button>
            <Button onClick={addVehicle}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
