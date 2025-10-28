/**
 * VIAMENTOR - Vehicle Wizard Step 2: Equipment & OAC Compliance
 * Checklist cards for mandatory equipment according to OAC Art. 65
 */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  equipmentOACSchema,
  type EquipmentOACData,
} from "@/polymet/data/viamentor-vehicles-wizard-schemas";
import {
  getVehicleWizardI18n,
  type VehicleWizardLocale,
} from "@/polymet/data/viamentor-vehicles-wizard-i18n";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  InfoIcon,
  CheckCircle2Icon,
  XCircleIcon,
  UploadIcon,
} from "lucide-react";

interface EquipmentOACStepProps {
  initialData?: Partial<EquipmentOACData>;
  category: "B" | "A" | "BE" | "A1";
  transmission: "manual" | "automatic";
  locale?: VehicleWizardLocale;
  onDataChange: (data: Partial<EquipmentOACData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function EquipmentOACStep({
  initialData,
  category,
  transmission,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: EquipmentOACStepProps) {
  const t = getVehicleWizardI18n(locale).step2;
  const [isCompliant, setIsCompliant] = useState(false);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<EquipmentOACData>({
    resolver: zodResolver(equipmentOACSchema),
    mode: "onChange",
    defaultValues: {
      ...initialData,
      category,
      transmission,
    },
  });

  const formData = watch();

  // Check compliance
  useEffect(() => {
    const dualControlsOK =
      transmission === "automatic" ||
      (category !== "B" && category !== "BE") ||
      formData.dualControls;
    const compliant =
      dualControlsOK &&
      formData.instructorMirror &&
      formData.schoolSign &&
      formData.warningTriangle &&
      formData.firstAidKit;

    setIsCompliant(compliant);
    onDataChange(formData);
    onValidationChange(isValid && compliant);
  }, [
    formData,
    isValid,
    category,
    transmission,
    onDataChange,
    onValidationChange,
  ]);

  const requiresDualControls =
    transmission === "manual" && (category === "B" || category === "BE");

  return (
    <div className="space-y-6">
      {/* Alert */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription>{t.alert}</AlertDescription>
      </Alert>

      {/* Compliance Badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Équipements obligatoires OAC Art. 65
        </h3>
        <Badge
          variant={isCompliant ? "default" : "destructive"}
          className="gap-1"
        >
          {isCompliant ? (
            <CheckCircle2Icon className="h-3 w-3" />
          ) : (
            <XCircleIcon className="h-3 w-3" />
          )}
          {isCompliant ? t.compliant : t.nonCompliant}
        </Badge>
      </div>

      {/* Equipment Cards */}
      <div className="space-y-4">
        {/* Dual Controls */}
        {requiresDualControls && (
          <Card
            className={
              formData.dualControls ? "border-green-500" : "border-destructive"
            }
          >
            <CardHeader>
              <CardTitle className="text-base">
                {t.dualControls.title}
              </CardTitle>
              <CardDescription>{t.dualControls.desc}</CardDescription>
              <Badge variant="destructive" className="w-fit text-xs">
                {t.dualControls.required}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dualControls"
                  checked={formData.dualControls}
                  onCheckedChange={(checked) =>
                    setValue("dualControls", !!checked)
                  }
                />

                <Label htmlFor="dualControls">{t.dualControls.title}</Label>
              </div>
              {formData.dualControls && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="dualControlsDate">Date installation</Label>
                    <Input
                      id="dualControlsDate"
                      type="date"
                      {...register("dualControlsDate")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dualControlsInstaller">
                      Entreprise installatrice
                    </Label>
                    <Input
                      id="dualControlsInstaller"
                      {...register("dualControlsInstaller")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dualControlsCert">Certificat (PDF)</Label>
                    <Input id="dualControlsCert" type="file" accept=".pdf" />
                  </div>
                </>
              )}
              {errors.dualControls && (
                <p className="text-xs text-destructive">
                  {errors.dualControls.message}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructor Mirror */}
        <Card
          className={
            formData.instructorMirror
              ? "border-green-500"
              : "border-destructive"
          }
        >
          <CardHeader>
            <CardTitle className="text-base">{t.mirror.title}</CardTitle>
            <CardDescription>{t.mirror.desc}</CardDescription>
            <Badge variant="destructive" className="w-fit text-xs">
              {t.mirror.required}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="instructorMirror"
                checked={formData.instructorMirror}
                onCheckedChange={(checked) =>
                  setValue("instructorMirror", !!checked)
                }
              />

              <Label htmlFor="instructorMirror">{t.mirror.title}</Label>
            </div>
            {formData.instructorMirror && (
              <div className="space-y-2">
                <Label htmlFor="instructorMirrorDate">Date installation</Label>
                <Input
                  id="instructorMirrorDate"
                  type="date"
                  {...register("instructorMirrorDate")}
                />
              </div>
            )}
            {errors.instructorMirror && (
              <p className="text-xs text-destructive">
                {errors.instructorMirror.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* School Sign */}
        <Card
          className={
            formData.schoolSign ? "border-green-500" : "border-destructive"
          }
        >
          <CardHeader>
            <CardTitle className="text-base">{t.sign.title}</CardTitle>
            <CardDescription>{t.sign.desc}</CardDescription>
            <Badge variant="destructive" className="w-fit text-xs">
              Obligatoire OAC Art. 65
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="schoolSign"
                checked={formData.schoolSign}
                onCheckedChange={(checked) => setValue("schoolSign", !!checked)}
              />

              <Label htmlFor="schoolSign">{t.sign.title}</Label>
            </div>
            {formData.schoolSign && (
              <RadioGroup
                value={formData.schoolSignType}
                onValueChange={(value) =>
                  setValue("schoolSignType", value as any)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="magnetic" id="magnetic" />

                  <Label htmlFor="magnetic">{t.sign.types[0]}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />

                  <Label htmlFor="fixed">{t.sign.types[1]}</Label>
                </div>
              </RadioGroup>
            )}
            {errors.schoolSign && (
              <p className="text-xs text-destructive">
                {errors.schoolSign.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Warning Triangle */}
        <Card
          className={
            formData.warningTriangle ? "border-green-500" : "border-destructive"
          }
        >
          <CardHeader>
            <CardTitle className="text-base">{t.triangle.title}</CardTitle>
            <CardDescription>{t.triangle.desc}</CardDescription>
            <Badge variant="destructive" className="w-fit text-xs">
              Obligatoire
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="warningTriangle"
                checked={formData.warningTriangle}
                onCheckedChange={(checked) =>
                  setValue("warningTriangle", !!checked)
                }
              />

              <Label htmlFor="warningTriangle">{t.triangle.title}</Label>
            </div>
            {errors.warningTriangle && (
              <p className="text-xs text-destructive">
                {errors.warningTriangle.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* First Aid Kit */}
        <Card
          className={
            formData.firstAidKit ? "border-green-500" : "border-destructive"
          }
        >
          <CardHeader>
            <CardTitle className="text-base">{t.firstAid.title}</CardTitle>
            <CardDescription>{t.firstAid.desc}</CardDescription>
            <Badge variant="destructive" className="w-fit text-xs">
              Obligatoire
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="firstAidKit"
                checked={formData.firstAidKit}
                onCheckedChange={(checked) =>
                  setValue("firstAidKit", !!checked)
                }
              />

              <Label htmlFor="firstAidKit">{t.firstAid.title}</Label>
            </div>
            {formData.firstAidKit && (
              <div className="space-y-2">
                <Label htmlFor="firstAidKitExpiry">Date expiration</Label>
                <Input
                  id="firstAidKitExpiry"
                  type="date"
                  {...register("firstAidKitExpiry")}
                />
              </div>
            )}
            {errors.firstAidKit && (
              <p className="text-xs text-destructive">
                {errors.firstAidKit.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Fire Extinguisher (Optional) */}
        <Card className={formData.fireExtinguisher ? "border-green-500" : ""}>
          <CardHeader>
            <CardTitle className="text-base">{t.extinguisher.title}</CardTitle>
            <CardDescription>{t.extinguisher.desc}</CardDescription>
            <Badge variant="secondary" className="w-fit text-xs">
              Optionnel recommandé
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fireExtinguisher"
                checked={formData.fireExtinguisher}
                onCheckedChange={(checked) =>
                  setValue("fireExtinguisher", !!checked)
                }
              />

              <Label htmlFor="fireExtinguisher">{t.extinguisher.title}</Label>
            </div>
            {formData.fireExtinguisher && (
              <div className="space-y-2">
                <Label htmlFor="fireExtinguisherCheck">
                  Dernière vérification
                </Label>
                <Input
                  id="fireExtinguisherCheck"
                  type="date"
                  {...register("fireExtinguisherCheck")}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
