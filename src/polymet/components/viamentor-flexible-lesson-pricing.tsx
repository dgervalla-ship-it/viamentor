/**
 * VIAMENTOR - Flexible Lesson Pricing
 * Configuration flexible des durées et prix de leçons
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusIcon,
  TrashIcon,
  InfoIcon,
  ClockIcon,
  DollarSignIcon,
} from "lucide-react";
import {
  getCategoryIcon,
  type LicenseCategory,
} from "@/polymet/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  type PricingLocale,
} from "@/polymet/data/viamentor-pricing-i18n";

// ============================================================================
// TYPES
// ============================================================================

export interface LessonDuration {
  id: string;
  minutes: number;
  isDefault: boolean;
}

export interface FlexibleLessonPrice {
  id: string;
  category: LicenseCategory;
  durations: {
    durationId: string;
    minutes: number;
    price: number;
    doublePrice: number;
    autoCalculateDouble: boolean;
  }[];
  visibleForBooking: boolean;
  updatedAt: string;
}

// ============================================================================
// PROPS
// ============================================================================

export interface FlexibleLessonPricingProps {
  locale?: PricingLocale;
  onSave?: (data: {
    durations: LessonDuration[];
    prices: FlexibleLessonPrice[];
  }) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FlexibleLessonPricing({
  locale = "fr",
  onSave,
}: FlexibleLessonPricingProps) {
  const t = getPricingTranslation(locale);

  // Durées configurables
  const [durations, setDurations] = useState<LessonDuration[]>([
    { id: "dur-1", minutes: 40, isDefault: false },
    { id: "dur-2", minutes: 45, isDefault: true },
    { id: "dur-3", minutes: 50, isDefault: false },
  ]);

  // Prix par catégorie et durée
  const [prices, setPrices] = useState<FlexibleLessonPrice[]>([
    {
      id: "fp-1",
      category: "B",
      durations: [
        {
          durationId: "dur-1",
          minutes: 40,
          price: 85,
          doublePrice: 170,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-2",
          minutes: 45,
          price: 90,
          doublePrice: 180,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-3",
          minutes: 50,
          price: 95,
          doublePrice: 190,
          autoCalculateDouble: true,
        },
      ],

      visibleForBooking: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fp-2",
      category: "A",
      durations: [
        {
          durationId: "dur-1",
          minutes: 40,
          price: 90,
          doublePrice: 180,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-2",
          minutes: 45,
          price: 95,
          doublePrice: 190,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-3",
          minutes: 50,
          price: 100,
          doublePrice: 200,
          autoCalculateDouble: true,
        },
      ],

      visibleForBooking: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fp-3",
      category: "BE",
      durations: [
        {
          durationId: "dur-1",
          minutes: 40,
          price: 105,
          doublePrice: 210,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-2",
          minutes: 45,
          price: 110,
          doublePrice: 220,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-3",
          minutes: 50,
          price: 115,
          doublePrice: 230,
          autoCalculateDouble: true,
        },
      ],

      visibleForBooking: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fp-4",
      category: "A1",
      durations: [
        {
          durationId: "dur-1",
          minutes: 40,
          price: 80,
          doublePrice: 160,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-2",
          minutes: 45,
          price: 85,
          doublePrice: 170,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-3",
          minutes: 50,
          price: 90,
          doublePrice: 180,
          autoCalculateDouble: true,
        },
      ],

      visibleForBooking: true,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "fp-5",
      category: "BPT",
      durations: [
        {
          durationId: "dur-1",
          minutes: 40,
          price: 95,
          doublePrice: 190,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-2",
          minutes: 45,
          price: 100,
          doublePrice: 200,
          autoCalculateDouble: true,
        },
        {
          durationId: "dur-3",
          minutes: 50,
          price: 105,
          doublePrice: 210,
          autoCalculateDouble: true,
        },
      ],

      visibleForBooking: false,
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [showAddDurationDialog, setShowAddDurationDialog] = useState(false);
  const [newDurationMinutes, setNewDurationMinutes] = useState(60);

  // Durées prédéfinies courantes
  const commonDurations = [30, 40, 45, 50, 60, 75, 90];

  // Ajouter une nouvelle durée
  const handleAddDuration = () => {
    const newDuration: LessonDuration = {
      id: `dur-${Date.now()}`,
      minutes: newDurationMinutes,
      isDefault: false,
    };

    setDurations([...durations, newDuration]);

    // Ajouter cette durée à toutes les catégories avec un prix par défaut
    setPrices(
      prices.map((price) => ({
        ...price,
        durations: [
          ...price.durations,
          {
            durationId: newDuration.id,
            minutes: newDurationMinutes,
            price: 0,
            doublePrice: 0,
            autoCalculateDouble: true,
          },
        ],
      }))
    );

    setShowAddDurationDialog(false);
    setNewDurationMinutes(60);
  };

  // Supprimer une durée
  const handleRemoveDuration = (durationId: string) => {
    if (durations.length <= 1) {
      alert("Vous devez avoir au moins une durée configurée");
      return;
    }

    setDurations(durations.filter((d) => d.id !== durationId));
    setPrices(
      prices.map((price) => ({
        ...price,
        durations: price.durations.filter((d) => d.durationId !== durationId),
      }))
    );
  };

  // Définir une durée par défaut
  const handleSetDefaultDuration = (durationId: string) => {
    setDurations(
      durations.map((d) => ({
        ...d,
        isDefault: d.id === durationId,
      }))
    );
  };

  // Mettre à jour un prix
  const handleUpdatePrice = (
    categoryId: string,
    durationId: string,
    field: "price" | "doublePrice" | "autoCalculateDouble",
    value: number | boolean
  ) => {
    setPrices(
      prices.map((price) => {
        if (price.id === categoryId) {
          return {
            ...price,
            durations: price.durations.map((dur) => {
              if (dur.durationId === durationId) {
                const updated = { ...dur, [field]: value };

                // Calcul automatique du prix double
                if (field === "price" && updated.autoCalculateDouble) {
                  updated.doublePrice = (value as number) * 2;
                }
                if (field === "autoCalculateDouble" && value) {
                  updated.doublePrice = updated.price * 2;
                }

                return updated;
              }
              return dur;
            }),
          };
        }
        return price;
      })
    );
  };

  // Toggle visibilité pour réservation
  const handleToggleVisibility = (categoryId: string) => {
    setPrices(
      prices.map((price) =>
        price.id === categoryId
          ? { ...price, visibleForBooking: !price.visibleForBooking }
          : price
      )
    );
  };

  // Sauvegarder
  const handleSave = () => {
    if (onSave) {
      onSave({ durations, prices });
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration des durées */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />

                {t.lessonDurationsTitle || "Durées de leçons"}
              </CardTitle>
              <CardDescription>
                {t.lessonDurationsDescription ||
                  "Configurez les durées de leçons disponibles pour votre auto-école"}
              </CardDescription>
            </div>
            <Dialog
              open={showAddDurationDialog}
              onOpenChange={setShowAddDurationDialog}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Ajouter une durée
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une durée de leçon</DialogTitle>
                  <DialogDescription>
                    Définissez une nouvelle durée de leçon en minutes
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    <Label>Durées courantes</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {commonDurations
                        .filter(
                          (min) => !durations.some((d) => d.minutes === min)
                        )
                        .map((minutes) => (
                          <Button
                            key={minutes}
                            variant={
                              newDurationMinutes === minutes
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => setNewDurationMinutes(minutes)}
                          >
                            {minutes} min
                          </Button>
                        ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newDuration">
                      Ou durée personnalisée (minutes)
                    </Label>
                    <Input
                      id="newDuration"
                      type="number"
                      min={10}
                      max={180}
                      step={5}
                      value={newDurationMinutes}
                      onChange={(e) =>
                        setNewDurationMinutes(parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDurationDialog(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleAddDuration}>Ajouter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {durations
              .sort((a, b) => a.minutes - b.minutes)
              .map((duration) => (
                <Card
                  key={duration.id}
                  className={`relative transition-all ${
                    duration.isDefault
                      ? "border-primary shadow-md"
                      : "border-border"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-muted-foreground" />

                        <CardTitle className="text-2xl">
                          {duration.minutes}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                          min
                        </span>
                      </div>
                      {!duration.isDefault && durations.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveDuration(duration.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    {duration.isDefault && (
                      <Badge variant="default" className="w-fit mt-2">
                        ⭐ Par défaut
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!duration.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSetDefaultDuration(duration.id)}
                      >
                        Définir par défaut
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
          <Alert className="mt-4">
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              La durée par défaut sera proposée en premier lors de la
              réservation de leçons. Les prix doubles sont calculés
              automatiquement (2x le prix simple).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Configuration des prix par catégorie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSignIcon className="h-5 w-5" />

            {t.lessonsPricingTitle}
          </CardTitle>
          <CardDescription>
            {t.lessonsPricingDescription ||
              "Configurez les prix pour chaque catégorie et durée de leçon"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {prices.map((categoryPrice) => (
              <div key={categoryPrice.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {getCategoryIcon(categoryPrice.category)}
                    </span>
                    <Badge variant="outline" className="text-base">
                      {categoryPrice.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">
                      {t.visibleForBooking || "Visible pour réservations"}
                    </Label>
                    <Switch
                      checked={categoryPrice.visibleForBooking}
                      onCheckedChange={() =>
                        handleToggleVisibility(categoryPrice.id)
                      }
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Durée</TableHead>
                      <TableHead>Prix simple</TableHead>
                      <TableHead>Prix double</TableHead>
                      <TableHead>Calcul auto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryPrice.durations.map((dur) => (
                      <TableRow key={dur.durationId}>
                        <TableCell>
                          <Badge
                            variant={
                              durations.find((d) => d.id === dur.durationId)
                                ?.isDefault
                                ? "default"
                                : "secondary"
                            }
                          >
                            {dur.minutes} min
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={0}
                            step={0.5}
                            value={dur.price}
                            onChange={(e) =>
                              handleUpdatePrice(
                                categoryPrice.id,
                                dur.durationId,
                                "price",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min={0}
                            step={0.5}
                            value={dur.doublePrice}
                            onChange={(e) =>
                              handleUpdatePrice(
                                categoryPrice.id,
                                dur.durationId,
                                "doublePrice",
                                parseFloat(e.target.value)
                              )
                            }
                            disabled={dur.autoCalculateDouble}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={dur.autoCalculateDouble}
                            onCheckedChange={(checked) =>
                              handleUpdatePrice(
                                categoryPrice.id,
                                dur.durationId,
                                "autoCalculateDouble",
                                checked
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>

          <Alert className="mt-6">
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              <strong>Calcul automatique :</strong> Lorsque activé, le prix
              double est automatiquement calculé (2x le prix simple). Désactivez
              pour définir un prix double personnalisé.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Aperçu des prix */}
      <Card>
        <CardHeader>
          <CardTitle>Aperçu des tarifs</CardTitle>
          <CardDescription>
            Visualisation rapide de tous vos tarifs configurés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {prices
              .filter((p) => p.visibleForBooking)
              .map((categoryPrice) => (
                <Card key={categoryPrice.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {getCategoryIcon(categoryPrice.category)}
                      </span>
                      <CardTitle className="text-lg">
                        {categoryPrice.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categoryPrice.durations.map((dur) => {
                      const isDefault = durations.find(
                        (d) => d.id === dur.durationId
                      )?.isDefault;
                      return (
                        <div
                          key={dur.durationId}
                          className={`flex justify-between text-sm ${
                            isDefault ? "font-semibold" : ""
                          }`}
                        >
                          <span>
                            {dur.minutes} min{isDefault && " ⭐"}
                          </span>
                          <span>{formatCurrency(dur.price, locale)}</span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          {t.saveSettings || "Enregistrer les tarifs"}
        </Button>
      </div>
    </div>
  );
}
