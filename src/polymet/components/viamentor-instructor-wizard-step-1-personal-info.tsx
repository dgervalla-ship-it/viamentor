import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UploadIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LoaderIcon,
  CropIcon,
  UserIcon,
} from "lucide-react";
import { format } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  personalInfoSchema,
  validatePersonalInfo,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  type PersonalInfoData,
  type Gender,
  type Canton,
  type Language,
} from "@/polymet/data/viamentor-instructors-wizard-schemas";
import { SWISS_CANTONS } from "@/polymet/data/viamentor-swiss-cantons";
import {
  useInstructorWizardTranslations,
  type InstructorWizardLocale,
} from "@/polymet/data/viamentor-instructors-wizard-i18n";

interface PersonalInfoStepProps {
  initialData?: Partial<PersonalInfoData>;
  locale?: InstructorWizardLocale;
  onDataChange: (data: Partial<PersonalInfoData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

// Mock API pour vérification email
const checkEmailAvailability = async (email: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return !["admin@viamentor.ch", "test@example.com"].includes(
    email.toLowerCase()
  );
};

// Mock API pour autocomplete ville
const searchCities = async (
  query: string,
  canton?: Canton
): Promise<string[]> => {
  const cities = {
    VD: ["Lausanne", "Montreux", "Vevey", "Yverdon-les-Bains", "Morges"],
    GE: ["Genève", "Carouge", "Vernier", "Lancy", "Meyrin"],
    BE: ["Berne", "Biel/Bienne", "Thun", "Köniz", "Burgdorf"],
    ZH: ["Zurich", "Winterthur", "Uster", "Dübendorf", "Dietikon"],
  };

  const cantonCities = canton
    ? cities[canton] || []
    : Object.values(cities).flat();
  return cantonCities
    .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
};

export function ViamentorInstructorWizardStep1PersonalInfo({
  initialData,
  locale = "fr",
  onDataChange,
  onValidationChange,
}: PersonalInfoStepProps) {
  const { t } = useInstructorWizardTranslations(locale);
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.photo || null
  );
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const dateLocales = { fr, de, it, en: enUS };
  const dateLocale = dateLocales[locale];

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      birthDate: initialData?.birthDate || "",
      gender: initialData?.gender,
      street: initialData?.street || "",
      zipCode: initialData?.zipCode || "",
      city: initialData?.city || "",
      canton: initialData?.canton,
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      nationality: initialData?.nationality || "",
      languages: initialData?.languages || [],
      iban: initialData?.iban || "",
      photo: initialData?.photo || "",
    },
    mode: "onChange",
  });

  const watchedData = form.watch();

  // Validation temps réel
  useEffect(() => {
    const validation = validatePersonalInfo(watchedData);
    onValidationChange(validation.success);
    onDataChange(watchedData);
  }, [watchedData, onValidationChange, onDataChange]);

  // Vérification email avec debounce
  useEffect(() => {
    const email = form.getValues("email");
    if (!email || !email.includes("@")) {
      setEmailStatus("idle");
      return;
    }

    const timeoutId = setTimeout(async () => {
      setEmailStatus("checking");
      try {
        const isAvailable = await checkEmailAvailability(email);
        setEmailStatus(isAvailable ? "available" : "taken");
      } catch {
        setEmailStatus("idle");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [form.watch("email")]);

  // Autocomplete ville
  const handleCitySearch = useCallback(
    async (query: string) => {
      if (query.length < 2) {
        setCitySuggestions([]);
        setShowCityDropdown(false);
        return;
      }

      const canton = form.getValues("canton");
      const suggestions = await searchCities(query, canton);
      setCitySuggestions(suggestions);
      setShowCityDropdown(suggestions.length > 0);
    },
    [form]
  );

  // Upload photo
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
        setShowCropDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Crop photo (simulation)
  const handlePhotoCrop = () => {
    if (photoPreview) {
      form.setValue("photo", photoPreview);
      setShowCropDialog(false);
    }
  };

  // Validation âge OMCo
  const birthDate = form.watch("birthDate");
  const isUnderAge =
    birthDate &&
    new Date(birthDate) >
      new Date(Date.now() - 21 * 365.25 * 24 * 60 * 60 * 1000);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t.personal_info.title}</h2>
        <p className="text-muted-foreground">{t.personal_info.subtitle}</p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Photo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />

                {t.personal_info.photo.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={photoPreview || undefined} />

                  <AvatarFallback className="text-2xl">
                    <UserIcon className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full"
                  onClick={() =>
                    document.getElementById("photo-upload")?.click()
                  }
                >
                  <UploadIcon className="h-4 w-4" />
                </Button>
              </div>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />

              <div className="text-center">
                <p className="text-sm">{t.personal_info.photo.upload}</p>
                <p className="text-xs text-muted-foreground">
                  {t.personal_info.photo.formats}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Identité */}
          <Card>
            <CardHeader>
              <CardTitle>{t.personal_info.identity.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.personal_info.identity.first_name} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          t.personal_info.identity.first_name_placeholder
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.personal_info.identity.last_name} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          t.personal_info.identity.last_name_placeholder
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
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      {t.personal_info.identity.birth_date} *
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
                                  t.personal_info.identity
                                    .birth_date_placeholder
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
                    {isUnderAge && (
                      <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />

                        <AlertDescription>
                          {t.validation.min_age_omco}
                        </AlertDescription>
                      </Alert>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      {t.personal_info.identity.gender}{" "}
                      {t.personal_info.identity.gender_optional}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {GENDER_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={option.value} />

                            <label className="text-sm">
                              {t.gender[option.value as keyof typeof t.gender]}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Adresse */}
          <Card>
            <CardHeader>
              <CardTitle>{t.personal_info.address.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.personal_info.address.street} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            t.personal_info.address.street_placeholder
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.personal_info.address.zip_code} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          t.personal_info.address.zip_code_placeholder
                        }
                        maxLength={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>{t.personal_info.address.city} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.personal_info.address.city_placeholder}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCitySearch(e.target.value);
                        }}
                        onFocus={() => handleCitySearch(field.value)}
                        onBlur={() =>
                          setTimeout(() => setShowCityDropdown(false), 200)
                        }
                      />
                    </FormControl>
                    {showCityDropdown && (
                      <div className="absolute top-full left-0 right-0 z-10 bg-background border rounded-md shadow-lg">
                        {citySuggestions.map((city) => (
                          <button
                            key={city}
                            type="button"
                            className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                            onClick={() => {
                              field.onChange(city);
                              setShowCityDropdown(false);
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="canton"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.personal_info.address.canton} *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SWISS_CANTONS.map((canton) => (
                          <SelectItem key={canton.code} value={canton.code}>
                            <div className="flex items-center gap-2">
                              <span>{canton.flag}</span>
                              <span>{canton.name[locale]}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>{t.personal_info.contact.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.personal_info.contact.email} *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder={
                              t.personal_info.contact.email_placeholder
                            }
                            {...field}
                          />

                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {emailStatus === "checking" && (
                              <LoaderIcon className="h-4 w-4 animate-spin" />
                            )}
                            {emailStatus === "available" && (
                              <CheckCircleIcon className="h-4 w-4 text-green-600" />
                            )}
                            {emailStatus === "taken" && (
                              <AlertCircleIcon className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      {emailStatus === "checking" && (
                        <FormDescription>
                          {t.messages.email_checking}
                        </FormDescription>
                      )}
                      {emailStatus === "available" && (
                        <FormDescription className="text-green-600">
                          {t.messages.email_available}
                        </FormDescription>
                      )}
                      {emailStatus === "taken" && (
                        <FormDescription className="text-red-600">
                          {t.messages.email_taken}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.personal_info.contact.phone} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            t.personal_info.contact.phone_placeholder
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
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t.personal_info.contact.nationality} *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            t.personal_info.contact.nationality_placeholder
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
                  name="iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t.personal_info.contact.iban}{" "}
                        {t.personal_info.contact.iban_optional}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.personal_info.contact.iban_placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.personal_info.contact.languages} *</FormLabel>
                    <FormDescription>
                      {t.personal_info.contact.languages_subtitle}
                    </FormDescription>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {LANGUAGE_OPTIONS.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={field.value?.includes(
                                option.value as Language
                              )}
                              onCheckedChange={(checked) => {
                                const currentLanguages = field.value || [];
                                if (checked) {
                                  field.onChange([
                                    ...currentLanguages,
                                    option.value,
                                  ]);
                                } else {
                                  field.onChange(
                                    currentLanguages.filter(
                                      (lang) => lang !== option.value
                                    )
                                  );
                                }
                              }}
                            />

                            <Badge variant="outline" className="cursor-pointer">
                              {option.flag}{" "}
                              {
                                t.languages[
                                  option.value as keyof typeof t.languages
                                ]
                              }
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CropIcon className="h-5 w-5" />

              {t.personal_info.photo.crop_title}
            </DialogTitle>
            <DialogDescription>
              {t.personal_info.photo.crop_subtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {photoPreview && (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-64 h-64 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCropDialog(false)}
              >
                {t.navigation.cancel}
              </Button>
              <Button onClick={handlePhotoCrop}>Confirmer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
