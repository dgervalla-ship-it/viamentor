/**
 * VIAMENTOR Student Wizard - Step 4: Summary
 * Review all data, cost estimation, final confirmation
 */

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UserIcon,
  GraduationCapIcon,
  FileTextIcon,
  EditIcon,
  CheckCircleIcon,
  XCircleIcon,
  MailIcon,
  InfoIcon,
} from "lucide-react";
import {
  IdentityData,
  TrainingData,
  LegalRequirementsData,
  SummaryData,
  calculateEstimatedCost,
  ADDITIONAL_COSTS,
} from "@/polymet/data/viamentor-student-wizard-schemas";
import {
  useWizardTranslations,
  WizardLocale,
} from "@/polymet/data/viamentor-student-wizard-i18n";
import { SWISS_CANTONS } from "@/polymet/data/viamentor-swiss-cantons";
import { Instructor } from "@/polymet/data/viamentor-students-data";

interface SummaryStepProps {
  identityData?: Partial<IdentityData>;
  trainingData?: Partial<TrainingData>;
  legalData?: Partial<LegalRequirementsData>;
  instructors: Instructor[];
  locale?: WizardLocale;
  onDataChange: (data: Partial<SummaryData>) => void;
  onValidationChange: (isValid: boolean) => void;
  onEditStep?: (step: number) => void;
}

