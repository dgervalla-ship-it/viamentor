/**
 * VIAMENTOR - Vehicle Wizard Step 3: Insurances & Inspections
 * RC, student coverage, casco, technical inspection, highway vignette
 */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insurancesSchema,
  type InsurancesData,
  calculateNextInspectionDate,
  getDaysUntilExpiry,
  isExpiringSoon,
} from "@/viamentor/data/viamentor-vehicles-wizard-schemas";
import {
  getVehicleWizardI18n,
  type VehicleWizardLocale,
} from "@/viamentor/data/viamentor-vehicles-wizard-i18n";
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
import { AlertTriangleIcon, InfoIcon, CheckCircle2Icon } from "lucide-react";

interface InsurancesStepProps {
  initialData?: Partial<InsurancesData>;
  registrationDate: string;
  vehicleYear: number;
  locale?: VehicleWizardLocale;
  onDataChange: (data: Partial<InsurancesData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function InsurancesStep({
  initialData,
  registrationDate,
  vehicleYear,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: InsurancesStepProps) {
  const t = getVehicleWizardI18n(locale).step3;
  const [rcDaysLeft, setRcDaysLeft] = useState<number | null>(null);
  const [inspectionDaysLeft, setInspectionDaysLeft] = useState<number | null>(
    null
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<InsurancesData>({
    resolver: zodResolver(insurancesSchema),
    mode: "onChange",
    defaultValues: {
      ...initialData,
      vehicleYear,
      vignetteYear: new Date().getFullYear(),
    },
  });

  const formData = watch();

  // Calculate days until expiry
  useEffect(() => {
    if (formData.rcExpiryDate) {
      setRcDaysLeft(getDaysUntilExpiry(formData.rcExpiryDate));
    }
    if (formData.nextInspectionDate) {
      setInspectionDaysLeft(getDaysUntilExpiry(formData.nextInspectionDate));
    }
  }, [formData.rcExpiryDate, formData.nextInspectionDate]);

  // Auto-calculate next inspection date
  useEffect(() => {
    if (registrationDate && formData.lastInspectionDate) {
      const nextDate = calculateNextInspectionDate(
        registrationDate,
        formData.lastInspectionDate
      );
      setValue("nextInspectionDate", nextDate.toISOString().split("T")[0]);
    }
  }, [registrationDate, formData.lastInspectionDate, setValue]);

  useEffect(() => {
    onDataChange(formData);
    onValidationChange(isValid);
  }, [formData, isValid, onDataChange, onValidationChange]);

  return (
    <div className="space-y-6">
      {/* Alert */}
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />

        <AlertDescription>{t.alert}</AlertDescription>
      </Alert>

      {/* RC Insurance */}
      <Card>
        <CardHeader>
          <CardTitle>{t.rc.title}</CardTitle>
          <Badge variant="destructive" className="w-fit text-xs">
            Obligatoire
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rcCompany">{t.rc.company} *</Label>
              <Input
                id="rcCompany"
                {...register("rcCompany")}
                placeholder="AXA, Allianz, etc."
              />

              {errors.rcCompany && (
                <p className="text-xs text-destructive">
                  {errors.rcCompany.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcPolicyNumber">{t.rc.policy} *</Label>
              <Input id="rcPolicyNumber" {...register("rcPolicyNumber")} />

              {errors.rcPolicyNumber && (
                <p className="text-xs text-destructive">
                  {errors.rcPolicyNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcStartDate">{t.rc.start} *</Label>
              <Input
                id="rcStartDate"
                type="date"
                {...register("rcStartDate")}
              />

              {errors.rcStartDate && (
                <p className="text-xs text-destructive">
                  {errors.rcStartDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcExpiryDate">{t.rc.expiry} *</Label>
              <Input
                id="rcExpiryDate"
                type="date"
                {...register("rcExpiryDate")}
              />

              {rcDaysLeft !== null && rcDaysLeft < 90 && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>
                    {t.rc.warning.replace("{days}", rcDaysLeft.toString())}
                  </AlertDescription>
                </Alert>
              )}
              {errors.rcExpiryDate && (
                <p className="text-xs text-destructive">
                  {errors.rcExpiryDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="rcPolicyDocument">Police d'assurance RC *</Label>
              <Input id="rcPolicyDocument" type="file" accept=".pdf" />

              <p className="text-xs text-muted-foreground">
                Téléchargez votre police d'assurance RC complète (PDF
                uniquement)
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="rcCertificate">{t.rc.cert}</Label>
              <Input id="rcCertificate" type="file" accept=".pdf" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Coverage */}
      <Card
        className={
          formData.studentCoverage ? "border-green-500" : "border-destructive"
        }
      >
        <CardHeader>
          <CardTitle>{t.student.title}</CardTitle>
          <CardDescription>{t.student.info}</CardDescription>
          <Badge variant="destructive" className="w-fit text-xs">
            Obligatoire OAC Art. 65
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="studentCoverage"
              checked={formData.studentCoverage}
              onCheckedChange={(checked) =>
                setValue("studentCoverage", !!checked)
              }
            />

            <Label htmlFor="studentCoverage">{t.student.title}</Label>
          </div>
          {errors.studentCoverage && (
            <p className="text-xs text-destructive">
              {errors.studentCoverage.message}
            </p>
          )}

          {formData.studentCoverage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentPolicyNumber">{t.student.policy}</Label>
                <Input
                  id="studentPolicyNumber"
                  {...register("studentPolicyNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentExpiryDate">{t.student.expiry}</Label>
                <Input
                  id="studentExpiryDate"
                  type="date"
                  {...register("studentExpiryDate")}
                />

                {errors.studentExpiryDate && (
                  <p className="text-xs text-destructive">
                    {errors.studentExpiryDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="studentCertificate">{t.student.cert}</Label>
                <Input id="studentCertificate" type="file" accept=".pdf" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Casco (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle>{t.casco.title}</CardTitle>
          <Badge variant="secondary" className="w-fit text-xs">
            Optionnel recommandé
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasCasco"
              checked={formData.hasCasco}
              onCheckedChange={(checked) => setValue("hasCasco", !!checked)}
            />

            <Label htmlFor="hasCasco">{t.casco.title}</Label>
          </div>

          {formData.hasCasco && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <RadioGroup
                  value={formData.cascoType}
                  onValueChange={(value) => setValue("cascoType", value as any)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />

                    <Label htmlFor="partial">{t.casco.types[0]}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />

                    <Label htmlFor="full">{t.casco.types[1]}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cascoDeductible">{t.casco.deductible}</Label>
                <Input
                  id="cascoDeductible"
                  type="number"
                  {...register("cascoDeductible", { valueAsNumber: true })}
                  placeholder="500"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technical Inspection */}
      <Card>
        <CardHeader>
          <CardTitle>{t.inspection.title}</CardTitle>
          <Alert className="mt-2">
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>{t.inspection.calculation}</AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastInspectionNumber">
                {t.inspection.lastNum}
              </Label>
              <Input
                id="lastInspectionNumber"
                {...register("lastInspectionNumber")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastInspectionDate">
                {t.inspection.lastDate}
              </Label>
              <Input
                id="lastInspectionDate"
                type="date"
                {...register("lastInspectionDate")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nextInspectionDate">
                {t.inspection.nextDate} *
              </Label>
              <Input
                id="nextInspectionDate"
                type="date"
                {...register("nextInspectionDate")}
              />

              {inspectionDaysLeft !== null && inspectionDaysLeft < 60 && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{t.inspection.warning}</AlertDescription>
                </Alert>
              )}
              {errors.nextInspectionDate && (
                <p className="text-xs text-destructive">
                  {errors.nextInspectionDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="inspectionCertificate">{t.inspection.cert}</Label>
              <Input id="inspectionCertificate" type="file" accept=".pdf" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highway Vignette */}
      <Card
        className={
          formData.hasVignette ? "border-green-500" : "border-destructive"
        }
      >
        <CardHeader>
          <CardTitle>{t.vignette.title}</CardTitle>
          <Badge variant="destructive" className="w-fit text-xs">
            {t.vignette.required}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasVignette"
              checked={formData.hasVignette}
              onCheckedChange={(checked) => setValue("hasVignette", !!checked)}
            />

            <Label htmlFor="hasVignette">
              {t.vignette.year}: {new Date().getFullYear()}
            </Label>
          </div>
          {errors.hasVignette && (
            <p className="text-xs text-destructive">
              {errors.hasVignette.message}
            </p>
          )}
          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>{t.vignette.reminder}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
