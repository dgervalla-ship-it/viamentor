/**
 * VIAMENTOR - Vehicle Wizard Step 4: Summary
 * Review all data with accordion sections, availability settings, OAC confirmation
 */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  summarySchema,
  type SummaryData,
  type VehicleInfoData,
  type EquipmentOACData,
  type InsurancesData,
} from "@/polymet/data/viamentor-vehicles-wizard-schemas";
import {
  getVehicleWizardI18n,
  type VehicleWizardLocale,
} from "@/polymet/data/viamentor-vehicles-wizard-i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2Icon,
  XCircleIcon,
  EditIcon,
  AlertTriangleIcon,
} from "lucide-react";

interface SummaryStepProps {
  vehicleInfo: Partial<VehicleInfoData>;
  equipment: Partial<EquipmentOACData>;
  insurances: Partial<InsurancesData>;
  locale?: VehicleWizardLocale;
  onDataChange: (data: Partial<SummaryData>) => void;
  onValidationChange: (isValid: boolean) => void;
  onEditStep?: (step: number) => void;
}

export function SummaryStep({
  vehicleInfo,
  equipment,
  insurances,
  locale = "fr",
  onDataChange,
  onValidationChange,
  onEditStep,
}: SummaryStepProps) {
  const t = getVehicleWizardI18n(locale).step4;
  const [instructors, setInstructors] = useState<string[]>([]);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SummaryData>({
    resolver: zodResolver(summarySchema),
    mode: "onChange",
    defaultValues: {
      availableImmediately: true,
      oacCompliance: false,
    },
  });

  const formData = watch();

  useEffect(() => {
    onDataChange(formData);
    onValidationChange(isValid);
  }, [formData, isValid, onDataChange, onValidationChange]);

  // Check equipment compliance
  const isEquipmentCompliant =
    equipment.instructorMirror &&
    equipment.schoolSign &&
    equipment.warningTriangle &&
    equipment.firstAidKit &&
    (equipment.transmission === "automatic" || equipment.dualControls);

  // Check insurances validity
  const isInsurancesValid =
    insurances.rcCompany &&
    insurances.rcPolicyNumber &&
    insurances.studentCoverage &&
    insurances.hasVignette;

  const isGloballyCompliant = isEquipmentCompliant && isInsurancesValid;

  return (
    <div className="space-y-6">
      {/* Accordion Sections */}
      <Accordion
        type="multiple"
        defaultValue={["vehicle", "equipment", "insurances", "compliance"]}
        className="space-y-2"
      >
        {/* Vehicle Section */}
        <AccordionItem
          value="vehicle"
          className="border border-border rounded-lg"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">{t.sections[0]}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditStep?.(0);
                }}
                className="gap-2"
              >
                <EditIcon className="h-4 w-4" />
                Modifier
              </Button>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Plaque</p>
                <p className="font-medium">{vehicleInfo.licensePlate || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Catégorie</p>
                <p className="font-medium">{vehicleInfo.category || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Marque</p>
                <p className="font-medium">{vehicleInfo.brand || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modèle</p>
                <p className="font-medium">{vehicleInfo.model || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Année</p>
                <p className="font-medium">{vehicleInfo.year || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="font-medium">{vehicleInfo.transmission || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kilométrage</p>
                <p className="font-medium">
                  {vehicleInfo.mileage
                    ? `${vehicleInfo.mileage.toLocaleString()} km`
                    : "-"}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Equipment Section */}
        <AccordionItem
          value="equipment"
          className="border border-border rounded-lg"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">{t.sections[1]}</span>
              <div className="flex items-center gap-2">
                <Badge
                  variant={isEquipmentCompliant ? "default" : "destructive"}
                  className="gap-1 bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
                >
                  {isEquipmentCompliant ? (
                    <CheckCircle2Icon className="h-3 w-3" />
                  ) : (
                    <XCircleIcon className="h-3 w-3" />
                  )}
                  {isEquipmentCompliant ? "Conforme" : "Non conforme"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep?.(1);
                  }}
                  className="gap-2"
                >
                  <EditIcon className="h-4 w-4" />
                  Modifier
                </Button>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-2">
              {equipment.dualControls !== undefined && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-foreground">
                    Doubles commandes
                  </span>
                  {equipment.dualControls ? (
                    <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-500" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-destructive" />
                  )}
                </div>
              )}
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">
                  Rétroviseur moniteur
                </span>
                {equipment.instructorMirror ? (
                  <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-500" />
                ) : (
                  <XCircleIcon className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">
                  Plaque AUTO-ÉCOLE
                </span>
                {equipment.schoolSign ? (
                  <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-500" />
                ) : (
                  <XCircleIcon className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">
                  Triangle signalisation
                </span>
                {equipment.warningTriangle ? (
                  <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-500" />
                ) : (
                  <XCircleIcon className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">
                  Trousse premiers secours
                </span>
                {equipment.firstAidKit ? (
                  <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-500" />
                ) : (
                  <XCircleIcon className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Insurances Section */}
        <AccordionItem
          value="insurances"
          className="border border-border rounded-lg"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">{t.sections[2]}</span>
              <div className="flex items-center gap-2">
                <Badge variant={isInsurancesValid ? "default" : "destructive"}>
                  {isInsurancesValid ? "Valide" : "Invalide"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep?.(2);
                  }}
                  className="gap-2"
                >
                  <EditIcon className="h-4 w-4" />
                  Modifier
                </Button>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">RC</p>
                <p className="font-medium">{insurances.rcCompany || "-"}</p>
                <p className="text-xs text-muted-foreground">
                  {insurances.rcExpiryDate
                    ? `Expire le ${insurances.rcExpiryDate}`
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Assurance élèves
                </p>
                <Badge
                  variant={
                    insurances.studentCoverage ? "default" : "destructive"
                  }
                >
                  {insurances.studentCoverage ? "Valide" : "Non"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Expertise technique
                </p>
                <p className="text-xs text-muted-foreground">
                  {insurances.nextInspectionDate
                    ? `Prochaine le ${insurances.nextInspectionDate}`
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Vignette autoroute
                </p>
                <Badge
                  variant={insurances.hasVignette ? "default" : "destructive"}
                >
                  {insurances.hasVignette ? "Valide" : "Non"}
                </Badge>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Global Compliance */}
        <AccordionItem
          value="compliance"
          className="border border-border rounded-lg"
        >
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">{t.sections[3]}</span>
              <Badge
                variant={isGloballyCompliant ? "default" : "destructive"}
                className="gap-1"
              >
                {isGloballyCompliant ? (
                  <CheckCircle2Icon className="h-3 w-3" />
                ) : (
                  <XCircleIcon className="h-3 w-3" />
                )}
                {isGloballyCompliant
                  ? "Conforme OAC Art. 65-68"
                  : "Non conforme"}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {!isGloballyCompliant && (
              <Alert variant="destructive">
                <AlertTriangleIcon className="h-4 w-4" />

                <AlertDescription>
                  {!isEquipmentCompliant && <p>• Équipements manquants</p>}
                  {!isInsurancesValid && <p>• Assurances invalides</p>}
                </AlertDescription>
              </Alert>
            )}
            {isGloballyCompliant && (
              <Alert>
                <CheckCircle2Icon className="h-4 w-4" />

                <AlertDescription>
                  Tous les critères OAC Art. 65-68 sont respectés
                </AlertDescription>
              </Alert>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Availability */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold">Disponibilité</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="availableImmediately"
              checked={formData.availableImmediately}
              onCheckedChange={(checked) =>
                setValue("availableImmediately", !!checked)
              }
            />

            <Label htmlFor="availableImmediately">
              Disponible immédiatement
            </Label>
          </div>

          {!formData.availableImmediately && (
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Date de mise en service</Label>
              <Input
                id="serviceDate"
                type="date"
                {...register("serviceDate")}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Moniteurs autorisés</Label>
            <p className="text-sm text-muted-foreground">
              Tous les moniteurs habilités pour cette catégorie
            </p>
          </div>
        </CardContent>
      </Card>

      {/* OAC Confirmation */}
      <Card
        className={
          formData.oacCompliance
            ? "border-green-600 dark:border-green-500 bg-green-50 dark:bg-green-950/20"
            : "border-destructive bg-destructive/5"
        }
      >
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="oacCompliance"
              checked={formData.oacCompliance}
              onCheckedChange={(checked) =>
                setValue("oacCompliance", !!checked)
              }
            />

            <div className="space-y-1">
              <Label htmlFor="oacCompliance" className="font-semibold">
                Je confirme que ce véhicule respecte les exigences OAC Art.
                65-68
              </Label>
              {errors.oacCompliance && (
                <p className="text-xs text-destructive">
                  {errors.oacCompliance.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