export function SummaryStep({
  identityData,
  trainingData,
  legalData,
  instructors,
  locale = "fr",
  onDataChange,
  onValidationChange,
  onEditStep,
}: SummaryStepProps) {
  const t = useWizardTranslations(locale);
  const [dataVerified, setDataVerified] = useState(false);
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);

  // Notify parent of data changes
  useEffect(() => {
    onDataChange({ dataVerified, sendWelcomeEmail });
  }, [dataVerified, sendWelcomeEmail, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(dataVerified);
  }, [dataVerified, onValidationChange]);

  // Calculate cost estimation
  const costEstimate = trainingData?.categories
    ? calculateEstimatedCost(trainingData as TrainingData)
    : null;

  // Get canton name
  const cantonName = identityData?.canton
    ? SWISS_CANTONS.find((c) => c.code === identityData.canton)?.name[locale]
    : "";

  // Get instructor name
  const getInstructorName = (instructorId?: string) => {
    if (!instructorId || instructorId === "none") return t.noInstructor;
    const instructor = instructors.find((i) => i.id === instructorId);
    return instructor
      ? `${instructor.firstName} ${instructor.lastName}`
      : t.noInstructor;
  };

  // Check legal requirements completion
  const legalComplete =
    legalData?.learnerPermitVerified &&
    legalData?.visionTestCompleted &&
    legalData?.firstAidCompleted &&
    legalData?.trafficCourseCompleted;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t.summaryTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.step4}</p>
      </div>

      {/* Accordion Sections */}
      <Accordion
        type="multiple"
        defaultValue={["identity", "training", "legal"]}
      >
        {/* Identity Section */}
        <AccordionItem value="identity">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5" />

              <span className="font-semibold">{t.summaryIdentity}</span>
              <Badge variant="secondary">{t.complete}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    {identityData?.photo ? (
                      <AvatarImage src={identityData.photo} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {identityData?.firstName?.[0]}
                        {identityData?.lastName?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">{t.firstName}</p>
                        <p className="font-medium">{identityData?.firstName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t.lastName}</p>
                        <p className="font-medium">{identityData?.lastName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t.birthDate}</p>
                        <p className="font-medium">{identityData?.birthDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t.email}</p>
                        <p className="font-medium">{identityData?.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t.phone}</p>
                        <p className="font-medium">{identityData?.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t.canton}</p>
                        <p className="font-medium">{cantonName}</p>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground">{t.street}</p>
                      <p className="font-medium">
                        {identityData?.street}, {identityData?.zipCode}{" "}
                        {identityData?.city}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditStep?.(0)}
                  >
                    <EditIcon className="h-4 w-4 mr-2" />

                    {t.edit}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Training Section */}
        <AccordionItem value="training">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <GraduationCapIcon className="h-5 w-5" />

              <span className="font-semibold">{t.summaryTraining}</span>
              <Badge variant="secondary">
                {trainingData?.categories?.length || 0} catégorie(s)
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                {trainingData?.categories?.map((cat, idx) => (
                  <div key={idx} className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        Catégorie {cat.category}
                      </h4>
                      <Badge variant="outline">
                        CHF{" "}
                        {cat.packageType === "single"
                          ? 120
                          : cat.packageType === "package_10"
                            ? 1140
                            : cat.packageType === "package_20"
                              ? 2160
                              : 800}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          {t.enrollmentDate}
                        </p>
                        <p className="font-medium">{cat.enrollmentDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          {t.assignedInstructor}
                        </p>
                        <p className="font-medium">
                          {getInstructorName(cat.instructorId)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          {t.selectPackage}
                        </p>
                        <p className="font-medium capitalize">
                          {cat.packageType.replace("_", " ")}
                        </p>
                      </div>
                      {cat.examTargetDate && (
                        <div>
                          <p className="text-muted-foreground">
                            {t.examTargetDate}
                          </p>
                          <p className="font-medium">{cat.examTargetDate}</p>
                        </div>
                      )}
                    </div>
                    {cat.notes && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">{t.notes}</p>
                        <p className="font-medium">{cat.notes}</p>
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditStep?.(1)}
                >
                  <EditIcon className="h-4 w-4 mr-2" />

                  {t.edit}
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Legal Requirements Section */}
        <AccordionItem value="legal">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <FileTextIcon className="h-5 w-5" />

              <span className="font-semibold">{t.summaryLegal}</span>
              <Badge variant={legalComplete ? "default" : "secondary"}>
                {legalComplete ? t.complete : t.incomplete}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {legalData?.learnerPermitVerified ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm">{t.learnerPermitTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {legalData?.visionTestCompleted ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm">{t.visionTestTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {legalData?.firstAidCompleted ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm">{t.firstAidTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {legalData?.trafficCourseCompleted ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-sm">{t.trafficCourseTitle}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {legalData?.theoryExamStatus === "passed" ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm">{t.theoryExamTitle}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditStep?.(2)}
                >
                  <EditIcon className="h-4 w-4 mr-2" />

                  {t.edit}
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Cost Estimation */}
      {costEstimate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.costEstimation}</CardTitle>
            <CardDescription>{t.priceIndicative}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {costEstimate.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <span>{item.label}</span>
                <span className="font-medium">CHF {item.amount}</span>
              </div>
            ))}

            <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground rounded-lg">
              <span className="font-bold">{t.totalEstimation}</span>
              <span className="text-xl font-bold">
                CHF {costEstimate.total}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Confirmation */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="dataVerified"
              checked={dataVerified}
              onCheckedChange={(checked) => setDataVerified(checked as boolean)}
            />

            <Label htmlFor="dataVerified" className="cursor-pointer">
              {t.dataVerified} <span className="text-red-600">*</span>
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="sendWelcomeEmail"
              checked={sendWelcomeEmail}
              onCheckedChange={(checked) =>
                setSendWelcomeEmail(checked as boolean)
              }
            />

            <Label htmlFor="sendWelcomeEmail" className="cursor-pointer">
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />

                {t.sendWelcomeEmail}
              </div>
            </Label>
          </div>

          {sendWelcomeEmail && (
            <Alert>
              <InfoIcon className="h-4 w-4" />

              <AlertDescription>
                <p className="font-medium">
                  {t.welcomeEmailSubject.replace(
                    "{schoolName}",
                    "École de conduite"
                  )}
                </p>
                <p className="text-xs mt-1">
                  Email de bienvenue sera envoyé à {identityData?.email}
                </p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Validation Error */}
      {!dataVerified && (
        <Alert variant="destructive">
          <AlertDescription>{t.required}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
