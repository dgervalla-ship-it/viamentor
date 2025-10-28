import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  GraduationCapIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  UploadIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  ShieldCheckIcon,
  StarIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { format } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  qualificationsSchema,
  validateQualifications,
  CATEGORY_OPTIONS,
  SPECIALTY_OPTIONS,
  type QualificationsData,
  type LicenseCategory,
  type Specialty,
} from "@/polymet/data/viamentor-instructors-wizard-schemas";
import {
  useInstructorWizardTranslations,
  type InstructorWizardLocale,
} from "@/polymet/data/viamentor-instructors-wizard-i18n";

interface QualificationsStepProps {
  initialData?: Partial<QualificationsData>;
  locale?: InstructorWizardLocale;
  onDataChange: (data: Partial<QualificationsData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function ViaMenutorInstructorWizardStep2Qualifications({
  initialData,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: QualificationsStepProps) {
  const { t } = useInstructorWizardTranslations(locale);
  const [federalLicenseScan, setFederalLicenseScan] = useState<string | null>(
    initialData?.federalLicenseScan || null
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Set<LicenseCategory>
  >(new Set());

  const dateLocales = { fr, de, it, en: enUS };
  const dateLocale = dateLocales[locale];

  const form = useForm<QualificationsData>({
    resolver: zodResolver(qualificationsSchema),
    defaultValues: {
      federalLicenseNumber: initialData?.federalLicenseNumber || "",
      federalLicenseDate: initialData?.federalLicenseDate || "",
      federalLicenseScan: initialData?.federalLicenseScan || "",
      isVerified: initialData?.isVerified || false,
      categories: initialData?.categories || [],
      specialties: initialData?.specialties || [],
      additionalDiplomas: initialData?.additionalDiplomas || "",
    },
    mode: "onChange",
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const watchedData = form.watch();
  const selectedCategories =
    watchedData.categories?.map((cat) => cat.category) || [];

  // Validation temps réel
  useEffect(() => {
    const validation = validateQualifications(watchedData);
    onValidationChange(validation.success);
    onDataChange(watchedData);
  }, [watchedData, onValidationChange, onDataChange]);

  // Upload scan brevet
  const handleFederalLicenseScanUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFederalLicenseScan(result);
        form.setValue("federalLicenseScan", result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload attestations catégorie
  const handleCategoryAttestationUpload = (
    categoryIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const currentCategory = form.getValues(`categories.${categoryIndex}`);
      const newCertificates = files.map((file) => URL.createObjectURL(file));
      form.setValue(`categories.${categoryIndex}.certificates`, [
        ...(currentCategory.certificates || []),
        ...newCertificates,
      ]);
    }
  };

  // Toggle catégorie
  const toggleCategory = (category: LicenseCategory) => {
    const isSelected = selectedCategories.includes(category);

    if (isSelected) {
      // Retirer la catégorie
      const categoryIndex = categoryFields.findIndex(
        (field) => field.category === category
      );
      if (categoryIndex !== -1) {
        removeCategory(categoryIndex);
      }
      setExpandedCategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(category);
        return newSet;
      });
    } else {
      // Ajouter la catégorie
      appendCategory({
        category,
        obtainedDate: "",
        experience: "",
        certificates: [],
      });
      setExpandedCategories((prev) => new Set(prev).add(category));
    }
  };

  // Toggle expansion catégorie
  const toggleCategoryExpansion = (category: LicenseCategory) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Toggle spécialité
  const toggleSpecialty = (specialty: Specialty) => {
    const currentSpecialties = form.getValues("specialties") || [];
    const isSelected = currentSpecialties.includes(specialty);

    if (isSelected) {
      form.setValue(
        "specialties",
        currentSpecialties.filter((s) => s !== specialty)
      );
    } else {
      if (currentSpecialties.length < 5) {
        form.setValue("specialties", [...currentSpecialties, specialty]);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t.qualifications.title}</h2>
        <p className="text-muted-foreground">{t.qualifications.subtitle}</p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Brevet fédéral */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCapIcon className="h-5 w-5" />

                {t.qualifications.federal_license.title}
              </CardTitle>
              <CardDescription>
                {t.qualifications.federal_license.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="federalLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t.qualifications.federal_license.number} *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            t.qualifications.federal_license.number_placeholder
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="federalLicenseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {t.qualifications.federal_license.date} *
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP", {
                                  locale: dateLocale,
                                })
                              ) : (
                                <span>
                                  {
                                    t.qualifications.federal_license
                                      .date_placeholder
                                  }
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString().split("T")[0])
                            }
                            disabled={(date) => date > new Date()}
                            initialFocus
                            locale={dateLocale}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="federalLicenseScan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.qualifications.federal_license.scan} *
                    </FormLabel>
                    <FormDescription>
                      {t.qualifications.federal_license.scan_required}
                    </FormDescription>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document
                                .getElementById("federal-license-upload")
                                ?.click()
                            }
                          >
                            <UploadIcon className="h-4 w-4 mr-2" />

                            {t.qualifications.federal_license.scan_upload}
                          </Button>
                          <input
                            id="federal-license-upload"
                            type="file"
                            accept=".pdf,image/*"
                            className="hidden"
                            onChange={handleFederalLicenseScanUpload}
                          />
                        </div>

                        {federalLicenseScan && (
                          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                            <FileTextIcon className="h-5 w-5 text-green-600" />

                            <span className="text-sm">Document téléchargé</span>
                            <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2">
                        <ShieldCheckIcon className="h-4 w-4" />

                        {t.qualifications.federal_license.verified}
                      </FormLabel>
                      <FormDescription>
                        {t.qualifications.federal_license.verified_subtitle}
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Habilitations par catégorie */}
          <Card>
            <CardHeader>
              <CardTitle>{t.qualifications.categories.title}</CardTitle>
              <CardDescription>
                {t.qualifications.categories.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <FormLabel className="text-base">
                  {t.qualifications.categories.select_categories}
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {CATEGORY_OPTIONS.map((option) => {
                    const isSelected = selectedCategories.includes(
                      option.value
                    );
                    const isExpanded = expandedCategories.has(option.value);
                    const categoryIndex = categoryFields.findIndex(
                      (field) => field.category === option.value
                    );

                    return (
                      <div key={option.value} className="space-y-2">
                        <div
                          className={cn(
                            "p-4 border rounded-lg cursor-pointer transition-colors",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => toggleCategory(option.value)}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox checked={isSelected} readOnly />

                            <span className="text-2xl">{option.icon}</span>
                            <div className="flex-1">
                              <p className="font-medium">{option.value}</p>
                              <p className="text-sm text-muted-foreground">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Collapsible
                            open={isExpanded}
                            onOpenChange={() =>
                              toggleCategoryExpansion(option.value)
                            }
                          >
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full"
                              >
                                {isExpanded ? (
                                  <ChevronDownIcon className="h-4 w-4 mr-2" />
                                ) : (
                                  <ChevronRightIcon className="h-4 w-4 mr-2" />
                                )}
                                Détails de la catégorie {option.value}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-4 p-4 bg-muted/50 rounded-lg">
                              {categoryIndex !== -1 && (
                                <>
                                  <FormField
                                    control={form.control}
                                    name={`categories.${categoryIndex}.obtainedDate`}
                                    render={({ field }) => (
                                      <FormItem className="flex flex-col">
                                        <FormLabel>
                                          {
                                            t.qualifications.categories
                                              .obtained_date
                                          }{" "}
                                          *
                                        </FormLabel>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <FormControl>
                                              <Button
                                                variant="outline"
                                                className={cn(
                                                  "w-full pl-3 text-left font-normal",
                                                  !field.value &&
                                                    "text-muted-foreground"
                                                )}
                                              >
                                                {field.value ? (
                                                  format(
                                                    new Date(field.value),
                                                    "PPP",
                                                    { locale: dateLocale }
                                                  )
                                                ) : (
                                                  <span>
                                                    Sélectionnez la date
                                                  </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                              </Button>
                                            </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                          >
                                            <Calendar
                                              mode="single"
                                              selected={
                                                field.value
                                                  ? new Date(field.value)
                                                  : undefined
                                              }
                                              onSelect={(date) =>
                                                field.onChange(
                                                  date
                                                    ?.toISOString()
                                                    .split("T")[0]
                                                )
                                              }
                                              disabled={(date) =>
                                                date > new Date()
                                              }
                                              initialFocus
                                              locale={dateLocale}
                                            />
                                          </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`categories.${categoryIndex}.experience`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          {
                                            t.qualifications.categories
                                              .experience
                                          }
                                        </FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder={
                                              t.qualifications.categories
                                                .experience_placeholder
                                            }
                                            className="min-h-[80px]"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <div>
                                    <FormLabel>
                                      {t.qualifications.categories.certificates}
                                    </FormLabel>
                                    <div className="space-y-2 mt-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          document
                                            .getElementById(
                                              `category-${categoryIndex}-upload`
                                            )
                                            ?.click()
                                        }
                                      >
                                        <UploadIcon className="h-4 w-4 mr-2" />

                                        {
                                          t.qualifications.categories
                                            .certificates_upload
                                        }
                                      </Button>
                                      <input
                                        id={`category-${categoryIndex}-upload`}
                                        type="file"
                                        accept=".pdf,image/*"
                                        multiple
                                        className="hidden"
                                        onChange={(e) =>
                                          handleCategoryAttestationUpload(
                                            categoryIndex,
                                            e
                                          )
                                        }
                                      />

                                      {form
                                        .watch(
                                          `categories.${categoryIndex}.certificates`
                                        )
                                        ?.map((cert, certIndex) => (
                                          <div
                                            key={certIndex}
                                            className="flex items-center gap-2 p-2 bg-background rounded border"
                                          >
                                            <FileTextIcon className="h-4 w-4 text-blue-600" />

                                            <span className="text-sm flex-1">
                                              Attestation {certIndex + 1}
                                            </span>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                const currentCerts =
                                                  form.getValues(
                                                    `categories.${categoryIndex}.certificates`
                                                  ) || [];
                                                form.setValue(
                                                  `categories.${categoryIndex}.certificates`,
                                                  currentCerts.filter(
                                                    (_, i) => i !== certIndex
                                                  )
                                                );
                                              }}
                                            >
                                              <TrashIcon className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                </>
                              )}
                            </CollapsibleContent>
                          </Collapsible>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedCategories.length === 0 && (
                <Alert>
                  <AlertCircleIcon className="h-4 w-4" />

                  <AlertDescription>
                    {t.validation.min_categories}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Spécialités */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StarIcon className="h-5 w-5" />

                {t.qualifications.specialties.title}
              </CardTitle>
              <CardDescription>
                {t.qualifications.specialties.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.qualifications.specialties.select}</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SPECIALTY_OPTIONS.map((option) => {
                          const isSelected = field.value?.includes(
                            option.value
                          );
                          const isDisabled =
                            !isSelected && (field.value?.length || 0) >= 5;

                          return (
                            <div
                              key={option.value}
                              className={cn(
                                "p-3 border rounded-lg cursor-pointer transition-colors",
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50",
                                isDisabled && "opacity-50 cursor-not-allowed"
                              )}
                              onClick={() =>
                                !isDisabled && toggleSpecialty(option.value)
                              }
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox checked={isSelected} readOnly />

                                <span className="text-xl">{option.icon}</span>
                                <span className="text-sm font-medium">
                                  {
                                    t.specialties[
                                      option.value as keyof typeof t.specialties
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </FormControl>
                    {(field.value?.length || 0) >= 5 && (
                      <FormDescription className="text-amber-600">
                        {t.validation.max_specialties}
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Diplômes additionnels */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t.qualifications.additional_diplomas.title}
              </CardTitle>
              <CardDescription>
                {t.qualifications.additional_diplomas.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="additionalDiplomas"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={
                          t.qualifications.additional_diplomas.placeholder
                        }
                        className="min-h-[120px]"
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t.qualifications.additional_diplomas.max_chars} (
                      {field.value?.length || 0}/500)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
