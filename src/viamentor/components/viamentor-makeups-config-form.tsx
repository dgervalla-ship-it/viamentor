/**
 * VIAMENTOR - Makeups Config Form
 * Formulaire configuration règles rattrapages
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import type { MakeupsLocale } from "@/viamentor/data/viamentor-makeups-i18n";
import { makeupsTranslations } from "@/viamentor/data/viamentor-makeups-i18n";
import type { LicenseCategory } from "@/viamentor/data/viamentor-students-data";
import type {
  MakeupConfig,
  MakeupReason,
} from "@/viamentor/data/viamentor-makeups-data";

/**
 * Schema validation Zod
 */
const configSchema = z.object({
  maxDaysFromCancellation: z.number().min(7).max(90),
  expiryDays: z.number().min(7).max(90),
  validReasons: z.array(z.string()).min(1, "Au moins une raison requise"),
  requiresAdminValidation: z.boolean(),
  autoNotifyStudent: z.boolean(),
  sendReminders: z.boolean(),
  minBookingHoursAdvance: z.number().min(1).max(168),
  allowMultipleMakeups: z.boolean(),
});

type ConfigFormData = z.infer<typeof configSchema>;

/**
 * Props
 */
interface MakeupsConfigFormProps {
  config?: MakeupConfig;
  locale?: MakeupsLocale;
  onSave?: (
    data: ConfigFormData,
    category: LicenseCategory | "all"
  ) => Promise<void>;
}

/**
 * Composant principal
 */
