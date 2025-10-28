/**
 * VIAMENTOR Student Wizard - Step 3: Legal Requirements
 * OAC mandatory documents and prerequisites
 */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileTextIcon,
  EyeIcon,
  HeartPulseIcon,
  GraduationCapIcon,
  FileCheckIcon,
  BikeIcon,
  UploadIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  legalRequirementsSchema,
  LegalRequirementsData,
  validateLearnerPermit,
  requiresMotorcycleCourse,
  LicenseCategory,
} from "@/viamentor/data/viamentor-student-wizard-schemas";
import {
  useWizardTranslations,
  WizardLocale,
} from "@/viamentor/data/viamentor-student-wizard-i18n";

interface LegalRequirementsStepProps {
  initialData?: Partial<LegalRequirementsData>;
  selectedCategories?: LicenseCategory[];
  locale?: WizardLocale;
  onDataChange: (data: Partial<LegalRequirementsData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function LegalRequirementsStep({
  initialData,
  selectedCategories = [],
  locale = "fr",
  onDataChange,
  onValidationChange,
}: LegalRequirementsStepProps) {
  const t = useWizardTranslations(locale);
  const needsMotorcycleCourse = requiresMotorcycleCourse(selectedCategories);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<LegalRequirementsData>({
    resolver: zodResolver(legalRequirementsSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  const formData = watch();

  // Notify parent of data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  // Validate learner permit expiry
  const permitValidation = formData.learnerPermitExpiryDate
    ? validateLearnerPermit(
        formData.learnerPermitIssueDate || "",
        formData.learnerPermitExpiryDate
      )
    : null;

  const handleFileUpload =
    (field: keyof LegalRequirementsData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert("Fichier trop grand (max 5 MB)");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t.legalTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.legalSubtitle}</p>
      </div>

      {/* Learner Permit */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">
                {t.learnerPermitTitle}
              </CardTitle>
              <CardDescription className="text-xs">
                {t.learnerPermitInfo}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="learnerPermitNumber">
                {t.learnerPermitNumber} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="learnerPermitNumber"
                {...register("learnerPermitNumber")}
              />

              {errors.learnerPermitNumber && (
                <p className="text-sm text-red-600">
                  {errors.learnerPermitNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnerPermitIssueDate">
                {t.learnerPermitIssue}
              </Label>
              <Input
                id="learnerPermitIssueDate"
                type="date"
                {...register("learnerPermitIssueDate")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learnerPermitExpiryDate">
                {t.learnerPermitExpiry}
              </Label>
              <Input
                id="learnerPermitExpiryDate"
                type="date"
                {...register("learnerPermitExpiryDate")}
              />
            </div>
          </div>

          {permitValidation?.warning && (
            <Alert variant={permitValidation.valid ? "default" : "destructive"}>
              <AlertTriangleIcon className="h-4 w-4" />

              <AlertDescription>
                {t.learnerPermitExpiring.replace(
                  "{days}",
                  String(permitValidation.daysRemaining)
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="learnerPermitVerified"
              checked={formData.learnerPermitVerified}
              onCheckedChange={(checked) =>
                setValue("learnerPermitVerified", checked as boolean)
              }
            />

            <Label htmlFor="learnerPermitVerified" className="cursor-pointer">
              {t.learnerPermitVerified} <span className="text-red-600">*</span>
            </Label>
          </div>
          {errors.learnerPermitVerified && (
            <p className="text-sm text-red-600">
              {errors.learnerPermitVerified.message}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="learnerPermitScan">{t.uploadScan}</Label>
            <Input
              id="learnerPermitScan"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload("learnerPermitScan")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Vision Test */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <EyeIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{t.visionTestTitle}</CardTitle>
              <CardDescription className="text-xs">
                {t.visionTestRequired}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="visionTestCompleted"
              checked={formData.visionTestCompleted}
              onCheckedChange={(checked) =>
                setValue("visionTestCompleted", checked as boolean)
              }
            />

            <Label htmlFor="visionTestCompleted" className="cursor-pointer">
              {t.visionTestCompleted} <span className="text-red-600">*</span>
            </Label>
          </div>
          {errors.visionTestCompleted && (
            <p className="text-sm text-red-600">
              {errors.visionTestCompleted.message}
            </p>
          )}

          {formData.visionTestCompleted && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visionTestDate">{t.visionTestDate}</Label>
                <Input
                  id="visionTestDate"
                  type="date"
                  {...register("visionTestDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visionTestCertificate">
                  {t.uploadCertificate}
                </Label>
                <Input
                  id="visionTestCertificate"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload("visionTestCertificate")}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* First Aid Course */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <HeartPulseIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{t.firstAidTitle}</CardTitle>
              <CardDescription className="text-xs">
                {t.firstAidMinimum}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="firstAidCompleted"
              checked={formData.firstAidCompleted}
              onCheckedChange={(checked) =>
                setValue("firstAidCompleted", checked as boolean)
              }
            />

            <Label htmlFor="firstAidCompleted" className="cursor-pointer">
              {t.firstAidCompleted}
            </Label>
          </div>

          {!formData.firstAidCompleted && (
            <Alert>
              <InfoIcon className="h-4 w-4" />

              <AlertDescription>{t.firstAidInfo}</AlertDescription>
            </Alert>
          )}

          {formData.firstAidCompleted && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstAidOrganization">
                  {t.firstAidOrganization}
                </Label>
                <Input
                  id="firstAidOrganization"
                  {...register("firstAidOrganization")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstAidDate">{t.firstAidDate}</Label>
                <Input
                  id="firstAidDate"
                  type="date"
                  {...register("firstAidDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstAidHours">{t.firstAidHours}</Label>
                <Input
                  id="firstAidHours"
                  type="number"
                  min="10"
                  defaultValue="10"
                  {...register("firstAidHours", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstAidCertificate">
                  {t.uploadCertificate}
                </Label>
                <Input
                  id="firstAidCertificate"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload("firstAidCertificate")}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Traffic Course */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
              <GraduationCapIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">
                {t.trafficCourseTitle}
              </CardTitle>
              <CardDescription className="text-xs">
                {t.trafficCourseRequired}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trafficCourseCompleted"
              checked={formData.trafficCourseCompleted}
              onCheckedChange={(checked) =>
                setValue("trafficCourseCompleted", checked as boolean)
              }
            />

            <Label htmlFor="trafficCourseCompleted" className="cursor-pointer">
              {t.trafficCourseCompleted}
            </Label>
          </div>

          {formData.trafficCourseCompleted && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trafficCourseDate">{t.trafficCourseDate}</Label>
                <Input
                  id="trafficCourseDate"
                  type="date"
                  {...register("trafficCourseDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trafficCourseCertificate">
                  {t.uploadCertificate}
                </Label>
                <Input
                  id="trafficCourseCertificate"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload("trafficCourseCertificate")}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Theory Exam */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
              <FileCheckIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{t.theoryExamTitle}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.theoryExamStatus}</Label>
            <RadioGroup
              value={formData.theoryExamStatus}
              onValueChange={(value) =>
                setValue("theoryExamStatus", value as any)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_taken" id="not_taken" />

                <Label htmlFor="not_taken" className="cursor-pointer">
                  {t.theoryExamNotTaken}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="passed" id="passed" />

                <Label htmlFor="passed" className="cursor-pointer">
                  {t.theoryExamPassed}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="failed" id="failed" />

                <Label htmlFor="failed" className="cursor-pointer">
                  {t.theoryExamFailed}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.theoryExamStatus === "passed" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theoryExamDate">{t.theoryExamDate}</Label>
                <Input
                  id="theoryExamDate"
                  type="date"
                  {...register("theoryExamDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theoryExamScore">{t.theoryExamScore}</Label>
                <Input
                  id="theoryExamScore"
                  type="number"
                  min="0"
                  max="50"
                  {...register("theoryExamScore", { valueAsNumber: true })}
                />
              </div>
            </div>
          )}

          {formData.theoryExamStatus === "failed" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="theoryExamFailCount">
                  {t.theoryExamFailCount}
                </Label>
                <Input
                  id="theoryExamFailCount"
                  type="number"
                  min="0"
                  {...register("theoryExamFailCount", { valueAsNumber: true })}
                />
              </div>
              {(formData.theoryExamFailCount || 0) >= 2 && (
                <Alert>
                  <InfoIcon className="h-4 w-4" />

                  <AlertDescription>{t.theoryExamInfo}</AlertDescription>
                </Alert>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Motorcycle Course (if needed) */}
      {needsMotorcycleCourse && (
        <Card className="border-orange-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                <BikeIcon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">
                  {t.motorcycleCourseTitle}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t.motorcycleCourseRequired}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="motorcycleCourseCompleted"
                checked={formData.motorcycleCourseCompleted}
                onCheckedChange={(checked) =>
                  setValue("motorcycleCourseCompleted", checked as boolean)
                }
              />

              <Label
                htmlFor="motorcycleCourseCompleted"
                className="cursor-pointer"
              >
                {t.motorcycleCourseCompleted}
              </Label>
            </div>

            {formData.motorcycleCourseCompleted && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="motorcycleCourseStartDate">
                    {t.motorcycleCourseStart}
                  </Label>
                  <Input
                    id="motorcycleCourseStartDate"
                    type="date"
                    {...register("motorcycleCourseStartDate")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motorcycleCourseEndDate">
                    {t.motorcycleCourseEnd}
                  </Label>
                  <Input
                    id="motorcycleCourseEndDate"
                    type="date"
                    {...register("motorcycleCourseEndDate")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motorcycleCourseOrganization">
                    {t.motorcycleCourseOrganization}
                  </Label>
                  <Input
                    id="motorcycleCourseOrganization"
                    {...register("motorcycleCourseOrganization")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motorcycleCourseCertificate">
                    {t.uploadCertificate}
                  </Label>
                  <Input
                    id="motorcycleCourseCertificate"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload("motorcycleCourseCertificate")}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Incomplete Requirements Warning */}
      {!isValid && (
        <Alert>
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>{t.requirementsIncomplete}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
