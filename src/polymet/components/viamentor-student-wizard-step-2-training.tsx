/**
 * VIAMENTOR Student Wizard - Step 2: Training
 * Categories selection, instructors, packages
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CarIcon,
  BikeIcon,
  TruckIcon,
  ChevronDownIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  CircleDotIcon,
  BusIcon,
} from "lucide-react";
import {
  TrainingData,
  TrainingCategoryData,
  LicenseCategory,
  validateAgeForCategory,
  PACKAGE_PRICES,
} from "@/polymet/data/viamentor-student-wizard-schemas";
import {
  useWizardTranslations,
  WizardLocale,
} from "@/polymet/data/viamentor-student-wizard-i18n";
import { Instructor } from "@/polymet/data/viamentor-students-data";

interface TrainingStepProps {
  initialData?: Partial<TrainingData>;
  birthDate?: string;
  instructors: Instructor[];
  locale?: WizardLocale;
  onDataChange: (data: Partial<TrainingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const CATEGORY_CONFIG = {
  B: {
    icon: CarIcon,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  },
  A: {
    icon: BikeIcon,
    color: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  },
  BE: {
    icon: TruckIcon,
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  },
  A1: {
    icon: CircleDotIcon,
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  },
  BPT: {
    icon: BusIcon,
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  },
};

export function TrainingStep({
  initialData,
  birthDate,
  instructors,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: TrainingStepProps) {
  const t = useWizardTranslations(locale);
  const [selectedCategories, setSelectedCategories] = useState<
    LicenseCategory[]
  >(initialData?.categories?.map((c) => c.category) || []);
  const [categoryData, setCategoryData] = useState<
    Record<string, Partial<TrainingCategoryData>>
  >({});

  // Initialize category data from initialData
  useEffect(() => {
    if (initialData?.categories) {
      const data: Record<string, Partial<TrainingCategoryData>> = {};
      initialData.categories.forEach((cat) => {
        data[cat.category] = cat;
      });
      setCategoryData(data);
    }
  }, [initialData]);

  // Notify parent of data changes
  useEffect(() => {
    const categories = selectedCategories.map((cat) => ({
      category: cat,
      enrollmentDate:
        categoryData[cat]?.enrollmentDate ||
        new Date().toISOString().split("T")[0],
      instructorId: categoryData[cat]?.instructorId,
      packageType: categoryData[cat]?.packageType || "single",
      examTargetDate: categoryData[cat]?.examTargetDate,
      notes: categoryData[cat]?.notes,
    })) as TrainingCategoryData[];

    onDataChange({ categories });
    onValidationChange(categories.length > 0);
  }, [selectedCategories, categoryData, onDataChange, onValidationChange]);

  const toggleCategory = (category: LicenseCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const updateCategoryData = (
    category: LicenseCategory,
    field: string,
    value: any
  ) => {
    setCategoryData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const getQualifiedInstructors = (category: LicenseCategory) => {
    return instructors.filter((instructor) =>
      instructor.categories.includes(category)
    );
  };

  const getCategoryTranslation = (category: LicenseCategory) => {
    const translations: Record<
      LicenseCategory,
      { title: string; desc: string }
    > = {
      B: { title: t.categoryB, desc: t.categoryBDesc },
      A: { title: t.categoryA, desc: t.categoryADesc },
      BE: { title: t.categoryBE, desc: t.categoryBEDesc },
      A1: { title: t.categoryA1, desc: t.categoryA1Desc },
      BPT: { title: t.categoryBPT, desc: t.categoryBPTDesc },
    };
    return translations[category];
  };

  const getPackageTranslation = (packageType: string) => {
    const translations: Record<string, { title: string; desc: string }> = {
      single: { title: t.packageSingle, desc: t.packageSingleDesc },
      package_10: { title: t.package10, desc: t.package10Desc },
      package_20: { title: t.package20, desc: t.package20Desc },
      unlimited_monthly: {
        title: t.packageUnlimited,
        desc: t.packageUnlimitedDesc,
      },
    };
    return translations[packageType] || translations.single;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t.trainingTitle}</h3>
        <p className="text-sm text-muted-foreground">{t.selectCategories}</p>
      </div>

      {/* Categories Selection */}
      <div className="space-y-3">
        {(["B", "A", "BE", "A1", "BPT"] as LicenseCategory[]).map(
          (category) => {
            const config = CATEGORY_CONFIG[category];
            const Icon = config.icon;
            const translation = getCategoryTranslation(category);
            const isSelected = selectedCategories.includes(category);
            const ageValidation = birthDate
              ? validateAgeForCategory(birthDate, category)
              : null;
            const qualifiedInstructors = getQualifiedInstructors(category);

            return (
              <Card
                key={category}
                className={isSelected ? "border-primary" : ""}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`category-${category}`}
                        checked={isSelected}
                        onCheckedChange={() => toggleCategory(category)}
                        disabled={ageValidation && !ageValidation.valid}
                      />

                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <Label
                          htmlFor={`category-${category}`}
                          className="text-base font-semibold cursor-pointer"
                        >
                          {translation.title}
                        </Label>
                        <CardDescription className="text-xs">
                          {translation.desc}
                        </CardDescription>
                      </div>
                    </div>

                    {isSelected && (
                      <Badge variant="default" className="ml-2">
                        CHF{" "}
                        {
                          PACKAGE_PRICES[
                            categoryData[category]?.packageType || "single"
                          ]
                        }
                      </Badge>
                    )}
                  </div>

                  {/* Age Validation Alert */}
                  {ageValidation && !ageValidation.valid && (
                    <Alert variant="destructive" className="mt-3">
                      <AlertCircleIcon className="h-4 w-4" />

                      <AlertDescription>
                        {ageValidation.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* No Qualified Instructors Warning */}
                  {isSelected && qualifiedInstructors.length === 0 && (
                    <Alert className="mt-3">
                      <AlertTriangleIcon className="h-4 w-4" />

                      <AlertDescription>
                        {t.noQualifiedInstructor.replace(
                          "{category}",
                          category
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardHeader>

                {/* Category Details (Collapsible) */}
                {isSelected && (
                  <Collapsible open={isSelected}>
                    <CollapsibleContent>
                      <CardContent className="space-y-4 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Enrollment Date */}
                          <div className="space-y-2">
                            <Label htmlFor={`enrollment-${category}`}>
                              {t.enrollmentDate}
                            </Label>
                            <Input
                              id={`enrollment-${category}`}
                              type="date"
                              value={
                                categoryData[category]?.enrollmentDate ||
                                new Date().toISOString().split("T")[0]
                              }
                              onChange={(e) =>
                                updateCategoryData(
                                  category,
                                  "enrollmentDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Assigned Instructor */}
                          <div className="space-y-2">
                            <Label htmlFor={`instructor-${category}`}>
                              {t.assignedInstructor}
                            </Label>
                            <Select
                              value={categoryData[category]?.instructorId}
                              onValueChange={(value) =>
                                updateCategoryData(
                                  category,
                                  "instructorId",
                                  value
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={t.noInstructor} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">
                                  {t.noInstructor}
                                </SelectItem>
                                {qualifiedInstructors.map((instructor) => (
                                  <SelectItem
                                    key={instructor.id}
                                    value={instructor.id}
                                  >
                                    {instructor.firstName} {instructor.lastName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Exam Target Date */}
                          <div className="space-y-2">
                            <Label htmlFor={`exam-${category}`}>
                              {t.examTargetDate}
                            </Label>
                            <Input
                              id={`exam-${category}`}
                              type="date"
                              value={
                                categoryData[category]?.examTargetDate || ""
                              }
                              onChange={(e) =>
                                updateCategoryData(
                                  category,
                                  "examTargetDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Package Selection */}
                        <div className="space-y-2">
                          <Label>{t.selectPackage}</Label>
                          <RadioGroup
                            value={
                              categoryData[category]?.packageType || "single"
                            }
                            onValueChange={(value) =>
                              updateCategoryData(category, "packageType", value)
                            }
                          >
                            {[
                              "single",
                              "package_10",
                              "package_20",
                              "unlimited_monthly",
                            ].map((pkg) => {
                              const pkgTranslation = getPackageTranslation(pkg);
                              return (
                                <div
                                  key={pkg}
                                  className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                                >
                                  <RadioGroupItem
                                    value={pkg}
                                    id={`${category}-${pkg}`}
                                  />

                                  <Label
                                    htmlFor={`${category}-${pkg}`}
                                    className="flex-1 cursor-pointer"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium">
                                          {pkgTranslation.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {pkgTranslation.desc}
                                        </p>
                                      </div>
                                      <Badge variant="outline">
                                        CHF {PACKAGE_PRICES[pkg]}
                                      </Badge>
                                    </div>
                                  </Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${category}`}>{t.notes}</Label>
                          <Textarea
                            id={`notes-${category}`}
                            placeholder={t.notesPlaceholder}
                            maxLength={500}
                            rows={3}
                            value={categoryData[category]?.notes || ""}
                            onChange={(e) =>
                              updateCategoryData(
                                category,
                                "notes",
                                e.target.value
                              )
                            }
                          />

                          <p className="text-xs text-muted-foreground text-right">
                            {categoryData[category]?.notes?.length || 0}/500
                          </p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </Card>
            );
          }
        )}
      </div>

      {/* Validation Alert */}
      {selectedCategories.length === 0 && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />

          <AlertDescription>{t.required}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