export function MakeupsConfigForm({
  config,
  locale = "fr",
  onSave,
}: MakeupsConfigFormProps) {
  const t = makeupsTranslations[locale];
  const [activeTab, setActiveTab] = useState<LicenseCategory | "all">("all");
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      maxDaysFromCancellation: config?.maxDaysFromCancellation || 30,
      expiryDays: config?.expiryDays || 30,
      validReasons: config?.validReasons || [
        "illness_with_certificate",
        "family_emergency",
        "dangerous_weather",
        "vehicle_breakdown",
      ],

      requiresAdminValidation: config?.requiresAdminValidation || false,
      autoNotifyStudent: config?.autoNotifyStudent || true,
      sendReminders: config?.sendReminders || true,
      minBookingHoursAdvance: config?.minBookingHoursAdvance || 24,
      allowMultipleMakeups: config?.allowMultipleMakeups || true,
    },
  });

  const validReasons = watch("validReasons");
  const maxDays = watch("maxDaysFromCancellation");
  const expiryDays = watch("expiryDays");

  /**
   * Toggle raison
   */
  const toggleReason = (reason: string) => {
    const current = validReasons || [];
    if (current.includes(reason)) {
      setValue(
        "validReasons",
        current.filter((r) => r !== reason)
      );
    } else {
      setValue("validReasons", [...current, reason]);
    }
  };

  /**
   * Submit handler
   */
  const onSubmit = async (data: ConfigFormData) => {
    try {
      setIsSaving(true);
      await onSave?.(data, activeTab);
      toast.success(t.config.saveSuccess);
    } catch (error) {
      toast.error(t.config.saveError);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Raisons disponibles
   */
  const reasonOptions: { value: MakeupReason; label: string }[] = [
    {
      value: "illness_with_certificate",
      label: t.config.fields.validReasons.options.illness,
    },
    {
      value: "family_emergency",
      label: t.config.fields.validReasons.options.family,
    },
    {
      value: "dangerous_weather",
      label: t.config.fields.validReasons.options.weather,
    },
    {
      value: "vehicle_breakdown",
      label: t.config.fields.validReasons.options.vehicle,
    },
    {
      value: "professional_impediment",
      label: t.config.fields.validReasons.options.professional,
    },
    {
      value: "other_justified",
      label: t.config.fields.validReasons.options.other,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Alert info */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertTitle>{t.alert.title}</AlertTitle>
        <AlertDescription>{t.alert.description}</AlertDescription>
      </Alert>

      {/* Tabs catégories */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t.config.tabs.all}</TabsTrigger>
          <TabsTrigger value="B">{t.config.tabs.categoryB}</TabsTrigger>
          <TabsTrigger value="A">{t.config.tabs.categoryA}</TabsTrigger>
          <TabsTrigger value="BE">{t.config.tabs.categoryBE}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.config.title}</CardTitle>
                <CardDescription>
                  {activeTab === "all"
                    ? t.config.tabs.all
                    : `${t.config.tabs.categoryB} ${activeTab}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Délai maximum */}
                <div className="space-y-2">
                  <Label htmlFor="maxDays">
                    {t.config.fields.maxDays.label}
                  </Label>
                  <Input
                    id="maxDays"
                    type="number"
                    min={7}
                    max={90}
                    {...register("maxDaysFromCancellation", {
                      valueAsNumber: true,
                    })}
                  />

                  <p className="text-sm text-muted-foreground">
                    {t.config.fields.maxDays.helper.replace(
                      "{days}",
                      maxDays.toString()
                    )}
                  </p>
                  {errors.maxDaysFromCancellation && (
                    <p className="text-sm text-destructive">
                      {errors.maxDaysFromCancellation.message}
                    </p>
                  )}
                </div>

                {/* Durée validité */}
                <div className="space-y-2">
                  <Label htmlFor="expiryDays">
                    {t.config.fields.expiryDays.label}
                  </Label>
                  <Input
                    id="expiryDays"
                    type="number"
                    min={7}
                    max={90}
                    {...register("expiryDays", { valueAsNumber: true })}
                  />

                  <p className="text-sm text-muted-foreground">
                    {t.config.fields.expiryDays.helper} : {expiryDays} jours
                  </p>
                  {errors.expiryDays && (
                    <p className="text-sm text-destructive">
                      {errors.expiryDays.message}
                    </p>
                  )}
                </div>

                {/* Raisons valides */}
                <div className="space-y-3">
                  <Label>{t.config.fields.validReasons.label}</Label>
                  <div className="space-y-2">
                    {reasonOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={option.value}
                          checked={validReasons?.includes(option.value)}
                          onCheckedChange={() => toggleReason(option.value)}
                        />

                        <label
                          htmlFor={option.value}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.validReasons && (
                    <p className="text-sm text-destructive">
                      {errors.validReasons.message}
                    </p>
                  )}
                </div>

                {/* Validation admin */}
                <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                  <Checkbox
                    id="requireValidation"
                    {...register("requiresAdminValidation")}
                  />

                  <div className="space-y-1">
                    <label
                      htmlFor="requireValidation"
                      className="text-sm font-medium leading-none"
                    >
                      {t.config.fields.requireValidation.label}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t.config.fields.requireValidation.description}
                    </p>
                  </div>
                </div>

                {/* Notification auto */}
                <div className="flex items-start space-x-3 rounded-lg border border-border p-4 bg-accent/50">
                  <Checkbox
                    id="autoNotify"
                    {...register("autoNotifyStudent")}
                  />

                  <div className="space-y-1">
                    <label
                      htmlFor="autoNotify"
                      className="text-sm font-medium leading-none"
                    >
                      {t.config.fields.autoNotify.label}
                      <Badge variant="secondary" className="ml-2">
                        Recommandé
                      </Badge>
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t.config.fields.autoNotify.description}
                    </p>
                  </div>
                </div>

                {/* Rappels */}
                <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                  <Checkbox id="sendReminders" {...register("sendReminders")} />

                  <div className="space-y-1">
                    <label
                      htmlFor="sendReminders"
                      className="text-sm font-medium leading-none"
                    >
                      {t.config.fields.sendReminders.label}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t.config.fields.sendReminders.description}
                    </p>
                  </div>
                </div>

                {/* Délai minimum réservation */}
                <div className="space-y-2">
                  <Label htmlFor="minBooking">
                    {t.config.fields.minBookingHours.label}
                  </Label>
                  <Input
                    id="minBooking"
                    type="number"
                    min={1}
                    max={168}
                    {...register("minBookingHoursAdvance", {
                      valueAsNumber: true,
                    })}
                  />

                  <p className="text-sm text-muted-foreground">
                    {t.config.fields.minBookingHours.helper}
                  </p>
                </div>

                {/* Cumul rattrapages */}
                <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                  <Checkbox
                    id="allowMultiple"
                    {...register("allowMultipleMakeups")}
                  />

                  <div className="space-y-1">
                    <label
                      htmlFor="allowMultiple"
                      className="text-sm font-medium leading-none"
                    >
                      {t.config.fields.allowMultiple.label}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {t.config.fields.allowMultiple.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <CheckCircle2Icon className="mr-2 h-4 w-4" />

                    {t.config.save}
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
